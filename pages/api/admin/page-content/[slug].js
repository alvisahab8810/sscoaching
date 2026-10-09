import dbConnect from "@/lib/dbConnect";
import PageContent from "@/models/PageContent";
import { logActivity } from "@/lib/logActivity";
import { requireAdminApi } from "@/lib/requireAdminApi";
import { normalizeSections } from "./index";

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
      const page = await PageContent.findOne({ slug }).lean();
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
      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

      const page = await PageContent.findOne({ slug });
      if (!page) {
        return res.status(404).json({ success: false, message: "Page not found" });
      }

      const before = {
        title: page.title,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        isPublished: page.isPublished,
        sections: page.sections.length,
      };

      if (body.title !== undefined) page.title = String(body.title).trim();
      if (body.path !== undefined) page.path = body.path;
      if (body.metaTitle !== undefined) page.metaTitle = body.metaTitle;
      if (body.metaDescription !== undefined)
        page.metaDescription = body.metaDescription;
      if (body.metaKeywords !== undefined) page.metaKeywords = body.metaKeywords;
      if (body.isPublished !== undefined) page.isPublished = !!body.isPublished;
      if (body.sections !== undefined)
        page.sections = normalizeSections(body.sections);

      // content is a Mixed path, so Mongoose needs to be told it changed
      if (body.content !== undefined) {
        page.content = body.content;
        page.markModified("content");
      }

      await page.save();

      await logActivity(req, {
        feature: "pages",
        action: "update",
        entityId: page._id,
        entityType: "PageContent",
        description: `Updated page: "${page.title}" (${page.slug})`,
        before,
        after: {
          title: page.title,
          metaTitle: page.metaTitle,
          metaDescription: page.metaDescription,
          isPublished: page.isPublished,
          sections: page.sections.length,
        },
      });

      return res.status(200).json({ success: true, data: page });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  /* ===================== DELETE ===================== */
  if (req.method === "DELETE") {
    try {
      const page = await PageContent.findOneAndDelete({ slug });
      if (!page) {
        return res.status(404).json({ success: false, message: "Page not found" });
      }

      await logActivity(req, {
        feature: "pages",
        action: "delete",
        entityId: page._id,
        entityType: "PageContent",
        description: `Deleted page: "${page.title}" (${page.slug})`,
        before: { slug: page.slug, title: page.title, sections: page.sections.length },
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
