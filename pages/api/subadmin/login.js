import dbConnect from "@/lib/dbConnect";
import SubAdmin from "@/models/SubAdmin";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();

  const { username, password } = req.body;
  if (!username?.trim() || !password?.trim()) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const subAdmin = await SubAdmin.findOne({ username: username.trim() });
  if (!subAdmin) return res.status(401).json({ message: "Invalid credentials" });

  if (subAdmin.status === "inactive") {
    return res.status(403).json({ message: "Your account is deactivated. Contact the administrator." });
  }

  if (subAdmin.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: subAdmin._id,
      username: subAdmin.username,
      name: subAdmin.name,
      email: subAdmin.email,
      role: "subadmin",
      permissions: subAdmin.permissions,
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

  res.setHeader("Set-Cookie", [
    cookie.serialize("subadmin_token", token, { ...cookieOpts, maxAge: 8 * 60 * 60 }),
    cookie.serialize("admin_token", "", { ...cookieOpts, maxAge: 0 }),
  ]);

  return res.status(200).json({ success: true, permissions: subAdmin.permissions });
}
