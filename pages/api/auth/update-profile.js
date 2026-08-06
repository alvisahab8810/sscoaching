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
    // Phone is the OTP-verified account identity (used for login & password
    // reset) — it is intentionally NOT editable here. Changing it goes through
    // the dedicated send-change-phone-otp / verify-change-phone-otp flow so the
    // new number is proven to belong to the student before it's saved.
    const { name, email, class: className } = req.body;

    const updates = {};
    if (name)      updates.name      = name.trim();
    if (className) updates.className = className.trim();

    if (email) {
      const normalEmail = email.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalEmail))
        return res.status(400).json({ success: false, message: "Enter a valid email address" });

      const taken = await StudentUser.findOne({ email: normalEmail, _id: { $ne: id } }).select("_id");
      if (taken)
        return res.status(409).json({ success: false, message: "This email is already registered to another account." });

      updates.email = normalEmail;
    }

    let student;
    try {
      student = await StudentUser.findByIdAndUpdate(id, updates, { new: true });
    } catch (err) {
      if (err.code === 11000)
        return res.status(409).json({ success: false, message: "This email is already registered to another account." });
      throw err;
    }
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
        role: "student",
        avatar: (student.avatar && !student.avatar.startsWith("data:")) ? student.avatar : "",
      },
    });
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}
