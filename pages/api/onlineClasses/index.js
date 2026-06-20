import dbConnect from "@/lib/dbConnect";
import LiveClass from "@/models/LiveClassModel";
import { logActivity } from "@/lib/logActivity";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { status, batch, page = 1, limit = 10 } = req.query;
      const filter = {};
      if (status) filter.status = status;
      if (batch) filter.batch = { $regex: `^${batch}$`, $options: "i" };
      const skip = (Number(page) - 1) * Number(limit);
      const [data, total] = await Promise.all([
        LiveClass.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        LiveClass.countDocuments(filter),
      ]);
      return res.status(200).json({ success: true, data, pagination: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) } });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message || "Server error" });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, teacher, subject, chapter, topic, batch, date, time, duration, streamLink, description, status } = req.body;
      if (!title || !teacher || !subject || !batch || !date || !time || !streamLink) {
        return res.status(400).json({ success: false, message: "Please fill all required fields" });
      }
      const liveClass = await LiveClass.create({ title, teacher, subject, chapter, topic, batch, date, time, duration, streamLink, description, status: status || "upcoming" });

      await logActivity(req, {
        feature: "online-classes", action: "create",
        entityId: liveClass._id, entityType: "LiveClass",
        description: `Created live class: "${title}"`,
        after: { title, teacher, subject, batch, date, time, status: status || "upcoming" },
      });

      return res.status(201).json({ success: true, message: "Live class scheduled successfully", data: liveClass });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message || "Server error" });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
