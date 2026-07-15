import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "PUT") return res.status(405).end();
  await dbConnect();

  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return res.status(400).json({ success: false, message: "Both passwords required" });

    const student = await StudentUser.findById(id).select("+password");
    if (!student)
      return res.status(404).json({ success: false, message: "User not found" });

    if (newPassword.length < 6)
      return res.status(400).json({ success: false, message: "New password must be at least 6 characters" });

    if (student.password) {
      const match = await bcrypt.compare(currentPassword, student.password);
      if (!match)
        return res.status(400).json({ success: false, message: "Current password is incorrect" });

      const sameAsOld = await bcrypt.compare(newPassword, student.password);
      if (sameAsOld)
        return res.status(400).json({ success: false, message: "New password cannot be the same as your current password" });
    }

    student.password = await bcrypt.hash(newPassword, 10);
    await student.save();

    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}
