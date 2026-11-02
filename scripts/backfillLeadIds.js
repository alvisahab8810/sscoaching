/**
 * Gives every existing lead a readable id and brings old pipeline values onto
 * the current vocabulary. Run with --apply to write; without it the script
 * only reports what it would change.
 *
 *   node scripts/backfillLeadIds.js
 *   node scripts/backfillLeadIds.js --apply
 */

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const APPLY = process.argv.includes("--apply");
const PREFIX = "SS-L-";
const COUNTER_ID = "leadId";

// Mirrors lib/leadPipeline.js. Kept as a literal because this script runs
// outside Next and cannot resolve the "@/" alias.
const LEGACY_STATUS = { Open: "New", Won: "Qualified", Lost: "Not Interested" };
const VALID = ["New", "Contacted", "Follow Up", "Not Interested", "No Answer", "Qualified", "Not Qualified"];

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const leads = db.collection("popupforms");
  const counters = db.collection("counters");

  // Oldest first, so the numbers run in the order the leads actually arrived.
  const missing = await leads
    .find({ $or: [{ leadId: { $exists: false } }, { leadId: "" }, { leadId: null }] })
    .project({ _id: 1 })
    .sort({ createdAt: 1 })
    .toArray();

  const badStatus = await leads.countDocuments({ status: { $nin: [...VALID, null] } });

  console.log(`Leads without an id : ${missing.length}`);
  console.log(`Leads on an old status: ${badStatus}`);

  if (!APPLY) {
    console.log("\nDry run - nothing written. Re-run with --apply to make the change.");
    await mongoose.disconnect();
    return;
  }

  // Continue from wherever the counter already stands, so ids stay unique if
  // the script is run twice or new leads arrived in between.
  const current = await counters.findOne({ _id: COUNTER_ID });
  let seq = current?.seq || 0;

  const ops = missing.map((doc) => {
    seq += 1;
    return {
      updateOne: {
        filter: { _id: doc._id },
        update: { $set: { leadId: `${PREFIX}${String(seq).padStart(4, "0")}` } },
      },
    };
  });

  for (let i = 0; i < ops.length; i += 500) {
    await leads.bulkWrite(ops.slice(i, i + 500));
    console.log(`  ids written: ${Math.min(i + 500, ops.length)} / ${ops.length}`);
  }

  await counters.updateOne({ _id: COUNTER_ID }, { $set: { seq } }, { upsert: true });

  let statusFixed = 0;
  for (const [from, to] of Object.entries(LEGACY_STATUS)) {
    const r = await leads.updateMany({ status: from }, { $set: { status: to } });
    statusFixed += r.modifiedCount;
  }

  // Anything left on an unrecognised status starts again at New.
  const rest = await leads.updateMany(
    { status: { $exists: true, $nin: VALID } },
    { $set: { status: "New" } }
  );

  console.log(`\nDone - ids: ${ops.length}, statuses mapped: ${statusFixed}, reset to New: ${rest.modifiedCount}`);
  console.log(`Counter now at ${seq}`);
  await mongoose.disconnect();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
