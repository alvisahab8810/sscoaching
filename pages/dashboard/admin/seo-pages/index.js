"use client";
import { withAdminAuth } from "@/lib/withAdminAuth";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";
import { seoScore } from "@/lib/seoScore";
import {
  FaTrash,
  FaTimes,
  FaSearch,
  FaPlus,
  FaPen,
  FaExternalLinkAlt,
  FaSync,
} from "react-icons/fa";

const lower = (v) => String(v || "").toLowerCase();

// seoScore returns bootstrap variants. Mapped here so the badge stays on the
// dashboard palette: accent for a good score, slate for mid, red for poor.
const SCORE_TONE = { success: "good", warning: "mid", danger: "poor" };

const fmtDateTime = (d) => {
  if (!d) return null;
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return null;
  return {
    date: dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  };
};

export default function SeoPagesAdmin() {
  const router = useRouter();

  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "" });

  const [confirming, setConfirming] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seo-pages", { cache: "no-store" });
      const data = await res.json();
      if (data.success) setPages(data.data);
      else toast.error(data.message || "Could not load pages");
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const slugify = (v) =>
    v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/admin/seo-pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: form.title, slug: form.slug }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Page created. Add your sections now.");
        // Straight into the builder -- an empty page in the list is of no use.
        router.push(`/dashboard/admin/seo-pages/${data.data.slug}`);
      } else {
        toast.error(data.message || "Could not create page");
      }
    } catch (err) {
      toast.error(err.message);
    }

    setSaving(false);
  };

  const togglePublish = async (page) => {
    const next = page.status === "published" ? "draft" : "published";
    setTogglingId(page._id);

    try {
      const res = await fetch(`/api/admin/seo-pages/${page.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(next === "published" ? "Page is now live" : "Moved to draft");
        fetchPages();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error(err.message);
    }

    setTogglingId(null);
  };

  const deletePage = async () => {
    if (!confirming) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/seo-pages/${confirming.slug}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        toast.success("Page deleted");
        setConfirming(null);
        fetchPages();
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      toast.error(err.message);
    }

    setDeleting(false);
  };

  const visible = useMemo(() => {
    const q = lower(query).trim();

    return pages.filter((p) => {
      if (status === "published" && p.status !== "published") return false;
      if (status === "draft" && p.status === "published") return false;
      if (!q) return true;
      return [p.title, p.slug, p.focusKeyword].some((v) => lower(v).includes(q));
    });
  }, [pages, query, status]);

  return (
    <div>
      <Topbar />
      <AdminOffcanvas />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />

        <div className="flex-grow-1 sp-bg" style={{ minWidth: 0 }}>
          <div className="container-fluid p-4">
            {/* Header */}
            <div className="sp-head">
              <div>
                <h4 className="sp-title">SEO Pages</h4>
                <p className="sp-sub">
                  Build complete landing pages without a developer. Pick sections, write the
                  content, fill in the SEO details and publish &mdash; the page goes live at{" "}
                  <code>sscoaching.in/your-url</code> straight away.
                </p>
              </div>

              <div className="sp-head-actions">
                <button className="sp-icon-btn" onClick={fetchPages} title="Refresh">
                  <span className="sp-ico">
                    <FaSync />
                  </span>
                </button>
                <button className="sp-btn" onClick={() => setShowForm((v) => !v)}>
                  <span className="sp-ico">{showForm ? <FaTimes /> : <FaPlus />}</span>
                  {showForm ? "Cancel" : "New Page"}
                </button>
              </div>
            </div>

            {/* Create form */}
            {showForm && (
              <form onSubmit={handleCreate} className="sp-card">
                <h6 className="sp-card-title">Create a landing page</h6>

                <div className="sp-grid">
                  <div className="sp-field">
                    <label>Page Title</label>
                    <input
                      required
                      value={form.title}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          title: e.target.value,
                          // only auto-fill while the admin has not typed a URL
                          slug: f.slug || slugify(e.target.value),
                        }))
                      }
                      placeholder="NIOS Admission in Lucknow"
                    />
                    <p className="sp-hint">
                      Internal name. The title shown on Google is set separately in the SEO tab.
                    </p>
                  </div>

                  <div className="sp-field">
                    <label>Page URL</label>
                    <div className="sp-prefix">
                      <span>sscoaching.in/</span>
                      <input
                        required
                        value={form.slug}
                        onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                        placeholder="nios-admission-lucknow"
                      />
                    </div>
                    <p className="sp-hint">
                      Keep it short and include the main keyword. Changing it later breaks any
                      link already pointing here.
                    </p>
                  </div>
                </div>

                <button type="submit" className="sp-btn mt" disabled={saving}>
                  {saving ? "Creating…" : "Create & Start Building"}
                </button>
              </form>
            )}

            {/* Search + filter + table */}
            <div className="sp-card">
              <div className="sp-toolbar">
                <div className="sp-search">
                  <span className="sp-search-icon">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by title, URL or keyword"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                <select
                  className="sp-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>

                <span className="sp-count">
                  {visible.length} {visible.length === 1 ? "page" : "pages"}
                </span>
              </div>

              {loading && <p className="sp-empty">Loading pages…</p>}

              {!loading && visible.length === 0 && (
                <p className="sp-empty">
                  {pages.length
                    ? "No page matches that search."
                    : "No pages yet. Click New Page to build your first one."}
                </p>
              )}

              {!loading && visible.length > 0 && (
                <div className="sp-table-wrap">
                  <table className="sp-table">
                    <thead>
                      <tr>
                        <th>Page</th>
                        <th>URL</th>
                        <th>Sections</th>
                        <th>SEO</th>
                        <th>Status</th>
                        <th>Last Updated</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {visible.map((p) => {
                        const score = seoScore(p);
                        const tone = SCORE_TONE[score.variant] || "mid";
                        const when = fmtDateTime(p.updatedAt);
                        const live = p.status === "published";

                        return (
                          <tr key={p._id}>
                            <td>
                              <div className="sp-strong">{p.title}</div>
                              {p.focusKeyword ? (
                                <div className="sp-faint">Keyword: {p.focusKeyword}</div>
                              ) : (
                                <div className="sp-faint">No focus keyword</div>
                              )}
                            </td>

                            <td>
                              <span className="sp-slug">/{p.slug}</span>
                            </td>

                            <td>
                              <span className="sp-pill">{p.blockCount}</span>
                            </td>

                            <td>
                              <span className={`sp-score ${tone}`}>{score.percent}%</span>
                            </td>

                            <td>
                              <button
                                className={`sp-status ${live ? "is-live" : "is-draft"}`}
                                onClick={() => togglePublish(p)}
                                disabled={togglingId === p._id}
                                title="Click to change status"
                              >
                                {live ? "Published" : "Draft"}
                              </button>
                            </td>

                            <td>
                              {when ? (
                                <>
                                  <div className="sp-strong">{when.date}</div>
                                  <div className="sp-faint">{when.time}</div>
                                </>
                              ) : (
                                <span className="sp-faint">—</span>
                              )}
                            </td>

                            <td>
                              <div className="sp-actions">
                                <button
                                  className="sp-row-btn primary"
                                  onClick={() =>
                                    router.push(`/dashboard/admin/seo-pages/${p.slug}`)
                                  }
                                  title="Open the builder"
                                >
                                  <span className="sp-ico">
                                    <FaPen />
                                  </span>
                                  Edit
                                </button>

                                <a
                                  className="sp-row-btn"
                                  href={`/${p.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Open the public page"
                                >
                                  <span className="sp-ico">
                                    <FaExternalLinkAlt />
                                  </span>
                                  View
                                </a>

                                <button
                                  className="sp-icon-btn danger sm"
                                  onClick={() => setConfirming(p)}
                                  title="Delete page"
                                >
                                  <span className="sp-ico">
                                    <FaTrash />
                                  </span>
                                </button>
                              </div>
                            </td>
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

      {/* Delete confirmation */}
      {confirming && (
        <div className="sp-modal-backdrop" onClick={() => !deleting && setConfirming(null)}>
          <div className="sp-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sp-modal-head danger">
              <div>
                <h5>Delete page</h5>
                <p>This cannot be undone</p>
              </div>
              <button onClick={() => setConfirming(null)} disabled={deleting}>
                <FaTimes />
              </button>
            </div>

            <div className="sp-modal-body">
              <p className="sp-confirm-text">
                <strong>{confirming.title}</strong> · /{confirming.slug}
              </p>
              <p className="sp-confirm-sub">
                The public page will stop working and all of its {confirming.blockCount}{" "}
                section(s) will be removed.
              </p>
            </div>

            <div className="sp-modal-foot">
              <button
                className="sp-btn-ghost"
                onClick={() => setConfirming(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button className="sp-btn danger" onClick={deletePage} disabled={deleting}>
                {deleting ? "Deleting…" : "Delete Page"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .sp-bg {
          background: #f1f5f9;
        }

        /* react-icons renders its own svg, which styled-jsx will not scope,
           so every icon that needs sizing sits inside a span. */
        .sp-ico {
          display: inline-flex;
          align-items: center;
          font-size: 0.78rem;
        }

        .sp-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
        }
        .sp-title {
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .sp-sub {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 0.86rem;
          max-width: 680px;
        }
        .sp-sub code {
          background: #f1f5f9;
          color: #4634ad;
          border-radius: 4px;
          padding: 1px 5px;
        }
        .sp-head-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .sp-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #5641ce;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 9px 18px;
          font-weight: 600;
          font-size: 0.88rem;
        }
        .sp-btn.mt {
          margin-top: 16px;
        }
        .sp-btn:hover:not(:disabled) {
          background: #4634ad;
        }
        .sp-btn:disabled {
          opacity: 0.6;
        }
        .sp-btn.danger {
          background: #b91c1c;
        }
        .sp-btn-ghost {
          background: #fff;
          color: #334155;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 9px 18px;
          font-weight: 600;
          font-size: 0.88rem;
        }

        .sp-icon-btn {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          width: 40px;
          height: 40px;
          color: #475569;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sp-icon-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        .sp-icon-btn.sm {
          width: 32px;
          height: 32px;
        }
        .sp-icon-btn.danger {
          color: #ef4444;
          border-color: #fecaca;
          background: #fef2f2;
        }
        .sp-icon-btn.danger:hover {
          background: #fee2e2;
          border-color: #fca5a5;
        }

        .sp-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
          margin-bottom: 14px;
        }
        .sp-card-title {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.95rem;
          margin: 0 0 14px;
        }

        .sp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 14px;
        }
        .sp-field label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          color: #475569;
          margin-bottom: 6px;
        }
        .sp-field input {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.88rem;
          color: #0f172a;
          background: #fff;
        }
        .sp-field input:focus {
          outline: none;
          border-color: #5641ce;
          box-shadow: 0 0 0 3px rgba(86, 65, 206, 0.1);
        }
        .sp-prefix {
          display: flex;
          align-items: stretch;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
        }
        .sp-prefix span {
          display: inline-flex;
          align-items: center;
          background: #f8fafc;
          border-right: 1px solid #e2e8f0;
          padding: 0 12px;
          font-size: 0.82rem;
          color: #64748b;
          white-space: nowrap;
        }
        .sp-prefix input {
          border: none;
          border-radius: 0;
          flex: 1 1 auto;
          min-width: 0;
        }
        .sp-prefix input:focus {
          box-shadow: none;
        }
        .sp-hint {
          margin: 6px 0 0;
          font-size: 0.76rem;
          color: #94a3b8;
        }

        .sp-toolbar {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .sp-search {
          position: relative;
          flex: 1 1 320px;
        }
        .sp-search input {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px 10px 38px;
          font-size: 0.88rem;
          background: #f8fafc;
        }
        .sp-search input:focus {
          outline: none;
          border-color: #5641ce;
          background: #fff;
        }
        .sp-search-icon {
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
        .sp-select {
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.86rem;
          background: #fff;
          color: #334155;
          min-width: 150px;
        }
        .sp-count {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.9rem;
          margin-left: auto;
        }

        .sp-empty {
          color: #64748b;
          padding: 24px 0;
          margin: 0;
        }

        .sp-table-wrap {
          overflow-x: auto;
        }
        .sp-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .sp-table thead th {
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
        .sp-table tbody td {
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
          color: #334155;
          white-space: nowrap;
        }
        .sp-table tbody tr:hover {
          background: #f8fafc;
        }
        .sp-strong {
          font-weight: 600;
          color: #0f172a;
        }
        .sp-faint {
          font-size: 0.74rem;
          color: #94a3b8;
        }

        .sp-slug {
          background: #f1eefc;
          color: #4634ad;
          border: 1px solid #ded7f6;
          border-radius: 6px;
          padding: 3px 8px;
          font-size: 0.74rem;
          font-weight: 700;
          font-family: ui-monospace, monospace;
        }
        .sp-pill {
          background: #f1f5f9;
          color: #475569;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .sp-score {
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 700;
          border: 1px solid #e2e8f0;
        }
        .sp-score.good {
          background: #f1eefc;
          border-color: #ded7f6;
          color: #4634ad;
        }
        .sp-score.mid {
          background: #f8fafc;
          border-color: #e2e8f0;
          color: #64748b;
        }
        .sp-score.poor {
          background: #fef2f2;
          border-color: #fecaca;
          color: #b91c1c;
        }

        .sp-status {
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: #fff;
          color: #0f172a;
          padding: 5px 12px;
          font-size: 0.76rem;
          font-weight: 700;
        }
        .sp-status:hover:not(:disabled) {
          background: #f8fafc;
        }
        .sp-status:disabled {
          opacity: 0.5;
        }
        .sp-status.is-live {
          background: #f1eefc;
          border-color: #ded7f6;
          color: #4634ad;
        }
        .sp-status.is-draft {
          background: #f8fafc;
          border-color: #e2e8f0;
          color: #64748b;
        }

        .sp-actions {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .sp-row-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #e2e8f0;
          background: #fff;
          color: #475569;
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 0.78rem;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
        }
        .sp-row-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #334155;
        }
        .sp-row-btn.primary {
          border-color: #ded7f6;
          background: #f1eefc;
          color: #4634ad;
        }
        .sp-row-btn.primary:hover {
          background: #e7e1fa;
          color: #4634ad;
        }

        .sp-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.5);
          z-index: 1060;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .sp-modal {
          background: #fff;
          border-radius: 16px;
          width: 460px;
          max-width: 100%;
          max-height: 88vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .sp-modal-head {
          background: #5641ce;
          color: #fff;
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .sp-modal-head.danger {
          background: #b91c1c;
        }
        .sp-modal-head h5 {
          margin: 0;
          font-weight: 700;
        }
        .sp-modal-head p {
          margin: 4px 0 0;
          font-size: 0.8rem;
          opacity: 0.85;
        }
        .sp-modal-head button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: #fff;
          border-radius: 8px;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
        }
        .sp-modal-body {
          padding: 18px 20px;
          overflow-y: auto;
        }
        .sp-confirm-text {
          margin: 0 0 6px;
          color: #0f172a;
          font-size: 0.95rem;
        }
        .sp-confirm-sub {
          margin: 0;
          color: #64748b;
          font-size: 0.85rem;
        }
        .sp-modal-foot {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: flex-end;
          padding: 14px 20px;
          border-top: 1px solid #e2e8f0;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => {
  return { props: {} };
});
