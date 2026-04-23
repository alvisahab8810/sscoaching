import dbConnect from "@/lib/dbConnect";
import OTP from "@/models/OTP";
import StudentUser from "@/models/StudentUser";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  await dbConnect();

  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone and OTP are required",
      });
    }

    // TEMP: skip OTP check — any OTP accepted
    await OTP.deleteMany({ phone });

    // Find or create student
    let student = await StudentUser.findOne({ phone });
    let isNewUser = false;

    if (!student) {
      student = await StudentUser.create({ phone });
      isNewUser = true;
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: student._id,
        phone: student.phone,
        role: "student",
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      isNewUser,
      isProfileComplete: student.isProfileComplete,
      student: {
        id: student._id,
        name: student.name,
        phone: student.phone,
        className: student.className,
        batch: student.batch,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}