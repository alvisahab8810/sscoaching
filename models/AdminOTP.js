import mongoose from "mongoose";

const AdminOTPSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    attempts: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

// Auto-delete expired OTP documents from MongoDB
AdminOTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.AdminOTP || mongoose.model("AdminOTP", AdminOTPSchema);
