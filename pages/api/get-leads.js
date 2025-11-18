import dbConnect from "@/lib/dbConnect";
import PopupForm from "@/models/PopupForm";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    await dbConnect();
    const leads = await PopupForm.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, leads });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
