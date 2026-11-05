import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import {
  MdSearch, MdToggleOn, MdToggleOff, MdLockReset, MdDeleteOutline, MdVisibility, MdVisibilityOff,
  MdContentCopy, MdCheck,
} from "react-icons/md";
import { withAdminAuth } from "@/lib/withAdminAuth";
import { LEAD_STATUSES, FOLLOWUP_SLOTS, MAX_SCORE, normalizeStatus } from "@/lib/leadPipeline";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import SalesStyles from "@/components/dashboard/sales/SalesStyles";
import { StatusModal, PasswordModal, DeleteModal } from "@/components/dashboard/sales/AccountModals";
import {
  SALES_FEATURES, featureLabel, fmtDate, fmtDateTime, initial, StatusBadge, TrendBars, StatusBreakdown,
} from "@/components/dashboard/sales/shared";

const PAGE_SIZE = 20;

export default function SalesPersonPage() {
  const router = useRouter();
  const { id } = router.query;

  const [person, setPerson] = useState(null);
  const [stats, setStats] = useState(null);
  const [trend, setTrend] = useState([]);
  const [leads, setLeads] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("overview");

  const [modal, setModal] = useState(null); // "status" | "password" | "delete"

  const load = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/sales/${id}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setPerson(data.data);
      setStats(data.stats);
      setTrend(data.trend);
      setLeads(data.leads);
    } catch (err) {
      toast.error(err.message || "Failed to load");
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [id]);

  // The rest of the team, for the "move their leads to" choice on delete.
  const openDelete = async () => {
    try {
      const res = await fetch("/api/admin/sales");
      const data = await res.json();
      if (data.success) setTeam(data.data);
    } catch {}
    setModal("delete");
  };

  return (
    <div>
      <Head>
        <title>{person ? `${person.name} — Sales` : "Sales Person"} — SS Coaching</title>
      </Head>
      <SalesStyles />
      <Topbar />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <AdminOffcanvas />

        <div className="flex-grow-1 sl-bg">
          <div className="container-fluid p-4">
            <Link href="/dashboard/admin/sales" className="sl-back">
              ← Sales Team
            </Link>

            {loading && !person && <p className="sl-empty">Loading…</p>}
            {!loading && !person && <p className="sl-empty">Sales person not found.</p>}

            {person && (
              <>
                {/* Header */}
                <div className="sl-card" style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <span className="sl-avatar lg">{initial(person.name)}</span>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <h4 className="sl-title">{person.name}</h4>
                      <span className={`sl-pill ${person.status}`}>{person.status}</span>
                    </div>
                    <div className="sl-sub">
                      @{person.username} · {person.email}
                      {person.phone ? ` · ${person.phone}` : ""} · Added {fmtDate(person.createdAt)}
                    </div>
                  </div>
                  <div className="d-flex gap-2 flex-wrap">
                    <button className={person.status === "active" ? "sl-btn-ghost" : "sl-btn success"} onClick={() => setModal("status")}>
                      {person.status === "active" ? <MdToggleOff size={18} /> : <MdToggleOn size={18} />}
                      {person.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                    <button className="sl-btn-ghost" onClick={() => setModal("password")}>
                      <MdLockReset size={17} /> Reset Password
                    </button>
                    <button className="sl-btn danger" onClick={openDelete}>
                      <MdDeleteOutline size={17} /> Delete
                    </button>
                  </div>
                </div>

                {/* Numbers */}
                {stats && (
                  <div className="sl-stats">
                    {[
                      { label: "Total Leads", value: stats.assigned, note: "All time" },
                      { label: "Sales", value: stats.sales, note: `${stats.conversion}% conversion`, brand: true },
                      { label: "Assigned This Month", value: stats.monthAssigned, note: "New leads received" },
                      { label: "Sales This Month", value: stats.monthSales, note: "Closed this month", brand: true },
                      { label: "Follow-ups This Month", value: stats.monthFollowUps, note: "Notes written" },
                      { label: "Due Follow-ups", value: stats.due, note: "Today or overdue" },
                    ].map((s) => (
                      <div key={s.label} className="sl-stat">
                        <div className="sl-stat-label">{s.label}</div>
                        <div className={`sl-stat-value ${s.brand ? "brand" : ""}`}>{s.value}</div>
                        <div className="sl-stat-note">{s.note}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="sl-tabs">
                  {[
                    ["overview", "Overview"],
                    ["leads", `Leads (${leads.length})`],
                    ["profile", "Profile & Access"],
                    ["activity", "Activity"],
                  ].map(([key, label]) => (
                    <button key={key} className={`sl-tab ${tab === key ? "active" : ""}`} onClick={() => setTab(key)}>
                      {label}
                    </button>
                  ))}
                </div>

                {tab === "overview" && stats && (
                  <div className="sl-grid-2">
                    <div className="sl-card">
                      <h6 className="sl-card-title">
                        Lead status <small>all {stats.assigned} leads, as they stand today</small>
                      </h6>
                      <StatusBreakdown byStatus={stats.byStatus} total={stats.assigned} />
                    </div>
                    <div className="sl-card">
                      <h6 className="sl-card-title">
                        Last 6 months <small>leads assigned vs sales closed</small>
                      </h6>
                      <TrendBars trend={trend} />
                    </div>
                  </div>
                )}

                {tab === "leads" && <LeadsTab leads={leads} />}
                {tab === "profile" && <ProfileTab person={person} onSaved={(p) => setPerson(p)} />}
                {tab === "activity" && <ActivityTab id={person._id} />}
              </>
            )}
          </div>
        </div>
      </div>

      {person && modal === "status" && (
        <StatusModal person={person} onClose={() => setModal(null)} onDone={(p) => { setModal(null); setPerson(p); }} />
      )}
      {person && modal === "password" && (
        <PasswordModal person={person} onClose={() => setModal(null)} onDone={(p) => { setModal(null); setPerson(p); }} />
      )}
      {person && modal === "delete" && (
        <DeleteModal
          person={{ ...person, stats }}
          team={team}
          onClose={() => setModal(null)}
          onDone={() => router.replace("/dashboard/admin/sales")}
        />
      )}
    </div>
  );
}

function LeadsTab({ leads }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) => {
      if (status !== "all" && normalizeStatus(l.status) !== status) return false;
      if (!q) return true;
      return [l.fullName, l.phone, l.leadId, l.city].some((v) => String(v || "").toLowerCase().includes(q));
    });
  }, [leads, search, status]);

  useEffect(() => setPage(1), [search, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="sl-card">
      <div className="sl-toolbar">
        <div className="sl-search">
          <span className="sl-search-icon">
            <MdSearch size={18} />
          </span>
          <input placeholder="Search name, mobile, lead ID, city" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="sl-select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All Status</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className="sl-count">{filtered.length} leads</span>
      </div>

      {filtered.length === 0 ? (
        <p className="sl-empty">No leads.</p>
      ) : (
        <>
          <div className="sl-table-wrap">
            <table className="sl-table">
              <thead>
                <tr>
                  <th>Assigned</th>
                  <th>Lead ID</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th className="num">Connects</th>
                  <th className="num">Score</th>
                  <th className="num">Follow-ups</th>
                  <th>Next Follow-up</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((l) => (
                  <tr key={l._id}>
                    <td>
                      <div className="sl-strong">{fmtDate(l.assignedAt || l.createdAt)}</div>
                      <div className="sl-faint">Enquiry {fmtDate(l.createdAt)}</div>
                    </td>
                    <td>
                      <span className="sl-id">{l.leadId || "—"}</span>
                    </td>
                    <td>
                      <div className="sl-strong">{l.fullName}</div>
                      {l.city && <div className="sl-faint">{l.city}</div>}
                    </td>
                    <td>{l.phone}</td>
                    <td>{l.source || "Unknown"}</td>
                    <td>
                      <StatusBadge status={l.status} />
                    </td>
                    <td className="num">{l.connects || 0}</td>
                    <td className="num">{l.scored ? `${l.score}/${MAX_SCORE}` : "—"}</td>
                    <td className="num">
                      {(l.followUps || []).length}/{FOLLOWUP_SLOTS}
                    </td>
                    <td>{l.nextFollowUpAt ? fmtDateTime(l.nextFollowUpAt) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pages > 1 && (
            <div className="sl-pager">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Prev
              </button>
              <span>
                Page {page} of {pages}
              </span>
              <button disabled={page >= pages} onClick={() => setPage(page + 1)}>
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ProfileTab({ person, onSaved }) {
  const [form, setForm] = useState({
    name: person.name,
    email: person.email,
    phone: person.phone || "",
    username: person.username,
  });
  const [permissions, setPermissions] = useState(person.permissions || []);
  const [saving, setSaving] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggle = (key) =>
    setPermissions((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/sales/${person._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", ...form, permissions }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      toast.success("Saved. Menu changes apply the next time they log in.");
      onSaved(data.data);
    } catch (err) {
      toast.error(err.message || "Could not save");
    }
    setSaving(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(person.password || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sl-grid-2">
      <div>
        <div className="sl-card">
          <h6 className="sl-card-title">Details</h6>
          {[
            ["name", "Full Name"],
            ["email", "Email Address"],
            ["phone", "Phone Number"],
            ["username", "Username"],
          ].map(([key, label]) => (
            <div key={key} style={{ marginBottom: 12 }}>
              <label className="sl-label">{label}</label>
              <input className="sl-input" value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
            </div>
          ))}
        </div>

        <div className="sl-card">
          <h6 className="sl-card-title">Current Login</h6>
          <div className="sl-kv">
            <span>Username</span>
            <span>{person.username}</span>
          </div>
          <div className="sl-kv" style={{ alignItems: "center" }}>
            <span>Password</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <code style={{ color: "#0f172a" }}>{showPwd ? person.password : "•".repeat(Math.min((person.password || "").length, 12))}</code>
              <button className="sl-icon-btn sm" onClick={() => setShowPwd((s) => !s)} title="Show / hide">
                {showPwd ? <MdVisibilityOff size={16} /> : <MdVisibility size={16} />}
              </button>
              <button className={`sl-icon-btn sm ${copied ? "success" : ""}`} onClick={copy} title="Copy">
                {copied ? <MdCheck size={16} /> : <MdContentCopy size={14} />}
              </button>
            </span>
          </div>
          <div className="sl-kv">
            <span>Last updated</span>
            <span>{fmtDateTime(person.updatedAt)}</span>
          </div>
        </div>
      </div>

      <div className="sl-card" style={{ alignSelf: "start" }}>
        <h6 className="sl-card-title">Sidebar Access</h6>
        <p className="sl-sub" style={{ marginBottom: 12 }}>
          Currently: {permissions.length ? permissions.map(featureLabel).join(", ") : "nothing"}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {SALES_FEATURES.map((f) => {
            const on = permissions.includes(f.key);
            return (
              <label key={f.key} className={`sl-perm ${on ? "on" : ""}`}>
                <input type="checkbox" checked={on} onChange={() => toggle(f.key)} />
                <div>
                  <div className="sl-perm-name">{f.label}</div>
                  <div className="sl-perm-desc">{f.desc}</div>
                </div>
              </label>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
          <button className="sl-btn" disabled={saving} onClick={save}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ActivityTab({ id }) {
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 15;

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch(`/api/admin/sub-admins/${id}/logs?page=${page}&limit=${limit}`)
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        if (data.success) {
          setLogs(data.data);
          setTotal(data.total);
        }
        setLoading(false);
      })
      .catch(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [id, page]);

  const pages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="sl-card">
      <h6 className="sl-card-title">
        Activity <small>{total} actions</small>
      </h6>
      {loading && <p className="sl-empty">Loading…</p>}
      {!loading && logs.length === 0 && <p className="sl-empty">No activity yet.</p>}
      {!loading && logs.length > 0 && (
        <div className="sl-table-wrap">
          <table className="sl-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Section</th>
                <th>Action</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id}>
                  <td>{fmtDateTime(log.createdAt)}</td>
                  <td>{featureLabel(log.feature)}</td>
                  <td style={{ textTransform: "capitalize" }}>{log.action}</td>
                  <td style={{ whiteSpace: "normal" }}>{log.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {pages > 1 && (
        <div className="sl-pager">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          <span>
            Page {page} of {pages}
          </span>
          <button disabled={page >= pages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }), { superAdminOnly: true });
