import dbConnect from "@/lib/dbConnect";
import Faq from "@/models/Faq";
import { logActivity } from "@/lib/logActivity";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const before = await Faq.findById(id).lean();
      const faq = await Faq.findByIdAndUpdate(id, req.body, { new: true });

      await logActivity(req, {
        feature: "faqs", action: "update",
        entityId: id, entityType: "Faq",
        description: `Updated FAQ: "${faq.question?.slice(0, 60)}"`,
        before: before ? { question: before.question, status: before.status } : null,
        after: { question: faq.question, status: faq.status },
      });

      res.status(200).json({ success: true, data: faq });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const before = await Faq.findById(id).lean();
      await Faq.findByIdAndDelete(id);

      await logActivity(req, {
        feature: "faqs", action: "delete",
        entityId: id, entityType: "Faq",
        description: `Deleted FAQ: "${before?.question?.slice(0, 60)}"`,
        before: before ? { question: before.question, status: before.status } : null,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
