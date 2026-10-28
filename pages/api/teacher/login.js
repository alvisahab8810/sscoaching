import dbConnect from "@/lib/dbConnect";
import Teacher from "@/models/Teacher";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();

  const { username, password } = req.body;
  if (!username?.trim() || !password?.trim()) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // The username is matched case-insensitively so a teacher typing
  // "Ramesh" instead of "ramesh" still gets in; the password is not.
  const teacher = await Teacher.findOne({
    username: { $regex: `^${username.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" },
  });
  if (!teacher) return res.status(401).json({ message: "Invalid credentials" });

  if (teacher.status === "inactive") {
    return res.status(403).json({ message: "Your account is deactivated. Contact the administrator." });
  }

  const match = await bcrypt.compare(password, teacher.passwordHash);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    {
      id: teacher._id,
      username: teacher.username,
      name: teacher.name,
      email: teacher.email,
      role: "teacher",
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  };

  // Clear any admin session on this browser so the two portals can never
  // be held at once.
  res.setHeader("Set-Cookie", [
    cookie.serialize("teacher_token", token, { ...cookieOpts, maxAge: 8 * 60 * 60 }),
    cookie.serialize("admin_token", "", { ...cookieOpts, maxAge: 0 }),
    cookie.serialize("subadmin_token", "", { ...cookieOpts, maxAge: 0 }),
  ]);

  await Teacher.findByIdAndUpdate(teacher._id, { lastLoginAt: new Date() });

  return res.status(200).json({ success: true, name: teacher.name });
}
