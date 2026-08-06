// POST /api/auth/verify-forgot-password-phone-otp
// Verifies the SMS code via MSG91 and resets the password in one step.
import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import PhoneOTP from "@/models/PhoneOTP";
import bcrypt from "bcryptjs";
import { verifySmsOtp } from "@/lib/msg91";

const MSG91_ENABLED = process.env.MSG91_SMS_OTP_ENABLED === "true";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { phone, otp, newPassword } = req.body;
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.length !== 10 || !otp || !newPassword)
    return res.status(400).json({ success: false, message: "Phone, OTP and new password are required" });
  if (newPassword.length < 6)
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });

  if (!MSG91_ENABLED)
    return res.status(503).json({ success: false, message: "SMS reset is not available yet. Please try again later." });

  try {
    const record = await PhoneOTP.findOne({ phone: digits, purpose: "forgot-password", isUsed: false });
    if (!record)
      return res.status(400).json({ success: false, message: "No pending reset request. Please start again." });
    if (record.expiresAt < new Date())
      return res.status(400).json({ success: false, message: "Code expired. Please request a new one." });
    if (record.attempts >= 5) {
      await PhoneOTP.deleteOne({ _id: record._id });
      return res.status(400).json({ success: false, message: "Too many wrong attempts. Please request a new code." });
    }

    try {
      const result = await verifySmsOtp(digits, otp.trim());
      if (result?.type !== "success") {
        await PhoneOTP.findByIdAndUpdate(record._id, { $inc: { attempts: 1 } });
        return res.status(400).json({ success: false, message: "Incorrect code. Please try again." });
      }
    } catch (err) {
      const msg = (err?.response?.data?.message || "").toLowerCase();
      if (msg.includes("not match") || msg.includes("invalid") || msg.includes("wrong")) {
        await PhoneOTP.findByIdAndUpdate(record._id, { $inc: { attempts: 1 } });
        return res.status(400).json({ success: false, message: "Incorrect code. Please try again." });
      }
      if (msg.includes("expire")) {
        return res.status(400).json({ success: false, message: "Code expired. Please request a new one." });
      }
      console.error("[VERIFY-FORGOT-OTP] MSG91 verify error:", err?.response?.data || err.message);
      return res.status(500).json({ success: false, message: "Verification failed. Please try again." });
    }

    const student = await StudentUser.findOne({ phone: digits }).select("+password");
    if (!student)
      return res.status(404).json({ success: false, message: "Account not found." });

    student.password = await bcrypt.hash(newPassword, 10);
    await student.save();
    await PhoneOTP.findByIdAndUpdate(record._id, { isUsed: true });

    return res.status(200).json({ success: true, message: "Password reset successfully. You can now log in." });
  } catch (err) {
    console.error("[VERIFY-FORGOT-OTP] Error:", err.message);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}
