"use client";
import { useEffect, useState, useRef } from "react";

const LANGUAGES = [
  { code: "en", label: "English",   native: "English"   },
  { code: "hi", label: "Hindi",     native: "हिन्दी"     },
  { code: "bn", label: "Bengali",   native: "বাংলা"      },
  { code: "te", label: "Telugu",    native: "తెలుగు"     },
  { code: "mr", label: "Marathi",   native: "मराठी"      },
  { code: "ta", label: "Tamil",     native: "தமிழ்"      },
  { code: "gu", label: "Gujarati",  native: "ગુજરાતી"    },
  { code: "kn", label: "Kannada",   native: "ಕನ್ನಡ"      },
  { code: "ml", label: "Malayalam", native: "മലയാളം"     },
  { code: "pa", label: "Punjabi",   native: "ਪੰਜਾਬੀ"     },
  { code: "ur", label: "Urdu",      native: "اردو"       },
  { code: "or", label: "Odia",      native: "ଓଡ଼ିଆ"      },
  { code: "as", label: "Assamese",  native: "অসমীয়া"    },
];

export default function GoogleTranslate() {
  const [open, setOpen]       = useState(false);
  const [current, setCurrent] = useState(LANGUAGES[0]);
  const dropdownRef           = useRef(null);

  /* ── Load Google Translate script (hidden) ── */
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: LANGUAGES.map((l) => l.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element_hidden"
      );
    };

    const script    = document.createElement("script");
    script.id       = "google-translate-script";
    script.src      = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async    = true;
    document.body.appendChild(script);
  }, []);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Trigger Google Translate via hidden select ── */
  const selectLanguage = (lang) => {
    setCurrent(lang);
    setOpen(false);

    const tryTranslate = (attempts = 0) => {
      const select = document.querySelector(
        "#google_translate_element_hidden select"
      );
      if (select) {
        select.value = lang.code;
        select.dispatchEvent(new Event("change"));
      } else if (attempts < 20) {
        setTimeout(() => tryTranslate(attempts + 1), 300);
      }
    };
    tryTranslate();
  };

  return (
    <>
      {/* Hidden Google widget — required, do NOT remove */}
      <div
        id="google_translate_element_hidden"
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          top: "-9999px",
          left: "-9999px",
        }}
      />

      {/* ── Custom trigger button ── */}
      <div className="gt-wrap" ref={dropdownRef}>
        <button
          className={`gt-trigger${open ? " gt-trigger--open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Select language"
          title="Translate website"
        >
          {/* Globe icon */}
          <svg className="gt-globe" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>

          {/* Current language label — hidden on mobile */}
          <span className="gt-label">{current.native}</span>

          {/* Chevron */}
          <svg
            className={`gt-chevron${open ? " gt-chevron--up" : ""}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* ── Dropdown panel ── */}
        {open && (
          <div className="gt-dropdown">
            <div className="gt-dropdown-head">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Choose Language
            </div>

            <ul className="gt-list">
              {LANGUAGES.map((lang) => (
                <li key={lang.code}>
                  <button
                    className={`gt-item${current.code === lang.code ? " gt-item--active" : ""}`}
                    onClick={() => selectLanguage(lang)}
                  >
                    <span className="gt-item-native">{lang.native}</span>
                    <span className="gt-item-english">{lang.label}</span>
                    {current.code === lang.code && (
                      <svg className="gt-check" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style jsx global>{`
        /* ── Suppress Google's injected bar ── */
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        body { top: 0 !important; }
        .goog-logo-link { display: none !important; }
        .goog-te-gadget span { display: none !important; }

        /* ── Wrapper ── */
        .gt-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        /* ── Trigger button ── */
        .gt-trigger {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #f7f8ff;
          border: 1.5px solid rgba(68, 65, 229, 0.22);
          border-radius: 8px;
          padding: 7px 11px;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.82rem;
          font-weight: 600;
          color: #2d3a5a;
          line-height: 1;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s, color 0.2s;
          white-space: nowrap;
          user-select: none;
        }

        .gt-trigger:hover,
        .gt-trigger--open {
          border-color: #4441e5;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(68, 65, 229, 0.1);
          color: #4441e5;
        }

        .gt-globe {
          width: 15px;
          height: 15px;
          flex-shrink: 0;
        }

        .gt-label {
          max-width: 76px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .gt-chevron {
          width: 12px;
          height: 12px;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .gt-chevron--up { transform: rotate(180deg); }

        /* ── Dropdown panel ── */
        .gt-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 230px;
          background: #fff;
          border: 1.5px solid rgba(68, 65, 229, 0.1);
          border-radius: 14px;
          box-shadow:
            0 4px 16px rgba(68, 65, 229, 0.1),
            0 16px 48px rgba(68, 65, 229, 0.12),
            0 1px 3px rgba(0,0,0,0.06);
          z-index: 99999;
          overflow: hidden;
          animation: gtSlide 0.18s ease;
        }

        @keyframes gtSlide {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Dropdown header ── */
        .gt-dropdown-head {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 12px 14px 10px;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8491a8;
          background: #fafbff;
          border-bottom: 1px solid #f0f1fa;
        }

        .gt-dropdown-head svg { width: 13px; height: 13px; }

        /* ── List ── */
        .gt-list {
          list-style: none;
          margin: 0;
          padding: 5px 0;
          max-height: 295px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #dde1f0 transparent;
        }

        .gt-list::-webkit-scrollbar { width: 4px; }
        .gt-list::-webkit-scrollbar-track { background: transparent; }
        .gt-list::-webkit-scrollbar-thumb {
          background: #dde1f0;
          border-radius: 4px;
        }

        /* ── Each item ── */
        .gt-item {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 8px 14px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-family: inherit;
          text-align: left;
          transition: background 0.15s;
        }

        .gt-item:hover { background: #f5f6fe; }

        .gt-item--active { background: rgba(68, 65, 229, 0.06); }

        .gt-item-native {
          flex: 1;
          font-size: 0.9rem;
          font-weight: 700;
          color: #0f1f3d;
        }

        .gt-item--active .gt-item-native { color: #4441e5; }

        .gt-item-english {
          font-size: 0.72rem;
          color: #a0abbe;
          flex-shrink: 0;
        }

        .gt-check {
          width: 13px;
          height: 13px;
          color: #4441e5;
          flex-shrink: 0;
        }

        /* ────────────────────────────────
           MOBILE — show after phone icon
           hide label, keep globe + chevron
        ──────────────────────────────── */
        @media (max-width: 991px) {
          .gt-label { display: none; }

          .gt-trigger {
            padding: 7px 9px;
            border-radius: 8px;
          }

          .gt-dropdown {
            right: 0;
            width: 200px;
          }
        }
      `}</style>
    </>
  );
}