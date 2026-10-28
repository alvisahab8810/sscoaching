import jwt from "jsonwebtoken";
import dbConnect from "./dbConnect";
import TeacherActivityLog from "@/models/TeacherActivityLog";

/**
 * Auth helpers for the teacher portal.
 *
 * Teachers carry their own cookie (teacher_token) so an admin or
 * sub-admin session is never mistaken for a teaching one, and a teacher
 * can never reach an admin API.
 */

function resolveIp(req) {
  const raw =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    null;
  if (!raw || raw === "::1" || raw === "127.0.0.1" || raw.startsWith("::ffff:127.")) {
    return null;
  }
  return raw.replace("::ffff:", "");
}

/** Returns the decoded teacher session, or null when not signed in. */
export function getTeacherSession(req) {
  try {
    const token = req.cookies?.teacher_token;
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "teacher") return null;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Guard for teacher API routes. Returns the session, or sends a 401 and
 * returns null -- so a caller can simply bail out when it gets null.
 */
export function requireTeacherApi(req, res) {
  const session = getTeacherSession(req);
  if (!session) {
    res.status(401).json({ success: false, message: "Not signed in" });
    return null;
  }
  return session;
}

/** Records one teacher action. Never throws -- logging must not break a request. */
export async function logTeacherActivity(
  req,
  { feature, action, entityId, entityType, description, before, after }
) {
  try {
    const session = getTeacherSession(req);
    if (!session) return;

    await dbConnect();
    await TeacherActivityLog.create({
      teacherId: session.id,
      teacherName: session.name,
      teacherUsername: session.username,
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
    console.error("[logTeacherActivity] failed:", err.message);
  }
}
