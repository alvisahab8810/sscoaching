import jwt from "jsonwebtoken";
import dbConnect from "./dbConnect";
import SubAdminActivityLog from "@/models/SubAdminActivityLog";

function resolveIp(req) {
  const raw = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket?.remoteAddress || null;
  if (!raw || raw === "::1" || raw === "127.0.0.1" || raw.startsWith("::ffff:127.")) return null;
  return raw.replace("::ffff:", ""); // strip IPv6-mapped IPv4 prefix
}

export function getSubAdminSession(req) {
  try {
    const token = req.cookies?.subadmin_token;
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "subadmin") return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function logActivity(req, { feature, action, entityId, entityType, description, before, after }) {
  try {
    const session = getSubAdminSession(req);
    if (!session) return;

    await dbConnect();
    await SubAdminActivityLog.create({
      subAdminId: session.id,
      subAdminName: session.name,
      subAdminUsername: session.username,
      feature,
      action,
      entityId: entityId ? String(entityId) : null,
      entityType: entityType || null,
      description: description || "",
      before: before ?? null,
      after: after ?? null,
      ip: resolveIp(req),
    });
  } catch (err) {
    console.error("[logActivity] failed:", err.message);
  }
}
