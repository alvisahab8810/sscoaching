import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { withAdminAuth } from "@/lib/withAdminAuth";
import { MdRefresh, MdHistory, MdPersonOutline } from "react-icons/md";

// Labels only. Each module used to carry its own colour and emoji, which left
// no way to tell an online session from an offline one at a glance.
const FEATURE_LABELS = {
  blogs: "Blogs",
  faqs: "FAQs",
  students: "Students",
  courses: "Courses",
  admissions: "Applications",
  announcements: "Announcements",
  leads: "Leads",
  "student-success": "Student Success",
  "online-classes": "Live Classes",
  invoices: "Invoices",
  enrollments: "Enrollments",
  pages: "Pages",
  dashboard: "Dashboard",
  other: "Other",
};

function timeAgo(seconds) {
  if (seconds < 10) return "Just now";
  if (seconds < 60) return `${seconds}s ago`;
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

export default function LiveMonitor() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(null);
  const intervalRef = useRef(null);

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/admin/live-sessions");
      const data = await res.json();
      if (data.success) {
        setSessions(data.data);
        setLastRefresh(new Date());
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchSessions();
    intervalRef.current = setInterval(fetchSessions, 15000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const online = sessions.filter(s => s.secondsAgo < 60);
  const idle = sessions.filter(s => s.secondsAgo >= 60 && s.secondsAgo < 300);

  const stats = [
    { label: "Online Now", value: online.length, tone: "accent" },
    { label: "Idle (1-5 min)", value: idle.length, tone: "slate" },
    { label: "Total Tracked", value: sessions.length, tone: "slate" },
  ];

  return (
    <>
      <Head><title>Live Monitor — SS Coaching Admin</title></Head>
      <div className="oc-wrapper">
        <Topbar />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1 lm-bg" style={{ minWidth: 0 }}>
            <div className="container-fluid p-4">

              {/* Header */}
              <div className="lm-head">
                <div>
                  <h4 className="lm-title">Live Monitor</h4>
                  <p className="lm-sub">Real-time sub-admin activity tracking.</p>
                </div>

                <div className="lm-head-actions">
                  {lastRefresh && (
                    <span className="lm-faint">
                      Updated {lastRefresh.toLocaleTimeString("en-IN", {
                        hour: "2-digit", minute: "2-digit", second: "2-digit",
                      })}
                    </span>
                  )}
                  <Link href="/dashboard/admin/activity-logs" className="lm-btn-ghost">
                    <span className="lm-ico"><MdHistory size={16} /></span>
                    Activity Logs
                  </Link>
                  <button className="lm-icon-btn" onClick={fetchSessions} title="Refresh">
                    <span className="lm-ico"><MdRefresh size={17} /></span>
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="lm-stats">
                {stats.map(s => (
                  <div key={s.label} className="lm-stat">
                    <span className={`lm-dot ${s.tone}`} />
                    <div>
                      <div className="lm-stat-num">{s.value}</div>
                      <div className="lm-stat-label">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sessions */}
              <div className="lm-card">
                {loading ? (
                  <p className="lm-empty">Loading live sessions…</p>
                ) : sessions.length === 0 ? (
                  <div className="lm-empty-block">
                    <span className="lm-empty-icon"><MdPersonOutline size={38} /></span>
                    <div className="lm-empty-title">No active sub-admins</div>
                    <div className="lm-faint">
                      Sub-admins appear here when they log in and are active.
                    </div>
                  </div>
                ) : (
                  <div className="lm-table-wrap">
                    <table className="lm-table">
                      <thead>
                        <tr>
                          <th>Sub-Admin</th>
                          <th>Status</th>
                          <th>Module</th>
                          <th>Current Page</th>
                          <th>Last Seen</th>
                          <th>IP Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sessions.map(session => {
                          const isOnline = session.secondsAgo < 60;
                          const isIdle = !isOnline && session.secondsAgo < 300;
                          const state = isOnline ? "online" : isIdle ? "idle" : "away";
                          const stateLabel = isOnline ? "Online" : isIdle ? "Idle" : "Away";

                          return (
                            <tr key={session._id}>
                              <td>
                                <div className="lm-person">
                                  <span className={`lm-avatar ${state}`}>
                                    {session.subAdminName?.charAt(0).toUpperCase()}
                                  </span>
                                  <span>
                                    <div className="lm-strong">{session.subAdminName}</div>
                                    <div className="lm-faint">@{session.subAdminUsername}</div>
                                  </span>
                                </div>
                              </td>

                              <td>
                                <span className={`lm-state ${state}`}>
                                  <span className={`lm-dot ${state}`} />
                                  {stateLabel}
                                </span>
                              </td>

                              <td>
                                <span className="lm-pill">
                                  {FEATURE_LABELS[session.currentFeature] ||
                                    session.currentFeature ||
                                    "—"}
                                </span>
                              </td>

                              <td>
                                <span className="lm-path" title={session.currentPage}>
                                  {session.currentPageLabel || session.currentPage}
                                </span>
                                {session.currentPageLabel && session.currentPage ? (
                                  <div className="lm-faint lm-mono">{session.currentPage}</div>
                                ) : null}
                              </td>

                              <td>{timeAgo(session.secondsAgo)}</td>

                              <td>
                                {session.ip ? (
                                  <span className="lm-faint lm-mono">{session.ip}</span>
                                ) : (
                                  <span className="lm-faint">—</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <p className="lm-note">
                Auto-refreshes every 15 seconds · Sessions expire after 5 minutes of inactivity
              </p>

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .lm-bg {
          background: #f1f5f9;
        }

        /* react-icons renders its own svg, which styled-jsx will not scope,
           so every icon that needs sizing sits inside a span. */
        .lm-ico {
          display: inline-flex;
          align-items: center;
        }

        .lm-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
        }
        .lm-title {
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .lm-sub {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 0.86rem;
        }
        .lm-head-actions {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .lm-btn-ghost {
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
        .lm-btn-ghost:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #334155;
        }
        .lm-icon-btn {
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
        .lm-icon-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        /* ----- stats ----- */
        .lm-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
          margin-bottom: 14px;
        }
        .lm-stat {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px 18px;
        }
        .lm-stat-num {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1;
        }
        .lm-stat-label {
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 4px;
        }

        .lm-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          flex-shrink: 0;
          display: inline-block;
        }
        .lm-dot.accent,
        .lm-dot.online {
          background: #5641ce;
        }
        .lm-dot.slate,
        .lm-dot.idle {
          background: #cbd5e1;
        }
        .lm-dot.away {
          background: #ef4444;
        }

        .lm-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
          margin-bottom: 14px;
        }

        .lm-empty {
          color: #64748b;
          padding: 24px 0;
          margin: 0;
        }
        .lm-empty-block {
          text-align: center;
          padding: 44px 16px;
        }
        .lm-empty-icon {
          display: inline-flex;
          color: #cbd5e1;
          margin-bottom: 10px;
        }
        .lm-empty-title {
          font-weight: 700;
          color: #334155;
          margin-bottom: 4px;
        }

        /* ----- table ----- */
        .lm-table-wrap {
          overflow-x: auto;
        }
        .lm-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .lm-table thead th {
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
        .lm-table tbody td {
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
          color: #334155;
          white-space: nowrap;
        }
        .lm-table tbody tr:hover {
          background: #f8fafc;
        }
        .lm-strong {
          font-weight: 600;
          color: #0f172a;
        }
        .lm-faint {
          font-size: 0.74rem;
          color: #94a3b8;
        }
        .lm-mono {
          font-family: ui-monospace, monospace;
        }

        .lm-person {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .lm-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
          flex-shrink: 0;
          background: #f1f5f9;
          color: #475569;
        }
        .lm-avatar.online {
          background: #5641ce;
          color: #fff;
        }

        .lm-state {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 700;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #64748b;
        }
        .lm-state.online {
          background: #f1eefc;
          border-color: #ded7f6;
          color: #4634ad;
        }
        .lm-state.away {
          background: #fef2f2;
          border-color: #fecaca;
          color: #b91c1c;
        }

        .lm-pill {
          background: #f1f5f9;
          color: #475569;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .lm-path {
          font-weight: 600;
          color: #0f172a;
        }

        .lm-note {
          text-align: center;
          color: #94a3b8;
          font-size: 0.78rem;
          margin: 0 0 24px;
        }
      `}</style>
    </>
  );
}

export const getServerSideProps = withAdminAuth(async () => {
  return { props: {} };
}, { superAdminOnly: true });
