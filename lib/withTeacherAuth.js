import jwt from "jsonwebtoken";

/**
 * Page-level guard for the teacher portal, the counterpart of
 * withAdminAuth. Puts the decoded teacher on context.teacherSession.
 */
export function withTeacherAuth(gssp) {
  return async (context) => {
    const { req } = context;
    const token = req.cookies?.teacher_token;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === "teacher") {
          context.teacherSession = {
            id: decoded.id,
            username: decoded.username,
            name: decoded.name,
            email: decoded.email,
          };
          return await gssp(context);
        }
      } catch {}
    }

    return {
      redirect: {
        destination: "/dashboard/teacher/login",
        permanent: false,
      },
    };
  };
}
