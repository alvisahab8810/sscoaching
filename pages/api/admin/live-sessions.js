import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import SubAdminLiveSession from "@/models/SubAdminLiveSession";

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

  const sessions = await SubAdminLiveSession.find({}).sort({ lastSeen: -1 }).lean();

  const now = Date.now();
  const data = sessions.map(s => ({
    ...s,
    _id: String(s._id),
    subAdminId: String(s.subAdminId),
    secondsAgo: Math.floor((now - new Date(s.lastSeen).getTime()) / 1000),
    isActive: (now - new Date(s.lastSeen).getTime()) < 60000, // active within last 60s
  }));

  return res.status(200).json({ success: true, data, total: data.length });
}
