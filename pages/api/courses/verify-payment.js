// pages/api/courses/verify-payment.js
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/CourseModel";
import Enrollment from "@/models/EnrollmentModel";
import Coupon from "@/models/CouponModel";
import crypto from "crypto";
import jwt from "jsonwebtoken";

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

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, couponCode, discount, amount } = req.body;

  // Verify signature
  const body      = razorpay_order_id + "|" + razorpay_payment_id;
  const expected  = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expected !== razorpay_signature)
    return res.status(400).json({ error: "Payment verification failed" });

  try {
    // Create enrollment
    await Enrollment.create({
      student:   student.id,
      course:    courseId,
      type:      "paid",
      orderId:   razorpay_order_id,
      paymentId: razorpay_payment_id,
      amountPaid: Number(amount) || 0,
      couponCode: couponCode || "",
      discount:   Number(discount) || 0,
    });

    await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });

    // Increment coupon usage
    if (couponCode) {
      await Coupon.findOneAndUpdate(
        { code: couponCode.toUpperCase() },
        { $inc: { usedCount: 1 } }
      );
    }

    return res.status(200).json({ success: true, message: "Payment verified & enrolled!" });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: "Already enrolled" });
    console.error(err);
    return res.status(500).json({ error: "Enrollment failed after payment" });
  }
}