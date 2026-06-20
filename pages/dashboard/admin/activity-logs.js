import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { MdHistory, MdSearch, MdRefresh, MdFilterList, MdClose } from "react-icons/md";

const ALL_FEATURES = [
  { key: "blogs", label: "Blogs" }, { key: "faqs", label: "FAQs" },
  { key: "students", label: "Students" }, { key: "courses", label: "Courses" },
  { key: "admissions", label: "Applications" }, { key: "announcements", label: "Announcements" },
  { key: "leads", label: "Leads" }, { key: "student-success", label: "Student Success" },
  { key: "online-classes", label: "Online Classes" }, { key: "invoices", label: "Invoices" },
  { key: "enrollments", label: "Enrollments" },
];

const ACTION_COLORS = {
  create: { bg: "#dcfce7", color: "#16a34a", label: "Create" },
  update: { bg: "#dbeafe", color: "#2563eb", label: "Update" },
  delete: { bg: "#fee2e2", color: "#dc2626", label: "Delete" },
  "status-change": { bg: "#fef9c3", color: "#ca8a04", label: "Status" },
  activate: { bg: "#d1fae5", color: "#059669", label: "Activate" },
  deactivate: { bg: "#ffe4e6", color: "#be123c", label: "Deactivate" },
  "toggle-status": { bg: "#fef9c3", color: "#ca8a04", label: "Toggle" },
  view: { bg: "#f0f1f5", color: "#6b7a99", label: "View" },
};

const FEATURE_COLORS = {
  blogs: "#3b82f6", faqs: "#8b5cf6", students: "#10b981", courses: "#f59e0b",
  admissions: "#ef4444", announcements: "#06b6d4", leads: "#ec4899",
  "student-success": "#14b8a6", "online-classes": "#f97316",
  invoices: "#6366f1", enrollments: "#84cc16",
};

