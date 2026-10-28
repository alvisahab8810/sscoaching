import dbConnect from "@/lib/dbConnect";
import LiveClass from "@/models/LiveClassModel";
import {
  getStudentIdFromReq,
  isAuthenticatedAdmin,
  getStudentAccess,
  sanitizeClassForStudent,
} from "@/lib/liveClassAccess";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  await dbConnect();

  try {
    const { id } = req.query;
    const liveClass = await LiveClass.findById(id);
    if (!liveClass)
      return res.status(404).json({ success: false, message: "Live class not found" });

    if (isAuthenticatedAdmin(req)) {
      return res.status(200).json({ success: true, data: liveClass });
    }

    const access = await getStudentAccess(getStudentIdFromReq(req));
    const safeClass = sanitizeClassForStudent(liveClass, access);

    return res.status(200).json({ success: true, data: safeClass });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || "Server error" });
  }
}
