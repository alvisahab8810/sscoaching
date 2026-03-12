import { withAdminAuth } from "@/lib/withAdminAuth";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import React, { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight,
         FiAlertCircle, FiInfo, FiCheckCircle, FiZap, FiX, FiSave,
         FiBell, FiEye, FiEyeOff } from "react-icons/fi";
import { toast, Toaster } from "sonner";

const TYPE_OPTIONS = [
  { value: "info",    label: "Info",    color: "#4441e5" },
  { value: "success", label: "Update",  color: "#0a7c4e" },
  { value: "warning", label: "Notice",  color: "#b45309" },
  { value: "urgent",  label: "Urgent",  color: "#991b1b" },
];

const EMPTY_FORM = {
  title: "", description: "", link: "",
  linkLabel: "Read More", type: "info",
  isActive: true, priority: 0, expiresAt: "",
};

export default function AnnouncementsAdmin() {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState(null);
  const [form, setForm]         = useState(EMPTY_FORM);
  const [saving, setSaving]     = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      // Fetch ALL (including inactive) for admin — we'll use a separate admin endpoint
      // For now we use the public one and show all statuses
      const res  = await fetch("/api/announcements/admin-list");
      const data = await res.json();
      if (data.success) setItems(data.announcements);
    } catch {
      toast.error("Failed to load announcements");
    }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const openCreate = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditId(item._id);
    setForm({
      title:      item.title,
      description: item.description,
      link:       item.link || "",
      linkLabel:  item.linkLabel || "Read More",
      type:       item.type,
      isActive:   item.isActive,
      priority:   item.priority,
      expiresAt:  item.expiresAt
        ? new Date(item.expiresAt).toISOString().slice(0, 16)
        : "",
    });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
      priority:  Number(form.priority),
    };

    try {
      const url    = editId ? `/api/announcements/${editId}` : "/api/announcements";
      const method = editId ? "PUT" : "POST";

      const res  = await fetch(url, { method, body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" } });
      const data = await res.json();

      if (data.success) {
        toast.success(editId ? "Announcement updated!" : "Announcement created!");
        setShowForm(false);
        fetchAll();
      } else {
        toast.error("Failed to save");
      }
    } catch {
      toast.error("Error saving");
    }
    setSaving(false);
  };

  const toggleActive = async (item) => {
    try {
      const res  = await fetch(`/api/announcements/${item._id}`, {
        method: "PUT",
        body: JSON.stringify({ isActive: !item.isActive }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) =>
          prev.map((i) => i._id === item._id ? { ...i, isActive: !i.isActive } : i)
        );
        toast.success(item.isActive ? "Announcement hidden" : "Announcement shown");
      }
    } catch { toast.error("Failed to update"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      await fetch(`/api/announcements/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success("Deleted");
    } catch { toast.error("Delete failed"); }
  };

  const typeColor = (t) => TYPE_OPTIONS.find((o) => o.value === t)?.color || "#4441e5";

  return (
    <div>
      <Toaster richColors position="top-right" />
      <Topbar />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <AdminOffcanvas />

        <div className="flex-grow-1" style={{ background: "#f5f7fa" }}>
          <div className="container-fluid p-4">

            {/* ── Header ── */}
            <div className="ann-admin-header">
              <div>
                <h4 className="ann-admin-title">
                  <FiBell /> Announcement Bar
                </h4>
                <p className="ann-admin-sub">
                  Manage website announcements. Active items appear in the top bar for all visitors.
                </p>
              </div>
              <button className="ann-btn-create" onClick={openCreate}>
                <FiPlus /> New Announcement
              </button>
            </div>

            {/* ── Preview hint ── */}
            <div className="ann-preview-hint">
              <FiEye />
              <span>Active announcements appear as a colored bar at the top of every page on the website.</span>
            </div>

            {/* ── List ── */}
            {loading && <p style={{ color: "#8491a8", padding: "20px 0" }}>Loading…</p>}

            {!loading && items.length === 0 && (
              <div className="ann-empty">
                <FiBell size={32} />
                <p>No announcements yet. Create your first one!</p>
              </div>
            )}

            {!loading && items.length > 0 && (
              <div className="ann-list">
                {items.map((item) => (
                  <div className={`ann-card ${!item.isActive ? "ann-card--inactive" : ""}`} key={item._id}>

                    {/* Type stripe */}
                    <div className="ann-card-stripe" style={{ background: typeColor(item.type) }} />

                    <div className="ann-card-body">
                      <div className="ann-card-top">
                        {/* Badge */}
                        <span className="ann-type-badge"
                          style={{ background: typeColor(item.type) + "18", color: typeColor(item.type),
                            border: `1px solid ${typeColor(item.type)}30` }}>
                          {TYPE_OPTIONS.find(o => o.value === item.type)?.label}
                        </span>

                        {/* Status */}
                        <span className={`ann-status-pill ${item.isActive ? "ann-status-pill--on" : "ann-status-pill--off"}`}>
                          {item.isActive ? <><FiEye size={11}/> Live</> : <><FiEyeOff size={11}/> Hidden</>}
                        </span>

                        {/* Priority */}
                        {item.priority > 0 && (
                          <span className="ann-priority-pill">Priority {item.priority}</span>
                        )}
                      </div>

                      <h5 className="ann-card-title">{item.title}</h5>
                      <p className="ann-card-desc">{item.description}</p>

                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer"
                          className="ann-card-link">
                          🔗 {item.link}
                        </a>
                      )}

                      {item.expiresAt && (
                        <p className="ann-card-expires">
                          Expires: {new Date(item.expiresAt).toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="ann-card-actions">
                      <button className="ann-icon-btn ann-icon-btn--toggle"
                        onClick={() => toggleActive(item)}
                        title={item.isActive ? "Hide" : "Show"}>
                        {item.isActive ? <FiToggleRight size={18} /> : <FiToggleLeft size={18} />}
                      </button>
                      <button className="ann-icon-btn ann-icon-btn--edit"
                        onClick={() => openEdit(item)} title="Edit">
                        <FiEdit2 size={15} />
                      </button>
                      <button className="ann-icon-btn ann-icon-btn--delete"
                        onClick={() => handleDelete(item._id)} title="Delete">
                        <FiTrash2 size={15} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ════════════════════════
          SLIDE-IN FORM PANEL
      ════════════════════════ */}
      {showForm && (
        <>
          <div className="ann-overlay" onClick={() => setShowForm(false)} />
          <div className="ann-panel">
            <div className="ann-panel-head">
              <span>{editId ? "Edit Announcement" : "New Announcement"}</span>
              <button className="ann-panel-close" onClick={() => setShowForm(false)}>
                <FiX />
              </button>
            </div>

            <form className="ann-panel-body" onSubmit={handleSave}>

              {/* Type selector */}
              <div className="ann-field">
                <label className="ann-label">Type <span className="ann-req">*</span></label>
                <div className="ann-type-grid">
                  {TYPE_OPTIONS.map((opt) => (
                    <button type="button" key={opt.value}
                      className={`ann-type-opt ${form.type === opt.value ? "ann-type-opt--active" : ""}`}
                      style={{
                        "--tc": opt.color,
                        borderColor: form.type === opt.value ? opt.color : "#e0e3f5",
                        background:  form.type === opt.value ? opt.color + "12" : "#f7f8ff",
                      }}
                      onClick={() => setForm({ ...form, type: opt.value })}>
                      <span style={{ color: opt.color, fontWeight: 700 }}>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live preview strip */}
              {/* <div className="ann-live-preview"
                style={{ background: typeColor(form.type) }}>
                <span className="ann-preview-badge">
                  {TYPE_OPTIONS.find(o => o.value === form.type)?.label || "INFO"}
                </span>
                <span className="ann-preview-title">{form.title || "Your title here"}</span>
                {form.description && (
                  <span className="ann-preview-desc">— {form.description}</span>
                )}
                {form.link && (
                  <span className="ann-preview-link">{form.linkLabel || "Read More"} ↗</span>
                )}
              </div> */}

              <div className="ann-field">
                <label className="ann-label">Title <span className="ann-req">*</span></label>
                <input className="ann-input" type="text" required maxLength={120}
                  placeholder="e.g. NIOS Admission 2025-26 now open!"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <span className="ann-hint">{form.title.length}/120 characters</span>
              </div>

              <div className="ann-field">
                <label className="ann-label">Short Description <span className="ann-req">*</span></label>
                <input className="ann-input" type="text" required maxLength={200}
                  placeholder="e.g. Last date to apply is 31st March 2025."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <span className="ann-hint">{form.description.length}/200 characters</span>
              </div>

              <div className="ann-field">
                <label className="ann-label">Read More Link <span className="ann-optional">(optional)</span></label>
                <input className="ann-input" type="url"
                  placeholder="https://yoursite.com/page"
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })} />
              </div>

              {form.link && (
                <div className="ann-field">
                  <label className="ann-label">Link Button Label</label>
                  <input className="ann-input" type="text" maxLength={30}
                    placeholder="Read More"
                    value={form.linkLabel}
                    onChange={(e) => setForm({ ...form, linkLabel: e.target.value })} />
                </div>
              )}

              <div className="ann-row-2">
                <div className="ann-field">
                  <label className="ann-label">Priority</label>
                  <input className="ann-input" type="number" min={0} max={10}
                    placeholder="0 = default"
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })} />
                  <span className="ann-hint">Higher = shown first</span>
                </div>

                <div className="ann-field">
                  <label className="ann-label">Auto-expire <span className="ann-optional">(optional)</span></label>
                  <input className="ann-input" type="datetime-local"
                    value={form.expiresAt}
                    onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} />
                  <span className="ann-hint">Leave blank = never expires</span>
                </div>
              </div>

              <div className="ann-field">
                <label className="ann-toggle-row">
                  <input type="checkbox" checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                  <span className="ann-toggle-label">
                    Publish immediately (make visible on website)
                  </span>
                </label>
              </div>

              <div className="ann-panel-footer">
                <button type="button" className="ann-btn-cancel"
                  onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="ann-btn-save" disabled={saving}>
                  <FiSave size={15} />
                  {saving ? "Saving…" : editId ? "Save Changes" : "Publish Announcement"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      <style jsx>{`
        /* ── Page header ── */
        .ann-admin-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .ann-admin-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f1f3d;
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 4px;
        }
        .ann-admin-sub {
          font-size: 0.84rem;
          color: #8491a8;
          margin: 0;
        }
        .ann-btn-create {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: linear-gradient(135deg, #4441e5, #3533c4);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 10px 20px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(68,65,229,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .ann-btn-create:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(68,65,229,0.45);
        }

        /* Preview hint */
        .ann-preview-hint {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(68,65,229,0.06);
          border: 1px solid rgba(68,65,229,0.15);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 0.82rem;
          color: #4441e5;
          margin-bottom: 24px;
        }

        /* Empty state */
        .ann-empty {
          text-align: center;
          padding: 60px 20px;
          color: #8491a8;
        }
        .ann-empty p { margin-top: 12px; font-size: 0.9rem; }

        /* ── Card list ── */
        .ann-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ann-card {
          display: flex;
          align-items: stretch;
          background: #fff;
          border: 1.5px solid #e8eaf5;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(68,65,229,0.05);
          transition: box-shadow 0.2s;
        }
        .ann-card:hover { box-shadow: 0 4px 20px rgba(68,65,229,0.1); }
        .ann-card--inactive { opacity: 0.55; }

        .ann-card-stripe {
          width: 4px;
          flex-shrink: 0;
        }

        .ann-card-body {
          flex: 1;
          padding: 14px 16px;
          min-width: 0;
        }

        .ann-card-top {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }

        .ann-type-badge {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 2px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .ann-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 20px;
        }
        .ann-status-pill--on  { background: rgba(0,203,184,0.1); color: #0a7c4e; }
        .ann-status-pill--off { background: #f1f3fa; color: #8491a8; }

        .ann-priority-pill {
          font-size: 0.68rem;
          font-weight: 700;
          background: rgba(245,158,11,0.1);
          color: #b45309;
          padding: 2px 8px;
          border-radius: 20px;
        }

        .ann-card-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0f1f3d;
          margin: 0 0 4px;
        }
        .ann-card-desc {
          font-size: 0.83rem;
          color: #6b7a99;
          margin: 0 0 6px;
        }
        .ann-card-link {
          font-size: 0.78rem;
          color: #4441e5;
          text-decoration: none;
          display: block;
          margin-bottom: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ann-card-expires {
          font-size: 0.72rem;
          color: #b45309;
          margin: 4px 0 0;
        }

        .ann-card-actions {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 10px 12px;
          justify-content: center;
          border-left: 1px solid #f0f1fa;
          flex-shrink: 0;
        }

        .ann-icon-btn {
          width: 32px;
          height: 32px;
          border: 1.5px solid #e8eaf5;
          border-radius: 7px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          color: #8491a8;
        }
        .ann-icon-btn--toggle { color: #4441e5; }
        .ann-icon-btn--toggle:hover { background: rgba(68,65,229,0.08); border-color: #4441e5; }
        .ann-icon-btn--edit:hover   { background: rgba(0,203,184,0.08); border-color: #00cbb8; color: #00cbb8; }
        .ann-icon-btn--delete:hover { background: rgba(239,68,68,0.08);  border-color: #ef4444; color: #ef4444; }

        /* ── Overlay + Slide Panel ── */
        .ann-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 9998;
          animation: annFadeIn 0.2s ease;
        }
        @keyframes annFadeIn { from { opacity: 0; } to { opacity: 1; } }

        .ann-panel {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: 460px;
          background: #fff;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 40px rgba(0,0,0,0.15);
          animation: annSlideIn 0.25s ease;
        }
        @keyframes annSlideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }

        .ann-panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          background: linear-gradient(135deg, #0b1437, #1a1a6e);
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .ann-panel-close {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
          width: 30px; height: 30px;
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 1rem;
          transition: background 0.2s;
        }
        .ann-panel-close:hover { background: rgba(255,255,255,0.25); }

        .ann-panel-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Type grid */
        .ann-type-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .ann-type-opt {
          padding: 9px 12px;
          border-radius: 8px;
          border: 1.5px solid #e0e3f5;
          background: #f7f8ff;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.84rem;
          transition: border-color 0.2s, background 0.2s;
          text-align: left;
        }

        /* Live preview */
        .ann-live-preview {
          border-radius: 8px;
          padding: 8px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          overflow: hidden;
          position: relative;
        }
        .ann-preview-badge {
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          color: #fff;
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 2px 7px;
          border-radius: 3px;
          flex-shrink: 0;
        }
        .ann-preview-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: #fff;
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ann-preview-desc {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.75);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ann-preview-link {
          font-size: 0.72rem;
          font-weight: 700;
          background: rgba(255,255,255,0.2);
          color: #fff;
          padding: 2px 8px;
          border-radius: 3px;
          flex-shrink: 0;
        }

        /* Fields */
        .ann-field { display: flex; flex-direction: column; gap: 5px; }
        .ann-label { font-size: 0.75rem; font-weight: 700; color: #2d3a5a; text-transform: uppercase; letter-spacing: 0.04em; }
        .ann-req { color: #ef4444; }
        .ann-optional { color: #a0abbe; font-weight: 500; text-transform: none; }
        .ann-hint { font-size: 0.71rem; color: #a0abbe; }

        .ann-input {
          border: 1.5px solid #e0e3f5;
          border-radius: 8px;
          padding: 9px 12px;
          font-family: inherit;
          font-size: 0.88rem;
          color: #0f1f3d;
          background: #f7f8ff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .ann-input:focus {
          border-color: #4441e5;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(68,65,229,0.1);
        }

        .ann-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .ann-toggle-row {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          padding: 10px 14px;
          background: rgba(68,65,229,0.04);
          border: 1.5px solid rgba(68,65,229,0.12);
          border-radius: 8px;
        }
        .ann-toggle-row input { width: 16px; height: 16px; accent-color: #4441e5; cursor: pointer; }
        .ann-toggle-label { font-size: 0.84rem; font-weight: 600; color: #2d3a5a; }

        .ann-panel-footer {
          display: flex;
          gap: 10px;
          padding-top: 8px;
          border-top: 1px solid #f0f1fa;
          margin-top: auto;
        }
        .ann-btn-cancel {
          flex: 1;
          padding: 11px;
          border: 1.5px solid #e0e3f5;
          border-radius: 9px;
          background: #fff;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 600;
          color: #6b7a99;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .ann-btn-cancel:hover { border-color: #4441e5; color: #4441e5; }
        .ann-btn-save {
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 11px;
          border: none;
          border-radius: 9px;
          background: linear-gradient(135deg, #4441e5, #3533c4);
          color: #fff;
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(68,65,229,0.35);
          transition: opacity 0.2s;
        }
        .ann-btn-save:disabled { opacity: 0.6; cursor: not-allowed; }

        @media (max-width: 640px) {
          .ann-panel { width: 100vw; }
          .ann-row-2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));