import dbConnect from "@/lib/dbConnect";
import ClassSchedule from "@/models/ClassSchedule";
import Enrollment from "@/models/EnrollmentModel";
import Course from "@/models/CourseModel";
import { getStudentIdFromReq } from "@/lib/liveClassAccess";

/**
 * GET /api/class-schedule  (student, Bearer token)
 *
 * The weekly timetables of the Pro batches this student has bought. Only
 * bundle courses carry a timetable, and only an active enrollment unlocks
 * it, so a Class 12 Science student sees the Science timing and nothing
 * else. Used by the website dashboard and the app.
 */
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ success: false, message: "Method not allowed" });
  const studentId = getStudentIdFromReq(req);
  if (!studentId) return res.status(401).json({ success: false, message: "Unauthorized" });

  await dbConnect();
  const enrollments = await Enrollment.find({ student: studentId, status: "active" }).select("course").lean();
  const courseIds = enrollments.map((e) => e.course).filter(Boolean);
  if (!courseIds.length) return res.status(200).json({ success: true, schedules: [] });

  const [schedules, courses] = await Promise.all([
    ClassSchedule.find({ course: { $in: courseIds }, active: true }).lean(),
    Course.find({ _id: { $in: courseIds }, courseType: "bundle" }).select("title batch").lean(),
  ]);
  const courseById = new Map(courses.map((c) => [String(c._id), c]));

  const out = schedules
    .filter((s) => courseById.has(String(s.course)) && s.days?.length && s.slots?.length)
    .map((s) => {
      const c = courseById.get(String(s.course));
      return {
        courseId: String(s.course),
        courseTitle: c.title,
        batch: c.batch || "",
        days: [...s.days].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7)),
        slots: [...s.slots].sort((a, b) => a.start.localeCompare(b.start)),
        note: s.note || "",
      };
    });

  return res.status(200).json({ success: true, schedules: out });
}
