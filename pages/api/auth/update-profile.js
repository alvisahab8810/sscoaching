import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();
  await dbConnect();

  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const { name, phone, class: className } = req.body;

    const updates = {};
    if (name)      updates.name      = name.trim();
    if (phone)     updates.phone     = phone.trim();
    if (className) updates.className = className.trim();

    const student = await StudentUser.findByIdAndUpdate(id, updates, { new: true });
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
        avatar: student.avatar,
      },
    });
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}
