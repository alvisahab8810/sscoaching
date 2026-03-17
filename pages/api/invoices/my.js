// pages/api/invoices/my.js
// GET  /api/invoices/my         → student's own invoices list
// GET  /api/invoices/my?id=xxx&pdf=1 → student downloads their own PDF

import dbConnect from "@/lib/dbConnect";
import Invoice from "@/models/Invoice";
import jwt from "jsonwebtoken";

function getStudent(req) {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch { return null; }
}

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  await dbConnect();

  const student = getStudent(req);
  if (!student) return res.status(401).json({ error: "Unauthorized" });

  const { id, pdf, html } = req.query;

  // ── Single invoice PDF/HTML download ──────────────────────────────────────
  if (id) {
    try {
      const invoice = await Invoice.findOne({ _id: id, student: student.id }).lean();
      if (!invoice) return res.status(404).json({ error: "Invoice not found" });

      // PDF download
      if (pdf === "1") {
        const { generateInvoicePdf } = await import("@/lib/invoicePdf");
        const pdfBuffer = await generateInvoicePdf(invoice);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="Invoice-${invoice.invoiceNumber}.pdf"`
        );
        return res.send(pdfBuffer);
      }

      // HTML preview
      if (html === "1") {
        const { getInvoiceHTML } = await import("@/lib/invoicePdf");
        res.setHeader("Content-Type", "text/html");
        return res.send(getInvoiceHTML(invoice));
      }

      return res.status(200).json({ success: true, invoice });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed" });
    }
  }

  // ── List all student's invoices ───────────────────────────────────────────
  try {
    const invoices = await Invoice.find({ student: student.id })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ success: true, invoices });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch invoices" });
  }
}