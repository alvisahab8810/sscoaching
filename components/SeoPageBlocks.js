"use client";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

/**
 * Renders a SeoPage's blocks.
 *
 * The markup deliberately reuses the class names of the hand-built admission
 * page at pages/nios-admission/admission-in-nios-stream-1.js -- the hero band,
 * .nios-content, .documents-cards, .process-steps, .admission-table,
 * .faq-section and .cta-section -- so a generated page is styled by the real
 * site stylesheet in public/assets/css/style.css and comes out identical to
 * that page instead of carrying a second, parallel look.
 *
 * The stylesheet at the bottom only fills the gaps: block types the admission
 * page has no section for (video, quote), and the few rules that cannot be
 * inherited because the editor puts rich markup where the original has a bare
 * paragraph.
 */

/** The admission pages' own hero background, used when a page sets no image. */
const DEFAULT_HERO_IMAGE = "/assets/images/nios-admission/hero.png";

/** The faces on the floating card over the process photos. */
const STAT_AVATARS = [
  "/assets/images/home/steps-process/avatar.svg",
  "/assets/images/home/steps-process/avatar1.svg",
  "/assets/images/home/steps-process/avatar2.svg",
];

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

  const heading = block.heading || "";
  const highlight = block.headingHighlight || "";

  // The highlight is normally a phrase that is already part of the heading,
  // and only its colour is meant to change. Appending it instead printed the
  // phrase twice ("Our Lucknow Centre Lucknow Centre").
  const at = highlight
    ? heading.toLowerCase().indexOf(highlight.toLowerCase())
    : -1;

  if (at !== -1) {
    return (
      <Tag className={className}>
        {heading.slice(0, at)}
        <span className="highlight">
          {heading.slice(at, at + highlight.length)}
        </span>
        {heading.slice(at + highlight.length)}
      </Tag>
    );
  }

  // A highlight that is not part of the heading is a tail the editor wants
  // added, which is how a heading made only of highlighted text still works.
  return (
    <Tag className={className}>
      {heading}
      {highlight ? (
        <>
          {heading ? " " : ""}
          <span className="highlight">{highlight}</span>
        </>
      ) : null}
    </Tag>
  );
}

/**
 * An item body (feature, stat, step, card) comes from the same editor as the
 * rich text blocks, so it may hold markup. Printing it as a string put the
 * tags on the page as visible text.
 */
function ItemText({ text, className }) {
  if (!text) return null;
  return (
    <div
      className={["sp-item-text", className].filter(Boolean).join(" ")}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

/* ---------------------------------------------------------------- FAQ --- */
/* Mirrors components/NiosAdmission/Stream1Faqs.js so both render the same. */
function FaqBlock({ block }) {
  const [open, setOpen] = useState(null);
  const items = Array.isArray(block.items) ? block.items : [];

  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <div className={`faq-item${open === i ? " expanded" : ""}`} key={i}>
          <div
            className="faq-question d-flex justify-content-between align-items-center"
            role="button"
            tabIndex={0}
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(open === i ? null : i);
              }
            }}
          >
            <h3 className="faq-question-text fw-bold">{item?.title}</h3>
            <div className="faq-icon">
              {open === i ? (
                <AiOutlineClose size={26} />
              ) : (
                <AiOutlinePlus size={26} />
              )}
            </div>
          </div>

          {/* Always in the DOM so crawlers read the answers even when the
              accordion is closed -- the stylesheet hides it, nothing else. */}
          <div
            className="faq-answer"
            dangerouslySetInnerHTML={{ __html: item?.text || "" }}
          />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------- blocks --- */
