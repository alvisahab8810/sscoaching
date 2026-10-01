
import { withAdminAuth } from "@/lib/withAdminAuth";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import Footer from "@/components/footer/Footer";
import Head from "next/head";
import Header from "@/components/header/Header";
import { FaUser, FaCalendarAlt } from "react-icons/fa"; // React Icons
import RegistrationForm from "@/components/home/RegistrationForm";
import Popup from "@/components/home/Popup";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";

const SITE_URL = "https://sscoaching.in";

export default function Blogs({ initialBlogs = [], initialTotalPages = 1 }) {
  // ✅ Page 1 aata hai server se (getStaticProps), isliye pehle render mein hi
  // blog cards HTML mein hote hain — "Loading blogs..." nahi.
  const [blogs, setBlogs] = useState(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);


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
      setError("");
    } else {
      setError(data.message || "Failed to fetch blogs");
      toast.error(data.message || "Failed to fetch blogs");
    }
  } catch (err) {
    setError("Could not connect to server. Please try again.");
    toast.error("Server error while fetching blogs");
  } finally {
    setLoading(false); // ✅ STOP loading
  }
};


const didMount = useRef(false);
useEffect(() => {
  // Pehla render SSR data use karta hai; sirf page badalne par fetch karo.
  if (!didMount.current) {
    didMount.current = true;
    return;
  }
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
      <Head>
        <title>NIOS Blogs & Latest Updates | SS Coaching Lucknow</title>
        <meta name="description" content="Read the latest NIOS news, admission updates, exam datesheets and study tips from SS Coaching, the leading NIOS coaching centre in Lucknow since 2001." />
        <link rel="canonical" href={`${SITE_URL}/blogs`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NIOS Blogs & Latest Updates | SS Coaching Lucknow" />
        <meta property="og:description" content="Read the latest NIOS news, admission updates, exam datesheets and study tips from SS Coaching, the leading NIOS coaching centre in Lucknow since 2001." />
        <meta property="og:url" content={`${SITE_URL}/blogs`} />
      </Head>

      <Header />
       <Offcanvas />
              <BranchContactCanvas/>
      
      <div className="container py-5">
        <h1 className="mb-2 blogs-page-heading">NIOS Blogs &amp; Latest Updates</h1>
        <p className="text-muted mb-4">
          NIOS admission news, exam datesheets, result updates and study
          guidance from the SS Coaching team.
        </p>
        {loading ? (
          <p>Loading blogs...</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : blogs.length === 0 ? (
          <p>No blogs published yet.</p>
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
                            {(() => {
                              const text = blog.shortDescription || blog.content || "";
                              return text.length > 120 ? text.slice(0, 120) + "..." : text;
                            })()}
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

// ✅ Pehla page server par render hota hai, taaki Googlebot aur AI crawlers ko
// raw HTML mein hi blog list mile ("Loading blogs..." ke bajaye).
export async function getStaticProps() {
  try {
    const { default: dbConnect } = await import("@/lib/dbConnect");
    const { default: Blog } = await import("@/models/Blog");

    await dbConnect();

    const filter = { status: "published" };
    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .select("-content")
      .limit(10)
      .sort({ publishDate: -1 })
      .lean();

    return {
      props: {
        initialBlogs: JSON.parse(JSON.stringify(blogs)),
        initialTotalPages: Math.max(1, Math.ceil(total / 10)),
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("getStaticProps blogs list error:", err.message);
    return { props: { initialBlogs: [], initialTotalPages: 1 }, revalidate: 60 };
  }
}
