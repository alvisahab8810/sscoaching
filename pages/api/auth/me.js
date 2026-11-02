import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import jwt from "jsonwebtoken";
import { isAccountUsable, DISABLED_MESSAGE, REMOVED_MESSAGE } from "@/lib/studentAuth";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  await dbConnect();

  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ success: false, message: "No token provided" });

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const student = await StudentUser.findById(id);

    // A deleted or deactivated account must end the session on the spot.
    // 401 (not 404/403) is what the website and the published mobile app
    // both read as "signed out", so the student is dropped to the login
    // screen on their next request from either one.
    if (!student)
      return res.status(401).json({ success: false, message: REMOVED_MESSAGE, accountRemoved: true });
    if (!isAccountUsable(student))
      return res.status(401).json({ success: false, message: DISABLED_MESSAGE, disabled: true });

    return res.status(200).json({
      success: true,
      user: {
        _id: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        class: student.className,
        className: student.className,
        batch: student.batch || "",
        avatar: (student.avatar && !student.avatar.startsWith("data:")) ? student.avatar : "",
      },
    });
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}
