import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { withTeacherAuth } from "@/lib/withTeacherAuth";
import { toast } from "sonner";
import {
  MdVideoCall, MdAdd, MdRefresh, MdLogout, MdEdit, MdDelete,
  MdClose, MdBarChart, MdEventNote, MdCheckCircle, MdSchedule,
  MdAccessTime, MdLiveTv, MdMenuBook,
} from "react-icons/md";

const EMPTY_FORM = {
  title: "", subject: "", chapter: "", topic: "", batch: "",
  date: "", time: "", duration: "", streamLink: "", description: "",
  status: "upcoming", course: "",
};

export default function TeacherDashboard({ teacher }) {
  const router = useRouter();

  const [tab, setTab] = useState("classes");
  const [classes, setClasses] = useState([]);
  const [report, setReport] = useState(null);
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [meRes, clsRes] = await Promise.all([
        fetch("/api/teacher/me"),
        fetch("/api/teacher/classes?limit=200"),
      ]);
      const me = await meRes.json();
      const cls = await clsRes.json();

      if (me.success) {
        setProfile(me.data);
        setReport(me.report);
      }
      if (cls.success) setClasses(cls.data);
    } catch {
      toast.error("Failed to load your dashboard");
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  useEffect(() => {
    fetch("/api/teacher/courses")
      .then((r) => r.json())
      .then((d) => { if (d.success) setCourses(d.data); })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/teacher/logout", { method: "POST" });
    router.replace("/dashboard/teacher/login");
  };

  const openCreate = () => {
    setEditing(null);
    setForm({
      ...EMPTY_FORM,
      // Pre-fill the subject when the admin recorded only one for this teacher.
      subject: profile?.subjects?.length === 1 ? profile.subjects[0] : "",
    });
    setShowForm(true);
  };

  const openEdit = (cls) => {
    setEditing(cls._id);
    setForm({
      title: cls.title || "", subject: cls.subject || "", chapter: cls.chapter || "",
      topic: cls.topic || "", batch: cls.batch || "", date: cls.date || "",
      time: cls.time || "", duration: cls.duration || "", streamLink: cls.streamLink || "",
      description: cls.description || "", status: cls.status || "upcoming",
      course: cls.course?._id || cls.course || "",
    });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing ? `/api/teacher/classes/${editing}` : "/api/teacher/classes";
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, course: form.course || null }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Could not save");

      toast.success(editing ? "Class updated" : "Class scheduled");
      setShowForm(false);
      setForm(EMPTY_FORM);
      setEditing(null);
      loadAll();
    } catch (err) {
      toast.error(err.message || "Could not save");
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/teacher/classes/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Could not delete");
      toast.success("Class deleted");
      loadAll();
    } catch (err) {
      toast.error(err.message || "Could not delete");
    }
    setDeleteConfirm(null);
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

  return (
    <>
      <Head><title>Teacher Portal — SS Coaching</title></Head>

      <div style={{ minHeight: "100vh", background: "#f6f7fb" }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,#0f1f3d,#1b1870)", padding: "0 1.5rem" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src="/assets/images/logo.png" alt="SS Coaching" style={{ height: 36, background: "#fff", borderRadius: 6, padding: "3px 8px" }} />
              <div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.95rem", lineHeight: 1.2 }}>Teacher Portal</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.72rem" }}>{teacher.name}</div>
              </div>
            </div>
            <button onClick={handleLogout} style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "0.5rem 0.9rem", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <MdLogout size={17} /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e8eaf5", padding: "0 1.5rem" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", gap: 4 }}>
            {[
              { key: "classes", label: "Online Classes", icon: <MdVideoCall size={17} /> },
              { key: "report", label: "My Report", icon: <MdBarChart size={17} /> },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "0.95rem 1.1rem", fontWeight: 700, fontSize: "0.9rem",
                  color: tab === t.key ? "#5641CE" : "#6b7a99",
                  borderBottom: tab === t.key ? "3px solid #5641CE" : "3px solid transparent",
                  display: "flex", alignItems: "center", gap: 7,
                }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "1.5rem" }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
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
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f1f3d" }}>{s.value}</div>
                  </div>
                  <div style={{ color: s.color, background: `${s.color}14`, borderRadius: 10, padding: 9, display: "flex" }}>{s.icon}</div>
                </div>
              </div>
            ))}
          </div>

          {tab === "classes" && (
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f1f3d", margin: 0 }}>My Online Classes</h2>
                  <p style={{ color: "#6b7a99", margin: "3px 0 0", fontSize: "0.85rem" }}>Classes you have scheduled</p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={loadAll} style={btnStyle("#6b7a99")}><MdRefresh size={16} /> Refresh</button>
                  <button onClick={openCreate} style={btnStyle("#5641CE")}><MdAdd size={17} /> Schedule Class</button>
                </div>
              </div>

              {loading ? (
                <p style={{ color: "#6b7a99", padding: "2rem 0", textAlign: "center" }}>Loading…</p>
              ) : classes.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#6b7a99" }}>
                  <MdVideoCall size={44} color="#cbd5e1" />
                  <p style={{ margin: "0.8rem 0 0", fontWeight: 600 }}>No classes yet</p>
                  <p style={{ margin: "4px 0 0", fontSize: "0.85rem" }}>Use &ldquo;Schedule Class&rdquo; to add your first one.</p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                    <thead>
                      <tr style={{ background: "#f8f9ff" }}>
                        {["Class", "Subject", "Batch", "Date & Time", "Course", "Status", ""].map((h) => (
                          <th key={h} style={thStyle}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {classes.map((c) => (
                        <tr key={c._id} style={{ borderBottom: "1px solid #eef0f7" }}>
                          <td style={tdStyle}>
                            <div style={{ fontWeight: 700, color: "#0f1f3d" }}>{c.title}</div>
                            {c.topic ? <div style={{ fontSize: "0.78rem", color: "#6b7a99" }}>{c.topic}</div> : null}
                          </td>
                          <td style={tdStyle}>{c.subject}</td>
                          <td style={tdStyle}>{c.batch}</td>
                          <td style={tdStyle}>
                            <div>{c.date}</div>
                            <div style={{ fontSize: "0.78rem", color: "#6b7a99" }}>{c.time}{c.duration ? ` · ${c.duration}` : ""}</div>
                          </td>
                          <td style={tdStyle}>{c.course?.title || "—"}</td>
                          <td style={tdStyle}><StatusPill status={c.status} /></td>
                          <td style={{ ...tdStyle, textAlign: "right", whiteSpace: "nowrap" }}>
                            <button onClick={() => openEdit(c)} style={iconBtn("#5641CE")} title="Edit"><MdEdit size={17} /></button>
                            <button onClick={() => setDeleteConfirm(c)} style={iconBtn("#ef4444")} title="Delete"><MdDelete size={17} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {tab === "report" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem" }}>
              <div style={cardStyle}>
                <h3 style={panelTitle}><MdMenuBook size={19} color="#5641CE" /> Classes by Subject</h3>
                <BreakdownList items={report?.bySubject} empty="No classes recorded yet." />
              </div>
              <div style={cardStyle}>
                <h3 style={panelTitle}><MdEventNote size={19} color="#5641CE" /> Classes by Course</h3>
                <BreakdownList items={report?.byCourse} empty="No classes recorded yet." />
              </div>
              <div style={cardStyle}>
                <h3 style={panelTitle}><MdBarChart size={19} color="#5641CE" /> My Profile</h3>
                <InfoRow label="Name" value={profile?.name} />
                <InfoRow label="Username" value={profile?.username} />
                <InfoRow label="Email" value={profile?.email} />
                <InfoRow label="Phone" value={profile?.phone || "—"} />
                <InfoRow label="Qualification" value={profile?.qualification || "—"} />
                <InfoRow label="Subjects" value={profile?.subjects?.length ? profile.subjects.join(", ") : "—"} />
                <InfoRow label="Joined" value={formatDate(profile?.createdAt)} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Schedule / edit form */}
      {showForm && (
        <div style={overlayStyle} onClick={() => !saving && setShowForm(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f1f3d", margin: 0 }}>
                {editing ? "Edit Class" : "Schedule a Class"}
              </h3>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7a99", display: "flex" }}>
                <MdClose size={22} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <Row>
                <Field label="Class Title *">
                  <input style={inputStyle} value={form.title} required
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
                </Field>
              </Row>
              <Row>
                <Field label="Subject *">
                  <input style={inputStyle} value={form.subject} required list="teacher-subjects"
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} />
                  <datalist id="teacher-subjects">
                    {(profile?.subjects || []).map((s) => <option key={s} value={s} />)}
                  </datalist>
                </Field>
                <Field label="Batch *">
                  <input style={inputStyle} value={form.batch} required
                    onChange={(e) => setForm((f) => ({ ...f, batch: e.target.value }))} />
                </Field>
              </Row>
              <Row>
                <Field label="Chapter">
                  <input style={inputStyle} value={form.chapter}
                    onChange={(e) => setForm((f) => ({ ...f, chapter: e.target.value }))} />
                </Field>
                <Field label="Topic">
                  <input style={inputStyle} value={form.topic}
                    onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))} />
                </Field>
              </Row>
              <Row>
                <Field label="Date *">
                  <input type="date" style={inputStyle} value={form.date} required
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
                </Field>
                <Field label="Time *">
                  <input type="time" style={inputStyle} value={form.time} required
                    onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))} />
                </Field>
                <Field label="Duration (minutes)">
                  <input style={inputStyle} value={form.duration} placeholder="60"
                    onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} />
                </Field>
              </Row>
              <Row>
                <Field label="Stream Link *">
                  <input style={inputStyle} value={form.streamLink} required placeholder="https://..."
                    onChange={(e) => setForm((f) => ({ ...f, streamLink: e.target.value }))} />
                </Field>
              </Row>
              <Row>
                <Field label="Link to Course">
                  <select style={inputStyle} value={form.course}
                    onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}>
                    <option value="">Not linked</option>
                    {courses.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.title}{c.batch ? ` — ${c.batch}` : ""}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Status">
                  <select style={inputStyle} value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live</option>
                    <option value="completed">Completed</option>
                  </select>
                </Field>
              </Row>
              <Row>
                <Field label="Description">
                  <textarea style={{ ...inputStyle, minHeight: 72, resize: "vertical" }} value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
                </Field>
              </Row>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: "1.2rem" }}>
                <button type="button" onClick={() => setShowForm(false)} style={btnStyle("#6b7a99")}>Cancel</button>
                <button type="submit" disabled={saving} style={{ ...btnStyle("#5641CE"), opacity: saving ? 0.6 : 1 }}>
                  {saving ? "Saving…" : editing ? "Save Changes" : "Schedule Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div style={overlayStyle} onClick={() => setDeleteConfirm(null)}>
          <div style={{ ...modalStyle, maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f1f3d", margin: "0 0 8px" }}>Delete this class?</h3>
            <p style={{ color: "#6b7a99", fontSize: "0.88rem", margin: "0 0 1.2rem" }}>
              &ldquo;{deleteConfirm.title}&rdquo; will be removed for students too. This cannot be undone.
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

function InfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "9px 0", borderBottom: "1px solid #f1f3f9", fontSize: "0.87rem" }}>
      <span style={{ color: "#6b7a99", fontWeight: 600 }}>{label}</span>
      <span style={{ color: "#0f1f3d", fontWeight: 600, textAlign: "right" }}>{value || "—"}</span>
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

const Row = ({ children }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${Array.isArray(children) ? children.length : 1}, 1fr)`, gap: 12, marginBottom: 12 }}>
    {children}
  </div>
);

const Field = ({ label, children }) => (
  <div>
    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: 5 }}>{label}</label>
    {children}
  </div>
);

const cardStyle = { background: "#fff", borderRadius: 14, padding: "1.2rem 1.3rem", border: "1px solid #e8eaf5", boxShadow: "0 1px 3px rgba(15,31,61,0.04)" };
const panelTitle = { fontSize: "0.98rem", fontWeight: 800, color: "#0f1f3d", margin: "0 0 1rem", display: "flex", alignItems: "center", gap: 8 };
const thStyle = { textAlign: "left", padding: "0.7rem 0.8rem", fontSize: "0.76rem", fontWeight: 700, color: "#6b7a99", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" };
const tdStyle = { padding: "0.8rem", color: "#334155", verticalAlign: "top" };
const inputStyle = { width: "100%", padding: "0.6rem 0.8rem", border: "1.5px solid #e5e7eb", borderRadius: 9, fontSize: "0.9rem", outline: "none", boxSizing: "border-box", color: "#0f1f3d", background: "#fff" };
const overlayStyle = { position: "fixed", inset: 0, background: "rgba(15,31,61,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", zIndex: 1000 };
const modalStyle = { background: "#fff", borderRadius: 16, padding: "1.5rem", width: "100%", maxWidth: 760, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" };

const btnStyle = (color) => ({
  background: color, color: "#fff", border: "none", borderRadius: 9,
  padding: "0.55rem 0.95rem", fontWeight: 700, fontSize: "0.85rem",
  cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
});

const iconBtn = (color) => ({
  background: `${color}14`, color, border: "none", borderRadius: 8,
  padding: "6px 8px", cursor: "pointer", marginLeft: 6, display: "inline-flex",
});

export const getServerSideProps = withTeacherAuth(async (context) => ({
  props: { teacher: context.teacherSession },
}));
