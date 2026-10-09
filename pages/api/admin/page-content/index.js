import dbConnect from "@/lib/dbConnect";
import PageContent from "@/models/PageContent";
import { logActivity } from "@/lib/logActivity";
import { requireAdminApi } from "@/lib/requireAdminApi";

export default async function handler(req, res) {
  // Page content controls what the public site shows, so both listing and
  // writing are admin-only. The public page reads the DB directly through
  // getStaticProps, not through this API.
  const session = requireAdminApi(req, "pages");
  if (!session) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  await dbConnect();

  /* ===================== LIST ===================== */
  if (req.method === "GET") {
    try {
      const pages = await PageContent.find(
        {},
        { slug: 1, title: 1, path: 1, isPublished: 1, updatedAt: 1, sections: 1, content: 1 }
      )
        .sort({ updatedAt: -1 })
        .lean();

      // no need to send full sections -- the list only shows a count
      const data = pages.map(({ sections, content, ...p }) => ({
        ...p,
        sectionCount: Array.isArray(sections) ? sections.length : 0,
        // field-based pages (e.g. /nios-results) have no sections; the editor
        // uses this to pick the right editing mode
        fieldCount: content && typeof content === "object" ? Object.keys(content).length : 0,
      }));

      return res.status(200).json({ success: true, data });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  /* ===================== CREATE ===================== */
  if (req.method === "POST") {
    try {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

      const slug = String(body.slug || "")
        .trim()
        .toLowerCase()
        .replace(/^\/+|\/+$/g, "");

      if (!slug || !String(body.title || "").trim()) {
        return res
          .status(400)
          .json({ success: false, message: "slug and title are required" });
      }

      if (await PageContent.exists({ slug })) {
        return res
          .status(409)
          .json({ success: false, message: `Page "${slug}" already exists` });
      }

      const page = await PageContent.create({
        slug,
        title: String(body.title).trim(),
        path: body.path || `/${slug}`,
        metaTitle: body.metaTitle || "",
        metaDescription: body.metaDescription || "",
        metaKeywords: body.metaKeywords || "",
        sections: normalizeSections(body.sections),
        content: body.content,
        isPublished: body.isPublished !== false,
      });

      await logActivity(req, {
        feature: "pages",
        action: "create",
        entityId: page._id,
        entityType: "PageContent",
        description: `Created page: "${page.title}" (${page.slug})`,
        after: { slug: page.slug, title: page.title, sections: page.sections.length },
      });

      return res.status(201).json({ success: true, data: page });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}

/**
 * Re-sets order before saving so the sequence shown in the UI is the one
 * stored in the DB, and drops any unknown fields.
 */
export function normalizeSections(sections) {
  if (!Array.isArray(sections)) return [];

  return sections.map((s, i) => {
    const base = {
      type: s.type,
      order: i,
      isActive: s.isActive !== false,
      className: s.className || "",
      style: s.style || "",
    };

    if (s.type === "heading") {
      return {
        ...base,
        level: s.level || "h2",
        wrapInSpan: !!s.wrapInSpan,
        text: s.text || "",
      };
    }

    if (s.type === "table") {
      return {
        ...base,
        columns: Array.isArray(s.columns)
          ? s.columns.map((c) => ({
              label: c?.label || "",
              className: c?.className || "",
            }))
          : [],
        rows: Array.isArray(s.rows)
          ? s.rows.map((row) =>
              Array.isArray(row)
                ? row.map((cell) => ({
                    html: cell?.html || "",
                    className: cell?.className || "",
                  }))
                : []
            )
          : [],
      };
    }

    return { ...base, tag: s.tag || "div", html: s.html || "" };
  });
}
