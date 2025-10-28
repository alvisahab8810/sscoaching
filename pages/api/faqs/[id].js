import dbConnect from "@/lib/dbConnect";
import Faq from "@/models/Faq";

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const faq = await Faq.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ success: true, data: faq });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Faq.findByIdAndDelete(id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}
