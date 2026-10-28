import dbConnect from "@/lib/dbConnect";
import LiveClass from "@/models/LiveClassModel";
import {
  getStudentIdFromReq,
  getStudentAccess,
  isClassUnlocked,
  sanitizeClassForStudent,
} from "@/lib/liveClassAccess";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  await dbConnect();

  const studentId = getStudentIdFromReq(req);
  if (!studentId)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const { id } = req.query;

    const liveClass = await LiveClass.findById(id);
    if (!liveClass)
      return res.status(404).json({ success: false, message: "Live class not found" });

    const access = await getStudentAccess(studentId);
    if (!isClassUnlocked(liveClass.toObject(), access)) {
      return res.status(403).json({
        success: false,
        message: "Please purchase this course to join the class",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Registered successfully",
      data: sanitizeClassForStudent(liveClass, access),
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || "Server error" });
  }
}
