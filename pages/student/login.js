import React, { useState, useRef, useEffect } from "react";
import {
  MdLiveTv, MdMenuBook, MdEmojiEvents,
  MdEmail, MdLock, MdPerson, MdPhone,
  MdCheckCircle, MdArrowBack, MdRefresh,
} from "react-icons/md";
import { useRouter } from "next/router";
import Head from "next/head";

/* ─── 6-box OTP input ─── */
function OtpInput({ value, onChange }) {
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const digits = value.split("").concat(Array(6).fill("")).slice(0, 6);

  const handle = (i, e) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = char;
    onChange(next.join(""));
    if (char && i < 5) refs[i + 1].current?.focus();
  };
  const onKey = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs[i - 1].current?.focus();
  };
  const onPaste = (e) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(text.padEnd(6, "").slice(0, 6));
    refs[Math.min(text.length, 5)].current?.focus();
    e.preventDefault();
  };

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "20px 0" }}>
      {digits.map((d, i) => (
        <input key={i} ref={refs[i]} type="text" inputMode="numeric"
          maxLength={1} value={d}
          onChange={(e) => handle(i, e)}
          onKeyDown={(e) => onKey(i, e)}
          onPaste={onPaste}
          style={{
            width: 42, height: 50, textAlign: "center", fontSize: 22, fontWeight: 800,
            border: `2px solid ${d ? "#6c47d4" : "#e2e8f0"}`,
            borderRadius: 10, outline: "none", color: "#1e1b4b",
            background: d ? "#f0eeff" : "#fafafa",
            transition: "border-color 0.15s, background 0.15s",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Resend cooldown ─── */
function useCountdown(initial = 0) {
  const [count, setCount] = useState(initial);
  const ref = useRef(null);
  const start = (sec) => {
    setCount(sec);
    clearInterval(ref.current);
    ref.current = setInterval(() => setCount(p => { if (p <= 1) { clearInterval(ref.current); return 0; } return p - 1; }), 1000);
  };
  useEffect(() => () => clearInterval(ref.current), []);
  return [count, start];
}

export default function StudentLogin() {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // "login" | "register"

  /* ── LOGIN state ── */
  const [loginEmail, setLoginEmail] = useState(""); // holds email OR phone
  const [loginPass, setLoginPass]   = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  /* ── REGISTER state ── */
  const [regStep, setRegStep]   = useState(1); // 1=form 2=otp
  const [regName, setRegName]   = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass]   = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regClass, setRegClass] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");

  /* ── OTP state (phone OTP for registration) ── */
  const [otp, setOtp]           = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [cooldown, startCooldown] = useCountdown();

  const saveAndRedirect = (data) => {
    localStorage.setItem("studentToken", data.token);
    localStorage.setItem("studentInfo", JSON.stringify({
      id: data.user._id, name: data.user.name, phone: data.user.phone,
      className: data.user.class, email: data.user.email, avatar: data.user.avatar,
    }));
    router.push("/student/dashboard");
  };

  /* ── Login ── */
  const handleLogin = async (e) => {
    e.preventDefault(); setLoginError(""); setLoginLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail.trim(), password: loginPass }),
      });
      const data = await res.json();
      if (data.success) saveAndRedirect(data);
      else setLoginError(data.message || "Invalid email or password");
    } catch { setLoginError("Server error. Please try again."); }
    setLoginLoading(false);
  };

  /* ── Send register OTP (SMS to phone) ── */
  const handleSendOtp = async (e) => {
    e?.preventDefault(); setRegError(""); setRegLoading(true);
    try {
      const res = await fetch("/api/auth/send-register-phone-otp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: regName.trim(), email: regEmail.trim(), password: regPass, phone: regPhone, class: regClass }),
      });
      const data = await res.json();
      if (data.success) { setRegStep(2); setOtp(""); setOtpError(""); startCooldown(60); }
      else setRegError(data.message || "Failed to send OTP");
    } catch { setRegError("Server error. Please try again."); }
    setRegLoading(false);
  };

  /* ── Verify phone OTP ── */
  const handleVerifyOtp = async (e) => {
    e?.preventDefault(); setOtpError(""); setOtpLoading(true);
    try {
      const res = await fetch("/api/auth/verify-register-phone-otp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: regPhone, otp: otp.trim() }),
      });
      const data = await res.json();
      if (data.success) saveAndRedirect(data);
      else setOtpError(data.message || "Wrong OTP");
    } catch { setOtpError("Server error. Please try again."); }
    setOtpLoading(false);
  };

  const switchMode = (m) => {
    setMode(m); setLoginError(""); setRegError(""); setOtpError(""); setRegStep(1);
  };

  /* ─────────────── JSX ─────────────── */
  return (
    <>
      <Head>
        <title>Student Login — SS Coaching</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      </Head>

      <div className="sl-wrapper">

        {/* ── LEFT PANEL ── */}
        <div className="sl-left">
          <div className="sl-left-inner">
            <div className="sl-logo">
              <div className="sl-logo-icon">SS</div>
              <div>
                <div className="sl-logo-name">SS Coaching</div>
                <div className="sl-logo-tag">Rise From Failure • Estd. 2001</div>
              </div>
            </div>
            <h1 className="sl-heading">
              Learn from the<br/>
              <span className="sl-heading-hi">Best Teachers</span><br/>
              Anytime, Anywhere
            </h1>
            <p className="sl-desc">Join thousands of students attending live classes, watching recordings and achieving their dreams.</p>
            <div className="sl-features">
              {[
                [<MdLiveTv size={17}/>, "Live streaming classes"],
                [<MdMenuBook size={17}/>, "All subjects covered"],
                [<MdEmojiEvents size={17}/>, "Proven results"],
              ].map(([icon, text], i) => (
                <div key={i} className="sl-feat">
                  <span className="sl-feat-icon">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="sl-right">
          <div className="sl-card">

            {/* Mode tabs */}
            <div className="sl-tabs">
              <button className={`sl-tab ${mode==="login"?"sl-tab-on":""}`} onClick={() => switchMode("login")}>Login</button>
              <button className={`sl-tab ${mode==="register"?"sl-tab-on":""}`} onClick={() => switchMode("register")}>Register</button>
            </div>

            {/* ══════════════ LOGIN ══════════════ */}
            {mode === "login" && (
              <div className="sl-pane">
                <div className="sl-pane-head">
                  <div className="sl-pane-emoji">👋</div>
                  <div className="sl-pane-title">Welcome Back!</div>
                  <div className="sl-pane-sub">Login to access your courses</div>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="sl-field">
                    <label className="sl-label">Email or Phone</label>
                    <div className="sl-iw">
                      <MdEmail className="sl-ii" size={16}/>
                      <input type="text" className="sl-input" placeholder="Email or 10-digit phone"
                        value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required autoFocus/>
                    </div>
                  </div>
                  <div className="sl-field">
                    <label className="sl-label">Password</label>
                    <div className="sl-iw">
                      <MdLock className="sl-ii" size={16}/>
                      <input type="password" className="sl-input" placeholder="Your password"
                        value={loginPass} onChange={e => setLoginPass(e.target.value)} required/>
                    </div>
                  </div>
                  {loginError && <div className="sl-err">{loginError}</div>}
                  <button type="submit" className="sl-btn" disabled={loginLoading}>
                    {loginLoading ? <span className="sl-spin"/> : "Login →"}
                  </button>
                </form>
                <p className="sl-foot">New student? <button className="sl-link" onClick={() => switchMode("register")}>Create account</button></p>
              </div>
            )}

            {/* ══════════════ REGISTER ══════════════ */}
            {mode === "register" && (
              <div className="sl-pane">

                {/* STEP 1 — form */}
                {regStep === 1 && (
                  <>
                    <div className="sl-pane-head">
                      <div className="sl-pane-emoji">🎓</div>
                      <div className="sl-pane-title">Create Account</div>
                      <div className="sl-pane-sub">Join SS Coaching today</div>
                    </div>
                    <form onSubmit={handleSendOtp}>
                      {/* Row 1: Name + Class */}
                      <div className="sl-row">
                        <div className="sl-field">
                          <label className="sl-label">Full Name <span className="sl-req">*</span></label>
                          <div className="sl-iw">
                            <MdPerson className="sl-ii" size={16}/>
                            <input type="text" className="sl-input" placeholder="Rahul Sharma"
                              value={regName} onChange={e => setRegName(e.target.value)} required autoFocus/>
                          </div>
                        </div>
                        <div className="sl-field">
                          <label className="sl-label">Class <span className="sl-req">*</span></label>
                          <select className="sl-input sl-select" value={regClass} onChange={e => setRegClass(e.target.value)} required>
                            <option value="">Select class</option>
                            <option>Class 9</option><option>Class 10</option>
                            <option>Class 11</option><option>Class 12</option>
                            <option>NIOS Stream 1</option><option>NIOS Stream 2</option>
                            <option>Dropper Batch</option>
                          </select>
                        </div>
                      </div>
                      {/* Row 2: Phone + Email */}
                      <div className="sl-row">
                        <div className="sl-field">
                          <label className="sl-label">Phone <span className="sl-req">*</span></label>
                          <div className="sl-iw">
                            <MdPhone className="sl-ii" size={16}/>
                            <input type="tel" className="sl-input" placeholder="10-digit mobile"
                              value={regPhone} onChange={e => setRegPhone(e.target.value.replace(/\D/g,"").slice(0,10))}
                              required maxLength={10}/>
                          </div>
                        </div>
                        <div className="sl-field">
                          <label className="sl-label">Email <span className="sl-req">*</span></label>
                          <div className="sl-iw">
                            <MdEmail className="sl-ii" size={16}/>
                            <input type="email" className="sl-input" placeholder="you@example.com"
                              value={regEmail} onChange={e => setRegEmail(e.target.value)} required/>
                          </div>
                        </div>
                      </div>
                      {/* Password */}
                      <div className="sl-field">
                        <label className="sl-label">Password <span className="sl-req">*</span></label>
                        <div className="sl-iw">
                          <MdLock className="sl-ii" size={16}/>
                          <input type="password" className="sl-input" placeholder="Min. 6 characters"
                            value={regPass} onChange={e => setRegPass(e.target.value)} required minLength={6}/>
                        </div>
                      </div>
                      {regError && <div className="sl-err">{regError}</div>}
                      <button type="submit" className="sl-btn" disabled={regLoading}>
                        {regLoading ? <span className="sl-spin"/> : "Send OTP to Email →"}
                      </button>
                    </form>
                    <p className="sl-foot">Already registered? <button className="sl-link" onClick={() => switchMode("login")}>Login here</button></p>
                  </>
                )}

                {/* STEP 2 — OTP */}
                {regStep === 2 && (
                  <>
                    <div className="sl-pane-head">
                      <div className="sl-pane-emoji">📧</div>
                      <div className="sl-pane-title">Verify Your Email</div>
                      <div className="sl-pane-sub">
                        OTP sent to<br/>
                        <strong style={{ color: "#6c47d4" }}>{regEmail}</strong>
                      </div>
                    </div>
                    <form onSubmit={handleVerifyOtp}>
                      <OtpInput value={otp} onChange={setOtp}/>
                      {otpError && <div className="sl-err" style={{ textAlign: "center" }}>{otpError}</div>}
                      <button type="submit" className="sl-btn" disabled={otpLoading || otp.length < 6}>
                        {otpLoading ? <span className="sl-spin"/> : <><MdCheckCircle size={16}/> Verify & Create Account</>}
                      </button>
                    </form>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, gap: 8 }}>
                      <button className="sl-back-btn" onClick={() => { setRegStep(1); setOtp(""); setOtpError(""); }}>
                        <MdArrowBack size={14}/> Edit details
                      </button>
                      <button className="sl-resend-btn" onClick={handleSendOtp} disabled={cooldown > 0 || regLoading}>
                        <MdRefresh size={14}/>
                        {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; font-family: 'Outfit', sans-serif; }

        .sl-wrapper {
          display: flex; min-height: 100vh;
          background: #f4f5ff;
        }

        /* ── LEFT ── */
        .sl-left {
          flex: 1; background: linear-gradient(145deg, #0f1f3d 0%, #1b1870 60%, #2d1b8e 100%);
          display: flex; align-items: center; justify-content: center;
          padding: 48px 40px;
          position: relative; overflow: hidden;
        }
        .sl-left::before {
          content: ""; position: absolute; top: -80px; right: -80px;
          width: 320px; height: 320px; border-radius: 50%;
          background: rgba(108,71,212,0.18); pointer-events: none;
        }
        .sl-left::after {
          content: ""; position: absolute; bottom: -60px; left: -60px;
          width: 240px; height: 240px; border-radius: 50%;
          background: rgba(68,65,229,0.12); pointer-events: none;
        }
        .sl-left-inner { position: relative; z-index: 1; max-width: 380px; }
        .sl-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; }
        .sl-logo-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: linear-gradient(135deg, #4441e5, #6b68ff);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 900; color: #fff; flex-shrink: 0;
        }
        .sl-logo-name { font-size: 18px; font-weight: 800; color: #fff; }
        .sl-logo-tag  { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 1px; }
        .sl-heading { font-size: 2.1rem; font-weight: 900; color: #fff; line-height: 1.22; margin: 0 0 16px; }
        .sl-heading-hi { color: #a78bfa; }
        .sl-desc { font-size: 13.5px; color: rgba(255,255,255,0.55); line-height: 1.65; margin: 0 0 28px; }
        .sl-features { display: flex; flex-direction: column; gap: 10px; }
        .sl-feat { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.75); font-size: 13.5px; }
        .sl-feat-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }

        /* ── RIGHT ── */
        .sl-right {
          width: 460px; display: flex; align-items: center; justify-content: center;
          padding: 24px 20px; overflow-y: auto;
        }
        .sl-card {
          background: #fff; border-radius: 20px;
          box-shadow: 0 8px 40px rgba(68,65,229,0.1);
          width: 100%; max-width: 400px;
          overflow: hidden;
        }

        /* ── TABS ── */
        .sl-tabs { display: flex; border-bottom: 2px solid #f0f0f8; }
        .sl-tab {
          flex: 1; padding: 14px; border: none; background: none;
          font-size: 14px; font-weight: 700; color: #9ca3af;
          cursor: pointer; font-family: 'Outfit', sans-serif; transition: color 0.2s;
        }
        .sl-tab-on { color: #6c47d4; border-bottom: 2.5px solid #6c47d4; margin-bottom: -2px; }

        /* ── SUB TABS (login) ── */
        .sl-sub-tabs {
          display: flex; gap: 6px; margin-bottom: 18px;
          background: #f4f5ff; border-radius: 10px; padding: 4px;
        }
        .sl-sub-tab {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px;
          padding: 8px 10px; border: none; border-radius: 8px;
          font-size: 12.5px; font-weight: 700; color: #64748b;
          cursor: pointer; font-family: 'Outfit', sans-serif;
          background: transparent; transition: all 0.2s;
        }
        .sl-sub-on { background: #fff; color: #6c47d4; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }
        /* ── PANE ── */
        .sl-pane { padding: 20px 24px 24px; }
        .sl-pane-head { text-align: center; margin-bottom: 18px; }
        .sl-pane-emoji { font-size: 32px; margin-bottom: 6px; }
        .sl-pane-title { font-size: 19px; font-weight: 800; color: #0f1f3d; }
        .sl-pane-sub { font-size: 12.5px; color: #6b7a99; margin-top: 3px; line-height: 1.5; }

        /* ── FORM ── */
        .sl-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .sl-field { margin-bottom: 12px; }
        .sl-label { display: block; font-size: 11.5px; font-weight: 700; color: #4b5563; margin-bottom: 5px; }
        .sl-req { color: #ef4444; }
        .sl-iw { position: relative; }
        .sl-ii {
          position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
          color: #9ca3af; pointer-events: none;
        }
        .sl-input {
          width: 100%; height: 38px; padding: 0 10px 0 32px;
          border: 1.5px solid #e2e8f0; border-radius: 9px;
          font-size: 13px; font-family: 'Outfit', sans-serif; color: #1e1b4b;
          background: #fafafa; outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
        }
        .sl-input:focus { border-color: #6c47d4; box-shadow: 0 0 0 3px rgba(108,71,212,0.1); background: #fff; }
        .sl-select { padding-left: 10px !important; cursor: pointer; }

        /* ── BUTTON ── */
        .sl-btn {
          width: 100%; height: 42px; margin-top: 6px;
          background: linear-gradient(135deg, #4441e5, #6c47d4);
          color: #fff; border: none; border-radius: 10px;
          font-size: 14px; font-weight: 700; font-family: 'Outfit', sans-serif;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;
          transition: opacity 0.2s, transform 0.15s;
        }
        .sl-btn:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
        .sl-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

        /* ── ERROR ── */
        .sl-err {
          background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c;
          border-radius: 8px; padding: 8px 12px; font-size: 12.5px; font-weight: 600; margin-bottom: 10px;
        }

        /* ── FOOTER LINKS ── */
        .sl-foot { text-align: center; font-size: 12.5px; color: #6b7a99; margin-top: 14px; }
        .sl-link {
          background: none; border: none; color: #6c47d4; font-weight: 700;
          cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 12.5px;
        }
        .sl-link:hover { text-decoration: underline; }

        /* ── SPINNER ── */
        .sl-spin {
          width: 18px; height: 18px; border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff; border-radius: 50%; animation: sl-rot 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes sl-rot { to { transform: rotate(360deg); } }

        /* ── Back / Resend ── */
        .sl-back-btn, .sl-resend-btn {
          display: flex; align-items: center; gap: 5px;
          background: none; border: none; cursor: pointer;
          font-family: 'Outfit', sans-serif; font-size: 12.5px; font-weight: 700;
          padding: 6px 10px; border-radius: 7px; transition: background 0.15s;
        }
        .sl-back-btn   { color: #6b7a99; }
        .sl-back-btn:hover   { background: #f1f5f9; }
        .sl-resend-btn { color: #6c47d4; }
        .sl-resend-btn:hover:not(:disabled) { background: #f0eeff; }
        .sl-resend-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .sl-left { display: none; }
          .sl-right { width: 100%; padding: 16px; }
          .sl-card { max-width: 100%; }
          .sl-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
