import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
         <div className="footer-content">
        <div className="footer-main">
          <div className="footer-info">
            <img
              src="/assets/images/logo.png"
              alt="SS Coaching Footer Logo"
              className="footer-logo"
            />
            <div className="footer-contact">
              <div className="contact-item">
                <img
                  src="/assets/icons/footer/gmail.svg"
                  alt="Email Icon"
                  className="contact-icon"
                />
                <span className="contact-text">sscoachinglko@gmail.com</span>
              </div>
              <div className="contact-item">
                <img
                  src="/assets/icons/footer/call.svg"
                  alt="Phone Icon"
                  className="contact-icon"
                />
                <span className="contact-text">05224029757, 9839065533</span>
              </div>
              <div className="contact-item">
                <img
                  src="/assets/icons/footer/location.svg"
                  alt="Location Icon"
                  className="contact-icon"
                />
                <span className="contact-text">
                  3rd Floor, Shree Chamber, Naza Computer Market,<br/> Near Basant
                  Cinema, Hazratganj , Lucknow
                </span>
              </div>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h3 className="footer-section-title">Home</h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <li>
                  <a href="#" className="footer-link">
                    NIOS Admission
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Subject List
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Ques. Papers
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <li>
                  <a href="#" className="footer-link">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Time Table
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    NIOS Results
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div className="social-profiles">
              <h3 className="footer-section-title">Social Profiles</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <img
                    src="/assets/icons/footer/facebook.svg"
                    alt="Facebook"
                    style={{ width: "24px", height: "24px" }}
                  />
                </a>
                <a href="#" className="social-icon">
                  <img
                    src="/assets/icons/footer/twitter.svg"
                    alt="Twitter"
                    style={{ width: "24px", height: "24px" }}
                  />
                </a>
                <a href="#" className="social-icon">
                  <img
                    src="/assets/icons/footer/linkedin.svg"
                    alt="LinkedIn"
                    style={{ width: "24px", height: "24px" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>
        <p className="footer-copyright">
          © 2025 SS Coaching. All rights reserved.
        </p>
      </div>
      </div>
    </footer>
  );
}
