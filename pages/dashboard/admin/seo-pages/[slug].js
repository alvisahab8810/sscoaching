"use client";
import { withAdminAuth } from "@/lib/withAdminAuth";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";
import { seoScore } from "@/lib/seoScore";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="border rounded p-3 text-muted small">Loading editor...</div>,
});

const QUILL_MODULES = {
  toolbar: [
    [{ header: [2, 3, 4, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "blockquote"],
    [{ color: [] }],
    ["clean"],
  ],
};

/* =======================================================================
   SECTION CATALOGUE
   Every entry mirrors a section that already exists on the live website,
   so a page built here looks like the rest of sscoaching.in.
   `fields` drives the editor -- adding a field here is all it takes.
   ======================================================================= */
const SECTIONS = {
  hero: {
    label: "Hero Banner",
    hint: "Big opening section. Headline, short intro, up to two buttons and an image.",
    fields: ["heading", "subheading", "html", "buttons", "image", "layout"],
    defaults: { headingLevel: "h1", background: "light", align: "left" },
  },
  richtext: {
    label: "Text Content",
    hint: "A heading plus formatted paragraphs, lists and links. Your main content.",
    fields: ["heading", "html", "layout"],
    defaults: { headingLevel: "h2", background: "white", align: "left" },
  },
  features: {
    label: "Feature Grid",
    hint: "Three-up icon cards. Good for benefits, subjects or facilities.",
    fields: ["heading", "subheading", "items", "layout"],
    itemFields: ["image", "title", "text", "url"],
    itemLabel: "Feature",
    defaults: { headingLevel: "h2", background: "white", align: "center" },
  },
  stats: {
    label: "Numbers / Stats",
    hint: "Counters like 10,000+ Students. Put the number in the title field.",
    fields: ["heading", "items", "layout"],
    itemFields: ["title", "text"],
    itemLabel: "Stat",
    defaults: { headingLevel: "h2", background: "purple", align: "center" },
  },
  steps: {
    label: "Process Steps",
    hint: "Numbered steps. Ideal for an admission or application process.",
    fields: ["heading", "subheading", "items", "layout"],
    itemFields: ["title", "text"],
    itemLabel: "Step",
    defaults: { headingLevel: "h2", background: "light", align: "center" },
  },
  cards: {
    label: "Image Cards",
    hint: "Larger cards with a photo, title, text and a link. Courses, branches, offers.",
    fields: ["heading", "subheading", "items", "layout"],
    itemFields: ["image", "title", "text", "url"],
    itemLabel: "Card",
    defaults: { headingLevel: "h2", background: "white", align: "center" },
  },
  table: {
    label: "Data Table",
    hint: "Date sheets, fee structures, eligibility charts. Scrolls on mobile.",
    fields: ["heading", "table", "layout"],
    defaults: { headingLevel: "h2", background: "white", align: "left" },
  },
  faq: {
    label: "FAQ Accordion",
    hint: "Questions and answers. Also powers the FAQ structured data for Google.",
    fields: ["heading", "subheading", "items", "layout"],
    itemFields: ["title", "text"],
    itemLabel: "Question",
    defaults: { headingLevel: "h2", background: "light", align: "left" },
  },
  cta: {
    label: "Call To Action",
    hint: "Coloured strip with a headline and buttons. Use it to drive enquiries.",
    fields: ["heading", "subheading", "buttons", "layout"],
    defaults: { headingLevel: "h2", background: "purple", align: "center" },
  },
  image: {
    label: "Single Image",
    hint: "One full-width image with an optional caption.",
    fields: ["heading", "image", "caption", "layout"],
    defaults: { headingLevel: "h2", background: "white", align: "center" },
  },
  video: {
    label: "Video",
    hint: "Paste a YouTube link. It is embedded responsively.",
    fields: ["heading", "video", "caption", "layout"],
    defaults: { headingLevel: "h2", background: "white", align: "center" },
  },
  quote: {
    label: "Quote / Testimonial",
    hint: "A highlighted quote with the name of the person below it.",
    fields: ["html", "caption", "layout"],
    defaults: { headingLevel: "h2", background: "light", align: "center" },
  },
};

const ITEM_FIELD_LABELS = {
  image: "Image",
  title: "Title",
  text: "Text",
  url: "Link URL",
};

const BACKGROUNDS = [
  { value: "white", label: "White" },
  { value: "light", label: "Light Grey" },
  { value: "purple", label: "Brand Purple" },
  { value: "dark", label: "Dark Navy" },
  { value: "orange", label: "Orange" },
];

const SCHEMA_OPTIONS = [
  { value: "WebPage", label: "WebPage", hint: "Basic page info. Keep this on for every page." },
  { value: "Article", label: "Article", hint: "For guides and news-style pages. Adds author and dates." },
  { value: "Course", label: "Course", hint: "For course or admission pages." },
  { value: "LocalBusiness", label: "Organisation", hint: "Describes SS Coaching itself with its address." },
  { value: "FAQPage", label: "FAQ", hint: "Built from your FAQ sections. Can win extra space in Google." },
];

const TABS = ["Content", "SEO", "Social", "Schema", "Settings"];

function newBlock(type) {
  const spec = SECTIONS[type];
  const block = {
    _key: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    isActive: true,
    heading: "",
    headingHighlight: "",
    subheading: "",
    html: "",
    buttonText: "",
    buttonUrl: "",
    button2Text: "",
    button2Url: "",
    image: "",
    imageAlt: "",
    caption: "",
    videoUrl: "",
    className: "",
    ...spec.defaults,
  };

  if (spec.fields.includes("items")) {
    block.items = [{ image: "", imageAlt: "", title: "", text: "", url: "" }];
  }
  if (spec.fields.includes("table")) {
    block.columns = [{ label: "" }, { label: "" }];
    block.rows = [[{ html: "" }, { html: "" }]];
  }

  return block;
}

/* ===================== small shared inputs ===================== */

function Field({ label, hint, children }) {
  return (
    <div className="mb-3">
      {label && <label className="form-label fw-semibold small mb-1">{label}</label>}
      {children}
      {hint && <div className="form-text">{hint}</div>}
    </div>
  );
}

function CharCount({ value, min, max }) {
  const len = String(value || "").length;
  const ok = len >= min && len <= max;
  return (
    <span className={`small fw-semibold ${len === 0 ? "text-muted" : ok ? "text-success" : "text-danger"}`}>
      {len} / {max}
    </span>
  );
}

function ImagePicker({ value, onChange, compact }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const upload = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB");
      return;
    }

    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch("/api/upload/image", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        onChange(data.url);
        toast.success("Image uploaded");
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      toast.error(err.message || "Upload failed");
    }
    setBusy(false);
  };

  return (
    <div>
      <div className="d-flex gap-2 align-items-start">
        {value ? (
          <img
            src={value}
            alt=""
            style={{
              width: compact ? 56 : 90,
              height: compact ? 56 : 90,
              objectFit: "cover",
              borderRadius: 8,
              border: "1px solid #dee2e6",
              flexShrink: 0,
            }}
          />
        ) : null}

        <div className="flex-grow-1" style={{ minWidth: 0 }}>
          <input
            className="form-control form-control-sm mb-2"
            placeholder="/uploads/courses/photo.jpg or paste a URL"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
            >
              {busy ? "Uploading..." : "Upload"}
            </button>
            {value && (
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => onChange("")}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="d-none"
        onChange={(e) => {
          upload(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}

/* ===================== repeatable items ===================== */

function ItemsEditor({ block, fields, itemLabel, onChange }) {
  const items = block.items || [];

  const patch = (i, key, value) => {
    const next = items.map((it, idx) => (idx === i ? { ...it, [key]: value } : it));
    onChange(next);
  };

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="border rounded p-3 mb-2 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-semibold small text-muted">
              {itemLabel} {i + 1}
            </span>
            <div className="btn-group btn-group-sm">
              <button type="button" className="btn btn-outline-secondary" onClick={() => move(i, -1)} disabled={i === 0}>
                &uarr;
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => move(i, 1)}
                disabled={i === items.length - 1}
              >
                &darr;
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              >
                Delete
              </button>
            </div>
          </div>

          {fields.includes("image") && (
            <>
              <Field label={ITEM_FIELD_LABELS.image}>
                <ImagePicker compact value={item.image} onChange={(v) => patch(i, "image", v)} />
              </Field>
              {item.image ? (
                <Field label="Image Alt Text" hint="Describe the image in a few words.">
                  <input
                    className="form-control form-control-sm"
                    value={item.imageAlt || ""}
                    onChange={(e) => patch(i, "imageAlt", e.target.value)}
                  />
                </Field>
              ) : null}
            </>
          )}

          {fields.includes("title") && (
            <Field label={block.type === "stats" ? "Number" : ITEM_FIELD_LABELS.title}>
              <input
                className="form-control form-control-sm"
                placeholder={block.type === "stats" ? "10,000+" : ""}
                value={item.title || ""}
                onChange={(e) => patch(i, "title", e.target.value)}
              />
            </Field>
          )}

          {fields.includes("text") && (
            <Field label={block.type === "faq" ? "Answer" : ITEM_FIELD_LABELS.text}>
              <ReactQuill
                theme="snow"
                modules={QUILL_MODULES}
                value={item.text || ""}
                onChange={(v) => patch(i, "text", v)}
              />
            </Field>
          )}

          {fields.includes("url") && (
            <Field label={ITEM_FIELD_LABELS.url} hint="Optional. Leave blank for no link.">
              <input
                className="form-control form-control-sm"
                placeholder="/contact-us"
                value={item.url || ""}
                onChange={(e) => patch(i, "url", e.target.value)}
              />
            </Field>
          )}
        </div>
      ))}

      <button
        type="button"
        className="btn btn-sm btn-outline-primary"
        onClick={() =>
          onChange([...items, { image: "", imageAlt: "", title: "", text: "", url: "" }])
        }
      >
        + Add {itemLabel}
      </button>
    </div>
  );
}

