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
            Failed in 10th or 12th? 
            <br />
            Pass in Just 45 Days.
          </h2>
          <p className="cta-subtitle">Special admission program with limited seats available. </p>
          <Link href="#" className="cta-btn">
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
}
