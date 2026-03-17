// models/Invoice.js
import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    /* ── Identifiers ── */
    invoiceNumber: { type: String, unique: true }, // SS-2025-0001

    /* ── Relations ── */
    student:    { type: mongoose.Schema.Types.ObjectId, ref: "Student",    required: true },
    course:     { type: mongoose.Schema.Types.ObjectId, ref: "Course",     required: true },
    enrollment: { type: mongoose.Schema.Types.ObjectId, ref: "Enrollment" },

    /* ── Student snapshot ── */
    studentName:  { type: String, default: "" },
    studentPhone: { type: String, default: "" },
    studentEmail: { type: String, default: "" },

    /* ── Course snapshot ── */
    courseTitle:   { type: String, default: "" },
    courseSubject: { type: String, default: "" },
    courseBatch:   { type: String, default: "" },

    /* ── Payment ── */
    orderId:       { type: String, default: "" },
    paymentId:     { type: String, default: "" },
    paymentMethod: { type: String, default: "Razorpay" },

    /* ── Amounts (INR) ── */
    subtotal:   { type: Number, default: 0 },
    discount:   { type: Number, default: 0 },
    couponCode: { type: String, default: "" },
    tax:        { type: Number, default: 0 },
    total:      { type: Number, required: true },

    /* ── Status ──
       pending   = COD order placed, cash not yet collected
       paid      = payment confirmed (online or COD collected)
       refunded  = refunded to student
       cancelled = cancelled
    ── */
    status: {
      type: String,
      enum: ["pending", "paid", "refunded", "cancelled"],
      default: "paid",
    },

    /* ── Delivery tracking ── */
    emailSent:    { type: Boolean, default: false },
    emailSentAt:  { type: Date },
    pdfGenerated: { type: Boolean, default: false },

    issuedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

/* Auto invoice number: SS-2025-0001 */
InvoiceSchema.pre("save", async function (next) {
  if (this.invoiceNumber) return next();
  try {
    const year  = new Date().getFullYear();
    const count = await mongoose.model("Invoice").countDocuments();
    const seq   = String(count + 1).padStart(4, "0");
    this.invoiceNumber = `SS-${year}-${seq}`;
    next();
  } catch (err) { next(err); }
});

export default mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);