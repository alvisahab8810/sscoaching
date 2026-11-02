import mongoose from "mongoose";

/**
 * One NIOS complete-package admission file. `form` holds the unified form
 * exactly as the wizard sends it (validated by lib/onlineAdmission/validate),
 * so a new form field never needs a schema change.
 */
const ApplicationSchema = new mongoose.Schema(
  {
    seq: { type: Number, required: true, unique: true },
    ref_no: { type: String, required: true, unique: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "OnlineAdmissionApplicant", required: true, index: true },
    class: { type: String, enum: ["10", "12"], required: true },
    stream: { type: String, enum: ["1", "2"], default: "1" },
    block: { type: String, default: null },
    status: { type: String, default: "draft", index: true },
    price: { type: Number, required: true },
    form: { type: mongoose.Schema.Types.Mixed, default: {} },
    subjects: { type: [Number], default: [] },
    checklist: { type: mongoose.Schema.Types.Mixed, default: {} },
    centre_code: { type: String, default: null },
    nios_ref: { type: String, default: null },
    enrollment_no: { type: String, default: null, index: true },
    exam_fee: { type: mongoose.Schema.Types.Mixed, default: null },
    review_note: { type: String, default: null },
    consultant: {
      id: { type: String, default: null },
      name: { type: String, default: null },
    },
    submitted_at: Date,
    verified_at: Date,
    paid_at: Date,
    nios_submitted_at: Date,
    enrolled_at: Date,
    exam_fee_at: Date,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, minimize: false }
);

export default mongoose.models.OnlineAdmissionApplication ||
  mongoose.model("OnlineAdmissionApplication", ApplicationSchema, "online_admission_applications");
