"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const [session, setSession] = useState(null);
  const pathname = usePathname();
  const heartbeatRef = useRef(null);

  useEffect(() => {
    fetch("/api/admin/me")
      .then(r => r.json())
      .then(data => { if (data.role) setSession(data); })
      .catch(() => {});
  }, []);

  // Sub-admin heartbeat — sends current page every 30s
  useEffect(() => {
    if (!session || session.role !== "sub") return;

    const sendHeartbeat = () => {
      fetch("/api/subadmin/heartbeat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: pathname }),
        keepalive: true,
      }).catch(() => {});
    };

    sendHeartbeat(); // immediate on page change
    heartbeatRef.current = setInterval(sendHeartbeat, 30000);
    return () => clearInterval(heartbeatRef.current);
  }, [session, pathname]);

  const displayName = session?.role === "sub" ? session.name : "Admin";
  const displayRole = session?.role === "sub" ? "Sub-Admin" : "System Administrator";
  const displayInitial = displayName.charAt(0).toUpperCase();

  const logout = async () => {
    if (session?.role === "sub") {
      await fetch("/api/subadmin/logout", { method: "POST" });
      window.location.href = "/dashboard/subadmin/login";
    } else {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/dashboard/admin/login";
    }
  };

  return (
    <div className="dashboard-navbar">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <div className="container-fluid">
          <Link href="/dashboard">
            <img
              className="dashboard-logo"
              src="/assets/images/logo.png"
              alt="SS Coaching Logo"
              width={200}
            />
          </Link>

          <Link
            className="hamburger desktop-none"
            data-bs-toggle="offcanvas"
            data-bs-target="#adminOffcanvas"
            href="#adminOffcanvasLabel"
            role="button"
            aria-controls="adminOffcanvas"
          >
            <img src="/assets/icons/burger.svg" alt="Burger Menu" />
          </Link>

          {/* User Dropdown */}
          <div className="dropdown user-dropdown mobile-none">
            <a
              href="#"
              className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div style={{
                width: 32, height: 32, borderRadius: "50%", background: "#5641CE",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "0.85rem", marginRight: 6, flexShrink: 0,
              }}>
                {displayInitial}
              </div>
              <span>{displayName}</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end user-menu" aria-labelledby="userDropdown">
              <li className="user-header d-flex align-items-center">
                <div style={{
                  width: 50, height: 50, borderRadius: "50%", background: "#5641CE",
                  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "1.2rem", marginRight: 8, flexShrink: 0,
                }}>
                  {displayInitial}
                </div>
                <div className="user-info">
                  <h6 className="mb-0">{displayName}</h6>
                  <small className="text-muted">{displayRole}</small>
                </div>
              </li>

              <li className="mb-2 mt-2 pt-2">
                <a className="dropdown-item user-item d-flex" href="#">
                  <img src="/assets/icons/avtar.svg" className="me-2" alt="" /> Profile
                </a>
              </li>

              <li className="pb-2">
                <a className="dropdown-item user-item d-flex" href="#" onClick={logout}>
                  <img src="/assets/icons/logout.svg" className="me-2" alt="" /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
