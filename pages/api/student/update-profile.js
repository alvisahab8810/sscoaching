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

    // Phone is intentionally NOT accepted here — it's the OTP-verified account
    // identity (used for login & password reset), so changing it goes through
    // /api/auth/send-change-phone-otp + /api/auth/verify-change-phone-otp,
    // which prove the student actually owns the new number before saving it.
    const { name, className, batch, email } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }

    if (!className) {
      return res.status(400).json({ success: false, message: "Class is required" });
    }

    const updates = {
      name: name.trim(),
      className,
      batch: batch || "",
      isProfileComplete: true,
    };

    if (email) {
      const normalEmail = email.toLowerCase().trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalEmail))
        return res.status(400).json({ success: false, message: "Enter a valid email address" });

      const taken = await StudentUser.findOne({ email: normalEmail, _id: { $ne: decoded.id } }).select("_id");
      if (taken)
        return res.status(409).json({ success: false, message: "This email is already registered to another account." });

      updates.email = normalEmail;
    }

    let student;
    try {
      student = await StudentUser.findByIdAndUpdate(decoded.id, updates, { new: true });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ success: false, message: "This email is already registered to another account." });
      }
      throw err;
    }

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      student: {
        _id: student._id,
        name: student.name,
        phone: student.phone,
        email: student.email,
        class: student.className,
        className: student.className,
        batch: student.batch || "",
        avatar: (student.avatar && !student.avatar.startsWith("data:")) ? student.avatar : "",
        isProfileComplete: student.isProfileComplete,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Server error" });
  }
}