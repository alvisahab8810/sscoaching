import dbConnect from "@/lib/dbConnect";
import LiveClass from "@/models/LiveClassModel";
import { requireTeacherApi, logTeacherActivity } from "@/lib/teacherAuth";

/** Update or remove one of the signed-in teacher's own classes. */
export default async function handler(req, res) {
  const session = requireTeacherApi(req, res);
  if (!session) return;

  await dbConnect();
  const { id } = req.query;

  // Scoping the lookup by createdByTeacher means a teacher can never
  // reach a class scheduled by the admin or by another teacher.
  const existing = await LiveClass.findOne({ _id: id, createdByTeacher: session.id });
  if (!existing) {
    return res.status(404).json({ success: false, message: "Class not found" });
  }

  if (req.method === "GET") {
    return res.status(200).json({ success: true, data: existing });
  }

  if (req.method === "PUT" || req.method === "PATCH") {
    const before = {
      title: existing.title,
      subject: existing.subject,
      batch: existing.batch,
      date: existing.date,
      time: existing.time,
      status: existing.status,
    };

    const allowed = [
      "title", "subject", "chapter", "topic", "batch", "date", "time",
      "duration", "streamLink", "description", "status", "course",
    ];
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        existing[key] = key === "course" ? req.body[key] || null : req.body[key];
      }
    }

    await existing.save();

    await logTeacherActivity(req, {
      feature: "online-classes",
      action: "update",
      entityId: existing._id,
      entityType: "LiveClass",
      description: `Updated class: "${existing.title}"`,
      before,
      after: {
        title: existing.title,
        subject: existing.subject,
        batch: existing.batch,
        date: existing.date,
        time: existing.time,
        status: existing.status,
      },
    });

    return res.status(200).json({ success: true, data: existing });
  }

  if (req.method === "DELETE") {
    await LiveClass.deleteOne({ _id: id, createdByTeacher: session.id });

    await logTeacherActivity(req, {
      feature: "online-classes",
      action: "delete",
      entityId: id,
      entityType: "LiveClass",
      description: `Deleted class: "${existing.title}"`,
      before: {
        title: existing.title,
        subject: existing.subject,
        batch: existing.batch,
        date: existing.date,
        time: existing.time,
      },
    });

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
