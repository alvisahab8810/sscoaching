// pages/api/courses/cod-enroll.js
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/CourseModel";
import Enrollment from "@/models/EnrollmentModel";
import Invoice from "@/models/Invoice";
import jwt from "jsonwebtoken";

function getStudent(req) {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch { return null; }
}

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  await dbConnect();

  const student = getStudent(req);
  if (!student) return res.status(401).json({ error: "Unauthorized" });

  const {
    courseId,
    fullName,
    phone,
    email,
    address,
    city,
    state,
    pincode,
    notes,
  } = req.body;

  if (!courseId)  return res.status(400).json({ error: "Course ID required" });
  if (!fullName)  return res.status(400).json({ error: "Full name required" });
  if (!phone)     return res.status(400).json({ error: "Phone number required" });
  if (!email)     return res.status(400).json({ error: "Email required" });

  try {
    // 1. Fetch course
    const course = await Course.findById(courseId).lean();
    if (!course) return res.status(404).json({ error: "Course not found" });

    // 2. Check already enrolled
    const existing = await Enrollment.findOne({ student: student.id, course: courseId });
    if (existing)  return res.status(400).json({ error: "Already enrolled in this course" });

    // 3. Create enrollment
    const enrollment = await Enrollment.create({
      student:    student.id,
      course:     courseId,
      type:       "cod",
      amountPaid: 0,
      couponCode: "",
      discount:   0,
      deliveryInfo: { fullName, phone, email, address, city, state, pincode, notes },
    });

    // 4. Increment enrolled count
    await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });

    // 5. Create invoice — status: "pending" (cash not yet collected)
    const invoice = await Invoice.create({
      student:    student.id,
      course:     courseId,
      enrollment: enrollment._id,

      studentName:  fullName,
      studentPhone: phone,
      studentEmail: email,

      courseTitle:   course.title   || "",
      courseSubject: course.subject || "",
      courseBatch:   course.batch   || "",

      orderId:       `COD-${Date.now()}`,
      paymentId:     "",
      paymentMethod: "Cash on Delivery",

      subtotal:   course.price || 0,
      discount:   0,
      couponCode: "",
      tax:        0,
      total:      course.price || 0,

      status: "pending",  // ← now valid in the enum
    });

    // 6. Send email (non-fatal)
    let emailSent = false;
    try {
      let result = { success: false };
      try {
        const { sendInvoiceEmail } = await import("@/lib/sendInvoiceEmail");
        result = await sendInvoiceEmail({ invoice, studentEmail: email });
      } catch {
        const { sendInvoiceEmailHtmlOnly } = await import("@/lib/sendInvoiceEmail");
        result = await sendInvoiceEmailHtmlOnly({ invoice, studentEmail: email });
      }
      if (result.success) {
        await Invoice.findByIdAndUpdate(invoice._id, {
          emailSent: true,
          emailSentAt: new Date(),
        });
        emailSent = true;
      }
    } catch (emailErr) {
      console.error("COD email failed (non-fatal):", emailErr.message);
    }

    return res.status(200).json({
      success: true,
      message: "Enrollment confirmed! Invoice sent to your email.",
      invoiceNumber: invoice.invoiceNumber,
      emailSent,
    });

  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ error: "Already enrolled in this course" });
    console.error("COD enroll error:", err);
    return res.status(500).json({ error: "Enrollment failed. Please try again." });
  }
}