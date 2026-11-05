import nodemailer from "nodemailer";

/**
 * The emails a sales person receives: the invitation with their login, a new
 * password after a reset, and notice when their account is switched off or
 * back on. Same look as the sub-admin credentials email.
 */

const FROM = () => `"SS Coaching Admin" <${process.env.EMAIL_USER || "contact@sscoaching.in"}>`;

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

const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function loginUrlFor(req) {
  const origin = req.headers.origin || `https://${req.headers.host}`;
  return `${origin}/dashboard/subadmin/login`;
}

function layout({ subtitle, name, intro, body = "", button }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f5ff;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:520px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(68,65,229,0.1);">
    <div style="background:linear-gradient(135deg,#0f1f3d,#1b1870);padding:28px 36px;text-align:center;">
      <div style="color:#fff;font-size:22px;font-weight:900;">SS Coaching</div>
      <div style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:4px;">${esc(subtitle)}</div>
    </div>
    <div style="padding:32px 36px;">
      <p style="font-size:16px;font-weight:700;color:#0f1f3d;margin-bottom:6px;">Hi ${esc(name)},</p>
      <p style="color:#6b7a99;font-size:14px;margin-bottom:24px;line-height:1.6;">${intro}</p>
      ${body}
      ${
        button
          ? `<a href="${esc(button.href)}" style="display:block;text-align:center;background:linear-gradient(135deg,#5641CE,#4430b5);color:#fff;text-decoration:none;padding:14px 24px;border-radius:10px;font-weight:700;font-size:15px;margin-bottom:20px;">${esc(button.label)}</a>`
          : ""
      }
      <p style="color:#6b7a99;font-size:12px;background:#f8f9ff;border:1px solid #e8eaf5;border-radius:8px;padding:10px 14px;margin:0;">
        Keep your login details private. Contact the administrator if you did not expect this email.
      </p>
    </div>
    <div style="background:#f8f9ff;padding:14px 36px;text-align:center;border-top:1px solid #e8eaf5;">
      <p style="color:#a0aabe;font-size:11px;margin:0;">SS Coaching Admin System &bull; sscoaching.in</p>
    </div>
  </div>
</body>
</html>`;
}

function credentialsBox({ username, password, loginUrl }) {
  const row = (label, value, color, spacing) => `
        <div style="margin-bottom:14px;">
          <div style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">${label}</div>
          <div style="font-size:18px;font-weight:800;color:${color};font-family:monospace;letter-spacing:${spacing};">${esc(value)}</div>
        </div>`;
  return `
      <div style="background:#f8f9ff;border:2px solid #e8eaf5;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
        ${username ? row("Username", username, "#5641CE", "0.04em") : ""}
        ${row("Password", password, "#0f1f3d", "0.08em")}
        <div>
          <div style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Login URL</div>
          <a href="${esc(loginUrl)}" style="font-size:14px;color:#5641CE;font-weight:600;word-break:break-all;">${esc(loginUrl)}</a>
        </div>
      </div>`;
}

const TEMPLATES = {
  invite: ({ name, username, password, loginUrl }) => ({
    subject: "Welcome to the SS Coaching Sales Team",
    html: layout({
      subtitle: "Sales Team Invitation",
      name,
      intro:
        "You have been added to the <strong>SS Coaching sales team</strong>. Leads will be assigned to you automatically, and you can track them from your own dashboard. Use the details below to log in.",
      body: credentialsBox({ username, password, loginUrl }),
      button: { href: loginUrl, label: "Login to Sales Dashboard" },
    }),
  }),

  passwordReset: ({ name, password, loginUrl }) => ({
    subject: "Your SS Coaching password has been reset",
    html: layout({
      subtitle: "Password Reset",
      name,
      intro:
        "The administrator has reset the password on your sales account. Your previous password no longer works. Use the new password below to log in.",
      body: credentialsBox({ password, loginUrl }),
      button: { href: loginUrl, label: "Login to Sales Dashboard" },
    }),
  }),

  deactivated: ({ name }) => ({
    subject: "Your SS Coaching sales account has been deactivated",
    html: layout({
      subtitle: "Account Update",
      name,
      intro:
        "Your sales account has been <strong>deactivated</strong> by the administrator. You have been signed out and will not be able to log in, and new leads will not be assigned to you, until the administrator activates your account again.",
    }),
  }),

  reactivated: ({ name, loginUrl }) => ({
    subject: "Your SS Coaching sales account is active again",
    html: layout({
      subtitle: "Account Update",
      name,
      intro:
        "Your sales account has been <strong>activated</strong> again. You can log in with your existing username and password, and new leads will start coming to you.",
      button: { href: loginUrl, label: "Login to Sales Dashboard" },
    }),
  }),
};

/**
 * Sends one of the templates above. Returns { sent, error } instead of
 * throwing, because the account change has already been saved by the time
 * the email goes out and must not be reported as failed.
 */
export async function sendSalesMail(kind, to, data) {
  try {
    const { subject, html } = TEMPLATES[kind](data);
    await createTransporter().sendMail({ from: FROM(), to, subject, html });
    return { sent: true };
  } catch (err) {
    console.error(`[salesMail:${kind}] failed:`, err.message);
    return { sent: false, error: err.message };
  }
}
