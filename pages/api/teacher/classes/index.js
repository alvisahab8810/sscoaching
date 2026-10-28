import dbConnect from "@/lib/dbConnect";
import LiveClass from "@/models/LiveClassModel";
import Teacher from "@/models/Teacher";
import { requireTeacherApi, logTeacherActivity } from "@/lib/teacherAuth";

/**
 * A teacher's own online classes.
 *
 * This is a separate route from /api/onlineClasses on purpose: that one
 * serves students and the admin dashboard and is left untouched. Classes
 * created here land in the same collection, so they show up in the app
 * and the admin screens exactly like admin-created ones.
 */
export default async function handler(req, res) {
  const session = requireTeacherApi(req, res);
  if (!session) return;

  await dbConnect();

  if (req.method === "GET") {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = { createdByTeacher: session.id };
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      LiveClass.find(filter)
        .populate("course", "title subject batch")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      LiveClass.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  }

  if (req.method === "POST") {
    // A deactivated teacher keeps read access to their record but can no
    // longer schedule anything.
    const teacher = await Teacher.findById(session.id).select("status name").lean();
    if (!teacher || teacher.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Your account is deactivated. Contact the administrator.",
      });
    }

    const {
      title, subject, chapter, topic, batch, date, time,
      duration, streamLink, description, status, course,
    } = req.body;

    if (!title || !subject || !batch || !date || !time || !streamLink) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    const liveClass = await LiveClass.create({
      title,
      // The teacher name on the class is always the signed-in teacher, so
      // nobody can schedule a class under somebody else's name.
      teacher: session.name,
      subject, chapter, topic, batch, date, time, duration,
      streamLink, description,
      status: status || "upcoming",
      course: course || null,
      createdByTeacher: session.id,
      createdByName: session.name,
      createdByRole: "teacher",
    });

    await logTeacherActivity(req, {
      feature: "online-classes",
      action: "create",
      entityId: liveClass._id,
      entityType: "LiveClass",
      description: `Scheduled class: "${title}"`,
      after: { title, subject, batch, date, time, status: status || "upcoming" },
    });

    return res.status(201).json({ success: true, message: "Class scheduled successfully", data: liveClass });
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
