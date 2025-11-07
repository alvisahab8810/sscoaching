"use client";
import React from "react";
import Link from "next/link";

export default function Topbar() {
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
              className="hamburger desktop-none "
              data-bs-toggle="offcanvas"
              data-bs-target="#adminOffcanvas"
              href="#adminOffcanvasLabel"
              role="button"
               aria-controls="adminOffcanvas"
            >
              <img src="/assets/icons/burger.svg" alt="Burger Menu" />
            </Link>

              

        {/* <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="/assets/icons/user.svg"
              alt="mdo"
              width="32"
              height="32"
              className="rounded-circle me-1"
            />
            Admin
        
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="userDropdown"
          >
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Logout
              </a>
            </li>
          </ul>
        </div> */}

        {/* User Dropdown */}
        <div className="dropdown user-dropdown mobile-none">
          <a
            href="#"
            className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="/assets/icons/user.svg"
              alt="mdo"
              width="32"
              height="32"
              className="rounded-circle me-1"
            />
            <span>Admin</span>
          </a>

          <ul
            className="dropdown-menu dropdown-menu-end user-menu"
            aria-labelledby="userDropdown"
          >
            <li className="user-header d-flex align-items-center">
              <img
                src="/assets/icons/user.svg"
                alt="mdo"
                width="50"
                height="50 "
                className="rounded-circle me-1"
              />
              <div className="user-info">
                <h6 className="mb-0">Admin User</h6>
                <small className="text-muted">System Administrator</small>
              </div>
            </li>

            {/* <li><hr className="dropdown-divider" /></li> */}

            <li className="mb-2 mt-2 pt-2">
              <a className="dropdown-item user-item d-flex" href="#">
                <img src="/assets/icons/avtar.svg" className="me-2"></img>{" "}
                Profile
              </a>
            </li>
            {/* <li>
                <a className="dropdown-item user-item" href="#">
                  <i className="bi bi-lock me-2"></i> Change password
                </a>
              </li> */}

            <li className="pb-2">
              <a className="dropdown-item user-item d-flex" href="#">
                <img src="/assets/icons/logout.svg" className="me-2"></img>{" "}
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
   </div>
  );
}
