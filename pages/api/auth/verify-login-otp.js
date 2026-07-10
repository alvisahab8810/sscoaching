import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import EmailOTP from "@/models/EmailOTP";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { identifier, otp } = req.body;
  if (!identifier || !otp)
    return res.status(400).json({ success: false, message: "Identifier and OTP required" });

  const id = identifier.trim();
  const isPhone = /^\d{10}$/.test(id.replace(/\D/g, "")) && !id.includes("@");
  const query = isPhone
    ? { phone: id.replace(/\D/g, "") }
    : { email: id.toLowerCase() };

  try {
    const student = await StudentUser.findOne(query).select("_id name email phone className avatar isActive");
    if (!student)
      return res.status(404).json({ success: false, message: "Account not found." });
    if (!student.isActive)
      return res.status(403).json({ success: false, message: "Account disabled. Contact support." });

    const record = await EmailOTP.findOne({ email: student.email, purpose: "login", isUsed: false });
    if (!record)
      return res.status(400).json({ success: false, message: "No pending OTP. Please request a new one." });
    if (record.expiresAt < new Date())
      return res.status(400).json({ success: false, message: "OTP expired. Please request a new one." });
    if (record.attempts >= 5) {
      await EmailOTP.deleteOne({ _id: record._id });
      return res.status(400).json({ success: false, message: "Too many wrong attempts. Please request a new OTP." });
    }
    if (record.otp !== otp.trim()) {
      await EmailOTP.findByIdAndUpdate(record._id, { $inc: { attempts: 1 } });
      const left = 4 - record.attempts;
      return res.status(400).json({ success: false, message: `Wrong OTP. ${left} attempt${left !== 1 ? "s" : ""} left.` });
    }

    await EmailOTP.findByIdAndUpdate(record._id, { isUsed: true });

    const token = jwt.sign(
      { id: student._id, email: student.email, phone: student.phone, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.json({
      success: true,
      token,
      user: {
        _id: student._id,
        name: student.name,
        email: student.email || "",
        phone: student.phone || "",
        class: student.className || "",
        avatar: student.avatar || "",
      },
    });
  } catch (err) {
    console.error("[VERIFY-LOGIN-OTP] Error:", err.message);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}
