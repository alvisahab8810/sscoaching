import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import SupportBotNode from "@/models/SupportBotNode";
import SupportSettings from "@/models/SupportSettings";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { getSettings, cleanNode } from "@/lib/support";

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

/**
 * The support bot's questions and the support settings. Super admin only.
 *
 * GET                       every entry (flat) and the settings
 * POST { ...entry, parent } add an entry
 * PUT  { settings }         save the settings
 */
export default async function handler(req, res) {
  const admin = requireAdminApi(req);
  if (admin?.role !== "super") return res.status(403).json({ success: false, message: "Super admin only" });
  await dbConnect();

  if (req.method === "GET") {
    const [nodes, settings] = await Promise.all([
      SupportBotNode.find({}).sort({ order: 1, createdAt: 1 }).lean(),
      getSettings(),
    ]);
    return res.status(200).json({
      success: true,
      nodes: nodes.map((n) => ({ ...n, _id: String(n._id), parent: n.parent ? String(n.parent) : null })),
      settings: {
        greeting: settings.greeting,
        hoursEnabled: settings.hoursEnabled,
        days: settings.days,
        start: settings.start,
        end: settings.end,
        offHoursMessage: settings.offHoursMessage,
        noAgentMessage: settings.noAgentMessage,
        autoCloseMinutes: settings.autoCloseMinutes || 5,
      },
    });
  }

  if (req.method === "POST") {
    const data = cleanNode(req.body);
    if (!data.title) return res.status(400).json({ success: false, message: "Question is required" });
    let parent = null;
    if (req.body.parent) {
      if (!mongoose.isValidObjectId(req.body.parent) || !(await SupportBotNode.exists({ _id: req.body.parent }))) {
        return res.status(400).json({ success: false, message: "Parent question not found" });
      }
      parent = req.body.parent;
    }
    if (data.order === undefined) data.order = await SupportBotNode.countDocuments({ parent });
    const node = await SupportBotNode.create({ ...data, parent });
    return res.status(201).json({ success: true, node: { ...node.toObject(), _id: String(node._id), parent: parent ? String(parent) : null } });
  }

  if (req.method === "PUT") {
    const s = req.body?.settings || {};
    const set = {};
    if (s.greeting !== undefined) set.greeting = String(s.greeting).trim().slice(0, 500) || new SupportSettings().greeting;
    if (s.offHoursMessage !== undefined) set.offHoursMessage = String(s.offHoursMessage).trim().slice(0, 500);
    if (s.noAgentMessage !== undefined) set.noAgentMessage = String(s.noAgentMessage).trim().slice(0, 500);
    if (s.autoCloseMinutes !== undefined) {
      const m = Math.round(Number(s.autoCloseMinutes));
      if (!(m >= 5 && m <= 1440)) return res.status(400).json({ success: false, message: "Auto close must be 5 to 1440 minutes" });
      set.autoCloseMinutes = m;
    }
    if (s.hoursEnabled !== undefined) set.hoursEnabled = !!s.hoursEnabled;
    if (Array.isArray(s.days)) set.days = [...new Set(s.days.map(Number).filter((d) => d >= 0 && d <= 6))].sort();
    if (s.start !== undefined) {
      if (!TIME.test(s.start)) return res.status(400).json({ success: false, message: "Start time must be HH:MM" });
      set.start = s.start;
    }
    if (s.end !== undefined) {
      if (!TIME.test(s.end)) return res.status(400).json({ success: false, message: "End time must be HH:MM" });
      set.end = s.end;
    }
    if (set.start && set.end && set.start >= set.end) {
      return res.status(400).json({ success: false, message: "End time must be after start time" });
    }
    await SupportSettings.updateOne({ _id: "main" }, { $set: set }, { upsert: true });
    return res.status(200).json({ success: true });
  }

  return res.status(405).end();
}
