import mongoose from "mongoose";

/**
 * A discount code for course purchases.
 *
 * Every rule is optional: an empty list of courses means every course, a
 * zero limit means no limit, a null date means no start or end. The checks
 * themselves live in lib/checkout.js so the website, the app and the payment
 * step all use the same rules.
 */
const CouponSchema = new mongoose.Schema({
  code:         { type: String, required: true, unique: true, uppercase: true, trim: true },
  title:        { type: String, default: "" },        // shown on checkout, e.g. "Diwali offer"
  description:  { type: String, default: "" },

  type:         { type: String, enum: ["percent", "flat"], default: "percent" },
  value:        { type: Number, required: true },     // % or flat ₹
  maxDiscount:  { type: Number, default: 0 },         // cap for percent coupons; 0 = no cap

  minAmount:    { type: Number, default: 0 },         // minimum value of the courses it applies to
  courses:      { type: [mongoose.Schema.Types.ObjectId], ref: "Course", default: [] }, // empty = all courses

  startsAt:     { type: Date, default: null },
  expiresAt:    { type: Date, default: null },

  maxUses:      { type: Number, default: 0 },         // across everyone; 0 = unlimited
  usedCount:    { type: Number, default: 0 },
  perUserLimit: { type: Number, default: 1 },         // 0 = unlimited
  firstPurchaseOnly: { type: Boolean, default: false },
  platform:     { type: String, enum: ["all", "web", "app"], default: "all" },

  isPublic:     { type: Boolean, default: true },     // listed on checkout; otherwise the code must be typed
  isActive:     { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