function timeAgo(seconds) {
  if (seconds < 10) return "Just now";
  if (seconds < 60) return `${seconds}s ago`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

const FEATURE_ICONS = {
  blogs: "📝", faqs: "❓", students: "🎓", courses: "📚", admissions: "📋",
  announcements: "📢", leads: "📞", "student-success": "🏆",
  "online-classes": "🎥", invoices: "🧾", enrollments: "✅", dashboard: "🏠", other: "⚙️",
};

export default function ActivityLogsPage({ subAdmins }) {
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [expandedLog, setExpandedLog] = useState(null);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({ subAdminId: "", feature: "", action: "", from: "", to: "" });
  const [liveSessions, setLiveSessions] = useState([]);
  const liveIntervalRef = useRef(null);

  const LIMIT = 30;

  const fetchLogs = async (pg = 1, currentFilters = filters, currentSearch = search) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: pg, limit: LIMIT });
      Object.entries(currentFilters).forEach(([k, v]) => v && params.set(k, v));
      if (currentSearch) params.set("search", currentSearch);
      const res = await fetch(`/api/admin/activity-logs?${params}`);
      const data = await res.json();
      if (data.success) { setLogs(data.data); setTotal(data.total); }
    } catch {}
    setLoading(false);
  };

  const fetchLiveSessions = async () => {
    try {
      const res = await fetch("/api/admin/live-sessions");
      const data = await res.json();
      if (data.success) setLiveSessions(data.data);
    } catch {}
  };

  useEffect(() => {
    fetchLogs(1, filters, search);
    setPage(1);
  }, [filters, search]);

  useEffect(() => {
    fetchLiveSessions();
    liveIntervalRef.current = setInterval(fetchLiveSessions, 15000);
    return () => clearInterval(liveIntervalRef.current);
  }, []);

  const setFilter = (key, val) => setFilters(f => ({ ...f, [key]: val }));
  const clearFilters = () => {
    setFilters({ subAdminId: "", feature: "", action: "", from: "", to: "" });
    setSearch(""); setSearchInput("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const totalPages = Math.ceil(total / LIMIT);
  const hasFilters = Object.values(filters).some(Boolean) || search;
  const onlineSessions = liveSessions.filter(s => s.secondsAgo < 60);
  const idleSessions = liveSessions.filter(s => s.secondsAgo >= 60 && s.secondsAgo < 300);

  return (
    <>
      <Head><title>Activity Logs — SS Coaching Admin</title></Head>
      <div className="oc-wrapper">
        <Topbar />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1" style={{ background: "#f4f6fb" }}>
            <div className="container-fluid p-4">

              {/* Page Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div>
                  <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f1f3d", margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
                    <MdHistory size={28} color="#5641CE" /> Activity Logs
                  </h1>
                  <p style={{ color: "#6b7a99", margin: "4px 0 0", fontSize: "0.88rem" }}>
                    Complete audit trail of all sub-admin actions across every module
                  </p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Link href="/dashboard/admin/live-monitor"
                    style={{ background: "#10b981", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                    📡 Live Monitor
                  </Link>
                  <button onClick={() => fetchLogs(page)} style={{ background: "#f0f1f5", color: "#374151", border: "none", borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 6 }}>
                    <MdRefresh size={16} /> Refresh
                  </button>
                </div>
              </div>

              {/* Live Sessions Banner */}
              {liveSessions.length > 0 && (
                <div style={{ background: "#fff", borderRadius: 12, padding: "14px 20px", marginBottom: 20, boxShadow: "0 1px 6px rgba(0,0,0,0.07)", border: "1.5px solid #10b98133" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 0 3px #10b98133", animation: "pulse 2s infinite" }} />
                    <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#065f46" }}>
                      {onlineSessions.length} Sub-Admin{onlineSessions.length !== 1 ? "s" : ""} Currently Active
                    </span>
                    <Link href="/dashboard/admin/live-monitor" style={{ marginLeft: "auto", fontSize: "0.78rem", color: "#5641CE", fontWeight: 600, textDecoration: "none" }}>
                      View Full Monitor →
                    </Link>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {liveSessions.map(session => {
                      const isActive = session.secondsAgo < 60;
                      const featureColor = FEATURE_COLORS[session.currentFeature] || "#9ca3af";
                      const featureIcon = FEATURE_ICONS[session.currentFeature] || "⚙️";
                      return (
                        <div key={session._id} style={{
                          display: "flex", alignItems: "center", gap: 8,
                          background: isActive ? featureColor + "12" : "#f8fafc",
                          border: `1.5px solid ${isActive ? featureColor + "40" : "#e5e7eb"}`,
                          borderRadius: 10, padding: "7px 14px",
                        }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: featureColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem", flexShrink: 0 }}>
                            {session.subAdminName?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#1e293b" }}>{session.subAdminName}</div>
                            <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                              {featureIcon} {session.currentPageLabel} · {timeAgo(session.secondsAgo)}
                            </div>
                          </div>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: isActive ? "#10b981" : "#f59e0b", marginLeft: 4 }} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Filters Panel */}
              <div style={{ background: "#fff", borderRadius: 12, padding: "1rem 1.2rem", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", marginBottom: 16 }}>
                {/* Search Row */}
                <form onSubmit={handleSearch} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <div style={{ flex: 1, position: "relative" }}>
                    <MdSearch size={18} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
                    <input
                      value={searchInput}
                      onChange={e => setSearchInput(e.target.value)}
                      placeholder="Search by description, entity, action..."
                      style={{ ...selectStyle, paddingLeft: 36, width: "100%", boxSizing: "border-box" }}
                    />
                  </div>
                  <button type="submit" style={{ background: "#5641CE", color: "#fff", border: "none", borderRadius: 8, padding: "0 18px", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}>
                    Search
                  </button>
                  {hasFilters && (
                    <button type="button" onClick={clearFilters}
                      style={{ background: "#f0f1f5", color: "#374151", border: "none", borderRadius: 8, padding: "0 14px", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 4 }}>
                      <MdClose size={16} /> Clear
                    </button>
                  )}
                </form>

                {/* Filter Row */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <MdFilterList size={15} color="#9ca3af" />
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#9ca3af" }}>FILTER BY</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
                  <select value={filters.subAdminId} onChange={e => setFilter("subAdminId", e.target.value)} style={selectStyle}>
                    <option value="">All Sub-Admins</option>
                    {(subAdmins || []).map(sa => <option key={sa._id} value={sa._id}>{sa.name} (@{sa.username})</option>)}
                  </select>
                  <select value={filters.feature} onChange={e => setFilter("feature", e.target.value)} style={selectStyle}>
                    <option value="">All Modules</option>
                    {ALL_FEATURES.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
                  </select>
                  <select value={filters.action} onChange={e => setFilter("action", e.target.value)} style={selectStyle}>
                    <option value="">All Actions</option>
                    <option value="create">Create</option>
                    <option value="update">Update</option>
                    <option value="delete">Delete</option>
                    <option value="status-change">Status Change</option>
                    <option value="activate">Activate</option>
                    <option value="deactivate">Deactivate</option>
                    <option value="toggle-status">Toggle Status</option>
                  </select>
                  <input type="date" value={filters.from} onChange={e => setFilter("from", e.target.value)} style={selectStyle} title="From date" />
                  <input type="date" value={filters.to} onChange={e => setFilter("to", e.target.value)} style={selectStyle} title="To date" />
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, fontSize: "0.85rem" }}>
                <span style={{ color: "#6b7a99" }}>
                  Showing <strong style={{ color: "#0f1f3d" }}>{logs.length}</strong> of <strong style={{ color: "#0f1f3d" }}>{total}</strong> entries
                  {hasFilters && <span style={{ color: "#5641CE", marginLeft: 8 }}>(filtered)</span>}
                </span>
                {totalPages > 1 && <span style={{ color: "#9ca3af" }}>Page {page} of {totalPages}</span>}
              </div>

              {/* Logs Table */}
              <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", overflow: "hidden" }}>
                {loading ? (
                  <div style={{ padding: "4rem", textAlign: "center", color: "#9ca3af", fontSize: "0.95rem" }}>
                    <MdHistory size={40} style={{ opacity: 0.25, display: "block", margin: "0 auto 12px" }} />
                    Loading activity logs...
                  </div>
                ) : logs.length === 0 ? (
                  <div style={{ padding: "4rem", textAlign: "center", color: "#9ca3af" }}>
                    <MdHistory size={52} style={{ opacity: 0.2, display: "block", margin: "0 auto 14px" }} />
                    <div style={{ fontWeight: 700, fontSize: "1rem", color: "#374151", marginBottom: 6 }}>No activity logs found</div>
                    <div style={{ fontSize: "0.85rem" }}>{hasFilters ? "Try changing your filters or search query." : "Sub-admin actions will appear here once they perform any actions."}</div>
                  </div>
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f8f9ff", borderBottom: "2px solid #e8eaf5" }}>
                        {["Sub-Admin", "Module", "Action", "Description", "Date & Time", ""].map(h => (
                          <th key={h} style={{ padding: "10px 14px", fontSize: "0.73rem", fontWeight: 700, color: "#6b7a99", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map(log => {
                        const ac = ACTION_COLORS[log.action] || ACTION_COLORS.view;
                        const fc = FEATURE_COLORS[log.feature];
                        const expanded = expandedLog === log._id;
                        return [
                          <tr key={log._id}
                            onClick={() => setExpandedLog(expanded ? null : log._id)}
                            style={{ borderBottom: "1px solid #f0f1f5", cursor: "pointer", background: expanded ? "#f8f9ff" : "transparent", transition: "background 0.1s" }}>
                            <td style={{ padding: "12px 14px" }}>
                              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0f1f3d" }}>{log.subAdminName}</div>
                              <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>@{log.subAdminUsername}</div>
                            </td>
                            <td style={{ padding: "12px 14px" }}>
                              <span style={{ background: fc ? fc + "18" : "#f0f1f5", color: fc || "#6b7a99", padding: "3px 10px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>
                                <span>{FEATURE_ICONS[log.feature] || "⚙️"}</span> {log.feature}
                              </span>
                            </td>
                            <td style={{ padding: "12px 14px" }}>
                              <span style={{ background: ac.bg, color: ac.color, padding: "3px 10px", borderRadius: 20, fontSize: "0.73rem", fontWeight: 700, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                                {ac.label || log.action}
                              </span>
                            </td>
                            <td style={{ padding: "12px 14px", maxWidth: 280 }}>
                              <div style={{ fontSize: "0.84rem", color: "#374151", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                {log.description || "—"}
                              </div>
                            </td>
                            <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>
                              <div style={{ fontSize: "0.8rem", color: "#374151", fontWeight: 500 }}>
                                {new Date(log.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                              </div>
                              <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>
                                {new Date(log.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                              </div>
                            </td>
                            <td style={{ padding: "12px 10px", textAlign: "center" }}>
                              <span style={{ color: "#9ca3af", fontSize: "0.75rem" }}>{expanded ? "▲" : "▼"}</span>
                            </td>
                          </tr>,
                          expanded && (
                            <tr key={log._id + "-expand"}>
                              <td colSpan={6} style={{ background: "#fafbff", padding: "16px 20px", borderBottom: "2px solid #e8eaf5" }}>
                                <div style={{ display: "flex", gap: 20, marginBottom: 12, fontSize: "0.8rem", color: "#6b7a99", flexWrap: "wrap", alignItems: "center" }}>
                                  {log.entityId && <span>Entity ID: <code style={{ background: "#f0f1f5", padding: "2px 7px", borderRadius: 4, fontSize: "0.78rem" }}>{log.entityId}</code></span>}
                                  {log.entityType && <span>Entity Type: <strong style={{ color: "#374151" }}>{log.entityType}</strong></span>}
                                  {log.ip && log.ip !== "::1" && log.ip !== "127.0.0.1" && (
                                    <span>IP Address: <strong style={{ color: "#374151", fontFamily: "monospace" }}>{log.ip}</strong></span>
                                  )}
                                  <Link href={`/dashboard/admin/sub-admins/${log.subAdminId}`}
                                    style={{ color: "#5641CE", fontWeight: 700, textDecoration: "none", fontSize: "0.8rem" }}
                                    onClick={e => e.stopPropagation()}>
                                    View {log.subAdminName}'s profile →
                                  </Link>
                                </div>
                                {(log.before !== null || log.after !== null) && (
                                  <div style={{ display: "grid", gridTemplateColumns: (log.before !== null && log.after !== null) ? "1fr 1fr" : "1fr", gap: 14 }}>
                                    {log.before !== null && (
                                      <div>
                                        <div style={{ fontSize: "0.73rem", fontWeight: 800, color: "#dc2626", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                                          <span style={{ background: "#fee2e2", padding: "2px 8px", borderRadius: 4 }}>BEFORE</span>
                                        </div>
                                        <pre style={{ background: "#fff3f3", border: "1px solid #fecaca", borderRadius: 8, padding: "12px", fontSize: "0.78rem", color: "#374151", overflow: "auto", maxHeight: 220, margin: 0, lineHeight: 1.6 }}>
                                          {JSON.stringify(log.before, null, 2)}
                                        </pre>
                                      </div>
                                    )}
                                    {log.after !== null && (
                                      <div>
                                        <div style={{ fontSize: "0.73rem", fontWeight: 800, color: "#16a34a", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                                          <span style={{ background: "#dcfce7", padding: "2px 8px", borderRadius: 4 }}>AFTER</span>
                                        </div>
                                        <pre style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "12px", fontSize: "0.78rem", color: "#374151", overflow: "auto", maxHeight: 220, margin: 0, lineHeight: 1.6 }}>
                                          {JSON.stringify(log.after, null, 2)}
                                        </pre>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </td>
                            </tr>
                          )
                        ];
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
                  <button onClick={() => { const np = page - 1; setPage(np); fetchLogs(np); }} disabled={page === 1}
                    style={{ padding: "7px 18px", border: "1.5px solid #e5e7eb", borderRadius: 8, background: "#fff", cursor: page === 1 ? "not-allowed" : "pointer", color: "#374151", fontWeight: 600, fontSize: "0.85rem", opacity: page === 1 ? 0.4 : 1 }}>
                    ← Prev
                  </button>
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => { setPage(p); fetchLogs(p); }}
                      style={{ padding: "7px 14px", border: `1.5px solid ${page === p ? "#5641CE" : "#e5e7eb"}`, borderRadius: 8, background: page === p ? "#5641CE" : "#fff", color: page === p ? "#fff" : "#374151", cursor: "pointer", fontWeight: 700, fontSize: "0.85rem" }}>
                      {p}
                    </button>
                  ))}
                  <button onClick={() => { const np = page + 1; setPage(np); fetchLogs(np); }} disabled={page >= totalPages}
                    style={{ padding: "7px 18px", border: "1.5px solid #e5e7eb", borderRadius: 8, background: "#fff", cursor: page >= totalPages ? "not-allowed" : "pointer", color: "#374151", fontWeight: 600, fontSize: "0.85rem", opacity: page >= totalPages ? 0.4 : 1 }}>
                    Next →
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
        }
      `}</style>
    </>
  );
}

const selectStyle = {
  padding: "0.45rem 0.75rem",
  border: "1.5px solid #e5e7eb",
  borderRadius: 8,
  fontSize: "0.84rem",
  color: "#374151",
  width: "100%",
  outline: "none",
  background: "#fafafa",
};

export const getServerSideProps = withAdminAuth(async () => {
  const { default: dbConnect } = await import("@/lib/dbConnect");
  const { default: SubAdmin } = await import("@/models/SubAdmin");
  await dbConnect();
  const subAdmins = await SubAdmin.find({}, { name: 1, username: 1 }).sort({ name: 1 }).lean();
  return {
    props: {
      subAdmins: subAdmins.map(s => ({ _id: String(s._id), name: s.name, username: s.username })),
    },
  };
}, { superAdminOnly: true });
