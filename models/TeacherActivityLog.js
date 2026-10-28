import mongoose from "mongoose";

/**
 * Every action a teacher takes in their portal.
 *
 * Mirrors SubAdminActivityLog so the admin side can render both with the
 * same table, but stays a separate collection -- teaching records are
 * kept for the long term, staff logs are not.
 */
const TeacherActivityLogSchema = new mongoose.Schema(
  {
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
    teacherName: { type: String, required: true },
    teacherUsername: { type: String, required: true },
    feature: { type: String, required: true },
    action: { type: String, required: true },
    entityId: { type: String, default: null },
    entityType: { type: String, default: null },
    description: { type: String, default: "" },
    before: { type: mongoose.Schema.Types.Mixed, default: null },
    after: { type: mongoose.Schema.Types.Mixed, default: null },
    ip: { type: String, default: null },
  },
  { timestamps: true }
);

TeacherActivityLogSchema.index({ teacherId: 1, createdAt: -1 });
TeacherActivityLogSchema.index({ createdAt: -1 });

export default mongoose.models.TeacherActivityLog ||
  mongoose.model("TeacherActivityLog", TeacherActivityLogSchema);
