import React from "react";
import DMCABadge from "../home/DMCABadge";
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="ss-footer">

      {/* ════════════════════════════════
          TOP BAND — tagline + social
      ════════════════════════════════ */}
      <div className="ss-footer-top">
        <div className="container">
          <div className="ss-footer-top-inner">
            <p className="ss-footer-tagline">
              India's Most Trusted NIOS Coaching Center — Helping Students Rise From Failure Since 2001
            </p>
            <div className="ss-footer-socials">
              <a href="https://www.instagram.com/sscoaching_lucknow/" target="_blank" rel="noopener noreferrer" className="ss-social-btn" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://hi-in.facebook.com/SSCoachingLucknow" target="_blank" rel="noopener noreferrer" className="ss-social-btn" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://www.youtube.com/@SscoachingInlucknow" target="_blank" rel="noopener noreferrer" className="ss-social-btn" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="https://wa.me/919839065533" target="_blank" rel="noopener noreferrer" className="ss-social-btn ss-social-btn--wa" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          MAIN FOOTER GRID
      ════════════════════════════════ */}
      <div className="ss-footer-main">
        <div className="container">
          <div className="ss-footer-grid">

            {/* ── Col 1: About SS Coaching ── */}
            <div className="ss-footer-col ss-footer-col--about">
              <img
                src="/assets/images/logo.png"
                alt="SS Coaching Logo"
                className="ss-footer-logo"
              />
              <p className="ss-footer-about-text">
                SS Coaching is Lucknow's oldest and most trusted NIOS study centre, 
                established in 2001. Our mission is to provide every failed or 
                drop-out student a second chance to qualify their 10th &amp; 12th 
                board examinations through the National Institute of Open Schooling 
                (NIOS). We believe no student should be left behind — and we have 
                been delivering on that promise for over two decades.
              </p>
              <div className="ss-footer-est">
                <span className="ss-footer-est-badge">Est. 2001</span>
                <span className="ss-footer-est-text">25+ Years of Excellence</span>
              </div>
            </div>

            {/* ── Col 2: Quick Links ── */}
            <div className="ss-footer-col">
              <h3 className="ss-footer-heading">Quick Links</h3>
              <ul className="ss-footer-list">
                <li><a href="/about-us">About Us</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/blogs">Blogs</a></li>
                <li><a href="/disclaimer">Disclaimer</a></li>
              </ul>
            </div>

            {/* ── Col 3: Important Links ── */}
            <div className="ss-footer-col">
              <h3 className="ss-footer-heading">Important Links</h3>
              <ul className="ss-footer-list">
                <li><a href="/nios-admission">NIOS Admission</a></li>
                <li><a href="/subject/subject-list">Subject List</a></li>
                <li><a href="/question-papers">Question Papers</a></li>
                <li><a href="/nios-results/">NIOS Results</a></li>
                {/* <li><a href="/nios-results/nios-10th-result">NIOS 10th Result</a></li> */}
                <li><a href="/nios-hall-ticket">NIOS Hall Ticket</a></li>
                <li><a href="/nios-datesheet">NIOS Date Sheet</a></li>
              </ul>
            </div>

            {/* ── Col 4: Contact & Legal ── */}
            <div className="ss-footer-col">
              <h3 className="ss-footer-heading">Contact Us</h3>

              <div className="ss-footer-contact-list">
                <div className="ss-footer-contact-item">
                  <FiMail className="ss-footer-contact-icon" />
                  <div>
                    <div className="ss-footer-contact-label">Grievance / Email</div>
                    <a href="mailto:contact@sscoaching.in" className="ss-footer-contact-value">
                      contact@sscoaching.in
                    </a>
                  </div>
                </div>

                <div className="ss-footer-contact-item">
                  <FiPhone className="ss-footer-contact-icon" />
                  <div>
                    <div className="ss-footer-contact-label">Phone Numbers</div>
                    <div className="ss-footer-contact-value">
                      <a href="tel:09935035316">09935035316</a><br />
                      <a href="tel:09839065533">09839065533</a><br />
                      <a href="tel:09792111121">09792111121</a>
                    </div>
                  </div>
                </div>

                <div className="ss-footer-contact-item">
                  <FiMapPin className="ss-footer-contact-icon" />
                  <div>
                    <div className="ss-footer-contact-label">Registered Office</div>
                    <div className="ss-footer-contact-value">
                      3rd Floor, Shree Chamber, Naza Computer Market,
                      Near Basant Cinema, Hazratganj, Lucknow — 226001
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal links */}
              <div className="ss-footer-legal-links">
                <a href="/disclaimer">Disclaimer</a>
                <span className="ss-footer-legal-sep">|</span>
                <a href="/privacy-policy">Privacy Policy</a>
                <span className="ss-footer-legal-sep">|</span>
                <a href="/terms-&-conditions">Terms &amp; Conditions</a>
                <span className="ss-footer-legal-sep">|</span>
                <a href="/sitemap">Sitemap</a>


              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          BOTTOM BAR
      ════════════════════════════════ */}
      <div className="ss-footer-bottom">
        <div className="container">
          <div className="ss-footer-bottom-inner">
            <DMCABadge />
            <p className="ss-footer-copyright">
              © 2025 SS Coaching, Lucknow. All rights reserved. &nbsp;|&nbsp;
              Oldest NIOS Center in Lucknow since 2001
            </p>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          STYLES
      ════════════════════════════════ */}
      <style jsx>{`

        /* ── Base ── */
        .ss-footer {
          font-family: inherit;
        }

        /* ── Top band ── */
        .ss-footer-top {
          background: #f0f1fe;
          padding: 14px 0;
          border-bottom: 1px solid #e0e3f5;
        }

        .ss-footer-top-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .ss-footer-tagline {
          font-size: 0.82rem;
          color: #6b7a99;
          margin: 0;
          font-style: italic;
        }

        .ss-footer-socials {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ss-social-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #fff;
          border: 1.5px solid #e0e3f5;
          color: #4441e5;
          font-size: 0.9rem;
          transition: background 0.2s, color 0.2s, transform 0.2s, border-color 0.2s;
          text-decoration: none;
        }

        .ss-social-btn:hover {
          background: #4441e5;
          border-color: #4441e5;
          color: #fff;
          transform: translateY(-2px);
        }

        .ss-social-btn--wa:hover {
          background: #25D366;
          border-color: #25D366;
        }

        /* ── Main footer ── */
        .ss-footer-main {
          background: #fff;
          padding: 52px 0 40px;
          border-top: 1px solid #e8eaf5;
        }

        .ss-footer-grid {
          display: grid;
          grid-template-columns: 1.7fr 1fr 1.2fr 1.4fr;
          gap: 48px;
          align-items: start;
        }

        .ss-footer-logo {
          height: 52px;
          width: auto;
          margin-bottom: 18px;
          display: block;
        }

        .ss-footer-about-text {
          font-size: 0.83rem;
          color: #6b7a99;
          line-height: 1.75;
          margin: 0 0 16px;
        }

        .ss-footer-est {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .ss-footer-est-badge {
          background: linear-gradient(135deg, #4441e5, #00cbb8);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 0.05em;
        }

        .ss-footer-est-text {
          font-size: 0.75rem;
          color: #8491a8;
        }

        /* ── Headings ── */
        .ss-footer-heading {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #4441e5;
          margin: 0 0 18px;
          padding-bottom: 10px;
          border-bottom: 2px solid rgba(68, 65, 229, 0.15);
        }

        /* ── Link lists ── */
        .ss-footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .ss-footer-list li a {
          font-size: 0.84rem;
          color: #6b7a99;
          text-decoration: none;
          transition: color 0.2s, padding-left 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ss-footer-list li a::before {
          content: '›';
          font-size: 1rem;
          color: #4441e5;
          opacity: 0;
          transition: opacity 0.2s;
          flex-shrink: 0;
        }

        .ss-footer-list li a:hover {
          color: #4441e5;
          padding-left: 4px;
        }

        .ss-footer-list li a:hover::before {
          opacity: 1;
        }

        /* ── Contact list ── */
        .ss-footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 20px;
        }

        .ss-footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 11px;
        }

        .ss-footer-contact-icon {
          font-size: 1rem;
          color: #4441e5;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .ss-footer-contact-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #a0abbe;
          margin-bottom: 3px;
        }

        .ss-footer-contact-value {
          font-size: 0.82rem;
          color: #3a4a6b;
          line-height: 1.65;
          text-decoration: none;
        }

        .ss-footer-contact-value a {
          color: #3a4a6b;
          text-decoration: none;
          transition: color 0.2s;
          display: block;
        }

        .ss-footer-contact-value a:hover {
          color: #4441e5;
        }

        /* ── Legal links ── */
        .ss-footer-legal-links {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 4px;
          padding-top: 16px;
          border-top: 1px solid #e8eaf5;
        }

        .ss-footer-legal-links a {
          font-size: 0.75rem;
          color: #8491a8;
          text-decoration: none;
          transition: color 0.2s;
        }

        .ss-footer-legal-links a:hover {
          color: #4441e5;
        }

        .ss-footer-legal-sep {
          color: #d0d4e8;
          font-size: 0.75rem;
        }

        /* ── Bottom bar ── */
        .ss-footer-bottom {
          background: #f0f1fe;
          border-top: 1px solid #e0e3f5;
          padding: 14px 0;
        }

        .ss-footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .ss-footer-copyright {
          font-size: 0.78rem;
          color: #8491a8;
          margin: 0;
          text-align: right;
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .ss-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
          .ss-footer-col--about {
            grid-column: span 2;
          }
        }

        @media (max-width: 640px) {
          .ss-footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .ss-footer-col--about {
            grid-column: span 1;
          }
          .ss-footer-top-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .ss-footer-bottom-inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .ss-footer-copyright {
            text-align: left;
          }
          .ss-footer-main {
            padding: 36px 0 28px;
          }
        }
      `}</style>
    </footer>
  );
}


