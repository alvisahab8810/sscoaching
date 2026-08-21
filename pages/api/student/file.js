// Secure file proxy — verifies enrollment, streams file inline
// Files in private_uploads/ are NOT in public/ so direct URL access returns 404
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/models/EnrollmentModel";
import Course from "@/models/CourseModel";

export const config = { api: { responseLimit: false } };

// Range loading means pdf.js now issues many small byte-range requests for
// one document (a chunk per page or so) instead of a single full download.
// Re-running the JWT verify + Enrollment + Course Mongo lookups on EVERY
// one of those chunk requests undoes the whole point of range loading —
// each one was measured taking 400-900ms, almost entirely DB round-trip,
// so a 10-chunk PDF paid that cost 10 times over instead of once. This
// caches the "is this student allowed to read this exact file" decision
// for a few minutes so only the first chunk of a viewing session actually
// hits the DB; the rest are served straight off disk. A short TTL keeps
// the security window small — a de-enrolled student loses access again
// within minutes, not with the next server restart.
const authCache = new Map(); // `${studentId}:${courseId}:${matId}` -> { filePath, expires }
const AUTH_CACHE_TTL_MS = 5 * 60 * 1000;

function getCachedFilePath(key) {
  const hit = authCache.get(key);
  if (!hit) return null;
  if (Date.now() > hit.expires) { authCache.delete(key); return null; }
  return hit.filePath;
}

function setCachedFilePath(key, filePath) {
  authCache.set(key, { filePath, expires: Date.now() + AUTH_CACHE_TTL_MS });
  // Cheap unbounded-growth guard — this endpoint is only ever hit by
  // logged-in students viewing course material, so traffic is naturally
  // small, but never let a long-running process accumulate forever.
  if (authCache.size > 2000) {
    const oldestKey = authCache.keys().next().value;
    authCache.delete(oldestKey);
  }
}

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

  const cacheKey = `${studentId}:${courseId}:${matId}`;
  let filePath = getCachedFilePath(cacheKey);

  if (!filePath) {
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

    filePath = resolveFilePath(fileUrl);
    if (!filePath || !fs.existsSync(filePath))
      return res.status(404).send("File missing on server");

    setCachedFilePath(cacheKey, filePath);
  }

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
  // Without this, pdf.js can't fetch byte-ranges for individual pages — it
  // has to download the ENTIRE PDF before rendering even page 1. That's the
  // "long wait, then pages pop in with big blank gaps" symptom: a 20MB
  // notes PDF meant a full 20MB download up front instead of ~a page at a
  // time. Advertising range support here lets pdf.js request just the bytes
  // it needs, per page, on demand — first page shows almost instantly.
  res.setHeader("Accept-Ranges", "bytes");

  const stat = fs.statSync(filePath);
  const range = req.headers.range;

  if (range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(range);
    const start = match && match[1] ? parseInt(match[1], 10) : 0;
    const end   = match && match[2] ? parseInt(match[2], 10) : stat.size - 1;

    if (!match || start > end || end >= stat.size) {
      res.setHeader("Content-Range", `bytes */${stat.size}`);
      return res.status(416).end();
    }

    res.status(206);
    res.setHeader("Content-Range", `bytes ${start}-${end}/${stat.size}`);
    res.setHeader("Content-Length", end - start + 1);
    fs.createReadStream(filePath, { start, end }).pipe(res);
  } else {
    res.setHeader("Content-Length", stat.size);
    fs.createReadStream(filePath).pipe(res);
  }
}
