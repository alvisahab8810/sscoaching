// pages/api/blogs/getBySlug.js
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export default async function handler(req, res) {
  await dbConnect();
  const { slug } = req.query;

  if (!slug)
    return res.status(400).json({ success: false, message: "Slug is required" });

  try {
    const blog = await Blog.findOne({ slug, status: "published" });
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    return res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
