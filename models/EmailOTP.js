import mongoose from "mongoose";

const EmailOTPSchema = new mongoose.Schema({
  email:       { type: String, required: true, lowercase: true, trim: true },
  otp:         { type: String, required: true },
  purpose:     { type: String, enum: ["register", "reset"], default: "register" },
  pendingData: { type: mongoose.Schema.Types.Mixed, default: null },
  expiresAt:   { type: Date, required: true },
  attempts:    { type: Number, default: 0 },
  isUsed:      { type: Boolean, default: false },
}, { timestamps: true });

EmailOTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
EmailOTPSchema.index({ email: 1, purpose: 1 });

export default mongoose.models.EmailOTP || mongoose.model("EmailOTP", EmailOTPSchema);
