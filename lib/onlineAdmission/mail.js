// Emails to the student at each step of the admission. Sent to the email on
// the form (optional field), so a file without one is silently skipped.
// A mail failure never blocks the action that triggered it.
import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER || "contact@sscoaching.in";
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://sscoaching.in").replace(/\/$/, "");
const PHONE = "098390 65533";

let transporter;
function transport() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: EMAIL_USER, pass: process.env.EMAIL_PASS },
      tls: { rejectUnauthorized: false },
    });
  }
  return transporter;
}

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const rupee = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

// Each kind: subject, heading, lines (HTML-safe strings), optional rows and button.
const KINDS = {
  submitted: (app) => ({
    subject: "Application received",
    heading: "We received your application",
    lines: [`Your Class ${app.class}th NIOS admission form and documents have reached us. Our consultant will now check them. We will email you once it is done.`],
  }),
  doc_rejected: (app, x) => ({
    subject: `Please upload your ${x.label} again`,
    heading: "One document needs to be uploaded again",
    lines: ["Our consultant could not accept this document. Please upload a clear copy so we can continue with your admission."],
    rows: [["Document", x.label], ["Reason", x.remark]],
    button: ["Upload again", "tone-bad"],
  }),
  changes_requested: (app, x) => ({
    subject: "Corrections needed in your form",
    heading: "A few corrections are needed",
    lines: ["Please fix the items below and submit your form again."],
    rows: [["What to correct", x.note]],
    button: ["Fix and resubmit"],
  }),
  verified: (app) => ({
    subject: `Documents verified, pay ${rupee(app.price)} to continue`,
    heading: "Your documents are verified",
    lines: [`All your documents and details are approved. Your payment link is now open. Pay ${rupee(app.price)} to continue your admission.`],
    rows: [["Package", `Class ${app.class}th NIOS complete package`], ["Amount", rupee(app.price)]],
    button: [`Pay ${rupee(app.price)}`],
  }),
  paid: (app, x) => ({
    subject: `Payment of ${rupee(x.amount)} received`,
    heading: "Payment received",
    lines: ["Thank you. Your consultant will now prepare your NIOS admission form."],
    rows: [["Amount", rupee(x.amount)], ["Payment ID", x.payment_id]],
  }),
  centre: (app, x) => ({
    subject: "Study centre allotted",
    heading: "Your NIOS study centre is allotted",
    lines: ["Your consultant is now filling your NIOS admission form."],
    rows: [["Centre", x.name], ["Centre code", x.code], ["District", x.district]],
  }),
  nios_submitted: (app) => ({
    subject: "Admission form submitted to NIOS",
    heading: "Your form is submitted to NIOS",
    lines: ["We will email you your enrollment number as soon as NIOS issues it."],
    rows: [["NIOS reference", app.nios_ref]],
  }),
  enrolled: (app) => ({
    subject: "Your NIOS enrollment number",
    heading: "You are enrolled with NIOS",
    lines: ["Use this number on sdmis.nios.ac.in for your ID card, TMA, admit card and results."],
    rows: [["Enrollment number", app.enrollment_no]],
  }),
  exam_fee: (app) => ({
    subject: "Exam fee submitted to NIOS",
    heading: "Your exam fee is submitted",
    lines: ["Keep preparing. We are with you till your exam."],
    rows: [["Exam session", app.exam_fee?.session], ["NIOS receipt", app.exam_fee?.receipt_no]],
  }),
};

function html(app, name, m, link) {
  const rows = (m.rows || []).filter(([, v]) => v);
  const btnColor = m.button?.[1] === "tone-bad" ? "#dc2626" : "#6247FD";
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f4fb;font-family:'Inter','Segoe UI',Arial,sans-serif;">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E5E5F5;">
    <div style="padding:28px 36px;text-align:center;background:#F5F5FF;border-bottom:1px solid #E5E5F5;">
      <img src="https://sscoaching.in/assets/invoice/logo.svg" alt="SS Coaching" style="height:36px;width:auto;display:block;margin:0 auto;"/>
    </div>
    <div style="padding:32px 36px;">
      <div style="font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#8A8FA3;margin-bottom:6px;">NIOS online admission${app.ref_no ? ` · ${esc(app.ref_no)}` : ""}</div>
      <div style="font-size:20px;font-weight:800;color:#181828;margin-bottom:12px;">${esc(m.heading)}</div>
      <p style="color:#374151;font-size:14px;line-height:1.6;margin:0 0 10px;">Hi <strong style="color:#181828;">${esc(name)}</strong>,</p>
      ${m.lines.map((l) => `<p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 16px;">${esc(l)}</p>`).join("")}
      ${rows.length ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5FF;border-radius:10px;margin-bottom:24px;">
        <tr><td style="padding:16px 22px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${rows.map(([k, v]) => `<tr>
              <td style="padding:6px 0;font-size:11px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#8A8FA3;vertical-align:top;">${esc(k)}</td>
              <td style="padding:6px 0 6px 12px;font-size:13px;font-weight:700;color:#181828;text-align:right;">${esc(v)}</td>
            </tr>`).join("")}
          </table>
        </td></tr>
      </table>` : ""}
      <div style="text-align:center;margin:8px 0 24px;">
        <a href="${link}" style="display:inline-block;background:${btnColor};color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 28px;border-radius:10px;">${esc(m.button?.[0] || "View my admission")}</a>
      </div>
      <p style="color:#9ca3af;font-size:12px;line-height:1.6;margin:0;">Log in with your mobile number to open your admission. Questions? Call ${PHONE}.</p>
    </div>
    <div style="padding:16px 36px;background:#F5F5FF;border-top:1px solid #E5E5F5;text-align:center;font-size:12px;color:#8A8FA3;">SS Coaching · sscoaching.in</div>
  </div>
</body></html>`;
}

/** Emails the student about a step. `x` carries the step's details. Never throws. */
export async function mailStudent(app, kind, x = {}) {
  try {
    const to = String(app.form?.email || "").trim();
    if (!to || !KINDS[kind] || !process.env.EMAIL_PASS) return;
    const m = KINDS[kind](app, x);
    const name = app.form?.full_name || "Student";
    const link = `${SITE}/nios-online-admission/app/${app._id}`;
    await transport().sendMail({
      from: `"SS Coaching" <${EMAIL_USER}>`,
      to,
      subject: `${m.subject} | NIOS admission${app.ref_no ? " " + app.ref_no : ""}`,
      html: html(app, name, m, link),
    });
  } catch (e) {
    console.error("online admission mail", kind, e.message);
  }
}
