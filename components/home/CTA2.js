import React from 'react'

export default function CTA2() {
  return (
        <section className="cta-section mt-4">
      <div className="cta-bg-shape cta-bg-1"></div>
      <div className="cta-bg-shape cta-bg-2"></div>
      <div className="cta-content cta-content2">
          
  {/* SEO Accessible Image */}
  <img
    src="/assets/images/home/cta2.webp"
    alt="Student applying for NIOS 12th admission online"
    title="NIOS 12th Admission Form Registration"
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
