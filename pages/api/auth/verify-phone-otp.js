import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import { verifySmsOtp } from "@/lib/msg91";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { phone, otp } = req.body || {};
  const digits = (phone || "").replace(/\D/g, "");

  if (digits.length !== 10) {
    return res.status(400).json({ success: false, message: "Invalid phone number" });
  }
  if (!otp || otp.length < 4) {
    return res.status(400).json({ success: false, message: "Enter a valid OTP" });
  }

  // Verify with MSG91
  try {
    const result = await verifySmsOtp(digits, otp);
    if (result?.type !== "success") {
      return res.status(400).json({ success: false, message: "Incorrect OTP. Please try again." });
    }
  } catch (err) {
    const msg = err?.response?.data?.message || "";
    if (msg.toLowerCase().includes("not match") || msg.toLowerCase().includes("invalid")) {
      return res.status(400).json({ success: false, message: "Incorrect OTP. Please try again." });
    }
    if (msg.toLowerCase().includes("expire")) {
      return res.status(400).json({ success: false, message: "OTP expired. Please request a new one." });
    }
    console.error("MSG91 verify error:", err?.response?.data || err.message);
    return res.status(500).json({ success: false, message: "OTP verification failed. Please try again." });
  }

  // OTP verified — look up student
  const student = await StudentUser.findOne({ phone: digits });
  if (!student) {
    return res.status(404).json({ success: false, message: "No account found with this phone number." });
  }

  const token = jwt.sign(
    { id: student._id, name: student.name, email: student.email, phone: student.phone, role: "student" },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return res.json({
    success: true,
    token,
    user: {
      _id: student._id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      class: student.className,
      avatar: student.avatar,
    },
  });
}
