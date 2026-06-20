import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";
import { MdPersonAdd, MdVisibility, MdVisibilityOff, MdRefresh, MdContentCopy, MdCheck } from "react-icons/md";

const ALL_FEATURES = [
  { key: "blogs", label: "Blogs", desc: "Create, edit, delete blog posts" },
  { key: "faqs", label: "FAQs", desc: "Manage frequently asked questions" },
  { key: "students", label: "Students", desc: "View and manage student records" },
  { key: "courses", label: "Courses", desc: "Manage course listings" },
  { key: "admissions", label: "Applications", desc: "View and manage admissions" },
  { key: "announcements", label: "Announcements", desc: "Create and manage announcements" },
  { key: "leads", label: "Leads", desc: "Track and manage leads" },
  { key: "student-success", label: "Student Success", desc: "Manage student success stories" },
  { key: "online-classes", label: "Online Classes", desc: "Manage live video classes" },
  { key: "invoices", label: "Invoices", desc: "View and manage billing" },
  { key: "enrollments", label: "Enrollments", desc: "Track student enrollments" },
];

function generatePassword(len = 12) {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function InviteSubAdminPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", username: "", password: "", status: "active" });
  const [permissions, setPermissions] = useState([]);
  const [passwordMode, setPasswordMode] = useState("auto");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: "" }));
  };

  const autoGenerate = () => {
    const pwd = generatePassword();
    setForm(f => ({ ...f, password: pwd }));
    setShowPassword(true);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(form.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const togglePermission = (key) => {
    setPermissions(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const selectAll = () => {
    setPermissions(permissions.length === ALL_FEATURES.length ? [] : ALL_FEATURES.map(f => f.key));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.username.trim()) e.username = "Username is required";
    else if (/\s/.test(form.username)) e.username = "Username cannot contain spaces";
    if (!form.password.trim()) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/sub-admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, permissions }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.emailSent) {
          toast.success("Sub-admin created! Login credentials sent to their email.");
        } else {
          toast.success("Sub-admin created! (Email delivery failed — share credentials manually.)");
        }
        router.push(`/dashboard/admin/sub-admins/${data.data._id}`);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to create sub-admin");
    }
    setSubmitting(false);
  };

  return (
    <>
      <Head><title>Invite Sub-Admin — SS Coaching</title></Head>
      <div className="oc-wrapper">
        <Topbar />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1 bg-light">
            <div className="container-fluid p-4">

              {/* Header */}
              <div style={{ marginBottom: "1.5rem" }}>
                <a onClick={() => router.back()} style={{ color: "#5641CE", cursor: "pointer", fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
                  ← Back
                </a>
                <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f1f3d", margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
                  <MdPersonAdd size={28} color="#5641CE" /> Invite Sub-Admin
                </h1>
                <p style={{ color: "#6b7a99", margin: "4px 0 0", fontSize: "0.9rem" }}>Create a new sub-admin account with specific feature permissions</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>

                  {/* Left column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                    {/* Basic Info */}
                    <div style={cardStyle}>
                      <h3 style={sectionTitle}>Basic Information</h3>
                      {[
                        { field: "name", label: "Full Name", placeholder: "e.g. Rahul Sharma", type: "text" },
                        { field: "email", label: "Email Address", placeholder: "e.g. rahul@example.com", type: "email" },
                        { field: "username", label: "Username", placeholder: "e.g. rahul_admin", type: "text" },
                      ].map(({ field, label, placeholder, type }) => (
                        <div key={field} style={{ marginBottom: "0.75rem" }}>
                          <label style={labelStyle}>{label}</label>
                          <input
                            type={type} value={form[field]} onChange={e => set(field, e.target.value)}
                            placeholder={placeholder}
                            style={{ ...inputStyle, borderColor: errors[field] ? "#ef4444" : "#e5e7eb" }}
                          />
                          {errors[field] && <div style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: 3 }}>{errors[field]}</div>}
                        </div>
                      ))}
                    </div>

                    {/* Password */}
                    <div style={cardStyle}>
                      <h3 style={sectionTitle}>Password Setup</h3>
                      <div style={{ display: "flex", gap: 8, marginBottom: "0.75rem" }}>
                        {["auto", "manual"].map(mode => (
                          <button key={mode} type="button" onClick={() => setPasswordMode(mode)}
                            style={{ flex: 1, padding: "0.5rem", border: `2px solid ${passwordMode === mode ? "#5641CE" : "#e5e7eb"}`, borderRadius: 8, background: passwordMode === mode ? "#ede9ff" : "#fff", color: passwordMode === mode ? "#5641CE" : "#6b7a99", fontWeight: 600, cursor: "pointer", fontSize: "0.88rem" }}>
                            {mode === "auto" ? "Auto Generate" : "Manual Entry"}
                          </button>
                        ))}
                      </div>

                      {passwordMode === "auto" && (
                        <button type="button" onClick={autoGenerate}
                          style={{ width: "100%", padding: "0.5rem", background: "#5641CE", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: "0.88rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: "0.5rem" }}>
                          <MdRefresh size={16} /> Generate Password
                        </button>
                      )}

                      {form.password && (
                        <div style={{ position: "relative" }}>
                          <label style={labelStyle}>Password</label>
                          <div style={{ display: "flex", gap: 6 }}>
                            <input
                              type={showPassword ? "text" : "password"} value={form.password}
                              onChange={e => passwordMode === "manual" && set("password", e.target.value)}
                              readOnly={passwordMode === "auto"}
                              style={{ ...inputStyle, flex: 1, borderColor: errors.password ? "#ef4444" : "#e5e7eb", fontFamily: showPassword ? "inherit" : "monospace", letterSpacing: showPassword ? "normal" : "0.15em" }}
                            />
                            <button type="button" onClick={() => setShowPassword(p => !p)} style={{ ...iconBtn, background: "#f0f1f5" }}>
                              {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                            </button>
                            {form.password && (
                              <button type="button" onClick={copyPassword} style={{ ...iconBtn, background: copied ? "#dcfce7" : "#f0f1f5", color: copied ? "#16a34a" : "#374151" }}>
                                {copied ? <MdCheck size={18} /> : <MdContentCopy size={18} />}
                              </button>
                            )}
                          </div>
                          {errors.password && <div style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: 3 }}>{errors.password}</div>}
                          {passwordMode === "auto" && form.password && (
                            <div style={{ fontSize: "0.78rem", color: "#6b7a99", marginTop: 4 }}>Copy and save this password — it won't be shown again after leaving this page.</div>
                          )}
                        </div>
                      )}

                      {passwordMode === "manual" && !form.password && (
                        <div>
                          <label style={labelStyle}>Password</label>
                          <input type="text" value={form.password} onChange={e => set("password", e.target.value)} placeholder="Enter password (min 6 chars)"
                            style={{ ...inputStyle, borderColor: errors.password ? "#ef4444" : "#e5e7eb" }} />
                          {errors.password && <div style={{ color: "#ef4444", fontSize: "0.78rem", marginTop: 3 }}>{errors.password}</div>}
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div style={cardStyle}>
                      <h3 style={sectionTitle}>Account Status</h3>
                      <div style={{ display: "flex", gap: 8 }}>
                        {["active", "inactive"].map(s => (
                          <button key={s} type="button" onClick={() => set("status", s)}
                            style={{ flex: 1, padding: "0.5rem", border: `2px solid ${form.status === s ? (s === "active" ? "#22c55e" : "#ef4444") : "#e5e7eb"}`, borderRadius: 8, background: form.status === s ? (s === "active" ? "#dcfce7" : "#fee2e2") : "#fff", color: form.status === s ? (s === "active" ? "#16a34a" : "#dc2626") : "#6b7a99", fontWeight: 600, cursor: "pointer", fontSize: "0.88rem", textTransform: "capitalize" }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right column — Permissions */}
                  <div style={cardStyle}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                      <h3 style={{ ...sectionTitle, marginBottom: 0 }}>Feature Permissions</h3>
                      <button type="button" onClick={selectAll}
                        style={{ background: "transparent", border: "1.5px solid #5641CE", color: "#5641CE", borderRadius: 8, padding: "4px 12px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>
                        {permissions.length === ALL_FEATURES.length ? "Deselect All" : "Select All"}
                      </button>
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "#6b7a99", marginBottom: "1rem" }}>
                      Only selected features will be visible to this sub-admin.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {ALL_FEATURES.map(f => {
                        const checked = permissions.includes(f.key);
                        return (
                          <label key={f.key}
                            style={{ display: "flex", alignItems: "center", gap: 10, padding: "0.65rem 0.85rem", border: `2px solid ${checked ? "#5641CE" : "#e5e7eb"}`, borderRadius: 10, cursor: "pointer", background: checked ? "#faf8ff" : "#fff", transition: "all 0.15s" }}>
                            <input type="checkbox" checked={checked} onChange={() => togglePermission(f.key)} style={{ width: 15, height: 15, accentColor: "#5641CE", flexShrink: 0 }} />
                            <div>
                              <div style={{ fontWeight: 600, fontSize: "0.85rem", color: checked ? "#5641CE" : "#0f1f3d" }}>{f.label}</div>
                              <div style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{f.desc}</div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                    <div style={{ marginTop: "1rem", padding: "0.6rem 0.9rem", background: "#f8f9ff", borderRadius: 8, fontSize: "0.82rem", color: "#6b7a99" }}>
                      {permissions.length} of {ALL_FEATURES.length} features selected
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div style={{ marginTop: "1.5rem", display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button type="button" onClick={() => router.back()}
                    style={{ padding: "0.65rem 1.5rem", border: "1.5px solid #e5e7eb", background: "#fff", borderRadius: 8, fontWeight: 600, cursor: "pointer", color: "#374151" }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting}
                    style={{ padding: "0.65rem 2rem", background: submitting ? "#9ca3af" : "#5641CE", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                    <MdPersonAdd size={18} /> {submitting ? "Creating..." : "Create Sub-Admin"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const cardStyle = { background: "#fff", borderRadius: 12, padding: "1.3rem 1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" };
const sectionTitle = { fontSize: "1rem", fontWeight: 700, color: "#0f1f3d", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1.5px solid #f0f1f5" };
const labelStyle = { display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#374151", marginBottom: 4 };
const inputStyle = { width: "100%", padding: "0.55rem 0.8rem", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: "0.9rem", outline: "none", boxSizing: "border-box" };
const iconBtn = { padding: "0.5rem 0.7rem", border: "none", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", color: "#374151" };

export const getServerSideProps = withAdminAuth(async () => {
  return { props: {} };
}, { superAdminOnly: true });
