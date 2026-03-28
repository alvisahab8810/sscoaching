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
          <h2 className="cta-title">Registration Open!<br />Limited Seats Available!</h2>
          <p className="cta-subtitle">Join SS Coaching and start your journey toward success.
</p>

<ul className='book-your-links'>
  <li>
     <a href="#" className="cta-btn-2nd">

    👉 Book your free counselling session today
     </a>
    </li>
   
<li>
  <a href="#" className="cta-btn-2nd">
 👉 Get expert guidance for NIOS admission
 </a>

</li>
</ul>
          {/* <a href="#" className="cta-btn">Click Here</a> */}
        </div>
      </div>

    </section>
  )
}
