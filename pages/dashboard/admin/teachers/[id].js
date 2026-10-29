import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";
import { CLASS_OPTIONS } from "@/lib/classOptions";
import {
  MdArrowBack, MdRefresh, MdSchool, MdEventNote, MdCheckCircle, MdSchedule,
  MdLiveTv, MdAccessTime, MdBarChart, MdMenuBook, MdHistory, MdSave,
  MdVideoCall, MdPerson,
} from "react-icons/md";

export default function TeacherDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [teacher, setTeacher] = useState(null);
  const [report, setReport] = useState(null);
  const [classes, setClasses] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("report");

  const [edit, setEdit] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/teachers/${id}`);
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to load teacher");
      setTeacher(data.data);
      setReport(data.report);
      setClasses(data.classes || []);
      setLogs(data.logs || []);
      setEdit({
        name: data.data.name || "",
        email: data.data.email || "",
        phone: data.data.phone || "",
        qualification: data.data.qualification || "",
        username: data.data.username || "",
        subjects: (data.data.subjects || []).join(", "),
        classes: data.data.classes || [],
        status: data.data.status || "active",
        password: "",
      });
    } catch (err) {
      toast.error(err.message || "Failed to load teacher");
    }
    setLoading(false);
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        ...edit,
        subjects: edit.subjects.split(",").map((s) => s.trim()).filter(Boolean),
        classes: edit.classes || [],
      };
      if (!body.password) delete body.password;

      const res = await fetch(`/api/admin/teachers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Could not save");
      toast.success("Teacher updated");
      load();
    } catch (err) {
      toast.error(err.message || "Could not save");
    }
    setSaving(false);
  };

  const formatDateTime = (d) =>
    d ? new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

  const monthLabel = (ym) => {
    if (!ym) return "—";
    const [y, m] = ym.split("-");
    const date = new Date(Number(y), Number(m) - 1, 1);
    return date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
  };

  return (
    <>
      <Head><title>{teacher?.name ? `${teacher.name} — Teacher` : "Teacher"} — SS Coaching</title></Head>
      <div className="oc-wrapper">
        <Topbar />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1 bg-light">
            <div className="container-fluid p-4">

              <Link href="/dashboard/admin/teachers" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#5641CE", textDecoration: "none", fontWeight: 600, fontSize: "0.88rem", marginBottom: "1rem" }}>
                <MdArrowBack size={18} /> Back to Teachers
              </Link>

              {loading ? (
                <p style={{ color: "#6b7a99", padding: "2rem 0" }}>Loading…</p>
              ) : !teacher ? (
                <div style={cardStyle}>
                  <p style={{ color: "#6b7a99", margin: 0 }}>This teacher could not be found.</p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div style={{ ...cardStyle, marginBottom: "1.2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 54, height: 54, borderRadius: 14, background: "#eef0ff", color: "#5641CE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <MdSchool size={28} />
                      </div>
                      <div>
                        <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f1f3d", margin: 0 }}>{teacher.name}</h1>
                        <div style={{ color: "#6b7a99", fontSize: "0.86rem" }}>
                          {teacher.email} · @{teacher.username}
                        </div>
                        <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                          <span style={{
                            background: teacher.status === "active" ? "#dcfce7" : "#fee2e2",
                            color: teacher.status === "active" ? "#15803d" : "#dc2626",
                            borderRadius: 99, padding: "3px 10px", fontSize: "0.74rem", fontWeight: 700,
                          }}>
                            {teacher.status === "active" ? "Active" : "Inactive"}
                          </span>
                          {(teacher.subjects || []).map((s) => (
                            <span key={s} style={{ background: "#eef0ff", color: "#5641CE", borderRadius: 99, padding: "3px 10px", fontSize: "0.74rem", fontWeight: 600 }}>{s}</span>
                          ))}
                          {(teacher.classes || []).map((c) => (
                            <span key={c} style={{ background: "#e8f6ef", color: "#0f9d58", borderRadius: 99, padding: "3px 10px", fontSize: "0.74rem", fontWeight: 600 }}>{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <button onClick={load} style={btnStyle("#6b7a99")}><MdRefresh size={16} /> Refresh</button>
                      <div style={{ color: "#9ca3af", fontSize: "0.76rem", marginTop: 8 }}>
                        Last login: {formatDateTime(teacher.lastLoginAt)}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "1rem", marginBottom: "1.2rem" }}>
                    {[
                      { label: "Total Classes", value: report?.totalClasses ?? 0, color: "#5641CE", icon: <MdEventNote size={22} /> },
                      { label: "Completed", value: report?.completed ?? 0, color: "#22c55e", icon: <MdCheckCircle size={22} /> },
                      { label: "Upcoming", value: report?.upcoming ?? 0, color: "#f59e0b", icon: <MdSchedule size={22} /> },
                      { label: "Live Now", value: report?.live ?? 0, color: "#ef4444", icon: <MdLiveTv size={22} /> },
                      { label: "Total Minutes", value: report?.totalMinutes ?? 0, color: "#0ea5e9", icon: <MdAccessTime size={22} /> },
                    ].map((s) => (
                      <div key={s.label} style={cardStyle}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div>
                            <div style={{ fontSize: "0.78rem", color: "#6b7a99", fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                            <div style={{ fontSize: "1.55rem", fontWeight: 800, color: "#0f1f3d" }}>{s.value}</div>
                          </div>
                          <div style={{ color: s.color, background: `${s.color}14`, borderRadius: 10, padding: 9, display: "flex" }}>{s.icon}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tabs */}
                  <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #e8eaf5", marginBottom: "1.2rem", flexWrap: "wrap" }}>
                    {[
                      { key: "report", label: "Teaching Report", icon: <MdBarChart size={17} /> },
                      { key: "classes", label: `Classes (${classes.length})`, icon: <MdVideoCall size={17} /> },
                      { key: "logs", label: "Activity Log", icon: <MdHistory size={17} /> },
                      { key: "profile", label: "Profile & Access", icon: <MdPerson size={17} /> },
                    ].map((t) => (
                      <button key={t.key} onClick={() => setTab(t.key)}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          padding: "0.75rem 1rem", fontWeight: 700, fontSize: "0.88rem",
                          color: tab === t.key ? "#5641CE" : "#6b7a99",
                          borderBottom: tab === t.key ? "3px solid #5641CE" : "3px solid transparent",
                          display: "flex", alignItems: "center", gap: 7,
                        }}>
                        {t.icon} {t.label}
                      </button>
                    ))}
                  </div>

                  {tab === "report" && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
                      <div style={cardStyle}>
                        <h3 style={panelTitle}><MdMenuBook size={19} color="#5641CE" /> By Subject</h3>
                        <BreakdownList items={report?.bySubject} empty="No classes recorded yet." />
                      </div>
                      <div style={cardStyle}>
                        <h3 style={panelTitle}><MdEventNote size={19} color="#5641CE" /> By Course</h3>
                        <BreakdownList items={report?.byCourse} empty="No classes linked to a course yet." />
                      </div>
                      <div style={cardStyle}>
                        <h3 style={panelTitle}><MdBarChart size={19} color="#5641CE" /> Month by Month</h3>
                        <BreakdownList items={report?.byMonth?.map((m) => ({ label: monthLabel(m.label), count: m.count }))} empty="No classes recorded yet." />
                      </div>
                    </div>
                  )}

                  {tab === "classes" && (
                    <div style={cardStyle}>
                      {classes.length === 0 ? (
                        <p style={{ color: "#6b7a99", margin: 0, padding: "1.5rem 0", textAlign: "center" }}>
                          This teacher has not scheduled any class yet.
                        </p>
                      ) : (
                        <div style={{ overflowX: "auto" }}>
                          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
                            <thead>
                              <tr style={{ background: "#f8f9ff" }}>
                                {["Class", "Subject", "Chapter / Topic", "Batch", "Date & Time", "Course", "Status", "Created"].map((h) => (
                                  <th key={h} style={thStyle}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {classes.map((c) => (
                                <tr key={c._id} style={{ borderBottom: "1px solid #eef0f7" }}>
                                  <td style={{ ...tdStyle, fontWeight: 700, color: "#0f1f3d" }}>{c.title}</td>
                                  <td style={tdStyle}>{c.subject}</td>
                                  <td style={tdStyle}>
                                    <div>{c.chapter || "—"}</div>
                                    {c.topic ? <div style={{ fontSize: "0.78rem", color: "#6b7a99" }}>{c.topic}</div> : null}
                                  </td>
                                  <td style={tdStyle}>{c.batch}</td>
                                  <td style={tdStyle}>
                                    <div>{c.date}</div>
                                    <div style={{ fontSize: "0.78rem", color: "#6b7a99" }}>{c.time}{c.duration ? ` · ${c.duration}` : ""}</div>
                                  </td>
                                  <td style={tdStyle}>{c.course?.title || "—"}</td>
                                  <td style={tdStyle}><StatusPill status={c.status} /></td>
                                  <td style={{ ...tdStyle, fontSize: "0.78rem", color: "#6b7a99" }}>{formatDateTime(c.createdAt)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {tab === "logs" && (
                    <div style={cardStyle}>
                      {logs.length === 0 ? (
                        <p style={{ color: "#6b7a99", margin: 0, padding: "1.5rem 0", textAlign: "center" }}>
                          No activity recorded yet.
                        </p>
                      ) : (
                        <div style={{ overflowX: "auto" }}>
                          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.87rem" }}>
                            <thead>
                              <tr style={{ background: "#f8f9ff" }}>
                                {["When", "Action", "Description", "IP"].map((h) => (
                                  <th key={h} style={thStyle}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {logs.map((l) => (
                                <tr key={l._id} style={{ borderBottom: "1px solid #eef0f7" }}>
                                  <td style={{ ...tdStyle, whiteSpace: "nowrap", fontSize: "0.8rem", color: "#6b7a99" }}>{formatDateTime(l.createdAt)}</td>
                                  <td style={tdStyle}>
                                    <span style={{ background: "#eef0ff", color: "#5641CE", borderRadius: 6, padding: "2px 8px", fontSize: "0.75rem", fontWeight: 700 }}>
                                      {l.action}
                                    </span>
                                  </td>
                                  <td style={tdStyle}>{l.description || "—"}</td>
                                  <td style={{ ...tdStyle, fontSize: "0.8rem", color: "#6b7a99" }}>{l.ip || "—"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {tab === "profile" && (
                    <div style={{ ...cardStyle, maxWidth: 720 }}>
                      <h3 style={panelTitle}><MdPerson size={19} color="#5641CE" /> Profile &amp; Access</h3>
                      <form onSubmit={handleSave}>
                        <div style={gridTwo}>
                          <Field label="Full Name">
                            <input style={inputStyle} value={edit.name}
                              onChange={(e) => setEdit((f) => ({ ...f, name: e.target.value }))} />
                          </Field>
                          <Field label="Email">
                            <input type="email" style={inputStyle} value={edit.email}
                              onChange={(e) => setEdit((f) => ({ ...f, email: e.target.value }))} />
                          </Field>
                        </div>
                        <div style={gridTwo}>
                          <Field label="Username">
                            <input style={inputStyle} value={edit.username} autoComplete="off"
                              onChange={(e) => setEdit((f) => ({ ...f, username: e.target.value }))} />
                          </Field>
                          <Field label="Reset Password (leave blank to keep)">
                            <input style={inputStyle} value={edit.password} autoComplete="new-password"
                              placeholder="New password"
                              onChange={(e) => setEdit((f) => ({ ...f, password: e.target.value }))} />
                          </Field>
                        </div>
                        <div style={gridTwo}>
                          <Field label="Phone">
                            <input style={inputStyle} value={edit.phone}
                              onChange={(e) => setEdit((f) => ({ ...f, phone: e.target.value }))} />
                          </Field>
                          <Field label="Qualification">
                            <input style={inputStyle} value={edit.qualification}
                              onChange={(e) => setEdit((f) => ({ ...f, qualification: e.target.value }))} />
                          </Field>
                        </div>
                        <Field label="Subjects (comma separated)">
                          <input style={inputStyle} value={edit.subjects}
                            onChange={(e) => setEdit((f) => ({ ...f, subjects: e.target.value }))} />
                        </Field>
                        <Field label="Class (select one or more)">
                          <ClassPicker
                            selected={edit.classes || []}
                            onChange={(next) => setEdit((f) => ({ ...f, classes: next }))}
                          />
                        </Field>
                        <div style={gridTwo}>
                          <Field label="Status">
                            <select style={inputStyle} value={edit.status}
                              onChange={(e) => setEdit((f) => ({ ...f, status: e.target.value }))}>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive — cannot log in</option>
                            </select>
                          </Field>
                        </div>
                        <p style={{ color: "#9ca3af", fontSize: "0.78rem", margin: "0 0 1rem" }}>
                          Changing the username or password does not sign the teacher out, but they must use the
                          new ones next time. Teachers only have access to online classes.
                        </p>
                        <button type="submit" disabled={saving} style={{ ...btnStyle("#5641CE"), opacity: saving ? 0.6 : 1 }}>
                          <MdSave size={17} /> {saving ? "Saving…" : "Save Changes"}
                        </button>
                      </form>
                    </div>
                  )}
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BreakdownList({ items, empty }) {
  if (!items?.length) return <p style={{ color: "#6b7a99", fontSize: "0.87rem", margin: 0 }}>{empty}</p>;
  const max = Math.max(...items.map((i) => i.count));
  return (
    <div>
      {items.map((i) => (
        <div key={i.label} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: 4 }}>
            <span style={{ color: "#0f1f3d", fontWeight: 600 }}>{i.label}</span>
            <span style={{ color: "#6b7a99", fontWeight: 700 }}>{i.count}</span>
          </div>
          <div style={{ height: 6, background: "#eef0f7", borderRadius: 99 }}>
            <div style={{ height: "100%", width: `${(i.count / max) * 100}%`, background: "#5641CE", borderRadius: 99 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    upcoming: { bg: "#fef3c7", fg: "#b45309", label: "Upcoming" },
    live: { bg: "#fee2e2", fg: "#dc2626", label: "Live" },
    completed: { bg: "#dcfce7", fg: "#15803d", label: "Completed" },
  };
  const s = map[status] || map.upcoming;
  return (
    <span style={{ background: s.bg, color: s.fg, borderRadius: 99, padding: "3px 10px", fontSize: "0.75rem", fontWeight: 700 }}>
      {s.label}
    </span>
  );
}

// Multi-select for the classes a teacher is assigned to. The values match the
// batch names used when scheduling a live class, so they line up exactly.
const ClassPicker = ({ selected = [], onChange }) => {
  const toggle = (cls) =>
    onChange(selected.includes(cls) ? selected.filter((c) => c !== cls) : [...selected, cls]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
      {CLASS_OPTIONS.map((cls) => {
        const on = selected.includes(cls);
        return (
          <button
            key={cls}
            type="button"
            onClick={() => toggle(cls)}
            style={{
              padding: "6px 13px",
              borderRadius: 99,
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 600,
              border: `1.5px solid ${on ? "#5641CE" : "#e3e6f0"}`,
              background: on ? "#5641CE" : "#fff",
              color: on ? "#fff" : "#6b7a99",
            }}
          >
            {cls}
          </button>
        );
      })}
    </div>
  );
};

const Field = ({ label, children }) => (
  <div style={{ marginBottom: 12 }}>
    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: 5 }}>{label}</label>
    {children}
  </div>
);

const gridTwo = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
const cardStyle = { background: "#fff", borderRadius: 14, padding: "1.2rem 1.3rem", border: "1px solid #e8eaf5", boxShadow: "0 1px 3px rgba(15,31,61,0.04)" };
const panelTitle = { fontSize: "0.98rem", fontWeight: 800, color: "#0f1f3d", margin: "0 0 1rem", display: "flex", alignItems: "center", gap: 8 };
const thStyle = { textAlign: "left", padding: "0.7rem 0.8rem", fontSize: "0.76rem", fontWeight: 700, color: "#6b7a99", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" };
const tdStyle = { padding: "0.8rem", color: "#334155", verticalAlign: "top" };
const inputStyle = { width: "100%", padding: "0.6rem 0.8rem", border: "1.5px solid #e5e7eb", borderRadius: 9, fontSize: "0.9rem", outline: "none", boxSizing: "border-box", color: "#0f1f3d", background: "#fff" };

const btnStyle = (color) => ({
  background: color, color: "#fff", border: "none", borderRadius: 9,
  padding: "0.55rem 0.95rem", fontWeight: 700, fontSize: "0.85rem",
  cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
});

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }), { superAdminOnly: true });
