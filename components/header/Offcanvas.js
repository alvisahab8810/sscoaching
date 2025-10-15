import React from "react";
import Link from "next/link";

export default function Offcanvas() {
  return (
    <>
      <div
        className="offcanvas mob-canvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <Link
              href="index.html"
              className="d-flex align-items-center  mb-md-0 me-md-auto text-dark text-decoration-none desk-logo"
            >
              <img src="/assets/images/logo.png" alt="Logo Image" />
            </Link>
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="mob-menus">
            <ul className=" nav nav-pills">
              <li className="nav-item">
                <Link href="/" className="nav-link ">
                  {" "}
                 Home
                </Link>
              </li>
              <li className="nav-item mob-dropdown">
              <div className="accordion" id="familyAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        NIOS Admission
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#familyAccordion"
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          <li><Link href="#">- NIOS Admission1</Link></li>
                          <li><Link href="#">- NIOS Admission2</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </li>
              <li className="nav-item">
                <Link href="#" className="nav-link">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#" className="nav-link">
                   Subject List
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#" className="nav-link">
                  Ques. Papers
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#" className="nav-link">
                   FAQ
                </Link>
              </li>


               <li className="nav-item">
                <Link href="#" className="nav-link">
                   Gallery
                </Link>
              </li>

              
               <li className="nav-item">
                <Link href="#" className="nav-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>


          
      <div className="mob-social-mediabx">
        <ul>
        <div className="social-profiles">
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

        </ul>

      </div>
        </div>
      </div>
    </>
  );
}
