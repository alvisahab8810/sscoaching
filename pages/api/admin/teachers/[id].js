import dbConnect from "@/lib/dbConnect";
import Teacher from "@/models/Teacher";
import LiveClass from "@/models/LiveClassModel";
import TeacherActivityLog from "@/models/TeacherActivityLog";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * One teacher, for the admin.
 *
 * GET    -> profile, teaching report, their classes and their activity log
 * PATCH  -> update profile / status / password
 * DELETE -> remove the account (their classes are kept)
 */

function isSuperAdmin(req) {
  try {
    const token = req.cookies?.admin_token;
    if (!token) return false;
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (!isSuperAdmin(req)) return res.status(403).json({ message: "Forbidden" });

  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const teacher = await Teacher.findById(id).lean();
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    const [classes, logs] = await Promise.all([
      LiveClass.find({ createdByTeacher: id })
        .populate("course", "title subject batch")
        .sort({ createdAt: -1 })
        .limit(200)
        .lean(),
      TeacherActivityLog.find({ teacherId: id })
        .sort({ createdAt: -1 })
        .limit(100)
        .lean(),
    ]);

    return res.status(200).json({
      success: true,
      data: teacher,
      report: buildReport(classes),
      classes,
      logs,
    });
  }

  if (req.method === "PATCH") {
    const { name, email, username, phone, subjects, classes, qualification, status, password } = req.body;
    const update = {};

    if (name?.trim()) update.name = name.trim();
    if (phone !== undefined) update.phone = phone?.trim() || "";
    if (qualification !== undefined) update.qualification = qualification?.trim() || "";
    if (Array.isArray(subjects)) update.subjects = subjects.filter(Boolean);
    if (Array.isArray(classes)) update.classes = classes.filter(Boolean);
    if (status === "active" || status === "inactive") update.status = status;

    if (email?.trim()) {
      const cleanEmail = email.toLowerCase().trim();
      const clash = await Teacher.findOne({ email: cleanEmail, _id: { $ne: id } });
      if (clash) return res.status(409).json({ message: "Email already in use" });
      update.email = cleanEmail;
    }

    if (username?.trim()) {
      const cleanUsername = username.trim();
      // Matched case-insensitively, the same way login looks a teacher up,
      // so two accounts can never differ by case alone.
      const clash = await Teacher.findOne({
        username: { $regex: `^${cleanUsername.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" },
        _id: { $ne: id },
      });
      if (clash) return res.status(409).json({ message: "Username already taken" });
      update.username = cleanUsername;
    }

    if (password?.trim()) {
      update.password = password;
      update.passwordHash = await bcrypt.hash(password, 10);
    }

    const teacher = await Teacher.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    return res.status(200).json({ success: true, data: teacher });
  }

  if (req.method === "DELETE") {
    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    // Their classes stay: students may still be watching them, and the
    // record of who took the class should survive the account.
    return res.status(200).json({ success: true });
  }

  return res.status(405).end();
}

/** Totals the admin needs to see at a glance, built from the class list. */
function buildReport(classes) {
  const bySubject = {};
  const byCourse = {};
  const byMonth = {};
  let totalMinutes = 0;

  for (const c of classes) {
    const subject = c.subject || "Unspecified";
    bySubject[subject] = (bySubject[subject] || 0) + 1;

    const courseTitle = c.course?.title || "Not linked to a course";
    byCourse[courseTitle] = (byCourse[courseTitle] || 0) + 1;

    const month = c.date ? String(c.date).slice(0, 7) : "";
    if (month) byMonth[month] = (byMonth[month] || 0) + 1;

    // "duration" is free text, so only read a leading number from it.
    const mins = parseInt(String(c.duration || "").trim(), 10);
    if (!Number.isNaN(mins)) totalMinutes += mins;
  }

  const toSortedList = (obj) =>
    Object.entries(obj)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);

  return {
    totalClasses: classes.length,
    completed: classes.filter((c) => c.status === "completed").length,
    upcoming: classes.filter((c) => c.status === "upcoming").length,
    live: classes.filter((c) => c.status === "live").length,
    totalMinutes,
    bySubject: toSortedList(bySubject),
    byCourse: toSortedList(byCourse),
    byMonth: Object.entries(byMonth)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  };
}
