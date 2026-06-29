// pages/student/checkout.jsx
// Full checkout page:
// - Shows cart summary
// - Student fills billing info
// - Two payment options: COD (working) | Online Payment (coming soon)
// - On COD submit: enrolls, creates invoice, sends email
// - Shows success screen with invoice number

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import {
  MdArrowBack, MdCheckCircle, MdPerson, MdPhone, MdEmail,
  MdLocationOn, MdLocalOffer, MdLock, MdShoppingCart,
  MdPayment, MdReceiptLong, MdClose, MdWarning,
  MdFolder, MdVideoLibrary,
} from "react-icons/md";
import { FaRupeeSign, FaMoneyBillWave, FaCreditCard, FaWhatsapp } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";

/* ─── helpers ─── */
function fmt(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(n || 0);
}

const subjectColors = {
  Mathematics: "#6c47d4", Physics: "#0ea5e9", Chemistry: "#f59e0b",
  Biology: "#10b981", English: "#f43f5e", Hindi: "#8b5cf6",
  "Social Science": "#64748b", "Computer Science": "#06b6d4",
};
const subjectIcons = {
  Mathematics: "📐", Physics: "⚛️", Chemistry: "🧪",
  Biology: "🧬", English: "📖", Hindi: "🪔",
  "Social Science": "🌍", "Computer Science": "💻",
};
const getColor = (s) => subjectColors[s] || "#6c47d4";

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
  "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Delhi","Jammu & Kashmir","Ladakh","Chandigarh","Puducherry",
];

