import LiveClass from "@/models/LiveClassModel";
import { isFinished, derivedStatus, todayInIndia } from "@/lib/liveClassStatus";

/**
 * Move live classes on to the status the clock says they are in.
 *
 * A class used to keep whatever status was picked when it was scheduled, so
 * a session that finished hours ago still showed as "Live" in the app. This
 * runs on the listing endpoint and settles two things:
 *
 *   - anything whose scheduled end has passed becomes "completed"
 *   - an "upcoming" class inside its own time window becomes "live"
 *
 * A class an admin has already marked "completed" is never reopened, so a
 * manual close always wins.
 */
export async function closePastLiveClasses(now = new Date()) {
  const today = todayInIndia(now);

  // A class dated before today is over whatever its duration was, so it can
  // be closed in one query without reading each document.
  await LiveClass.updateMany(
    { status: { $ne: "completed" }, date: { $lt: today } },
    { $set: { status: "completed" } }
  );

  // Today's classes need their start time and duration read individually.
  const todays = await LiveClass.find({ status: { $ne: "completed" }, date: today })
    .select("date time duration status")
    .lean();

  const finished = [];
  const started = [];

  for (const cls of todays) {
    if (isFinished(cls, now)) finished.push(cls._id);
    else if (cls.status === "upcoming" && derivedStatus(cls, now) === "live") started.push(cls._id);
  }

  if (finished.length)
    await LiveClass.updateMany({ _id: { $in: finished } }, { $set: { status: "completed" } });

  if (started.length)
    await LiveClass.updateMany({ _id: { $in: started } }, { $set: { status: "live" } });
}
