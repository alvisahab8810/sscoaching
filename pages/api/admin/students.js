import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import jwt from "jsonwebtoken";

// ---- verify admin from cookie ----
function verifyAdmin(req) {
  try {
    const token = req.cookies?.admin_token;
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  await dbConnect();

  // Verify admin
  const admin = verifyAdmin(req);
  if (!admin) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  /* ============================================================
     GET /api/admin/students
     Returns paginated student list with stats
  ============================================================ */
  if (req.method === "GET") {
    try {
      const {
        page = 1,
        limit = 15,
        search = "",
        className = "",
        batch = "",
        sortBy = "createdAt",
        sortOrder = "desc",
      } = req.query;

      const filter = {};

      // Search by name or phone
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ];
      }

      if (className) filter.className = { $regex: `^${className}$`, $options: "i" };
      if (batch) filter.batch = { $regex: batch, $options: "i" };

      const skip = (Number(page) - 1) * Number(limit);
      const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

      const [students, total] = await Promise.all([
        StudentUser.find(filter)
          .sort(sort)
          .skip(skip)
          .limit(Number(limit))
          .select("-__v"),
        StudentUser.countDocuments(filter),
      ]);

      // Overall stats (not filtered)
      const [totalStudents, activeStudents, completeProfiles] = await Promise.all([
        StudentUser.countDocuments({}),
        StudentUser.countDocuments({ isActive: true }),
        StudentUser.countDocuments({ isProfileComplete: true }),
      ]);

      return res.status(200).json({
        success: true,
        data: students,
        stats: {
          total: totalStudents,
          active: activeStudents,
          profileComplete: completeProfiles,
        },
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Server error",
      });
    }
  }

  /* ============================================================
     DELETE /api/admin/students?id=xxx
     Delete a student by ID
  ============================================================ */
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ success: false, message: "Student ID required" });
      }
      await StudentUser.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}