import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { MdPersonAdd, MdRefresh, MdContentCopy, MdCheck, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import SalesStyles from "@/components/dashboard/sales/SalesStyles";
import { SALES_FEATURES, generatePassword } from "@/components/dashboard/sales/shared";

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function InviteSalesPage() {
  const router = useRouter();
  const [form, setForm] = useState(() => ({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: generatePassword(),
    status: "active",
  }));
  const [permissions, setPermissions] = useState(["leads"]);
  const [showPassword, setShowPassword] = useState(true);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const toggle = (key) =>
    setPermissions((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const copy = () => {
    navigator.clipboard.writeText(form.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!EMAIL_RX.test(form.email.trim())) e.email = "Invalid email";
    if (form.phone && !/^[+\d\s-]{10,15}$/.test(form.phone.trim())) e.phone = "Invalid phone number";
    if (!form.username.trim()) e.username = "Username is required";
    else if (/\s/.test(form.username)) e.username = "Username cannot contain spaces";
    if (form.password.trim().length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, permissions }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      if (data.emailSent) toast.success("Sales person added. Invitation sent to their email.");
      else toast.success("Sales person added. (Invitation email failed — share the login manually.)");
      router.push(`/dashboard/admin/sales/${data.data._id}`);
    } catch (err) {
      toast.error(err.message || "Could not add the sales person");
    }
    setSubmitting(false);
  };

  const field = (name, label, placeholder, type = "text") => (
    <div style={{ marginBottom: 12 }}>
      <label className="sl-label">{label}</label>
      <input
        type={type}
        className={`sl-input ${errors[name] ? "error" : ""}`}
        value={form[name]}
        placeholder={placeholder}
        onChange={(e) => set(name, e.target.value)}
      />
      {errors[name] && <div className="sl-error">{errors[name]}</div>}
    </div>
  );

  return (
    <div>
      <Head>
        <title>Invite Sales Person — SS Coaching</title>
      </Head>
      <SalesStyles />
      <Topbar />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <AdminOffcanvas />

        <div className="flex-grow-1 sl-bg">
          <div className="container-fluid p-4">
            <div className="sl-head">
              <div>
                <Link href="/dashboard/admin/sales" className="sl-back">
                  ← Sales Team
                </Link>
                <h4 className="sl-title">Invite Sales Person</h4>
                <p className="sl-sub">Create their login. The invitation with username and password goes to their email.</p>
              </div>
            </div>

            <form onSubmit={submit}>
              <div className="sl-grid-2">
                <div>
                  <div className="sl-card">
                    <h6 className="sl-card-title">Basic Details</h6>
                    {field("name", "Full Name", "e.g. Vikram Singh")}
                    {field("email", "Email Address", "e.g. vikram@example.com", "email")}
                    {field("phone", "Phone Number", "e.g. 9876543210", "tel")}
                  </div>

                  <div className="sl-card">
                    <h6 className="sl-card-title">Login</h6>
                    {field("username", "Username", "e.g. vikram_sales")}

                    <label className="sl-label">Password</label>
                    <div style={{ display: "flex", gap: 6 }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`sl-input ${errors.password ? "error" : ""}`}
                        value={form.password}
                        onChange={(e) => set("password", e.target.value)}
                        style={{ fontFamily: "monospace", letterSpacing: "0.04em" }}
                      />
                      <button type="button" className="sl-icon-btn" title="Show / hide" onClick={() => setShowPassword((s) => !s)}>
                        {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                      </button>
                      <button type="button" className="sl-icon-btn" title="Generate" onClick={() => set("password", generatePassword())}>
                        <MdRefresh size={18} />
                      </button>
                      <button type="button" className={`sl-icon-btn ${copied ? "success" : ""}`} title="Copy" onClick={copy}>
                        {copied ? <MdCheck size={18} /> : <MdContentCopy size={16} />}
                      </button>
                    </div>
                    {errors.password && <div className="sl-error">{errors.password}</div>}
                    <div className="sl-hint">Generated for you. Type over it to set your own.</div>
                  </div>

                  <div className="sl-card">
                    <h6 className="sl-card-title">Account Status</h6>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["active", "inactive"].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => set("status", s)}
                          className={form.status === s ? "sl-btn" : "sl-btn-ghost"}
                          style={{ flex: 1, justifyContent: "center", textTransform: "capitalize" }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <div className="sl-hint">Only active sales people get leads from the rotation and can log in.</div>
                  </div>
                </div>

                <div className="sl-card" style={{ alignSelf: "start" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <h6 className="sl-card-title" style={{ margin: 0 }}>Sidebar Access</h6>
                    <button
                      type="button"
                      className="sl-btn-ghost"
                      style={{ padding: "5px 12px", fontSize: "0.8rem" }}
                      onClick={() =>
                        setPermissions(permissions.length === SALES_FEATURES.length ? [] : SALES_FEATURES.map((f) => f.key))
                      }
                    >
                      {permissions.length === SALES_FEATURES.length ? "Deselect All" : "Select All"}
                    </button>
                  </div>
                  <p className="sl-sub" style={{ marginBottom: 12 }}>
                    Only the sections ticked here show in their left menu. In Leads and Follow-ups they see only the leads
                    assigned to them.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {SALES_FEATURES.map((f) => {
                      const on = permissions.includes(f.key);
                      return (
                        <label key={f.key} className={`sl-perm ${on ? "on" : ""}`}>
                          <input type="checkbox" checked={on} onChange={() => toggle(f.key)} />
                          <div>
                            <div className="sl-perm-name">{f.label}</div>
                            <div className="sl-perm-desc">{f.desc}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  {!permissions.includes("leads") && (
                    <div className="sl-error" style={{ marginTop: 10 }}>
                      Without Leads access they will not be able to see the leads assigned to them.
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
                <Link href="/dashboard/admin/sales" className="sl-btn-ghost">
                  Cancel
                </Link>
                <button type="submit" className="sl-btn" disabled={submitting}>
                  <MdPersonAdd size={17} /> {submitting ? "Sending invite…" : "Create & Send Invite"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }), { superAdminOnly: true });
