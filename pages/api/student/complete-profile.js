import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  await dbConnect();

  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { name, className, batch } = req.body;

    if (!name || !className) {
      return res.status(400).json({
        success: false,
        message: "Name and class are required",
      });
    }

    const student = await StudentUser.findByIdAndUpdate(
      decoded.id,
      {
        name,
        className,
        batch: batch || "",
        isProfileComplete: true,
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      student: {
        id: student._id,
        name: student.name,
        phone: student.phone,
        className: student.className,
        batch: student.batch,
      },
    });
  } catch (error) {
    console.error("Complete profile error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}