/**
 * Refer and earn, and the wallet it pays into.
 *
 * A student shares their code. A friend adds it at sign-up (or within a few
 * days of joining) and, on their first paid purchase, the referrer's wallet
 * is credited. Wallet money can only be spent on courses at checkout; it is
 * never paid out.
 */
import axios from "axios";
import StudentUser from "@/models/StudentUser";
import WalletTxn from "@/models/WalletTxn";
import ReferralSettings from "@/models/ReferralSettings";
import Enrollment from "@/models/EnrollmentModel";

export const SITE = "https://sscoaching.in";

export async function getReferralSettings() {
  const doc = await ReferralSettings.findById("main").lean();
  return doc || new ReferralSettings().toObject();
}

export const referralLink = (code) => `${SITE}/refer/${code}`;

export function shareText(settings, code) {
  return String(settings.shareMessage || "")
    .replaceAll("{code}", code)
    .replaceAll("{link}", referralLink(code));
}

// Four letters of the name and four random characters, e.g. RAHU7K2Q.
function makeCode(name) {
  const letters = String(name || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4).padEnd(4, "S");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let tail = "";
  for (let i = 0; i < 4; i++) tail += chars[Math.floor(Math.random() * chars.length)];
  return letters + tail;
}

/** The student's referral code, made on first use. */
export async function ensureReferralCode(student) {
  if (student.referralCode) return student.referralCode;
  for (let i = 0; i < 6; i++) {
    const code = makeCode(student.name);
    try {
      const r = await StudentUser.updateOne(
        { _id: student._id, referralCode: { $exists: false } },
        { $set: { referralCode: code } }
      );
      if (r.modifiedCount) return code;
      const fresh = await StudentUser.findById(student._id).select("referralCode").lean();
      if (fresh?.referralCode) return fresh.referralCode;
    } catch (err) {
      if (err.code !== 11000) throw err; // code taken, try another
    }
  }
  throw new Error("Could not make a referral code");
}

/**
 * Adds to or takes from a wallet and writes the history line. The unique key
 * makes a repeat call a no-op. A debit larger than the balance is refused.
 * Returns true when the change was made now.
 */
export async function walletChange(studentId, kind, amount, { reason, key, note = "", orderId = "", friend = null, byAdmin = "" }) {
  amount = Math.round(Number(amount) || 0);
  if (amount <= 0) return false;

  let txn;
  try {
    txn = await WalletTxn.create({ student: studentId, kind, reason, amount, key, note, orderId, friend, byAdmin });
  } catch (err) {
    if (err.code === 11000) return false; // already done
    throw err;
  }

  const filter = { _id: studentId };
  if (kind === "debit") filter.walletBalance = { $gte: amount };
  const updated = await StudentUser.findOneAndUpdate(
    filter,
    { $inc: { walletBalance: kind === "credit" ? amount : -amount } },
    { new: true, projection: { walletBalance: 1 } }
  ).lean();

  if (!updated) {
    await WalletTxn.deleteOne({ _id: txn._id });
    return false;
  }
  await WalletTxn.updateOne({ _id: txn._id }, { $set: { balanceAfter: updated.walletBalance } });
  return true;
}

// A paid enrollment means the student has already bought something.
const hasBought = (studentId) => Enrollment.exists({ student: studentId, type: "paid" });

/**
 * Links a student to the friend whose code they used.
 * Returns { ok } or { ok: false, message }.
 */
export async function applyReferralCode(studentId, rawCode) {
  const code = String(rawCode || "").toUpperCase().replace(/\s/g, "");
  if (!code) return { ok: false, message: "Enter a referral code" };

  const settings = await getReferralSettings();
  if (!settings.enabled) return { ok: false, message: "Referrals are not available right now" };

  const me = await StudentUser.findById(studentId).select("referredBy createdAt phone referralCode").lean();
  if (!me) return { ok: false, message: "Account not found" };
  if (me.referredBy) return { ok: false, message: "You have already used a referral code" };
  if (me.referralCode === code) return { ok: false, message: "You cannot use your own code" };

  const days = Number(settings.applyDays) || 0;
  if (days > 0 && Date.now() - new Date(me.createdAt).getTime() > days * 24 * 60 * 60 * 1000) {
    return { ok: false, message: `A referral code can only be added within ${days} days of joining` };
  }
  if (await hasBought(studentId)) return { ok: false, message: "A referral code can only be added before your first purchase" };

  const friend = await StudentUser.findOne({ referralCode: code, deletedAt: null }).select("_id phone isActive").lean();
  if (!friend || friend.isActive === false) return { ok: false, message: "This referral code is not valid" };
  if (String(friend._id) === String(studentId) || (friend.phone && friend.phone === me.phone)) {
    return { ok: false, message: "You cannot use your own code" };
  }

  const r = await StudentUser.updateOne(
    { _id: studentId, referredBy: null },
    { $set: { referredBy: friend._id, referredAt: new Date() } }
  );
  if (!r.modifiedCount) return { ok: false, message: "You have already used a referral code" };
  return { ok: true };
}

async function pushTo(studentId, title, body) {
  try {
    const s = await StudentUser.findById(studentId).select("expoPushToken").lean();
    if (!s?.expoPushToken) return;
    await axios.post(
      "https://exp.host/--/api/v2/push/send",
      [{ to: s.expoPushToken, title, body, data: { screen: "ReferEarn" }, sound: "default", priority: "high", channelId: "default" }],
      { headers: { "Content-Type": "application/json", Accept: "application/json" }, timeout: 8000 }
    );
  } catch (err) {
    console.error("Referral push failed:", err?.response?.data || err.message);
  }
}

/**
 * Called after any confirmed purchase. On the student's first qualifying
 * purchase, pays the referral reward to the friend who referred them (and
 * the welcome reward to the student, if set). Safe to call more than once.
 * Never throws: a reward problem must not fail an enrollment.
 */
export async function rewardReferral(studentId, cashPaid, orderId) {
  try {
    const settings = await getReferralSettings();
    if (!settings.enabled) return;
    if (Number(cashPaid) < Number(settings.minPurchase || 0)) return;

    // Claim the reward once; whoever flips the flag first pays it.
    const me = await StudentUser.findOneAndUpdate(
      { _id: studentId, referredBy: { $ne: null }, referralRewarded: { $ne: true } },
      { $set: { referralRewarded: true } },
      { new: true, projection: { referredBy: 1, name: 1 } }
    ).lean();
    if (!me) return;

    const max = Number(settings.maxReferrals) || 0;
    if (max > 0) {
      const earned = await WalletTxn.countDocuments({ student: me.referredBy, reason: "referral" });
      if (earned >= max) return;
    }

    const firstName = String(me.name || "Your friend").split(" ")[0];
    if (settings.referrerReward > 0) {
      const paid = await walletChange(me.referredBy, "credit", settings.referrerReward, {
        reason: "referral",
        key: `referral:${studentId}`,
        note: `${firstName} bought a course with your code`,
        orderId,
        friend: studentId,
      });
      if (paid) pushTo(me.referredBy, `You earned ₹${settings.referrerReward}`, `${firstName} joined with your code and bought a course. The money is in your wallet.`);
    }
    if (settings.friendReward > 0) {
      await walletChange(studentId, "credit", settings.friendReward, {
        reason: "welcome",
        key: `welcome:${studentId}`,
        note: "Reward for joining with a friend's code",
        orderId,
        friend: me.referredBy,
      });
    }
  } catch (err) {
    console.error("rewardReferral failed:", err);
  }
}
