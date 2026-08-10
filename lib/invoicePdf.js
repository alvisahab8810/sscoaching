// lib/invoicePdf.js
// SS Coaching invoice — pdfkit PDF + matching HTML (email/preview), no browser needed.
// npm install pdfkit svg-to-pdfkit

import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";
import path from "path";
import fs from "fs";

/* ─── business constants (fixed — not per-invoice data) ──────────────────── */
const BUSINESS = {
  name:    "SS Coaching",
  email:   "info@sscoaching.in",
  gstin:   "09HSCPD0357Q1ZB",
  address: "IIIrd Floor, Shree Chamber, Naza Computer Market, Near Basant Cinema, Hazratganj, Lucknow.",
};

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
function fill(doc, color) {
  const c = hex(color);
  doc.fillColor([c.r, c.g, c.b]);
}
function stroke(doc, color) {
  const c = hex(color);
  doc.strokeColor([c.r, c.g, c.b]);
}

/* ─── Indian numbering ("Amount Chargeable in words") ────────────────────── */
const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function twoDigitsWords(n) {
  if (n < 20) return ONES[n];
  return TENS[Math.floor(n / 10)] + (n % 10 ? " " + ONES[n % 10] : "");
}
function threeDigitsWords(n) {
  let str = "";
  if (n > 99) {
    str += ONES[Math.floor(n / 100)] + " Hundred";
    n %= 100;
    if (n) str += " ";
  }
  if (n > 0) str += twoDigitsWords(n);
  return str;
}
function numberToWordsIndian(num) {
  num = Math.round(Math.abs(num || 0));
  if (num === 0) return "Zero";
  let crore = Math.floor(num / 10000000); num %= 10000000;
  let lakh = Math.floor(num / 100000); num %= 100000;
  let thousand = Math.floor(num / 1000); num %= 1000;
  const hundred = num;
  const parts = [];
  if (crore) parts.push(threeDigitsWords(crore) + " Crore");
  if (lakh) parts.push(threeDigitsWords(lakh) + " Lakh");
  if (thousand) parts.push(threeDigitsWords(thousand) + " Thousand");
  if (hundred) parts.push(threeDigitsWords(hundred));
  return parts.join(" ");
}

/* ─── palette ─────────────────────────────────────────────────────────── */
const C = {
  purple : "#6247FD",   // every purple accent per spec
  stripe : "#F5F5FF",   // every stripe/background band per spec
  dark   : "#181828",
  gray   : "#8A8FA3",
  border : "#E5E5F5",
  white  : "#ffffff",
  green  : "#10b981",
  amber  : "#f59e0b",
  red    : "#ef4444",
};

/* ─── brand assets ────────────────────────────────────────────────────── */
const LOGO_PATH      = path.join(process.cwd(), "public/assets/invoice/logo.svg");
const SIGNATURE_PATH = path.join(process.cwd(), "public/assets/invoice/signature.svg");
const FONT_DIR       = path.join(process.cwd(), "public/assets/fonts/inter");

// svg-to-pdfkit uses the <svg> tag's own width/height attributes as the
// render viewport WHENEVER they're present, ignoring the width/height passed
// via options — so an explicit "width=323 height=84" on the source SVG means
// it always draws at that native size. Stripping those two attributes forces
// it to fall back to the options we pass, and to the viewBox for the aspect
// ratio, so our on-page sizing actually takes effect.
const stripSvgWH = (svg) =>
  svg.replace(/(<svg[^>]*?)\swidth="[^"]*"/, "$1").replace(/(<svg[^>]*?)\sheight="[^"]*"/, "$1");

let _logoSvg = null, _sigSvg = null, _svgTried = false;
function loadBrandSvgs() {
  if (_svgTried) return;
  _svgTried = true;
  try { _logoSvg = stripSvgWH(fs.readFileSync(LOGO_PATH, "utf8")); } catch {}
  try { _sigSvg  = stripSvgWH(fs.readFileSync(SIGNATURE_PATH, "utf8")); } catch {}
}

