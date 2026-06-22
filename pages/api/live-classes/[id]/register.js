import dbConnect from "@/lib/dbConnect";
import LiveClass from "@/models/LiveClassModel";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const { id } = req.query;

    const liveClass = await LiveClass.findById(id);
    if (!liveClass)
      return res.status(404).json({ success: false, message: "Live class not found" });

    return res.status(200).json({ success: true, message: "Registered successfully", data: liveClass });
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}
