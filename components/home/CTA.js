import Link from "next/link";
import React from "react";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-bg-shape cta-bg-1"></div>
      <div className="cta-bg-shape cta-bg-2"></div>
      <div className="cta-content">
        <div className="cta-text">
          <h2 className="cta-title">
            Registration open!
            <br />
            Limited seats
          </h2>
          <p className="cta-subtitle">fill the form before its too late</p>
          <Link href="#" className="cta-btn">
            Click Here
          </Link>
        </div>
      </div>
    </section>
  );
}
