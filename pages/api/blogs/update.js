import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

// Disable Next.js body parser for formidable
export const config = {
  api: { bodyParser: false },
};

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), "public/uploads"),
      keepExtensions: true,
      multiples: false,
    });

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id)
    return res
      .status(400)
      .json({ success: false, message: "Blog ID is required" });

  await dbConnect();

  try {
    const { fields, files } = await parseForm(req);

    // Get existing blog to preserve old cover if no new file
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const coverFile = files.coverImage;
    const coverImagePath = coverFile
      ? `/uploads/${path.basename(coverFile.filepath)}`
      : existingBlog.coverImage || "";

    // Tags parsing
    const tagsArray =
      fields.tags && fields.tags[0]
        ? fields.tags[0].split(",").map((t) => t.trim())
        : [];

    const updatedData = {
      title: fields.title?.[0] || existingBlog.title,
      slug: fields.slug?.[0] || existingBlog.slug,
      category: fields.category?.[0] || existingBlog.category,
      tags: tagsArray,
      shortDescription:
        fields.shortDescription?.[0] || existingBlog.shortDescription,
      content: fields.content?.[0] || existingBlog.content,
      coverImage: coverImagePath,
      coverAltText: fields.coverAltText?.[0] || existingBlog.coverAltText || "", // 👈 Added
      status: fields.status?.[0] || existingBlog.status || "draft",
      metaTitle: fields.metaTitle?.[0] || existingBlog.metaTitle,
      metaDescription: fields.metaDescription?.[0] || existingBlog.metaDescription,
      metaKeywords: fields.metaKeywords?.[0] || existingBlog.metaKeywords,
      authorName: fields.authorName?.[0] || existingBlog.authorName,
      publishDate: fields.publishDate?.[0] || existingBlog.publishDate,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return res
      .status(200)
      .json({ success: true, message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Update error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Server error updating blog",
        error: error.message,
      });
  }
}
