import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const origin = req.headers.origin || "no-origin";
  console.log(`[LOGIN] ${req.method} from origin: ${origin}`);

  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const { email, password } = req.body;
  console.log(`[LOGIN] identifier: ${email}, hasPassword: ${!!password}`);

  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email/phone and password required" });

  // Support login by email OR phone
  const identifier = email.trim();
  const isPhone = /^\d{10}$/.test(identifier.replace(/\D/g, "")) && !identifier.includes("@");
  console.log(`[LOGIN] isPhone: ${isPhone}, query field: ${isPhone ? "phone" : "email"}`);

  try {
    const query = isPhone
      ? { phone: identifier.replace(/\D/g, "") }
      : { email: identifier.toLowerCase() };
    const student = await StudentUser.findOne(query).select("+password");
    if (!student || !student.password) {
      console.log(`[LOGIN] Student not found for query:`, query);
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      console.log(`[LOGIN] Password mismatch for student: ${student._id}`);
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    if (!student.isActive) {
      console.log(`[LOGIN] Account disabled: ${student._id}`);
      return res.status(403).json({ success: false, message: "Account disabled. Contact support." });
    }

    const token = jwt.sign(
      { id: student._id, phone: student.phone, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    console.log(`[LOGIN] Success for student: ${student._id} (${student.email || student.phone})`);
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
    console.error(`[LOGIN] ERROR:`, err.message, err.stack);
    return res.status(500).json({ success: false, message: err.message || "Server error" });
  }
}
