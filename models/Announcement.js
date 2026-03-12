import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    link:        { type: String, default: "", trim: true },      // optional "Read More" URL
    linkLabel:   { type: String, default: "Read More", trim: true },
    type:        { type: String, enum: ["info", "success", "warning", "urgent"], default: "info" },
    isActive:    { type: Boolean, default: true },
    expiresAt:   { type: Date, default: null },                  // optional auto-expire
    priority:    { type: Number, default: 0 },                   // higher = shown first
  },
  { timestamps: true }
);

export default mongoose.models.Announcement ||
  mongoose.model("Announcement", AnnouncementSchema);