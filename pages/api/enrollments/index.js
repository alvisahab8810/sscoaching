// pages/api/enrollments/index.js
import dbConnect from "@/lib/dbConnect";
import Enrollment from "@/models/EnrollmentModel";
import StudentUser from "@/models/StudentUser";   // ← correct model name
import Course from "@/models/CourseModel";
import Invoice from "@/models/Invoice";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { logActivity } from "@/lib/logActivity";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "DELETE")
    return res.status(405).json({ error: "Method not allowed" });

  // This route hands out student names and phone numbers and can delete
  // enrollment records, so it is admin only.
  const session = requireAdminApi(req, "enrollments");
  if (!session) return res.status(401).json({ error: "Not authenticated" });

  await dbConnect();

  if (req.method === "DELETE") return handleDelete(req, res);

  try {
    const {
      page   = 1,
      limit  = 20,
      type,
      source,
      search,
      courseId,
      from,
      to,
      sort   = "newest",
    } = req.query;

    /* ── Filter ── */
    const filter = {};
    if (type && type !== "all") filter.type = type;
    if (source === "app") filter.source = "app";
    else if (source === "web") filter.source = { $in: ["web", null] };
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
      .populate({ path: "student", model: "StudentUser", select: "name phone email className batch" })
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
      source:       e.source || "web",
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
          appCount:     { $sum: { $cond: [{ $eq: ["$source", "app"] }, 1, 0] } },
          webCount:     { $sum: { $cond: [{ $ne: ["$source", "app"] }, 1, 0] } },
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
      stats:      statsRaw[0] || { total:0, freeCount:0, codCount:0, paidCount:0, totalRevenue:0, webCount:0, appCount:0 },
      topCourses,
    });

  } catch (err) {
    console.error("Enrollments API error:", err);
    return res.status(500).json({ error: "Failed to fetch enrollments" });
  }
}

/**
 * Removes one enrollment. Meant for clearing out test and duplicate rows.
 *
 * The course's enrolledCount is decremented and any invoice raised for the
 * enrollment is removed with it, otherwise a deleted test purchase keeps
 * inflating the course's enrollment count and the revenue totals on the
 * analytics page.
 */
/** Guards against a runaway request wiping the collection in one call. */
const MAX_BULK_DELETE = 200;

async function handleDelete(req, res) {
  try {
    // ?id=... deletes one row, ?ids=a,b,c deletes a selection. Both paths
    // run through the same cleanup so a bulk delete can never leave behind
    // invoices or a wrong enrolledCount.
    const raw = req.query.ids
      ? String(req.query.ids).split(",")
      : req.query.id
      ? [String(req.query.id)]
      : [];

    const ids = [...new Set(raw.map((s) => s.trim()).filter(Boolean))];

    if (!ids.length)
      return res.status(400).json({ error: "No enrollment id provided" });

    if (ids.some((id) => !mongoose.isValidObjectId(id)))
      return res.status(400).json({ error: "Invalid enrollment id" });

    if (ids.length > MAX_BULK_DELETE)
      return res
        .status(400)
        .json({ error: `Cannot delete more than ${MAX_BULK_DELETE} enrollments at once` });

    const enrollments = await Enrollment.find({ _id: { $in: ids } }).lean();
    if (!enrollments.length)
      return res.status(404).json({ error: "Enrollment not found" });

    const foundIds = enrollments.map((e) => e._id);

    await Enrollment.deleteMany({ _id: { $in: foundIds } });

    const invoiceResult = await Invoice.deleteMany({ enrollment: { $in: foundIds } });

    // Two rows can point at the same course, so the decrement is grouped --
    // one update per course, by how many of its enrollments just went.
    const perCourse = new Map();
    for (const enr of enrollments) {
      if (!enr.course) continue;
      const key = String(enr.course);
      perCourse.set(key, (perCourse.get(key) || 0) + 1);
    }

    if (perCourse.size) {
      await Course.bulkWrite(
        [...perCourse].map(([courseId, count]) => ({
          updateOne: {
            // Guarded so a count that is already low cannot be pushed negative.
            filter: { _id: courseId, enrolledCount: { $gte: count } },
            update: { $inc: { enrolledCount: -count } },
          },
        }))
      );
    }

    const isBulk = enrollments.length > 1;

    await logActivity(req, {
      feature:     "enrollments",
      action:      "delete",
      entityId:    foundIds[0],
      entityType:  "Enrollment",
      description: isBulk
        ? `Deleted ${enrollments.length} enrollments in bulk (total amount paid: ${enrollments.reduce((s, e) => s + (e.amountPaid || 0), 0)})`
        : `Deleted enrollment (type: ${enrollments[0].type || "—"}, amount paid: ${enrollments[0].amountPaid || 0})`,
      before:      isBulk ? enrollments : enrollments[0],
    });

    const noun = isBulk ? `${enrollments.length} enrollments` : "Enrollment";

    return res.status(200).json({
      success: true,
      deletedCount: enrollments.length,
      message: invoiceResult.deletedCount
        ? `${noun} and ${invoiceResult.deletedCount} linked invoice(s) deleted`
        : `${noun} deleted`,
    });
  } catch (err) {
    console.error("Enrollment delete error:", err);
    return res.status(500).json({ error: "Failed to delete enrollment" });
  }
}
