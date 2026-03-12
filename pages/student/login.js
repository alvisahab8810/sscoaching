import React, { useState, useEffect, useRef } from "react";
import { MdLiveTv, MdMenuBook, MdEmojiEvents } from "react-icons/md";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

export default function StudentLogin() {
  const router = useRouter();

  // screen: "phone" | "otp" | "profile"
  const [screen, setScreen] = useState("phone");

  // phone screen
  const [phone, setPhone] = useState("");
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // otp screen
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpRefs = useRef([]);

  // profile screen
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [batch, setBatch] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");

  // token stored after OTP verify
  const [token, setToken] = useState("");

  /* ================= TIMER ================= */
  useEffect(() => {
    if (screen === "otp") {
      setTimer(30);
      setCanResend(false);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [screen]);

  /* ================= SEND OTP ================= */
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setPhoneError("");

    if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number");
      return;
    }

    setPhoneLoading(true);
    try {
      const res = await fetch("/api/student/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setScreen("otp");
      } else {
        setPhoneError(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setPhoneError("Server error. Please try again.");
    }
    setPhoneLoading(false);
  };

  /* ================= OTP INPUT HANDLING ================= */
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      otpRefs.current[5]?.focus();
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setOtpError("");

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP");
      return;
    }

    setOtpLoading(true);
    try {
      const res = await fetch("/api/student/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp: otpString }),
      });
      const data = await res.json();

      if (data.success) {
        setToken(data.token);
        // Save token to localStorage
        localStorage.setItem("studentToken", data.token);
        localStorage.setItem("studentInfo", JSON.stringify(data.student));

        if (data.isNewUser || !data.isProfileComplete) {
          setScreen("profile");
        } else {
          router.push("/student/dashboard");
        }
      } else {
        setOtpError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setOtpError("Server error. Please try again.");
    }
    setOtpLoading(false);
  };

  /* ================= RESEND OTP ================= */
  const handleResend = async () => {
    setOtp(["", "", "", "", "", ""]);
    setOtpError("");
    setCanResend(false);

    try {
      await fetch("/api/student/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      setTimer(30);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {}
  };

  /* ================= COMPLETE PROFILE ================= */
  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    setProfileError("");

    if (!name.trim() || !className) {
      setProfileError("Please fill your name and class");
      return;
    }

    setProfileLoading(true);
    try {
      const res = await fetch("/api/student/complete-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, className, batch }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("studentInfo", JSON.stringify(data.student));
        router.push("/student/dashboard");
      } else {
        setProfileError(data.message || "Failed to save profile");
      }
    } catch (err) {
      setProfileError("Server error. Please try again.");
    }
    setProfileLoading(false);
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
        {/* LEFT SIDE — Branding */}
        <div className="sl-left">
          <div className="sl-left-content">
            
              <div className="sl-logo">
                <div className="sl-logo-icon">SS</div>
                <div>
                  <div className="sl-logo-name">SS Coaching</div>
                  <div className="sl-logo-tag">
                    Rise From Failure • Estd. 2001
                  </div>
                </div>
              </div>

            <h1 className="sl-left-heading">
              Learn from the
              <br />
              <span className="sl-left-highlight">Best Teachers</span>
              <br />
              Anytime, Anywhere
            </h1>

            <p className="sl-left-desc">
              Join thousands of students attending live classes, watching
              recordings and achieving their dreams.
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

        {/* RIGHT SIDE — Auth Forms */}
        <div className="sl-right">
          <div className="sl-form-box">
            {/* ===== SCREEN 1: PHONE ===== */}
            {screen === "phone" && (
              <div className="sl-screen">
                <div className="sl-screen-icon">📱</div>
                <h2 className="sl-screen-title">Welcome Back!</h2>
                <p className="sl-screen-desc">
                  Enter your mobile number to receive an OTP
                </p>

                <form onSubmit={handleSendOtp}>
                  <div className="sl-field">
                    <label className="sl-label">Mobile Number</label>
                    <div className="sl-phone-wrap">
                      <span className="sl-phone-code">+91</span>
                      <input
                        type="tel"
                        className="sl-input sl-phone-input"
                        placeholder="Enter 10-digit number"
                        value={phone}
                        onChange={(e) =>
                          setPhone(
                            e.target.value.replace(/\D/g, "").slice(0, 10),
                          )
                        }
                        maxLength={10}
                        required
                        autoFocus
                      />
                    </div>
                    {phoneError && <div className="sl-error">{phoneError}</div>}
                  </div>

                  <button
                    type="submit"
                    className="sl-btn-primary"
                    disabled={phoneLoading}
                  >
                    {phoneLoading ? (
                      <span className="sl-spinner"></span>
                    ) : (
                      "Send OTP →"
                    )}
                  </button>
                </form>

                <p className="sl-bottom-note">
                  New student? Just enter your number — we'll set up your
                  account automatically.
                </p>
              </div>
            )}

            {/* ===== SCREEN 2: OTP ===== */}
            {screen === "otp" && (
              <div className="sl-screen">
                <div className="sl-screen-icon">🔐</div>
                <h2 className="sl-screen-title">Enter OTP</h2>
                <p className="sl-screen-desc">
                  We sent a 6-digit OTP to <strong>+91 {phone}</strong>{" "}
                  <button
                    className="sl-change-btn"
                    onClick={() => {
                      setScreen("phone");
                      setOtp(["", "", "", "", "", ""]);
                    }}
                  >
                    Change
                  </button>
                </p>

                <form onSubmit={handleVerifyOtp}>
                  <div className="sl-otp-row" onPaste={handleOtpPaste}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => (otpRefs.current[i] = el)}
                        type="tel"
                        className={`sl-otp-box ${digit ? "sl-otp-filled" : ""}`}
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        autoFocus={i === 0}
                      />
                    ))}
                  </div>

                  {otpError && <div className="sl-error">{otpError}</div>}

                  <button
                    type="submit"
                    className="sl-btn-primary"
                    disabled={otpLoading}
                  >
                    {otpLoading ? (
                      <span className="sl-spinner"></span>
                    ) : (
                      "Verify OTP ✓"
                    )}
                  </button>
                </form>

                <div className="sl-resend-row">
                  {canResend ? (
                    <button className="sl-resend-btn" onClick={handleResend}>
                      Resend OTP
                    </button>
                  ) : (
                    <span className="sl-timer">
                      Resend OTP in <strong>{timer}s</strong>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* ===== SCREEN 3: COMPLETE PROFILE ===== */}
            {screen === "profile" && (
              <div className="sl-screen">
                <div className="sl-screen-icon">👋</div>
                <h2 className="sl-screen-title">Almost There!</h2>
                <p className="sl-screen-desc">
                  Tell us a bit about yourself to get started
                </p>

                <form onSubmit={handleCompleteProfile}>
                  <div className="sl-field">
                    <label className="sl-label">
                      Your Full Name <span className="sl-req">*</span>
                    </label>
                    <input
                      type="text"
                      className="sl-input"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <div className="sl-field">
                    <label className="sl-label">
                      Your Class <span className="sl-req">*</span>
                    </label>
                    <select
                      className="sl-input sl-select"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
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

                  <div className="sl-field">
                    <label className="sl-label">Batch (Optional)</label>
                    <input
                      type="text"
                      className="sl-input"
                      placeholder="e.g. Morning Batch / Evening Batch"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                    />
                  </div>

                  {profileError && (
                    <div className="sl-error">{profileError}</div>
                  )}

                  <button
                    type="submit"
                    className="sl-btn-primary"
                    disabled={profileLoading}
                  >
                    {profileLoading ? (
                      <span className="sl-spinner"></span>
                    ) : (
                      "Go to Dashboard 🚀"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
