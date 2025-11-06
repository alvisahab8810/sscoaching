// "use client";
// import React from "react";
// import Link from "next/link";

// export default function Sidebar() {
//   return (
//     <div
//       className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
//       style={{ width: "250px" }}
//     >
//       <Link
//         href="/dashboard"
//         className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none bg-white p-1  rounded-2"
//       >
//         {/* <span className="fs-4 fw-bold">Admin Panel</span> */}
//        <img src="/assets/images/logo.png" alt="SS Coaching Logo" className="jsx-b937f6ceae75188c logo" />
//       </Link>
//       <hr />
//       <ul className="nav nav-pills flex-column mb-auto">
//         <li className="nav-item">
//           <Link href="/dashboard" className="nav-link active text-white">
//             <i className="bi bi-speedometer2 me-2"></i> Dashboard
//           </Link>
//         </li>
//         <li>
//           <Link href="/dashboard/admin/blogs/create" className="nav-link text-white">
//             <i className="bi bi-journal-text me-2"></i> Blogs
//           </Link>
//         </li>
//         <li>
//           <Link href="#" className="nav-link text-white">
//             <i className="bi bi-people me-2"></i> Users
//           </Link>
//         </li>
//         <li>
//           <Link href="#" className="nav-link text-white">
//             <i className="bi bi-gear me-2"></i> Settings
//           </Link>
//         </li>
//       </ul>
//       <hr />
//       <div className="dropdown">
//         <a
//           href="#"
//           className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
//           id="dropdownUser1"
//           data-bs-toggle="dropdown"
//           aria-expanded="false"
//         >
//           <img
//             src="https://via.placeholder.com/32"
//             alt=""
//             width="32"
//             height="32"
//             className="rounded-circle me-2"
//           />
//           <strong>Admin</strong>
//         </a>
//         <ul
//           className="dropdown-menu dropdown-menu-dark text-small shadow"
//           aria-labelledby="dropdownUser1"
//         >
//           <li>
//             <Link className="dropdown-item" href="/dashboard/profile">
//               Profile
//             </Link>
//           </li>
//           <li>
//             <hr className="dropdown-divider" />
//           </li>
//           <li>
//             <a className="dropdown-item" href="#">
//               Sign out
//             </a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }







"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsChevronDown, BsChevronUp, BsFolder, BsPlusCircle, BsListUl, BsPeople, BsGear } from "react-icons/bs";

export default function Sidebar() {
  const pathname = usePathname();
  const [blogOpen, setBlogOpen] = useState(false);

  const styles = {
    sidebar: {
      width: "250px",
      minHeight: "100vh",
      backgroundColor: "#1B1B46",
      color: "#fff",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
    },
    logoLink: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "1rem",
    },
    logo: {
      width: "80%",
      height: "auto",
      background: "white",
      borderRadius: "5px",
      padding: "10px"
    },
    divider: {
      borderColor: "#2a2a3d",
      margin: "0.5rem 0",
    },
    navList: {
      flexGrow: 1,
      listStyle: "none",
      paddingLeft: 0,
      margin: 0,
    },
    navItem: {
      marginBottom: "0.9rem",
    },
    navLink: (active = false) => ({
      color: active ? "#fff" : "#cfcfd1",
      display: "flex",
      // justifyContent: "space-between",
      alignItems: "center",
      padding: "0.6rem 0.8rem",
      borderRadius: "0.5rem",
      cursor: "pointer",
      fontWeight: 500,
      backgroundColor: active ? "#5641CE" : "transparent",
      transition: "all 0.3s",
    }),
    navLinkHover: {
      backgroundColor: "#343454",
      color: "#fff",
    },
    icon: {
      marginRight: "0.5rem",
    },
    subMenu: {
      marginTop: "0.3rem",
      marginLeft: "35px",
      // borderLeft: "2px solid ##5641CE",
      paddingLeft: "0.5rem",
      animation: "slideDown 0.3s ease-out",
      listStyle: "none"
    },
    subLink: (active = false) => ({
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: active ? "#fff" : "#cfcfd1",
      padding: "0.4rem 0",
      fontSize: "0.9rem",
      textDecoration: "none",
    }),
    userDropdown: {
      marginTop: "auto",
    },
    userLink: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "#cfcfd1",
      textDecoration: "none",
    },
    arrow: {
      transition: "transform 0.3s",
      transform: blogOpen ? "rotate(180deg)" : "rotate(0deg)",
    },

    keyframes: `
      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
  };

  return (
    <div className="dashboard-sidebar0-area" style={styles.sidebar}>
      <style>{styles.keyframes}</style>
    
      <hr style={styles.divider} />

      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link href="/dashboard" style={styles.navLink(pathname === "/dashboard")}>
             <img className="dashboard-icon" src="/assets/icons/dashboard.svg"/>  Dashboard
          </Link>
        </li>

        {/* Blogs Collapse */}
        <li style={styles.navItem}>
          <div
            className="blogs-collapse"
            onClick={() => setBlogOpen(!blogOpen)}
            style={styles.navLink()}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <img src="/assets/icons/blog.svg"></img> Blogs
            </span>
            <BsChevronDown style={styles.arrow} />
          </div>

          {blogOpen && (
            <ul style={styles.subMenu}>
              <li>
                <Link
                  href="/dashboard/admin/blogs"
                  style={styles.subLink(pathname === "/dashboard/admin/blogs")}
                >
                  <BsListUl style={styles.icon} /> All Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/admin/blogs/create"
                  style={styles.subLink(pathname === "/dashboard/admin/blogs/create")}
                >
                  <BsPlusCircle style={styles.icon} /> Add New Blog
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li style={styles.navItem}>
          <Link href="/dashboard/admin/faqs" style={styles.navLink()}>
             <img src="/assets/icons/faq.svg" style={{marginRight:"8px"}}></img> FAQs
          </Link>
        </li>
{/* 
        <li style={styles.navItem}>
          <Link href="#" style={styles.navLink()}>
            <BsGear style={styles.icon} /> Settings
          </Link>
        </li> */}
      </ul>

      <hr style={styles.divider} />

      <div style={styles.userDropdown}>
        <a href="#!" style={styles.userLink}>
          <img
            src="https://via.placeholder.com/32"
            alt="Admin"
            width="32"
            height="32"
            className="rounded-circle"
          />
          <strong>Admin</strong>
        </a>
      </div>
    </div>
  );
}
