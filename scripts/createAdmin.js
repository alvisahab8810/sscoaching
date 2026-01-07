const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
require("dotenv").config();

// adjust path if needed
const Admin = require("../models/Admin");

const MONGO_URI = process.env.MONGODB_URI;

async function createAdmin() {
  if (!MONGO_URI) {
    console.error("❌ MONGODB_URI not found in .env");
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI);

  const email = "admin@sscoaching.in";
  const password = "Admin@123"; // 🔑 change later

  const hashedPassword = await bcrypt.hash(password, 10);

  const exists = await Admin.findOne({ email });
  if (exists) {
    console.log("⚠️ Admin already exists:", email);
    process.exit();
  }

  await Admin.create({
    email,
    password: hashedPassword,
  });

  console.log("✅ Admin created successfully");
  console.log("📧 Email:", email);
  console.log("🔑 Password:", password);

  process.exit();
}

createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
