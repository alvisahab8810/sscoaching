// components/student/InvoicesSection.jsx
// Add this component to your student dashboard
//
// STEP 1: Import it in pages/student/dashboard.jsx:
//   import InvoicesSection from "@/components/student/InvoicesSection";
//
// STEP 2: Add nav item in the sidebar:
//   <button className={`sd-nav-item ${activeMenu==="invoices"?"sd-nav-active":""}`}
//     onClick={() => navigate("invoices")}>
//     <MdReceipt className="sd-nav-icon" /> My Invoices
//   </button>
//
// STEP 3: Add the topbar title:
//   {activeMenu === "invoices" && <span><MdReceipt size={18} style={{marginRight:6}}/> My Invoices</span>}
//
// STEP 4: Add the tab render block:
//   {activeMenu === "invoices" && <InvoicesSection />}

import { useState, useEffect } from "react";
import {
  MdReceipt, MdDownload, MdOpenInNew, MdCheckCircle,
  MdClose, MdPayment, MdSchool, MdCalendarToday,
} from "react-icons/md";
import { BsReceipt } from "react-icons/bs";

const STATUS_CONFIG = {
  paid:      { label: "Paid",      bg: "#d1fae5", color: "#065f46", dot: "#10b981" },
  refunded:  { label: "Refunded",  bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
  cancelled: { label: "Cancelled", bg: "#fee2e2", color: "#991b1b", dot: "#ef4444" },
};

function fmt(n) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);
}
function fmtDate(d) {
  return d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";
}

