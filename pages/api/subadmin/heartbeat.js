import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import SubAdminLiveSession from "@/models/SubAdminLiveSession";

const FEATURE_MAP = {
  "/dashboard/admin/blogs": { feature: "blogs", label: "Blogs" },
  "/dashboard/admin/faqs": { feature: "faqs", label: "FAQs" },
  "/dashboard/admin/leads": { feature: "leads", label: "Leads" },
  "/dashboard/admin/student-success": { feature: "student-success", label: "Student Success" },
  "/dashboard/admin/online-classes": { feature: "online-classes", label: "Online Classes" },
  "/dashboard/admin/students": { feature: "students", label: "Students" },
  "/dashboard/admin/courses": { feature: "courses", label: "Courses" },
  "/dashboard/admin/admissions": { feature: "admissions", label: "Applications" },
  "/dashboard/admin/announcements": { feature: "announcements", label: "Announcements" },
  "/dashboard/admin/invoices": { feature: "invoices", label: "Invoices" },
  "/dashboard/admin/enrollments": { feature: "enrollments", label: "Enrollments" },
  "/dashboard": { feature: "dashboard", label: "Dashboard" },
};

function resolveFeature(page) {
  if (!page) return { feature: "dashboard", label: "Dashboard" };
  for (const [path, meta] of Object.entries(FEATURE_MAP)) {
    if (page.startsWith(path) && path !== "/dashboard") return meta;
  }
  if (page === "/dashboard") return FEATURE_MAP["/dashboard"];
  return { feature: "other", label: "Other" };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const subAdminToken = req.cookies?.subadmin_token;
  if (!subAdminToken) return res.status(401).json({ message: "Unauthorized" });

  let decoded;
  try {
    decoded = jwt.verify(subAdminToken, process.env.JWT_SECRET);
    if (decoded.role !== "subadmin") return res.status(403).json({ message: "Forbidden" });
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }

  const { page } = req.body || {};
  const { feature, label } = resolveFeature(page);
  const rawIp = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket?.remoteAddress || null;
  const ip = (!rawIp || rawIp === "::1" || rawIp === "127.0.0.1" || rawIp.startsWith("::ffff:127."))
    ? null : rawIp.replace("::ffff:", "");

  await dbConnect();

  await SubAdminLiveSession.findOneAndUpdate(
    { subAdminId: decoded.id },
    {
      subAdminId: decoded.id,
      subAdminName: decoded.name,
      subAdminUsername: decoded.username,
      currentPage: page || "/dashboard",
      currentFeature: feature,
      currentPageLabel: label,
      lastSeen: new Date(),
      ip,
    },
    { upsert: true, new: true }
  );

  return res.status(200).json({ success: true });
}
