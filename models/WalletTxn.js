import mongoose from "mongoose";

/**
 * One line of a student's wallet. The balance itself is kept on the student
 * (StudentUser.walletBalance) and changed in the same step as the line is
 * written; these lines are the history.
 *
 * Wallet money can only be spent on courses. There is no withdrawal.
 *
 *   referral   — credit: a friend they referred bought a course
 *   welcome    — credit: they joined with a friend's code and bought a course
 *   purchase   — debit:  used at checkout
 *   admin      — credit or debit made by the super admin
 *
 * "key" is unique, so the same event can never be applied twice.
 */
const WalletTxnSchema = new mongoose.Schema(
  {
    student:      { type: mongoose.Schema.Types.ObjectId, ref: "StudentUser", required: true },
    kind:         { type: String, enum: ["credit", "debit"], required: true },
    reason:       { type: String, enum: ["referral", "welcome", "purchase", "admin"], required: true },
    amount:       { type: Number, required: true, min: 0 },
    balanceAfter: { type: Number, default: 0 },
    note:         { type: String, default: "" },
    key:          { type: String, required: true, unique: true },
    orderId:      { type: String, default: "" },
    friend:       { type: mongoose.Schema.Types.ObjectId, ref: "StudentUser", default: null },
    byAdmin:      { type: String, default: "" },
  },
  { timestamps: true }
);

WalletTxnSchema.index({ student: 1, createdAt: -1 });

export default mongoose.models.WalletTxn || mongoose.model("WalletTxn", WalletTxnSchema);
