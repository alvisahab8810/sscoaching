import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Faq from "@/models/Faq";
import { requireAdminApi } from "@/lib/requireAdminApi";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const session = requireAdminApi(req);
  if (!session) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }

  try {
    await dbConnect();
  } catch (err) {
    console.error("DB connect failed:", err.message);
    return res.status(500).json({ success: false, message: "Database connection failed" });
  }

  try {
    // Counted in the database. The dashboard used to measure the length of the
    // blog list response, which only ever carried one page of results.
    const [
      blogTotal,
      blogPublished,
      blogDraft,
      faqTotal,
      faqPublished,
      faqDraft,
    ] = await Promise.all([
      Blog.countDocuments({}),
      Blog.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "draft" }),
      Faq.countDocuments({}),
      Faq.countDocuments({ status: "published" }),
      Faq.countDocuments({ status: "draft" }),
    ]);

    return res.status(200).json({
      success: true,
      blogs: { total: blogTotal, published: blogPublished, draft: blogDraft },
      faqs: { total: faqTotal, published: faqPublished, draft: faqDraft },
    });
  } catch (error) {
    console.error("admin stats error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
