import mongoose from "mongoose";

// Devices a student watched videos on, one row per student, device and day
// (IST) so the admin report can filter by date. See lib/deviceInfo.js for
// how a device is named.
const WatchDeviceSchema = new mongoose.Schema({
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: "StudentUser", required: true },
  key:     { type: String, required: true },
  date:    { type: String, required: true }, // "YYYY-MM-DD" in IST
  source:  { type: String, enum: ["web", "app"], default: "web" },
  device:  { type: String, default: "" },
  os:      { type: String, default: "" },
  client:  { type: String, default: "" }, // browser + version, or app version
  seconds: { type: Number, default: 0 },
}, { timestamps: true });

WatchDeviceSchema.index({ userId: 1, key: 1, date: 1 }, { unique: true });
WatchDeviceSchema.index({ date: 1 });

export default mongoose.models.WatchDevice || mongoose.model("WatchDevice", WatchDeviceSchema);
