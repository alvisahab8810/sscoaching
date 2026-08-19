// pages/student/invoice-print.jsx
// Dedicated print page for invoice PDF
// Usage: /student/invoice-print?id=INVOICE_ID
//
// Student:  opens this page → browser prints / saves as PDF
// Admin:    /student/invoice-print?id=XXX&admin=1  (skips auth check via admin token)
//
// The page auto-triggers window.print() after load.
// User saves as PDF from the print dialog.
//
// Visual design mirrors lib/invoicePdf.js (the emailed/downloaded PDF) and
// lib/sendInvoiceEmail.js so the invoice looks identical everywhere:
// logo.svg + signature.svg, #6247FD purple, #F5F5FF stripe, Inter font.

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const BUSINESS = {
  name:    "SS Coaching",
  email:   "contact@sscoaching.in",
  gstin:   "09HSCPD0357Q1ZB",
  address: "IIIrd Floor, Shree Chamber, Naza Computer Market, Near Basant Cinema, Hazratganj, Lucknow.",
};

const C = {
  purple: "#6247FD",
  stripe: "#F5F5FF",
  dark:   "#181828",
  gray:   "#8A8FA3",
  border: "#E5E5F5",
};

/* Indian numbering (crore/lakh/thousand) — mirrors lib/invoicePdf.js */
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

