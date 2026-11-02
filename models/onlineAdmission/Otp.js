import mongoose from "mongoose";

/**
 * One pending login OTP per mobile. When MSG91 sends the SMS it also keeps
 * the code, so `codeHash` is only set when the OTP is generated here (SMS
 * switched off, local development).
 */
const OtpSchema = new mongoose.Schema(
  {
    mobile: { type: String, required: true, index: true },
    codeHash: { type: String, default: null },
    via: { type: String, enum: ["msg91", "local"], required: true },
    attempts: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.OnlineAdmissionOtp ||
  mongoose.model("OnlineAdmissionOtp", OtpSchema, "online_admission_otps");
