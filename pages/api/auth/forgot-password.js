import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import bcrypt from "bcryptjs";
import { sendResetEmail } from "@/lib/sendResetEmail";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { email } = req.body;
  if (!email)
    return res.status(400).json({ success: false, message: "Email is required" });

  try {
    const student = await StudentUser.findOne({ email: email.toLowerCase().trim() })
      .select("+resetPasswordToken +resetPasswordExpiry");

    // Always return success to prevent email enumeration
    if (!student) {
      return res.status(200).json({
        success: true,
        message: "If this email is registered, you will receive a reset code.",
      });
    }

    // Rate-limit: block resend if a valid code was sent less than 60s ago
    if (student.resetPasswordExpiry && student.resetPasswordExpiry > new Date(Date.now() + 14 * 60 * 1000)) {
      return res.status(429).json({
        success: false,
        message: "A reset code was already sent recently. Please wait before requesting again.",
      });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    student.resetPasswordToken = await bcrypt.hash(code, 8);
    student.resetPasswordExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await student.save();

    await sendResetEmail({ name: student.name, email: student.email, code });

    return res.status(200).json({
      success: true,
      message: "Reset code sent to your email.",
    });
  } catch (err) {
    console.error("forgot-password error:", err);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}
