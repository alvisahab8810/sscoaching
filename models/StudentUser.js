import mongoose from "mongoose";

const StudentUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },

    className: {
      type: String,
      trim: true,
      default: "",
    },

    batch: {
      type: String,
      trim: true,
      default: "",
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.StudentUser ||
  mongoose.model("StudentUser", StudentUserSchema);