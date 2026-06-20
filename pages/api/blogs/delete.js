import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { logActivity } from "@/lib/logActivity";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "DELETE") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ success: false, message: "Blog ID is required" });

  try {
    const before = await Blog.findById(id).lean();
    await Blog.findByIdAndDelete(id);

    await logActivity(req, {
      feature: "blogs", action: "delete",
      entityId: id, entityType: "Blog",
      description: `Deleted blog: "${before?.title}"`,
      before: before ? { title: before.title, status: before.status, category: before.category } : null,
    });

    return res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error deleting blog" });
  }
}
