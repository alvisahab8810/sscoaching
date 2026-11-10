import mongoose from "mongoose";

/**
 * One use of a coupon. Counts per-student use, and the unique order key
 * makes sure a payment that is confirmed twice (client and webhook) is
 * only counted once.
 */
const CouponRedemptionSchema = new mongoose.Schema(
  {
    coupon:   { type: mongoose.Schema.Types.ObjectId, ref: "Coupon", required: true },
    code:     { type: String, default: "" },
    student:  { type: mongoose.Schema.Types.ObjectId, ref: "StudentUser", required: true },
    orderId:  { type: String, required: true },
    courses:  { type: [mongoose.Schema.Types.ObjectId], default: [] },
    discount: { type: Number, default: 0 },
    source:   { type: String, enum: ["web", "app"], default: "web" },
  },
  { timestamps: true }
);

CouponRedemptionSchema.index({ orderId: 1, coupon: 1 }, { unique: true });
CouponRedemptionSchema.index({ coupon: 1, student: 1 });

export default mongoose.models.CouponRedemption || mongoose.model("CouponRedemption", CouponRedemptionSchema);