// import React from "react";
// import DMCABadge from "../home/DMCABadge";

// export default function Footer() {
//   return (
//     <footer className="footer">
//       <div className="container">
//          <div className="footer-content">
//         <div className="footer-main">
//           <div className="footer-info">
//             <img
//               src="/assets/images/logo.png"
//               alt="SS Coaching Footer Logo"
//               className="footer-logo"
//             />
//             <div className="footer-contact">
//               <div className="contact-item">
//                 <img
//                   src="/assets/icons/footer/gmail.svg"
//                   alt="Email Icon"
//                   className="contact-icon"
//                 />
//                 <span className="contact-text"><a href="mailto:contact@sscoaching.in">contact@sscoaching.in</a></span>
//               </div>
//               <div className="contact-item">
//                 <img
//                   src="/assets/icons/footer/call.svg"
//                   alt="Phone Icon"
//                   className="contact-icon"
//                 />
//                 <span className="contact-text">09935035316, 09839065533, 09792111121</span>
//               </div>
//               <div className="contact-item">
//                 <img
//                   src="/assets/icons/footer/location.svg"
//                   alt="Location Icon"
//                   className="contact-icon"
//                 />
//                 <span className="contact-text">
//                   3rd Floor, Shree Chamber, Naza Computer Market,<br/> Near Basant
//                   Cinema, Hazratganj , Lucknow
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="footer-links">
//             <div className="footer-section">
//               <h3 className="footer-section-title">Home</h3>
//               <ul
//                 style={{
//                   listStyle: "none",
//                   padding: 0,
//                   margin: 0,
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "8px",
//                 }}
//               >
//                 <li>
//                   <a href="/nios-admission/admission-in-nios-stream-1" className="footer-link">
//                     NIOS Admission
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/about-us" className="footer-link">
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/subject/nios-10th-secondary" className="footer-link">
//                     Subject List
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/question-papers/paper-secondary-10th" className="footer-link">
//                     Ques. Papers
//                   </a>
//                 </li>
//               </ul>
//             </div>

