import dbConnect from "@/lib/dbConnect";
import SubAdmin from "@/models/SubAdmin";
import SubAdminActivityLog from "@/models/SubAdminActivityLog";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function isSuperAdmin(req) {
  try {
    const token = req.cookies?.admin_token;
    if (!token) return false;
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (!isSuperAdmin(req)) return res.status(403).json({ message: "Forbidden" });

  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    const subAdmin = await SubAdmin.findById(id).lean();
    if (!subAdmin) return res.status(404).json({ message: "Sub-admin not found" });
    return res.status(200).json({ success: true, data: subAdmin });
  }

  if (req.method === "PATCH") {
    const subAdmin = await SubAdmin.findById(id);
    if (!subAdmin) return res.status(404).json({ message: "Sub-admin not found" });

    const { name, email, username, password, permissions, status } = req.body;
    const update = {};

    if (name?.trim()) update.name = name.trim();
    if (email?.trim()) update.email = email.toLowerCase().trim();
    if (username?.trim()) update.username = username.trim();
    if (Array.isArray(permissions)) update.permissions = permissions;
    if (status) update.status = status;
    if (password?.trim()) {
      update.password = password.trim();
      update.passwordHash = await bcrypt.hash(password.trim(), 10);
    }

    const updated = await SubAdmin.findByIdAndUpdate(id, update, { new: true }).lean();
    return res.status(200).json({ success: true, data: updated });
  }

  if (req.method === "DELETE") {
    await SubAdmin.findByIdAndDelete(id);
    await SubAdminActivityLog.deleteMany({ subAdminId: id });
    return res.status(200).json({ success: true, message: "Sub-admin deleted" });
  }

  return res.status(405).end();
}
