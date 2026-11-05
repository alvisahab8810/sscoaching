import dbConnect from "@/lib/dbConnect";
import PopupForm from "@/models/PopupForm";
import SalesAssignState from "@/models/SalesAssignState";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { loadAssignState, describeRotation, autoAssignLead, rotationMembers } from "@/lib/salesAssign";

// Leads handed out in one "distribute" click, so one request cannot run on.
const DISTRIBUTE_LIMIT = 500;

/**
 * The auto-assign rotation (super admin only).
 *
 *   GET   — whose turn it is and how far into the batch
 *   PATCH — { enabled, batchSize }
 *   POST  — { action: "distribute" }: hand the unassigned New leads out
 *           through the same rotation, oldest first
 */
export default async function handler(req, res) {
  const admin = requireAdminApi(req);
  if (admin?.role !== "super") return res.status(403).json({ success: false, message: "Forbidden" });

  await dbConnect();

  try {
    if (req.method === "GET") {
      return res.status(200).json({ success: true, rotation: await describeRotation() });
    }

    if (req.method === "PATCH") {
      const body = req.body || {};
      const set = {};
      if (body.enabled !== undefined) set.enabled = !!body.enabled;
      if (body.batchSize !== undefined) {
        const n = Number(body.batchSize);
        if (!Number.isInteger(n) || n < 1 || n > 500)
          return res.status(400).json({ success: false, message: "Batch size must be between 1 and 500" });
        set.batchSize = n;
      }

      await loadAssignState();
      await SalesAssignState.updateOne({ _id: "main" }, { $set: set, $inc: { version: 1 } });
      return res.status(200).json({ success: true, rotation: await describeRotation() });
    }

    if (req.method === "POST" && req.body?.action === "distribute") {
      const state = await loadAssignState();
      if (!state.enabled)
        return res.status(400).json({ success: false, message: "Turn auto-assign on first" });
      if (!(await rotationMembers()).length)
        return res.status(400).json({ success: false, message: "No active sales person to assign to" });

      const waiting = await PopupForm.find({ assignedTo: null, status: { $in: ["New", "Open"] } })
        .select("_id")
        .sort({ createdAt: 1 })
        .limit(DISTRIBUTE_LIMIT)
        .lean();

      let assigned = 0;
      for (const lead of waiting) {
        if (await autoAssignLead(lead._id)) assigned++;
      }

      return res.status(200).json({ success: true, assigned, rotation: await describeRotation() });
    }

    return res.status(405).json({ success: false, message: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
