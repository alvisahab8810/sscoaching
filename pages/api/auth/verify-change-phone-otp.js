// POST /api/auth/verify-change-phone-otp
// Authenticated — confirms the OTP sent by send-change-phone-otp, then
// actually updates the student's phone number on the account.
import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import PhoneOTP from "@/models/PhoneOTP";
import jwt from "jsonwebtoken";
import { verifySmsOtp } from "@/lib/msg91";

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

  const { phone, otp } = req.body || {};
  const digits = (phone || "").replace(/\D/g, "");
  if (digits.length !== 10 || !otp)
    return res.status(400).json({ success: false, message: "Phone and OTP required" });

  try {
    const record = await PhoneOTP.findOne({ phone: digits, purpose: "change-phone", isUsed: false });
    if (!record)
      return res.status(400).json({ success: false, message: "No pending number change found. Please request a new OTP." });
    if (record.expiresAt < new Date())
      return res.status(400).json({ success: false, message: "OTP expired. Please request a new one." });
    if (record.pendingData?.studentId !== String(studentId))
      return res.status(403).json({ success: false, message: "This OTP was not requested by your account." });

    try {
      const result = await verifySmsOtp(digits, otp.trim());
      if (result?.type !== "success")
        return res.status(400).json({ success: false, message: "Incorrect OTP. Please try again." });
    } catch (err) {
      const msg = (err?.response?.data?.message || "").toLowerCase();
      if (msg.includes("not match") || msg.includes("invalid") || msg.includes("wrong"))
        return res.status(400).json({ success: false, message: "Incorrect OTP. Please try again." });
      if (msg.includes("expire"))
        return res.status(400).json({ success: false, message: "OTP expired. Please request a new one." });
      console.error("[VERIFY-CHANGE-PHONE-OTP] MSG91 verify error:", err?.response?.data || err.message);
      return res.status(500).json({ success: false, message: "OTP verification failed. Please try again." });
    }

    // Re-check uniqueness at the moment of update (race-condition safety)
    const taken = await StudentUser.findOne({ phone: digits, _id: { $ne: studentId } }).select("_id");
    if (taken)
      return res.status(409).json({ success: false, message: "This phone number is already registered to another account." });

    let student;
    try {
      student = await StudentUser.findByIdAndUpdate(studentId, { phone: digits }, { new: true });
    } catch (err) {
      if (err.code === 11000)
        return res.status(409).json({ success: false, message: "This phone number is already registered to another account." });
      throw err;
    }
    if (!student) return res.status(404).json({ success: false, message: "Account not found" });

    await PhoneOTP.findByIdAndUpdate(record._id, { isUsed: true });

    const newToken = jwt.sign(
      { id: student._id, name: student.name, email: student.email, phone: student.phone, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.json({
      success: true,
      token: newToken,
      user: {
        _id: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        class: student.className,
        avatar: (student.avatar && !student.avatar.startsWith("data:")) ? student.avatar : "",
      },
    });
  } catch (err) {
    console.error("[VERIFY-CHANGE-PHONE-OTP] Error:", err.message);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}
