import dbConnect from "@/lib/dbConnect";
import SeoPage from "@/models/SeoPage";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { logActivity } from "@/lib/logActivity";

/** Slugs that a file in pages/ already serves -- a SeoPage with one of
 *  these would be saved but never reachable, because Next.js matches the
 *  static route first. Better to reject it than to leave the admin
 *  wondering why their page does not open. */
const RESERVED_SLUGS = new Set([
  "api", "dashboard", "blogs", "faq", "gallery", "about-us", "contact-us",
  "sitemap", "onlineforms", "disclaimer", "privacy-policy", "refund-policy",
  "terms-&-conditions", "delete-account", "student", "subject",
  "question-papers", "nios-admission", "nios-results", "new-pages",
  "nios-datesheet", "nios-hall-ticket", "nios-mbbs-admission",
  "nios-class-10th-result", "nios-class-12th-result", "404", "_app",
  "_document", "online-classes-time-table", "student-success",
]);

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Admins are trusted, but a stray <script> pasted from another site would
 *  run on every visitor's browser, so it is dropped on the way in. */
function cleanHtml(html) {
  return String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}

const BLOCK_TYPES = new Set([
  "hero", "richtext", "features", "stats", "steps",
  "cta", "faq", "image", "video", "table", "cards", "quote",
]);

/**
 * Re-numbers order from the array position so the sequence shown in the
 * builder is the one stored, and drops unknown fields.
 */
export function normalizeBlocks(blocks) {
  if (!Array.isArray(blocks)) return [];

  return blocks
    .filter((b) => b && BLOCK_TYPES.has(b.type))
    .map((b, i) => ({
      type: b.type,
      order: i,
      isActive: b.isActive !== false,

      heading: String(b.heading || ""),
      headingLevel: ["h1", "h2", "h3", "h4"].includes(b.headingLevel)
        ? b.headingLevel
        : "h2",
      headingHighlight: String(b.headingHighlight || ""),
      subheading: String(b.subheading || ""),
      html: cleanHtml(b.html),

      buttonText: String(b.buttonText || ""),
      buttonUrl: String(b.buttonUrl || ""),
      button2Text: String(b.button2Text || ""),
      button2Url: String(b.button2Url || ""),

      image: String(b.image || ""),
      imageAlt: String(b.imageAlt || ""),
      caption: String(b.caption || ""),
      videoUrl: String(b.videoUrl || ""),

      items: Array.isArray(b.items)
        ? b.items.map((it) => ({
            image: String(it?.image || ""),
            imageAlt: String(it?.imageAlt || ""),
            title: String(it?.title || ""),
            text: cleanHtml(it?.text),
            url: String(it?.url || ""),
          }))
        : undefined,

      columns: Array.isArray(b.columns)
        ? b.columns.map((c) => ({ label: String(c?.label || "") }))
        : undefined,
      rows: Array.isArray(b.rows)
        ? b.rows.map((row) =>
            Array.isArray(row) ? row.map((cell) => ({ html: cleanHtml(cell?.html) })) : []
          )
        : undefined,

      background: ["white", "light", "purple", "dark", "orange"].includes(b.background)
        ? b.background
        : "white",
      align: b.align === "center" ? "center" : "left",
      className: String(b.className || ""),
    }));
}

const SCHEMA_TYPES = new Set([
  "WebPage", "Article", "Course", "LocalBusiness", "BreadcrumbList", "FAQPage",
]);

