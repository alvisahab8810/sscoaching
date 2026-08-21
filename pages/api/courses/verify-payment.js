// pages/api/courses/verify-payment.js
// Client-triggered enrollment after Razorpay checkout closes successfully.
// NOTE: this is not the only path that can create the enrollment — see
// pages/api/webhooks/razorpay.js, which does the same thing server-side as
// a safety net in case this call never reaches us (app killed / network
// drop right after payment). Both paths share lib/completeEnrollment.js and
// are idempotent, so whichever fires first "wins" and the other is a no-op.

import dbConnect from "@/lib/dbConnect";
import { completeEnrollment } from "@/lib/completeEnrollment";
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

  const tokenStudent = getStudent(req);
  if (!tokenStudent) return res.status(401).json({ error: "Unauthorized" });

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courseIds,
  } = req.body;

  // ── 1. Verify Razorpay signature ──
  const body     = razorpay_order_id + "|" + razorpay_payment_id;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expected !== razorpay_signature)
    return res.status(400).json({ error: "Payment verification failed" });

  if (!Array.isArray(courseIds) || courseIds.length === 0)
    return res.status(400).json({ error: "No courses to enroll" });

  const source = req.headers["x-source"] === "app" ? "app" : "web";

  const results = await completeEnrollment({
    studentId: tokenStudent.id,
    courseIds,
    orderId:   razorpay_order_id,
    paymentId: razorpay_payment_id,
    source,
  });

  const anyOk = results.some((r) => r.success);
  if (!anyOk) return res.status(400).json({ error: results[0]?.error || "Enrollment failed after payment" });

  return res.status(200).json({ success: true, message: "Payment verified & enrolled!", results });
}
