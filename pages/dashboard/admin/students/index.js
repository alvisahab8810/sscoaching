import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";
import {
  MdSearch, MdDelete, MdPhone, MdRefresh,
  MdGroup, MdDesktopMac, MdPhoneAndroid, MdEmail, MdPeople,
  MdClose,
} from "react-icons/md";
import { BsPersonCheck } from "react-icons/bs";

function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}
function fmtTime(d) {
  if (!d) return "";
  return new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

export default function StudentsListPage({ admin }) {
  const [students, setStudents]     = useState([]);
  const [stats, setStats]           = useState({ total: 0, active: 0, webCount: 0, appCount: 0 });
  const [loading, setLoading]       = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0, limit: 20 });

  /* delete + status */
  const [confirming, setConfirming]   = useState(null);
  const [deleting, setDeleting]       = useState(false);
  const [statusSaving, setStatusSaving] = useState(null);

  /* source tab */
  const [sourceTab, setSourceTab] = useState("all");

  /* filters */
  const [search, setSearch]         = useState("");
  const [filterClass, setFilterClass] = useState("");

  const fetchStudents = useCallback(async (pg = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pg, limit: 20,
        ...(search      && { search }),
        ...(filterClass && { className: filterClass }),
        ...(sourceTab !== "all" && { signupSource: sourceTab }),
      });
      const res  = await fetch(`/api/admin/students?${params}`);
      const data = await res.json();
      if (data.success) {
        setStudents(data.data);
        setStats(data.stats);
        setPagination(data.pagination);
      }
    } catch { toast.error("Failed to load students"); }
    setLoading(false);
  }, [search, filterClass, sourceTab]);

  useEffect(() => { fetchStudents(1); }, [fetchStudents]);

  /* ================= STATUS ================= */
  // Deactivating blocks login and signup on that number and kills the
  // student's live session on both the website and the mobile app, so the
  // list is kept in step with the server rather than re-fetched.
  const changeStatus = async (student, nextActive) => {
    if (nextActive === (student.isActive !== false)) return;
    setStatusSaving(student._id);
    try {
      const res = await fetch(`/api/admin/students?id=${student._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: nextActive }),
      });
      const data = await res.json();
      if (data.success) {
        setStudents((prev) =>
          prev.map((s) => (s._id === student._id ? { ...s, isActive: nextActive } : s))
        );
        setStats((prev) => ({
          ...prev,
          active: Math.max(0, (prev.active || 0) + (nextActive ? 1 : -1)),
        }));
        toast.success(
          nextActive
            ? "Student activated"
            : "Student deactivated — they can no longer log in and have been signed out"
        );
      } else {
        toast.error(data.message || "Could not update status");
      }
    } catch { toast.error("Server error"); }
    setStatusSaving(null);
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!confirming) return;
    setDeleting(true);
    try {
      const res  = await fetch(`/api/admin/students?id=${confirming._id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Student account deleted permanently");
        setConfirming(null);
        fetchStudents(pagination.page);
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch { toast.error("Failed to delete"); }
    setDeleting(false);
  };

  const statCards = [
    { label: "Total Students",  value: stats.total,                 icon: <MdGroup size={20}/> },
    { label: "Desktop Signups", value: stats.webCount ?? stats.total, icon: <MdDesktopMac size={20}/> },
    { label: "App Signups",     value: stats.appCount || 0,         icon: <MdPhoneAndroid size={20}/> },
    { label: "Active Students", value: stats.active,                icon: <BsPersonCheck size={20}/> },
  ];

  return (
    <>
      <Head><title>Students — SS Coaching Admin</title></Head>
      <div className="oc-wrapper">
        <Topbar admin={admin}/>
        <AdminOffcanvas/>
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar/>
          <div className="flex-grow-1 bg-light">
            <div className="container-fluid p-4">

              {/* PAGE HEADER */}
              <div className="st-page-header">
                <div>
                  <h4 className="st-page-title"><MdGroup size={20}/> Students</h4>
                  <p className="st-page-sub">All registered students — web and app signups</p>
                </div>
                <button className="st-refresh-btn" onClick={() => fetchStudents(pagination.page)} disabled={loading}>
                  <MdRefresh size={15}/> Refresh
                </button>
              </div>

              {/* STAT CARDS */}
              <div className="st-stats-row">
                {statCards.map((s) => (
                  <div key={s.label} className="st-stat-card">
                    <div className="st-stat-icon">{s.icon}</div>
                    <div>
                      <div className="st-stat-value">{s.value ?? "—"}</div>
                      <div className="st-stat-label">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* SOURCE TABS */}
              <div className="st-source-tabs">
                <button className={`st-tab${sourceTab === "all" ? " active" : ""}`} onClick={() => setSourceTab("all")}>
                  <MdPeople size={14}/> All Students
                  <span className="st-tab-count">{stats.total || 0}</span>
                </button>
                <button className={`st-tab${sourceTab === "web" ? " active" : ""}`} onClick={() => setSourceTab("web")}>
                  <MdDesktopMac size={14}/> Desktop
                  <span className="st-tab-count">{stats.webCount ?? "—"}</span>
                </button>
                <button className={`st-tab${sourceTab === "app" ? " active" : ""}`} onClick={() => setSourceTab("app")}>
                  <MdPhoneAndroid size={14}/> App
                  <span className="st-tab-count">{stats.appCount || 0}</span>
                </button>
              </div>

              {/* FILTERS */}
              <div className="st-filters">
                <div className="st-search-wrap">
                  <span className="st-search-icon"><MdSearch size={15}/></span>
                  <input
                    className="st-search"
                    placeholder="Search by name, phone or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <select className="st-select" value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
                  <option value="">All Classes</option>
                  {["Class 9","Class 10","Class 11","Class 12","NIOS Stream 1","NIOS Stream 2","Dropper Batch","Other"].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {(search || filterClass) && (
                  <button className="st-clear-btn" onClick={() => { setSearch(""); setFilterClass(""); }}>
                    Clear
                  </button>
                )}
              </div>

              {/* TABLE */}
              <div className="st-table-wrap">
                <div className="st-table-header">
                  <div className="st-table-title">
                    {sourceTab === "web" ? "Desktop Students" :
                     sourceTab === "app" ? "App Students" : "All Students"}
                    <span className="st-table-count">{pagination.total} total</span>
                  </div>
                </div>

                {loading ? (
                  <div className="st-loading"><div className="st-spinner"/><span>Loading students...</span></div>
                ) : students.length === 0 ? (
                  <div className="st-empty">
                    <MdGroup size={44} className="st-empty-icon"/>
                    <div className="st-empty-title">No Students Found</div>
                    <p>{search || filterClass ? "Try clearing your filters." : "No students yet."}</p>
                  </div>
                ) : (
                  <div className="st-table-scroll">
                    <table className="st-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Student</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Class</th>
                          <th>Source</th>
                          <th>Joined</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((s, idx) => {
                          const rowNum = (pagination.page - 1) * pagination.limit + idx + 1;
                          const isApp  = s.signupSource === "app";
                          const active = s.isActive !== false;
                          return (
                            <tr key={s._id}>
                              <td className="st-td-num">{rowNum}</td>
                              <td>
                                <div className="st-student-row">
                                  <div className="st-avatar">{(s.name || "?").charAt(0).toUpperCase()}</div>
                                  <div>
                                    <div className="st-name">{s.name || <span className="st-na">No name</span>}</div>
                                    {s.className && <div className="st-class-sub">{s.className}</div>}
                                  </div>
                                </div>
                              </td>
                              <td>
                                {s.phone
                                  ? <span className="st-inline"><MdPhone size={12}/> +91 {s.phone}</span>
                                  : <span className="st-na">—</span>}
                              </td>
                              <td>
                                {s.email
                                  ? <span className="st-inline st-email" title={s.email}><MdEmail size={12}/> {s.email}</span>
                                  : <span className="st-na">—</span>}
                              </td>
                              <td>
                                {s.className
                                  ? <span className="st-tag">{s.className}</span>
                                  : <span className="st-na">—</span>}
                              </td>
                              <td><span className="st-tag">{isApp ? "App" : "Desktop"}</span></td>
                              <td>
                                <div className="st-date">{fmtDate(s.createdAt)}</div>
                                <div className="st-time">{fmtTime(s.createdAt)}</div>
                              </td>
                              <td>
                                <select
                                  className={`st-status-select ${active ? "is-active" : "is-inactive"}`}
                                  value={active ? "active" : "inactive"}
                                  disabled={statusSaving === s._id}
                                  onChange={(e) => changeStatus(s, e.target.value === "active")}
                                >
                                  <option value="active">Active</option>
                                  <option value="inactive">Inactive</option>
                                </select>
                              </td>
                              <td>
                                <div className="st-actions">
                                  <button className="st-action danger" title="Delete account" onClick={() => setConfirming(s)}>
                                    <span className="st-action-icon"><MdDelete size={14}/></span>
                                    <span className="st-action-label">Delete</span>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* PAGINATION */}
              {pagination.totalPages > 1 && (
                <div className="st-pagination">
                  <button className="st-page-btn" disabled={pagination.page <= 1}
                    onClick={() => fetchStudents(pagination.page - 1)}>← Prev</button>
                  <span className="st-page-info">
                    Page {pagination.page} of {pagination.totalPages}
                    <span className="st-page-total">({pagination.total} total)</span>
                  </span>
                  <button className="st-page-btn" disabled={pagination.page >= pagination.totalPages}
                    onClick={() => fetchStudents(pagination.page + 1)}>Next →</button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* ===== DELETE CONFIRMATION ===== */}
      {confirming && (
        <div className="st-confirm-backdrop" onClick={() => !deleting && setConfirming(null)}>
          <div className="st-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="st-confirm-head">
              <div>
                <h5>Delete student account</h5>
                <p>This cannot be undone</p>
              </div>
              <button onClick={() => setConfirming(null)} disabled={deleting}>
                <MdClose size={16}/>
              </button>
            </div>

            <div className="st-confirm-body">
              <p className="st-confirm-name">{confirming.name || "No name"}</p>
              <p className="st-confirm-meta">
                {[confirming.phone ? `+91 ${confirming.phone}` : null, confirming.email, confirming.className]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <p className="st-confirm-sub">
                This account will be deleted permanently. The student loses access on the
                website and the mobile app straight away, and the number is free to register
                again. To block the student without deleting anything, set the status to
                <strong> Inactive</strong> instead.
              </p>
            </div>

            <div className="st-confirm-foot">
              <button className="st-confirm-cancel" onClick={() => setConfirming(null)} disabled={deleting}>
                Cancel
              </button>
              <button className="st-confirm-go" onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting…" : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Page header */
        .st-page-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:20px; }
        .st-page-title  { font-size:1.2rem; font-weight:700; color:#0f172a; display:flex; align-items:center; gap:9px; margin:0 0 3px; }
        .st-page-sub    { font-size:0.82rem; color:#64748b; margin:0; }
        .st-refresh-btn { display:flex; align-items:center; gap:6px; padding:9px 16px; background:#fff; border:1px solid #e2e8f0; border-radius:10px; font-size:0.82rem; font-weight:600; color:#334155; cursor:pointer; }
        .st-refresh-btn:hover:not(:disabled) { background:#f8fafc; border-color:#cbd5e1; }
        .st-refresh-btn:disabled { opacity:0.6; cursor:default; }

        /* Stats */
        .st-stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        .st-stat-card { background:#fff; border-radius:12px; border:1px solid #e2e8f0; padding:16px; display:flex; align-items:center; gap:12px; }
        .st-stat-icon  { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; background:#f1eefc; color:#5641ce; }
        .st-stat-value { font-size:1.3rem; font-weight:700; line-height:1; color:#0f172a; }
        .st-stat-label { font-size:0.72rem; color:#64748b; margin-top:4px; font-weight:600; }

        /* Source tabs */
        .st-source-tabs { display:flex; gap:8px; margin-bottom:16px; }
        .st-tab { display:flex; align-items:center; gap:6px; padding:9px 18px; border:1px solid #e2e8f0; border-radius:10px; background:#fff; font-size:0.82rem; font-weight:600; color:#475569; cursor:pointer; transition:background 0.15s, border-color 0.15s; }
        .st-tab:hover { background:#f8fafc; border-color:#cbd5e1; }
        .st-tab.active { background:#5641ce; border-color:#5641ce; color:#fff; }
        .st-tab-count { font-size:0.7rem; font-weight:700; background:#f1f5f9; color:#475569; padding:1px 7px; border-radius:100px; margin-left:2px; }
        .st-tab.active .st-tab-count { background:rgba(255,255,255,0.22); color:#fff; }

        /* Filters */
        .st-filters { display:flex; gap:10px; align-items:center; margin-bottom:16px; }
        .st-search-wrap { position:relative; flex:1; max-width:380px; }
        .st-search-icon { position:absolute; left:10px; top:50%; transform:translateY(-50%); color:#94a3b8; display:inline-flex; }
        .st-search { width:100%; padding:9px 12px 9px 32px; border:1px solid #e2e8f0; border-radius:10px; font-size:0.82rem; font-family:inherit; color:#0f172a; outline:none; }
        .st-search:focus { border-color:#5641ce; }
        .st-select { padding:9px 12px; border:1px solid #e2e8f0; border-radius:10px; font-size:0.8rem; font-family:inherit; color:#0f172a; background:#fff; outline:none; cursor:pointer; }
        .st-select:focus { border-color:#5641ce; }
        .st-clear-btn { padding:9px 14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff; color:#475569; font-size:0.8rem; font-weight:600; cursor:pointer; }
        .st-clear-btn:hover { background:#f8fafc; border-color:#cbd5e1; }

        /* Table shell */
        .st-table-wrap { background:#fff; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; margin-bottom:16px; }
        .st-table-header { display:flex; align-items:center; justify-content:space-between; padding:16px 18px; border-bottom:1px solid #e2e8f0; background:#fff; }
        .st-table-title  { font-size:0.9rem; font-weight:700; color:#0f172a; display:flex; align-items:center; gap:10px; }
        .st-table-count  { font-size:0.72rem; font-weight:700; background:#f1f5f9; color:#475569; padding:2px 9px; border-radius:100px; }
        .st-table-scroll { overflow-x:auto; }

        /* Table — same house style as the Leads table */
        .st-table { width:100%; border-collapse:collapse; font-size:0.85rem; min-width:1040px; }
        .st-table thead tr { background:#fff; }
        .st-table thead th { text-align:left; font-size:0.7rem; letter-spacing:0.05em; text-transform:uppercase; color:#94a3b8; font-weight:700; padding:10px 12px; border-bottom:1px solid #e2e8f0; white-space:nowrap; }
        .st-table tbody td { padding:12px; border-bottom:1px solid #f1f5f9; vertical-align:middle; color:#334155; white-space:nowrap; }
        .st-table tbody tr:hover { background:#f8fafc; }
        .st-table tbody tr:last-child td { border-bottom:none; }
        .st-td-num { color:#94a3b8; font-size:0.75rem; font-weight:600; }

        .st-student-row { display:flex; align-items:center; gap:10px; }
        .st-avatar { width:32px; height:32px; background:#f1eefc; color:#5641ce; border:1px solid #ded7f6; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.8rem; font-weight:700; flex-shrink:0; }
        .st-name { font-weight:600; color:#0f172a; }
        .st-class-sub { font-size:0.74rem; color:#94a3b8; margin-top:1px; }
        .st-na { color:#cbd5e1; }

        .st-inline { display:inline-flex; align-items:center; gap:5px; color:#334155; }
        .st-email { max-width:200px; overflow:hidden; text-overflow:ellipsis; font-size:0.78rem; color:#475569; }

        .st-tag { background:#f1f5f9; color:#475569; border-radius:6px; padding:4px 10px; font-size:0.75rem; font-weight:600; white-space:nowrap; }

        .st-date { color:#334155; }
        .st-time { font-size:0.74rem; color:#94a3b8; margin-top:1px; }

        /* Status */
        .st-status-select { border:1px solid #e2e8f0; background:#fff; color:#0f172a; border-radius:8px; padding:5px 8px; font-size:0.75rem; font-weight:600; font-family:inherit; cursor:pointer; }
        .st-status-select.is-inactive { border-color:#fecaca; color:#b91c1c; }
        .st-status-select:disabled { opacity:0.6; cursor:default; }

        /* Actions */
        .st-actions { display:flex; align-items:flex-start; gap:6px; }
        .st-action { background:#fff; border:1px solid #e2e8f0; border-radius:10px; cursor:pointer; padding:7px 10px; min-width:62px; display:flex; flex-direction:column; align-items:center; gap:4px; color:#475569; transition:background 0.15s, border-color 0.15s; }
        .st-action:hover { background:#f8fafc; border-color:#cbd5e1; }
        .st-action.danger { color:#b91c1c; border-color:#fecaca; }
        .st-action.danger:hover { background:#fef2f2; }
        .st-action-icon { display:inline-flex; align-items:center; justify-content:center; line-height:1; }
        .st-action-label { font-size:0.69rem; font-weight:600; line-height:1; }

        /* Delete confirmation */
        .st-confirm-backdrop { position:fixed; inset:0; background:rgba(15,23,42,0.5); z-index:1080; display:flex; align-items:center; justify-content:center; padding:20px; }
        .st-confirm { background:#fff; border-radius:16px; width:460px; max-width:100%; overflow:hidden; }
        .st-confirm-head { background:#b91c1c; color:#fff; padding:18px 20px; display:flex; justify-content:space-between; align-items:flex-start; gap:12px; }
        .st-confirm-head h5 { margin:0; font-weight:700; font-size:1rem; }
        .st-confirm-head p { margin:4px 0 0; font-size:0.8rem; opacity:0.85; }
        .st-confirm-head button { background:rgba(255,255,255,0.2); border:none; color:#fff; border-radius:8px; width:32px; height:32px; flex-shrink:0; display:flex; align-items:center; justify-content:center; }
        .st-confirm-body { padding:18px 20px; }
        .st-confirm-name { margin:0 0 4px; font-size:0.95rem; font-weight:700; color:#0f172a; }
        .st-confirm-meta { margin:0 0 10px; font-size:0.8rem; color:#475569; }
        .st-confirm-sub { margin:0; font-size:0.8rem; color:#64748b; line-height:1.55; }
        .st-confirm-foot { display:flex; gap:10px; justify-content:flex-end; padding:14px 20px; border-top:1px solid #e2e8f0; }
        .st-confirm-cancel, .st-confirm-go { border-radius:10px; padding:9px 18px; font-weight:600; font-size:0.8rem; border:1px solid #e2e8f0; background:#fff; color:#334155; cursor:pointer; }
        .st-confirm-go { background:#b91c1c; border-color:#b91c1c; color:#fff; }
        .st-confirm-cancel:disabled, .st-confirm-go:disabled { opacity:0.6; cursor:default; }

        /* Loading / empty */
        .st-loading { display:flex; align-items:center; justify-content:center; gap:12px; padding:56px; color:#64748b; font-size:0.88rem; }
        .st-spinner { width:20px; height:20px; border:2px solid #e2e8f0; border-top-color:#5641ce; border-radius:50%; animation:stspin 0.7s linear infinite; }
        @keyframes stspin { to { transform:rotate(360deg); } }
        .st-empty      { text-align:center; padding:48px 24px; }
        .st-empty-icon { color:#cbd5e1; margin-bottom:14px; }
        .st-empty-title { font-size:0.98rem; font-weight:700; color:#0f172a; margin-bottom:6px; }
        .st-empty p { color:#64748b; font-size:0.85rem; margin:0; }

        /* Pagination */
        .st-pagination { display:flex; align-items:center; justify-content:center; gap:14px; padding:12px 0; }
        .st-page-btn   { padding:8px 16px; border:1px solid #e2e8f0; border-radius:10px; background:#fff; font-size:0.82rem; font-weight:600; color:#334155; cursor:pointer; }
        .st-page-btn:hover:not(:disabled) { background:#f8fafc; border-color:#cbd5e1; }
        .st-page-btn:disabled { opacity:0.4; cursor:not-allowed; }
        .st-page-info  { font-size:0.8rem; color:#0f172a; font-weight:600; }
        .st-page-total { color:#94a3b8; margin-left:8px; font-weight:500; }

        /* Responsive */
        @media (max-width:1100px) { .st-stats-row { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:600px)  { .st-stats-row { grid-template-columns:1fr 1fr; } }
      `}</style>
    </>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));
