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
          <h2 className="cta-title">NIOS Stream 1 Block 2 <br />Admission Open </h2>
          <p className="cta-subtitle">Admission open for 10th & 12th students with complete coaching support.
         </p>
          <a href="#" className="cta-btn">Apply Now</a>
        </div>
      </div>

    </section>
  )
}
