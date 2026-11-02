"use client";
import { withAdminAuth } from "@/lib/withAdminAuth";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { FOLLOWUP_SLOTS, FOLLOWUP_STATUS, slotUnlocked, reminderState } from "@/lib/leadPipeline";
import { FaLock, FaPlus, FaSync, FaTimes, FaSearch } from "react-icons/fa";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const SLOTS = Array.from({ length: FOLLOWUP_SLOTS }, (_, i) => i + 1);

const lower = (v) => String(v || "").toLowerCase();
const digitsOnly = (phone) => String(phone || "").replace(/[^0-9]/g, "");


const fmtDate = (v) =>
  v ? new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) : "";

// A date input needs yyyy-mm-dd in local time, which toISOString would shift.
const toLocalInput = (v) => {
  if (!v) return "";
  const d = new Date(v);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};


export default function FollowUps() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState(null);

  // The cell being written: { lead, slot, note, nextFollowUpAt }
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/get-leads?status=${encodeURIComponent(FOLLOWUP_STATUS)}`);
      const data = await res.json();
      if (data.success) setLeads(data.leads);
      else toast.error(data.message || "Could not load follow-ups");
    } catch {
      toast.error("Could not load follow-ups");
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = lower(search).trim();

    return leads.filter((l) => {
      if (month !== null && new Date(l.createdAt).getMonth() !== month) return false;
      if (!q) return true;
      return [l.fullName, l.phone, l.leadId, l.lookingFor].map(lower).some((h) => h.includes(q));
    });
  }, [leads, search, month]);

  const stats = useMemo(() => {
    const count = (fn) => filtered.filter(fn).length;
    const done = (l) => (l.followUps || []).filter((f) => String(f.note || "").trim()).length;

    return [
      { label: "In follow-up", value: filtered.length },
      { label: "Not started", value: count((l) => done(l) === 0) },
      { label: "In progress", value: count((l) => done(l) > 0 && done(l) < FOLLOWUP_SLOTS) },
      { label: "All slots used", value: count((l) => done(l) >= FOLLOWUP_SLOTS) },
      { label: "Overdue", value: count((l) => reminderState(l.nextFollowUpAt) === "overdue") },
      { label: "Due today", value: count((l) => reminderState(l.nextFollowUpAt) === "today") },
    ];
  }, [filtered]);

  const openCell = (lead, slot) => {
    const existing = (lead.followUps || []).find((f) => f.slot === slot);
    setEditing({
      lead,
      slot,
      note: existing ? existing.note : "",
      nextFollowUpAt: toLocalInput(lead.nextFollowUpAt),
    });
  };

  const save = async () => {
    const note = editing.note.trim();
    if (!note) {
      toast.error("Write a note");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/leads/${editing.lead._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot: editing.slot,
          note,
          nextFollowUpAt: editing.nextFollowUpAt || null,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Could not save");

      setLeads((list) => list.map((l) => (l._id === data.lead._id ? { ...l, ...data.lead } : l)));
      toast.success(`Follow-up ${editing.slot} saved`);
      setEditing(null);
    } catch (err) {
      toast.error(err.message);
    }
    setSaving(false);
  };

  return (
    <div>
      <Topbar />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <AdminOffcanvas />

        <div className="flex-grow-1 fu-bg">
          <div className="container-fluid p-4">
            <div className="fu-head">
              <div>
                <h4 className="fu-title">Follow-ups</h4>
                <p className="fu-sub">
                  Every lead whose status is <strong>Follow Up</strong>, with its call trail slot by slot
                </p>
              </div>
              <button className="fu-icon-btn" onClick={load} title="Refresh">
                <FaSync />
              </button>
            </div>

            <div className="fu-note">
              <span className="fu-note-icon">
                <FaLock />
              </span>
              <span>
                Follow-up 1 is always open. Each later slot unlocks only once the one before it has a
                note, so the trail stays in order.
              </span>
            </div>

            <div className="fu-stats">
              {stats.map((s) => (
                <div key={s.label} className="fu-stat">
                  <span className="fu-stat-value">{s.value}</span>
                  <span className="fu-stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="fu-card fu-months">
              <span className="fu-months-label">FILTERS:</span>
              <button className={`fu-chip ${month === null ? "active" : ""}`} onClick={() => setMonth(null)}>
                All
              </button>
              {MONTHS.map((m, i) => (
                <button
                  key={m}
                  className={`fu-chip ${month === i ? "active" : ""}`}
                  onClick={() => setMonth(month === i ? null : i)}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="fu-card">
              <div className="fu-toolbar">
                <div className="fu-search">
                  <span className="fu-search-icon">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    placeholder="Search name, mobile, lead ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <span className="fu-count">{filtered.length} leads</span>
              </div>

              {loading && <p className="fu-empty">Loading follow-ups…</p>}
              {!loading && filtered.length === 0 && (
                <p className="fu-empty">
                  No leads are in follow-up. Set a lead&apos;s status to &quot;Follow Up&quot; on the Leads
                  page and it appears here.
                </p>
              )}

              {!loading && filtered.length > 0 && (
                <div className="fu-table-wrap">
                  <table className="fu-table">
                    <thead>
                      <tr>
                        <th className="stick s1">S.No</th>
                        <th className="stick s2">Lead ID</th>
                        <th className="stick s3">Customer</th>
                        <th className="stick s4">Mobile</th>
                        {SLOTS.map((s) => (
                          <th key={s} className="c-slot">
                            Follow-up {s}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.map((lead, index) => {
                        const notes = lead.followUps || [];

                        return (
                          <tr key={lead._id}>
                            <td className="stick s1">{index + 1}</td>
                            <td className="stick s2">
                              <span className="fu-id">{lead.leadId || "—"}</span>
                            </td>
                            <td className="stick s3">
                              <div className="fu-strong">{lead.fullName}</div>
                            </td>
                            <td className="stick s4">
                              {digitsOnly(lead.phone)}
                            </td>


                            {SLOTS.map((slot) => {
                              const entry = notes.find((f) => f.slot === slot);
                              const unlocked = slotUnlocked(slot, notes);

                              if (entry) {
                                return (
                                  <td key={slot}>
                                    <button className="fu-cell filled" onClick={() => openCell(lead, slot)}>
                                      <span className="fu-cell-note">{entry.note}</span>
                                      <span className="fu-faint">
                                        {entry.byName} · {fmtDate(entry.updatedAt || entry.createdAt)}
                                      </span>
                                    </button>
                                  </td>
                                );
                              }

                              if (!unlocked) {
                                return (
                                  <td key={slot}>
                                    <span className="fu-cell locked" title={`Fill follow-up ${slot - 1} first`}>
                                      <FaLock />
                                    </span>
                                  </td>
                                );
                              }

                              return (
                                <td key={slot}>
                                  <button className="fu-cell add" onClick={() => openCell(lead, slot)}>
                                    <FaPlus />
                                  </button>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {editing && (
        <div className="fu-modal-backdrop" onClick={() => setEditing(null)}>
          <div className="fu-modal" onClick={(e) => e.stopPropagation()}>
            <div className="fu-modal-head">
              <div>
                <h5>
                  Follow-up {editing.slot} · {editing.lead.fullName}
                </h5>
                <p>{editing.lead.leadId || digitsOnly(editing.lead.phone)}</p>
              </div>
              <button onClick={() => setEditing(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="fu-modal-body">
              <label>What happened on this call?</label>
              <textarea
                rows={5}
                value={editing.note}
                onChange={(e) => setEditing({ ...editing, note: e.target.value })}
                placeholder="Spoke to the father, wants the Class 10 batch, asked us to call back after the exam"
                maxLength={2000}
              />

              <label>Next follow-up date</label>
              <input
                type="date"
                value={editing.nextFollowUpAt}
                onChange={(e) => setEditing({ ...editing, nextFollowUpAt: e.target.value })}
              />
            </div>

            <div className="fu-modal-foot">
              <button className="fu-btn-ghost" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button className="fu-btn" disabled={saving} onClick={save}>
                {saving ? "Saving…" : "Save Follow-up"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .fu-bg {
          background: #f1f5f9;
        }

        .fu-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }
        .fu-title {
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .fu-sub {
          margin: 2px 0 0;
          color: #64748b;
          font-size: 0.86rem;
        }

        .fu-icon-btn {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          width: 40px;
          height: 40px;
          color: #475569;
          flex-shrink: 0;
        }

        .fu-note {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 0.84rem;
          color: #475569;
          margin-bottom: 14px;
        }
        .fu-note-icon {
          color: #94a3b8;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          height: 20px;
        }

        .fu-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));
          gap: 10px;
          margin-bottom: 14px;
        }
        .fu-stat {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .fu-stat-value {
          color: #0f172a;
          font-size: 1.45rem;
          font-weight: 700;
          line-height: 1.1;
        }
        .fu-stat-label {
          font-size: 0.74rem;
          color: #94a3b8;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .fu-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
          margin-bottom: 14px;
        }

        .fu-months {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .fu-months-label {
          font-size: 0.74rem;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.04em;
          margin-right: 4px;
        }
        .fu-chip {
          border: 1px solid #e2e8f0;
          background: #fff;
          color: #475569;
          border-radius: 999px;
          padding: 5px 16px;
          font-size: 0.82rem;
          font-weight: 600;
        }
        .fu-chip.active {
          background: #5641ce;
          border-color: #5641ce;
          color: #fff;
        }

        .fu-toolbar {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .fu-search {
          position: relative;
          flex: 1 1 300px;
        }
        .fu-search input {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px 10px 38px;
          font-size: 0.88rem;
          background: #f8fafc;
        }
        .fu-search-icon {
          position: absolute;
          left: 14px;
          top: 0;
          bottom: 0;
          display: inline-flex;
          align-items: center;
          color: #94a3b8;
          font-size: 0.82rem;
          pointer-events: none;
        }
        .fu-count {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.9rem;
          margin-left: auto;
        }

        .fu-empty {
          color: #64748b;
          padding: 24px 0;
          margin: 0;
        }

        .fu-table-wrap {
          overflow-x: auto;
        }
        .fu-table {
          border-collapse: separate;
          border-spacing: 0;
          font-size: 0.85rem;
          table-layout: fixed;
          width: 1710px;
        }
        .fu-table thead th {
          text-align: left;
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #94a3b8;
          font-weight: 700;
          padding: 10px 12px;
          border-bottom: 1px solid #e2e8f0;
          white-space: nowrap;
          background: #fff;
        }
        .fu-table tbody td {
          padding: 10px 12px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: top;
          color: #334155;
          background: #fff;
        }
        .fu-table .c-slot {
          width: 200px;
        }

        /* The customer columns stay in view while the slots scroll sideways. */
        .fu-table .stick {
          position: sticky;
          z-index: 2;
          box-shadow: 1px 0 0 #f1f5f9;
        }
        .fu-table thead .stick {
          z-index: 3;
        }
        .fu-table .s1 {
          left: 0;
          width: 56px;
        }
        .fu-table .s2 {
          left: 56px;
          width: 110px;
        }
        .fu-table .s3 {
          left: 166px;
          width: 164px;
          overflow: hidden;
        }
        .fu-table .s4 {
          left: 330px;
          width: 180px;
          box-shadow: 2px 0 6px rgba(15, 23, 42, 0.06);
        }
        .fu-table .s3 .fu-strong,
        .fu-table .s3 .fu-faint {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .fu-strong {
          font-weight: 600;
          color: #0f172a;
        }
        .fu-faint {
          font-size: 0.74rem;
          color: #94a3b8;
          display: block;
        }
        .fu-id {
          background: #f1eefc;
          color: #4634ad;
          border: 1px solid #ded7f6;
          border-radius: 6px;
          padding: 3px 8px;
          font-size: 0.74rem;
          font-weight: 700;
          white-space: nowrap;
        }
        /* Slot cells: written, open and locked. */
        .fu-cell {
          width: 100%;
          min-height: 54px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: left;
          padding: 8px 10px;
          font-size: 0.78rem;
        }
        .fu-cell.filled {
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 3px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #0f172a;
          cursor: pointer;
        }
        .fu-cell.filled:hover {
          border-color: #cbd5e1;
          background: #f1f5f9;
        }
        .fu-cell-note {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-weight: 600;
          line-height: 1.3;
        }
        .fu-cell.add {
          border: 1px dashed #cbd5e1;
          background: #fff;
          color: #94a3b8;
          cursor: pointer;
        }
        .fu-cell.add:hover {
          border-color: #94a3b8;
          color: #475569;
          background: #f8fafc;
        }
        .fu-cell.locked {
          border: 1px solid #f1f5f9;
          background: #f8fafc;
          color: #cbd5e1;
          cursor: not-allowed;
        }

        .fu-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.5);
          z-index: 1060;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .fu-modal {
          background: #fff;
          border-radius: 16px;
          width: 520px;
          max-width: 100%;
          overflow: hidden;
        }
        .fu-modal-head {
          background: #5641ce;
          color: #fff;
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .fu-modal-head h5 {
          margin: 0;
          font-weight: 700;
        }
        .fu-modal-head p {
          margin: 4px 0 0;
          font-size: 0.8rem;
          opacity: 0.85;
        }
        .fu-modal-head button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: #fff;
          border-radius: 8px;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
        }
        .fu-modal-body {
          padding: 18px 20px;
        }
        .fu-modal-body label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 6px;
        }
        .fu-modal-body textarea,
        .fu-modal-body input {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 0.88rem;
          margin-bottom: 14px;
          background: #f8fafc;
        }
        .fu-modal-foot {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          padding: 14px 20px;
          border-top: 1px solid #e2e8f0;
        }
        .fu-btn {
          background: #5641ce;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 9px 18px;
          font-weight: 600;
          font-size: 0.88rem;
        }
        .fu-btn:disabled {
          opacity: 0.6;
        }
        .fu-btn-ghost {
          background: #fff;
          color: #334155;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 9px 18px;
          font-weight: 600;
          font-size: 0.88rem;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => {
  return {
    props: {},
  };
});
