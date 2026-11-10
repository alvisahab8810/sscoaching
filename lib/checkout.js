/**
 * Prices a cart with a coupon and wallet money, and settles it once paid.
 *
 * The website, the app and the payment step all price through quote(), so
 * the amount charged is always the amount the student was shown. Discounts
 * are split across the courses in proportion to their price, so each course's
 * enrollment and invoice carry their own share.
 */
import mongoose from "mongoose";
import Course from "@/models/CourseModel";
import Coupon from "@/models/CouponModel";
import CouponRedemption from "@/models/CouponRedemption";
import CheckoutOrder from "@/models/CheckoutOrder";
import Enrollment from "@/models/EnrollmentModel";
import StudentUser from "@/models/StudentUser";
import WalletTxn from "@/models/WalletTxn";
import { getReferralSettings, walletChange, rewardReferral } from "@/lib/referral";

const now = () => new Date();
const ids = (arr) => (arr || []).map(String);

// Splits "amount" over lines in proportion to "weight"; the last line takes the rounding.
function split(amount, lines, weight) {
  const total = lines.reduce((s, l) => s + weight(l), 0);
  if (!total || !amount) return lines.map(() => 0);
  let left = amount;
  return lines.map((l, i) => {
    if (i === lines.length - 1) return left;
    const share = Math.floor((amount * weight(l)) / total);
    left -= share;
    return share;
  });
}

function couponDiscount(coupon, eligibleSubtotal) {
  if (coupon.type === "percent") {
    let d = Math.round((eligibleSubtotal * Number(coupon.value)) / 100);
    if (coupon.maxDiscount > 0) d = Math.min(d, coupon.maxDiscount);
    return Math.min(d, eligibleSubtotal);
  }
  return Math.min(Number(coupon.value), eligibleSubtotal);
}

// How the coupon's terms read on checkout, e.g. "20% off up to ₹300 · min ₹999".
export function couponTerms(c, courseTitles = []) {
  const parts = [c.type === "percent" ? `${c.value}% off${c.maxDiscount > 0 ? ` up to ₹${c.maxDiscount}` : ""}` : `₹${c.value} off`];
  if (c.minAmount > 0) parts.push(`on orders of ₹${c.minAmount} or more`);
  if (courseTitles.length) parts.push(`on ${courseTitles.join(", ")}`);
  if (c.firstPurchaseOnly) parts.push("first purchase only");
  if (c.expiresAt) parts.push(`valid till ${new Date(c.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`);
  return parts.join(" · ");
}

/**
 * Checks a coupon against a cart. Returns { eligible: [lines], discount } or
 * { error } with a message the student can act on.
 */
export async function checkCoupon(coupon, { studentId, lines, source }) {
  if (!coupon || !coupon.isActive) return { error: "This coupon code is not valid" };
  const t = now();
  if (coupon.startsAt && t < coupon.startsAt) return { error: "This coupon is not active yet" };
  if (coupon.expiresAt && t > coupon.expiresAt) return { error: "This coupon has expired" };
  if (coupon.platform !== "all" && coupon.platform !== source) {
    return { error: `This coupon only works on the ${coupon.platform === "app" ? "mobile app" : "website"}` };
  }
  if (coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses) return { error: "This coupon has been fully used" };

  const allowed = ids(coupon.courses);
  const eligible = allowed.length ? lines.filter((l) => allowed.includes(String(l.course))) : lines;
  if (!eligible.length) return { error: "This coupon does not apply to the courses in your cart" };

  const eligibleSubtotal = eligible.reduce((s, l) => s + l.price, 0);
  if (coupon.minAmount > 0 && eligibleSubtotal < coupon.minAmount) {
    return { error: `Add courses worth ₹${coupon.minAmount - eligibleSubtotal} more to use this coupon` };
  }

  if (studentId) {
    if (coupon.perUserLimit > 0) {
      const used = await CouponRedemption.countDocuments({ coupon: coupon._id, student: studentId });
      if (used >= coupon.perUserLimit) return { error: "You have already used this coupon" };
    }
    if (coupon.firstPurchaseOnly && (await Enrollment.exists({ student: studentId, type: "paid" }))) {
      return { error: "This coupon is only for your first purchase" };
    }
  }

  return { eligible, discount: couponDiscount(coupon, eligibleSubtotal) };
}

/**
 * Prices a cart.
 *
 * quote({ studentId, courseIds, couponCode, useWallet, source }) ->
 *   { lines, subtotal, coupon, couponError, discount, walletBalance,
 *     walletUsable, walletUsed, total }
 */
