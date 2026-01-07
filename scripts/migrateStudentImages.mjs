
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import mongoose from "mongoose";

/* ===============================
   CONFIG
================================= */
const uploadDir = path.join(process.cwd(), "public/uploads/students");
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

/* ===============================
   SAFETY CHECK
================================= */
if (!MONGO_URI) {
  console.error("❌ MongoDB URI not found in .env or .env.local");
  process.exit(1);
}

/* ===============================
   TEMP SCHEMA (NO IMPORTS)
================================= */
const StudentSuccessSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
  },
  { collection: "studentsuccesses" } // ⚠️ IMPORTANT: exact collection name
);

const StudentSuccess = mongoose.model(
  "StudentSuccess_Migration",
  StudentSuccessSchema
);

/* ===============================
   MIGRATION
================================= */
async function migrateImages() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connected for migration");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const students = await StudentSuccess.find({
    image: { $regex: /^data:image/ },
  });

  console.log(`🔍 Found ${students.length} base64 images`);

  for (const student of students) {
    try {
      const base64Data = student.image.split(",")[1];
      const buffer = Buffer.from(base64Data, "base64");

      const fileName = `student_${student._id}.png`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);

      student.image = `/uploads/students/${fileName}`;
      await student.save();

      console.log(`✔ Migrated: ${student.name}`);
    } catch (err) {
      console.error(`❌ Failed for ${student._id}`, err);
    }
  }

  console.log("🎉 Migration completed successfully");
  await mongoose.disconnect();
  process.exit(0);
}

migrateImages();
