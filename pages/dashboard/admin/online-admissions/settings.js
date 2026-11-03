import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiCopy } from "react-icons/fi";
import { withAdminAuth } from "@/lib/withAdminAuth";
import DeskShell, { useStats } from "@/components/OnlineAdmission/DeskShell";
import { SYNC_SCRIPT } from "@/components/OnlineAdmission/syncScript";
import { api, dateOnly } from "@/components/OnlineAdmission/client";
import { Field, Spinner, cx } from "@/components/OnlineAdmission/ui";
import a from "@/components/OnlineAdmission/App.module.css";
import d from "@/components/OnlineAdmission/Desk.module.css";

export default function DeskSettings() {
  const { stats, error } = useStats();
  const [s, setS] = useState(null);
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  const [tsv, setTsv] = useState(null);

  useEffect(() => {
    if (stats?.is_admin) api("GET", "/staff/settings").then(setS).catch(setErr);
  }, [stats?.is_admin]);

  const save = async () => {
    if (!(+s.price_10 > 0) || !(+s.price_12 > 0)) return toast.error("Enter both prices");
    setBusy(true);
    try {
      await api("PUT", "/staff/settings", { launch_mode: s.launch_mode, price_10: s.price_10, price_12: s.price_12, test_price: s.test_price, test_card: s.test_card });
      toast.success("Saved. New applications use these prices.");
    } catch (e) {
      toast.error(e.message);
    }
    setBusy(false);
  };

  const importTsv = async () => {
    if (!tsv) return toast.error("Choose the file first");
    const fd = new FormData();
    fd.append("file", tsv);
    setBusy(true);
    try {
      const r = await api("POST", "/staff/centres/import", fd);
      toast.success(`Imported ${Number(r.imported || 0).toLocaleString("en-IN")} centres${r.dropped ? `, skipped ${r.dropped} bad rows` : ""}`);
      setS((x) => ({ ...x, centres_synced_at: r.synced_at || new Date().toISOString() }));
    } catch (e) {
      toast.error(e.message);
    }
    setBusy(false);
  };

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(SYNC_SCRIPT);
      toast.success("Script copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  const notAdmin = stats && !stats.is_admin;
  return (
    <DeskShell active="settings" title="Settings" isAdmin={stats?.is_admin} error={error || err}>
      {notAdmin ? <div className={a.empty}>Only the main admin can change settings.</div> : !s ? <Spinner /> : (
        <div className={d.detail}>
          <div>
            <div className={a.card} style={{ marginBottom: 16 }}>
              <h3 style={{ marginBottom: 10 }}>Packages</h3>
              <Field label="Status" help="Prices shown include NIOS admission and examination fees.">
                <select className={a.input} value={s.launch_mode} onChange={(e) => setS({ ...s, launch_mode: e.target.value })}>
                  <option value="live">Live: students can apply</option>
                  <option value="coming_soon">Coming soon: collect interest only</option>
                </select>
              </Field>
              <div className={a.grid2}>
                <Field label="Class 10th price (₹)">
                  <input className={cx(a.input, a.num)} inputMode="numeric" value={s.price_10} onChange={(e) => setS({ ...s, price_10: e.target.value.replace(/\D/g, "") })} />
                </Field>
                <Field label="Class 12th price (₹)">
                  <input className={cx(a.input, a.num)} inputMode="numeric" value={s.price_12} onChange={(e) => setS({ ...s, price_12: e.target.value.replace(/\D/g, "") })} />
                </Field>
              </div>
              <div className={a.sep} />
              <h4 style={{ marginBottom: 6 }}>Test package</h4>
              <p className={cx(a.small, a.muted)} style={{ marginTop: 0 }}>
                Shows a test card on the admission page. It opens a Class 10th form at the test price, so you can try the whole
                flow with a real small payment. Anyone visiting the page can see it, so switch it off after testing.
              </p>
              <div className={a.grid2}>
                <Field label="Test card on the admission page">
                  <select className={a.input} value={s.test_card ? "on" : "off"} onChange={(e) => setS({ ...s, test_card: e.target.value === "on" })}>
                    <option value="on">Shown</option>
                    <option value="off">Hidden</option>
                  </select>
                </Field>
                <Field label="Test price (₹)">
                  <input className={cx(a.input, a.num)} inputMode="numeric" value={s.test_price} onChange={(e) => setS({ ...s, test_price: e.target.value.replace(/D/g, "") })} />
                </Field>
              </div>
              <button type="button" className={a.btn} disabled={busy} onClick={save}>Save</button>
              <p className={cx(a.small, a.muted)} style={{ marginTop: 10 }}>
                Payments: {s.payment_mode === "razorpay" ? "Razorpay keys connected" : "not connected (add Razorpay keys on the server)"}.
                {" "}OTP SMS: {s.sms_mode === "msg91" ? "MSG91 connected" : "demo mode, the OTP is shown on screen"}.
              </p>
            </div>

            <div className={a.card}>
              <h3>Update the NIOS centre list</h3>
              <p className={cx(a.small, a.muted)} style={{ marginTop: 6 }}>
                NIOS adds and removes study centres through the year. Refresh the list once a month.
                {s.centres_synced_at ? ` Last import: ${dateOnly(s.centres_synced_at)}.` : " Using the bundled list."}
              </p>
              <ol className={a.small} style={{ paddingLeft: 18 }}>
                <li>Open <a href="https://sdmis.nios.ac.in/registration/locate-study-center" target="_blank" rel="noopener noreferrer">NIOS Locate Study Centre</a> in Chrome.</li>
                <li>Press F12, open Console, paste the script below and press Enter.</li>
                <li>Wait about a minute until nios_study_centres_full.tsv downloads.</li>
                <li>Upload that file here.</li>
              </ol>
              <button type="button" className={cx(a.btn, a.sm, a.ghost)} onClick={copyScript}><FiCopy size={15} /> Copy sync script</button>
              <pre className={d.code}>{SYNC_SCRIPT.slice(0, 600)}{"\n…"}</pre>
              <Field label="Centre file (.tsv)">
                <input type="file" accept=".tsv,.txt" className={a.small} onChange={(e) => setTsv(e.target.files?.[0] || null)} />
              </Field>
              <button type="button" className={a.btn} disabled={busy} onClick={importTsv}>{busy ? "Please wait…" : "Import centres"}</button>
            </div>
          </div>

          <div className={d.panel}>
            <h3>Team</h3>
            <p className={a.small} style={{ marginTop: 8 }}>
              Consultants log in with their sub-admin account. Give them the <b>Applications</b> (admissions) permission on the
              {" "}<Link href="/dashboard/admin/sub-admins">Sub-admins</Link> page. Only the main admin can record offline payments
              and change these settings.
            </p>
          </div>
        </div>
      )}
    </DeskShell>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));
