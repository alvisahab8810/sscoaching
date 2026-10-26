import NiosNotification from "@/models/NiosNotification";

// NIOS publishes every order on one plain HTML page - no API and no RSS feed
// exists, so the list is parsed out of the markup.
const SOURCE_URL =
  "https://www.nios.ac.in/notice-boardoffice-order/for-all-orders-office-orders.aspx";
const ORIGIN = "https://www.nios.ac.in";

// That page also carries staff matters (transfers, resignations, medical cards)
// which mean nothing to a student, so only the student-facing sections are kept.
const WANTED_SECTIONS = ["Examination", "Admissions", "Vocational", "Bridge Course"];

// How long a scrape stays fresh before the next request triggers a new one.
export const REFRESH_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes

function stripTags(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function absoluteUrl(href) {
  if (/^https?:\/\//i.test(href)) return href;
  return ORIGIN + (href.startsWith("/") ? href : "/" + href);
}

// Titles carry their own date, e.g. "Notification-57/2026 dt. 31/08/2026 regarding...".
// Both "15/09/2026" and "27.05.2026" occur on the page.
function parseDate(title) {
  const m = title.match(/dt\.?\s*(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})/i);
  if (!m) return null;
  const [, d, mo, y] = m;
  const day = Number(d);
  const month = Number(mo);
  if (day < 1 || day > 31 || month < 1 || month > 12) return null;
  return new Date(Date.UTC(Number(y), month - 1, day));
}

/**
 * Pulls the notice board page apart into plain objects.
 * Exported on its own so it can be tested without touching the database.
 */
export function parseNotifications(html) {
  // NIOS retires an entry by commenting it out rather than deleting it, so the
  // dead markup has to go before anything else is read.
  const live = html.replace(/<!--[\s\S]*?-->/g, "");

  const headings = [...live.matchAll(/<h3>[\s\S]*?<\/h3>/g)].map((m) => ({
    at: m.index,
    name: stripTags(m[0]),
  }));

  const items = [];
  const seen = new Set();

  headings.forEach((heading, i) => {
    if (!WANTED_SECTIONS.some((s) => heading.name.includes(s))) return;

    const end = i + 1 < headings.length ? headings[i + 1].at : live.length;
    const chunk = live.slice(heading.at, end);

    for (const match of chunk.matchAll(/<li>([\s\S]*?)<\/li>/g)) {
      const raw = match[1];
      const href = (raw.match(/href="([^"]+)"/i) || [])[1];
      const title = stripTags(raw);

      // Section intros and stray markup produce short, link-less fragments.
      if (!href || href === "#" || title.length < 15) continue;

      const url = absoluteUrl(href);
      if (seen.has(url)) continue;
      seen.add(url);

      items.push({
        url,
        title,
        section: heading.name,
        publishedAt: parseDate(title),
        isNew: /newgood\.gif/i.test(raw),
      });
    }
  });

  return items;
}

async function fetchSource() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(SOURCE_URL, {
      signal: controller.signal,
      headers: {
        // The site serves a trimmed page to clients without a browser UA.
        "User-Agent":
          "Mozilla/5.0 (compatible; SSCoachingBot/1.0; +https://www.sscoaching.in/)",
        Accept: "text/html",
      },
    });
    if (!res.ok) throw new Error(`NIOS responded ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Scrapes NIOS and writes anything new into the database.
 * Existing rows keep their manual edits (shortTitle, isHidden, pinned).
 * Returns { inserted, updated, total } or throws.
 */
export async function syncNiosNotifications() {
  const html = await fetchSource();
  const items = parseNotifications(html);

  // A layout change on their side would parse as an empty list; wiping our own
  // data in that case would blank the homepage section, so bail out instead.
  if (!items.length) {
    throw new Error("NIOS page parsed to zero notifications - markup changed?");
  }

  const ops = items.map((item) => ({
    updateOne: {
      filter: { url: item.url },
      update: {
        $set: {
          title: item.title,
          section: item.section,
          publishedAt: item.publishedAt,
          isNew: item.isNew,
        },
        $setOnInsert: { firstSeenAt: new Date() },
      },
      upsert: true,
    },
  }));

  const result = await NiosNotification.bulkWrite(ops, { ordered: false });

  return {
    total: items.length,
    inserted: result.upsertedCount || 0,
    updated: result.modifiedCount || 0,
  };
}

// NIOS titles read like "Notification-57/2026 dt. 31/08/2026 regarding practical
// datesheet of NIOS public examination Oct-2026." The reference number and the
// date eat most of a card, so they are dropped for display only - the full
// title stays in the database.
export function tidyTitle(title) {
  let text = title
    .replace(
      /^\s*(?:Notification|Notice|Circular|Office\s*Order)[\s\-]*[\d\/\-]*\s*(?:dt\.?\s*[\d\/.\-]+)?\s*(?:regarding|reg\.?)\s*/i,
      ""
    )
    .replace(/\s*dt\.?\s*\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{4}\s*/i, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) text = title.trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * The newest visible notifications, pinned ones first.
 * Falls back to firstSeenAt for the entries NIOS publishes without a date.
 */
export async function getLatestNotifications(limit = 3) {
  const rows = await NiosNotification.find({ isHidden: { $ne: true } })
    .sort({ pinned: -1, publishedAt: -1, firstSeenAt: -1 })
    .limit(limit)
    .lean();

  return rows.map((row) => ({
    text: row.shortTitle || tidyTitle(row.title),
    href: row.url,
  }));
}
