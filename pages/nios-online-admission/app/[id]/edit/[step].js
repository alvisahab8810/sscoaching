// The unified admission form: one wizard for every class, stream and block.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { FiAlertCircle, FiCheck, FiChevronRight, FiUpload, FiFile, FiX } from "react-icons/fi";
import StudentShell, { useStudent, toLogin } from "@/components/OnlineAdmission/StudentShell";
import { api, rupee, dateOnly } from "@/components/OnlineAdmission/client";
import { Field, PinBoxes, Pill, Spinner, cx } from "@/components/OnlineAdmission/ui";
import { validateForSubmit } from "@/lib/onlineAdmission/validate";
import a from "@/components/OnlineAdmission/App.module.css";

const STEPS = ["Course", "Personal details", "Address", "Education", "Subjects", "Documents", "Review"];
const STEP_OF = {
  stream: 1, full_name: 2, father_name: 2, mother_name: 2, dob: 2, gender: 2, category: 2, aadhaar: 2, alt_mobile: 2, email: 2, medium: 2,
  "address.pincode": 3, "address.line1": 3, "address.district": 3, "address.state": 3, last_school: 4, board_10: 4, year_10: 4, roll_10: 4,
  highest_class: 4, failed_board: 4, failed_year: 4, failed_roll: 4, toc_subjects: 4, subjects: 5, documents: 6, declaration: 7,
};
const BOARDS_10 = ["NIOS", "CBSE", "CISCE (ICSE)", "UP Board", "BSEB (Bihar)", "MP Board", "RBSE (Rajasthan)", "Other state board"];
const BOARDS_FAILED = ["CBSE", "CISCE (ICSE)", "NIOS", "UP Board", "BSEB (Bihar)", "MP Board", "RBSE (Rajasthan)", "Other state board"];

// Field names for the review checklist, so a bare "Required" still says which field.
const LABELS = {
  stream: "Stream and block", full_name: "Full name", father_name: "Father's name", mother_name: "Mother's name", dob: "Date of birth",
  gender: "Gender", category: "Category", medium: "Medium of study", aadhaar: "Aadhaar number", alt_mobile: "Alternate mobile", email: "Email",
  "address.pincode": "Pincode", "address.line1": "House / street", "address.district": "District", "address.state": "State",
  last_school: "Last school", board_10: "10th board", year_10: "10th year", roll_10: "10th roll number", highest_class: "Last class passed",
  failed_board: "Failed exam board", failed_year: "Failed exam year", failed_roll: "Failed exam roll number", toc_subjects: "TOC subjects",
  subjects: "Subjects", documents: "Documents", declaration: "Declaration",
};

// Field errors show on every step once the student has tried to submit; remembered per tab.
const triedKey = (id) => `oa_tried_${id}`;
function readTried(id) {
  try { return sessionStorage.getItem(triedKey(id)) === "1"; } catch { return false; }
}
function writeTried(id, on) {
  try {
    if (on) sessionStorage.setItem(triedKey(id), "1");
    else sessionStorage.removeItem(triedKey(id));
  } catch { /* private mode */ }
}

