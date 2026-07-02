// POST /api/auth/send-register-otp
// Validates registration data, sends OTP to email, stores pending registration
import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import EmailOTP from "@/models/EmailOTP";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "@/lib/sendOtpEmail";

function randomOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { name, email, password, phone, class: className } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: "Name, email and password are required" });
  if (password.length < 6)
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });

  const normalEmail = email.toLowerCase().trim();
  const normalPhone = (phone || "").trim();

  // Check email not already registered
  const existing = await StudentUser.findOne({ email: normalEmail });
  if (existing)
    return res.status(409).json({ success: false, message: "This email is already registered. Please login." });

  // Check phone not already taken (only if provided)
  if (normalPhone) {
    const phoneExists = await StudentUser.findOne({ phone: normalPhone });
    if (phoneExists)
      return res.status(409).json({ success: false, message: "This phone number is already registered. Please login." });
  }

  // Rate limit: block if OTP sent in last 60 seconds
  const recent = await EmailOTP.findOne({
    email: normalEmail, purpose: "register", isUsed: false,
    createdAt: { $gt: new Date(Date.now() - 60_000) },
  });
  if (recent)
    return res.status(429).json({ success: false, message: "Please wait a minute before requesting another OTP." });

  // Hash password and store pending data
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = randomOtp();

  await EmailOTP.findOneAndDelete({ email: normalEmail, purpose: "register", isUsed: false });
  await EmailOTP.create({
    email: normalEmail,
    otp,
    purpose: "register",
    pendingData: {
      name: name.trim(),
      email: normalEmail,
      password: hashedPassword,
      phone: normalPhone,
      className: className || "",
    },
    expiresAt: new Date(Date.now() + 10 * 60_000),
  });

  const emailResult = await sendOtpEmail({ name: name.trim(), email: normalEmail, otp });
  if (!emailResult.success) {
    return res.status(500).json({ success: false, message: "Failed to send OTP email. Please try again." });
  }

  return res.status(200).json({ success: true, message: `OTP sent to ${normalEmail}` });
}
