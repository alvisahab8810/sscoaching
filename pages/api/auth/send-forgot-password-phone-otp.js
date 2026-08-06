// POST /api/auth/send-forgot-password-phone-otp
// Phone/SMS-based password reset — kept separate from the existing
// email-based forgot-password.js so that flow keeps working untouched
// until this one is switched on (MSG91_SMS_OTP_ENABLED=true) and wired to the UI.
import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import PhoneOTP from "@/models/PhoneOTP";
import { sendSmsOtp } from "@/lib/msg91";

const MSG91_ENABLED = process.env.MSG91_SMS_OTP_ENABLED === "true";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { phone } = req.body;
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.length !== 10)
    return res.status(400).json({ success: false, message: "Enter a valid 10-digit mobile number" });

  if (!MSG91_ENABLED)
    return res.status(503).json({ success: false, message: "SMS reset is not available yet. Please try again later." });

  try {
    const student = await StudentUser.findOne({ phone: digits }).select("_id name phone isActive");

    // Always return success to prevent phone-number enumeration
    if (!student) {
      return res.status(200).json({ success: true, message: "If this number is registered, you will receive a reset code." });
    }
    if (!student.isActive) {
      return res.status(403).json({ success: false, message: "Account disabled. Contact support." });
    }

    // Rate limit: 1 OTP per minute
    const recent = await PhoneOTP.findOne({
      phone: digits, purpose: "forgot-password", isUsed: false,
      createdAt: { $gt: new Date(Date.now() - 60_000) },
    });
    if (recent)
      return res.status(429).json({ success: false, message: "Please wait a minute before requesting another code." });

    await PhoneOTP.findOneAndDelete({ phone: digits, purpose: "forgot-password", isUsed: false });
    await PhoneOTP.create({
      phone: digits,
      purpose: "forgot-password",
      otp: "",
      expiresAt: new Date(Date.now() + 10 * 60_000),
    });

    const result = await sendSmsOtp(digits, process.env.MSG91_FORGOT_TEMPLATE_ID);
    if (result?.type !== "success") {
      console.error("[SEND-FORGOT-OTP] MSG91 failed:", result);
      return res.status(500).json({ success: false, message: "Failed to send code. Please try again." });
    }

    return res.json({ success: true, message: `Reset code sent to ${digits}` });
  } catch (err) {
    console.error("[SEND-FORGOT-OTP] Error:", err?.response?.data || err.message);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}