export default function InvoicesSection() {
  const [invoices, setInvoices]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState(null);
  const [downloading, setDownloading] = useState(null); // invoice id being downloaded

  /* ── Fetch student's invoices ── */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("studentToken");
        const res   = await fetch("/api/invoices/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setInvoices(data.invoices);
      } catch { console.error("Failed to load invoices"); }
      finally   { setLoading(false); }
    };
    load();
  }, []);

  /* ── Download PDF ── */
  const downloadPdf = async (invoice) => {
    setDownloading(invoice._id);
    try {
      const token = localStorage.getItem("studentToken");
      const res   = await fetch(`/api/invoices/my?id=${invoice._id}&pdf=1`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) { alert("PDF generation failed. Please try again."); return; }
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `Invoice-${invoice.invoiceNumber}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch { alert("Download failed. Please try again."); }
    finally   { setDownloading(null); }
  };

  if (loading) {
    return (
      <div className="si-loading">
        <div className="si-spinner" />
        <span>Loading your invoices...</span>
        <style jsx>{`.si-loading{display:flex;align-items:center;justify-content:center;gap:12px;padding:64px;color:#8491a8;font-size:0.9rem;}.si-spinner{width:22px;height:22px;border:2px solid #e2e5f8;border-top-color:#6c47d4;border-radius:50%;animation:spin 0.7s linear infinite;}@keyframes spin{to{transform:rotate(360deg);}}`}</style>
      </div>
    );
  }

  return (
    <div className="si-wrap">

      {/* Header */}
      <div className="si-header">
        <div>
          <div className="si-title"><MdReceipt size={20} /> My Invoices</div>
          <div className="si-sub">Download and view all your purchase invoices</div>
        </div>
        <div className="si-count">{invoices.length} invoice{invoices.length !== 1 ? "s" : ""}</div>
      </div>

      {/* Empty */}
      {invoices.length === 0 && (
        <div className="si-empty">
          <BsReceipt size={52} className="si-empty-icon" />
          <div className="si-empty-title">No Invoices Yet</div>
          <p>Invoices for your course purchases will appear here.</p>
        </div>
      )}

      {/* Invoice list */}
      {invoices.length > 0 && (
        <div className="si-list">
          {invoices.map((inv) => {
            const sc = STATUS_CONFIG[inv.status] || STATUS_CONFIG.paid;
            const isDownloading = downloading === inv._id;
            return (
              <div key={inv._id} className="si-card">
                <div className="si-card-left">
                  <div className="si-card-icon">
                    <MdReceipt size={20} />
                  </div>
                  <div className="si-card-info">
                    <div className="si-card-num">{inv.invoiceNumber}</div>
                    <div className="si-card-course">{inv.courseTitle}</div>
                    <div className="si-card-meta">
                      <span><MdCalendarToday size={11} /> {fmtDate(inv.issuedAt)}</span>
                      {inv.couponCode && (
                        <span className="si-coupon">🎟 {inv.couponCode}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="si-card-right">
                  <div className="si-card-amount">{fmt(inv.total)}</div>
                  {inv.discount > 0 && (
                    <div className="si-card-discount">-{fmt(inv.discount)} saved</div>
                  )}
                  <span className="si-status" style={{ background: sc.bg, color: sc.color }}>
                    <span className="si-status-dot" style={{ background: sc.dot }} />
                    {sc.label}
                  </span>
                  <div className="si-card-btns">
                    <button
                      className="si-btn si-btn-download"
                      onClick={() => downloadPdf(inv)}
                      disabled={isDownloading}
                      title="Download PDF"
                    >
                      <MdDownload size={15} />
                      {isDownloading ? "..." : "PDF"}
                    </button>
                    <button
                      className="si-btn si-btn-view"
                      onClick={() => setSelected(inv)}
                      title="View Details"
                    >
                      <MdOpenInNew size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <>
          <div className="si-modal-overlay" onClick={() => setSelected(null)} />
          <div className="si-modal">
            <div className="si-modal-header">
              <div>
                <div className="si-modal-title">{selected.invoiceNumber}</div>
                <div className="si-modal-sub">Invoice Details</div>
              </div>
              <div className="si-modal-header-right">
                <button
                  className="si-modal-download"
                  onClick={() => downloadPdf(selected)}
                  disabled={downloading === selected._id}
                >
                  <MdDownload size={15} />
                  {downloading === selected._id ? "Generating..." : "Download PDF"}
                </button>
                <button className="si-modal-close" onClick={() => setSelected(null)}>
                  <MdClose size={20} />
                </button>
              </div>
            </div>

            <div className="si-modal-body">

              {/* Amount hero */}
              <div className="si-modal-hero">
                <div className="si-modal-hero-label">Amount Paid</div>
                <div className="si-modal-hero-amount">{fmt(selected.total)}</div>
                {selected.discount > 0 && (
                  <div className="si-modal-hero-disc">
                    🎉 You saved {fmt(selected.discount)}{selected.couponCode ? ` with ${selected.couponCode}` : ""}
                  </div>
                )}
                <div className="si-modal-hero-status">
                  {(() => {
                    const sc = STATUS_CONFIG[selected.status] || STATUS_CONFIG.paid;
                    return (
                      <span style={{ background: "rgba(255,255,255,0.2)", color: "#fff", padding: "3px 12px", borderRadius: "100px", fontSize: "0.72rem", fontWeight: 700 }}>
                        {sc.label}
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* Course info */}
              <div className="si-modal-section">
                <div className="si-modal-section-title"><MdSchool size={13} /> Course</div>
                <div className="si-modal-row"><span>Course</span><span>{selected.courseTitle}</span></div>
                {selected.courseSubject && <div className="si-modal-row"><span>Subject</span><span>{selected.courseSubject}</span></div>}
                {selected.courseBatch   && <div className="si-modal-row"><span>Batch</span><span>{selected.courseBatch}</span></div>}
              </div>

              {/* Payment */}
              <div className="si-modal-section">
                <div className="si-modal-section-title"><MdPayment size={13} /> Payment Details</div>
                <div className="si-modal-row"><span>Date</span><span>{fmtDate(selected.issuedAt)}</span></div>
                <div className="si-modal-row"><span>Method</span><span>{selected.paymentMethod || "Razorpay"}</span></div>
                <div className="si-modal-row"><span>Order ID</span><span className="si-mono">{selected.orderId || "—"}</span></div>
                <div className="si-modal-row"><span>Payment ID</span><span className="si-mono">{selected.paymentId || "—"}</span></div>
              </div>

              {/* Amount breakdown */}
              <div className="si-modal-section">
                <div className="si-modal-section-title">Amount Breakdown</div>
                <div className="si-modal-row"><span>Course Price</span><span>{fmt(selected.subtotal)}</span></div>
                {selected.discount > 0 && (
                  <div className="si-modal-row si-row-green">
                    <span>Discount {selected.couponCode ? `(${selected.couponCode})` : ""}</span>
                    <span>-{fmt(selected.discount)}</span>
                  </div>
                )}
                <div className="si-modal-row si-row-total"><span>Total Paid</span><span>{fmt(selected.total)}</span></div>
              </div>

              {/* Email */}
              <div className="si-modal-section">
                <div className="si-modal-section-title">Invoice Email</div>
                <div className="si-modal-row">
                  <span>Delivery</span>
                  <span style={{ color: selected.emailSent ? "#10b981" : "#f59e0b", fontWeight: 700 }}>
                    {selected.emailSent
                      ? `✅ Sent to your email on ${fmtDate(selected.emailSentAt)}`
                      : "⏳ Being processed..."}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .si-wrap { padding-bottom: 32px; }

        .si-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; }
        .si-title  { font-size:1rem; font-weight:800; color:#1a1f4b; display:flex; align-items:center; gap:7px; margin-bottom:3px; }
        .si-sub    { font-size:0.78rem; color:#8491a8; }
        .si-count  { font-size:0.78rem; font-weight:700; background:#ede9fe; color:#6c47d4; padding:4px 12px; border-radius:100px; }

        /* Empty */
        .si-empty       { text-align:center; padding:56px 24px; }
        .si-empty-icon  { color:#c4c2f0; margin-bottom:14px; }
        .si-empty-title { font-size:1rem; font-weight:800; color:#1a1f4b; margin-bottom:6px; }
        .si-empty p     { color:#8491a8; font-size:0.84rem; }

        /* List */
        .si-list { display:flex; flex-direction:column; gap:10px; }

        /* Card */
        .si-card {
          background:#fff;
          border:1.5px solid #e2e5f8;
          border-radius:12px;
          padding:14px 16px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          transition:box-shadow 0.15s;
        }
        .si-card:hover { box-shadow:0 4px 18px rgba(108,71,212,0.1); }

        .si-card-left  { display:flex; align-items:center; gap:12px; flex:1; min-width:0; }
        .si-card-icon  { width:42px; height:42px; background:#ede9fe; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#6c47d4; flex-shrink:0; }
        .si-card-info  { min-width:0; }
        .si-card-num   { font-size:0.82rem; font-weight:800; color:#6c47d4; }
        .si-card-course { font-size:0.85rem; font-weight:600; color:#1a1f4b; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px; }
        .si-card-meta  { display:flex; align-items:center; gap:8px; margin-top:4px; font-size:0.7rem; color:#8491a8; }
        .si-coupon     { background:#ede9fe; color:#6c47d4; padding:1px 7px; border-radius:100px; font-weight:700; font-size:0.68rem; }

        .si-card-right { display:flex; flex-direction:column; align-items:flex-end; gap:5px; flex-shrink:0; }
        .si-card-amount   { font-size:1rem; font-weight:900; color:#1a1f4b; }
        .si-card-discount { font-size:0.68rem; color:#10b981; font-weight:700; }

        .si-status     { display:inline-flex; align-items:center; gap:4px; padding:2px 9px; border-radius:100px; font-size:0.67rem; font-weight:700; }
        .si-status-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }

        .si-card-btns { display:flex; gap:6px; margin-top:2px; }
        .si-btn       { display:flex; align-items:center; gap:5px; padding:6px 10px; border-radius:7px; border:1.5px solid; font-size:0.75rem; font-weight:600; cursor:pointer; transition:background 0.13s; }
        .si-btn:disabled { opacity:0.5; cursor:not-allowed; }
        .si-btn-download { border-color:#6c47d4; color:#6c47d4; background:#ede9fe; }
        .si-btn-download:hover:not(:disabled) { background:#ddd6fe; }
        .si-btn-view     { border-color:#e2e5f8; color:#6b7a99; background:#fff; }
        .si-btn-view:hover { background:#f5f6ff; color:#6c47d4; border-color:#6c47d4; }

        /* Modal overlay */
        .si-modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.3); z-index:1040; }
        .si-modal {
          position:fixed; bottom:0; left:0; right:0;
          background:#fff; border-radius:20px 20px 0 0;
          z-index:1050; max-height:92vh; overflow-y:auto;
          box-shadow:0 -8px 40px rgba(0,0,0,0.15);
        }

        /* On desktop, show as centered modal */
        @media (min-width:640px) {
          .si-modal {
            top:50%; left:50%; right:auto; bottom:auto;
            transform:translate(-50%,-50%);
            width:480px; max-height:88vh;
            border-radius:16px;
          }
        }

        .si-modal-header {
          display:flex; align-items:center; justify-content:space-between;
          padding:18px 20px; border-bottom:1.5px solid #eceeff;
          position:sticky; top:0; background:#fff; z-index:2;
        }
        .si-modal-title { font-size:1rem; font-weight:800; color:#6c47d4; }
        .si-modal-sub   { font-size:0.72rem; color:#8491a8; margin-top:2px; }
        .si-modal-header-right { display:flex; align-items:center; gap:8px; }
        .si-modal-download {
          display:flex; align-items:center; gap:6px;
          padding:8px 14px; border:1.5px solid #6c47d4;
          border-radius:8px; background:#ede9fe; color:#6c47d4;
          font-size:0.78rem; font-weight:700; cursor:pointer;
          white-space:nowrap;
        }
        .si-modal-download:hover:not(:disabled) { background:#ddd6fe; }
        .si-modal-download:disabled { opacity:0.5; cursor:not-allowed; }
        .si-modal-close {
          width:34px; height:34px; display:flex; align-items:center; justify-content:center;
          border:1.5px solid #e2e5f8; border-radius:8px; background:#fff; cursor:pointer; color:#6b7a99;
        }

        .si-modal-body { padding:20px; }

        .si-modal-hero {
          background:linear-gradient(135deg,#6c47d4,#8b5cf6);
          border-radius:12px; padding:22px; text-align:center;
          color:#fff; margin-bottom:20px;
        }
        .si-modal-hero-label  { font-size:0.7rem; font-weight:700; opacity:0.7; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:6px; }
        .si-modal-hero-amount { font-size:2rem; font-weight:900; }
        .si-modal-hero-disc   { font-size:0.8rem; opacity:0.8; margin-top:6px; }
        .si-modal-hero-status { margin-top:10px; }

        .si-modal-section       { margin-bottom:20px; }
        .si-modal-section-title {
          font-size:0.66rem; font-weight:800; letter-spacing:0.1em;
          text-transform:uppercase; color:#8491a8;
          margin-bottom:10px; display:flex; align-items:center; gap:5px;
        }
        .si-modal-row { display:flex; justify-content:space-between; padding:7px 0; border-bottom:1px solid #f3f4fb; font-size:0.82rem; gap:12px; }
        .si-modal-row span:first-child { color:#8491a8; flex-shrink:0; }
        .si-modal-row span:last-child  { color:#1a1f4b; font-weight:600; text-align:right; word-break:break-all; }
        .si-row-green span:last-child  { color:#10b981 !important; }
        .si-row-total span             { font-weight:800 !important; font-size:0.9rem !important; color:#6c47d4 !important; }
        .si-mono { font-family:monospace; font-size:0.74rem !important; }
      `}</style>
    </div>
  );
}