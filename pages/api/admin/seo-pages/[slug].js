import dbConnect from "@/lib/dbConnect";
import SeoPage from "@/models/SeoPage";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { logActivity } from "@/lib/logActivity";
import { buildPayload, slugify } from "./index";

export default async function handler(req, res) {
  const session = requireAdminApi(req, "pages");
  if (!session) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  await dbConnect();

  const slug = String(req.query.slug || "").trim().toLowerCase();

  /* ===================== READ ===================== */
  if (req.method === "GET") {
    try {
      const page = await SeoPage.findOne({ slug }).lean();
      if (!page) {
        return res.status(404).json({ success: false, message: "Page not found" });
      }
      return res.status(200).json({ success: true, data: page });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  /* ===================== UPDATE ===================== */
  if (req.method === "PUT") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

      const page = await SeoPage.findOne({ slug });
      if (!page) {
        return res.status(404).json({ success: false, message: "Page not found" });
      }

      // Only the fields actually sent are touched, so the publish toggle in
      // the list can send { status } alone without clearing the content.
      const { values, error } = buildPayload(body, { partial: true });
      if (error) return res.status(400).json({ success: false, message: error });

      const before = {
        title: page.title,
        slug: page.slug,
        status: page.status,
        metaTitle: page.metaTitle,
        blocks: page.blocks.length,
      };

      // Renaming the URL frees the old one, so the old path has to be
      // rebuilt as well or it keeps serving the page from the ISR cache.
      let oldSlug = null;
      if (body.slug !== undefined) {
        const next = slugify(body.slug);
        if (next && next !== page.slug) {
          if (await SeoPage.exists({ slug: next })) {
            return res.status(409).json({
              success: false,
              message: `A page with the URL "/${next}" already exists`,
            });
          }
          oldSlug = page.slug;
          page.slug = next;
        }
      }

      Object.assign(page, values);
      await page.save();

      await logActivity(req, {
        feature: "pages",
        action: "update",
        entityId: page._id,
        entityType: "SeoPage",
        description: `Updated SEO page: "${page.title}" (/${page.slug})`,
        before,
        after: {
          title: page.title,
          slug: page.slug,
          status: page.status,
          metaTitle: page.metaTitle,
          blocks: page.blocks.length,
        },
      });

      await revalidate(res, [page.slug, oldSlug]);

      return res.status(200).json({ success: true, data: page });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  /* ===================== DELETE ===================== */
  if (req.method === "DELETE") {
    try {
      const page = await SeoPage.findOneAndDelete({ slug });
      if (!page) {
        return res.status(404).json({ success: false, message: "Page not found" });
      }

      await logActivity(req, {
        feature: "pages",
        action: "delete",
        entityId: page._id,
        entityType: "SeoPage",
        description: `Deleted SEO page: "${page.title}" (/${page.slug})`,
        before: { slug: page.slug, title: page.title, blocks: page.blocks.length },
      });

      await revalidate(res, [page.slug]);

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}

/**
 * Rebuilds the public page immediately instead of waiting out the 60s ISR
 * window, so an admin who hits Save and then View sees their change.
 *
 * A failure here is not an error the admin needs to see -- the page still
 * refreshes on its own within the minute.
 */
async function revalidate(res, slugs) {
  for (const s of slugs) {
    if (!s) continue;
    try {
      await res.revalidate(`/${s}`);
    } catch (err) {
      console.error(`SEO page revalidate failed for /${s}:`, err.message);
    }
  }
}
