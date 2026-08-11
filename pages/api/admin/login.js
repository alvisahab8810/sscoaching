import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();

  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid email or password" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ message: "Invalid email or password" });

  // Issue full session token with 8-hour expiry — OTP step removed, straight to login
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
