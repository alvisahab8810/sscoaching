import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import { sendSmsOtp } from "@/lib/msg91";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { phone } = req.body || {};
  const digits = (phone || "").replace(/\D/g, "");

  if (digits.length !== 10) {
    return res.status(400).json({ success: false, message: "Enter a valid 10-digit mobile number" });
  }

  // Check student exists
  const student = await StudentUser.findOne({ phone: digits }).select("_id name");
  if (!student) {
    return res.status(404).json({ success: false, message: "No account found with this phone number. Please register first." });
  }

  try {
    const result = await sendSmsOtp(digits);
    if (result?.type === "success") {
      return res.json({ success: true, message: "OTP sent successfully" });
    }
    return res.status(500).json({ success: false, message: result?.message || "Failed to send OTP" });
  } catch (err) {
    console.error("MSG91 send error:", err?.response?.data || err.message);
    return res.status(500).json({ success: false, message: "Could not send OTP. Please try again." });
  }
}
