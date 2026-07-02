"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiClipboard } from "react-icons/fi";
import { FiBell } from "react-icons/fi";
import { BsChevronDown, BsPlusCircle, BsListUl, BsPeople, BsCollection, BsShieldLock } from "react-icons/bs";
import { MdHistory, MdBarChart, MdNotifications } from "react-icons/md";

const FEATURE_PATHS = {
  blogs: "/dashboard/admin/blogs",
  faqs: "/dashboard/admin/faqs",
  leads: "/dashboard/admin/leads",
  "student-success": "/dashboard/admin/student-success",
  "online-classes": "/dashboard/admin/online-classes",
  students: "/dashboard/admin/students",
  courses: "/dashboard/admin/courses",
  admissions: "/dashboard/admin/admissions",
  announcements: "/dashboard/admin/announcements",
  invoices: "/dashboard/admin/invoices",
  enrollments: "/dashboard/admin/enrollments",
  analytics: "/dashboard/admin/analytics",
};

export default function Sidebar() {
  const pathname = usePathname();
  const [blogOpen, setBlogOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [sessionLoaded, setSessionLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me")
      .then(r => r.json())
      .then(data => {
        if (data.role) setSession(data);
      })
      .catch(() => {})
      .finally(() => setSessionLoaded(true));
  }, []);

  const isSuperAdmin = session?.role === "super";
  const isSubAdmin = session?.role === "sub";
  const permissions = session?.permissions || [];

  const canSee = (feature) => {
    if (isSuperAdmin) return true;
    if (isSubAdmin) return permissions.includes(feature);
    return false;
  };

  const styles = {
    sidebar: {
      position: "fixed",
      left: 0,
      top: 0,
      width: "16%",
      height: "100vh",
      backgroundColor: "#1B1B46",
      color: "#fff",
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      overflowX: "hidden",
      zIndex: 200,
    },
    divider: { borderColor: "#2a2a3d", margin: "0.5rem 0" },
    navList: { flexGrow: 1, listStyle: "none", paddingLeft: 0, margin: 0 },
    navItem: { marginBottom: "0.9rem" },
    navLink: (active = false) => ({
      color: active ? "#fff" : "#cfcfd1",
      display: "flex",
      alignItems: "center",
      padding: "0.6rem 0.8rem",
      borderRadius: "0.5rem",
      cursor: "pointer",
      fontWeight: 500,
      backgroundColor: active ? "#5641CE" : "transparent",
      transition: "all 0.3s",
      textDecoration: "none",
    }),
    subMenu: {
      marginTop: "0.3rem",
      marginLeft: "35px",
      paddingLeft: "0.5rem",
      animation: "slideDown 0.3s ease-out",
      listStyle: "none",
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
    arrow: {
      transition: "transform 0.3s",
      transform: blogOpen ? "rotate(180deg)" : "rotate(0deg)",
    },
    sectionLabel: {
      fontSize: "0.65rem",
      fontWeight: 700,
      color: "#4a4a6a",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      padding: "0.5rem 0.8rem 0.3rem",
      marginBottom: "0.2rem",
    },
    keyframes: `
      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
  };

  if (!sessionLoaded) {
    return <div style={styles.sidebar} />;
  }

  return (
    <div className="dashboard-sidebar0-area" style={styles.sidebar}>
      <style>{styles.keyframes}</style>
      <hr style={styles.divider} />

      <ul style={styles.navList}>

        {/* Dashboard — always visible */}
        <li style={styles.navItem}>
          <Link href="/dashboard" style={styles.navLink(pathname === "/dashboard")}>
            <img className="dashboard-icon" src="/assets/icons/dashboard.svg" alt="" /> Dashboard
          </Link>
        </li>

        {/* Analytics — super admin only */}
        {isSuperAdmin && (
          <li style={styles.navItem}>
            <Link href="/dashboard/admin/analytics" style={styles.navLink(pathname?.startsWith("/dashboard/admin/analytics"))}>
              <MdBarChart style={{ marginRight: "8px" }} size={18} /> Analytics
            </Link>
          </li>
        )}

        {/* Push Notifications */}
        {isSuperAdmin && (
          <li style={styles.navItem}>
            <Link href="/dashboard/admin/notifications" style={styles.navLink(pathname?.startsWith("/dashboard/admin/notifications"))}>
              <MdNotifications style={{ marginRight: "8px" }} size={18} /> Notifications
            </Link>
          </li>
        )}

        {/* Blogs — super admin or sub-admin with blogs permission */}
        {canSee("blogs") && (
          <li style={styles.navItem}>
            <div className="blogs-collapse" onClick={() => setBlogOpen(!blogOpen)} style={styles.navLink()}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <img src="/assets/icons/blog.svg" alt="" /> Blogs
              </span>
              <BsChevronDown style={styles.arrow} />
            </div>
            {blogOpen && (
              <ul style={styles.subMenu}>
                <li>
                  <Link href="/dashboard/admin/blogs" style={styles.subLink(pathname === "/dashboard/admin/blogs")}>
                    <BsListUl /> All Blogs
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/admin/blogs/create" style={styles.subLink(pathname === "/dashboard/admin/blogs/create")}>
                    <BsPlusCircle /> Add New Blog
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}

        {canSee("faqs") && (
          <li style={styles.navItem}>
            <Link href="/dashboard/admin/faqs" style={styles.navLink(pathname?.startsWith("/dashboard/admin/faqs"))}>
              <img src="/assets/icons/faq.svg" style={{ marginRight: "8px" }} alt="" /> FAQs
            </Link>
          </li>
        )}

        {canSee("leads") && (
          <li style={styles.navItem}>
            <Link href="/dashboard/admin/leads" style={styles.navLink(pathname?.startsWith("/dashboard/admin/leads"))}>
              <img src="/assets/icons/faq.svg" style={{ marginRight: "8px" }} alt="" /> Leads
            </Link>
          </li>
        )}

        {canSee("student-success") && (
          <li style={styles.navItem}>
            <Link href="/dashboard/admin/student-success" style={styles.navLink(pathname?.startsWith("/dashboard/admin/student-success"))}>
              <img src="/assets/icons/students.svg" style={{ marginRight: "8px" }} alt="" /> Students Success
            </Link>
          </li>
        )}

        {canSee("online-classes") && (
          <li style={styles.navItem}>
            <Link href="/dashboard/admin/online-classes" style={styles.navLink(pathname?.startsWith("/dashboard/admin/online-classes"))}>
              <img src="/assets/icons/videocall.svg" style={{ marginRight: "8px", width: "16px" }} alt="" /> Online Classes
            </Link>
          </li>
        )}

        {canSee("students") && (
          <li style={styles.navItem}>
            <Link href="/dashboard/admin/students" style={styles.navLink(pathname?.startsWith("/dashboard/admin/students"))}>
              <BsPeople style={{ marginRight: "8px" }} size={18} /> Students
            </Link>
          </li>
        )}

        {canSee("courses") && (
          <li style={styles.navItem}>
            <Link href="/dashboard/admin/courses" style={styles.navLink(pathname?.startsWith("/dashboard/admin/courses"))}>
              <BsCollection style={{ marginRight: "8px" }} size={18} /> Courses
            </Link>
          </li>
        )}

        {canSee("admissions") && (
          <li style={styles.navItem}>
            <Link href="/dashboard/admin/admissions" style={styles.navLink(pathname?.startsWith("/dashboard/admin/admissions"))}>
              <FiClipboard style={{ marginRight: "8px", fontSize: "16px" }} /> Applications
            </Link>
          </li>
        )}

        {canSee("announcements") && (
          <li style={styles.navItem}>
            <Link href="/dashboard/admin/announcements" style={styles.navLink(pathname?.startsWith("/dashboard/admin/announcements"))}>
              <FiBell style={{ marginRight: "8px", fontSize: "16px" }} /> Announcements
            </Link>
          </li>
        )}

        {canSee("invoices") && (
          <li style={styles.navItem}>
            <Link href="/dashboard/admin/invoices" style={styles.navLink(pathname?.startsWith("/dashboard/admin/invoices"))}>
              <span style={{ marginRight: "8px", fontSize: "15px" }}>🧾</span> Invoices
            </Link>
          </li>
        )}

        {canSee("enrollments") && (
          <li style={styles.navItem}>
            <Link href="/dashboard/admin/enrollments" style={styles.navLink(pathname?.startsWith("/dashboard/admin/enrollments"))}>
              <span style={{ marginRight: "8px", fontSize: "15px" }}>📋</span> Enrollments
            </Link>
          </li>
        )}

        {/* Super Admin Only Section */}
        {isSuperAdmin && (
          <>
            <li style={{ margin: "1rem 0 0.2rem" }}>
              <div style={styles.sectionLabel}>Super Admin</div>
            </li>
            <li style={styles.navItem}>
              <Link href="/dashboard/admin/sub-admins" style={styles.navLink(pathname?.startsWith("/dashboard/admin/sub-admins"))}>
                <BsShieldLock style={{ marginRight: "8px" }} size={16} /> Sub-Admins
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link href="/dashboard/admin/activity-logs" style={styles.navLink(pathname?.startsWith("/dashboard/admin/activity-logs"))}>
                <MdHistory style={{ marginRight: "8px" }} size={16} /> Activity Logs
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link href="/dashboard/admin/live-monitor" style={styles.navLink(pathname?.startsWith("/dashboard/admin/live-monitor"))}>
                <span style={{ marginRight: "8px", fontSize: "15px" }}>📡</span> Live Monitor
              </Link>
            </li>
          </>
        )}

        {/* Sub-Admin logout option */}
        {isSubAdmin && (
          <li style={{ marginTop: "auto", paddingTop: "1rem" }}>
            <button
              onClick={async () => {
                await fetch("/api/subadmin/logout", { method: "POST" });
                window.location.href = "/dashboard/subadmin/login";
              }}
              style={{ ...styles.navLink(), width: "100%", border: "none", cursor: "pointer", background: "rgba(239,68,68,0.1)", color: "#fca5a5" }}>
              <span style={{ marginRight: "8px" }}>🔓</span> Logout
            </button>
          </li>
        )}

      </ul>
    </div>
  );
}
