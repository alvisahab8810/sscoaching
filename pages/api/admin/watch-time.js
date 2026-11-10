// GET /api/admin/watch-time
// Video watch time per student, course, video, device and day, from
// VideoWatchTime and WatchDevice (see lib/watchTime.js for how a second
// gets counted).
//   ?from=YYYY-MM-DD&to=YYYY-MM-DD   IST day range, both optional
//   ?courseId=                       limit to one course
//   ?studentId=                      one student's courses, videos, devices and days
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import VideoWatchTime from "@/models/VideoWatchTime";
import WatchDevice from "@/models/WatchDevice";
import WatchProgress from "@/models/WatchProgress";
import StudentUser from "@/models/StudentUser";
import Course from "@/models/CourseModel";
import Enrollment from "@/models/EnrollmentModel";

function verifyAdmin(req) {
  try {
    const adminToken = req.cookies?.admin_token;
    if (adminToken) { jwt.verify(adminToken, process.env.JWT_SECRET); return true; }
    const subToken = req.cookies?.subadmin_token;
    if (subToken) { const d = jwt.verify(subToken, process.env.JWT_SECRET); return d.role === "subadmin"; }
    return false;
  } catch { return false; }
}

const DAY = /^\d{4}-\d{2}-\d{2}$/;
const isId = (v) => mongoose.Types.ObjectId.isValid(v);
const oid = (v) => new mongoose.Types.ObjectId(v);

const SUMS = {
  seconds:    { $sum: "$seconds" },
  webSeconds: { $sum: "$webSeconds" },
  appSeconds: { $sum: "$appSeconds" },
  plays:      { $sum: "$plays" },
};

// A video counts as repeated once it was started from the beginning twice,
// or the time spent on it adds up to one and a half times its length.
const REPEAT_RATIO = 1.5;
const isRepeated = (plays, seconds, duration) => plays >= 2 || (duration > 0 && seconds >= duration * REPEAT_RATIO);
const timesWatched = (seconds, duration) => (duration > 0 ? Math.round((seconds / duration) * 10) / 10 : null);

// lesson id -> { title, chapter } across subject and bundle courses
function lessonTitles(courses) {
  const map = new Map();
  const walk = (chapters, prefix) => {
    for (const ch of chapters || []) {
      for (const l of ch.lessons || []) {
        if (l?._id) map.set(String(l._id), { title: l.title, chapter: prefix ? `${prefix} / ${ch.title}` : ch.title });
      }
    }
  };
  for (const c of courses) {
    walk(c.chapters, "");
    for (const sc of c.subjectContents || []) walk(sc.chapters, sc.subject);
  }
  return map;
}

