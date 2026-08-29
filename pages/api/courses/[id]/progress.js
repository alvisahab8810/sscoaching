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
  // Direct enrollment only. A bundle that includes this course does NOT
  // grant access to the standalone course's own progress record — that
  // content is only reachable through the bundle's own player (which always
  // tracks progress against the bundle's own courseId, never this one). See
  // pages/api/courses/index.js and [id].js for the matching listing/detail
  // rule.
  const direct = await Enrollment.findOne({ student: studentId, course: courseId, status: "active" });
  return !!direct;
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
      completedMaterials: progress?.completedMaterials?.map(String) || [],
      lastLessonId:   progress?.lastLessonId   ? String(progress.lastLessonId)   : null,
      lastChapterIdx: progress?.lastChapterIdx ?? 0,
      lastLessonIdx:  progress?.lastLessonIdx  ?? 0,
    });
  }

  /* ── POST — update progress ── */
  if (req.method === "POST") {
    const { lessonId, materialId, chapterIdx, lessonIdx, action } = req.body;
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
    } else if (materialId) {
      // Study material (book/TMA/assignment/sample paper/note) opened —
      // counts toward progress the same way a completed lesson does.
      if (action === "complete") {
        arrayOps.$addToSet = { completedMaterials: materialId };
      } else if (action === "uncomplete") {
        arrayOps.$pull = { completedMaterials: materialId };
      }
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
