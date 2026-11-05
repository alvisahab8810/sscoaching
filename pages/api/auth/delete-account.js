import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import Enrollment from "@/models/EnrollmentModel";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();
  await dbConnect();

  const token = (req.headers.authorization || "").replace("Bearer ", "").trim();
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  let id;
  try {
    ({ id } = jwt.verify(token, process.env.JWT_SECRET));
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }

  try {
    // Anonymize student data instead of hard delete (preserves enrollment records for admin).
    // The live phone index is unique and NOT sparse, so "" or a missing phone
    // counts as a value and the second deleted account collides with the
    // first. A per-account placeholder is unique and can never match a login.
    await StudentUser.findByIdAndUpdate(id, {
      $set: {
        name: "Deleted User",
        email: `deleted_${id}@deleted.invalid`,
        phone: `deleted_${id}`,
        avatar: "",
        password: "",
        expoPushToken: "",
        isActive: false,
        deletedAt: new Date(),
      },
    });

    return res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (err) {
    console.error("delete-account failed:", err);
    return res.status(500).json({ success: false, message: "Could not delete account" });
  }
}
