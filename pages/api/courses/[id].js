// pages/api/courses/[id].js — REPLACE your existing file
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

function getStudentId(req) {
  try {
    const auth  = req.headers.authorization || "";
    const token = auth.replace("Bearer ", "").trim();
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id || decoded._id || null;
  } catch { return null; }
}

export default async function handler(req, res) {
  await dbConnect();
  const { id, action } = req.query;

  if (req.method === "GET") {
    try {
      const course = await Course.findById(id).lean();
      if (!course) return res.status(404).json({ error: "Course not found" });
      if (verifyAdmin(req)) return res.status(200).json({ success: true, course });
      const studentId = getStudentId(req);
      let isEnrolled = false;
      if (studentId) {
        const enr = await Enrollment.findOne({ student: studentId, course: id, status: "active" });
        isEnrolled = !!enr;
      }
      if (!isEnrolled) {
        return res.status(200).json({
          success: true,
          course: {
            ...course, isEnrolled: false,
            chapters: course.chapters.map(ch => ({
              ...ch,
              lessons: ch.lessons.map(l => ({ _id: l._id, title: l.title, duration: l.duration })),
            })),
          },
        });
      }
      return res.status(200).json({ success: true, course: { ...course, isEnrolled: true } });
    } catch { return res.status(500).json({ error: "Failed to fetch course" }); }
  }

  if (!verifyAdmin(req)) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "PUT") {
    try {
      const course = await Course.findById(id);
      if (!course) return res.status(404).json({ error: "Course not found" });

      if (action === "info" || !action) {
        const { title, description, subject, batch, price, isFree, status, featureImage } = req.body;
        const before = { title: course.title, subject: course.subject, status: course.status };
        if (title)       course.title       = title;
        if (description !== undefined) course.description = description;
        if (subject)     course.subject     = subject;
        if (batch)       course.batch       = batch;
        if (status)      course.status      = status;
        if (featureImage !== undefined) course.featureImage = featureImage;
        if (isFree !== undefined) {
          course.isFree = !!isFree;
          course.price  = isFree ? 0 : Number(price) || course.price;
        } else if (price !== undefined) { course.price = Number(price) || 0; }
        await course.save();
        await logActivity(req, { feature: "courses", action: "update", entityId: id, entityType: "Course", description: `Updated course: "${course.title}"`, before, after: { title: course.title, subject: course.subject, status: course.status } });
        return res.status(200).json({ success: true, course });
      }

      if (action === "toggle-status") {
        const prevStatus = course.status;
        course.status = course.status === "published" ? "draft" : "published";
        await course.save();
        await logActivity(req, { feature: "courses", action: "update", entityId: id, entityType: "Course", description: `Toggled course status: "${course.title}" → ${course.status}`, before: { status: prevStatus }, after: { status: course.status } });
        return res.status(200).json({ success: true, course });
      }

      if (action === "add-chapter") {
        const { title } = req.body;
        if (!title) return res.status(400).json({ error: "Chapter title required" });
        course.chapters.push({ title, order: course.chapters.length + 1, lessons: [] });
        await course.save();
        return res.status(200).json({ success: true, course });
      }

      if (action === "delete-chapter") {
        const { chapterId } = req.body;
        course.chapters = course.chapters.filter(c => c._id.toString() !== chapterId);
        await course.save();
        return res.status(200).json({ success: true, course });
      }

      if (action === "add-lesson") {
        const { chapterId, title, youtubeLink, videoUrl, videoType, duration } = req.body;
        if (!title) return res.status(400).json({ error: "Lesson title required" });
        const vType = videoType || (youtubeLink ? "youtube" : videoUrl ? "custom" : "none");
        if (vType === "youtube" && !youtubeLink)
          return res.status(400).json({ error: "YouTube link required" });
        if (vType === "custom" && !videoUrl)
          return res.status(400).json({ error: "Video URL required" });
        const chapter = course.chapters.id(chapterId);
        if (!chapter) return res.status(404).json({ error: "Chapter not found" });
        chapter.lessons.push({
          title, youtubeLink: youtubeLink || "", videoUrl: videoUrl || "",
          videoType: vType, duration: duration || "", notes: [],
        });
        await course.save();
        return res.status(200).json({ success: true, course });
      }

      if (action === "delete-lesson") {
        const { chapterId, lessonId } = req.body;
        const chapter = course.chapters.id(chapterId);
        if (!chapter) return res.status(404).json({ error: "Chapter not found" });
        chapter.lessons = chapter.lessons.filter(l => l._id.toString() !== lessonId);
        await course.save();
        return res.status(200).json({ success: true, course });
      }

      if (action === "add-note") {
        const { chapterId, lessonId, noteTitle, fileUrl, type } = req.body;
        if (!noteTitle || !fileUrl)
          return res.status(400).json({ error: "Note title and file URL required" });
        const chapter = course.chapters.id(chapterId);
        if (!chapter) return res.status(404).json({ error: "Chapter not found" });
        const lesson = chapter.lessons.id(lessonId);
        if (!lesson) return res.status(404).json({ error: "Lesson not found" });
        lesson.notes.push({ title: noteTitle, fileUrl, type: type || "pdf" });
        await course.save();
        return res.status(200).json({ success: true, course });
      }

      if (action === "delete-note") {
        const { chapterId, lessonId, noteId } = req.body;
        const chapter = course.chapters.id(chapterId);
        if (!chapter) return res.status(404).json({ error: "Chapter not found" });
        const lesson = chapter.lessons.id(lessonId);
        if (!lesson) return res.status(404).json({ error: "Lesson not found" });
        lesson.notes = lesson.notes.filter(n => n._id.toString() !== noteId);
        await course.save();
        return res.status(200).json({ success: true, course });
      }

      return res.status(400).json({ error: "Unknown action" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Operation failed" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const before = await Course.findById(id).lean();
      await Course.findByIdAndDelete(id);
      await logActivity(req, { feature: "courses", action: "delete", entityId: id, entityType: "Course", description: `Deleted course: "${before?.title}"`, before: before ? { title: before.title, subject: before.subject, status: before.status } : null });
      return res.status(200).json({ success: true, message: "Course deleted" });
    } catch { return res.status(500).json({ error: "Failed to delete course" }); }
  }

  return res.status(405).json({ error: "Method not allowed" });
}










// // pages/api/courses/[id].js  — REPLACE your existing file with this
// import dbConnect from "@/lib/dbConnect";
// import Course from "@/models/CourseModel";
// import Enrollment from "@/models/EnrollmentModel";
// import jwt from "jsonwebtoken";

// function verifyAdmin(req) {
//   try {
//     const token = req.cookies?.admin_token;
//     if (!token) return false;
//     jwt.verify(token, process.env.JWT_SECRET);
//     return true;
//   } catch { return false; }
// }

// function getStudentId(req) {
//   try {
//     const auth  = req.headers.authorization || "";
//     const token = auth.replace("Bearer ", "").trim();
//     if (!token) return null;
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return decoded.id || decoded._id || null;
//   } catch { return null; }
// }

// export default async function handler(req, res) {
//   await dbConnect();
//   const { id, action } = req.query;

//   /* ══════════════════════════════════════════════════
//      GET — single course
//      Admin  → full data always
//      Student→ chapters+lessons shown, youtubeLinks only if enrolled
//   ══════════════════════════════════════════════════ */
//   if (req.method === "GET") {
//     try {
//       const course = await Course.findById(id).lean();
//       if (!course) return res.status(404).json({ error: "Course not found" });

//       // Admin — full access
//       if (verifyAdmin(req)) {
//         return res.status(200).json({ success: true, course });
//       }

//       // Student — check enrollment
//       const studentId = getStudentId(req);
//       let isEnrolled  = false;
//       if (studentId) {
//         const enr = await Enrollment.findOne({ student: studentId, course: id, status: "active" });
//         isEnrolled = !!enr;
//       }

//       if (!isEnrolled) {
//         // Show structure but hide links
//         const locked = {
//           ...course,
//           isEnrolled: false,
//           chapters: course.chapters.map(ch => ({
//             ...ch,
//             lessons: ch.lessons.map(l => ({
//               _id: l._id, title: l.title, duration: l.duration,
//             })),
//           })),
//         };
//         return res.status(200).json({ success: true, course: locked });
//       }

//       // Enrolled student — full data including youtubeLinks
//       return res.status(200).json({ success: true, course: { ...course, isEnrolled: true } });

//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Failed to fetch course" });
//     }
//   }

//   /* ══════════════════════════════════════════════════
//      PUT / DELETE — admin only
//   ══════════════════════════════════════════════════ */
//   if (!verifyAdmin(req)) return res.status(401).json({ error: "Unauthorized" });

//   if (req.method === "PUT") {
//     try {
//       const course = await Course.findById(id);
//       if (!course) return res.status(404).json({ error: "Course not found" });

//       if (action === "info" || !action) {
//         const { title, description, subject, batch, price, isFree, status, featureImage } = req.body;
//         if (title)       course.title       = title;
//         if (description !== undefined) course.description = description;
//         if (subject)     course.subject     = subject;
//         if (batch)       course.batch       = batch;
//         if (status)      course.status      = status;
//         if (featureImage !== undefined) course.featureImage = featureImage;
//         if (isFree !== undefined) {
//           course.isFree = !!isFree;
//           course.price  = isFree ? 0 : Number(price) || course.price;
//         } else if (price !== undefined) {
//           course.price = Number(price) || 0;
//         }
//         await course.save();
//         return res.status(200).json({ success: true, course });
//       }

//       if (action === "toggle-status") {
//         course.status = course.status === "published" ? "draft" : "published";
//         await course.save();
//         return res.status(200).json({ success: true, course });
//       }

//       if (action === "add-chapter") {
//         const { title } = req.body;
//         if (!title) return res.status(400).json({ error: "Chapter title required" });
//         course.chapters.push({ title, order: course.chapters.length + 1, lessons: [] });
//         await course.save();
//         return res.status(200).json({ success: true, course });
//       }

//       if (action === "delete-chapter") {
//         const { chapterId } = req.body;
//         course.chapters = course.chapters.filter(c => c._id.toString() !== chapterId);
//         await course.save();
//         return res.status(200).json({ success: true, course });
//       }

//       if (action === "add-lesson") {
//         const { chapterId, title, youtubeLink, duration } = req.body;
//         if (!title || !youtubeLink) return res.status(400).json({ error: "Title and YouTube link required" });
//         const chapter = course.chapters.id(chapterId);
//         if (!chapter) return res.status(404).json({ error: "Chapter not found" });
//         chapter.lessons.push({ title, youtubeLink, duration: duration || "" });
//         await course.save();
//         return res.status(200).json({ success: true, course });
//       }

//       if (action === "delete-lesson") {
//         const { chapterId, lessonId } = req.body;
//         const chapter = course.chapters.id(chapterId);
//         if (!chapter) return res.status(404).json({ error: "Chapter not found" });
//         chapter.lessons = chapter.lessons.filter(l => l._id.toString() !== lessonId);
//         await course.save();
//         return res.status(200).json({ success: true, course });
//       }

//       return res.status(400).json({ error: "Unknown action" });

//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Operation failed" });
//     }
//   }

//   if (req.method === "DELETE") {
//     try {
//       await Course.findByIdAndDelete(id);
//       return res.status(200).json({ success: true, message: "Course deleted" });
//     } catch {
//       return res.status(500).json({ error: "Failed to delete course" });
//     }
//   }

//   return res.status(405).json({ error: "Method not allowed" });
// }