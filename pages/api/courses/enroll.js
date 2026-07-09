// pages/api/courses/enroll.js
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/CourseModel";
import Enrollment from "@/models/EnrollmentModel";
import Coupon from "@/models/CouponModel";
import Invoice from "@/models/Invoice";
import StudentUser from "@/models/StudentUser";
import jwt from "jsonwebtoken";

async function createFreeInvoiceAndEmail({ student, course, enrollment, couponCode = "", discount = 0 }) {
  try {
    const invoice = await Invoice.create({
      student:    student.id,
      course:     course._id,
      enrollment: enrollment._id,
      studentName:  student.name  || "",
      studentPhone: student.phone || "",
      studentEmail: student.email || "",
      courseTitle:   course.title   || "",
      courseSubject: course.subject || "",
      courseBatch:   course.batch   || "",
      orderId:       `FREE-${Date.now()}`,
      paymentId:     "",
      paymentMethod: discount > 0 ? "Coupon (100% Discount)" : "Free Course",
      subtotal:   course.price || 0,
      discount,
      couponCode: couponCode || "",
      tax:        0,
      total:      0,
      status:     "paid",
    });

    // Send email non-blocking
    if (student.email) {
      try {
        const { sendInvoiceEmailHtmlOnly } = await import("@/lib/sendInvoiceEmail");
        const result = await sendInvoiceEmailHtmlOnly({ invoice, studentEmail: student.email });
        if (result.success) {
          await Invoice.findByIdAndUpdate(invoice._id, { emailSent: true, emailSentAt: new Date() });
        }
      } catch {}
    }

    return invoice;
  } catch (err) {
    console.error("Free invoice creation failed (non-fatal):", err.message);
    return null;
  }
}

function getStudent(req) {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch { return null; }
}

export default async function handler(req, res) {
  await dbConnect();
  const student = getStudent(req);
  if (!student) return res.status(401).json({ error: "Please login to continue" });

  /* ── POST /api/courses/enroll ── */
  if (req.method === "POST") {
    const { courseId, couponCode } = req.body;
    if (!courseId) return res.status(400).json({ error: "Course ID required" });

    try {
      const course = await Course.findById(courseId);
      if (!course || course.status !== "published")
        return res.status(404).json({ error: "Course not found" });

      // check already enrolled
      const existing = await Enrollment.findOne({ student: student.id, course: courseId });
      if (existing) return res.status(400).json({ error: "Already enrolled in this course" });

      const source = req.headers["x-source"] === "app" ? "app" : "web";

      /* ── FREE COURSE — enroll directly ── */
      if (course.isFree) {
        const enrollment = await Enrollment.create({ student: student.id, course: courseId, type: "free", source });
        await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });
        // Create invoice + send email (non-blocking)
        const studentDoc = await StudentUser.findById(student.id).select("name email phone").lean();
        const fullStudent = { ...student, name: studentDoc?.name || "", email: studentDoc?.email || "", phone: studentDoc?.phone || "" };
        createFreeInvoiceAndEmail({ student: fullStudent, course, enrollment }).catch(() => {});
        return res.status(200).json({ success: true, message: "Enrolled successfully!", type: "free" });
      }

      /* ── PAID COURSE — validate coupon if provided, return price info ── */
      let finalPrice  = course.price;
      let discount    = 0;
      let appliedCode = "";

      if (couponCode) {
        const coupon = await Coupon.findOne({
          code: couponCode.toUpperCase().trim(),
          isActive: true,
        });

        if (!coupon) return res.status(400).json({ error: "Invalid coupon code" });
        if (coupon.expiresAt && new Date() > coupon.expiresAt)
          return res.status(400).json({ error: "Coupon has expired" });
        if (coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses)
          return res.status(400).json({ error: "Coupon usage limit reached" });
        if (course.price < coupon.minAmount)
          return res.status(400).json({ error: `Minimum order ₹${coupon.minAmount} required` });

        if (coupon.type === "percent") {
          discount = Math.round((course.price * coupon.value) / 100);
        } else {
          discount = Math.min(coupon.value, course.price);
        }
        finalPrice  = Math.max(0, course.price - discount);
        appliedCode = coupon.code;
      }

      // If finalPrice is 0 after coupon — enroll for free
      if (finalPrice === 0) {
        const enrollment = await Enrollment.create({
          student: student.id, course: courseId,
          type: "paid", amountPaid: 0,
          couponCode: appliedCode, discount, source,
        });
        await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });
        if (appliedCode) await Coupon.findOneAndUpdate({ code: appliedCode }, { $inc: { usedCount: 1 } });
        // Create invoice + send email (non-blocking)
        const studentDoc = await StudentUser.findById(student.id).select("name email phone").lean();
        const fullStudent = { ...student, name: studentDoc?.name || "", email: studentDoc?.email || "", phone: studentDoc?.phone || "" };
        createFreeInvoiceAndEmail({ student: fullStudent, course, enrollment, couponCode: appliedCode, discount }).catch(() => {});
        return res.status(200).json({ success: true, message: "Enrolled with 100% discount!", type: "free" });
      }

      // Return price breakdown for Razorpay order (client will create order next)
      return res.status(200).json({
        success: true,
        type: "paid",
        originalPrice: course.price,
        discount,
        finalPrice,
        couponCode: appliedCode,
        courseName: course.title,
      });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}