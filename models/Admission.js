// /models/Admission.js
import mongoose from "mongoose";

const AdmissionSchema = new mongoose.Schema(
  {
    studentName:   { type: String, required: true, trim: true },
    fatherName:    { type: String, required: true, trim: true },
    motherName:    { type: String, required: true, trim: true },
    gender:        { type: String, enum: ["Male", "Female", "Other"], required: true },
    dob:           { type: Date, required: true },
    email:         { type: String, trim: true, lowercase: true },
    mobile:        { type: String, required: true, trim: true },
    phone:         { type: String, trim: true },
    nationality:   { type: String, trim: true, default: "Indian" },
    category:      { type: String, enum: ["General", "OBC", "SC", "ST", "EWS"], required: true },
    employmentStatus: { type: String, trim: true },
    courseApplying:{ type: String, required: true, trim: true },
    toc:           { type: String, trim: true },
    correspondingAddress: { type: String, required: true, trim: true },
    permanentAddress:     { type: String, trim: true },
    pinCode:       { type: String, trim: true },
    district:      { type: String, trim: true },
    state:         { type: String, required: true, trim: true },
    photo:         { type: String, trim: true }, // file URL/path
    documents:     { type: String, trim: true }, // file URL/path
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Admission || mongoose.model("Admission", AdmissionSchema);