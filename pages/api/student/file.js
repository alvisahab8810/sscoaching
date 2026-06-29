// Secure file proxy — verifies enrollment, streams file inline
// Files in private_uploads/ are NOT in public/ so direct URL access returns 404
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/models/EnrollmentModel";
import Course from "@/models/CourseModel";

export const config = { api: { responseLimit: false } };

function resolveFilePath(fileUrl) {
  // New: /private_uploads/filename.ext → outside public
  if (fileUrl.startsWith("/private_uploads/")) {
    return path.join(process.cwd(), fileUrl);
  }
  // Legacy: /uploads/courses/filename.ext → inside public
  if (fileUrl.startsWith("/uploads/")) {
    return path.join(process.cwd(), "public", fileUrl);
  }
  return null;
}

export default async function handler(req, res) {
  const { token, courseId, matId } = req.query;

  if (!token || !courseId || !matId)
    return res.status(400).send("Missing params");

  let studentId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    studentId = decoded.id || decoded._id;
  } catch {
    return res.status(401).send("Unauthorized");
  }

  await dbConnect();

  const enrolled = await Enrollment.findOne({
    student: studentId,
    course: courseId,
    $or: [{ status: "active" }, { status: { $exists: false } }],
  }).lean();
  if (!enrolled) return res.status(403).send("Not enrolled in this course");

  const course = await Course.findById(courseId).lean();
  if (!course) return res.status(404).send("Course not found");

  const SECTIONS = ["books", "tma", "assignments", "samplePapers", "notes"];
  let fileUrl = null;
  for (const sec of SECTIONS) {
    const mat = (course.materials?.[sec] || []).find(m => m._id.toString() === matId);
    if (mat) { fileUrl = mat.fileUrl; break; }
  }
  if (!fileUrl) return res.status(404).send("File not found");

  const filePath = resolveFilePath(fileUrl);
  if (!filePath || !fs.existsSync(filePath))
    return res.status(404).send("File missing on server");

  const ext = path.extname(filePath).toLowerCase();
  const MIME = {
    ".pdf":  "application/pdf",
    ".doc":  "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".ppt":  "application/vnd.ms-powerpoint",
    ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".xls":  "application/vnd.ms-excel",
  };

  res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
  res.setHeader("Content-Disposition", "inline");
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  const stat = fs.statSync(filePath);
  res.setHeader("Content-Length", stat.size);

  fs.createReadStream(filePath).pipe(res);
}
