import React from "react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=in.sscoaching.app";

export default function CTA() {
  return (
    <section className="cta-section cta-section--app">
      <div className="cta-bg-shape cta-bg-1"></div>
      <div className="cta-bg-shape cta-bg-2"></div>
      <div className="cta-content cta-content--app">
        <div className="cta-text">
          <h2 className="cta-title">
            <span className="cta-title-light">Join On SS Coaching</span>
            <br />
            <strong> App</strong> Today!
          </h2>

          <p className="cta-download-label">Download Now</p>

          <div className="cta-stores">
            {/* The iOS app is not published yet, so this badge is not a link. */}
            <img
              src="/assets/app-store.png"
              alt="Download on the App Store"
              className="cta-store-badge"
            />

            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-store-link"
            >
              <img
                src="/assets/google.png"
                alt="Get it on Google Play"
                className="cta-store-badge"
              />
            </a>
          </div>
        </div>

        <div className="cta-visual">
          <img
            src="/assets/cta.png"
            alt="SS Coaching app on a mobile phone"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
