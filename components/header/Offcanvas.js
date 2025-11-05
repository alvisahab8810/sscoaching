// import React from "react";
// import Link from "next/link";

// export default function Offcanvas() {
//   return (
//     <>
//       <div
//         className="offcanvas mob-canvas offcanvas-start"
//         tabIndex="-1"
//         id="offcanvasExample"
//         aria-labelledby="offcanvasExampleLabel"
//       >
//         <div className="offcanvas-header">
//           <h5 className="offcanvas-title" id="offcanvasExampleLabel">
//             <Link
//               href="/"
//               className="d-flex align-items-center  mb-md-0 me-md-auto text-dark text-decoration-none desk-logo"
//             >
//               <img src="/assets/images/logo.png" alt="Logo Image" />
//             </Link>
//           </h5>
//           <button
//             type="button"
//             className="btn-close text-reset"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//           ></button>
//         </div>
//         <div className="offcanvas-body">
//           <div className="mob-menus">
//             <ul className=" nav nav-pills">
//               <li className="nav-item">
//                 <Link href="/" className="nav-link ">
//                   {" "}
//                  Home
//                 </Link>
//               </li>

//                 <li className="nav-item">
//                 <Link href="#" className="nav-link">
//                   NIOS Admission
//                 </Link>
//               </li>
            
//               <li className="nav-item">
//                 <Link href="#" className="nav-link">
//                   About Us
//                 </Link>
//               </li>
            

//             <li className="nav-item mob-dropdown">
//               <div className="accordion" id="familyAccordion">
//                   <div className="accordion-item">
//                     <h2 className="accordion-header" id="headingOne">
//                       <button
//                         className="accordion-button"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#collapseOne"
//                         aria-expanded="true"
//                         aria-controls="collapseOne"
//                       >
//                         Subject List
//                       </button>
//                     </h2>
//                     <div
//                       id="collapseOne"
//                       className="accordion-collapse collapse"
//                       aria-labelledby="headingOne"
//                       data-bs-parent="#familyAccordion"
//                     >
//                       <div className="accordion-body">
//                         <ul className="list-unstyled">
//                           <li><Link href="/subject/syllabus-class-10th" className="mb-2">Subject List Class 10th </Link></li>
//                           <li><Link href="/subject/syllabus-class-12th" className="mb-2">Subject List Class 12th </Link></li>
//                           <li><Link href="/subject/syllabus-class-12th" className="mb-2">Syllabus Class 12th </Link></li>
//                           <li><Link href="/subject/syllabus-class-12th" className="mb-2">Syllabus Class 12th </Link></li>
//                           <li><Link href="/subject/syllabus-class-12th" className="mb-2">Syllabus Class 12th </Link></li>
//                           <li><Link href="/subject/syllabus-class-12th" className="mb-2">Syllabus Class 12th </Link></li>
//                           <li><Link href="/subject/syllabus-class-12th" className="mb-2">Syllabus Class 12th </Link></li>

//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//               </li>
            

//              <li className="nav-item mob-dropdown">
//               <div className="accordion" id="questionPapers">
//                   <div className="accordion-item">
//                     <h2 className="accordion-header" id="qustionOne">
//                       <button
//                         className="accordion-button"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#collapseOne"
//                         aria-expanded="true"
//                         aria-controls="collapseOne"
//                       >
//                          Ques. Papers
//                       </button>
//                     </h2>
//                     <div
//                       id="collapseOne"
//                       className="accordion-collapse collapse"
//                       aria-labelledby="qustionOne"
//                       data-bs-parent="#questionPapers"
//                     >
//                       <div className="accordion-body">
//                         <ul className="list-unstyled">

//                          <li><Link href="/question-papers/paper-secondary-10th" className="mb-2">Papers Secondary (10th)</Link></li>
//                          <li>
//                             <Link href="question-papers/paper-secondary-12th" className="mb-2">Papers Senior Secondary (12th)</Link>

//                           </li> 
//                           <li>
//                              <Link href="/question-papers/tma-secondary-10th" className="mb-2">TMA Secondary 10th </Link>
//                           </li>

//                           <li>
//                             <Link href="/question-papers/tma-sr-secondary-12th" className="mb-2">TMA Sr. Secodary 12th</Link>
//                           </li>
                   
                    
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//               </li>
//               <li className="nav-item">
//                 <Link href="#" className="nav-link">
//                    FAQ
//                 </Link>
//               </li>


