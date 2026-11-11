/**
 * Shared helpers for the Pro batch class timetable (models/ClassSchedule.js),
 * used by the admin editor and the student dashboard. Safe in the browser.
 */

// Monday first, the way students read a week. Values are JS day numbers.
export const WEEK = [
  { d: 1, short: "Mon", long: "Monday" },
  { d: 2, short: "Tue", long: "Tuesday" },
  { d: 3, short: "Wed", long: "Wednesday" },
  { d: 4, short: "Thu", long: "Thursday" },
  { d: 5, short: "Fri", long: "Friday" },
  { d: 6, short: "Sat", long: "Saturday" },
  { d: 0, short: "Sun", long: "Sunday" },
];
export const dayName = (d) => WEEK.find((w) => w.d === d)?.long || "";

// "13:30" -> "1:30 PM"
export function fmt12(t) {
  const [h, m] = String(t || "").split(":").map(Number);
  if (Number.isNaN(h)) return "";
  return `${h % 12 || 12}:${String(m || 0).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

export const toMin = (t) => {
  const [h, m] = String(t || "").split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};

// Current time in IST as { date: Date (calendar day, UTC-based), day, min }.
// Classes run in Lucknow, so the timetable is read in IST wherever the
// student's phone or laptop is set.
export function istNow(now = Date.now()) {
  const d = new Date(now + 330 * 60 * 1000);
  return {
    date: new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())),
    day: d.getUTCDay(),
    min: d.getUTCHours() * 60 + d.getUTCMinutes(),
  };
}

// The 7 calendar days (Mon..Sun) of the week that contains `date`.
export function weekOf(date) {
  const offset = (date.getUTCDay() + 6) % 7;
  return Array.from({ length: 7 }, (_, i) => new Date(date.getTime() + (i - offset) * 86400000));
}

export const fmtDay = (date, opts = { day: "numeric", month: "short" }) =>
  date.toLocaleDateString("en-IN", { ...opts, timeZone: "UTC" });

// "upcoming" | "live" | "done" for a class on `date`, given IST now.
export function slotStatus(slot, date, now) {
  const diff = date.getTime() - now.date.getTime();
  if (diff > 0) return "upcoming";
  if (diff < 0) return "done";
  if (now.min >= toMin(slot.end)) return "done";
  if (now.min >= toMin(slot.start)) return "live";
  return "upcoming";
}

// The next class from now: { date, slot } or null.
export function nextClass(schedule, now) {
  for (let i = 0; i < 8; i++) {
    const date = new Date(now.date.getTime() + i * 86400000);
    if (!schedule.days.includes(date.getUTCDay())) continue;
    const slot = schedule.slots.find((s) => i > 0 || toMin(s.end) > now.min);
    if (slot) return { date, slot };
  }
  return null;
}

const CENTRES =
  "Offline and online classes both available. Centres: Hazratganj 9839065533, 6387563947 | Indira Nagar 9792111121, 9956493857 | Alambagh 9935035316, 9236062837";

// Batch timings from the printed timetable. Monday, Wednesday, Friday.
export const TEMPLATES = [
  {
    key: "12-science",
    label: "Class 12th Science",
    match: /^(?!.*\b10(th)?\b).*science/i,
    days: [1, 3, 5],
    note: CENTRES,
    slots: [
      { start: "09:00", end: "09:30", subject: "Physics" },
      { start: "09:30", end: "10:00", subject: "Chemistry" },
      { start: "10:00", end: "10:30", subject: "Maths" },
      { start: "10:30", end: "11:00", subject: "Biology" },
      { start: "11:00", end: "11:30", subject: "English" },
    ],
  },
  {
    key: "12-commerce",
    label: "Class 12th Commerce",
    match: /^(?!.*\b10(th)?\b).*commerce/i,
    days: [1, 3, 5],
    note: CENTRES,
    slots: [
      { start: "11:00", end: "11:30", subject: "English" },
      { start: "11:30", end: "12:00", subject: "Economics" },
      { start: "12:00", end: "12:30", subject: "Accounts" },
      { start: "12:30", end: "13:00", subject: "Business Studies" },
    ],
  },
  {
    key: "10",
    label: "Class 10th",
    match: /^(?!.*\b12(th)?\b).*\b10(th)?\b/i,
    days: [1, 3, 5],
    note: CENTRES,
    slots: [
      { start: "13:30", end: "14:00", subject: "Maths" },
      { start: "14:00", end: "14:30", subject: "Social Study" },
      { start: "14:30", end: "15:00", subject: "Science" },
      { start: "15:00", end: "15:30", subject: "English" },
    ],
  },
];

export const suggestTemplate = (title) => TEMPLATES.find((t) => t.match.test(title || "")) || null;
