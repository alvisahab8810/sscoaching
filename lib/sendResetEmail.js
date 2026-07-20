import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER || "info@viralon.in";

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    secure: false,
    auth: { user: EMAIL_USER, pass: process.env.EMAIL_PASS },
    tls: { rejectUnauthorized: false },
  });
}

export async function sendResetEmail({ name, email, code }) {
  if (!email) return { success: false, error: "No email" };
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"SS Coaching" <${EMAIL_USER}>`,
      to: email,
      subject: `${code} — Reset your SS Coaching password`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f5ff;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:480px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(68,65,229,0.1);">
    <div style="background:linear-gradient(135deg,#0f1f3d,#1b1870);padding:24px 36px;text-align:center;">
      <img src="https://sscoaching.in/assets/images/logo.png" alt="SS Coaching" style="height:50px;width:auto;display:block;margin:0 auto 6px;"/>
      <div style="color:rgba(255,255,255,0.45);font-size:11px;">Rise From Failure • Estd. 2001</div>
    </div>
    <div style="padding:32px 36px;text-align:center;">
      <div style="font-size:18px;font-weight:800;color:#0f1f3d;margin-bottom:6px;">Reset Your Password</div>
      <p style="color:#6b7a99;font-size:14px;margin-bottom:28px;">
        Hi <strong style="color:#0f1f3d;">${name || "Student"}</strong>, use the code below to reset your password.<br/>
        This code is valid for <strong>15 minutes</strong>.
      </p>
      <div style="background:#f0eeff;border:2px dashed #a78bfa;border-radius:12px;padding:20px 32px;display:inline-block;margin-bottom:24px;">
        <div style="font-size:38px;font-weight:900;color:#702DFF;letter-spacing:10px;font-family:monospace;">${code}</div>
      </div>
      <p style="color:#9ca3af;font-size:12px;margin:0;">If you did not request a password reset, you can safely ignore this email.</p>
    </div>
    <div style="background:#f8f9ff;padding:14px 36px;text-align:center;border-top:1px solid #e8eaf5;">
      <p style="color:#a0aabe;font-size:11px;margin:0;">SS Coaching, Lucknow, Uttar Pradesh • sscoaching.in</p>
    </div>
  </div>
</body>
</html>`,
    });
    return { success: true };
  } catch (err) {
    console.error("sendResetEmail error:", err.message);
    return { success: false, error: err.message };
  }
}
