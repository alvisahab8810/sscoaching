"use client";
import { withAdminAuth } from "@/lib/withAdminAuth";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";

export default function PagesAdmin() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", path: "" });

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

  const handleDelete = async (page) => {
    const ok = confirm(
      '"' +
        page.title +
        '"?\n\nAll of its content (' +
        contentCount(page) +
        " sections) will be removed and the public page will fall back to its default content."
    );
    if (!ok) return;

    const res = await fetch("/api/admin/page-content/" + page.slug, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.success) {
      toast.success("Page deleted");
      fetchPages();
    } else {
      toast.error(data.message || "Delete failed");
    }
  };

  const togglePublish = async (page) => {
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
  };

  // "NIOS Date Sheet" -> "nios-date-sheet"
  const slugify = (v) =>
    v
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  return (
    <div className="pages-admin">
      <Topbar />
      <AdminOffcanvas />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />

        <div className="flex-grow-1 bg-light" style={{ minWidth: 0 }}>
          <div className="container-fluid p-4">
            {/* ===== HEADER ===== */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-1">
              <h4 className="fw-bold mb-0">Pages</h4>
              <button
                className="btn btn-primary brandbg"
                onClick={() => setShowForm((v) => !v)}
              >
                {showForm ? "Cancel" : "+ New Page"}
              </button>
            </div>

            <p className="text-muted small mb-3">
              Edit the content of existing website pages here. The design and
              layout stay exactly the same &mdash; only text, tables and dates
              change.
            </p>

            {/* ===== CREATE FORM ===== */}
            {showForm && (
              <form
                onSubmit={handleCreate}
                className="border rounded shadow-sm p-4 mb-4 bg-white"
              >
                <div className="row g-3">
                  <div className="col-md-5">
                    <label className="form-label fw-semibold">Page Title</label>
                    <input
                      className="form-control"
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

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Slug</label>
                    <input
                      className="form-control"
                      required
                      value={form.slug}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, slug: slugify(e.target.value) }))
                      }
                      placeholder="nios-datesheet"
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Public Path</label>
                    <input
                      className="form-control"
                      value={form.path}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, path: e.target.value }))
                      }
                      placeholder={form.slug ? "/" + form.slug : "/nios-datesheet"}
                    />
                  </div>
                </div>

                <div className="alert alert-warning small mt-3 mb-0">
                  Creating a page here does not create the frontend route. A
                  developer must first connect that route to{" "}
                  <code>PageSections</code>, after which its content can be
                  managed from here.
                </div>

                <button
                  type="submit"
                  className="btn btn-primary brandbg mt-3"
                  disabled={saving}
                >
                  {saving ? "Creating..." : "Create Page"}
                </button>
              </form>
            )}

            {/* ===== LIST ===== */}
            <div className="table-responsive bg-white border rounded shadow-sm">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>Slug</th>
                    <th>Content</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : pages.length ? (
                    pages.map((p) => (
                      <tr key={p._id}>
                        <td className="fw-semibold">{p.title}</td>
                        <td>
                          <code>{p.slug}</code>
                        </td>
                        <td>{contentCount(p)} sections</td>
                        <td>
                          <span
                            className={
                              "badge " +
                              (p.isPublished ? "bg-success" : "bg-secondary")
                            }
                            role="button"
                            onClick={() => togglePublish(p)}
                            title="Click to change status"
                          >
                            {p.isPublished ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="text-muted small">
                          {p.updatedAt
                            ? new Date(p.updatedAt).toLocaleString("en-IN")
                            : "-"}
                        </td>
                        <td className="text-end">
                          <Link
                            href={"/dashboard/admin/pages/" + p.slug}
                            className="btn btn-sm btn-outline-primary me-2"
                          >
                            Edit
                          </Link>
                          {p.path && (
                            <a
                              href={p.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-secondary me-2"
                            >
                              View
                            </a>
                          )}
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(p)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        No pages yet
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
