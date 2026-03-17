// lib/invoicePdf.js
// Premium single-page invoice — pdfkit, no browser, works everywhere
// npm install pdfkit

import PDFDocument from "pdfkit";

/* ─── helpers ─────────────────────────────────────────────────────────── */
const INR = (n) =>
  "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n || 0);

const fmtDate = (d) =>
  new Date(d || Date.now()).toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
  });

/* hex → {r,g,b} */
function hex(h) {
  const x = h.replace("#", "");
  return {
    r: parseInt(x.slice(0, 2), 16),
    g: parseInt(x.slice(2, 4), 16),
    b: parseInt(x.slice(4, 6), 16),
  };
}
/* fill shorthand */
function fill(doc, color) {
  const c = hex(color);
  doc.fillColor([c.r, c.g, c.b]);
}
/* stroke shorthand */
function stroke(doc, color) {
  const c = hex(color);
  doc.strokeColor([c.r, c.g, c.b]);
}

/* ─── palette ─────────────────────────────────────────────────────────── */
const C = {
  primary : "#4441e5",
  teal    : "#00cbb8",
  dark    : "#0f1f3d",
  mid     : "#2d3a5a",
  gray    : "#8491a8",
  light   : "#f4f5ff",
  border  : "#e2e5f8",
  white   : "#ffffff",
  green   : "#10b981",
  amber   : "#f59e0b",
  red     : "#ef4444",
};

