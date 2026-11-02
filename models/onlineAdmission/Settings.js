import mongoose from "mongoose";

/** Single settings document (_id "main") edited from the desk's Settings tab. */
const SettingsSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "main" },
    launch_mode: { type: String, enum: ["live", "coming_soon"], default: "live" },
    price_10: { type: Number, default: 11600 },
    price_12: { type: Number, default: 12600 },
    centres_synced_at: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.OnlineAdmissionSettings ||
  mongoose.model("OnlineAdmissionSettings", SettingsSchema, "online_admission_settings");
