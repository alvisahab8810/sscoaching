import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import PhoneOTP from "@/models/PhoneOTP";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "@/lib/sendOtpEmail";
import { sendSmsOtp } from "@/lib/msg91";

const MSG91_ENABLED = process.env.MSG91_SMS_OTP_ENABLED === "true";

export default async function handler(req, res) {
  const origin = req.headers.origin || "no-origin";
  console.log(`[SEND-OTP] ${req.method} from origin: ${origin}`);

  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { name, email, password, phone, class: className } = req.body;
  console.log(`[SEND-OTP] name: ${name}, email: ${email}, phone: ${phone}, class: ${className}`);

  if (!name || !phone || !password || !email)
    return res.status(400).json({ success: false, message: "Name, phone, email and password are required" });
  if (password.length < 6)
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });

  const digits = phone.replace(/\D/g, "");
  if (digits.length !== 10)
    return res.status(400).json({ success: false, message: "Enter a valid 10-digit mobile number" });

  const normalEmail = email.toLowerCase().trim();
  const normalPhone = digits;

  // Check phone not already registered
  const phoneExists = await StudentUser.findOne({ phone: normalPhone });
  if (phoneExists)
    return res.status(409).json({ success: false, message: "This phone number is already registered. Please login." });

  // Check email not already registered
  const emailExists = await StudentUser.findOne({ email: normalEmail });
  if (emailExists)
    return res.status(409).json({ success: false, message: "This email is already registered. Please login." });

  // Rate limit: block if OTP sent in last 60 seconds
  const recent = await PhoneOTP.findOne({
    phone: normalPhone, purpose: "register", isUsed: false,
    createdAt: { $gt: new Date(Date.now() - 60_000) },
  });
  if (recent)
    return res.status(429).json({ success: false, message: "Please wait a minute before requesting another OTP." });

  // Generate 6-digit OTP (only used for the email channel — MSG91 generates its own)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash password and store pending data
  const hashedPassword = await bcrypt.hash(password, 10);

  await PhoneOTP.findOneAndDelete({ phone: normalPhone, purpose: "register", isUsed: false });
  await PhoneOTP.create({
    phone: normalPhone,
    purpose: "register",
    otp,
    pendingData: {
      name: name.trim(),
      email: normalEmail,
      password: hashedPassword,
      phone: normalPhone,
      className: className || "",
    },
    expiresAt: new Date(Date.now() + 10 * 60_000),
  });

  if (MSG91_ENABLED) {
    // Send OTP via SMS (MSG91) — MSG91 tracks/verifies the OTP itself
    console.log(`[SEND-OTP] Sending OTP via MSG91 SMS to: ${normalPhone}`);
    try {
      const result = await sendSmsOtp(normalPhone, process.env.MSG91_TEMPLATE_ID);
      if (result?.type !== "success") {
        console.error("[SEND-OTP] MSG91 failed:", result);
        return res.status(500).json({ success: false, message: "Failed to send OTP. Please try again." });
      }
    } catch (err) {
      console.error("[SEND-OTP] MSG91 error:", err?.response?.data || err.message);
      return res.status(500).json({ success: false, message: "Could not send OTP. Please try again." });
    }
    return res.json({ success: true, message: `OTP sent to ${normalPhone}` });
  }

  // Fallback: send OTP via email (used until MSG91 SMS is switched on)
  console.log(`[SEND-OTP] Sending OTP to email: ${normalEmail}`);
  const result = await sendOtpEmail({ name: name.trim(), email: normalEmail, otp });
  console.log(`[SEND-OTP] Email result:`, result);
  if (!result.success) {
    console.error(`[SEND-OTP] Email failed:`, result.error);
    return res.status(500).json({ success: false, message: "Failed to send OTP email. Please try again." });
  }

  return res.json({ success: true, message: `OTP sent to ${normalEmail}` });
}
