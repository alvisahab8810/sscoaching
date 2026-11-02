import mongoose from "mongoose";

/** Timeline entry on an admission. Internal ones are hidden from the student. */
const EventSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Schema.Types.ObjectId, ref: "OnlineAdmissionApplication", required: true, index: true },
    actor_role: { type: String, enum: ["student", "staff", "system"], default: "system" },
    actor_name: { type: String, default: null },
    type: { type: String, required: true },
    message: { type: String, required: true },
    visible_to_student: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

export default mongoose.models.OnlineAdmissionEvent ||
  mongoose.model("OnlineAdmissionEvent", EventSchema, "online_admission_events");
