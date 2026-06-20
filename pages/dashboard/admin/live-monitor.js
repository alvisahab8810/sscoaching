import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { withAdminAuth } from "@/lib/withAdminAuth";

const FEATURE_COLORS = {
  blogs: "#3b82f6",
  faqs: "#8b5cf6",
  students: "#10b981",
  courses: "#f59e0b",
  admissions: "#ef4444",
  announcements: "#06b6d4",
  leads: "#ec4899",
  "student-success": "#14b8a6",
  "online-classes": "#f97316",
  invoices: "#6366f1",
  enrollments: "#84cc16",
  dashboard: "#5641CE",
  other: "#9ca3af",
};

const FEATURE_ICONS = {
  blogs: "📝",
  faqs: "❓",
  students: "🎓",
  courses: "📚",
  admissions: "📋",
  announcements: "📢",
  leads: "📞",
  "student-success": "🏆",
  "online-classes": "🎥",
  invoices: "🧾",
  enrollments: "✅",
  dashboard: "🏠",
  other: "⚙️",
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

  return (
    <>
      <Head><title>Live Monitor — SS Coaching Admin</title></Head>
      <div className="oc-wrapper">
        <Topbar />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1" style={{ background: "#f4f6fb" }}>
        <div className="container-fluid p-4">
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <h4 style={{ fontWeight: 700, color: "#1e293b", margin: 0, fontSize: "1.4rem" }}>
                Live Monitor
              </h4>
              <p style={{ color: "#64748b", margin: "4px 0 0", fontSize: "0.9rem" }}>
                Real-time sub-admin activity tracking
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {lastRefresh && (
                <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                  Updated {lastRefresh.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={fetchSessions}
                style={{
                  background: "#5641CE", color: "#fff", border: "none",
                  borderRadius: 8, padding: "8px 18px", fontWeight: 600,
                  cursor: "pointer", fontSize: "0.85rem",
                }}
              >
                ↻ Refresh
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
            {[
              { label: "Online Now", value: online.length, color: "#10b981", dot: "#10b981" },
              { label: "Idle (1-5 min)", value: idle.length, color: "#f59e0b", dot: "#f59e0b" },
              { label: "Total Tracked", value: sessions.length, color: "#5641CE", dot: "#5641CE" },
            ].map(s => (
              <div key={s.label} style={{
                background: "#fff", borderRadius: 12, padding: "20px 24px",
                boxShadow: "0 1px 6px rgba(0,0,0,0.08)", display: "flex",
                alignItems: "center", gap: 16,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  background: s.color + "18", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: s.color }} />
                </div>
                <div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1e293b", lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: 4 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Live Sessions Grid */}
          {loading ? (
            <div style={{ textAlign: "center", padding: 60, color: "#94a3b8", fontSize: "1rem" }}>
              Loading live sessions...
            </div>
          ) : sessions.length === 0 ? (
            <div style={{
              background: "#fff", borderRadius: 12, padding: "60px 24px",
              textAlign: "center", boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: 12 }}>👤</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#374151" }}>No Active Sub-Admins</div>
              <div style={{ color: "#9ca3af", marginTop: 8, fontSize: "0.9rem" }}>
                Sub-admins will appear here when they log in and are active
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
              {sessions.map(session => {
                const isOnline = session.secondsAgo < 60;
                const isIdle = !isOnline && session.secondsAgo < 300;
                const featureColor = FEATURE_COLORS[session.currentFeature] || "#9ca3af";
                const featureIcon = FEATURE_ICONS[session.currentFeature] || "⚙️";

                return (
                  <div key={session._id} style={{
                    background: "#fff", borderRadius: 14,
                    boxShadow: "0 1px 8px rgba(0,0,0,0.09)",
                    overflow: "hidden",
                    border: isOnline ? `2px solid ${featureColor}30` : "2px solid #f1f5f9",
                    transition: "all 0.2s",
                  }}>
                    {/* Card Header */}
                    <div style={{
                      background: isOnline ? featureColor + "12" : "#f8fafc",
                      padding: "16px 20px",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      borderBottom: "1px solid #f1f5f9",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                          width: 42, height: 42, borderRadius: "50%",
                          background: featureColor, color: "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontWeight: 800, fontSize: "1.1rem", flexShrink: 0,
                        }}>
                          {session.subAdminName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: "#1e293b", fontSize: "0.95rem" }}>
                            {session.subAdminName}
                          </div>
                          <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                            @{session.subAdminUsername}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{
                          width: 8, height: 8, borderRadius: "50%",
                          background: isOnline ? "#10b981" : isIdle ? "#f59e0b" : "#ef4444",
                          boxShadow: isOnline ? "0 0 0 2px #10b98133" : "none",
                        }} />
                        <span style={{
                          fontSize: "0.75rem", fontWeight: 600,
                          color: isOnline ? "#10b981" : isIdle ? "#f59e0b" : "#ef4444",
                        }}>
                          {isOnline ? "Online" : isIdle ? "Idle" : "Away"}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: "16px 20px" }}>
                      {/* Current Feature */}
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        background: featureColor + "15", borderRadius: 20,
                        padding: "4px 12px", marginBottom: 14,
                      }}>
                        <span style={{ fontSize: "0.85rem" }}>{featureIcon}</span>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: featureColor }}>
                          {session.currentPageLabel}
                        </span>
                      </div>

                      {/* Current Page */}
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: 3 }}>CURRENT PAGE</div>
                        <div style={{
                          fontSize: "0.82rem", color: "#374151", fontFamily: "monospace",
                          background: "#f8fafc", borderRadius: 6, padding: "5px 10px",
                          wordBreak: "break-all",
                        }}>
                          {session.currentPage}
                        </div>
                      </div>

                      {/* Last Seen + IP */}
                      <div style={{ display: "flex", gap: 16 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: 2 }}>LAST SEEN</div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>
                            {timeAgo(session.secondsAgo)}
                          </div>
                        </div>
                        {session.ip && (
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: 2 }}>IP ADDRESS</div>
                            <div style={{ fontSize: "0.82rem", color: "#374151", fontFamily: "monospace" }}>
                              {session.ip}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Auto-refresh note */}
          <div style={{ textAlign: "center", marginTop: 24, color: "#94a3b8", fontSize: "0.8rem" }}>
            Auto-refreshes every 15 seconds &nbsp;·&nbsp; Sessions expire after 5 minutes of inactivity
          </div>
        </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withAdminAuth(async () => {
  return { props: {} };
}, { superAdminOnly: true });
