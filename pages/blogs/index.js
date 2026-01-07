import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import Footer from "@/components/footer/Footer";
import Head from "next/head";
import Header from "@/components/header/Header";
import { FaUser, FaCalendarAlt } from "react-icons/fa"; // React Icons
import RegistrationForm from "@/components/home/RegistrationForm";
import Popup from "@/components/home/Popup";
import Offcanvas from "@/components/header/Offcanvas";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const fetchBlogs = async (currentPage = 1) => {
  try {
    setLoading(true); // ✅ START loading

    const res = await fetch(
      `/api/blogs/getAll?status=published&page=${currentPage}&limit=10`,
      { cache: "no-store" }
    );

    const data = await res.json();

    if (data.success) {
      setBlogs(data.data);
      setTotalPages(data.pagination.totalPages);
    } else {
      toast.error(data.message || "Failed to fetch blogs");
    }
  } catch (err) {
    toast.error("Server error while fetching blogs");
  } finally {
    setLoading(false); // ✅ STOP loading
  }
};


useEffect(() => {
  fetchBlogs(page);
}, [page]);



const getPaginationNumbers = () => {
  const pages = [];
  const maxVisible = 6; // how many numbers to show
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  // First page
  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("...");
  }

  // Middle pages
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Last page
  if (end < totalPages) {
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }

  return pages;
};


  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const res = await fetch("/api/blogs/getAll?status=published");
  //       const data = await res.json();
  //       if (data.success) {
  //         setBlogs(data.data);
  //       } else {
  //         toast.error(data.message || "Failed to fetch blogs");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       toast.error("Server error while fetching blogs");
  //     }
  //     setLoading(false);
  //   };

  //   fetchBlogs();
  // }, []);

  return (
    <div className="blogs-list-area">
      <Header />
       <Offcanvas />
      
      <div className="container py-5">
        {/* <h2 className="mb-4">Our Blogs</h2> */}
        {loading ? (
          <p>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <div className="row">
            <div className="col-md-8">
              <div className="row blogs-list">
                {blogs.map((blog) => (
                  <div key={blog._id} className="col-md-6 mb-4">
                    <Link href={`/blogs/${blog.slug}`}>
                      <div className="card h-100">
                        {blog.coverImage && (
                          <img
                            src={blog.coverImage}
                            className="card-img-top"
                            alt={blog.title}
                            style={{ height: "225px", objectFit: "cover" }}
                          />
                        )}
                        <div className="card-body d-flex flex-column">
                          {/* Author & Date */}
                          <div
                            className="mb-2 text-muted d-flex gap-3 align-items-center"
                            style={{ fontSize: "0.9rem" }}
                          >
                            <span className="author-icons d-flex align-items-center gap-1">
                              <FaUser /> {blog.authorName || "SS Coaching Team"}
                            </span>
                            <span className="author-icons d-flex align-items-center gap-1">
                              <FaCalendarAlt />{" "}
                              {new Date(blog.publishDate).toLocaleDateString(
                                "en-US",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <h5 className="card-title">{blog.title}</h5>

                          {/* Short description / truncated content */}
                          <p className="card-text flex-grow-1 mb-0">
                            {blog.shortDescription
                              ? blog.shortDescription.length > 120
                                ? blog.shortDescription.slice(0, 120) + "..."
                                : blog.shortDescription
                              : blog.content.length > 120
                              ? blog.content.slice(0, 120) + "..."
                              : blog.content}
                          </p>

                          {/* <Link
                              href={`/blogs/${blog.slug}`}
                              className="btn btn-primary mt-2"
                            >
                              Read More
                            </Link> */}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-md-4">
              <RegistrationForm />
            </div>
          </div>
        )}

      
<div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">

  {/* Previous */}
  <button
    className="btn btn-outline-primary"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Prev
  </button>

  {/* Page numbers */}
  {getPaginationNumbers().map((p, index) =>
    p === "..." ? (
      <span key={index} className="px-2">…</span>
    ) : (
      <button
        key={index}
        className={`btn ${
          page === p ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => setPage(p)}
      >
        {p}
      </button>
    )
  )}

  {/* Next */}
  <button
    className="btn btn-outline-primary"
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>
</div>

      </div>
      <Footer />
      <Popup/>
    </div>
  );
}
