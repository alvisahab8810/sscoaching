// Pincode-first NIOS study centre finder, nearest centre first.
import { useEffect, useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { api } from "./client";
import { PinBoxes, Pill, Spinner, cx } from "./ui";
import a from "./App.module.css";
import d from "./Desk.module.css";

const MEDIUMS = ["Hindi", "English", "Urdu", "Bengali", "Marathi", "Telugu", "Tamil", "Kannada", "Malayalam", "Gujarati", "Odia", "Punjabi", "Assamese", "Sanskrit"];

export default function CentreFinder({ pin = "", course = "", science = false, compact = false, onPick }) {
  const step = compact ? 8 : 30;
  const [f, setF] = useState({ pin: /^\d{6}$/.test(pin || "") ? pin : "", course, science, medium: "", iti: false, special: false });
  const [typed, setTyped] = useState(f.pin);
  const [limit, setLimit] = useState(step);
  const [res, setRes] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k, v) => { setF((x) => ({ ...x, [k]: v })); setLimit(step); };

  useEffect(() => {
    if (!f.pin) { setRes(null); setError(""); return; }
    let live = true;
    setBusy(true);
    const q = new URLSearchParams({
      pin: f.pin, course: f.course, science: f.science ? "1" : "", medium: f.medium,
      iti: f.iti ? "1" : "", special: f.special ? "1" : "", limit: String(limit),
    });
    api("GET", `/staff/centres/search?${q}`)
      .then((r) => { if (live) { setRes(r); setError(""); } })
      .catch((e) => { if (live) { setRes(null); setError(e.message); } })
      .finally(() => live && setBusy(false));
    return () => { live = false; };
  }, [f, limit]);

  const o = res?.origin;
  return (
    <div className={d.finder}>
      <div className={d.pinrow}>
        <div>
          <span className={d.pinLbl}>Student pincode</span>
          <PinBoxes
            value={typed}
            autoFocus={!f.pin}
            onChange={(v) => { setTyped(v); if (v.length < 6 && f.pin) set("pin", ""); }}
            onDone={(v) => set("pin", v)}
          />
        </div>
        <div className={d.origin}>
          {o && (
            <>
              <b>{o.district}, {o.state}</b>
              {!o.exact && <span className={a.muted}> (approximate, from {o.approx_from})</span>}
              <div className={cx(a.small, a.muted)}>{res.total.toLocaleString("en-IN")} matching centres, nearest first</div>
            </>
          )}
        </div>
      </div>

      <div className={d.filters}>
        <div className={a.seg}>
          {[["", "Any class"], ["10", "10th"], ["12", "12th"]].map(([v, l]) => (
            <button key={v} type="button" aria-pressed={f.course === v} onClick={() => set("course", v)}>{l}</button>
          ))}
        </div>
        <label><input type="checkbox" checked={f.science} onChange={(e) => set("science", e.target.checked)} /> Science available</label>
        <select value={f.medium} onChange={(e) => set("medium", e.target.value)} aria-label="Medium">
          <option value="">Any medium</option>
          {MEDIUMS.map((m) => <option key={m}>{m}</option>)}
        </select>
        <label><input type="checkbox" checked={f.iti} onChange={(e) => set("iti", e.target.checked)} /> Include ITIs</label>
        <label><input type="checkbox" checked={f.special} onChange={(e) => set("special", e.target.checked)} /> Include jail and defence centres</label>
      </div>

      {!f.pin ? (
        <p className={cx(a.muted, a.small)}>Type the student’s 6-digit pincode to see the nearest centres.</p>
      ) : error ? (
        <p className={cx(a.note, a.noteBad)}>{error}</p>
      ) : !res ? (
        <Spinner />
      ) : (
        <>
          {res.results.map((c) => <CentreCard key={c.code} c={c} onPick={onPick} />)}
          {!res.results.length && <p className={a.muted}>No centre matches these filters. Remove a filter.</p>}
          {res.results.length < res.total && (
            <div>
              <button type="button" className={cx(a.btn, a.ghost, a.sm)} disabled={busy} onClick={() => setLimit((n) => n + step)}>
                {busy ? "Loading…" : "Show more"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function CentreCard({ c, onPick }) {
  const approx = c.geo_quality !== "pincode";
  const maps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent([c.name, c.address, c.district, c.state, c.pincode].filter(Boolean).join(", "));
  const km = Number(c.km) || 0;
  return (
    <div className={cx(d.centre, c.same_pin && d.near)}>
      {c.same_pin ? (
        <div className={d.km}><b>Same</b><span>pincode</span></div>
      ) : approx && c.same_district ? (
        <div className={d.km} title="Exact location unknown: NIOS lists no valid pincode for this centre"><b>In</b><span>district, location approx.</span></div>
      ) : (
        <div className={d.km}><b>{(approx ? "≈" : "") + (km < 10 ? km.toFixed(1) : Math.round(km))}</b><span>{approx ? "km, approx." : "km"}</span></div>
      )}
      <div style={{ minWidth: 0 }}>
        <h4>{c.name}</h4>
        <div className={cx(a.small, a.muted)}>{[c.address, c.district, c.state, c.pincode].filter(Boolean).join(", ")}</div>
        <div className={d.facts}>
          <Pill tone="navy"><span className={a.num}>AI {c.code}</span></Pill>
          <Pill>{c.course || "Courses not listed"}</Pill>
          {c.science === "Yes" && <Pill tone="ok">Science</Pill>}
          {c.medium && <Pill>{c.medium}</Pill>}
          {c.type && c.type !== "General" && <Pill tone="warn">{c.type}</Pill>}
          {c.balance != null && <Pill>{c.balance} seats left</Pill>}
        </div>
        <div className={d.contact}>
          {c.mobile && <a href={`tel:${c.mobile}`}><FiPhone size={14} />{c.mobile}</a>}
          {c.phone && <a href={`tel:${c.phone}`}><FiPhone size={14} />{c.phone}</a>}
          {c.email && <a href={`mailto:${c.email}`}><FiMail size={14} />{c.email}</a>}
          <a href={maps} target="_blank" rel="noopener noreferrer"><FiMapPin size={14} />Map</a>
          <span className={a.muted}>RC {c.rc || "-"}</span>
        </div>
      </div>
      {onPick && (
        <div className={d.pick}>
          <button type="button" className={cx(a.btn, a.sm)} onClick={() => onPick(c)}>Allot this centre</button>
        </div>
      )}
    </div>
  );
}
