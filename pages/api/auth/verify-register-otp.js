// POST /api/auth/verify-register-otp
// Verifies OTP, creates account, returns JWT
import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import EmailOTP from "@/models/EmailOTP";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ success: false, message: "Email and OTP required" });

  try {
    const normalEmail = email.toLowerCase().trim();
    const record = await EmailOTP.findOne({ email: normalEmail, purpose: "register", isUsed: false });

    if (!record)
      return res.status(400).json({ success: false, message: "No pending registration found. Please register again." });
    if (record.expiresAt < new Date())
      return res.status(400).json({ success: false, message: "OTP has expired. Please register again." });
    if (record.attempts >= 5) {
      await EmailOTP.deleteOne({ _id: record._id });
      return res.status(400).json({ success: false, message: "Too many wrong attempts. Please register again." });
    }
    if (record.otp !== otp.trim()) {
      await EmailOTP.findByIdAndUpdate(record._id, { $inc: { attempts: 1 } });
      const left = 4 - record.attempts;
      return res.status(400).json({ success: false, message: `Wrong OTP. ${left} attempt${left !== 1 ? "s" : ""} left.` });
    }

    // OTP correct — race condition guard for email
    const existing = await StudentUser.findOne({ email: normalEmail });
    if (existing) {
      await EmailOTP.findByIdAndUpdate(record._id, { isUsed: true });
      return res.status(409).json({ success: false, message: "This email is already registered. Please login." });
    }

    // Create account — store phone as undefined (not "") so sparse unique index doesn't conflict
    const { name, password, phone, className } = record.pendingData;
    let student;
    try {
      student = await StudentUser.create({
        name,
        email: normalEmail,
        password,
        phone: phone && phone.trim() ? phone.trim() : undefined,
        className: className || "",
        isProfileComplete: true,
      });
    } catch (err) {
      if (err.code === 11000) {
        const field = Object.keys(err.keyPattern || {})[0];
        const msg = field === "phone"
          ? "This phone number is already registered. Please login or use a different number."
          : "This email is already registered. Please login.";
        return res.status(409).json({ success: false, message: msg });
      }
      throw err;
    }

    await EmailOTP.findByIdAndUpdate(record._id, { isUsed: true });

    // Welcome email (non-blocking)
    import("@/lib/sendWelcomeEmail")
      .then(({ sendWelcomeEmail }) => sendWelcomeEmail({ name: student.name, email: student.email }))
      .catch(() => {});

    const token = jwt.sign(
      { id: student._id, phone: student.phone, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(201).json({
      success: true, token,
      user: {
        _id: student._id, name: student.name, email: student.email,
        phone: student.phone || "", class: student.className, avatar: "",
      },
    });
  } catch (err) {
    console.error("verify-register-otp error:", err);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}
