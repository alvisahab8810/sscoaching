"use client";
import { withAdminAuth } from "@/lib/withAdminAuth";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { LEAD_SOURCES } from "@/lib/leadSource";
import {
  LEAD_STATUSES,
  SCORE_QUESTIONS,
  POINTS_PER_YES,
  MAX_SCORE,
  scoreFromAnswers,
  scoreBand,
  normalizeStatus,
  FOLLOWUP_SLOTS,
} from "@/lib/leadPipeline";
import { FaTrash, FaSync, FaTimes, FaBolt, FaSearch } from "react-icons/fa";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

const lower = (v) => String(v || "").toLowerCase();
const digitsOnly = (phone) => String(phone || "").replace(/[^0-9]/g, "");

const displayPhone = (phone) => {
  const n = digitsOnly(phone);
  return n.length === 10 ? `+91 ${n}` : phone;
};

const fmtDate = (v) =>
  v ? new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "";

const fmtTime = (v) =>
  v ? new Date(v).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : "";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [source, setSource] = useState("all");
  const [month, setMonth] = useState(null);

  const [scoring, setScoring] = useState(null); // the lead whose sheet is open
  const [confirming, setConfirming] = useState(null); // the lead waiting on a delete confirmation
  const [deleting, setDeleting] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [saving, setSaving] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 20;

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/get-leads");
      const data = await res.json();
      if (data.success) setLeads(data.leads);
      else toast.error(data.message || "Could not load leads");
    } catch {
      toast.error("Could not load leads");
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = lower(search).trim();

    return leads.filter((l) => {
      if (status !== "all" && normalizeStatus(l.status) !== status) return false;

      if (source !== "all") {
        const s = l.source || "Unknown";
        if (source === "Unknown" ? s !== "Unknown" : s !== source) return false;
      }

      if (month !== null && new Date(l.createdAt).getMonth() !== month) return false;

      if (q) {
        const haystack = [l.fullName, l.phone, l.lookingFor, l.city, l.leadId].map(lower);
        if (!haystack.some((h) => h.includes(q))) return false;
      }

      return true;
    });
  }, [leads, search, status, source, month]);

  useEffect(() => {
    setPage(1);
  }, [search, status, source, month]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  const applyLead = (updated) =>
    setLeads((list) => list.map((l) => (l._id === updated._id ? { ...l, ...updated } : l)));

  const send = async (id, method, body) => {
    const res = await fetch(`/api/leads/${id}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Could not save");
    return data.lead;
  };

  const patchLead = async (id, body) => {
    try {
      applyLead(await send(id, "PATCH", body));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const openScore = (lead) => {
    setScoring(lead);
    // A lead scored before reopens on its own answers, so a single wrong click
    // can be corrected without filling the sheet again.
    setAnswers(
      SCORE_QUESTIONS.map((_, i) => (Array.isArray(lead.scoreAnswers) ? !!lead.scoreAnswers[i] : null))
    );
  };

  const saveScore = async () => {
    if (answers.some((a) => a === null || a === undefined)) {
      toast.error("Answer all five questions");
      return;
    }

    setSaving(true);
    try {
      applyLead(await send(scoring._id, "PUT", { answers }));
      toast.success("Lead scored");
      setScoring(null);
    } catch (err) {
      toast.error(err.message);
    }
    setSaving(false);
  };

  const deleteLead = async () => {
    const id = confirming._id;
    setDeleting(true);
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Could not delete");
      setLeads((list) => list.filter((l) => l._id !== id));
      toast.success("Lead deleted");
      setConfirming(null);
    } catch (err) {
      toast.error(err.message);
    }
    setDeleting(false);
  };

  const exportRows = () =>
    filtered.map((l) => ({
      "Lead ID": l.leadId || "",
      Date: fmtDate(l.createdAt),
      Time: fmtTime(l.createdAt),
      Name: l.fullName,
      Mobile: l.phone,
      City: l.city,
      Message: l.lookingFor,
      Source: l.source || "Unknown",
      Campaign: l.utmCampaign || "",
      Connects: l.connects || 0,
      Status: normalizeStatus(l.status),
      "Assigned To": l.assignedToName || "Unassigned",
      "Lead Score": l.scored ? `${l.score}/${MAX_SCORE}` : "",
      Temperature: l.scored ? scoreBand(l.score).label : "",
      "Follow-ups": (l.followUps || []).length,
    }));

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(exportRows());
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf], { type: "application/octet-stream" }), "leads.xlsx");
  };

  const exportCSV = () => {
    const rows = exportRows();
    if (!rows.length) return;
    const headers = Object.keys(rows[0]);
    // Messages and campaign names contain commas, so every cell is quoted.
    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
    saveAs(new Blob([csv], { type: "text/csv;charset=utf-8;" }), "leads.csv");
  };

  return (
    <div>
      <Topbar />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <AdminOffcanvas />

        <div className="flex-grow-1 crm-bg">
          <div className="container-fluid p-4">
            {/* Header */}
            <div className="crm-head">
              <div>
                <h4 className="crm-title">Leads</h4>
                <p className="crm-sub">Every enquiry from Meta, Google and organic search, in one place</p>
              </div>

              <div className="d-flex gap-2">
                <button className="crm-icon-btn" onClick={load} title="Refresh">
                  <FaSync />
                </button>
                <button className="crm-btn-ghost" onClick={exportCSV}>
                  Export CSV
                </button>
                <button className="crm-btn" onClick={exportExcel}>
                  Export Excel
                </button>
              </div>
            </div>

            {/* What the page does on its own */}
            <div className="crm-note">
              {/* react-icons renders its own svg, which styled-jsx will not scope,
                  so every icon that needs positioning sits inside a span. */}
              <span className="crm-note-icon">
                <FaBolt />
              </span>
              <span>
                <strong>Automations live:</strong> Meta, Google &amp; web leads auto-land here ·
                Source detected from the ad click · <strong>Follow Up</strong> status feeds the
                Follow-ups tracker · Lead score from 5 questions.
              </span>
            </div>

            {/* Month chips */}
            <div className="crm-card crm-months">
              <span className="crm-months-label">FILTERS:</span>
              <button
                className={`crm-chip ${month === null ? "active" : ""}`}
                onClick={() => setMonth(null)}
              >
                All
              </button>
              {MONTHS.map((m, i) => (
                <button
                  key={m}
                  className={`crm-chip ${month === i ? "active" : ""}`}
                  onClick={() => setMonth(month === i ? null : i)}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Search + filters */}
            <div className="crm-card">
              <div className="crm-toolbar">
                <div className="crm-search">
                  <span className="crm-search-icon">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    placeholder="Search name, mobile, lead ID, message"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <select className="crm-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="all">All Status</option>
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <select className="crm-select" value={source} onChange={(e) => setSource(e.target.value)}>
                  <option value="all">All sources</option>
                  {LEAD_SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                  <option value="Unknown">Unknown</option>
                </select>

                <span className="crm-count">{filtered.length} leads</span>
              </div>

              {/* Table */}
              {loading && <p className="crm-empty">Loading leads…</p>}
              {!loading && filtered.length === 0 && <p className="crm-empty">No leads found.</p>}

              {!loading && filtered.length > 0 && (
                <div className="crm-table-wrap">
                  <table className="crm-table">
                    <thead>
                      <tr>
                        <th>Date · Time</th>
                        <th>Lead ID</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Message</th>
                        <th>Source</th>
                        <th>Connects</th>
                        <th>Status</th>
                        <th>Lead Score</th>
                        <th>Follow-ups</th>
                        <th />
                      </tr>
                    </thead>

                    <tbody>
                      {paginated.map((lead) => {
                        const st = normalizeStatus(lead.status);
                        const band = scoreBand(lead.score);
                        const written = (lead.followUps || []).filter((f) =>
                          String(f.note || "").trim()
                        ).length;

                        return (
                            <tr key={lead._id}>
                              <td>
                                <div className="crm-strong">{fmtDate(lead.createdAt)}</div>
                                <div className="crm-faint">{fmtTime(lead.createdAt)}</div>
                              </td>

                              <td>
                                <span className="crm-id">{lead.leadId || "—"}</span>
                              </td>

                              <td>
                                <div className="crm-strong">{lead.fullName}</div>
                                {lead.city && <div className="crm-faint">{lead.city}</div>}
                              </td>

                              <td className="crm-nowrap">{displayPhone(lead.phone)}</td>

                              <td className="crm-message" title={lead.lookingFor || ""}>
                                {lead.lookingFor || "—"}
                              </td>

                              <td>{lead.source || "Unknown"}</td>

                              <td>
                                <div className="crm-stepper">
                                  <button
                                    onClick={() =>
                                      patchLead(lead._id, { connects: Math.max(0, (lead.connects || 0) - 1) })
                                    }
                                    disabled={!lead.connects}
                                  >
                                    −
                                  </button>
                                  <span>{lead.connects || 0}</span>
                                  <button
                                    onClick={() => patchLead(lead._id, { connects: (lead.connects || 0) + 1 })}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>

                              <td>
                                <select
                                  className="crm-status"
                                  value={st}
                                  onChange={(e) => patchLead(lead._id, { status: e.target.value })}
                                >
                                  {LEAD_STATUSES.map((s) => (
                                    <option key={s} value={s}>
                                      {s}
                                    </option>
                                  ))}
                                </select>
                              </td>

                              <td>
                                {lead.scored ? (
                                  <button
                                    className="crm-score"
                                    onClick={() => openScore(lead)}
                                    title={`${band.label} — click to rescore`}
                                  >
                                    {lead.score}/{MAX_SCORE}
                                  </button>
                                ) : (
                                  <button className="crm-score-cta" onClick={() => openScore(lead)}>
                                    Score Lead
                                  </button>
                                )}
                              </td>

                              <td>
                                <span className="crm-fu">
                                  {written}/{FOLLOWUP_SLOTS}
                                </span>
                              </td>

                              <td>
                                <button
                                  className="crm-icon-btn danger sm"
                                  onClick={() => setConfirming(lead)}
                                  title="Delete lead"
                                >
                                  <FaTrash />
                                </button>
                              </td>
                            </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {!loading && filtered.length > 0 && (
                <div className="crm-pager">
                  <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Prev
                  </button>
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {confirming && (
        <div className="crm-modal-backdrop" onClick={() => !deleting && setConfirming(null)}>
          <div className="crm-modal sm" onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-head danger">
              <div>
                <h5>Delete lead</h5>
                <p>This cannot be undone</p>
              </div>
              <button onClick={() => setConfirming(null)} disabled={deleting}>
                <FaTimes />
              </button>
            </div>

            <div className="crm-modal-body">
              <p className="crm-confirm-text">
                <strong>{confirming.fullName}</strong>
                {confirming.leadId ? ` · ${confirming.leadId}` : ""} — {displayPhone(confirming.phone)}
              </p>
              <p className="crm-confirm-sub">
                The lead and its follow-up trail will be removed permanently.
              </p>
            </div>

            <div className="crm-modal-foot">
              <button className="crm-btn-ghost" onClick={() => setConfirming(null)} disabled={deleting}>
                Cancel
              </button>
              <button className="crm-btn danger" onClick={deleteLead} disabled={deleting}>
                {deleting ? "Deleting…" : "Delete Lead"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Score sheet */}
      {scoring && (
        <div className="crm-modal-backdrop" onClick={() => setScoring(null)}>
          <div className="crm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="crm-modal-head">
              <div>
                <h5>Lead Score · {scoring.fullName}</h5>
                <p>
                  5 quick questions · {POINTS_PER_YES} points per Yes · max {MAX_SCORE}
                </p>
              </div>
              <button onClick={() => setScoring(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="crm-modal-body">
              <div className="crm-legend">
                Score 8–{MAX_SCORE} = <strong>Hot</strong> · 5–7 = <strong>Warm</strong> · 0–4 ={" "}
                <strong>Cold</strong>
              </div>

              {SCORE_QUESTIONS.map((q, i) => (
                <div key={q} className="crm-question">
                  <p>
                    {i + 1}. {q}
                  </p>
                  <div className="crm-yn">
                    <button
                      className={answers[i] === true ? "yes" : ""}
                      onClick={() => setAnswers((a) => a.map((v, j) => (j === i ? true : v)))}
                    >
                      Yes
                    </button>
                    <button
                      className={answers[i] === false ? "no" : ""}
                      onClick={() => setAnswers((a) => a.map((v, j) => (j === i ? false : v)))}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="crm-modal-foot">
              <span className="crm-running">
                {scoreFromAnswers(answers.map(Boolean))}/{MAX_SCORE}
              </span>
              <button className="crm-btn-ghost" onClick={() => setScoring(null)}>
                Cancel
              </button>
              <button className="crm-btn" disabled={saving} onClick={saveScore}>
                {saving ? "Saving…" : "Save Score"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .crm-bg {
          background: #f1f5f9;
        }

        .crm-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
        }
        .crm-title {
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .crm-sub {
          margin: 2px 0 0;
          color: #64748b;
          font-size: 0.86rem;
        }

        .crm-btn {
          background: #5641ce;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 9px 18px;
          font-weight: 600;
          font-size: 0.88rem;
        }
        .crm-btn:disabled {
          opacity: 0.6;
        }
        .crm-btn-ghost {
          background: #fff;
          color: #334155;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 9px 18px;
          font-weight: 600;
          font-size: 0.88rem;
        }
        .crm-icon-btn {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          width: 40px;
          height: 40px;
          color: #475569;
        }
        .crm-icon-btn.sm {
          width: 32px;
          height: 32px;
          font-size: 0.78rem;
        }
        .crm-icon-btn.danger {
          color: #ef4444;
          border-color: #fecaca;
          background: #fef2f2;
        }

        .crm-note {
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
        .crm-note-icon {
          color: #94a3b8;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          height: 20px;
        }

        .crm-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
          margin-bottom: 14px;
        }

        .crm-months {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        .crm-months-label {
          font-size: 0.74rem;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.04em;
          margin-right: 4px;
        }
        .crm-chip {
          border: 1px solid #e2e8f0;
          background: #fff;
          color: #475569;
          border-radius: 999px;
          padding: 5px 16px;
          font-size: 0.82rem;
          font-weight: 600;
        }
        .crm-chip.active {
          background: #5641ce;
          border-color: #5641ce;
          color: #fff;
        }

        .crm-toolbar {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .crm-search {
          position: relative;
          flex: 1 1 320px;
        }
        .crm-search input {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px 10px 38px;
          font-size: 0.88rem;
          background: #f8fafc;
        }
        .crm-search-icon {
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
        .crm-select {
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.86rem;
          background: #fff;
          color: #334155;
          min-width: 150px;
        }
        .crm-count {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.9rem;
          margin-left: auto;
        }

        .crm-empty {
          color: #64748b;
          padding: 24px 0;
          margin: 0;
        }

        .crm-table-wrap {
          overflow-x: auto;
        }
        .crm-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .crm-table thead th {
          text-align: left;
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #94a3b8;
          font-weight: 700;
          padding: 10px 12px;
          border-bottom: 1px solid #e2e8f0;
          white-space: nowrap;
        }
        .crm-table tbody td {
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
          color: #334155;
          white-space: nowrap;
        }
        .crm-strong {
          font-weight: 600;
          color: #0f172a;
        }
        .crm-faint {
          font-size: 0.74rem;
          color: #94a3b8;
        }
        .crm-nowrap {
          white-space: nowrap;
        }
        .crm-message {
          max-width: 220px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .crm-fu {
          background: #f1f5f9;
          color: #475569;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .crm-id {
          background: #f1eefc;
          color: #4634ad;
          border: 1px solid #ded7f6;
          border-radius: 6px;
          padding: 3px 8px;
          font-size: 0.74rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .crm-stepper {
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }
        .crm-stepper button {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          background: #fff;
          color: #475569;
          font-weight: 700;
          line-height: 1;
        }
        .crm-stepper button:hover:not(:disabled) {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        .crm-stepper button:disabled {
          opacity: 0.4;
        }
        .crm-stepper span {
          min-width: 22px;
          text-align: center;
          font-weight: 600;
        }

        .crm-status {
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: #fff;
          color: #0f172a;
          padding: 6px 10px;
          font-size: 0.8rem;
          font-weight: 600;
          min-width: 136px;
        }

        .crm-score {
          border: 1px solid #cbd5e1;
          background: #fff;
          color: #0f172a;
          border-radius: 8px;
          padding: 6px 14px;
          font-weight: 700;
          font-size: 0.82rem;
        }
        .crm-score-cta {
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #475569;
          border-radius: 8px;
          padding: 6px 14px;
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .crm-pager {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding-top: 16px;
        }
        .crm-pager button {
          border: 1px solid #e2e8f0;
          background: #fff;
          border-radius: 8px;
          padding: 7px 18px;
          font-weight: 600;
          font-size: 0.85rem;
          color: #334155;
        }
        .crm-pager button:disabled {
          opacity: 0.45;
        }
        .crm-pager span {
          font-size: 0.85rem;
          color: #64748b;
        }

        .crm-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.5);
          z-index: 1060;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .crm-modal {
          background: #fff;
          border-radius: 16px;
          width: 560px;
          max-width: 100%;
          max-height: 88vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .crm-modal.sm {
          width: 440px;
        }
        .crm-modal-head.danger {
          background: #b91c1c;
        }
        .crm-btn.danger {
          background: #b91c1c;
        }
        .crm-confirm-text {
          margin: 0 0 6px;
          color: #0f172a;
          font-size: 0.95rem;
        }
        .crm-confirm-sub {
          margin: 0;
          color: #64748b;
          font-size: 0.85rem;
        }
        .crm-modal-head {
          background: #5641ce;
          color: #fff;
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .crm-modal-head h5 {
          margin: 0;
          font-weight: 700;
        }
        .crm-modal-head p {
          margin: 4px 0 0;
          font-size: 0.8rem;
          opacity: 0.85;
        }
        .crm-modal-head button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: #fff;
          border-radius: 8px;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
        }
        .crm-modal-body {
          padding: 18px 20px;
          overflow-y: auto;
        }
        .crm-legend {
          background: #f1eefc;
          color: #1e40af;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.82rem;
          margin-bottom: 14px;
        }
        .crm-question {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 14px;
          margin-bottom: 12px;
        }
        .crm-question p {
          margin: 0 0 10px;
          font-weight: 600;
          color: #0f172a;
          font-size: 0.9rem;
        }
        .crm-yn {
          display: flex;
          gap: 10px;
        }
        .crm-yn button {
          flex: 1;
          border: 1px solid #e2e8f0;
          background: #fff;
          border-radius: 10px;
          padding: 9px;
          font-weight: 600;
          color: #475569;
        }
        .crm-yn button.yes {
          background: #dcfce7;
          border-color: #22c55e;
          color: #15803d;
        }
        .crm-yn button.no {
          background: #fee2e2;
          border-color: #ef4444;
          color: #b91c1c;
        }
        .crm-modal-foot {
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 14px 20px;
          border-top: 1px solid #e2e8f0;
        }
        .crm-running {
          font-weight: 700;
          color: #0f172a;
          margin-right: auto;
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
