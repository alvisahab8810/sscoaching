import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";
import AdminOTP from "@/models/AdminOTP";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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

function buildOTPEmail(otp) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f5ff;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:480px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(68,65,229,0.1);">
    <div style="background:linear-gradient(135deg,#0f1f3d,#1b1870);padding:28px 36px;text-align:center;">
      <div style="color:#fff;font-size:22px;font-weight:900;">SS Coaching</div>
      <div style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:4px;">Admin Security Alert</div>
    </div>
    <div style="padding:32px 36px;">
      <p style="font-size:16px;font-weight:700;color:#0f1f3d;margin-bottom:8px;">Admin Login OTP</p>
      <p style="color:#6b7a99;font-size:14px;margin-bottom:24px;">Someone is attempting to log in to the SS Coaching admin dashboard. Use the OTP below to complete login.</p>
      <div style="background:#f8f9ff;border:2px dashed #4441e5;border-radius:10px;padding:20px;text-align:center;margin-bottom:24px;">
        <div style="font-size:36px;font-weight:900;letter-spacing:8px;color:#4441e5;">${otp}</div>
        <div style="color:#8491a8;font-size:12px;margin-top:8px;">Valid for 5 minutes only</div>
      </div>
      <p style="color:#e53e3e;font-size:13px;">If you did not request this, someone may have your admin credentials. Change your password immediately.</p>
    </div>
    <div style="background:#f8f9ff;padding:14px 36px;text-align:center;border-top:1px solid #e8eaf5;">
      <p style="color:#a0aabe;font-size:11px;margin:0;">SS Coaching Admin System • sscoaching.in</p>
    </div>
  </div>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();

  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid email or password" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ message: "Invalid email or password" });

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // Replace any existing OTP for this admin
  await AdminOTP.deleteMany({ email: admin.email });
  await AdminOTP.create({ email: admin.email, otp, expiresAt });

  // Send OTP to ishan@viralon.in, riyaz@viralon.in and anurag@viralon.in
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"SS Coaching Admin" <info@viralon.in>`,
      to: "ishan@viralon.in, riyaz@viralon.in, anurag@viralon.in",
      subject: `${otp} — Admin Login OTP (SS Coaching)`,
      html: buildOTPEmail(otp),
    });
  } catch (err) {
    console.error("OTP email failed:", err.message, err.code);
    // TEMP: showing full error in all environments to diagnose a live SMTP failure — revert to
    // production-hidden detail once the root cause is found (see NODE_ENV check we removed here).
    return res.status(500).json({ message: `Failed to send OTP. Please try again. (${err.code || ""} ${err.message})` });
  }

  // Issue a short-lived pending token (10 min) — no dashboard access, only for OTP step
  const pendingToken = jwt.sign(
    { email: admin.email, purpose: "otp-pending" },
    process.env.JWT_SECRET,
    { expiresIn: "10m" }
  );

  res.status(200).json({ pendingToken });
}
