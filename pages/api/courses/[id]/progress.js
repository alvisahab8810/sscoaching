// pages/api/courses/[id]/progress.js
// GET  → fetch student's progress for a course
// POST → mark/unmark a lesson complete + save last position
import dbConnect from "@/lib/dbConnect";
import CourseProgress from "@/models/CourseProgress";
import Enrollment from "@/models/EnrollmentModel";
import jwt from "jsonwebtoken";

function getStudent(req) {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "").trim();
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch { return null; }
}

async function isEnrolled(studentId, courseId) {
  // Direct enrollment
  const direct = await Enrollment.findOne({ student: studentId, course: courseId, status: "active" });
  if (direct) return true;
  // Bundle enrollment
  const { default: Course } = await import("@/models/CourseModel");
  const allEnr = await Enrollment.find({ student: studentId, status: "active" }).select("course").lean();
  const ids = allEnr.map(e => String(e.course));
  if (!ids.length) return false;
  const bundle = await Course.findOne({ _id: { $in: ids }, courseType: "bundle", includedCourses: courseId }).select("_id").lean();
  return !!bundle;
}

export default async function handler(req, res) {
  await dbConnect();
  const { id: courseId } = req.query;
  const student = getStudent(req);
  if (!student) return res.status(401).json({ error: "Login required" });

  const enrolled = await isEnrolled(student.id, courseId);
  if (!enrolled) return res.status(403).json({ error: "Not enrolled in this course" });

  /* ── GET — return progress ── */
  if (req.method === "GET") {
    const progress = await CourseProgress.findOne({ student: student.id, course: courseId }).lean();
    return res.status(200).json({
      success: true,
      completedLessons: progress?.completedLessons?.map(String) || [],
      lastLessonId:   progress?.lastLessonId   ? String(progress.lastLessonId)   : null,
      lastChapterIdx: progress?.lastChapterIdx ?? 0,
      lastLessonIdx:  progress?.lastLessonIdx  ?? 0,
    });
  }

  /* ── POST — update progress ── */
  if (req.method === "POST") {
    const { lessonId, chapterIdx, lessonIdx, action } = req.body;
    // action: "complete" | "uncomplete" | "position"

    const update = {};
    const arrayOps = {};

    if (lessonId) {
      if (action === "complete") {
        arrayOps.$addToSet = { completedLessons: lessonId };
      } else if (action === "uncomplete") {
        arrayOps.$pull = { completedLessons: lessonId };
      }
      // Always update last position when a lesson is opened
      update.lastLessonId   = lessonId;
      update.lastChapterIdx = chapterIdx ?? 0;
      update.lastLessonIdx  = lessonIdx  ?? 0;
    }

    await CourseProgress.findOneAndUpdate(
      { student: student.id, course: courseId },
      { ...arrayOps, $set: update },
      { upsert: true, new: true }
    );

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
