import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { FiArrowLeft, FiCheck, FiCheckCircle, FiExternalLink, FiFileText, FiX } from "react-icons/fi";
import { withAdminAuth } from "@/lib/withAdminAuth";
import { SCIENCE_CODES } from "@/lib/onlineAdmission/config";
import DeskShell, { DESK, useStats } from "@/components/OnlineAdmission/DeskShell";
import CentreFinder from "@/components/OnlineAdmission/CentreFinder";
import { api, rupee, when, dateOnly, EXTRA_DOC_LABEL } from "@/components/OnlineAdmission/client";
import { CopyBtn, Field, Pill, Spinner, cx } from "@/components/OnlineAdmission/ui";
import a from "@/components/OnlineAdmission/App.module.css";
import d from "@/components/OnlineAdmission/Desk.module.css";

const OFFLINE_MODES = ["UPI", "Cash", "Bank transfer", "Card (POS)"];

export default function AdmissionFile() {
  const router = useRouter();
  const { id } = router.query;
  const { stats } = useStats();
  const [app, setApp] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!id) return;
    api("GET", `/staff/applications/${id}`).then(setApp).catch(setError);
  }, [id]);

  /** Runs a staff action; the API answers with the updated file. Returns true on success. */
  const act = useCallback(async (path, body, msg) => {
    setBusy(true);
    try {
      const next = await api("POST", path, body ?? {});
      setApp(next);
      if (msg) toast.success(msg);
      return true;
    } catch (e) {
      toast.error(e.message);
      return false;
    } finally {
      setBusy(false);
    }
  }, []);

  const name = app?.form?.full_name || (app ? "Name not filled" : "Application");
  return (
    <DeskShell active="applications" title={name} isAdmin={stats?.is_admin} error={error}
      sub={app ? `${app.ref_no || "Draft"}, Class ${app.class}th, ${app.stream_info?.label || ""}, ${app.student?.mobile || ""}` : ""}
      actions={app && <Header app={app} act={act} busy={busy} />}>
      {!app ? <Spinner /> : <File app={app} act={act} busy={busy} isAdmin={!!stats?.is_admin} />}
    </DeskShell>
  );
}

function Header({ app, act, busy }) {
  const photo = app.slots.find((s) => s.type === "photo" && s.doc);
  return (
    <div className={d.dhead} style={{ margin: 0 }}>
      <div className={d.avatar}>{photo ? <img src={photo.doc.url} alt="" /> : <FiFileText size={24} />}</div>
      <Pill status={app.status}>{app.status_info?.label}</Pill>
      {app.is_test && <Pill tone="warn">Test file, ₹{app.price}</Pill>}
      {app.consultant ? (
        <span className={cx(a.small, a.muted)}>With {app.consultant.name}</span>
      ) : (
        <button type="button" className={cx(a.btn, a.sm, a.ghost)} disabled={busy}
          onClick={() => act(`/staff/applications/${app.id}/claim`, null, "Assigned to you")}>Assign to me</button>
      )}
      <Link href={`${DESK}/applications`} className={cx(a.btn, a.sm, a.ghost)}><FiArrowLeft size={15} /> Queue</Link>
    </div>
  );
}

function File({ app, act, busy, isAdmin }) {
  const [changing, setChanging] = useState(false);
  const allotting = ["paid", "form_in_progress"].includes(app.status) && (!app.centre || changing);
  return (
    <div className={d.detail}>
      <div style={{ minWidth: 0 }}>
        {allotting && <AllotCard app={app} act={act} changing={!!app.centre} onDone={() => setChanging(false)} />}
        <Tabs app={app} act={act} busy={busy} />
      </div>
      <div>
        <ActionPanel app={app} act={act} busy={busy} isAdmin={isAdmin} onChangeCentre={() => setChanging(true)} />
        <SummaryPanel app={app} />
      </div>
    </div>
  );
}

