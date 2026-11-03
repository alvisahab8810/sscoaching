import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { FiAlertCircle, FiCheck, FiClock, FiLock, FiPhone, FiUpload } from "react-icons/fi";
import StudentShell, { useStudent, toLogin } from "@/components/OnlineAdmission/StudentShell";
import { api, rupee, when, dateOnly, loadScript } from "@/components/OnlineAdmission/client";
import { CopyBtn, Pill, Spinner, cx } from "@/components/OnlineAdmission/ui";
import a from "@/components/OnlineAdmission/App.module.css";

const AFTER_VERIFY = ["verified", "paid", "form_in_progress", "submitted_to_nios", "enrolled", "exam_fee_paid"];
const AFTER_PAY = ["paid", "form_in_progress", "submitted_to_nios", "enrolled", "exam_fee_paid"];
const JOURNEY = [
  ["Form and documents submitted", (s) => s !== "draft", (s) => s === "draft" || s === "changes_requested"],
  ["Documents verified", (s) => AFTER_VERIFY.includes(s), (s) => s === "submitted"],
  ["Payment", (s) => AFTER_PAY.includes(s), (s) => s === "verified"],
  ["NIOS form submitted", (s) => ["submitted_to_nios", "enrolled", "exam_fee_paid"].includes(s), (s) => ["paid", "form_in_progress"].includes(s)],
  ["Enrollment number", (s) => ["enrolled", "exam_fee_paid"].includes(s), (s) => s === "submitted_to_nios"],
  ["Exam fee submitted", (s) => s === "exam_fee_paid", (s) => s === "enrolled"],
];

function Journey({ app }) {
  const s = app.status;
  return (
    <ol className={a.rail}>
      {JOURNEY.map(([label, done, now], i) => {
        const st = s === "changes_requested" && i === 0 ? "now" : done(s) ? "done" : now(s) ? "now" : "todo";
        return (
          <li key={label} className={a[st]}>
            <span className={a.node}>{st === "done" ? <FiCheck size={15} /> : i + 1}</span>
            <b>{label}</b>
            {st === "now" && <span className={a.railText}>{app.status_info?.student}</span>}
          </li>
        );
      })}
    </ol>
  );
}

export default function AdmissionOverview() {
  const router = useRouter();
  const me = useStudent();
  const { id } = router.query;
  const [app, setApp] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setApp(await api("GET", `/my/applications/${id}`));
    } catch (e) {
      if (e.status === 401) toLogin(router);
      else setError(e.message);
    }
  }, [id, router]);

  useEffect(() => { if (me && id) load(); }, [me, id, load]);

  return (
    <StudentShell title="My admission" me={me}>
      {error ? (
        <div className={a.card}>
          <h3>Could not load this page</h3>
          <p className={a.muted} style={{ marginTop: 8 }}>{error}</p>
          <Link href="/nios-online-admission/my" className={`${a.btn} ${a.ghost}`}>Go back</Link>
        </div>
      ) : !app ? <Spinner /> : <Overview app={app} reload={load} />}
    </StudentShell>
  );
}

