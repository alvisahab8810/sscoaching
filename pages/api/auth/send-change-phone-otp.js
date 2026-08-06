// POST /api/auth/send-change-phone-otp
// Authenticated — sends an OTP to a NEW mobile number the student wants to
// switch to. The number only gets saved once verify-change-phone-otp confirms
// the student actually owns it (mirrors the register-phone-otp flow).
import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import PhoneOTP from "@/models/PhoneOTP";
import jwt from "jsonwebtoken";
import { sendSmsOtp } from "@/lib/msg91";

const MSG91_ENABLED = process.env.MSG91_SMS_OTP_ENABLED === "true";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  let studentId;
  try {
    ({ id: studentId } = jwt.verify(token, process.env.JWT_SECRET));
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  const { phone } = req.body || {};
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.length !== 10)
    return res.status(400).json({ success: false, message: "Enter a valid 10-digit mobile number" });

  if (!MSG91_ENABLED)
    return res.status(503).json({ success: false, message: "Changing your number isn't available yet. Please try again later." });

  try {
    const self = await StudentUser.findById(studentId).select("phone");
    if (!self) return res.status(404).json({ success: false, message: "Account not found" });
    if (self.phone === digits)
      return res.status(400).json({ success: false, message: "This is already your registered number." });

    // Make sure no OTHER account already owns this number
    const taken = await StudentUser.findOne({ phone: digits, _id: { $ne: studentId } }).select("_id");
    if (taken)
      return res.status(409).json({ success: false, message: "This phone number is already registered to another account." });

    // Rate limit: 1 OTP per minute
    const recent = await PhoneOTP.findOne({
      phone: digits, purpose: "change-phone", isUsed: false,
      createdAt: { $gt: new Date(Date.now() - 60_000) },
    });
    if (recent)
      return res.status(429).json({ success: false, message: "Please wait a minute before requesting another OTP." });

    await PhoneOTP.findOneAndDelete({ phone: digits, purpose: "change-phone", isUsed: false });
    await PhoneOTP.create({
      phone: digits,
      purpose: "change-phone",
      otp: "",
      pendingData: { studentId: String(studentId) },
      expiresAt: new Date(Date.now() + 10 * 60_000),
    });

    const result = await sendSmsOtp(digits, process.env.MSG91_TEMPLATE_ID);
    if (result?.type !== "success") {
      console.error("[SEND-CHANGE-PHONE-OTP] MSG91 failed:", result);
      return res.status(500).json({ success: false, message: "Failed to send OTP. Please try again." });
    }

    return res.json({ success: true, message: `OTP sent to ${digits}` });
  } catch (err) {
    console.error("[SEND-CHANGE-PHONE-OTP] Error:", err?.response?.data || err.message);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}
