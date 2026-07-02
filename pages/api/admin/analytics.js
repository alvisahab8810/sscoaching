import dbConnect from "@/lib/dbConnect";
import Invoice from "@/models/Invoice";
import Enrollment from "@/models/EnrollmentModel";
import StudentUser from "@/models/StudentUser";
import Course from "@/models/CourseModel";
import jwt from "jsonwebtoken";

function verifyAdmin(req) {
  try {
    const adminToken = req.cookies?.admin_token;
    if (adminToken) { jwt.verify(adminToken, process.env.JWT_SECRET); return true; }
    const subToken = req.cookies?.subadmin_token;
    if (subToken) { const d = jwt.verify(subToken, process.env.JWT_SECRET); return d.role === "subadmin"; }
    return false;
  } catch { return false; }
}

function getLast6Months() {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ year: d.getFullYear(), month: d.getMonth() + 1, label: d.toLocaleString("en-IN", { month: "short", year: "2-digit" }) });
  }
  return months;
}

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  await dbConnect();
  if (!verifyAdmin(req)) return res.status(401).json({ success: false, message: "Unauthorized" });

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const months = getLast6Months();

  const [
    totalRevenue,
    monthRevenue,
    revenueByMonth,
    totalEnrollments,
    monthEnrollments,
    enrollmentsByMonth,
    enrollmentsByType,
    totalStudents,
    monthStudents,
    studentsByMonth,
    publishedCourses,
    topCourses,
    recentEnrollments,
  ] = await Promise.all([
    // Total revenue (paid invoices)
    Invoice.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]),

    // This month revenue
    Invoice.aggregate([
      { $match: { status: "paid", createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]),

    // Revenue last 6 months
    Invoice.aggregate([
      { $match: { status: "paid", createdAt: { $gte: sixMonthsAgo } } },
      { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, total: { $sum: "$total" } } },
    ]),

    // Total enrollments
    Enrollment.countDocuments(),

    // This month enrollments
    Enrollment.countDocuments({ createdAt: { $gte: startOfMonth } }),

    // Enrollments last 6 months
    Enrollment.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, count: { $sum: 1 } } },
    ]),

    // Enrollment breakdown by type
    Enrollment.aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]),

    // Total students
    StudentUser.countDocuments(),

    // New students this month
    StudentUser.countDocuments({ createdAt: { $gte: startOfMonth } }),

    // Student registrations last 6 months
    StudentUser.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, count: { $sum: 1 } } },
    ]),

    // Published courses
    Course.countDocuments({ status: "published" }),

    // Top 5 courses by enrollments
    Course.find({ status: "published" })
      .select("title subject enrolledCount price isFree")
      .sort({ enrolledCount: -1 })
      .limit(5)
      .lean(),

    // Recent 10 enrollments
    Enrollment.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("student", "name email phone")
      .populate("course", "title subject")
      .lean(),
  ]);

  // Map monthly data to the 6-month labels
  const mapMonthly = (data, key = "total") =>
    months.map(m => {
      const found = data.find(d => d._id.year === m.year && d._id.month === m.month);
      return { label: m.label, value: found ? found[key] : 0 };
    });

  // Enrollment type breakdown
  const typeMap = { free: 0, paid: 0, cod: 0 };
  enrollmentsByType.forEach(t => { if (t._id in typeMap) typeMap[t._id] = t.count; });

  return res.json({
    success: true,
    kpi: {
      totalRevenue:     totalRevenue[0]?.total || 0,
      monthRevenue:     monthRevenue[0]?.total || 0,
      totalEnrollments,
      monthEnrollments,
      totalStudents,
      monthStudents,
      publishedCourses,
    },
    revenueMonthly:     mapMonthly(revenueByMonth, "total"),
    enrollmentsMonthly: mapMonthly(enrollmentsByMonth, "count"),
    studentsMonthly:    mapMonthly(studentsByMonth, "count"),
    enrollmentsByType:  typeMap,
    topCourses,
    recentEnrollments,
  });
}
