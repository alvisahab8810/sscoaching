import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "DELETE") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ success: false, message: "Blog ID is required" });

  try {
    await Blog.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error deleting blog" });
  }
}
