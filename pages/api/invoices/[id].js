// pages/api/invoices/[id].js
// GET    /api/invoices/:id          → get invoice details
// GET    /api/invoices/:id?pdf=1    → download PDF
// PUT    /api/invoices/:id          → update status (admin)
// POST   /api/invoices/:id/resend   → resend email (admin)

import dbConnect from "@/lib/dbConnect";
import Invoice from "@/models/Invoice";

// Auth helper — works for both admin and student
function getAuth(req) {
  try {
    const jwt   = require("jsonwebtoken");
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch { return null; }
}

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  // ── GET: fetch invoice or download PDF ──────────────────────────────────
  if (req.method === "GET") {
    try {
      const invoice = await Invoice.findById(id).lean();
      if (!invoice) return res.status(404).json({ error: "Invoice not found" });

      // PDF download
      if (req.query.pdf === "1") {
        const { generateInvoicePdf } = await import("@/lib/invoicePdf");
        const pdfBuffer = await generateInvoicePdf(invoice);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="Invoice-${invoice.invoiceNumber}.pdf"`
        );
        return res.send(pdfBuffer);
      }

      // HTML preview (for admin iframe preview)
      if (req.query.html === "1") {
        const { getInvoiceHTML } = await import("@/lib/invoicePdf");
        const html = getInvoiceHTML(invoice);
        res.setHeader("Content-Type", "text/html");
        return res.send(html);
      }

      return res.status(200).json({ success: true, invoice });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch invoice" });
    }
  }

  // ── PUT: update invoice status (admin only) ──────────────────────────────
  if (req.method === "PUT") {
    try {
      const { status } = req.body;
      if (!["paid", "refunded", "cancelled"].includes(status))
        return res.status(400).json({ error: "Invalid status" });

      const invoice = await Invoice.findByIdAndUpdate(id, { status }, { new: true });
      if (!invoice) return res.status(404).json({ error: "Invoice not found" });

      return res.status(200).json({ success: true, invoice });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Update failed" });
    }
  }

  // ── POST: resend invoice email (admin) ───────────────────────────────────
  if (req.method === "POST") {
    const { action } = req.query;

    if (action === "resend") {
      try {
        const invoice = await Invoice.findById(id).lean();
        if (!invoice) return res.status(404).json({ error: "Invoice not found" });

        const { sendInvoiceEmail } = await import("@/lib/sendInvoiceEmail");
        const result = await sendInvoiceEmail({
          invoice,
          studentEmail: invoice.studentEmail,
        });

        if (result.success) {
          await Invoice.findByIdAndUpdate(id, {
            emailSent: true, emailSentAt: new Date(), pdfGenerated: true,
          });
          return res.status(200).json({ success: true, message: "Invoice resent!" });
        } else {
          return res.status(500).json({ error: result.error || "Email failed" });
        }
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Resend failed" });
      }
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}