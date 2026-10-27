import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // One-time seeder for the first admin account. It is disabled by default:
  // it creates a login from a hardcoded email and password, and it only
  // refused to run while an admin with that exact email already existed. Once
  // the real admin is renamed, an open endpoint here would let anyone create a
  // working admin account. Set ALLOW_ADMIN_SEED=true in the environment only
  // for the moment the seeder actually needs to run.
  if (process.env.ALLOW_ADMIN_SEED !== "true") {
    return res.status(404).json({ message: "Not found" });
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
