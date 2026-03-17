// pages/student/invoice-print.jsx
// Dedicated print page for invoice PDF
// Usage: /student/invoice-print?id=INVOICE_ID
//
// Student:  opens this page → browser prints / saves as PDF
// Admin:    /student/invoice-print?id=XXX&admin=1  (skips auth check via admin token)
//
// The page auto-triggers window.print() after load.
// User saves as PDF from the print dialog.

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

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
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"100vh", fontFamily:"sans-serif", color:"#8491a8" }}>
      Loading invoice...
    </div>
  );

  if (error) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:"100vh", fontFamily:"sans-serif", color:"#ef4444", gap:12 }}>
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

  return (
    <>
      <Head>
        <title>Invoice {invoice.invoiceNumber} — SS Coaching</title>
        <style>{`
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
          style={{ padding:"10px 20px", background:"linear-gradient(135deg,#4441e5,#6b68ff)", color:"#fff", border:"none", borderRadius:9, fontWeight:700, fontSize:"0.88rem", cursor:"pointer", boxShadow:"0 4px 14px rgba(68,65,229,0.3)" }}
        >
          🖨️ Print / Save as PDF
        </button>
        <button
          onClick={() => window.close()}
          style={{ padding:"10px 16px", background:"#fff", border:"1.5px solid #e2e5f8", borderRadius:9, fontWeight:600, fontSize:"0.85rem", cursor:"pointer", color:"#6b7a99" }}
        >
          Close
        </button>
      </div>

      {/* Invoice content */}
      <div style={{ maxWidth:760, margin:"0 auto", padding:"40px 48px", fontFamily:"'Segoe UI',Arial,sans-serif", color:"#1a1a2e", fontSize:13, lineHeight:1.5 }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:32 }}>
          <div>
            <div style={{ width:50, height:50, background:"linear-gradient(135deg,#4441e5,#6b68ff)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:19, fontWeight:900, marginBottom:8 }}>SS</div>
            <div style={{ fontSize:19, fontWeight:900, color:"#0f1f3d" }}>SS Coaching</div>
            <div style={{ fontSize:11, color:"#8491a8", marginTop:2 }}>Rise From Failure • Estd. 2001</div>
            <div style={{ fontSize:11, color:"#8491a8", marginTop:6, lineHeight:1.7 }}>Lucknow, Uttar Pradesh<br/>info@sscoaching.in • sscoaching.in</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:26, fontWeight:900, color:"#4441e5", letterSpacing:-1 }}>INVOICE</div>
            <div style={{ fontSize:13, fontWeight:700, color:"#0f1f3d", marginTop:4 }}>{invoice.invoiceNumber}</div>
            <div style={{ fontSize:11, color:"#8491a8", marginTop:3 }}>Issued: {date}</div>
            <div style={{ marginTop:8 }}>
              <span style={{ padding:"3px 12px", borderRadius:100, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", background:`${statusColor}18`, color:statusColor, border:`1px solid ${statusColor}44` }}>
                {(invoice.status || "paid").toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Gradient divider */}
        <div style={{ height:2, background:"linear-gradient(90deg,#4441e5,#00cbb8)", borderRadius:2, margin:"0 0 24px" }} />

        {/* Parties */}
        <div style={{ display:"flex", gap:32, marginBottom:26 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:"#8491a8", marginBottom:7 }}>Bill To</div>
            <div style={{ fontSize:14, fontWeight:800, color:"#0f1f3d" }}>{invoice.studentName || "Student"}</div>
            <div style={{ fontSize:11, color:"#6b7a99", marginTop:3, lineHeight:1.6 }}>
              {invoice.studentPhone && `+91 ${invoice.studentPhone}`}
              {invoice.studentPhone && invoice.studentEmail && <br/>}
              {invoice.studentEmail}
            </div>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", color:"#8491a8", marginBottom:7 }}>From</div>
            <div style={{ fontSize:14, fontWeight:800, color:"#0f1f3d" }}>SS Coaching</div>
            <div style={{ fontSize:11, color:"#6b7a99", marginTop:3, lineHeight:1.6 }}>Lucknow, Uttar Pradesh<br/>info@sscoaching.in</div>
          </div>
        </div>

        {/* Items table */}
        <table style={{ width:"100%", borderCollapse:"collapse", marginBottom:22 }}>
          <thead>
            <tr style={{ background:"#f4f5ff" }}>
              <th style={{ padding:"10px 13px", textAlign:"left", fontSize:10, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#4441e5" }}>#</th>
              <th style={{ padding:"10px 13px", textAlign:"left", fontSize:10, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#4441e5" }}>Description</th>
              <th style={{ padding:"10px 13px", textAlign:"left", fontSize:10, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#4441e5" }}>Type</th>
              <th style={{ padding:"10px 13px", textAlign:"right", fontSize:10, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#4441e5" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom:"1px solid #f0f1fa" }}>
              <td style={{ padding:"12px 13px", fontSize:12, color:"#2d3a5a" }}>1</td>
              <td style={{ padding:"12px 13px" }}>
                <div style={{ fontWeight:700, color:"#0f1f3d", fontSize:13 }}>{invoice.courseTitle || "Course Enrollment"}</div>
                <div style={{ fontSize:11, color:"#8491a8", marginTop:2 }}>
                  {invoice.courseSubject}{invoice.courseBatch ? ` • ${invoice.courseBatch}` : ""}
                </div>
              </td>
              <td style={{ padding:"12px 13px", fontSize:12, color:"#2d3a5a" }}>Online Course</td>
              <td style={{ padding:"12px 13px", textAlign:"right", fontWeight:600, color:"#2d3a5a" }}>{fmt(invoice.subtotal)}</td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ marginLeft:"auto", width:250 }}>
          <div style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", fontSize:12, color:"#6b7a99" }}>
            <span>Subtotal</span><span>{fmt(invoice.subtotal)}</span>
          </div>
          {invoice.discount > 0 && (
            <div style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", fontSize:12, color:"#10b981" }}>
              <span>Discount{invoice.couponCode ? ` (${invoice.couponCode})` : ""}</span>
              <span>− {fmt(invoice.discount)}</span>
            </div>
          )}
          {invoice.tax > 0 && (
            <div style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", fontSize:12, color:"#6b7a99" }}>
              <span>Tax (GST)</span><span>{fmt(invoice.tax)}</span>
            </div>
          )}
          <hr style={{ border:"none", borderTop:"1px solid #e8eaf5", margin:"7px 0" }}/>
          <div style={{ display:"flex", justifyContent:"space-between", padding:"7px 0 0", fontSize:15, fontWeight:900, color:"#0f1f3d" }}>
            <span>Total Paid</span><span style={{ color:"#4441e5" }}>{fmt(invoice.total)}</span>
          </div>
        </div>

        {/* Payment info */}
        <div style={{ marginTop:26, background:"#f8f9ff", border:"1.5px solid #e2e5f8", borderRadius:10, padding:"13px 17px", display:"flex", gap:28 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#8491a8", marginBottom:4 }}>Payment Method</div>
            <div style={{ fontSize:12, fontWeight:600, color:"#0f1f3d" }}>{invoice.paymentMethod || "—"}</div>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#8491a8", marginBottom:4 }}>Order ID</div>
            <div style={{ fontSize:11, fontWeight:600, color:"#0f1f3d", wordBreak:"break-all", fontFamily:"monospace" }}>{invoice.orderId || "—"}</div>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, fontWeight:800, letterSpacing:"0.1em", textTransform:"uppercase", color:"#8491a8", marginBottom:4 }}>Payment ID</div>
            <div style={{ fontSize:11, fontWeight:600, color:"#0f1f3d", wordBreak:"break-all", fontFamily:"monospace" }}>{invoice.paymentId || "—"}</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop:32, paddingTop:16, borderTop:"1px solid #f0f1fa", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ fontSize:11, color:"#8491a8", lineHeight:1.7 }}>
            Computer-generated invoice. Queries: info@sscoaching.in
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#4441e5" }}>Thank you for enrolling! 🎓</div>
            <div style={{ fontSize:11, color:"#8491a8" }}>SS Coaching — Lucknow</div>
          </div>
        </div>

      </div>
    </>
  );
}