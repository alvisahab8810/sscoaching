import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Coupon from "@/models/CouponModel";
import CouponRedemption from "@/models/CouponRedemption";
import Course from "@/models/CourseModel";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { logActivity } from "@/lib/logActivity";

/**
 * Coupons. Super admin only.
 *
 * GET                every coupon with how much it has saved, and the
 *                    course list for the "applies to" picker
 * POST { ...coupon } create one
 */
export default async function handler(req, res) {
  const admin = requireAdminApi(req);
  if (admin?.role !== "super") return res.status(403).json({ success: false, message: "Super admin only" });
  await dbConnect();

  if (req.method === "GET") {
    const [coupons, courses, totals] = await Promise.all([
      Coupon.find({}).sort({ createdAt: -1 }).lean(),
      Course.find({ isFree: { $ne: true } }).select("title price status").sort({ title: 1 }).lean(),
      CouponRedemption.aggregate([{ $group: { _id: "$coupon", saved: { $sum: "$discount" }, uses: { $sum: 1 } } }]),
    ]);
    const byId = Object.fromEntries(totals.map((t) => [String(t._id), t]));
    return res.status(200).json({
      success: true,
      coupons: coupons.map((c) => ({
        ...c,
        _id: String(c._id),
        courses: (c.courses || []).map(String),
        saved: byId[String(c._id)]?.saved || 0,
      })),
      courses: courses.map((c) => ({ _id: String(c._id), title: c.title, price: c.price, status: c.status })),
    });
  }

  if (req.method === "POST") {
    const r = cleanCoupon(req.body);
    if (r.error) return res.status(400).json({ success: false, message: r.error });
    if (await Coupon.exists({ code: r.data.code })) {
      return res.status(400).json({ success: false, message: "A coupon with this code already exists" });
    }
    const coupon = await Coupon.create(r.data);
    logActivity(req, { feature: "coupons", action: "create", entityId: coupon._id, entityType: "Coupon", description: `Created coupon ${coupon.code}` });
    return res.status(201).json({ success: true, coupon });
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}

const num = (v, d = 0) => (v === "" || v === null || v === undefined || isNaN(Number(v)) ? d : Math.max(0, Math.round(Number(v))));
const date = (v) => (v ? (isNaN(new Date(v)) ? undefined : new Date(v)) : null);

/** Checks and tidies a coupon from the admin form. Returns { data } or { error }. */
export function cleanCoupon(b = {}) {
  const code = String(b.code || "").toUpperCase().replace(/\s/g, "");
  if (!/^[A-Z0-9_-]{3,20}$/.test(code)) return { error: "Code must be 3 to 20 letters, numbers, - or _" };

  const type = b.type === "flat" ? "flat" : "percent";
  const value = num(b.value);
  if (value <= 0) return { error: "Enter the discount" };
  if (type === "percent" && value > 100) return { error: "A percentage discount cannot be more than 100" };

  const startsAt = date(b.startsAt);
  const expiresAt = date(b.expiresAt);
  if (startsAt === undefined || expiresAt === undefined) return { error: "Enter a valid date" };
  if (startsAt && expiresAt && expiresAt <= startsAt) return { error: "The end date must be after the start date" };

  const courses = (Array.isArray(b.courses) ? b.courses : []).filter((id) => mongoose.isValidObjectId(id));

  return {
    data: {
      code,
      title: String(b.title || "").trim().slice(0, 80),
      description: String(b.description || "").trim().slice(0, 300),
      type,
      value,
      maxDiscount: type === "percent" ? num(b.maxDiscount) : 0,
      minAmount: num(b.minAmount),
      courses,
      startsAt,
      expiresAt,
      maxUses: num(b.maxUses),
      perUserLimit: num(b.perUserLimit, 1),
      firstPurchaseOnly: !!b.firstPurchaseOnly,
      platform: ["web", "app"].includes(b.platform) ? b.platform : "all",
      isPublic: b.isPublic !== false,
      isActive: b.isActive !== false,
    },
  };
}
