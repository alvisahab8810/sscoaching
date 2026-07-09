import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";
import {
  MdSearch, MdDelete, MdPhone, MdCheckCircle, MdRefresh,
  MdGroup, MdDesktopMac, MdPhoneAndroid, MdEmail, MdPeople,
  MdCancel, MdFilterList,
} from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
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
  const [deleteConfirm, setDeleteConfirm] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      const res  = await fetch(`/api/admin/students?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) { toast.success("Student deleted"); fetchStudents(pagination.page); }
      else toast.error(data.message);
    } catch { toast.error("Failed to delete"); }
    setDeleteConfirm(null);
  };

  const statCards = [
    { label: "Total Students",    value: stats.total,    color: "#6c47d4", icon: <MdGroup size={22}/> },
    { label: "Desktop Signups",   value: stats.webCount ?? stats.total, color: "#0ea5e9", icon: <MdDesktopMac size={22}/> },
    { label: "App Signups",       value: stats.appCount || 0,  color: "#10b981", icon: <MdPhoneAndroid size={22}/> },
    { label: "Active Students",   value: stats.active,   color: "#f59e0b", icon: <BsPersonCheck size={22}/> },
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
                  <h4 className="st-page-title"><MdGroup size={22}/> Students</h4>
                  <p className="st-page-sub">All registered students — web and app signups</p>
                </div>
                <button className="st-refresh-btn" onClick={() => fetchStudents(pagination.page)} disabled={loading}>
                  <MdRefresh size={16}/> Refresh
                </button>
              </div>

              {/* STAT CARDS */}
              <div className="st-stats-row">
                {statCards.map((s) => (
                  <div key={s.label} className="st-stat-card">
                    <div className="st-stat-icon" style={{ background: s.color + "18", color: s.color }}>
                      {s.icon}
                    </div>
                    <div>
                      <div className="st-stat-value" style={{ color: s.color }}>{s.value ?? "—"}</div>
                      <div className="st-stat-label">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* SOURCE TABS */}
              <div className="st-source-tabs">
                <button className={`st-tab${sourceTab === "all" ? " active" : ""}`} onClick={() => setSourceTab("all")}>
                  <MdPeople size={15}/> All Students
                  <span className="st-tab-count">{stats.total || 0}</span>
                </button>
                <button className={`st-tab web${sourceTab === "web" ? " active" : ""}`} onClick={() => setSourceTab("web")}>
                  <MdDesktopMac size={15}/> Desktop
                  <span className="st-tab-count web">{stats.webCount ?? "—"}</span>
                </button>
                <button className={`st-tab app${sourceTab === "app" ? " active" : ""}`} onClick={() => setSourceTab("app")}>
                  <MdPhoneAndroid size={15}/> App
                  <span className="st-tab-count app">{stats.appCount || 0}</span>
                </button>
              </div>

              {/* FILTERS */}
              <div className="st-filters">
                <div className="st-search-wrap">
                  <MdSearch size={16} className="st-search-icon"/>
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
                    {sourceTab === "web" ? <><MdDesktopMac size={16}/> Desktop Students</> :
                     sourceTab === "app" ? <><MdPhoneAndroid size={16}/> App Students</> :
                     "All Students"}
                    <span className="st-table-count">{pagination.total} total</span>
                  </div>
                </div>

                {loading ? (
                  <div className="st-loading"><div className="st-spinner"/><span>Loading students...</span></div>
                ) : students.length === 0 ? (
                  <div className="st-empty">
                    <MdGroup size={48} className="st-empty-icon"/>
                    <div className="st-empty-title">No Students Found</div>
                    <p>{search || filterClass ? "Try clearing your filters." : "No students yet."}</p>
                  </div>
                ) : (
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
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s, idx) => {
                        const rowNum = (pagination.page - 1) * pagination.limit + idx + 1;
                        const isApp = s.signupSource === "app";
                        return (
                          <tr key={s._id} className="st-row">
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
                                ? <div className="st-phone"><MdPhone size={12}/> +91 {s.phone}</div>
                                : <span className="st-na">—</span>}
                            </td>
                            <td>
                              {s.email
                                ? <div className="st-email"><MdEmail size={12}/> {s.email}</div>
                                : <span className="st-na">—</span>}
                            </td>
                            <td>
                              {s.className
                                ? <span className="st-class-badge">{s.className}</span>
                                : <span className="st-na">—</span>}
                            </td>
                            <td>
                              {isApp
                                ? <span className="st-source-badge app"><MdPhoneAndroid size={11}/> App</span>
                                : <span className="st-source-badge web"><MdDesktopMac size={11}/> Desktop</span>}
                            </td>
                            <td>
                              <div className="st-date">{fmtDate(s.createdAt)}</div>
                              <div className="st-time">{fmtTime(s.createdAt)}</div>
                            </td>
                            <td>
                              {s.isActive
                                ? <span className="st-status active"><MdCheckCircle size={12}/> Active</span>
                                : <span className="st-status inactive"><MdCancel size={12}/> Inactive</span>}
                            </td>
                            <td onClick={(e) => e.stopPropagation()}>
                              {deleteConfirm === s._id ? (
                                <div className="st-confirm-row">
                                  <button className="st-confirm-yes" onClick={() => handleDelete(s._id)}>Yes</button>
                                  <button className="st-confirm-no" onClick={() => setDeleteConfirm(null)}>No</button>
                                </div>
                              ) : (
                                <button className="st-delete-btn" onClick={() => setDeleteConfirm(s._id)} title="Delete">
                                  <MdDelete size={15}/>
                                </button>
                              )}
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
                <div className="st-pagination">
                  <button className="st-page-btn" disabled={pagination.page <= 1}
                    onClick={() => fetchStudents(pagination.page - 1)}>← Prev</button>
                  <span className="st-page-info">
                    Page {pagination.page} of {pagination.totalPages}
                    <span style={{ color:"#8491a8", marginLeft:8 }}>({pagination.total} total)</span>
                  </span>
                  <button className="st-page-btn" disabled={pagination.page >= pagination.totalPages}
                    onClick={() => fetchStudents(pagination.page + 1)}>Next →</button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Page header */
        .st-page-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:20px; }
        .st-page-title  { font-size:1.25rem; font-weight:800; color:#0f1f3d; display:flex; align-items:center; gap:9px; margin:0 0 3px; }
        .st-page-sub    { font-size:0.82rem; color:#8491a8; margin:0; }
        .st-refresh-btn { display:flex; align-items:center; gap:6px; padding:9px 16px; background:#fff; border:1.5px solid #dde0f8; border-radius:9px; font-size:0.82rem; font-weight:600; color:#6c47d4; cursor:pointer; }
        .st-refresh-btn:hover { background:#ede9fe; }

        /* Stats */
        .st-stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
        .st-stat-card { background:#fff; border-radius:12px; border:1.5px solid #dde0f8; padding:16px; display:flex; align-items:center; gap:12px; box-shadow:0 1px 8px rgba(108,71,212,0.05); }
        .st-stat-icon  { width:44px; height:44px; border-radius:11px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .st-stat-value { font-size:1.35rem; font-weight:900; line-height:1; }
        .st-stat-label { font-size:0.72rem; color:#8491a8; margin-top:3px; font-weight:600; }

        /* Source tabs */
        .st-source-tabs { display:flex; gap:8px; margin-bottom:16px; }
        .st-tab { display:flex; align-items:center; gap:6px; padding:9px 18px; border:1.5px solid #dde0f8; border-radius:10px; background:#fff; font-size:0.82rem; font-weight:600; color:#6b7a99; cursor:pointer; transition:all 0.14s; }
        .st-tab:hover { border-color:#6c47d4; color:#6c47d4; background:#fafbff; }
        .st-tab.active { background:#6c47d4; border-color:#6c47d4; color:#fff; }
        .st-tab.active .st-tab-count { background:rgba(255,255,255,0.25); color:#fff; }
        .st-tab.web.active { background:#0ea5e9; border-color:#0ea5e9; }
        .st-tab.app.active { background:#10b981; border-color:#10b981; }
        .st-tab-count { font-size:0.7rem; font-weight:800; background:#ede9fe; color:#6c47d4; padding:1px 7px; border-radius:100px; margin-left:2px; }
        .st-tab-count.web { background:#e0f2fe; color:#0284c7; }
        .st-tab-count.app { background:#d1fae5; color:#065f46; }

        /* Filters */
        .st-filters { display:flex; gap:10px; align-items:center; margin-bottom:16px; }
        .st-search-wrap { position:relative; flex:1; max-width:380px; }
        .st-search-icon { position:absolute; left:10px; top:50%; transform:translateY(-50%); color:#8491a8; }
        .st-search { width:100%; padding:9px 12px 9px 32px; border:1.5px solid #e2e5f8; border-radius:8px; font-size:0.82rem; font-family:inherit; color:#0f1f3d; outline:none; }
        .st-search:focus { border-color:#6c47d4; }
        .st-select { padding:8px 12px; border:1.5px solid #e2e5f8; border-radius:8px; font-size:0.8rem; font-family:inherit; color:#0f1f3d; background:#fff; outline:none; cursor:pointer; }
        .st-clear-btn { padding:8px 14px; border:1.5px solid #fca5a5; border-radius:8px; background:#fff0f0; color:#ef4444; font-size:0.78rem; font-weight:600; cursor:pointer; }

        /* Table */
        .st-table-wrap { background:#fff; border:1.5px solid #dde0f8; border-radius:12px; overflow:hidden; box-shadow:0 1px 8px rgba(108,71,212,0.05); margin-bottom:16px; overflow-x:auto; }
        .st-table-header { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; border-bottom:1.5px solid #f0f1fa; background:#fafbff; }
        .st-table-title  { font-size:0.9rem; font-weight:800; color:#0f1f3d; display:flex; align-items:center; gap:8px; }
        .st-table-count  { font-size:0.72rem; font-weight:700; background:#ede9fe; color:#6c47d4; padding:2px 9px; border-radius:100px; }

        .st-table { width:100%; border-collapse:collapse; min-width:860px; }
        .st-table thead tr { background:#f4f5ff; }
        .st-table thead th { padding:10px 14px; text-align:left; font-size:0.68rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; color:#6c47d4; white-space:nowrap; }
        .st-row { border-bottom:1px solid #f0f1fa; transition:background 0.12s; }
        .st-row:hover { background:#fafbff; }
        .st-row:last-child { border-bottom:none; }
        .st-table tbody td { padding:11px 14px; font-size:0.82rem; vertical-align:middle; }
        .st-td-num { color:#8491a8; font-size:0.75rem; font-weight:600; }

        .st-student-row { display:flex; align-items:center; gap:9px; }
        .st-avatar { width:34px; height:34px; background:linear-gradient(135deg,#6c47d4,#8b5cf6); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:0.85rem; font-weight:900; flex-shrink:0; }
        .st-name { font-weight:700; color:#0f1f3d; font-size:0.85rem; }
        .st-class-sub { font-size:0.7rem; color:#8491a8; margin-top:1px; }
        .st-na { color:#c5c9d8; font-size:0.78rem; }

        .st-phone { display:flex; align-items:center; gap:4px; font-size:0.8rem; color:#374151; font-weight:600; white-space:nowrap; }
        .st-email { display:flex; align-items:center; gap:4px; font-size:0.75rem; color:#6b7a99; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

        .st-class-badge { font-size:0.7rem; font-weight:700; background:#ede9fe; color:#6c47d4; padding:2px 8px; border-radius:100px; white-space:nowrap; }

        .st-source-badge { display:inline-flex; align-items:center; gap:4px; padding:2px 8px; border-radius:100px; font-size:0.68rem; font-weight:700; white-space:nowrap; }
        .st-source-badge.web { background:#e0f2fe; color:#0284c7; }
        .st-source-badge.app { background:#d1fae5; color:#065f46; }

        .st-date { font-size:0.78rem; color:#374151; font-weight:600; white-space:nowrap; }
        .st-time { font-size:0.7rem; color:#8491a8; margin-top:1px; }

        .st-status { display:inline-flex; align-items:center; gap:4px; padding:2px 8px; border-radius:100px; font-size:0.7rem; font-weight:700; white-space:nowrap; }
        .st-status.active   { background:#d1fae5; color:#065f46; }
        .st-status.inactive { background:#fee2e2; color:#991b1b; }

        .st-delete-btn { width:30px; height:30px; display:flex; align-items:center; justify-content:center; border-radius:7px; border:1.5px solid #fca5a5; background:#fff; cursor:pointer; color:#ef4444; transition:all 0.12s; }
        .st-delete-btn:hover { background:#fee2e2; }
        .st-confirm-row { display:flex; gap:4px; }
        .st-confirm-yes { padding:3px 10px; background:#ef4444; color:#fff; border:none; border-radius:6px; font-size:0.76rem; font-weight:700; cursor:pointer; }
        .st-confirm-no  { padding:3px 10px; background:#f3f4fb; color:#374151; border:none; border-radius:6px; font-size:0.76rem; font-weight:700; cursor:pointer; }

        /* Loading / empty */
        .st-loading { display:flex; align-items:center; justify-content:center; gap:12px; padding:56px; color:#8491a8; font-size:0.9rem; }
        .st-spinner { width:22px; height:22px; border:2px solid #e2e5f8; border-top-color:#6c47d4; border-radius:50%; animation:stspin 0.7s linear infinite; }
        @keyframes stspin { to { transform:rotate(360deg); } }
        .st-empty      { text-align:center; padding:48px 24px; }
        .st-empty-icon { color:#c8ccef; margin-bottom:14px; }
        .st-empty-title { font-size:1rem; font-weight:800; color:#0f1f3d; margin-bottom:6px; }
        .st-empty p { color:#8491a8; font-size:0.85rem; }

        /* Pagination */
        .st-pagination { display:flex; align-items:center; justify-content:center; gap:14px; padding:12px 0; }
        .st-page-btn   { padding:7px 16px; border:1.5px solid #dde0f8; border-radius:8px; background:#fff; font-size:0.82rem; font-weight:600; color:#6c47d4; cursor:pointer; }
        .st-page-btn:disabled { opacity:0.4; cursor:not-allowed; }
        .st-page-info  { font-size:0.8rem; color:#0f1f3d; font-weight:600; }

        /* Responsive */
        @media (max-width:1100px) { .st-stats-row { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:600px)  { .st-stats-row { grid-template-columns:1fr 1fr; } }
      `}</style>
    </>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));
