/**
 * The lead pipeline: the vocabulary of lead handling, the scoring sheet and
 * the follow-up ladder.
 *
 * Everything here is pure, so the same rules run on the server when a lead is
 * written and in the dashboard when it is drawn. Keeping one copy is what
 * stops a lead reading 8/10 on screen and 6/10 in the export.
 */

export const LEAD_STATUSES = [
  "New",
  "Contacted",
  "Follow Up",
  "Not Interested",
  "No Answer",
  "Qualified",
  "Converted",
  "Not Qualified",
];

// A lead sitting in this status is what the Follow-ups tracker works through.
export const FOLLOWUP_STATUS = "Follow Up";

// Admission done: the one status that counts as a sale. Qualified only means
// the lead is interested and eligible.
export const SALE_STATUS = "Converted";

export const STATUS_STYLE = {
  New: { bg: "#eef2ff", color: "#4338ca", dot: "#6366f1" },
  Contacted: { bg: "#e0f2fe", color: "#0369a1", dot: "#0ea5e9" },
  "Follow Up": { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
  "Not Interested": { bg: "#fee2e2", color: "#b91c1c", dot: "#ef4444" },
  "No Answer": { bg: "#f1f5f9", color: "#475569", dot: "#94a3b8" },
  Qualified: { bg: "#dcfce7", color: "#15803d", dot: "#22c55e" },
  Converted: { bg: "#15803d", color: "#ffffff", dot: "#15803d" },
  "Not Qualified": { bg: "#fae8ff", color: "#a21caf", dot: "#d946ef" },
};

// Legacy rows were saved before this vocabulary existed, and a document whose
// status is not in the enum cannot be saved again until it is mapped.
const LEGACY_STATUS = {
  Open: "New",
  Won: "Converted",
  Lost: "Not Interested",
};

export function normalizeStatus(status) {
  if (LEAD_STATUSES.includes(status)) return status;
  return LEGACY_STATUS[status] || "New";
}

/**
 * The scoring sheet: five things a counsellor can answer straight after the
 * call. Two points per Yes, so the sheet lands on a 0-10 the whole team reads
 * the same way.
 */
export const SCORE_QUESTIONS = [
  "Has the student confirmed the class and board they want to join?",
  "Is the admission planned within the next 60 days?",
  "Did you speak to the parent or the person who decides?",
  "Did the lead reply on call or WhatsApp within 24 hours?",
  "Has the fee been discussed and found workable?",
];

export const POINTS_PER_YES = 2;
export const MAX_SCORE = SCORE_QUESTIONS.length * POINTS_PER_YES;

export function scoreFromAnswers(answers = []) {
  return answers.filter(Boolean).length * POINTS_PER_YES;
}

export function scoreBand(score) {
  if (score >= 8) return { label: "Hot", bg: "#fee2e2", color: "#b91c1c" };
  if (score >= 5) return { label: "Warm", bg: "#fef3c7", color: "#92400e" };
  return { label: "Cold", bg: "#e2e8f0", color: "#475569" };
}

// How many follow-up slots the tracker offers per lead. Slot 1 is always open;
// each later slot unlocks only once the one before it has been written.
export const FOLLOWUP_SLOTS = 6;

export function slotUnlocked(slot, followUps = []) {
  if (slot <= 1) return true;
  const previous = followUps.find((f) => f.slot === slot - 1);
  return !!(previous && String(previous.note || "").trim());
}

/**
 * Where a reminder stands relative to today. Compared by calendar day rather
 * than by the clock, so a 9am follow-up is still "today" at 6pm.
 */
export function reminderState(nextFollowUpAt) {
  if (!nextFollowUpAt) return "none";
  const due = new Date(nextFollowUpAt);
  if (Number.isNaN(due.getTime())) return "none";

  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const dueDay = startOfDay(due);
  const today = startOfDay(new Date());

  if (dueDay < today) return "overdue";
  if (dueDay === today) return "today";
  return "upcoming";
}
