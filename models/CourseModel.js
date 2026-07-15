import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  fileUrl: { type: String, required: true },
}, { _id: true });

const LessonNoteSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  fileUrl: { type: String, required: true },
  type:    { type: String, enum: ["pdf", "doc", "ppt", "link", "other"], default: "pdf" },
}, { _id: true });

const LessonSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  youtubeLink: { type: String, default: "" },
  videoUrl:    { type: String, default: "" },
  videoType:   { type: String, enum: ["youtube", "custom", "none", "bunny"], default: "youtube" },
  duration:    { type: String, default: "" },
  notes:       [LessonNoteSchema],
}, { _id: true });

const ChapterSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  order:   { type: Number, default: 0 },
  lessons: [LessonSchema],
}, { _id: true });

// Per-subject chapters for bundle courses
const SubjectContentSchema = new mongoose.Schema({
  subject:  { type: String, required: true },
  chapters: [ChapterSchema],
}, { _id: false });

// Materials section — PDFs for books, TMA, assignments, notes, sample papers
const MaterialsSchema = new mongoose.Schema({
  books:        { type: [FileSchema], default: [] },
  tma:          { type: [FileSchema], default: [] },
  assignments:  { type: [FileSchema], default: [] },
  samplePapers: { type: [FileSchema], default: [] },
  notes:        { type: [FileSchema], default: [] },
}, { _id: false });

const CourseSchema = new mongoose.Schema({
  // "subject" = single-subject course (existing), "bundle" = multi-subject package
  courseType:   { type: String, enum: ["subject", "bundle"], default: "subject" },

  title:        { type: String, required: true },
  description:  { type: String, default: "" },
  subject:      { type: String, default: "" },   // for subject type
  batch:        { type: String, required: true },
  price:        { type: Number, default: 0 },
  isFree:       { type: Boolean, default: false },
  status:       { type: String, enum: ["draft", "published"], default: "draft" },
  featureImage: { type: String, default: "" },
  enrolledCount:{ type: Number, default: 0 },

  // Subject course fields
  chapters:     [ChapterSchema],
  materials:    { type: MaterialsSchema, default: () => ({}) },

  // Bundle-only fields
  bundledSubjects:   { type: [String], default: [] },
  includedCourses:   { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], default: [] },
  subjectContents:   { type: [SubjectContentSchema], default: [] }, // per-subject chapters & videos

}, { timestamps: true });

// Force recompile when schema changes (handles Next.js HMR model caching)
if (mongoose.models.Course) delete mongoose.models.Course;
export default mongoose.model("Course", CourseSchema);
