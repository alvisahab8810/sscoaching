import React, { useState } from "react";
import { MdLiveTv, MdMenuBook, MdEmojiEvents, MdEmail, MdLock, MdPerson, MdPhone } from "react-icons/md";
import { useRouter } from "next/router";
import Head from "next/head";

export default function StudentLogin() {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // "login" | "register"

  // login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // register fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regClass, setRegClass] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");

  /* ── LOGIN ── */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPassword }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("studentToken", data.token);
        localStorage.setItem("studentInfo", JSON.stringify({
          id: data.user._id,
          name: data.user.name,
          phone: data.user.phone,
          className: data.user.class,
          email: data.user.email,
          avatar: data.user.avatar,
        }));
        router.push("/student/dashboard");
      } else {
        setLoginError(data.message || "Invalid email or password");
      }
    } catch {
      setLoginError("Server error. Please try again.");
    }
    setLoginLoading(false);
  };

  /* ── REGISTER ── */
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegError("");
    if (regPassword.length < 6) {
      setRegError("Password must be at least 6 characters");
      return;
    }
    setRegLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName.trim(),
          email: regEmail.trim(),
          password: regPassword,
          phone: regPhone.trim(),
          class: regClass,
        }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("studentToken", data.token);
        localStorage.setItem("studentInfo", JSON.stringify({
          id: data.user._id,
          name: data.user.name,
          phone: data.user.phone,
          className: data.user.class,
          email: data.user.email,
          avatar: data.user.avatar,
        }));
        router.push("/student/dashboard");
      } else {
        setRegError(data.message || "Registration failed");
      }
    } catch {
      setRegError("Server error. Please try again.");
    }
    setRegLoading(false);
  };

  return (
    <>
      <Head>
        <title>Student Login — SS Coaching</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="sl-wrapper">
        {/* LEFT — Branding */}
        <div className="sl-left">
          <div className="sl-left-content">
            <div className="sl-logo">
              <div className="sl-logo-icon">SS</div>
              <div>
                <div className="sl-logo-name">SS Coaching</div>
                <div className="sl-logo-tag">Rise From Failure • Estd. 2001</div>
              </div>
            </div>

            <h1 className="sl-left-heading">
              Learn from the<br />
              <span className="sl-left-highlight">Best Teachers</span><br />
              Anytime, Anywhere
            </h1>

            <p className="sl-left-desc">
              Join thousands of students attending live classes, watching recordings and achieving their dreams.
            </p>

            <div className="sl-features">
              <div className="sl-feature-item">
                <span className="sl-feature-icon"><MdLiveTv size={18} /></span>
                <span>Live streaming classes</span>
              </div>
              <div className="sl-feature-item">
                <span className="sl-feature-icon"><MdMenuBook size={18} /></span>
                <span>All subjects covered</span>
              </div>
              <div className="sl-feature-item">
                <span className="sl-feature-icon"><MdEmojiEvents size={18} /></span>
                <span>Proven results</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Forms */}
        <div className="sl-right">
          <div className="sl-form-box">
            {/* Tab toggle */}
            <div className="sl-tabs">
              <button
                className={`sl-tab ${mode === "login" ? "sl-tab-active" : ""}`}
                onClick={() => { setMode("login"); setLoginError(""); setRegError(""); }}
              >
                Login
              </button>
              <button
                className={`sl-tab ${mode === "register" ? "sl-tab-active" : ""}`}
                onClick={() => { setMode("register"); setLoginError(""); setRegError(""); }}
              >
                Register
              </button>
            </div>

            {/* ── LOGIN FORM ── */}
            {mode === "login" && (
              <div className="sl-screen">
                <div className="sl-screen-icon">👋</div>
                <h2 className="sl-screen-title">Welcome Back!</h2>
                <p className="sl-screen-desc">Login to access your courses</p>

                <form onSubmit={handleLogin}>
                  <div className="sl-field">
                    <label className="sl-label">Email Address</label>
                    <div className="sl-input-wrap">
                      <MdEmail className="sl-input-icon" size={18} />
                      <input
                        type="email"
                        className="sl-input sl-input-icon-pad"
                        placeholder="you@email.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="sl-field">
                    <label className="sl-label">Password</label>
                    <div className="sl-input-wrap">
                      <MdLock className="sl-input-icon" size={18} />
                      <input
                        type="password"
                        className="sl-input sl-input-icon-pad"
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {loginError && <div className="sl-error">{loginError}</div>}

                  <button type="submit" className="sl-btn-primary" disabled={loginLoading}>
                    {loginLoading ? <span className="sl-spinner"></span> : "Login →"}
                  </button>
                </form>

                <p className="sl-bottom-note">
                  New student?{" "}
                  <button className="sl-change-btn" onClick={() => setMode("register")}>
                    Create account
                  </button>
                </p>
              </div>
            )}

            {/* ── REGISTER FORM ── */}
            {mode === "register" && (
              <div className="sl-screen">
                <div className="sl-screen-icon">🎓</div>
                <h2 className="sl-screen-title">Create Account</h2>
                <p className="sl-screen-desc">Join SS Coaching today</p>

                <form onSubmit={handleRegister}>
                  <div className="sl-field">
                    <label className="sl-label">Full Name <span className="sl-req">*</span></label>
                    <div className="sl-input-wrap">
                      <MdPerson className="sl-input-icon" size={18} />
                      <input
                        type="text"
                        className="sl-input sl-input-icon-pad"
                        placeholder="e.g. Rahul Sharma"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="sl-field">
                    <label className="sl-label">Email Address <span className="sl-req">*</span></label>
                    <div className="sl-input-wrap">
                      <MdEmail className="sl-input-icon" size={18} />
                      <input
                        type="email"
                        className="sl-input sl-input-icon-pad"
                        placeholder="you@email.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="sl-field">
                    <label className="sl-label">Password <span className="sl-req">*</span></label>
                    <div className="sl-input-wrap">
                      <MdLock className="sl-input-icon" size={18} />
                      <input
                        type="password"
                        className="sl-input sl-input-icon-pad"
                        placeholder="Min. 6 characters"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="sl-field">
                    <label className="sl-label">Phone (Optional)</label>
                    <div className="sl-input-wrap">
                      <MdPhone className="sl-input-icon" size={18} />
                      <input
                        type="tel"
                        className="sl-input sl-input-icon-pad"
                        placeholder="10-digit mobile number"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      />
                    </div>
                  </div>

                  <div className="sl-field">
                    <label className="sl-label">Your Class <span className="sl-req">*</span></label>
                    <select
                      className="sl-input sl-select"
                      value={regClass}
                      onChange={(e) => setRegClass(e.target.value)}
                      required
                    >
                      <option value="">Select your class</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                      <option value="NIOS Stream 1">NIOS Stream 1</option>
                      <option value="NIOS Stream 2">NIOS Stream 2</option>
                      <option value="Dropper Batch">Dropper Batch</option>
                    </select>
                  </div>

                  {regError && <div className="sl-error">{regError}</div>}

                  <button type="submit" className="sl-btn-primary" disabled={regLoading}>
                    {regLoading ? <span className="sl-spinner"></span> : "Create Account 🚀"}
                  </button>
                </form>

                <p className="sl-bottom-note">
                  Already have an account?{" "}
                  <button className="sl-change-btn" onClick={() => setMode("login")}>
                    Login here
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .sl-tabs {
          display: flex;
          border-bottom: 2px solid #f0f0f0;
          margin-bottom: 24px;
        }
        .sl-tab {
          flex: 1;
          padding: 12px;
          border: none;
          background: none;
          font-size: 15px;
          font-weight: 600;
          color: #9ca3af;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
          transition: color 0.2s;
        }
        .sl-tab-active {
          color: #6c47d4;
          border-bottom: 2px solid #6c47d4;
          margin-bottom: -2px;
        }
        .sl-input-wrap {
          position: relative;
        }
        .sl-input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }
        .sl-input-icon-pad {
          padding-left: 38px !important;
        }
      `}</style>
    </>
  );
}
