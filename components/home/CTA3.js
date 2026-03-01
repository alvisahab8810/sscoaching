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
          <h2 className="cta-title">Registration open!<br />Limited seats</h2>
          <p className="cta-subtitle">fill the form before its too late</p>
          <a href="#" className="cta-btn">Click Here</a>
        </div>
      </div>
    </section>
  )
}
