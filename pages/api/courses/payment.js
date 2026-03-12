// pages/api/courses/payment.js  — Razorpay order creation
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/CourseModel";
import Coupon from "@/models/CouponModel";
import Razorpay from "razorpay";
import jwt from "jsonwebtoken";

function getStudent(req) {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch { return null; }
}

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  await dbConnect();

  const student = getStudent(req);
  if (!student) return res.status(401).json({ error: "Unauthorized" });

  const { courseId, couponCode } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    let finalPrice = course.price;
    let discount   = 0;
    let appliedCode = "";

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      if (coupon) {
        if (coupon.type === "percent") {
          discount = Math.round((course.price * coupon.value) / 100);
        } else {
          discount = Math.min(coupon.value, course.price);
        }
        finalPrice  = Math.max(0, course.price - discount);
        appliedCode = coupon.code;
      }
    }

    const order = await razorpay.orders.create({
      amount:   finalPrice * 100,  // paise
      currency: "INR",
      receipt:  `sscoach_${courseId}_${Date.now()}`,
      notes:    { courseId, studentId: student.id, couponCode: appliedCode, discount },
    });

    return res.status(200).json({
      success: true,
      orderId:    order.id,
      amount:     finalPrice,
      discount,
      couponCode: appliedCode,
      courseName: course.title,
      keyId:      process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create order" });
  }
}