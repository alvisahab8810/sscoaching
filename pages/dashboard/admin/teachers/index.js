import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";
import {
  MdPersonAdd, MdSearch, MdRefresh, MdSchool, MdCheckCircle, MdBlock,
  MdDelete, MdVisibility, MdToggleOn, MdToggleOff, MdClose, MdVideoCall,
  MdVisibilityOff,
} from "react-icons/md";

const EMPTY_INVITE = {
  name: "", email: "", username: "", password: "",
  phone: "", subjects: "", qualification: "",
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, classes: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toggling, setToggling] = useState(null);

  const [showInvite, setShowInvite] = useState(false);
  const [invite, setInvite] = useState(EMPTY_INVITE);
  const [showPwd, setShowPwd] = useState(false);
  const [inviting, setInviting] = useState(false);

  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: 100,
        ...(search && { search }),
        ...(filterStatus && { status: filterStatus }),
      });
      const res = await fetch(`/api/admin/teachers?${params}`);
      const data = await res.json();
      if (data.success) {
        setTeachers(data.data);
        const active = data.data.filter((t) => t.status === "active").length;
        const classes = data.data.reduce((sum, t) => sum + (t.totalClasses || 0), 0);
        setStats({ total: data.total ?? data.data.length, active, inactive: (data.total ?? data.data.length) - active, classes });
      } else {
        toast.error(data.message || "Failed to load teachers");
      }
    } catch {
      toast.error("Failed to load teachers");
    }
    setLoading(false);
  }, [search, filterStatus]);

  useEffect(() => {
    const t = setTimeout(fetchTeachers, search ? 350 : 0);
    return () => clearTimeout(t);
  }, [fetchTeachers, search]);

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviting(true);
    try {
      const res = await fetch("/api/admin/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...invite,
          subjects: invite.subjects.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Could not invite teacher");

      if (data.emailSent) {
        toast.success(`${invite.name} invited — credentials emailed`);
      } else {
        toast.warning(`${invite.name} created, but the email could not be sent. Share the credentials manually.`);
      }
      setShowInvite(false);
      setInvite(EMPTY_INVITE);
      fetchTeachers();
    } catch (err) {
      toast.error(err.message || "Could not invite teacher");
    }
    setInviting(false);
  };

  const toggleStatus = async (t) => {
    setToggling(t._id);
    const newStatus = t.status === "active" ? "inactive" : "active";
    try {
      const res = await fetch(`/api/admin/teachers/${t._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`${t.name} ${newStatus === "active" ? "activated" : "deactivated"}`);
        fetchTeachers();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to update status");
    }
    setToggling(null);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/teachers/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Teacher removed — their classes were kept");
        fetchTeachers();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to delete");
    }
    setDeleteConfirm(null);
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

  return (
    <>
      <Head><title>Teachers — SS Coaching</title></Head>
      <div className="oc-wrapper">
        <Topbar />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1 bg-light">
            <div className="container-fluid p-4">

              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f1f3d", margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
                    <MdSchool size={28} color="#5641CE" /> Teacher Management
                  </h1>
                  <p style={{ color: "#6b7a99", margin: "4px 0 0", fontSize: "0.9rem" }}>
                    Invite teachers, give them online-class access, and track what each one has taught
                  </p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={fetchTeachers} style={btnStyle("#6b7a99")}><MdRefresh size={16} /> Refresh</button>
                  <button onClick={() => setShowInvite(true)} style={btnStyle("#5641CE")}><MdPersonAdd size={16} /> Invite Teacher</button>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                {[
                  { label: "Total Teachers", value: stats.total, color: "#5641CE", icon: <MdSchool size={22} /> },
                  { label: "Active", value: stats.active, color: "#22c55e", icon: <MdCheckCircle size={22} /> },
                  { label: "Inactive", value: stats.inactive, color: "#ef4444", icon: <MdBlock size={22} /> },
                  { label: "Classes Taken", value: stats.classes, color: "#0ea5e9", icon: <MdVideoCall size={22} /> },
                ].map((s) => (
                  <div key={s.label} style={cardStyle}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: "0.78rem", color: "#6b7a99", fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                        <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f1f3d" }}>{s.value}</div>
                      </div>
                      <div style={{ color: s.color, background: `${s.color}14`, borderRadius: 10, padding: 9, display: "flex" }}>{s.icon}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div style={{ ...cardStyle, marginBottom: "1.2rem", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ position: "relative", flex: "1 1 260px" }}>
                  <MdSearch size={19} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email or username"
                    style={{ ...inputStyle, paddingLeft: "2.3rem" }}
                  />
                </div>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ ...inputStyle, width: "auto", minWidth: 150 }}>
                  <option value="">All statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Table */}
              <div style={cardStyle}>
                {loading ? (
                  <p style={{ color: "#6b7a99", padding: "2rem 0", textAlign: "center" }}>Loading…</p>
                ) : teachers.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#6b7a99" }}>
                    <MdSchool size={44} color="#cbd5e1" />
                    <p style={{ margin: "0.8rem 0 0", fontWeight: 600 }}>No teachers yet</p>
                    <p style={{ margin: "4px 0 0", fontSize: "0.85rem" }}>
                      Use &ldquo;Invite Teacher&rdquo; — the username and password go straight to their email.
                    </p>
                  </div>
                ) : (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                      <thead>
                        <tr style={{ background: "#f8f9ff" }}>
                          {["Teacher", "Subjects", "Classes", "Completed", "Upcoming", "Last Class", "Status", "Actions"].map((h) => (
                            <th key={h} style={thStyle}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {teachers.map((t) => (
                          <tr key={t._id} style={{ borderBottom: "1px solid #eef0f7" }}>
                            <td style={tdStyle}>
                              <div style={{ fontWeight: 700, color: "#0f1f3d" }}>{t.name}</div>
                              <div style={{ fontSize: "0.78rem", color: "#6b7a99" }}>{t.email}</div>
                              <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>@{t.username}</div>
                            </td>
                            <td style={tdStyle}>
                              {t.subjects?.length ? (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                  {t.subjects.map((s) => (
                                    <span key={s} style={{ background: "#eef0ff", color: "#5641CE", borderRadius: 6, padding: "2px 7px", fontSize: "0.73rem", fontWeight: 600 }}>{s}</span>
                                  ))}
                                </div>
                              ) : "—"}
                            </td>
                            <td style={{ ...tdStyle, fontWeight: 700, color: "#0f1f3d" }}>{t.totalClasses || 0}</td>
                            <td style={tdStyle}>{t.completedClasses || 0}</td>
                            <td style={tdStyle}>{t.upcomingClasses || 0}</td>
                            <td style={tdStyle}>{formatDate(t.lastClassAt)}</td>
                            <td style={tdStyle}>
                              <span style={{
                                background: t.status === "active" ? "#dcfce7" : "#fee2e2",
                                color: t.status === "active" ? "#15803d" : "#dc2626",
                                borderRadius: 99, padding: "3px 10px", fontSize: "0.75rem", fontWeight: 700,
                              }}>
                                {t.status === "active" ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>
                              <Link href={`/dashboard/admin/teachers/${t._id}`} style={{ ...iconBtn("#5641CE"), textDecoration: "none" }} title="View report">
                                <MdVisibility size={17} />
                              </Link>
                              <button
                                onClick={() => toggleStatus(t)}
                                disabled={toggling === t._id}
                                style={iconBtn(t.status === "active" ? "#f59e0b" : "#22c55e")}
                                title={t.status === "active" ? "Deactivate" : "Activate"}
                              >
                                {t.status === "active" ? <MdToggleOn size={19} /> : <MdToggleOff size={19} />}
                              </button>
                              <button onClick={() => setDeleteConfirm(t)} style={iconBtn("#ef4444")} title="Delete">
                                <MdDelete size={17} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Invite modal */}
      {showInvite && (
        <div style={overlayStyle} onClick={() => !inviting && setShowInvite(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f1f3d", margin: 0 }}>Invite a Teacher</h3>
              <button onClick={() => setShowInvite(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7a99", display: "flex" }}>
                <MdClose size={22} />
              </button>
            </div>
            <p style={{ color: "#6b7a99", fontSize: "0.85rem", margin: "0 0 1.2rem" }}>
              The username and password below are emailed to the teacher along with the portal link.
              Teachers can only see and manage online classes.
            </p>

            <form onSubmit={handleInvite}>
              <div style={gridTwo}>
                <Field label="Full Name *">
                  <input style={inputStyle} value={invite.name} required
                    onChange={(e) => setInvite((f) => ({ ...f, name: e.target.value }))} />
                </Field>
                <Field label="Email *">
                  <input type="email" style={inputStyle} value={invite.email} required
                    onChange={(e) => setInvite((f) => ({ ...f, email: e.target.value }))} />
                </Field>
              </div>
              <div style={gridTwo}>
                <Field label="Username *">
                  <input style={inputStyle} value={invite.username} required autoComplete="off"
                    onChange={(e) => setInvite((f) => ({ ...f, username: e.target.value }))} />
                </Field>
                <Field label="Password *">
                  <div style={{ position: "relative" }}>
                    <input type={showPwd ? "text" : "password"} style={{ ...inputStyle, paddingRight: "2.6rem" }}
                      value={invite.password} required minLength={6} autoComplete="new-password"
                      onChange={(e) => setInvite((f) => ({ ...f, password: e.target.value }))} />
                    <button type="button" onClick={() => setShowPwd((p) => !p)}
                      style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6b7a99", display: "flex" }}>
                      {showPwd ? <MdVisibilityOff size={19} /> : <MdVisibility size={19} />}
                    </button>
                  </div>
                </Field>
              </div>
              <div style={gridTwo}>
                <Field label="Phone">
                  <input style={inputStyle} value={invite.phone}
                    onChange={(e) => setInvite((f) => ({ ...f, phone: e.target.value }))} />
                </Field>
                <Field label="Qualification">
                  <input style={inputStyle} value={invite.qualification} placeholder="M.Sc. Physics"
                    onChange={(e) => setInvite((f) => ({ ...f, qualification: e.target.value }))} />
                </Field>
              </div>
              <Field label="Subjects (comma separated)">
                <input style={inputStyle} value={invite.subjects} placeholder="Physics, Chemistry"
                  onChange={(e) => setInvite((f) => ({ ...f, subjects: e.target.value }))} />
              </Field>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: "1.3rem" }}>
                <button type="button" onClick={() => setShowInvite(false)} style={btnStyle("#6b7a99")}>Cancel</button>
                <button type="submit" disabled={inviting} style={{ ...btnStyle("#5641CE"), opacity: inviting ? 0.6 : 1 }}>
                  {inviting ? "Sending…" : "Invite & Send Credentials"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div style={overlayStyle} onClick={() => setDeleteConfirm(null)}>
          <div style={{ ...modalStyle, maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f1f3d", margin: "0 0 8px" }}>Delete {deleteConfirm.name}?</h3>
            <p style={{ color: "#6b7a99", fontSize: "0.88rem", margin: "0 0 1.2rem" }}>
              Their login stops working immediately. The classes they scheduled stay live for students,
              so nothing breaks in the app. To block access without deleting, deactivate them instead.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button onClick={() => setDeleteConfirm(null)} style={btnStyle("#6b7a99")}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm._id)} style={btnStyle("#ef4444")}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const Field = ({ label, children }) => (
  <div style={{ marginBottom: 12 }}>
    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: 5 }}>{label}</label>
    {children}
  </div>
);

const gridTwo = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
const cardStyle = { background: "#fff", borderRadius: 14, padding: "1.2rem 1.3rem", border: "1px solid #e8eaf5", boxShadow: "0 1px 3px rgba(15,31,61,0.04)" };
const thStyle = { textAlign: "left", padding: "0.7rem 0.8rem", fontSize: "0.76rem", fontWeight: 700, color: "#6b7a99", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" };
const tdStyle = { padding: "0.8rem", color: "#334155", verticalAlign: "middle" };
const inputStyle = { width: "100%", padding: "0.6rem 0.8rem", border: "1.5px solid #e5e7eb", borderRadius: 9, fontSize: "0.9rem", outline: "none", boxSizing: "border-box", color: "#0f1f3d", background: "#fff" };
const overlayStyle = { position: "fixed", inset: 0, background: "rgba(15,31,61,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", zIndex: 1050 };
const modalStyle = { background: "#fff", borderRadius: 16, padding: "1.5rem", width: "100%", maxWidth: 680, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" };

const btnStyle = (color) => ({
  background: color, color: "#fff", border: "none", borderRadius: 9,
  padding: "0.55rem 0.95rem", fontWeight: 700, fontSize: "0.85rem",
  cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
});

const iconBtn = (color) => ({
  background: `${color}14`, color, border: "none", borderRadius: 8,
  padding: "6px 8px", cursor: "pointer", marginRight: 6, display: "inline-flex",
  alignItems: "center",
});

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }), { superAdminOnly: true });