export default function InvoicePrintPage() {
  const router = useRouter();
  const { id, admin } = router.query;

  const [invoice, setInvoice] = useState(null);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const token = localStorage.getItem("studentToken") || "";
        const url   = admin === "1"
          ? `/api/invoices/${id}`           // admin endpoint
          : `/api/invoices/my?id=${id}`;    // student endpoint
        const res  = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (data.success) {
          setInvoice(data.invoice);
        } else {
          setError(data.error || "Invoice not found");
        }
      } catch {
        setError("Failed to load invoice");
      }
      setLoading(false);
    };
    load();
  }, [id, admin]);

  // Auto-print once invoice loads
  useEffect(() => {
    if (invoice) {
      setTimeout(() => window.print(), 600);
    }
  }, [invoice]);

  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", fontFamily:"'Inter',sans-serif", color:C.gray }}>
      Loading invoice...
    </div>
  );

  if (error) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", fontFamily:"'Inter',sans-serif", color:"#ef4444", gap:12 }}>
      <div style={{ fontSize:"1.1rem", fontWeight:700 }}>⚠️ {error}</div>
      <button onClick={() => window.close()} style={{ padding:"8px 18px", border:"1.5px solid #ef4444", borderRadius:8, background:"#fff", color:"#ef4444", cursor:"pointer", fontWeight:600 }}>
        Close
      </button>
    </div>
  );

  if (!invoice) return null;

  const fmt = (n) => new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 }).format(n || 0);
  const date = new Date(invoice.issuedAt || invoice.createdAt).toLocaleDateString("en-IN", { day:"2-digit", month:"long", year:"numeric" });
  const statusColor = { paid:"#10b981", pending:"#f59e0b", refunded:"#f59e0b", cancelled:"#ef4444" }[invoice.status] || "#10b981";
  const amountWords = `INR ${numberToWordsIndian(invoice.total)} Only`;

  return (
    <>
      <Head>
        <title>Invoice {invoice.invoiceNumber} — SS Coaching</title>
        <style>{`
          @font-face { font-family:'Inter'; src: url('/assets/fonts/inter/Inter-Regular.ttf') format('truetype'); font-weight:400; }
          @font-face { font-family:'Inter'; src: url('/assets/fonts/inter/Inter-Medium.ttf') format('truetype'); font-weight:500; }
          @font-face { font-family:'Inter'; src: url('/assets/fonts/inter/Inter-SemiBold.ttf') format('truetype'); font-weight:600; }
          @font-face { font-family:'Inter'; src: url('/assets/fonts/inter/Inter-Bold.ttf') format('truetype'); font-weight:700; }
          @media print {
            .no-print { display: none !important; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            @page { margin: 0; size: A4; }
          }
        `}</style>
      </Head>

      {/* Print button — hidden when printing */}
      <div className="no-print" style={{ position:"fixed", top:16, right:16, zIndex:100, display:"flex", gap:8 }}>
        <button
          onClick={() => window.print()}
          style={{ padding:"10px 20px", background:C.purple, color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:"0.88rem", cursor:"pointer", boxShadow:"0 4px 14px rgba(98,71,253,0.3)", fontFamily:"'Inter',sans-serif" }}
        >
          🖨️ Print / Save as PDF
        </button>
        <button
          onClick={() => window.close()}
          style={{ padding:"10px 16px", background:"#fff", border:`1.5px solid ${C.border}`, borderRadius:9, fontWeight:600, fontSize:"0.85rem", cursor:"pointer", color:C.gray, fontFamily:"'Inter',sans-serif" }}
        >
          Close
        </button>
      </div>

      {/* Invoice content */}
      <div style={{ maxWidth:760, margin:"0 auto", padding:"40px 48px", fontFamily:"'Inter',Arial,sans-serif", color:C.dark, fontSize:13, lineHeight:1.5 }}>

        <div style={{ border:`1px solid ${C.border}`, borderRadius:10, padding:"28px 30px" }}>

          {/* Header */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
            <img src="/assets/invoice/logo.svg" alt="SS Coaching" style={{ height:31, width:"auto" }} />
            <div style={{ fontSize:27, fontWeight:700, color:C.purple, letterSpacing:-0.5 }}>Invoice</div>
          </div>

          {/* Divider */}
          <div style={{ height:1, background:C.border, margin:"0 0 20px" }} />

          {/* Two-column info block */}
          <div style={{ display:"flex", gap:32, marginBottom:20 }}>
            <div style={{ flex:1.2 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray, marginBottom:3 }}>Trade Name</div>
              <div style={{ fontSize:13, fontWeight:600, color:C.dark, marginBottom:10 }}>{BUSINESS.name}</div>

              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray, marginBottom:3 }}>Email</div>
              <div style={{ fontSize:12, color:C.dark, marginBottom:10 }}>{BUSINESS.email}</div>

              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray, marginBottom:3 }}>GSTIN</div>
              <div style={{ fontSize:12, color:C.dark, marginBottom:10 }}>{BUSINESS.gstin}</div>

              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray, marginBottom:3 }}>Address</div>
              <div style={{ fontSize:12, color:C.dark, lineHeight:1.5 }}>{BUSINESS.address}</div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray, marginBottom:3 }}>Bill To</div>
              <div style={{ fontSize:13, fontWeight:600, color:C.dark, marginBottom:10 }}>{invoice.studentName || "Student"}</div>

              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray, marginBottom:3 }}>Contact</div>
              <div style={{ fontSize:12, color:C.dark, marginBottom:10 }}>{invoice.studentPhone ? `+91 ${invoice.studentPhone}` : "—"}</div>

              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray, marginBottom:3 }}>Email</div>
              <div style={{ fontSize:12, color:C.dark }}>{invoice.studentEmail || "—"}</div>
            </div>
          </div>

          {/* Stripe row: invoice number / date / status */}
          <div style={{ background:C.stripe, borderRadius:8, padding:"12px 16px", display:"flex", justifyContent:"space-between", marginBottom:20 }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray, marginBottom:3 }}>Invoice Number</div>
              <div style={{ fontSize:13, fontWeight:700, color:C.dark }}>{invoice.invoiceNumber}</div>
            </div>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray, marginBottom:3 }}>Invoice Date</div>
              <div style={{ fontSize:13, fontWeight:700, color:C.dark }}>{date}</div>
            </div>
            <div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray, marginBottom:3 }}>Payment Status</div>
              <div style={{ fontSize:13, fontWeight:700, color:statusColor, textTransform:"uppercase" }}>{invoice.status || "Paid"}</div>
            </div>
          </div>

          {/* Items table */}
          <div style={{ border:`1px solid ${C.border}`, borderRadius:8, overflow:"hidden", marginBottom:20 }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:C.stripe }}>
                  <th style={{ padding:"10px 13px", textAlign:"left", fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.purple }}>#</th>
                  <th style={{ padding:"10px 13px", textAlign:"left", fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.purple }}>Description</th>
                  <th style={{ padding:"10px 13px", textAlign:"center", fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.purple }}>Qty</th>
                  <th style={{ padding:"10px 13px", textAlign:"right", fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.purple }}>Rate</th>
                  <th style={{ padding:"10px 13px", textAlign:"right", fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.purple }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop:`1px solid ${C.border}` }}>
                  <td style={{ padding:"12px 13px", fontSize:12, color:C.dark, verticalAlign:"top" }}>1</td>
                  <td style={{ padding:"12px 13px", verticalAlign:"top" }}>
                    <div style={{ fontWeight:600, color:C.dark, fontSize:13 }}>{invoice.courseTitle || "Course Enrollment"}</div>
                    {(invoice.courseSubject || invoice.courseBatch) && (
                      <div style={{ fontSize:11, color:C.gray, marginTop:2 }}>
                        {invoice.courseSubject}{invoice.courseBatch ? ` • ${invoice.courseBatch}` : ""}
                      </div>
                    )}
                  </td>
                  <td style={{ padding:"12px 13px", fontSize:12, color:C.dark, textAlign:"center", verticalAlign:"top" }}>1</td>
                  <td style={{ padding:"12px 13px", fontSize:12, color:C.dark, textAlign:"right", verticalAlign:"top" }}>{fmt(invoice.subtotal)}</td>
                  <td style={{ padding:"12px 13px", fontSize:12, fontWeight:600, color:C.dark, textAlign:"right", verticalAlign:"top" }}>{fmt(invoice.subtotal)}</td>
                </tr>
                {invoice.discount > 0 && (
                  <tr style={{ borderTop:`1px solid ${C.border}` }}>
                    <td colSpan={4} style={{ padding:"8px 13px", fontSize:12, color:"#10b981", textAlign:"right" }}>Discount{invoice.couponCode ? ` (${invoice.couponCode})` : ""}</td>
                    <td style={{ padding:"8px 13px", fontSize:12, fontWeight:600, color:"#10b981", textAlign:"right" }}>− {fmt(invoice.discount)}</td>
                  </tr>
                )}
                {invoice.tax > 0 && (
                  <tr style={{ borderTop:`1px solid ${C.border}` }}>
                    <td colSpan={4} style={{ padding:"8px 13px", fontSize:12, color:C.gray, textAlign:"right" }}>Tax (GST)</td>
                    <td style={{ padding:"8px 13px", fontSize:12, fontWeight:600, color:C.dark, textAlign:"right" }}>{fmt(invoice.tax)}</td>
                  </tr>
                )}
                <tr style={{ background:C.stripe, borderTop:`1px solid ${C.border}` }}>
                  <td colSpan={4} style={{ padding:"12px 13px", fontSize:13, fontWeight:700, color:C.dark, textAlign:"right" }}>Total</td>
                  <td style={{ padding:"12px 13px", fontSize:16, fontWeight:700, color:C.purple, textAlign:"right" }}>{fmt(invoice.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Amount in words + signature */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
            <div style={{ maxWidth:340 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.gray, marginBottom:4 }}>Amount Chargeable (in words)</div>
              <div style={{ fontSize:12, fontWeight:600, color:C.dark }}>{amountWords}</div>
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:11, color:C.gray, marginBottom:6 }}>For {BUSINESS.name}</div>
              <img src="/assets/invoice/signature.svg" alt="Signature" style={{ height:47, width:"auto", display:"block", margin:"0 auto" }} />
              <div style={{ fontSize:11, fontWeight:600, color:C.dark, marginTop:6, borderTop:`1px solid ${C.border}`, paddingTop:4 }}>Director</div>
            </div>
          </div>

        </div>

        {/* Footer (outside card) */}
        <div style={{ marginTop:20, textAlign:"center" }}>
          <div style={{ fontSize:11, color:C.gray, lineHeight:1.7 }}>
            This is a computer-generated invoice and does not require a physical signature.
          </div>
          <div style={{ fontSize:11, color:C.gray, marginTop:2 }}>
            Ref: {invoice.orderId || "—"} / {invoice.paymentId || "—"} • Queries: {BUSINESS.email}
          </div>
        </div>

      </div>
    </>
  );
}
