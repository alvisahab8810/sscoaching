import jwt from "jsonwebtoken";

export function withAdminAuth(gssp, { superAdminOnly = false } = {}) {
  return async (context) => {
    const { req } = context;
    const adminToken = req.cookies?.admin_token;
    const subAdminToken = req.cookies?.subadmin_token;

    if (adminToken) {
      try {
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
        context.adminSession = { role: "super", id: decoded.id, email: decoded.email };
        return await gssp(context);
      } catch {}
    }

    if (!superAdminOnly && subAdminToken) {
      try {
        const decoded = jwt.verify(subAdminToken, process.env.JWT_SECRET);
        if (decoded.role === "subadmin") {
          context.adminSession = {
            role: "sub",
            id: decoded.id,
            username: decoded.username,
            name: decoded.name,
            email: decoded.email,
            permissions: decoded.permissions || [],
          };
          return await gssp(context);
        }
      } catch {}
    }

    return {
      redirect: {
        destination: "/dashboard/admin/login",
        permanent: false,
      },
    };
  };
}
