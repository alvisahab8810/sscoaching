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
    // phone is unique + sparse: it must be removed, not set to "", or the second
    // deleted account collides with the first on the unique index.
    await StudentUser.findByIdAndUpdate(id, {
      $set: {
        name: "Deleted User",
        email: `deleted_${id}@deleted.invalid`,
        avatar: "",
        password: "",
        expoPushToken: "",
        isActive: false,
        deletedAt: new Date(),
      },
      $unset: { phone: 1 },
    });

    return res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (err) {
    console.error("delete-account failed:", err);
    return res.status(500).json({ success: false, message: "Could not delete account" });
  }
}
