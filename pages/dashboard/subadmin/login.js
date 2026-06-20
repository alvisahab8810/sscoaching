import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { MdVisibility, MdVisibilityOff, MdLogin } from "react-icons/md";

export default function SubAdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subadmin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      router.replace("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head><title>Sub-Admin Login — SS Coaching</title></Head>
      <div style={{ minHeight: "100vh", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <img src="/assets/images/logo.png" alt="SS Coaching" style={{ height: 60, background: "#fff", borderRadius: 8, padding: "6px 14px", margin: "auto" }} />
          </div>

          {/* Card */}
          <div style={{ background: "#fff", borderRadius: 20, padding: "2rem 2.2rem", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <h2 style={{ fontWeight: 800, color: "#0f1f3d", fontSize: "1.4rem", marginBottom: 4 }}>Sub-Admin Login</h2>
            <p style={{ color: "#6b7a99", fontSize: "0.88rem", marginBottom: "1.5rem" }}>Enter your credentials to access the staff portal</p>

            {error && (
              <div style={{ background: "#fee2e2", border: "1.5px solid #fecaca", color: "#dc2626", borderRadius: 10, padding: "0.7rem 1rem", marginBottom: "1rem", fontSize: "0.88rem", fontWeight: 500 }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={labelStyle}>Username</label>
                <input
                  type="text" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  placeholder="Enter your username" required autoFocus
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPwd ? "text" : "password"} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    placeholder="Enter your password" required
                    style={{ ...inputStyle, paddingRight: "2.8rem" }}
                  />
                  <button type="button" onClick={() => setShowPwd(p => !p)}
                    style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6b7a99", display: "flex" }}>
                    {showPwd ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading || !form.username || !form.password}
                style={{ width: "100%", padding: "0.75rem", background: loading ? "#9ca3af" : "linear-gradient(135deg, #5641CE, #4430b5)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}>
                <MdLogin size={20} /> {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

          </div>

          <div style={{ textAlign: "center", marginTop: "1.5rem", color: "#9ca3af", fontSize: "0.78rem" }}>
            SS Coaching Admin System
          </div>
        </div>
      </div>
    </>
  );
}

const labelStyle = { display: "block", fontSize: "0.83rem", fontWeight: 600, color: "#374151", marginBottom: 5 };
const inputStyle = { width: "100%", padding: "0.65rem 0.9rem", border: "1.5px solid #e5e7eb", borderRadius: 10, fontSize: "0.95rem", outline: "none", boxSizing: "border-box", color: "#0f1f3d", transition: "border-color 0.15s" };
