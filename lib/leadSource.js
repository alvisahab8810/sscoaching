/**
 * Where a lead came from.
 *
 * The visitor's first landing of the session is recorded in the browser
 * (UTM tags, the ad click ids Google and Meta append, and the referring site).
 * It is then attached to whatever form they finally submit, which can be many
 * pages later, and the server turns it into one readable source label.
 *
 * resolveLeadSource() is pure and has no browser APIs in it, so the same
 * function runs on the server when the lead is saved.
 */

export const LEAD_SOURCES = [
  "Instagram",
  "Facebook",
  "YouTube",
  "Google Ads",
  "Meta Ads",
  "Organic (Web Search)",
  "Direct",
  "Referral",
];

const STORAGE_KEY = "ss_lead_attr";

const has = (value, ...needles) => {
  const v = String(value || "").toLowerCase();
  return needles.some((n) => v.includes(n));
};

/**
 * Turns raw attribution into one of LEAD_SOURCES.
 * Paid markers are checked first: a click id or a paid medium means the visit
 * was bought, even though the referrer is the same social or search site.
 */
export function resolveLeadSource(attr = {}) {
  const { utmSource = "", utmMedium = "", gclid = "", fbclid = "", referrer = "" } = attr;

  let referrerHost = "";
  try {
    if (referrer) referrerHost = new URL(referrer).hostname.toLowerCase();
  } catch {
    referrerHost = String(referrer).toLowerCase();
  }

  const paidMedium = has(utmMedium, "cpc", "ppc", "paid", "ads", "paidsocial");

  // Paid
  if (gclid || has(utmSource, "googleads", "google_ads", "adwords")) return "Google Ads";
  if (has(utmSource, "google") && paidMedium) return "Google Ads";
  if (fbclid) return "Meta Ads";
  if (has(utmSource, "facebook", "instagram", "meta", "fb", "ig") && paidMedium) return "Meta Ads";

  // Organic social, by tag or by referring site
  if (has(utmSource, "instagram", "ig")) return "Instagram";
  if (has(utmSource, "facebook", "fb")) return "Facebook";
  if (has(utmSource, "youtube", "yt")) return "YouTube";
  if (has(referrerHost, "instagram.")) return "Instagram";
  if (has(referrerHost, "facebook.", "fb.com", "fb.me")) return "Facebook";
  if (has(referrerHost, "youtube.", "youtu.be")) return "YouTube";

  // Search
  if (has(utmMedium, "organic")) return "Organic (Web Search)";
  if (has(referrerHost, "google.", "bing.", "yahoo.", "duckduckgo.", "ecosia.", "brave."))
    return "Organic (Web Search)";

  if (referrerHost) return "Referral";
  if (utmSource) return "Referral";
  return "Direct";
}

/**
 * Records the landing details once per browser session. A later visit that
 * arrives with its own UTM tags or from a different site overwrites it, so the
 * most recent real campaign is the one credited.
 */
export function captureLeadSource() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const get = (k) => params.get(k) || "";

    const incoming = {
      utmSource: get("utm_source"),
      utmMedium: get("utm_medium"),
      utmCampaign: get("utm_campaign"),
      gclid: get("gclid"),
      fbclid: get("fbclid"),
      referrer: document.referrer || "",
      landingPage: window.location.pathname + window.location.search,
      capturedAt: new Date().toISOString(),
    };

    const sameSiteReferrer =
      incoming.referrer && incoming.referrer.includes(window.location.hostname);

    const isNewVisit =
      incoming.utmSource || incoming.gclid || incoming.fbclid || (incoming.referrer && !sameSiteReferrer);

    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored && !isNewVisit) return;

    // An internal referrer tells us nothing about where the visitor came from.
    if (sameSiteReferrer) incoming.referrer = "";

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(incoming));
  } catch {
    // Storage can be blocked; the lead is then simply saved without a source.
  }
}

export function getLeadAttribution() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}
