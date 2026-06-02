"use client";
import { useState } from "react";
import { FiX, FiArrowRight } from "react-icons/fi";

export default function ResultsAnnouncementStrip() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <>
      <div className="ras-wrap" role="alert" aria-live="polite">
        {/* Animated shimmer */}
        <span className="ras-shimmer" aria-hidden="true" />

        <div className="ras-inner">
          {/* LIVE badge */}
          <span className="ras-badge">
            <span className="ras-pulse" aria-hidden="true" />
            LIVE
          </span>

          {/* Desktop text */}
          <p className="ras-text">
            <span className="ras-star" aria-hidden="true">★</span>
            &nbsp;NIOS&nbsp;<strong>Senior Secondary (Class 12th) Results</strong>&nbsp;Coming Soon
            &nbsp;— Keep your Enrolment Number ready!&nbsp;
            <span className="ras-star" aria-hidden="true">★</span>
          </p>

          {/* Mobile marquee */}
          <div className="ras-marquee-wrap" aria-hidden="true">
            <span className="ras-marquee">
              ★&nbsp; NIOS Senior Secondary (Class&nbsp;12th) Results Coming Soon — Keep your Enrolment Number ready! &nbsp;&nbsp;&nbsp;★&nbsp; NIOS Senior Secondary (Class&nbsp;12th) Results Coming Soon — Keep your Enrolment Number ready! &nbsp;&nbsp;&nbsp;
            </span>
          </div>

          {/* CTA */}
          <a
            href="https://results.nios.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="ras-cta"
          >
            Check Results <FiArrowRight size={12} />
          </a>
        </div>

        {/* Dismiss */}
        <button
          className="ras-close"
          onClick={() => setVisible(false)}
          aria-label="Dismiss"
        >
          <FiX size={14} />
        </button>
      </div>

      <style jsx>{`
        /* ── Outer wrapper ── */
        .ras-wrap {
          position: relative;
          margin-bottom:20px;
          width: 100%;
          background: linear-gradient(90deg, #0d1b4b 0%, #1a3a8a 45%, #4441e5 100%);
          overflow: hidden;
        }

        /* ── Shimmer sweep ── */
        .ras-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 25%,
            rgba(255,255,255,0.09) 50%,
            transparent 75%
          );
          background-size: 250% 100%;
          animation: ras-sweep 3.5s linear infinite;
          pointer-events: none;
        }
        @keyframes ras-sweep {
          0%   { background-position: -250% 0; }
          100% { background-position: 250% 0; }
        }

        /* ── Inner row ── */
        .ras-inner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 10px 50px 10px 18px;
          min-height: 44px;
        }

        /* ── LIVE Badge ── */
        .ras-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 999px;
          padding: 3px 10px 3px 8px;
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #fff;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .ras-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #fbbf24;
          animation: ras-pulse 1.8s ease-out infinite;
          flex-shrink: 0;
        }
        @keyframes ras-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(251,191,36,0.75); }
          70%  { box-shadow: 0 0 0 8px rgba(251,191,36,0); }
          100% { box-shadow: 0 0 0 0   rgba(251,191,36,0); }
        }

        /* ── Star ── */
        .ras-star {
          color: #fbbf24;
          font-size: 0.72rem;
          vertical-align: middle;
        }

        /* ── Desktop text ── */
        .ras-text {
          margin: 0;
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(255,255,255,0.95);
          line-height: 1.3;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 700px;
        }
        .ras-text strong {
          font-weight: 800;
          color: #fff;
        }

        /* ── Mobile marquee ── */
        .ras-marquee-wrap {
          display: none;
          overflow: hidden;
          flex: 1;
          min-width: 0;
        }
        .ras-marquee {
          display: inline-block;
          white-space: nowrap;
          font-size: 0.76rem;
          font-weight: 600;
          color: rgba(255,255,255,0.95);
          animation: ras-scroll 20s linear infinite;
        }
        @keyframes ras-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ── CTA Button ── */
        .ras-cta {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #fff;
          color: #1a3a8a;
          font-size: 0.73rem;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 999px;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          letter-spacing: 0.01em;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          transition: transform 0.18s, box-shadow 0.18s, color 0.18s;
        }
        .ras-cta:hover {
          transform: translateY(-1px) scale(1.04);
          box-shadow: 0 5px 16px rgba(0,0,0,0.28);
          color: #4441e5;
        }

        /* ── Close ── */
        .ras-close {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.28);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.18s, transform 0.3s;
          flex-shrink: 0;
        }
        .ras-close:hover {
          background: rgba(255,255,255,0.28);
          transform: translateY(-50%) rotate(90deg);
        }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .ras-text   { display: none; }
          .ras-cta    { display: none; }
          .ras-marquee-wrap { display: block; }
          .ras-inner  { padding: 9px 42px 9px 12px; gap: 10px; justify-content: flex-start; }
        }

        @media (max-width: 380px) {
          .ras-badge { display: none; }
        }
      `}</style>
    </>
  );
}
