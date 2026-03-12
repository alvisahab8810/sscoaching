// pages/api/courses/index.js  (add GET for public/student use — keep existing admin POST)
// This file REPLACES your existing pages/api/courses/index.js

import dbConnect from "@/lib/dbConnect";
import Course from "@/models/CourseModel";
import Enrollment from "@/models/EnrollmentModel";
import jwt from "jsonwebtoken";

function verifyAdmin(req) {
  try {
    const token = req.cookies?.admin_token;
    if (!token) return false;
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch { return false; }
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

export default async function handler(req, res) {
  await dbConnect();

  /* ── GET — public course list (with optional enrollment status) ── */
  if (req.method === "GET") {
    try {
      const { admin } = req.query;

      // admin wants all courses (any status)
      if (admin === "1" && verifyAdmin(req)) {
        const courses = await Course.find({}).sort({ createdAt: -1 }).lean();
        return res.status(200).json({ success: true, courses });
      }

      // public / student: only published
      const courses = await Course.find({ status: "published" })
        .sort({ createdAt: -1 })
        .select("-chapters.lessons.youtubeLink") // hide links until enrolled
        .lean();

      // if student token present — mark enrolled courses
      const studentId = getStudentId(req);
      let enrolledIds = [];
      if (studentId) {
        const enrollments = await Enrollment.find({
          student: studentId, status: "active"
        }).select("course").lean();
        enrolledIds = enrollments.map(e => e.course.toString());
      }

      const coursesWithStatus = courses.map(c => ({
        ...c,
        isEnrolled: enrolledIds.includes(c._id.toString()),
      }));

      return res.status(200).json({ success: true, courses: coursesWithStatus });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch courses" });
    }
  }

  /* ── POST — create course (admin only) ── */
  if (req.method === "POST") {
    if (!verifyAdmin(req)) return res.status(401).json({ error: "Unauthorized" });
    try {
      const { title, description, subject, batch, price, isFree, status, featureImage } = req.body;
      if (!title || !subject || !batch)
        return res.status(400).json({ error: "Title, subject and batch are required" });

      const course = await Course.create({
        title, description, subject, batch,
        price: isFree ? 0 : Number(price) || 0,
        isFree: !!isFree,
        status: status || "draft",
        featureImage: featureImage || "",
        chapters: [],
      });
      return res.status(201).json({ success: true, course });
    } catch (err) {
      return res.status(500).json({ error: "Failed to create course" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}


