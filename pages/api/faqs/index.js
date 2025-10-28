import dbConnect from "@/lib/dbConnect";
import Faq from "@/models/Faq";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const faqs = await Faq.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: faqs });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const faq = await Faq.create(req.body);
      return res.status(201).json({ success: true, data: faq });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  res.status(405).json({ success: false, message: "Method not allowed" });
}
