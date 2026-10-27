/**
 * Scores a SeoPage against the checks that actually move a page in search.
 *
 * Shared by the list (badge) and the builder (checklist), so a page can
 * never show 80% in one place and a different number in the other.
 *
 * The list endpoint does not send blocks, so every block-based check is
 * skipped when they are missing rather than counted as failed -- otherwise
 * a complete page would look broken in the list.
 */

const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 160;

function text(html) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Every word of the keyword appears somewhere in the haystack. */
function hasKeyword(haystack, keyword) {
  const k = String(keyword || "").trim().toLowerCase();
  if (!k) return false;
  const h = String(haystack || "").toLowerCase();
  return k.split(/\s+/).every((word) => h.includes(word));
}

export function seoScore(page) {
  if (!page) return { percent: 0, variant: "secondary", checks: [] };

  const checks = [];
  const add = (label, pass, hint) => checks.push({ label, pass, hint });

  const metaTitle = String(page.metaTitle || "").trim();
  const metaDescription = String(page.metaDescription || "").trim();
  const keyword = String(page.focusKeyword || "").trim();
  const blocks = Array.isArray(page.blocks) ? page.blocks : null;

  /* ---------- meta ---------- */
  add(
    `SEO title is ${TITLE_MIN}-${TITLE_MAX} characters`,
    metaTitle.length >= TITLE_MIN && metaTitle.length <= TITLE_MAX,
    metaTitle
      ? `Currently ${metaTitle.length} characters. Google cuts off around ${TITLE_MAX}.`
      : "Not set yet. Google will fall back to the page title."
  );

  add(
    `Meta description is ${DESC_MIN}-${DESC_MAX} characters`,
    metaDescription.length >= DESC_MIN && metaDescription.length <= DESC_MAX,
    metaDescription
      ? `Currently ${metaDescription.length} characters.`
      : "Not set yet. Google will pick a random sentence from the page."
  );

  add("Focus keyword is set", !!keyword, "The one phrase this page should rank for.");

  add(
    "URL is short and readable",
    String(page.slug || "").length > 0 && String(page.slug || "").length <= 60,
    "Keep it under 60 characters with the keyword in it."
  );

  add(
    "Social share image is set",
    !!String(page.ogImage || "").trim(),
    "Shown when the page is shared on WhatsApp or Facebook."
  );

  /* ---------- keyword placement ---------- */
  if (keyword) {
    add(
      "Keyword is in the SEO title",
      hasKeyword(metaTitle || page.title, keyword),
      "Best near the beginning of the title."
    );
    add(
      "Keyword is in the meta description",
      hasKeyword(metaDescription, keyword),
      "Google bolds it in the search result."
    );
    add(
      "Keyword is in the URL",
      hasKeyword(String(page.slug || "").replace(/-/g, " "), keyword),
      "Use hyphens between the words."
    );
  }

  /* ---------- content (only when blocks were loaded) ---------- */
  if (blocks) {
    const active = blocks.filter((b) => b && b.isActive !== false);

    const h1Count = active.filter((b) => b.headingLevel === "h1" && b.heading).length;
    add(
      "Exactly one H1 on the page",
      h1Count === 1,
      h1Count === 0
        ? "Set the hero (or first) section heading to H1."
        : `There are ${h1Count} H1 headings. Search engines expect one.`
    );

    add(
      "At least one H2 heading",
      active.some((b) => b.headingLevel === "h2" && b.heading),
      "H2 headings break the page into topics Google can read."
    );

    add("At least 7 sections", active.length >= 7, `Currently ${active.length}.`);

    const words = active
      .map((b) => [b.heading, b.subheading, text(b.html), (b.items || []).map((i) => `${i.title} ${text(i.text)}`).join(" ")].join(" "))
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;

    add("Page has 300+ words", words >= 300, `Currently about ${words} words.`);

    if (keyword) {
      const body = active.map((b) => `${b.heading} ${b.subheading} ${text(b.html)}`).join(" ");
      add(
        "Keyword appears in the page content",
        hasKeyword(body, keyword),
        "Use it naturally in the first paragraph and a heading."
      );
    }

    const images = active.filter((b) => b.image);
    add(
      "All images have alt text",
      images.length === 0 || images.every((b) => String(b.imageAlt || "").trim()),
      "Alt text describes the image for Google and screen readers."
    );

    add(
      "Has an FAQ section",
      active.some((b) => b.type === "faq" && (b.items || []).length),
      "FAQs can win the extra drop-down space in search results."
    );

    add(
      "Has a call-to-action",
      active.some((b) => b.buttonText || b.type === "cta"),
      "Give the visitor the next step."
    );
  }

  /* ---------- technical ---------- */
  add(
    "Page is indexable",
    page.indexable !== false,
    "A noindex page is deliberately hidden from Google."
  );

  add(
    "Structured data selected",
    Array.isArray(page.schemaTypes) && page.schemaTypes.length > 0,
    "At least WebPage should be ticked."
  );

  const passed = checks.filter((c) => c.pass).length;
  const percent = checks.length ? Math.round((passed / checks.length) * 100) : 0;

  return {
    percent,
    passed,
    total: checks.length,
    variant: percent >= 80 ? "success" : percent >= 50 ? "warning" : "danger",
    checks,
  };
}

export default seoScore;
