import mongoose from "mongoose";

const SubAdminActivityLogSchema = new mongoose.Schema({
  subAdminId: { type: mongoose.Schema.Types.ObjectId, ref: "SubAdmin", required: true },
  subAdminName: { type: String, required: true },
  subAdminUsername: { type: String, required: true },
  feature: { type: String, required: true },
  action: { type: String, required: true },
  entityId: { type: String, default: null },
  entityType: { type: String, default: null },
  description: { type: String, default: "" },
  before: { type: mongoose.Schema.Types.Mixed, default: null },
  after: { type: mongoose.Schema.Types.Mixed, default: null },
  ip: { type: String, default: null },
}, { timestamps: true });

SubAdminActivityLogSchema.index({ subAdminId: 1, createdAt: -1 });
SubAdminActivityLogSchema.index({ createdAt: -1 });

export default mongoose.models.SubAdminActivityLog || mongoose.model("SubAdminActivityLog", SubAdminActivityLogSchema);
