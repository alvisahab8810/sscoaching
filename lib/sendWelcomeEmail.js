// lib/sendWelcomeEmail.js
// Sends a welcome email to a new student after registration

import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER || "contact@sscoaching.in";

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: EMAIL_USER, pass: process.env.EMAIL_PASS },
    tls: { rejectUnauthorized: false },
  });
}

function buildWelcomeHTML({ name, email }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f5ff;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(68,65,229,0.1);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0f1f3d,#1b1870);padding:28px 36px;text-align:center;">
      <img src="https://sscoaching.in/assets/images/logo.png" alt="SS Coaching" style="height:56px;width:auto;margin-bottom:8px;display:block;margin-left:auto;margin-right:auto;"/>
      <div style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:2px;">Rise From Failure • Estd. 2001</div>
    </div>

    <!-- Body -->
    <div style="padding:32px 36px;">
      <div style="font-size:24px;font-weight:900;color:#0f1f3d;margin-bottom:8px;">
        Welcome to SS Coaching! 🎉
      </div>
      <p style="color:#6b7a99;font-size:15px;line-height:1.7;margin-bottom:24px;">
        Hi <strong style="color:#0f1f3d;">${name}</strong>,<br/>
        Your account has been created successfully. We're excited to have you on board!
      </p>

      <!-- Info card -->
      <div style="background:#f8f9ff;border:1.5px solid #e2e5f8;border-radius:10px;padding:20px 22px;margin-bottom:24px;border-left:4px solid #4441e5;">
        <div style="font-size:12px;font-weight:800;color:#4441e5;margin-bottom:14px;text-transform:uppercase;letter-spacing:0.05em;">Your Account Details</div>
        <div style="margin-bottom:12px;">
          <div style="font-size:11px;color:#8491a8;font-weight:600;margin-bottom:3px;">Name</div>
          <div style="font-size:14px;font-weight:700;color:#0f1f3d;">${name}</div>
        </div>
        <div>
          <div style="font-size:11px;color:#8491a8;font-weight:600;margin-bottom:3px;">Email</div>
          <div style="font-size:14px;font-weight:700;color:#0f1f3d;">${email}</div>
        </div>
      </div>

      <!-- What's next -->
      <div style="margin-bottom:24px;">
        <div style="font-size:14px;font-weight:800;color:#0f1f3d;margin-bottom:12px;">What's next?</div>
        ${[
          ["🎓", "Explore Courses", "Browse our complete catalog of NIOS courses for Class 9–12."],
          ["📡", "Live Classes", "Join live online sessions with expert teachers."],
          ["📄", "Study Materials", "Download PDFs, assignments, and sample papers."],
          ["🏆", "Track Progress", "Monitor your learning journey from your dashboard."],
        ].map(([icon, title, desc]) => `
          <div style="display:flex;gap:12px;margin-bottom:12px;align-items:flex-start;">
            <div style="font-size:20px;flex-shrink:0;">${icon}</div>
            <div>
              <div style="font-size:13px;font-weight:700;color:#0f1f3d;">${title}</div>
              <div style="font-size:12px;color:#6b7a99;margin-top:2px;">${desc}</div>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin-bottom:28px;">
        <a href="https://sscoaching.in/student/dashboard"
          style="display:inline-block;background:linear-gradient(135deg,#4441e5,#6b68ff);color:#fff;text-decoration:none;padding:14px 36px;border-radius:9px;font-size:14px;font-weight:700;">
          Go to My Dashboard →
        </a>
      </div>

      <p style="color:#a0aabe;font-size:12px;text-align:center;">
        Need help? Email us at <a href="mailto:contact@sscoaching.in" style="color:#4441e5;">contact@sscoaching.in</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#f8f9ff;padding:16px 36px;text-align:center;border-top:1px solid #e8eaf5;">
      <p style="color:#a0aabe;font-size:11px;margin:0;">
        SS Coaching, Lucknow, Uttar Pradesh • sscoaching.in
      </p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * sendWelcomeEmail({ name, email })
 * Non-fatal — call without await or wrap in try/catch
 */
export async function sendWelcomeEmail({ name, email }) {
  if (!email) return { success: false, error: "No email provided" };
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from:    `"SS Coaching" <${EMAIL_USER}>`,
      to:      email,
      subject: `Welcome to SS Coaching, ${name}! 🎓`,
      html:    buildWelcomeHTML({ name, email }),
    });
    return { success: true };
  } catch (err) {
    console.error("sendWelcomeEmail error:", err.message);
    return { success: false, error: err.message };
  }
}
