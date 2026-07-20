import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { email, code, newPassword } = req.body;
  if (!email || !code || !newPassword)
    return res.status(400).json({ success: false, message: "All fields are required" });

  if (newPassword.length < 6)
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });

  try {
    const student = await StudentUser.findOne({
      email: email.toLowerCase().trim(),
      resetPasswordExpiry: { $gt: new Date() },
    }).select("+password +resetPasswordToken +resetPasswordExpiry");

    if (!student || !student.resetPasswordToken)
      return res.status(400).json({ success: false, message: "Invalid or expired reset code" });

    const valid = await bcrypt.compare(code.trim(), student.resetPasswordToken);
    if (!valid)
      return res.status(400).json({ success: false, message: "Incorrect reset code. Please try again." });

    student.password = await bcrypt.hash(newPassword, 10);
    student.resetPasswordToken = undefined;
    student.resetPasswordExpiry = undefined;
    await student.save();

    return res.status(200).json({ success: true, message: "Password reset successfully. You can now log in." });
  } catch (err) {
    console.error("reset-password error:", err);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}