/* ════════════════════════════════════════
   MAIN CHECKOUT PAGE
════════════════════════════════════════ */
export default function CheckoutPage() {
  const router = useRouter();

  /* cart comes from localStorage (set by CartDrawer before navigating here) */
  const [cart, setCart]       = useState([]);
  const [student, setStudent] = useState(null);

  /* form */
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "",
    address: "", city: "", state: "Uttar Pradesh", pincode: "",
    notes: "",
  });
  const [errors, setErrors]     = useState({});
  const [payMethod, setPayMethod] = useState("cod"); // "cod" | "online"

  /* UI states */
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(null); // { invoiceNumber, emailSent }
  const [globalError, setGlobalError] = useState("");

  /* Load cart + student from localStorage */
  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    const info  = localStorage.getItem("studentInfo");
    if (!token || !info) { router.push("/student/login"); return; }

    const studentInfo = JSON.parse(info);
    setStudent(studentInfo);

    // Pre-fill: saved billing info first, then fallback to student profile
    const savedBilling = JSON.parse(localStorage.getItem("ss_billing_info") || "{}");
    setForm((f) => ({
      ...f,
      fullName: savedBilling.fullName || studentInfo.name  || "",
      phone:    savedBilling.phone    || studentInfo.phone || "",
      email:    savedBilling.email    || studentInfo.email || "",
      address:  savedBilling.address  || "",
      city:     savedBilling.city     || "",
      state:    savedBilling.state    || "Uttar Pradesh",
      pincode:  savedBilling.pincode  || "",
      notes:    "",
    }));

    // Load cart from localStorage (CartDrawer saves it before navigating)
    try {
      const saved = localStorage.getItem("ss_checkout_cart");
      if (saved) setCart(JSON.parse(saved));
      else router.push("/student/dashboard"); // no cart = go back
    } catch { router.push("/student/dashboard"); }
  }, []);

  /* ── Amounts ── */
  const subtotal = cart.reduce((a, c) => a + (c.isFree ? 0 : Number(c.price || 0)), 0);
  const total    = subtotal; // no discount on checkout page (coupon was in cart drawer)

  /* ── Validation ── */
  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.phone.trim() || !/^[0-9]{10}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Valid 10-digit phone number required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email address required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim())    e.city    = "City is required";
    if (!form.pincode.trim() || !/^[0-9]{6}$/.test(form.pincode))
      e.pincode = "Valid 6-digit pincode required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  /* ── COD Submit ── */
  async function handleCODSubmit() {
    if (!validate()) return;
    setGlobalError("");
    setSubmitting(true);

    const token = localStorage.getItem("studentToken");

    // Enroll each course in cart one by one
    const results = [];
    for (const course of cart) {
      if (course.isFree) {
        // Free course — use regular enroll endpoint
        try {
          const res  = await fetch("/api/courses/enroll", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ courseId: course._id }),
          });
          const data = await res.json();
          results.push({ course, success: data.success, error: data.error });
        } catch { results.push({ course, success: false, error: "Network error" }); }
      } else {
        // Paid course — COD enrollment
        try {
          const res  = await fetch("/api/courses/cod-enroll", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({
              courseId:  course._id,
              fullName:  form.fullName,
              phone:     form.phone,
              email:     form.email,
              address:   form.address,
              city:      form.city,
              state:     form.state,
              pincode:   form.pincode,
              notes:     form.notes,
            }),
          });
          const data = await res.json();
          results.push({ course, success: data.success, invoiceNumber: data.invoiceNumber, emailSent: data.emailSent, error: data.error });
        } catch { results.push({ course, success: false, error: "Network error" }); }
      }
    }

    setSubmitting(false);

    const allOk    = results.every((r) => r.success);
    const anyOk    = results.some((r) => r.success);
    const invoices = results.filter((r) => r.invoiceNumber).map((r) => r.invoiceNumber);
    const emailSent = results.some((r) => r.emailSent);

    if (anyOk) {
      // Save billing details for next time
      localStorage.setItem("ss_billing_info", JSON.stringify({
        fullName: form.fullName,
        phone:    form.phone,
        email:    form.email,
        address:  form.address,
        city:     form.city,
        state:    form.state,
        pincode:  form.pincode,
      }));
      // Clear cart from localStorage
      localStorage.removeItem("ss_checkout_cart");
      setSuccess({ invoiceNumbers: invoices, emailSent, total, form });
    } else {
      const firstError = results.find((r) => r.error)?.error;
      setGlobalError(firstError || "Enrollment failed. Please try again.");
    }
  }

  /* ── Online payment (coming soon) ── */
  function handleOnlineSubmit() {
    // TODO: Integrate Razorpay here when payment gateway is ready.
    // The form data (form.*) is already collected and validated.
    // Steps:
    //   1. Call /api/courses/payment to create Razorpay order
    //   2. Open Razorpay checkout
    //   3. On success, call /api/courses/verify-payment (existing)
    //   4. verify-payment.js already auto-generates invoice + sends email
    alert("Online payment coming soon! Please use Cash on Delivery for now.");
  }

  /* ── Success screen ── */
  if (success) {
    return <SuccessScreen success={success} />;
  }

  /* ── Empty cart guard ── */
  if (cart.length === 0) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f5ff" }}>
        <div style={{ textAlign: "center" }}>
          <MdShoppingCart size={52} color="#c8ccef" />
          <div style={{ fontSize: "1rem", fontWeight: 800, color: "#0f1f3d", margin: "12px 0 6px" }}>Cart is empty</div>
          <Link href="/student/dashboard" style={{ color: "#6c47d4", fontWeight: 700, fontSize: "0.9rem" }}>← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout — SS Coaching</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="co-page">

        {/* ── Top bar ── */}
        <div className="co-topbar">
          <div className="co-topbar-inner">
            <button className="co-back-btn" onClick={() => router.back()}>
              <MdArrowBack size={18} /> Back
            </button>
            <div className="co-topbar-brand">
              <div className="co-logo">SS</div>
              <span>SS Coaching — Checkout</span>
            </div>
            <div className="co-topbar-secure">
              <MdLock size={14} /> Secure
            </div>
          </div>
        </div>

        <div className="co-body">

          {/* ══════════════════════════════
              LEFT — Billing form
          ══════════════════════════════ */}
          <div className="co-left">

            {/* Step 1: Billing info */}
            <div className="co-card">
              <div className="co-card-title">
                <span className="co-step">1</span> Billing Information
              </div>

              <div className="co-form-grid">
                {/* Full name */}
                <div className="co-field co-field-full">
                  <label className="co-label"><MdPerson size={13} /> Full Name <span className="co-req">*</span></label>
                  <input
                    className={`co-input ${errors.fullName ? "co-input-err" : ""}`}
                    placeholder="e.g. Rahul Kumar"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  />
                  {errors.fullName && <div className="co-err">{errors.fullName}</div>}
                </div>

                {/* Phone */}
                <div className="co-field">
                  <label className="co-label"><MdPhone size={13} /> Phone Number <span className="co-req">*</span></label>
                  <div className="co-phone-wrap">
                    <span className="co-phone-prefix">+91</span>
                    <input
                      className={`co-input co-input-phone ${errors.phone ? "co-input-err" : ""}`}
                      placeholder="10-digit mobile"
                      value={form.phone}
                      maxLength={10}
                      onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                    />
                  </div>
                  {errors.phone && <div className="co-err">{errors.phone}</div>}
                </div>

                {/* Email */}
                <div className="co-field">
                  <label className="co-label"><MdEmail size={13} /> Email Address <span className="co-req">*</span></label>
                  <input
                    className={`co-input ${errors.email ? "co-input-err" : ""}`}
                    placeholder="invoice will be sent here"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  {errors.email && <div className="co-err">{errors.email}</div>}
                </div>

                {/* Address */}
                <div className="co-field co-field-full">
                  <label className="co-label"><MdLocationOn size={13} /> Address <span className="co-req">*</span></label>
                  <input
                    className={`co-input ${errors.address ? "co-input-err" : ""}`}
                    placeholder="House/Flat no., Street, Area"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                  {errors.address && <div className="co-err">{errors.address}</div>}
                </div>

                {/* City */}
                <div className="co-field">
                  <label className="co-label">City <span className="co-req">*</span></label>
                  <input
                    className={`co-input ${errors.city ? "co-input-err" : ""}`}
                    placeholder="e.g. Lucknow"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                  {errors.city && <div className="co-err">{errors.city}</div>}
                </div>

                {/* State */}
                <div className="co-field">
                  <label className="co-label">State</label>
                  <select
                    className="co-input"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                  >
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Pincode */}
                <div className="co-field">
                  <label className="co-label">Pincode <span className="co-req">*</span></label>
                  <input
                    className={`co-input ${errors.pincode ? "co-input-err" : ""}`}
                    placeholder="6-digit pincode"
                    value={form.pincode}
                    maxLength={6}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })}
                  />
                  {errors.pincode && <div className="co-err">{errors.pincode}</div>}
                </div>

                {/* Notes */}
                <div className="co-field co-field-full">
                  <label className="co-label">Notes <span className="co-optional">(optional)</span></label>
                  <textarea
                    className="co-input co-textarea"
                    placeholder="Any special instructions for the coaching center..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment method */}
            <div className="co-card">
              <div className="co-card-title">
                <span className="co-step">2</span> Payment Method
              </div>

              <div className="co-pay-options">

                {/* COD */}
                <div
                  className={`co-pay-opt ${payMethod === "cod" ? "co-pay-opt-active" : ""}`}
                  onClick={() => setPayMethod("cod")}
                >
                  <div className="co-pay-opt-radio">
                    <div className="co-radio-outer">
                      {payMethod === "cod" && <div className="co-radio-inner" />}
                    </div>
                  </div>
                  <div className="co-pay-opt-icon co-pay-opt-icon-cod">
                    <FaMoneyBillWave size={20} />
                  </div>
                  <div className="co-pay-opt-body">
                    <div className="co-pay-opt-title">Cash on Delivery</div>
                    <div className="co-pay-opt-sub">Pay cash when you visit our coaching center. Invoice emailed instantly.</div>
                  </div>
                  <div className="co-pay-available">Available</div>
                </div>

                {/* Online */}
                <div
                  className={`co-pay-opt co-pay-opt-disabled ${payMethod === "online" ? "co-pay-opt-active" : ""}`}
                  onClick={() => setPayMethod("online")}
                >
                  <div className="co-pay-opt-radio">
                    <div className="co-radio-outer">
                      {payMethod === "online" && <div className="co-radio-inner" />}
                    </div>
                  </div>
                  <div className="co-pay-opt-icon co-pay-opt-icon-online">
                    <FaCreditCard size={20} />
                  </div>
                  <div className="co-pay-opt-body">
                    <div className="co-pay-opt-title">
                      Online Payment
                      <span className="co-soon-badge">Coming Soon</span>
                    </div>
                    <div className="co-pay-opt-sub">UPI, Cards, Net Banking via Razorpay — launching soon!</div>
                  </div>
                </div>

              </div>

              {/* COD info box */}
              {payMethod === "cod" && (
                <div className="co-cod-info">
                  <div className="co-cod-info-icon">💡</div>
                  <div className="co-cod-info-text">
                    <strong>How COD works:</strong> Your enrollment is confirmed immediately. Pay the amount
                    (<strong>{fmt(total)}</strong>) when you visit our center. An invoice will be sent to
                    <strong> {form.email || "your email"}</strong> right away for your records.
                  </div>
                </div>
              )}

              {/* Online info box */}
              {payMethod === "online" && (
                <div className="co-online-info">
                  <div className="co-cod-info-icon">🚀</div>
                  <div className="co-cod-info-text">
                    Online payment via Razorpay is coming soon! For now, please use Cash on Delivery.
                  </div>
                </div>
              )}
            </div>

            {/* Global error */}
            {globalError && (
              <div className="co-global-err">
                <MdWarning size={17} /> {globalError}
              </div>
            )}

            {/* Submit button */}
            <button
              className="co-submit-btn"
              onClick={payMethod === "cod" ? handleCODSubmit : handleOnlineSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <><div className="co-btn-spinner" /> Processing...</>
              ) : payMethod === "cod" ? (
                <><MdReceiptLong size={19} /> Confirm Order & Get Invoice</>
              ) : (
                <><MdLock size={16} /> Proceed to Pay {fmt(total)}</>
              )}
            </button>

            <p className="co-submit-note">
              <MdLock size={12} /> Your information is secure and will only be used for enrollment purposes.
            </p>

          </div>

          {/* ══════════════════════════════
              RIGHT — Order summary
          ══════════════════════════════ */}
          <div className="co-right">
            <div className="co-summary-card">
              <div className="co-summary-title">
                <MdShoppingCart size={17} /> Order Summary
                <span className="co-summary-count">{cart.length} item{cart.length !== 1 ? "s" : ""}</span>
              </div>

              {/* Cart items */}
              <div className="co-items">
                {cart.map((course) => {
                  const totalLessons = course.chapters?.reduce((a, c) => a + c.lessons.length, 0) || 0;
                  return (
                    <div key={course._id} className="co-item">
                      <div
                        className="co-item-thumb"
                        style={{
                          background: course.featureImage
                            ? `url(${course.featureImage}) center/cover no-repeat`
                            : `linear-gradient(135deg,${getColor(course.subject)}22,${getColor(course.subject)}55)`,
                        }}
                      >
                        {!course.featureImage && (
                          <span>{subjectIcons[course.subject] || "📚"}</span>
                        )}
                      </div>
                      <div className="co-item-info">
                        <div className="co-item-title">{course.title}</div>
                        <div className="co-item-sub" style={{ color: getColor(course.subject) }}>
                          {subjectIcons[course.subject]} {course.subject} • {course.batch}
                        </div>
                        <div className="co-item-meta">
                          <span><MdFolder size={11} /> {course.chapters?.length || 0} Ch</span>
                          <span><MdVideoLibrary size={11} /> {totalLessons} Lessons</span>
                        </div>
                      </div>
                      <div className="co-item-price">
                        {course.isFree
                          ? <span className="co-free-tag">FREE</span>
                          : <span>₹{Number(course.price || 0).toLocaleString("en-IN")}</span>
                        }
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="co-totals">
                <div className="co-total-row"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                <div className="co-total-divider" />
                <div className="co-total-row co-total-final">
                  <span>Total</span>
                  <span>{fmt(total)}</span>
                </div>
              </div>

              {/* Invoice note */}
              <div className="co-invoice-note">
                <MdReceiptLong size={14} />
                Invoice PDF will be sent to your email after order confirmation.
              </div>

            </div>

            {/* Contact help */}
            <div className="co-help-card">
              <div className="co-help-title">Need help?</div>
              <a href="tel:+91XXXXXXXXXX" className="co-help-link">
                <MdPhone size={14} /> Call us
              </a>
              <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" className="co-help-link co-help-wa">
                <FaWhatsapp size={14} /> WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .co-page { min-height:100vh; background:#f4f5ff; font-family:inherit; }

        /* Topbar */
        .co-topbar { background:#fff; border-bottom:1.5px solid #e2e5f8; position:sticky; top:0; z-index:100; }
        .co-topbar-inner { max-width:1100px; margin:0 auto; padding:0 24px; height:56px; display:flex; align-items:center; justify-content:space-between; }
        .co-back-btn { display:flex; align-items:center; gap:6px; background:none; border:none; color:#6c47d4; font-size:0.85rem; font-weight:700; cursor:pointer; padding:6px 10px; border-radius:7px; }
        .co-back-btn:hover { background:#ede9fe; }
        .co-topbar-brand { display:flex; align-items:center; gap:9px; font-size:0.9rem; font-weight:700; color:#0f1f3d; }
        .co-logo { width:32px; height:32px; background:linear-gradient(135deg,#6c47d4,#8b5cf6); border-radius:8px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:13px; font-weight:900; }
        .co-topbar-secure { display:flex; align-items:center; gap:5px; font-size:0.75rem; font-weight:700; color:#10b981; }

        /* Body */
        .co-body { max-width:1100px; margin:0 auto; padding:32px 24px 64px; display:grid; grid-template-columns:1fr 380px; gap:28px; align-items:start; }

        /* Cards */
        .co-card { background:#fff; border:1.5px solid #e2e5f8; border-radius:14px; padding:24px; margin-bottom:18px; box-shadow:0 1px 8px rgba(108,71,212,0.05); }
        .co-card-title { font-size:0.95rem; font-weight:800; color:#0f1f3d; margin-bottom:20px; display:flex; align-items:center; gap:10px; }
        .co-step { width:26px; height:26px; background:linear-gradient(135deg,#6c47d4,#8b5cf6); border-radius:50%; color:#fff; font-size:0.78rem; font-weight:900; display:flex; align-items:center; justify-content:center; flex-shrink:0; }

        /* Form */
        .co-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .co-field { display:flex; flex-direction:column; gap:5px; }
        .co-field-full { grid-column:1/-1; }
        .co-label { font-size:0.75rem; font-weight:700; color:#374151; display:flex; align-items:center; gap:4px; }
        .co-req { color:#ef4444; }
        .co-optional { color:#9ca3af; font-weight:400; }
        .co-input {
          padding:10px 12px; border:1.5px solid #e2e5f8; border-radius:8px;
          font-size:0.85rem; font-family:inherit; color:#0f1f3d;
          outline:none; transition:border-color 0.14s;
          background:#fff;
        }
        .co-input:focus { border-color:#6c47d4; box-shadow:0 0 0 3px rgba(108,71,212,0.08); }
        .co-input-err { border-color:#ef4444 !important; }
        .co-textarea { min-height:72px; resize:vertical; }
        .co-err { font-size:0.72rem; color:#ef4444; font-weight:600; }
        .co-phone-wrap { display:flex; }
        .co-phone-prefix { padding:10px 10px; background:#f4f5ff; border:1.5px solid #e2e5f8; border-right:none; border-radius:8px 0 0 8px; font-size:0.85rem; color:#6b7a99; font-weight:600; white-space:nowrap; }
        .co-input-phone { border-radius:0 8px 8px 0 !important; }

        /* Payment options */
        .co-pay-options { display:flex; flex-direction:column; gap:10px; margin-bottom:14px; }
        .co-pay-opt {
          display:flex; align-items:center; gap:12px;
          padding:14px 16px; border:2px solid #e2e5f8; border-radius:12px;
          cursor:pointer; transition:border-color 0.14s, background 0.14s;
        }
        .co-pay-opt:hover:not(.co-pay-opt-disabled) { border-color:#6c47d4; background:#faf8ff; }
        .co-pay-opt-active { border-color:#6c47d4 !important; background:#faf8ff !important; }
        .co-pay-opt-disabled { opacity:0.6; cursor:not-allowed; }

        .co-radio-outer { width:18px; height:18px; border:2px solid #c4b5fd; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .co-pay-opt-active .co-radio-outer { border-color:#6c47d4; }
        .co-radio-inner { width:8px; height:8px; background:#6c47d4; border-radius:50%; }

        .co-pay-opt-icon { width:44px; height:44px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .co-pay-opt-icon-cod    { background:#d1fae5; color:#10b981; }
        .co-pay-opt-icon-online { background:#ede9fe; color:#6c47d4; }

        .co-pay-opt-title { font-size:0.88rem; font-weight:800; color:#0f1f3d; display:flex; align-items:center; gap:8px; }
        .co-pay-opt-sub   { font-size:0.75rem; color:#8491a8; margin-top:2px; }

        .co-pay-available { font-size:0.68rem; font-weight:800; background:#d1fae5; color:#065f46; padding:3px 9px; border-radius:100px; white-space:nowrap; margin-left:auto; }
        .co-soon-badge    { font-size:0.65rem; font-weight:800; background:#fef3c7; color:#92400e; padding:2px 7px; border-radius:100px; }

        /* Info boxes */
        .co-cod-info, .co-online-info {
          display:flex; gap:10px; background:#f0fdf4; border:1.5px solid #bbf7d0;
          border-radius:10px; padding:12px 14px; margin-top:4px;
        }
        .co-online-info { background:#faf8ff; border-color:#ddd6fe; }
        .co-cod-info-icon { font-size:1.1rem; flex-shrink:0; margin-top:1px; }
        .co-cod-info-text { font-size:0.8rem; color:#374151; line-height:1.55; }

        /* Global error */
        .co-global-err { display:flex; align-items:center; gap:8px; background:#fee2e2; border:1.5px solid #fca5a5; border-radius:9px; padding:12px 14px; color:#991b1b; font-size:0.82rem; font-weight:600; margin-bottom:14px; }

        /* Submit */
        .co-submit-btn {
          width:100%; padding:15px; border:none;
          background:linear-gradient(135deg,#6c47d4,#8b5cf6);
          color:#fff; font-size:1rem; font-weight:800; border-radius:12px;
          cursor:pointer; display:flex; align-items:center; justify-content:center; gap:9px;
          transition:opacity 0.14s, transform 0.14s;
          box-shadow:0 4px 18px rgba(108,71,212,0.3);
        }
        .co-submit-btn:hover:not(:disabled) { opacity:0.92; transform:translateY(-1px); }
        .co-submit-btn:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
        .co-btn-spinner { width:18px; height:18px; border:2px solid rgba(255,255,255,0.4); border-top-color:#fff; border-radius:50%; animation:cospin 0.7s linear infinite; }
        @keyframes cospin { to { transform:rotate(360deg); } }
        .co-submit-note { font-size:0.72rem; color:#9ca3af; text-align:center; margin-top:10px; display:flex; align-items:center; justify-content:center; gap:4px; }

        /* ── RIGHT: Summary ── */
        .co-summary-card { background:#fff; border:1.5px solid #e2e5f8; border-radius:14px; padding:20px; box-shadow:0 1px 8px rgba(108,71,212,0.05); margin-bottom:14px; }
        .co-summary-title { font-size:0.88rem; font-weight:800; color:#0f1f3d; display:flex; align-items:center; gap:7px; margin-bottom:16px; }
        .co-summary-count { margin-left:auto; font-size:0.72rem; font-weight:700; background:#ede9fe; color:#6c47d4; padding:2px 9px; border-radius:100px; }

        /* Items */
        .co-items { display:flex; flex-direction:column; gap:12px; margin-bottom:16px; }
        .co-item  { display:flex; align-items:flex-start; gap:10px; }
        .co-item-thumb {
          width:52px; height:44px; border-radius:8px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          font-size:1.2rem; overflow:hidden;
        }
        .co-item-info  { flex:1; min-width:0; }
        .co-item-title { font-size:0.82rem; font-weight:700; color:#0f1f3d; line-height:1.3; }
        .co-item-sub   { font-size:0.7rem; font-weight:600; margin-top:2px; }
        .co-item-meta  { display:flex; gap:7px; margin-top:4px; font-size:0.68rem; color:#8491a8; }
        .co-item-price { font-size:0.88rem; font-weight:800; color:#0f1f3d; white-space:nowrap; }
        .co-free-tag   { color:#10b981; font-weight:800; font-size:0.78rem; }

        /* Totals */
        .co-totals { padding-top:12px; border-top:1.5px solid #f0f1fa; }
        .co-total-row { display:flex; justify-content:space-between; font-size:0.83rem; color:#6b7a99; padding:4px 0; }
        .co-total-divider { border:none; border-top:1px solid #f0f1fa; margin:8px 0; }
        .co-total-final { font-size:1rem; font-weight:900; color:#0f1f3d; padding-top:6px; }
        .co-total-final span:last-child { color:#6c47d4; }

        /* Invoice note */
        .co-invoice-note { display:flex; align-items:center; gap:6px; font-size:0.72rem; color:#8491a8; margin-top:14px; padding-top:12px; border-top:1px solid #f0f1fa; }

        /* Help */
        .co-help-card { background:#fff; border:1.5px solid #e2e5f8; border-radius:12px; padding:14px 16px; display:flex; align-items:center; gap:10px; }
        .co-help-title { font-size:0.78rem; font-weight:700; color:#0f1f3d; margin-right:auto; }
        .co-help-link  { display:flex; align-items:center; gap:5px; padding:6px 12px; border-radius:7px; border:1.5px solid #e2e5f8; font-size:0.75rem; font-weight:700; color:#6b7a99; text-decoration:none; }
        .co-help-wa    { background:#d1fae5; border-color:#6ee7b7; color:#065f46; }

        /* Responsive */
        @media (max-width:860px) {
          .co-body { grid-template-columns:1fr; padding:20px 16px 48px; }
          .co-right { order:-1; } /* show summary above form on mobile */
        }
        @media (max-width:480px) {
          .co-form-grid { grid-template-columns:1fr; }
        }
      `}</style>
    </>
  );
}

/* ════════════════════════════════════════
   SUCCESS SCREEN
════════════════════════════════════════ */
function SuccessScreen({ success }) {
  return (
    <>
      <Head><title>Order Confirmed — SS Coaching</title></Head>
      <div className="cs-page">
        <div className="cs-card">

          {/* Checkmark animation */}
          <div className="cs-check-wrap">
            <div className="cs-check-circle">
              <MdCheckCircle size={48} color="#10b981" />
            </div>
          </div>

          <div className="cs-title">🎉 Order Confirmed!</div>
          <div className="cs-sub">
            Your enrollment is confirmed. Here's what happens next:
          </div>

          {/* Steps */}
          <div className="cs-steps">
            <div className="cs-step">
              <span className="cs-step-num">1</span>
              <div>
                <div className="cs-step-title">Invoice Sent</div>
                <div className="cs-step-desc">
                  {success.emailSent
                    ? `Invoice emailed to ${success.form.email}`
                    : `Invoice will be sent to ${success.form.email} shortly`}
                </div>
              </div>
            </div>
            <div className="cs-step">
              <span className="cs-step-num">2</span>
              <div>
                <div className="cs-step-title">Visit Our Center</div>
                <div className="cs-step-desc">Come to SS Coaching, Lucknow and pay ₹{success.total?.toLocaleString("en-IN") || ""}</div>
              </div>
            </div>
            <div className="cs-step">
              <span className="cs-step-num">3</span>
              <div>
                <div className="cs-step-title">Start Learning</div>
                <div className="cs-step-desc">Access your course from the student dashboard</div>
              </div>
            </div>
          </div>

          {/* Invoice numbers */}
          {success.invoiceNumbers?.length > 0 && (
            <div className="cs-invoice-box">
              <div className="cs-invoice-label">Invoice Number{success.invoiceNumbers.length > 1 ? "s" : ""}</div>
              {success.invoiceNumbers.map((n) => (
                <div key={n} className="cs-invoice-num">{n}</div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="cs-btns">
            <Link href="/student/dashboard?tab=invoices" className="cs-btn cs-btn-primary">
              <MdReceiptLong size={16} /> View My Invoices
            </Link>
            <Link href="/student/dashboard" className="cs-btn cs-btn-outline">
              Go to Dashboard
            </Link>
          </div>

        </div>

        <style jsx>{`
          .cs-page { min-height:100vh; background:linear-gradient(135deg,#f4f5ff,#ede9fe); display:flex; align-items:center; justify-content:center; padding:32px 16px; }
          .cs-card { background:#fff; border-radius:20px; padding:40px 36px; max-width:480px; width:100%; text-align:center; box-shadow:0 8px 40px rgba(108,71,212,0.12); }
          .cs-check-wrap { margin-bottom:16px; }
          .cs-check-circle { width:80px; height:80px; background:#d1fae5; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto; }
          .cs-title { font-size:1.5rem; font-weight:900; color:#0f1f3d; margin-bottom:8px; }
          .cs-sub   { font-size:0.85rem; color:#8491a8; margin-bottom:24px; }
          .cs-steps { display:flex; flex-direction:column; gap:12px; text-align:left; margin-bottom:24px; }
          .cs-step  { display:flex; gap:12px; align-items:flex-start; padding:12px 14px; background:#f8f9ff; border-radius:10px; }
          .cs-step-num { width:28px; height:28px; background:linear-gradient(135deg,#6c47d4,#8b5cf6); border-radius:50%; color:#fff; font-size:0.78rem; font-weight:900; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
          .cs-step-title { font-size:0.85rem; font-weight:700; color:#0f1f3d; margin-bottom:2px; }
          .cs-step-desc  { font-size:0.75rem; color:#8491a8; }
          .cs-invoice-box { background:#ede9fe; border-radius:10px; padding:14px; margin-bottom:24px; }
          .cs-invoice-label { font-size:0.7rem; font-weight:800; letter-spacing:0.1em; text-transform:uppercase; color:#6c47d4; margin-bottom:6px; }
          .cs-invoice-num { font-size:1rem; font-weight:900; color:#4c1d95; }
          .cs-btns { display:flex; flex-direction:column; gap:10px; }
          .cs-btn { display:flex; align-items:center; justify-content:center; gap:8px; padding:13px; border-radius:10px; font-size:0.88rem; font-weight:700; text-decoration:none; transition:opacity 0.14s; }
          .cs-btn-primary { background:linear-gradient(135deg,#6c47d4,#8b5cf6); color:#fff; box-shadow:0 4px 14px rgba(108,71,212,0.25); }
          .cs-btn-outline { border:2px solid #e2e5f8; color:#6b7a99; background:#fff; }
          .cs-btn:hover { opacity:0.88; }
        `}</style>
      </div>
    </>
  );
}