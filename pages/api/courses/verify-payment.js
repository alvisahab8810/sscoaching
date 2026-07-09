// pages/api/courses/verify-payment.js
// UPDATED: Generates invoice + sends email after successful payment

import dbConnect from "@/lib/dbConnect";
import Course from "@/models/CourseModel";
import Enrollment from "@/models/EnrollmentModel";
import Coupon from "@/models/CouponModel";
import Invoice from "@/models/Invoice";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// ─── Invoice helpers ───────────────────────────────────────────────────────
// We import lazily so that if puppeteer is not installed yet (local dev),
// only the email-without-PDF fallback is used.
async function tryGenerateAndSendInvoice({ enrollment, course, student, invoiceData }) {
  try {
    // Create the invoice document
    const invoice = await Invoice.create({
      student:    student.id,
      course:     course._id,
      enrollment: enrollment._id,

      // Student snapshot
      studentName:  student.name  || "",
      studentPhone: student.phone || "",
      studentEmail: student.email || "",

      // Course snapshot
      courseTitle:   course.title   || "",
      courseSubject: course.subject || "",
      courseBatch:   course.batch   || "",

      // Payment
      orderId:    invoiceData.orderId,
      paymentId:  invoiceData.paymentId,
      paymentMethod: "Razorpay",

      // Amounts
      subtotal:   invoiceData.subtotal,
      discount:   invoiceData.discount,
      couponCode: invoiceData.couponCode,
      tax:        0,
      total:      invoiceData.total,

      status: "paid",
    });

    // Send email (try with PDF first, fallback to HTML-only)
    if (student.email) {
      try {
        const { sendInvoiceEmail } = await import("@/lib/sendInvoiceEmail");
        const result = await sendInvoiceEmail({ invoice, studentEmail: student.email });
        if (result.success) {
          await Invoice.findByIdAndUpdate(invoice._id, {
            emailSent: true,
            emailSentAt: new Date(),
            pdfGenerated: true,
          });
        } else {
          // PDF failed — try HTML-only email
          const { sendInvoiceEmailHtmlOnly } = await import("@/lib/sendInvoiceEmail");
          const r2 = await sendInvoiceEmailHtmlOnly({ invoice, studentEmail: student.email });
          if (r2.success) {
            await Invoice.findByIdAndUpdate(invoice._id, { emailSent: true, emailSentAt: new Date() });
          }
        }
      } catch (emailErr) {
        // Email failed — invoice is still saved, student can download from dashboard
        console.error("Invoice email failed (non-fatal):", emailErr.message);
      }
    }

    return invoice;
  } catch (invoiceErr) {
    // Invoice generation is non-fatal — enrollment already created, don't fail the request
    console.error("Invoice creation failed (non-fatal):", invoiceErr.message);
    return null;
  }
}
// ──────────────────────────────────────────────────────────────────────────

function getStudent(req) {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch { return null; }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  await dbConnect();

  const student = getStudent(req);
  if (!student) return res.status(401).json({ error: "Unauthorized" });

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courseId,
    couponCode,
    discount,
    amount,
  } = req.body;

  // ── 1. Verify Razorpay signature ──
  const body     = razorpay_order_id + "|" + razorpay_payment_id;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expected !== razorpay_signature)
    return res.status(400).json({ error: "Payment verification failed" });

  try {
    // ── 2. Fetch course for snapshot ──
    const course = await Course.findById(courseId).lean();
    if (!course) return res.status(404).json({ error: "Course not found" });

    const source = req.headers["x-source"] === "app" ? "app" : "web";

    // ── 3. Create enrollment ──
    const enrollment = await Enrollment.create({
      student:    student.id,
      course:     courseId,
      type:       "paid",
      orderId:    razorpay_order_id,
      paymentId:  razorpay_payment_id,
      amountPaid: Number(amount) || 0,
      couponCode: couponCode || "",
      discount:   Number(discount) || 0,
      source,
    });

    // ── 4. Increment enrolled count ──
    await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });

    // ── 5. Increment coupon usage ──
    if (couponCode) {
      await Coupon.findOneAndUpdate(
        { code: couponCode.toUpperCase() },
        { $inc: { usedCount: 1 } }
      );
    }

    // ── 6. Generate invoice + send email (non-blocking, non-fatal) ──
    const subtotal = Number(amount) + Number(discount || 0); // original price before discount
    await tryGenerateAndSendInvoice({
      enrollment,
      course,
      student,
      invoiceData: {
        orderId:    razorpay_order_id,
        paymentId:  razorpay_payment_id,
        subtotal:   subtotal,
        discount:   Number(discount) || 0,
        couponCode: couponCode || "",
        total:      Number(amount) || 0,
      },
    });

    return res.status(200).json({ success: true, message: "Payment verified & enrolled!" });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: "Already enrolled" });
    console.error(err);
    return res.status(500).json({ error: "Enrollment failed after payment" });
  }
}