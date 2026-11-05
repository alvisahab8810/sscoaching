import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import SubAdmin from "@/models/SubAdmin";
import PopupForm from "@/models/PopupForm";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { sendSalesMail, loginUrlFor } from "@/lib/salesMail";
import { describeRotation } from "@/lib/salesAssign";
import {
  monthKey,
  monthRange,
  statusCountsBy,
  salesClosedBy,
  followUpsDueBy,
  rate,
} from "@/lib/salesReport";

/**
 * The sales team (super admin only).
 *
 *   GET  — every sales person with their lead numbers, plus the rotation
 *   POST — invite a sales person: creates the login and emails it to them
 */
export default async function handler(req, res) {
  const admin = requireAdminApi(req);
  if (admin?.role !== "super") return res.status(403).json({ success: false, message: "Forbidden" });

  await dbConnect();

  try {
    if (req.method === "GET") return await list(req, res);
    if (req.method === "POST") return await invite(req, res);
    return res.status(405).json({ success: false, message: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function list(req, res) {
  const { status, search } = req.query;
  const filter = { isSales: true };
  if (status) filter.status = status;
  if (search) {
    const rx = { $regex: String(search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
    filter.$or = [{ name: rx }, { email: rx }, { username: rx }, { phone: rx }];
  }

  const people = await SubAdmin.find(filter)
    .select("-password -passwordHash")
    .sort({ createdAt: 1 })
    .lean();

  const ids = people.map((p) => p._id);
  const thisMonth = monthRange(monthKey());

  const [allTime, monthAssigned, monthSales, due, rotation, unassignedNew, allSales] = await Promise.all([
    statusCountsBy(ids),
    statusCountsBy(ids, thisMonth),
    salesClosedBy(ids, thisMonth),
    followUpsDueBy(ids),
    describeRotation(),
    PopupForm.countDocuments({ assignedTo: null, status: { $in: ["New", "Open"] } }),
    SubAdmin.find({ isSales: true }).select("status").lean(),
  ]);

  const data = people.map((p) => {
    const id = String(p._id);
    const totals = allTime[id] || { total: 0, byStatus: {} };
    const sold = totals.byStatus.Converted || 0;
    return {
      ...p,
      stats: {
        assigned: totals.total,
        open: totals.total - sold - (totals.byStatus["Not Interested"] || 0) - (totals.byStatus["Not Qualified"] || 0),
        sales: sold,
        conversion: rate(sold, totals.total),
        monthAssigned: monthAssigned[id]?.total || 0,
        monthSales: monthSales[id] || 0,
        due: due[id] || 0,
      },
    };
  });

  const active = allSales.filter((p) => p.status === "active").length;

  return res.status(200).json({
    success: true,
    data,
    summary: {
      total: allSales.length,
      active,
      inactive: allSales.length - active,
      monthAssigned: data.reduce((n, p) => n + p.stats.monthAssigned, 0),
      monthSales: data.reduce((n, p) => n + p.stats.monthSales, 0),
      unassignedNew,
    },
    rotation,
  });
}

async function invite(req, res) {
  const { name, email, phone, username, password, permissions, status } = req.body || {};

  if (!name?.trim() || !email?.trim() || !username?.trim() || !password?.trim()) {
    return res.status(400).json({ success: false, message: "Name, email, username and password are required" });
  }
  if (password.trim().length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
  }

  const cleanEmail = email.toLowerCase().trim();
  const existing = await SubAdmin.findOne({ $or: [{ email: cleanEmail }, { username: username.trim() }] });
  if (existing) {
    const message = existing.email === cleanEmail ? "Email already in use" : "Username already taken";
    return res.status(409).json({ success: false, message });
  }

  const person = await SubAdmin.create({
    name: name.trim(),
    email: cleanEmail,
    phone: String(phone || "").trim(),
    username: username.trim(),
    password: password.trim(),
    passwordHash: await bcrypt.hash(password.trim(), 10),
    permissions: Array.isArray(permissions) ? permissions.map(String) : ["leads"],
    status: status === "inactive" ? "inactive" : "active",
    isSales: true,
  });

  const mail = await sendSalesMail("invite", person.email, {
    name: person.name,
    username: person.username,
    password: password.trim(),
    loginUrl: loginUrlFor(req),
  });

  const { password: _p, passwordHash: _h, ...safe } = person.toObject();
  return res.status(201).json({ success: true, data: safe, emailSent: mail.sent, emailError: mail.error });
}
