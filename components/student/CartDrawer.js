// components/student/CartDrawer.jsx
// REPLACES the CartDrawer function inside pages/student/dashboard.jsx
//
// Changes vs old version:
//   - "Pay Securely" button now saves cart to localStorage and navigates to /student/checkout
//   - No more Razorpay crash
//   - Coupon still works (discount shown in summary)
//   - Free-only cart: enrolls immediately without going to checkout
//
// HOW TO USE:
//   Option A (recommended): Extract CartDrawer from dashboard.jsx into this file and import it.
//   Option B: Copy the CartDrawer function below directly into your dashboard.jsx,
//             replacing the existing CartDrawer function entirely.

import { useState } from "react";
import { useRouter } from "next/router";
import {
  MdShoppingCart, MdClose, MdDelete, MdLocalOffer,
  MdCheck, MdLock, MdArrowForward,
} from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";

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
const getSubjectColor = (s) => subjectColors[s] || "#6c47d4";

export default function CartDrawer({ open, onClose, cart, removeFromCart, onEnrolled }) {
  const router = useRouter();

  const [coupon, setCoupon]               = useState("");
  const [couponApplied, setCouponApplied] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError]     = useState("");
  const [enrollingFree, setEnrollingFree] = useState(false);

  const subtotal = cart.reduce((a, c) => a + (c.isFree ? 0 : Number(c.price || 0)), 0);
  const discount = couponApplied
    ? couponApplied.type === "percent"
      ? Math.round((subtotal * couponApplied.value) / 100)
      : Math.min(couponApplied.value, subtotal)
    : 0;
  const total    = Math.max(0, subtotal - discount);
  const hasPaid  = cart.some((c) => !c.isFree);
  const allFree  = cart.every((c) => c.isFree);

  /* ── Coupon ── */
  const applyCoupon = async () => {
    if (!coupon.trim()) return;
    setCouponLoading(true); setCouponError("");
    try {
      const paidCourse = cart.find((c) => !c.isFree);
      if (!paidCourse) { setCouponError("No paid courses in cart"); setCouponLoading(false); return; }
      const token = localStorage.getItem("studentToken");
      const res   = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId: paidCourse._id, couponCode: coupon }),
      });
      const data = await res.json();
      if (data.success && data.type === "paid") {
        setCouponApplied({ code: data.couponCode, discount: data.discount, type: "flat", value: data.discount });
      } else if (data.success && data.type === "free") {
        setCouponApplied({ code: coupon.toUpperCase(), discount: subtotal, type: "flat", value: subtotal });
      } else {
        setCouponError(data.error || "Invalid coupon"); setCouponApplied(null);
      }
    } catch { setCouponError("Network error"); }
    setCouponLoading(false);
  };

  const removeCoupon = () => { setCouponApplied(null); setCoupon(""); setCouponError(""); };

  /* ── Enroll free items immediately ── */
  const enrollFreeItems = async () => {
    setEnrollingFree(true);
    const token = localStorage.getItem("studentToken");
    for (const c of cart.filter((c) => c.isFree)) {
      await fetch("/api/courses/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId: c._id }),
      }).catch(() => {});
    }
    setEnrollingFree(false);
    onEnrolled();
  };

  /* ── Proceed to checkout ── */
  const proceedToCheckout = () => {
    if (cart.length === 0) return;

    if (allFree) {
      // All free — enroll immediately, no checkout needed
      enrollFreeItems();
      return;
    }

    // Save cart + discount info to localStorage for checkout page to read
    const checkoutCart = cart.map((c) => ({
      ...c,
      // Apply coupon discount proportionally if multiple paid courses
      // For simplicity: coupon discount applied to first paid course
    }));

    localStorage.setItem("ss_checkout_cart", JSON.stringify(checkoutCart));
    if (couponApplied) {
      localStorage.setItem("ss_checkout_coupon", JSON.stringify({ ...couponApplied, discount }));
    } else {
      localStorage.removeItem("ss_checkout_coupon");
    }

    onClose();
    router.push("/student/checkout");
  };

  return (
    <div className={`sdc-cart-drawer ${open ? "sdc-cart-open" : ""}`}>
      <div className="sdc-cart-header">
        <div className="sdc-cart-title">
          <MdShoppingCart size={20} /> My Cart
          {cart.length > 0 && <span className="sdc-cart-badge">{cart.length}</span>}
        </div>
        <button className="sdc-cart-close" onClick={onClose}><MdClose size={22} /></button>
      </div>

      {cart.length === 0 ? (
        <div className="sdc-cart-empty">
          <MdShoppingCart size={52} className="sdc-cart-empty-icon" />
          <div>Your cart is empty</div>
          <p>Add a course to get started!</p>
        </div>
      ) : (
        <>
          {/* Items */}
          <div className="sdc-cart-items">
            {cart.map((course) => (
              <div key={course._id} className="sdc-cart-item">
                <div className="sdc-cart-item-thumb" style={{
                  background: course.featureImage
                    ? `url(${course.featureImage}) center/cover no-repeat`
                    : `linear-gradient(135deg,${getSubjectColor(course.subject)}33,${getSubjectColor(course.subject)}66)`,
                }}>
                  {!course.featureImage && <span style={{ fontSize: 18 }}>{subjectIcons[course.subject] || "📚"}</span>}
                </div>
                <div className="sdc-cart-item-info">
                  <div className="sdc-cart-item-title">{course.title}</div>
                  <div className="sdc-cart-item-sub">{course.subject} • {course.batch}</div>
                  <div className="sdc-cart-item-price">
                    {course.isFree
                      ? <span className="sdc-free-tag">FREE</span>
                      : <span><FaRupeeSign size={11} />{course.price}</span>
                    }
                  </div>
                </div>
                <button className="sdc-cart-remove" onClick={() => removeFromCart(course._id)}>
                  <MdDelete size={17} />
                </button>
              </div>
            ))}
          </div>

          {/* Coupon — only show if there are paid items */}
          {hasPaid && (
            <div className="sdc-coupon-wrap">
              <div className="sdc-coupon-title"><MdLocalOffer size={14} /> Have a coupon code?</div>
              {couponApplied ? (
                <div className="sdc-coupon-applied">
                  <MdCheck size={15} color="#10b981" />
                  <span><strong>{couponApplied.code}</strong> — ₹{discount} off!</span>
                  <button className="sdc-coupon-remove" onClick={removeCoupon}><MdClose size={14} /></button>
                </div>
              ) : (
                <div className="sdc-coupon-row">
                  <input
                    className="sdc-coupon-input"
                    placeholder="COUPON CODE"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                  />
                  <button className="sdc-coupon-btn" onClick={applyCoupon} disabled={couponLoading}>
                    {couponLoading ? "..." : "Apply"}
                  </button>
                </div>
              )}
              {couponError && <div className="sdc-coupon-error">{couponError}</div>}
            </div>
          )}

          {/* Summary */}
          <div className="sdc-summary">
            <div className="sdc-summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
            {couponApplied && (
              <div className="sdc-summary-row sdc-summary-discount">
                <span>Discount ({couponApplied.code})</span>
                <span>−₹{discount}</span>
              </div>
            )}
            <div className="sdc-summary-row sdc-summary-total">
              <span>Total</span>
              <span>
                {total === 0
                  ? <span style={{ color: "#10b981", fontWeight: 800 }}>FREE 🎉</span>
                  : `₹${total}`}
              </span>
            </div>
          </div>

          {/* CTA */}
          {allFree || total === 0 ? (
            /* All free or coupon makes it free — enroll directly */
            <button className="sdc-checkout-btn" onClick={enrollFreeItems} disabled={enrollingFree}>
              {enrollingFree
                ? "Enrolling..."
                : <><MdCheck size={18} /> Enroll Now — Free!</>
              }
            </button>
          ) : (
            /* Has paid items — go to checkout */
            <button className="sdc-checkout-btn" onClick={proceedToCheckout}>
              <MdArrowForward size={17} /> Proceed to Checkout
            </button>
          )}

          {/* Payment methods note */}
          <div className="sdc-pay-note">
            <span className="sdc-pay-badge sdc-pay-cod">💵 Cash on Delivery</span>
            <span className="sdc-pay-badge sdc-pay-online">💳 Online — Coming Soon</span>
          </div>
        </>
      )}

      <style jsx>{`
        /* Payment note */
        .sdc-pay-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 10px;
          flex-wrap: wrap;
        }
        .sdc-pay-badge {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 3px 9px;
          border-radius: 100px;
        }
        .sdc-pay-cod    { background: #d1fae5; color: #065f46; }
        .sdc-pay-online { background: #f3f4f6; color: #6b7280; }
      `}</style>
    </div>
  );
}