/**
 * When a scheduled live class actually starts and ends.
 *
 * A class stores its date as "YYYY-MM-DD" and its time as "HH:mm", both
 * meaning India time, so they are read with a fixed +05:30 offset rather
 * than the server's own timezone -- the result is the same whether the code
 * runs locally or on a UTC host.
 */

export const LIVE_CLASS_STATUSES = ["upcoming", "live", "completed"];

// Every option the schedule form offers, plus the fallback for a class
// saved before the duration field existed.
const DURATION_MINUTES = {
  "30 mins": 30,
  "45 mins": 45,
  "1 hour": 60,
  "1.5 hours": 90,
  "2 hours": 120,
  "2.5 hours": 150,
  "3 hours": 180,
};

export const DEFAULT_DURATION_MINUTES = 90;

export function durationMinutes(duration) {
  const key = String(duration || "").trim();
  if (DURATION_MINUTES[key]) return DURATION_MINUTES[key];

  // "90", "90 min", "1.5 hr" and similar hand-typed values.
  const match = key.match(/([\d.]+)\s*(h|hr|hour|m|min)?/i);
  if (match) {
    const value = parseFloat(match[1]);
    if (Number.isFinite(value) && value > 0) {
      const unit = (match[2] || "min").toLowerCase();
      return unit.startsWith("h") ? Math.round(value * 60) : Math.round(value);
    }
  }

  return DEFAULT_DURATION_MINUTES;
}

export function classWindow(cls) {
  const date = String(cls?.date || "").trim();
  const time = String(cls?.time || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{1,2}:\d{2}$/.test(time)) return null;

  const start = new Date(`${date}T${time.padStart(5, "0")}:00+05:30`);
  if (Number.isNaN(start.getTime())) return null;

  const end = new Date(start.getTime() + durationMinutes(cls.duration) * 60000);
  return { start, end };
}

/**
 * The status the clock says this class is in, or null when the stored date
 * and time cannot be read.
 */
export function derivedStatus(cls, now = new Date()) {
  const window = classWindow(cls);
  if (!window) return null;
  if (now < window.start) return "upcoming";
  if (now < window.end) return "live";
  return "completed";
}

/**
 * A class is closed out once its scheduled end has passed. Nothing else is
 * decided here: an admin who marks a class live early, or leaves one
 * upcoming, keeps that choice until the end time goes by.
 */
export function isFinished(cls, now = new Date()) {
  const window = classWindow(cls);
  return window ? now >= window.end : false;
}

// Today in India, as the "YYYY-MM-DD" string the documents are stored with.
export function todayInIndia(now = new Date()) {
  return new Date(now.getTime() + 5.5 * 3600000).toISOString().slice(0, 10);
}
