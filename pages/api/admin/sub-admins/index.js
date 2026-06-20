import dbConnect from "@/lib/dbConnect";
import SubAdmin from "@/models/SubAdmin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: "info@viralon.in",
      pass: process.env.EMAIL_PASS,
    },
  });
}

function buildCredentialsEmail({ name, username, password, loginUrl }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f5ff;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:520px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(68,65,229,0.1);">
    <div style="background:linear-gradient(135deg,#0f1f3d,#1b1870);padding:28px 36px;text-align:center;">
      <div style="color:#fff;font-size:22px;font-weight:900;">SS Coaching</div>
      <div style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:4px;">Staff Portal Access</div>
    </div>
    <div style="padding:32px 36px;">
      <p style="font-size:16px;font-weight:700;color:#0f1f3d;margin-bottom:6px;">Hi ${name},</p>
      <p style="color:#6b7a99;font-size:14px;margin-bottom:24px;">
        You have been added as a <strong>Sub-Admin</strong> on the SS Coaching portal. Use the credentials below to log in to your staff account.
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
        Login to Staff Portal →
      </a>

      <p style="color:#e53e3e;font-size:12px;background:#fff5f5;border:1px solid #fed7d7;border-radius:8px;padding:10px 14px;margin:0;">
        🔒 Keep these credentials private. Do not share them with anyone. Contact the administrator if you did not expect this email.
      </p>
    </div>
    <div style="background:#f8f9ff;padding:14px 36px;text-align:center;border-top:1px solid #e8eaf5;">
      <p style="color:#a0aabe;font-size:11px;margin:0;">SS Coaching Admin System • sscoaching.in</p>
    </div>
  </div>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (!isSuperAdmin(req)) return res.status(403).json({ message: "Forbidden" });

  await dbConnect();

  if (req.method === "GET") {
    const { status, search, page = 1, limit = 20 } = req.query;
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
    const [subAdmins, total] = await Promise.all([
      SubAdmin.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
      SubAdmin.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: subAdmins,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  }

  if (req.method === "POST") {
    const { name, email, username, password, permissions, status } = req.body;

    if (!name?.trim() || !email?.trim() || !username?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Name, email, username, and password are required" });
    }

    const existing = await SubAdmin.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { username: username.trim() }],
    });
    if (existing) {
      if (existing.email === email.toLowerCase().trim()) {
        return res.status(409).json({ message: "Email already in use" });
      }
      return res.status(409).json({ message: "Username already taken" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const subAdmin = await SubAdmin.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      username: username.trim(),
      password,
      passwordHash,
      permissions: Array.isArray(permissions) ? permissions : [],
      status: status || "active",
    });

    // Send credentials email to sub-admin
    const origin = req.headers.origin || `https://${req.headers.host}`;
    const loginUrl = `${origin}/dashboard/subadmin/login`;

    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"SS Coaching Admin" <info@viralon.in>`,
        to: subAdmin.email,
        subject: `Your SS Coaching Staff Portal Access`,
        html: buildCredentialsEmail({ name: subAdmin.name, username: subAdmin.username, password, loginUrl }),
      });
    } catch (err) {
      console.error("Credentials email failed:", err.message);
      // Still return success — account was created; email failure is non-fatal
      return res.status(201).json({ success: true, data: subAdmin, emailSent: false, emailError: err.message });
    }

    return res.status(201).json({ success: true, data: subAdmin, emailSent: true });
  }

  return res.status(405).end();
}
