// lib/completeEnrollment.js
//
// Shared "payment verified → create enrollment (+ invoice + email)" logic.
// Used by BOTH:
//   1. pages/api/courses/verify-payment.js — fired by the client (web/app)
//      immediately after Razorpay checkout closes. Gives the student an
//      instant "you're enrolled" response.
//   2. pages/api/webhooks/razorpay.js — fired by Razorpay's servers on
//      `payment.captured`, independent of the client. This is the safety
//      net: if the client's verify-payment call never arrives (app killed,
//      network drop, user backgrounds the app right after paying, etc.)
//      the webhook still runs and the student gets enrolled — money paid
//      always results in access granted, even if the app never checks back in.
//
// Enrollment has a unique (student, course) index, so calling this twice
// for the same student+course (webhook AND client both firing) is safe —
// the second call's duplicate-key error is treated as success, not failure.

import Course from "@/models/CourseModel";
import Enrollment from "@/models/EnrollmentModel";
import Invoice from "@/models/Invoice";
import StudentUser from "@/models/StudentUser";

async function tryGenerateAndSendInvoice({ enrollment, course, student, invoiceData }) {
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

      orderId:    invoiceData.orderId,
      paymentId:  invoiceData.paymentId,
      paymentMethod: "Razorpay",

      subtotal:   invoiceData.subtotal,
      discount:   invoiceData.discount,
      couponCode: invoiceData.couponCode,
      tax:        0,
      total:      invoiceData.total,

      status: "paid",
    });

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
          const { sendInvoiceEmailHtmlOnly } = await import("@/lib/sendInvoiceEmail");
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
  } catch (invoiceErr) {
    console.error("Invoice creation failed (non-fatal):", invoiceErr.message);
    return null;
  }
}

/**
 * completeEnrollment({ studentId, courseIds, orderId, paymentId, source })
 *
 * Creates an Enrollment (+ invoice + email) for each courseId. Idempotent
 * per (student, course) — safe to call more than once for the same order
 * (e.g. once from the webhook, once from the client) without double-charging
 * or double-counting enrolledCount.
 *
 * Returns an array of { courseId, success, invoiceNumber?, emailSent?, alreadyEnrolled?, error? }
 */
export async function completeEnrollment({ studentId, courseIds, orderId, paymentId, source }) {
  const dbStudent = await StudentUser.findById(studentId).lean();
  const student = {
    id:    studentId,
    name:  dbStudent?.name  || "",
    phone: dbStudent?.phone || "",
    email: dbStudent?.email || "",
  };

  const results = [];

  for (const courseId of courseIds) {
    try {
      const course = await Course.findById(courseId).lean();
      if (!course) { results.push({ courseId, success: false, error: "Course not found" }); continue; }

      const coursePrice = Number(course.price || 0);

      const enrollment = await Enrollment.create({
        student:    student.id,
        course:     courseId,
        type:       "paid",
        orderId,
        paymentId,
        amountPaid: coursePrice,
        source,
      });

      await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });

      const invoice = await tryGenerateAndSendInvoice({
        enrollment,
        course,
        student,
        invoiceData: {
          orderId, paymentId,
          subtotal:   coursePrice,
          discount:   0,
          couponCode: "",
          total:      coursePrice,
        },
      });

      results.push({ courseId, success: true, invoiceNumber: invoice?.invoiceNumber, emailSent: !!invoice?.emailSent });
    } catch (err) {
      if (err.code === 11000) {
        // Already enrolled — the other path (webhook or client) got here first.
        // From the caller's point of view this IS success: the student has access.
        results.push({ courseId, success: true, alreadyEnrolled: true });
      } else {
        console.error("completeEnrollment error:", err);
        results.push({ courseId, success: false, error: "Enrollment failed" });
      }
    }
  }

  return results;
}
