import dbConnect from "@/lib/dbConnect";
import LiveClass from "@/models/LiveClassModel";
import { logActivity } from "@/lib/logActivity";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { LIVE_CLASS_STATUSES } from "@/lib/liveClassStatus";
import { pickCourseIds } from "@/lib/liveClassCourses";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const liveClass = await LiveClass.findById(id)
        .populate("course", "title subject batch isFree price")
        .populate("courses", "title subject batch isFree price");
      if (!liveClass) return res.status(404).json({ success: false, message: "Live class not found" });
      return res.status(200).json({ success: true, data: liveClass });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message || "Server error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { title, teacher, subject, chapter, part, topic, batch, date, time, duration, streamLink, description, status } = req.body;
      const { course, courses } = pickCourseIds(req.body);
      if (!title || !teacher || !subject || !batch || !date || !time || !streamLink) {
        return res.status(400).json({ success: false, message: "Please fill all required fields" });
      }

      const before = await LiveClass.findById(id).lean();
      const updated = await LiveClass.findByIdAndUpdate(
        id,
        { title, teacher, subject, chapter, part, topic, batch, date, time, duration, streamLink, description, status, course, courses },
        { new: true, runValidators: true }
      )
        .populate("course", "title subject batch isFree price")
        .populate("courses", "title subject batch isFree price");

      if (!updated) return res.status(404).json({ success: false, message: "Live class not found" });

      await logActivity(req, {
        feature: "online-classes", action: "update",
        entityId: id, entityType: "LiveClass",
        description: `Updated live class: "${title}"`,
        before: before ? { title: before.title, teacher: before.teacher, status: before.status, date: before.date } : null,
        after: { title, teacher, status, date },
      });

      return res.status(200).json({ success: true, message: "Live class updated successfully", data: updated });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message || "Server error" });
    }
  }

  // Status on its own, so the table can close out or reopen a class
  // without sending the whole class back through PUT.
  if (req.method === "PATCH") {
    try {
      const admin = requireAdminApi(req, "online-classes");
      if (!admin) return res.status(401).json({ success: false, message: "Not authorised" });

      const { status } = req.body || {};
      if (!LIVE_CLASS_STATUSES.includes(status))
        return res.status(400).json({ success: false, message: "Unknown status" });

      const before = await LiveClass.findById(id).lean();
      if (!before) return res.status(404).json({ success: false, message: "Live class not found" });

      const updated = await LiveClass.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      ).populate("course", "title subject batch isFree price");

      await logActivity(req, {
        feature: "online-classes",
        action: "update",
        entityId: id,
        entityType: "LiveClass",
        description: `Set live class "${before.title}" to ${status}`,
        before: { status: before.status },
        after: { status },
      });

      return res.status(200).json({ success: true, message: "Status updated", data: updated });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message || "Server error" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const before = await LiveClass.findById(id).lean();
      const deleted = await LiveClass.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: "Live class not found" });

      await logActivity(req, {
        feature: "online-classes", action: "delete",
        entityId: id, entityType: "LiveClass",
        description: `Deleted live class: "${before?.title}"`,
        before: before ? { title: before.title, teacher: before.teacher, status: before.status } : null,
      });

      return res.status(200).json({ success: true, message: "Live class deleted successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message || "Server error" });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
