// pages/dashboard/admin/enrollments/index.jsx
import { useState, useEffect, useCallback } from "react";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Head from "next/head";
import Link from "next/link";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import {
  MdPeople, MdSearch, MdFilterList, MdRefresh, MdClose,
  MdCheckCircle, MdSchool, MdPayment, MdPhone, MdEmail,
  MdCalendarToday, MdArrowBack, MdOpenInNew, MdReceipt,
  MdLocalOffer, MdPerson, MdExpandMore, MdExpandLess,
  MdMonetizationOn, MdFreeBreakfast, MdDesktopMac, MdPhoneAndroid,
} from "react-icons/md";
import { FaRupeeSign, FaGraduationCap } from "react-icons/fa";
import { BsCollection, BsPersonCheck } from "react-icons/bs";

/* ─── helpers ─── */
function fmt(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(n || 0);
}
function fmtDate(d) {
  return d ? new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  }) : "—";
}
function fmtDateTime(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

const TYPE_CONFIG = {
  free: { label:"Free",   bg:"#d1fae5", color:"#065f46", dot:"#10b981", icon:"🆓" },
  cod:  { label:"COD",    bg:"#fef3c7", color:"#92400e", dot:"#f59e0b", icon:"💵" },
  paid: { label:"Online", bg:"#ede9fe", color:"#4c1d95", dot:"#6c47d4", icon:"💳" },
};

const subjectColors = {
  Mathematics:"#6c47d4", Physics:"#0ea5e9", Chemistry:"#f59e0b",
  Biology:"#10b981", English:"#f43f5e", Hindi:"#8b5cf6",
  "Social Science":"#64748b", "Computer Science":"#06b6d4",
};
const getSubjectColor = (s) => subjectColors[s] || "#6c47d4";

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */
export default function AdminEnrollmentsPage({ admin }) {
  const [enrollments, setEnrollments] = useState([]);
  const [stats, setStats]             = useState({});
  const [topCourses, setTopCourses]   = useState([]);
  const [loading, setLoading]         = useState(true);
  const [pagination, setPagination]   = useState({ page:1, totalPages:1, total:0 });

  /* source tab */
  const [sourceTab, setSourceTab] = useState("all"); // "all" | "web" | "app"

  /* filters */
  const [search, setSearch]     = useState("");
  const [type, setType]         = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate]     = useState("");
  const [sort, setSort]         = useState("newest");

  /* detail panel */
  const [selected, setSelected]     = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  /* ── fetch ── */
  const fetchEnrollments = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page, limit: 20, sort,
        ...(type !== "all"      && { type }),
        ...(sourceTab !== "all" && { source: sourceTab }),
        ...(search   && { search }),
        ...(fromDate && { from: fromDate }),
        ...(toDate   && { to: toDate }),
      });
      const res  = await fetch(`/api/enrollments?${params}`);
      const data = await res.json();
      if (data.success) {
        setEnrollments(data.enrollments);
        setPagination(data.pagination);
        setStats(data.stats || {});
        setTopCourses(data.topCourses || []);
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  }, [type, search, fromDate, toDate, sort, sourceTab]);

  useEffect(() => { fetchEnrollments(1); }, [fetchEnrollments]);

  const clearFilters = () => {
    setSearch(""); setType("all"); setFromDate(""); setToDate(""); setSort("newest");
  };
  const hasFilters = search || type !== "all" || fromDate || toDate || sort !== "newest";

  const switchTab = (tab) => { setSourceTab(tab); };

  const openDetail = (enr) => { setSelected(enr); setDetailOpen(true); };

  /* ── stat cards ── */
  const statCards = [
    { label:"Total Enrollments", value: stats.total || 0,         color:"#6c47d4", icon:<BsPersonCheck size={22}/> },
    { label:"Desktop Enrollments", value: stats.webCount ?? (stats.total || 0), color:"#0ea5e9", icon:<MdDesktopMac size={22}/> },
    { label:"App Enrollments",   value: stats.appCount || 0,      color:"#10b981", icon:<MdPhoneAndroid size={22}/> },
    { label:"Total Revenue",     value: fmt(stats.totalRevenue),  color:"#f59e0b", icon:<MdMonetizationOn size={22}/> },
    { label:"Online Paid",       value: stats.paidCount || 0,     color:"#6c47d4", icon:<FaRupeeSign size={18}/> },
  ];

  return (
    <>
      <Head><title>Enrollments — SS Coaching Admin</title></Head>
      <div className="oc-wrapper">
        <Topbar admin={admin}/>
        <AdminOffcanvas/>
        <div className="d-flex" style={{ minHeight:"100vh" }}>
          <Sidebar/>
          <div className="flex-grow-1 bg-light">
            <div className="container-fluid p-4">

              {/* PAGE HEADER */}
              <div className="en-page-header">
                <div>
                  <h4 className="en-page-title"><MdPeople size={22}/> Enrollments</h4>
                  <p className="en-page-sub">All student course enrollments — free, COD, and online paid</p>
                </div>
                <button className="en-refresh-btn" onClick={() => fetchEnrollments(1)} disabled={loading}>
                  <MdRefresh size={16}/> Refresh
                </button>
              </div>

              {/* STAT CARDS */}
              <div className="en-stats-row">
                {statCards.map((s) => (
                  <div key={s.label} className="en-stat-card">
                    <div className="en-stat-icon" style={{ background: s.color + "18", color: s.color }}>
                      {s.icon}
                    </div>
                    <div>
                      <div className="en-stat-value" style={{ color: s.color }}>{s.value}</div>
                      <div className="en-stat-label">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* SOURCE TABS */}
              <div className="en-source-tabs">
                <button
                  className={`en-source-tab${sourceTab === "all" ? " active" : ""}`}
                  onClick={() => switchTab("all")}
                >
                  <MdPeople size={15}/> All Sources
                  <span className="en-tab-count">{stats.total || 0}</span>
                </button>
                <button
                  className={`en-source-tab${sourceTab === "web" ? " active web" : " web"}`}
                  onClick={() => switchTab("web")}
                >
                  <MdDesktopMac size={15}/> Desktop
                  <span className="en-tab-count web">{stats.webCount ?? "—"}</span>
                </button>
                <button
                  className={`en-source-tab${sourceTab === "app" ? " active app" : " app"}`}
                  onClick={() => switchTab("app")}
                >
                  <MdPhoneAndroid size={15}/> App
                  <span className="en-tab-count app">{stats.appCount || 0}</span>
                </button>
              </div>

              {/* TOP COURSES + FILTERS row */}
              <div className="en-two-col">

                {/* Top courses */}
                <div className="en-top-courses">
                  <div className="en-section-title">🏆 Top Courses by Enrollment</div>
                  {topCourses.length === 0 ? (
                    <div className="en-empty-small">No data yet</div>
                  ) : (
                    topCourses.map((c, i) => (
                      <div key={c._id} className="en-top-course-row">
                        <span className="en-rank" style={{ background: i === 0 ? "#fef3c7" : "#f4f5ff", color: i === 0 ? "#92400e" : "#6c47d4" }}>
                          {i + 1}
                        </span>
                        <div className="en-top-course-info">
                          <div className="en-top-course-title">{c.title || "—"}</div>
                          <div className="en-top-course-sub" style={{ color: getSubjectColor(c.subject) }}>
                            {c.subject}
                          </div>
                        </div>
                        <div className="en-top-course-stats">
                          <div className="en-top-count">{c.count} enrolled</div>
                          {c.revenue > 0 && <div className="en-top-rev">{fmt(c.revenue)}</div>}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Filters */}
                <div className="en-filters-card">
                  <div className="en-section-title">🔍 Filter Enrollments</div>

                  <div className="en-search-wrap">
                    <MdSearch size={16} className="en-search-icon"/>
                    <input
                      className="en-search"
                      placeholder="Search by name, phone, email, course..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  <div className="en-filter-row">
                    <select className="en-select" value={type} onChange={(e) => setType(e.target.value)}>
                      <option value="all">All Types</option>
                      <option value="free">Free</option>
                      <option value="cod">COD</option>
                      <option value="paid">Online Paid</option>
                    </select>
                    <select className="en-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="amount">Highest Amount</option>
                    </select>
                  </div>

                  <div className="en-filter-row">
                    <div className="en-date-group">
                      <label className="en-date-label">From</label>
                      <input type="date" className="en-date-input" value={fromDate} onChange={(e) => setFromDate(e.target.value)}/>
                    </div>
                    <div className="en-date-group">
                      <label className="en-date-label">To</label>
                      <input type="date" className="en-date-input" value={toDate} onChange={(e) => setToDate(e.target.value)}/>
                    </div>
                  </div>

                  {hasFilters && (
                    <button className="en-clear-btn" onClick={clearFilters}>
                      <MdClose size={13}/> Clear All Filters
                    </button>
                  )}
                </div>
              </div>

              {/* TABLE */}
              <div className="en-table-wrap">
                <div className="en-table-header">
                  <div className="en-table-title">
                    {sourceTab === "web" ? <><MdDesktopMac size={17}/> Desktop Enrollments</> :
                     sourceTab === "app" ? <><MdPhoneAndroid size={17}/> App Enrollments</> :
                     "All Enrollments"}
                    <span className="en-table-count">{pagination.total} total</span>
                  </div>
                </div>

                {loading ? (
                  <div className="en-loading"><div className="en-spinner"/><span>Loading enrollments...</span></div>
                ) : enrollments.length === 0 ? (
                  <div className="en-empty">
                    <MdPeople size={48} className="en-empty-icon"/>
                    <div className="en-empty-title">No Enrollments Found</div>
                    <p>{hasFilters ? "Try clearing your filters." : "No enrollments yet."}</p>
                  </div>
                ) : (
                  <table className="en-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Student</th>
                        <th>Course</th>
                        <th>Type</th>
                        <th>Source</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollments.map((enr, idx) => {
                        const tc = TYPE_CONFIG[enr.type] || TYPE_CONFIG.free;
                        const rowNum = (pagination.page - 1) * 20 + idx + 1;
                        return (
                          <tr key={enr._id} className="en-row" onClick={() => openDetail(enr)}>
                            <td className="en-td-num">{rowNum}</td>
                            <td>
                              <div className="en-student-row">
                                <div className="en-avatar">
                                  {(enr.studentName || "S").charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="en-student-name">{enr.studentName || "—"}</div>
                                  <div className="en-student-meta">
                                    {enr.studentPhone && <span>📱 {enr.studentPhone}</span>}
                                    {enr.studentClass  && <span>🎓 {enr.studentClass}</span>}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="en-course-title">{enr.courseTitle || "—"}</div>
                              <div className="en-course-sub" style={{ color: getSubjectColor(enr.courseSubject) }}>
                                {enr.courseSubject} {enr.courseBatch ? `• ${enr.courseBatch}` : ""}
                              </div>
                            </td>
                            <td>
                              <span className="en-type-badge" style={{ background: tc.bg, color: tc.color }}>
                                <span className="en-type-dot" style={{ background: tc.dot }}/>
                                {tc.icon} {tc.label}
                              </span>
                            </td>
                            <td>
                              {enr.source === "app" ? (
                                <span className="en-source-badge app"><MdPhoneAndroid size={11}/> App</span>
                              ) : (
                                <span className="en-source-badge web"><MdDesktopMac size={11}/> Desktop</span>
                              )}
                            </td>
                            <td>
                              {enr.amountPaid > 0 ? (
                                <div>
                                  <div className="en-amount">{fmt(enr.amountPaid)}</div>
                                  {enr.discount > 0 && (
                                    <div className="en-discount">−{fmt(enr.discount)} off</div>
                                  )}
                                </div>
                              ) : (
                                <span className="en-free-tag">FREE</span>
                              )}
                            </td>
                            <td className="en-date">{fmtDate(enr.createdAt)}</td>
                            <td onClick={(e) => e.stopPropagation()}>
                              <button className="en-view-btn" onClick={() => openDetail(enr)} title="View Details">
                                <MdOpenInNew size={15}/>
                              </button>
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
                <div className="en-pagination">
                  <button
                    className="en-page-btn"
                    disabled={pagination.page <= 1}
                    onClick={() => fetchEnrollments(pagination.page - 1)}
                  >← Prev</button>
                  <span className="en-page-info">
                    Page {pagination.page} of {pagination.totalPages}
                    <span style={{ color:"#8491a8", marginLeft:8 }}>({pagination.total} total)</span>
                  </span>
                  <button
                    className="en-page-btn"
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => fetchEnrollments(pagination.page + 1)}
                  >Next →</button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* DETAIL PANEL */}
      {detailOpen && selected && (
        <>
          <div className="en-detail-overlay" onClick={() => setDetailOpen(false)}/>
          <div className="en-detail-panel">

            <div className="en-detail-hd">
              <button className="en-detail-back" onClick={() => setDetailOpen(false)}>
                <MdArrowBack size={18}/>
              </button>
              <div>
                <div className="en-detail-title">Enrollment Details</div>
                <div className="en-detail-sub">{fmtDateTime(selected.createdAt)}</div>
              </div>
              {selected.type !== "free" && (
                <Link
                  href={`/dashboard/admin/invoices`}
                  className="en-detail-inv-btn"
                  style={{ marginLeft:"auto" }}
                >
                  <MdReceipt size={14}/> View Invoice
                </Link>
              )}
            </div>

            <div className="en-detail-body">

              {/* Type hero */}
              {(() => {
                const tc = TYPE_CONFIG[selected.type] || TYPE_CONFIG.free;
                return (
                  <div className="en-detail-hero" style={{ background: `linear-gradient(135deg, ${tc.dot}, ${tc.dot}cc)` }}>
                    <div className="en-dh-icon">{tc.icon}</div>
                    <div className="en-dh-type">{tc.label} Enrollment</div>
                    <div className="en-dh-amount">
                      {selected.amountPaid > 0 ? fmt(selected.amountPaid) : "Free"}
                    </div>
                    {selected.discount > 0 && (
                      <div className="en-dh-discount">🏷 {fmt(selected.discount)} discount applied</div>
                    )}
                  </div>
                );
              })()}

              {/* Student info */}
              <div className="en-detail-section">
                <div className="en-ds-title"><MdPerson size={14}/> Student Information</div>
                <div className="en-ds-row"><span>Name</span><span>{selected.studentName || "—"}</span></div>
                <div className="en-ds-row"><span>Phone</span><span>{selected.studentPhone ? `+91 ${selected.studentPhone}` : "—"}</span></div>
                <div className="en-ds-row"><span>Email</span><span>{selected.studentEmail || "—"}</span></div>
                <div className="en-ds-row"><span>Class</span><span>{selected.studentClass || "—"}</span></div>
              </div>

              {/* Course info */}
              <div className="en-detail-section">
                <div className="en-ds-title"><BsCollection size={13}/> Course Information</div>
                <div className="en-ds-row"><span>Title</span><span>{selected.courseTitle || "—"}</span></div>
                <div className="en-ds-row">
                  <span>Subject</span>
                  <span style={{ color: getSubjectColor(selected.courseSubject), fontWeight:700 }}>
                    {selected.courseSubject || "—"}
                  </span>
                </div>
                <div className="en-ds-row"><span>Batch</span><span>{selected.courseBatch || "—"}</span></div>
                <div className="en-ds-row"><span>Course Price</span><span>{selected.coursePrice > 0 ? fmt(selected.coursePrice) : "Free"}</span></div>
              </div>

              {/* Payment info */}
              {selected.type !== "free" && (
                <div className="en-detail-section">
                  <div className="en-ds-title"><MdPayment size={14}/> Payment Information</div>
                  <div className="en-ds-row"><span>Type</span>
                    <span>{(() => { const tc=TYPE_CONFIG[selected.type]||TYPE_CONFIG.free; return `${tc.icon} ${tc.label}`; })()}</span>
                  </div>
                  <div className="en-ds-row"><span>Amount Paid</span><span>{fmt(selected.amountPaid)}</span></div>
                  {selected.discount > 0 && (
                    <>
                      <div className="en-ds-row" style={{color:"#10b981"}}>
                        <span>Discount</span><span>− {fmt(selected.discount)}</span>
                      </div>
                      <div className="en-ds-row" style={{color:"#10b981"}}>
                        <span>Coupon</span><span>{selected.couponCode || "—"}</span>
                      </div>
                    </>
                  )}
                  {selected.orderId && (
                    <div className="en-ds-row"><span>Order ID</span><span className="en-mono">{selected.orderId}</span></div>
                  )}
                  {selected.paymentId && (
                    <div className="en-ds-row"><span>Payment ID</span><span className="en-mono">{selected.paymentId}</span></div>
                  )}
                </div>
              )}

              {/* COD delivery info */}
              {selected.type === "cod" && selected.deliveryInfo && (
                <div className="en-detail-section">
                  <div className="en-ds-title">📍 Billing / Delivery Info</div>
                  {[
                    ["Name",    selected.deliveryInfo.fullName],
                    ["Phone",   selected.deliveryInfo.phone ? `+91 ${selected.deliveryInfo.phone}` : null],
                    ["Email",   selected.deliveryInfo.email],
                    ["Address", selected.deliveryInfo.address],
                    ["City",    selected.deliveryInfo.city],
                    ["State",   selected.deliveryInfo.state],
                    ["Pincode", selected.deliveryInfo.pincode],
                    ["Notes",   selected.deliveryInfo.notes],
                  ].filter(([, v]) => v).map(([label, val]) => (
                    <div key={label} className="en-ds-row">
                      <span>{label}</span><span>{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Timeline */}
              <div className="en-detail-section">
                <div className="en-ds-title">🕐 Timeline</div>
                <div className="en-ds-row"><span>Enrolled At</span><span>{fmtDateTime(selected.createdAt)}</span></div>
                <div className="en-ds-row"><span>Last Updated</span><span>{fmtDateTime(selected.updatedAt)}</span></div>
                <div className="en-ds-row">
                  <span>Source</span>
                  <span>
                    {selected.source === "app"
                      ? <span style={{color:"#10b981",fontWeight:700}}><MdPhoneAndroid size={13}/> Mobile App</span>
                      : <span style={{color:"#0ea5e9",fontWeight:700}}><MdDesktopMac size={13}/> Desktop / Web</span>
                    }
                  </span>
                </div>
              </div>

            </div>
          </div>
        </>
      )}

      <style jsx>{`
        /* Source tabs */
        .en-source-tabs { display:flex; gap:8px; margin-bottom:20px; }
        .en-source-tab { display:flex; align-items:center; gap:6px; padding:9px 18px; border:1.5px solid #dde0f8; border-radius:10px; background:#fff; font-size:0.82rem; font-weight:600; color:#6b7a99; cursor:pointer; transition:all 0.14s; }
        .en-source-tab:hover { border-color:#6c47d4; color:#6c47d4; background:#fafbff; }
        .en-source-tab.active { background:#6c47d4; border-color:#6c47d4; color:#fff; }
        .en-source-tab.active .en-tab-count { background:rgba(255,255,255,0.25); color:#fff; }
        .en-source-tab.active.web { background:#0ea5e9; border-color:#0ea5e9; }
        .en-source-tab.active.app { background:#10b981; border-color:#10b981; }
        .en-tab-count { font-size:0.7rem; font-weight:800; background:#ede9fe; color:#6c47d4; padding:1px 7px; border-radius:100px; margin-left:2px; }
        .en-tab-count.web { background:#e0f2fe; color:#0284c7; }
        .en-tab-count.app { background:#d1fae5; color:#065f46; }

        /* Source badge in table */
        .en-source-badge { display:inline-flex; align-items:center; gap:4px; padding:2px 8px; border-radius:100px; font-size:0.68rem; font-weight:700; white-space:nowrap; }
        .en-source-badge.web { background:#e0f2fe; color:#0284c7; }
        .en-source-badge.app { background:#d1fae5; color:#065f46; }

        /* Page header */
        .en-page-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:20px; }
        .en-page-title  { font-size:1.25rem; font-weight:800; color:#0f1f3d; display:flex; align-items:center; gap:9px; margin:0 0 3px; }
        .en-page-sub    { font-size:0.82rem; color:#8491a8; margin:0; }
        .en-refresh-btn { display:flex; align-items:center; gap:6px; padding:9px 16px; background:#fff; border:1.5px solid #dde0f8; border-radius:9px; font-size:0.82rem; font-weight:600; color:#6c47d4; cursor:pointer; }
        .en-refresh-btn:hover { background:#ede9fe; }

        /* Stats */
        .en-stats-row { display:grid; grid-template-columns:repeat(5,1fr); gap:14px; margin-bottom:20px; }
        .en-stat-card { background:#fff; border-radius:12px; border:1.5px solid #dde0f8; padding:16px; display:flex; align-items:center; gap:12px; box-shadow:0 1px 8px rgba(108,71,212,0.05); }
        .en-stat-icon { width:44px; height:44px; border-radius:11px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .en-stat-value { font-size:1.35rem; font-weight:900; line-height:1; }
        .en-stat-label { font-size:0.72rem; color:#8491a8; margin-top:3px; font-weight:600; }

        /* Two col */
        .en-two-col { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; }

        /* Top courses */
        .en-top-courses { background:#fff; border:1.5px solid #dde0f8; border-radius:12px; padding:18px; }
        .en-section-title { font-size:0.8rem; font-weight:800; color:#0f1f3d; margin-bottom:14px; }
        .en-empty-small   { font-size:0.8rem; color:#8491a8; padding:8px 0; }
        .en-top-course-row { display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:1px solid #f3f4fb; }
        .en-top-course-row:last-child { border-bottom:none; }
        .en-rank { width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.72rem; font-weight:900; flex-shrink:0; }
        .en-top-course-info { flex:1; min-width:0; }
        .en-top-course-title { font-size:0.82rem; font-weight:700; color:#0f1f3d; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .en-top-course-sub   { font-size:0.7rem; font-weight:600; margin-top:1px; }
        .en-top-course-stats { text-align:right; flex-shrink:0; }
        .en-top-count { font-size:0.78rem; font-weight:800; color:#0f1f3d; }
        .en-top-rev   { font-size:0.7rem; color:#10b981; font-weight:700; }

        /* Filters */
        .en-filters-card { background:#fff; border:1.5px solid #dde0f8; border-radius:12px; padding:18px; display:flex; flex-direction:column; gap:10px; }
        .en-search-wrap { position:relative; }
        .en-search-icon { position:absolute; left:10px; top:50%; transform:translateY(-50%); color:#8491a8; }
        .en-search { width:100%; padding:9px 12px 9px 32px; border:1.5px solid #e2e5f8; border-radius:8px; font-size:0.82rem; font-family:inherit; color:#0f1f3d; outline:none; }
        .en-search:focus { border-color:#6c47d4; }
        .en-filter-row { display:flex; gap:8px; }
        .en-select { flex:1; padding:8px 10px; border:1.5px solid #e2e5f8; border-radius:8px; font-size:0.8rem; font-family:inherit; color:#0f1f3d; background:#fff; outline:none; cursor:pointer; }
        .en-date-group { flex:1; display:flex; flex-direction:column; gap:4px; }
        .en-date-label { font-size:0.68rem; font-weight:700; color:#8491a8; text-transform:uppercase; letter-spacing:0.05em; }
        .en-date-input { padding:7px 10px; border:1.5px solid #e2e5f8; border-radius:8px; font-size:0.8rem; font-family:inherit; color:#0f1f3d; outline:none; }
        .en-clear-btn { display:flex; align-items:center; gap:5px; padding:7px 12px; border:1.5px solid #fca5a5; border-radius:8px; background:#fff0f0; color:#ef4444; font-size:0.78rem; font-weight:600; cursor:pointer; align-self:flex-start; }

        /* Table */
        .en-table-wrap { background:#fff; border:1.5px solid #dde0f8; border-radius:12px; overflow:hidden; box-shadow:0 1px 8px rgba(108,71,212,0.05); margin-bottom:16px; overflow-x:auto; }
        .en-table-header { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; border-bottom:1.5px solid #f0f1fa; background:#fafbff; }
        .en-table-title  { font-size:0.9rem; font-weight:800; color:#0f1f3d; display:flex; align-items:center; gap:10px; }
        .en-table-count  { font-size:0.72rem; font-weight:700; background:#ede9fe; color:#6c47d4; padding:2px 9px; border-radius:100px; }

        .en-table { width:100%; border-collapse:collapse; min-width:760px; }
        .en-table thead tr { background:#f4f5ff; }
        .en-table thead th { padding:10px 14px; text-align:left; font-size:0.68rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; color:#6c47d4; white-space:nowrap; }
        .en-row { border-bottom:1px solid #f0f1fa; cursor:pointer; transition:background 0.12s; }
        .en-row:hover { background:#fafbff; }
        .en-row:last-child { border-bottom:none; }
        .en-table tbody td { padding:12px 14px; font-size:0.82rem; vertical-align:middle; }

        .en-td-num { color:#8491a8; font-size:0.75rem; font-weight:600; }

        .en-student-row { display:flex; align-items:center; gap:9px; }
        .en-avatar { width:34px; height:34px; background:linear-gradient(135deg,#6c47d4,#8b5cf6); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:0.85rem; font-weight:900; flex-shrink:0; }
        .en-student-name { font-weight:700; color:#0f1f3d; font-size:0.85rem; }
        .en-student-meta { display:flex; gap:8px; margin-top:2px; font-size:0.7rem; color:#8491a8; }

        .en-course-title { font-weight:600; color:#0f1f3d; font-size:0.83rem; }
        .en-course-sub   { font-size:0.7rem; font-weight:600; margin-top:2px; }

        .en-type-badge { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:100px; font-size:0.7rem; font-weight:700; white-space:nowrap; }
        .en-type-dot   { width:6px; height:6px; border-radius:50%; flex-shrink:0; }

        .en-amount   { font-weight:800; color:#0f1f3d; }
        .en-discount { font-size:0.7rem; color:#10b981; font-weight:700; margin-top:2px; }
        .en-free-tag { font-size:0.75rem; font-weight:800; color:#065f46; background:#d1fae5; padding:2px 9px; border-radius:100px; }

        .en-date { color:#6b7a99; font-size:0.78rem; white-space:nowrap; }

        .en-view-btn { width:30px; height:30px; display:flex; align-items:center; justify-content:center; border-radius:7px; border:1.5px solid #e2e5f8; background:#fff; cursor:pointer; color:#6c47d4; transition:all 0.12s; }
        .en-view-btn:hover { background:#ede9fe; border-color:#6c47d4; }

        /* Loading / empty */
        .en-loading { display:flex; align-items:center; justify-content:center; gap:12px; padding:56px; color:#8491a8; font-size:0.9rem; }
        .en-spinner { width:22px; height:22px; border:2px solid #e2e5f8; border-top-color:#6c47d4; border-radius:50%; animation:enspin 0.7s linear infinite; }
        @keyframes enspin { to { transform:rotate(360deg); } }
        .en-empty      { text-align:center; padding:48px 24px; }
        .en-empty-icon { color:#c8ccef; margin-bottom:14px; }
        .en-empty-title { font-size:1rem; font-weight:800; color:#0f1f3d; margin-bottom:6px; }
        .en-empty p    { color:#8491a8; font-size:0.85rem; }

        /* Pagination */
        .en-pagination  { display:flex; align-items:center; justify-content:center; gap:14px; padding:12px 0; }
        .en-page-btn    { padding:7px 16px; border:1.5px solid #dde0f8; border-radius:8px; background:#fff; font-size:0.82rem; font-weight:600; color:#6c47d4; cursor:pointer; }
        .en-page-btn:disabled { opacity:0.4; cursor:not-allowed; }
        .en-page-info   { font-size:0.8rem; color:#0f1f3d; font-weight:600; }

        /* Detail panel */
        .en-detail-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.25); z-index:1040; }
        .en-detail-panel {
          position:fixed; top:0; right:0; bottom:0; width:420px; max-width:100vw;
          background:#fff; z-index:1050; overflow-y:auto;
          box-shadow:-4px 0 32px rgba(108,71,212,0.12);
        }

        .en-detail-hd {
          display:flex; align-items:center; gap:12px;
          padding:16px 20px; border-bottom:1.5px solid #eceeff;
          background:#fafbff; position:sticky; top:0; z-index:2;
        }
        .en-detail-back  { width:34px; height:34px; display:flex; align-items:center; justify-content:center; border:1.5px solid #dde0f8; border-radius:8px; background:#fff; cursor:pointer; flex-shrink:0; }
        .en-detail-title { font-size:0.95rem; font-weight:800; color:#0f1f3d; }
        .en-detail-sub   { font-size:0.7rem; color:#8491a8; margin-top:1px; }
        .en-detail-inv-btn { display:flex; align-items:center; gap:5px; padding:7px 12px; border:1.5px solid #dde0f8; border-radius:8px; background:#fff; font-size:0.76rem; font-weight:700; color:#6c47d4; text-decoration:none; white-space:nowrap; }
        .en-detail-inv-btn:hover { background:#ede9fe; }

        .en-detail-body { padding:20px; }

        .en-detail-hero {
          border-radius:12px; padding:20px; text-align:center; color:#fff; margin-bottom:20px;
        }
        .en-dh-icon     { font-size:2rem; margin-bottom:8px; }
        .en-dh-type     { font-size:0.78rem; font-weight:700; opacity:0.8; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:6px; }
        .en-dh-amount   { font-size:1.8rem; font-weight:900; }
        .en-dh-discount { font-size:0.78rem; opacity:0.8; margin-top:6px; }

        .en-detail-section { margin-bottom:18px; }
        .en-ds-title { font-size:0.66rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; color:#8491a8; margin-bottom:10px; display:flex; align-items:center; gap:5px; }
        .en-ds-row { display:flex; justify-content:space-between; align-items:flex-start; padding:7px 0; border-bottom:1px solid #f3f4fb; font-size:0.82rem; gap:12px; }
        .en-ds-row span:first-child { color:#8491a8; flex-shrink:0; }
        .en-ds-row span:last-child  { color:#0f1f3d; font-weight:600; text-align:right; word-break:break-all; }
        .en-mono { font-family:monospace; font-size:0.74rem !important; }

        /* Responsive */
        @media (max-width:1100px) {
          .en-stats-row { grid-template-columns:repeat(3,1fr); }
        }
        @media (max-width:900px) {
          .en-stats-row { grid-template-columns:repeat(2,1fr); }
          .en-two-col   { grid-template-columns:1fr; }
          .en-detail-panel { width:100vw; }
        }
        @media (max-width:600px) {
          .en-stats-row { grid-template-columns:1fr 1fr; }
        }
      `}</style>
    </>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));