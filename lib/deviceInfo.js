/**
 * Which device a request came from, for the admin watch-time report.
 *
 * The app sends X-Source: app plus X-Device-Model / X-Device-OS /
 * X-App-Version (src/api/config.ts). App builds older than those headers
 * only tell okhttp (Android) from CFNetwork (iOS). The website is read from
 * the User-Agent, with X-Device-Model from Chrome's client hints when the
 * browser gives it.
 */

const clean = (v) => String(v || "").replace(/[^\x20-\x7e]/g, "").trim().slice(0, 60);

function webOs(ua) {
  let m;
  if ((m = ua.match(/Android\s([\d.]+)/))) return { name: "Android", full: `Android ${m[1]}` };
  if ((m = ua.match(/(?:iPhone|CPU) OS (\d+)[_.](\d+)/))) return { name: /iPad/.test(ua) ? "iPadOS" : "iOS", full: `${/iPad/.test(ua) ? "iPadOS" : "iOS"} ${m[1]}.${m[2]}` };
  if (/Windows NT/.test(ua)) return { name: "Windows", full: "Windows" };
  if (/CrOS/.test(ua)) return { name: "ChromeOS", full: "ChromeOS" };
  if (/Mac OS X/.test(ua)) return { name: "macOS", full: "macOS" };
  if (/Linux/.test(ua)) return { name: "Linux", full: "Linux" };
  return { name: "Other", full: "Other" };
}

function webBrowser(ua) {
  const list = [
    ["Edge", /Edg(?:A|iOS)?\/(\d+)/],
    ["Samsung Internet", /SamsungBrowser\/(\d+)/],
    ["Opera", /(?:OPR|OPT)\/(\d+)/],
    ["Firefox", /(?:Firefox|FxiOS)\/(\d+)/],
    ["Chrome", /(?:Chrome|CriOS)\/(\d+)/],
    ["Safari", /Version\/(\d+).*Safari/],
  ];
  for (const [name, re] of list) {
    const m = ua.match(re);
    if (m) return { name, full: `${name} ${m[1]}` };
  }
  return { name: "Browser", full: "Browser" };
}

function webDevice(ua, os, hintModel) {
  if (hintModel) return hintModel;
  if (os === "Android") {
    const m = ua.match(/Android\s[\d.]+;\s([^;)]+)/);
    const model = m && clean(m[1].replace(/\sBuild\/.*/, ""));
    return model && model !== "K" ? model : "Android phone";
  }
  if (/iPad/.test(ua)) return "iPad";
  if (/iPhone/.test(ua)) return "iPhone";
  if (os === "Windows") return "Windows PC";
  if (os === "macOS") return "Mac";
  if (os === "ChromeOS") return "Chromebook";
  if (os === "Linux") return "Linux PC";
  return "Unknown";
}

// { key, source, device, os, client } -- key stays the same across browser
// and OS updates so one phone stays one row.
export function deviceFromRequest(req) {
  const h = req.headers || {};
  const ua = String(h["user-agent"] || "");

  if (h["x-source"] === "app") {
    let os = clean(h["x-device-os"]);
    if (!os) os = /okhttp/i.test(ua) ? "Android" : /CFNetwork|Darwin/i.test(ua) ? "iOS" : "";
    const osName = os.split(" ")[0] || "Unknown";
    const model = clean(h["x-device-model"]);
    const device = model || (osName === "Android" ? "Android phone" : osName === "iOS" || osName === "iPadOS" ? "iPhone / iPad" : "Unknown");
    const version = clean(h["x-app-version"]);
    return {
      key: `app|${osName}|${model || "-"}`,
      source: "app",
      device,
      os: os || "Unknown",
      client: version ? `App v${version}` : "App",
    };
  }

  const os = webOs(ua);
  const browser = webBrowser(ua);
  const device = webDevice(ua, os.name, clean(h["x-device-model"]));
  return {
    key: `web|${os.name}|${device}|${browser.name}`,
    source: "web",
    device,
    os: os.full,
    client: browser.full,
  };
}
