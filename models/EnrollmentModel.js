import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
  student:   { type: mongoose.Schema.Types.ObjectId, ref: "StudentUser", required: true },
  course:    { type: mongoose.Schema.Types.ObjectId, ref: "Course",      required: true },
  type:      { type: String, enum: ["free", "paid"], default: "free" },
  // payment fields (filled after Razorpay success)
  orderId:   { type: String, default: "" },
  paymentId: { type: String, default: "" },
  amountPaid:{ type: Number, default: 0 },
  couponCode:{ type: String, default: "" },
  discount:  { type: Number, default: 0 },
  status:    { type: String, enum: ["active", "expired", "refunded"], default: "active" },
  source:    { type: String, enum: ["web", "app"], default: "web" },

  deliveryInfo: {
  fullName: String, phone: String, email: String,
  address: String, city: String, state: String,
  pincode: String, notes: String,
},
type: { type: String, enum: ["paid", "cod", "free"], default: "free" },


}, { timestamps: true });

// one enrollment per student per course
EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

export default mongoose.models.Enrollment || mongoose.model("Enrollment", EnrollmentSchema);