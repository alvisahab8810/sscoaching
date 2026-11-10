// pages/api/courses/enroll.js
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/CourseModel";
import Enrollment from "@/models/EnrollmentModel";
import mongoose from "mongoose";
import { quote, saveCheckoutOrder, settleCheckoutOrder } from "@/lib/checkout";
import Invoice from "@/models/Invoice";
import StudentUser from "@/models/StudentUser";
import jwt from "jsonwebtoken";
import { requireActiveStudent } from "@/lib/studentAuth";

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

    // Send email (PDF-attached, falling back to HTML-only) — non-blocking
    if (student.email) {
      try {
        const { sendInvoiceEmail, sendInvoiceEmailHtmlOnly } = await import("@/lib/sendInvoiceEmail");
        const result = await sendInvoiceEmail({ invoice, studentEmail: student.email });
        if (result.success) {
          await Invoice.findByIdAndUpdate(invoice._id, { emailSent: true, emailSentAt: new Date(), pdfGenerated: true });
        } else {
          const r2 = await sendInvoiceEmailHtmlOnly({ invoice, studentEmail: student.email });
          if (r2.success) {
            await Invoice.findByIdAndUpdate(invoice._id, { emailSent: true, emailSentAt: new Date() });
          }
        }
      } catch (emailErr) {
        console.error("Invoice email failed (non-fatal):", emailErr.message);
      }
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

  // A deactivated account must not be able to enrol or start a payment.
  const session = await requireActiveStudent(req);
  if (!session.ok) return res.status(session.status).json({ error: session.message });

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

      // Same rules as checkout (lib/checkout.js).
      let q = null;
      if (couponCode) {
        q = await quote({ studentId: student.id, courseIds: [courseId], couponCode, source });
        if (q.couponError) return res.status(400).json({ error: q.couponError });
        discount    = q.discount;
        finalPrice  = Math.max(0, course.price - discount);
        appliedCode = q.coupon.code;
      }

      // If finalPrice is 0 after coupon — enroll for free
      if (finalPrice === 0) {
        const orderId = `coupon_${new mongoose.Types.ObjectId()}`;
        const enrollment = await Enrollment.create({
          student: student.id, course: courseId,
          type: "paid", amountPaid: 0, orderId,
          couponCode: appliedCode, discount, source,
        });
        await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });
        // Records the coupon use against this student.
        if (q) {
          await saveCheckoutOrder({ orderId, studentId: student.id, q, source });
          await settleCheckoutOrder(orderId);
        }
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