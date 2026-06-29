// pages/api/courses/index.js  (add GET for public/student use — keep existing admin POST)
// This file REPLACES your existing pages/api/courses/index.js

import dbConnect from "@/lib/dbConnect";
import Course from "@/models/CourseModel";
import Enrollment from "@/models/EnrollmentModel";
import jwt from "jsonwebtoken";
import { logActivity } from "@/lib/logActivity";

function verifyAdmin(req) {
  try {
    const adminToken = req.cookies?.admin_token;
    if (adminToken) { jwt.verify(adminToken, process.env.JWT_SECRET); return true; }
    const subToken = req.cookies?.subadmin_token;
    if (subToken) { const d = jwt.verify(subToken, process.env.JWT_SECRET); return d.role === "subadmin"; }
    return false;
  } catch { return false; }
}

const SUBJECT_IMAGES = {
  hindi:       "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  physics:     "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&q=80",
  chemistry:   "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
  mathematics: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
  maths:       "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
  english:     "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80",
  biology:     "https://images.unsplash.com/photo-1530026405186-ed1f139313f0?w=600&q=80",
  science:     "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=600&q=80",
  history:     "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&q=80",
  geography:   "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80",
  default:     "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
};

function getDefaultImage(subject) {
  if (!subject) return SUBJECT_IMAGES.default;
  const key = subject.toLowerCase().trim();
  return SUBJECT_IMAGES[key] || SUBJECT_IMAGES.default;
}

function withFallbackImage(course) {
  const img = course.featureImage;
  const isBase64 = img && img.startsWith("data:");
  const isValid  = img && !isBase64;
  return {
    ...course,
    featureImage: isValid ? img : getDefaultImage(course.subject),
  };
}

function getStudentId(req) {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.replace("Bearer ", "").trim();
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id || decoded._id || null;
  } catch { return null; }
}

// In-process cache (effective for long-running servers and Next.js dev mode)
let _courseCache = null;
let _courseCacheAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export default async function handler(req, res) {
  await dbConnect();

  /* ── GET — public course list ── */
  if (req.method === "GET") {
    try {
      const { admin } = req.query;

      // admin wants all courses (any status) — bypass cache
      if (admin === "1" && verifyAdmin(req)) {
        const courses = await Course.find({}).sort({ createdAt: -1 }).lean();
        return res.status(200).json({ success: true, courses: courses.map(withFallbackImage) });
      }

      // Serve from in-process cache if fresh (avoids repeated slow MongoDB queries)
      const now = Date.now();
      if (!_courseCache || now - _courseCacheAt > CACHE_TTL_MS) {
        // Exclude heavy fields that bloat the response
        const raw = await Course.find({ status: "published" })
          .sort({ createdAt: -1 })
          .select("-chapters.lessons.youtubeLink -chapters.lessons.videoUrl -chapters.lessons.bunnyVideoId -chapters.lessons.notes -materials")
          .lean();
        _courseCache = raw.map(withFallbackImage);
        _courseCacheAt = now;
      }

      // Also set CDN-level cache for Vercel / proxies
      res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=120");
      return res.status(200).json({ success: true, courses: _courseCache });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch courses" });
    }
  }

  /* ── POST — create course (admin only) ── */
  if (req.method === "POST") {
    if (!verifyAdmin(req)) return res.status(401).json({ error: "Unauthorized" });
    try {
      const { title, description, subject, batch, price, isFree, status, featureImage, courseType, bundledSubjects, includedCourses } = req.body;
      const isBundle = courseType === "bundle";
      if (!title || !batch) return res.status(400).json({ error: "Title and batch are required" });
      if (!isBundle && !subject) return res.status(400).json({ error: "Subject is required for subject courses" });

      const course = await Course.create({
        courseType: isBundle ? "bundle" : "subject",
        title, description, batch,
        subject: isBundle ? "" : subject,
        price: isFree ? 0 : Number(price) || 0,
        isFree: !!isFree,
        status: status || "draft",
        featureImage: featureImage || "",
        chapters: [],
        bundledSubjects: isBundle ? (bundledSubjects || []) : [],
        includedCourses: isBundle ? (includedCourses || []) : [],
      });
      _courseCache = null; // Invalidate list cache on course creation

      await logActivity(req, {
        feature: "courses", action: "create",
        entityId: course._id, entityType: "Course",
        description: `Created ${isBundle ? "bundle" : "course"}: "${title}"`,
        after: { title, subject: isBundle ? bundledSubjects : subject, batch, status: status || "draft", courseType: course.courseType },
      });

      return res.status(201).json({ success: true, course });
    } catch (err) {
      return res.status(500).json({ error: "Failed to create course" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}


