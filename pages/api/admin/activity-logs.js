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
  const { page = 1, limit = 30, subAdminId, feature, action, from, to, search } = req.query;

  const filter = {};
  if (subAdminId) filter.subAdminId = subAdminId;
  if (feature) filter.feature = feature;
  if (action) filter.action = action;
  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = toDate;
    }
  }
  if (search) {
    const regex = { $regex: search, $options: "i" };
    filter.$or = [
      { description: regex },
      { subAdminName: regex },
      { subAdminUsername: regex },
      { feature: regex },
      { action: regex },
      { entityType: regex },
    ];
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [logs, total] = await Promise.all([
    SubAdminActivityLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).lean(),
    SubAdminActivityLog.countDocuments(filter),
  ]);

  return res.status(200).json({
    success: true,
    data: logs.map(l => ({ ...l, _id: String(l._id), subAdminId: String(l.subAdminId) })),
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
  });
}
