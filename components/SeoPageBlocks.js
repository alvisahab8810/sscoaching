"use client";
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

/**
 * Renders a SeoPage's blocks.
 *
 * Every block mirrors a section that already exists on the public site, so
 * the colours, radii, shadows and fonts below are copied from
 * public/assets/css/style.css rather than invented:
 *
 *   #4441e5 / #624ce5  brand purple (.highlight, .brandbg)
 *   #ff9422 -> #ffc107 CTA orange  (.cta-button)
 *   #5b72ee #00cbb8 #28b9e6  feature icon tints (BeastFeatures)
 *   #1b1b46 / #293347  dark navy
 *   #6b7280  muted body text
 *   20px radius + 0 10px 60px #262c7514  card look
 *
 * The stylesheet is a plain <style> tag with every selector prefixed by
 * `.seo-page`. styled-jsx global would leak its generated class onto
 * elements such as <title>, and a scoped styled-jsx block cannot reach
 * markup inserted through dangerouslySetInnerHTML (the rich text body).
 */

/* Accepts a watch URL, a youtu.be link or an id and returns an embed URL. */
function toEmbedUrl(url) {
  const raw = String(url || "").trim();
  if (!raw) return "";

  const yt =
    raw.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/) ||
    (/^[\w-]{11}$/.test(raw) ? [null, raw] : null);

  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;

  // Anything else (Vimeo, Bunny, a self-hosted iframe) is used as given.
  return raw;
}

function Heading({ block, defaultLevel = "h2", className = "" }) {
  if (!block.heading && !block.headingHighlight) return null;

  const Tag = ["h1", "h2", "h3", "h4"].includes(block.headingLevel)
    ? block.headingLevel
    : defaultLevel;

  return (
    <Tag className={className}>
      {block.heading}
      {block.headingHighlight ? (
        <>
          {block.heading ? " " : ""}
          <span className="highlight">{block.headingHighlight}</span>
        </>
      ) : null}
    </Tag>
  );
}