function AllotCard({ app, act, changing, onDone }) {
  const sci = app.subjects_full.some((s) => SCIENCE_CODES.includes(s.code));
  return (
    <div className={a.card} style={{ marginBottom: 16 }}>
      <div className={a.row}>
        <h3 className={a.grow}>{changing ? "Change the study centre" : "Allot a study centre"}</h3>
        {changing && <button type="button" className={cx(a.btn, a.sm, a.ghost)} onClick={onDone}>Cancel</button>}
      </div>
      <p className={cx(a.small, a.muted)} style={{ margin: "6px 0 12px" }}>
        Class {app.class}th{sci ? ", science subjects chosen so only centres with science are shown" : ""}. Student pincode is pre-filled.
      </p>
      <CentreFinder
        pin={app.form?.address?.pincode || ""}
        course={app.class}
        science={sci}
        compact
        onPick={async (c) => {
          if (await act(`/staff/applications/${app.id}/centre`, { code: c.code }, `Allotted ${c.name}`)) onDone();
        }}
      />
    </div>
  );
}

/* ---------------- tabs ---------------- */
function Tabs({ app, act, busy }) {
  const [tab, setTab] = useState("details");
  const T = {
    details: "Form details",
    documents: `Documents (${app.slots.filter((s) => s.doc).length}/${app.slots.length})`,
    timeline: "Timeline and notes",
  };
  return (
    <div>
      <div className={d.subtabs} role="tablist">
        {Object.entries(T).map(([k, l]) => (
          <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      {tab === "details" ? <DetailsSheet app={app} /> : tab === "documents" ? <DocsTab app={app} act={act} busy={busy} /> : <TimelineTab app={app} act={act} busy={busy} />}
    </div>
  );
}

function KV({ k, v, copy = true }) {
  const has = v !== undefined && v !== null && v !== "";
  return (
    <div className={d.kvrow}>
      <span className={d.k}>{k}</span>
      <span className={d.v}>{has ? v : <span className={a.muted}>-</span>}</span>
      {has && copy ? <CopyBtn text={String(v)} label={k} /> : <span />}
    </div>
  );
}

function DetailsSheet({ app }) {
  const f = app.form || {};
  const ad = f.address || {};
  const S = app.stream_info || {};
  const v = app.validation || { errors: {}, warnings: [] };
  const toc = app.stream === "2" || f.toc_wanted;
  return (
    <div>
      {Object.keys(v.errors).length > 0 && (
        <div className={cx(a.note, a.noteBad)} style={{ marginBottom: 12 }}><b>Form problems: </b>{Object.values(v.errors).join(". ")}</div>
      )}
      {v.warnings.length > 0 && <div className={cx(a.note, a.noteWarn)} style={{ marginBottom: 12 }}>{v.warnings.join(". ")}</div>}
      <p className={cx(a.small, a.muted)}>Laid out in the order of the NIOS SDMIS admission form. Use the copy buttons while filling.</p>

      <div className={d.sheet}>
        <h4>Course</h4>
        <KV k="Course" v={app.class === "10" ? "Secondary (Class 10th)" : "Senior Secondary (Class 12th)"} />
        <KV k="Stream" v={app.stream === "2" ? "Stream 2" : "Stream 1"} />
        {app.stream === "1" && <KV k="Block" v={`Block ${app.block}`} />}
        <KV k="Exam session" v={S.exam} copy={false} />
        <KV k="Medium" v={f.medium} />
        <KV k="Transfer of credit (TOC)" v={toc ? "Yes" : "No"} copy={false} />
      </div>
      <div className={d.sheet}>
        <h4>Personal details</h4>
        <KV k="Name" v={f.full_name} />
        <KV k="Father's name" v={f.father_name} />
        <KV k="Mother's name" v={f.mother_name} />
        <KV k="Date of birth" v={f.dob ? f.dob.split("-").reverse().join("/") : ""} />
        <KV k="Gender" v={f.gender} />
        <KV k="Category" v={f.category} />
        <KV k="Religion" v={f.religion} />
        <KV k="Aadhaar" v={f.aadhaar} />
        <KV k="Disability" v={f.disability === "yes" ? "Yes" : "No"} copy={false} />
      </div>
      <div className={d.sheet}>
        <h4>Contact</h4>
        <KV k="Mobile" v={app.student?.mobile} />
        <KV k="Alternate mobile" v={f.alt_mobile} />
        <KV k="Email" v={f.email} />
      </div>
      <div className={d.sheet}>
        <h4>Address</h4>
        <KV k="House / street" v={ad.line1} />
        <KV k="Village / town / city" v={ad.city} />
        <KV k="Post office" v={ad.post_office} />
        <KV k="District" v={ad.district} />
        <KV k="State" v={ad.state} />
        <KV k="Pincode" v={ad.pincode} />
      </div>
      <div className={d.sheet}>
        <h4>Education</h4>
        <KV k="Last school" v={f.last_school} />
        {app.class === "10" && app.stream === "1" && <KV k="Last class passed" v={f.highest_class} copy={false} />}
        {app.class === "12" && (
          <>
            <KV k="10th board" v={f.board_10} />
            <KV k="10th year" v={f.year_10} />
            <KV k="10th roll no." v={f.roll_10} />
          </>
        )}
        {toc && (
          <>
            <KV k="Failed exam board" v={f.failed_board} />
            <KV k="Failed exam year" v={f.failed_year} />
            <KV k="Failed exam roll no." v={f.failed_roll} />
            <KV k="TOC subjects" v={(f.toc_subjects || []).filter((t) => t.name).map((t) => `${t.name}${t.marks ? ` (${t.marks})` : ""}`).join(", ")} />
          </>
        )}
      </div>
      <div className={d.sheet}>
        <h4>Subjects ({app.subjects_full.length})</h4>
        {app.subjects_full.map((s) => <KV key={s.code} k={String(s.code)} v={s.name + (s.practical ? ", has practical" : "")} />)}
      </div>
    </div>
  );
}

function Viewer({ view, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (view && el && !el.open) el.showModal();
    if (!view && el?.open) el.close();
  }, [view]);
  return (
    <dialog ref={ref} className={d.viewer} onClose={onClose} onCancel={onClose}>
      {view && (
        <>
          <div className={d.bar}>
            <b>{view.label}</b>
            <div className={a.row}>
              <a className={cx(a.btn, a.sm, a.ghost)} style={{ color: "#fff" }} href={view.doc.url} target="_blank" rel="noopener noreferrer"><FiExternalLink size={14} /> Open in new tab</a>
              <button type="button" className={cx(a.btn, a.sm)} onClick={onClose}>Close</button>
            </div>
          </div>
          {view.doc.mime === "application/pdf" ? <iframe src={view.doc.url} title={view.label} /> : <img src={view.doc.url} alt={view.label} />}
        </>
      )}
    </dialog>
  );
}

function DocCard({ sl, reviewing, act, busy, onView }) {
  const [remark, setRemark] = useState("");
  const [rejecting, setRejecting] = useState(false);
  const doc = sl.doc;
  const status = doc ? doc.status : "missing";
  return (
    <div className={cx(d.doc, d[status])}>
      {doc ? (
        <button type="button" className={d.pv} onClick={() => onView({ doc, label: sl.label })} aria-label={`View ${sl.label}`}>
          <span className={d.pvTag}>
            <Pill tone={doc.status === "approved" ? "ok" : doc.status === "rejected" ? "bad" : "warn"}>
              {doc.status === "pending" ? "Needs review" : doc.status === "approved" ? "Approved" : "Rejected"}
            </Pill>
          </span>
          {doc.mime?.startsWith("image/") ? <img src={doc.url} alt="" /> : <><FiFileText size={34} /> PDF, click to open</>}
        </button>
      ) : (
        <div className={d.pv} style={{ cursor: "default" }}><FiFileText size={28} /> Not uploaded</div>
      )}
      <div className={d.meta}>
        <b>{sl.label}{!sl.required && <span className={d.metaSub} style={{ fontWeight: 400 }}> (optional)</span>}</b>
        {doc && <span className={d.metaSub}>Uploaded {when(doc.uploaded_at)}</span>}
        {doc?.remark && <div className={a.small} style={{ color: "var(--bad)" }}>{doc.remark}</div>}
        {sl.history.length > 0 && (
          <details className={a.tiny}>
            <summary className={a.muted} style={{ cursor: "pointer" }}>{sl.history.length} earlier version(s)</summary>
            {sl.history.map((h) => (
              <div key={h.id}>
                <button type="button" className={a.linkBtn} onClick={() => onView({ doc: h, label: `${sl.label}, earlier version` })}>{when(h.uploaded_at)}</button>
                {h.status === "rejected" && <span className={a.muted}> rejected{h.remark ? `: ${h.remark}` : ""}</span>}
              </div>
            ))}
          </details>
        )}
        {doc && reviewing && (
          <>
            <div className={d.acts}>
              <button type="button" className={cx(a.btn, a.sm, a.okBtn)} disabled={busy || doc.status === "approved"}
                onClick={() => act(`/staff/documents/${doc.id}/review`, { status: "approved" }, `${sl.label} approved`)}>
                <FiCheck size={14} /> Approve
              </button>
              <button type="button" className={cx(a.btn, a.sm, a.danger)} disabled={busy} aria-expanded={rejecting}
                onClick={() => setRejecting((v) => !v)}>
                <FiX size={14} /> Reject
              </button>
            </div>
            {rejecting && (
              <div className={d.rejectBox}>
                <input className={a.input} placeholder="Reason, e.g. photo is blurred" value={remark} onChange={(e) => setRemark(e.target.value)} />
                <button type="button" className={cx(a.btn, a.sm, a.danger)} disabled={busy}
                  onClick={async () => {
                    if (!remark.trim()) return toast.error("Write the reason so the student knows what to fix");
                    if (await act(`/staff/documents/${doc.id}/review`, { status: "rejected", remark: remark.trim() }, `${sl.label} rejected`)) { setRemark(""); setRejecting(false); }
                  }}>
                  Reject with this reason
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function DocsTab({ app, act, busy }) {
  const [view, setView] = useState(null);
  const reviewing = ["submitted", "verified"].includes(app.status);
  return (
    <div>
      {!reviewing && <p className={cx(a.small, a.muted)}>Documents can be approved or rejected while the file is under verification.</p>}
      <div className={d.docgrid}>
        {app.slots.map((sl) => <DocCard key={sl.type} sl={sl} reviewing={reviewing} act={act} busy={busy} onView={setView} />)}
        {app.extra_docs.map((x) => {
          const label = EXTRA_DOC_LABEL[x.type] || x.type;
          return (
            <div key={x.id} className={cx(d.doc, d.approved)}>
              <button type="button" className={d.pv} onClick={() => setView({ doc: x, label })} aria-label={`View ${label}`}>
                {x.mime?.startsWith("image/") ? <img src={x.url} alt="" /> : <><FiFileText size={34} /> PDF, click to open</>}
              </button>
              <div className={d.meta}><b>{label}</b><span className={d.metaSub}>Uploaded {when(x.uploaded_at)}</span></div>
            </div>
          );
        })}
      </div>
      <Viewer view={view} onClose={() => setView(null)} />
    </div>
  );
}

function TimelineTab({ app, act, busy }) {
  const [msg, setMsg] = useState("");
  const [share, setShare] = useState(false);
  const add = async () => {
    if (!msg.trim()) return toast.error("Write the note first");
    if (await act(`/staff/applications/${app.id}/note`, { message: msg.trim(), share }, "Note added")) { setMsg(""); setShare(false); }
  };
  return (
    <div>
      <div className={a.card} style={{ marginBottom: 14 }}>
        <textarea className={cx(a.input, d.textarea)} placeholder="Add a note: call summary, original marksheet received, NIOS query…" value={msg} onChange={(e) => setMsg(e.target.value)} />
        <div className={a.row} style={{ marginTop: 10 }}>
          <label className={cx(a.small, a.row)} style={{ gap: 6, cursor: "pointer" }}>
            <input type="checkbox" checked={share} onChange={(e) => setShare(e.target.checked)} /> Show this note to the student
          </label>
          <span className={a.grow} />
          <button type="button" className={cx(a.btn, a.sm)} disabled={busy} onClick={add}>Add note</button>
        </div>
      </div>
      <div className={a.card}>
        <h3 style={{ marginBottom: 14 }}>Activity</h3>
        <ul className={d.tl}>
          {[...app.events].reverse().map((e) => (
            <li key={e.id} className={e.visible_to_student ? "" : d.internal}>
              <div>{e.message}</div>
              <div className={d.by}>{when(e.created_at)}, {e.actor_name || e.actor_role}{e.visible_to_student ? "" : ", internal"}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------- the action panel: one next step per stage ---------------- */
function Panel({ stage, title, children }) {
  return (
    <div className={d.panel}>
      {stage && <span className={d.stage}>{stage}</span>}
      <h3>{title}</h3>
      {children}
    </div>
  );
}

const fileInput = (setFile) => (
  <input type="file" accept="image/*,application/pdf" className={a.small} onChange={(e) => setFile(e.target.files?.[0] || null)} />
);
const tooBig = (f) => f && f.size > 5 * 1024 * 1024 && (toast.error("The file is larger than 5 MB"), true);

function ActionPanel(props) {
  const { app } = props;
  switch (app.status) {
    case "draft":
      return <Panel stage="Step 1 of 6" title="Student is still filling the form"><p className={cx(a.small, a.muted)}>Nothing to do yet. Call the student if the draft is older than two days.</p></Panel>;
    case "submitted": return <VerifyPanel {...props} />;
    case "changes_requested":
      return (
        <Panel stage="Step 2 of 6" title="Waiting for the student’s corrections">
          {app.review_note && <p className={cx(a.note, a.noteBad)}>{app.review_note}</p>}
          <p className={cx(a.small, a.muted)} style={{ marginTop: 8 }}>The file returns to “To verify” when the student resubmits.</p>
        </Panel>
      );
    case "verified": return <PaymentPanel {...props} />;
    case "paid":
    case "form_in_progress": return <NiosPanel {...props} />;
    case "submitted_to_nios": return <EnrolPanel {...props} />;
    case "enrolled": return <ExamFeePanel {...props} />;
    case "exam_fee_paid":
      return (
        <Panel stage="Complete" title="Admission journey complete">
          <dl className={a.kv}>
            <dt>Enrollment</dt><dd className={a.num}>{app.enrollment_no}</dd>
            <dt>Exam session</dt><dd>{app.exam_fee?.session}</dd>
            <dt>Receipt</dt><dd>{app.exam_fee?.receipt_no}</dd>
            <dt>Amount</dt><dd>{rupee(app.exam_fee?.amount)}</dd>
            <dt>Paid on</dt><dd>{dateOnly(app.exam_fee?.paid_on)}</dd>
          </dl>
        </Panel>
      );
    default:
      return <Panel title={app.status_info?.label || app.status} />;
  }
}

function VerifyPanel({ app, act, busy }) {
  const [note, setNote] = useState("");
  const slots = app.slots.filter((s) => s.required || s.doc);
  const ok = slots.filter((s) => s.doc?.status === "approved").length;
  const problems = Object.keys(app.validation?.errors || {}).length;
  return (
    <Panel stage="Step 2 of 6" title="Verify details and documents">
      <div className={d.progress}><i style={{ width: `${slots.length ? (ok / slots.length) * 100 : 0}%` }} /></div>
      <p className={cx(a.tiny, a.muted)}>{ok} of {slots.length} documents approved</p>
      <ul className={d.checks}>
        {["Name, father and mother names match the Aadhaar and marksheet", "Date of birth meets the minimum age", "Stream and block suit the student", "Subjects follow the NIOS combination rules"].map((t) => (
          <li key={t}><FiCheckCircle size={14} /> {t}</li>
        ))}
      </ul>
      <button type="button" className={cx(a.btn, a.okBtn, a.block)} disabled={busy || ok < slots.length || problems > 0}
        onClick={() => act(`/staff/applications/${app.id}/verify`, null, "Verified. The payment link is now open for the student.")}>
        Approve and open payment link
      </button>
      {ok < slots.length && <p className={cx(a.tiny, a.muted)} style={{ marginTop: 6 }}>Approve every document in the Documents tab first.</p>}
      {problems > 0 && <p className={a.tiny} style={{ marginTop: 6, color: "var(--bad)" }}>The form has problems (see Form details). Send it back for corrections.</p>}
      <hr className={a.sep} />
      <h4>Send back for corrections</h4>
      <textarea className={cx(a.input, d.textarea)} style={{ marginTop: 8 }} placeholder="What should the student correct? This message is sent to them." value={note} onChange={(e) => setNote(e.target.value)} />
      <button type="button" className={cx(a.btn, a.danger, a.block)} style={{ marginTop: 8 }} disabled={busy}
        onClick={() => (note.trim() ? act(`/staff/applications/${app.id}/request-changes`, { note: note.trim() }, "Sent back to the student") : toast.error("Tell the student what to correct"))}>
        Ask student to correct
      </button>
    </Panel>
  );
}

function StepBack({ app, act, busy, summary, placeholder, button, msg }) {
  const [reason, setReason] = useState("");
  return (
    <details style={{ marginTop: 12 }}>
      <summary className={a.small} style={{ cursor: "pointer" }}>{summary}</summary>
      <div className={a.stack} style={{ marginTop: 8 }}>
        <input className={a.input} placeholder={placeholder} value={reason} onChange={(e) => setReason(e.target.value)} />
        <button type="button" className={cx(a.btn, a.sm, a.danger)} disabled={busy}
          onClick={() => (reason.trim() ? act(`/staff/applications/${app.id}/step-back`, { reason: reason.trim() }, msg) : toast.error("Give a reason"))}>
          {button}
        </button>
      </div>
    </details>
  );
}

function PaymentPanel({ app, act, busy, isAdmin }) {
  const [mode, setMode] = useState(OFFLINE_MODES[0]);
  const [ref, setRef] = useState("");
  const [file, setFile] = useState(null);
  const record = () => {
    if (!ref.trim()) return toast.error("Enter the receipt / UTR number");
    if (tooBig(file)) return;
    if (!window.confirm(`Record ${rupee(app.price)} received by ${mode} (ref. ${ref.trim()})?`)) return;
    const fd = new FormData();
    fd.append("reference", ref.trim());
    fd.append("mode", mode);
    if (file) fd.append("file", file);
    act(`/staff/applications/${app.id}/offline-payment`, fd, "Payment recorded");
  };
  return (
    <Panel stage="Step 3 of 6" title={`Waiting for payment of ${rupee(app.price)}`}>
      <p className={cx(a.small, a.muted)}>The student sees the payment button in the app. The file moves on automatically when the payment is captured.</p>
      <StepBack app={app} act={act} busy={busy} summary="Reopen for corrections" placeholder="Reason" button="Send back" msg="Sent back to the student" />
      {isAdmin && (
        <>
          <hr className={a.sep} />
          <h4 style={{ marginBottom: 8 }}>Record a payment made at the centre</h4>
          <Field label="Mode">
            <select className={a.input} value={mode} onChange={(e) => setMode(e.target.value)}>{OFFLINE_MODES.map((m) => <option key={m}>{m}</option>)}</select>
          </Field>
          <Field label="Reference"><input className={a.input} placeholder="Receipt / UTR number" value={ref} onChange={(e) => setRef(e.target.value)} /></Field>
          <Field label="Receipt" optional>{fileInput(setFile)}</Field>
          <button type="button" className={cx(a.btn, a.sm)} disabled={busy} onClick={record}>Record {rupee(app.price)} paid</button>
        </>
      )}
    </Panel>
  );
}

function NiosPanel({ app, act, busy, onChangeCentre }) {
  const [ref, setRef] = useState("");
  const [file, setFile] = useState(null);
  const c = app.centre;
  const def = app.checklist_def || [];
  const list = app.checklist || {};
  const done = def.filter((x) => list[x.key]).length;
  const submit = () => {
    if (ref.trim().length < 4) return toast.error("Enter the NIOS reference / application number");
    if (tooBig(file)) return;
    const fd = new FormData();
    fd.append("nios_ref", ref.trim());
    if (file) fd.append("file", file);
    act(`/staff/applications/${app.id}/nios-submitted`, fd, "Marked as submitted to NIOS");
  };
  return (
    <>
      <Panel stage="Step 4 of 6" title={c ? "Fill and submit the NIOS form" : "Allot the nearest NIOS study centre"}>
        {c ? (
          <div className={cx(a.note, a.noteOk)}>
            <b>{c.name}</b>
            <div className={cx(a.small, a.num)}>AI code {c.code} <CopyBtn text={c.code} label="AI code" /></div>
            <div className={a.small}>{c.district}, {c.pincode || "pincode not listed"}</div>
            {c.mobile && <div className={a.small}><a href={`tel:${c.mobile}`}>{c.mobile}</a></div>}
            <button type="button" className={cx(a.linkBtn, a.small)} onClick={onChangeCentre}>Change centre</button>
          </div>
        ) : (
          <p className={cx(a.small, a.muted)}>Payment received. Pick a centre from the list on the left, nearest to the student’s pincode first. Call the centre to confirm seats if needed.</p>
        )}
      </Panel>
      {c && (
        <div className={d.panel}>
          <div className={a.row}>
            <h3 className={a.grow}>NIOS form checklist</h3>
            <Pill tone={done === def.length ? "ok" : ""}>{done}/{def.length}</Pill>
          </div>
          <a className={a.small} href="https://sdmis.nios.ac.in/" target="_blank" rel="noopener noreferrer">Open NIOS SDMIS portal</a>
          <div style={{ marginTop: 8 }}>
            {def.map((x) => (
              <label key={x.key} className={d.check}>
                <input type="checkbox" checked={!!list[x.key]} disabled={busy}
                  onChange={(e) => act(`/staff/applications/${app.id}/checklist`, { key: x.key, done: e.target.checked })} />
                <span>{x.label}{list[x.key] && <small>{list[x.key].by}, {when(list[x.key].at)}</small>}</span>
              </label>
            ))}
          </div>
          <hr className={a.sep} />
          <Field label="NIOS reference number"><input className={a.input} placeholder="NIOS reference / application no." value={ref} onChange={(e) => setRef(e.target.value)} /></Field>
          <Field label="Submission receipt" optional>{fileInput(setFile)}</Field>
          <button type="button" className={cx(a.btn, a.block)} disabled={busy || done < def.length} onClick={submit}>Mark form submitted to NIOS</button>
          {done < def.length && <p className={cx(a.tiny, a.muted)} style={{ marginTop: 6 }}>Tick every checklist item first.</p>}
        </div>
      )}
    </>
  );
}

function EnrolPanel({ app, act, busy }) {
  const [no, setNo] = useState("");
  const save = () => {
    const v = no.replace(/\s/g, "");
    if (!/^\d{12}$/.test(v)) return toast.error("NIOS enrollment numbers have 12 digits");
    act(`/staff/applications/${app.id}/enrollment`, { enrollment_no: v }, "Enrollment number saved and sent to the student");
  };
  return (
    <Panel stage="Step 5 of 6" title="Add the enrollment number">
      <p className={cx(a.small, a.muted)}>Submitted to NIOS with reference {app.nios_ref}. When NIOS confirms the admission, enter the enrollment number. The student sees it in their profile immediately.</p>
      <Field label="Enrollment number">
        <input className={cx(a.input, a.num)} inputMode="numeric" maxLength={14} placeholder="12-digit enrollment number" value={no} onChange={(e) => setNo(e.target.value.replace(/[^\d ]/g, ""))} />
      </Field>
      <button type="button" className={cx(a.btn, a.okBtn, a.block)} disabled={busy} onClick={save}>Save enrollment number</button>
      <StepBack app={app} act={act} busy={busy} summary="NIOS returned the form" placeholder="What needs fixing on the NIOS form?" button="Move back to form filling" msg="Moved back to form filling" />
    </Panel>
  );
}

function ExamFeePanel({ app, act, busy }) {
  const [sess, setSess] = useState(app.stream_info?.exam || "");
  const [amt, setAmt] = useState("");
  const [rec, setRec] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [file, setFile] = useState(null);
  const save = () => {
    if (!sess.trim() || !rec.trim() || !(+amt > 0)) return toast.error("Enter exam session, amount and NIOS receipt number");
    if (tooBig(file)) return;
    const fd = new FormData();
    fd.append("session", sess.trim());
    fd.append("amount", amt);
    fd.append("receipt_no", rec.trim());
    fd.append("paid_on", date);
    if (file) fd.append("file", file);
    act(`/staff/applications/${app.id}/exam-fee`, fd, "Exam fee recorded");
  };
  return (
    <Panel stage="Step 6 of 6" title="Submit the exam fee">
      <p className={cx(a.small, a.muted)}>Enrollment {app.enrollment_no}. Pay on SDMIS → Exam fee, then record it here.</p>
      <Field label="Exam session"><input className={a.input} placeholder="e.g. October–November 2027" value={sess} onChange={(e) => setSess(e.target.value)} /></Field>
      <div className={a.grid2}>
        <Field label="Amount (₹)"><input className={cx(a.input, a.num)} inputMode="numeric" placeholder="Amount paid to NIOS" value={amt} onChange={(e) => setAmt(e.target.value.replace(/\D/g, ""))} /></Field>
        <Field label="Paid on"><input className={a.input} type="date" value={date} onChange={(e) => setDate(e.target.value)} /></Field>
      </div>
      <Field label="Receipt number"><input className={a.input} placeholder="NIOS exam fee receipt no." value={rec} onChange={(e) => setRec(e.target.value)} /></Field>
      <Field label="Receipt file" optional>{fileInput(setFile)}</Field>
      <button type="button" className={cx(a.btn, a.okBtn, a.block)} disabled={busy} onClick={save}>Record exam fee</button>
    </Panel>
  );
}

function SummaryPanel({ app }) {
  const pay = app.payments.find((p) => p.status === "paid");
  return (
    <div className={d.panel}>
      <h4>File summary</h4>
      <dl className={a.kv} style={{ marginTop: 10 }}>
        <dt>Package</dt><dd>Class {app.class}th, {rupee(app.price)}</dd>
        <dt>Submitted</dt><dd>{when(app.submitted_at) || "-"}</dd>
        <dt>Verified</dt><dd>{when(app.verified_at) || "-"}</dd>
        <dt>Payment</dt><dd>{pay ? `${rupee(pay.amount)} via ${pay.gateway}${pay.payment_id ? ` (${pay.payment_id})` : ""}` : "Not paid"}</dd>
        <dt>Centre</dt><dd>{app.centre ? `${app.centre.code}, ${app.centre.district}` : "-"}</dd>
        <dt>NIOS ref.</dt><dd>{app.nios_ref || "-"}</dd>
        <dt>Enrollment</dt><dd className={a.num}>{app.enrollment_no || "-"}</dd>
      </dl>
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));
