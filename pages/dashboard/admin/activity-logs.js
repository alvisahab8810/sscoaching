import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import {
  MdHistory,
  MdSearch,
  MdRefresh,
  MdFilterList,
  MdClose,
  MdMonitor,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";

const ALL_FEATURES = [
  { key: "blogs", label: "Blogs" }, { key: "faqs", label: "FAQs" },
  { key: "students", label: "Students" }, { key: "courses", label: "Courses" },
  { key: "admissions", label: "Applications" }, { key: "announcements", label: "Announcements" },
  { key: "leads", label: "Leads" }, { key: "student-success", label: "Student Success" },
  { key: "online-classes", label: "Live Classes" }, { key: "invoices", label: "Invoices" },
  { key: "enrollments", label: "Enrollments" },
  { key: "pages", label: "Pages" },
];

const FEATURE_LABELS = ALL_FEATURES.reduce((acc, f) => {
  acc[f.key] = f.label;
  return acc;
}, { dashboard: "Dashboard", other: "Other" });

/**
 * Every action used to get its own colour, which turned the table into a
 * rainbow. Three tones carry the whole meaning: accent for something added,
 * red for something removed, slate for everything else.
 */
const ACTION_TONE = {
  create: { tone: "accent", label: "Create" },
  update: { tone: "slate", label: "Update" },
  delete: { tone: "danger", label: "Delete" },
  "status-change": { tone: "slate", label: "Status" },
  activate: { tone: "accent", label: "Activate" },
  deactivate: { tone: "danger", label: "Deactivate" },
  "toggle-status": { tone: "slate", label: "Toggle" },
  view: { tone: "slate", label: "View" },
};

function timeAgo(seconds) {
  if (seconds < 10) return "Just now";
  if (seconds < 60) return `${seconds}s ago`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

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

  return (
    <>
      <Head><title>Activity Logs — SS Coaching Admin</title></Head>
      <div className="oc-wrapper">
        <Topbar />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1 al-bg" style={{ minWidth: 0 }}>
            <div className="container-fluid p-4">

              {/* Header */}
              <div className="al-head">
                <div>
                  <h4 className="al-title">Activity Logs</h4>
                  <p className="al-sub">
                    Complete audit trail of all sub-admin actions across every module.
                  </p>
                </div>

                <div className="al-head-actions">
                  <Link href="/dashboard/admin/live-monitor" className="al-btn-ghost">
                    <span className="al-ico"><MdMonitor size={15} /></span>
                    Live Monitor
                  </Link>
                  <button className="al-icon-btn" onClick={() => fetchLogs(page)} title="Refresh">
                    <span className="al-ico"><MdRefresh size={17} /></span>
                  </button>
                </div>
              </div>

              {/* Who is on the dashboard right now */}
              {liveSessions.length > 0 && (
                <div className="al-card">
                  <div className="al-live-head">
                    <span className="al-dot online" />
                    <span className="al-live-title">
                      {onlineSessions.length} sub-admin{onlineSessions.length !== 1 ? "s" : ""} currently active
                    </span>
                    <Link href="/dashboard/admin/live-monitor" className="al-link">
                      View full monitor →
                    </Link>
                  </div>

                  <div className="al-live-grid">
                    {liveSessions.map(session => {
                      const isActive = session.secondsAgo < 60;
                      return (
                        <div key={session._id} className={`al-session ${isActive ? "is-active" : ""}`}>
                          <span className="al-avatar">
                            {session.subAdminName?.charAt(0).toUpperCase()}
                          </span>
                          <span className="al-session-text">
                            <span className="al-strong">{session.subAdminName}</span>
                            <span className="al-faint">
                              {session.currentPageLabel} · {timeAgo(session.secondsAgo)}
                            </span>
                          </span>
                          <span className={`al-dot ${isActive ? "online" : "idle"}`} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Search + filters */}
              <div className="al-card">
                <form onSubmit={handleSearch} className="al-toolbar">
                  <div className="al-search">
                    <span className="al-search-icon"><MdSearch size={17} /></span>
                    <input
                      value={searchInput}
                      onChange={e => setSearchInput(e.target.value)}
                      placeholder="Search by description, entity or action"
                    />
                  </div>
                  <button type="submit" className="al-btn">Search</button>
                  {hasFilters && (
                    <button type="button" className="al-btn-ghost" onClick={clearFilters}>
                      <span className="al-ico"><MdClose size={15} /></span>
                      Clear
                    </button>
                  )}
                </form>

                <div className="al-filter-label">
                  <span className="al-ico"><MdFilterList size={14} /></span>
                  FILTER BY
                </div>

                <div className="al-filters">
                  <select
                    className="al-select"
                    value={filters.subAdminId}
                    onChange={e => setFilter("subAdminId", e.target.value)}
                  >
                    <option value="">All Sub-Admins</option>
                    {(subAdmins || []).map(sa => (
                      <option key={sa._id} value={sa._id}>{sa.name} (@{sa.username})</option>
                    ))}
                  </select>

                  <select
                    className="al-select"
                    value={filters.feature}
                    onChange={e => setFilter("feature", e.target.value)}
                  >
                    <option value="">All Modules</option>
                    {ALL_FEATURES.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
                  </select>

                  <select
                    className="al-select"
                    value={filters.action}
                    onChange={e => setFilter("action", e.target.value)}
                  >
                    <option value="">All Actions</option>
                    <option value="create">Create</option>
                    <option value="update">Update</option>
                    <option value="delete">Delete</option>
                    <option value="status-change">Status Change</option>
                    <option value="activate">Activate</option>
                    <option value="deactivate">Deactivate</option>
                    <option value="toggle-status">Toggle Status</option>
                  </select>

                  <input
                    className="al-select"
                    type="date"
                    value={filters.from}
                    onChange={e => setFilter("from", e.target.value)}
                    title="From date"
                  />
                  <input
                    className="al-select"
                    type="date"
                    value={filters.to}
                    onChange={e => setFilter("to", e.target.value)}
                    title="To date"
                  />
                </div>
              </div>

              {/* Count row */}
              <div className="al-countbar">
                <span>
                  Showing <strong>{logs.length}</strong> of <strong>{total}</strong> entries
                  {hasFilters && <span className="al-flag">(filtered)</span>}
                </span>
                {totalPages > 1 && <span className="al-faint">Page {page} of {totalPages}</span>}
              </div>

              {/* Table */}
              <div className="al-card">
                {loading ? (
                  <p className="al-empty">Loading activity logs…</p>
                ) : logs.length === 0 ? (
                  <div className="al-empty-block">
                    <span className="al-empty-icon"><MdHistory size={34} /></span>
                    <div className="al-empty-title">No activity logs found</div>
                    <div className="al-faint">
                      {hasFilters
                        ? "Try changing your filters or search query."
                        : "Sub-admin actions will appear here once they perform any actions."}
                    </div>
                  </div>
                ) : (
                  <div className="al-table-wrap">
                    <table className="al-table">
                      <thead>
                        <tr>
                          <th>Sub-Admin</th>
                          <th>Module</th>
                          <th>Action</th>
                          <th>Description</th>
                          <th>Date &amp; Time</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {logs.map(log => {
                          const act = ACTION_TONE[log.action] || ACTION_TONE.view;
                          const expanded = expandedLog === log._id;

                          return [
                            <tr
                              key={log._id}
                              className={`al-row ${expanded ? "is-open" : ""}`}
                              onClick={() => setExpandedLog(expanded ? null : log._id)}
                            >
                              <td>
                                <div className="al-strong">{log.subAdminName}</div>
                                <div className="al-faint">@{log.subAdminUsername}</div>
                              </td>

                              <td>
                                <span className="al-pill">
                                  {FEATURE_LABELS[log.feature] || log.feature}
                                </span>
                              </td>

                              <td>
                                <span className={`al-action ${act.tone}`}>
                                  {act.label || log.action}
                                </span>
                              </td>

                              <td>
                                <div className="al-desc">{log.description || "—"}</div>
                              </td>

                              <td>
                                <div className="al-strong">
                                  {new Date(log.createdAt).toLocaleDateString("en-IN", {
                                    day: "2-digit", month: "short", year: "numeric",
                                  })}
                                </div>
                                <div className="al-faint">
                                  {new Date(log.createdAt).toLocaleTimeString("en-IN", {
                                    hour: "2-digit", minute: "2-digit",
                                  })}
                                </div>
                              </td>

                              <td className="al-chev">
                                <span className="al-ico">
                                  {expanded ? <MdExpandLess size={18} /> : <MdExpandMore size={18} />}
                                </span>
                              </td>
                            </tr>,

                            expanded && (
                              <tr key={log._id + "-expand"}>
                                <td colSpan={6} className="al-detail">
                                  <div className="al-detail-meta">
                                    {log.entityId && (
                                      <span>Entity ID: <code>{log.entityId}</code></span>
                                    )}
                                    {log.entityType && (
                                      <span>Entity Type: <strong>{log.entityType}</strong></span>
                                    )}
                                    {log.ip && log.ip !== "::1" && log.ip !== "127.0.0.1" && (
                                      <span>IP Address: <code>{log.ip}</code></span>
                                    )}
                                    <Link
                                      href={`/dashboard/admin/sub-admins/${log.subAdminId}`}
                                      className="al-link"
                                      onClick={e => e.stopPropagation()}
                                    >
                                      View {log.subAdminName}&rsquo;s profile →
                                    </Link>
                                  </div>

                                  {(log.before !== null || log.after !== null) && (
                                    <div
                                      className={`al-diff ${
                                        log.before !== null && log.after !== null ? "two" : "one"
                                      }`}
                                    >
                                      {log.before !== null && (
                                        <div>
                                          <span className="al-diff-label before">BEFORE</span>
                                          <pre className="al-pre before">
                                            {JSON.stringify(log.before, null, 2)}
                                          </pre>
                                        </div>
                                      )}
                                      {log.after !== null && (
                                        <div>
                                          <span className="al-diff-label after">AFTER</span>
                                          <pre className="al-pre after">
                                            {JSON.stringify(log.after, null, 2)}
                                          </pre>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ),
                          ];
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="al-pager">
                  <button
                    onClick={() => { const np = page - 1; setPage(np); fetchLogs(np); }}
                    disabled={page === 1}
                  >
                    Prev
                  </button>
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      className={page === p ? "is-active" : ""}
                      onClick={() => { setPage(p); fetchLogs(p); }}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => { const np = page + 1; setPage(np); fetchLogs(np); }}
                    disabled={page >= totalPages}
                  >
                    Next
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .al-bg {
          background: #f1f5f9;
        }

        /* react-icons renders its own svg, which styled-jsx will not scope,
           so every icon that needs sizing or positioning sits inside a span. */
        .al-ico {
          display: inline-flex;
          align-items: center;
        }

        .al-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
        }
        .al-title {
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .al-sub {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 0.86rem;
        }
        .al-head-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .al-btn {
          background: #5641ce;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 9px 18px;
          font-weight: 600;
          font-size: 0.88rem;
        }
        .al-btn:hover {
          background: #4634ad;
        }
        .al-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          color: #334155;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 9px 18px;
          font-weight: 600;
          font-size: 0.88rem;
          text-decoration: none;
        }
        .al-btn-ghost:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #334155;
        }
        .al-icon-btn {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          width: 40px;
          height: 40px;
          color: #475569;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .al-icon-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .al-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
          margin-bottom: 14px;
        }

        .al-link {
          color: #5641ce;
          font-weight: 600;
          font-size: 0.8rem;
          text-decoration: none;
        }
        .al-link:hover {
          color: #4634ad;
        }

        /* ----- live sessions ----- */
        .al-live-head {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .al-live-title {
          font-weight: 700;
          font-size: 0.88rem;
          color: #0f172a;
        }
        .al-live-head .al-link {
          margin-left: auto;
        }
        .al-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          display: inline-block;
        }
        .al-dot.online {
          background: #5641ce;
        }
        .al-dot.idle {
          background: #cbd5e1;
        }
        .al-live-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .al-session {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 8px 14px;
        }
        .al-session.is-active {
          background: #f1eefc;
          border-color: #ded7f6;
        }
        .al-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #5641ce;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.78rem;
          flex-shrink: 0;
        }
        .al-session-text {
          display: flex;
          flex-direction: column;
          line-height: 1.35;
        }

        /* ----- toolbar ----- */
        .al-toolbar {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .al-search {
          position: relative;
          flex: 1 1 320px;
        }
        .al-search input {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px 10px 38px;
          font-size: 0.88rem;
          background: #f8fafc;
          color: #0f172a;
        }
        .al-search input:focus {
          outline: none;
          border-color: #5641ce;
          background: #fff;
        }
        .al-search-icon {
          position: absolute;
          left: 13px;
          top: 0;
          bottom: 0;
          display: inline-flex;
          align-items: center;
          color: #94a3b8;
          pointer-events: none;
        }

        .al-filter-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.74rem;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.04em;
          margin-bottom: 8px;
        }
        .al-filters {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 10px;
        }
        .al-select {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 9px 12px;
          font-size: 0.85rem;
          background: #fff;
          color: #334155;
        }
        .al-select:focus {
          outline: none;
          border-color: #5641ce;
        }

        .al-countbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 12px;
          font-size: 0.85rem;
          color: #64748b;
        }
        .al-countbar strong {
          color: #0f172a;
        }
        .al-flag {
          color: #5641ce;
          font-weight: 600;
          margin-left: 8px;
        }

        /* ----- table ----- */
        .al-empty {
          color: #64748b;
          padding: 24px 0;
          margin: 0;
        }
        .al-empty-block {
          text-align: center;
          padding: 40px 16px;
        }
        .al-empty-icon {
          display: inline-flex;
          color: #cbd5e1;
          margin-bottom: 10px;
        }
        .al-empty-title {
          font-weight: 700;
          color: #334155;
          margin-bottom: 4px;
        }

        .al-table-wrap {
          overflow-x: auto;
        }
        .al-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .al-table thead th {
          text-align: left;
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #94a3b8;
          font-weight: 700;
          padding: 10px 12px;
          border-bottom: 1px solid #e2e8f0;
          white-space: nowrap;
        }
        .al-table tbody td {
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
          color: #334155;
          white-space: nowrap;
        }
        .al-row {
          cursor: pointer;
        }
        .al-row:hover {
          background: #f8fafc;
        }
        .al-row.is-open {
          background: #f8fafc;
        }
        .al-strong {
          font-weight: 600;
          color: #0f172a;
        }
        .al-faint {
          font-size: 0.74rem;
          color: #94a3b8;
        }
        .al-desc {
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .al-chev {
          text-align: center;
          color: #94a3b8;
        }

        .al-pill {
          background: #f1f5f9;
          color: #475569;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .al-action {
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #64748b;
        }
        .al-action.accent {
          background: #f1eefc;
          border-color: #ded7f6;
          color: #4634ad;
        }
        .al-action.danger {
          background: #fef2f2;
          border-color: #fecaca;
          color: #b91c1c;
        }

        /* ----- expanded detail ----- */
        .al-detail {
          background: #f8fafc;
          padding: 16px 20px !important;
          white-space: normal !important;
        }
        .al-detail-meta {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          align-items: center;
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 12px;
        }
        .al-detail-meta strong {
          color: #334155;
        }
        .al-detail-meta code {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #4634ad;
          border-radius: 4px;
          padding: 1px 6px;
          font-size: 0.76rem;
        }

        .al-diff {
          display: grid;
          gap: 14px;
        }
        .al-diff.two {
          grid-template-columns: 1fr 1fr;
        }
        .al-diff.one {
          grid-template-columns: 1fr;
        }
        .al-diff-label {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          border-radius: 4px;
          padding: 2px 8px;
          margin-bottom: 6px;
        }
        .al-diff-label.before {
          background: #fef2f2;
          color: #b91c1c;
        }
        .al-diff-label.after {
          background: #f1eefc;
          color: #4634ad;
        }
        .al-pre {
          border-radius: 8px;
          padding: 12px;
          font-size: 0.76rem;
          color: #334155;
          overflow: auto;
          max-height: 220px;
          margin: 0;
          line-height: 1.6;
          border: 1px solid #e2e8f0;
          background: #fff;
        }
        .al-pre.before {
          border-color: #fecaca;
        }
        .al-pre.after {
          border-color: #ded7f6;
        }

        /* ----- pagination ----- */
        .al-pager {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          padding: 4px 0 24px;
        }
        .al-pager button {
          border: 1px solid #e2e8f0;
          background: #fff;
          border-radius: 8px;
          padding: 7px 16px;
          font-weight: 600;
          font-size: 0.85rem;
          color: #334155;
        }
        .al-pager button:hover:not(:disabled):not(.is-active) {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        .al-pager button:disabled {
          opacity: 0.45;
        }
        .al-pager button.is-active {
          background: #5641ce;
          border-color: #5641ce;
          color: #fff;
        }

        @media (max-width: 768px) {
          .al-diff.two {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

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
