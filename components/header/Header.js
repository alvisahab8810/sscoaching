// import React from "react";
// import Link from "next/link";
// export default function Header() {
//   return (
//     <section className="header-area">
//       <div className="container">
//         <header className="header">
//           <div className="header-content">
//             <img
//               src="/assets/images/logo.png"
//               alt="SS Coaching Logo"
//               className="logo"
//             />
//             <nav className="nav-menu">
//               <a href="#" className="nav-item active">
//                 Home
//               </a>
//               <a href="#" className="nav-item">
//                 NIOS Admission
//               </a>
//               <a href="#" className="nav-item">
//                 About Us
//               </a>
//               <a href="#" className="nav-item">
//                 Subject List
//               </a>
//               <a href="#" className="nav-item">
//                 Ques. Papers
//               </a>
//               <a href="#" className="nav-item">
//                 FAQ
//               </a>
      
   
//               <a href="#" className="nav-item">
//                 Gallery
//               </a>
//               <a href="#" className="nav-item">
//                 Contact Us
//               </a>
//             </nav>
          


            
//           <Link
//             className="hamburger desktop-none"
//             data-bs-toggle="offcanvas"
//             href="#offcanvasExample"
//             role="button"
//             aria-controls=" offcanvasExample"
//           >
//            <img src="/assets/icons/burger.svg" alt="Burger Menu"></img>
//           </Link>
//           </div>
//         </header>
//       </div>
//     </section>
//   );
// }




import React, { useState } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi"; // dropdown arrow icon

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <section className="header-area">
      <div className="container">
        <header className="header">
          <div className="header-content">
           <Link href="/"> <img
              src="/assets/images/logo.png"
              alt="SS Coaching Logo"
              className="logo"
            /></Link>

            <nav className="nav-menu">
              <a href="/" className="nav-item active">
                Home
              </a>
              <a href="#" className="nav-item">
                NIOS Admission
              </a>
              <a href="#" className="nav-item">
                About Us
              </a>

              {/* Subject List Dropdown */}
              <div
                className="nav-item dropdown"
                onMouseEnter={() => toggleDropdown("subjects")}
                onMouseLeave={() => toggleDropdown(null)}
              >
                <span className="dropdown-toggle">
                  Subject List <FiChevronDown className="arrow-icon" />
                </span>
                {openDropdown  === "subjects" && (
                  <div className="dropdown-menu">
                    <Link href="/subject/syllabus-class-10th" className="mb-2">Syllabus Class 10th </Link>
                    <Link href="/subject/syllabus-class-12th" className="mb-2">Syllabus Class 12th </Link>
                    <Link href="/subject/secondary-course-material" className="mb-2">Secondary Course Material</Link>
                    <Link href="/subject/sr-secondary-course-material" className="mb-2">Sr Secondary Course Material</Link>
                    
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
                    <Link href="/question-papers/paper-secondary-10th" className="mb-2">Papers Secondary (10th)</Link>
                    <Link href="/question-papers/paper-secondary-12th" className="mb-2">Papers Senior Secondary (12th)</Link>
                    <Link href="/question-papers/tma-secondary-10th" className="mb-2">TMA Secondary 10th </Link>
                    <Link href="/question-papers/tma-sr-secondary-12th" className="mb-2">TMA Sr. Secodary 12th</Link>
                  </div>
                )}
              </div>

              <a href="/faq" className="nav-item">
                FAQ
              </a>
              <a href="/gallery" className="nav-item">
                Gallery
              </a>
               <a href="/blogs" className="nav-item">
                Blogs
              </a>
              <a href="/contact-us" className="nav-item">
                Contact Us
              </a>
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

      .dropdown-toggle:after{
      display:none!important;
      }
        .nav-item.dropdown {
          position: relative;
          display: inline-block;
          cursor: pointer;
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
          // min-width: 250px;
          z-index: 100;
          animation: fadeIn 0.2s ease;
          width:fit-content;

             white-space: nowrap; /* prevent breaking lines */
          width: max-content; /* fit to content width */
          min-width: 200px; /* ensure consistent min width */

        }

        .dropdown-menu a {
          padding: 10px 16px;
          color: #111;
          text-decoration: none!important;
          font-size: 15px;
          transition: all 0.2s ease;
          margin-bottom:15px!important;
          
        }

        .dropdown-menu a:hover {
          background-color: #f5f6ff;
          color: #111;
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
