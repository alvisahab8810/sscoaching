// /pages/api/admissions/[id].js
import dbConnect from "@/lib/dbConnect";
import Admission from "@/models/Admission";

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
      const admission = await Admission.findByIdAndUpdate(id, req.body, {
        new: true, runValidators: true,
      });
      if (!admission) return res.status(404).json({ success: false, message: "Not found" });
      return res.status(200).json({ success: true, data: admission });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const admission = await Admission.findByIdAndDelete(id);
      if (!admission) return res.status(404).json({ success: false, message: "Not found" });
      return res.status(200).json({ success: true, message: "Deleted" });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}