/** Shared by create and update. Returns { values } or { error }. */
export function buildPayload(body, { partial = false } = {}) {
  const out = {};
  const set = (key, value) => {
    if (!partial || body[key] !== undefined) out[key] = value;
  };

  set("title", String(body.title || "").trim());
  set("metaTitle", String(body.metaTitle || "").trim());
  set("metaDescription", String(body.metaDescription || "").trim());
  set("metaKeywords", String(body.metaKeywords || "").trim());
  set("focusKeyword", String(body.focusKeyword || "").trim());
  set("canonicalUrl", String(body.canonicalUrl || "").trim());
  set("indexable", body.indexable !== false);
  set("followLinks", body.followLinks !== false);

  set("ogTitle", String(body.ogTitle || "").trim());
  set("ogDescription", String(body.ogDescription || "").trim());
  set("ogImage", String(body.ogImage || "").trim());
  set("ogType", String(body.ogType || "website").trim());

  set("authorName", String(body.authorName || "").trim());

  if (!partial || body.schemaTypes !== undefined) {
    out.schemaTypes = Array.isArray(body.schemaTypes)
      ? body.schemaTypes.filter((t) => SCHEMA_TYPES.has(t))
      : ["WebPage"];
  }

  if (!partial || body.breadcrumbs !== undefined) {
    out.breadcrumbs = Array.isArray(body.breadcrumbs)
      ? body.breadcrumbs
          .filter((c) => c && String(c.name || "").trim())
          .map((c) => ({ name: String(c.name).trim(), url: String(c.url || "").trim() }))
      : [];
  }

  if (!partial || body.customSchema !== undefined) {
    const raw = String(body.customSchema || "").trim();
    if (raw) {
      // Invalid JSON here would silently disappear from the live page, so
      // it is rejected at the point the admin can still fix it.
      try {
        JSON.parse(raw);
      } catch (err) {
        return { error: `Custom schema is not valid JSON: ${err.message}` };
      }
    }
    out.customSchema = raw;
  }

  if (!partial || body.publishedAt !== undefined) {
    const d = new Date(body.publishedAt || Date.now());
    out.publishedAt = isNaN(d.getTime()) ? new Date() : d;
  }

  if (!partial || body.status !== undefined) {
    out.status = body.status === "published" ? "published" : "draft";
  }

  if (!partial || body.blocks !== undefined) {
    out.blocks = normalizeBlocks(body.blocks);
  }

  return { values: out };
}

export default async function handler(req, res) {
  // Same permission key as the existing Pages module, so a sub-admin who
  // can edit pages can build them too.
  const session = requireAdminApi(req, "pages");
  if (!session) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  await dbConnect();

  /* ===================== LIST ===================== */
  if (req.method === "GET") {
    try {
      const pages = await SeoPage.find(
        {},
        {
          slug: 1, title: 1, status: 1, updatedAt: 1,
          metaTitle: 1, metaDescription: 1, focusKeyword: 1, blocks: 1,
        }
      )
        .sort({ updatedAt: -1 })
        .lean();

      // The list only needs a count, not every block.
      const data = pages.map(({ blocks, ...p }) => ({
        ...p,
        blockCount: Array.isArray(blocks) ? blocks.length : 0,
      }));

      return res.status(200).json({ success: true, data });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  /* ===================== CREATE ===================== */
  if (req.method === "POST") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

      const title = String(body.title || "").trim();
      const slug = slugify(body.slug || title);

      if (!title || !slug) {
        return res
          .status(400)
          .json({ success: false, message: "Title and URL slug are required" });
      }

      if (RESERVED_SLUGS.has(slug)) {
        return res.status(409).json({
          success: false,
          message: `"/${slug}" is already used by an existing website page. Choose a different URL.`,
        });
      }

      if (await SeoPage.exists({ slug })) {
        return res
          .status(409)
          .json({ success: false, message: `A page with the URL "/${slug}" already exists` });
      }

      const { values, error } = buildPayload(body);
      if (error) return res.status(400).json({ success: false, message: error });

      const page = await SeoPage.create({
        ...values,
        slug,
        title,
        // A brand new page is never published by accident.
        status: body.status === "published" ? "published" : "draft",
      });

      await logActivity(req, {
        feature: "pages",
        action: "create",
        entityId: page._id,
        entityType: "SeoPage",
        description: `Created SEO page: "${page.title}" (/${page.slug})`,
        after: { slug: page.slug, title: page.title, status: page.status },
      });

      return res.status(201).json({ success: true, data: page });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
