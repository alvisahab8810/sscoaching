import mongoose from "mongoose";

// Seconds a student actually spent playing a video, one row per student,
// video and day (IST). Filled from the "Continue Watching" ticks in
// pages/api/watch-progress/[videoId].js -- see lib/watchTime.js for which
// ticks count. WatchProgress only keeps the last position, so it cannot
// answer "how long did they watch".
const VideoWatchTimeSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: "StudentUser", required: true },
  courseId:   { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  videoId:    { type: String, required: true }, // lesson._id, same as WatchProgress
  date:       { type: String, required: true }, // "YYYY-MM-DD" in IST
  seconds:    { type: Number, default: 0 },
  webSeconds: { type: Number, default: 0 },
  appSeconds: { type: Number, default: 0 },
  plays:      { type: Number, default: 0 }, // times started from the beginning
}, { timestamps: { createdAt: false, updatedAt: true } });

VideoWatchTimeSchema.index({ userId: 1, videoId: 1, date: 1 }, { unique: true });
VideoWatchTimeSchema.index({ date: 1 });

export default mongoose.models.VideoWatchTime || mongoose.model("VideoWatchTime", VideoWatchTimeSchema);
