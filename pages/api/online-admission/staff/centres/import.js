// Replaces the NIOS study-centre list with the TSV downloaded by the sync
// script (components/OnlineAdmission/syncScript.js). Admin only.
import fs from "fs";
import formidable from "formidable";
import Centre from "@/models/onlineAdmission/Centre";
import Settings from "@/models/onlineAdmission/Settings";
import { loadCentres, resetCentreCache, geocode } from "@/lib/onlineAdmission/centres";
import { route, fail, requireStaff, getSettings } from "@/lib/onlineAdmission/server";

export const config = { api: { bodyParser: false } };

const NEED = ["code", "name", "district", "state", "pincode", "course"];

// Type of a centre that is new to us; known codes keep their reviewed type.
function guessType(name) {
  const n = String(name || "").toLowerCase();
  if (/\b(jail|prison|correction|kara(gar)?|bandi)\b/.test(n)) return "Jail / Correction home";
  if (/\b(army|regiment|regtl|bde|brigade|ins |air force|navy|naval|agniveer|bsf|crpf|itbp|cisf|ssb|military)\b/.test(n)) return "Defence / Agniveer";
  if (/\bi\.?\s?t\.?\s?i\b|industrial training/.test(n)) return "ITI";
  return "General";
}

export default route({
  async POST(req) {
    requireStaff(req, { adminOnly: true });
    const form = formidable({ maxFileSize: 20 * 1024 * 1024, maxFiles: 1 });
    let files;
    try {
      [, files] = await form.parse(req);
    } catch {
      throw fail(400, "Could not read the file (20 MB max)");
    }
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) throw fail(400, "Choose the .tsv file");
    const raw = (await fs.promises.readFile(file.filepath, "utf8")).replace(/^﻿/, "");
    fs.promises.unlink(file.filepath).catch(() => {});

    const lines = raw.split(/\r?\n/).filter((l) => l.trim());
    const head = (lines.shift() || "").split("\t").map((h) => h.trim().toLowerCase());
    const missing = NEED.filter((k) => !head.includes(k));
    if (missing.length) throw fail(400, `This is not the NIOS centre file (missing columns: ${missing.join(", ")})`);

    const known = (await loadCentres()).byCode;
    const seen = new Set();
    const rows = [];
    let dropped = 0;
    for (const line of lines) {
      const cells = line.split("\t");
      const o = Object.fromEntries(head.map((h, i) => [h, String(cells[i] ?? "").trim()]));
      if (!/^[A-Za-z]{0,3}\d{3,8}$/.test(o.code) || seen.has(o.code)) { dropped++; continue; }
      seen.add(o.code);
      const old = known.get(o.code);
      const geo = old && old.pincode === o.pincode && old.lat ? { lat: old.lat, lng: old.lng, geo_quality: old.geo_quality } : geocode(o);
      rows.push({
        code: o.code, name: o.name, address: o.address || "", district: o.district, state: o.state, rc: o.rc || "",
        pincode: o.pincode, mobile: o.mobile || "", phone: o.phone || "", email: o.email || "", course: o.course,
        medium: o.medium || "", science: o.science || "", balance: Number(o.balance) || 0,
        ...geo, type: old?.type || guessType(o.name),
      });
    }
    if (rows.length < 1000) throw fail(400, `Only ${rows.length} centres found. The download looks incomplete, so the current list was kept`);

    await Centre.deleteMany({});
    await Centre.insertMany(rows, { ordered: false });
    await getSettings();
    await Settings.updateOne({ _id: "main" }, { $set: { centres_synced_at: new Date() } });
    resetCentreCache();
    return { imported: rows.length, dropped };
  },
});
