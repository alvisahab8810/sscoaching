import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";
import {
  MdPerson, MdLock, MdShield, MdHistory, MdVisibility, MdVisibilityOff,
  MdContentCopy, MdCheck, MdSave, MdDelete, MdToggleOn, MdToggleOff, MdRefresh,
} from "react-icons/md";

const ALL_FEATURES = [
  { key: "blogs", label: "Blogs", desc: "Blog posts" },
  { key: "faqs", label: "FAQs", desc: "FAQ management" },
  { key: "students", label: "Students", desc: "Student records" },
  { key: "courses", label: "Courses", desc: "Course listings" },
  { key: "admissions", label: "Applications", desc: "Admissions" },
  { key: "announcements", label: "Announcements", desc: "Announcements" },
  { key: "leads", label: "Leads", desc: "Lead tracking" },
  { key: "student-success", label: "Student Success", desc: "Success stories" },
  { key: "online-classes", label: "Online Classes", desc: "Live classes" },
  { key: "invoices", label: "Invoices", desc: "Billing" },
  { key: "enrollments", label: "Enrollments", desc: "Enrollments" },
];

const ACTION_COLORS = {
  create: { bg: "#dcfce7", color: "#16a34a" },
  update: { bg: "#dbeafe", color: "#2563eb" },
  delete: { bg: "#fee2e2", color: "#dc2626" },
  view: { bg: "#f0f1f5", color: "#6b7a99" },
};

