// pages/api/courses/[id].js — REPLACE your existing file
import mongoose from "mongoose";
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
      const courseRaw = await Course.findById(id).lean();
      if (!courseRaw) return res.status(404).json({ error: "Course not found" });
      const SUBJECT_IMAGES = { hindi:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80", physics:"https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&q=80", chemistry:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80", mathematics:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80", maths:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80", english:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80", biology:"https://images.unsplash.com/photo-1530026405186-ed1f139313f0?w=600&q=80", default:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80" };
      const _img = courseRaw.featureImage;
      const _fallback = SUBJECT_IMAGES[(courseRaw.subject||"").toLowerCase()] || SUBJECT_IMAGES.default;
      const course = { ...courseRaw, featureImage: (_img && !_img.startsWith("data:")) ? _img : _fallback };
      if (verifyAdmin(req)) return res.status(200).json({ success: true, course });
      const studentId = getStudentId(req);
      let isEnrolled = false;
      if (studentId) {
        // Direct enrollment check
        const enr = await Enrollment.findOne({ student: studentId, course: id, status: "active" });
        isEnrolled = !!enr;

        // Bundle enrollment check — student may have bought a bundle that includes this course
        if (!isEnrolled) {
          const allEnrollments = await Enrollment.find({ student: studentId, status: "active" }).select("course").lean();
          const enrolledCourseIds = allEnrollments.map(e => String(e.course));
          if (enrolledCourseIds.length > 0) {
            const bundleWithThisCourse = await Course.findOne({
              _id: { $in: enrolledCourseIds },
              courseType: "bundle",
              includedCourses: id,
            }).select("_id").lean();
            isEnrolled = !!bundleWithThisCourse;
          }
        }
      }
      if (!isEnrolled) {
        return res.status(200).json({
          success: true,
          course: {
            ...course, isEnrolled: false,
            chapters: course.chapters.map((ch, chIdx) => ({
              ...ch,
              lessons: ch.lessons.map((l, lIdx) => {
                const isDemoLesson = chIdx === 0 && lIdx === 0;
                if (isDemoLesson || l.isFree) {
                  // First lesson (demo) and free lessons: include video data
                  return {
                    _id: l._id, title: l.title, duration: l.duration, isFree: l.isFree,
                    videoUrl: l.videoUrl, youtubeLink: l.youtubeLink,
                    videoType: l.videoType, bunnyVideoId: l.bunnyVideoId,
                  };
                }
                return { _id: l._id, title: l.title, duration: l.duration, isFree: l.isFree };
              }),
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

      if (action === "edit-chapter") {
        const { chapterId, title } = req.body;
        if (!title?.trim()) return res.status(400).json({ error: "Chapter title required" });
        const chapter = course.chapters.id(chapterId);
        if (!chapter) return res.status(404).json({ error: "Chapter not found" });
        chapter.title = title.trim();
        await course.save();
        return res.status(200).json({ success: true, course });
      }

      if (action === "delete-chapter") {
        const { chapterId } = req.body;
        course.chapters = course.chapters.filter(c => c._id.toString() !== chapterId);
        await course.save();
        return res.status(200).json({ success: true, course });
      }

      if (action === "reorder-chapters") {
        const { chapterIds } = req.body;
        if (!Array.isArray(chapterIds) || !chapterIds.length)
          return res.status(400).json({ error: "chapterIds required" });
        const byId = new Map(course.chapters.map(c => [c._id.toString(), c]));
        if (chapterIds.length !== byId.size || chapterIds.some(cid => !byId.has(cid)))
          return res.status(400).json({ error: "chapterIds must match existing chapters" });
        course.chapters = chapterIds.map((cid, idx) => {
          const ch = byId.get(cid);
          ch.order = idx + 1;
          return ch;
        });
        await course.save();
        return res.status(200).json({ success: true, course });
      }

      if (action === "add-lesson") {
        const { chapterId, title, youtubeLink, videoUrl, videoType, duration } = req.body;
        if (!title) return res.status(400).json({ error: "Lesson title required" });
        const vType = videoType || (youtubeLink ? "youtube" : videoUrl ? "custom" : "none");
        if (vType === "youtube" && !youtubeLink)
          return res.status(400).json({ error: "YouTube link required" });
        if ((vType === "custom" || vType === "bunny") && !videoUrl)
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

      if (action === "edit-lesson") {
        const { chapterId, lessonId, title, youtubeLink, videoUrl, videoType, duration } = req.body;
        if (!title?.trim()) return res.status(400).json({ error: "Topic title required" });
        const chapter = course.chapters.id(chapterId);
        if (!chapter) return res.status(404).json({ error: "Chapter not found" });
        const lesson = chapter.lessons.id(lessonId);
        if (!lesson) return res.status(404).json({ error: "Lesson not found" });
        lesson.title = title.trim();
        if (videoType !== undefined) {
          if (videoType === "youtube" && !youtubeLink)
            return res.status(400).json({ error: "YouTube link required" });
          if ((videoType === "custom" || videoType === "bunny") && !videoUrl)
            return res.status(400).json({ error: "Video URL required" });
          lesson.videoType   = videoType;
          lesson.youtubeLink = youtubeLink || "";
          lesson.videoUrl    = videoUrl || "";
        }
        if (duration !== undefined) lesson.duration = duration;
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

      if (action === "reorder-lessons") {
        const { chapterId, lessonIds } = req.body;
        if (!Array.isArray(lessonIds) || !lessonIds.length)
          return res.status(400).json({ error: "lessonIds required" });
        const chapter = course.chapters.id(chapterId);
        if (!chapter) return res.status(404).json({ error: "Chapter not found" });
        const byId = new Map(chapter.lessons.map(l => [l._id.toString(), l]));
        if (lessonIds.length !== byId.size || lessonIds.some(lid => !byId.has(lid)))
          return res.status(400).json({ error: "lessonIds must match existing topics" });
        chapter.lessons = lessonIds.map(lid => byId.get(lid));
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

      // Materials: add file to books/tma/assignments/samplePapers/notes
      if (action === "add-material") {
        const { section, title, fileUrl } = req.body;
        const validSections = ["books", "tma", "assignments", "samplePapers", "notes"];
        if (!validSections.includes(section)) return res.status(400).json({ error: "Invalid section" });
        if (!title || !fileUrl) return res.status(400).json({ error: "title and fileUrl required" });
        if (!course.materials) course.materials = {};
        if (!course.materials[section]) course.materials[section] = [];
        course.materials[section].push({ title, fileUrl });
        course.markModified("materials");
        await course.save();
        return res.status(200).json({ success: true, course });
      }

      if (action === "delete-material") {
        const { section, materialId } = req.body;
        if (!course.materials?.[section]) return res.status(400).json({ error: "Section not found" });
        course.materials[section] = course.materials[section].filter(m => m._id.toString() !== materialId);
        course.markModified("materials");
        await course.save();
        return res.status(200).json({ success: true, course });
      }

      // FAQs
      if (action === "add-faq") {
        const { question, answer } = req.body;
        if (!question?.trim() || !answer?.trim())
          return res.status(400).json({ error: "Question and answer required" });
        course.faqs.push({ question: question.trim(), answer: answer.trim(), order: course.faqs.length + 1 });
        await course.save();
        await logActivity(req, { feature: "courses", action: "update", entityId: id, entityType: "Course", description: `Added FAQ to course: "${course.title}"` });
        return res.status(200).json({ success: true, course });
      }

      if (action === "edit-faq") {
        const { faqId, question, answer } = req.body;
        if (!question?.trim() || !answer?.trim())
          return res.status(400).json({ error: "Question and answer required" });
        const faq = course.faqs.id(faqId);
        if (!faq) return res.status(404).json({ error: "FAQ not found" });
        faq.question = question.trim();
        faq.answer = answer.trim();
        await course.save();
        await logActivity(req, { feature: "courses", action: "update", entityId: id, entityType: "Course", description: `Edited FAQ on course: "${course.title}"` });
        return res.status(200).json({ success: true, course });
      }

      if (action === "delete-faq") {
        const { faqId } = req.body;
        course.faqs = course.faqs.filter(f => f._id.toString() !== faqId);
        await course.save();
        await logActivity(req, { feature: "courses", action: "update", entityId: id, entityType: "Course", description: `Deleted FAQ from course: "${course.title}"` });
        return res.status(200).json({ success: true, course });
      }

      if (action === "reorder-faqs") {
        const { faqIds } = req.body;
        if (!Array.isArray(faqIds) || !faqIds.length)
          return res.status(400).json({ error: "faqIds required" });
        const byId = new Map(course.faqs.map(f => [f._id.toString(), f]));
        if (faqIds.length !== byId.size || faqIds.some(fid => !byId.has(fid)))
          return res.status(400).json({ error: "faqIds must match existing FAQs" });
        course.faqs = faqIds.map((fid, idx) => {
          const f = byId.get(fid);
          f.order = idx + 1;
          return f;
        });
        await course.save();
        return res.status(200).json({ success: true, course });
      }

      // Bundle: update includedCourses list
      if (action === "update-bundle") {
        const { bundledSubjects, includedCourses } = req.body;
        if (bundledSubjects) course.bundledSubjects = bundledSubjects;
        if (includedCourses) course.includedCourses = includedCourses;
        await course.save();
        return res.status(200).json({ success: true, course });
      }

      // ── Bundle subject content actions — use raw MongoDB ops to bypass schema cache ──

      if (action === "add-bsubject-chapter") {
        const { subject, title } = req.body;
        if (!subject || !title) return res.status(400).json({ error: "Subject and title required" });
        const newChapter = { _id: new mongoose.Types.ObjectId(), title, order: 0, lessons: [] };
        // .lean() reads raw MongoDB doc (not filtered by Mongoose schema)
        const raw = await Course.findById(id).lean();
        const hasSub = (raw?.subjectContents||[]).some(s => s.subject === subject);
        if (hasSub) {
          await Course.findOneAndUpdate(
            { _id: id, "subjectContents.subject": subject },
            { $push: { "subjectContents.$.chapters": newChapter } },
            { strict: false }
          );
        } else {
          await Course.findByIdAndUpdate(id,
            { $push: { subjectContents: { subject, chapters: [newChapter] } } },
            { strict: false }
          );
        }
        const updated = await Course.findById(id).lean();
        return res.status(200).json({ success: true, course: updated });
      }

      if (action === "add-bsubject-lesson") {
        const { subject, chapterId, lesson } = req.body;
        if (!subject || !chapterId || !lesson) return res.status(400).json({ error: "Required fields missing" });
        const newLesson = { _id: new mongoose.Types.ObjectId(), ...lesson, notes: [] };
        await Course.findOneAndUpdate(
          { _id: id, "subjectContents.subject": subject },
          { $push: { "subjectContents.$.chapters.$[ch].lessons": newLesson } },
          { arrayFilters: [{ "ch._id": new mongoose.Types.ObjectId(chapterId) }], strict: false }
        );
        const updated = await Course.findById(id).lean();
        return res.status(200).json({ success: true, course: updated });
      }

      if (action === "edit-bsubject-chapter") {
        const { subject, chapterId, title } = req.body;
        if (!subject || !chapterId || !title?.trim()) return res.status(400).json({ error: "Required fields missing" });
        await Course.findOneAndUpdate(
          { _id: id, "subjectContents.subject": subject },
          { $set: { "subjectContents.$.chapters.$[ch].title": title.trim() } },
          { arrayFilters: [{ "ch._id": new mongoose.Types.ObjectId(chapterId) }], strict: false }
        );
        const updated = await Course.findById(id).lean();
        return res.status(200).json({ success: true, course: updated });
      }

      if (action === "edit-bsubject-lesson") {
        const { subject, chapterId, lessonId, title, youtubeLink, videoUrl, videoType, duration } = req.body;
        if (!subject || !chapterId || !lessonId || !title?.trim()) return res.status(400).json({ error: "Required fields missing" });
        if (videoType !== undefined) {
          if (videoType === "youtube" && !youtubeLink)
            return res.status(400).json({ error: "YouTube link required" });
          if ((videoType === "custom" || videoType === "bunny") && !videoUrl)
            return res.status(400).json({ error: "Video URL required" });
        }
        const set = { "subjectContents.$.chapters.$[ch].lessons.$[ls].title": title.trim() };
        if (videoType !== undefined) {
          set["subjectContents.$.chapters.$[ch].lessons.$[ls].videoType"]   = videoType;
          set["subjectContents.$.chapters.$[ch].lessons.$[ls].youtubeLink"] = youtubeLink || "";
          set["subjectContents.$.chapters.$[ch].lessons.$[ls].videoUrl"]    = videoUrl || "";
        }
        if (duration !== undefined) set["subjectContents.$.chapters.$[ch].lessons.$[ls].duration"] = duration;
        await Course.findOneAndUpdate(
          { _id: id, "subjectContents.subject": subject },
          { $set: set },
          { arrayFilters: [{ "ch._id": new mongoose.Types.ObjectId(chapterId) }, { "ls._id": new mongoose.Types.ObjectId(lessonId) }], strict: false }
        );
        const updated = await Course.findById(id).lean();
        return res.status(200).json({ success: true, course: updated });
      }

      if (action === "delete-bsubject-chapter") {
        const { subject, chapterId } = req.body;
        if (!subject || !chapterId) return res.status(400).json({ error: "Subject and chapterId required" });
        await Course.findOneAndUpdate(
          { _id: id, "subjectContents.subject": subject },
          { $pull: { "subjectContents.$.chapters": { _id: new mongoose.Types.ObjectId(chapterId) } } },
          { strict: false }
        );
        const updated = await Course.findById(id).lean();
        return res.status(200).json({ success: true, course: updated });
      }

      if (action === "delete-bsubject-lesson") {
        const { subject, chapterId, lessonId } = req.body;
        if (!subject || !chapterId || !lessonId) return res.status(400).json({ error: "Required fields missing" });
        await Course.findOneAndUpdate(
          { _id: id, "subjectContents.subject": subject },
          { $pull: { "subjectContents.$.chapters.$[ch].lessons": { _id: new mongoose.Types.ObjectId(lessonId) } } },
          { arrayFilters: [{ "ch._id": new mongoose.Types.ObjectId(chapterId) }], strict: false }
        );
        const updated = await Course.findById(id).lean();
        return res.status(200).json({ success: true, course: updated });
      }

      if (action === "fetch-bsubject-content") {
        const { subject } = req.body;
        if (!subject) return res.status(400).json({ error: "Subject required" });
        const subCourse = await Course.findOne({
          courseType: { $ne: "bundle" }, batch: course.batch, subject,
        }).lean();
        if (!subCourse) return res.status(404).json({ error: `No individual ${subject} course found for ${course.batch}` });
        const copiedChapters = (subCourse.chapters||[]).map(ch => ({
          _id: new mongoose.Types.ObjectId(),
          title: ch.title, order: ch.order||0,
          lessons: (ch.lessons||[]).map(l => ({
            _id: new mongoose.Types.ObjectId(),
            title: l.title, youtubeLink: l.youtubeLink||"",
            videoUrl: l.videoUrl||"", videoType: l.videoType||"youtube",
            duration: l.duration||"", notes: [],
          })),
        }));
        const raw = await Course.findById(id).lean();
        const hasSub = (raw?.subjectContents||[]).some(s => s.subject === subject);
        if (hasSub) {
          await Course.findOneAndUpdate(
            { _id: id, "subjectContents.subject": subject },
            { $set: { "subjectContents.$.chapters": copiedChapters } },
            { strict: false }
          );
        } else {
          await Course.findByIdAndUpdate(id,
            { $push: { subjectContents: { subject, chapters: copiedChapters } } },
            { strict: false }
          );
        }
        const updated = await Course.findById(id).lean();
        return res.status(200).json({ success: true, course: updated });
      }

      // Bundle: import Study Materials (Books/TMA/Assignments/Sample Papers/Notes,
      // and any section added later) from the standalone subject course.
      // Generic over section keys so a future material type never needs a code
      // change here — whatever the standalone course has, gets imported.
      if (action === "fetch-bsubject-materials") {
        const { subject } = req.body;
        if (!subject) return res.status(400).json({ error: "Subject required" });
        const subCourse = await Course.findOne({
          courseType: { $ne: "bundle" }, batch: course.batch, subject,
        }).lean();
        if (!subCourse) return res.status(404).json({ error: `No individual ${subject} course found for ${course.batch}` });

        const srcMaterials = subCourse.materials || {};
        const raw = await Course.findById(id).lean();
        const bundleMaterials = { ...(raw?.materials || {}) };

        let importedCount = 0;
        for (const section of Object.keys(srcMaterials)) {
          const srcList = srcMaterials[section] || [];
          if (!srcList.length) continue;
          const existing = bundleMaterials[section] || [];
          // Drop any items previously imported for this subject in this section,
          // then re-import fresh (mirrors fetch-bsubject-content's "replace" behaviour).
          const keep = existing.filter(m => !m.title.startsWith(`${subject} | `));
          const imported = srcList.map(m => ({
            _id: new mongoose.Types.ObjectId(),
            title: `${subject} | ${m.title}`,
            fileUrl: m.fileUrl,
          }));
          bundleMaterials[section] = [...keep, ...imported];
          importedCount += imported.length;
        }

        if (importedCount === 0)
          return res.status(404).json({ error: `No study materials found in the individual ${subject} course` });

        await Course.findByIdAndUpdate(id, { $set: { materials: bundleMaterials } }, { strict: false });
        const updated = await Course.findById(id).lean();
        return res.status(200).json({ success: true, course: updated, importedCount });
      }

      // Bundle: import materials from ANY standalone course by id, as-is (no subject
      // prefix). Covers "course-wise" material courses that aren't tied to one subject
      // — e.g. a "TMA - Class 10th" course whose files are already self-titled per
      // subject ("TMA - English (Class 10th)"). Generic over section keys, same as
      // fetch-bsubject-materials above, and safe to click repeatedly (de-duped by
      // exact title+fileUrl per section, so it only adds what's actually new).
      if (action === "fetch-course-materials") {
        const { sourceCourseId } = req.body;
        if (!sourceCourseId) return res.status(400).json({ error: "sourceCourseId required" });
        const subCourse = await Course.findOne({ _id: sourceCourseId, courseType: { $ne: "bundle" } }).lean();
        if (!subCourse) return res.status(404).json({ error: "Source course not found" });

        const raw = await Course.findById(id).lean();
        const bundleSubjects = raw?.bundledSubjects || [];
        const srcMaterials = subCourse.materials || {};
        const bundleMaterials = { ...(raw?.materials || {}) };

        let importedCount = 0;
        for (const section of Object.keys(srcMaterials)) {
          const srcList = srcMaterials[section] || [];
          if (!srcList.length) continue;
          const existing = bundleMaterials[section] || [];
          const existingKeys = new Set(existing.map(m => `${m.title}::${m.fileUrl}`));
          const toAdd = [];
          for (const m of srcList) {
            // Auto-detect a matching bundled subject from the item's title (e.g.
            // "TMA - English (Class 10th)" → matches bundled subject "English"),
            // and prefix accordingly so it shows up under that subject for students.
            // Items that don't match any bundled subject fall into the "General" bucket.
            const matchedSubject = bundleSubjects.find(s => m.title.toLowerCase().includes(s.toLowerCase()));
            const finalTitle = matchedSubject ? `${matchedSubject} | ${m.title}` : m.title;
            const key = `${finalTitle}::${m.fileUrl}`;
            if (existingKeys.has(key)) continue;
            toAdd.push({ _id: new mongoose.Types.ObjectId(), title: finalTitle, fileUrl: m.fileUrl });
            existingKeys.add(key);
          }
          if (!toAdd.length) continue;
          bundleMaterials[section] = [...existing, ...toAdd];
          importedCount += toAdd.length;
        }

        if (importedCount === 0)
          return res.status(200).json({ success: true, course: raw, importedCount: 0 });

        await Course.findByIdAndUpdate(id, { $set: { materials: bundleMaterials } }, { strict: false });
        const updated = await Course.findById(id).lean();
        return res.status(200).json({ success: true, course: updated, importedCount });
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