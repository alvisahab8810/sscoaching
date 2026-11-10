import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Coupon from "@/models/CouponModel";
import CouponRedemption from "@/models/CouponRedemption";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { logActivity } from "@/lib/logActivity";
import { cleanCoupon } from "./index";

/**
 * One coupon. Super admin only.
 *
 * GET              the coupon and who used it
 * PUT { ...coupon } save it (or just { isActive } to switch it on or off)
 * DELETE           delete it; a coupon that has been used is switched off
 *                  instead so past invoices still make sense
 */
export default async function handler(req, res) {
  const admin = requireAdminApi(req);
  if (admin?.role !== "super") return res.status(403).json({ success: false, message: "Super admin only" });
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ success: false, message: "Invalid coupon" });
  await dbConnect();

  const coupon = await Coupon.findById(id);
  if (!coupon) return res.status(404).json({ success: false, message: "Coupon not found" });

  if (req.method === "GET") {
    const uses = await CouponRedemption.find({ coupon: id })
      .sort({ createdAt: -1 })
      .limit(200)
      .populate("student", "name phone email")
      .lean();
    return res.status(200).json({
      success: true,
      coupon,
      uses: uses.map((u) => ({
        _id: String(u._id),
        name: u.student?.name || "",
        phone: u.student?.phone || "",
        email: u.student?.email || "",
        discount: u.discount,
        orderId: u.orderId,
        source: u.source,
        createdAt: u.createdAt,
      })),
    });
  }

  if (req.method === "PUT") {
    const keys = Object.keys(req.body || {});
    if (keys.length === 1 && keys[0] === "isActive") {
      coupon.isActive = !!req.body.isActive;
      await coupon.save();
      logActivity(req, { feature: "coupons", action: "update", entityId: coupon._id, entityType: "Coupon", description: `${coupon.isActive ? "Switched on" : "Switched off"} coupon ${coupon.code}` });
      return res.status(200).json({ success: true, coupon });
    }

    const r = cleanCoupon(req.body);
    if (r.error) return res.status(400).json({ success: false, message: r.error });
    if (r.data.code !== coupon.code && (await Coupon.exists({ code: r.data.code }))) {
      return res.status(400).json({ success: false, message: "A coupon with this code already exists" });
    }
    const before = coupon.toObject();
    Object.assign(coupon, r.data);
    await coupon.save();
    logActivity(req, { feature: "coupons", action: "update", entityId: coupon._id, entityType: "Coupon", description: `Edited coupon ${coupon.code}`, before, after: coupon.toObject() });
    return res.status(200).json({ success: true, coupon });
  }

  if (req.method === "DELETE") {
    if (coupon.usedCount > 0 || (await CouponRedemption.exists({ coupon: id }))) {
      coupon.isActive = false;
      await coupon.save();
      logActivity(req, { feature: "coupons", action: "update", entityId: coupon._id, entityType: "Coupon", description: `Switched off used coupon ${coupon.code}` });
      return res.status(200).json({ success: true, deactivated: true, message: "This coupon has been used, so it was switched off instead of deleted" });
    }
    await coupon.deleteOne();
    logActivity(req, { feature: "coupons", action: "delete", entityId: id, entityType: "Coupon", description: `Deleted coupon ${coupon.code}` });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
