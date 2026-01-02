import dbConnect from "@/lib/dbConnect";
import StudentSuccess from "@/models/home/StudentSuccess";

export default async function handler(req, res) {
  await dbConnect();

  // ✅ GET ALL
  if (req.method === "GET") {
    try {
      const students = await StudentSuccess.find({ isActive: true })
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        data: students,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ✅ CREATE
  if (req.method === "POST") {
    try {
      const student = await StudentSuccess.create(req.body);

      return res.status(201).json({
        success: true,
        data: student,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
}
