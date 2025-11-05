
// import React, { useState } from "react";
// import Link from "next/link";
// import { FiChevronDown } from "react-icons/fi"; // dropdown arrow icon

// export default function Header() {
//   const [openDropdown, setOpenDropdown] = useState(null);

//   const toggleDropdown = (menu) => {
//     setOpenDropdown(openDropdown === menu ? null : menu);
//   };

//   return (
//     <section className="header-area">
//       <div className="container">
//         <header className="header">
//           <div className="header-content">
//            <Link href="/"> <img
//               src="/assets/images/logo.png"
//               alt="SS Coaching Logo"
//               className="logo"
//             /></Link>

//             <nav className="nav-menu">
//               <a href="/" className="nav-item active">
//                 Home
//               </a>

              
//               {/* Subject List Dropdown */}
//               <div
//                 className="nav-item dropdown"
//                 onMouseEnter={() => toggleDropdown("niosadmission")}
//                 onMouseLeave={() => toggleDropdown(null)}
//               >
//                 <span className="dropdown-toggle">
//                   NIOS Admission <FiChevronDown className="arrow-icon" />
//                 </span>
//                 {openDropdown  === "niosadmission" && (
//                   <div className="dropdown-menu">
//                     <Link href="/nios-admission/admission-in-nios-stream-1" className="mb-2">Admission In Stream 1</Link>
//                     <Link href="/nios-admission/admission-in-nios-stream-2" className="mb-2">Admission In Stream 2 </Link>
//                     <Link href="/nios-admission/admission-in-nios-stream-3&4" className="mb-2">Admission In Stream 3 & 4</Link>
                    
                    
//                   </div>
//                 )}
//               </div>

//               <a href="/about-us" className="nav-item">
//                 About Us
//               </a>

//               {/* Subject List Dropdown */}
//               <div
//                 className="nav-item dropdown"
//                 onMouseEnter={() => toggleDropdown("subjects")}
//                 onMouseLeave={() => toggleDropdown(null)}
//               >
//                 <span className="dropdown-toggle">
//                   Subject List <FiChevronDown className="arrow-icon" />
//                 </span>
//                 {openDropdown  === "subjects" && (
//                   <div className="dropdown-menu">
//                     <Link href="/subject/nios-10th-secondary" className="mb-2">Subject List Class 10th </Link>

//                     <Link href="/subject/nios-12th-senior-secondary" className="mb-2">Subject List Class 12th </Link>

//                     <Link href="/subject/syllabus-class-10th" className="mb-2">Syllabus Class 10th </Link>
//                     <Link href="/subject/syllabus-class-12th" className="mb-2">Syllabus Class 12th </Link>
//                     <Link href="/subject/secondary-course-material" className="mb-2">Secondary Course Material</Link>
//                     <Link href="/subject/sr-secondary-course-material" className="mb-2">Sr Secondary Course Material</Link>
                    
//                   </div>
//                 )}
//               </div>

//               {/* Question Papers Dropdown */}
//               <div
//                 className="nav-item dropdown"
//                 onMouseEnter={() => toggleDropdown("papers")}
//                 onMouseLeave={() => toggleDropdown(null)}
//               >
//                 <span className="dropdown-toggle">
//                   Ques. Papers <FiChevronDown className="arrow-icon" />
//                 </span>
//                 {openDropdown === "papers" && (
//                   <div className="dropdown-menu">
//                     <Link href="/question-papers/paper-secondary-10th" className="mb-2">Papers Secondary (10th)</Link>
//                     <Link href="/question-papers/paper-secondary-12th" className="mb-2">Papers Senior Secondary (12th)</Link>
//                     <Link href="/question-papers/tma-secondary-10th" className="mb-2">TMA Secondary 10th </Link>
//                     <Link href="/question-papers/tma-sr-secondary-12th" className="mb-2">TMA Sr. Secodary 12th</Link>
//                   </div>
//                 )}
//               </div>

//               <a href="/faq" className="nav-item">
//                 FAQ
//               </a>
//               <a href="/gallery" className="nav-item">
//                 Gallery
//               </a>
//                <a href="/blogs" className="nav-item">
//                 Blogs
//               </a>
//               <a href="/contact-us" className="nav-item">
//                 Contact Us
//               </a>
//             </nav>

//             <Link
//               className="hamburger desktop-none"
//               data-bs-toggle="offcanvas"
//               href="#offcanvasExample"
//               role="button"
//               aria-controls="offcanvasExample"
//             >
//               <img src="/assets/icons/burger.svg" alt="Burger Menu" />
//             </Link>
//           </div>
//         </header>
//       </div>