export async function quote({ studentId, courseIds, couponCode = "", useWallet = false, source = "web" }) {
  const wanted = (courseIds || []).filter((id) => mongoose.isValidObjectId(id));
  const courses = await Course.find({ _id: { $in: wanted } }).select("title price isFree").lean();
  const lines = courses
    .filter((c) => !c.isFree && Number(c.price) > 0)
    .map((c) => ({ course: String(c._id), title: c.title, price: Math.round(Number(c.price)), discount: 0, wallet: 0, paid: 0 }));
  const subtotal = lines.reduce((s, l) => s + l.price, 0);

  let coupon = null;
  let couponError = "";
  let discount = 0;
  const code = String(couponCode || "").toUpperCase().trim();
  if (code && lines.length) {
    const doc = await Coupon.findOne({ code }).lean();
    const r = await checkCoupon(doc, { studentId, lines, source });
    if (r.error) couponError = r.error;
    else {
      discount = r.discount;
      coupon = { _id: String(doc._id), code: doc.code, title: doc.title, terms: couponTerms(doc) };
      const shares = split(discount, r.eligible, (l) => l.price);
      r.eligible.forEach((l, i) => (l.discount = shares[i]));
    }
  }

  const settings = await getReferralSettings();
  const student = studentId ? await StudentUser.findById(studentId).select("walletBalance").lean() : null;
  const walletBalance = Math.max(0, Math.round(student?.walletBalance || 0));
  const afterCoupon = subtotal - discount;
  const walletUsable = Math.min(walletBalance, Math.floor((afterCoupon * Math.min(100, Math.max(0, settings.maxWalletPercent ?? 100))) / 100));
  const walletUsed = useWallet ? walletUsable : 0;
  const walletShares = split(walletUsed, lines, (l) => l.price - l.discount);
  lines.forEach((l, i) => {
    l.wallet = walletShares[i];
    l.paid = l.price - l.discount - l.wallet;
  });

  return {
    lines,
    subtotal,
    coupon,
    couponError,
    discount,
    walletBalance,
    walletUsable,
    walletUsed,
    total: afterCoupon - walletUsed,
  };
}

/**
 * Public coupons that could apply to this cart, each with whether it can be
 * used now and, if not, why. Shown on checkout so the student can tap one.
 */
export async function availableCoupons({ studentId, courseIds, source }) {
  const t = now();
  const coupons = await Coupon.find({
    isActive: true,
    isPublic: true,
    platform: { $in: ["all", source] },
    $and: [
      { $or: [{ startsAt: null }, { startsAt: { $lte: t } }] },
      { $or: [{ expiresAt: null }, { expiresAt: { $gte: t } }] },
      { $or: [{ courses: { $size: 0 } }, { courses: { $in: (courseIds || []).filter((id) => mongoose.isValidObjectId(id)) } }] },
    ],
  })
    .sort({ value: -1 })
    .limit(20)
    .lean();
  if (!coupons.length) return [];

  const q = await quote({ studentId, courseIds, source });
  const titles = {};
  const allCourseIds = [...new Set(coupons.flatMap((c) => ids(c.courses)))];
  if (allCourseIds.length) {
    (await Course.find({ _id: { $in: allCourseIds } }).select("title").lean()).forEach((c) => (titles[String(c._id)] = c.title));
  }

  const out = [];
  for (const c of coupons) {
    if (c.maxUses > 0 && c.usedCount >= c.maxUses) continue;
    const r = await checkCoupon(c, { studentId, lines: q.lines.map((l) => ({ ...l, discount: 0 })), source });
    out.push({
      code: c.code,
      title: c.title || c.code,
      description: c.description || "",
      terms: couponTerms(c, ids(c.courses).map((id) => titles[id]).filter(Boolean)),
      saving: r.error ? 0 : r.discount,
      usable: !r.error,
      reason: r.error || "",
    });
  }
  return out.sort((a, b) => Number(b.usable) - Number(a.usable) || b.saving - a.saving);
}

/** Saves the priced cart for a payment so it can be settled later. */
export async function saveCheckoutOrder({ orderId, studentId, q, source }) {
  return CheckoutOrder.create({
    orderId,
    student: studentId,
    lines: q.lines.map((l) => ({ course: l.course, price: l.price, discount: l.discount, wallet: l.wallet, paid: l.paid })),
    subtotal: q.subtotal,
    coupon: q.coupon?._id || null,
    couponCode: q.coupon?.code || "",
    discount: q.discount,
    walletUsed: q.walletUsed,
    total: q.total,
    source,
  });
}

export const findCheckoutOrder = (orderId) => CheckoutOrder.findOne({ orderId }).lean();

/**
 * After the money (if any) is in: records the coupon use, takes the wallet
 * money and pays any referral reward. Runs once per order however many times
 * it is called.
 */
export async function settleCheckoutOrder(orderId) {
  const order = await CheckoutOrder.findOneAndUpdate(
    { orderId, status: "pending" },
    { $set: { status: "paid", paidAt: now() } },
    { new: true }
  ).lean();
  if (!order) return;

  if (order.coupon && order.discount > 0) {
    try {
      await CouponRedemption.create({
        coupon: order.coupon,
        code: order.couponCode,
        student: order.student,
        orderId,
        courses: order.lines.filter((l) => l.discount > 0).map((l) => l.course),
        discount: order.discount,
        source: order.source,
      });
      await Coupon.updateOne({ _id: order.coupon }, { $inc: { usedCount: 1 } });
    } catch (err) {
      if (err.code !== 11000) console.error("Coupon redemption failed:", err);
    }
  }

  if (order.walletUsed > 0) {
    const ok = await walletChange(order.student, "debit", order.walletUsed, {
      reason: "purchase",
      key: `purchase:${orderId}`,
      note: "Used for a course purchase",
      orderId,
    });
    // Fully wallet-paid orders are debited before enrolling, so the key is
    // already taken. Otherwise the student spent the money twice by paying
    // for two carts at once; the course is already theirs, so this is logged.
    if (!ok && !(await WalletTxn.exists({ key: `purchase:${orderId}` }))) {
      console.error("Wallet debit failed for order", orderId);
    }
  }

  await rewardReferral(order.student, order.total, orderId);
}
