"use client";
import React, { useState } from "react";

/**
 * Generic editor for a page's `content` object (PageContent.content).
 *
 * Pages such as /nios-results keep their layout and inline styles in code and
 * store only the editable text, lists, tables and link labels in the DB. That
 * structure is plain nested JSON, so this editor walks it instead of relying
 * on a per-page schema: add a key to the page's content and a field for it
 * appears here automatically.
 *
 * Shapes handled:
 *   string / number / boolean  -> input, textarea or switch
 *   array of strings           -> reorderable list
 *   array of arrays            -> table rows (one input per cell)
 *   array of objects           -> repeatable cards
 *   object                     -> nested group
 */

// "class10ButtonLabel" -> "Class 10 Button Label"; a trailing "Html" is shown
// as a hint instead of part of the name.
function labelFor(key) {
  const base = String(key).replace(/Html$/, "");
  return base
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    .replace(/^./, (ch) => ch.toUpperCase());
}

const isHtmlKey = (key) => /Html$/.test(String(key));
const isPlainObject = (v) =>
  v !== null && typeof v === "object" && !Array.isArray(v);

/* ======================= PRIMITIVE ======================= */
function PrimitiveField({ fieldKey, value, onChange }) {
  if (typeof value === "boolean") {
    return (
      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          id={"sw-" + fieldKey}
        />
        <label className="form-check-label fw-semibold" htmlFor={"sw-" + fieldKey}>
          {labelFor(fieldKey)}
        </label>
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <div className="mb-3">
        <label className="form-label fw-semibold small">{labelFor(fieldKey)}</label>
        <input
          type="number"
          className="form-control"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    );
  }

  const str = String(value ?? "");
  const html = isHtmlKey(fieldKey);
  const long = html || str.length > 90;

  return (
    <div className="mb-3">
      <label className="form-label fw-semibold small d-flex justify-content-between">
        <span>{labelFor(fieldKey)}</span>
        {html && <span className="text-muted fw-normal">HTML allowed</span>}
      </label>
      {long ? (
        <textarea
          className="form-control"
          rows={html ? 3 : Math.min(8, Math.ceil(str.length / 95) + 1)}
          value={str}
          onChange={(e) => onChange(e.target.value)}
          style={html ? { fontFamily: "monospace", fontSize: "13px" } : undefined}
        />
      ) : (
        <input
          className="form-control"
          value={str}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

/* ======================= LIST OF STRINGS ======================= */
function StringListField({ fieldKey, value, onChange }) {
  const move = (i, dir) => {
    const to = i + dir;
    if (to < 0 || to >= value.length) return;
    const next = [...value];
    [next[i], next[to]] = [next[to], next[i]];
    onChange(next);
  };

  return (
    <div className="mb-3">
      <label className="form-label fw-semibold small d-flex justify-content-between">
        <span>
          {labelFor(fieldKey)}{" "}
          <span className="text-muted fw-normal">({value.length})</span>
        </span>
        {isHtmlKey(fieldKey) && (
          <span className="text-muted fw-normal">HTML allowed</span>
        )}
      </label>

      {value.map((item, i) => (
        <div className="d-flex gap-2 mb-2 align-items-start" key={i}>
          <span
            className="badge bg-light text-dark border mt-2"
            style={{ minWidth: "28px" }}
          >
            {i + 1}
          </span>
          <textarea
            className="form-control"
            rows={String(item).length > 110 ? 3 : 1}
            value={String(item ?? "")}
            onChange={(e) => {
              const next = [...value];
              next[i] = e.target.value;
              onChange(next);
            }}
            style={
              isHtmlKey(fieldKey)
                ? { fontFamily: "monospace", fontSize: "13px" }
                : undefined
            }
          />
          <div className="btn-group btn-group-sm flex-shrink-0">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              title="Move up"
            >
              ↑
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => move(i, 1)}
              disabled={i === value.length - 1}
              title="Move down"
            >
              ↓
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
              title="Remove"
            >
              ×
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-sm btn-outline-primary"
        onClick={() => onChange([...value, ""])}
      >
        + Add item
      </button>
    </div>
  );
}

/* ======================= TABLE (array of arrays) ======================= */
function TableField({ fieldKey, value, onChange, columns }) {
  const width = Math.max(
    1,
    ...value.map((r) => (Array.isArray(r) ? r.length : 0)),
    Array.isArray(columns) ? columns.length : 0
  );

  return (
    <div className="mb-3">
      <label className="form-label fw-semibold small">
        {labelFor(fieldKey)}{" "}
        <span className="text-muted fw-normal">({value.length} rows)</span>
      </label>

      <div className="table-responsive">
        <table className="table table-sm table-bordered align-middle mb-2">
          <thead className="table-light">
            <tr>
              <th style={{ width: "36px" }}>#</th>
              {Array.from({ length: width }).map((_, c) => (
                <th key={c} className="small">
                  {(Array.isArray(columns) && columns[c]) || "Column " + (c + 1)}
                </th>
              ))}
              <th style={{ width: "48px" }} />
            </tr>
          </thead>
          <tbody>
            {value.map((row, r) => (
              <tr key={r}>
                <td className="text-muted small">{r + 1}</td>
                {Array.from({ length: width }).map((_, c) => (
                  <td key={c}>
                    <textarea
                      className="form-control form-control-sm"
                      rows={1}
                      value={String((row || [])[c] ?? "")}
                      onChange={(e) => {
                        const next = value.map((rw, ri) => {
                          if (ri !== r) return rw;
                          const cells = Array.from({ length: width }).map(
                            (_, ci) => (rw || [])[ci] ?? ""
                          );
                          cells[c] = e.target.value;
                          return cells;
                        });
                        onChange(next);
                      }}
                    />
                  </td>
                ))}
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onChange(value.filter((_, ri) => ri !== r))}
                    title="Remove row"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="btn btn-sm btn-outline-primary"
        onClick={() => onChange([...value, Array.from({ length: width }, () => "")])}
      >
        + Add row
      </button>
    </div>
  );
}

/* ======================= REPEATER (array of objects) ======================= */
function ObjectListField({ fieldKey, value, onChange }) {
  const move = (i, dir) => {
    const to = i + dir;
    if (to < 0 || to >= value.length) return;
    const next = [...value];
    [next[i], next[to]] = [next[to], next[i]];
    onChange(next);
  };

  const blank = () => {
    const template = value[0] || {};
    const out = {};
    for (const k of Object.keys(template)) {
      const v = template[k];
      out[k] = Array.isArray(v) ? [] : isPlainObject(v) ? {} : "";
    }
    return out;
  };

  return (
    <div className="mb-3">
      <label className="form-label fw-semibold small">
        {labelFor(fieldKey)}{" "}
        <span className="text-muted fw-normal">({value.length})</span>
      </label>

      {value.map((item, i) => (
        <div className="border rounded p-3 mb-2 bg-light" key={i}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-secondary">#{i + 1}</span>
            <div className="btn-group btn-group-sm">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => move(i, -1)}
                disabled={i === 0}
              >
                ↑
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => move(i, 1)}
                disabled={i === value.length - 1}
              >
                ↓
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  if (!confirm("Remove this item?")) return;
                  onChange(value.filter((_, idx) => idx !== i));
                }}
              >
                Remove
              </button>
            </div>
          </div>

          <ObjectFields
            value={item}
            onChange={(next) =>
              onChange(value.map((it, idx) => (idx === i ? next : it)))
            }
          />
        </div>
      ))}

      <button
        type="button"
        className="btn btn-sm btn-outline-primary"
        onClick={() => onChange([...value, blank()])}
      >
        + Add item
      </button>
    </div>
  );
}

/* ======================= DISPATCH ======================= */
function Field({ fieldKey, value, onChange, siblings }) {
  if (Array.isArray(value)) {
    if (value.some((v) => Array.isArray(v))) {
      // table rows -- reuse the sibling "columns" array for the headers
      return (
        <TableField
          fieldKey={fieldKey}
          value={value}
          onChange={onChange}
          columns={siblings?.columns}
        />
      );
    }
    if (value.some(isPlainObject)) {
      return (
        <ObjectListField fieldKey={fieldKey} value={value} onChange={onChange} />
      );
    }
    return (
      <StringListField fieldKey={fieldKey} value={value} onChange={onChange} />
    );
  }

  if (isPlainObject(value)) {
    return (
      <div className="border-start ps-3 mb-3" style={{ borderWidth: "3px" }}>
        <div className="fw-bold small text-uppercase text-muted mb-2">
          {labelFor(fieldKey)}
        </div>
        <ObjectFields value={value} onChange={onChange} />
      </div>
    );
  }

  return (
    <PrimitiveField fieldKey={fieldKey} value={value} onChange={onChange} />
  );
}

function ObjectFields({ value, onChange }) {
  return (
    <>
      {Object.keys(value || {}).map((key) => (
        <Field
          key={key}
          fieldKey={key}
          value={value[key]}
          siblings={value}
          onChange={(next) => onChange({ ...value, [key]: next })}
        />
      ))}
    </>
  );
}

/* ======================= ROOT ======================= */
export default function ContentFieldsEditor({ value, onChange }) {
  const groups = Object.keys(value || {});
  const [open, setOpen] = useState(groups[0] || null);

  if (!groups.length) {
    return (
      <div className="alert alert-secondary">
        This page has no editable fields yet.
      </div>
    );
  }

  return (
    <div className="mb-4">
      {groups.map((key) => {
        const expanded = open === key;
        return (
          <div className="border rounded mb-2 bg-white" key={key}>
            <button
              type="button"
              className="btn w-100 text-start d-flex justify-content-between align-items-center p-3"
              onClick={() => setOpen(expanded ? null : key)}
            >
              <span className="fw-bold">{labelFor(key)}</span>
              <span className="text-muted">{expanded ? "−" : "+"}</span>
            </button>

            {expanded && (
              <div className="border-top p-3">
                {/* a group is normally an object -- render its fields without
                    repeating the group name that is already in the header */}
                {isPlainObject(value[key]) ? (
                  <ObjectFields
                    value={value[key]}
                    onChange={(next) => onChange({ ...value, [key]: next })}
                  />
                ) : (
                  <Field
                    fieldKey={key}
                    value={value[key]}
                    siblings={value}
                    onChange={(next) => onChange({ ...value, [key]: next })}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
