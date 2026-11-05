import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import SubAdmin from "@/models/SubAdmin";
import PopupForm from "@/models/PopupForm";
import SubAdminActivityLog from "@/models/SubAdminActivityLog";
import SubAdminLiveSession from "@/models/SubAdminLiveSession";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { sendSalesMail, loginUrlFor } from "@/lib/salesMail";
import {
  monthKey,
  monthRange,
  monthsEnding,
  statusCountsBy,
  salesClosedBy,
  followUpsWrittenBy,
  followUpsDueBy,
  monthlyTrend,
  emptyStatusCounts,
  rate,
} from "@/lib/salesReport";

/**
 * One sales person (super admin only).
 *
 *   GET    — profile, numbers, monthly trend and every lead they hold
 *   PATCH  — action "update" | "status" | "password"
 *   DELETE — remove the account; their leads are moved to ?moveTo=<id> or
 *            left unassigned
 */
export default async function handler(req, res) {
  const admin = requireAdminApi(req);
  if (admin?.role !== "super") return res.status(403).json({ success: false, message: "Forbidden" });

  await dbConnect();

  try {
    const person = await SubAdmin.findOne({ _id: req.query.id, isSales: true });
    if (!person) return res.status(404).json({ success: false, message: "Sales person not found" });

    if (req.method === "GET") return await detail(req, res, person);
    if (req.method === "PATCH") return await update(req, res, person);
    if (req.method === "DELETE") return await remove(req, res, person);
    return res.status(405).json({ success: false, message: "Method not allowed" });
  } catch (error) {
    if (error?.code === 11000)
      return res.status(409).json({ success: false, message: "Email or username already in use" });
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function detail(req, res, person) {
  const ids = [person._id];
  const id = String(person._id);
  const key = monthKey();
  const thisMonth = monthRange(key);

  const [allTime, monthAssigned, monthSales, monthFollowUps, due, trend, leads] = await Promise.all([
    statusCountsBy(ids),
    statusCountsBy(ids, thisMonth),
    salesClosedBy(ids, thisMonth),
    followUpsWrittenBy(ids, thisMonth),
    followUpsDueBy(ids),
    monthlyTrend(ids, monthsEnding(key, 6)),
    PopupForm.find({ assignedTo: person._id })
      .select("leadId fullName phone city lookingFor source status score scored followUps.slot connects assignedAt nextFollowUpAt convertedAt createdAt")
      .sort({ assignedAt: -1, createdAt: -1 })
      .limit(1000)
      .lean(),
  ]);

  const totals = allTime[id] || { total: 0, byStatus: emptyStatusCounts() };
  const sales = totals.byStatus.Converted || 0;

  return res.status(200).json({
    success: true,
    data: person.toObject(),
    stats: {
      assigned: totals.total,
      byStatus: totals.byStatus,
      sales,
      conversion: rate(sales, totals.total),
      monthAssigned: monthAssigned[id]?.total || 0,
      monthSales: monthSales[id] || 0,
      monthFollowUps: monthFollowUps[id] || 0,
      due: due[id] || 0,
    },
    trend,
    leads,
  });
}

async function update(req, res, person) {
  const body = req.body || {};

  if (body.action === "status") {
    const next = body.status === "active" ? "active" : "inactive";
    if (next === person.status) return res.status(200).json({ success: true, data: person.toObject(), emailSent: false });

    person.status = next;
    await person.save();

    // Leaving the live monitor straight away; the dashboard itself signs
    // them out on its next heartbeat.
    if (next === "inactive") await SubAdminLiveSession.deleteOne({ subAdminId: person._id });

    const mail = await sendSalesMail(next === "inactive" ? "deactivated" : "reactivated", person.email, {
      name: person.name,
      loginUrl: loginUrlFor(req),
    });
    return res.status(200).json({ success: true, data: person.toObject(), emailSent: mail.sent, emailError: mail.error });
  }

  if (body.action === "password") {
    const password = String(body.password || "").trim();
    if (password.length < 6)
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });

    person.password = password;
    person.passwordHash = await bcrypt.hash(password, 10);
    await person.save();

    const mail = await sendSalesMail("passwordReset", person.email, {
      name: person.name,
      password,
      loginUrl: loginUrlFor(req),
    });
    return res.status(200).json({ success: true, data: person.toObject(), emailSent: mail.sent, emailError: mail.error });
  }

  if (body.action === "update") {
    if (body.name !== undefined) {
      if (!String(body.name).trim()) return res.status(400).json({ success: false, message: "Name is required" });
      person.name = String(body.name).trim();
    }
    if (body.email !== undefined) {
      const email = String(body.email).toLowerCase().trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return res.status(400).json({ success: false, message: "Invalid email" });
      person.email = email;
    }
    if (body.username !== undefined) {
      const username = String(body.username).trim();
      if (!username || /\s/.test(username))
        return res.status(400).json({ success: false, message: "Username cannot be empty or contain spaces" });
      person.username = username;
    }
    if (body.phone !== undefined) person.phone = String(body.phone).trim();
    if (Array.isArray(body.permissions)) person.permissions = body.permissions.map(String);

    const renamed = person.isModified("name");
    await person.save();

    // The name is stored on each lead so lists render without a lookup.
    if (renamed) await PopupForm.updateMany({ assignedTo: person._id }, { $set: { assignedToName: person.name } });

    return res.status(200).json({ success: true, data: person.toObject() });
  }

  return res.status(400).json({ success: false, message: "Unknown action" });
}

async function remove(req, res, person) {
  let target = null;
  if (req.query.moveTo) {
    target = await SubAdmin.findOne({ _id: req.query.moveTo, isSales: true }).select("name");
    if (!target || String(target._id) === String(person._id))
      return res.status(400).json({ success: false, message: "Choose another sales person to move the leads to" });
  }

  const moved = await PopupForm.updateMany(
    { assignedTo: person._id },
    target
      ? { $set: { assignedTo: target._id, assignedToName: target.name } }
      : { $set: { assignedTo: null, assignedToName: "", assignedAt: null } }
  );

  await Promise.all([
    SubAdminActivityLog.deleteMany({ subAdminId: person._id }),
    SubAdminLiveSession.deleteOne({ subAdminId: person._id }),
  ]);
  await person.deleteOne();

  return res.status(200).json({
    success: true,
    leadsMoved: moved.modifiedCount || 0,
    movedTo: target ? target.name : null,
  });
}
