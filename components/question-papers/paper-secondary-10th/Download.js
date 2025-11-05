import React from 'react'
import Link from 'next/link'
export default function Download() {
  return (
   
    <div className="container">
            {/* <!-- Download Section --> */}
      <section className="download-section">
        <h2><span className="section-title">How to Download</span> <span className="section-subtitle">NIOS Question Paper Class 10</span></h2>
        <p className="section-text">Download NIOS Question Paper for Class 10 PDF: Click the square icon or the PDF button next to the name of the specific NIOS Question Paper Class 10 for 2024, 2023, 2022, 2021, and 2020, as well as the NIOS Sample Papers 2024 for Class 10 Question Paper. The NIOS 10 Question Paper will open in PDF format on your browser. Students can then right-click the PDF to save it to their computer for later study and printing</p>
      </section>

      {/* <!-- Quick Links --> */}
      {/* <section className="quick-links">
        <h2 className="quick-links-title">Quick links</h2>
        <div className="links-row">
          <a href="#" className="link-card yellow">
            <span className="link-text">Check NIOS Dates Now</span>
            <img src="/assets/images/img_arrow_2.svg" alt="Arrow" width="28" height="2"/>
          </a>
          <a href="#" className="link-card blue">
            <span className="link-text">Check Hall Ticket Tips</span>
            <img src="/assets/images/img_arrow_2.svg" alt="Arrow" width="28" height="2"/>
          </a>
        </div>
      </section> */}


       <section className="quick-links">
      <div className="containers">
        <h2 className="quick-title">Quick links</h2>
        <div style={{ display: "flex", gap: "80px" }}>
          <div className="expandable-list" style={{ width: "48%" }}>
            <div className="expand-item">
              <Link href="https://sscoaching.in/nios-datesheet_2240.html">
              <div className="expand-header stream1">
                <div className="expand-text">Check NIOS Dates Now</div>
                <div className="expand-icon">
                  <img
                    src="/assets/icons/link-arrow.svg"
                    alt="Expand"
                    style={{ width: "28px", height: "28px" }}
                  />
                </div>
              </div>
              </Link>
            </div>
        
          
          </div>

          <div className="expandable-list" style={{ width: "48%" }}>
            <div className="expand-item">
              <Link href="https://sscoaching.in/NIOS-Hall-Ticket-For-Class-10th-&-12th_3359.html">

              <div className="expand-header stream34">
                <div className="expand-text">Check Hall Ticket Tips</div>
                <div className="expand-icon">
                  <img
                    src="/assets/icons/link-arrow.svg"
                    alt="Expand"
                    style={{ width: "28px", height: "28px" }}
                  />
                </div>
              </div>
              </Link>
            </div>
           
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
