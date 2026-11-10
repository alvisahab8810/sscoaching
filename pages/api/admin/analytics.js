import dbConnect from "@/lib/dbConnect";
import Invoice from "@/models/Invoice";
import Enrollment from "@/models/EnrollmentModel";
import StudentUser from "@/models/StudentUser";
import Course from "@/models/CourseModel";
import jwt from "jsonwebtoken";
import { videoWatchTotals } from "@/lib/watchTime";

function verifyAdmin(req) {
  try {
    const adminToken = req.cookies?.admin_token;
    if (adminToken) { jwt.verify(adminToken, process.env.JWT_SECRET); return true; }
    const subToken = req.cookies?.subadmin_token;
    if (subToken) { const d = jwt.verify(subToken, process.env.JWT_SECRET); return d.role === "subadmin"; }
    return false;
  } catch { return false; }
}

/**
 * Students who deleted their account are anonymised, not removed (see
 * pages/api/auth/delete-account.js), so the record stays for the enrollment
 * history. They must not be counted as students any more.
 *
 * The field is declared with a null default, so it is present on every
 * document -- matching null (which also covers a missing field) is the only
 * filter that works here.
 */
const NOT_DELETED = { deletedAt: null };

const TZ = "Asia/Kolkata";
const IST_MS = 330 * 60 * 1000;

// "YYYY-MM" of a date, in IST, so a payment at 1 AM on the 1st lands in the
// right month.
const istMonth = (d) => new Date(new Date(d).getTime() + IST_MS).toISOString().slice(0, 7);

// The last `n` months as "YYYY-MM", newest first.
function lastMonths(n) {
  const now = new Date(Date.now() + IST_MS);
  const out = [];
  for (let i = 0; i < n; i++) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
    out.push(d.toISOString().slice(0, 7));
  }
  return out;
}

const monthLabel = (ym) => {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleString("en-IN", { month: "long", year: "numeric", timeZone: "UTC" });
};

/**
 * What kind of payment an enrollment is. Only "real" is money the business
 * actually collected through Razorpay.
 *
 *   real   paid through Razorpay (website or Android app)
 *   test   ₹1 Razorpay payments made while testing the payment flow
 *   apple  bought inside the iPhone app. Apple collects that money and pays
 *          it out later, so it is never part of the Razorpay figure. Until
 *          the iOS app is live on the App Store these are TestFlight
 *          purchases, which are not real money.
 *   free   free course or 100% coupon
 */
function paymentKind(e) {
  if (e.type !== "paid" || !(e.amountPaid > 0)) return "free";
  if (String(e.orderId || "").startsWith("apple:")) return "apple";
  if (e.amountPaid <= 1) return "test";
  return "real";
}

