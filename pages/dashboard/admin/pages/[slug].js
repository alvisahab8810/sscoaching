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
import {
  FaArrowLeft,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaEyeSlash,
  FaTrash,
  FaTimes,
  FaPlus,
  FaExternalLinkAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

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

  // Section removal is confirmed in a panel instead of a browser dialog.
  const [removing, setRemoving] = useState(null);

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
    setSections((list) => list.filter((_, i) => i !== idx));
    setOpenIdx(null);
    setRemoving(null);
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
        // a new row copies the columns' className (date-col etc.). Key/value
        // tables have no columns, so there the existing rows define the shape.
        const template = s.columns?.length ? s.columns : s.rows?.[0] || [];
        const blank = template.map((col) => ({
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

        <div className="flex-grow-1 pe-bg" style={{ minWidth: 0 }}>
          <div className="container-fluid p-4">
            {loading ? (
              <p className="pe-empty">Loading page…</p>
            ) : !page ? (
              <div className="pe-card">
                <p className="pe-confirm-text">Page not found.</p>
                <Link href="/dashboard/admin/pages" className="pe-row-btn">
                  Back to Pages
                </Link>
              </div>
            ) : (
              <>
                {/* ===== HEADER ===== */}
                <div className="pe-head">
                  <div>
                    <Link href="/dashboard/admin/pages" className="pe-back">
                      <span className="pe-ico">
                        <FaArrowLeft />
                      </span>
                      Pages
                    </Link>
                    <h4 className="pe-title">{page.title}</h4>
                    <div className="pe-meta-line">
                      <span className="pe-slug">{page.slug}</span>
                      {isFieldPage ? (
                        <span className="pe-pill">
                          {Object.keys(content).length} content sections
                        </span>
                      ) : (
                        <>
                          <span className="pe-pill">{sections.length} sections</span>
                          <span className="pe-pill">{activeCount} visible</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="pe-head-actions">
                    {page.path && (
                      <a
                        href={page.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pe-btn-ghost"
                      >
                        <span className="pe-ico">
                          <FaExternalLinkAlt />
                        </span>
                        View Live
                      </a>
                    )}
                    {!isFieldPage && (
                      <button className="pe-btn-ghost" onClick={() => setPreview((v) => !v)}>
                        <span className="pe-ico">
                          {preview ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {preview ? "Hide Preview" : "Preview"}
                      </button>
                    )}
                    <button className="pe-btn" onClick={handleSave} disabled={saving || !dirty}>
                      {saving ? "Saving…" : dirty ? "Save Changes" : "Saved"}
                    </button>
                  </div>
                </div>

                {dirty && (
                  <div className="pe-note warn">
                    <span className="pe-note-icon">
                      <FaExclamationTriangle />
                    </span>
                    <span>
                      You have unsaved changes. The live page will not change until you save.
                    </span>
                  </div>
                )}

                {/* ===== PAGE META ===== */}
                <div className="pe-card">
                  <h6 className="pe-card-title">Page Settings &amp; SEO</h6>

                  <div className="pe-grid">
                    <div className="pe-field">
                      <label>Page Title (admin only)</label>
                      <input
                        value={page.title || ""}
                        onChange={(e) => setMeta("title", e.target.value)}
                      />
                    </div>

                    <div className="pe-field">
                      <label>Public Path</label>
                      <input
                        value={page.path || ""}
                        onChange={(e) => setMeta("path", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="pe-field mt">
                    <label>
                      Meta Title
                      <span className="pe-hint">
                        {(page.metaTitle || "").length} chars — keep it under 60
                      </span>
                    </label>
                    <input
                      value={page.metaTitle || ""}
                      onChange={(e) => setMeta("metaTitle", e.target.value)}
                    />
                  </div>

                  <div className="pe-field mt">
                    <label>
                      Meta Description
                      <span className="pe-hint">
                        {(page.metaDescription || "").length} chars — keep it under 160
                      </span>
                    </label>
                    <textarea
                      rows={2}
                      value={page.metaDescription || ""}
                      onChange={(e) => setMeta("metaDescription", e.target.value)}
                    />
                  </div>

                  <div className="pe-field mt">
                    <label>
                      Meta Keywords
                      <span className="pe-hint">comma separated — optional</span>
                    </label>
                    <textarea
                      rows={2}
                      value={page.metaKeywords || ""}
                      onChange={(e) => setMeta("metaKeywords", e.target.value)}
                    />
                  </div>

                  <label className="pe-check">
                    <input
                      type="checkbox"
                      checked={page.isPublished !== false}
                      onChange={(e) => setMeta("isPublished", e.target.checked)}
                    />
                    <span>Published</span>
                  </label>
                </div>

                {isFieldPage ? (
                  <>
                    {/* ===== CONTENT FIELDS ===== */}
                    <div className="pe-section-head">
                      <h6 className="pe-card-title mb0">Page Content</h6>
                      <p className="pe-sub">
                        Open a section and edit its text, lists or tables. The page layout,
                        colours and spacing stay exactly the same. Fields marked &ldquo;HTML
                        allowed&rdquo; may contain links or bold text &mdash; keep the tags
                        intact.
                      </p>
                    </div>
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
                      <div className="pe-card">
                        <h6 className="pe-card-title mb0">Preview</h6>
                        <p className="pe-sub">
                          The page&rsquo;s own CSS is not loaded here, so spacing and colours
                          will look different. Use this to check content and table structure.
                        </p>
                        <div className="syllabus-nios pe-preview">
                          <PageSections sections={sections} />
                        </div>
                      </div>
                    )}

                    {/* ===== SECTIONS ===== */}
                    <div className="pe-section-head">
                      <h6 className="pe-card-title mb0">Sections</h6>
                      <p className="pe-sub">
                        Reorder, hide or edit a section. Styling comes from the frontend CSS and
                        is shown read-only.
                      </p>
                    </div>

                    <div className="pe-sections">
                      {sections.map((s, idx) => {
                        const open = openIdx === idx;
                        const hidden = s.isActive === false;

                        return (
                          <div
                            key={s._id || idx}
                            className={`pe-row ${hidden ? "is-hidden" : ""} ${
                              open ? "is-open" : ""
                            }`}
                          >
                            {/* ---- row header ---- */}
                            <div className="pe-row-head">
                              <span className="pe-num">{idx + 1}</span>
                              <span className="pe-type">
                                {s.type === "heading" ? s.level || "h2" : s.type}
                              </span>

                              <button
                                className="pe-row-label"
                                onClick={() => setOpenIdx(open ? null : idx)}
                              >
                                {label(s)}
                              </button>

                              {hidden && <span className="pe-pill">Hidden</span>}

                              <div className="pe-row-actions">
                                <button
                                  className="pe-icon-btn sm"
                                  onClick={() => move(idx, -1)}
                                  disabled={idx === 0}
                                  title="Move up"
                                >
                                  <span className="pe-ico">
                                    <FaArrowUp />
                                  </span>
                                </button>
                                <button
                                  className="pe-icon-btn sm"
                                  onClick={() => move(idx, 1)}
                                  disabled={idx === sections.length - 1}
                                  title="Move down"
                                >
                                  <span className="pe-ico">
                                    <FaArrowDown />
                                  </span>
                                </button>
                                <button
                                  className="pe-icon-btn sm"
                                  onClick={() => updateSection(idx, { isActive: hidden })}
                                  title={hidden ? "Show section" : "Hide section"}
                                >
                                  <span className="pe-ico">
                                    {hidden ? <FaEye /> : <FaEyeSlash />}
                                  </span>
                                </button>
                                <button
                                  className="pe-icon-btn sm danger"
                                  onClick={() => setRemoving(idx)}
                                  title="Delete section"
                                >
                                  <span className="pe-ico">
                                    <FaTrash />
                                  </span>
                                </button>
                              </div>
                            </div>

                            {/* ---- inline delete confirmation ---- */}
                            {removing === idx && (
                              <div className="pe-confirm">
                                <span>Remove this section?</span>
                                <button
                                  className="pe-row-btn"
                                  onClick={() => setRemoving(null)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="pe-row-btn danger"
                                  onClick={() => removeSection(idx)}
                                >
                                  Remove
                                </button>
                              </div>
                            )}

                            {/* ---- editor body ---- */}
                            {open && (
                              <div className="pe-row-body">
                                {s.type === "heading" && (
                                  <div className="pe-field">
                                    <label>Heading text</label>
                                    <textarea
                                      rows={2}
                                      value={s.text || ""}
                                      onChange={(e) =>
                                        updateSection(idx, { text: e.target.value })
                                      }
                                    />
                                    <p className="pe-readonly">
                                      Style: <code>{s.level}</code>
                                      {s.className ? (
                                        <>
                                          {" · "}
                                          <code>{s.className}</code>
                                        </>
                                      ) : null}{" "}
                                      (styling comes from the frontend CSS)
                                    </p>
                                  </div>
                                )}

                                {s.type === "html" && (
                                  <div className="pe-field">
                                    <label>Content (HTML)</label>
                                    <textarea
                                      className="mono"
                                      rows={10}
                                      value={s.html || ""}
                                      onChange={(e) =>
                                        updateSection(idx, { html: e.target.value })
                                      }
                                    />
                                    <p className="pe-readonly">
                                      Wrapper:{" "}
                                      <code>
                                        &lt;{s.tag || "div"}
                                        {s.className ? ' class="' + s.className + '"' : ""}&gt;
                                      </code>{" "}
                                      &mdash; <code>&lt;p&gt;</code>,{" "}
                                      <code>&lt;ul&gt;&lt;li&gt;</code>,{" "}
                                      <code>&lt;strong&gt;</code>, <code>&lt;a&gt;</code> are
                                      supported inside.
                                    </p>
                                  </div>
                                )}

                                {s.type === "table" && (
                                  <>
                                    <div className="pe-table-wrap">
                                      <table className="pe-edit-table">
                                        <thead>
                                          <tr>
                                            <th style={{ width: 40 }}>#</th>
                                            {(s.columns || []).map((col, c) => (
                                              <th key={c}>
                                                <input
                                                  value={col.label || ""}
                                                  onChange={(e) =>
                                                    editColumn(idx, c, e.target.value)
                                                  }
                                                />
                                              </th>
                                            ))}
                                            <th style={{ width: 52 }} />
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {(s.rows || []).map((row, r) => (
                                            <tr key={r}>
                                              <td className="pe-faint">{r + 1}</td>
                                              {(row || []).map((cell, c) => (
                                                <td key={c}>
                                                  <textarea
                                                    rows={2}
                                                    value={cell.html || ""}
                                                    onChange={(e) =>
                                                      editCell(idx, r, c, e.target.value)
                                                    }
                                                  />
                                                </td>
                                              ))}
                                              <td>
                                                <button
                                                  className="pe-icon-btn sm danger"
                                                  onClick={() => removeRow(idx, r)}
                                                  title="Delete row"
                                                >
                                                  <span className="pe-ico">
                                                    <FaTimes />
                                                  </span>
                                                </button>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>

                                    <button className="pe-row-btn" onClick={() => addRow(idx)}>
                                      <span className="pe-ico">
                                        <FaPlus />
                                      </span>
                                      Add Row
                                    </button>

                                    <p className="pe-readonly">
                                      <code>&lt;br /&gt;</code> and{" "}
                                      <code>&lt;strong&gt;</code> are supported inside a cell.
                                    </p>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* ===== ADD ===== */}
                    <div className="pe-add">
                      <span className="pe-add-label">ADD SECTION:</span>
                      <button className="pe-row-btn" onClick={() => addSection("heading")}>
                        <span className="pe-ico">
                          <FaPlus />
                        </span>
                        Heading
                      </button>
                      <button className="pe-row-btn" onClick={() => addSection("html")}>
                        <span className="pe-ico">
                          <FaPlus />
                        </span>
                        Text / HTML
                      </button>
                      <button className="pe-row-btn" onClick={() => addSection("table")}>
                        <span className="pe-ico">
                          <FaPlus />
                        </span>
                        Table
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .pe-bg {
          background: #f1f5f9;
        }

        /* react-icons renders its own svg, which styled-jsx will not scope,
           so every icon that needs sizing sits inside a span. */
        .pe-ico {
          display: inline-flex;
          align-items: center;
          font-size: 0.75rem;
        }

        .pe-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
        }
        .pe-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
        }
        .pe-back:hover {
          color: #5641ce;
        }
        .pe-title {
          font-weight: 700;
          color: #0f172a;
          margin: 6px 0 0;
        }
        .pe-meta-line {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        .pe-head-actions {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .pe-btn {
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
        .pe-btn:hover:not(:disabled) {
          background: #4634ad;
        }
        .pe-btn:disabled {
          opacity: 0.6;
        }
        .pe-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          color: #334155;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 9px 18px;
          font-weight: 600;
          font-size: 0.88rem;
          text-decoration: none;
        }
        .pe-btn-ghost:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #334155;
        }

        .pe-icon-btn {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          width: 32px;
          height: 32px;
          color: #475569;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .pe-icon-btn:hover:not(:disabled) {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        .pe-icon-btn:disabled {
          opacity: 0.4;
        }
        .pe-icon-btn.danger {
          color: #ef4444;
          border-color: #fecaca;
          background: #fef2f2;
        }
        .pe-icon-btn.danger:hover:not(:disabled) {
          background: #fee2e2;
          border-color: #fca5a5;
        }

        .pe-row-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #e2e8f0;
          background: #fff;
          color: #475569;
          border-radius: 8px;
          padding: 7px 14px;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
        }
        .pe-row-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #334155;
        }
        .pe-row-btn.danger {
          color: #b91c1c;
          border-color: #fecaca;
          background: #fef2f2;
        }

        .pe-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
          margin-bottom: 14px;
        }
        .pe-card-title {
          font-weight: 700;
          color: #0f172a;
          font-size: 0.95rem;
          margin: 0 0 14px;
        }
        .pe-card-title.mb0 {
          margin-bottom: 0;
        }
        .pe-sub {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 0.84rem;
          max-width: 760px;
        }
        .pe-section-head {
          margin: 18px 0 12px;
        }
        .pe-empty {
          color: #64748b;
          margin: 0;
          padding: 24px 0;
        }

        .pe-note {
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
        .pe-note.warn {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        .pe-note-icon {
          color: #94a3b8;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          height: 20px;
        }

        .pe-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 14px;
        }
        .pe-field.mt {
          margin-top: 14px;
        }
        .pe-field label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          color: #475569;
          margin-bottom: 6px;
        }
        .pe-hint {
          font-weight: 500;
          color: #94a3b8;
          margin-left: 8px;
        }
        .pe-field input,
        .pe-field textarea {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.88rem;
          color: #0f172a;
          background: #fff;
        }
        .pe-field input:focus,
        .pe-field textarea:focus {
          outline: none;
          border-color: #5641ce;
          box-shadow: 0 0 0 3px rgba(86, 65, 206, 0.1);
        }
        .pe-field textarea.mono {
          font-family: ui-monospace, monospace;
          font-size: 0.8rem;
        }

        .pe-check {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          font-size: 0.86rem;
          font-weight: 600;
          color: #334155;
        }
        .pe-check input {
          width: 16px;
          height: 16px;
          accent-color: #5641ce;
        }

        .pe-readonly {
          margin: 8px 0 0;
          font-size: 0.78rem;
          color: #94a3b8;
        }
        .pe-readonly code {
          background: #f1f5f9;
          color: #4634ad;
          border-radius: 4px;
          padding: 1px 5px;
        }

        .pe-slug {
          background: #f1eefc;
          color: #4634ad;
          border: 1px solid #ded7f6;
          border-radius: 6px;
          padding: 3px 8px;
          font-size: 0.74rem;
          font-weight: 700;
          font-family: ui-monospace, monospace;
        }
        .pe-pill {
          background: #f1f5f9;
          color: #475569;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.74rem;
          font-weight: 700;
        }

        /* ----- section rows ----- */
        .pe-sections {
          margin-bottom: 18px;
        }
        .pe-row {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          margin-bottom: 10px;
        }
        .pe-row.is-open {
          border-color: #ded7f6;
        }
        .pe-row.is-hidden {
          background: #f8fafc;
        }
        .pe-row-head {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          flex-wrap: wrap;
        }
        .pe-num {
          background: #f1f5f9;
          color: #475569;
          border-radius: 6px;
          min-width: 26px;
          text-align: center;
          padding: 4px 0;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .pe-type {
          background: #f1eefc;
          color: #4634ad;
          border: 1px solid #ded7f6;
          border-radius: 6px;
          padding: 3px 9px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .pe-row-label {
          flex: 1 1 200px;
          min-width: 0;
          text-align: left;
          background: none;
          border: none;
          padding: 0;
          color: #334155;
          font-size: 0.86rem;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .pe-row-label:hover {
          color: #5641ce;
        }
        .pe-row-actions {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-left: auto;
        }
        .pe-row-body {
          border-top: 1px solid #f1f5f9;
          padding: 16px;
        }

        .pe-confirm {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          border-top: 1px solid #f1f5f9;
          background: #fef2f2;
          padding: 10px 12px;
          font-size: 0.84rem;
          color: #b91c1c;
          font-weight: 600;
        }
        .pe-confirm-text {
          margin: 0 0 10px;
          color: #0f172a;
          font-size: 0.95rem;
        }

        /* ----- table editor ----- */
        .pe-table-wrap {
          overflow-x: auto;
          margin-bottom: 12px;
        }
        .pe-edit-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.82rem;
        }
        .pe-edit-table th,
        .pe-edit-table td {
          border: 1px solid #e2e8f0;
          padding: 6px;
          vertical-align: middle;
        }
        .pe-edit-table th {
          background: #f8fafc;
        }
        .pe-edit-table input,
        .pe-edit-table textarea {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 6px 8px;
          font-size: 0.8rem;
          color: #0f172a;
        }
        .pe-edit-table th input {
          font-weight: 700;
        }
        .pe-edit-table input:focus,
        .pe-edit-table textarea:focus {
          outline: none;
          border-color: #5641ce;
        }
        .pe-faint {
          font-size: 0.74rem;
          color: #94a3b8;
        }

        .pe-preview {
          border: 1px solid #f1f5f9;
          border-radius: 10px;
          padding: 16px;
          margin-top: 14px;
        }

        .pe-add {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 14px 16px;
          margin-bottom: 40px;
        }
        .pe-add-label {
          font-size: 0.74rem;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.04em;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => {
  return { props: {} };
});
