"use client";
import { withAdminAuth } from "@/lib/withAdminAuth";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import PageSections from "@/components/PageSections";
import { toast } from "sonner";
import ContentFieldsEditor from "@/components/dashboard/ContentFieldsEditor";

/**
 * Section editor.
 *
 * This edits section content, not markup. Structural fields such as
 * className / style / tag are shown read-only so an admin cannot
 * accidentally break the page design, which comes from the frontend CSS.
 */

const BLANK = {
  heading: {
    type: "heading",
    level: "h3",
    className: "nios-125h-senior-hero-title",
    wrapInSpan: false,
    text: "New heading",
    isActive: true,
  },
  table: {
    type: "table",
    className: "table-wrapper",
    columns: [
      { label: "DATE", className: "date-col" },
      { label: "SUBJECT & CODE", className: "" },
      { label: "TIME", className: "" },
    ],
    rows: [[{ html: "", className: "date-col" }, { html: "", className: "" }, { html: "", className: "" }]],
    isActive: true,
  },
  html: {
    type: "html",
    tag: "div",
    className: "spacer-area",
    style: "",
    html: "<p>New paragraph</p>",
    isActive: true,
  },
};

export default function PageEditor() {
  const router = useRouter();
  const { slug } = router.query;

  const [page, setPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [openIdx, setOpenIdx] = useState(null);
  const [preview, setPreview] = useState(false);

  // Field-based pages (e.g. /nios-results) keep their layout in code and store
  // only editable text here. Such a page has content and no sections.
  const [content, setContent] = useState(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!slug) return;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/page-content/" + slug, {
          cache: "no-store",
        });
        const data = await res.json();

        if (data.success) {
          setPage(data.data);
          setSections(data.data.sections || []);
          setContent(data.data.content || null);
        } else {
          toast.error(data.message || "Could not load page");
        }
      } catch (err) {
        toast.error(err.message);
      }
      setLoading(false);
    })();
  }, [slug]);

  /* ================= HELPERS ================= */
  const touch = () => setDirty(true);

  const setMeta = (key, value) => {
    setPage((p) => ({ ...p, [key]: value }));
    touch();
  };

  const updateSection = (idx, patch) => {
    setSections((list) =>
      list.map((s, i) => (i === idx ? { ...s, ...patch } : s))
    );
    touch();
  };

  const move = (idx, dir) => {
    const to = idx + dir;
    if (to < 0 || to >= sections.length) return;

    setSections((list) => {
      const next = [...list];
      [next[idx], next[to]] = [next[to], next[idx]];
      return next;
    });
    setOpenIdx(to);
    touch();
  };

  const removeSection = (idx) => {
    if (!confirm("Remove this section?")) return;
    setSections((list) => list.filter((_, i) => i !== idx));
    setOpenIdx(null);
    touch();
  };

  const addSection = (type) => {
    // deep copy is required -- BLANK.table's nested arrays would be shared
    const fresh = JSON.parse(JSON.stringify(BLANK[type]));
    setSections((list) => [...list, fresh]);
    setOpenIdx(sections.length);
    touch();
  };

  /* ---- table cell editing ---- */
  const editCell = (idx, r, c, html) => {
    setSections((list) =>
      list.map((s, i) => {
        if (i !== idx) return s;
        const rows = s.rows.map((row, ri) =>
          ri === r ? row.map((cell, ci) => (ci === c ? { ...cell, html } : cell)) : row
        );
        return { ...s, rows };
      })
    );
    touch();
  };

  const editColumn = (idx, c, label) => {
    setSections((list) =>
      list.map((s, i) =>
        i === idx
          ? {
              ...s,
              columns: s.columns.map((col, ci) =>
                ci === c ? { ...col, label } : col
              ),
            }
          : s
      )
    );
    touch();
  };

  const addRow = (idx) => {
    setSections((list) =>
      list.map((s, i) => {
        if (i !== idx) return s;
        // a new row copies the columns' className (date-col etc.)
        const blank = s.columns.map((col) => ({
          html: "",
          className: col.className || "",
        }));
        return { ...s, rows: [...s.rows, blank] };
      })
    );
    touch();
  };

  const removeRow = (idx, r) => {
    setSections((list) =>
      list.map((s, i) =>
        i === idx ? { ...s, rows: s.rows.filter((_, ri) => ri !== r) } : s
      )
    );
    touch();
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    setSaving(true);

    const res = await fetch("/api/admin/page-content/" + slug, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: page.title,
        path: page.path,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        isPublished: page.isPublished,
        metaKeywords: page.metaKeywords,
        sections,
        ...(content ? { content } : {}),
      }),
    });

    const data = await res.json();

    if (data.success) {
      setPage(data.data);
      setSections(data.data.sections || []);
      setContent(data.data.content || null);
      setDirty(false);
      toast.success("Saved. The live page updates within a minute.");
    } else {
      toast.error(data.message || "Save failed");
    }

    setSaving(false);
  };

  const label = (s) => {
    if (s.type === "heading") return s.text || "(empty heading)";
    if (s.type === "table")
      return (
        "Table: " +
        (s.columns || []).map((c) => c.label).join(" | ") +
        " (" +
        (s.rows || []).length +
        " rows)"
      );

    const plain = String(s.html || "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return plain ? plain.slice(0, 90) : "<" + (s.tag || "div") + "> block";
  };

  // A page is either section-based (markup stored in the DB) or field-based
  // (markup in code, only text in the DB). The editor switches mode on this.
  const isFieldPage = !!content;

  const activeCount = useMemo(
    () => sections.filter((s) => s.isActive !== false).length,
    [sections]
  );

  return (
    <div className="page-editor">
      <Topbar />
      <AdminOffcanvas />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />

        <div className="flex-grow-1 bg-light" style={{ minWidth: 0 }}>
          <div className="container-fluid p-4">
            {loading ? (
              <p className="text-muted">Loading...</p>
            ) : !page ? (
              <div className="alert alert-danger">
                Page not found.{" "}
                <Link href="/dashboard/admin/pages">Back to Pages</Link>
              </div>
            ) : (
              <>
                {/* ===== HEADER ===== */}
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                  <div>
                    <Link
                      href="/dashboard/admin/pages"
                      className="text-decoration-none small"
                    >
                      &larr; Pages
                    </Link>
                    <h4 className="fw-bold mb-0 mt-1">{page.title}</h4>
                    <div className="text-muted small">
                      <code>{page.slug}</code>
                      {isFieldPage ? (
                        <> &middot; {Object.keys(content).length} content sections</>
                      ) : (
                        <>
                          {" "}
                          &middot; {sections.length} sections ({activeCount}{" "}
                          visible)
                        </>
                      )}
                    </div>
                  </div>

                  <div className="d-flex gap-2 flex-wrap">
                    {page.path && (
                      <a
                        href={page.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-secondary"
                      >
                        View Live
                      </a>
                    )}
                    {!isFieldPage && (
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => setPreview((v) => !v)}
                      >
                        {preview ? "Hide Preview" : "Preview"}
                      </button>
                    )}
                    <button
                      className="btn btn-primary brandbg"
                      onClick={handleSave}
                      disabled={saving || !dirty}
                    >
                      {saving ? "Saving..." : dirty ? "Save Changes" : "Saved"}
                    </button>
                  </div>
                </div>

                {dirty && (
                  <div className="alert alert-warning py-2 small">
                    You have unsaved changes. The live page will not change
                    until you save.
                  </div>
                )}

                {/* ===== PAGE META ===== */}
                <div className="border rounded shadow-sm p-4 mb-4 bg-white">
                  <h6 className="fw-bold mb-3">Page Settings &amp; SEO</h6>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Page Title (admin only)
                      </label>
                      <input
                        className="form-control"
                        value={page.title || ""}
                        onChange={(e) => setMeta("title", e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Public Path
                      </label>
                      <input
                        className="form-control"
                        value={page.path || ""}
                        onChange={(e) => setMeta("path", e.target.value)}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Meta Title{" "}
                        <span className="text-muted fw-normal">
                          ({(page.metaTitle || "").length} chars &mdash; keep
                          it under 60)
                        </span>
                      </label>
                      <input
                        className="form-control"
                        value={page.metaTitle || ""}
                        onChange={(e) => setMeta("metaTitle", e.target.value)}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Meta Description{" "}
                        <span className="text-muted fw-normal">
                          ({(page.metaDescription || "").length} chars{" "}
                          &mdash; keep it under 160)
                        </span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={2}
                        value={page.metaDescription || ""}
                        onChange={(e) =>
                          setMeta("metaDescription", e.target.value)
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Meta Keywords{" "}
                        <span className="text-muted fw-normal">
                          (comma separated &mdash; optional)
                        </span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={2}
                        value={page.metaKeywords || ""}
                        onChange={(e) => setMeta("metaKeywords", e.target.value)}
                      />
                    </div>

                    <div className="col-12">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="isPublished"
                          checked={page.isPublished !== false}
                          onChange={(e) =>
                            setMeta("isPublished", e.target.checked)
                          }
                        />
                        <label className="form-check-label" htmlFor="isPublished">
                          Published
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {isFieldPage ? (
                  <>
                    {/* ===== CONTENT FIELDS ===== */}
                    <h6 className="fw-bold mb-1">Page Content</h6>
                    <p className="text-muted small mb-3">
                      Open a section and edit its text, lists or tables. The
                      page layout, colours and spacing stay exactly the same.
                      Fields marked &ldquo;HTML allowed&rdquo; may contain links
                      or bold text &mdash; keep the tags intact.
                    </p>
                    <ContentFieldsEditor
                      value={content}
                      onChange={(next) => {
                        setContent(next);
                        touch();
                      }}
                    />
                  </>
                ) : (
                  <>
                {/* ===== PREVIEW ===== */}
                {preview && (
                  <div className="border rounded shadow-sm mb-4 bg-white">
                    <div className="px-4 pt-3">
                      <h6 className="fw-bold mb-0">Preview</h6>
                      <p className="text-muted small">
                        The page&rsquo;s own CSS is not loaded here, so spacing
                        and colours will look different. Use this to check
                        content and table structure.
                      </p>
                    </div>
                    <div className="syllabus-nios px-4 pb-4">
                      <PageSections sections={sections} />
                    </div>
                  </div>
                )}

                {/* ===== SECTIONS ===== */}
                <h6 className="fw-bold mb-2">Sections</h6>

                <div className="mb-4">
                  {sections.map((s, idx) => {
                    const open = openIdx === idx;
                    const hidden = s.isActive === false;

                    return (
                      <div
                        key={s._id || idx}
                        className="border rounded mb-2 bg-white"
                        style={{ opacity: hidden ? 0.55 : 1 }}
                      >
                        {/* ---- row header ---- */}
                        <div className="d-flex align-items-center gap-2 p-2 flex-wrap">
                          <span className="badge bg-light text-dark border">
                            {idx + 1}
                          </span>
                          <span className="badge bg-info-subtle text-info-emphasis border">
                            {s.type === "heading"
                              ? s.level || "h2"
                              : s.type}
                          </span>

                          <button
                            className="btn btn-sm btn-link text-start flex-grow-1 text-decoration-none text-truncate"
                            style={{ minWidth: 0 }}
                            onClick={() => setOpenIdx(open ? null : idx)}
                          >
                            {label(s)}
                          </button>

                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => move(idx, -1)}
                            disabled={idx === 0}
                            title="Move up"
                          >
                            &uarr;
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => move(idx, 1)}
                            disabled={idx === sections.length - 1}
                            title="Move down"
                          >
                            &darr;
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() =>
                              updateSection(idx, { isActive: hidden })
                            }
                            title={hidden ? "Show section" : "Hide section"}
                          >
                            {hidden ? "Show" : "Hide"}
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeSection(idx)}
                          >
                            Delete
                          </button>
                        </div>

                        {/* ---- editor body ---- */}
                        {open && (
                          <div className="border-top p-3">
                            {s.type === "heading" && (
                              <>
                                <label className="form-label fw-semibold">
                                  Heading text
                                </label>
                                <textarea
                                  className="form-control mb-2"
                                  rows={2}
                                  value={s.text || ""}
                                  onChange={(e) =>
                                    updateSection(idx, { text: e.target.value })
                                  }
                                />
                                <div className="text-muted small">
                                  Style: <code>{s.level}</code>
                                  {s.className ? (
                                    <>
                                      {" "}
                                      &middot; <code>{s.className}</code>
                                    </>
                                  ) : null}{" "}
                                  (styling comes from the frontend CSS)
                                </div>
                              </>
                            )}

                            {s.type === "html" && (
                              <>
                                <label className="form-label fw-semibold">
                                  Content (HTML)
                                </label>
                                <textarea
                                  className="form-control mb-2"
                                  rows={10}
                                  style={{
                                    fontFamily: "ui-monospace, monospace",
                                    fontSize: 13,
                                  }}
                                  value={s.html || ""}
                                  onChange={(e) =>
                                    updateSection(idx, { html: e.target.value })
                                  }
                                />
                                <div className="text-muted small">
                                  Wrapper: <code>
                                    &lt;{s.tag || "div"}
                                    {s.className ? ' class="' + s.className + '"' : ""}
                                    &gt;
                                  </code>{" "}
                                  &mdash; <code>&lt;p&gt;</code>,{" "}
                                  <code>&lt;ul&gt;&lt;li&gt;</code>,{" "}
                                  <code>&lt;strong&gt;</code>,{" "}
                                  <code>&lt;a&gt;</code> are supported inside.
                                </div>
                              </>
                            )}

                            {s.type === "table" && (
                              <>
                                <div className="table-responsive">
                                  <table className="table table-sm table-bordered align-middle mb-2">
                                    <thead>
                                      <tr>
                                        <th style={{ width: 40 }}>#</th>
                                        {(s.columns || []).map((col, c) => (
                                          <th key={c}>
                                            <input
                                              className="form-control form-control-sm fw-semibold"
                                              value={col.label || ""}
                                              onChange={(e) =>
                                                editColumn(idx, c, e.target.value)
                                              }
                                            />
                                          </th>
                                        ))}
                                        <th style={{ width: 60 }} />
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {(s.rows || []).map((row, r) => (
                                        <tr key={r}>
                                          <td className="text-muted small">
                                            {r + 1}
                                          </td>
                                          {(row || []).map((cell, c) => (
                                            <td key={c}>
                                              <textarea
                                                className="form-control form-control-sm"
                                                rows={2}
                                                style={{ fontSize: 13 }}
                                                value={cell.html || ""}
                                                onChange={(e) =>
                                                  editCell(
                                                    idx,
                                                    r,
                                                    c,
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            </td>
                                          ))}
                                          <td>
                                            <button
                                              className="btn btn-sm btn-outline-danger"
                                              onClick={() => removeRow(idx, r)}
                                              title="Delete row"
                                            >
                                              &times;
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>

                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => addRow(idx)}
                                >
                                  + Add Row
                                </button>

                                <div className="text-muted small mt-2">
                                  <code>&lt;br /&gt;</code> and{" "}
                                  <code>&lt;strong&gt;</code> are supported inside
                                  a cell.
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* ===== ADD ===== */}
                <div className="d-flex gap-2 flex-wrap mb-5">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => addSection("heading")}
                  >
                    + Heading
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => addSection("html")}
                  >
                    + Text / HTML
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => addSection("table")}
                  >
                    + Table
                  </button>
                </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => {
  return { props: {} };
});
