import React from "react";
import Link from "next/link";
export default function Header() {
  return (
    <section className="header-area">
      <div className="container">
        <header className="header">
          <div className="header-content">
            <img
              src="/assets/images/logo.png"
              alt="SS Coaching Logo"
              className="logo"
            />
            <nav className="nav-menu">
              <a href="#" className="nav-item active">
                Home
              </a>
              <a href="#" className="nav-item">
                NIOS Admission
              </a>
              <a href="#" className="nav-item">
                About Us
              </a>
              <a href="#" className="nav-item">
                Subject List
              </a>
              <a href="#" className="nav-item">
                Ques. Papers
              </a>
              <a href="#" className="nav-item">
                FAQ
              </a>
      
   
              <a href="#" className="nav-item">
                Gallery
              </a>
              <a href="#" className="nav-item">
                Contact Us
              </a>
            </nav>
          


            
          <Link
            className="hamburger desktop-none"
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls=" offcanvasExample"
          >
           <img src="/assets/icons/burger.svg" alt="Burger Menu"></img>
          </Link>
          </div>
        </header>
      </div>
    </section>
  );
}
