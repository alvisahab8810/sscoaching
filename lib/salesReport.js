import mongoose from "mongoose";
import PopupForm from "@/models/PopupForm";
import { LEAD_STATUSES, normalizeStatus } from "@/lib/leadPipeline";

/**
 * The numbers behind the sales dashboards and reports.
 *
 * A "sale" is a lead in Converted (the old Won status counts too). Months are
 * Indian calendar months, so a lead that comes in at 1 am IST on the 1st is
 * counted in the new month even though the server clock is still on the
 * previous day in UTC.
 */

const IST_OFFSET_MS = 330 * 60 * 1000;
const SOLD = ["Converted", "Won"];
const CLOSED = ["Converted", "Won", "Not Interested", "Not Qualified", "Lost"];

export const isMonthKey = (key) => /^\d{4}-(0[1-9]|1[0-2])$/.test(String(key || ""));

export function monthKey(date = new Date()) {
  const d = new Date(date.getTime() + IST_OFFSET_MS);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function monthRange(key) {
  const [y, m] = key.split("-").map(Number);
  return {
    start: new Date(Date.UTC(y, m - 1, 1) - IST_OFFSET_MS),
    end: new Date(Date.UTC(y, m, 1) - IST_OFFSET_MS),
  };
}

// The n months ending with `key`, oldest first.
export function monthsEnding(key, n) {
  const [y, m] = key.split("-").map(Number);
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(Date.UTC(y, m - 1 - (n - 1 - i), 1));
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  });
}

// End of today in IST: follow-ups due before this are due or overdue.
export function endOfTodayIST(now = new Date()) {
  const d = new Date(now.getTime() + IST_OFFSET_MS);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1) - IST_OFFSET_MS);
}

export const emptyStatusCounts = () => Object.fromEntries(LEAD_STATUSES.map((s) => [s, 0]));

const toIds = (ids) => ids.map((id) => new mongoose.Types.ObjectId(String(id)));

// When a sale was made. Leads closed before convertedAt existed fall back to
// their last update, which is the closest record of it.
const convertedDate = { $ifNull: ["$convertedAt", "$updatedAt"] };

/**
 * Per person: how many leads they hold and how those leads stand today.
 * `assignedRange` narrows it to leads handed over in that window.
 */
export async function statusCountsBy(personIds, assignedRange) {
  const match = { assignedTo: { $in: toIds(personIds) } };
  if (assignedRange) match.assignedAt = { $gte: assignedRange.start, $lt: assignedRange.end };

  const rows = await PopupForm.aggregate([
    { $match: match },
    { $group: { _id: { who: "$assignedTo", status: "$status" }, n: { $sum: 1 } } },
  ]);

  const out = {};
  for (const r of rows) {
    const who = String(r._id.who);
    out[who] ||= { total: 0, byStatus: emptyStatusCounts() };
    out[who].total += r.n;
    out[who].byStatus[normalizeStatus(r._id.status)] += r.n;
  }
  return out;
}

// Per person: sales closed inside the window, whenever the lead came in.
export async function salesClosedBy(personIds, range) {
  const rows = await PopupForm.aggregate([
    { $match: { assignedTo: { $in: toIds(personIds) }, status: { $in: SOLD } } },
    { $match: { $expr: { $and: [{ $gte: [convertedDate, range.start] }, { $lt: [convertedDate, range.end] }] } } },
    { $group: { _id: "$assignedTo", n: { $sum: 1 } } },
  ]);
  return Object.fromEntries(rows.map((r) => [String(r._id), r.n]));
}

// Per person: follow-up notes they wrote inside the window.
export async function followUpsWrittenBy(personIds, range) {
  const ids = personIds.map(String);
  const rows = await PopupForm.aggregate([
    { $match: { "followUps.byId": { $in: ids } } },
    { $unwind: "$followUps" },
    {
      $match: {
        "followUps.byId": { $in: ids },
        "followUps.createdAt": { $gte: range.start, $lt: range.end },
      },
    },
    { $group: { _id: "$followUps.byId", n: { $sum: 1 } } },
  ]);
  return Object.fromEntries(rows.map((r) => [String(r._id), r.n]));
}

// Per person: open leads whose follow-up reminder is today or already past.
export async function followUpsDueBy(personIds, now = new Date()) {
  const rows = await PopupForm.aggregate([
    {
      $match: {
        assignedTo: { $in: toIds(personIds) },
        status: { $nin: CLOSED },
        nextFollowUpAt: { $ne: null, $lt: endOfTodayIST(now) },
      },
    },
    { $group: { _id: "$assignedTo", n: { $sum: 1 } } },
  ]);
  return Object.fromEntries(rows.map((r) => [String(r._id), r.n]));
}

/**
 * Month by month for the given people together: leads handed over and sales
 * closed. Used for the trend bars.
 */
export async function monthlyTrend(personIds, months) {
  const first = monthRange(months[0]).start;
  const last = monthRange(months[months.length - 1]).end;
  const ids = toIds(personIds);
  const fmt = { format: "%Y-%m", date: null, timezone: "+05:30" };

  const [assigned, sold] = await Promise.all([
    PopupForm.aggregate([
      { $match: { assignedTo: { $in: ids }, assignedAt: { $gte: first, $lt: last } } },
      { $group: { _id: { $dateToString: { ...fmt, date: "$assignedAt" } }, n: { $sum: 1 } } },
    ]),
    PopupForm.aggregate([
      { $match: { assignedTo: { $in: ids }, status: { $in: SOLD } } },
      { $match: { $expr: { $and: [{ $gte: [convertedDate, first] }, { $lt: [convertedDate, last] }] } } },
      { $group: { _id: { $dateToString: { ...fmt, date: convertedDate } }, n: { $sum: 1 } } },
    ]),
  ]);

  const a = Object.fromEntries(assigned.map((r) => [r._id, r.n]));
  const s = Object.fromEntries(sold.map((r) => [r._id, r.n]));
  return months.map((key) => ({ month: key, assigned: a[key] || 0, sales: s[key] || 0 }));
}

export const rate = (part, whole) => (whole ? Math.round((part / whole) * 1000) / 10 : 0);

export { SOLD, CLOSED };
