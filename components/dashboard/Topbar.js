"use client";
import React from "react";
import Link from "next/link";

export default function Topbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <div className="container-fluid">
        {/* <span className="navbar-brand fw-bold text-primary">Dashboard</span> */}
          <Link href="/dashboard" >
        <img src="/assets/images/logo.png" alt="SS Coaching Logo" width={200} />
      </Link>


        {/* <form className="d-none d-md-flex ms-auto me-3">
          <input
            className="form-control form-control-sm"
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />
        </form> */}

        <div className="dropdown">
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
            {/* <strong></strong> */}
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
        </div>
      </div>
    </nav>
  );
}
