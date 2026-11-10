import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import WalletTxn from "@/models/WalletTxn";
import Enrollment from "@/models/EnrollmentModel";
import { requireActiveStudent } from "@/lib/studentAuth";
import {
  getReferralSettings,
  ensureReferralCode,
  referralLink,
  shareText,
  applyReferralCode,
} from "@/lib/referral";

/**
 * The signed-in student's refer-and-earn page.
 *
 * GET           code, share link and message, friends who joined, wallet
 *               balance and history, and whether they can still add a code
 * POST { code } add a friend's referral code to this account
 */
export default async function handler(req, res) {
  await dbConnect();
  const session = await requireActiveStudent(req);
  if (!session.ok) return res.status(session.status).json({ success: false, message: session.message });

  if (req.method === "POST") {
    const r = await applyReferralCode(session.id, req.body?.code);
    if (!r.ok) return res.status(400).json({ success: false, message: r.message });
    return res.status(200).json({ success: true, message: "Referral code added" });
  }

  if (req.method !== "GET") return res.status(405).json({ success: false, message: "Method not allowed" });

  const settings = await getReferralSettings();
  const me = await StudentUser.findById(session.id)
    .select("name referralCode walletBalance referredBy createdAt")
    .lean();
  const code = await ensureReferralCode(me);

  const [friends, txns, bought, earnedAgg] = await Promise.all([
    StudentUser.find({ referredBy: me._id }).select("name referralRewarded referredAt").sort({ referredAt: -1 }).limit(100).lean(),
    WalletTxn.find({ student: me._id }).sort({ createdAt: -1 }).limit(50).lean(),
    Enrollment.exists({ student: me._id, type: "paid" }),
    WalletTxn.aggregate([{ $match: { student: me._id, reason: "referral" } }, { $group: { _id: null, sum: { $sum: "$amount" } } }]),
  ]);
  const earned = earnedAgg[0]?.sum || 0;

  const days = Number(settings.applyDays) || 0;
  const withinDays = !days || Date.now() - new Date(me.createdAt).getTime() <= days * 24 * 60 * 60 * 1000;
  let referredByName = "";
  if (me.referredBy) referredByName = (await StudentUser.findById(me.referredBy).select("name").lean())?.name || "";

  return res.status(200).json({
    success: true,
    enabled: settings.enabled,
    code,
    link: referralLink(code),
    shareText: shareText(settings, code),
    referrerReward: settings.referrerReward,
    friendReward: settings.friendReward,
    minPurchase: settings.minPurchase,
    walletBalance: Math.round(me.walletBalance || 0),
    stats: {
      joined: friends.length,
      purchased: friends.filter((f) => f.referralRewarded).length,
      earned,
    },
    // First names only: a friend's full details are not the referrer's to see.
    friends: friends.map((f) => ({
      name: String(f.name || "Friend").split(" ")[0],
      joinedAt: f.referredAt,
      purchased: !!f.referralRewarded,
    })),
    txns: txns.map((t) => ({
      _id: String(t._id),
      kind: t.kind,
      reason: t.reason,
      amount: t.amount,
      balanceAfter: t.balanceAfter,
      note: t.note,
      createdAt: t.createdAt,
    })),
    referredBy: referredByName ? String(referredByName).split(" ")[0] : "",
    canApply: settings.enabled && !me.referredBy && withinDays && !bought,
  });
}
