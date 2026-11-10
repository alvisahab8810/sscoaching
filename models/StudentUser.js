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

    signupSource: {
      type: String,
      enum: ["web", "app"],
      default: "web",
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    // Refer and earn (lib/referral.js). Wallet money is only spent on courses.
    walletBalance: { type: Number, default: 0, min: 0 },
    referralCode: { type: String, unique: true, sparse: true, uppercase: true, trim: true },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "StudentUser", default: null },
    referredAt: { type: Date, default: null },
    referralRewarded: { type: Boolean, default: false },

    resetPasswordToken: { type: String, select: false },
    resetPasswordExpiry: { type: Date, select: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.StudentUser ||
  mongoose.model("StudentUser", StudentUserSchema);