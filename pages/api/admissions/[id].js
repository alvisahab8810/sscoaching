import dbConnect from "@/lib/dbConnect";
import Admission from "@/models/Admission";
import { logActivity } from "@/lib/logActivity";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const admission = await Admission.findById(id);
      if (!admission) return res.status(404).json({ success: false, message: "Not found" });
      return res.status(200).json({ success: true, data: admission });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  if (req.method === "PUT") {
    try {
      const before = await Admission.findById(id).lean();
      const admission = await Admission.findByIdAndUpdate(id, req.body, {
        new: true, runValidators: true,
      });
      if (!admission) return res.status(404).json({ success: false, message: "Not found" });

      const statusChanged = before?.status !== admission.status;
      await logActivity(req, {
        feature: "admissions",
        action: statusChanged ? "status-change" : "update",
        entityId: id, entityType: "Admission",
        description: statusChanged
          ? `Admission status changed to "${admission.status}" for ${admission.name}`
          : `Updated admission for ${admission.name}`,
        before: before ? { name: before.name, status: before.status, course: before.course } : null,
        after: { name: admission.name, status: admission.status, course: admission.course },
      });

      return res.status(200).json({ success: true, data: admission });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const before = await Admission.findById(id).lean();
      const admission = await Admission.findByIdAndDelete(id);
      if (!admission) return res.status(404).json({ success: false, message: "Not found" });

      await logActivity(req, {
        feature: "admissions", action: "delete",
        entityId: id, entityType: "Admission",
        description: `Deleted admission for ${before?.name}`,
        before: before ? { name: before.name, status: before.status, course: before.course } : null,
      });

      return res.status(200).json({ success: true, message: "Deleted" });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