/* Register Inter (has a proper ₹ glyph — Helvetica's built-in PDF font doesn't) */
function registerFonts(doc) {
  try {
    doc.registerFont("Text",          path.join(FONT_DIR, "Inter-Regular.ttf"));
    doc.registerFont("Text-Medium",   path.join(FONT_DIR, "Inter-Medium.ttf"));
    doc.registerFont("Text-SemiBold", path.join(FONT_DIR, "Inter-SemiBold.ttf"));
    doc.registerFont("Text-Bold",     path.join(FONT_DIR, "Inter-Bold.ttf"));
    return true;
  } catch {
    return false;
  }
}

const statusColorFor = (status) => ({
  paid:      C.green,
  pending:   C.amber,
  refunded:  C.amber,
  cancelled: C.red,
}[status] || C.green);

/* ═══════════════════════════════════════════════════════════════════════
   generateInvoicePdf(invoice) → Promise<Buffer>
═══════════════════════════════════════════════════════════════════════ */
export function generateInvoicePdf(invoice) {
  return new Promise((resolve, reject) => {
    try {
      loadBrandSvgs();

      const doc = new PDFDocument({
        size    : "A4",
        margin  : 0,
        compress: true,
        info    : {
          Title  : `Invoice ${invoice.invoiceNumber}`,
          Author : "SS Coaching",
          Subject: "Course Enrollment Invoice",
        },
      });

      const chunks = [];
      doc.on("data",  (c) => chunks.push(c));
      doc.on("end",   () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      const hasInter = registerFonts(doc);
      const F   = hasInter ? "Text"          : "Helvetica";
      const FM  = hasInter ? "Text-Medium"   : "Helvetica";
      const FSB = hasInter ? "Text-SemiBold" : "Helvetica-Bold";
      const FB  = hasInter ? "Text-Bold"     : "Helvetica-Bold";

      /* ── page dimensions ── */
      const PW = 595.28;
      const PH = 841.89;
      const M  = 40;
      const CW = PW - M * 2;

      const cardX = M, cardW = CW, cardTop = 36, pad = 26;
      const innerW = cardW - pad * 2;
      let cursorY = cardTop + pad;

      const statusColor = statusColorFor(invoice.status);
      const statusLabel = (invoice.status || "paid").toUpperCase();

      /* ════════════════════════════════════════
         HEADER — logo (left) + "Invoice" title (right)
      ════════════════════════════════════════ */
      const logoW = 122, logoH = logoW * (84 / 323);
      if (_logoSvg) {
        try { SVGtoPDF(doc, _logoSvg, cardX + pad, cursorY, { width: logoW, height: logoH, assumePt: true, preserveAspectRatio: "xMinYMin meet" }); } catch {}
      } else {
        fill(doc, C.dark);
        doc.font(FB).fontSize(18).text(BUSINESS.name, cardX + pad, cursorY + 6);
      }

      fill(doc, C.purple);
      doc.font(FB).fontSize(27)
        .text("Invoice", cardX, cursorY + 2, { width: cardW - pad, align: "right" });

      cursorY += 48;

      /* divider */
      stroke(doc, C.border);
      doc.moveTo(cardX + pad, cursorY).lineTo(cardX + cardW - pad, cursorY).lineWidth(1).stroke();
      cursorY += 22;

      /* ════════════════════════════════════════
         TRADE INFO (left) / BILL TO (right)
      ════════════════════════════════════════ */
      const colGap = 30;
      const colW   = (innerW - colGap) / 2;
      const leftX  = cardX + pad;
      const rightX = leftX + colW + colGap;

      const drawField = (x, y, label, value, width, big = false) => {
        fill(doc, C.gray);
        doc.font(FB).fontSize(7.5).text(label, x, y, { characterSpacing: 0.6, width });
        fill(doc, C.dark);
        doc.font(big ? FB : F).fontSize(big ? 12 : 9.5);
        const valueH = doc.heightOfString(value || "—", { width, lineGap: 1.5 });
        doc.text(value || "—", x, y + 12, { width, lineGap: 1.5 });
        return 12 + valueH + 11; // label row + value + gap before next field
      };

      let ly = cursorY;
      ly += drawField(leftX, ly, "TRADE NAME", BUSINESS.name, colW, true);
      ly += drawField(leftX, ly, "EMAIL", BUSINESS.email, colW);
      ly += drawField(leftX, ly, "GSTIN", BUSINESS.gstin, colW);
      ly += drawField(leftX, ly, "ADDRESS", BUSINESS.address, colW);

      let ry = cursorY;
      ry += drawField(rightX, ry, "BILL TO", invoice.studentName || "Student", colW, true);
      ry += drawField(rightX, ry, "CONTACT", invoice.studentPhone ? `+91 ${invoice.studentPhone}` : "—", colW);
      ry += drawField(rightX, ry, "EMAIL", invoice.studentEmail || "—", colW);

      cursorY = Math.max(ly, ry) + 8;

      /* ════════════════════════════════════════
         STRIPE — Invoice No. / Date / Payment Status
      ════════════════════════════════════════ */
      const stripeY = cursorY, stripeH = 46;
      fill(doc, C.stripe);
      doc.rect(cardX, stripeY, cardW, stripeH).fill();

      const s3W = innerW / 3;
      const stripeCols = [
        { label: "INVOICE NUMBER", value: invoice.invoiceNumber || "—" },
        { label: "INVOICE DATE",   value: fmtDate(invoice.issuedAt) },
        { label: "PAYMENT STATUS", value: statusLabel, color: statusColor },
      ];
      stripeCols.forEach((col, i) => {
        const x = cardX + pad + i * s3W;
        fill(doc, C.gray);
        doc.font(FB).fontSize(7.5).text(col.label, x, stripeY + 13, { characterSpacing: 0.6, width: s3W - 12 });
        fill(doc, col.color || C.dark);
        doc.font(FB).fontSize(10.5).text(col.value, x, stripeY + 26, { width: s3W - 12 });
      });

      cursorY = stripeY + stripeH + 22;

      /* ════════════════════════════════════════
         ITEMS TABLE
      ════════════════════════════════════════ */
      const tableX = cardX + pad;
      const colNum = 26, colQty = 40, colRate = 82, colAmt = 92;
      const colDesc = innerW - colNum - colQty - colRate - colAmt;
      const xNum  = tableX;
      const xDesc = xNum + colNum;
      const xQty  = xDesc + colDesc;
      const xRate = xQty + colQty;
      const xAmt  = xRate + colRate;

      const tableTop = cursorY;

      // header row
      fill(doc, C.stripe);
      doc.rect(tableX, tableTop, innerW, 24).fill();
      fill(doc, C.purple);
      doc.font(FB).fontSize(7.5);
      doc.text("#",           xNum,  tableTop + 8, { width: colNum,  characterSpacing: 0.4 });
      doc.text("DESCRIPTION", xDesc, tableTop + 8, { width: colDesc, characterSpacing: 0.4 });
      doc.text("QTY",         xQty,  tableTop + 8, { width: colQty,  characterSpacing: 0.4 });
      doc.text("RATE",        xRate, tableTop + 8, { width: colRate, characterSpacing: 0.4, align: "right" });
      doc.text("AMOUNT",      xAmt,  tableTop + 8, { width: colAmt,  characterSpacing: 0.4, align: "right" });

      let rowY = tableTop + 24;

      const descW = colDesc - 8;
      const courseTitle = invoice.courseTitle || "Course Enrollment";
      const courseSub = [invoice.courseSubject, invoice.courseBatch].filter(Boolean).join(" • ");

      doc.font(FSB).fontSize(10);
      const titleH = doc.heightOfString(courseTitle, { width: descW, lineGap: 1 });
      let subH = 0;
      if (courseSub) {
        doc.font(F).fontSize(8);
        subH = doc.heightOfString(courseSub, { width: descW });
      }
      const itemRowH = Math.max(40, 16 + titleH + (courseSub ? 4 + subH : 0));
      const rowMidY = rowY + itemRowH / 2 - 5;

      fill(doc, C.dark);
      doc.font(F).fontSize(9).text("1", xNum, rowMidY, { width: colNum });

      fill(doc, C.dark);
      doc.font(FSB).fontSize(10).text(courseTitle, xDesc, rowY + 8, { width: descW, lineGap: 1 });
      if (courseSub) {
        fill(doc, C.gray);
        doc.font(F).fontSize(8).text(courseSub, xDesc, rowY + 8 + titleH + 4, { width: descW });
      }

      fill(doc, C.dark);
      doc.font(F).fontSize(9).text("1", xQty, rowMidY, { width: colQty });
      doc.text(INR(invoice.subtotal), xRate, rowMidY, { width: colRate, align: "right" });
      doc.font(FSB).text(INR(invoice.subtotal), xAmt, rowMidY, { width: colAmt, align: "right" });

      rowY += itemRowH;
      stroke(doc, C.border);
      doc.moveTo(tableX, rowY).lineTo(tableX + innerW, rowY).lineWidth(0.5).stroke();

      // discount row
      if (invoice.discount > 0) {
        const label = `Discount${invoice.couponCode ? ` (${invoice.couponCode})` : ""}`;
        fill(doc, C.green);
        doc.font(F).fontSize(9).text(label, xDesc, rowY + 8, { width: colDesc + colQty + colRate - 8 });
        doc.font(FSB).text(`− ${INR(invoice.discount)}`, xAmt, rowY + 8, { width: colAmt, align: "right" });
        rowY += 24;
        stroke(doc, C.border);
        doc.moveTo(tableX, rowY).lineTo(tableX + innerW, rowY).lineWidth(0.5).stroke();
      }

      // tax row
      if (invoice.tax > 0) {
        fill(doc, C.dark);
        doc.font(F).fontSize(9).text("Tax (GST)", xDesc, rowY + 8, { width: colDesc + colQty + colRate - 8 });
        doc.font(FSB).text(INR(invoice.tax), xAmt, rowY + 8, { width: colAmt, align: "right" });
        rowY += 24;
        stroke(doc, C.border);
        doc.moveTo(tableX, rowY).lineTo(tableX + innerW, rowY).lineWidth(0.5).stroke();
      }

      // total row
      const totalH = 32;
      fill(doc, C.stripe);
      doc.rect(tableX, rowY, innerW, totalH).fill();
      fill(doc, C.dark);
      doc.font(FB).fontSize(10.5).text("Total", xDesc, rowY + 10, { width: colDesc + colQty + colRate - 8 });
      fill(doc, C.purple);
      doc.font(FB).fontSize(13).text(INR(invoice.total), xAmt, rowY + 8, { width: colAmt, align: "right" });
      rowY += totalH;

      // table outer border
      stroke(doc, C.border);
      doc.rect(tableX, tableTop, innerW, rowY - tableTop).lineWidth(1).stroke();

      cursorY = rowY + 26;

      /* ════════════════════════════════════════
         AMOUNT IN WORDS (left) + SIGNATURE (right)
      ════════════════════════════════════════ */
      const wordsW = innerW * 0.6;
      const words = `INR ${numberToWordsIndian(invoice.total)} Only`;

      fill(doc, C.gray);
      doc.font(FB).fontSize(7.5).text("AMOUNT CHARGEABLE (IN WORDS)", cardX + pad, cursorY, { characterSpacing: 0.6, width: wordsW });
      fill(doc, C.dark);
      doc.font(FSB).fontSize(10);
      const wordsH = doc.heightOfString(words, { width: wordsW, lineGap: 2 });
      doc.text(words, cardX + pad, cursorY + 13, { width: wordsW, lineGap: 2 });

      const sigColW = innerW - wordsW;
      const sigX = cardX + pad + wordsW;
      let sy = cursorY;

      fill(doc, C.dark);
      doc.font(FSB).fontSize(9.5).text(`For ${BUSINESS.name}`, sigX, sy, { width: sigColW, align: "right" });
      sy += 16;

      const sigW = 100, sigH = sigW * (131 / 276);
      if (_sigSvg) {
        try { SVGtoPDF(doc, _sigSvg, sigX + sigColW - sigW, sy, { width: sigW, height: sigH, assumePt: true, preserveAspectRatio: "xMinYMin meet" }); } catch {}
      }
      sy += sigH + 6;

      fill(doc, C.gray);
      doc.font(F).fontSize(8.5).text("Director", sigX, sy, { width: sigColW, align: "right" });
      sy += 12;

      const bottomBlockH = Math.max(13 + wordsH, 16 + sigH + 6 + 12);
      cursorY = cursorY + bottomBlockH + pad;

      /* ── outer card border (dynamically sized to content) ── */
      stroke(doc, C.border);
      doc.roundedRect(cardX, cardTop, cardW, cursorY - cardTop, 10).lineWidth(1).stroke();

      /* ── footer (outside the card) ── */
      const footY = cursorY + 18;
      fill(doc, C.gray);
      doc.font(F).fontSize(8)
        .text("This is a computer-generated invoice. No signature required for validity.", cardX, footY, { width: cardW, align: "center" });
      doc.text(
        `Ref: ${invoice.orderId || "—"}${invoice.paymentId ? ` / ${invoice.paymentId}` : ""} • Queries: ${BUSINESS.email}`,
        cardX, footY + 13, { width: cardW, align: "center" }
      );

      doc.end();
    } catch (err) { reject(err); }
  });
}

/* ═══════════════════════════════════════════════════════════════════════
   getInvoiceHTML(invoice) → string
   Used for email body and browser preview — mirrors the PDF design.
═══════════════════════════════════════════════════════════════════════ */
export function getInvoiceHTML(invoice) {
  const date = fmtDate(invoice.issuedAt || invoice.createdAt);
  const statusColor = statusColorFor(invoice.status);
  const statusLabel = (invoice.status || "paid").toUpperCase();
  const words = `INR ${numberToWordsIndian(invoice.total)} Only`;
  const LOGO_URL = "https://sscoaching.in/assets/invoice/logo.svg";
  const SIG_URL  = "https://sscoaching.in/assets/invoice/signature.svg";

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Inter','Segoe UI',Arial,sans-serif;background:#f4f4fb;color:#181828;font-size:13px;}
.card{max-width:680px;margin:24px auto;background:#fff;border:1px solid #E5E5F5;border-radius:14px;padding:26px 30px;}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;}
.hdr img{height:34px;display:block;}
.inv-title{color:#6247FD;font-size:27px;font-weight:800;letter-spacing:-.5px;}
.divider{height:1px;background:#E5E5F5;margin:0 0 20px;}
.info{display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-bottom:18px;}
.field{margin-bottom:11px;}
.label{font-size:9px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#8A8FA3;margin-bottom:4px;}
.value{font-size:12px;color:#181828;line-height:1.5;}
.value.big{font-size:14px;font-weight:700;}
.stripe{background:#F5F5FF;border-radius:8px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;padding:14px 16px;margin-bottom:20px;}
.stripe .label{margin-bottom:5px;}
.stripe .value{font-weight:700;font-size:13px;}
table{width:100%;border-collapse:collapse;border:1px solid #E5E5F5;border-radius:8px;overflow:hidden;margin-bottom:20px;}
thead tr{background:#F5F5FF;}
thead th{padding:9px 12px;text-align:left;font-size:9px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#6247FD;}
thead th:nth-child(3),thead th:nth-child(4),thead th:last-child{text-align:right;}
tbody td{padding:12px;font-size:12px;color:#181828;border-top:1px solid #F0F0FA;}
tbody td:nth-child(3),tbody td:nth-child(4),tbody td:last-child{text-align:right;}
.item-title{font-weight:700;font-size:13px;}
.item-sub{font-size:10px;color:#8A8FA3;margin-top:2px;}
tfoot td{padding:12px;border-top:1px solid #F0F0FA;font-size:12px;}
tfoot .discount td{color:#10b981;font-weight:600;}
tfoot .total td{background:#F5F5FF;font-weight:800;font-size:14px;}
tfoot .total td:last-child{color:#6247FD;font-size:15px;}
.bottom{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;}
.words-value{font-weight:700;font-size:13px;margin-top:4px;}
.sig{text-align:right;}
.sig img{height:46px;margin:8px 0 4px;}
.sig .for{font-weight:700;font-size:12px;}
.sig .director{font-size:10.5px;color:#8A8FA3;}
.footer{margin-top:22px;padding-top:14px;border-top:1px solid #F0F0FA;text-align:center;font-size:10px;color:#8A8FA3;line-height:1.7;}
</style></head><body>
<div class="card">
  <div class="hdr">
    <img src="${LOGO_URL}" alt="SS Coaching"/>
    <div class="inv-title">Invoice</div>
  </div>
  <div class="divider"></div>

  <div class="info">
    <div>
      <div class="field"><div class="label">Trade Name</div><div class="value big">${BUSINESS.name}</div></div>
      <div class="field"><div class="label">Email</div><div class="value">${BUSINESS.email}</div></div>
      <div class="field"><div class="label">GSTIN</div><div class="value">${BUSINESS.gstin}</div></div>
      <div class="field"><div class="label">Address</div><div class="value">${BUSINESS.address}</div></div>
    </div>
    <div>
      <div class="field"><div class="label">Bill To</div><div class="value big">${invoice.studentName || "Student"}</div></div>
      <div class="field"><div class="label">Contact</div><div class="value">${invoice.studentPhone ? `+91 ${invoice.studentPhone}` : "—"}</div></div>
      <div class="field"><div class="label">Email</div><div class="value">${invoice.studentEmail || "—"}</div></div>
    </div>
  </div>

  <div class="stripe">
    <div><div class="label">Invoice Number</div><div class="value">${invoice.invoiceNumber || "—"}</div></div>
    <div><div class="label">Invoice Date</div><div class="value">${date}</div></div>
    <div><div class="label">Payment Status</div><div class="value" style="color:${statusColor}">${statusLabel}</div></div>
  </div>

  <table>
    <thead><tr><th>#</th><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><div class="item-title">${invoice.courseTitle || "Course Enrollment"}</div>
            <div class="item-sub">${[invoice.courseSubject, invoice.courseBatch].filter(Boolean).join(" • ")}</div></td>
        <td>1</td>
        <td>${INR(invoice.subtotal)}</td>
        <td>${INR(invoice.subtotal)}</td>
      </tr>
    </tbody>
    <tfoot>
      ${invoice.discount > 0 ? `<tr class="discount"><td colspan="4">Discount${invoice.couponCode ? ` (${invoice.couponCode})` : ""}</td><td>− ${INR(invoice.discount)}</td></tr>` : ""}
      ${invoice.tax > 0 ? `<tr><td colspan="4">Tax (GST)</td><td>${INR(invoice.tax)}</td></tr>` : ""}
      <tr class="total"><td colspan="4">Total</td><td>${INR(invoice.total)}</td></tr>
    </tfoot>
  </table>

  <div class="bottom">
    <div>
      <div class="label">Amount Chargeable (in words)</div>
      <div class="words-value">${words}</div>
    </div>
    <div class="sig">
      <div class="for">For ${BUSINESS.name}</div>
      <img src="${SIG_URL}" alt="Signature"/>
      <div class="director">Director</div>
    </div>
  </div>

  <div class="footer">
    This is a computer-generated invoice. No signature required for validity.<br/>
    Ref: ${invoice.orderId || "—"}${invoice.paymentId ? ` / ${invoice.paymentId}` : ""} • Queries: ${BUSINESS.email}
  </div>
</div>
</body></html>`;
}

/* alias — kept for any existing internal references */
export function buildInvoiceHTML(invoice) {
  return getInvoiceHTML(invoice);
}
