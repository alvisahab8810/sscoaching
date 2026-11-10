import dbConnect from "@/lib/dbConnect";
import ReferralSettings from "@/models/ReferralSettings";
import StudentUser from "@/models/StudentUser";
import WalletTxn from "@/models/WalletTxn";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { logActivity } from "@/lib/logActivity";
import { getReferralSettings } from "@/lib/referral";

/**
 * Refer and earn, for the super admin.
 *
 * GET ?page=&q=     settings, totals and the list of referred students
 * PUT { settings }  save the settings
 */
export default async function handler(req, res) {
  const admin = requireAdminApi(req);
  if (admin?.role !== "super") return res.status(403).json({ success: false, message: "Super admin only" });
  await dbConnect();

  if (req.method === "GET") {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 25;
    const filter = { referredBy: { $ne: null } };
    const q = String(req.query.q || "").trim();
    if (q) {
      const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      const referrers = await StudentUser.find({ $or: [{ name: rx }, { phone: rx }, { referralCode: rx }] }).select("_id").limit(200).lean();
      filter.$or = [{ name: rx }, { phone: rx }, { referredBy: { $in: referrers.map((r) => r._id) } }];
    }

    const [settings, total, rows, joined, purchased, paidAgg, balanceAgg] = await Promise.all([
      getReferralSettings(),
      StudentUser.countDocuments(filter),
      StudentUser.find(filter)
        .select("name phone referredBy referredAt referralRewarded")
        .populate("referredBy", "name phone referralCode")
        .sort({ referredAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      StudentUser.countDocuments({ referredBy: { $ne: null } }),
      StudentUser.countDocuments({ referredBy: { $ne: null }, referralRewarded: true }),
      WalletTxn.aggregate([{ $match: { reason: { $in: ["referral", "welcome"] } } }, { $group: { _id: null, sum: { $sum: "$amount" } } }]),
      StudentUser.aggregate([{ $match: { walletBalance: { $gt: 0 } } }, { $group: { _id: null, sum: { $sum: "$walletBalance" }, n: { $sum: 1 } } }]),
    ]);

    return res.status(200).json({
      success: true,
      settings,
      stats: {
        joined,
        purchased,
        paidOut: paidAgg[0]?.sum || 0,
        walletTotal: balanceAgg[0]?.sum || 0,
        walletStudents: balanceAgg[0]?.n || 0,
      },
      total,
      page,
      pages: Math.max(1, Math.ceil(total / limit)),
      rows: rows.map((r) => ({
        _id: String(r._id),
        name: r.name,
        phone: r.phone,
        referredAt: r.referredAt,
        purchased: !!r.referralRewarded,
        referrer: r.referredBy
          ? { _id: String(r.referredBy._id), name: r.referredBy.name, phone: r.referredBy.phone, code: r.referredBy.referralCode }
          : null,
      })),
    });
  }

  if (req.method === "PUT") {
    const s = req.body?.settings || {};
    const n = (v, min, max) => Math.min(max, Math.max(min, Math.round(Number(v) || 0)));
    const message = String(s.shareMessage || "").trim();
    if (!message.includes("{code}") && !message.includes("{link}")) {
      return res.status(400).json({ success: false, message: "The share message must include {code} or {link}" });
    }
    const set = {
      enabled: !!s.enabled,
      referrerReward: n(s.referrerReward, 0, 10000),
      friendReward: n(s.friendReward, 0, 10000),
      minPurchase: n(s.minPurchase, 0, 1000000),
      maxReferrals: n(s.maxReferrals, 0, 100000),
      applyDays: n(s.applyDays, 0, 365),
      maxWalletPercent: n(s.maxWalletPercent, 0, 100),
      shareMessage: message.slice(0, 500),
    };
    const before = await getReferralSettings();
    const settings = await ReferralSettings.findByIdAndUpdate("main", { $set: set }, { new: true, upsert: true, setDefaultsOnInsert: true }).lean();
    logActivity(req, { feature: "referrals", action: "update", entityId: "main", entityType: "ReferralSettings", description: "Updated refer and earn settings", before, after: settings });
    return res.status(200).json({ success: true, settings });
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
