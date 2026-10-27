// pages/api/courses/payment.js  — Razorpay order creation
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/CourseModel";
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

  const { courseIds } = req.body;
  try {
    if (!Array.isArray(courseIds) || courseIds.length === 0)
      return res.status(400).json({ error: "No courses to pay for" });

    const courses = await Course.find({ _id: { $in: courseIds } });
    if (courses.length === 0) return res.status(404).json({ error: "Course not found" });

    const finalPrice = courses.reduce((sum, c) => sum + Number(c.price || 0), 0);
    if (finalPrice <= 0) return res.status(400).json({ error: "Nothing to pay for" });

    // Both the website and the mobile app create orders here. The source is
    // stored in the order notes because the Razorpay webhook runs on Razorpay's
    // servers and never sees this request's headers — without it the webhook
    // has no way to tell an app purchase from a website one.
    const source = req.headers["x-source"] === "app" ? "app" : "web";

    const order = await razorpay.orders.create({
      amount:   finalPrice * 100,  // paise
      currency: "INR",
      receipt:  `sscoach_${Date.now()}`,
      notes:    { courseIds: courseIds.join(","), studentId: student.id, source },
    });

    return res.status(200).json({
      success: true,
      orderId:    order.id,
      amount:     finalPrice,
      courseNames: courses.map((c) => c.title),
      keyId:      process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create order" });
  }
}