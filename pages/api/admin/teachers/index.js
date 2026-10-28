import dbConnect from "@/lib/dbConnect";
import Teacher from "@/models/Teacher";
import LiveClass from "@/models/LiveClassModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

/**
 * Teacher accounts, managed by the super admin.
 *
 * GET  -> the teacher list, each row carrying its class counts so the
 *         admin table can show teaching activity without a second call.
 * POST -> create a teacher and email them their credentials.
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

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER || "contact@sscoaching.in",
      pass: process.env.EMAIL_PASS,
    },
  });
}

function buildInviteEmail({ name, username, password, loginUrl }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f5ff;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:520px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(68,65,229,0.1);">
    <div style="background:linear-gradient(135deg,#0f1f3d,#1b1870);padding:28px 36px;text-align:center;">
      <div style="color:#fff;font-size:22px;font-weight:900;">SS Coaching</div>
      <div style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:4px;">Teacher Portal Access</div>
    </div>
    <div style="padding:32px 36px;">
      <p style="font-size:16px;font-weight:700;color:#0f1f3d;margin-bottom:6px;">Hi ${name},</p>
      <p style="color:#6b7a99;font-size:14px;margin-bottom:24px;">
        You have been added as a <strong>Teacher</strong> on the SS Coaching portal. Use the credentials below to sign in and schedule your online classes.
      </p>

      <div style="background:#f8f9ff;border:2px solid #e8eaf5;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
        <div style="margin-bottom:14px;">
          <div style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Username</div>
          <div style="font-size:18px;font-weight:800;color:#5641CE;font-family:monospace;letter-spacing:0.04em;">${username}</div>
        </div>
        <div style="margin-bottom:14px;">
          <div style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Password</div>
          <div style="font-size:18px;font-weight:800;color:#0f1f3d;font-family:monospace;letter-spacing:0.08em;">${password}</div>
        </div>
        <div>
          <div style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Login URL</div>
          <a href="${loginUrl}" style="font-size:14px;color:#5641CE;font-weight:600;word-break:break-all;">${loginUrl}</a>
        </div>
      </div>

      <a href="${loginUrl}" style="display:block;text-align:center;background:linear-gradient(135deg,#5641CE,#4430b5);color:#fff;text-decoration:none;padding:14px 24px;border-radius:10px;font-weight:700;font-size:15px;margin-bottom:20px;">
        Login to Teacher Portal &rarr;
      </a>

      <p style="color:#e53e3e;font-size:12px;background:#fff5f5;border:1px solid #fed7d7;border-radius:8px;padding:10px 14px;margin:0;">
        Keep these credentials private. Do not share them with anyone. Contact the administrator if you did not expect this email.
      </p>
    </div>
    <div style="background:#f8f9ff;padding:14px 36px;text-align:center;border-top:1px solid #e8eaf5;">
      <p style="color:#a0aabe;font-size:11px;margin:0;">SS Coaching Admin System &bull; sscoaching.in</p>
    </div>
  </div>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (!isSuperAdmin(req)) return res.status(403).json({ message: "Forbidden" });

  await dbConnect();

  if (req.method === "GET") {
    const { status, search, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [teachers, total] = await Promise.all([
      Teacher.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
      Teacher.countDocuments(filter),
    ]);

    // One grouped count instead of a query per teacher, so the list stays
    // fast as the teacher roster grows.
    const counts = await LiveClass.aggregate([
      { $match: { createdByTeacher: { $ne: null } } },
      {
        $group: {
          _id: "$createdByTeacher",
          totalClasses: { $sum: 1 },
          completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
          upcoming: { $sum: { $cond: [{ $eq: ["$status", "upcoming"] }, 1, 0] } },
          lastClassAt: { $max: "$createdAt" },
        },
      },
    ]);

    const countMap = new Map(counts.map((c) => [String(c._id), c]));

    const data = teachers.map((t) => {
      const c = countMap.get(String(t._id));
      return {
        ...t,
        totalClasses: c?.totalClasses || 0,
        completedClasses: c?.completed || 0,
        upcomingClasses: c?.upcoming || 0,
        lastClassAt: c?.lastClassAt || null,
      };
    });

    return res.status(200).json({
      success: true,
      data,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  }

  if (req.method === "POST") {
    const { name, email, username, password, phone, subjects, qualification, status } = req.body;

    if (!name?.trim() || !email?.trim() || !username?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Name, email, username, and password are required" });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanUsername = username.trim();

    const existing = await Teacher.findOne({
      $or: [{ email: cleanEmail }, { username: cleanUsername }],
    });
    if (existing) {
      if (existing.email === cleanEmail) {
        return res.status(409).json({ message: "Email already in use" });
      }
      return res.status(409).json({ message: "Username already taken" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      name: name.trim(),
      email: cleanEmail,
      username: cleanUsername,
      password,
      passwordHash,
      phone: phone?.trim() || "",
      subjects: Array.isArray(subjects) ? subjects.filter(Boolean) : [],
      qualification: qualification?.trim() || "",
      status: status || "active",
    });

    const origin = req.headers.origin || `https://${req.headers.host}`;
    const loginUrl = `${origin}/dashboard/teacher/login`;

    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"SS Coaching" <${process.env.EMAIL_USER || "contact@sscoaching.in"}>`,
        to: teacher.email,
        subject: "Your SS Coaching Teacher Portal Access",
        html: buildInviteEmail({
          name: teacher.name,
          username: teacher.username,
          password,
          loginUrl,
        }),
      });
    } catch (err) {
      console.error("Teacher invite email failed:", err.message);
      // The account exists either way -- the admin can resend from the list.
      return res.status(201).json({
        success: true,
        data: teacher,
        emailSent: false,
        emailError: err.message,
      });
    }

    return res.status(201).json({ success: true, data: teacher, emailSent: true });
  }

  return res.status(405).end();
}