/* ===================== table ===================== */

function TableEditor({ block, onChange }) {
  const columns = block.columns?.length ? block.columns : [{ label: "" }, { label: "" }];
  const rows = block.rows?.length ? block.rows : [columns.map(() => ({ html: "" }))];

  const addColumn = () =>
    onChange({
      columns: [...columns, { label: "" }],
      // every existing row needs the extra cell or the table goes ragged
      rows: rows.map((r) => [...r, { html: "" }]),
    });

  const removeColumn = (ci) => {
    onChange({
      columns: columns.filter((_, i) => i !== ci),
      rows: rows.map((r) => r.filter((_, i) => i !== ci)),
    });
  };

  return (
    <div>
      <div className="table-responsive border rounded bg-white mb-2">
        <table className="table table-sm table-bordered mb-0" style={{ minWidth: 520 }}>
          <thead className="table-light">
            <tr>
              {columns.map((c, ci) => (
                <th key={ci} style={{ minWidth: 160 }}>
                  <input
                    className="form-control form-control-sm"
                    placeholder={`Column ${ci + 1}`}
                    value={c.label || ""}
                    onChange={(e) =>
                      onChange({
                        columns: columns.map((col, i) =>
                          i === ci ? { label: e.target.value } : col
                        ),
                        rows,
                      })
                    }
                  />
                  {columns.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-danger p-0 mt-1"
                      onClick={() => removeColumn(ci)}
                    >
                      Remove column
                    </button>
                  )}
                </th>
              ))}
              <th style={{ width: 40 }} />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {columns.map((_, ci) => (
                  <td key={ci}>
                    <input
                      className="form-control form-control-sm"
                      value={row[ci]?.html || ""}
                      onChange={(e) =>
                        onChange({
                          columns,
                          rows: rows.map((r, i) =>
                            i === ri
                              ? r.map((cell, j) => (j === ci ? { html: e.target.value } : cell))
                              : r
                          ),
                        })
                      }
                    />
                  </td>
                ))}
                <td className="text-center align-middle">
                  <button
                    type="button"
                    className="btn btn-sm btn-link text-danger p-0"
                    onClick={() => onChange({ columns, rows: rows.filter((_, i) => i !== ri) })}
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

      <div className="d-flex gap-2">
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() =>
            onChange({ columns, rows: [...rows, columns.map(() => ({ html: "" }))] })
          }
        >
          + Add Row
        </button>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={addColumn}>
          + Add Column
        </button>
      </div>
    </div>
  );
}

