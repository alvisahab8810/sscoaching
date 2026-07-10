import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import PhoneOTP from "@/models/PhoneOTP";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "@/lib/sendOtpEmail";

// MSG91 (temporarily disabled — not registered yet)
// import { sendSmsOtp } from "@/lib/msg91";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { name, email, password, phone, class: className } = req.body;

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

  // Generate 6-digit OTP
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

  // Send OTP via email
  const result = await sendOtpEmail({ name: name.trim(), email: normalEmail, otp });
  if (!result.success) {
    return res.status(500).json({ success: false, message: "Failed to send OTP email. Please try again." });
  }

  // MSG91 SMS (disabled — enable after DLT registration)
  // try {
  //   const result = await sendSmsOtp(normalPhone);
  //   if (result?.type !== "success") {
  //     return res.status(500).json({ success: false, message: "Failed to send OTP. Please try again." });
  //   }
  // } catch (err) {
  //   console.error("MSG91 send error:", err?.response?.data || err.message);
  //   return res.status(500).json({ success: false, message: "Could not send OTP. Please try again." });
  // }

  return res.json({ success: true, message: `OTP sent to ${normalEmail}` });
}
