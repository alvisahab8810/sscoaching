import React from "react";

/**
 * Renders PageContent sections as exactly the markup that used to be
 * hardcoded on the page. Do not add any extra wrapper element here -- the
 * CSS relies on adjacent sibling selectors such as
 * `h3.nios-125h-senior-hero-title + .table-wrapper`, so even one extra div
 * breaks the spacing.
 */

/** "display:flex;gap:16px" -> { display: "flex", gap: "16px" } */
function parseStyle(str) {
  if (!str) return undefined;

  const out = {};
  for (const part of String(str).split(";")) {
    const i = part.indexOf(":");
    if (i === -1) continue;

    const prop = part.slice(0, i).trim();
    const value = part.slice(i + 1).trim();
    if (!prop || !value) continue;

    // custom properties (--x) stay as-is, everything else becomes camelCase
    const key = prop.startsWith("--")
      ? prop
      : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

    out[key] = value;
  }
  return Object.keys(out).length ? out : undefined;
}

// Void elements -- they cannot take children, React throws otherwise.
const VOID_TAGS = new Set([
  "br", "hr", "img", "input", "area", "base", "col",
  "embed", "link", "meta", "source", "track", "wbr",
]);

function Section({ section }) {
  const { type, className, style } = section;
  const css = parseStyle(style);

  /* ---------- heading ---------- */
  if (type === "heading") {
    const Tag = ["h1", "h2", "h3", "h4"].includes(section.level)
      ? section.level
      : "h2";

    // On this page the h2 carries no class; it sits on the inner span.
    if (section.wrapInSpan) {
      return (
        <Tag style={css}>
          <span className={className || undefined}>{section.text}</span>
        </Tag>
      );
    }

    return (
      <Tag className={className || undefined} style={css}>
        {section.text}
      </Tag>
    );
  }

  /* ---------- table ---------- */
  if (type === "table") {
    const columns = Array.isArray(section.columns) ? section.columns : [];
    const rows = Array.isArray(section.rows) ? section.rows : [];

    return (
      <div className={className || "table-wrapper"} style={css}>
        <table>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i} className={col?.className || undefined}>
                  {col?.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {(Array.isArray(row) ? row : []).map((cell, c) => (
                  <td
                    key={c}
                    className={cell?.className || undefined}
                    // cells contain <br> and <strong>
                    dangerouslySetInnerHTML={{ __html: cell?.html || "" }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  /* ---------- raw html ---------- */
  const Tag = section.tag || "div";

  if (VOID_TAGS.has(Tag)) {
    return <Tag className={className || undefined} style={css} />;
  }

  return (
    <Tag
      className={className || undefined}
      style={css}
      dangerouslySetInnerHTML={{ __html: section.html || "" }}
    />
  );
}

export default function PageSections({ sections }) {
  if (!Array.isArray(sections) || !sections.length) return null;

  return (
    <>
      {sections
        .filter((s) => s && s.isActive !== false)
        .map((s, i) => (
          <Section key={s._id || i} section={s} />
        ))}
    </>
  );
}
