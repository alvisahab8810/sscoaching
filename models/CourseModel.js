// models/CourseModel.js — REPLACE your existing file
import mongoose from "mongoose";

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

const CourseSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String, default: "" },
  subject:      { type: String, required: true },
  batch:        { type: String, required: true },
  price:        { type: Number, default: 0 },
  isFree:       { type: Boolean, default: false },
  status:       { type: String, enum: ["draft", "published"], default: "draft" },
  featureImage: { type: String, default: "" },
  enrolledCount:{ type: Number, default: 0 },
  chapters:     [ChapterSchema],
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);





// import mongoose from "mongoose";

// const LessonSchema = new mongoose.Schema({
//   title:       { type: String, required: true },
//   youtubeLink: { type: String, required: true },
//   duration:    { type: String, default: "" },
// }, { _id: true });

// const ChapterSchema = new mongoose.Schema({
//   title:   { type: String, required: true },
//   order:   { type: Number, default: 0 },
//   lessons: [LessonSchema],
// }, { _id: true });

// const CourseSchema = new mongoose.Schema({
//   title:        { type: String, required: true },
//   description:  { type: String, default: "" },
//   subject:      { type: String, required: true },
//   batch:        { type: String, required: true },
//   price:        { type: Number, default: 0 },
//   isFree:       { type: Boolean, default: false },
//   status:       { type: String, enum: ["draft", "published"], default: "draft" },
//   featureImage: { type: String, default: "" },
//   enrolledCount:{ type: Number, default: 0 },
//   chapters:     [ChapterSchema],
// }, { timestamps: true });

// export default mongoose.models.Course || mongoose.model("Course", CourseSchema);