function platformOf(e) {
  if (String(e.orderId || "").startsWith("apple:")) return "iPhone app";
  return e.source === "app" ? "Android app" : "Website";
}

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  await dbConnect();
  if (!verifyAdmin(req)) return res.status(401).json({ success: false, message: "Unauthorized" });

  const [enrollments, invoices, studentMonths, studentClasses, studentSources, studentTotals, courses, watch] =
    await Promise.all([
      Enrollment.find()
        .sort({ createdAt: -1 })
        .select("student course type orderId paymentId amountPaid couponCode discount status source createdAt")
        .populate("student", "name email phone deletedAt")
        .populate("course", "title subject price isFree status")
        .lean(),

      Invoice.find({ status: "paid" }).select("enrollment paymentId invoiceNumber").lean(),

      StudentUser.aggregate([
        { $match: NOT_DELETED },
        {
          $group: {
            _id: { m: { $dateToString: { format: "%Y-%m", date: "$createdAt", timezone: TZ } }, s: "$signupSource" },
            n: { $sum: 1 },
          },
        },
      ]),

      StudentUser.aggregate([
        { $match: NOT_DELETED },
        { $group: { _id: "$className", n: { $sum: 1 } } },
        { $sort: { n: -1 } },
      ]),

      StudentUser.aggregate([
        { $match: NOT_DELETED },
        { $group: { _id: "$signupSource", n: { $sum: 1 } } },
      ]),

      Promise.all([
        StudentUser.countDocuments(NOT_DELETED),
        StudentUser.countDocuments({ deletedAt: { $ne: null } }),
      ]),

      Course.find({ status: "published" }).select("title subject courseType price isFree status").lean(),

      videoWatchTotals(),
    ]);

  // Invoice number for each enrollment, matched by enrollment id or payment id.
  const invoiceOf = new Map();
  for (const inv of invoices) {
    if (inv.enrollment) invoiceOf.set(`e:${inv.enrollment}`, inv.invoiceNumber);
    if (inv.paymentId) invoiceOf.set(`p:${inv.paymentId}`, inv.invoiceNumber);
  }

  const months12 = lastMonths(12);
  const thisMonth = months12[0];
  const lastMonth = months12[1];

  /* ── One row per enrollment ─────────────────────────────────────────── */
  const rows = enrollments.map((e) => ({
    _id: e._id,
    date: e.createdAt,
    month: istMonth(e.createdAt),
    studentId: e.student?._id ? String(e.student._id) : "",
    studentName: e.student?.deletedAt ? "Deleted account" : e.student?.name || "—",
    studentPhone: e.student?.deletedAt ? "" : e.student?.phone || "",
    studentEmail: e.student?.deletedAt ? "" : e.student?.email || "",
    courseId: e.course?._id ? String(e.course._id) : "",
    courseTitle: e.course?.title || "Deleted course",
    platform: platformOf(e),
    kind: paymentKind(e),
    amount: e.type === "paid" ? e.amountPaid || 0 : 0,
    coupon: e.couponCode || "",
    discount: e.discount || 0,
    status: e.status || "active",
    paymentId: e.paymentId || "",
    invoice: invoiceOf.get(`e:${e._id}`) || invoiceOf.get(`p:${e.paymentId}`) || "",
  }));

  // Refunded enrollments are listed but never counted as money or students.
  const counted = rows.filter((r) => r.status !== "refunded");
  const real = counted.filter((r) => r.kind === "real");
  const sum = (list) => list.reduce((a, r) => a + r.amount, 0);
  const inMonth = (list, m) => list.filter((r) => r.month === m);

  /* ── Payment types ──────────────────────────────────────────────────── */
  const kinds = ["real", "test", "apple", "free"];
  const paymentTypes = kinds.map((k) => {
    const list = counted.filter((r) => r.kind === k);
    return { kind: k, count: list.length, amount: sum(list), students: new Set(list.map((r) => r.studentId)).size };
  });

  /* ── Month-wise ─────────────────────────────────────────────────────── */
  const signupsBy = new Map();
  for (const s of studentMonths) {
    const cur = signupsBy.get(s._id.m) || { web: 0, app: 0 };
    cur[s._id.s === "app" ? "app" : "web"] += s.n;
    signupsBy.set(s._id.m, cur);
  }

  // Month table starts at the first month with any activity, so the boss
  // does not scroll through empty rows from before launch.
  const activeMonths = new Set([...rows.map((r) => r.month), ...signupsBy.keys()]);
  const firstActive = [...activeMonths].sort()[0] || thisMonth;
  const tableMonths = months12.filter((m) => m >= firstActive);

  const monthly = tableMonths.map((m) => {
    const list = inMonth(counted, m);
    const realList = list.filter((r) => r.kind === "real");
    const signups = signupsBy.get(m) || { web: 0, app: 0 };
    return {
      month: m,
      label: monthLabel(m),
      newStudents: signups.web + signups.app,
      newStudentsWeb: signups.web,
      newStudentsApp: signups.app,
      paidEnrollments: realList.length,
      freeEnrollments: list.filter((r) => r.kind === "free").length,
      testEnrollments: list.filter((r) => r.kind === "test" || r.kind === "apple").length,
      revenue: sum(realList),
      revenueWeb: sum(realList.filter((r) => r.platform === "Website")),
      revenueApp: sum(realList.filter((r) => r.platform !== "Website")),
      payingStudents: new Set(realList.map((r) => r.studentId)).size,
    };
  });

  /* ── Platforms ──────────────────────────────────────────────────────── */
  const platforms = ["Website", "Android app", "iPhone app"].map((p) => {
    const list = counted.filter((r) => r.platform === p);
    return {
      platform: p,
      paid: list.filter((r) => r.kind === "real").length,
      free: list.filter((r) => r.kind === "free").length,
      test: list.filter((r) => r.kind === "test" || r.kind === "apple").length,
      total: list.length,
      revenue: sum(list.filter((r) => r.kind === "real")),
    };
  });

  /* ── Courses ────────────────────────────────────────────────────────── */
  const courseMap = new Map();
  for (const c of courses) {
    courseMap.set(String(c._id), {
      _id: String(c._id),
      title: c.title,
      subject: c.subject || (c.courseType === "bundle" ? "Bundle" : ""),
      price: c.isFree ? 0 : c.price || 0,
      isFree: !!c.isFree,
      published: true,
      enrolled: 0, paid: 0, free: 0, test: 0, revenue: 0,
    });
  }
  for (const r of counted) {
    if (!r.courseId) continue;
    if (!courseMap.has(r.courseId)) {
      // A draft or unpublished course that still has students.
      courseMap.set(r.courseId, {
        _id: r.courseId, title: r.courseTitle, subject: "", price: null, isFree: false, published: false,
        enrolled: 0, paid: 0, free: 0, test: 0, revenue: 0,
      });
    }
    const c = courseMap.get(r.courseId);
    c.enrolled++;
    if (r.kind === "real") { c.paid++; c.revenue += r.amount; }
    else if (r.kind === "free") c.free++;
    else c.test++;
  }
  const courseRows = [...courseMap.values()].sort(
    (a, b) => b.revenue - a.revenue || b.enrolled - a.enrolled || a.title.localeCompare(b.title)
  );

  /* ── Paying students ────────────────────────────────────────────────── */
  const payerMap = new Map();
  for (const r of real) {
    const p = payerMap.get(r.studentId) || {
      studentId: r.studentId, name: r.studentName, phone: r.studentPhone, email: r.studentEmail,
      courses: [], amount: 0, first: r.date, last: r.date,
    };
    p.courses.push(r.courseTitle);
    p.amount += r.amount;
    if (new Date(r.date) < new Date(p.first)) p.first = r.date;
    if (new Date(r.date) > new Date(p.last)) p.last = r.date;
    payerMap.set(r.studentId, p);
  }
  const payers = [...payerMap.values()].sort((a, b) => b.amount - a.amount);

  const [totalStudents, deletedStudents] = studentTotals;
  const enrolledStudents = new Set(counted.filter((r) => r.studentName !== "Deleted account").map((r) => r.studentId)).size;
  const sourceCount = (s) => studentSources.find((x) => (x._id === "app" ? "app" : "web") === s)?.n || 0;

  /* ── Overview (all time / this month / last month) ──────────────────── */
  const forMonth = (m) => {
    const list = m ? inMonth(counted, m) : counted;
    const realList = list.filter((r) => r.kind === "real");
    const signups = m ? signupsBy.get(m) || { web: 0, app: 0 } : null;
    return {
      revenue: sum(realList),
      payments: realList.length,
      payingStudents: new Set(realList.map((r) => r.studentId)).size,
      freeEnrollments: list.filter((r) => r.kind === "free").length,
      testEntries: list.filter((r) => r.kind === "test" || r.kind === "apple").length,
      newStudents: signups ? signups.web + signups.app : totalStudents,
    };
  };

  return res.json({
    success: true,
    generatedAt: new Date(),
    thisMonthLabel: monthLabel(thisMonth),
    lastMonthLabel: monthLabel(lastMonth),
    overview: {
      all: forMonth(null),
      thisMonth: forMonth(thisMonth),
      lastMonth: forMonth(lastMonth),
      publishedCourses: courses.length,
      enrolledStudents,
      watchHours: watch.hours,
      watchStudents: watch.students,
      watchVideos: watch.videos,
      avgWatchHours: watch.avgHoursPerStudent,
    },
    paymentTypes,
    monthly,
    platforms,
    students: {
      total: totalStudents,
      deleted: deletedStudents,
      enrolled: enrolledStudents,
      notEnrolled: Math.max(totalStudents - enrolledStudents, 0),
      paying: payers.length,
      web: sourceCount("web"),
      app: sourceCount("app"),
      byClass: studentClasses.map((c) => ({ className: c._id || "Not selected", count: c.n })),
    },
    payers,
    courses: courseRows,
    enrollments: rows,
  });
}
