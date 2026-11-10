import mongoose from "mongoose";

/**
 * The priced cart behind one payment: what each course cost, how much the
 * coupon and the wallet took off it, and what was paid. Written when the
 * Razorpay order is created and read back when the payment is confirmed, so
 * the enrollment, invoice, coupon use and wallet debit all match what the
 * student was shown.
 *
 * Orders made without a coupon or wallet (and by older app versions) have no
 * CheckoutOrder; they are charged the plain course price as before.
 */
const LineSchema = new mongoose.Schema(
  {
    course:   { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    price:    { type: Number, default: 0 },
    discount: { type: Number, default: 0 },   // coupon
    wallet:   { type: Number, default: 0 },
    paid:     { type: Number, default: 0 },
  },
  { _id: false }
);

const CheckoutOrderSchema = new mongoose.Schema(
  {
    orderId:    { type: String, required: true, unique: true }, // Razorpay order id, or "wallet_<id>" when nothing was left to pay
    student:    { type: mongoose.Schema.Types.ObjectId, ref: "StudentUser", required: true },
    lines:      { type: [LineSchema], default: [] },
    subtotal:   { type: Number, default: 0 },
    coupon:     { type: mongoose.Schema.Types.ObjectId, ref: "Coupon", default: null },
    couponCode: { type: String, default: "" },
    discount:   { type: Number, default: 0 },
    walletUsed: { type: Number, default: 0 },
    total:      { type: Number, default: 0 },
    source:     { type: String, enum: ["web", "app"], default: "web" },
    status:     { type: String, enum: ["pending", "paid"], default: "pending" },
    paidAt:     { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.CheckoutOrder || mongoose.model("CheckoutOrder", CheckoutOrderSchema);
