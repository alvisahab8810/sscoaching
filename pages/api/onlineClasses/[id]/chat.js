import dbConnect from "@/lib/dbConnect";
import LiveClass from "@/models/LiveClassModel";
import LiveClassChat from "@/models/LiveClassChat";
import Enrollment from "@/models/EnrollmentModel";
import Course from "@/models/CourseModel";
import jwt from "jsonwebtoken";

function getStudentFromReq(req) {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "").trim();
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { id: decoded.id || decoded._id, name: decoded.name || decoded.fullName || "Student" };
  } catch { return null; }
}

async function isAccessAllowed(studentId, classId) {
  const cls = await LiveClass.findById(classId).select("course subject batch").lean();
  if (!cls) return false;

  const enrollments = await Enrollment.find({ student: studentId, status: "active" }).select("course").lean();
  if (!enrollments.length) return false;

  const enrolledIds = new Set(enrollments.map(e => String(e.course)));

  if (cls.course) {
    // Direct course link — check course enrollment (including bundle children)
    if (enrolledIds.has(String(cls.course))) return true;
    // Check if any enrolled bundle includes this course
    const bundles = await Course.find({ _id: { $in: [...enrolledIds] }, courseType: "bundle", includedCourses: cls.course }).lean();
    return bundles.length > 0;
  } else {
    // Subject::batch fallback
    const courseIds = [...enrolledIds];
    const courses = await Course.find({ _id: { $in: courseIds } }).select("subject batch courseType bundledSubjects").lean();
    for (const c of courses) {
      const subs = c.courseType === "bundle" ? (c.bundledSubjects || []) : [c.subject];
      for (const sub of subs) {
        if (sub?.toLowerCase() === cls.subject?.toLowerCase() && c.batch?.toLowerCase() === cls.batch?.toLowerCase()) return true;
      }
    }
    return false;
  }
}

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  const student = getStudentFromReq(req);
  if (!student) return res.status(401).json({ success: false, message: "Login required" });

  const allowed = await isAccessAllowed(student.id, id);
  if (!allowed) return res.status(403).json({ success: false, message: "Enroll in this course to access chat" });

  // GET — poll latest messages
  if (req.method === "GET") {
    try {
      const messages = await LiveClassChat.find({ classId: id })
        .sort({ createdAt: -1 }).limit(60).lean();
      return res.status(200).json({ success: true, messages: messages.reverse() });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // POST — send a message
  if (req.method === "POST") {
    try {
      const { message } = req.body;
      if (!message?.trim()) return res.status(400).json({ success: false, message: "Message cannot be empty" });
      if (message.trim().length > 500) return res.status(400).json({ success: false, message: "Message too long (max 500 chars)" });

      const chat = await LiveClassChat.create({
        classId: id,
        senderName: student.name,
        message: message.trim(),
      });
      return res.status(201).json({ success: true, chat });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
