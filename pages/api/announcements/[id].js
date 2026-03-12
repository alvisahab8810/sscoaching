import dbConnect from "@/lib/dbConnect";
import Announcement from "@/models/Announcement";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  // ── PUT: update (toggle active, edit fields) ──
  if (req.method === "PUT") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const updated = await Announcement.findByIdAndUpdate(id, body, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: "Not found" });
      return res.status(200).json({ success: true, announcement: updated });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // ── DELETE ──
  if (req.method === "DELETE") {
    try {
      await Announcement.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: "Deleted" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}