//              <div className="footer-section">
//               <h3 className="footer-section-title">Important Links</h3>
//               <ul
//                 style={{
//                   listStyle: "none",
//                   padding: 0,
//                   margin: 0,
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "8px",
//                 }}
//               >
//                 <li>
//                   <a href="/disclaimer" className="footer-link">
//                     Disclaimer
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/privacy-policy" className="footer-link">
//                     Privacy Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/terms-&-conditions" className="footer-link">
//                     Terms & Conditions
//                   </a>
//                 </li>
            
//               </ul>
//             </div>

//             <div className="footer-section">

//               <h3 className="footer-section-title">Other Pages</h3>

//               <ul
//                 style={{
//                   listStyle: "none",
//                   padding: 0,
//                   margin: 0,
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "8px",
//                 }}
//               >

           
//                 <li>
//                   <a href="/faq" className="footer-link">
//                     FAQ
//                   </a>
//                 </li>
               
//                 <li>
//                   <a href="/blogs" className="footer-link">
//                     Blogs
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/gallery" className="footer-link">
//                     Gallery
//                   </a>
//                 </li>
//                 <li>
//                   <a href="/contact-us" className="footer-link">
//                     Contact Us
//                   </a>
//                 </li>
//               </ul>
//             </div>


            

//             <div className="social-profiles">
//               <h3 className="footer-section-title">Social Profiles</h3>
//               <div className="social-icons">

//                 <a href="https://www.instagram.com/sscoaching_lucknow/" className="social-icon">
//                   <img
//                     src="/assets/icons/footer/instagram.svg"
//                     alt="Instagram"
//                     style={{ width: "24px", height: "24px" }}
//                   />
//                 </a>

//                 <a href="https://www.facebook.com/SSCoachingLucknow" className="social-icon">
//                   <img
//                     src="/assets/icons/footer/facebook.svg"
//                     alt="Facebook"
//                     style={{ width: "24px", height: "24px" }}
//                   />
//                 </a>


//                 <a href="https://www.youtube.com/channel/UC5lHqWVNh_xP0iVB7dsRgQw" className="social-icon">
//                   <img
//                     src="/assets/icons/footer/youtube.svg"
//                     alt="Youtube"
//                     style={{ width: "24px", height: "24px" }}
//                   />
//                 </a>
//                 {/* <a href="https://x.com/SSCoachingTwit" className="social-icon">
//                   <img
//                     src="/assets/icons/footer/twitter.svg"
//                     alt="Twitter"
//                     style={{ width: "24px", height: "24px" }}
//                   />
//                 </a> */}
//                 {/* <a href="#" className="social-icon">
//                   <img
//                     src="/assets/icons/footer/linkedin.svg"
//                     alt="LinkedIn"
//                     style={{ width: "24px", height: "24px" }}
//                   />
//                 </a> */}
//               </div>
//             </div>
//           </div>
//         </div>

//       <DMCABadge />


//         <div className="footer-divider"></div>
//         <p className="footer-copyright">

//           © 2025 SS Coaching. All rights reserved.
//         </p>
//       </div>
//       </div>
//     </footer>
//   );
// }
