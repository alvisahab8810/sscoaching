import mongoose from "mongoose";

/**
 * Section-level page content.
 *
 * Frontend pages (e.g. /nios-datesheet) already exist and their layout/CSS
 * must stay exactly as it is. So each page is stored as a list of
 * "sections", where every section renders the same element that is on the
 * page today -- only its content comes from the DB.
 *
 * Section types:
 *   heading -> <h1|h2|h3 class=...>text</h1>   (or wrapped in a span)
 *   table   -> <div class="table-wrapper"><table>...  (columns + rows)
 *   html    -> any raw block (spacer-area paragraphs, buttons, lists)
 */
const SectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["heading", "table", "html"],
      required: true,
    },

    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },

    // ---- heading ----
    level: { type: String, enum: ["h1", "h2", "h3", "h4"], default: "h2" },
    wrapInSpan: { type: Boolean, default: false },
    text: { type: String, default: "" },

    // ---- html ----
    tag: { type: String, default: "div" },
    html: { type: String, default: "" },

    // shared by heading + html
    className: { type: String, default: "" },
    style: { type: String, default: "" },

    // ---- table ----
    // columns: [{ label, className }]
    // rows:    [[{ html, className }], ...]
    // Mixed because rows is a nested array and cells carry inline HTML
    // (<br>, <strong>) -- strict casting buys nothing here.
    columns: { type: mongoose.Schema.Types.Mixed, default: undefined },
    rows: { type: mongoose.Schema.Types.Mixed, default: undefined },
  },
  { _id: true }
);

const PageContentSchema = new mongoose.Schema(
  {
    // URL slug, e.g. "nios-datesheet" (route /nios-datesheet)
    slug: { type: String, required: true, unique: true, trim: true, index: true },

    // Name shown in the admin list
    title: { type: String, required: true, trim: true },

    // Public path -- the admin "View" button links here
    path: { type: String, default: "" },

    // SEO
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: { type: String, default: "" },

    // Flat, HTML-ish pages (e.g. /nios-datesheet) store their body here.
    sections: { type: [SectionSchema], default: [] },

    // Bespoke, heavily designed pages (e.g. /nios-results) keep their JSX and
    // store only the editable text/lists/tables as a nested object. The admin
    // editor walks this structure generically, so no per-page schema is needed.
    content: { type: mongoose.Schema.Types.Mixed, default: undefined },

    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.PageContent ||
  mongoose.model("PageContent", PageContentSchema);
