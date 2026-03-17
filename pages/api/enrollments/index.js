// pages/api/enrollments/index.js
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/models/EnrollmentModel";
import StudentUser from "@/models/StudentUser";   // ← correct model name
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  await dbConnect();

  try {
    const {
      page   = 1,
      limit  = 20,
      type,
      search,
      courseId,
      from,
      to,
      sort   = "newest",
    } = req.query;

    /* ── Filter ── */
    const filter = {};
    if (type && type !== "all") filter.type = type;
    if (courseId && mongoose.isValidObjectId(courseId))
      filter.course = courseId;
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to)   filter.createdAt.$lte = new Date(new Date(to).setHours(23, 59, 59));
    }

    /* ── Sort ── */
    const sortMap = {
      newest: { createdAt: -1 },
      oldest: { createdAt:  1 },
      amount: { amountPaid: -1 },
    };
    const sortObj = sortMap[sort] || sortMap.newest;
    const skip    = (Number(page) - 1) * Number(limit);

    /* ── Fetch with populate ── */
    // model: "StudentUser" matches the registered model name exactly
    const allEnrollments = await Enrollment
      .find(filter)
      .populate({ path: "student", model: "StudentUser", select: "name phone className batch" })
      .populate({ path: "course",  model: "Course",      select: "title subject batch price" })
      .sort(sortObj)
      .lean();

    /* ── Search filter in JS (after populate) ── */
    let filtered = allEnrollments;
    if (search && search.trim()) {
      const re = new RegExp(search.trim(), "i");
      filtered = allEnrollments.filter((e) =>
        re.test(e.student?.name   || "") ||
        re.test(e.student?.phone  || "") ||
        re.test(e.course?.title   || "") ||
        re.test(e.orderId         || "")
      );
    }

    const total     = filtered.length;
    const paginated = filtered.slice(skip, skip + Number(limit));

    /* ── Normalize to flat shape ── */
    const enrollments = paginated.map((e) => ({
      _id:          e._id,
      type:         e.type,
      amountPaid:   e.amountPaid,
      couponCode:   e.couponCode,
      discount:     e.discount,
      orderId:      e.orderId,
      paymentId:    e.paymentId,
      deliveryInfo: e.deliveryInfo,
      createdAt:    e.createdAt,
      updatedAt:    e.updatedAt,

      // Course
      courseId:      e.course?._id,
      courseTitle:   e.course?.title,
      courseSubject: e.course?.subject,
      courseBatch:   e.course?.batch,
      coursePrice:   e.course?.price,

      // Student — now resolved from StudentUser collection
      studentId:    e.student?._id,
      studentName:  e.student?.name   || "—",
      studentPhone: e.student?.phone  || "—",
      studentEmail: e.student?.email  || "",
      studentClass: e.student?.className || "",
    }));

    /* ── Stats ── */
    const statsRaw = await Enrollment.aggregate([
      {
        $group: {
          _id:          null,
          total:        { $sum: 1 },
          freeCount:    { $sum: { $cond: [{ $eq: ["$type", "free"] }, 1, 0] } },
          codCount:     { $sum: { $cond: [{ $eq: ["$type", "cod"]  }, 1, 0] } },
          paidCount:    { $sum: { $cond: [{ $eq: ["$type", "paid"] }, 1, 0] } },
          totalRevenue: { $sum: "$amountPaid" },
        },
      },
    ]);

    /* ── Top courses ── */
    const topRaw = await Enrollment.aggregate([
      { $group: { _id: "$course", count: { $sum: 1 }, revenue: { $sum: "$amountPaid" } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Manually populate course titles (avoids hardcoded collection name)
    const Course     = mongoose.model("Course");
    const cids       = topRaw.map((t) => t._id).filter(Boolean);
    const courseDocs = await Course.find({ _id: { $in: cids } }).select("title subject").lean();
    const cMap       = Object.fromEntries(courseDocs.map((c) => [c._id.toString(), c]));

    const topCourses = topRaw.map((t) => ({
      _id:     t._id,
      count:   t.count,
      revenue: t.revenue,
      title:   cMap[t._id?.toString()]?.title   || "Unknown",
      subject: cMap[t._id?.toString()]?.subject || "",
    }));

    return res.status(200).json({
      success:    true,
      enrollments,
      pagination: {
        total,
        page:       Number(page),
        limit:      Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
      },
      stats:      statsRaw[0] || { total:0, freeCount:0, codCount:0, paidCount:0, totalRevenue:0 },
      topCourses,
    });

  } catch (err) {
    console.error("Enrollments API error:", err);
    return res.status(500).json({ error: "Failed to fetch enrollments" });
  }
}
