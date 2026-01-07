import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();

  const email = "admin@sscoaching.in";
  const password = "Admin@123"; // change later

  const exists = await Admin.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.create({
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    email,
    password,
  });
}
