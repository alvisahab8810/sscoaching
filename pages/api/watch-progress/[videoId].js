// pages/api/watch-progress/[videoId].js
// "Continue Watching" — per-video playback position tracking.
// Separate from CourseProgress (lesson-level completion / last-opened lesson).
// GET  → fetch saved watchedTime/duration/watchPercentage for a video
// POST → upsert watchedTime/duration (called every ~5s while playing)
import dbConnect from "@/lib/dbConnect";
import WatchProgress from "@/models/WatchProgress";
import Enrollment from "@/models/EnrollmentModel";
import jwt from "jsonwebtoken";

function getStudent(req) {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "").trim();
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch { return null; }
}

async function isEnrolled(studentId, courseId) {
  const direct = await Enrollment.findOne({ student: studentId, course: courseId, status: "active" });
  if (direct) return true;
  const { default: Course } = await import("@/models/CourseModel");
  const allEnr = await Enrollment.find({ student: studentId, status: "active" }).select("course").lean();
  const ids = allEnr.map(e => String(e.course));
  if (!ids.length) return false;
  const bundle = await Course.findOne({ _id: { $in: ids }, courseType: "bundle", includedCourses: courseId }).select("_id").lean();
  return !!bundle;
}

export default async function handler(req, res) {
  await dbConnect();
  const { videoId } = req.query;
  const student = getStudent(req);
  if (!student) return res.status(401).json({ error: "Login required" });

  const courseId = req.method === "GET" ? req.query.courseId : req.body.courseId;
  if (!courseId) return res.status(400).json({ error: "courseId required" });

  const enrolled = await isEnrolled(student.id, courseId);
  if (!enrolled) return res.status(403).json({ error: "Not enrolled in this course" });

  /* ── GET — return saved watch progress ── */
  if (req.method === "GET") {
    const progress = await WatchProgress.findOne({ userId: student.id, videoId }).lean();
    return res.status(200).json({
      success: true,
      watchedTime: progress?.watchedTime || 0,
      duration: progress?.duration || 0,
      watchPercentage: progress?.watchPercentage || 0,
    });
  }

  /* ── POST — save/update watch progress ── */
  if (req.method === "POST") {
    const watchedTime = Number(req.body.watchedTime) || 0;
    const duration = Number(req.body.duration) || 0;
    const watchPercentage = duration > 0
      ? Math.min(100, Math.round((watchedTime / duration) * 100))
      : 0;

    const progress = await WatchProgress.findOneAndUpdate(
      { userId: student.id, videoId },
      { $set: { courseId, watchedTime, duration, watchPercentage } },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      watchedTime: progress.watchedTime,
      duration: progress.duration,
      watchPercentage: progress.watchPercentage,
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
