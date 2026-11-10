import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import StudentUser from "@/models/StudentUser";
import WalletTxn from "@/models/WalletTxn";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { logActivity } from "@/lib/logActivity";
import { walletChange } from "@/lib/referral";

/**
 * Student wallets, for the super admin.
 *
 * GET ?q=                       students with money in their wallet, or a search
 * GET ?student=<id>             one student's wallet history
 * POST { student, kind, amount, note }  add or take money by hand
 */
export default async function handler(req, res) {
  const admin = requireAdminApi(req);
  if (admin?.role !== "super") return res.status(403).json({ success: false, message: "Super admin only" });
  await dbConnect();

  if (req.method === "GET") {
    if (req.query.student) {
      if (!mongoose.isValidObjectId(req.query.student)) return res.status(400).json({ success: false, message: "Invalid student" });
      const [student, txns] = await Promise.all([
        StudentUser.findById(req.query.student).select("name phone email walletBalance referralCode").lean(),
        WalletTxn.find({ student: req.query.student }).sort({ createdAt: -1 }).limit(200).lean(),
      ]);
      if (!student) return res.status(404).json({ success: false, message: "Student not found" });
      return res.status(200).json({ success: true, student, txns });
    }

    const q = String(req.query.q || "").trim();
    const filter = { deletedAt: null };
    if (q) {
      const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [{ name: rx }, { phone: rx }, { email: rx }, { referralCode: rx }];
    } else {
      filter.walletBalance = { $gt: 0 };
    }
    const students = await StudentUser.find(filter)
      .select("name phone email walletBalance referralCode")
      .sort({ walletBalance: -1, createdAt: -1 })
      .limit(50)
      .lean();
    return res.status(200).json({ success: true, students });
  }

  if (req.method === "POST") {
    const { student, kind, note } = req.body || {};
    const amount = Math.round(Number(req.body?.amount) || 0);
    if (!mongoose.isValidObjectId(student)) return res.status(400).json({ success: false, message: "Choose a student" });
    if (!["credit", "debit"].includes(kind)) return res.status(400).json({ success: false, message: "Choose add or deduct" });
    if (amount <= 0 || amount > 100000) return res.status(400).json({ success: false, message: "Enter an amount between 1 and 100000" });
    const reason = String(note || "").trim().slice(0, 200);
    if (!reason) return res.status(400).json({ success: false, message: "Enter a reason" });

    const ok = await walletChange(student, kind, amount, {
      reason: "admin",
      key: `admin:${new mongoose.Types.ObjectId()}`,
      note: reason,
      byAdmin: admin.email || "super admin",
    });
    if (!ok) {
      return res.status(400).json({ success: false, message: kind === "debit" ? "The wallet does not have that much money" : "Could not update the wallet" });
    }
    const s = await StudentUser.findById(student).select("name walletBalance").lean();
    logActivity(req, {
      feature: "referrals",
      action: "update",
      entityId: student,
      entityType: "StudentUser",
      description: `${kind === "credit" ? "Added" : "Deducted"} ₹${amount} ${kind === "credit" ? "to" : "from"} ${s?.name || "student"}'s wallet: ${reason}`,
    });
    return res.status(200).json({ success: true, walletBalance: s?.walletBalance || 0 });
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
