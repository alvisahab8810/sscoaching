import dbConnect from "@/lib/dbConnect";
import Announcement from "@/models/Announcement";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    await dbConnect();
    // Fetch ALL announcements (active + inactive) for admin panel
    const announcements = await Announcement.find({})
      .sort({ priority: -1, createdAt: -1 });

    return res.status(200).json({ success: true, announcements });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}