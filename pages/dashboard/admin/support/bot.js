import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { toast } from "sonner";
import { FiPlus, FiEdit2, FiTrash2, FiArrowUp, FiArrowDown, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import SalesStyles from "@/components/dashboard/sales/SalesStyles";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const EMPTY = { title: "", answer: "", keywords: "", linkLabel: "", linkUrl: "", active: true };

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

export default function SupportBotPage() {
  const [nodes, setNodes] = useState(null);
  const [settings, setSettings] = useState(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [open, setOpen] = useState({});
  const [form, setForm] = useState(null); // { id?, parent, ...fields }
  const [saving, setSaving] = useState(false);

  const load = () =>
    api("/api/admin/support/bot")
      .then((d) => {
        setNodes(d.nodes);
        setSettings((s) => s || d.settings);
      })
      .catch((e) => toast.error(e.message));

  useEffect(() => {
    load();
  }, []);

  const children = useMemo(() => {
    const map = {};
    (nodes || []).forEach((n) => {
      const k = n.parent || "root";
      (map[k] = map[k] || []).push(n);
    });
    Object.values(map).forEach((arr) => arr.sort((a, b) => a.order - b.order || String(a.createdAt).localeCompare(String(b.createdAt))));
    return map;
  }, [nodes]);

  const openForm = (node, parent = null) =>
    setForm(
      node
        ? { id: node._id, parent: node.parent, ...node, keywords: (node.keywords || []).join(", ") }
        : { ...EMPTY, parent }
    );

  const saveForm = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Question is required");
    setSaving(true);
    const body = {
      title: form.title,
      answer: form.answer,
      keywords: form.keywords.split(",").map((k) => k.trim()).filter(Boolean),
      linkLabel: form.linkLabel,
      linkUrl: form.linkUrl,
      active: form.active,
    };
    try {
      if (form.id) await api(`/api/admin/support/bot/${form.id}`, "PUT", body);
      else {
        await api("/api/admin/support/bot", "POST", { ...body, parent: form.parent });
        if (form.parent) setOpen((o) => ({ ...o, [form.parent]: true }));
      }
      toast.success("Saved");
      setForm(null);
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (node) => {
    const kids = (children[node._id] || []).length;
    const msg = kids ? `Delete "${node.title}" and everything under it?` : `Delete "${node.title}"?`;
    if (!window.confirm(msg)) return;
    try {
      await api(`/api/admin/support/bot/${node._id}`, "DELETE");
      toast.success("Deleted");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const toggle = async (node) => {
    try {
      await api(`/api/admin/support/bot/${node._id}`, "PUT", { active: !node.active });
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Swaps the order with the neighbour; renumbers the whole level so gaps or
  // equal numbers never get in the way.
  const move = async (node, by) => {
    const level = [...(children[node.parent || "root"] || [])];
    const i = level.findIndex((n) => n._id === node._id);
    const j = i + by;
    if (j < 0 || j >= level.length) return;
    [level[i], level[j]] = [level[j], level[i]];
    try {
      await Promise.all(
        level.map((n, idx) => (n.order === idx ? null : api(`/api/admin/support/bot/${n._id}`, "PUT", { order: idx }))).filter(Boolean)
      );
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const saveSettings = async () => {
    setSavingSettings(true);
    try {
      await api("/api/admin/support/bot", "PUT", { settings });
      toast.success("Settings saved");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  const renderLevel = (key, depth) =>
    (children[key] || []).map((n, idx, arr) => {
      const kids = children[n._id] || [];
      const expanded = !!open[n._id];
      return (
        <div key={n._id}>
          <div className="bb-row" style={{ paddingLeft: 12 + depth * 24 }}>
            <button className="bb-caret" onClick={() => setOpen((o) => ({ ...o, [n._id]: !expanded }))} disabled={!kids.length}>
              {kids.length ? expanded ? <FiChevronDown size={15} /> : <FiChevronRight size={15} /> : null}
            </button>
            <div className="bb-main">
              <div className="bb-title" style={{ opacity: n.active ? 1 : 0.5 }}>
                {n.title}
                {kids.length > 0 && <span className="sl-faint" style={{ fontWeight: 500 }}> · {kids.length} under it</span>}
              </div>
              {n.answer && <div className="bb-answer">{n.answer}</div>}
              {(n.keywords?.length > 0 || n.linkUrl) && (
                <div style={{ marginTop: 4 }}>
                  {n.keywords?.map((k) => (
                    <span key={k} className="sl-tag">{k}</span>
                  ))}
                  {n.linkUrl && <span className="sl-faint" style={{ fontSize: "0.75rem" }}>Link: {n.linkLabel || n.linkUrl}</span>}
                </div>
              )}
            </div>
            <div className="bb-actions">
              <button className={`sl-switch ${n.active ? "on" : ""}`} title={n.active ? "Shown to students" : "Hidden"} onClick={() => toggle(n)} />
              <button className="sl-icon-btn sm" title="Move up" disabled={idx === 0} onClick={() => move(n, -1)}>
                <FiArrowUp size={14} />
              </button>
              <button className="sl-icon-btn sm" title="Move down" disabled={idx === arr.length - 1} onClick={() => move(n, 1)}>
                <FiArrowDown size={14} />
              </button>
              <button className="sl-icon-btn sm brand" title="Add a question under this" onClick={() => openForm(null, n._id)}>
                <FiPlus size={14} />
              </button>
              <button className="sl-icon-btn sm" title="Edit" onClick={() => openForm(n)}>
                <FiEdit2 size={14} />
              </button>
              <button className="sl-icon-btn sm danger" title="Delete" onClick={() => remove(n)}>
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>
          {expanded && renderLevel(n._id, depth + 1)}
        </div>
      );
    });

  const parentTitle = form?.parent ? nodes?.find((n) => n._id === form.parent)?.title : null;

  return (
    <div>
      <Head>
        <title>Support Bot — SS Coaching</title>
      </Head>
      <SalesStyles />
      <style jsx global>{`
        .bb-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 12px;
          border-top: 1px solid #f1f5f9;
        }
        .bb-caret {
          background: none;
          border: none;
          width: 22px;
          height: 22px;
          padding: 0;
          color: #64748b;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .bb-main {
          flex: 1;
          min-width: 0;
        }
        .bb-title {
          font-weight: 600;
          color: #0f172a;
          font-size: 0.9rem;
        }
        .bb-answer {
          color: #64748b;
          font-size: 0.82rem;
          margin-top: 2px;
          white-space: pre-wrap;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bb-actions {
          display: flex;
          gap: 6px;
          align-items: center;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .bb-row {
            flex-wrap: wrap;
          }
          .bb-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
        .bb-days {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
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
                <Link href="/dashboard/admin/support" className="sl-back">
                  ← Support Inbox
                </Link>
                <h4 className="sl-title">Support Bot</h4>
                <p className="sl-sub">
                  The questions students can pick before talking to a person. A question can have its own follow-up questions under it.
                </p>
              </div>
              <button className="sl-btn" onClick={() => openForm(null, null)}>
                <FiPlus size={16} /> Add question
              </button>
            </div>

            <div className="sl-grid-side" style={{ gridTemplateColumns: "1fr 360px" }}>
              <div className="sl-card" style={{ paddingBottom: 0, overflow: "hidden" }}>
                <h6 className="sl-card-title">
                  Questions <small>{nodes ? nodes.length : ""}</small>
                </h6>
                <div style={{ margin: "0 -16px" }}>
                  {!nodes && <p className="sl-empty">Loading…</p>}
                  {nodes && !nodes.length && (
                    <p className="sl-empty">No questions yet. Students will only see the option to talk to the support team.</p>
                  )}
                  {nodes && renderLevel("root", 0)}
                </div>
                <p className="sl-hint" style={{ padding: "12px 0" }}>
                  Students always also get a &quot;Talk to support team&quot; option. Keywords help the bot answer when a student types instead of clicking.
                </p>
              </div>

              <div>
                {settings && (
                  <div className="sl-card">
                    <h6 className="sl-card-title">Settings</h6>
                    <label className="sl-label">Greeting</label>
                    <textarea
                      className="sl-input"
                      rows={2}
                      value={settings.greeting}
                      onChange={(e) => setSettings({ ...settings, greeting: e.target.value })}
                    />

                    <div className="d-flex align-items-center justify-content-between" style={{ margin: "16px 0 8px" }}>
                      <span className="sl-label" style={{ margin: 0 }}>Office hours (IST)</span>
                      <button
                        className={`sl-switch ${settings.hoursEnabled ? "on" : ""}`}
                        onClick={() => setSettings({ ...settings, hoursEnabled: !settings.hoursEnabled })}
                      />
                    </div>
                    {settings.hoursEnabled ? (
                      <>
                        <div className="bb-days" style={{ marginBottom: 10 }}>
                          {DAYS.map((d, i) => {
                            const on = settings.days.includes(i);
                            return (
                              <button
                                key={d}
                                className={`sl-chip ${on ? "active" : ""}`}
                                style={{ padding: "4px 11px" }}
                                onClick={() =>
                                  setSettings({ ...settings, days: on ? settings.days.filter((x) => x !== i) : [...settings.days, i].sort() })
                                }
                              >
                                {d}
                              </button>
                            );
                          })}
                        </div>
                        <div className="d-flex gap-2">
                          <div style={{ flex: 1 }}>
                            <label className="sl-label">From</label>
                            <input type="time" className="sl-input" value={settings.start} onChange={(e) => setSettings({ ...settings, start: e.target.value })} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label className="sl-label">To</label>
                            <input type="time" className="sl-input" value={settings.end} onChange={(e) => setSettings({ ...settings, end: e.target.value })} />
                          </div>
                        </div>
                        <label className="sl-label" style={{ marginTop: 12 }}>Message outside office hours</label>
                        <textarea
                          className="sl-input"
                          rows={3}
                          value={settings.offHoursMessage}
                          onChange={(e) => setSettings({ ...settings, offHoursMessage: e.target.value })}
                        />
                      </>
                    ) : (
                      <p className="sl-hint" style={{ margin: 0 }}>Off: students can ask for an agent at any time.</p>
                    )}

                    <label className="sl-label" style={{ marginTop: 12 }}>Message when no agent is online</label>
                    <textarea
                      className="sl-input"
                      rows={3}
                      value={settings.noAgentMessage}
                      onChange={(e) => setSettings({ ...settings, noAgentMessage: e.target.value })}
                    />
                    <p className="sl-hint">The chat still lands in the Waiting list, and the first agent to reply takes it.</p>

                    <label className="sl-label" style={{ marginTop: 12 }}>Close idle chats after (minutes)</label>
                    <input
                      type="number"
                      className="sl-input"
                      min={5}
                      max={1440}
                      value={settings.autoCloseMinutes ?? 5}
                      onChange={(e) => setSettings({ ...settings, autoCloseMinutes: e.target.value })}
                    />
                    <p className="sl-hint">Bot and agent chats close when nobody has written for this long. Chats no agent has taken close after 24 hours.</p>

                    <button className="sl-btn" style={{ marginTop: 6 }} disabled={savingSettings} onClick={saveSettings}>
                      {savingSettings ? "Saving…" : "Save settings"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {form && (
        <div className="sl-modal-backdrop" onClick={() => !saving && setForm(null)}>
          <form className="sl-modal" onClick={(e) => e.stopPropagation()} onSubmit={saveForm}>
            <div className="sl-modal-head">
              <h5 style={{ margin: 0, fontWeight: 700 }}>{form.id ? "Edit question" : "Add question"}</h5>
              {!form.id && <div className="sl-faint" style={{ fontSize: "0.8rem" }}>{parentTitle ? `Under: ${parentTitle}` : "Shown on the main menu"}</div>}
            </div>
            <div className="sl-modal-body">
              <label className="sl-label">Question (the button the student clicks)</label>
              <input className="sl-input" maxLength={120} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} autoFocus />

              <label className="sl-label" style={{ marginTop: 12 }}>Answer</label>
              <textarea className="sl-input" rows={5} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
              <p className="sl-hint">Can be left empty if this only opens the questions under it.</p>

              <label className="sl-label" style={{ marginTop: 8 }}>Keywords (comma separated)</label>
              <input
                className="sl-input"
                placeholder="fees, fee, payment"
                value={form.keywords}
                onChange={(e) => setForm({ ...form, keywords: e.target.value })}
              />

              <div className="d-flex gap-2" style={{ marginTop: 12 }}>
                <div style={{ flex: 1 }}>
                  <label className="sl-label">Link text</label>
                  <input className="sl-input" placeholder="View courses" value={form.linkLabel} onChange={(e) => setForm({ ...form, linkLabel: e.target.value })} />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="sl-label">Link</label>
                  <input className="sl-input" placeholder="/courses or https://…" value={form.linkUrl} onChange={(e) => setForm({ ...form, linkUrl: e.target.value })} />
                </div>
              </div>

              <div className="d-flex align-items-center gap-2" style={{ marginTop: 14 }}>
                <button type="button" className={`sl-switch ${form.active ? "on" : ""}`} onClick={() => setForm({ ...form, active: !form.active })} />
                <span style={{ fontSize: "0.86rem" }}>{form.active ? "Shown to students" : "Hidden"}</span>
              </div>
            </div>
            <div className="sl-modal-foot">
              <button type="button" className="sl-btn-ghost" disabled={saving} onClick={() => setForm(null)}>
                Cancel
              </button>
              <button type="submit" className="sl-btn" disabled={saving}>
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }), { superAdminOnly: true });
