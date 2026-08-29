import mongoose from "mongoose";

const CourseProgressSchema = new mongoose.Schema({
  student:          { type: mongoose.Schema.Types.ObjectId, ref: "StudentUser", required: true },
  course:           { type: mongoose.Schema.Types.ObjectId, ref: "Course",      required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId }],
  // Study material (books/TMA/assignments/sample papers/notes) sub-document
  // _ids the student has opened at least once — counted toward the course
  // progress % alongside completedLessons.
  completedMaterials: [{ type: mongoose.Schema.Types.ObjectId }],
  lastLessonId:     { type: mongoose.Schema.Types.ObjectId, default: null },
  lastChapterIdx:   { type: Number, default: 0 },
  lastLessonIdx:    { type: Number, default: 0 },
}, { timestamps: true });

CourseProgressSchema.index({ student: 1, course: 1 }, { unique: true });

export default mongoose.models.CourseProgress || mongoose.model("CourseProgress", CourseProgressSchema);
