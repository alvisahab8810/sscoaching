/**
 * Renames the subject "Accounts" to "Accountancy" wherever it is stored, so
 * teachers, bundles and live classes all use the one spelling the subject
 * pickers offer. Run with --apply to write; without it the script only
 * reports what it would change.
 *
 *   node scripts/renameAccountsSubject.js
 *   node scripts/renameAccountsSubject.js --apply
 */

require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const OLD = "Accounts";
const NEW = "Accountancy";
const APPLY = process.argv.includes("--apply");

// Matched case-insensitively and whole-string only, so "Accounts" is renamed
// but "Accounts & Finance" is left alone.
const exact = { $regex: `^\\s*${OLD}\\s*$`, $options: "i" };

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;

  const teachers = db.collection("teachers");
  const courses = db.collection("courses");
  const liveclasses = db.collection("liveclasses");

  const report = async (label, coll, filter) => {
    const docs = await coll.find(filter).project({ title: 1, name: 1 }).toArray();
    console.log(`${label}: ${docs.length}`);
    for (const d of docs) console.log(`   - ${d.title || d.name || d._id}`);
    return docs.length;
  };

  await report("Teachers with subject 'Accounts'", teachers, { subjects: exact });
  await report("Bundles with 'Accounts' in bundledSubjects", courses, { bundledSubjects: exact });
  await report("Courses with subject 'Accounts'", courses, { subject: exact });
  await report("Live classes with subject 'Accounts'", liveclasses, { subject: exact });

  if (!APPLY) {
    console.log("\nDry run — nothing written. Re-run with --apply to make the change.");
    await mongoose.disconnect();
    return;
  }

  // Array fields are rewritten element by element, so only the matching entry
  // changes and the rest of the list keeps its order.
  const fixArray = async (coll, field) => {
    const docs = await coll.find({ [field]: exact }).toArray();
    for (const d of docs) {
      const next = (d[field] || []).map((v) =>
        String(v).trim().toLowerCase() === OLD.toLowerCase() ? NEW : v
      );
      await coll.updateOne({ _id: d._id }, { $set: { [field]: next } });
    }
    return docs.length;
  };

  const t = await fixArray(teachers, "subjects");
  const b = await fixArray(courses, "bundledSubjects");
  const c = await courses.updateMany({ subject: exact }, { $set: { subject: NEW } });
  const l = await liveclasses.updateMany({ subject: exact }, { $set: { subject: NEW } });

  console.log(`\nUpdated — teachers: ${t}, bundles: ${b}, courses: ${c.modifiedCount}, live classes: ${l.modifiedCount}`);
  await mongoose.disconnect();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
