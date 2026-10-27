/**
 * Seeds a complete SEO page from scripts/seed-data/seo-<slug>.json into the
 * SeoPage collection, so there is a real, fully-filled example to work from
 * in Dashboard -> SEO Pages.
 *
 * Usage:
 *   node scripts/seedSeoPage.js nios-admission-lucknow
 *   node scripts/seedSeoPage.js nios-admission-lucknow --force   (overwrite)
 */
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

// models/SeoPage.js is ESM and cannot be required from plain node, so the
// schema is loose here and the real model validates on every later save.
const SeoPage =
  mongoose.models.SeoPage ||
  mongoose.model(
    "SeoPage",
    new mongoose.Schema(
      {
        slug: { type: String, required: true, unique: true, index: true },
        title: { type: String, required: true },
        blocks: { type: mongoose.Schema.Types.Mixed, default: [] },
        status: { type: String, default: "draft" },
      },
      { timestamps: true, strict: false }
    )
  );

async function main() {
  const slug = process.argv[2];
  const force = process.argv.includes("--force");

  if (!slug) {
    console.error("Usage: node scripts/seedSeoPage.js <slug> [--force]");
    process.exit(1);
  }
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is missing from .env.local");
    process.exit(1);
  }

  const file = path.join(__dirname, "seed-data", `seo-${slug}.json`);
  if (!fs.existsSync(file)) {
    console.error(`Seed file not found: ${file}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(file, "utf8"));

  // order is implied by the array position in the seed file
  data.blocks = (data.blocks || []).map((b, i) => ({ ...b, order: i }));
  if (!data.publishedAt) data.publishedAt = new Date();

  await mongoose.connect(MONGODB_URI);

  const existing = await SeoPage.findOne({ slug: data.slug });

  if (existing && !force) {
    console.log(
      `Page "/${data.slug}" already exists (${(existing.blocks || []).length} sections).\n` +
        "Nothing was changed. Re-run with --force to overwrite it."
    );
    await mongoose.disconnect();
    return;
  }

  if (existing) {
    Object.assign(existing, data);
    existing.markModified("blocks");
    await existing.save();
    console.log(`Overwrote "/${data.slug}" with ${data.blocks.length} sections.`);
  } else {
    await SeoPage.create(data);
    console.log(`Created "/${data.slug}" with ${data.blocks.length} sections.`);
  }

  console.log(`Status: ${data.status}. Open it at /${data.slug}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
