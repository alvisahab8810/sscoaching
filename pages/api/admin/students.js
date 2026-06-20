import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import jwt from "jsonwebtoken";
import { logActivity } from "@/lib/logActivity";

function verifyAdmin(req) {
  try {
    const adminToken = req.cookies?.admin_token;
    if (adminToken) { jwt.verify(adminToken, process.env.JWT_SECRET); return true; }
    const subToken = req.cookies?.subadmin_token;
    if (subToken) { const d = jwt.verify(subToken, process.env.JWT_SECRET); return d.role === "subadmin"; }
    return false;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  await dbConnect();

  if (!verifyAdmin(req)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const {
        page = 1, limit = 15, search = "",
        className = "", batch = "",
        sortBy = "createdAt", sortOrder = "desc",
      } = req.query;

      const filter = {};
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
        StudentUser.find(filter).sort(sort).skip(skip).limit(Number(limit)).select("-__v"),
        StudentUser.countDocuments(filter),
      ]);

      const [totalStudents, activeStudents, completeProfiles] = await Promise.all([
        StudentUser.countDocuments({}),
        StudentUser.countDocuments({ isActive: true }),
        StudentUser.countDocuments({ isProfileComplete: true }),
      ]);

      return res.status(200).json({
        success: true,
        data: students,
        stats: { total: totalStudents, active: activeStudents, profileComplete: completeProfiles },
        pagination: { total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message || "Server error" });
    }
  }

  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ success: false, message: "Student ID required" });
      const before = await StudentUser.findById(id).lean();
      const updated = await StudentUser.findByIdAndUpdate(id, req.body, { new: true });

      const statusChanged = before?.isActive !== updated?.isActive;
      await logActivity(req, {
        feature: "students",
        action: statusChanged ? (updated?.isActive ? "activate" : "deactivate") : "update",
        entityId: id, entityType: "StudentUser",
        description: statusChanged
          ? `${updated?.isActive ? "Activated" : "Deactivated"} student: ${updated?.name}`
          : `Updated student: ${updated?.name}`,
        before: before ? { name: before.name, isActive: before.isActive } : null,
        after: { name: updated?.name, isActive: updated?.isActive },
      });

      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ success: false, message: "Student ID required" });
      const before = await StudentUser.findById(id).lean();
      await StudentUser.findByIdAndDelete(id);

      await logActivity(req, {
        feature: "students", action: "delete",
        entityId: id, entityType: "StudentUser",
        description: `Deleted student: ${before?.name} (${before?.phone})`,
        before: before ? { name: before.name, phone: before.phone, className: before.className } : null,
      });

      return res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
