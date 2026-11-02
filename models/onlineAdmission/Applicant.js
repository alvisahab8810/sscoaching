import mongoose from "mongoose";

/**
 * A student who logs in to the NIOS online admission with a mobile OTP.
 * Kept apart from StudentUser on purpose: this account has no password and
 * only ever sees its own admission files.
 */
const ApplicantSchema = new mongoose.Schema(
  {
    mobile: { type: String, required: true, unique: true },
    name: { type: String, default: null },
    active: { type: Boolean, default: true },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.OnlineAdmissionApplicant ||
  mongoose.model("OnlineAdmissionApplicant", ApplicantSchema, "online_admission_applicants");
