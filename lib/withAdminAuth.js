import jwt from "jsonwebtoken";

export function withAdminAuth(gssp) {
  return async (context) => {
    const { req } = context;
    const token = req.cookies?.admin_token;

    if (!token) {
      return {
        redirect: {
          destination: "/dashboard/admin/login",
          permanent: false,
        },
      };
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return {
        redirect: {
          destination: "/dashboard/admin/login",
          permanent: false,
        },
      };
    }

    return await gssp(context);
  };
}
