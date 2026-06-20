import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const adminToken = req.cookies?.admin_token;
  const subAdminToken = req.cookies?.subadmin_token;

  // Sub-admin token takes priority — if both somehow coexist, sub-admin is the active session
  if (subAdminToken) {
    try {
      const decoded = jwt.verify(subAdminToken, process.env.JWT_SECRET);
      if (decoded.role === "subadmin") {
        return res.status(200).json({
          role: "sub",
          id: decoded.id,
          name: decoded.name,
          username: decoded.username,
          email: decoded.email,
          permissions: decoded.permissions || [],
        });
      }
    } catch {}
  }

  if (adminToken) {
    try {
      const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
      return res.status(200).json({ role: "super", email: decoded.email, id: decoded.id });
    } catch {}
  }

  return res.status(401).json({ message: "Not authenticated" });
}