export default function AdmissionWizard() {
  const router = useRouter();
  const me = useStudent();
  const { id } = router.query;
  const step = Math.min(Math.max(Number(router.query.step) || 1, 1), 7);
  const [cfg, setCfg] = useState(null);
  const [app, setApp] = useState(null);
  const [error, setError] = useState("");
  const [d, setD] = useState(null); // editable copy: { form, stream, block, subjects }
  const [tried, setTried] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  useEffect(() => {
    if (!me || !id) return;
    (async () => {
      try {
        const [c, x] = await Promise.all([api("GET", "/config"), api("GET", `/my/applications/${id}`)]);
        if (!x.editable) return router.replace(`/nios-online-admission/app/${id}`);
        setCfg(c);
        setApp(x);
        setD({ form: { ...x.form, address: { ...(x.form.address || {}) } }, stream: x.stream, block: x.block || c.current_block, subjects: [...x.subjects] });
        setTried(readTried(id));
      } catch (e) {
        if (e.status === 401) toLogin(router);
        else setError(e.message);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, id]);

  useEffect(() => { window.scrollTo(0, 0); }, [step]);
  useEffect(() => { setServerErrors({}); }, [d, app]);

  // Checked live against what is on screen, with the same rules the server applies on submit.
  const live = useMemo(() => {
    if (!d || !app) return {};
    const docs = app.slots.filter((s) => s.doc).map((s) => ({ type: s.type, current: true, status: s.doc.status }));
    return validateForSubmit({ ...app, form: d.form, stream: d.stream, block: d.block, subjects: d.subjects }, docs).errors;
  }, [d, app]);
  const known = Object.keys(live).length ? live : serverErrors;
  const errors = tried || step === 7 ? known : {};
  const markTried = (e) => { writeTried(id, true); setTried(true); setServerErrors(e || {}); };

  const save = useCallback(async () => {
    const { aadhaar_masked, ...form } = d.form;
    const x = await api("PUT", `/my/applications/${id}`, { form, stream: d.stream, block: d.block, subjects: d.subjects });
    setApp(x);
    return x;
  }, [d, id]);

  const goto = async (n) => {
    try {
      await save();
      router.push(`/nios-online-admission/app/${id}/edit/${n}`, undefined, { scroll: false });
    } catch (e) {
      if (e.status === 409) return router.replace(`/nios-online-admission/app/${id}`);
      toast.error(e.message);
    }
  };

  return (
    <StudentShell title={STEPS[step - 1]} me={me}>
      {error ? (
        <div className={a.card}>
          <h3>Could not load this page</h3>
          <p className={a.muted} style={{ marginTop: 8 }}>{error}</p>
          <Link href="/nios-online-admission/my" className={`${a.btn} ${a.ghost}`}>Go back</Link>
        </div>
      ) : !d ? <Spinner /> : (
        <Wizard
          {...{ id, step, cfg, app, setApp, d, setD, errors, tried, markTried, save, goto, me }}
          onSubmitted={() => router.push(`/nios-online-admission/app/${id}`)}
        />
      )}
    </StudentShell>
  );
}

function Wizard({ id, step, cfg, app, setApp, d, setD, errors, tried, markTried, save, goto, me, onSubmitted }) {
  const [busy, setBusy] = useState(false);
  const f = d.form;
  const E = (k) => errors[k];
  const setForm = (k, v) => setD((p) => {
    const form = { ...p.form };
    if (k.startsWith("address.")) form.address = { ...form.address, [k.slice(8)]: v };
    else form[k] = v;
    return { ...p, form };
  });
  const val = (k) => (k.startsWith("address.") ? f.address?.[k.slice(8)] : f[k]) ?? "";
  const inp = (k, attrs = {}) => <input className={a.input} value={val(k)} onChange={(e) => setForm(k, e.target.value)} {...attrs} />;
  const sel = (k, opts) => (
    <select className={a.input} value={val(k)} onChange={(e) => setForm(k, e.target.value)}>
      <option value="">Select</option>
      {opts.map((o) => { const [v, l] = Array.isArray(o) ? o : [o, o]; return <option key={v} value={v}>{l}</option>; })}
    </select>
  );
  const streamKey = d.stream === "2" ? "2" : `1-${d.block}`;
  const S = cfg.streams[streamKey];

  const submit = async () => {
    setBusy(true);
    try {
      await save();
      await api("POST", `/my/applications/${id}/submit`, {});
      writeTried(id, false);
      toast.success("Submitted. Our consultant will verify your documents.");
      onSubmitted();
    } catch (e) {
      setBusy(false);
      if (e.errors) {
        markTried(e.errors);
        window.scrollTo(0, 0);
      }
      toast.error(e.message);
    }
  };

  const isLast = step === 7;
  return (
    <div className={a.wizGrid}>
      <aside className={cx(a.card, a.wizSide)}>
        <div className={a.wizPkg}>
          <span className={cx(a.small, a.muted)}>Class {app.class}th complete package</span>
          <b>{rupee(app.price)}</b>
        </div>
        <ol className={a.wizNav} aria-label="Form steps">
          {STEPS.map((n, i) => {
            const done = i + 1 < step, now = i + 1 === step;
            return (
              <li key={n}>
                <button type="button" className={cx(done && a.navDone, now && a.navNow)} aria-current={now ? "step" : undefined} onClick={() => !now && goto(i + 1)}>
                  <span className={a.wizNo}>{done ? <FiCheck size={14} strokeWidth={3} /> : i + 1}</span>
                  {n}
                </button>
              </li>
            );
          })}
        </ol>
      </aside>

      <div className={cx(a.card, a.wizMain)}>
        <nav className={a.steps} aria-label="Form progress">
          {STEPS.map((n, i) => (
            <button
              key={n}
              type="button"
              title={n}
              aria-label={`Step ${i + 1}: ${n}`}
              aria-current={i + 1 === step ? "step" : undefined}
              className={i + 1 < step ? a.stDone : i + 1 === step ? a.stNow : ""}
              onClick={() => i + 1 !== step && goto(i + 1)}
            />
          ))}
        </nav>
        <div className={a.stephead}>
          <h2>{STEPS[step - 1]}</h2>
          <span className={`${a.small} ${a.muted} ${a.num}`}>Step {step} of 7</span>
        </div>
        {app.status === "changes_requested" && app.review_note && (
          <div className={`${a.note} ${a.noteBad}`} style={{ marginBottom: 14 }}><b>Consultant: </b>{app.review_note}</div>
        )}

        {step === 1 && <StepCourse {...{ cfg, app, d, setD, S }} />}

        {step === 2 && (
          <>
            <Field label="Full name (exactly as on Aadhaar)" err={E("full_name")}>{inp("full_name", { autoComplete: "name" })}</Field>
            <div className={a.grid2}>
              <Field label="Father's name" err={E("father_name")}>{inp("father_name")}</Field>
              <Field label="Mother's name" err={E("mother_name")}>{inp("mother_name")}</Field>
            </div>
            <div className={a.grid2}>
              <Field label="Date of birth" err={E("dob")} help={`Minimum age: ${app.class === "10" ? 14 : 15} years`}>
                {inp("dob", { type: "date", max: new Date().toISOString().slice(0, 10) })}
              </Field>
              <Field label="Gender" err={E("gender")}>{sel("gender", ["Male", "Female", "Transgender"])}</Field>
            </div>
            <div className={a.grid2}>
              <Field label="Category" err={E("category")}>{sel("category", ["General", "OBC", "SC", "ST", "EWS"])}</Field>
              <Field label="Religion" optional>{sel("religion", ["Hindu", "Muslim", "Sikh", "Christian", "Buddhist", "Jain", "Other"])}</Field>
            </div>
            <Field label="Aadhaar number" err={E("aadhaar")} help="Stored securely. Only your consultant can see the full number.">
              {inp("aadhaar", { inputMode: "numeric", maxLength: 14, autoComplete: "off", placeholder: "12 digits" })}
            </Field>
            <div className={a.grid2}>
              <Field label="Medium of study" err={E("medium")}>{sel("medium", ["Hindi", "English", "Urdu", "Sanskrit", "Other"])}</Field>
              <Field label="Any disability?" optional>{sel("disability", [["no", "No"], ["yes", "Yes"]])}</Field>
            </div>
            <div className={a.grid2}>
              <Field label="Main mobile" help="Your login number"><input className={a.input} value={me.mobile} readOnly /></Field>
              <Field label="Alternate mobile" err={E("alt_mobile")} help="A second active number (parent or guardian)">
                {inp("alt_mobile", { inputMode: "numeric", maxLength: 10, autoComplete: "tel-national" })}
              </Field>
            </div>
            <Field label="Email" optional err={E("email")}>{inp("email", { type: "email", autoComplete: "email" })}</Field>
          </>
        )}

        {step === 3 && <StepAddress {...{ f, setForm, inp, E }} />}

        {step === 4 && (
          <>
            <Field label="Name of the last school you attended" err={E("last_school")}>{inp("last_school")}</Field>
            {app.class === "10" && d.stream === "1" && (
              <Field label="Last class you passed" err={E("highest_class")} help="You will upload the class 8th/9th result or a Nagar Nigam birth certificate">
                {sel("highest_class", [["8th", "Class 8th pass"], ["9th", "Class 9th pass"], ["9th-fail", "Class 9th, not passed"], ["none", "No formal schooling (self-certificate)"]])}
              </Field>
            )}
            {app.class === "12" && (
              <>
                <h4 style={{ margin: "6px 0 10px" }}>Class 10th details</h4>
                <Field label="Board" err={E("board_10")}>{sel("board_10", BOARDS_10)}</Field>
                <div className={a.grid2}>
                  <Field label="Year of passing" err={E("year_10")}>{inp("year_10", { inputMode: "numeric", maxLength: 4 })}</Field>
                  <Field label="Roll number" err={E("roll_10")}>{inp("roll_10")}</Field>
                </div>
              </>
            )}
            {(d.stream === "2" || f.toc_wanted) && (
              <>
                <h4 style={{ margin: "12px 0 10px" }}>The Class {app.class}th exam you did not clear</h4>
                <Field label="Board" err={E("failed_board")}>{sel("failed_board", BOARDS_FAILED)}</Field>
                <div className={a.grid2}>
                  <Field label="Year of exam" err={E("failed_year")}>{inp("failed_year", { inputMode: "numeric", maxLength: 4 })}</Field>
                  <Field label="Roll number" err={E("failed_roll")}>{inp("failed_roll")}</Field>
                </div>
                <TocList list={f.toc_subjects || []} max={S.maxToc} err={E("toc_subjects")} onChange={(v) => setForm("toc_subjects", v)} />
              </>
            )}
          </>
        )}

        {step === 5 && <StepSubjects {...{ cfg, app, d, setD, E }} />}

        {step === 6 && <StepDocuments {...{ id, app, setApp, save, E, d }} />}

        {step === 7 && <StepReview {...{ id, cfg, app, d, S, me, errors, tried, setForm, goto }} />}

        <div className={a.wizActions}>
          {step > 1 ? (
            <button type="button" className={`${a.btn} ${a.ghost}`} onClick={() => goto(step - 1)}>Back</button>
          ) : (
            <LaterBtn id={id} save={save} />
          )}
          <button type="button" className={`${a.btn} ${a.lime}`} disabled={busy} onClick={() => (isLast ? submit() : goto(step + 1))}>
            {isLast ? (busy ? "Submitting…" : app.status === "changes_requested" ? "Resubmit for verification" : "Submit for verification") : "Save and continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

function LaterBtn({ id, save }) {
  const router = useRouter();
  const later = async () => {
    try { await save(); } catch { /* still leave */ }
    router.push(`/nios-online-admission/app/${id}`);
  };
  return <button type="button" className={`${a.btn} ${a.ghost}`} onClick={later}>Later</button>;
}

function StepCourse({ cfg, app, d, setD, S }) {
  const set = (p) => setD((x) => ({ ...x, ...p }));
  const toc = !!d.form.toc_wanted;
  return (
    <>
      <div className={a.note}>
        Class {app.class}th ({app.class === "10" ? "Secondary" : "Senior Secondary"}), {rupee(app.price)}. To change class, go back and pick the other package.
      </div>
      <h4 style={{ marginTop: 18 }}>Which stream fits you?</h4>
      <div className={a.choices} style={{ marginTop: 10 }}>
        <label className={a.choice}>
          <input type="radio" name="stream" checked={d.stream === "1"} onChange={() => set({ stream: "1", block: d.block || cfg.current_block })} />
          <div><b>Stream 1, fresh admission</b><div className={`${a.small} ${a.muted}`}>{cfg.streams["1-1"].who}</div></div>
        </label>
        <label className={a.choice}>
          <input type="radio" name="stream" checked={d.stream === "2"} onChange={() => set({ stream: "2" })} />
          <div><b>Stream 2, failed or compartment</b><div className={`${a.small} ${a.muted}`}>{cfg.streams["2"].who}</div></div>
        </label>
      </div>

      {d.stream === "1" && (
        <div>
          <h4 style={{ marginTop: 20 }}>Which block?</h4>
          <div className={a.choices} style={{ marginTop: 10 }}>
            {["1", "2"].map((b) => (
              <label key={b} className={a.choice}>
                <input type="radio" name="block" checked={d.block === b} onChange={() => set({ block: b })} />
                <div>
                  <b>Block {b}</b>
                  {cfg.current_block === b && <Pill tone="lime" style={{ marginLeft: 8 }}>Open now</Pill>}
                  <div className={`${a.small} ${a.muted}`}>
                    {cfg.streams["1-" + b].exam} exam, {cfg.streams["1-" + b].window.replace("NIOS admission window: ", "admission ")}
                  </div>
                </div>
              </label>
            ))}
          </div>
          <label className={a.choice} style={{ marginTop: 10 }}>
            <input type="checkbox" checked={toc} onChange={(e) => setD((x) => ({ ...x, form: { ...x.form, toc_wanted: e.target.checked } }))} />
            <div>
              <b>I failed this class before and want to carry passed subjects (TOC)</b>
              <div className={`${a.small} ${a.muted}`}>Transfer of Credit: up to {cfg.streams["1-1"].maxToc} passed subjects. Keep the original failed marksheet ready.</div>
            </div>
          </label>
        </div>
      )}

      {S && (
        <div className={`${a.card} ${a.flat}`} style={{ marginTop: 14 }}>
          <h4>{S.label}: {S.exam} exam</h4>
          <p className={`${a.small} ${a.muted}`}>{S.window}</p>
          <dl className={a.timelineMini}>
            {S.timeline.map(([k, v]) => <Pair key={k} k={k} v={v} />)}
          </dl>
          <p className={a.small} style={{ marginTop: 10 }}>
            {S.tma ? "TMA (assignments) are part of your result. SS helps you with every subject." : "No TMA in Stream 2. You appear directly in the exam."}
          </p>
        </div>
      )}
    </>
  );
}

const Pair = ({ k, v }) => (<><dt>{k}</dt><dd>{v}</dd></>);

function StepAddress({ f, setForm, inp, E }) {
  const [info, setInfo] = useState(null); // { tone, text }
  const [offices, setOffices] = useState([]);
  const pin = f.address?.pincode || "";
  const lastLooked = useRef("");

  const lookup = useCallback(async (p) => {
    if (lastLooked.current === p) return;
    lastLooked.current = p;
    setInfo({ tone: "muted", text: `Looking up ${p}…` });
    try {
      const r = await api("GET", `/pincode/${p}`);
      setForm("address.district", r.district);
      setForm("address.state", r.state);
      setOffices(r.offices || []);
      setInfo({ tone: "ok", text: `${r.district}, ${r.state}` });
    } catch {
      setOffices([]);
      setInfo({ tone: "bad", text: "We could not find this pincode. Check it, or type your district and state below." });
    }
  }, [setForm]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (/^\d{6}$/.test(pin)) lookup(pin); }, []);

  const color = { ok: "var(--ok)", bad: "var(--bad)", muted: "var(--muted)" };
  return (
    <>
      <div className={`${a.card} ${a.flat}`}>
        <span className={a.lbl} style={{ marginBottom: 8 }}>Start with your pincode</span>
        <PinBoxes
          value={pin}
          autoFocus
          onChange={(v) => { setForm("address.pincode", v); if (v.length < 6) { lastLooked.current = ""; setInfo(null); } }}
          onDone={lookup}
        />
        <div className={a.small} style={{ minHeight: 22, marginTop: 8, color: color[info?.tone], fontWeight: info?.tone === "ok" ? 600 : 400 }}>
          {info?.text}
        </div>
        {E("address.pincode") && <div className={a.err}>{E("address.pincode")}</div>}
        <p className={`${a.tiny} ${a.muted}`} style={{ marginTop: 6 }}>Your pincode decides the nearest NIOS study centre we book for you.</p>
      </div>
      <div style={{ height: 14 }} />
      <Field label="Post office" optional>
        <select className={a.input} value={f.address?.post_office || ""} onChange={(e) => setForm("address.post_office", e.target.value)}>
          <option value="">{offices.length ? "Select your post office" : "Enter the pincode first"}</option>
          {[...new Set([...(f.address?.post_office && !offices.includes(f.address.post_office) ? [f.address.post_office] : []), ...offices])].map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </Field>
      <Field label="House no., street, locality" err={E("address.line1")}>{inp("address.line1", { autoComplete: "address-line1" })}</Field>
      <Field label="Village / town / city" optional>{inp("address.city", { autoComplete: "address-level2" })}</Field>
      <div className={a.grid2}>
        <Field label="District" err={E("address.district")}>{inp("address.district")}</Field>
        <Field label="State" err={E("address.state")}>{inp("address.state")}</Field>
      </div>
    </>
  );
}

function TocList({ list, max, err, onChange }) {
  const upd = (i, k, v) => onChange(list.map((t, j) => (j === i ? { ...t, [k]: v } : t)));
  return (
    <div className={a.field}>
      <span className={a.lbl}>Passed subjects to transfer (TOC)</span>
      <div className={a.help} style={{ marginBottom: 8 }}>Up to {max}. Your consultant checks these against the marksheet.</div>
      {list.map((t, i) => (
        <div key={i} className={a.row} style={{ marginBottom: 8 }}>
          <input className={`${a.input} ${a.grow}`} value={t.name || ""} placeholder="Passed subject" onChange={(e) => upd(i, "name", e.target.value)} />
          <input className={a.input} style={{ width: 90 }} value={t.marks || ""} placeholder="Marks" inputMode="numeric" onChange={(e) => upd(i, "marks", e.target.value.replace(/\D/g, "").slice(0, 3))} />
          <button type="button" className={`${a.btn} ${a.ghost} ${a.sm}`} aria-label="Remove" onClick={() => onChange(list.filter((_, j) => j !== i))}><FiX size={14} /></button>
        </div>
      ))}
      {list.length < max && (
        <button type="button" className={`${a.btn} ${a.ghost} ${a.sm}`} onClick={() => onChange([...list, {}])}>+ Add passed subject</button>
      )}
      {err && <div className={a.err}>{err}</div>}
    </div>
  );
}

function StepSubjects({ cfg, app, d, setD, E }) {
  const list = cfg.subjects[app.class];
  const s2 = d.stream === "2";
  const groups = [...new Set(list.map((x) => x.group))];
  const gname = { A: "Languages (Group A)", B: s2 ? "Other subjects" : "Group B", C: "Group C", D: "Group D", E: "Group E", F: "Group F" };
  const chosen = d.subjects.map(Number);
  const selected = chosen.map((c) => list.find((x) => x.code === c)).filter(Boolean);
  const langs = selected.filter((x) => x.group === "A").length;
  const msgs = [];
  if (s2) {
    if (!selected.length) msgs.push("Pick the subjects you want to appear in");
    if (selected.length > 4) msgs.push("Up to 4 subjects in Stream 2");
  } else {
    if (selected.length < 5) msgs.push(`${5 - selected.length} more to reach 5`);
    if (selected.length > 7) msgs.push("Maximum 7");
    if (langs < 1) msgs.push("Add a language");
    if (langs > 2) msgs.push("At most 2 languages");
  }
  const toggle = (code, on) => setD((x) => ({ ...x, subjects: on ? [...x.subjects.map(Number), code] : x.subjects.map(Number).filter((c) => c !== code) }));

  return (
    <>
      <p className={`${a.small} ${a.muted}`}>
        {s2 ? "Choose only the subjects you need to clear (up to 4)." : "Pick 5 subjects, with one or two languages. You can add up to 2 more."}
      </p>
      {app.class === "12" && !s2 && (
        <p className={`${a.small} ${a.muted}`}>For 12th, pick one subject from each of Groups C to F to avoid exam-date clashes.</p>
      )}
      <div className={`${a.counter} ${msgs.length ? "" : a.counterOk}`}>
        <div className={a.counterTop}>
          <div className={a.counterStats}>
            <span><b className={a.num}>{selected.length}</b>{s2 ? " / 4" : " / 5"} subjects</span>
            {!s2 && <span><b className={a.num}>{langs}</b> {langs === 1 ? "language" : "languages"}</span>}
          </div>
          <span className={a.counterMsg}>
            {msgs.length ? msgs.join(" · ") : <><FiCheck size={15} strokeWidth={3} /> Ready to continue</>}
          </span>
        </div>
        <div className={a.meter}><i style={{ width: `${Math.min(100, (selected.length / (s2 ? 4 : 5)) * 100)}%` }} /></div>
        {selected.length > 0 && (
          <div className={a.chips}>
            {selected.map((x) => (
              <button type="button" key={x.code} onClick={() => toggle(x.code, false)} aria-label={`Remove ${x.name}`}>
                {x.name} <span aria-hidden>×</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {groups.map((g) => {
        const items = list.filter((x) => x.group === g);
        const n = items.filter((x) => chosen.includes(x.code)).length;
        return (
          <section key={g} className={a.subjGroup}>
            <div className={a.subjHead}>
              <span className={a.subjLetter}>{s2 && g === "B" ? "•" : g}</span>
              <h4>{gname[g]}</h4>
              {n > 0 && <span className={a.subjCount}>{n} selected</span>}
            </div>
            <div className={a.subjGrid}>
              {items.map((x) => {
                const on = chosen.includes(x.code);
                return (
                  <label key={x.code} className={`${a.subj} ${on ? a.subjOn : ""}`}>
                    <input type="checkbox" checked={on} onChange={(e) => toggle(x.code, e.target.checked)} />
                    <span className={a.subjBox} aria-hidden>{on && <FiCheck size={13} strokeWidth={3.5} />}</span>
                    <span className={a.subjName}>
                      {x.name}
                      <small className={a.num}>Code {x.code}</small>
                    </span>
                    {x.practical && <span className={a.pr}>Practical</span>}
                  </label>
                );
              })}
            </div>
          </section>
        );
      })}
      {E("subjects") && <div className={`${a.note} ${a.noteBad}`}>{E("subjects")}</div>}
    </>
  );
}

function StepDocuments({ id, app, setApp, save, E, d }) {
  const [saved, setSaved] = useState(false);
  // Which slots show depends on the saved stream / TOC / category, so save once first.
  useEffect(() => {
    save().catch(() => {}).finally(() => setSaved(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!saved) return <Spinner />;
  return (
    <>
      <p className={`${a.small} ${a.muted}`}>Clear photos or PDF, up to 5 MB each. Our consultant checks every file before your payment opens.</p>
      {app.slots.map((sl) => <DocSlot key={sl.type} id={id} slot={sl} setApp={setApp} />)}
      {E("documents") && <div className={`${a.note} ${a.noteBad}`}>{E("documents")}</div>}
      {(d.stream === "2" || d.form.toc_wanted) && (
        <div className={a.note} style={{ marginTop: 12 }}>
          Keep your ORIGINAL failed marksheet safe. NIOS needs it for Transfer of Credit; your consultant will tell you how to hand it over.
        </div>
      )}
    </>
  );
}

function DocSlot({ id, slot, setApp }) {
  const ref = useRef(null);
  const [state, setState] = useState("idle"); // idle | uploading | failed
  const doc = slot.doc;

  const upload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("File is larger than 5 MB. Use a smaller photo or PDF.");
    if (slot.accept === "image" && !file.type.startsWith("image/")) return toast.error("Upload a photo (JPG or PNG) for this one");
    const fd = new FormData();
    fd.append("type", slot.type);
    fd.append("file", file);
    setState("uploading");
    try {
      setApp(await api("POST", `/my/applications/${id}/documents`, fd));
      toast.success(slot.label + " uploaded");
      setState("idle");
    } catch (err) {
      toast.error(err.message);
      setState("failed");
    }
  };

  return (
    <div className={cx(a.docslot, doc?.status === "rejected" && a.docRejected)}>
      <div className={a.thumb}>
        {doc?.mime?.startsWith("image/") ? <img src={doc.url} alt="" /> : doc ? <FiFile size={22} /> : <FiUpload size={22} />}
      </div>
      <div>
        <b>{slot.label}{slot.required ? <span className={a.req}> *</span> : <span className={`${a.muted} ${a.small}`}> (if applicable)</span>}</b>
        <div className={`${a.small} ${a.muted}`}>{slot.hint}</div>
        {doc && (
          <div className={a.small} style={{ marginTop: 4 }}>
            {doc.status === "rejected"
              ? <span style={{ color: "var(--bad)", fontWeight: 600 }}>Rejected: {doc.remark || "re-upload"}</span>
              : <span style={{ color: "var(--ok)" }}>{doc.status === "approved" ? "Verified" : `Uploaded, ${doc.original_name}`}</span>}
          </div>
        )}
      </div>
      <div className={a.docAct}>
        <button type="button" className={cx(a.btn, a.sm, doc && a.ghost)} disabled={state === "uploading"} onClick={() => ref.current?.click()}>
          <FiUpload size={16} />
          {state === "uploading" ? "Uploading…" : state === "failed" ? "Try again" : doc ? "Replace" : "Upload"}
        </button>
        <input ref={ref} type="file" className={a.hidden} accept={slot.accept === "image" ? "image/*" : "image/*,application/pdf"} onChange={upload} />
        {doc && <a className={a.small} href={doc.url} target="_blank" rel="noopener noreferrer">View</a>}
      </div>
    </div>
  );
}

function StepReview({ id, cfg, app, d, S, me, errors, tried, setForm, goto }) {
  const f = d.form;
  const ad = f.address || {};
  const subjNames = d.subjects.map((c) => (cfg.subjects[app.class].find((x) => x.code === +c) || {}).name).filter(Boolean);
  const aad = String(f.aadhaar || "").replace(/\D/g, "");
  const byStep = {};
  for (const [k, v] of Object.entries(errors)) {
    if (k === "declaration") continue; // shown under the checkbox below
    (byStep[STEP_OF[k] || 7] ||= []).push(v === "Required" ? `${LABELS[k] || k} is required` : v);
  }
  const todo = Object.entries(byStep).sort((x, y) => x[0] - y[0]);
  const Sect = ({ n, title, rows }) => (
    <div className={`${a.card} ${a.flat}`} style={{ marginBottom: 12 }}>
      <div className={a.row}>
        <h4 className={a.grow}>{title}</h4>
        <button type="button" className={`${a.linkBtn} ${a.small}`} onClick={() => goto(n)}>Edit</button>
      </div>
      <dl className={a.kv} style={{ marginTop: 10 }}>
        {rows.filter((r) => r[1]).map(([k, v]) => <Pair key={k} k={k} v={v} />)}
      </dl>
    </div>
  );
  return (
    <>
      {todo.length > 0 && (
        <div className={cx(a.fixBox, tried && a.fixBad)}>
          <div className={a.fixHead}>
            <FiAlertCircle size={18} />
            <b>{tried ? "Fix these before submitting" : "Still to complete"}</b>
            <span>{todo.length} {todo.length === 1 ? "step" : "steps"}</span>
          </div>
          {todo.map(([n, msgs]) => (
            <button type="button" key={n} className={a.fixRow} onClick={() => goto(+n)}>
              <span className={a.fixNo}>{n}</span>
              <span className={a.fixText}>
                <b>{STEPS[n - 1]}</b>
                {msgs.map((m) => <small key={m}>{m}</small>)}
              </span>
              <FiChevronRight size={18} />
            </button>
          ))}
        </div>
      )}
      <Sect n={1} title="Course" rows={[
        ["Class", `${app.class}th (${app.class === "10" ? "Secondary" : "Senior Secondary"})`],
        ["Stream", S?.label], ["Exam", S?.exam], ["TOC", f.toc_wanted && d.stream === "1" ? "Yes" : ""],
      ]} />
      <Sect n={2} title="Personal details" rows={[
        ["Name", f.full_name], ["Father's name", f.father_name], ["Mother's name", f.mother_name], ["Date of birth", dateOnly(f.dob)],
        ["Gender", f.gender], ["Category", f.category], ["Aadhaar", aad ? "XXXX XXXX " + aad.slice(-4) : ""], ["Medium", f.medium],
        ["Mobiles", [me.mobile, f.alt_mobile].filter(Boolean).join(", ")], ["Email", f.email],
      ]} />
      <Sect n={3} title="Address" rows={[
        ["Address", [ad.line1, ad.city, ad.post_office].filter(Boolean).join(", ")], ["District", ad.district], ["State", ad.state], ["Pincode", ad.pincode],
      ]} />
      <Sect n={4} title="Education" rows={[
        ["Last school", f.last_school], ["Last class passed", app.class === "10" && d.stream === "1" ? f.highest_class : ""],
        ["10th board", app.class === "12" ? f.board_10 : ""], ["10th year / roll", app.class === "12" ? [f.year_10, f.roll_10].filter(Boolean).join(" / ") : ""],
        ["Failed exam", (d.stream === "2" || f.toc_wanted) && f.failed_board ? `${f.failed_board} ${f.failed_year || ""}, roll ${f.failed_roll || ""}` : ""],
        ["TOC subjects", (d.stream === "2" || f.toc_wanted) ? (f.toc_subjects || []).filter((t) => t.name).map((t) => t.name + (t.marks ? ` (${t.marks})` : "")).join(", ") : ""],
      ]} />
      <Sect n={5} title="Subjects" rows={[["Selected", subjNames.join(", ") || "None"]]} />
      <Sect n={6} title="Documents" rows={app.slots.map((sl) => [sl.label, sl.doc ? (sl.doc.status === "rejected" ? "Rejected, re-upload" : "Uploaded") : sl.required ? "Missing" : ""])} />
      <label className={a.choice} style={{ marginTop: 6 }}>
        <input type="checkbox" checked={!!f.declaration} onChange={(e) => setForm("declaration", e.target.checked)} />
        <div className={a.small}>
          I confirm these details are correct and match my documents. I allow SS Coaching to fill and submit my NIOS admission and
          examination forms on my behalf.
        </div>
      </label>
      {tried && errors.declaration && <div className={a.err}>{errors.declaration}</div>}
    </>
  );
}

// Server-rendered so the router (and the site header) knows the path on first paint.
export const getServerSideProps = async () => ({ props: {} });