//       {/* ===== Styled JSX (Dropdown styles only) ===== */}
//       <style jsx>{`

//       .dropdown-toggle:after{
//       display:none!important;
//       }
//         .nav-item.dropdown {
//           position: relative;
//           display: inline-block;
//           cursor: pointer;
//           z-index:1000;

//         }

//         .dropdown-toggle {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           font-weight: 500;
//           transition: color 0.2s ease;
//         }

//         .arrow-icon {
//           font-size: 16px;
//           transition: transform 0.3s ease;
//         }

//         .nav-item.dropdown:hover .arrow-icon {
//           transform: rotate(180deg);
//         }

//         .dropdown-menu {
//           position: absolute;
//           top: 100%;
//           left: 0;
//           background: #ffffff;
//           border-radius: 10px;
//           box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
//           display: flex;
//           flex-direction: column;
//           padding: 10px 15px;
//           // min-width: 250px;
//           z-index: 100;
//           animation: fadeIn 0.2s ease;
//           width:fit-content;

//              white-space: nowrap; /* prevent breaking lines */
//           width: max-content; /* fit to content width */
//           min-width: 200px; /* ensure consistent min width */

//         }

//         .dropdown-menu a {
//           padding: 10px 16px;
//           color: #111;
//           text-decoration: none!important;
//           font-size: 15px;
//           transition: all 0.2s ease;
//           margin-bottom:15px!important;
          
//         }

//         .dropdown-menu a:hover {
//           background-color: #f5f6ff;
//           color: #111;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-5px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </section>
//   );
// }












