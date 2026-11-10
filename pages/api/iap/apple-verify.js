// pages/api/iap/apple-verify.js
// iOS app: enrol a student after an Apple In-App Purchase (and on "Restore
// Purchases"). The Android app and the website keep using Razorpay through
// /api/courses/payment + /api/courses/verify-payment; this route is iOS only.
//
// Body: { signedTransactions: ["<StoreKit 2 JWS>", ...] }
// Each one is verified, must belong to this student (appAccountToken) and to a
// course product, and then creates the enrollment. Idempotent per
// (student, course), so retries and restores are safe.

import dbConnect from "@/lib/dbConnect";
import Course from "@/models/CourseModel";
import Enrollment from "@/models/EnrollmentModel";
import jwt from "jsonwebtoken";
import { rewardReferral } from "@/lib/referral";
import {
  BUNDLE_ID,
  accountTokenForStudent,
  courseIdFromProduct,
  verifySignedTransaction,
} from "@/lib/appleIap";

function getStudent(req) {
  try {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch { return null; }
}

async function enrolFromTransaction(jws, studentId) {
  let tx;
  try {
    tx = verifySignedTransaction(jws);
  } catch (e) {
    return { success: false, error: "Could not verify the purchase with Apple" };
  }

  const courseId = courseIdFromProduct(tx.productId);
  const base = { productId: tx.productId, transactionId: tx.transactionId, courseId };
  if (tx.bundleId !== BUNDLE_ID) return { ...base, success: false, error: "Purchase is for another app" };
  if (!courseId) return { ...base, success: false, error: "Not a course purchase" };
  if (tx.revocationDate) return { ...base, success: false, error: "This purchase was refunded" };
  if (String(tx.appAccountToken || "").toLowerCase() !== accountTokenForStudent(studentId))
    return { ...base, success: false, otherAccount: true, error: "This purchase belongs to another SS Coaching account" };

  const course = await Course.findById(courseId).select("_id isFree").lean();
  if (!course) return { ...base, success: false, error: "Course not found" };

  // Apple reports price in milli-units of the storefront currency
  const amountPaid = tx.currency === "INR" && tx.price ? Math.round(tx.price / 1000) : 0;
  try {
    await Enrollment.create({
      student:   studentId,
      course:    courseId,
      type:      "paid",
      orderId:   `apple:${tx.originalTransactionId || tx.transactionId}`,
      paymentId: String(tx.transactionId),
      amountPaid,
      source:    "app",
    });
    await Course.findByIdAndUpdate(courseId, { $inc: { enrolledCount: 1 } });
    // Sandbox (TestFlight) purchases are not real money, so they earn no referral reward.
    if (tx.environment !== "Sandbox") {
      await rewardReferral(studentId, tx.price ? Math.round(tx.price / 1000) : 0, `apple:${tx.transactionId}`);
    }
    return { ...base, success: true, environment: tx.environment };
  } catch (err) {
    if (err.code === 11000) return { ...base, success: true, alreadyEnrolled: true };
    console.error("[apple-iap] enrol", err?.message);
    return { ...base, success: false, error: "Enrollment failed" };
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const student = getStudent(req);
  if (!student?.id) return res.status(401).json({ error: "Unauthorized" });

  const list = req.body?.signedTransactions;
  if (!Array.isArray(list) || list.length === 0 || list.length > 200)
    return res.status(400).json({ error: "No purchases to verify" });

  await dbConnect();
  const results = [];
  for (const jws of list) results.push(await enrolFromTransaction(jws, student.id));

  return res.status(200).json({ success: results.some((r) => r.success), results });
}
