import dbConnect from "@/lib/dbConnect";
import ClassSchedule from "@/models/ClassSchedule";
import Course from "@/models/CourseModel";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { logActivity } from "@/lib/logActivity";

/**
 * Class timetables of the Pro batches (bundle courses).
 *
 * GET                    every bundle course with its timetable, if any
 * PUT { courseId, active, days, slots, note }   save one course's timetable
 */
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

export default async function handler(req, res) {
  const admin = requireAdminApi(req, "courses");
  if (!admin) return res.status(401).json({ success: false, message: "Unauthorized" });
  await dbConnect();

  if (req.method === "GET") {
    const [courses, schedules] = await Promise.all([
      Course.find({ courseType: "bundle" }).select("title batch status").sort({ title: 1 }).lean(),
      ClassSchedule.find({}).lean(),
    ]);
    const byCourse = new Map(schedules.map((s) => [String(s.course), s]));
    return res.status(200).json({
      success: true,
      courses: courses.map((c) => {
        const s = byCourse.get(String(c._id));
        return {
          _id: String(c._id),
          title: c.title,
          batch: c.batch || "",
          status: c.status,
          schedule: s ? { active: s.active, days: s.days, slots: s.slots, note: s.note, updatedAt: s.updatedAt } : null,
        };
      }),
    });
  }

  if (req.method === "PUT") {
    const { courseId, active = true, days = [], slots = [], note = "" } = req.body || {};
    const course = courseId && (await Course.findById(courseId).select("title courseType").lean().catch(() => null));
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });
    if (course.courseType !== "bundle")
      return res.status(400).json({ success: false, message: "Schedule can be set only on Pro batch (bundle) courses" });

    const cleanDays = [...new Set((Array.isArray(days) ? days : []).map(Number))].filter((d) => Number.isInteger(d) && d >= 0 && d <= 6);
    const cleanSlots = [];
    for (const [i, s] of (Array.isArray(slots) ? slots : []).entries()) {
      const start = String(s?.start || "").trim();
      const end = String(s?.end || "").trim();
      const subject = String(s?.subject || "").trim();
      if (!TIME.test(start) || !TIME.test(end) || !subject)
        return res.status(400).json({ success: false, message: `Row ${i + 1}: enter start time, end time and subject` });
      if (end <= start)
        return res.status(400).json({ success: false, message: `Row ${i + 1}: end time must be after start time` });
      cleanSlots.push({ start, end, subject: subject.slice(0, 80) });
    }
    if (active && (!cleanDays.length || !cleanSlots.length))
      return res.status(400).json({ success: false, message: "Pick at least one day and add at least one class" });
    cleanSlots.sort((a, b) => a.start.localeCompare(b.start));
    for (let i = 1; i < cleanSlots.length; i++) {
      if (cleanSlots[i].start < cleanSlots[i - 1].end)
        return res.status(400).json({ success: false, message: `${cleanSlots[i - 1].subject} and ${cleanSlots[i].subject} overlap` });
    }

    const saved = await ClassSchedule.findOneAndUpdate(
      { course: courseId },
      { $set: { active: !!active, days: cleanDays, slots: cleanSlots, note: String(note || "").slice(0, 500) } },
      { upsert: true, new: true }
    ).lean();

    logActivity(req, {
      feature: "courses", action: "update", entityId: courseId, entityType: "Course",
      description: `Updated class schedule of ${course.title}`,
    });
    return res.status(200).json({ success: true, schedule: saved });
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