//                <li className="nav-item">
//                 <Link href="#" className="nav-link">
//                    Gallery
//                 </Link>
//               </li>

              
//                <li className="nav-item">
//                 <Link href="/contact-us" className="nav-link">
//                   Contact Us
//                 </Link>
//               </li>
//             </ul>
//           </div>


          
//       <div className="mob-social-mediabx">
//         <ul>
//         <div className="social-profiles">
//               <div className="social-icons">
//                 <a href="#" className="social-icon">
//                   <img
//                     src="/assets/icons/footer/facebook.svg"
//                     alt="Facebook"
//                     style={{ width: "24px", height: "24px" }}
//                   />
//                 </a>
//                 <a href="#" className="social-icon">
//                   <img
//                     src="/assets/icons/footer/twitter.svg"
//                     alt="Twitter"
//                     style={{ width: "24px", height: "24px" }}
//                   />
//                 </a>
//                 <a href="#" className="social-icon">
//                   <img
//                     src="/assets/icons/footer/linkedin.svg"
//                     alt="LinkedIn"
//                     style={{ width: "24px", height: "24px" }}
//                   />
//                 </a>
//               </div>
//             </div>

//         </ul>

//       </div>
//         </div>
//       </div>
//     </>
//   );
// }






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
              href="/"
              className="d-flex align-items-center mb-md-0 me-md-auto text-dark text-decoration-none desk-logo"
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
            <ul className="nav nav-pills">
              {/* Home */}
              <li className="nav-item">
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>

              {/* ✅ Shared accordion parent for all dropdowns */}
              <div className="accordion" id="mobileAccordion">

                {/* NIOS Admission Accordion */}
                <li className="nav-item mob-dropdown">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingNios">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseNios"
                        aria-expanded="false"
                        aria-controls="collapseNios"
                      >
                        NIOS Admission
                      </button>
                    </h2>
                    <div
                      id="collapseNios"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingNios"
                      data-bs-parent="#mobileAccordion"
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          <li>
                            <Link
                              href="/nios-admission/admission-in-nios-stream-1"
                              className="mb-2"
                            >
                              Admission In Stream 1
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/nios-admission/admission-in-nios-stream-2"
                              className="mb-2"
                            >
                              Admission In Stream 2
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/nios-admission/admission-in-nios-stream-3&4"
                              className="mb-2"
                            >
                              Admission In Stream 3 & 4
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

                {/* About Us */}
                <li className="nav-item">
                  <Link href="/about-us" className="nav-link">
                    About Us
                  </Link>
                </li>

                {/* Subject List Accordion */}
                <li className="nav-item mob-dropdown">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSubjects">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSubjects"
                        aria-expanded="false"
                        aria-controls="collapseSubjects"
                      >
                        Subject List
                      </button>
                    </h2>
                    <div
                      id="collapseSubjects"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingSubjects"
                      data-bs-parent="#mobileAccordion"
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          <li>
                            <Link
                              href="/subject/nios-10th-secondary"
                              className="mb-2"
                            >
                              Subject List Class 10th
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/subject/nios-12th-senior-secondary"
                              className="mb-2"
                            >
                              Subject List Class 12th
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/subject/syllabus-class-10th"
                              className="mb-2"
                            >
                              Syllabus Class 10th
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/subject/syllabus-class-12th"
                              className="mb-2"
                            >
                              Syllabus Class 12th
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/subject/secondary-course-material"
                              className="mb-2"
                            >
                              Secondary Course Material
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/subject/sr-secondary-course-material"
                              className="mb-2"
                            >
                              Sr Secondary Course Material
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

                {/* Question Papers Accordion */}
                <li className="nav-item mob-dropdown">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingPapers">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsePapers"
                        aria-expanded="false"
                        aria-controls="collapsePapers"
                      >
                        Ques. Papers
                      </button>
                    </h2>
                    <div
                      id="collapsePapers"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingPapers"
                      data-bs-parent="#mobileAccordion"
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          <li>
                            <Link
                              href="/question-papers/paper-secondary-10th"
                              className="mb-2"
                            >
                              Papers Secondary (10th)
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/question-papers/paper-secondary-12th"
                              className="mb-2"
                            >
                              Papers Senior Secondary (12th)
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/question-papers/tma-secondary-10th"
                              className="mb-2"
                            >
                              TMA Secondary 10th
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/question-papers/tma-sr-secondary-12th"
                              className="mb-2"
                            >
                              TMA Sr. Secondary 12th
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </div>

              {/* Other Static Links */}
              <li className="nav-item">
                <Link href="/faq" className="nav-link">
                  FAQ
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/gallery" className="nav-link">
                  Gallery
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/blogs" className="nav-link">
                  Blogs
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/contact-us" className="nav-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
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