"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown } from "react-icons/fi"; // dropdown arrow icon

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // helper to check active route
  const isActive = (path) => pathname === path;

  return (
    <section className="header-area">
      <div className="container">
        <header className="header">
          <div className="header-content">
            <Link href="/">
              <img
                src="/assets/images/logo.png"
                alt="SS Coaching Logo"
                className="logo"
              />
            </Link>

            <nav className="nav-menu">
              <Link
                href="/"
                className={`nav-item ${isActive("/") ? "active" : ""}`}
              >
                Home
              </Link>

              {/* NIOS Admission Dropdown */}
              <div
                className="nav-item dropdown"
                onMouseEnter={() => toggleDropdown("niosadmission")}
                onMouseLeave={() => toggleDropdown(null)}
              >
                <span className="dropdown-toggle">
                  NIOS Admission <FiChevronDown className="arrow-icon" />
                </span>
                {openDropdown === "niosadmission" && (
                  <div className="dropdown-menu">
                    <Link
                      href="/nios-admission/admission-in-nios-stream-1"
                      className={`mb-2 ${
                        isActive("/nios-admission/admission-in-nios-stream-1")
                          ? "active"
                          : ""
                      }`}
                    >
                      Admission In Stream 1
                    </Link>
                    <Link
                      href="/nios-admission/admission-in-nios-stream-2"
                      className={`mb-2 ${
                        isActive("/nios-admission/admission-in-nios-stream-2")
                          ? "active"
                          : ""
                      }`}
                    >
                      Admission In Stream 2
                    </Link>
                    <Link
                      href="/nios-admission/admission-in-nios-stream-3&4"
                      className={`mb-2 ${
                        isActive("/nios-admission/admission-in-nios-stream-3&4")
                          ? "active"
                          : ""
                      }`}
                    >
                      Admission In Stream 3 & 4
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/about-us"
                className={`nav-item ${isActive("/about-us") ? "active" : ""}`}
              >
                About Us
              </Link>

              {/* Subject List Dropdown */}
              <div
                className="nav-item dropdown"
                onMouseEnter={() => toggleDropdown("subjects")}
                onMouseLeave={() => toggleDropdown(null)}
              >
                <span className="dropdown-toggle">
                  Subject List <FiChevronDown className="arrow-icon" />
                </span>
                {openDropdown === "subjects" && (
                  <div className="dropdown-menu">
                    <Link
                      href="/subject/nios-10th-secondary"
                      className={`mb-2 ${
                        isActive("/subject/nios-10th-secondary")
                          ? "active"
                          : ""
                      }`}
                    >
                      Subject List Class 10th
                    </Link>

                    <Link
                      href="/subject/nios-12th-senior-secondary"
                      className={`mb-2 ${
                        isActive("/subject/nios-12th-senior-secondary")
                          ? "active"
                          : ""
                      }`}
                    >
                      Subject List Class 12th
                    </Link>

                    <Link
                      href="/subject/syllabus-class-10th"
                      className={`mb-2 ${
                        isActive("/subject/syllabus-class-10th")
                          ? "active"
                          : ""
                      }`}
                    >
                      Syllabus Class 10th
                    </Link>

                    <Link
                      href="/subject/syllabus-class-12th"
                      className={`mb-2 ${
                        isActive("/subject/syllabus-class-12th")
                          ? "active"
                          : ""
                      }`}
                    >
                      Syllabus Class 12th
                    </Link>

                    <Link
                      href="/subject/secondary-course-material"
                      className={`mb-2 ${
                        isActive("/subject/secondary-course-material")
                          ? "active"
                          : ""
                      }`}
                    >
                      Secondary Course Material
                    </Link>

                    <Link
                      href="/subject/sr-secondary-course-material"
                      className={`mb-2 ${
                        isActive("/subject/sr-secondary-course-material")
                          ? "active"
                          : ""
                      }`}
                    >
                      Sr Secondary Course Material
                    </Link>
                  </div>
                )}
              </div>

              {/* Question Papers Dropdown */}
              <div
                className="nav-item dropdown"
                onMouseEnter={() => toggleDropdown("papers")}
                onMouseLeave={() => toggleDropdown(null)}
              >
                <span className="dropdown-toggle">
                  Ques. Papers <FiChevronDown className="arrow-icon" />
                </span>
                {openDropdown === "papers" && (
                  <div className="dropdown-menu">
                    <Link
                      href="/question-papers/paper-secondary-10th"
                      className={`mb-2 ${
                        isActive("/question-papers/paper-secondary-10th")
                          ? "active"
                          : ""
                      }`}
                    >
                      Papers Secondary (10th)
                    </Link>
                    <Link
                      href="/question-papers/paper-secondary-12th"
                      className={`mb-2 ${
                        isActive("/question-papers/paper-secondary-12th")
                          ? "active"
                          : ""
                      }`}
                    >
                      Papers Senior Secondary (12th)
                    </Link>
                    <Link
                      href="/question-papers/tma-secondary-10th"
                      className={`mb-2 ${
                        isActive("/question-papers/tma-secondary-10th")
                          ? "active"
                          : ""
                      }`}
                    >
                      TMA Secondary 10th
                    </Link>
                    <Link
                      href="/question-papers/tma-sr-secondary-12th"
                      className={`mb-2 ${
                        isActive("/question-papers/tma-sr-secondary-12th")
                          ? "active"
                          : ""
                      }`}
                    >
                      TMA Sr. Secodary 12th
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/faq"
                className={`nav-item ${isActive("/faq") ? "active" : ""}`}
              >
                FAQ
              </Link>

              <Link
                href="/gallery"
                className={`nav-item ${isActive("/gallery") ? "active" : ""}`}
              >
                Gallery
              </Link>

              <Link
                href="/blogs"
                className={`nav-item ${isActive("/blogs") ? "active" : ""}`}
              >
                Blogs
              </Link>

              <Link
                href="/contact-us"
                className={`nav-item ${isActive("/contact-us") ? "active" : ""}`}
              >
                Contact Us
              </Link>
            </nav>

            <Link
              className="hamburger desktop-none"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
            >
              <img src="/assets/icons/burger.svg" alt="Burger Menu" />
            </Link>
          </div>
        </header>
      </div>

      {/* ===== Styled JSX (Dropdown styles only) ===== */}
      <style jsx>{`
        .dropdown-toggle:after {
          display: none !important;
        }
        .nav-item.dropdown {
          position: relative;
          display: inline-block;
          cursor: pointer;
          z-index: 1000;
        }

        .dropdown-toggle {
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .arrow-icon {
          font-size: 16px;
          transition: transform 0.3s ease;
        }

        .nav-item.dropdown:hover .arrow-icon {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: #ffffff;
          border-radius: 10px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          padding: 10px 15px;
          z-index: 100;
          animation: fadeIn 0.2s ease;
          width: fit-content;
          white-space: nowrap;
          width: max-content;
          min-width: 200px;
        }

        .dropdown-menu a {
          padding: 10px 16px;
          color: #111;
          text-decoration: none !important;
          font-size: 15px;
          transition: all 0.2s ease;
          margin-bottom: 15px !important;
        }

        .dropdown-menu a:hover {
          background-color: #f5f6ff;
          color: #111;
        }

        .nav-item.active,
        .dropdown-menu a.active {
          color: #0070f3;
          font-weight: 600;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