function Overview({ app, reload }) {
  const s = app.status;
  const si = app.stream_info;
  const rejected = app.slots.filter((x) => x.doc?.status === "rejected");
  const base = `/nios-online-admission/app/${app.id}`;

  return (
    <div>
      <div className={a.headRow}>
        <div className={a.grow}>
          <h2>Class {app.class}th NIOS admission</h2>
          <div className={`${a.muted} ${a.small}`}>{si ? `${si.label}, ${si.exam} exam` : ""}</div>
          {app.ref_no && <div className={`${a.tiny} ${a.muted} ${a.num}`}>{app.ref_no}</div>}
        </div>
        <Pill status={s}>{app.status_info?.label}</Pill>
      </div>

      <div className={a.ovGrid}>
        <div className={a.ovMain}>
          {app.enrollment_no && (
            <div className={a.enrol}>
              <div className={a.elbl}>Your NIOS enrollment number</div>
              <div className={a.no}>{app.enrollment_no.replace(/(\d{4})(?=\d)/g, "$1 ")} <CopyBtn text={app.enrollment_no} label="enrollment number" /></div>
              <div className={a.small} style={{ color: "#c9d6f5" }}>Use it on sdmis.nios.ac.in for your ID card, TMA, admit card and results.</div>
            </div>
          )}

          <div>
            {s === "draft" && (
              <div className={a.card}>
                <h3>Finish your admission form</h3>
                <p className={`${a.muted} ${a.small}`} style={{ marginTop: 6 }}>Your answers are saved as you go.</p>
                <Link href={`${base}/edit/1`} className={`${a.btn} ${a.lime} ${a.block}`}>Continue the form</Link>
              </div>
            )}
            {s === "changes_requested" && (
              <div className={a.card} style={{ borderColor: "#f0b7b9" }}>
                <h3>Your consultant needs a few corrections</h3>
                {app.review_note && <p className={`${a.note} ${a.noteBad}`} style={{ marginTop: 10 }}>{app.review_note}</p>}
                {rejected.map((x) => (
                  <p key={x.type} className={a.small}><b>{x.label}: </b>{x.doc.remark || "Re-upload"}</p>
                ))}
                <Link href={`${base}/edit/${rejected.length ? 6 : 1}`} className={`${a.btn} ${a.block}`}>Fix and resubmit</Link>
              </div>
            )}
            {s === "submitted" && rejected.length > 0 && (
              <div className={cx(a.card, a.statusCard, a.statusBad)}>
                <span className={a.statusIcon}><FiAlertCircle size={22} /></span>
                <div className={a.grow}>
                  <h3>Upload {rejected.length === 1 ? "this document" : "these documents"} again</h3>
                  <p className={cx(a.muted, a.small)}>Our consultant could not accept {rejected.length === 1 ? "it" : "them"}. Upload a clear copy and we will check it again.</p>
                  {rejected.map((x) => <Reupload key={x.type} id={app.id} slot={x} reload={reload} />)}
                </div>
              </div>
            )}
            {s === "submitted" && !rejected.length && (
              <div className={cx(a.card, a.statusCard)}>
                <span className={a.statusIcon}><FiClock size={22} /></span>
                <div className={a.grow}>
                  <h3>We are checking your form</h3>
                  <p className={cx(a.muted, a.small)}>
                    Our consultant is verifying your details and documents. You will get a message when it is done.
                  </p>
                  <a href="tel:09839065533" className={a.statusCall}><FiPhone size={14} /> Questions? Call 098390 65533</a>
                </div>
              </div>
            )}
            {s === "cancelled" && (
              <div className={`${a.note} ${a.noteBad}`}>This application was cancelled. Call 098390 65533 if you have questions.</div>
            )}
            <PayCard app={app} reload={reload} />
          </div>

          <section className={a.card}>
            <h3>Your admission journey</h3>
            <Journey app={app} />
          </section>

          {app.centre && (
            <section className={a.card}>
              <h3>Your NIOS study centre</h3>
              <div>
                <b>{app.centre.name}</b>
                <div className={`${a.small} ${a.muted}`}>AI code {app.centre.code}</div>
                <p className={a.small} style={{ marginTop: 6 }}>
                  {[app.centre.address, app.centre.district, app.centre.state, app.centre.pincode].filter(Boolean).join(", ")}
                </p>
                {app.centre.mobile && (
                  <a className={`${a.btn} ${a.ghost} ${a.sm}`} href={`tel:${app.centre.mobile}`}><FiPhone size={15} /> Call centre</a>
                )}
              </div>
            </section>
          )}

          {app.exam_fee && (
            <section className={a.card}>
              <h3>Exam fee</h3>
              <div>
                <dl className={a.kv}>
                  <dt>Session</dt><dd>{app.exam_fee.session}</dd>
                  <dt>Amount paid to NIOS</dt><dd>{rupee(app.exam_fee.amount)}</dd>
                  {app.exam_fee.receipt_no && <><dt>NIOS receipt</dt><dd>{app.exam_fee.receipt_no}</dd></>}
                  <dt>Paid on</dt><dd>{dateOnly(app.exam_fee.paid_on)}</dd>
                </dl>
              </div>
            </section>
          )}
        </div>

        <aside className={a.ovSide}>
          {si && (
            <section className={a.card}>
              <h3>{si.exam} exam timeline</h3>
              <dl className={a.timelineMini}>
                {si.timeline.map(([k, v]) => <TimelineRow key={k} k={k} v={v} />)}
              </dl>
            </section>
          )}

          <section className={a.card}>
            <h3>Documents</h3>
            <div>
              {app.slots.map((sl) => (
                <div key={sl.type} className={a.row} style={{ padding: "8px 0", borderTop: "1px solid var(--line)" }}>
                  <div className={`${a.grow} ${a.small}`}>{sl.label}</div>
                  {sl.doc ? (
                    <Pill tone={sl.doc.status === "approved" ? "ok" : sl.doc.status === "rejected" ? "bad" : ""}>
                      {sl.doc.status === "pending" ? "Uploaded" : sl.doc.status === "approved" ? "Verified" : "Rejected"}
                    </Pill>
                  ) : sl.required ? <Pill tone="warn">Missing</Pill> : <span className={`${a.tiny} ${a.muted}`}>If applicable</span>}
                </div>
              ))}
            </div>
          </section>

          <section className={a.card}>
            <h3>Updates</h3>
            <ul className={a.events}>
              {[...app.events].reverse().map((e, i) => (
                <li key={i}>{e.message}<time>{when(e.created_at)}</time></li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

const TimelineRow = ({ k, v }) => (<><dt>{k}</dt><dd>{v}</dd></>);

function Reupload({ id, slot, reload }) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);

  const upload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("File is larger than 5 MB. Use a smaller photo or PDF.");
    if (slot.accept === "image" && !file.type.startsWith("image/")) return toast.error("Upload a photo (JPG or PNG) for this one");
    const fd = new FormData();
    fd.append("type", slot.type);
    fd.append("file", file);
    setBusy(true);
    try {
      await api("POST", `/my/applications/${id}/documents`, fd);
      toast.success(slot.label + " uploaded. We will check it again.");
      await reload();
    } catch (err) {
      toast.error(err.message);
    }
    setBusy(false);
  };

  return (
    <div className={a.reup}>
      <div className={a.grow}>
        <b className={a.small}>{slot.label}</b>
        <div className={a.small} style={{ color: "var(--bad)" }}>{slot.doc.remark || "Upload a clearer copy"}</div>
      </div>
      <button type="button" className={cx(a.btn, a.sm)} disabled={busy} onClick={() => ref.current?.click()}>
        <FiUpload size={15} /> {busy ? "Uploading…" : "Upload again"}
      </button>
      <input ref={ref} type="file" hidden accept={slot.accept === "image" ? "image/*" : "image/*,application/pdf"} onChange={upload} />
    </div>
  );
}

function PayCard({ app, reload }) {
  const [busy, setBusy] = useState(false);
  const s = app.status;

  const pay = async () => {
    setBusy(true);
    try {
      const o = await api("POST", `/my/applications/${app.id}/pay`, {});
      await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      const rz = new window.Razorpay({
        key: o.key_id, order_id: o.order_id, amount: o.amount, currency: o.currency,
        name: o.name, description: o.description, prefill: o.prefill,
        theme: { color: "#4441E5" },
        handler: async (resp) => {
          try {
            await api("POST", `/my/applications/${app.id}/pay-verify`, resp);
            toast.success("Payment received");
          } catch (e) {
            toast.error(e.message);
          }
          setBusy(false);
          reload();
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      rz.on?.("payment.failed", (r) => toast.error(r?.error?.description || "Payment failed. Try again."));
      rz.open();
    } catch (e) {
      toast.error(e.message);
      setBusy(false);
      if (e.status === 409) reload();
    }
  };

  if (app.payment) {
    return (
      <div className={cx(a.paycard, a.payDone)}>
        <div className={a.pic}><FiCheck size={22} /></div>
        <div>
          <b>Paid {rupee(app.payment.amount)}</b>
          <div className={`${a.small} ${a.muted}`}>Received {when(app.payment.paid_at)}. Includes NIOS admission and exam fees.</div>
          <a href={`/api/online-admission/my/applications/${app.id}/receipt`} target="_blank" rel="noopener noreferrer" className={a.small} style={{ fontWeight: 600 }}>Download receipt</a>
        </div>
      </div>
    );
  }
  if (s === "verified") {
    return (
      <div className={cx(a.paycard, a.payOpen)}>
        <div className={a.pic}><FiCheck size={22} /></div>
        <div>
          <b>Documents verified. Your payment link is open.</b>
          <div className={`${a.amt} ${a.num}`}>{rupee(app.price)}</div>
          <div className={`${a.small} ${a.muted}`}>Class {app.class}th complete package, including NIOS admission and examination fees</div>
          <button type="button" className={`${a.btn} ${a.lime} ${a.block}`} style={{ marginTop: 10 }} disabled={busy} onClick={pay}>
            {busy ? "Opening payment…" : `Pay ${rupee(app.price)}`}
          </button>
        </div>
      </div>
    );
  }
  if (s === "cancelled") return null;
  return (
    <div className={a.paycard}>
      <div className={a.pic}><FiLock size={22} /></div>
      <div>
        <b>Payment {rupee(app.price)}</b>
        <div className={`${a.small} ${a.muted}`}>
          The payment link opens here after our consultant verifies your documents and details. You never pay for a form that has mistakes.
        </div>
      </div>
    </div>
  );
}

// Server-rendered so the router (and the site header) knows the path on first paint.
export const getServerSideProps = async () => ({ props: {} });
