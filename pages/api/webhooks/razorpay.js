// pages/api/webhooks/razorpay.js
//
// Server-side safety net for the "paid but never enrolled" bug: previously
// the ONLY thing that created an Enrollment was the client calling
// /api/courses/verify-payment right after Razorpay checkout closed. If that
// call never arrived — app killed, connection dropped, user backgrounded
// the app the instant payment succeeded — Razorpay had captured the money
// but nobody ever told our DB to enroll the student. No retry, no way to
// recover except a support ticket.
//
// Razorpay calls THIS endpoint directly from their servers whenever a
// payment is captured, independent of our client. So even if the app-side
// call is lost entirely, this webhook still fires and finishes the
// enrollment. Both this and verify-payment.js share completeEnrollment(),
// which is idempotent per (student, course) — whichever path runs first
// wins, the other is a harmless no-op.
//
// ── Setup required (one-time, in Razorpay Dashboard → Settings → Webhooks) ──
//   URL:    https://sscoaching.in/api/webhooks/razorpay
//   Events: payment.captured, order.paid
//   Secret: set the same value as RAZORPAY_WEBHOOK_SECRET in .env.local / prod env
//
// Without RAZORPAY_WEBHOOK_SECRET configured (both here and in the Razorpay
// dashboard), this endpoint will reject every request — that's intentional,
// an unverified webhook must never be trusted to create enrollments.

import dbConnect from "@/lib/dbConnect";
import { completeEnrollment } from "@/lib/completeEnrollment";
import Razorpay from "razorpay";
import crypto from "crypto";

export const config = { api: { bodyParser: false } };

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function isValidSignature(rawBody, signature, secret) {
  if (!signature || !secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("razorpay webhook: RAZORPAY_WEBHOOK_SECRET not configured — rejecting");
    return res.status(500).json({ error: "Webhook not configured" });
  }

  const rawBody = await readRawBody(req);
  const signature = req.headers["x-razorpay-signature"];

  if (!isValidSignature(rawBody, signature, secret)) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  // We only care about a payment actually landing. `order.paid` carries both
  // the order (with our notes: courseIds/studentId) and the payment in one
  // payload; `payment.captured` sometimes doesn't carry order notes, so we
  // fall back to fetching the order by id in that case.
  if (event.event !== "payment.captured" && event.event !== "order.paid") {
    return res.status(200).json({ received: true, skipped: event.event });
  }

  try {
    const payment = event.payload?.payment?.entity;
    let orderEntity = event.payload?.order?.entity;
    if (!payment?.order_id) return res.status(200).json({ received: true, skipped: "no order_id" });

    if (!orderEntity?.notes?.courseIds) {
      // payment.captured without embedded order notes — fetch the order directly
      orderEntity = await razorpay.orders.fetch(payment.order_id);
    }

    const notes = orderEntity?.notes || {};
    const courseIds = String(notes.courseIds || "").split(",").filter(Boolean);
    const studentId = notes.studentId;

    if (!studentId || courseIds.length === 0) {
      console.error("razorpay webhook: order missing studentId/courseIds notes", payment.order_id);
      return res.status(200).json({ received: true, skipped: "missing notes" });
    }

    await dbConnect();
    const results = await completeEnrollment({
      studentId,
      courseIds,
      orderId:   payment.order_id,
      paymentId: payment.id,
      source:    "web", // unknown from webhook alone — verify-payment.js's client call sets the real source when it lands
    });

    return res.status(200).json({ received: true, results });
  } catch (err) {
    console.error("razorpay webhook error:", err);
    // 500 so Razorpay retries — this path must not silently swallow a real failure
    return res.status(500).json({ error: "Webhook processing failed" });
  }
}
