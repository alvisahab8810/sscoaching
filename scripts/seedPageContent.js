/**
 * One-time seed: writes scripts/seed-data/<slug>.json into the PageContent
 * collection.
 *
 * The seed data was extracted from the live-rendered page, so the DB gets
 * exactly the content that is published today -- after the migration the
 * page should look identical.
 *
 * Usage:
 *   node scripts/seedPageContent.js nios-datesheet
 *   node scripts/seedPageContent.js nios-datesheet --force   (overwrite)
 */
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

// Schema is inlined here -- models/PageContent.js is ESM and cannot be
// required from plain node. The shape is the same in both places.
const PageContent =
  mongoose.models.PageContent ||
  mongoose.model(
    "PageContent",
    new mongoose.Schema(
      {
        slug: { type: String, required: true, unique: true, index: true },
        title: { type: String, required: true },
        path: String,
        metaTitle: String,
        metaDescription: String,
        sections: { type: mongoose.Schema.Types.Mixed, default: [] },
        isPublished: { type: Boolean, default: true },
      },
      { timestamps: true, strict: false }
    )
  );

async function main() {
  const slug = process.argv[2];
  const force = process.argv.includes("--force");

  if (!slug) {
    console.error("Usage: node scripts/seedPageContent.js <slug> [--force]");
    process.exit(1);
  }
  if (!MONGODB_URI) {
    console.error("MONGODB_URI not found in .env.local");
    process.exit(1);
  }

  const file = path.join(__dirname, "seed-data", `${slug}.json`);
  if (!fs.existsSync(file)) {
    console.error("Seed file not found:", file);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  data.sections = (data.sections || []).map((s, i) => ({ ...s, order: i }));

  await mongoose.connect(MONGODB_URI);

  const existing = await PageContent.findOne({ slug: data.slug });

  if (existing && !force) {
    console.log(
      `Page "${data.slug}" already exists (${
        (existing.sections || []).length
      } sections). Nothing changed -- pass --force to overwrite.`
    );
  } else {
    await PageContent.findOneAndUpdate({ slug: data.slug }, data, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    // Pages are either section-based (markup in the DB) or field-based
    // (markup in code, only text in the DB), so report whichever applies.
    const summary = data.content
      ? `${Object.keys(data.content).length} content sections`
      : `${data.sections.length} sections`;
    console.log(
      `${existing ? "Overwrote" : "Created"} "${data.slug}" with ${summary}.`
    );
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
