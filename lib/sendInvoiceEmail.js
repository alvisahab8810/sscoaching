// lib/sendInvoiceEmail.js
// Sends invoice email with PDF attachment to student
// Uses Google Workspace SMTP — configure EMAIL_PASS (App Password) in .env.local

import nodemailer from "nodemailer";
import { generateInvoicePdf } from "./invoicePdf";

const EMAIL_USER = process.env.EMAIL_USER || "contact@sscoaching.in";

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });
}

function buildEmailHTML(invoice) {
  // Plain toLocaleString (not style:"currency") — the currency style inserts a
  // narrow no-break space between ₹ and the digits per en-IN CLDR data, which
  // Gmail's renderer shows as a stray glyph that visually overlaps the amount.
  const fmt = (n) =>
    "₹" + Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const date = new Date(invoice.issuedAt || invoice.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
  });

  // Free enrollments (fully free course, or a 100%-discount coupon) have
  // total === 0 — "your payment was successful" would be factually wrong
  // there, so the headline + copy branch based on what actually happened.
  const isFree = !invoice.total || invoice.total === 0;
  const headline = isFree ? "You're In — Free Enrollment Confirmed!" : "Enrollment Confirmed!";
  const intro = isFree
    ? `Hi <strong style="color:#181828;">${invoice.studentName || "Student"}</strong>, great news — you're now enrolled, absolutely free. Your invoice (₹0) is attached as a PDF for your records.`
    : `Hi <strong style="color:#181828;">${invoice.studentName || "Student"}</strong>, your payment was successful and you're officially enrolled. Your invoice is attached as a PDF.`;
  const amountLabel = isFree ? "Amount Payable" : "Amount Paid";

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
        ${headline}
      </div>
      <p style="color:#6b7280;font-size:14px;margin-bottom:24px;line-height:1.6;">
        ${intro}
      </p>

      <!-- Invoice summary card -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5FF;border-radius:10px;margin-bottom:24px;">
        <tr>
          <td style="padding:20px 22px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:10px;font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#8A8FA3;">Invoice Number</td>
                <td style="padding-bottom:10px;font-size:13px;font-weight:700;color:#6247FD;text-align:right;">${invoice.invoiceNumber}</td>
              </tr>
              <tr>
                <td style="padding-bottom:10px;font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#8A8FA3;vertical-align:top;">Course</td>
                <td style="padding-bottom:10px;font-size:13px;font-weight:600;color:#181828;text-align:right;">${invoice.courseTitle}</td>
              </tr>
              <tr>
                <td style="padding-bottom:${invoice.discount > 0 ? "10px" : "0"};font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#8A8FA3;">Date</td>
                <td style="padding-bottom:${invoice.discount > 0 ? "10px" : "0"};font-size:13px;color:#181828;text-align:right;">${date}</td>
              </tr>
              ${invoice.discount > 0 ? `
              <tr>
                <td style="font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#8A8FA3;">Discount</td>
                <td style="font-size:13px;color:#10b981;font-weight:600;text-align:right;">- ${fmt(invoice.discount)}</td>
              </tr>` : ""}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 22px;">
            <div style="border-top:1px solid #E5E5F5;margin:12px 0;"></div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 22px 20px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size:14px;font-weight:800;color:#181828;">${amountLabel}</td>
                <td style="font-size:18px;font-weight:900;color:#6247FD;text-align:right;">${fmt(invoice.total)}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <p style="color:#6b7280;font-size:13px;line-height:1.6;margin-bottom:24px;">
        The full invoice PDF is attached to this email. You can also download it anytime from your <strong>Student Dashboard → My Invoices</strong>.
      </p>

      <!-- CTA -->
      <div style="text-align:center;margin-bottom:28px;">
        <a href="https://sscoaching.in/student/dashboard"
          style="display:inline-block;background:#6247FD;color:#fff;text-decoration:none;padding:13px 32px;border-radius:9px;font-size:14px;font-weight:700;">
          Go to My Dashboard →
        </a>
      </div>

      <p style="color:#a0a4b8;font-size:12px;text-align:center;">
        Questions? Email us at <a href="mailto:contact@sscoaching.in" style="color:#6247FD;">contact@sscoaching.in</a>
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
 * sendInvoiceEmail({ invoice, studentEmail })
 *
 * Generates PDF on-the-fly and sends as attachment.
 * Returns { success: true } or { success: false, error }
 */
export async function sendInvoiceEmail({ invoice, studentEmail }) {
  const email = studentEmail || invoice.studentEmail;
  if (!email) return { success: false, error: "No student email provided" };

  try {
    // 1. Generate PDF
    const pdfBuffer = await generateInvoicePdf(invoice);

    // 2. Build email
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"SS Coaching" <${EMAIL_USER}>`,
      to:   email,
      subject: `Invoice ${invoice.invoiceNumber} — SS Coaching`,
      html:    buildEmailHTML(invoice),
      attachments: [
        {
          filename:    `Invoice-${invoice.invoiceNumber}.pdf`,
          content:     pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    return { success: true };
  } catch (err) {
    console.error("sendInvoiceEmail error:", err);
    return { success: false, error: err.message };
  }
}

/**
 * sendInvoiceEmailHtmlOnly({ invoice, studentEmail })
 *
 * Sends email WITHOUT PDF attachment (fallback if puppeteer not installed yet).
 * Use this during local dev / testing.
 */
export async function sendInvoiceEmailHtmlOnly({ invoice, studentEmail }) {
  const email = studentEmail || invoice.studentEmail;
  if (!email) return { success: false, error: "No student email provided" };

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from:    `"SS Coaching" <${EMAIL_USER}>`,
      to:      email,
      subject: `Invoice ${invoice.invoiceNumber} — SS Coaching`,
      html:    buildEmailHTML(invoice),
    });
    return { success: true };
  } catch (err) {
    console.error("sendInvoiceEmailHtmlOnly error:", err);
    return { success: false, error: err.message };
  }
}