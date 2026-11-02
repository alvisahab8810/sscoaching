import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { name, email, password, phone, class: className } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: "Name, email and password are required" });

  try {
    const normalPhone = (phone || "").replace(/\D/g, "");

    // An account that exists already blocks a second signup on the same
    // email or number. When that account has been deactivated the student
    // is told so plainly instead of being pointed at the login screen.
    const existing = await StudentUser.findOne({
      $or: [
        { email: email.toLowerCase().trim() },
        ...(normalPhone ? [{ phone: normalPhone }] : []),
      ],
    });
    if (existing && existing.isActive === false)
      return res.status(403).json({
        success: false,
        message: "This account has been deactivated. Please contact SS Coaching support.",
      });
    if (existing)
      return res.status(409).json({
        success: false,
        message: existing.email === email.toLowerCase().trim()
          ? "Email already registered"
          : "This phone number is already registered. Please login.",
      });

    const hashed = await bcrypt.hash(password, 10);
    const student = await StudentUser.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
      phone: phone || "",
      className: className || "",
      isProfileComplete: true,
      signupSource: "web",
    });

    const token = jwt.sign(
      { id: student._id, phone: student.phone, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // Send welcome email (non-blocking — never fail the registration)
    import("@/lib/sendWelcomeEmail")
      .then(({ sendWelcomeEmail }) => sendWelcomeEmail({ name: student.name, email: student.email }))
      .catch(() => {});

    return res.status(201).json({
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
