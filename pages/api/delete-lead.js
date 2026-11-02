import dbConnect from "@/lib/dbConnect";
import PopupForm from "@/models/PopupForm";
import { requireAdminApi } from "@/lib/requireAdminApi";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const admin = requireAdminApi(req, "leads");
  if (!admin) return res.status(401).json({ success: false, message: "Not authorised" });

  try {
    await dbConnect();
    const { id } = JSON.parse(req.body);

    await PopupForm.findByIdAndDelete(id);

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
