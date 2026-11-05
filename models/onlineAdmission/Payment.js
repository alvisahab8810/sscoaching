import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Schema.Types.ObjectId, ref: "OnlineAdmissionApplication", required: true, index: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
    gateway: { type: String, enum: ["razorpay", "offline", "apple"], required: true },
    order_id: { type: String, required: true, unique: true },
    payment_id: { type: String, default: null },
    note: { type: String, default: null },
    paid_at: { type: Date, default: null },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.OnlineAdmissionPayment ||
  mongoose.model("OnlineAdmissionPayment", PaymentSchema, "online_admission_payments");
