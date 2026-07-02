import mongoose from "mongoose";

const CourseProgressSchema = new mongoose.Schema({
  student:          { type: mongoose.Schema.Types.ObjectId, ref: "StudentUser", required: true },
  course:           { type: mongoose.Schema.Types.ObjectId, ref: "Course",      required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId }],
  lastLessonId:     { type: mongoose.Schema.Types.ObjectId, default: null },
  lastChapterIdx:   { type: Number, default: 0 },
  lastLessonIdx:    { type: Number, default: 0 },
}, { timestamps: true });

CourseProgressSchema.index({ student: 1, course: 1 }, { unique: true });

export default mongoose.models.CourseProgress || mongoose.model("CourseProgress", CourseProgressSchema);
