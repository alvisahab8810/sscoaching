const SITE_URL = "https://sscoaching.in";
const ORG_NAME = "SS Coaching";

/** JSON-LD must carry plain text, not markup. */
function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function absoluteUrl(path) {
  const p = String(path || "");
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) return p;
  return `${SITE_URL}${p.startsWith("/") ? "" : "/"}${p}`;
}

/**
 * Builds the JSON-LD blocks for a SeoPage.
 *
 * Only the types the admin ticked are emitted, and each one is built from
 * content that is actually on the page -- FAQPage from the faq blocks,
 * BreadcrumbList from the breadcrumb list -- so the structured data can
 * never describe something a crawler cannot see on the page itself.
 *
 * Returns an array of objects, one <script type="application/ld+json"> each.
 */
export function buildSchemas(page) {
  if (!page) return [];

  const types = Array.isArray(page.schemaTypes) ? page.schemaTypes : [];
  const url = absoluteUrl(page.canonicalUrl || `/${page.slug}`);
  const name = page.metaTitle || page.title || "";
  const description = page.metaDescription || "";
  const image = absoluteUrl(page.ogImage || "");
  const out = [];

  if (types.includes("WebPage")) {
    out.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name,
      description,
      url,
      ...(image ? { primaryImageOfPage: image } : {}),
      inLanguage: "en-IN",
      isPartOf: {
        "@type": "WebSite",
        name: ORG_NAME,
        url: SITE_URL,
      },
    });
  }

  if (types.includes("Article")) {
    out.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: name,
      description,
      ...(image ? { image: [image] } : {}),
      author: {
        "@type": page.authorName ? "Person" : "Organization",
        name: page.authorName || ORG_NAME,
      },
      publisher: {
        "@type": "Organization",
        name: ORG_NAME,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/assets/images/logo.png`,
        },
      },
      datePublished: toIso(page.publishedAt),
      dateModified: toIso(page.updatedAt || page.publishedAt),
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
    });
  }

  if (types.includes("Course")) {
    out.push({
      "@context": "https://schema.org",
      "@type": "Course",
      name,
      description,
      url,
      provider: {
        "@type": "Organization",
        name: ORG_NAME,
        sameAs: SITE_URL,
      },
    });
  }

  if (types.includes("LocalBusiness")) {
    out.push({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: ORG_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/assets/images/logo.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lucknow",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
    });
  }

  if (types.includes("BreadcrumbList")) {
    const crumbs = Array.isArray(page.breadcrumbs) ? page.breadcrumbs : [];
    const valid = crumbs.filter((c) => c && c.name);

    if (valid.length) {
      out.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: valid.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: absoluteUrl(c.url || ""),
        })),
      });
    }
  }

  if (types.includes("FAQPage")) {
    // Built from the page's own faq blocks, never from a separate list --
    // otherwise the schema and the visible answers could drift apart.
    const faqs = [];

    for (const block of page.blocks || []) {
      if (block?.type !== "faq" || block?.isActive === false) continue;
      for (const item of block.items || []) {
        const q = stripHtml(item?.title);
        const a = stripHtml(item?.text);
        if (q && a) faqs.push({ q, a });
      }
    }

    if (faqs.length) {
      out.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      });
    }
  }

  // Anything the presets do not cover. Already validated as JSON on save,
  // but a stored page could predate that check, so parse defensively.
  if (page.customSchema && String(page.customSchema).trim()) {
    try {
      out.push(JSON.parse(page.customSchema));
    } catch {
      // A broken custom schema is dropped rather than printed, otherwise it
      // would make every other block on the page invalid too.
    }
  }

  return out;
}

function toIso(value) {
  if (!value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

export { stripHtml, SITE_URL };
