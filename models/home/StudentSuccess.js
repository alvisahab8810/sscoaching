import mongoose from "mongoose";

const StudentSuccessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    score: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String,
      default: "#ffeed1",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.StudentSuccess ||
  mongoose.model("StudentSuccess", StudentSuccessSchema);
