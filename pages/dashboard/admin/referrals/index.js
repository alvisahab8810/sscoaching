import { useEffect, useState } from "react";
import Head from "next/head";
import { toast } from "sonner";
import { FiSearch } from "react-icons/fi";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import SalesStyles from "@/components/dashboard/sales/SalesStyles";

async function api(url, method = "GET", body) {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new Error(data.message || "Something went wrong");
  return data;
}

const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const day = (d) => (d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—");
const REASON = { referral: "Referral reward", welcome: "Joining reward", purchase: "Course purchase", admin: "By admin" };

export default function ReferralsPage() {
  const [tab, setTab] = useState("referrals");
  const [data, setData] = useState(null);
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");

  const load = () =>
    api(`/api/admin/referrals?page=${page}&q=${encodeURIComponent(search)}`)
      .then((d) => {
        setData(d);
        setSettings((s) => s || d.settings);
      })
      .catch((e) => toast.error(e.message));

  useEffect(() => {
    load();
  }, [page, search]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setSearch(q.trim());
    }, 350);
    return () => clearTimeout(t);
  }, [q]);

  const saveSettings = async () => {
    setSaving(true);
    try {
      const d = await api("/api/admin/referrals", "PUT", { settings });
      setSettings(d.settings);
      toast.success("Settings saved");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const st = data?.stats;
  const set = (k, v) => setSettings((s) => ({ ...s, [k]: v }));

  return (
    <div>
      <Head>
        <title>Refer & Earn — SS Coaching</title>
      </Head>
      <SalesStyles />
      <style jsx global>{`
        .sl-pill.pending {
          background: #f1f5f9;
          color: #64748b;
          text-transform: none;
        }
        .sl-pill.active {
          text-transform: none;
        }
      `}</style>
      <Topbar />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <AdminOffcanvas />

        <div className="flex-grow-1 sl-bg" style={{ minWidth: 0 }}>
          <div className="container-fluid p-4">
            <div className="sl-head">
              <div>
                <h4 className="sl-title">Refer &amp; Earn</h4>
                <p className="sl-sub">
                  Students share their code. When a friend joins with it and buys a course, the student gets money in their wallet. Wallet money can
                  only be spent on courses.
                </p>
              </div>
            </div>

            <div className="sl-stats">
              {[
                { label: "Friends joined", value: st?.joined, note: "Signed up with a code" },
                { label: "Friends bought", value: st?.purchased, note: "Reward paid", brand: true },
                { label: "Rewards paid", value: st && inr(st.paidOut), note: "Credited to wallets" },
                { label: "In wallets now", value: st && inr(st.walletTotal), note: st ? `${st.walletStudents} students` : "" },
              ].map((s) => (
                <div key={s.label} className="sl-stat">
                  <div className="sl-stat-label">{s.label}</div>
                  <div className={`sl-stat-value ${s.brand ? "brand" : ""}`}>{s.value ?? "—"}</div>
                  <div className="sl-stat-note">{s.note}</div>
                </div>
              ))}
            </div>

            <div className="sl-tabs">
              {[
                ["referrals", "Referrals"],
                ["wallets", "Wallets"],
                ["settings", "Settings"],
              ].map(([k, label]) => (
                <button key={k} className={`sl-tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>
                  {label}
                </button>
              ))}
            </div>

            {tab === "referrals" && (
              <div className="sl-card">
                <div className="sl-toolbar">
                  <div className="sl-search">
                    <span className="sl-search-icon">
                      <FiSearch size={15} />
                    </span>
                    <input placeholder="Search by name, phone or code" value={q} onChange={(e) => setQ(e.target.value)} />
                  </div>
                </div>
                <div className="sl-table-wrap">
                  <table className="sl-table">
                    <thead>
                      <tr>
                        <th>Friend</th>
                        <th>Referred by</th>
                        <th>Code</th>
                        <th>Joined with code</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!data && (
                        <tr>
                          <td colSpan={5} className="sl-empty">Loading…</td>
                        </tr>
                      )}
                      {data && !data.rows.length && (
                        <tr>
                          <td colSpan={5} className="sl-empty">{search ? "Nothing matches." : "No referrals yet."}</td>
                        </tr>
                      )}
                      {data?.rows.map((r) => (
                        <tr key={r._id}>
                          <td>
                            <div className="sl-strong">{r.name || "—"}</div>
                            <div className="sl-faint" style={{ fontSize: "0.76rem" }}>{r.phone}</div>
                          </td>
                          <td>
                            <div className="sl-strong">{r.referrer?.name || "—"}</div>
                            <div className="sl-faint" style={{ fontSize: "0.76rem" }}>{r.referrer?.phone}</div>
                          </td>
                          <td>
                            <span className="sl-tag">{r.referrer?.code}</span>
                          </td>
                          <td>{day(r.referredAt)}</td>
                          <td>
                            <span className={`sl-pill ${r.purchased ? "active" : "pending"}`}>{r.purchased ? "Bought, reward paid" : "Not bought yet"}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {data?.pages > 1 && (
                  <div className="sl-pager">
                    <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                      Prev
                    </button>
                    <span>
                      Page {page} of {data.pages}
                    </span>
                    <button disabled={page >= data.pages} onClick={() => setPage(page + 1)}>
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}

            {tab === "wallets" && <Wallets />}

            {tab === "settings" && settings && (
              <div className="sl-card" style={{ maxWidth: 640 }}>
                <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: 14 }}>
                  <div>
                    <div className="sl-strong">Refer and earn is {settings.enabled ? "on" : "off"}</div>
                    <div className="sl-faint" style={{ fontSize: "0.8rem" }}>Off: codes cannot be added and no new rewards are paid.</div>
                  </div>
                  <button className={`sl-switch ${settings.enabled ? "on" : ""}`} onClick={() => set("enabled", !settings.enabled)} />
                </div>

                <div className="sl-grid-2">
                  <div>
                    <label className="sl-label">Reward to the student who shares (₹)</label>
                    <input type="number" min={0} className="sl-input" value={settings.referrerReward} onChange={(e) => set("referrerReward", e.target.value)} />
                  </div>
                  <div>
                    <label className="sl-label">Reward to the friend who joins (₹)</label>
                    <input type="number" min={0} className="sl-input" value={settings.friendReward} onChange={(e) => set("friendReward", e.target.value)} />
                    <p className="sl-hint">0 = nothing. Paid after their first purchase.</p>
                  </div>
                  <div>
                    <label className="sl-label">Friend must pay at least (₹)</label>
                    <input type="number" min={0} className="sl-input" value={settings.minPurchase} onChange={(e) => set("minPurchase", e.target.value)} />
                    <p className="sl-hint">Money actually paid; wallet money does not count.</p>
                  </div>
                  <div>
                    <label className="sl-label">Most rewards per student</label>
                    <input type="number" min={0} className="sl-input" value={settings.maxReferrals} onChange={(e) => set("maxReferrals", e.target.value)} />
                    <p className="sl-hint">0 = no limit</p>
                  </div>
                  <div>
                    <label className="sl-label">A code can be added up to (days after joining)</label>
                    <input type="number" min={0} max={365} className="sl-input" value={settings.applyDays} onChange={(e) => set("applyDays", e.target.value)} />
                    <p className="sl-hint">Always only before the first purchase. 0 = any time.</p>
                  </div>
                  <div>
                    <label className="sl-label">Wallet can pay up to (% of an order)</label>
                    <input type="number" min={0} max={100} className="sl-input" value={settings.maxWalletPercent} onChange={(e) => set("maxWalletPercent", e.target.value)} />
                  </div>
                </div>

                <label className="sl-label" style={{ marginTop: 12 }}>Share message</label>
                <textarea className="sl-input" rows={3} value={settings.shareMessage} onChange={(e) => set("shareMessage", e.target.value)} />
                <p className="sl-hint">
                  {"{code}"} becomes the student&apos;s code and {"{link}"} their invite link.
                </p>

                <button className="sl-btn" disabled={saving} onClick={saveSettings}>
                  {saving ? "Saving…" : "Save settings"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Wallets() {
  const [q, setQ] = useState("");
  const [students, setStudents] = useState(null);
  const [open, setOpen] = useState(null); // { student, txns }
  const [adjust, setAdjust] = useState({ kind: "credit", amount: "", note: "" });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      api(`/api/admin/wallet?q=${encodeURIComponent(q.trim())}`)
        .then((d) => setStudents(d.students))
        .catch((e) => toast.error(e.message));
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  const view = async (id) => {
    try {
      const d = await api(`/api/admin/wallet?student=${id}`);
      setOpen(d);
      setAdjust({ kind: "credit", amount: "", note: "" });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const d = await api("/api/admin/wallet", "POST", { student: open.student._id, ...adjust });
      toast.success("Wallet updated");
      setStudents((list) => (list || []).map((s) => (s._id === open.student._id ? { ...s, walletBalance: d.walletBalance } : s)));
      await view(open.student._id);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="sl-card">
      <div className="sl-toolbar">
        <div className="sl-search">
          <span className="sl-search-icon">
            <FiSearch size={15} />
          </span>
          <input placeholder="Find any student by name, phone, email or code" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      {!q && <p className="sl-hint" style={{ marginTop: -6 }}>Showing students with money in their wallet.</p>}
      <div className="sl-table-wrap">
        <table className="sl-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Phone</th>
              <th>Code</th>
              <th className="num">Balance</th>
              <th className="num"></th>
            </tr>
          </thead>
          <tbody>
            {!students && (
              <tr>
                <td colSpan={5} className="sl-empty">Loading…</td>
              </tr>
            )}
            {students && !students.length && (
              <tr>
                <td colSpan={5} className="sl-empty">{q ? "No student found." : "No wallets have money yet."}</td>
              </tr>
            )}
            {students?.map((s) => (
              <tr key={s._id}>
                <td className="sl-strong">{s.name || "—"}</td>
                <td>{s.phone || s.email || "—"}</td>
                <td>{s.referralCode ? <span className="sl-tag">{s.referralCode}</span> : <span className="sl-faint">—</span>}</td>
                <td className="num sl-strong">{inr(s.walletBalance)}</td>
                <td className="num">
                  <button className="sl-btn-ghost" style={{ padding: "5px 12px", fontSize: "0.8rem" }} onClick={() => view(s._id)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="sl-modal-backdrop" onClick={() => !busy && setOpen(null)}>
          <div className="sl-modal" style={{ maxWidth: 680 }} onClick={(e) => e.stopPropagation()}>
            <div className="sl-modal-head">
              <h5 style={{ margin: 0, fontWeight: 700 }}>{open.student.name || "Student"}&apos;s wallet</h5>
              <div className="sl-faint" style={{ fontSize: "0.82rem" }}>
                Balance <b style={{ color: "#5641ce" }}>{inr(open.student.walletBalance)}</b>
              </div>
            </div>
            <div className="sl-modal-body" style={{ maxHeight: "65vh", overflowY: "auto" }}>
              <form onSubmit={submit} className="d-flex gap-2 flex-wrap align-items-end" style={{ marginBottom: 16 }}>
                <div>
                  <label className="sl-label">Change</label>
                  <select className="sl-input" value={adjust.kind} onChange={(e) => setAdjust({ ...adjust, kind: e.target.value })}>
                    <option value="credit">Add money</option>
                    <option value="debit">Deduct money</option>
                  </select>
                </div>
                <div style={{ width: 120 }}>
                  <label className="sl-label">Amount (₹)</label>
                  <input type="number" min={1} className="sl-input" value={adjust.amount} onChange={(e) => setAdjust({ ...adjust, amount: e.target.value })} />
                </div>
                <div style={{ flex: "1 1 180px" }}>
                  <label className="sl-label">Reason</label>
                  <input className="sl-input" maxLength={200} placeholder="Shown to the student" value={adjust.note} onChange={(e) => setAdjust({ ...adjust, note: e.target.value })} />
                </div>
                <button className="sl-btn" disabled={busy || !adjust.amount || !adjust.note.trim()}>
                  {busy ? "Saving…" : "Save"}
                </button>
              </form>

              {!open.txns.length ? (
                <p className="sl-empty">No wallet history yet.</p>
              ) : (
                <div className="sl-table-wrap">
                  <table className="sl-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Note</th>
                        <th className="num">Amount</th>
                        <th className="num">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {open.txns.map((t) => (
                        <tr key={t._id}>
                          <td>{day(t.createdAt)}</td>
                          <td>{REASON[t.reason] || t.reason}</td>
                          <td style={{ whiteSpace: "normal" }}>
                            {t.note}
                            {t.byAdmin && <div className="sl-faint" style={{ fontSize: "0.74rem" }}>{t.byAdmin}</div>}
                          </td>
                          <td className="num sl-strong" style={{ color: t.kind === "credit" ? "#15803d" : "#b91c1c" }}>
                            {t.kind === "credit" ? "+" : "−"}
                            {inr(t.amount)}
                          </td>
                          <td className="num">{inr(t.balanceAfter)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="sl-modal-foot">
              <button className="sl-btn-ghost" disabled={busy} onClick={() => setOpen(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }), { superAdminOnly: true });
