import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { toast } from "sonner";
import {
  MdRefresh, MdPersonAdd, MdSearch, MdVisibility, MdToggleOn, MdToggleOff, MdLockReset, MdDeleteOutline,
} from "react-icons/md";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import SalesStyles from "@/components/dashboard/sales/SalesStyles";
import ConfirmModal from "@/components/dashboard/sales/ConfirmModal";
import { StatusModal, PasswordModal, DeleteModal } from "@/components/dashboard/sales/AccountModals";
import { initial } from "@/components/dashboard/sales/shared";

export default function SalesTeamPage() {
  const [team, setTeam] = useState([]);
  const [summary, setSummary] = useState(null);
  const [rotation, setRotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [batchInput, setBatchInput] = useState("");
  const [savingRotation, setSavingRotation] = useState(false);
  const [distributeOpen, setDistributeOpen] = useState(false);
  const [distributing, setDistributing] = useState(false);

  const [statusFor, setStatusFor] = useState(null);
  const [passwordFor, setPasswordFor] = useState(null);
  const [deleteFor, setDeleteFor] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (status) params.set("status", status);
      const res = await fetch(`/api/admin/sales?${params}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setTeam(data.data);
      setSummary(data.summary);
      setRotation(data.rotation);
      setBatchInput(String(data.rotation.batchSize));
    } catch (err) {
      toast.error(err.message || "Failed to load the sales team");
    }
    setLoading(false);
  };

  useEffect(() => {
    const t = setTimeout(load, search ? 300 : 0);
    return () => clearTimeout(t);
  }, [search, status]);

  const saveRotation = async (body) => {
    setSavingRotation(true);
    try {
      const res = await fetch("/api/admin/sales/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setRotation(data.rotation);
      setBatchInput(String(data.rotation.batchSize));
      toast.success("Auto-assign updated");
    } catch (err) {
      toast.error(err.message || "Could not update auto-assign");
    }
    setSavingRotation(false);
  };

  const distribute = async () => {
    setDistributing(true);
    try {
      const res = await fetch("/api/admin/sales/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "distribute" }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      toast.success(`${data.assigned} leads assigned`);
      setDistributeOpen(false);
      load();
    } catch (err) {
      toast.error(err.message || "Could not assign leads");
    }
    setDistributing(false);
  };

  const batchChanged = rotation && String(rotation.batchSize) !== batchInput;

  return (
    <div>
      <Head>
        <title>Sales Team — SS Coaching</title>
      </Head>
      <SalesStyles />
      <Topbar />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <AdminOffcanvas />

        <div className="flex-grow-1 sl-bg">
          <div className="container-fluid p-4">
            {/* Header */}
            <div className="sl-head">
              <div>
                <h4 className="sl-title">Sales Team</h4>
                <p className="sl-sub">Sales people, their leads and the auto-assign rotation</p>
              </div>
              <div className="d-flex gap-2 flex-wrap">
                <button className="sl-icon-btn" onClick={load} title="Refresh">
                  <MdRefresh size={18} />
                </button>
                <Link href="/dashboard/admin/sales/reports" className="sl-btn-ghost">
                  Monthly Reports
                </Link>
                <Link href="/dashboard/admin/sales/invite" className="sl-btn">
                  <MdPersonAdd size={17} /> Invite Sales Person
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="sl-stats">
              {[
                { label: "Sales Team", value: summary?.total, note: "All sales accounts" },
                { label: "Active", value: summary?.active, note: "Taking new leads" },
                { label: "Inactive", value: summary?.inactive, note: "Blocked from login" },
                { label: "Assigned This Month", value: summary?.monthAssigned, note: "Leads handed out" },
                { label: "Sales This Month", value: summary?.monthSales, note: "Leads marked Converted", brand: true },
              ].map((s) => (
                <div key={s.label} className="sl-stat">
                  <div className="sl-stat-label">{s.label}</div>
                  <div className={`sl-stat-value ${s.brand ? "brand" : ""}`}>{s.value ?? "—"}</div>
                  <div className="sl-stat-note">{s.note}</div>
                </div>
              ))}
            </div>

            {/* Auto-assign */}
            {rotation && (
              <div className="sl-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 320px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button
                        className={`sl-switch ${rotation.enabled ? "on" : ""}`}
                        onClick={() => saveRotation({ enabled: !rotation.enabled })}
                        disabled={savingRotation}
                        aria-label="Auto-assign on or off"
                      />
                      <h6 className="sl-card-title" style={{ margin: 0 }}>
                        Auto-assign {rotation.enabled ? "is on" : "is off"}
                      </h6>
                    </div>
                    <p className="sl-sub" style={{ marginTop: 8 }}>
                      Every new lead goes to one sales person until they have {rotation.batchSize}, then the next
                      active person takes over, in the order they were added.
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-end" }}>
                    <div>
                      <div className="sl-stat-label">Now taking leads</div>
                      {rotation.current ? (
                        <>
                          <div className="sl-strong" style={{ fontSize: "1rem", marginTop: 4 }}>{rotation.current.name}</div>
                          <div className="sl-faint">
                            {rotation.current.count} of {rotation.batchSize} in this batch
                            {rotation.next ? ` · next: ${rotation.next.name}` : ""}
                          </div>
                        </>
                      ) : (
                        <div className="sl-faint" style={{ marginTop: 4 }}>No active sales person</div>
                      )}
                    </div>

                    <div>
                      <label className="sl-stat-label" style={{ display: "block" }}>Leads per batch</label>
                      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                        <input
                          type="number"
                          min={1}
                          max={500}
                          className="sl-input"
                          style={{ width: 90 }}
                          value={batchInput}
                          onChange={(e) => setBatchInput(e.target.value)}
                        />
                        {batchChanged && (
                          <button className="sl-btn" disabled={savingRotation} onClick={() => saveRotation({ batchSize: Number(batchInput) })}>
                            Save
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="sl-stat-label">Unassigned new leads</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                        <span className="sl-strong" style={{ fontSize: "1rem" }}>{summary?.unassignedNew ?? 0}</span>
                        <button
                          className="sl-btn-ghost"
                          style={{ padding: "6px 12px" }}
                          disabled={!summary?.unassignedNew || !rotation.enabled || !rotation.current}
                          onClick={() => setDistributeOpen(true)}
                        >
                          Assign now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Team */}
            <div className="sl-card">
              <div className="sl-toolbar">
                <div className="sl-search">
                  <span className="sl-search-icon">
                    <MdSearch size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search name, email, phone, username"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <select className="sl-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <span className="sl-count">{team.length} people</span>
              </div>

              {loading && <p className="sl-empty">Loading sales team…</p>}
              {!loading && team.length === 0 && (
                <div className="sl-empty">
                  <div className="sl-strong">No sales people yet</div>
                  <Link href="/dashboard/admin/sales/invite" style={{ color: "#5641ce", fontSize: "0.88rem" }}>
                    Invite your first sales person
                  </Link>
                </div>
              )}

              {!loading && team.length > 0 && (
                <div className="sl-table-wrap">
                  <table className="sl-table">
                    <thead>
                      <tr>
                        <th>Sales Person</th>
                        <th>Contact</th>
                        <th className="num">Leads</th>
                        <th className="num">Open</th>
                        <th className="num">Sales</th>
                        <th className="num">Conversion</th>
                        <th className="num">This Month</th>
                        <th className="num">Due Follow-ups</th>
                        <th>Status</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {team.map((p) => (
                        <tr key={p._id}>
                          <td>
                            <div className="sl-person">
                              <span className="sl-avatar">{initial(p.name)}</span>
                              <div>
                                <Link href={`/dashboard/admin/sales/${p._id}`} className="sl-strong" style={{ textDecoration: "none" }}>
                                  {p.name}
                                </Link>
                                <div className="sl-faint">@{p.username}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>{p.email}</div>
                            <div className="sl-faint">{p.phone || "No phone"}</div>
                          </td>
                          <td className="num sl-strong">{p.stats.assigned}</td>
                          <td className="num">{p.stats.open}</td>
                          <td className="num sl-strong" style={{ color: "#5641ce" }}>{p.stats.sales}</td>
                          <td className="num">{p.stats.conversion}%</td>
                          <td className="num">
                            <div>{p.stats.monthAssigned} leads</div>
                            <div className="sl-faint">{p.stats.monthSales} sales</div>
                          </td>
                          <td className="num" style={{ color: p.stats.due ? "#b45309" : undefined, fontWeight: p.stats.due ? 700 : 400 }}>
                            {p.stats.due}
                          </td>
                          <td>
                            <span className={`sl-pill ${p.status}`}>{p.status}</span>
                          </td>
                          <td>
                            <div className="sl-actions">
                              <Link href={`/dashboard/admin/sales/${p._id}`} className="sl-icon-btn sm brand" title="View details">
                                <MdVisibility size={16} />
                              </Link>
                              <button
                                className={`sl-icon-btn sm ${p.status === "active" ? "danger" : "success"}`}
                                title={p.status === "active" ? "Deactivate" : "Activate"}
                                onClick={() => setStatusFor(p)}
                              >
                                {p.status === "active" ? <MdToggleOff size={18} /> : <MdToggleOn size={18} />}
                              </button>
                              <button className="sl-icon-btn sm" title="Reset password" onClick={() => setPasswordFor(p)}>
                                <MdLockReset size={16} />
                              </button>
                              <button className="sl-icon-btn sm danger" title="Delete" onClick={() => setDeleteFor(p)}>
                                <MdDeleteOutline size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {statusFor && (
        <StatusModal person={statusFor} onClose={() => setStatusFor(null)} onDone={() => { setStatusFor(null); load(); }} />
      )}
      {passwordFor && (
        <PasswordModal person={passwordFor} onClose={() => setPasswordFor(null)} onDone={() => setPasswordFor(null)} />
      )}
      {deleteFor && (
        <DeleteModal person={deleteFor} team={team} onClose={() => setDeleteFor(null)} onDone={() => { setDeleteFor(null); load(); }} />
      )}
      {distributeOpen && (
        <ConfirmModal
          title="Assign waiting leads"
          subtitle="Through the rotation, oldest lead first"
          confirmLabel="Assign Leads"
          busyLabel="Assigning…"
          busy={distributing}
          onCancel={() => setDistributeOpen(false)}
          onConfirm={distribute}
        >
          <p>
            Are you sure you want to assign the <strong>{summary?.unassignedNew}</strong> unassigned leads in status New
            to the active sales team?
          </p>
          <p className="sl-faint" style={{ fontSize: "0.84rem" }}>
            They go out in batches of {rotation?.batchSize}, starting with {rotation?.current?.name}. Up to 500 leads per
            click.
          </p>
        </ConfirmModal>
      )}
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }), { superAdminOnly: true });