/* ═══════════════════════════════════════════════════════════════════════
   generateInvoicePdf(invoice) → Promise<Buffer>
═══════════════════════════════════════════════════════════════════════ */
export function generateInvoicePdf(invoice) {
  return new Promise((resolve, reject) => {
    try {
      /* ── create doc — auto-compress pages, single page ── */
      const doc = new PDFDocument({
        size    : "A4",
        margin  : 0,
        compress: true,
        info    : {
          Title   : `Invoice ${invoice.invoiceNumber}`,
          Author  : "SS Coaching",
          Subject : "Course Enrollment Invoice",
        },
      });

      const chunks = [];
      doc.on("data",  (c) => chunks.push(c));
      doc.on("end",   () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      /* ── page dimensions ── */
      const PW = 595.28;   // A4 width  pt
      const PH = 841.89;   // A4 height pt
      const M  = 40;       // margin
      const CW = PW - M * 2; // content width  515

      /* ── status color ── */
      const statusColor = {
        paid:      C.green,
        pending:   C.amber,
        refunded:  C.amber,
        cancelled: C.red,
      }[invoice.status] || C.green;

      const statusLabel = (invoice.status || "paid").toUpperCase();

      /* ════════════════════════════════════════
         SECTION 1 — DARK HEADER  (0 → 120)
      ════════════════════════════════════════ */
      // Background
      fill(doc, C.dark);
      doc.rect(0, 0, PW, 120).fill();

      // Teal accent bar top-right triangle effect
      fill(doc, C.primary);
      doc.rect(PW - 140, 0, 140, 120).fill();
      fill(doc, C.teal);
      doc.rect(PW - 60, 0, 60, 120).fill();

      // SS logo box
      fill(doc, C.primary);
      doc.roundedRect(M, 24, 56, 56, 6).fill();
      fill(doc, C.white);
      doc.font("Helvetica-Bold").fontSize(22).text("SS", M, 38, { width: 56, align: "center" });

      // Brand text
      fill(doc, C.white);
      doc.font("Helvetica-Bold").fontSize(16).text("SS Coaching", M + 66, 26);
      fill(doc, "#a0aabe");
      doc.font("Helvetica").fontSize(8.5)
        .text("Rise From Failure  •  Estd. 2001", M + 66, 46)
        .text("Lucknow, Uttar Pradesh", M + 66, 57)
        .text("info@sscoaching.in  •  sscoaching.in", M + 66, 68);

      // INVOICE word (right)
      fill(doc, C.white);
      doc.font("Helvetica-Bold").fontSize(30)
        .text("INVOICE", 0, 22, { width: PW - M, align: "right" });

      // Invoice number
      fill(doc, C.white);
      doc.font("Helvetica-Bold").fontSize(11)
        .text(invoice.invoiceNumber, 0, 57, { width: PW - M, align: "right" });

      // Date
      fill(doc, "#a0aabe");
      doc.font("Helvetica").fontSize(8.5)
        .text(`Issued: ${fmtDate(invoice.issuedAt)}`, 0, 72, { width: PW - M, align: "right" });

      // Status pill
      const pillW = 80;
      const pillX = PW - M - pillW;
      const pillY = 88;
      fill(doc, statusColor);
      doc.roundedRect(pillX, pillY, pillW, 16, 8).fill();
      fill(doc, C.white);
      doc.font("Helvetica-Bold").fontSize(7.5)
        .text(statusLabel, pillX, pillY + 4, { width: pillW, align: "center" });

      // Bottom gradient bar
      fill(doc, C.primary);
      doc.rect(0, 118, PW * 0.6, 3).fill();
      fill(doc, C.teal);
      doc.rect(PW * 0.6, 118, PW * 0.4, 3).fill();

      /* ════════════════════════════════════════
         SECTION 2 — BILL TO / FROM  (130 → 210)
      ════════════════════════════════════════ */
      const s2Y = 128;

      // Light background card
      fill(doc, C.light);
      doc.rect(M, s2Y, CW, 72).fill();

      // Left divider accent
      fill(doc, C.primary);
      doc.rect(M, s2Y, 3, 72).fill();

      // BILL TO
      fill(doc, C.gray);
      doc.font("Helvetica-Bold").fontSize(7.5)
        .text("BILL TO", M + 14, s2Y + 12, { characterSpacing: 1 });

      fill(doc, C.dark);
      doc.font("Helvetica-Bold").fontSize(12)
        .text(invoice.studentName || "Student", M + 14, s2Y + 24, { width: CW / 2 - 20 });

      fill(doc, C.gray);
      doc.font("Helvetica").fontSize(8.5);
      let billY = s2Y + 40;
      if (invoice.studentPhone) {
        doc.text(`+91 ${invoice.studentPhone}`, M + 14, billY, { width: CW / 2 - 20 });
        billY += 12;
      }
      if (invoice.studentEmail) {
        doc.text(invoice.studentEmail, M + 14, billY, { width: CW / 2 - 20 });
      }

      // FROM (right column)
      const col2X = M + CW / 2 + 10;
      fill(doc, C.gray);
      doc.font("Helvetica-Bold").fontSize(7.5)
        .text("FROM", col2X, s2Y + 12, { characterSpacing: 1 });

      fill(doc, C.dark);
      doc.font("Helvetica-Bold").fontSize(12)
        .text("SS Coaching", col2X, s2Y + 24, { width: CW / 2 - 20 });

      fill(doc, C.gray);
      doc.font("Helvetica").fontSize(8.5)
        .text("Lucknow, Uttar Pradesh", col2X, s2Y + 40, { width: CW / 2 - 20 })
        .text("info@sscoaching.in", col2X, s2Y + 52, { width: CW / 2 - 20 });

      /* ════════════════════════════════════════
         SECTION 3 — ITEMS TABLE  (212 → 310)
      ════════════════════════════════════════ */
      const tY = s2Y + 80;

      // Table header bar
      fill(doc, C.primary);
      doc.rect(M, tY, CW, 24).fill();

      fill(doc, C.white);
      doc.font("Helvetica-Bold").fontSize(7.5);
      doc.text("#",           M + 8,      tY + 8, { characterSpacing: 0.5 });
      doc.text("DESCRIPTION", M + 28,     tY + 8, { characterSpacing: 0.5, width: 280 });
      doc.text("TYPE",        M + 310,    tY + 8, { characterSpacing: 0.5, width: 90 });
      doc.text("AMOUNT",      M + 410,    tY + 8, { characterSpacing: 0.5, width: CW - 410, align: "right" });

      // Table row
      const rowY = tY + 24;
      fill(doc, C.white);
      doc.rect(M, rowY, CW, 50).fill();

      // Left accent on row
      fill(doc, C.teal);
      doc.rect(M, rowY, 3, 50).fill();

      // Row content
      fill(doc, C.gray);
      doc.font("Helvetica").fontSize(9).text("1", M + 8, rowY + 18);

      fill(doc, C.dark);
      doc.font("Helvetica-Bold").fontSize(10)
        .text(invoice.courseTitle || "Course Enrollment", M + 28, rowY + 10, { width: 275 });

      fill(doc, C.gray);
      doc.font("Helvetica").fontSize(8)
        .text(
          [invoice.courseSubject, invoice.courseBatch].filter(Boolean).join(" • "),
          M + 28, rowY + 26, { width: 275 }
        );

      fill(doc, C.mid);
      doc.font("Helvetica").fontSize(8.5)
        .text("Online Course", M + 310, rowY + 18, { width: 90 });

      fill(doc, C.dark);
      doc.font("Helvetica-Bold").fontSize(10)
        .text(INR(invoice.subtotal), M + 410, rowY + 18,
          { width: CW - 410, align: "right" });

      // Row bottom border
      stroke(doc, C.border);
      doc.moveTo(M, rowY + 50).lineTo(M + CW, rowY + 50).lineWidth(0.5).stroke();

      /* ════════════════════════════════════════
         SECTION 4 — TOTALS  (right-aligned)
      ════════════════════════════════════════ */
      const totW  = 200;
      const totX  = M + CW - totW;
      let   totY  = rowY + 60;

      const drawTotRow = (label, value, highlight = false, valColor = C.dark) => {
        fill(doc, C.gray);
        doc.font(highlight ? "Helvetica-Bold" : "Helvetica")
          .fontSize(highlight ? 10 : 8.5)
          .text(label, totX, totY, { width: 95 });

        fill(doc, valColor);
        doc.font(highlight ? "Helvetica-Bold" : "Helvetica")
          .fontSize(highlight ? 11 : 8.5)
          .text(value, totX + 95, totY, { width: 105, align: "right" });

        totY += highlight ? 18 : 15;
      };

      drawTotRow("Subtotal", INR(invoice.subtotal));

      if (invoice.discount > 0) {
        drawTotRow(
          `Discount${invoice.couponCode ? ` (${invoice.couponCode})` : ""}`,
          `- ${INR(invoice.discount)}`, false, C.green
        );
      }
      if (invoice.tax > 0) {
        drawTotRow("Tax (GST)", INR(invoice.tax));
      }

      // Divider
      stroke(doc, C.border);
      doc.moveTo(totX, totY).lineTo(M + CW, totY).lineWidth(0.5).stroke();
      totY += 6;

      // Total row with background
      fill(doc, C.light);
      doc.rect(totX - 8, totY - 4, totW + 8, 24).fill();
      fill(doc, C.primary);
      doc.rect(totX - 8, totY - 4, 3, 24).fill();

      fill(doc, C.dark);
      doc.font("Helvetica-Bold").fontSize(10)
        .text("Total Paid", totX, totY + 3, { width: 95 });
      fill(doc, C.primary);
      doc.font("Helvetica-Bold").fontSize(13)
        .text(INR(invoice.total), totX + 95, totY + 1, { width: 105, align: "right" });

      totY += 28;

      /* ════════════════════════════════════════
         SECTION 5 — PAYMENT INFO BOX
      ════════════════════════════════════════ */
      const piY = Math.max(totY + 8, rowY + 120);

      fill(doc, C.light);
      doc.rect(M, piY, CW, 52).fill();
      stroke(doc, C.border);
      doc.rect(M, piY, CW, 52).lineWidth(0.5).stroke();

      // Left accent
      fill(doc, C.teal);
      doc.rect(M, piY, 3, 52).fill();

      const pi3W = CW / 3;
      const piItems = [
        { label: "PAYMENT METHOD", value: invoice.paymentMethod || "—" },
        { label: "ORDER ID",       value: invoice.orderId        || "—" },
        { label: "PAYMENT ID",     value: invoice.paymentId      || "—" },
      ];

      piItems.forEach((item, i) => {
        const px = M + 14 + i * pi3W;
        fill(doc, C.gray);
        doc.font("Helvetica-Bold").fontSize(7)
          .text(item.label, px, piY + 12, { width: pi3W - 10, characterSpacing: 0.5 });
        fill(doc, C.dark);
        doc.font("Helvetica").fontSize(8.5)
          .text(item.value, px, piY + 26, { width: pi3W - 10 });
      });

      /* ════════════════════════════════════════
         SECTION 6 — FOOTER
      ════════════════════════════════════════ */
      const footY = PH - 44;

      // Footer gradient bar
      fill(doc, C.primary);
      doc.rect(0, footY - 3, PW * 0.55, 2).fill();
      fill(doc, C.teal);
      doc.rect(PW * 0.55, footY - 3, PW * 0.45, 2).fill();

      fill(doc, C.gray);
      doc.font("Helvetica").fontSize(7.5)
        .text(
          "This is a computer-generated invoice. No signature required.",
          M, footY + 4, { width: CW / 2 }
        )
        .text("For queries: info@sscoaching.in", M, footY + 16, { width: CW / 2 });

      fill(doc, C.primary);
      doc.font("Helvetica-Bold").fontSize(9)
        .text("Thank you for choosing SS Coaching!", 0, footY + 4,
          { width: PW - M, align: "right" });

      fill(doc, C.gray);
      doc.font("Helvetica").fontSize(7.5)
        .text("sscoaching.in", 0, footY + 18, { width: PW - M, align: "right" });

      /* ── done ── */
      doc.end();

    } catch (err) { reject(err); }
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   getInvoiceHTML(invoice) → string
   Used for email body and browser preview
═══════════════════════════════════════════════════════════════════════ */
export function getInvoiceHTML(invoice) {
  const fmt = (n) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);

  const date = new Date(invoice.issuedAt || invoice.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
  });

  const sc = {
    paid:      "#10b981", pending: "#f59e0b",
    refunded:  "#f59e0b", cancelled: "#ef4444",
  }[invoice.status] || "#10b981";

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f5ff;color:#0f1f3d;font-size:13px;}
.page{max-width:680px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(68,65,229,.12);}
.hdr{background:linear-gradient(135deg,#0f1f3d 0%,#1b1870 60%,#0f1f3d 100%);padding:28px 32px;display:flex;justify-content:space-between;align-items:flex-start;}
.logo{width:50px;height:50px;background:#4441e5;border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;font-weight:900;margin-bottom:8px;}
.brand-name{color:#fff;font-size:16px;font-weight:900;}
.brand-sub{color:rgba(255,255,255,.45);font-size:9px;margin-top:3px;line-height:1.7;}
.inv-title{color:#4441e5;font-size:28px;font-weight:900;letter-spacing:-1px;text-align:right;}
.inv-num{color:#fff;font-size:12px;font-weight:700;text-align:right;margin-top:4px;}
.inv-date{color:rgba(255,255,255,.45);font-size:9px;text-align:right;margin-top:3px;}
.badge{display:inline-block;padding:3px 12px;border-radius:100px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;background:${sc}22;color:${sc};border:1px solid ${sc}55;margin-top:8px;}
.accent{height:3px;background:linear-gradient(90deg,#4441e5,#00cbb8);}
.body{padding:24px 32px;}
.parties{display:grid;grid-template-columns:1fr 1fr;gap:16px;background:#f4f5ff;border-radius:10px;padding:16px;margin-bottom:20px;border-left:3px solid #4441e5;}
.plabel{font-size:8px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#8491a8;margin-bottom:5px;}
.pname{font-size:13px;font-weight:800;color:#0f1f3d;}
.pdetail{font-size:9px;color:#8491a8;margin-top:3px;line-height:1.7;}
table{width:100%;border-collapse:collapse;margin-bottom:16px;}
thead tr{background:#4441e5;}
thead th{padding:9px 12px;text-align:left;font-size:8px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#fff;}
thead th:last-child{text-align:right;}
tbody tr{border-bottom:1px solid #f0f1fa;}
tbody td{padding:12px;font-size:11px;color:#2d3a5a;}
tbody td:last-child{text-align:right;font-weight:700;}
.item-title{font-weight:700;color:#0f1f3d;font-size:12px;}
.item-sub{font-size:9px;color:#8491a8;margin-top:2px;}
.totals{display:flex;flex-direction:column;align-items:flex-end;gap:4px;margin-bottom:16px;}
.trow{display:flex;gap:16px;font-size:11px;color:#8491a8;min-width:200px;justify-content:space-between;}
.trow.final{font-size:14px;font-weight:900;color:#0f1f3d;border-top:1px solid #e2e5f8;padding-top:8px;margin-top:4px;}
.trow.final span:last-child{color:#4441e5;}
.pibox{background:#f4f5ff;border:1.5px solid #e2e5f8;border-radius:10px;padding:12px 16px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;border-left:3px solid #00cbb8;}
.pilabel{font-size:7.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#8491a8;margin-bottom:4px;}
.pivalue{font-size:9.5px;font-weight:600;color:#0f1f3d;word-break:break-all;}
.footer{padding:14px 32px;background:#f8f9ff;border-top:1px solid #eceeff;display:flex;justify-content:space-between;align-items:center;}
.footer-left{font-size:9px;color:#8491a8;line-height:1.7;}
.thankyou{font-size:11px;font-weight:700;color:#4441e5;}
</style></head><body>
<div class="page">
<div class="hdr">
<div>
  <div class="logo">SS</div>
  <div class="brand-name">SS Coaching</div>
  <div class="brand-sub">Rise From Failure • Estd. 2001<br/>Lucknow, Uttar Pradesh<br/>info@sscoaching.in</div>
</div>
<div>
  <div class="inv-title">INVOICE</div>
  <div class="inv-num">${invoice.invoiceNumber}</div>
  <div class="inv-date">Issued: ${date}</div>
  <div style="text-align:right"><span class="badge">${(invoice.status||"paid").toUpperCase()}</span></div>
</div>
</div>
<div class="accent"></div>
<div class="body">
<div class="parties">
<div>
  <div class="plabel">Bill To</div>
  <div class="pname">${invoice.studentName||"Student"}</div>
  <div class="pdetail">${invoice.studentPhone?`+91 ${invoice.studentPhone}<br/>`:""}${invoice.studentEmail||""}</div>
</div>
<div>
  <div class="plabel">From</div>
  <div class="pname">SS Coaching</div>
  <div class="pdetail">Lucknow, Uttar Pradesh<br/>info@sscoaching.in</div>
</div>
</div>
<table>
<thead><tr><th>#</th><th>Description</th><th>Type</th><th>Amount</th></tr></thead>
<tbody>
<tr>
  <td>1</td>
  <td><div class="item-title">${invoice.courseTitle||"Course Enrollment"}</div>
      <div class="item-sub">${[invoice.courseSubject,invoice.courseBatch].filter(Boolean).join(" • ")}</div></td>
  <td><span style="font-size:10px;color:#8491a8">Online Course</span></td>
  <td>${fmt(invoice.subtotal)}</td>
</tr>
</tbody>
</table>
<div class="totals">
  <div class="trow"><span>Subtotal</span><span>${fmt(invoice.subtotal)}</span></div>
  ${invoice.discount>0?`<div class="trow" style="color:#10b981"><span>Discount${invoice.couponCode?` (${invoice.couponCode})`:""}</span><span>− ${fmt(invoice.discount)}</span></div>`:""}
  ${invoice.tax>0?`<div class="trow"><span>Tax (GST)</span><span>${fmt(invoice.tax)}</span></div>`:""}
  <div class="trow final"><span>Total Paid</span><span>${fmt(invoice.total)}</span></div>
</div>
<div class="pibox">
  <div><div class="pilabel">Payment Method</div><div class="pivalue">${invoice.paymentMethod||"—"}</div></div>
  <div><div class="pilabel">Order ID</div><div class="pivalue">${invoice.orderId||"—"}</div></div>
  <div><div class="pilabel">Payment ID</div><div class="pivalue">${invoice.paymentId||"—"}</div></div>
</div>
</div>
<div class="footer">
<div class="footer-left">Computer-generated invoice. No signature required.<br/>Queries: info@sscoaching.in</div>
<div style="text-align:right">
  <div class="thankyou">Thank you for enrolling! 🎓</div>
  <div style="font-size:9px;color:#8491a8">SS Coaching — Lucknow</div>
</div>
</div>
</div>
</body></html>`;
}

/* alias */
export function buildInvoiceHTML(invoice) {
  return getInvoiceHTML(invoice);
}