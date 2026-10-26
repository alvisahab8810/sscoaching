import dbConnect from "@/lib/dbConnect";
import NiosSyncState from "@/models/NiosSyncState";
import {
  syncNiosNotifications,
  getLatestNotifications,
  REFRESH_INTERVAL_MS,
} from "@/lib/niosNotifications";

// A failed scrape should not be retried on every single page view.
const RETRY_AFTER_FAILURE_MS = 10 * 60 * 1000; // 10 minutes

// Guards against two requests arriving together and scraping twice.
let inFlight = null;

async function runSync() {
  if (inFlight) return inFlight;

  inFlight = (async () => {
    await NiosSyncState.updateOne(
      { key: "nios" },
      { $set: { lastTryAt: new Date() } },
      { upsert: true }
    );
    try {
      const stats = await syncNiosNotifications();
      await NiosSyncState.updateOne(
        { key: "nios" },
        { $set: { lastSyncAt: new Date(), lastError: "", lastCount: stats.total } }
      );
      return stats;
    } catch (err) {
      // The previously stored notifications stay untouched, so the section
      // keeps showing the last good data instead of going blank.
      await NiosSyncState.updateOne(
        { key: "nios" },
        { $set: { lastError: String(err.message || err) } }
      );
      throw err;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();

    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 3, 1), 20);
    const force = req.query.force === "1";

    const state = await NiosSyncState.findOne({ key: "nios" }).lean();
    const now = Date.now();
    const lastSync = state?.lastSyncAt ? new Date(state.lastSyncAt).getTime() : 0;
    const lastTry = state?.lastTryAt ? new Date(state.lastTryAt).getTime() : 0;

    const stale = now - lastSync > REFRESH_INTERVAL_MS;
    const cooledDown = now - lastTry > RETRY_AFTER_FAILURE_MS;

    if (force || (stale && cooledDown)) {
      if (lastSync) {
        // Something is already stored: refresh in the background and answer now,
        // so the visitor never waits on nios.ac.in.
        runSync().catch(() => {});
      } else {
        // First ever call - there is nothing to serve yet, so wait for it.
        await runSync().catch(() => {});
      }
    }

    const notifications = await getLatestNotifications(limit);

    // Cached briefly at the edge; the hourly scrape is what actually refreshes it.
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=600, stale-while-revalidate=3600");

    return res.status(200).json({
      success: true,
      notifications,
      lastSyncAt: state?.lastSyncAt || null,
    });
  } catch (err) {
    console.error("nios-notifications:", err);
    return res
      .status(500)
      .json({ success: false, notifications: [], message: "Unable to load notifications" });
  }
}
