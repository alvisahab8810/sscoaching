import React from 'react'

export default function CTA3() {
  return (
        <section className="cta-section">
      <div className="cta-bg-shape cta-bg-1"></div>
      <div className="cta-bg-shape cta-bg-2"></div>
      <div className="cta-content cta-content3">
         {/* SEO Accessible Background Image */}
  <img
    src="/assets/images/home/cta3.webp"
    alt="Registration open for NIOS admission in India for students"
    title="NIOS Admission in India – Online Registration"
    style={{ display: "none" }}
  />
        <div className="cta-text">
          <h2 className="cta-title">NIOS Stream 2 Block 2 <br />Admission Open </h2>
          <p className="cta-subtitle">
            Get expert coaching, counselling, and admission support.
         </p>
          <a href="#" className="cta-btn">Apply Now</a>
        </div>
      </div>
    </section>
  )
}
