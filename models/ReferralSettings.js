import mongoose from "mongoose";

/**
 * Refer-and-earn settings: a single document.
 *
 * A student shares their code. A friend who joins with it and makes a first
 * paid purchase of at least "minPurchase" earns the referrer "referrerReward"
 * in their wallet, and the friend "friendReward" (0 = nothing).
 */
const ReferralSettingsSchema = new mongoose.Schema(
  {
    _id:            { type: String, default: "main" },
    enabled:        { type: Boolean, default: true },
    referrerReward: { type: Number, default: 100 },
    friendReward:   { type: Number, default: 0 },
    minPurchase:    { type: Number, default: 1 },      // cash actually paid, wallet money not counted
    maxReferrals:   { type: Number, default: 0 },      // rewarded referrals per student; 0 = unlimited
    applyDays:      { type: Number, default: 7 },      // a code can be added this many days after joining
    maxWalletPercent: { type: Number, default: 100 },  // share of an order wallet money can pay
    shareMessage: {
      type: String,
      default:
        "I am studying with SS Coaching for NIOS. Join with my code {code} and get started: {link}",
    },
  },
  { timestamps: true }
);

export default mongoose.models.ReferralSettings || mongoose.model("ReferralSettings", ReferralSettingsSchema);