/* ===================== one block ===================== */

function BlockEditor({ block, index, total, open, onToggleOpen, onPatch, onMove, onDuplicate, onDelete }) {
  const spec = SECTIONS[block.type];
  if (!spec) return null;

  const has = (f) => spec.fields.includes(f);

  return (
    <div className={`border rounded mb-3 bg-white ${block.isActive === false ? "opacity-75" : ""}`}>
      {/* --- block header --- */}
      <div
        className="d-flex justify-content-between align-items-center p-3 flex-wrap gap-2"
        style={{ cursor: "pointer", background: open ? "#f8f9fa" : "#fff" }}
        onClick={onToggleOpen}
      >
        <div className="d-flex align-items-center gap-2" style={{ minWidth: 0 }}>
          <span className="badge bg-light text-dark border">{index + 1}</span>
          <div style={{ minWidth: 0 }}>
            <div className="fw-semibold text-truncate">
              {spec.label}
              {block.isActive === false && (
                <span className="badge bg-secondary ms-2">Hidden</span>
              )}
            </div>
            <div className="text-muted small text-truncate">
              {block.heading || block.subheading || spec.hint}
            </div>
          </div>
        </div>

        <div className="btn-group btn-group-sm" onClick={(e) => e.stopPropagation()}>
          <button className="btn btn-outline-secondary" onClick={() => onMove(-1)} disabled={index === 0} title="Move up">
            &uarr;
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            title="Move down"
          >
            &darr;
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => onPatch({ isActive: block.isActive === false })}
            title="Show or hide this section"
          >
            {block.isActive === false ? "Show" : "Hide"}
          </button>
          <button className="btn btn-outline-secondary" onClick={onDuplicate} title="Duplicate">
            Copy
          </button>
          <button className="btn btn-outline-danger" onClick={onDelete} title="Delete">
            Delete
          </button>
          <button className="btn btn-outline-primary" onClick={onToggleOpen}>
            {open ? "Close" : "Edit"}
          </button>
        </div>
      </div>

      {/* --- block body --- */}
      {open && (
        <div className="p-3 border-top">
          <div className="text-muted small mb-3">{spec.hint}</div>

          {has("heading") && (
            <div className="row g-2 align-items-end mb-3">
              <div className="col-md-7">
                <label className="form-label fw-semibold small mb-1">Heading</label>
                <input
                  className="form-control"
                  value={block.heading || ""}
                  onChange={(e) => onPatch({ heading: e.target.value })}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-semibold small mb-1">Level</label>
                <select
                  className="form-select"
                  value={block.headingLevel || "h2"}
                  onChange={(e) => onPatch({ headingLevel: e.target.value })}
                >
                  <option value="h1">H1</option>
                  <option value="h2">H2</option>
                  <option value="h3">H3</option>
                  <option value="h4">H4</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold small mb-1">Highlight Word</label>
                <input
                  className="form-control"
                  placeholder="NIOS"
                  value={block.headingHighlight || ""}
                  onChange={(e) => onPatch({ headingHighlight: e.target.value })}
                />
              </div>
              <div className="col-12">
                <div className="form-text">
                  Use H1 once per page (normally the hero). Everything else should be
                  H2 or H3. The highlight word is coloured in the brand purple &mdash; it
                  must match a word in the heading.
                </div>
              </div>
            </div>
          )}

          {has("subheading") && (
            <Field label="Sub Heading" hint="One or two short lines under the heading.">
              <textarea
                className="form-control"
                rows={2}
                value={block.subheading || ""}
                onChange={(e) => onPatch({ subheading: e.target.value })}
              />
            </Field>
          )}

          {has("html") && (
            <Field
              label={block.type === "quote" ? "Quote Text" : "Content"}
              hint={block.type === "hero" ? "Optional. Short intro paragraph." : undefined}
            >
              <ReactQuill
                theme="snow"
                modules={QUILL_MODULES}
                value={block.html || ""}
                onChange={(v) => onPatch({ html: v })}
              />
            </Field>
          )}

          {has("items") && (
            <Field label={`${spec.itemLabel}s`}>
              <ItemsEditor
                block={block}
                fields={spec.itemFields}
                itemLabel={spec.itemLabel}
                onChange={(items) => onPatch({ items })}
              />
            </Field>
          )}

          {has("table") && (
            <Field label="Table">
              <TableEditor block={block} onChange={(patch) => onPatch(patch)} />
            </Field>
          )}

          {has("buttons") && (
            <div className="row g-2 mb-3">
              <div className="col-md-3">
                <label className="form-label fw-semibold small mb-1">Button 1 Text</label>
                <input
                  className="form-control"
                  placeholder="Apply Now"
                  value={block.buttonText || ""}
                  onChange={(e) => onPatch({ buttonText: e.target.value })}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold small mb-1">Button 1 Link</label>
                <input
                  className="form-control"
                  placeholder="/contact-us"
                  value={block.buttonUrl || ""}
                  onChange={(e) => onPatch({ buttonUrl: e.target.value })}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold small mb-1">Button 2 Text</label>
                <input
                  className="form-control"
                  placeholder="Call Us"
                  value={block.button2Text || ""}
                  onChange={(e) => onPatch({ button2Text: e.target.value })}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold small mb-1">Button 2 Link</label>
                <input
                  className="form-control"
                  placeholder="tel:+919999999999"
                  value={block.button2Url || ""}
                  onChange={(e) => onPatch({ button2Url: e.target.value })}
                />
              </div>
            </div>
          )}

          {has("image") && (
            <>
              <Field label="Image">
                <ImagePicker value={block.image} onChange={(v) => onPatch({ image: v })} />
              </Field>
              {block.image ? (
                <Field
                  label="Image Alt Text"
                  hint="Required for SEO. Describe what the image shows."
                >
                  <input
                    className="form-control"
                    value={block.imageAlt || ""}
                    onChange={(e) => onPatch({ imageAlt: e.target.value })}
                  />
                </Field>
              ) : null}
            </>
          )}

          {has("video") && (
            <Field
              label="YouTube Link"
              hint="Paste the normal watch link. It is converted to an embed automatically."
            >
              <input
                className="form-control"
                placeholder="https://www.youtube.com/watch?v=..."
                value={block.videoUrl || ""}
                onChange={(e) => onPatch({ videoUrl: e.target.value })}
              />
            </Field>
          )}

          {has("caption") && (
            <Field label={block.type === "quote" ? "Person / Source" : "Caption"}>
              <input
                className="form-control"
                value={block.caption || ""}
                onChange={(e) => onPatch({ caption: e.target.value })}
              />
            </Field>
          )}

          {has("layout") && (
            <div className="row g-2">
              <div className="col-md-4">
                <label className="form-label fw-semibold small mb-1">Background</label>
                <select
                  className="form-select"
                  value={block.background || "white"}
                  onChange={(e) => onPatch({ background: e.target.value })}
                >
                  {BACKGROUNDS.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold small mb-1">Text Alignment</label>
                <select
                  className="form-select"
                  value={block.align || "left"}
                  onChange={(e) => onPatch({ align: e.target.value })}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold small mb-1">Extra CSS Class</label>
                <input
                  className="form-control"
                  value={block.className || ""}
                  onChange={(e) => onPatch({ className: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* =======================================================================
   PAGE
   ======================================================================= */

function SeoPageBuilder() {
  const router = useRouter();
  const { slug: routeSlug } = router.query;

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [tab, setTab] = useState("Content");
  const [openBlock, setOpenBlock] = useState(null);
  const [showPalette, setShowPalette] = useState(false);

  /* ---- load ---- */
  useEffect(() => {
    if (!routeSlug) return;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/seo-pages/${routeSlug}`, { cache: "no-store" });
        const data = await res.json();
        if (data.success) {
          const blocks = (data.data.blocks || [])
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            // React needs a stable key that survives reordering, and _id is
            // missing on blocks the admin has not saved yet.
            .map((b, i) => ({ ...b, _key: b._id || `b-${i}` }));
          setPage({ ...data.data, blocks });
        } else {
          toast.error(data.message || "Page not found");
        }
      } catch (err) {
        toast.error(err.message);
      }
      setLoading(false);
    })();
  }, [routeSlug]);

  /* ---- warn before leaving with unsaved work ---- */
  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const patch = useCallback((changes) => {
    setPage((p) => (p ? { ...p, ...changes } : p));
    setDirty(true);
  }, []);

  const patchBlock = (i, changes) => {
    setPage((p) => ({
      ...p,
      blocks: p.blocks.map((b, idx) => (idx === i ? { ...b, ...changes } : b)),
    }));
    setDirty(true);
  };

  const moveBlock = (i, dir) => {
    const j = i + dir;
    setPage((p) => {
      if (j < 0 || j >= p.blocks.length) return p;
      const blocks = [...p.blocks];
      [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
      return { ...p, blocks };
    });
    setDirty(true);
  };

  const addBlock = (type) => {
    const block = newBlock(type);
    setPage((p) => ({ ...p, blocks: [...p.blocks, block] }));
    setOpenBlock(block._key);
    setShowPalette(false);
    setDirty(true);
  };

  const duplicateBlock = (i) => {
    setPage((p) => {
      const copy = {
        ...JSON.parse(JSON.stringify(p.blocks[i])),
        _id: undefined,
        _key: `copy-${Date.now()}`,
      };
      const blocks = [...p.blocks];
      blocks.splice(i + 1, 0, copy);
      return { ...p, blocks };
    });
    setDirty(true);
  };

  const deleteBlock = (i) => {
    if (!confirm("Delete this section? Its content will be lost.")) return;
    setPage((p) => ({ ...p, blocks: p.blocks.filter((_, idx) => idx !== i) }));
    setDirty(true);
  };

  /* ---- save ---- */
  const save = async (statusOverride) => {
    if (!page) return;
    setSaving(true);

    const body = {
      title: page.title,
      slug: page.slug,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      metaKeywords: page.metaKeywords,
      focusKeyword: page.focusKeyword,
      canonicalUrl: page.canonicalUrl,
      indexable: page.indexable,
      followLinks: page.followLinks,
      ogTitle: page.ogTitle,
      ogDescription: page.ogDescription,
      ogImage: page.ogImage,
      ogType: page.ogType,
      authorName: page.authorName,
      publishedAt: page.publishedAt,
      schemaTypes: page.schemaTypes,
      breadcrumbs: page.breadcrumbs,
      customSchema: page.customSchema,
      status: statusOverride || page.status,
      // _key is a client-side React key, the API drops unknown fields anyway.
      blocks: page.blocks.map(({ _key, ...b }) => b),
    };

    try {
      const res = await fetch(`/api/admin/seo-pages/${routeSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.success) {
        setDirty(false);
        toast.success(
          statusOverride === "published"
            ? "Published. The page is live."
            : statusOverride === "draft"
            ? "Moved to draft. The page is no longer public."
            : "Saved"
        );

        if (statusOverride) patch({ status: statusOverride });
        setDirty(false);

        // The URL changed, so the editor has to follow it or the next save
        // would hit a slug that no longer exists.
        if (data.data?.slug && data.data.slug !== routeSlug) {
          router.replace(`/dashboard/admin/seo-pages/${data.data.slug}`, undefined, {
            shallow: true,
          });
        }
      } else {
        toast.error(data.message || "Save failed");
      }
    } catch (err) {
      toast.error(err.message);
    }

    setSaving(false);
  };

  const score = useMemo(() => seoScore(page), [page]);

  if (loading || !page) {
    return (
      <div>
        <Topbar />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1 bg-light p-4">
            <p className="text-muted">{loading ? "Loading page..." : "Page not found."}</p>
            <Link href="/dashboard/admin/seo-pages" className="btn btn-sm btn-outline-secondary">
              Back to SEO Pages
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const schemaTypes = page.schemaTypes || [];

  return (
    <div>
      <Topbar />
      <AdminOffcanvas />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />

        <div className="flex-grow-1 bg-light" style={{ minWidth: 0 }}>
          {/* ===== STICKY ACTION BAR ===== */}
          <div
            className="bg-white border-bottom px-4 py-3"
            style={{ position: "sticky", top: 0, zIndex: 20 }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div style={{ minWidth: 0 }}>
                <div className="d-flex align-items-center gap-2">
                  <Link href="/dashboard/admin/seo-pages" className="text-decoration-none small">
                    &larr; SEO Pages
                  </Link>
                  <span
                    className={
                      "badge " + (page.status === "published" ? "bg-success" : "bg-secondary")
                    }
                  >
                    {page.status === "published" ? "Published" : "Draft"}
                  </span>
                  {dirty && <span className="badge bg-warning text-dark">Unsaved changes</span>}
                </div>
                <h5 className="fw-bold mb-0 mt-1 text-truncate">{page.title}</h5>
                <code className="small text-muted">/{page.slug}</code>
              </div>

              <div className="d-flex align-items-center gap-2 flex-wrap">
                <span className={`badge bg-${score.variant}`} title={`${score.passed} of ${score.total} checks passed`}>
                  SEO {score.percent}%
                </span>

                <a
                  href={`/${page.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-secondary"
                >
                  View Page
                </a>

                {page.status === "published" ? (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => save("draft")}
                    disabled={saving}
                  >
                    Unpublish
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => save("published")}
                    disabled={saving}
                  >
                    Publish
                  </button>
                )}

                <button
                  className="btn btn-sm btn-primary brandbg"
                  onClick={() => save()}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>

            {/* ===== TABS ===== */}
            <ul className="nav nav-tabs mt-3 border-0">
              {TABS.map((t) => (
                <li className="nav-item" key={t}>
                  <button
                    className={`nav-link ${tab === t ? "active" : ""}`}
                    onClick={() => setTab(t)}
                  >
                    {t}
                    {t === "Content" && (
                      <span className="badge bg-light text-dark border ms-2">
                        {page.blocks.length}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="container-fluid p-4">
            {/* ================= CONTENT ================= */}
            {tab === "Content" && (
              <div className="row g-4">
                <div className="col-lg-8">
                  {page.blocks.length === 0 && (
                    <div className="border rounded bg-white p-5 text-center text-muted">
                      <p className="mb-3">
                        This page has no sections yet. A good SEO page has at least
                        seven, starting with a hero banner.
                      </p>
                      <button
                        className="btn btn-primary brandbg"
                        onClick={() => setShowPalette(true)}
                      >
                        + Add First Section
                      </button>
                    </div>
                  )}

                  {page.blocks.map((block, i) => (
                    <BlockEditor
                      key={block._key}
                      block={block}
                      index={i}
                      total={page.blocks.length}
                      open={openBlock === block._key}
                      onToggleOpen={() =>
                        setOpenBlock((k) => (k === block._key ? null : block._key))
                      }
                      onPatch={(changes) => patchBlock(i, changes)}
                      onMove={(dir) => moveBlock(i, dir)}
                      onDuplicate={() => duplicateBlock(i)}
                      onDelete={() => deleteBlock(i)}
                    />
                  ))}

                  {page.blocks.length > 0 && (
                    <button
                      className="btn btn-primary brandbg w-100"
                      onClick={() => setShowPalette((v) => !v)}
                    >
                      {showPalette ? "Close" : "+ Add Section"}
                    </button>
                  )}

                  {showPalette && (
                    <div className="border rounded bg-white p-3 mt-3">
                      <div className="fw-semibold mb-2">Choose a section</div>
                      <div className="row g-2">
                        {Object.entries(SECTIONS).map(([type, spec]) => (
                          <div className="col-md-6" key={type}>
                            <button
                              className="btn btn-outline-secondary text-start w-100 h-100 p-3"
                              onClick={() => addBlock(type)}
                            >
                              <div className="fw-semibold">{spec.label}</div>
                              <div className="small text-muted">{spec.hint}</div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* --- checklist --- */}
                <div className="col-lg-4">
                  <div
                    className="border rounded bg-white p-3"
                    style={{ position: "sticky", top: 180 }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-semibold">SEO Checklist</span>
                      <span className={`badge bg-${score.variant}`}>{score.percent}%</span>
                    </div>
                    <div className="progress mb-3" style={{ height: 6 }}>
                      <div
                        className={`progress-bar bg-${score.variant}`}
                        style={{ width: `${score.percent}%` }}
                      />
                    </div>

                    <ul className="list-unstyled mb-0 small">
                      {score.checks.map((c, i) => (
                        <li key={i} className="d-flex gap-2 mb-2">
                          <span className={c.pass ? "text-success" : "text-danger"}>
                            {c.pass ? "✓" : "✗"}
                          </span>
                          <span>
                            <span className={c.pass ? "text-muted" : "fw-semibold"}>
                              {c.label}
                            </span>
                            {!c.pass && c.hint && (
                              <div className="text-muted">{c.hint}</div>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ================= SEO ================= */}
            {tab === "SEO" && (
              <div className="row g-4">
                <div className="col-lg-7">
                  <div className="border rounded bg-white p-4">
                    <Field label="Page Title (internal)">
                      <input
                        className="form-control"
                        value={page.title || ""}
                        onChange={(e) => patch({ title: e.target.value })}
                      />
                    </Field>

                    <Field
                      label="Page URL"
                      hint="Changing this breaks every existing link to the page. Only change it before the page gets traffic."
                    >
                      <div className="input-group">
                        <span className="input-group-text">sscoaching.in/</span>
                        <input
                          className="form-control"
                          value={page.slug || ""}
                          onChange={(e) =>
                            patch({
                              slug: e.target.value
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/^-+/, ""),
                            })
                          }
                        />
                      </div>
                    </Field>

                    <Field
                      label="Focus Keyword"
                      hint="The single phrase this page should rank for, e.g. nios admission lucknow."
                    >
                      <input
                        className="form-control"
                        value={page.focusKeyword || ""}
                        onChange={(e) => patch({ focusKeyword: e.target.value })}
                      />
                    </Field>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <label className="form-label fw-semibold small mb-0">SEO Title</label>
                        <CharCount value={page.metaTitle} min={30} max={60} />
                      </div>
                      <input
                        className="form-control"
                        placeholder="NIOS Admission in Lucknow 2026 | SS Coaching"
                        value={page.metaTitle || ""}
                        onChange={(e) => patch({ metaTitle: e.target.value })}
                      />
                      <div className="form-text">
                        This is the blue clickable line in Google. Put the keyword first.
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <label className="form-label fw-semibold small mb-0">
                          Meta Description
                        </label>
                        <CharCount value={page.metaDescription} min={70} max={160} />
                      </div>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={page.metaDescription || ""}
                        onChange={(e) => patch({ metaDescription: e.target.value })}
                      />
                      <div className="form-text">
                        The grey text under the title. Write it like an advert, not a summary.
                      </div>
                    </div>

                    <Field
                      label="Meta Keywords"
                      hint="Comma separated. Google ignores these, but some other engines still read them."
                    >
                      <input
                        className="form-control"
                        value={page.metaKeywords || ""}
                        onChange={(e) => patch({ metaKeywords: e.target.value })}
                      />
                    </Field>

                    <Field
                      label="Canonical URL"
                      hint="Leave blank unless this page duplicates another one. Then paste the original's full URL."
                    >
                      <input
                        className="form-control"
                        placeholder="https://sscoaching.in/nios-admission"
                        value={page.canonicalUrl || ""}
                        onChange={(e) => patch({ canonicalUrl: e.target.value })}
                      />
                    </Field>
                  </div>
                </div>

                {/* --- google preview --- */}
                <div className="col-lg-5">
                  <div className="border rounded bg-white p-4" style={{ position: "sticky", top: 180 }}>
                    <div className="fw-semibold mb-3">Google Preview</div>
                    <div style={{ fontFamily: "arial, sans-serif" }}>
                      <div style={{ fontSize: 12, color: "#202124" }}>SS Coaching</div>
                      <div style={{ fontSize: 12, color: "#4d5156" }}>
                        sscoaching.in &rsaquo; {page.slug}
                      </div>
                      <div
                        style={{
                          fontSize: 20,
                          lineHeight: "26px",
                          color: "#1a0dab",
                          marginTop: 4,
                        }}
                      >
                        {(page.metaTitle || page.title || "Untitled page").slice(0, 60)}
                        {(page.metaTitle || page.title || "").length > 60 ? "..." : ""}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          lineHeight: "22px",
                          color: "#4d5156",
                          marginTop: 4,
                        }}
                      >
                        {(page.metaDescription || "").slice(0, 160) ||
                          "No meta description set. Google will choose a sentence from the page itself."}
                        {(page.metaDescription || "").length > 160 ? "..." : ""}
                      </div>
                    </div>

                    <hr />
                    <div className="small text-muted">
                      This is roughly how the page will look in search results on a
                      desktop. Google sometimes rewrites the title, which is normal.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= SOCIAL ================= */}
            {tab === "Social" && (
              <div className="row g-4">
                <div className="col-lg-7">
                  <div className="border rounded bg-white p-4">
                    <p className="text-muted small">
                      These control how the page looks when the link is shared on
                      WhatsApp, Facebook or X. Leave them blank to reuse the SEO title
                      and description.
                    </p>

                    <Field label="Social Title">
                      <input
                        className="form-control"
                        value={page.ogTitle || ""}
                        onChange={(e) => patch({ ogTitle: e.target.value })}
                      />
                    </Field>

                    <Field label="Social Description">
                      <textarea
                        className="form-control"
                        rows={3}
                        value={page.ogDescription || ""}
                        onChange={(e) => patch({ ogDescription: e.target.value })}
                      />
                    </Field>

                    <Field
                      label="Share Image"
                      hint="1200 x 630 pixels works best. This is the picture shown in the WhatsApp preview."
                    >
                      <ImagePicker value={page.ogImage} onChange={(v) => patch({ ogImage: v })} />
                    </Field>

                    <Field label="Content Type">
                      <select
                        className="form-select"
                        value={page.ogType || "website"}
                        onChange={(e) => patch({ ogType: e.target.value })}
                      >
                        <option value="website">Website</option>
                        <option value="article">Article</option>
                      </select>
                    </Field>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="border rounded bg-white p-4" style={{ position: "sticky", top: 180 }}>
                    <div className="fw-semibold mb-3">Share Preview</div>
                    <div className="border rounded overflow-hidden">
                      {page.ogImage ? (
                        <img
                          src={page.ogImage}
                          alt=""
                          style={{ width: "100%", height: 160, objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          className="d-flex align-items-center justify-content-center text-muted small"
                          style={{ height: 160, background: "#f1f3f5" }}
                        >
                          No share image set
                        </div>
                      )}
                      <div className="p-3">
                        <div className="text-uppercase text-muted" style={{ fontSize: 11 }}>
                          sscoaching.in
                        </div>
                        <div className="fw-semibold">
                          {page.ogTitle || page.metaTitle || page.title}
                        </div>
                        <div className="small text-muted">
                          {page.ogDescription || page.metaDescription}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= SCHEMA ================= */}
            {tab === "Schema" && (
              <div className="row g-4">
                <div className="col-lg-7">
                  <div className="border rounded bg-white p-4">
                    <div className="fw-semibold mb-1">Structured Data</div>
                    <p className="text-muted small">
                      Structured data tells Google what the page is about. Only tick what
                      the page genuinely contains &mdash; wrong markup can get the page
                      penalised.
                    </p>

                    {SCHEMA_OPTIONS.map((opt) => (
                      <div className="form-check mb-2" key={opt.value}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`schema-${opt.value}`}
                          checked={schemaTypes.includes(opt.value)}
                          onChange={(e) =>
                            patch({
                              schemaTypes: e.target.checked
                                ? [...schemaTypes, opt.value]
                                : schemaTypes.filter((t) => t !== opt.value),
                            })
                          }
                        />
                        <label className="form-check-label" htmlFor={`schema-${opt.value}`}>
                          <span className="fw-semibold">{opt.label}</span>
                          <div className="text-muted small">{opt.hint}</div>
                        </label>
                      </div>
                    ))}

                    <hr />

                    <div className="fw-semibold mb-1">Breadcrumbs</div>
                    <p className="text-muted small mb-0">
                      Handled for you. Every page on the website shows the same
                      breadcrumb trail, built from the page URL, and its structured
                      data is generated along with it &mdash; so there is nothing to
                      set here.
                    </p>

                    <hr />

                    <Field
                      label="Custom JSON-LD"
                      hint="Advanced. Paste any additional schema.org JSON here. It is validated when you save."
                    >
                      <textarea
                        className="form-control font-monospace"
                        rows={8}
                        placeholder='{"@context":"https://schema.org","@type":"VideoObject","name":"..."}'
                        value={page.customSchema || ""}
                        onChange={(e) => patch({ customSchema: e.target.value })}
                      />
                    </Field>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="border rounded bg-white p-4">
                    <div className="fw-semibold mb-2">What gets added</div>
                    <ul className="small text-muted ps-3 mb-0">
                      <li className="mb-2">
                        FAQ data is read straight from your FAQ sections, so the markup
                        can never say something different from what the visitor sees.
                      </li>
                      <li className="mb-2">
                        Breadcrumb markup comes from the site-wide breadcrumb bar, so
                        it is generated once per page &mdash; never twice.
                      </li>
                      <li className="mb-2">
                        Article uses the author name and publish date from the Settings
                        tab.
                      </li>
                      <li>
                        After publishing, test the page with Google&apos;s Rich Results
                        Test.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ================= SETTINGS ================= */}
            {tab === "Settings" && (
              <div className="row g-4">
                <div className="col-lg-7">
                  <div className="border rounded bg-white p-4">
                    <Field label="Status">
                      <select
                        className="form-select"
                        value={page.status || "draft"}
                        onChange={(e) => patch({ status: e.target.value })}
                      >
                        <option value="draft">Draft (not visible to anyone)</option>
                        <option value="published">Published (live on the website)</option>
                      </select>
                    </Field>

                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="indexable"
                        checked={page.indexable !== false}
                        onChange={(e) => patch({ indexable: e.target.checked })}
                      />
                      <label className="form-check-label" htmlFor="indexable">
                        Allow search engines to index this page
                      </label>
                      <div className="form-text">
                        Turn this off for thank-you or internal pages you do not want in
                        Google.
                      </div>
                    </div>

                    <div className="form-check form-switch mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="followLinks"
                        checked={page.followLinks !== false}
                        onChange={(e) => patch({ followLinks: e.target.checked })}
                      />
                      <label className="form-check-label" htmlFor="followLinks">
                        Allow search engines to follow the links on this page
                      </label>
                    </div>

                    <Field label="Author Name" hint="Used by the Article structured data.">
                      <input
                        className="form-control"
                        value={page.authorName || ""}
                        onChange={(e) => patch({ authorName: e.target.value })}
                      />
                    </Field>

                    <Field label="Publish Date">
                      <input
                        type="date"
                        className="form-control"
                        value={
                          page.publishedAt
                            ? new Date(page.publishedAt).toISOString().slice(0, 10)
                            : ""
                        }
                        onChange={(e) => patch({ publishedAt: e.target.value })}
                      />
                    </Field>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="border rounded bg-white p-4">
                    <div className="fw-semibold mb-2">Live URL</div>
                    <p className="small text-muted mb-2">
                      Once published, the page is reachable at:
                    </p>
                    <code className="d-block mb-3">https://sscoaching.in/{page.slug}</code>
                    <p className="small text-muted mb-0">
                      It appears within a minute of saving &mdash; no deployment needed.
                      Remember to add it to your sitemap submission in Search Console.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeoPageBuilder;

export const getServerSideProps = withAdminAuth(async () => {
  return { props: {} };
});
