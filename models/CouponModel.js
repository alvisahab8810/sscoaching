import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
  code:         { type: String, required: true, unique: true, uppercase: true },
  type:         { type: String, enum: ["percent", "flat"], default: "percent" },
  value:        { type: Number, required: true },   // % or flat ₹
  maxUses:      { type: Number, default: 0 },        // 0 = unlimited
  usedCount:    { type: Number, default: 0 },
  minAmount:    { type: Number, default: 0 },        // minimum cart value
  expiresAt:    { type: Date, default: null },
  isActive:     { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);