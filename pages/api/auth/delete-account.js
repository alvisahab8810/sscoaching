import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import Enrollment from "@/models/EnrollmentModel";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();
  await dbConnect();

  const token = (req.headers.authorization || "").replace("Bearer ", "").trim();
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    // Anonymize student data instead of hard delete (preserves enrollment records for admin)
    await StudentUser.findByIdAndUpdate(id, {
      name: "Deleted User",
      email: `deleted_${id}@deleted.invalid`,
      phone: "",
      avatar: "",
      password: "",
      expoPushToken: "",
      isActive: false,
      deletedAt: new Date(),
    });

    return res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}
