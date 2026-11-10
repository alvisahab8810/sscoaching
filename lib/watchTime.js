import VideoWatchTime from "@/models/VideoWatchTime";
import WatchDevice from "@/models/WatchDevice";
import WatchProgress from "@/models/WatchProgress";

/**
 * Real watch time, worked out from the "Continue Watching" ticks.
 *
 * Both players (web dashboard and the app's WebView) post the playback
 * position about every 5 seconds while a video plays, and once more on
 * pause. Between two ticks the position should move forward by roughly the
 * real time that passed. When it does, that time was spent watching. When
 * it jumps further, the student seeked and nothing is counted. A backward
 * jump (rewind, replay from start) also counts nothing for that one tick.
 *
 * Only the real seconds are counted, so a video at 2x speed adds 5 minutes
 * for 5 minutes of the student's time, not 10.
 */

// Longest gap between two ticks we still trust. A tick after a long pause
// is credited with what it advanced, up to this much.
const MAX_GAP = 20;
// Playback up to 2x is normal; a position that moved faster was a seek.
const MAX_SPEED = 2;

export function creditedSeconds(prev, watchedTime, now = Date.now()) {
  const pos = Number(watchedTime) || 0;
  // First tick ever for this video: playback started at zero.
  if (!prev) return pos > 0 && pos <= MAX_GAP ? pos : 0;

  const advance = pos - (Number(prev.watchedTime) || 0);
  if (advance <= 0) return 0;
  const elapsed = (now - new Date(prev.updatedAt).getTime()) / 1000;
  if (!(elapsed > 0)) return 0;

  const span = Math.min(elapsed, MAX_GAP);
  if (advance > span * MAX_SPEED + 2) return 0;
  return Math.round(Math.min(advance, span));
}

// A play is the video starting from the beginning: the first tick ever, or
// the position jumping back to the start (replay after finishing, restart).
// Resuming from "Continue Watching" is not a new play.
export function isNewPlay(prev, watchedTime) {
  const pos = Number(watchedTime) || 0;
  if (pos <= 0 || pos > MAX_GAP) return false;
  if (!prev) return true;
  return (Number(prev.watchedTime) || 0) - pos > 30;
}

/**
 * All-time video hours for the analytics KPI.
 *
 * VideoWatchTime only exists from the day it went live, so each student's
 * video is credited with whichever is larger: the exact seconds counted
 * there, or how far into the video they got (WatchProgress position, capped
 * at the video's length) -- the best figure older viewing left behind.
 */
export async function videoWatchTotals() {
  const [positions, tracked] = await Promise.all([
    WatchProgress.aggregate([
      {
        $project: {
          userId: 1,
          videoId: 1,
          sec: { $cond: [{ $gt: ["$duration", 0] }, { $min: ["$watchedTime", "$duration"] }, "$watchedTime"] },
        },
      },
    ]),
    VideoWatchTime.aggregate([
      { $group: { _id: { userId: "$userId", videoId: "$videoId" }, sec: { $sum: "$seconds" } } },
    ]),
  ]);

  const perVideo = new Map();
  const add = (userId, videoId, sec) => {
    const k = `${userId}|${videoId}`;
    perVideo.set(k, Math.max(perVideo.get(k) || 0, Number(sec) || 0));
  };
  for (const p of positions) add(p.userId, p.videoId, p.sec);
  for (const t of tracked) add(t._id.userId, t._id.videoId, t.sec);

  let seconds = 0;
  let videos = 0;
  const students = new Set();
  for (const [k, sec] of perVideo) {
    if (sec <= 0) continue;
    seconds += sec;
    videos++;
    students.add(k.split("|")[0]);
  }

  const hours = (s) => Math.round((s / 3600) * 10) / 10;
  return {
    seconds,
    hours: hours(seconds),
    videos,
    students: students.size,
    avgHoursPerStudent: students.size ? hours(seconds / students.size) : 0,
  };
}

// Today's date in IST as "YYYY-MM-DD".
export function istDay(d = new Date()) {
  return new Date(d.getTime() + 330 * 60 * 1000).toISOString().slice(0, 10);
}

export async function recordWatchTime({ prev, userId, courseId, videoId, watchedTime, device }) {
  const seconds = creditedSeconds(prev, watchedTime);
  const play = isNewPlay(prev, watchedTime);
  if (seconds <= 0 && !play) return;

  const date = istDay();
  const inc = { seconds, plays: play ? 1 : 0 };
  inc[device.source === "app" ? "appSeconds" : "webSeconds"] = seconds;
  const { key, ...info } = device;
  await Promise.all([
    VideoWatchTime.updateOne(
      { userId, videoId, date },
      { $inc: inc, $set: { courseId } },
      { upsert: true }
    ),
    WatchDevice.updateOne(
      { userId, key, date },
      { $inc: { seconds }, $set: info },
      { upsert: true }
    ),
  ]);
}
