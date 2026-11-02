// NIOS study centres + India pincode lookup for the online admission.
// Server only: reads the bundled JSON from data/online-admission (or the
// centres imported into Mongo from the desk's Settings tab).
import fs from "fs";
import path from "path";
import Centre from "@/models/onlineAdmission/Centre";

const DATA_DIR = path.join(process.cwd(), "data", "online-admission");
export const BUNDLED_SYNCED_AT = "2026-11-02";

const FIELDS = ["code", "name", "address", "district", "state", "rc", "pincode", "mobile", "phone", "email",
  "course", "medium", "science", "balance", "lat", "lng", "geo_quality", "type"];
const fromRow = (r) => Object.fromEntries(FIELDS.map((k, i) => [k, r[i]]));

let pins = null;
function getPins() {
  if (!pins) pins = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "pincodes.json"), "utf8"));
  return pins;
}

// Centres change only on an import, so they are kept in memory for a while.
const CACHE_MS = 10 * 60 * 1000;
let cache = null;

export function resetCentreCache() {
  cache = null;
}

export async function loadCentres() {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache;
  let list;
  let source;
  if ((await Centre.estimatedDocumentCount()) > 0) {
    list = (await Centre.find({}).lean()).map(({ _id, __v, ...c }) => c);
    source = "imported";
  } else {
    list = JSON.parse(fs.readFileSync(path.join(DATA_DIR, "centres.json"), "utf8")).map(fromRow);
    source = "bundled";
  }
  cache = { at: Date.now(), list, byCode: new Map(list.map((c) => [c.code, c])), source };
  return cache;
}

export async function findCentre(code) {
  if (!code) return null;
  return (await loadCentres()).byCode.get(String(code)) || null;
}

export const offersCourse = (centre, cls) =>
  (cls === "10" ? /(^|, )Secondary/ : /Senior Secondary/).test(centre?.course || "");

const hav = (a1, o1, a2, o2) => {
  const r = Math.PI / 180;
  const d = Math.sin(((a2 - a1) * r) / 2) ** 2 + Math.cos(a1 * r) * Math.cos(a2 * r) * Math.sin(((o2 - o1) * r) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(d));
};

/** Exact pincode, or an average over the nearest 5/4/3-digit prefix. */
export function pinInfo(pin) {
  pin = String(pin || "").trim();
  if (!/^[1-9]\d{5}$/.test(pin)) return null;
  const P = getPins();
  const r = P[pin];
  if (r) return { pin, lat: r[0], lng: r[1], district: r[2], state: r[3], offices: r[4], exact: true };
  const keys = Object.keys(P);
  for (const n of [5, 4, 3]) {
    const pre = pin.slice(0, n);
    const m = keys.filter((k) => k.startsWith(pre));
    if (m.length) {
      const lat = m.reduce((s, k) => s + P[k][0], 0) / m.length;
      const lng = m.reduce((s, k) => s + P[k][1], 0) / m.length;
      return { pin, lat, lng, district: P[m[0]][2], state: P[m[0]][3], offices: "", exact: false, approx_from: pre + "xxx".slice(0, 6 - n) };
    }
  }
  return null;
}

const SPECIAL = ["Jail / Correction home", "Defence / Agniveer"];
const rank = (c) => c.km + (c.geo_quality === "pincode" ? 0 : c.geo_quality === "district" ? 12 : 150);

/** q: { pin, course, science, medium, iti, special, limit } — values as query strings. */
export async function searchCentres(q) {
  let list = (await loadCentres()).list;
  if (q.special !== "1") list = list.filter((c) => !SPECIAL.includes(c.type));
  if (q.iti !== "1") list = list.filter((c) => c.type !== "ITI");
  if (q.course === "10" || q.course === "12") list = list.filter((c) => offersCourse(c, q.course));
  if (q.science === "1") list = list.filter((c) => c.science === "Yes");
  if (q.medium) list = list.filter((c) => (c.medium || "").toLowerCase().includes(String(q.medium).toLowerCase()));
  const origin = pinInfo(q.pin);
  if (!origin) return null;
  list = list
    .map((c) => ({
      ...c,
      km: Math.round(hav(origin.lat, origin.lng, c.lat, c.lng) * 10) / 10,
      same_pin: c.pincode === origin.pin,
      same_district: (c.district || "").toLowerCase() === (origin.district || "").toLowerCase(),
    }))
    .sort((a, b) => b.same_pin - a.same_pin || rank(a) - rank(b));
  return { origin, total: list.length, results: list.slice(0, Math.min(+q.limit || 30, 200)) };
}

export async function centreStates() {
  const { list, source } = await loadCentres();
  const st = {};
  for (const c of list) {
    const s = (st[c.state] = st[c.state] || { state: c.state, n: 0, general: 0, districts: new Set() });
    s.n++;
    if (c.type === "General") s.general++;
    s.districts.add(c.district);
  }
  return {
    source,
    total: list.length,
    states: Object.values(st)
      .sort((a, b) => String(a.state).localeCompare(String(b.state)))
      .map((s) => ({ ...s, districts: [...s.districts] })),
  };
}

/** Geocodes an imported centre from its pincode (exact, else district centre). */
export function geocode(c) {
  const P = getPins();
  const r = P[c.pincode];
  if (r) return { lat: r[0], lng: r[1], geo_quality: "pincode" };
  const d = String(c.district || "").toLowerCase();
  const inDistrict = Object.values(P).filter((x) => String(x[2]).toLowerCase() === d);
  if (inDistrict.length) {
    return {
      lat: inDistrict.reduce((s, x) => s + x[0], 0) / inDistrict.length,
      lng: inDistrict.reduce((s, x) => s + x[1], 0) / inDistrict.length,
      geo_quality: "district",
    };
  }
  const near = pinInfo(c.pincode);
  return near ? { lat: near.lat, lng: near.lng, geo_quality: "state" } : { lat: 0, lng: 0, geo_quality: "none" };
}
