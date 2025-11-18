import dbConnect from "@/lib/dbConnect";
import PopupForm from "@/models/PopupForm";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    await dbConnect();

    const formData = JSON.parse(req.body);

    const saved = await PopupForm.create(formData);

    return res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: saved,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
