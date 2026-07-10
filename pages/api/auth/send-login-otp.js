import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import EmailOTP from "@/models/EmailOTP";
import { sendOtpEmail } from "@/lib/sendOtpEmail";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { identifier } = req.body;
  if (!identifier || !identifier.trim())
    return res.status(400).json({ success: false, message: "Email or phone number required" });

  const id = identifier.trim();
  const isPhone = /^\d{10}$/.test(id.replace(/\D/g, "")) && !id.includes("@");
  const query = isPhone
    ? { phone: id.replace(/\D/g, "") }
    : { email: id.toLowerCase() };

  try {
    const student = await StudentUser.findOne(query).select("_id name email phone isActive");
    if (!student)
      return res.status(404).json({ success: false, message: "No account found. Please register first." });
    if (!student.isActive)
      return res.status(403).json({ success: false, message: "Account disabled. Contact support." });
    if (!student.email)
      return res.status(400).json({ success: false, message: "No email linked to this account. Contact support." });

    // Rate limit: 1 OTP per minute
    const recent = await EmailOTP.findOne({
      email: student.email, purpose: "login", isUsed: false,
      createdAt: { $gt: new Date(Date.now() - 60_000) },
    });
    if (recent)
      return res.status(429).json({ success: false, message: "Please wait a minute before requesting another OTP." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await EmailOTP.findOneAndDelete({ email: student.email, purpose: "login", isUsed: false });
    await EmailOTP.create({
      email: student.email,
      otp,
      purpose: "login",
      expiresAt: new Date(Date.now() + 10 * 60_000),
    });

    const result = await sendOtpEmail({ name: student.name, email: student.email, otp });
    if (!result.success) {
      console.error("[SEND-LOGIN-OTP] Email failed:", result.error);
      return res.status(500).json({ success: false, message: "Failed to send OTP email. Please try again." });
    }

    // Mask email: ab***@gmail.com
    const masked = student.email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + b.replace(/./g, "*") + c);
    return res.json({ success: true, message: `OTP sent to ${masked}` });
  } catch (err) {
    console.error("[SEND-LOGIN-OTP] Error:", err.message);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
}
