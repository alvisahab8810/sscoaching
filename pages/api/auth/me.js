import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  await dbConnect();

  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ success: false, message: "No token provided" });

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const student = await StudentUser.findById(id);
    if (!student)
      return res.status(404).json({ success: false, message: "User not found" });

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
