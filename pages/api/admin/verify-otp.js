import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";
import AdminOTP from "@/models/AdminOTP";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();

  const { pendingToken, otp } = req.body;

  if (!pendingToken || !otp) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Verify the pending token from step 1
  let payload;
  try {
    payload = jwt.verify(pendingToken, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ message: "Session expired. Please login again." });
  }

  if (payload.purpose !== "otp-pending") {
    return res.status(401).json({ message: "Invalid session token." });
  }

  const { email } = payload;

  // Find OTP record
  const record = await AdminOTP.findOne({ email });

  if (!record) {
    return res.status(401).json({ message: "OTP expired. Please login again." });
  }

  // Block after 3 failed attempts
  if (record.attempts >= 3) {
    await AdminOTP.deleteMany({ email });
    return res.status(401).json({ message: "Too many failed attempts. Please login again." });
  }

  // Check OTP
  if (record.otp !== otp.trim()) {
    await AdminOTP.updateOne({ email }, { $inc: { attempts: 1 } });
    const remaining = 2 - record.attempts;
    return res.status(401).json({
      message: `Incorrect OTP. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`,
    });
  }

  // OTP correct — delete it so it can't be reused
  await AdminOTP.deleteMany({ email });

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Admin not found." });

  // Issue full session token with 8-hour expiry
  const token = jwt.sign(
    { id: admin._id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  };

  res.setHeader("Set-Cookie", [
    cookie.serialize("admin_token", token, { ...cookieOpts, maxAge: 8 * 60 * 60 }),
    cookie.serialize("subadmin_token", "", { ...cookieOpts, maxAge: 0 }),
  ]);

  res.status(200).json({ success: true });
}
