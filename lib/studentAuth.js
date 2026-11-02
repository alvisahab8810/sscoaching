/**
 * Student session checks that take the account's own status into account.
 *
 * A student JWT lives for 30 days, so verifying the signature alone keeps a
 * deactivated or deleted account signed in until the token expires. These
 * helpers read the account on every request, which is what makes "set to
 * Inactive" take effect at once on the website and in the mobile app.
 *
 * A dead session is always reported as 401, never 403: that is the status the
 * mobile app's response interceptor and the website both treat as "session
 * over, sign out", and the app is already published so it cannot learn a new
 * one without a rebuild.
 */
import jwt from "jsonwebtoken";
import StudentUser from "@/models/StudentUser";

export const DISABLED_MESSAGE =
  "Your account has been deactivated. Please contact SS Coaching support.";

export const REMOVED_MESSAGE =
  "This account no longer exists. Please sign up again.";

export function decodeStudentToken(req) {
  try {
    const header = (req.headers?.authorization || "").replace("Bearer ", "").trim();
    const token = header || req.query?.token || "";
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

// An account counts as usable only while it is active and not soft-deleted.
export function isAccountUsable(student) {
  return !!student && student.isActive !== false && !student.deletedAt;
}

/**
 * Verify the caller's token and confirm the account behind it is still
 * usable. Returns { ok: true, student, id } or { ok: false, status, message }.
 */
export async function requireActiveStudent(req) {
  const decoded = decodeStudentToken(req);
  const id = decoded?.id || decoded?._id;
  if (!id) return { ok: false, status: 401, message: "Unauthorized" };

  const student = await StudentUser.findById(id).select("isActive deletedAt").lean();
  if (!student) return { ok: false, status: 401, message: REMOVED_MESSAGE, accountRemoved: true };
  if (!isAccountUsable(student)) return { ok: false, status: 401, message: DISABLED_MESSAGE, disabled: true };

  return { ok: true, student, id: String(id), token: decoded };
}
