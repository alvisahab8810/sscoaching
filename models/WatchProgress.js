import mongoose from "mongoose";

// Per-video "Continue Watching" progress — separate from CourseProgress
// (which tracks lesson completion / last-opened lesson at the course level).
const WatchProgressSchema = new mongoose.Schema({
  userId:          { type: mongoose.Schema.Types.ObjectId, ref: "StudentUser", required: true },
  videoId:         { type: String, required: true }, // lesson._id as string — stable across youtube/custom/bunny
  courseId:        { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  watchedTime:     { type: Number, default: 0 }, // seconds
  duration:        { type: Number, default: 0 }, // seconds
  watchPercentage: { type: Number, default: 0 }, // 0-100
}, { timestamps: { createdAt: false, updatedAt: true } });

WatchProgressSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export default mongoose.models.WatchProgress || mongoose.model("WatchProgress", WatchProgressSchema);
