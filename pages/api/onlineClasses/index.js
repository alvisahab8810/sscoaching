import dbConnect from "@/lib/dbConnect";
import LiveClass from "@/models/LiveClassModel";
import Enrollment from "@/models/EnrollmentModel";
import Course from "@/models/CourseModel";
import { logActivity } from "@/lib/logActivity";
import jwt from "jsonwebtoken";

function getStudentId(req) {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "").trim();
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id || decoded._id || null;
  } catch { return null; }
}

function isAuthenticatedAdmin(req) {
  try {
    const adminToken = req.cookies?.admin_token || req.cookies?.subadmin_token;
    if (!adminToken) return false;
    jwt.verify(adminToken, process.env.JWT_SECRET);
    return true;
  } catch { return false; }
}

// Returns set of "subject::batch" strings the student is enrolled in
async function getStudentUnlockedKeys(studentId) {
  if (!studentId) return new Set();

  const enrollments = await Enrollment.find({ student: studentId, status: "active" })
    .select("course").lean();
  if (!enrollments.length) return new Set();

  const courseIds = enrollments.map(e => e.course);
  const courses = await Course.find({ _id: { $in: courseIds } })
    .select("subject batch courseType bundledSubjects includedCourses").lean();

  const keys = new Set();
  for (const c of courses) {
    if (c.courseType === "bundle") {
      // Bundle: unlock all bundledSubjects for this batch
      for (const sub of (c.bundledSubjects || [])) {
        keys.add(`${sub.toLowerCase()}::${c.batch.toLowerCase()}`);
      }
    } else {
      // Subject course: unlock that subject+batch
      if (c.subject) keys.add(`${c.subject.toLowerCase()}::${c.batch.toLowerCase()}`);
    }
  }
  return keys;
}

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { status, batch, page = 1, limit = 10 } = req.query;
      const filter = {};
      if (status) filter.status = status;
      if (batch) filter.batch = { $regex: `^${batch}$`, $options: "i" };
      const skip = (Number(page) - 1) * Number(limit);

      const [data, total] = await Promise.all([
        LiveClass.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        LiveClass.countDocuments(filter),
      ]);

      const isAdmin   = isAuthenticatedAdmin(req);
      const studentId = getStudentId(req);

      if (isAdmin) {
        return res.status(200).json({ success: true, data, pagination: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) } });
      }

      // Get enrolled subject+batch keys for this student
      const unlockedKeys = await getStudentUnlockedKeys(studentId);

      const safeData = data.map(cls => {
        const obj = cls.toObject ? cls.toObject() : cls;
        const key = `${(obj.subject || "").toLowerCase()}::${(obj.batch || "").toLowerCase()}`;
        const isUnlocked = unlockedKeys.has(key);

        if (!isUnlocked) {
          // Remove streamLink if not enrolled in matching subject+batch
          const { streamLink, ...rest } = obj;
          return { ...rest, isUnlocked: false };
        }
        return { ...obj, isUnlocked: true };
      });

      return res.status(200).json({ success: true, data: safeData, pagination: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) } });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message || "Server error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, teacher, subject, chapter, topic, batch, date, time, duration, streamLink, description, status } = req.body;
      if (!title || !teacher || !subject || !batch || !date || !time || !streamLink) {
        return res.status(400).json({ success: false, message: "Please fill all required fields" });
      }
      const liveClass = await LiveClass.create({ title, teacher, subject, chapter, topic, batch, date, time, duration, streamLink, description, status: status || "upcoming" });

      await logActivity(req, {
        feature: "online-classes", action: "create",
        entityId: liveClass._id, entityType: "LiveClass",
        description: `Created live class: "${title}"`,
        after: { title, teacher, subject, batch, date, time, status: status || "upcoming" },
      });

      return res.status(201).json({ success: true, message: "Live class scheduled successfully", data: liveClass });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message || "Server error" });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
