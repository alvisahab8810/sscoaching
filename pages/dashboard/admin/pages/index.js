"use client";
import { withAdminAuth } from "@/lib/withAdminAuth";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";
import {
  FaTrash,
  FaTimes,
  FaSearch,
  FaPlus,
  FaPen,
  FaExternalLinkAlt,
  FaFileAlt,
  FaSync,
} from "react-icons/fa";

const lower = (v) => String(v || "").toLowerCase();

const fmtDateTime = (d) => {
  if (!d) return null;
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return null;
  return {
    date: dt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: dt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
  };
};

export default function PagesAdmin() {
  const router = useRouter();

  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", path: "" });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [confirming, setConfirming] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/page-content", { cache: "no-store" });
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

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch("/api/admin/page-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        slug: form.slug,
        path: form.path || "/" + form.slug,
      }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Page created");
      setForm({ title: "", slug: "", path: "" });
      setShowForm(false);
      fetchPages();
    } else {
      toast.error(data.message || "Could not create page");
    }

    setSaving(false);
  };

  // Section-based pages count sections; field-based pages count content groups.
  const contentCount = (p) => p.sectionCount || p.fieldCount || 0;

  const deletePage = async () => {
    if (!confirming) return;
    setDeleting(true);

    try {
      const res = await fetch("/api/admin/page-content/" + confirming.slug, {
        method: "DELETE",
      });
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

  const togglePublish = async (page) => {
    setTogglingId(page._id);
    try {
      const res = await fetch("/api/admin/page-content/" + page.slug, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !page.isPublished }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(page.isPublished ? "Unpublished" : "Published");
        fetchPages();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error(err.message);
    }
    setTogglingId(null);
  };

  // "NIOS Date Sheet" -> "nios-date-sheet"
  const slugify = (v) =>
    v
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const filtered = useMemo(() => {
    const q = lower(search).trim();

    return pages.filter((p) => {
      if (status === "published" && !p.isPublished) return false;
      if (status === "draft" && p.isPublished) return false;
      if (!q) return true;
      return [p.title, p.slug, p.path].some((v) => lower(v).includes(q));
    });
  }, [pages, search, status]);

  return (
    <div className="pages-admin">
      <Topbar />
      <AdminOffcanvas />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />

        <div className="flex-grow-1 pg-bg" style={{ minWidth: 0 }}>
          <div className="container-fluid p-4">
            {/* Header */}
            <div className="pg-head">
              <div>
                <h4 className="pg-title">Pages</h4>
                <p className="pg-sub">
                  Edit the content of existing website pages. The design and layout stay
                  exactly the same &mdash; only text, tables and dates change.
                </p>
              </div>

              <div className="pg-head-actions">
                <button className="pg-icon-btn" onClick={fetchPages} title="Refresh">
                  <span className="pg-ico">
                    <FaSync />
                  </span>
                </button>
                <button className="pg-btn" onClick={() => setShowForm((v) => !v)}>
                  <span className="pg-ico">{showForm ? <FaTimes /> : <FaPlus />}</span>
                  {showForm ? "Cancel" : "New Page"}
                </button>
              </div>
            </div>

            {/* Create form */}
            {showForm && (
              <form onSubmit={handleCreate} className="pg-card pg-form">
                <h6 className="pg-card-title">Create a page</h6>

                <div className="pg-grid">
                  <div className="pg-field">
                    <label>Page Title</label>
                    <input
                      required
                      value={form.title}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          title: e.target.value,
                          // auto-fill the slug only while the user has not
                          // typed one, otherwise their slug gets wiped
                          slug: f.slug || slugify(e.target.value),
                        }))
                      }
                      placeholder="NIOS Date Sheet"
                    />
                  </div>

                  <div className="pg-field">
                    <label>Slug</label>
                    <input
                      required
                      value={form.slug}
                      onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                      placeholder="nios-datesheet"
                    />
                  </div>

                  <div className="pg-field">
                    <label>Public Path</label>
                    <input
                      value={form.path}
                      onChange={(e) => setForm((f) => ({ ...f, path: e.target.value }))}
                      placeholder={form.slug ? "/" + form.slug : "/nios-datesheet"}
                    />
                  </div>
                </div>

                <div className="pg-note">
                  <span className="pg-note-icon">
                    <FaFileAlt />
                  </span>
                  <span>
                    Creating a page here does not create the frontend route. A developer must
                    first connect that route to <code>PageSections</code>, after which its
                    content can be managed from here.
                  </span>
                </div>

                <button type="submit" className="pg-btn" disabled={saving}>
                  {saving ? "Creating…" : "Create Page"}
                </button>
              </form>
            )}

            {/* Search + filter + table */}
            <div className="pg-card">
              <div className="pg-toolbar">
                <div className="pg-search">
                  <span className="pg-search-icon">
                    <FaSearch />
                  </span>
                  <input
                    type="text"
                    placeholder="Search by title, slug or path"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <select
                  className="pg-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>

                <span className="pg-count">
                  {filtered.length} {filtered.length === 1 ? "page" : "pages"}
                </span>
              </div>

              {loading && <p className="pg-empty">Loading pages…</p>}
              {!loading && filtered.length === 0 && <p className="pg-empty">No pages found.</p>}

              {!loading && filtered.length > 0 && (
                <div className="pg-table-wrap">
                  <table className="pg-table">
                    <thead>
                      <tr>
                        <th>Page</th>
                        <th>Slug</th>
                        <th>Content</th>
                        <th>Status</th>
                        <th>Last Updated</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.map((p) => {
                        const when = fmtDateTime(p.updatedAt);

                        return (
                          <tr key={p._id}>
                            <td>
                              <div className="pg-strong">{p.title}</div>
                              {p.path ? <div className="pg-faint">{p.path}</div> : null}
                            </td>

                            <td>
                              <span className="pg-slug">{p.slug}</span>
                            </td>

                            <td>
                              <span className="pg-pill">{contentCount(p)} sections</span>
                            </td>

                            <td>
                              <button
                                className={`pg-status ${p.isPublished ? "is-live" : "is-draft"}`}
                                onClick={() => togglePublish(p)}
                                disabled={togglingId === p._id}
                                title="Click to change status"
                              >
                                {p.isPublished ? "Published" : "Draft"}
                              </button>
                            </td>

                            <td>
                              {when ? (
                                <>
                                  <div className="pg-strong">{when.date}</div>
                                  <div className="pg-faint">{when.time}</div>
                                </>
                              ) : (
                                <span className="pg-faint">—</span>
                              )}
                            </td>

                            <td>
                              <div className="pg-actions">
                                <button
                                  className="pg-row-btn primary"
                                  onClick={() =>
                                    router.push("/dashboard/admin/pages/" + p.slug)
                                  }
                                  title="Edit content"
                                >
                                  <span className="pg-ico">
                                    <FaPen />
                                  </span>
                                  Edit
                                </button>

                                {p.path ? (
                                  <a
                                    className="pg-row-btn"
                                    href={p.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Open the live page"
                                  >
                                    <span className="pg-ico">
                                      <FaExternalLinkAlt />
                                    </span>
                                    View
                                  </a>
                                ) : null}

                                <button
                                  className="pg-icon-btn danger sm"
                                  onClick={() => setConfirming(p)}
                                  title="Delete page"
                                >
                                  <span className="pg-ico">
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
        <div className="pg-modal-backdrop" onClick={() => !deleting && setConfirming(null)}>
          <div className="pg-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pg-modal-head danger">
              <div>
                <h5>Delete page</h5>
                <p>This cannot be undone</p>
              </div>
              <button onClick={() => setConfirming(null)} disabled={deleting}>
                <FaTimes />
              </button>
            </div>

            <div className="pg-modal-body">
              <p className="pg-confirm-text">
                <strong>{confirming.title}</strong> · {confirming.slug}
              </p>
              <p className="pg-confirm-sub">
                All of its content ({contentCount(confirming)} sections) will be removed and
                the public page will fall back to its default content.
              </p>
            </div>

            <div className="pg-modal-foot">
              <button
                className="pg-btn-ghost"
                onClick={() => setConfirming(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button className="pg-btn danger" onClick={deletePage} disabled={deleting}>
                {deleting ? "Deleting…" : "Delete Page"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .pg-bg {
          background: #f1f5f9;
        }

        .pg-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
        }
        .pg-title {
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .pg-sub {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 0.86rem;
          max-width: 620px;
        }
        .pg-head-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        /* react-icons renders its own svg, which styled-jsx will not scope,
           so every icon that needs sizing sits inside a span. */
        .pg-ico {
          display: inline-flex;
          align-items: center;
          font-size: 0.78rem;
        }

        .pg-btn {
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
        .pg-btn:hover:not(:disabled) {
          background: #4634ad;
        }
        .pg-btn:disabled {
          opacity: 0.6;
        }
        .pg-btn.danger {
          background: #b91c1c;
        }
        .pg-btn-ghost {
          background: #fff;
          color: #334155;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 9px 18px;
          font-weight: 600;
          font-size: 0.88rem;
        }

        .pg-icon-btn {
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
        .pg-icon-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        .pg-icon-btn.sm {
          width: 32px;
          height: 32px;
        }
        .pg-icon-btn.danger {
          color: #ef4444;
          border-color: #fecaca;
          background: #fef2f2;
        }
        .pg-icon-btn.danger:hover {
          background: #fee2e2;
          border-color: #fca5a5;
        }

        .pg-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
          margin-bottom: 14px;
        }
        .pg-card-title {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.95rem;
          margin: 0 0 14px;
        }

        .pg-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 14px;
        }
        .pg-field label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          color: #475569;
          margin-bottom: 6px;
        }
        .pg-field input {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.88rem;
          color: #0f172a;
          background: #fff;
        }
        .pg-field input:focus {
          outline: none;
          border-color: #5641ce;
          box-shadow: 0 0 0 3px rgba(86, 65, 206, 0.1);
        }

        .pg-note {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 0.84rem;
          color: #475569;
          margin: 14px 0;
        }
        .pg-note-icon {
          color: #94a3b8;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          height: 20px;
        }
        .pg-note code {
          background: #f1f5f9;
          color: #4634ad;
          border-radius: 4px;
          padding: 1px 5px;
        }

        .pg-toolbar {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .pg-search {
          position: relative;
          flex: 1 1 320px;
        }
        .pg-search input {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px 10px 38px;
          font-size: 0.88rem;
          background: #f8fafc;
        }
        .pg-search input:focus {
          outline: none;
          border-color: #5641ce;
          background: #fff;
        }
        .pg-search-icon {
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
        .pg-select {
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.86rem;
          background: #fff;
          color: #334155;
          min-width: 150px;
        }
        .pg-count {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.9rem;
          margin-left: auto;
        }

        .pg-empty {
          color: #64748b;
          padding: 24px 0;
          margin: 0;
        }

        .pg-table-wrap {
          overflow-x: auto;
        }
        .pg-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .pg-table thead th {
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
        .pg-table tbody td {
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
          color: #334155;
          white-space: nowrap;
        }
        .pg-table tbody tr:hover {
          background: #f8fafc;
        }
        .pg-strong {
          font-weight: 600;
          color: #0f172a;
        }
        .pg-faint {
          font-size: 0.74rem;
          color: #94a3b8;
        }

        .pg-slug {
          background: #f1eefc;
          color: #4634ad;
          border: 1px solid #ded7f6;
          border-radius: 6px;
          padding: 3px 8px;
          font-size: 0.74rem;
          font-weight: 700;
          font-family: ui-monospace, monospace;
        }
        .pg-pill {
          background: #f1f5f9;
          color: #475569;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .pg-status {
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: #fff;
          color: #0f172a;
          padding: 5px 12px;
          font-size: 0.76rem;
          font-weight: 700;
        }
        .pg-status:hover:not(:disabled) {
          background: #f8fafc;
        }
        .pg-status:disabled {
          opacity: 0.5;
        }
        .pg-status.is-live {
          background: #f1eefc;
          border-color: #ded7f6;
          color: #4634ad;
        }
        .pg-status.is-draft {
          background: #f8fafc;
          border-color: #e2e8f0;
          color: #64748b;
        }

        .pg-actions {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .pg-row-btn {
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
        .pg-row-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #334155;
        }
        .pg-row-btn.primary {
          border-color: #ded7f6;
          background: #f1eefc;
          color: #4634ad;
        }
        .pg-row-btn.primary:hover {
          background: #e7e1fa;
          color: #4634ad;
        }

        .pg-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.5);
          z-index: 1060;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .pg-modal {
          background: #fff;
          border-radius: 16px;
          width: 460px;
          max-width: 100%;
          max-height: 88vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .pg-modal-head {
          background: #5641ce;
          color: #fff;
          padding: 18px 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .pg-modal-head.danger {
          background: #b91c1c;
        }
        .pg-modal-head h5 {
          margin: 0;
          font-weight: 700;
        }
        .pg-modal-head p {
          margin: 4px 0 0;
          font-size: 0.8rem;
          opacity: 0.85;
        }
        .pg-modal-head button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: #fff;
          border-radius: 8px;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
        }
        .pg-modal-body {
          padding: 18px 20px;
          overflow-y: auto;
        }
        .pg-confirm-text {
          margin: 0 0 6px;
          color: #0f172a;
          font-size: 0.95rem;
        }
        .pg-confirm-sub {
          margin: 0;
          color: #64748b;
          font-size: 0.85rem;
        }
        .pg-modal-foot {
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
