// pages/api/courses/payment.js  — Razorpay order creation
import dbConnect from "@/lib/dbConnect";
import Course from "@/models/CourseModel";
import Razorpay from "razorpay";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import CheckoutOrder from "@/models/CheckoutOrder";
import { quote, saveCheckoutOrder } from "@/lib/checkout";
import { walletChange } from "@/lib/referral";
import { completeEnrollment } from "@/lib/completeEnrollment";

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

  const { courseIds, couponCode, useWallet } = req.body;
  try {
    if (!Array.isArray(courseIds) || courseIds.length === 0)
      return res.status(400).json({ error: "No courses to pay for" });

    // A coupon or wallet money is priced by lib/checkout. Without them (and
    // from older app versions) the order is made exactly as before.
    if (couponCode || useWallet) return await pricedOrder(req, res, student, courseIds, couponCode, !!useWallet);

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

async function pricedOrder(req, res, student, courseIds, couponCode, useWallet) {
  const source = req.headers["x-source"] === "app" ? "app" : "web";
  const q = await quote({ studentId: student.id, courseIds, couponCode, useWallet, source });
  if (!q.lines.length) return res.status(400).json({ error: "Nothing to pay for" });
  if (couponCode && q.couponError) return res.status(400).json({ error: q.couponError });
  const paidIds = q.lines.map((l) => l.course);

  // Nothing left to pay: the wallet covers it. Take the money first, then enroll.
  if (q.total <= 0) {
    const orderId = `wallet_${new mongoose.Types.ObjectId()}`;
    await saveCheckoutOrder({ orderId, studentId: student.id, q, source });
    if (q.walletUsed > 0) {
      const ok = await walletChange(student.id, "debit", q.walletUsed, {
        reason: "purchase", key: `purchase:${orderId}`, note: "Used for a course purchase", orderId,
      });
      if (!ok) {
        await CheckoutOrder.deleteOne({ orderId });
        return res.status(400).json({ error: "Your wallet balance has changed. Please try again." });
      }
    }
    const results = await completeEnrollment({ studentId: student.id, courseIds: paidIds, orderId, paymentId: "", source });
    return res.status(200).json({ success: true, completed: true, orderId, amount: 0, results });
  }

  const order = await razorpay.orders.create({
    amount:   q.total * 100,
    currency: "INR",
    receipt:  `sscoach_${Date.now()}`,
    notes:    { courseIds: paidIds.join(","), studentId: student.id, source, coupon: q.coupon?.code || "", wallet: String(q.walletUsed) },
  });
  await saveCheckoutOrder({ orderId: order.id, studentId: student.id, q, source });

  return res.status(200).json({
    success: true,
    orderId:    order.id,
    amount:     q.total,
    subtotal:   q.subtotal,
    discount:   q.discount,
    walletUsed: q.walletUsed,
    courseNames: q.lines.map((l) => l.title),
    keyId:      process.env.RAZORPAY_KEY_ID,
  });
}