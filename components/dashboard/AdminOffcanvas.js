"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  BsChevronDown,
  BsChevronUp,
  BsListUl,
  BsPlusCircle
} from "react-icons/bs";

export default function AdminOffcanvas() {
  const router = useRouter();
  const pathname = usePathname();
  const [blogOpen, setBlogOpen] = useState(false);

  // ✅ Ensure Bootstrap JS is available from your npm install
  useEffect(() => {
    if (typeof window !== "undefined" && !window.bootstrap) {
      import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bs) => {
        window.bootstrap = bs.default || bs;
      });
    }
  }, []);

  const handleNavigate = (path) => {
    const offcanvasEl = document.getElementById("adminOffcanvas");
    if (offcanvasEl && window.bootstrap) {
      const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
      bsOffcanvas?.hide();
    }
    router.push(path);
  };

  return (
    <>
      <div
        className="offcanvas mob-canvas offcanvas-start admin-offcanvas"
        tabIndex="-1"
        id="adminOffcanvas"
        aria-labelledby="adminOffcanvasLabel"
      >
        {/* Header */}
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title text-dark fw-semibold" id="adminOffcanvasLabel">
            <Link
              href="/dashboard"
              className="d-flex align-items-center text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate("/dashboard");
              }}
            >
              <img
                src="/assets/images/logo.png"
                alt="Admin Logo"
                style={{ width: "120px", height: "auto" }}
              />
            </Link>
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        {/* Sidebar fields (same as desktop sidebar) */}
        <div className="offcanvas-body p-0">
          <nav className="p-3">
            <ul className="list-unstyled mb-0">
              {/* Dashboard */}
              <li className="mb-3">
                <button
                  onClick={() => handleNavigate("/dashboard")}
                  className={`btn w-100 d-flex align-items-center text-start fw-medium ${
                    pathname === "/dashboard" ? "text-white" : "text-dark"
                  }`}
                  style={{
                    backgroundColor:
                      pathname === "/dashboard" ? "#5641CE" : "transparent",
                    border: "none",
                    borderRadius: "0.5rem",
                    padding: "0.6rem 0.8rem"
                  }}
                >
                  <img
                    src="/assets/icons/dashboard.svg"
                    className="me-2"
                    width="18"
                    alt="Dashboard"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                  Dashboard
                </button>
              </li>

              {/* Blogs Dropdown */}
              <li className="mb-3">
                <button
                  className="btn w-100 d-flex align-items-center justify-content-between text-start text-white fw-medium"
                  onClick={() => setBlogOpen(!blogOpen)}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "0.6rem 0.8rem"
                  }}
                >
                  <span className="d-flex align-items-center">
                    <img
                      src="/assets/icons/blog.svg"
                      className="me-2"
                      width="18"
                      alt="Blogs"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                    Blogs
                  </span>
                  {blogOpen ? <BsChevronUp /> : <BsChevronDown />}
                </button>

                {blogOpen && (
                  <ul className="list-unstyled ps-4 mt-1">
                    <li className="mb-2">
                      <button
                        onClick={() => handleNavigate("/dashboard/admin/blogs")}
                        className={`btn text-start w-100 text-white d-flex align-items-center ${
                          pathname === "/dashboard/admin/blogs"
                            ? "text-white"
                            : "text-dark"
                        }`}
                        style={{
                          background: "transparent",
                          border: "none",
                          fontSize: "0.9rem"
                        }}
                      >
                        <BsListUl className="me-2" /> All Blogs
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          handleNavigate("/dashboard/admin/blogs/create")
                        }
                        className={`btn text-start text-white w-100 d-flex align-items-center ${
                          pathname === "/dashboard/admin/blogs/create"
                            ? "text-white"
                            : "text-dark"
                        }`}
                        style={{
                          background: "transparent",
                          border: "none",
                          fontSize: "0.9rem"
                        }}
                      >
                        <BsPlusCircle className="me-2" /> Add New Blog
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* FAQs */}
              <li className="mb-3">
                <button
                  onClick={() => handleNavigate("/dashboard/admin/faqs")}
                  className={`btn w-100 d-flex align-items-center text-white text-start fw-medium ${
                    pathname === "/dashboard/admin/faqs"
                      ? "text-white"
                      : "text-dark"
                  }`}
                  style={{
                    backgroundColor:
                      pathname === "/dashboard/admin/faqs"
                        ? "#5641CE"
                        : "transparent",
                    border: "none",
                    borderRadius: "0.5rem",
                    padding: "0.6rem 0.8rem"
                  }}
                >
                  <img
                    src="/assets/icons/faq.svg"
                    className="me-2"
                    width="18"
                    alt="FAQs"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                  FAQs
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
