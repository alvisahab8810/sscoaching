import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  await dbConnect();

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { name, className, batch } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    if (!className) {
      return res.status(400).json({ success: false, message: "Class is required" });
    }

    const student = await StudentUser.findByIdAndUpdate(
      decoded.id,
      {
        name: name.trim(),
        className,
        batch: batch || "",
        isProfileComplete: true,
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      student: {
        id: student._id,
        name: student.name,
        phone: student.phone,
        className: student.className,
        batch: student.batch,
        isProfileComplete: student.isProfileComplete,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Server error" });
  }
}