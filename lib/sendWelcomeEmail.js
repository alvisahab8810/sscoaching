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
  // Mirrors the invoice email's branding (lib/sendInvoiceEmail.js) — same
  // Inter font, lavender header, purple (#6247FD) accent, bordered card
  // instead of a shadowed one — so every transactional email looks like
  // one system instead of two different designs.
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f4fb;font-family:'Inter','Segoe UI',Arial,sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E5E5F5;">

    <!-- Header -->
    <div style="padding:28px 36px;text-align:center;background:#F5F5FF;border-bottom:1px solid #E5E5F5;">
      <img src="https://sscoaching.in/assets/invoice/logo.svg" alt="SS Coaching" style="height:36px;width:auto;display:block;margin:0 auto;"/>
    </div>

    <!-- Body -->
    <div style="padding:32px 36px;">
      <div style="font-size:20px;font-weight:800;color:#181828;margin-bottom:6px;">
        Welcome to SS Coaching! 🎉
      </div>
      <p style="color:#6b7280;font-size:14px;margin-bottom:24px;line-height:1.6;">
        Hi <strong style="color:#181828;">${name}</strong>, your account has been created successfully. We're excited to have you on board!
      </p>

      <!-- Account details card -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5FF;border-radius:10px;margin-bottom:24px;">
        <tr>
          <td style="padding:20px 22px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:10px;font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#8A8FA3;">Name</td>
                <td style="padding-bottom:10px;font-size:13px;font-weight:700;color:#181828;text-align:right;">${name}</td>
              </tr>
              <tr>
                <td style="font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#8A8FA3;">Email</td>
                <td style="font-size:13px;font-weight:700;color:#6247FD;text-align:right;">${email}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- What's next -->
      <div style="margin-bottom:24px;">
        <div style="font-size:13px;font-weight:800;color:#181828;margin-bottom:12px;">What's next?</div>
        ${[
          ["🎓", "Explore Courses", "Browse our complete catalog of NIOS courses for Class 9–12."],
          ["📡", "Live Classes", "Join live online sessions with expert teachers."],
          ["📄", "Study Materials", "Download PDFs, assignments, and sample papers."],
          ["🏆", "Track Progress", "Monitor your learning journey from your dashboard."],
        ].map(([icon, title, desc]) => `
          <div style="display:flex;gap:12px;margin-bottom:12px;align-items:flex-start;">
            <div style="font-size:20px;flex-shrink:0;">${icon}</div>
            <div>
              <div style="font-size:13px;font-weight:700;color:#181828;">${title}</div>
              <div style="font-size:12px;color:#6b7280;margin-top:2px;">${desc}</div>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin-bottom:28px;">
        <a href="https://sscoaching.in/student/dashboard"
          style="display:inline-block;background:#6247FD;color:#fff;text-decoration:none;padding:13px 32px;border-radius:9px;font-size:14px;font-weight:700;">
          Go to My Dashboard →
        </a>
      </div>

      <p style="color:#a0a4b8;font-size:12px;text-align:center;">
        Need help? Email us at <a href="mailto:contact@sscoaching.in" style="color:#6247FD;">contact@sscoaching.in</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#F5F5FF;padding:16px 36px;text-align:center;border-top:1px solid #E5E5F5;">
      <p style="color:#a0a4b8;font-size:11px;margin:0;">
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
