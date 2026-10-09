import jwt from "jsonwebtoken";

/**
 * Admin auth check for API routes (the API-side counterpart of
 * withAdminAuth).
 *
 * A super admin has access to everything. A sub-admin is allowed only when
 * the requested feature is present in their JWT permissions.
 *
 * Returns: { role, id, ... } when allowed, otherwise null.
 */
export function requireAdminApi(req, feature) {
  const adminToken = req.cookies?.admin_token;
  const subAdminToken = req.cookies?.subadmin_token;

  if (adminToken) {
    try {
      const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
      return { role: "super", id: decoded.id, email: decoded.email };
    } catch {}
  }

  if (subAdminToken) {
    try {
      const decoded = jwt.verify(subAdminToken, process.env.JWT_SECRET);
      if (decoded.role === "subadmin") {
        const perms = decoded.permissions || [];
        if (!feature || perms.includes(feature)) {
          return {
            role: "sub",
            id: decoded.id,
            username: decoded.username,
            name: decoded.name,
            email: decoded.email,
            permissions: perms,
          };
        }
      }
    } catch {}
  }

  return null;
}
