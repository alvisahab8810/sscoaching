import mongoose from "mongoose";

/**
 * An uploaded file on an admission. Re-uploading a type keeps the old row
 * with current=false, so the consultant can still see earlier versions.
 * Files live outside /public and are served only through the files API.
 */
const DocumentSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Schema.Types.ObjectId, ref: "OnlineAdmissionApplication", required: true, index: true },
    type: { type: String, required: true },
    mime: String,
    original_name: String,
    size: Number,
    stored_name: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    remark: { type: String, default: null },
    current: { type: Boolean, default: true },
    by_staff: { type: Boolean, default: false },
    reviewed_at: { type: Date, default: null },
  },
  { timestamps: { createdAt: "uploaded_at", updatedAt: false } }
);

export default mongoose.models.OnlineAdmissionDocument ||
  mongoose.model("OnlineAdmissionDocument", DocumentSchema, "online_admission_documents");
