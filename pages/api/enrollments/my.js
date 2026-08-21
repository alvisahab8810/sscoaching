import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/models/EnrollmentModel";
import CourseProgress from "@/models/CourseProgress";
import jwt from "jsonwebtoken";

// Bundles keep their lessons under per-subject subjectContents, subject
// courses keep them directly under chapters — same distinction the player
// screens use.
function countLessons(course) {
  if (!course) return 0;
  if (course.courseType === "bundle") {
    return (course.subjectContents || []).reduce(
      (a, sc) => a + (sc.chapters || []).reduce((b, c) => b + (c.lessons?.length || 0), 0),
      0
    );
  }
  return (course.chapters || []).reduce((a, c) => a + (c.lessons?.length || 0), 0);
}

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  await dbConnect();

  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const enrollments = await Enrollment.find({ student: id })
      .populate({ path: "course", select: "title subject featureImage price batch isFree status courseType bundledSubjects chapters subjectContents" })
      .sort({ createdAt: -1 })
      .lean();

    // Attach a real, per-course watch progress % — nothing previously
    // computed or attached this, so the app's My Courses progress bar
    // always rendered stuck at 0% no matter how much was watched.
    const courseIds = enrollments.map(e => e.course?._id).filter(Boolean);
    const progressDocs = courseIds.length
      ? await CourseProgress.find({ student: id, course: { $in: courseIds } }).select("course completedLessons").lean()
      : [];
    const progressByCourse = new Map(progressDocs.map(p => [String(p.course), p]));

    const data = enrollments.map(e => {
      const course = e.course || {};
      const total = countLessons(course);
      const done = progressByCourse.get(String(course._id))?.completedLessons?.length || 0;
      const progress = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0;
      // chapters/subjectContents were only populated to count lessons above —
      // strip them back out so the response payload stays as light as before.
      const { chapters, subjectContents, ...courseRest } = course;
      return { ...e, course: courseRest, progress };
    });

    return res.status(200).json({ success: true, data });
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}
