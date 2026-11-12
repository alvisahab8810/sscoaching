import dbConnect from "@/lib/dbConnect";
import ClassSchedule from "@/models/ClassSchedule";
import Enrollment from "@/models/EnrollmentModel";
import Course from "@/models/CourseModel";
import LiveClass from "@/models/LiveClassModel";
import { getStudentIdFromReq, getStudentAccess, isClassUnlocked } from "@/lib/liveClassAccess";
import { closePastLiveClasses } from "@/lib/closePastLiveClasses";
import { todayInIndia } from "@/lib/liveClassStatus";
import { matchSubject, NO_SCHEDULE_COURSE } from "@/lib/classSchedule";
import { linkedCourseIds } from "@/lib/liveClassCourses";

/**
 * GET /api/class-schedule  (student, Bearer token)
 *
 * Weekly timetables of the courses this student has bought, for the website
 * dashboard and the app.
 *
 *   - Pro batch (bundle): its own timetable, limited to the course's subjects.
 *   - Single-subject course: its subject's classes and doubt sessions, taken
 *     from the Pro batch timetables of the same class (batch). TMA and
 *     question bank courses have no live classes and get nothing.
 *
 * Every slot comes back with its own `days`. `live` lists the teachers'
 * online classes of the coming days that this student may join, so a slot
 * can show a Join button while its class is on.
 */
const sortDays = (days) => [...days].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7));
const byStart = (a, b) => a.start.localeCompare(b.start);

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ success: false, message: "Method not allowed" });
  const studentId = getStudentIdFromReq(req);
  if (!studentId) return res.status(401).json({ success: false, message: "Unauthorized" });

  await dbConnect();
  const enrollments = await Enrollment.find({ student: studentId, status: "active" }).select("course").lean();
  const courseIds = enrollments.map((e) => e.course).filter(Boolean);
  if (!courseIds.length) return res.status(200).json({ success: true, schedules: [] });

  const courses = await Course.find({ _id: { $in: courseIds } })
    .select("title batch courseType subject bundledSubjects")
    .lean();
  const bundles = courses.filter((c) => c.courseType === "bundle");
  const singles = courses.filter((c) => c.courseType !== "bundle" && c.subject && !NO_SCHEDULE_COURSE.test(c.title || ""));
  if (!bundles.length && !singles.length) return res.status(200).json({ success: true, schedules: [] });

  // Pro batch timetables of the classes the single courses belong to.
  const batches = [...new Set(singles.map((c) => String(c.batch || "").toLowerCase()))];
  const sourceBundles = batches.length
    ? await Course.find({ courseType: "bundle" }).select("batch").lean()
        .then((list) => list.filter((b) => batches.includes(String(b.batch || "").toLowerCase())))
    : [];
  const scheduleCourseIds = [...bundles, ...sourceBundles].map((c) => c._id);
  const schedules = await ClassSchedule.find({ course: { $in: scheduleCourseIds }, active: true }).lean();
  const scheduleOf = new Map(schedules.map((s) => [String(s.course), s]));
  const batchOf = new Map(sourceBundles.map((b) => [String(b._id), String(b.batch || "").toLowerCase()]));

  const withDays = (slot, s) => ({
    start: slot.start,
    end: slot.end,
    subject: slot.subject || "",
    type: slot.type || "class",
    // Doubt sessions are held on Saturday only, also for rows saved before that rule.
    days: slot.type === "doubt" ? [6] : sortDays(slot.days?.length ? slot.days : s.days || []),
  });
  const pack = (course, slots, note) => {
    const days = sortDays([...new Set(slots.flatMap((x) => x.days))]);
    return {
      courseId: String(course._id),
      courseTitle: course.title,
      batch: course.batch || "",
      subjects: course.courseType === "bundle" ? course.bundledSubjects || [] : [course.subject],
      days,
      slots: slots.sort(byStart),
      note: note || "",
    };
  };

  const out = [];

  for (const c of bundles) {
    const s = scheduleOf.get(String(c._id));
    if (!s) continue;
    // Only classes of subjects the course actually has.
    const subjects = c.bundledSubjects || [];
    const fits = (x) => !subjects.length || subjects.includes(x.subject) || (x.type === "doubt" && !x.subject);
    const slots = (s.slots || []).filter(fits).map((x) => withDays(x, s)).filter((x) => x.days.length);
    if (slots.length) out.push(pack(c, slots, s.note));
  }

  for (const c of singles) {
    const batch = String(c.batch || "").toLowerCase();
    const seen = new Set();
    const slots = [];
    let note = "";
    for (const s of schedules) {
      if (batchOf.get(String(s.course)) !== batch) continue;
      for (const x of s.slots || []) {
        // Its own subject's classes and doubt sessions; general doubt
        // sessions belong to the Pro batch.
        if (!x.subject || !matchSubject(x.subject, [c.subject])) continue;
        const slot = { ...withDays(x, s), subject: c.subject };
        if (!slot.days.length) continue;
        const key = `${slot.type}|${slot.start}|${slot.end}|${slot.days.join(",")}`;
        if (seen.has(key)) continue; // English 11:00 is in both Class 12 batches
        seen.add(key);
        slots.push(slot);
        note = note || s.note;
      }
    }
    if (slots.length) out.push(pack(c, slots, note));
  }

  // Teachers' online classes of the next two weeks, with the link only when
  // this student is allowed in (same rule as the Live tab).
  if (out.length) {
    try {
      await closePastLiveClasses();
      const today = todayInIndia();
      const until = todayInIndia(new Date(Date.now() + 14 * 86400000));
      const [classes, access] = await Promise.all([
        LiveClass.find({ date: { $gte: today, $lte: until } })
          .select("title teacher subject batch date time duration status streamLink course courses")
          .lean(),
        getStudentAccess(studentId),
      ]);
      const open = classes.filter((cls) => isClassUnlocked(cls, access));
      for (const sch of out) {
        sch.live = open
          .filter((cls) => {
            const linked = linkedCourseIds(cls);
            if (linked.length) return linked.includes(sch.courseId) || isForBatch(cls, sch);
            return isForBatch(cls, sch);
          })
          .map((cls) => ({
            _id: String(cls._id),
            title: cls.title,
            teacher: cls.teacher,
            subject: cls.subject,
            date: cls.date,
            time: cls.time,
            duration: cls.duration || "",
            status: cls.status,
            streamLink: cls.streamLink,
          }));
      }
    } catch (err) {
      console.error("class-schedule live classes:", err.message);
    }
  }

  return res.status(200).json({ success: true, schedules: out });
}

// A class of this course's batch in one of its subjects.
function isForBatch(cls, sch) {
  return (
    String(cls.batch || "").toLowerCase() === String(sch.batch || "").toLowerCase() &&
    !!matchSubject(cls.subject, sch.subjects)
  );
}
