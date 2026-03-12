import dbConnect from "@/lib/dbConnect";
import Announcement from "@/models/Announcement";

export default async function handler(req, res) {
  await dbConnect();

  // ── GET: fetch active announcements for frontend ──
  if (req.method === "GET") {
    try {
      const now = new Date();
      const announcements = await Announcement.find({
        isActive: true,
        $or: [
          { expiresAt: null },
          { expiresAt: { $gt: now } },
        ],
      })
        .sort({ priority: -1, createdAt: -1 })
        .limit(5);

      return res.status(200).json({ success: true, announcements });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // ── POST: create new announcement ──
  if (req.method === "POST") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const announcement = await Announcement.create(body);
      return res.status(201).json({ success: true, announcement });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}