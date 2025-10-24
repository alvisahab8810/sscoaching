// import dbConnect from "@/lib/dbConnect";
// import Blog from "@/models/Blog";
// import { IncomingForm } from "formidable";
// import fs from "fs";
// import path from "path";

// // Required for formidable (disables default Next body parser)
// export const config = {
//   api: { bodyParser: false },
// };

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ success: false, message: "Method not allowed" });
//   }

//   await dbConnect();

//   try {
//     const form = new IncomingForm({
//       uploadDir: path.join(process.cwd(), "public/uploads"),
//       keepExtensions: true,
//       multiples: false,
//     });

//     // Ensure uploads directory exists
//     const uploadDir = path.join(process.cwd(), "public/uploads");
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error("Form parse error:", err);
//         return res.status(500).json({ success: false, message: "Error parsing form" });
//       }

//       const coverFile = files.coverImage?.[0];
//       const coverImagePath = coverFile
//         ? `/uploads/${path.basename(coverFile.filepath)}`
//         : "";

//       const tagsArray =
//         fields.tags && typeof fields.tags[0] === "string"
//           ? fields.tags[0].split(",").map((t) => t.trim())
//           : [];

//       const blogData = {
//         title: fields.title?.[0],
//         slug: fields.slug?.[0],
//         category: fields.category?.[0],
//         tags: tagsArray,
//         shortDescription: fields.shortDescription?.[0],
//         content: fields.content?.[0],
//         coverImage: coverImagePath,
//         status: fields.status?.[0] || "draft",
//         metaTitle: fields.metaTitle?.[0],
//         metaDescription: fields.metaDescription?.[0],
//         metaKeywords: fields.metaKeywords?.[0],
//         authorName: fields.authorName?.[0],
//         publishDate: fields.publishDate?.[0],
//       };

//       const newBlog = await Blog.create(blogData);
//       res.status(200).json({ success: true, message: "Blog saved successfully", blog: newBlog });
//     });
//   } catch (error) {
//     console.error("Save error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// }



import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

// Disable bodyParser for formidable
export const config = {
  api: { bodyParser: false },
};

// Helper to parse the incoming form as a Promise
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
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  await dbConnect();

  try {
    const { fields, files } = await parseForm(req);

    const coverFile = files.coverImage?.[0];
    const coverImagePath = coverFile
      ? `/uploads/${path.basename(coverFile.filepath)}`
      : "";

    const tagsArray =
      fields.tags && typeof fields.tags[0] === "string"
        ? fields.tags[0].split(",").map((t) => t.trim())
        : [];

    const blogData = {
      title: fields.title?.[0] || "",
      slug: fields.slug?.[0] || "",
      category: fields.category?.[0] || "",
      tags: tagsArray,
      shortDescription: fields.shortDescription?.[0] || "",
      content: fields.content?.[0] || "",
      coverImage: coverImagePath,
      status: fields.status?.[0] || "draft",
      metaTitle: fields.metaTitle?.[0] || "",
      metaDescription: fields.metaDescription?.[0] || "",
      metaKeywords: fields.metaKeywords?.[0] || "",
      authorName: fields.authorName?.[0] || "",
      publishDate: fields.publishDate?.[0] || new Date(),
    };

    const newBlog = await Blog.create(blogData);

    // ✅ Send response only once
    return res.status(200).json({
      success: true,
      message: "Blog saved successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Save error:", error);
    return res.status(500).json({ success: false, message: "Error saving blog", error });
  }
}
