import mongoose from "mongoose";

// Stores pending registration data while MSG91 manages the actual OTP
const PhoneOTPSchema = new mongoose.Schema({
  phone:       { type: String, required: true, trim: true },
  purpose:     { type: String, default: "register" },
  pendingData: { type: mongoose.Schema.Types.Mixed, default: null },
  expiresAt:   { type: Date, required: true },
  isUsed:      { type: Boolean, default: false },
}, { timestamps: true });

PhoneOTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
PhoneOTPSchema.index({ phone: 1, purpose: 1 });

export default mongoose.models.PhoneOTP || mongoose.model("PhoneOTP", PhoneOTPSchema);
