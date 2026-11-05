import mongoose from "mongoose";

const SubAdminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  passwordHash: { type: String, required: true },
  permissions: { type: [String], default: [] },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  // Sales people are sub-admins who also take leads from the auto-assign
  // rotation and only ever see the leads handed to them.
  isSales: { type: Boolean, default: false },
  phone: { type: String, default: "", trim: true },
}, { timestamps: true });

export default mongoose.models.SubAdmin || mongoose.model("SubAdmin", SubAdminSchema);
