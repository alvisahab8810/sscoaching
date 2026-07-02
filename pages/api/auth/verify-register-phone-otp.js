import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import PhoneOTP from "@/models/PhoneOTP";
import { verifySmsOtp } from "@/lib/msg91";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { phone, otp } = req.body;
  const digits = (phone || "").replace(/\D/g, "");

  if (digits.length !== 10 || !otp)
    return res.status(400).json({ success: false, message: "Phone and OTP required" });

  try {
    // Verify OTP with MSG91
    try {
      const result = await verifySmsOtp(digits, otp);
      if (result?.type !== "success") {
        return res.status(400).json({ success: false, message: "Incorrect OTP. Please try again." });
      }
    } catch (err) {
      const msg = (err?.response?.data?.message || "").toLowerCase();
      if (msg.includes("not match") || msg.includes("invalid") || msg.includes("wrong")) {
        return res.status(400).json({ success: false, message: "Incorrect OTP. Please try again." });
      }
      if (msg.includes("expire")) {
        return res.status(400).json({ success: false, message: "OTP expired. Please request a new one." });
      }
      console.error("MSG91 verify error:", err?.response?.data || err.message);
      return res.status(500).json({ success: false, message: "OTP verification failed. Please try again." });
    }

    // Get pending registration data
    const record = await PhoneOTP.findOne({ phone: digits, purpose: "register", isUsed: false });
    if (!record)
      return res.status(400).json({ success: false, message: "No pending registration found. Please register again." });
    if (record.expiresAt < new Date())
      return res.status(400).json({ success: false, message: "Session expired. Please register again." });

    const { name, email, password, className } = record.pendingData;

    // Create student account
    let student;
    try {
      student = await StudentUser.create({
        name,
        email: email || undefined,
        password,
        phone: digits,
        className: className || "",
        isProfileComplete: true,
      });
    } catch (err) {
      if (err.code === 11000) {
        const field = Object.keys(err.keyPattern || {})[0];
        const msg = field === "phone"
          ? "This phone number is already registered. Please login."
          : "This email is already registered. Please login.";
        return res.status(409).json({ success: false, message: msg });
      }
      throw err;
    }

    await PhoneOTP.findByIdAndUpdate(record._id, { isUsed: true });

    // Welcome email (non-blocking, only if email provided)
    if (student.email) {
      import("@/lib/sendWelcomeEmail")
        .then(({ sendWelcomeEmail }) => sendWelcomeEmail({ name: student.name, email: student.email }))
        .catch(() => {});
    }

    const token = jwt.sign(
      { id: student._id, name: student.name, email: student.email, phone: student.phone, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(201).json({
      success: true, token,
      user: {
        _id: student._id, name: student.name,
        email: student.email || "",
        phone: student.phone,
        class: student.className, avatar: "",
      },
    });
  } catch (err) {
    console.error("verify-register-phone-otp error:", err);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}
