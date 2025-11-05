// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { toast } from "sonner";
// import Footer from "@/components/footer/Footer";
// import Head from "next/head";
// import Header from "@/components/header/Header";

// export default function Blogs() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await fetch("/api/blogs/getAll?status=published");
//         const data = await res.json();
//         if (data.success) {
//           setBlogs(data.data);
//         } else {
//           toast.error(data.message || "Failed to fetch blogs");
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Server error while fetching blogs");
//       }
//       setLoading(false);
//     };

//     fetchBlogs();
//   }, []);

//   return (
//     <div>
//         <Header/>
//       <div className="container py-5">
//         <h2 className="mb-4">Our Blogs</h2>
//         {loading ? (
//           <p>Loading blogs...</p>
//         ) : blogs.length === 0 ? (
//           <p>No blogs found.</p>
//         ) : (
//           <div className="row">
//             {blogs.map((blog) => (
//               <div key={blog._id} className="col-md-4 mb-4">
//                 <div className="card h-100">
//                   {blog.coverImage && (
//                     <img
//                       src={blog.coverImage}
//                       className="card-img-top"
//                       alt={blog.title}
//                       style={{ height: "250px", objectFit: "cover" }}
//                     />
//                   )}
//                   <div className="card-body d-flex flex-column">
//                     <h5 className="card-title">{blog.title}</h5>
//                     {/* <p className="card-text flex-grow-1">
//                       {blog.shortDescription ||
//                         blog.content.slice(0, 100) + "..."}
//                     </p> */}

//                     <p className="card-text flex-grow-1">
//                         {blog.shortDescription
//                             ? blog.shortDescription.length > 120
//                             ? blog.shortDescription.slice(0, 120) + "..."
//                             : blog.shortDescription
//                             : blog.content.length > 120
//                             ? blog.content.slice(0, 120) + "..."
//                             : blog.content}
//                         </p>

//                     <Link
//                       href={`/blogs/${blog.slug}`}
//                       className="btn btn-primary mt-2"
//                     >
//                       Read More
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }

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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs/getAll?status=published");
        const data = await res.json();
        if (data.success) {
          setBlogs(data.data);
        } else {
          toast.error(data.message || "Failed to fetch blogs");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error while fetching blogs");
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

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
      </div>
      <Footer />
      <Popup/>
    </div>
  );
}
