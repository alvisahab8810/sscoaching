import dbConnect from "@/lib/dbConnect";
import PopupForm from "@/models/PopupForm";
import SubAdmin from "@/models/SubAdmin";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { logActivity } from "@/lib/logActivity";
import { leadAccess, clearSubAdminCookie } from "@/lib/salesAccess";
import {
  LEAD_STATUSES,
  SCORE_QUESTIONS,
  FOLLOWUP_SLOTS,
  scoreFromAnswers,
  slotUnlocked,
  normalizeStatus,
  SALE_STATUS,
} from "@/lib/leadPipeline";

/**
 * One lead's pipeline state.
 *
 *   PATCH  — status, assignment, connects, reminder
 *   PUT    — save the five-question score sheet
 *   POST   — write or edit one follow-up slot
 *   DELETE — remove the lead
 *
 * The score is never taken from the client as a number; only the five answers
 * are accepted and the total is derived here, so it cannot be forged.
 */
export default async function handler(req, res) {
  const admin = requireAdminApi(req, "leads");
  if (!admin) return res.status(401).json({ success: false, message: "Not authorised" });

  const { id } = req.query;

  try {
    await dbConnect();
    const lead = await PopupForm.findById(id);
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });

    // A sales person works only their own leads, and cannot delete or hand
    // them on — that stays with the admin.
    const access = await leadAccess(admin);
    if (!access.allowed) {
      clearSubAdminCookie(res);
      return res.status(401).json({ success: false, message: "Account inactive" });
    }
    if (access.salesId) {
      if (String(lead.assignedTo || "") !== access.salesId)
        return res.status(404).json({ success: false, message: "Lead not found" });
      if (req.method === "DELETE")
        return res.status(403).json({ success: false, message: "Only the admin can delete leads" });
      if (req.method === "PATCH" && readBody(req).assignedTo !== undefined)
        return res.status(403).json({ success: false, message: "Only the admin can reassign leads" });
    }

    // A lead saved under the old Open/Won/Lost vocabulary cannot be saved
    // again until its status is one this schema allows.
    lead.status = normalizeStatus(lead.status);

    if (req.method === "PATCH") return await updateLead(req, res, lead);
    if (req.method === "PUT") return await saveScore(req, res, lead, admin);
    if (req.method === "POST") return await saveFollowUp(req, res, lead, admin);
    if (req.method === "DELETE") return await removeLead(req, res, lead);

    return res.status(405).json({ success: false, message: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

const readBody = (req) =>
  typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

// A cleared date input sends "", which has to become null rather than an
// Invalid Date.
const toDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

async function updateLead(req, res, lead) {
  const body = readBody(req);
  const before = {
    status: lead.status,
    assignedToName: lead.assignedToName,
    connects: lead.connects,
  };

  if (body.status !== undefined) {
    if (!LEAD_STATUSES.includes(body.status))
      return res.status(400).json({ success: false, message: "Unknown status" });
    if (body.status === SALE_STATUS && lead.status !== SALE_STATUS) lead.convertedAt = new Date();
    if (body.status !== SALE_STATUS) lead.convertedAt = null;
    lead.status = body.status;
  }

  // The closing remark written when a follow-up ends in an outcome.
  if (body.outcomeNote !== undefined) lead.outcomeNote = String(body.outcomeNote || "").trim().slice(0, 2000);

  if (body.connects !== undefined) {
    const n = Number(body.connects);
    if (!Number.isFinite(n) || n < 0)
      return res.status(400).json({ success: false, message: "Invalid connects" });
    lead.connects = Math.min(Math.round(n), 999);
  }

  if (body.assignedTo !== undefined) {
    if (!body.assignedTo) {
      lead.assignedTo = null;
      lead.assignedToName = "";
      lead.assignedAt = null;
    } else {
      const person = await SubAdmin.findById(body.assignedTo).select("name");
      if (!person) return res.status(400).json({ success: false, message: "Unknown assignee" });
      lead.assignedTo = person._id;
      lead.assignedToName = person.name;
      lead.assignedAt = new Date();
    }
  }

  if (body.nextFollowUpAt !== undefined) lead.nextFollowUpAt = toDate(body.nextFollowUpAt);

  await lead.save();

  await logActivity(req, {
    feature: "leads",
    action: "update",
    entityId: lead._id,
    entityType: "lead",
    description: `Updated lead ${lead.fullName}`,
    before,
    after: { status: lead.status, assignedToName: lead.assignedToName, connects: lead.connects },
  });

  return res.status(200).json({ success: true, lead });
}

async function saveScore(req, res, lead, admin) {
  const body = readBody(req);
  const raw = Array.isArray(body.answers) ? body.answers : null;

  if (!raw || raw.length !== SCORE_QUESTIONS.length)
    return res.status(400).json({ success: false, message: "Answer every question" });

  const answers = raw.map(Boolean);

  lead.scoreAnswers = answers;
  lead.score = scoreFromAnswers(answers);
  lead.scored = true;
  lead.scoredAt = new Date();
  lead.scoredByName = admin.name || admin.email || "Admin";

  await lead.save();

  await logActivity(req, {
    feature: "leads",
    action: "score",
    entityId: lead._id,
    entityType: "lead",
    description: `Scored lead ${lead.fullName} at ${lead.score}/10`,
    after: { score: lead.score, answers },
  });

  return res.status(200).json({ success: true, lead });
}

async function saveFollowUp(req, res, lead, admin) {
  const body = readBody(req);
  const slot = Number(body.slot);

  if (!Number.isInteger(slot) || slot < 1 || slot > FOLLOWUP_SLOTS)
    return res.status(400).json({ success: false, message: "Unknown follow-up slot" });

  // The ladder is enforced here as well as in the UI: a later slot cannot be
  // filled by a hand-made request while the one before it is still empty.
  if (!slotUnlocked(slot, lead.followUps))
    return res.status(400).json({ success: false, message: `Fill follow-up ${slot - 1} first` });

  const note = String(body.note || "").trim().slice(0, 2000);
  if (!note) return res.status(400).json({ success: false, message: "Write a note" });

  const existing = lead.followUps.find((f) => f.slot === slot);
  if (existing) {
    existing.note = note;
    existing.byId = String(admin.id || "");
    existing.byName = admin.name || admin.email || "Admin";
  } else {
    lead.followUps.push({
      slot,
      note,
      byId: String(admin.id || ""),
      byName: admin.name || admin.email || "Admin",
    });
  }

  lead.lastFollowUpAt = new Date();

  // Writing a follow-up is what moves a lead into the tracker, so a lead
  // still sitting at New is moved along rather than left behind.
  if (lead.status === "New") lead.status = "Follow Up";

  if (body.nextFollowUpAt !== undefined) lead.nextFollowUpAt = toDate(body.nextFollowUpAt);

  await lead.save();

  await logActivity(req, {
    feature: "leads",
    action: "followup",
    entityId: lead._id,
    entityType: "lead",
    description: `Follow-up ${slot} on lead ${lead.fullName}`,
    after: { slot, note },
  });

  return res.status(200).json({ success: true, lead });
}

async function removeLead(req, res, lead) {
  await logActivity(req, {
    feature: "leads",
    action: "delete",
    entityId: lead._id,
    entityType: "lead",
    description: `Deleted lead ${lead.fullName}`,
    before: { fullName: lead.fullName, phone: lead.phone, source: lead.source },
  });

  await lead.deleteOne();
  return res.status(200).json({ success: true });
}