function Block({ block, ctaVariant = "cta-content2" }) {
  const { type } = block;
  const items = Array.isArray(block.items) ? block.items : [];
  const bg = block.background || "white";
  const sectionClass = [
    "sp-block",
    // Prefixed. The inner grid of a features/stats/steps/cards block
    // carries `sp-<type>` as well, so sharing the name turned each of
    // those sections into a grid whose only child -- the container --
    // was then laid out in a single column of the page width.
    `sp-sec-${type}`,
    `sp-bg-${bg}`,
    block.align === "center" ? "sp-center" : "",
    block.className || "",
  ]
    .filter(Boolean)
    .join(" ");

  /* The admission pages use .contact-btn for an inline action and .cta-btn
     inside the call-to-action band, so each block passes the pair it needs. */
  const buttonRow = (primary, secondary) => (
    <>
      {block.buttonText ? (
        <a className={primary} href={block.buttonUrl || "#"}>
          {block.buttonText}
        </a>
      ) : null}
      {block.button2Text ? (
        <a className={secondary} href={block.button2Url || "#"}>
          {block.button2Text}
        </a>
      ) : null}
    </>
  );

  const buttons = buttonRow("sp-btn", "sp-btn sp-btn-ghost");

  /* ---------- hero ---------- */
  /* .hero-stream1-hero-section: the full width image band from stream 1. */
  if (type === "hero") {
    return (
      <div className={`herostream1-area ${sectionClass}`}>
        <section
          className="hero-stream1-hero-section"
          style={{ backgroundImage: `url(${block.image || DEFAULT_HERO_IMAGE})` }}
        >
          <div className="container">
            <div className="hero-stream1-hero-content">
              <div className="hero-stream1-hero-text-group">
                <Heading
                  block={block}
                  defaultLevel="h1"
                  className="hero-stream1-hero-title"
                />
                {block.subheading ? (
                  <p className="hero-stream1-hero-subtitle">{block.subheading}</p>
                ) : null}
                {block.html ? (
                  <div
                    className="hero-stream1-hero-subtitle sp-hero-rich"
                    dangerouslySetInnerHTML={{ __html: block.html }}
                  />
                ) : null}
              </div>
              <div className="sp-hero-btns">
                {buttonRow(
                  "hero-stream1-apply-btn cta-btn",
                  "hero-stream1-apply-btn cta-btn sp-hero-btn-ghost"
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ---------- rich text ---------- */
  /* .nios-content / .nios-title / .nios-text from the stream 1 body copy. */
  if (type === "richtext") {
    return (
      <section className={sectionClass}>
        <div className="container">
          <div className="nios-content">
            <Heading
              block={block}
              className={
                block.headingLevel === "h3" || block.headingLevel === "h4"
                  ? "nios-title"
                  : "why-nios-title"
              }
            />
            {block.subheading ? (
              <p className="nios-text">{block.subheading}</p>
            ) : null}
            <div
              className="nios-text sp-rich"
              dangerouslySetInnerHTML={{ __html: block.html || "" }}
            />
            <div className="sp-btn-row">{buttons}</div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- feature cards ---------- */
  /* .documents-section / .document-card, the "documents required" row. */
  if (type === "features") {
    return (
      <section className={sectionClass}>
        <div className="container">
          <div className="documents-section">
            <Heading block={block} className="documents-title" />
            {block.subheading ? (
              <p className="why-nios-text sp-sub">{block.subheading}</p>
            ) : null}

            <div className="documents-cards">
              {items.map((item, i) => (
                <div className="document-card" key={i}>
                  {item?.image ? (
                    <img
                      className="sp-card-icon"
                      src={item.image}
                      alt={item?.imageAlt || ""}
                      loading="lazy"
                    />
                  ) : null}
                  <h3 className="document-card-title">{item?.title}</h3>
                  <ItemText text={item?.text} className="document-card-text" />
                </div>
              ))}
            </div>
            <div className="sp-btn-row">{buttons}</div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- stats ---------- */
  /* Stream 1 has no stat row, so the documents card is reused for it. */
  if (type === "stats") {
    return (
      <section className={sectionClass}>
        <div className="container">
          <div className="documents-section">
            <Heading block={block} className="documents-title" />
            <div className="documents-cards">
              {items.map((item, i) => (
                <div className="document-card sp-stat-card" key={i}>
                  {item?.image ? (
                    <img
                      className="sp-card-icon"
                      src={item.image}
                      alt={item?.imageAlt || ""}
                      loading="lazy"
                    />
                  ) : null}
                  <h3 className="document-card-title sp-stat-value">
                    {item?.title}
                  </h3>
                  <ItemText text={item?.text} className="document-card-text" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- numbered steps ---------- */
  /* .process-section / .process-steps / .step-content, the admission process. */
  if (type === "steps") {
    return (
      <section className={`process-section ${sectionClass}`}>
        <div className="container">
          <div className="process-container">
            <div className="process-content">
              <Heading block={block} className="process-title" />
              {block.subheading ? (
                <p className="process-subtitle sp-sub">{block.subheading}</p>
              ) : null}

              <div className="process-steps">
                {items.map((item, i) => (
                  <div className="process-step" key={i}>
                    <div className="step-content">
                      <h3>
                        {String(i + 1).padStart(2, "0")}
                        {item?.title ? ` - ${item.title}` : ""}
                      </h3>
                      <ItemText text={item?.text} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="sp-btn-row">{buttons}</div>
            </div>

            {/* The admission page pairs the steps with a photo column; a
                generated block only grows one when it is given an image. */}
            {block.image ? (
              <div className="process-images">
                <img
                  className="process-image process-1"
                  src={block.image}
                  alt={block.imageAlt || ""}
                  loading="lazy"
                />

                {/* The floating card over the photos, shown once a number is
                    set so a block without one keeps a plain photo column. */}
                {block.statValue ? (
                  <div className="process-stat">
                    <div className="stat-avatars">
                      {STAT_AVATARS.map((src, i) => (
                        <img className="stat-avatar" src={src} alt="" key={i} />
                      ))}
                    </div>
                    <div className="stat-text">
                      <h4>{block.statValue}</h4>
                      {block.statLabel ? <p>{block.statLabel}</p> : null}
                    </div>
                  </div>
                ) : null}

                {block.image2 ? (
                  <img
                    className="process-image process-2"
                    src={block.image2}
                    alt={block.image2Alt || ""}
                    loading="lazy"
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  /* ---------- scrolling notice ---------- */
  /* .scrolling-banner, the announcement strip above the first CTA. */
  if (type === "notice") {
    const text = block.heading || block.subheading || "";

    return (
      <section className={`scrolling-banner recognition-banner ${sectionClass}`}>
        <div className="banner-content recognition-text">
          {/* The strip scrolls, so the text is repeated to fill the loop. */}
          {[0, 1, 2].map((i) => (
            <div className="banner-items" key={i}>
              {text}
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ---------- coloured link pills ---------- */
  /* .quick-links, the "important links" row from the admission page. */
  if (type === "linklist") {
    const tints = [
      "stream1",
      "branch1",
      "branch2",
      "contact",
      "stream34",
      "branch3",
      "message",
    ];

    return (
      <section className={sectionClass}>
        <div className="container">
          <div className="quick-links">
            <Heading block={block} className="quick-title" />
            <div className="expandable-list">
              {items.map((item, i) => (
                <div className="expand-item" key={i}>
                  <a href={item?.url || "#"}>
                    <div className={`expand-header ${tints[i % tints.length]}`}>
                      <div className="expand-text">{item?.title}</div>
                      <div className="expand-icon">
                        <img
                          src="/assets/icons/link-arrow.svg"
                          alt=""
                          style={{ width: "28px", height: "28px" }}
                        />
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- call to action ---------- */
  /* .cta-section with the two mint squares and the image panel from CTA2. */
  if (type === "cta") {
    return (
      <div className={sectionClass}>
        <div className="container">
          <section className="cta-section">
            <div className="cta-bg-shape cta-bg-1" />
            <div className="cta-bg-shape cta-bg-2" />
            <div className={`cta-content ${ctaVariant}`}>
              <div className="cta-text">
                <Heading block={block} className="cta-title" />
                {block.subheading ? (
                  <p className="cta-subtitle">{block.subheading}</p>
                ) : null}
                {buttonRow("cta-btn", "cta-btn sp-cta-btn-ghost")}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  /* ---------- faq ---------- */
  if (type === "faq") {
    return (
      <section className={`faq-section stream-1-faq ${sectionClass}`}>
        <div className="container">
          <div className="faq-container">
            <Heading block={block} className="faq-title" />
            {block.subheading ? (
              <p className="why-nios-text sp-sub sp-center-text">
                {block.subheading}
              </p>
            ) : null}
            <FaqBlock block={block} />
          </div>
        </div>
      </section>
    );
  }

  /* ---------- image ---------- */
  /* .info-section, the light blue band with the image beside the copy. */
  if (type === "image") {
    return (
      <section className={sectionClass}>
        <div className="container">
          <div className="info-section sp-info-section">
            <div className="info-content">
              {block.image ? (
                <img
                  className="info-image"
                  src={block.image}
                  alt={block.imageAlt || ""}
                  loading="lazy"
                />
              ) : null}
              <div className="info-text-group">
                <Heading block={block} className="process-title" />
                {block.caption ? <p className="info-text">{block.caption}</p> : null}
                {block.html ? (
                  <div
                    className="info-text sp-rich"
                    dangerouslySetInnerHTML={{ __html: block.html }}
                  />
                ) : null}
                <div className="sp-btn-row">{buttons}</div>
              </div>
            </div>
          </div>
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
          <Heading block={block} className="nios-title sp-center-text" />
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
  /* Matches .admission-table, but kept as a real table so the data stays
     readable to screen readers and to search engines. */
  if (type === "table") {
    const columns = Array.isArray(block.columns) ? block.columns : [];
    const rows = Array.isArray(block.rows) ? block.rows : [];
    const hasHeader = columns.some((c) => c?.label);

    return (
      <section className={sectionClass}>
        <div className="container">
          <div
            className={
              hasHeader ? "admission-table-section" : "last-date-section"
            }
          >
            {/* Without column labels the heading becomes the grey bar above
                the rows, the way the "last date" table is built. */}
            {hasHeader ? <Heading block={block} className="nios-title" /> : null}
            <div className="admission-table sp-table">
              {!hasHeader ? (
                <div className="last-date-header">
                  <Heading block={block} className="last-date-title" />
                </div>
              ) : null}
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
        </div>
      </section>
    );
  }

  /* ---------- content cards ---------- */
  if (type === "cards") {
    return (
      <section className={sectionClass}>
        <div className="container">
          <div className="documents-section">
            <Heading block={block} className="documents-title" />
            {block.subheading ? (
              <p className="why-nios-text sp-sub">{block.subheading}</p>
            ) : null}

            <div className="documents-cards">
              {items.map((item, i) => {
                const Wrapper = item?.url ? "a" : "div";
                return (
                  <Wrapper
                    className="document-card sp-linked-card"
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
                    <h3 className="document-card-title">{item?.title}</h3>
                    <ItemText text={item?.text} className="document-card-text" />
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- quote ---------- */
  /* .warning-notice, the highlighted note panel from stream 1. */
  if (type === "quote") {
    return (
      <section className={sectionClass}>
        <div className="container">
          <blockquote className="warning-notice sp-quote">
            <div
              className="sp-quote-text"
              dangerouslySetInnerHTML={{
                __html: block.html || block.subheading || block.heading || "",
              }}
            />
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

  const visible = blocks.filter((b) => b && b.isActive !== false);

  // The admission page alternates the two call-to-action artworks rather
  // than repeating one, so each cta block takes the next one in turn.
  let ctaSeen = 0;

  return (
    // The admission page scopes a handful of rules to its own wrapper class
    // (the notice strip, the step cards, the process photo, the quick-link
    // and faq titles), so a generated page carries the same wrapper and
    // inherits them instead of restating the values here.
    <div className="seo-page admission-in-nios-stream-1-area">
      {visible.map((b, i) => (
        <Block
          key={b._id || i}
          block={b}
          ctaVariant={
            b.type === "cta" && ctaSeen++ % 2 ? "cta-content3" : "cta-content2"
          }
        />
      ))}

      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
    </div>
  );
}

const STYLES = `
/* ===========================================================
   Gap filler for the generated SEO pages.

   The markup above already carries the admission page's own class names, so
   public/assets/css/style.css does the bulk of the styling. What is left here
   is only what that stylesheet cannot cover:

     - section rhythm between blocks, since a generated page stacks sections
       the hand-built page spaces by hand
     - the rich text the editor produces, where the original has a bare
       paragraph and the inherited rule therefore never reaches the markup
     - the admission table rebuilt on a real table element
     - block types stream 1 has no section for: video and quote
     - background variants an editor can pick per block

   Every selector is prefixed with .seo-page. styled-jsx global would leak its
   generated class onto elements such as the title tag, and a scoped block
   cannot reach markup inserted through dangerouslySetInnerHTML.
   =========================================================== */

.seo-page .sp-block { padding: 0; }

/* The admission page gives the paragraph that follows a call-to-action band
   its own top gap, so a generated page keeps the same breathing room instead
   of letting the heading sit against the band's corner shape. */
.seo-page .sp-sec-cta + .sp-sec-richtext .nios-content,
.seo-page .sp-sec-cta + .sp-sec-linklist .quick-links,
.seo-page .sp-sec-cta + .sp-sec-features .documents-section { padding-top: 50px; }

/* Sections whose own class already carries the vertical padding. */
.seo-page .sp-sec-hero,
.seo-page .sp-sec-cta,
.seo-page .sp-sec-faq { padding: 0; }

/* backgrounds */
.seo-page .sp-bg-white  { background-color: #ffffff; }
.seo-page .sp-bg-light  { background-color: #f9fafc; }
.seo-page .sp-bg-purple { background-color: #6259e8; }
.seo-page .sp-bg-dark   { background-color: #1b2128; }
.seo-page .sp-bg-orange { background-color: #fc9b1a; }
.seo-page .sp-bg-purple .nios-title,
.seo-page .sp-bg-purple .documents-title,
.seo-page .sp-bg-purple .process-title,
.seo-page .sp-bg-purple .faq-title,
.seo-page .sp-bg-purple .nios-text,
.seo-page .sp-bg-purple .why-nios-text,
.seo-page .sp-bg-dark .nios-title,
.seo-page .sp-bg-dark .documents-title,
.seo-page .sp-bg-dark .process-title,
.seo-page .sp-bg-dark .faq-title,
.seo-page .sp-bg-dark .nios-text,
.seo-page .sp-bg-dark .why-nios-text,
.seo-page .sp-bg-orange .nios-title,
.seo-page .sp-bg-orange .documents-title,
.seo-page .sp-bg-orange .process-title,
.seo-page .sp-bg-orange .faq-title,
.seo-page .sp-bg-orange .nios-text,
.seo-page .sp-bg-orange .why-nios-text { color: #ffffff; }
.seo-page .sp-bg-purple .highlight,
.seo-page .sp-bg-dark .highlight,
.seo-page .sp-bg-orange .highlight { color: #33efa0; }

.seo-page .sp-center-text { text-align: center; }
.seo-page .sp-center .documents-title,
.seo-page .sp-center .nios-title,
.seo-page .sp-center .process-title { text-align: center !important; }
.seo-page .sp-center .sp-btn-row { justify-content: center; }

/* ---------------------------------------------------------------- hero --- */
/* The band is a background image, so it needs the dark wash the original
   gets from its own background colour sitting under the picture. */
.seo-page .hero-stream1-hero-section { position: relative; }
.seo-page .hero-stream1-hero-section::before {
  content: ""; position: absolute; top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgba(0, 0, 0, .55);
}
.seo-page .hero-stream1-hero-section > .container { position: relative; z-index: 1; }
.seo-page .sp-hero-btns { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }
.seo-page .sp-hero-btn-ghost {
  background-color: transparent !important;
  border-color: #ffffff !important;
}
.seo-page .sp-hero-btn-ghost:hover { background-color: #ffffff !important; color: #0066ff !important; }
.seo-page .sp-hero-rich,
.seo-page .sp-hero-rich p { margin-bottom: 0; }

/* ------------------------------------------------------------ buttons --- */
/* .contact-btn, the inline action pill used through the admission page. */
.seo-page .sp-btn-row { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 26px; }
.seo-page .sp-btn-row:empty { display: none; margin-top: 0; }
.seo-page .sp-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 12px 30px; background-color: #704fe6; border: 1px solid #704fe6;
  border-radius: 28px; color: #ffffff; font-size: 15px; font-weight: 600;
  text-decoration: none; transition: all .3s ease;
}
.seo-page .sp-btn:hover {
  background-color: #5a3fd4; border-color: #5a3fd4;
  color: #ffffff; text-decoration: none; transform: translateY(-2px);
}
.seo-page .sp-btn-ghost { background-color: transparent; color: #704fe6; }
.seo-page .sp-btn-ghost:hover { background-color: #704fe6; color: #ffffff; }

/* --------------------------------------------------------- rich text --- */
/* .nios-text styles a paragraph; the editor hands over a block of markup,
   so the same values are repeated for what can appear inside it. */
.seo-page .sp-rich > :last-child { margin-bottom: 0; }
.seo-page .nios-text.sp-rich,
.seo-page .info-text.sp-rich { margin-bottom: 0; }
.seo-page .nios-text.sp-rich p {
  font-size: 16px; font-weight: 400; line-height: 26px;
  color: #293347; text-align: justify; margin-bottom: 16px;
}
.seo-page .info-text.sp-rich p {
  font-size: 16px; font-weight: 500; line-height: 22px;
  color: #636363; margin-bottom: 14px;
}
.seo-page .sp-rich h2 { font-size: 28px; font-weight: 600; color: #262626; margin: 30px 0 16px; }
.seo-page .sp-rich h3 { font-size: 22px; font-weight: 600; color: #262626; margin: 26px 0 12px; }
.seo-page .sp-rich h4,
.seo-page .sp-rich h5 { font-size: 18px; font-weight: 600; color: #0a0a0a; margin: 22px 0 10px; }
.seo-page .sp-rich b, .seo-page .sp-rich strong { color: #0a0a0a; font-weight: 600; }
.seo-page .sp-rich ul, .seo-page .sp-rich ol { margin: 0 0 18px; padding-left: 22px; }
.seo-page .sp-rich li { font-size: 16px; line-height: 26px; color: #293347; margin-bottom: 8px; }
.seo-page .sp-rich a { color: #007bff; }
.seo-page .sp-rich img { max-width: 100%; height: auto; border-radius: 14px; }
/* The highlighted note from the admission page. */
.seo-page .sp-rich blockquote {
  margin: 24px 0; padding: 20px 17px; text-align: center;
  background-color: rgba(252, 159, 99, .05); border: 1px solid #fc9f63;
  border-radius: 10px; color: #fc9f63; font-weight: 600;
}
.seo-page .sp-sub { margin-bottom: 0; }

/* ------------------------------------------------------------- cards --- */
/* .documents-cards is a fixed three across row on the admission page; a
   generated block can hold any number, so it wraps and shares the width. */
.seo-page .documents-cards { flex-wrap: wrap; }
.seo-page .documents-cards .document-card {
  flex: 1 1 280px; min-width: 0; justify-content: flex-start;
}
.seo-page .sp-linked-card { text-decoration: none; color: inherit; transition: all .3s ease; }
.seo-page a.sp-linked-card:hover { transform: translateY(-3px); text-decoration: none; color: inherit; }
.seo-page .sp-card-icon { width: 56px; height: 56px; object-fit: contain; }
.seo-page .sp-card-img { width: 100%; height: 180px; object-fit: cover; border-radius: 14px; }
.seo-page .document-card-text p { font-size: 16px; font-weight: 400; line-height: 25px; color: #696983; margin-bottom: 10px; }
.seo-page .document-card-text ul,
.seo-page .document-card-text ol { margin: 0 0 10px; padding-left: 20px; }
.seo-page .document-card-text li { font-size: 16px; line-height: 25px; color: #696983; margin-bottom: 6px; }
.seo-page .document-card-text > :last-child,
.seo-page .document-card-text p:last-child { margin-bottom: 0; }
.seo-page .document-card-text a { color: #4441e5; }
.seo-page .sp-stat-value { font-size: 34px; font-weight: 600; line-height: 1.2; }

/* ------------------------------------------------------------- steps --- */
/* .step-content holds a single paragraph on the admission page. */
.seo-page .step-content h3 { font-size: 17px; font-weight: 600; color: #293347; margin-bottom: 4px; }
.seo-page .step-content .sp-item-text p,
.seo-page .step-content .sp-item-text li {
  font-size: 14px; font-weight: 400; line-height: 21px; color: #293347; margin-bottom: 6px;
}
.seo-page .step-content .sp-item-text > :last-child,
.seo-page .step-content .sp-item-text p:last-child { margin-bottom: 0; }
/* Without a photo column the steps take the full width on their own. */
.seo-page .process-content { flex: 1; min-width: 0; }
.seo-page .process-subtitle { margin-bottom: 20px; }

/* ------------------------------------------------- notice, link pills --- */
.seo-page .sp-sec-notice { padding: 0; margin: 24px 0; }
.seo-page .expand-item a { text-decoration: none; display: block; }
.seo-page .expandable-list { flex-wrap: wrap; flex-direction: row; }
.seo-page .expandable-list .expand-item { flex: 1 1 calc(50% - 17px); }
@media (max-width: 767px) {
  .seo-page .expandable-list .expand-item { flex: 1 1 100%; }
}

/* ------------------------------------------------------------- table --- */
/* The same look as .admission-table, rebuilt on a real table element so the
   data stays readable to screen readers and to search engines. */
.seo-page .admission-table.sp-table { overflow-x: auto; }
.seo-page .sp-table table { width: 100%; border-collapse: collapse; min-width: 560px; margin-bottom: 0; }
.seo-page .sp-table th {
  background-color: #6259e8; padding: 15px 20px;
  font-size: 20px; font-weight: 600; line-height: 23px; color: #ffffff;
  text-align: center; border-right: 1px solid #e1e1e1;
}
.seo-page .sp-table td {
  background-color: #f9fafc; padding: 15px 17px;
  font-size: 18px; font-weight: 400; line-height: 24px; color: #1b2128;
  text-align: center; border-right: 1px solid #e1e1e1; border-top: 1px solid #e1e1e1;
}
.seo-page .sp-table th:last-child,
.seo-page .sp-table td:last-child { border-right: 0; }
.seo-page .sp-table td p { margin-bottom: 0; }
.seo-page .sp-table td a { color: #4441e5; }

/* --------------------------------------------------------------- faq --- */
.seo-page .faq-question { cursor: pointer; }
.seo-page .faq-question-text { margin-bottom: 0; }
.seo-page .faq-answer p { margin-bottom: 12px; }
.seo-page .faq-answer > :last-child,
.seo-page .faq-answer p:last-child { margin-bottom: 0; }
.seo-page .faq-answer ul,
.seo-page .faq-answer ol { margin: 0 0 12px; padding-left: 20px; }
.seo-page .faq-answer a { color: #007bff; }

/* --------------------------------------------------------------- cta --- */
.seo-page .sp-cta-btn-ghost {
  background-color: transparent !important;
  border-color: #ffffff !important; margin-left: 12px;
}
.seo-page .sp-cta-btn-ghost:hover { background-color: #ffffff !important; color: #1b2128 !important; }

/* -------------------------------------------------------------- info --- */
.seo-page .sp-info-section .info-text-group .process-title { margin-bottom: 0; }

/* ------------------------------------------------------- video, quote --- */
.seo-page .sp-video {
  position: relative; width: 100%; padding-top: 56.25%;
  border-radius: 14px; overflow: hidden; background-color: #000000;
}
.seo-page .sp-video iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }
.seo-page .sp-caption { font-size: 15px; color: #636363; text-align: center; margin: 14px 0 0; }

/* .warning-notice keeps its own colours; only the inner markup is set up. */
.seo-page .warning-notice.sp-quote { padding: 20px 24px; }
.seo-page .sp-quote-text p { margin-bottom: 8px; }
.seo-page .sp-quote-text > :last-child,
.seo-page .sp-quote-text p:last-child { margin-bottom: 0; }
.seo-page .sp-quote cite {
  display: block; margin-top: 10px;
  font-size: 15px; font-style: normal; font-weight: 400; opacity: .85;
}

/* The about row on the admission page is a white band with the picture on
   the right; the blue .info-section look is the light background variant. */
.seo-page .sp-bg-white .info-section {
  background-color: #ffffff; padding: 0; margin: 0;
}
.seo-page .sp-bg-white .info-content { flex-direction: row-reverse; }
.seo-page .sp-bg-white .info-image { border-radius: 14px; align-self: center; }
.seo-page .sp-bg-white .info-text-group { padding-left: 0; padding-right: 50px; }

/* ------------------------------------------------------------ tablet --- */
@media (max-width: 991px) {
  .seo-page .sp-block { padding: 0; }
  .seo-page .hero-stream1-hero-section { height: auto; padding: 60px 20px; }
  .seo-page .hero-stream1-hero-title { font-size: 32px; line-height: 42px; }
  .seo-page .hero-stream1-hero-subtitle { font-size: 17px; line-height: 26px; }
  .seo-page .documents-cards .document-card { flex: 1 1 100%; }
  .seo-page .info-content { flex-direction: column; }
  .seo-page .info-text-group { padding-left: 0; }
}

/* ------------------------------------------------------------- phone --- */
@media (max-width: 575px) {
  .seo-page .sp-block { padding: 0; }
  .seo-page .hero-stream1-hero-section { padding: 44px 16px; }
  .seo-page .hero-stream1-hero-title { font-size: 25px; line-height: 34px; }
  .seo-page .hero-stream1-hero-subtitle { font-size: 15px; line-height: 23px; }
  .seo-page .documents-title,
  .seo-page .nios-title { font-size: 23px; line-height: 32px; }
  .seo-page .document-card { padding: 24px 20px; }
  .seo-page .sp-btn { padding: 11px 24px; font-size: 14px; }
  .seo-page .sp-table th { font-size: 16px; padding: 12px 14px; }
  .seo-page .sp-table td { font-size: 15px; padding: 12px 14px; }
  .seo-page .warning-notice.sp-quote { padding: 20px 18px; }
  .seo-page .sp-quote-text,
  .seo-page .sp-quote-text p { font-size: 17px; line-height: 28px; }
  .seo-page .sp-cta-btn-ghost { margin-left: 0; margin-top: 10px; }
}
`;
