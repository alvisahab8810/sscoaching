"use client";
import { useEffect, useState, useRef } from "react";
import {
  FiX, FiExternalLink, FiAlertCircle,
  FiInfo, FiCheckCircle, FiZap, FiBell,
  FiChevronLeft, FiChevronRight,
} from "react-icons/fi";

const TYPE_CONFIG = {
  info:    { bg: "#4441e5", light: "#eef0ff", border: "#c7c4f8", icon: <FiInfo size={16} />,        label: "Info"   },
  success: { bg: "#0a7c4e", light: "#e6faf5", border: "#9fe5d4", icon: <FiCheckCircle size={16} />, label: "Update" },
  warning: { bg: "#b45309", light: "#fff7e6", border: "#fcd49a", icon: <FiAlertCircle size={16} />, label: "Notice" },
  urgent:  { bg: "#991b1b", light: "#fff0f0", border: "#fca5a5", icon: <FiZap size={16} />,         label: "Urgent" },
};

export default function AnnouncementWidget() {
  const [announcements, setAnnouncements] = useState([]);
  const [current, setCurrent]             = useState(0);
  const [open, setOpen]                   = useState(false);
  const [dismissed, setDismissed]         = useState(false);
  const [animating, setAnimating]         = useState(false);
  const [pulse, setPulse]                 = useState(true);
  const intervalRef                       = useRef(null);

  useEffect(() => {
    fetch("/api/announcements")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.announcements.length > 0) {
          setAnnouncements(d.announcements);
          setTimeout(() => setOpen(true), 2000);
          setTimeout(() => setPulse(false), 6000);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!open || announcements.length <= 1) return;
    intervalRef.current = setInterval(goNext, 6000);
    return () => clearInterval(intervalRef.current);
  }, [open, announcements, current]);

  const goNext = () => {
    setAnimating(true);
    setTimeout(() => { setCurrent((c) => (c + 1) % announcements.length); setAnimating(false); }, 250);
  };

  const goPrev = () => {
    setAnimating(true);
    setTimeout(() => { setCurrent((c) => (c - 1 + announcements.length) % announcements.length); setAnimating(false); }, 250);
  };

  const jumpTo = (i) => {
    setAnimating(true);
    setTimeout(() => { setCurrent(i); setAnimating(false); }, 250);
  };

  if (dismissed || announcements.length === 0) return null;

  const ann    = announcements[current];
  const config = TYPE_CONFIG[ann.type] || TYPE_CONFIG.info;

  return (
    <>
      {/* ─── Collapsed bell bubble ─── */}
      {!open && (
        <button
          className={`ann-bubble${pulse ? " ann-bubble--pulse" : ""}`}
          style={{ "--cbg": config.bg }}
          onClick={() => setOpen(true)}
          aria-label="View announcements"
        >
          <FiBell size={20} />
          <span className="ann-dot-red" />
        </button>
      )}

      {/* ─── Expanded card ─── */}
      {open && (
        <div
          className="ann-widget"
          style={{ "--tbg": config.bg, "--tlight": config.light, "--tborder": config.border }}
        >
          {/* Header */}
          <div className="ann-head" style={{ background: config.bg }}>
            <div className="ann-head-left">
              <span className="ann-head-ico">{config.icon}</span>
              <div>
                <div className="ann-head-label">{config.label}</div>
                <div className="ann-head-sub">SS Coaching Notice</div>
              </div>
            </div>
            <button className="ann-close-btn" onClick={() => setDismissed(true)} aria-label="Close">
              <FiX size={15} />
            </button>
          </div>

          {/* Body */}
          <div className={`ann-body${animating ? " ann-body--out" : " ann-body--in"}`}>
            <h4 className="ann-widget-title">{ann.title}</h4>
            {ann.description && <p className="ann-widget-desc">{ann.description}</p>}
            {ann.link && (
              <a href={ann.link} target="_blank" rel="noopener noreferrer"
                className="ann-widget-link" style={{ background: config.bg }}>
                {ann.linkLabel || "Read More"} <FiExternalLink size={11} />
              </a>
            )}
          </div>

          {/* Navigation dots */}
          {announcements.length > 1 && (
            <div className="ann-nav-bar">
              <button className="ann-nav-btn" onClick={goPrev}><FiChevronLeft size={13} /></button>
              <div className="ann-dots">
                {announcements.map((_, i) => (
                  <button key={i} className={`ann-pip${i === current ? " ann-pip--on" : ""}`}
                    style={{ "--dc": config.bg }} onClick={() => jumpTo(i)} />
                ))}
              </div>
              <button className="ann-nav-btn" onClick={goNext}><FiChevronRight size={13} /></button>
            </div>
          )}

          {/* Minimize */}
          <button className="ann-minimize" style={{ "--mc": config.bg }} onClick={() => setOpen(false)}>
            <FiBell size={11} /> Hide notification
          </button>
        </div>
      )}

      <style jsx>{`

        /* ─── Bell Bubble ─── */
        .ann-bubble {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--cbg);
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 24px rgba(0,0,0,0.22);
          z-index: 9990;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ann-bubble:hover {
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 10px 32px rgba(0,0,0,0.28);
        }

        /* Red unread dot */
        .ann-dot-red {
          position: absolute;
          top: 9px; right: 9px;
          width: 11px; height: 11px;
          background: #ef4444;
          border-radius: 50%;
          border: 2px solid #fff;
        }

        /* Pulse ring */
        .ann-bubble--pulse {
          animation: bubblePulse 2.2s ease-out infinite;
        }
        @keyframes bubblePulse {
          0%   { box-shadow: 0 6px 24px rgba(0,0,0,0.22), 0 0 0 0 var(--cbg); }
          65%  { box-shadow: 0 6px 24px rgba(0,0,0,0.22), 0 0 0 16px rgba(68,65,229,0); }
          100% { box-shadow: 0 6px 24px rgba(0,0,0,0.22), 0 0 0 0   rgba(68,65,229,0); }
        }

        /* ─── Widget Card ─── */
        .ann-widget {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 310px;
          background: #fff;
          border-radius: 18px;
          border: 1.5px solid var(--tborder);
          box-shadow: 0 10px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06);
          z-index: 9990;
          overflow: hidden;
          animation: widgetPop 0.32s cubic-bezier(0.34,1.56,0.64,1);
          transform-origin: bottom right;
        }
        @keyframes widgetPop {
          from { opacity: 0; transform: scale(0.82) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }

        /* Head */
        .ann-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
        }
        .ann-head-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ann-head-ico {
          width: 32px; height: 32px;
          background: rgba(255,255,255,0.2);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }
        .ann-head-label {
          font-size: 0.8rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.02em;
        }
        .ann-head-sub {
          font-size: 0.67rem;
          color: rgba(255,255,255,0.65);
          margin-top: 1px;
        }
        .ann-close-btn {
          width: 28px; height: 28px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 7px;
          color: #fff;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.18s;
          flex-shrink: 0;
        }
        .ann-close-btn:hover { background: rgba(255,255,255,0.3); }

        /* Body */
        .ann-body {
          padding: 14px 16px 12px;
          background: var(--tlight);
          transition: opacity 0.25s, transform 0.25s;
        }
        .ann-body--in  { opacity: 1; transform: translateX(0); }
        .ann-body--out { opacity: 0; transform: translateX(12px); }

        .ann-widget-title {
          font-size: 0.94rem;
          font-weight: 800;
          color: #0f1f3d;
          margin: 0 0 6px;
          line-height: 1.4;
        }
        .ann-widget-desc {
          font-size: 0.81rem;
          color: #5a6a8a;
          line-height: 1.65;
          margin: 0 0 12px;
        }
        .ann-widget-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #fff;
          font-size: 0.79rem;
          font-weight: 700;
          padding: 7px 14px;
          border-radius: 7px;
          text-decoration: none;
          box-shadow: 0 3px 10px rgba(0,0,0,0.15);
          transition: opacity 0.18s, transform 0.18s;
        }
        .ann-widget-link:hover { opacity: 0.88; transform: translateY(-1px); }

        /* Nav bar */
        .ann-nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 14px;
          background: #fff;
          border-top: 1px solid var(--tborder);
        }
        .ann-nav-btn {
          width: 26px; height: 26px;
          background: #f5f6fe;
          border: 1.5px solid #e0e3f5;
          border-radius: 6px;
          color: #4441e5;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s, color 0.18s;
        }
        .ann-nav-btn:hover { background: #4441e5; border-color: #4441e5; color: #fff; }

        .ann-dots { display: flex; align-items: center; gap: 5px; }
        .ann-pip {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #dde1ec;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s, width 0.25s, border-radius 0.25s;
        }
        .ann-pip--on {
          background: var(--dc);
          width: 20px;
          border-radius: 4px;
        }

        /* Minimize */
        .ann-minimize {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 100%;
          padding: 7px;
          background: #fafbff;
          border: none;
          border-top: 1px solid #f0f1fa;
          font-size: 0.71rem;
          font-weight: 600;
          color: var(--mc);
          cursor: pointer;
          font-family: inherit;
          transition: background 0.18s;
        }
        .ann-minimize:hover { background: #f0f1fe; }

        /* ─── Mobile ─── */
        @media (max-width: 480px) {
          .ann-widget {
            bottom: 0; right: 0; left: 0;
            width: 100%;
            border-radius: 20px 20px 0 0;
            border-bottom: none;
            animation: widgetSlideUp 0.3s cubic-bezier(0.34,1.2,0.64,1);
            transform-origin: bottom center;
          }
          @keyframes widgetSlideUp {
            from { opacity: 0; transform: translateY(100%); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .ann-bubble { bottom: 20px; right: 20px; width: 50px; height: 50px; }
        }
      `}</style>
    </>
  );
}