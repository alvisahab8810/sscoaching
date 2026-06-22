import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/models/EnrollmentModel";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  await dbConnect();

  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const enrollments = await Enrollment.find({ student: id })
      .populate({
        path: "course",
        select: "title subject thumbnail price batch chapters isFree status",
      })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ success: true, data: enrollments });
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}
