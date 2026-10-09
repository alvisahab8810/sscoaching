"use client";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";
import Link from "next/link";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import { useState } from "react";
import mergeContent from "@/lib/mergeContent";
import DEFAULT_PAGE from "../../scripts/seed-data/nios-results.json";

/**
 * This page keeps its layout, inline styles and the FAQ accordion in code --
 * only the text, lists, tables and link labels come from the DB
 * (PageContent.content) so an admin can edit them from the dashboard.
 *
 * The defaults live in scripts/seed-data/nios-results.json, which is also the
 * seed for the DB. If the DB is unreachable or the page record is deleted, the
 * page still renders exactly the content below.
 */

const BLUE = "#3949ab";
const DARK_BLUE = "#1a237e";
const RED = "#c62828";
const DARK_RED = "#b71c1c";

export default function NIOSResult2026({ content, metaTitle, metaDescription, metaKeywords }) {
  const [openFaq, setOpenFaq] = useState(null);

  const c = content;
  const faqItems = c.faq.items || [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.sscoaching.in/" },
      { "@type": "ListItem", "position": 2, "name": "NIOS Result 2026", "item": "https://www.sscoaching.in/nios-results" },
    ],
  };

  return (
    <div className="nios-results-main-page">
      {/*
        Rich-text fields come from the DB as HTML so admins can keep inline
        links and bold text. The link colours that used to be inline styles are
        defined here instead, scoped to this page.
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .nios-results-main-page .nrp-rt-hero a { color:#90caf9; font-weight:700; }
            .nios-results-main-page .nrp-rt-blue a { color:#3949ab; font-weight:700; }
            .nios-results-main-page .nrp-rt-blue-plain a { color:#3949ab; }
          `,
        }}
      />

      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://sscoaching.in/nios-results/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <section className="home-page-area">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        {/* ══════════════════════════════════════════
            SECTION 1 — HERO
        ══════════════════════════════════════════ */}
        <div style={{ background: "linear-gradient(135deg,#1a237e 0%,#283593 55%,#3949ab 100%)", padding: "56px 0 52px", color: "#fff" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
              <span style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: "20px", padding: "6px 18px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.6px", display: "inline-block", marginBottom: "20px", textTransform: "uppercase" }}>
                {c.hero.badge}
              </span>
              <h1 style={{ fontSize: "clamp(26px,5vw,44px)", fontWeight: 800, lineHeight: 1.2, marginBottom: "14px" }}>
                {c.hero.heading}
              </h1>
              <p style={{ fontSize: "clamp(13px,2vw,16px)", opacity: 0.88, marginBottom: "18px", lineHeight: 1.7 }}>
                {c.hero.subheading}
              </p>
              <p
                className="nrp-rt-hero"
                style={{ fontSize: "15px", opacity: 0.82, lineHeight: 1.85, marginBottom: "30px", maxWidth: "700px", margin: "0 auto 30px" }}
                dangerouslySetInnerHTML={{ __html: c.hero.introHtml }}
              />
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href={c.hero.primaryButtonLink} target="_blank" rel="noopener noreferrer" style={{ background: "#ef5350", color: "#fff", padding: "13px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>
                  {c.hero.primaryButtonLabel}
                </a>
                <Link href={c.hero.secondaryButtonLink} style={{ background: "rgba(255,255,255,0.13)", border: "2px solid rgba(255,255,255,0.45)", color: "#fff", padding: "13px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>
                  {c.hero.secondaryButtonLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 2 — RESULT GATEWAY
        ══════════════════════════════════════════ */}
        <div style={{ background: "#f4f5ff", padding: "64px 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "38px" }}>
              <span style={{ background: "#e8eaf6", color: BLUE, borderRadius: "20px", padding: "5px 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                {c.gateway.badge}
              </span>
              <h2 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 800, marginTop: "14px", color: DARK_BLUE }}>
                {c.gateway.heading}
              </h2>
              <p style={{ color: "#555", maxWidth: "580px", margin: "0 auto", fontSize: "15px", lineHeight: 1.7 }}>
                {c.gateway.intro}
              </p>
            </div>

            <div className="row g-4 mb-4">
              {/* CLASS 10 */}
              <div className="col-md-6">
                <div style={{ background: "#fff", borderRadius: "16px", border: `2px solid ${BLUE}`, padding: "32px", height: "100%", boxShadow: "0 6px 24px rgba(57,73,171,0.09)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
                    <div style={{ background: "#e8eaf6", borderRadius: "12px", padding: "12px 14px", fontSize: "30px", lineHeight: 1 }}>{c.gateway.class10Card.icon}</div>
                    <div>
                      <div style={{ color: BLUE, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>{c.gateway.class10Card.label}</div>
                      <div style={{ fontSize: "18px", fontWeight: 800, color: DARK_BLUE }}>{c.gateway.class10Card.heading}</div>
                    </div>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px" }}>
                    {(c.gateway.class10Card.points || []).map((t, i) => (
                      <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", fontSize: "14px", color: "#444" }}>
                        <span style={{ color: "#43a047", fontWeight: 700, flexShrink: 0 }}>✅</span>{t}
                      </li>
                    ))}
                  </ul>
                  <Link href={c.gateway.class10Card.buttonLink} style={{ display: "block", background: BLUE, color: "#fff", padding: "13px 18px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", textAlign: "center", fontSize: "15px" }}>
                    {c.gateway.class10Card.buttonLabel}
                  </Link>
                </div>
              </div>

              {/* CLASS 12 */}
              <div className="col-md-6">
                <div style={{ background: "#fff", borderRadius: "16px", border: `2px solid ${RED}`, padding: "32px", height: "100%", boxShadow: "0 6px 24px rgba(198,40,40,0.09)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
                    <div style={{ background: "#ffebee", borderRadius: "12px", padding: "12px 14px", fontSize: "30px", lineHeight: 1 }}>{c.gateway.class12Card.icon}</div>
                    <div>
                      <div style={{ color: RED, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>{c.gateway.class12Card.label}</div>
                      <div style={{ fontSize: "18px", fontWeight: 800, color: DARK_RED }}>{c.gateway.class12Card.heading}</div>
                    </div>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px" }}>
                    {(c.gateway.class12Card.points || []).map((t, i) => (
                      <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", fontSize: "14px", color: "#444" }}>
                        <span style={{ color: "#43a047", fontWeight: 700, flexShrink: 0 }}>✅</span>{t}
                      </li>
                    ))}
                  </ul>
                  <Link href={c.gateway.class12Card.buttonLink} style={{ display: "block", background: RED, color: "#fff", padding: "13px 18px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", textAlign: "center", fontSize: "15px" }}>
                    {c.gateway.class12Card.buttonLabel}
                  </Link>
                </div>
              </div>
            </div>

            {/* QUICK LINK BOX */}
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #dde0f0", padding: "24px 28px", textAlign: "center" }}>
              <p
                className="nrp-rt-blue"
                style={{ marginBottom: "8px", fontWeight: 700, color: "#333", fontSize: "15px" }}
                dangerouslySetInnerHTML={{ __html: c.gateway.portalBox.line1Html }}
              />
              <p
                className="nrp-rt-blue-plain"
                style={{ color: "#666", fontSize: "14px", marginBottom: "16px", lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{ __html: c.gateway.portalBox.line2Html }}
              />
              <Link href={c.gateway.portalBox.buttonLink} style={{ background: "#e8eaf6", color: BLUE, padding: "10px 24px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                {c.gateway.portalBox.buttonLabel}
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 3 — HOW TO CHECK
        ══════════════════════════════════════════ */}
        <div style={{ background: "#fff", padding: "64px 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "42px" }}>
              <span style={{ background: "#e8f5e9", color: "#2e7d32", borderRadius: "20px", padding: "5px 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                {c.howToCheck.badge}
              </span>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, marginTop: "14px", color: DARK_BLUE }}>
                {c.howToCheck.heading}
              </h2>
              <p style={{ color: "#555", maxWidth: "580px", margin: "0 auto", fontSize: "15px", lineHeight: 1.7 }}>
                {c.howToCheck.intro}
              </p>
            </div>

            <div className="row g-3 mb-4">
              {(c.howToCheck.steps || []).map((text, i) => (
                <div key={i} className="col-md-6 col-lg-3">
                  <div style={{ background: "#f4f5ff", borderRadius: "12px", padding: "18px 16px", height: "100%", borderLeft: `4px solid ${BLUE}` }}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div style={{ background: BLUE, color: "#fff", borderRadius: "50%", minWidth: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "13px", flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <p style={{ margin: 0, fontSize: "13px", color: "#444", lineHeight: 1.65 }}>{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SMS METHOD */}
            <div style={{ background: "#fff3e0", borderRadius: "12px", padding: "20px 24px", marginBottom: "16px", border: "1px solid #ffe0b2" }}>
              <p style={{ fontWeight: 700, color: "#e65100", marginBottom: "10px", fontSize: "14px" }}>{c.howToCheck.smsBox.heading}</p>
              <p style={{ color: "#555", marginBottom: "6px", fontSize: "14px" }} dangerouslySetInnerHTML={{ __html: c.howToCheck.smsBox.class10Html }} />
              <p style={{ color: "#555", marginBottom: 0, fontSize: "14px" }} dangerouslySetInnerHTML={{ __html: c.howToCheck.smsBox.class12Html }} />
            </div>

            <div style={{ background: "#fff8e1", borderRadius: "10px", padding: "14px 20px", border: "1px solid #ffe082", marginBottom: "28px" }}>
              <p
                style={{ margin: 0, fontSize: "14px", color: "#5d4037", lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{ __html: c.howToCheck.portalTipHtml }}
              />
            </div>

            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href={c.howToCheck.class10ButtonLink} style={{ background: BLUE, color: "#fff", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                {c.howToCheck.class10ButtonLabel}
              </Link>
              <Link href={c.howToCheck.class12ButtonLink} style={{ background: RED, color: "#fff", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                {c.howToCheck.class12ButtonLabel}
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 4 — OVERVIEW
        ══════════════════════════════════════════ */}
        <div style={{ background: "#f4f5ff", padding: "64px 0" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <span style={{ background: "#e8eaf6", color: BLUE, borderRadius: "20px", padding: "5px 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                {c.overview.badge}
              </span>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, marginTop: "14px", marginBottom: "20px", color: DARK_BLUE }}>
                {c.overview.heading}
              </h2>
              {(c.overview.paragraphs || []).map((text, i, arr) => (
                <p key={i} style={{ color: "#555", lineHeight: 1.9, fontSize: "15px", marginBottom: i === arr.length - 1 ? "30px" : "18px" }}>
                  {text}
                </p>
              ))}
              <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e0e3f5", padding: "26px" }}>
                <div className="row g-3">
                  {(c.overview.highlights || []).map((t, i) => (
                    <div key={i} className="col-md-6">
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <span style={{ color: BLUE, fontWeight: 800, fontSize: "15px", flexShrink: 0 }}>✔</span>
                        <span style={{ color: "#444", fontSize: "14px" }}>{t}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 5 — CLASS 10
        ══════════════════════════════════════════ */}
        <div style={{ background: "#fff", padding: "64px 0" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <span style={{ background: "#e8eaf6", color: BLUE, borderRadius: "20px", padding: "5px 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                {c.class10.badge}
              </span>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, marginTop: "14px", marginBottom: "20px", color: DARK_BLUE }}>
                {c.class10.heading}
              </h2>
              {(c.class10.paragraphs || []).map((text, i, arr) => (
                <p key={i} style={{ color: "#555", lineHeight: 1.9, fontSize: "15px", marginBottom: i === arr.length - 1 ? "28px" : "18px" }}>
                  {text}
                </p>
              ))}

              <div style={{ background: "#f4f5ff", borderRadius: "12px", padding: "24px", marginBottom: "22px", borderLeft: `4px solid ${BLUE}` }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: DARK_BLUE, marginBottom: "12px" }}>{c.class10.passingCriteria.heading}</h3>
                <p style={{ color: "#555", lineHeight: 1.85, fontSize: "15px", marginBottom: 0 }}>
                  {c.class10.passingCriteria.text}
                </p>
              </div>

              <div style={{ background: "#f4f5ff", borderRadius: "12px", padding: "24px", marginBottom: "22px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: DARK_BLUE, marginBottom: "16px" }}>{c.class10.afterResult.heading}</h3>
                <ul style={{ paddingLeft: "20px", color: "#555", lineHeight: 2.1, fontSize: "15px", marginBottom: 0 }}>
                  {(c.class10.afterResult.points || []).map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>

              {/* Marksheet download steps */}
              <div style={{ background: "#e8eaf6", borderRadius: "12px", padding: "22px 24px", marginBottom: "28px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: DARK_BLUE, marginBottom: "12px" }}>{c.class10.marksheetBox.heading}</h3>
                <ol className="nrp-rt-blue-plain" style={{ paddingLeft: "20px", color: "#555", lineHeight: 2, fontSize: "14px", marginBottom: "10px" }}>
                  {(c.class10.marksheetBox.stepsHtml || []).map((html, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: html }} />
                  ))}
                </ol>
                <p style={{ color: "#666", fontSize: "13px", marginBottom: 0 }}>{c.class10.marksheetBox.note}</p>
              </div>

              <Link href={c.class10.buttonLink} style={{ display: "inline-block", background: BLUE, color: "#fff", padding: "13px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>
                {c.class10.buttonLabel}
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 6 — CLASS 12
        ══════════════════════════════════════════ */}
        <div style={{ background: "#fff9f9", padding: "64px 0" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <span style={{ background: "#ffebee", color: RED, borderRadius: "20px", padding: "5px 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                {c.class12.badge}
              </span>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, marginTop: "14px", marginBottom: "20px", color: DARK_RED }}>
                {c.class12.heading}
              </h2>
              {(c.class12.paragraphs || []).map((text, i, arr) => (
                <p key={i} style={{ color: "#555", lineHeight: 1.9, fontSize: "15px", marginBottom: i === arr.length - 1 ? "28px" : "18px" }}>
                  {text}
                </p>
              ))}

              {/* Why This Result Matters */}
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ffcdd2", padding: "22px 24px", marginBottom: "22px" }}>
                <p style={{ fontWeight: 700, color: RED, marginBottom: "14px", fontSize: "15px" }}>{c.class12.whyItMatters.heading}</p>
                <div className="row g-2">
                  {(c.class12.whyItMatters.points || []).map((t, i) => (
                    <div key={i} className="col-md-6">
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <span style={{ color: "#43a047", fontWeight: 800, flexShrink: 0 }}>✓</span>
                        <span style={{ color: "#444", fontSize: "14px" }}>{t}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#fff9f9", borderRadius: "12px", padding: "24px", marginBottom: "22px", borderLeft: `4px solid ${RED}` }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: DARK_RED, marginBottom: "12px" }}>{c.class12.passingCriteria.heading}</h3>
                <p style={{ color: "#555", lineHeight: 1.85, fontSize: "15px", marginBottom: 0 }}>
                  {c.class12.passingCriteria.text}
                </p>
              </div>

              <div style={{ background: "#fff9f9", borderRadius: "12px", padding: "24px", marginBottom: "28px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: DARK_RED, marginBottom: "16px" }}>{c.class12.afterResult.heading}</h3>
                <ul style={{ paddingLeft: "20px", color: "#555", lineHeight: 2.1, fontSize: "15px", marginBottom: 0 }}>
                  {(c.class12.afterResult.points || []).map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>

              <Link href={c.class12.buttonLink} style={{ display: "inline-block", background: RED, color: "#fff", padding: "13px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>
                {c.class12.buttonLabel}
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            RESULT DETAILS & ABBREVIATIONS
        ══════════════════════════════════════════ */}
        <div style={{ background: "#fff", padding: "60px 0" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 800, color: DARK_BLUE, marginBottom: "22px" }}>
                {c.resultDetails.heading}
              </h2>
              <div className="row g-2 mb-4">
                {(c.resultDetails.items || []).map((t, i) => (
                  <div key={i} className="col-6 col-md-4">
                    <div style={{ background: "#f4f5ff", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#444", borderLeft: `3px solid ${BLUE}` }}>{t}</div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 700, color: DARK_BLUE, marginBottom: "16px" }}>{c.resultDetails.abbreviations.heading}</h3>
              <div className="table-wrapper mb-4">
                <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: "10px", overflow: "hidden" }}>
                  <thead>
                    <tr style={{ background: BLUE, color: "#fff" }}>
                      {(c.resultDetails.abbreviations.columns || []).map((label, i) => (
                        <th key={i} style={{ padding: "12px 18px", textAlign: "left", fontSize: "14px" }}>{label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(c.resultDetails.abbreviations.rows || []).map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#f4f5ff" : "#fff" }}>
                        <td style={{ padding: "10px 18px", fontWeight: 700, color: BLUE, borderBottom: "1px solid #e8eaf6", fontSize: "14px" }}>{row[0]}</td>
                        <td style={{ padding: "10px 18px", color: "#555", borderBottom: "1px solid #e8eaf6", fontSize: "14px" }}>{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 700, color: DARK_BLUE, marginBottom: "14px" }}>{c.resultDetails.passingMarks.heading}</h3>
              <div style={{ background: "#f4f5ff", borderRadius: "12px", padding: "20px 24px", marginBottom: "32px" }}>
                {(c.resultDetails.passingMarks.items || []).map((t, i, arr) => (
                  <div key={i} style={{ display: "flex", gap: "12px", padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid #dde0f0" : "none", fontSize: "15px", color: "#444" }}>
                    <span style={{ color: BLUE, fontWeight: 700, flexShrink: 0 }}>→</span>{t}
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 700, color: DARK_BLUE, marginBottom: "14px" }}>{c.resultDetails.previousResults.heading}</h3>
              <div style={{ background: "#f4f5ff", borderRadius: "12px", padding: "20px 24px" }}>
                {(c.resultDetails.previousResults.items || []).map((t, i, arr) => (
                  <div key={i} style={{ display: "flex", gap: "12px", padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid #dde0f0" : "none", fontSize: "14px", color: "#555" }}>
                    <span style={{ flexShrink: 0 }}>📅</span>{t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 7 — IMPROVEMENT EXAM
        ══════════════════════════════════════════ */}
        <div style={{ background: "#f4f5ff", padding: "64px 0" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <span style={{ background: "#e8f5e9", color: "#2e7d32", borderRadius: "20px", padding: "5px 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                {c.improvement.badge}
              </span>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, marginTop: "14px", marginBottom: "20px", color: DARK_BLUE }}>
                {c.improvement.heading}
              </h2>
              {(c.improvement.paragraphs || []).map((text, i, arr) => (
                <p key={i} style={{ color: "#555", lineHeight: 1.9, fontSize: "15px", marginBottom: i === arr.length - 1 ? "28px" : "18px" }}>
                  {text}
                </p>
              ))}

              <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: DARK_BLUE, marginBottom: "16px" }}>{c.improvement.whoShouldApply.heading}</h3>
                <ul style={{ paddingLeft: "20px", color: "#555", lineHeight: 2.1, fontSize: "15px", marginBottom: 0 }}>
                  {(c.improvement.whoShouldApply.points || []).map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>

              <h3 style={{ fontSize: "18px", fontWeight: 700, color: DARK_BLUE, marginBottom: "14px" }}>{c.improvement.comparison.heading}</h3>
              <div className="table-wrapper mb-4">
                <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: "10px", overflow: "hidden" }}>
                  <thead>
                    <tr style={{ background: BLUE, color: "#fff" }}>
                      {(c.improvement.comparison.columns || []).map((label, i) => (
                        <th key={i} style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px" }}>{label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(c.improvement.comparison.rows || []).map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#f4f5ff" : "#fff" }}>
                        <td style={{ padding: "10px 16px", fontWeight: 600, color: BLUE, borderBottom: "1px solid #e8eaf6", fontSize: "13px" }}>{row[0]}</td>
                        <td style={{ padding: "10px 16px", color: "#555", borderBottom: "1px solid #e8eaf6", fontSize: "13px" }}>{row[1]}</td>
                        <td style={{ padding: "10px 16px", color: "#555", borderBottom: "1px solid #e8eaf6", fontSize: "13px" }}>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <Link href={c.improvement.class10ButtonLink} style={{ background: BLUE, color: "#fff", padding: "12px 24px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                  {c.improvement.class10ButtonLabel}
                </Link>
                <Link href={c.improvement.class12ButtonLink} style={{ background: RED, color: "#fff", padding: "12px 24px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                  {c.improvement.class12ButtonLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 8 — FAQ
        ══════════════════════════════════════════ */}
        <div style={{ background: "#fff", padding: "64px 0" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, color: DARK_BLUE, marginBottom: "32px", textAlign: "center" }}>
                {c.faq.heading}
              </h2>
              {faqItems.map((item, i) => (
                <div key={i} style={{ borderBottom: "1px solid #e8eaf6" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: "100%", background: "none", border: "none", textAlign: "left", padding: "16px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "14px" }}
                  >
                    <span style={{ fontWeight: 700, color: DARK_BLUE, fontSize: "15px", lineHeight: 1.55 }}>
                      {i + 1}. {item.q}
                    </span>
                    <span style={{ color: BLUE, fontSize: "22px", flexShrink: 0, lineHeight: 1, marginTop: "2px" }}>
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 0 18px 28px", color: "#555", lineHeight: 1.85, fontSize: "15px" }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}

              {/* Quick FAQs */}
              <div style={{ marginTop: "28px", background: "#f4f5ff", borderRadius: "12px", padding: "26px" }}>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: DARK_BLUE, marginBottom: "18px" }}>{c.faq.quickQuestions.heading}</h3>
                {(c.faq.quickQuestions.items || []).map((item, i) => (
                  <div key={i} style={{ marginBottom: "16px" }}>
                    <p style={{ fontWeight: 700, color: DARK_BLUE, marginBottom: "4px", fontSize: "14px" }}>Q{i + 1}. {item.q}</p>
                    <p style={{ color: "#555", fontSize: "14px", margin: 0, lineHeight: 1.7 }}>{item.a}</p>
                  </div>
                ))}
                <p
                  className="nrp-rt-blue"
                  style={{ marginBottom: 0, fontSize: "14px" }}
                  dangerouslySetInnerHTML={{ __html: c.faq.quickQuestions.officialNoteHtml }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 10 — INTERNAL LINKS
        ══════════════════════════════════════════ */}
        <div style={{ background: "#f4f5ff", padding: "64px 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "34px" }}>
              <span style={{ background: "#e8eaf6", color: BLUE, borderRadius: "20px", padding: "5px 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                {c.resources.badge}
              </span>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, marginTop: "14px", color: DARK_BLUE }}>
                {c.resources.heading}
              </h2>
            </div>
            <div className="row g-3" style={{ maxWidth: "900px", margin: "0 auto" }}>
              {(c.resources.links || []).map((link, i) => (
                <div key={i} className="col-md-6">
                  <Link href={link.href} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#fff", borderRadius: "10px", padding: "14px 18px", textDecoration: "none", border: "1px solid #dde0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <span style={{ color: link.color, fontWeight: 800, fontSize: "17px", flexShrink: 0 }}>→</span>
                    <span style={{ color: "#333", fontWeight: 600, fontSize: "14px" }}>{link.label}</span>
                  </Link>
                </div>
              ))}
              <div className="col-md-6">
                <a href={c.resources.externalLinkHref} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "12px", background: "#fff", borderRadius: "10px", padding: "14px 18px", textDecoration: "none", border: "1px solid #dde0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <span style={{ color: "#f57c00", fontWeight: 800, fontSize: "17px", flexShrink: 0 }}>🔗</span>
                  <span style={{ color: "#333", fontWeight: 600, fontSize: "14px" }}>{c.resources.externalLinkLabel}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 11 — FINAL CTA
        ══════════════════════════════════════════ */}
        <div style={{ background: "linear-gradient(135deg,#1a237e 0%,#283593 55%,#3949ab 100%)", padding: "64px 0", color: "#fff" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 800, marginBottom: "16px" }}>
                {c.finalCta.heading}
              </h2>
              <p style={{ opacity: 0.88, lineHeight: 1.85, fontSize: "15px", marginBottom: "32px" }}>
                {c.finalCta.text}
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "18px" }}>
                <Link href={c.finalCta.class10ButtonLink} style={{ background: BLUE, border: "2px solid rgba(255,255,255,0.4)", color: "#fff", padding: "13px 22px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                  {c.finalCta.class10ButtonLabel}
                </Link>
                <Link href={c.finalCta.class12ButtonLink} style={{ background: RED, border: "2px solid rgba(255,255,255,0.3)", color: "#fff", padding: "13px 22px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                  {c.finalCta.class12ButtonLabel}
                </Link>
                <Link href={c.finalCta.counselingButtonLink} style={{ background: "#fff", color: DARK_BLUE, padding: "13px 22px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                  {c.finalCta.counselingButtonLabel}
                </Link>
              </div>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                {(c.finalCta.officialLinks || []).map((link, i) => (
                  <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.28)", color: "#fff", padding: "10px 20px", borderRadius: "8px", fontWeight: 600, textDecoration: "none", fontSize: "14px" }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </section>
   </div>
  );
}

export async function getStaticProps() {
  const SLUG = "nios-results";

  let page = null;
  try {
    const [{ default: dbConnect }, { default: PageContent }] = await Promise.all([
      import("@/lib/dbConnect"),
      import("@/models/PageContent"),
    ]);
    await dbConnect();
    page = await PageContent.findOne({ slug: SLUG, isPublished: true }).lean();
  } catch (err) {
    console.error("nios-results: PageContent fetch failed, using seed fallback:", err.message);
  }

  const content = mergeContent(DEFAULT_PAGE.content, page?.content);

  return {
    props: {
      content: JSON.parse(JSON.stringify(content)),
      metaTitle: page?.metaTitle || DEFAULT_PAGE.metaTitle,
      metaDescription: page?.metaDescription || DEFAULT_PAGE.metaDescription,
      metaKeywords: page?.metaKeywords || DEFAULT_PAGE.metaKeywords,
    },
    revalidate: 60,
  };
}
