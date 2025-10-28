import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String },
    tags: [{ type: String }],
    shortDescription: { type: String },
    content: { type: String },
    coverImage: { type: String }, // store image URL or base64 if small
    coverAltText: { type: String, default: "" }, // 👈 Add this
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    authorName: { type: String },
    publishDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
