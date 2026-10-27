import mongoose from "mongoose";

/**
 * Landing pages built from the admin dashboard.
 *
 * This is deliberately a separate collection from PageContent. PageContent
 * mirrors pages whose JSX already exists in the repo (/nios-datesheet,
 * /nios-results) and whose markup must not change. A SeoPage has no JSX of
 * its own -- it is rendered entirely by pages/[slug].js from the blocks
 * below, so a new page can go live without a deploy.
 *
 * Every block type maps onto a section that already exists on the public
 * site, so a built page looks like the rest of sscoaching.in.
 */
const BlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "hero",     // full-width banner: title, subtitle, up to two buttons
        "richtext", // Quill HTML -- headings, paragraphs, lists, links
        "features", // icon + title + description cards in a grid
        "stats",    // number + label counters
        "steps",    // numbered process steps
        "cta",      // coloured call-to-action band with one button
        "faq",      // accordion; also feeds the FAQPage schema
        "image",    // single image with alt text and an optional caption
        "video",    // responsive YouTube / embedded player
        "table",    // columns + rows
        "cards",    // plain content cards, optionally linked
        "quote",    // pull quote / testimonial
      ],
      required: true,
    },

    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },

    // ---- shared ----
    heading: { type: String, default: "" },
    // Heading level matters for SEO: exactly one h1 per page, h2 for
    // sections, h3 for sub-sections.
    headingLevel: { type: String, enum: ["h1", "h2", "h3", "h4"], default: "h2" },
    // Part of the heading that is highlighted in the brand colour, the way
    // the home page does it ("... <span class=highlight>SS Coaching</span>").
    headingHighlight: { type: String, default: "" },
    subheading: { type: String, default: "" },

    // Rich HTML body (richtext, and the hero's supporting copy)
    html: { type: String, default: "" },

    // ---- buttons ----
    buttonText: { type: String, default: "" },
    buttonUrl: { type: String, default: "" },
    button2Text: { type: String, default: "" },
    button2Url: { type: String, default: "" },

    // ---- media ----
    image: { type: String, default: "" },
    imageAlt: { type: String, default: "" },
    caption: { type: String, default: "" },
    videoUrl: { type: String, default: "" },

    // ---- repeatable items ----
    // features / cards -> { image, imageAlt, title, text, url }
    // stats            -> { image, title, text }     (title = the number)
    // steps            -> { title, text }
    // faq              -> { title, text }            (question / answer)
    items: { type: mongoose.Schema.Types.Mixed, default: undefined },

    // ---- table ----
    // columns: [{ label }]   rows: [[{ html }], ...]
    columns: { type: mongoose.Schema.Types.Mixed, default: undefined },
    rows: { type: mongoose.Schema.Types.Mixed, default: undefined },

    // ---- appearance ----
    background: {
      type: String,
      enum: ["white", "light", "purple", "dark", "orange"],
      default: "white",
    },
    align: { type: String, enum: ["left", "center"], default: "left" },
    // Escape hatch for a one-off tweak without a code change.
    className: { type: String, default: "" },
  },
  { _id: true }
);

const SeoPageSchema = new mongoose.Schema(
  {
    // Public URL is always /<slug> -- pages/[slug].js serves it.
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    // Internal name, shown in the admin list only.
    title: { type: String, required: true, trim: true },

    /* ============ SEO ============ */
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: { type: String, default: "" },
    // The one phrase the page is meant to rank for. Drives the SEO checklist
    // in the editor; never rendered on the page.
    focusKeyword: { type: String, default: "" },

    canonicalUrl: { type: String, default: "" },
    // Kept as two booleans rather than a robots string so the editor can
    // show plain checkboxes.
    indexable: { type: Boolean, default: true },
    followLinks: { type: Boolean, default: true },

    /* ---- social preview ---- */
    ogTitle: { type: String, default: "" },
    ogDescription: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    ogType: { type: String, default: "website" },

    /* ---- structured data ---- */
    // Which JSON-LD blocks to emit. FAQPage is built from the faq blocks,
    // BreadcrumbList from `breadcrumbs`, the rest from the fields above.
    schemaTypes: { type: [String], default: ["WebPage"] },
    breadcrumbs: { type: mongoose.Schema.Types.Mixed, default: undefined }, // [{ name, url }]
    // Anything the presets do not cover. Must be valid JSON; validated in
    // the API before saving so a typo cannot break the live page.
    customSchema: { type: String, default: "" },

    // Article / Course schema details
    authorName: { type: String, default: "" },
    publishedAt: { type: Date, default: Date.now },

    /* ============ CONTENT ============ */
    blocks: { type: [BlockSchema], default: [] },

    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

export default mongoose.models.SeoPage ||
  mongoose.model("SeoPage", SeoPageSchema);
