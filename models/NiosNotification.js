import mongoose from "mongoose";

const NiosNotificationSchema = new mongoose.Schema(
  {
    // The PDF / page URL on nios.ac.in. Unique, so re-scraping the same
    // notification updates the existing row instead of duplicating it.
    url:         { type: String, required: true, unique: true, trim: true },
    title:       { type: String, required: true, trim: true },
    // Optional shorter wording for the homepage card; NIOS titles run long.
    shortTitle:  { type: String, default: "", trim: true },
    section:     { type: String, default: "", trim: true },   // "Examination & Result" etc.
    // Date parsed out of the title ("dt. 15/09/2026"); null when NIOS omits it.
    publishedAt: { type: Date, default: null },
    firstSeenAt: { type: Date, default: Date.now },           // ordering fallback
    isNew:       { type: Boolean, default: false },           // NIOS "new" badge
    isHidden:    { type: Boolean, default: false },           // manual override
    pinned:      { type: Boolean, default: false },           // force to the top
  },
  { timestamps: true }
);

// The homepage only ever asks for the newest few visible rows.
NiosNotificationSchema.index({ isHidden: 1, pinned: -1, publishedAt: -1 });

export default mongoose.models.NiosNotification ||
  mongoose.model("NiosNotification", NiosNotificationSchema);
