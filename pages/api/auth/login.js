import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password required" });

  try {
    const student = await StudentUser.findOne({ email: email.toLowerCase().trim() }).select("+password");
    if (!student || !student.password)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    const match = await bcrypt.compare(password, student.password);
    if (!match)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    if (!student.isActive)
      return res.status(403).json({ success: false, message: "Account disabled. Contact support." });

    const token = jwt.sign(
      { id: student._id, phone: student.phone, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        _id: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        class: student.className,
        avatar: student.avatar || "",
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || "Server error" });
  }
}
