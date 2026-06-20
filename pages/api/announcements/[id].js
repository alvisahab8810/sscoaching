import dbConnect from "@/lib/dbConnect";
import Announcement from "@/models/Announcement";
import { logActivity } from "@/lib/logActivity";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const before = await Announcement.findById(id).lean();
      const updated = await Announcement.findByIdAndUpdate(id, body, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: "Not found" });

      const isToggle = Object.keys(body).length === 1 && "isActive" in body;
      await logActivity(req, {
        feature: "announcements",
        action: isToggle ? (body.isActive ? "activate" : "deactivate") : "update",
        entityId: id, entityType: "Announcement",
        description: isToggle
          ? `${body.isActive ? "Activated" : "Deactivated"} announcement: "${updated.title}"`
          : `Updated announcement: "${updated.title}"`,
        before: before ? { title: before.title, isActive: before.isActive, priority: before.priority } : null,
        after: { title: updated.title, isActive: updated.isActive, priority: updated.priority },
      });

      return res.status(200).json({ success: true, announcement: updated });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const before = await Announcement.findById(id).lean();
      await Announcement.findByIdAndDelete(id);

      await logActivity(req, {
        feature: "announcements", action: "delete",
        entityId: id, entityType: "Announcement",
        description: `Deleted announcement: "${before?.title}"`,
        before: before ? { title: before.title, isActive: before.isActive } : null,
      });

      return res.status(200).json({ success: true, message: "Deleted" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