/* ---------------------------------------------------------------- FAQ --- */
function FaqBlock({ block }) {
  const [open, setOpen] = useState(null);
  const items = Array.isArray(block.items) ? block.items : [];

  return (
    <div className="sp-faq">
      {items.map((item, i) => (
        <div className={`sp-faq-item${open === i ? " is-open" : ""}`} key={i}>
          <button
            type="button"
            className="sp-faq-q"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{item?.title}</span>
            {open === i ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {/* Always in the DOM so crawlers read the answers even when the
              accordion is closed. */}
          <div className="sp-faq-a" hidden={open !== i}>
            <div dangerouslySetInnerHTML={{ __html: item?.text || "" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- blocks --- */
function Block({ block }) {
  const { type } = block;
  const items = Array.isArray(block.items) ? block.items : [];
  const bg = block.background || "white";
  const sectionClass = [
    "sp-block",
    `sp-${type}`,
    `sp-bg-${bg}`,
    block.align === "center" ? "sp-center" : "",
    block.className || "",
  ]
    .filter(Boolean)
    .join(" ");

  const buttons = (
    <>
      {block.buttonText ? (
        <a className="sp-btn" href={block.buttonUrl || "#"}>
          {block.buttonText}
        </a>
      ) : null}
      {block.button2Text ? (
        <a className="sp-btn sp-btn-ghost" href={block.button2Url || "#"}>
          {block.button2Text}
        </a>
      ) : null}
    </>
  );

  /* ---------- hero ---------- */
  if (type === "hero") {
    return (
      <section className={sectionClass}>
        <div className="container">
          <div className="sp-hero-inner">
            <div className="sp-hero-text">
              <Heading block={block} defaultLevel="h1" className="sp-hero-title" />
              {block.subheading ? (
                <p className="sp-hero-sub">{block.subheading}</p>
              ) : null}
              {block.html ? (
                <div
                  className="sp-rich"
                  dangerouslySetInnerHTML={{ __html: block.html }}
                />
              ) : null}
              <div className="sp-btn-row">{buttons}</div>
            </div>

            {block.image ? (
              <div className="sp-hero-media">
                <img src={block.image} alt={block.imageAlt || ""} />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  /* ---------- rich text ---------- */
  if (type === "richtext") {
    return (
      <section className={sectionClass}>
        <div className="container">
          <Heading block={block} className="sp-title" />
          {block.subheading ? <p className="sp-sub">{block.subheading}</p> : null}
          <div
            className="sp-rich"
            dangerouslySetInnerHTML={{ __html: block.html || "" }}
          />
          <div className="sp-btn-row">{buttons}</div>
        </div>
      </section>
    );
  }

  /* ---------- feature cards ---------- */
  if (type === "features") {
    // The three icon tints cycle exactly as they do on the home page.
    const tints = ["sp-tint-1", "sp-tint-2", "sp-tint-3"];

    return (
      <section className={sectionClass}>
        <div className="container">
          <Heading block={block} className="sp-title sp-title-center" />
          {block.subheading ? (
            <p className="sp-sub sp-sub-center">{block.subheading}</p>
          ) : null}

          <div className="sp-features">
            {items.map((item, i) => (
              <div className="sp-feature-card" key={i}>
                <div className={`sp-feature-icon ${tints[i % 3]}`}>
                  {item?.image ? (
                    <img src={item.image} alt={item?.imageAlt || ""} />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                <h3>{item?.title}</h3>
                <p>{item?.text}</p>
              </div>
            ))}
          </div>
          <div className="sp-btn-row sp-btn-row-center">{buttons}</div>
        </div>
      </section>
    );
  }

  /* ---------- stats ---------- */
  if (type === "stats") {
    return (
      <section className={sectionClass}>
        <div className="container">
          <Heading block={block} className="sp-title sp-title-center" />
          <div className="sp-stats">
            {items.map((item, i) => (
              <div className="sp-stat" key={i}>
                {item?.image ? (
                  <div className="sp-stat-icon">
                    <img src={item.image} alt={item?.imageAlt || ""} />
                  </div>
                ) : null}
                <div>
                  <h3>{item?.title}</h3>
                  <p>{item?.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ---------- numbered steps ---------- */
  if (type === "steps") {
    return (
      <section className={sectionClass}>
        <div className="container">
          <Heading block={block} className="sp-title sp-title-center" />
          {block.subheading ? (
            <p className="sp-sub sp-sub-center">{block.subheading}</p>
          ) : null}

          <div className="sp-steps">
            {items.map((item, i) => (
              <div className="sp-step" key={i}>
                <div className="sp-step-no">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="sp-step-body">
                  <h3>{item?.title}</h3>
                  <p>{item?.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="sp-btn-row sp-btn-row-center">{buttons}</div>
        </div>
      </section>
    );
  }

  /* ---------- call to action ---------- */
  if (type === "cta") {
    return (
      <section className={sectionClass}>
        <div className="container">
          <div className="sp-cta-box">
            <div>
              <Heading block={block} className="sp-cta-title" />
              {block.subheading ? (
                <p className="sp-cta-sub">{block.subheading}</p>
              ) : null}
            </div>
            <div className="sp-btn-row">{buttons}</div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- faq ---------- */
  if (type === "faq") {
    return (
      <section className={sectionClass}>
        <div className="container">
          <Heading block={block} className="sp-title sp-title-center" />
          {block.subheading ? (
            <p className="sp-sub sp-sub-center">{block.subheading}</p>
          ) : null}
          <FaqBlock block={block} />
        </div>
      </section>
    );
  }

  /* ---------- image ---------- */
  if (type === "image") {
    return (
      <section className={sectionClass}>
        <div className="container">
          <Heading block={block} className="sp-title" />
          <figure className="sp-figure">
            {block.image ? (
              <img src={block.image} alt={block.imageAlt || ""} loading="lazy" />
            ) : null}
            {block.caption ? <figcaption>{block.caption}</figcaption> : null}
          </figure>
        </div>
      </section>
    );
  }

  /* ---------- video ---------- */
  if (type === "video") {
    const src = toEmbedUrl(block.videoUrl);

    return (
      <section className={sectionClass}>
        <div className="container">
          <Heading block={block} className="sp-title sp-title-center" />
          {src ? (
            <div className="sp-video">
              <iframe
                src={src}
                title={block.heading || "Video"}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : null}
          {block.caption ? <p className="sp-caption">{block.caption}</p> : null}
        </div>
      </section>
    );
  }

  /* ---------- table ---------- */
  if (type === "table") {
    const columns = Array.isArray(block.columns) ? block.columns : [];
    const rows = Array.isArray(block.rows) ? block.rows : [];
    const hasHeader = columns.some((c) => c?.label);

    return (
      <section className={sectionClass}>
        <div className="container">
          <Heading block={block} className="sp-title" />
          <div className="sp-table">
            <table>
              {hasHeader && (
                <thead>
                  <tr>
                    {columns.map((c, i) => (
                      <th key={i}>{c?.label}</th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {rows.map((row, r) => (
                  <tr key={r}>
                    {(Array.isArray(row) ? row : []).map((cell, c) => (
                      <td
                        key={c}
                        dangerouslySetInnerHTML={{ __html: cell?.html || "" }}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- content cards ---------- */
  if (type === "cards") {
    return (
      <section className={sectionClass}>
        <div className="container">
          <Heading block={block} className="sp-title sp-title-center" />
          {block.subheading ? (
            <p className="sp-sub sp-sub-center">{block.subheading}</p>
          ) : null}

          <div className="sp-cards">
            {items.map((item, i) => {
              const Wrapper = item?.url ? "a" : "div";
              return (
                <Wrapper
                  className="sp-card"
                  key={i}
                  {...(item?.url ? { href: item.url } : {})}
                >
                  {item?.image ? (
                    <img
                      className="sp-card-img"
                      src={item.image}
                      alt={item?.imageAlt || ""}
                      loading="lazy"
                    />
                  ) : null}
                  <h3>{item?.title}</h3>
                  <p>{item?.text}</p>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  /* ---------- quote ---------- */
  if (type === "quote") {
    return (
      <section className={sectionClass}>
        <div className="container">
          <blockquote className="sp-quote">
            <p>{block.subheading || block.heading}</p>
            {block.caption ? <cite>{block.caption}</cite> : null}
          </blockquote>
        </div>
      </section>
    );
  }

  return null;
}

export default function SeoPageBlocks({ blocks }) {
  if (!Array.isArray(blocks) || !blocks.length) return null;

  return (
    <div className="seo-page">
      {blocks
        .filter((b) => b && b.isActive !== false)
        .map((b, i) => (
          <Block key={b._id || i} block={b} />
        ))}

      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
    </div>
  );
}

const STYLES = `
.seo-page { font-family: 'Be Vietnam Pro', 'Poppins', Arial, sans-serif; color: #293347; }
.seo-page .sp-block { padding: 56px 0; }
.seo-page .sp-block > .container { max-width: 1200px; }

/* backgrounds */
.seo-page .sp-bg-white  { background: #ffffff; }
.seo-page .sp-bg-light  { background: #f6f7fb; }
.seo-page .sp-bg-purple { background: #4441e5; color: #ffffff; }
.seo-page .sp-bg-dark   { background: #1b1b46; color: #ffffff; }
.seo-page .sp-bg-orange { background: #ff9422; color: #ffffff; }
.seo-page .sp-bg-purple .highlight,
.seo-page .sp-bg-dark .highlight,
.seo-page .sp-bg-orange .highlight { color: #ffc107; }
.seo-page .sp-bg-purple .sp-sub,
.seo-page .sp-bg-dark .sp-sub,
.seo-page .sp-bg-orange .sp-sub { color: rgba(255,255,255,.85); }

.seo-page .sp-center { text-align: center; }

/* headings */
.seo-page .highlight { color: #4441e5; }
.seo-page .sp-title {
  font-family: 'Poppins', Arial, sans-serif;
  font-size: 36px; font-weight: 600; line-height: 1.3; margin: 0 0 18px;
}
.seo-page .sp-title-center { text-align: center; }
.seo-page .sp-sub { font-size: 16px; color: #6b7280; line-height: 1.7; margin: 0 0 28px; }
.seo-page .sp-sub-center { text-align: center; max-width: 720px; margin-left: auto; margin-right: auto; }

/* buttons */
.seo-page .sp-btn-row { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 26px; }
.seo-page .sp-btn-row:empty { margin-top: 0; }
.seo-page .sp-btn-row-center { justify-content: center; }
.seo-page .sp-btn {
  background: #ff9422; color: #fff; border: 1px solid #ff9422; border-radius: 30px;
  padding: 11px 34px; font-size: 16px; font-weight: 600; text-decoration: none;
  display: inline-block; transition: all .25s ease;
}
.seo-page .sp-btn:hover { background: #ffc107; border-color: #ffc107; color: #fff; transform: translateY(-2px); }
.seo-page .sp-btn-ghost { background: transparent; color: #4441e5; border-color: #4441e5; }
.seo-page .sp-btn-ghost:hover { background: #4441e5; border-color: #4441e5; color: #fff; }
.seo-page .sp-bg-purple .sp-btn-ghost,
.seo-page .sp-bg-dark .sp-btn-ghost,
.seo-page .sp-bg-orange .sp-btn-ghost { color: #fff; border-color: rgba(255,255,255,.7); }
.seo-page .sp-bg-purple .sp-btn-ghost:hover,
.seo-page .sp-bg-dark .sp-btn-ghost:hover,
.seo-page .sp-bg-orange .sp-btn-ghost:hover { background: #fff; color: #1b1b46; border-color: #fff; }

/* hero */
.seo-page .sp-hero { padding: 72px 0; }
.seo-page .sp-hero-inner { display: flex; align-items: center; gap: 48px; }
.seo-page .sp-hero-text { flex: 1 1 0; min-width: 0; }
.seo-page .sp-hero-media { flex: 0 1 44%; }
.seo-page .sp-hero-media img { width: 100%; height: auto; border-radius: 20px; display: block; }
.seo-page .sp-hero-title {
  font-family: 'Poppins', Arial, sans-serif;
  font-size: 46px; font-weight: 700; line-height: 1.2; margin: 0 0 18px;
}
.seo-page .sp-hero-sub { font-size: 18px; line-height: 1.7; color: #6b7280; margin: 0; }
.seo-page .sp-bg-purple .sp-hero-sub,
.seo-page .sp-bg-dark .sp-hero-sub,
.seo-page .sp-bg-orange .sp-hero-sub { color: rgba(255,255,255,.88); }
.seo-page .sp-center .sp-hero-inner { flex-direction: column; }
.seo-page .sp-center .sp-btn-row { justify-content: center; }

/* rich text */
.seo-page .sp-rich { font-size: 16px; line-height: 1.8; color: #4b5563; }
.seo-page .sp-bg-purple .sp-rich,
.seo-page .sp-bg-dark .sp-rich,
.seo-page .sp-bg-orange .sp-rich { color: rgba(255,255,255,.9); }
.seo-page .sp-rich h2 { font-size: 28px; font-weight: 600; margin: 32px 0 14px; color: #1b1b46; }
.seo-page .sp-rich h3 { font-size: 22px; font-weight: 600; margin: 26px 0 12px; color: #1b1b46; }
.seo-page .sp-rich h4 { font-size: 18px; font-weight: 600; margin: 22px 0 10px; color: #1b1b46; }
.seo-page .sp-rich p { margin: 0 0 16px; }
.seo-page .sp-rich ul, .seo-page .sp-rich ol { margin: 0 0 18px; padding-left: 22px; }
.seo-page .sp-rich li { margin-bottom: 9px; }
.seo-page .sp-rich a { color: #4441e5; text-decoration: underline; }
.seo-page .sp-rich img { max-width: 100%; height: auto; border-radius: 14px; }
.seo-page .sp-rich blockquote {
  margin: 20px 0; padding: 14px 22px; border-left: 4px solid #4441e5;
  background: #f6f7fb; border-radius: 0 12px 12px 0;
}

/* feature cards */
.seo-page .sp-features {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 58px;
}
.seo-page .sp-feature-card {
  background: #fff; border-radius: 20px; padding: 52px 24px 26px;
  box-shadow: 0 10px 60px #262c7514; position: relative; text-align: center;
}
.seo-page .sp-feature-icon {
  position: absolute; top: -34px; left: 50%; transform: translateX(-50%);
  width: 68px; height: 68px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 10px 40px #363c880f; color: #fff; font-size: 22px; font-weight: 700;
}
.seo-page .sp-feature-icon img { width: 32px; height: 32px; object-fit: contain; }
.seo-page .sp-tint-1 { background: #5b72ee; }
.seo-page .sp-tint-2 { background: #00cbb8; }
.seo-page .sp-tint-3 { background: #28b9e6; }
.seo-page .sp-feature-card h3 { font-size: 18px; font-weight: 600; margin: 0 0 10px; color: #1b1b46; }
.seo-page .sp-feature-card p { font-size: 14.5px; line-height: 1.7; color: #6b7280; margin: 0; }

/* stats */
.seo-page .sp-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.seo-page .sp-stat {
  display: flex; align-items: center; gap: 16px;
  background: #fff; border-radius: 16px; padding: 20px;
  box-shadow: 0 10px 60px #262c7514;
}
.seo-page .sp-stat-icon { width: 46px; height: 46px; flex: 0 0 46px; }
.seo-page .sp-stat-icon img { width: 100%; height: 100%; object-fit: contain; }
.seo-page .sp-stat h3 { font-size: 26px; font-weight: 700; margin: 0; color: #4441e5; }
.seo-page .sp-stat p { font-size: 14px; color: #6b7280; margin: 2px 0 0; }

/* steps */
.seo-page .sp-steps { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; }
.seo-page .sp-step {
  display: flex; gap: 18px; background: #fff; border-radius: 16px; padding: 22px;
  box-shadow: 0 10px 60px #262c7514;
}
.seo-page .sp-step-no {
  flex: 0 0 48px; width: 48px; height: 48px; border-radius: 50%;
  background: #4441e5; color: #fff; font-weight: 700; font-size: 17px;
  display: flex; align-items: center; justify-content: center;
}
.seo-page .sp-step-body h3 { font-size: 18px; font-weight: 600; margin: 0 0 7px; color: #1b1b46; }
.seo-page .sp-step-body p { font-size: 14.5px; line-height: 1.7; color: #6b7280; margin: 0; }

/* cta band */
.seo-page .sp-cta-box {
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 26px;
  background: linear-gradient(135deg, #4441e5 0%, #624ce5 100%);
  color: #fff; border-radius: 24px; padding: 40px 46px;
}
.seo-page .sp-bg-purple .sp-cta-box,
.seo-page .sp-bg-dark .sp-cta-box {
  background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18);
}
.seo-page .sp-cta-title { font-size: 30px; font-weight: 700; margin: 0; line-height: 1.3; }
.seo-page .sp-cta-title .highlight { color: #ffc107; }
.seo-page .sp-cta-sub { font-size: 16px; margin: 10px 0 0; color: rgba(255,255,255,.88); }
.seo-page .sp-cta-box .sp-btn-row { margin-top: 0; }
.seo-page .sp-cta-box .sp-btn-ghost { color: #fff; border-color: rgba(255,255,255,.7); }
.seo-page .sp-cta-box .sp-btn-ghost:hover { background: #fff; color: #1b1b46; border-color: #fff; }

/* faq */
.seo-page .sp-faq { max-width: 880px; margin: 0 auto; }
.seo-page .sp-faq-item {
  background: #fff; border: 1px solid #ecedf5; border-radius: 14px;
  margin-bottom: 12px; overflow: hidden;
}
.seo-page .sp-faq-item.is-open { border-color: #4441e5; box-shadow: 0 10px 40px #262c750f; }
.seo-page .sp-faq-q {
  width: 100%; display: flex; align-items: center; justify-content: space-between;
  gap: 16px; background: none; border: 0; text-align: left; cursor: pointer;
  padding: 18px 22px; font-size: 16.5px; font-weight: 600; color: #1b1b46;
}
.seo-page .sp-faq-item.is-open .sp-faq-q { color: #4441e5; }
.seo-page .sp-faq-a { padding: 0 22px 20px; font-size: 15px; line-height: 1.8; color: #6b7280; }
.seo-page .sp-faq-a p { margin: 0 0 12px; }
.seo-page .sp-faq-a a { color: #4441e5; }

/* image + video */
.seo-page .sp-figure { margin: 0; }
.seo-page .sp-figure img { width: 100%; height: auto; border-radius: 20px; display: block; }
.seo-page .sp-figure figcaption,
.seo-page .sp-caption { font-size: 14px; color: #6b7280; text-align: center; margin-top: 12px; }
.seo-page .sp-video {
  position: relative; width: 100%; padding-top: 56.25%;
  border-radius: 20px; overflow: hidden; background: #000;
}
.seo-page .sp-video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

/* table */
.seo-page .sp-table { overflow-x: auto; border-radius: 16px; box-shadow: 0 10px 60px #262c7514; background: #fff; }
.seo-page .sp-table table { width: 100%; border-collapse: collapse; min-width: 520px; }
.seo-page .sp-table th {
  background: #4441e5; color: #fff; font-weight: 600; font-size: 15px;
  padding: 14px 18px; text-align: left;
}
.seo-page .sp-table td { padding: 13px 18px; font-size: 15px; border-top: 1px solid #ecedf5; color: #4b5563; }
.seo-page .sp-table tbody tr:nth-child(even) { background: #fafbff; }

/* content cards */
.seo-page .sp-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.seo-page .sp-card {
  background: #fff; border-radius: 20px; padding: 24px; text-decoration: none;
  box-shadow: 0 10px 60px #262c7514; color: inherit; display: block;
  transition: transform .25s ease, box-shadow .25s ease;
}
a.seo-page .sp-card:hover, .seo-page a.sp-card:hover { transform: translateY(-4px); box-shadow: 0 16px 50px #262c7522; }
.seo-page .sp-card-img { width: 100%; height: 170px; object-fit: cover; border-radius: 14px; margin-bottom: 16px; }
.seo-page .sp-card h3 { font-size: 18px; font-weight: 600; margin: 0 0 9px; color: #1b1b46; }
.seo-page .sp-card p { font-size: 14.5px; line-height: 1.7; color: #6b7280; margin: 0; }

/* quote */
.seo-page .sp-quote {
  max-width: 820px; margin: 0 auto; padding: 30px 34px;
  background: #f6f7fb; border-left: 5px solid #4441e5; border-radius: 0 20px 20px 0;
}
.seo-page .sp-quote p { font-size: 20px; line-height: 1.7; font-style: italic; color: #1b1b46; margin: 0; }
.seo-page .sp-quote cite { display: block; margin-top: 14px; font-size: 14px; font-style: normal; color: #6b7280; }

/* tablet */
@media (max-width: 991px) {
  .seo-page .sp-block { padding: 44px 0; }
  .seo-page .sp-hero-inner { flex-direction: column; gap: 32px; }
  .seo-page .sp-hero-title { font-size: 34px; }
  .seo-page .sp-title { font-size: 28px; }
  .seo-page .sp-features,
  .seo-page .sp-cards { grid-template-columns: repeat(2, 1fr); }
  .seo-page .sp-stats { grid-template-columns: repeat(2, 1fr); }
}

/* phone */
@media (max-width: 575px) {
  .seo-page .sp-block { padding: 34px 0; }
  .seo-page .sp-hero-title { font-size: 27px; }
  .seo-page .sp-hero-sub { font-size: 16px; }
  .seo-page .sp-title { font-size: 23px; }
  .seo-page .sp-features,
  .seo-page .sp-cards,
  .seo-page .sp-steps,
  .seo-page .sp-stats { grid-template-columns: 1fr; }
  .seo-page .sp-cta-box { padding: 28px 22px; }
  .seo-page .sp-cta-title { font-size: 23px; }
  .seo-page .sp-btn { padding: 10px 26px; font-size: 15px; }
  .seo-page .sp-quote { padding: 22px; }
  .seo-page .sp-quote p { font-size: 17px; }
}
`;
