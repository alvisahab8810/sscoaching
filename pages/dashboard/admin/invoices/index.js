// pages/dashboard/admin/invoices/index.jsx
import { useState, useEffect, useCallback } from "react";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Head from "next/head";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";
import {
  MdReceipt, MdSearch, MdDownload, MdEmail, MdRefresh,
  MdFilterList, MdClose, MdCheckCircle, MdCancel,
  MdCurrencyRupee, MdOpenInNew, MdArrowBack, MdPerson,
  MdCalendarToday, MdPayment, MdSchool,
} from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
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

export default function AdminInvoicesPage({ admin }) {
  const [invoices, setInvoices]     = useState([]);
  const [stats, setStats]           = useState({});
  const [loading, setLoading]       = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  // Filters
  const [search, setSearch]     = useState("");
  const [status, setStatus]     = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate]     = useState("");

  // Detail panel
  const [selected, setSelected]   = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [resending, setResending]  = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  /* ── Fetch invoices ── */
  const fetchInvoices = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page, limit: 20,
        ...(status !== "all" && { status }),
        ...(search   && { search }),
        ...(fromDate && { from: fromDate }),
        ...(toDate   && { to: toDate }),
      });
      const res  = await fetch(`/api/invoices?${params}`);
      const data = await res.json();
      if (data.success) {
        setInvoices(data.invoices);
        setPagination(data.pagination);
        setStats(data.stats || {});
      } else { toast.error("Failed to load invoices"); }
    } catch { toast.error("Network error"); }
    finally   { setLoading(false); }
  }, [status, search, fromDate, toDate]);

  useEffect(() => { fetchInvoices(1); }, [fetchInvoices]);

  /* ── Download PDF ── */
  const downloadPdf = async (invoice) => {
    toast.info("Generating PDF...");
    try {
      const res = await fetch(`/api/invoices/${invoice._id}?pdf=1`);
      if (!res.ok) { toast.error("PDF generation failed"); return; }
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `Invoice-${invoice.invoiceNumber}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("PDF downloaded!");
    } catch { toast.error("Download failed"); }
  };

  /* ── Resend email ── */
  const resendEmail = async (invoice) => {
    if (!invoice.studentEmail) { toast.error("No student email on record"); return; }
    setResending(true);
    try {
      const res  = await fetch(`/api/invoices/${invoice._id}?action=resend`, { method: "POST" });
      const data = await res.json();
      if (data.success) {
        toast.success("Invoice email resent!");
        fetchInvoices(pagination.page);
        if (selected?._id === invoice._id) setSelected({ ...selected, emailSent: true });
      } else { toast.error(data.error || "Resend failed"); }
    } catch { toast.error("Network error"); }
    finally   { setResending(false); }
  };

  /* ── Update status ── */
  const updateStatus = async (invoice, newStatus) => {
    setUpdatingStatus(true);
    try {
      const res  = await fetch(`/api/invoices/${invoice._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Status updated to ${newStatus}`);
        fetchInvoices(pagination.page);
        setSelected(data.invoice);
      } else { toast.error(data.error || "Update failed"); }
    } catch { toast.error("Network error"); }
    finally   { setUpdatingStatus(false); }
  };

  const clearFilters = () => { setSearch(""); setStatus("all"); setFromDate(""); setToDate(""); };

  const hasFilters = search || status !== "all" || fromDate || toDate;

  return (
    <>
      <Head><title>Invoices — SS Coaching Admin</title></Head>
      <div className="oc-wrapper">
        <Topbar admin={admin} />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1 bg-light">
            <div className="container-fluid p-4">

              {/* PAGE HEADER */}
              <div className="inv-page-header">
                <div>
                  <h4 className="inv-page-title"><BsReceipt size={22} /> Invoices</h4>
                  <p className="inv-page-sub">All course purchase invoices</p>
                </div>
                <button className="inv-refresh-btn" onClick={() => fetchInvoices(1)} disabled={loading}>
                  <MdRefresh size={16} /> Refresh
                </button>
              </div>

              {/* STATS ROW */}
              <div className="inv-stats-row">
                {[
                  { label: "Total Revenue",  value: fmt(stats.totalRevenue),  color: "#4441e5", sub: `${stats.totalInvoices || 0} invoices` },
                  { label: "Paid",           value: stats.paidCount || 0,     color: "#10b981", sub: "successful payments" },
                  { label: "Refunded",       value: stats.refundedCount || 0, color: "#f59e0b", sub: "refunded invoices" },
                ].map((s) => (
                  <div key={s.label} className="inv-stat-card">
                    <div className="inv-stat-value" style={{ color: s.color }}>{s.value}</div>
                    <div className="inv-stat-label">{s.label}</div>
                    <div className="inv-stat-sub">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* FILTERS */}
              <div className="inv-filters">
                <div className="inv-search-wrap">
                  <MdSearch size={17} className="inv-search-icon" />
                  <input
                    className="inv-search"
                    placeholder="Search by invoice #, student name, course, payment ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="inv-filter-row">
                  <select className="inv-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="refunded">Refunded</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <input type="date" className="inv-date-input" value={fromDate} onChange={(e) => setFromDate(e.target.value)} title="From date" />
                  <input type="date" className="inv-date-input" value={toDate}   onChange={(e) => setToDate(e.target.value)}   title="To date" />
                  {hasFilters && (
                    <button className="inv-clear-btn" onClick={clearFilters}>
                      <MdClose size={14} /> Clear
                    </button>
                  )}
                </div>
              </div>

              {/* TABLE */}
              <div className="inv-table-wrap">
                {loading ? (
                  <div className="inv-loading"><div className="inv-spinner" /><span>Loading invoices...</span></div>
                ) : invoices.length === 0 ? (
                  <div className="inv-empty">
                    <BsReceipt size={48} className="inv-empty-icon" />
                    <div className="inv-empty-title">No Invoices Found</div>
                    <p>{hasFilters ? "Try clearing your filters." : "Invoices will appear here after course purchases."}</p>
                  </div>
                ) : (
                  <table className="inv-table">
                    <thead>
                      <tr>
                        <th>Invoice #</th>
                        <th>Student</th>
                        <th>Course</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((inv) => {
                        const sc = STATUS_CONFIG[inv.status] || STATUS_CONFIG.paid;
                        return (
                          <tr key={inv._id} className="inv-row" onClick={() => { setSelected(inv); setDetailOpen(true); }}>
                            <td>
                              <span className="inv-number">{inv.invoiceNumber}</span>
                            </td>
                            <td>
                              <div className="inv-student-name">{inv.studentName || "—"}</div>
                              <div className="inv-student-phone">{inv.studentPhone ? `+91 ${inv.studentPhone}` : ""}</div>
                            </td>
                            <td>
                              <div className="inv-course-title">{inv.courseTitle || "—"}</div>
                              <div className="inv-course-sub">{inv.courseSubject} {inv.courseBatch ? `• ${inv.courseBatch}` : ""}</div>
                            </td>
                            <td>
                              <div className="inv-amount">₹{(inv.total || 0).toLocaleString("en-IN")}</div>
                              {inv.discount > 0 && (
                                <div className="inv-discount">-₹{inv.discount} off</div>
                              )}
                            </td>
                            <td className="inv-date-cell">{fmtDate(inv.issuedAt)}</td>
                            <td>
                              <span className="inv-status" style={{ background: sc.bg, color: sc.color }}>
                                <span className="inv-status-dot" style={{ background: sc.dot }} />
                                {sc.label}
                              </span>
                            </td>
                            <td>
                              {inv.emailSent
                                ? <span className="inv-email-sent"><MdCheckCircle size={14} /> Sent</span>
                                : <span className="inv-email-pending">Pending</span>
                              }
                            </td>
                            <td onClick={(e) => e.stopPropagation()}>
                              <div className="inv-actions">
                                <button className="inv-action-btn inv-action-pdf" title="Download PDF" onClick={() => downloadPdf(inv)}>
                                  <MdDownload size={15} />
                                </button>
                                <button className="inv-action-btn inv-action-email" title="Resend Email"
                                  onClick={() => resendEmail(inv)} disabled={resending}>
                                  <MdEmail size={14} />
                                </button>
                                <button className="inv-action-btn inv-action-view" title="View Details"
                                  onClick={() => { setSelected(inv); setDetailOpen(true); }}>
                                  <MdOpenInNew size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {/* PAGINATION */}
              {pagination.totalPages > 1 && (
                <div className="inv-pagination">
                  <button disabled={pagination.page <= 1} onClick={() => fetchInvoices(pagination.page - 1)} className="inv-page-btn">← Prev</button>
                  <span className="inv-page-info">Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)</span>
                  <button disabled={pagination.page >= pagination.totalPages} onClick={() => fetchInvoices(pagination.page + 1)} className="inv-page-btn">Next →</button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* DETAIL PANEL (slide-in from right) */}
      {detailOpen && selected && (
        <>
          <div className="inv-detail-overlay" onClick={() => setDetailOpen(false)} />
          <div className="inv-detail-panel">
            <div className="inv-detail-header">
              <button className="inv-detail-back" onClick={() => setDetailOpen(false)}>
                <MdArrowBack size={18} />
              </button>
              <div>
                <div className="inv-detail-title">{selected.invoiceNumber}</div>
                <div className="inv-detail-sub">{fmtDate(selected.issuedAt)}</div>
              </div>
              <div className="inv-detail-actions">
                <button className="inv-btn-outline" onClick={() => downloadPdf(selected)}>
                  <MdDownload size={15} /> PDF
                </button>
                <button className="inv-btn-outline" onClick={() => resendEmail(selected)} disabled={resending}>
                  <MdEmail size={14} /> {resending ? "Sending..." : "Resend"}
                </button>
              </div>
            </div>

            <div className="inv-detail-body">

              {/* Amount hero */}
              <div className="inv-detail-amount-card">
                <div className="inv-detail-amount-label">Total Paid</div>
                <div className="inv-detail-amount">₹{(selected.total || 0).toLocaleString("en-IN")}</div>
                {selected.discount > 0 && (
                  <div className="inv-detail-discount">🎉 ₹{selected.discount} saved with {selected.couponCode || "coupon"}</div>
                )}
              </div>

              {/* Status changer */}
              <div className="inv-detail-section">
                <div className="inv-detail-section-title">Status</div>
                <div className="inv-status-row">
                  {["paid", "refunded", "cancelled"].map((s) => {
                    const sc = STATUS_CONFIG[s];
                    return (
                      <button
                        key={s}
                        className={`inv-status-opt ${selected.status === s ? "inv-status-opt-active" : ""}`}
                        style={selected.status === s ? { background: sc.bg, color: sc.color, borderColor: sc.dot } : {}}
                        onClick={() => updateStatus(selected, s)}
                        disabled={updatingStatus || selected.status === s}
                      >
                        <span className="inv-status-dot" style={{ background: sc.dot }} />
                        {sc.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Student */}
              <div className="inv-detail-section">
                <div className="inv-detail-section-title"><MdPerson size={14} /> Student</div>
                <div className="inv-detail-row"><span>Name</span><span>{selected.studentName || "—"}</span></div>
                <div className="inv-detail-row"><span>Phone</span><span>{selected.studentPhone ? `+91 ${selected.studentPhone}` : "—"}</span></div>
                <div className="inv-detail-row"><span>Email</span><span>{selected.studentEmail || "—"}</span></div>
              </div>

              {/* Course */}
              <div className="inv-detail-section">
                <div className="inv-detail-section-title"><MdSchool size={14} /> Course</div>
                <div className="inv-detail-row"><span>Title</span><span>{selected.courseTitle || "—"}</span></div>
                <div className="inv-detail-row"><span>Subject</span><span>{selected.courseSubject || "—"}</span></div>
                <div className="inv-detail-row"><span>Batch</span><span>{selected.courseBatch || "—"}</span></div>
              </div>

              {/* Payment */}
              <div className="inv-detail-section">
                <div className="inv-detail-section-title"><MdPayment size={14} /> Payment</div>
                <div className="inv-detail-row"><span>Method</span><span>{selected.paymentMethod || "Razorpay"}</span></div>
                <div className="inv-detail-row"><span>Order ID</span><span className="inv-mono">{selected.orderId || "—"}</span></div>
                <div className="inv-detail-row"><span>Payment ID</span><span className="inv-mono">{selected.paymentId || "—"}</span></div>
                <div className="inv-detail-row"><span>Subtotal</span><span>₹{(selected.subtotal || 0).toLocaleString("en-IN")}</span></div>
                {selected.discount > 0 && (
                  <div className="inv-detail-row inv-row-green">
                    <span>Discount {selected.couponCode ? `(${selected.couponCode})` : ""}</span>
                    <span>-₹{selected.discount}</span>
                  </div>
                )}
                <div className="inv-detail-row inv-row-bold"><span>Total</span><span>₹{(selected.total || 0).toLocaleString("en-IN")}</span></div>
              </div>

              {/* Email delivery */}
              <div className="inv-detail-section">
                <div className="inv-detail-section-title"><MdEmail size={14} /> Email Delivery</div>
                <div className="inv-detail-row">
                  <span>Status</span>
                  <span style={{ color: selected.emailSent ? "#10b981" : "#f59e0b", fontWeight: 700 }}>
                    {selected.emailSent ? `✅ Sent on ${fmtDate(selected.emailSentAt)}` : "⏳ Not sent yet"}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </>
      )}

      <style jsx>{`
        /* Page header */
        .inv-page-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:24px; }
        .inv-page-title  { font-size:1.3rem; font-weight:800; color:#0f1f3d; display:flex; align-items:center; gap:9px; margin:0 0 3px; }
        .inv-page-sub    { font-size:0.82rem; color:#8491a8; margin:0; }
        .inv-refresh-btn { display:flex; align-items:center; gap:6px; padding:8px 16px; background:#fff; border:1.5px solid #dde0f8; border-radius:8px; font-size:0.82rem; font-weight:600; color:#4441e5; cursor:pointer; transition:background 0.13s; }
        .inv-refresh-btn:hover { background:#eef0ff; }

        /* Stats */
        .inv-stats-row  { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:24px; }
        .inv-stat-card  { background:#fff; border-radius:12px; border:1.5px solid #dde0f8; padding:18px 20px; box-shadow:0 1px 8px rgba(68,65,229,0.05); }
        .inv-stat-value { font-size:1.5rem; font-weight:900; line-height:1; }
        .inv-stat-label { font-size:0.78rem; font-weight:700; color:#0f1f3d; margin-top:5px; }
        .inv-stat-sub   { font-size:0.7rem; color:#8491a8; margin-top:2px; }

        /* Filters */
        .inv-filters     { background:#fff; border:1.5px solid #dde0f8; border-radius:12px; padding:14px 18px; margin-bottom:18px; display:flex; flex-direction:column; gap:10px; }
        .inv-search-wrap { position:relative; }
        .inv-search-icon { position:absolute; left:11px; top:50%; transform:translateY(-50%); color:#8491a8; }
        .inv-search      { width:100%; padding:9px 12px 9px 35px; border:1.5px solid #e2e5f8; border-radius:8px; font-size:0.83rem; outline:none; font-family:inherit; color:#0f1f3d; }
        .inv-search:focus { border-color:#4441e5; }
        .inv-filter-row  { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .inv-select      { padding:7px 10px; border:1.5px solid #e2e5f8; border-radius:8px; font-size:0.8rem; font-family:inherit; color:#0f1f3d; background:#fff; cursor:pointer; outline:none; }
        .inv-date-input  { padding:7px 10px; border:1.5px solid #e2e5f8; border-radius:8px; font-size:0.8rem; font-family:inherit; color:#0f1f3d; outline:none; cursor:pointer; }
        .inv-clear-btn   { display:flex; align-items:center; gap:5px; padding:7px 12px; border:1.5px solid #fecaca; border-radius:8px; background:#fff0f0; color:#ef4444; font-size:0.78rem; font-weight:600; cursor:pointer; }

        /* Table */
        .inv-table-wrap  { background:#fff; border-radius:12px; border:1.5px solid #dde0f8; overflow:hidden; box-shadow:0 1px 8px rgba(68,65,229,0.05); margin-bottom:18px; overflow-x:auto; }
        .inv-table       { width:100%; border-collapse:collapse; min-width:860px; }
        .inv-table thead tr { background:#f4f5ff; }
        .inv-table thead th { padding:11px 14px; text-align:left; font-size:0.68rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; color:#4441e5; white-space:nowrap; }
        .inv-row         { border-bottom:1px solid #f0f1fa; cursor:pointer; transition:background 0.12s; }
        .inv-row:hover   { background:#f8f9ff; }
        .inv-row:last-child { border-bottom:none; }
        .inv-table tbody td { padding:12px 14px; font-size:0.82rem; vertical-align:middle; }

        .inv-number      { font-size:0.8rem; font-weight:800; color:#4441e5; }
        .inv-student-name { font-weight:700; color:#0f1f3d; font-size:0.83rem; }
        .inv-student-phone { font-size:0.72rem; color:#8491a8; margin-top:2px; }
        .inv-course-title  { font-weight:600; color:#0f1f3d; font-size:0.82rem; }
        .inv-course-sub    { font-size:0.7rem; color:#8491a8; margin-top:2px; }
        .inv-amount        { font-weight:800; color:#0f1f3d; }
        .inv-discount      { font-size:0.7rem; color:#10b981; font-weight:600; margin-top:2px; }
        .inv-date-cell     { color:#6b7a99; font-size:0.8rem; white-space:nowrap; }

        .inv-status     { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:100px; font-size:0.7rem; font-weight:700; white-space:nowrap; }
        .inv-status-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }

        .inv-email-sent    { font-size:0.72rem; color:#10b981; font-weight:700; display:flex; align-items:center; gap:4px; }
        .inv-email-pending { font-size:0.72rem; color:#f59e0b; font-weight:700; }

        .inv-actions      { display:flex; gap:5px; }
        .inv-action-btn   { width:30px; height:30px; display:flex; align-items:center; justify-content:center; border-radius:7px; border:1.5px solid #e2e5f8; background:#fff; cursor:pointer; transition:background 0.12s, border-color 0.12s; }
        .inv-action-pdf   :hover { background:#eef0ff; border-color:#4441e5; color:#4441e5; }
        .inv-action-email :hover { background:#fffbeb; border-color:#f59e0b; color:#d97706; }
        .inv-action-view  :hover { background:#f0fdf4; border-color:#10b981; color:#10b981; }

        /* Pagination */
        .inv-pagination  { display:flex; align-items:center; justify-content:center; gap:14px; padding:12px 0; }
        .inv-page-btn    { padding:7px 16px; border:1.5px solid #dde0f8; border-radius:8px; background:#fff; font-size:0.82rem; font-weight:600; color:#4441e5; cursor:pointer; }
        .inv-page-btn:disabled { opacity:0.4; cursor:not-allowed; }
        .inv-page-info   { font-size:0.8rem; color:#8491a8; }

        /* Loading / empty */
        .inv-loading { display:flex; align-items:center; justify-content:center; gap:12px; padding:56px; color:#8491a8; font-size:0.9rem; }
        .inv-spinner { width:22px; height:22px; border:2px solid #e2e5f8; border-top-color:#4441e5; border-radius:50%; animation:spin 0.7s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg); } }
        .inv-empty       { text-align:center; padding:56px 24px; }
        .inv-empty-icon  { color:#c8ccef; margin-bottom:14px; }
        .inv-empty-title { font-size:1rem; font-weight:800; color:#0f1f3d; margin-bottom:6px; }
        .inv-empty p     { color:#8491a8; font-size:0.85rem; }

        /* Detail panel */
        .inv-detail-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.25); z-index:1040; }
        .inv-detail-panel   {
          position:fixed; top:0; right:0; bottom:0; width:420px; max-width:100vw;
          background:#fff; z-index:1050; overflow-y:auto;
          box-shadow:-4px 0 32px rgba(68,65,229,0.12);
          display:flex; flex-direction:column;
        }
        .inv-detail-header {
          display:flex; align-items:center; gap:12px;
          padding:18px 20px; border-bottom:1.5px solid #eceeff;
          background:#fafbff; position:sticky; top:0; z-index:2;
        }
        .inv-detail-back   { width:34px; height:34px; display:flex; align-items:center; justify-content:center; border:1.5px solid #dde0f8; border-radius:8px; background:#fff; cursor:pointer; flex-shrink:0; }
        .inv-detail-title  { font-size:0.95rem; font-weight:800; color:#4441e5; }
        .inv-detail-sub    { font-size:0.72rem; color:#8491a8; margin-top:1px; }
        .inv-detail-actions { display:flex; gap:7px; margin-left:auto; }
        .inv-btn-outline   { display:flex; align-items:center; gap:5px; padding:7px 12px; border:1.5px solid #dde0f8; border-radius:8px; background:#fff; font-size:0.78rem; font-weight:600; color:#4441e5; cursor:pointer; white-space:nowrap; }
        .inv-btn-outline:hover { background:#eef0ff; }
        .inv-btn-outline:disabled { opacity:0.5; cursor:not-allowed; }

        .inv-detail-body { padding:20px; flex:1; }

        .inv-detail-amount-card {
          background:linear-gradient(135deg,#4441e5,#6b68ff);
          border-radius:12px; padding:20px; text-align:center; margin-bottom:20px; color:#fff;
        }
        .inv-detail-amount-label { font-size:0.72rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; opacity:0.7; margin-bottom:6px; }
        .inv-detail-amount       { font-size:2rem; font-weight:900; }
        .inv-detail-discount     { font-size:0.8rem; opacity:0.8; margin-top:6px; }

        .inv-detail-section       { margin-bottom:20px; }
        .inv-detail-section-title { font-size:0.68rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; color:#8491a8; margin-bottom:10px; display:flex; align-items:center; gap:5px; }
        .inv-detail-row  { display:flex; justify-content:space-between; align-items:flex-start; padding:7px 0; border-bottom:1px solid #f3f4fb; font-size:0.82rem; gap:12px; }
        .inv-detail-row span:first-child { color:#8491a8; flex-shrink:0; }
        .inv-detail-row span:last-child  { color:#0f1f3d; font-weight:600; text-align:right; word-break:break-all; }
        .inv-row-green span:last-child { color:#10b981 !important; }
        .inv-row-bold  span            { font-weight:800 !important; font-size:0.88rem !important; }
        .inv-mono { font-family:monospace; font-size:0.76rem !important; }

        .inv-status-row { display:flex; gap:8px; flex-wrap:wrap; }
        .inv-status-opt {
          display:flex; align-items:center; gap:6px;
          padding:7px 14px; border:1.5px solid #e2e5f8; border-radius:8px;
          background:#fff; font-size:0.78rem; font-weight:600; color:#6b7a99;
          cursor:pointer; transition:all 0.13s;
        }
        .inv-status-opt:hover { border-color:#4441e5; color:#4441e5; }
        .inv-status-opt-active { font-weight:800; }
        .inv-status-opt:disabled { opacity:0.5; cursor:not-allowed; }

        @media (max-width:768px) {
          .inv-stats-row { grid-template-columns:1fr; }
          .inv-detail-panel { width:100vw; }
        }
      `}</style>
    </>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));