export default function SubAdminDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [subAdmin, setSubAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Credentials tab state
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [changingPwd, setChangingPwd] = useState(false);

  // Permissions tab state
  const [permissions, setPermissions] = useState([]);
  const [savingPerms, setSavingPerms] = useState(false);

  // Logs tab state
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logsTotal, setLogsTotal] = useState(0);
  const [expandedLog, setExpandedLog] = useState(null);
  const [logPage, setLogPage] = useState(1);
  const [logFilter, setLogFilter] = useState({ feature: "", action: "" });

  // Delete confirm
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const fetchSubAdmin = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/sub-admins/${id}`);
      const data = await res.json();
      if (data.success) {
        setSubAdmin(data.data);
        setPermissions(data.data.permissions || []);
      } else {
        toast.error("Sub-admin not found");
        router.push("/dashboard/admin/sub-admins");
      }
    } catch {
      toast.error("Failed to load");
    }
    setLoading(false);
  };

  const fetchLogs = async (pg = 1) => {
    if (!id) return;
    setLogsLoading(true);
    try {
      const params = new URLSearchParams({ page: pg, limit: 15, ...logFilter });
      const res = await fetch(`/api/admin/sub-admins/${id}/logs?${params}`);
      const data = await res.json();
      if (data.success) {
        setLogs(data.data);
        setLogsTotal(data.total);
      }
    } catch { toast.error("Failed to load logs"); }
    setLogsLoading(false);
  };

  useEffect(() => { fetchSubAdmin(); }, [id]);
  useEffect(() => { if (activeTab === "logs") fetchLogs(1); }, [activeTab, logFilter]);

  const handleToggleStatus = async () => {
    const newStatus = subAdmin.status === "active" ? "inactive" : "active";
    try {
      const res = await fetch(`/api/admin/sub-admins/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Account ${newStatus === "active" ? "activated" : "deactivated"}`);
        setSubAdmin(d => ({ ...d, status: newStatus }));
      } else toast.error(data.message);
    } catch { toast.error("Failed"); }
  };

  const handleChangePassword = async () => {
    if (!newPassword.trim() || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setChangingPwd(true);
    try {
      const res = await fetch(`/api/admin/sub-admins/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Password updated");
        setSubAdmin(d => ({ ...d, password: newPassword }));
        setNewPassword("");
      } else toast.error(data.message);
    } catch { toast.error("Failed"); }
    setChangingPwd(false);
  };

  const handleSavePermissions = async () => {
    setSavingPerms(true);
    try {
      const res = await fetch(`/api/admin/sub-admins/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permissions }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Permissions updated");
        setSubAdmin(d => ({ ...d, permissions }));
      } else toast.error(data.message);
    } catch { toast.error("Failed"); }
    setSavingPerms(false);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/admin/sub-admins/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Sub-admin deleted");
        router.push("/dashboard/admin/sub-admins");
      } else toast.error(data.message);
    } catch { toast.error("Failed"); }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";
  const formatDateTime = (d) => d ? new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

  if (loading) return <LoadingScreen />;
  if (!subAdmin) return null;

  const TABS = [
    { key: "overview", label: "Overview", icon: <MdPerson size={16} /> },
    { key: "credentials", label: "Credentials", icon: <MdLock size={16} /> },
    { key: "permissions", label: "Permissions", icon: <MdShield size={16} /> },
    { key: "logs", label: `Activity Logs (${logsTotal || "..."})`, icon: <MdHistory size={16} /> },
  ];

  return (
    <>
      <Head><title>{subAdmin.name} — Sub-Admin</title></Head>
      <div className="oc-wrapper">
        <Topbar />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1 bg-light">
            <div className="container-fluid p-4" style={{}}>

              {/* Back */}
              <a onClick={() => router.push("/dashboard/admin/sub-admins")} style={{ color: "#5641CE", cursor: "pointer", fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 16 }}>
                ← Sub-Admins
              </a>

              {/* Profile Header Card */}
              <div style={{ background: "linear-gradient(135deg, #1B1B46, #2d2a6e)", borderRadius: 16, padding: "1.5rem 2rem", marginBottom: "1.5rem", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#5641CE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 800, border: "3px solid rgba(255,255,255,0.3)" }}>
                    {subAdmin.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 style={{ margin: 0, fontWeight: 800, fontSize: "1.3rem" }}>{subAdmin.name}</h2>
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>@{subAdmin.username} · {subAdmin.email}</div>
                    <div style={{ marginTop: 4, display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ background: subAdmin.status === "active" ? "#22c55e" : "#ef4444", padding: "2px 12px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 700 }}>
                        {subAdmin.status.toUpperCase()}
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>Created {formatDate(subAdmin.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={handleToggleStatus}
                    style={{ background: subAdmin.status === "active" ? "#ef4444" : "#22c55e", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 6 }}>
                    {subAdmin.status === "active" ? <><MdToggleOff size={18} /> Deactivate</> : <><MdToggleOn size={18} /> Activate</>}
                  </button>
                  <button onClick={() => setDeleteConfirm(true)}
                    style={{ background: "rgba(239,68,68,0.2)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "0.5rem 1rem", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 6 }}>
                    <MdDelete size={18} /> Delete
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: 4, background: "#fff", borderRadius: 12, padding: 6, marginBottom: "1.2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                {TABS.map(tab => (
                  <button key={tab.key} onClick={() => { setActiveTab(tab.key); if (tab.key === "logs") fetchLogs(1); }}
                    style={{ flex: 1, padding: "0.55rem 0.5rem", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: "0.83rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: activeTab === tab.key ? "#5641CE" : "transparent", color: activeTab === tab.key ? "#fff" : "#6b7a99", transition: "all 0.15s" }}>
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "overview" && (
                <div style={cardStyle}>
                  <h3 style={sectionTitle}>Account Details</h3>
                  {[
                    { label: "Full Name", value: subAdmin.name },
                    { label: "Email Address", value: subAdmin.email },
                    { label: "Username", value: `@${subAdmin.username}` },
                    { label: "Status", value: subAdmin.status, badge: true },
                    { label: "Permissions", value: `${subAdmin.permissions.length} feature(s)` },
                    { label: "Created On", value: formatDateTime(subAdmin.createdAt) },
                    { label: "Last Updated", value: formatDateTime(subAdmin.updatedAt) },
                  ].map(item => (
                    <div key={item.label} style={{ display: "flex", padding: "0.7rem 0", borderBottom: "1px solid #f0f1f5" }}>
                      <div style={{ width: 160, fontSize: "0.83rem", fontWeight: 600, color: "#6b7a99" }}>{item.label}</div>
                      <div style={{ flex: 1, fontSize: "0.9rem", color: "#0f1f3d", fontWeight: 500 }}>
                        {item.badge ? (
                          <span style={{ background: item.value === "active" ? "#dcfce7" : "#fee2e2", color: item.value === "active" ? "#16a34a" : "#dc2626", padding: "2px 12px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 700 }}>{item.value}</span>
                        ) : item.value}
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: "1rem", padding: "0.75rem 1rem", background: "#f8f9ff", borderRadius: 10 }}>
                    <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#6b7a99", marginBottom: 8 }}>Assigned Permissions</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {subAdmin.permissions.length === 0 ? (
                        <span style={{ color: "#9ca3af", fontSize: "0.85rem" }}>No permissions assigned</span>
                      ) : subAdmin.permissions.map(p => (
                        <span key={p} style={{ background: "#ede9ff", color: "#5641CE", padding: "4px 12px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600 }}>
                          {ALL_FEATURES.find(f => f.key === p)?.label || p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "credentials" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={cardStyle}>
                    <h3 style={sectionTitle}>Current Credentials</h3>
                    <div style={{ background: "#fef9c3", border: "1.5px solid #fde68a", borderRadius: 10, padding: "0.75rem 1rem", marginBottom: "1rem", fontSize: "0.82rem", color: "#92400e" }}>
                      ⚠️ Keep these credentials secure. Share only with the sub-admin via a private channel.
                    </div>

                    {[
                      { label: "Username", value: subAdmin.username, copyKey: "username" },
                      { label: "Email", value: subAdmin.email, copyKey: "email" },
                    ].map(item => (
                      <div key={item.label} style={{ marginBottom: "0.75rem" }}>
                        <label style={labelStyle}>{item.label}</label>
                        <div style={{ display: "flex", gap: 8 }}>
                          <div style={{ flex: 1, padding: "0.55rem 0.9rem", background: "#f8f9ff", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: "0.9rem", color: "#374151", fontFamily: "monospace" }}>
                            {item.value}
                          </div>
                          <button onClick={() => copyToClipboard(item.value, item.copyKey)} style={{ ...iconBtn, background: copied === item.copyKey ? "#dcfce7" : "#f0f1f5", color: copied === item.copyKey ? "#16a34a" : "#374151" }}>
                            {copied === item.copyKey ? <MdCheck size={18} /> : <MdContentCopy size={18} />}
                          </button>
                        </div>
                      </div>
                    ))}

                    <div style={{ marginBottom: "0.75rem" }}>
                      <label style={labelStyle}>Password</label>
                      <div style={{ display: "flex", gap: 8 }}>
                        <div style={{ flex: 1, padding: "0.55rem 0.9rem", background: "#f8f9ff", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: "0.9rem", color: "#374151", fontFamily: "monospace", letterSpacing: showPassword ? "normal" : "0.15em" }}>
                          {showPassword ? subAdmin.password : "•".repeat(Math.min(subAdmin.password.length, 12))}
                        </div>
                        <button onClick={() => setShowPassword(p => !p)} style={{ ...iconBtn, background: "#f0f1f5" }}>
                          {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                        </button>
                        <button onClick={() => copyToClipboard(subAdmin.password, "password")} style={{ ...iconBtn, background: copied === "password" ? "#dcfce7" : "#f0f1f5", color: copied === "password" ? "#16a34a" : "#374151" }}>
                          {copied === "password" ? <MdCheck size={18} /> : <MdContentCopy size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={cardStyle}>
                    <h3 style={sectionTitle}>Change Password</h3>
                    <div style={{ marginBottom: "0.75rem" }}>
                      <label style={labelStyle}>New Password</label>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input type={showNewPwd ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password (min 6 chars)"
                          style={{ ...inputStyle, flex: 1 }} />
                        <button type="button" onClick={() => setShowNewPwd(p => !p)} style={{ ...iconBtn, background: "#f0f1f5" }}>
                          {showNewPwd ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                        </button>
                      </div>
                    </div>
                    <button onClick={handleChangePassword} disabled={changingPwd || !newPassword.trim()}
                      style={{ background: changingPwd ? "#9ca3af" : "#5641CE", color: "#fff", border: "none", borderRadius: 8, padding: "0.55rem 1.2rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: "0.88rem" }}>
                      <MdSave size={16} /> {changingPwd ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "permissions" && (
                <div style={cardStyle}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <h3 style={{ ...sectionTitle, marginBottom: 0 }}>Feature Permissions</h3>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setPermissions(permissions.length === ALL_FEATURES.length ? [] : ALL_FEATURES.map(f => f.key))}
                        style={{ background: "transparent", border: "1.5px solid #5641CE", color: "#5641CE", borderRadius: 8, padding: "4px 12px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>
                        {permissions.length === ALL_FEATURES.length ? "Deselect All" : "Select All"}
                      </button>
                      <button onClick={handleSavePermissions} disabled={savingPerms}
                        style={{ background: savingPerms ? "#9ca3af" : "#5641CE", color: "#fff", border: "none", borderRadius: 8, padding: "4px 14px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                        <MdSave size={14} /> {savingPerms ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "#6b7a99", marginBottom: "1rem" }}>Toggle features this sub-admin can access. Changes take effect on their next login.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {ALL_FEATURES.map(f => {
                      const checked = permissions.includes(f.key);
                      return (
                        <label key={f.key} style={{ display: "flex", alignItems: "center", gap: 12, padding: "0.7rem 0.9rem", border: `2px solid ${checked ? "#5641CE" : "#e5e7eb"}`, borderRadius: 10, cursor: "pointer", background: checked ? "#faf8ff" : "#fff", transition: "all 0.15s" }}>
                          <input type="checkbox" checked={checked} onChange={() => setPermissions(p => p.includes(f.key) ? p.filter(k => k !== f.key) : [...p, f.key])} style={{ width: 16, height: 16, accentColor: "#5641CE" }} />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: checked ? "#5641CE" : "#0f1f3d" }}>{f.label}</div>
                            <div style={{ fontSize: "0.77rem", color: "#9ca3af" }}>{f.desc}</div>
                          </div>
                          {checked && <span style={{ marginLeft: "auto", background: "#ede9ff", color: "#5641CE", padding: "2px 8px", borderRadius: 20, fontSize: "0.72rem", fontWeight: 700 }}>ENABLED</span>}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "logs" && (
                <div style={cardStyle}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h3 style={{ ...sectionTitle, marginBottom: 0 }}>Activity Logs ({logsTotal})</h3>
                    <button onClick={() => fetchLogs(logPage)} style={{ background: "#f0f1f5", color: "#374151", border: "none", borderRadius: 8, padding: "5px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: "0.82rem" }}>
                      <MdRefresh size={14} /> Refresh
                    </button>
                  </div>

                  {/* Log Filters */}
                  <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
                    <select value={logFilter.feature} onChange={e => setLogFilter(f => ({ ...f, feature: e.target.value }))}
                      style={{ padding: "0.45rem 0.7rem", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: "0.85rem", color: "#374151" }}>
                      <option value="">All Features</option>
                      {ALL_FEATURES.map(f => <option key={f.key} value={f.key}>{f.label}</option>)}
                    </select>
                    <select value={logFilter.action} onChange={e => setLogFilter(f => ({ ...f, action: e.target.value }))}
                      style={{ padding: "0.45rem 0.7rem", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: "0.85rem", color: "#374151" }}>
                      <option value="">All Actions</option>
                      <option value="create">Create</option>
                      <option value="update">Update</option>
                      <option value="delete">Delete</option>
                      <option value="view">View</option>
                    </select>
                  </div>

                  {logsLoading ? (
                    <div style={{ textAlign: "center", padding: "2rem", color: "#6b7a99" }}>Loading logs...</div>
                  ) : logs.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "2rem", color: "#9ca3af" }}>
                      <MdHistory size={40} style={{ opacity: 0.3, display: "block", margin: "0 auto 8px" }} />
                      No activity logged yet
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {logs.map(log => {
                        const ac = ACTION_COLORS[log.action] || ACTION_COLORS.view;
                        const expanded = expandedLog === log._id;
                        return (
                          <div key={log._id} style={{ border: "1.5px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
                            <div onClick={() => setExpandedLog(expanded ? null : log._id)}
                              style={{ display: "flex", alignItems: "center", gap: 12, padding: "0.75rem 1rem", cursor: "pointer", background: expanded ? "#f8f9ff" : "#fff" }}>
                              <span style={{ background: ac.bg, color: ac.color, padding: "3px 10px", borderRadius: 20, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", minWidth: 60, textAlign: "center" }}>
                                {log.action}
                              </span>
                              <span style={{ background: "#f0f1f5", color: "#374151", padding: "3px 10px", borderRadius: 20, fontSize: "0.72rem", fontWeight: 600 }}>
                                {log.feature}
                              </span>
                              <span style={{ flex: 1, fontSize: "0.88rem", color: "#0f1f3d", fontWeight: 500 }}>{log.description || "No description"}</span>
                              <span style={{ fontSize: "0.78rem", color: "#9ca3af", whiteSpace: "nowrap" }}>
                                {new Date(log.createdAt).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                              </span>
                              <span style={{ color: "#9ca3af", fontSize: "0.8rem" }}>{expanded ? "▲" : "▼"}</span>
                            </div>
                            {expanded && (
                              <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid #e5e7eb", background: "#fafbff" }}>
                                {log.entityId && <div style={{ fontSize: "0.8rem", color: "#6b7a99", marginBottom: 8 }}>Entity ID: <code style={{ background: "#f0f1f5", padding: "1px 6px", borderRadius: 4 }}>{log.entityId}</code></div>}
                                {log.ip && <div style={{ fontSize: "0.8rem", color: "#6b7a99", marginBottom: 8 }}>IP: {log.ip}</div>}
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                  {log.before !== null && (
                                    <div>
                                      <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#dc2626", marginBottom: 4 }}>BEFORE</div>
                                      <pre style={{ background: "#fff3f3", border: "1px solid #fecaca", borderRadius: 8, padding: "0.6rem", fontSize: "0.75rem", color: "#374151", overflow: "auto", maxHeight: 200, margin: 0 }}>
                                        {JSON.stringify(log.before, null, 2)}
                                      </pre>
                                    </div>
                                  )}
                                  {log.after !== null && (
                                    <div>
                                      <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#16a34a", marginBottom: 4 }}>AFTER</div>
                                      <pre style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "0.6rem", fontSize: "0.75rem", color: "#374151", overflow: "auto", maxHeight: 200, margin: 0 }}>
                                        {JSON.stringify(log.after, null, 2)}
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {/* Pagination */}
                      {logsTotal > 15 && (
                        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
                          <button onClick={() => { setLogPage(p => p - 1); fetchLogs(logPage - 1); }} disabled={logPage === 1}
                            style={{ padding: "5px 14px", border: "1.5px solid #e5e7eb", borderRadius: 8, background: "#fff", cursor: logPage === 1 ? "not-allowed" : "pointer", color: "#374151", fontSize: "0.85rem" }}>← Prev</button>
                          <span style={{ padding: "5px 14px", fontSize: "0.85rem", color: "#6b7a99" }}>Page {logPage} of {Math.ceil(logsTotal / 15)}</span>
                          <button onClick={() => { setLogPage(p => p + 1); fetchLogs(logPage + 1); }} disabled={logPage >= Math.ceil(logsTotal / 15)}
                            style={{ padding: "5px 14px", border: "1.5px solid #e5e7eb", borderRadius: 8, background: "#fff", cursor: "pointer", color: "#374151", fontSize: "0.85rem" }}>Next →</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", maxWidth: 400, width: "90%", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>⚠️</div>
            <h3 style={{ fontWeight: 800, color: "#0f1f3d" }}>Delete Sub-Admin?</h3>
            <p style={{ color: "#6b7a99", marginBottom: "1.5rem" }}>This will permanently delete <strong>{subAdmin.name}</strong> and all their activity logs.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setDeleteConfirm(false)} style={{ padding: "0.6rem 1.5rem", border: "1.5px solid #e5e7eb", background: "#fff", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
              <button onClick={handleDelete} style={{ padding: "0.6rem 1.5rem", background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function LoadingScreen() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f8f9ff" }}>
      <div style={{ textAlign: "center", color: "#6b7a99" }}>Loading...</div>
    </div>
  );
}

const cardStyle = { background: "#fff", borderRadius: 12, padding: "1.3rem 1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: "1rem" };
const sectionTitle = { fontSize: "1rem", fontWeight: 700, color: "#0f1f3d", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1.5px solid #f0f1f5" };
const labelStyle = { display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: 4 };
const inputStyle = { width: "100%", padding: "0.55rem 0.8rem", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: "0.9rem", outline: "none", boxSizing: "border-box" };
const iconBtn = { padding: "0.5rem 0.7rem", border: "none", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", color: "#374151", flexShrink: 0 };

export const getServerSideProps = withAdminAuth(async () => {
  return { props: {} };
}, { superAdminOnly: true });
