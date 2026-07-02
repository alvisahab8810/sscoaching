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
      unique: true,
      sparse: true,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
      default: "",
    },

    password: {
      type: String,
      select: false,
    },

    avatar: {
      type: String,
      default: "",
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

    wishlist: {
      type: [String],
      default: [],
    },

    cart: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    expoPushToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.StudentUser ||
  mongoose.model("StudentUser", StudentUserSchema);