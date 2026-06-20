import mongoose from "mongoose";

const SubAdminLiveSessionSchema = new mongoose.Schema({
  subAdminId: { type: mongoose.Schema.Types.ObjectId, ref: "SubAdmin", required: true, unique: true },
  subAdminName: { type: String, required: true },
  subAdminUsername: { type: String, required: true },
  currentPage: { type: String, default: "/" },
  currentFeature: { type: String, default: "dashboard" },
  currentPageLabel: { type: String, default: "Dashboard" },
  lastSeen: { type: Date, default: Date.now },
  ip: { type: String, default: null },
});

// TTL index — document auto-deleted 5 minutes after lastSeen
SubAdminLiveSessionSchema.index({ lastSeen: 1 }, { expireAfterSeconds: 300 });

export default mongoose.models.SubAdminLiveSession ||
  mongoose.model("SubAdminLiveSession", SubAdminLiveSessionSchema);
