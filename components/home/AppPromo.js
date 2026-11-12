import React from "react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=in.sscoaching.app";

const ICON_BASE = "/assets/images/home/icons";

const FEATURES = [
  { icon: "live-classes.svg", label: "Live Classes" },
  { icon: "recorded-classes.svg", label: "Recorded Classes" },
  { icon: "doubt-clearing-sessions.svg", label: "Doubt Clearing Sessions" },
  { icon: "student-support.svg", label: "Student support" },
  { icon: "question-bank.svg", label: "Question Bank" },
  { icon: "study-materials.svg", label: "Study Materials" },
  { icon: "solved-tmas.svg", label: "Solved TMA's" },
  { icon: "solved-practicals.svg", label: "Solved Practicals" },
];

export default function AppPromo() {
  return (
    <section className="app-promo-section">
      <div className="container">
        <div className="app-promo">
          <div className="app-promo-content">
            <p className="app-promo-eyebrow">Study Anywhere</p>

            <h2 className="app-promo-title">
              Join 1 Lakh+ Students On <br /> SS Coaching App Today!
            </h2>

            <div className="app-promo-features">
              {FEATURES.map((f) => (
                <div className="app-promo-feature" key={f.label}>
                  <img
                    src={`${ICON_BASE}/${f.icon}`}
                    alt=""
                    aria-hidden="true"
                  />
                  <span>{f.label}</span>
                </div>
              ))}
            </div>

            <a
              className="app-promo-btn"
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download App Now
            </a>
          </div>

          <div className="app-promo-visual">
            <img
              src="/assets/images/home/mob-screen.webp"
              alt="SS Coaching app showing live classes, courses and continue watching screens"
              title="Join 1 Lakh+ students on the SS Coaching app"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