// Device rows grouped per student and device, latest name/version kept.
function deviceGroup(match) {
  return WatchDevice.aggregate([
    { $match: match },
    { $sort: { updatedAt: 1 } },
    {
      $group: {
        _id: { userId: "$userId", key: "$key" },
        source: { $last: "$source" },
        device: { $last: "$device" },
        os: { $last: "$os" },
        client: { $last: "$client" },
        seconds: { $sum: "$seconds" },
        first: { $min: "$createdAt" },
        last: { $max: "$updatedAt" },
      },
    },
    { $sort: { seconds: -1 } },
  ]);
}
const deviceRow = (d) => ({
  userId: d._id.userId,
  source: d.source,
  device: d.device,
  os: d.os,
  client: d.client,
  seconds: d.seconds,
  first: d.first,
  last: d.last,
});

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  await dbConnect();
  if (!verifyAdmin(req)) return res.status(401).json({ success: false, message: "Unauthorized" });

  const { from, to, courseId, studentId } = req.query;
  const dateMatch = {};
  if (DAY.test(from || "") || DAY.test(to || "")) {
    dateMatch.date = {};
    if (DAY.test(from || "")) dateMatch.date.$gte = from;
    if (DAY.test(to || "")) dateMatch.date.$lte = to;
  }
  const match = { ...dateMatch };
  if (courseId && isId(courseId)) match.courseId = oid(courseId);

  const allCourses = await Course.find({}).select("title chapters subjectContents").lean();
  const courseTitle = new Map(allCourses.map((c) => [String(c._id), c.title]));
  const lessons = lessonTitles(allCourses);
  const videoInfo = (videoId, cId) => ({
    title: lessons.get(videoId)?.title || "Deleted video",
    chapter: lessons.get(videoId)?.chapter || "",
    course: courseTitle.get(String(cId)) || "—",
  });

  /* ── One student ── */
  if (studentId) {
    if (!isId(studentId)) return res.status(400).json({ success: false, message: "Invalid student" });
    const sMatch = { ...match, userId: oid(studentId) };

    const [student, byVideo, byDay, byCourse, devices, enrollments, progress] = await Promise.all([
      StudentUser.findById(studentId).select("name phone email className").lean(),
      VideoWatchTime.aggregate([
        { $match: sMatch },
        { $group: { _id: "$videoId", courseId: { $first: "$courseId" }, ...SUMS, days: { $sum: 1 }, last: { $max: "$updatedAt" } } },
        { $sort: { seconds: -1 } },
      ]),
      VideoWatchTime.aggregate([
        { $match: sMatch },
        { $group: { _id: "$date", ...SUMS, videos: { $sum: 1 } } },
        { $sort: { _id: -1 } },
      ]),
      VideoWatchTime.aggregate([
        { $match: sMatch },
        { $group: { _id: "$courseId", ...SUMS, videos: { $addToSet: "$videoId" }, last: { $max: "$updatedAt" } } },
      ]),
      deviceGroup({ ...dateMatch, userId: oid(studentId) }),
      Enrollment.find({ student: studentId, status: "active" }).select("course type createdAt").lean(),
      WatchProgress.find({ userId: studentId }).select("videoId watchPercentage duration").lean(),
    ]);
    const prog = new Map(progress.map((p) => [p.videoId, p]));

    // Every enrolled course, plus any course watched without a current
    // enrollment (expired or refunded later).
    const watchByCourse = new Map(byCourse.map((c) => [String(c._id), c]));
    const courseIds = new Set([...enrollments.map((e) => String(e.course)), ...watchByCourse.keys()]);
    const enrolledAt = new Map(enrollments.map((e) => [String(e.course), e]));
    const courses = [...courseIds].map((id) => {
      const w = watchByCourse.get(id);
      const e = enrolledAt.get(id);
      return {
        courseId: id,
        title: courseTitle.get(id) || "—",
        enrolled: !!e,
        type: e?.type || "",
        enrolledOn: e?.createdAt || null,
        seconds: w?.seconds || 0,
        webSeconds: w?.webSeconds || 0,
        appSeconds: w?.appSeconds || 0,
        videos: w?.videos?.length || 0,
        last: w?.last || null,
      };
    }).sort((a, b) => b.seconds - a.seconds);

    return res.status(200).json({
      success: true,
      student,
      courses,
      videos: byVideo.map((v) => {
        const p = prog.get(v._id);
        const duration = p?.duration || 0;
        return {
          videoId: v._id,
          ...videoInfo(v._id, v.courseId),
          seconds: v.seconds,
          webSeconds: v.webSeconds,
          appSeconds: v.appSeconds,
          plays: v.plays,
          duration,
          timesWatched: timesWatched(v.seconds, duration),
          repeated: isRepeated(v.plays, v.seconds, duration),
          days: v.days,
          progress: p?.watchPercentage || 0,
          last: v.last,
        };
      }),
      devices: devices.map(deviceRow),
      days: byDay.map((d) => ({ date: d._id, seconds: d.seconds, webSeconds: d.webSeconds, appSeconds: d.appSeconds, videos: d.videos, plays: d.plays })),
    });
  }

  /* ── Overview ── */
  const [byStudent, byCourse, byVideo, byDay, byPair] = await Promise.all([
    VideoWatchTime.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$userId", ...SUMS,
          videos: { $addToSet: "$videoId" },
          days: { $addToSet: "$date" },
          courses: { $addToSet: "$courseId" },
          last: { $max: "$updatedAt" },
        },
      },
      { $project: { seconds: 1, webSeconds: 1, appSeconds: 1, plays: 1, last: 1, courses: 1, videos: { $size: "$videos" }, days: { $size: "$days" } } },
      { $sort: { seconds: -1 } },
    ]),
    VideoWatchTime.aggregate([
      { $match: match },
      { $group: { _id: "$courseId", ...SUMS, students: { $addToSet: "$userId" }, videos: { $addToSet: "$videoId" } } },
      { $project: { seconds: 1, webSeconds: 1, appSeconds: 1, students: { $size: "$students" }, videos: { $size: "$videos" } } },
      { $sort: { seconds: -1 } },
    ]),
    VideoWatchTime.aggregate([
      { $match: match },
      { $group: { _id: "$videoId", courseId: { $first: "$courseId" }, ...SUMS, students: { $addToSet: "$userId" } } },
      { $project: { courseId: 1, seconds: 1, webSeconds: 1, appSeconds: 1, plays: 1, students: { $size: "$students" } } },
      { $sort: { seconds: -1 } },
    ]),
    VideoWatchTime.aggregate([
      { $match: match },
      { $group: { _id: "$date", ...SUMS, students: { $addToSet: "$userId" }, videos: { $addToSet: "$videoId" } } },
      { $project: { seconds: 1, webSeconds: 1, appSeconds: 1, plays: 1, students: { $size: "$students" }, videos: { $size: "$videos" } } },
      { $sort: { _id: -1 } },
    ]),
    VideoWatchTime.aggregate([
      { $match: match },
      {
        $group: {
          _id: { userId: "$userId", videoId: "$videoId" },
          courseId: { $first: "$courseId" },
          seconds: { $sum: "$seconds" },
          plays: { $sum: "$plays" },
          last: { $max: "$updatedAt" },
        },
      },
    ]),
  ]);

  const userIds = byStudent.map((s) => s._id);
  const [students, deviceRows, progress] = await Promise.all([
    StudentUser.find({ _id: { $in: userIds } }).select("name phone email className").lean(),
    deviceGroup({ ...dateMatch, userId: { $in: userIds } }),
    WatchProgress.find({ userId: { $in: userIds } }).select("userId videoId duration").lean(),
  ]);
  const studentMap = new Map(students.map((s) => [String(s._id), s]));
  const durationOf = new Map(progress.map((p) => [`${p.userId}|${p.videoId}`, p.duration || 0]));
  const devicesByUser = new Map();
  for (const d of deviceRows) {
    const k = String(d._id.userId);
    if (!devicesByUser.has(k)) devicesByUser.set(k, []);
    devicesByUser.get(k).push(d);
  }
  const studentInfo = (id) => {
    const st = studentMap.get(String(id)) || {};
    return { name: st.name || "—", phone: st.phone || "", email: st.email || "", className: st.className || "" };
  };

  const repeated = byPair
    .map((p) => {
      const duration = durationOf.get(`${p._id.userId}|${p._id.videoId}`) || 0;
      return { p, duration };
    })
    .filter(({ p, duration }) => isRepeated(p.plays, p.seconds, duration))
    .map(({ p, duration }) => ({
      studentId: p._id.userId,
      ...studentInfo(p._id.userId),
      videoId: p._id.videoId,
      video: videoInfo(p._id.videoId, p.courseId),
      plays: p.plays,
      seconds: p.seconds,
      duration,
      timesWatched: timesWatched(p.seconds, duration),
      last: p.last,
    }))
    .sort((a, b) => (b.timesWatched || b.plays) - (a.timesWatched || a.plays));
  const repeatedByUser = new Map();
  for (const r of repeated) repeatedByUser.set(String(r.studentId), (repeatedByUser.get(String(r.studentId)) || 0) + 1);

  const total = byStudent.reduce(
    (t, s) => ({ seconds: t.seconds + s.seconds, webSeconds: t.webSeconds + s.webSeconds, appSeconds: t.appSeconds + s.appSeconds }),
    { seconds: 0, webSeconds: 0, appSeconds: 0 }
  );

  return res.status(200).json({
    success: true,
    courses: allCourses.map((c) => ({ _id: c._id, title: c.title })).sort((a, b) => a.title.localeCompare(b.title)),
    summary: {
      ...total,
      students: byStudent.length,
      videos: byVideo.length,
      devices: deviceRows.length,
      repeated: repeated.length,
    },
    students: byStudent.map((s) => ({
      studentId: s._id,
      ...studentInfo(s._id),
      seconds: s.seconds, webSeconds: s.webSeconds, appSeconds: s.appSeconds,
      videos: s.videos, days: s.days, last: s.last,
      courses: (s.courses || []).map((id) => courseTitle.get(String(id))).filter(Boolean),
      devices: (devicesByUser.get(String(s._id)) || []).map((d) => ({ source: d.source, device: d.device })),
      repeated: repeatedByUser.get(String(s._id)) || 0,
    })),
    courseRows: byCourse.map((c) => ({
      courseId: c._id,
      title: courseTitle.get(String(c._id)) || "—",
      seconds: c.seconds, webSeconds: c.webSeconds, appSeconds: c.appSeconds,
      students: c.students, videos: c.videos,
    })),
    videos: byVideo.map((v) => ({
      videoId: v._id,
      ...videoInfo(v._id, v.courseId),
      seconds: v.seconds, webSeconds: v.webSeconds, appSeconds: v.appSeconds,
      plays: v.plays,
      students: v.students,
    })),
    deviceRows: deviceRows.map((d) => ({ ...deviceRow(d), studentId: d._id.userId, ...studentInfo(d._id.userId) })),
    repeated,
    days: byDay.map((d) => ({
      date: d._id,
      seconds: d.seconds, webSeconds: d.webSeconds, appSeconds: d.appSeconds,
      plays: d.plays,
      students: d.students, videos: d.videos,
    })),
  });
}
