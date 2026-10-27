"use client";
import { withAdminAuth } from "@/lib/withAdminAuth";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";
import { seoScore } from "@/lib/seoScore";

export default function SeoPagesAdmin() {
  const router = useRouter();

  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "" });

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
  };

  const handleDelete = async (page) => {
    const ok = confirm(
      `Delete "${page.title}"?\n\n` +
        `The public page at /${page.slug} will stop working and all of its ` +
        `${page.blockCount} section(s) will be removed. This cannot be undone.`
    );
    if (!ok) return;

    const res = await fetch(`/api/admin/seo-pages/${page.slug}`, { method: "DELETE" });
    const data = await res.json();

    if (data.success) {
      toast.success("Page deleted");
      fetchPages();
    } else {
      toast.error(data.message || "Delete failed");
    }
  };

  const visible = pages.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      p.title?.toLowerCase().includes(q) ||
      p.slug?.toLowerCase().includes(q) ||
      p.focusKeyword?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <Topbar />
      <AdminOffcanvas />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />

        <div className="flex-grow-1 bg-light" style={{ minWidth: 0 }}>
          <div className="container-fluid p-4">
            {/* ===== HEADER ===== */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-1">
              <h4 className="fw-bold mb-0">SEO Pages</h4>
              <button
                className="btn btn-primary brandbg"
                onClick={() => setShowForm((v) => !v)}
              >
                {showForm ? "Cancel" : "+ New Page"}
              </button>
            </div>

            <p className="text-muted small mb-3">
              Build complete landing pages without a developer. Pick sections,
              write the content, fill in the SEO details and publish &mdash; the
              page goes live at <code>sscoaching.in/your-url</code> straight away.
            </p>

            {/* ===== CREATE FORM ===== */}
            {showForm && (
              <form onSubmit={handleCreate} className="border rounded shadow-sm p-4 mb-4 bg-white">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Page Title</label>
                    <input
                      className="form-control"
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
                    <div className="form-text">
                      Internal name. The title shown on Google is set separately
                      in the SEO tab.
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Page URL</label>
                    <div className="input-group">
                      <span className="input-group-text">sscoaching.in/</span>
                      <input
                        className="form-control"
                        required
                        value={form.slug}
                        onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                        placeholder="nios-admission-lucknow"
                      />
                    </div>
                    <div className="form-text">
                      Keep it short and include the main keyword. Changing it
                      later breaks any link already pointing here.
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary brandbg mt-3" disabled={saving}>
                  {saving ? "Creating..." : "Create & Start Building"}
                </button>
              </form>
            )}

            {/* ===== SEARCH ===== */}
            {pages.length > 0 && (
              <input
                className="form-control mb-3"
                style={{ maxWidth: 360 }}
                placeholder="Search by title, URL or keyword..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            )}

            {/* ===== LIST ===== */}
            <div className="table-responsive bg-white border rounded shadow-sm">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>URL</th>
                    <th>Sections</th>
                    <th>SEO</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : visible.length ? (
                    visible.map((p) => {
                      const score = seoScore(p);
                      return (
                        <tr key={p._id}>
                          <td>
                            <div className="fw-semibold">{p.title}</div>
                            {p.focusKeyword && (
                              <div className="text-muted small">
                                Keyword: {p.focusKeyword}
                              </div>
                            )}
                          </td>
                          <td>
                            <code>/{p.slug}</code>
                          </td>
                          <td>{p.blockCount}</td>
                          <td>
                            <span className={`badge bg-${score.variant}`}>
                              {score.percent}%
                            </span>
                          </td>
                          <td>
                            <span
                              className={
                                "badge " +
                                (p.status === "published" ? "bg-success" : "bg-secondary")
                              }
                              role="button"
                              onClick={() => togglePublish(p)}
                              title="Click to change status"
                            >
                              {p.status === "published" ? "Published" : "Draft"}
                            </span>
                          </td>
                          <td className="text-muted small">
                            {p.updatedAt
                              ? new Date(p.updatedAt).toLocaleString("en-IN")
                              : "-"}
                          </td>
                          <td className="text-end text-nowrap">
                            <Link
                              href={`/dashboard/admin/seo-pages/${p.slug}`}
                              className="btn btn-sm btn-outline-primary me-2"
                            >
                              Edit
                            </Link>
                            <a
                              href={`/${p.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-secondary me-2"
                            >
                              View
                            </a>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(p)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-4">
                        {pages.length
                          ? "No page matches that search"
                          : "No pages yet. Click + New Page to build your first one."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => {
  return { props: {} };
});
