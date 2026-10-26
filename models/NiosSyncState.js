import mongoose from "mongoose";

// Single row that records when NIOS was last scraped. Kept in the database
// rather than in memory so a restart (or a second server process) does not
// start hitting nios.ac.in on every request.
const NiosSyncStateSchema = new mongoose.Schema(
  {
    key:        { type: String, default: "nios", unique: true },
    lastSyncAt: { type: Date, default: null },   // last successful scrape
    lastTryAt:  { type: Date, default: null },   // last attempt, success or not
    lastError:  { type: String, default: "" },
    lastCount:  { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.NiosSyncState ||
  mongoose.model("NiosSyncState", NiosSyncStateSchema);
