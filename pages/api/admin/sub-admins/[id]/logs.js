import dbConnect from "@/lib/dbConnect";
import SubAdminActivityLog from "@/models/SubAdminActivityLog";
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
  if (req.method !== "GET") return res.status(405).end();
  if (!isSuperAdmin(req)) return res.status(403).json({ message: "Forbidden" });

  await dbConnect();
  const { id, page = 1, limit = 20, feature, action } = req.query;

  const filter = { subAdminId: id };
  if (feature) filter.feature = feature;
  if (action) filter.action = action;

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [logs, total] = await Promise.all([
    SubAdminActivityLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
    SubAdminActivityLog.countDocuments(filter),
  ]);

  return res.status(200).json({
    success: true,
    data: logs,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
  });
}
