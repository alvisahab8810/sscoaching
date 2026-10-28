import dbConnect from "@/lib/dbConnect";
import Teacher from "@/models/Teacher";
import LiveClass from "@/models/LiveClassModel";
import { requireTeacherApi } from "@/lib/teacherAuth";

/**
 * The signed-in teacher's own profile and teaching report -- the same
 * figures the admin sees about them, so there are no surprises.
 */
export default async function handler(req, res) {
  const session = requireTeacherApi(req, res);
  if (!session) return;

  await dbConnect();

  const teacher = await Teacher.findById(session.id)
    .select("-password -passwordHash")
    .lean();
  if (!teacher) return res.status(404).json({ success: false, message: "Teacher not found" });

  const classes = await LiveClass.find({ createdByTeacher: session.id })
    .populate("course", "title subject batch")
    .sort({ createdAt: -1 })
    .lean();

  const bySubject = {};
  const byCourse = {};
  let totalMinutes = 0;

  for (const c of classes) {
    const subject = c.subject || "Unspecified";
    bySubject[subject] = (bySubject[subject] || 0) + 1;

    const courseTitle = c.course?.title || "Not linked to a course";
    byCourse[courseTitle] = (byCourse[courseTitle] || 0) + 1;

    const mins = parseInt(String(c.duration || "").trim(), 10);
    if (!Number.isNaN(mins)) totalMinutes += mins;
  }

  const toSortedList = (obj) =>
    Object.entries(obj)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);

  return res.status(200).json({
    success: true,
    data: teacher,
    report: {
      totalClasses: classes.length,
      completed: classes.filter((c) => c.status === "completed").length,
      upcoming: classes.filter((c) => c.status === "upcoming").length,
      live: classes.filter((c) => c.status === "live").length,
      totalMinutes,
      bySubject: toSortedList(bySubject),
      byCourse: toSortedList(byCourse),
    },
  });
}
