import mongoose from "mongoose";

/** "Notify me" sign-ups collected while admissions are in coming-soon mode. */
const InterestSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    mobile: { type: String, required: true },
    class: { type: String, default: "" },
    pincode: { type: String, default: "" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

export default mongoose.models.OnlineAdmissionInterest ||
  mongoose.model("OnlineAdmissionInterest", InterestSchema, "online_admission_interests");
