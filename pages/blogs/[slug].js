// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { toast } from "sonner";
// import Header from "@/components/header/Header";
// import Footer from "@/components/footer/Footer";
// import { FaUser, FaCalendarAlt } from "react-icons/fa";

// export default function BlogDetail() {
//   const router = useRouter();
//   const { slug } = router.query;
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!slug) return;

//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`/api/blogs/getBySlug?slug=${slug}`);
//         const data = await res.json();
//         if (data.success) {
//           setBlog(data.blog);
//         } else {
//           toast.error(data.message || "Blog not found");
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Server error while fetching blog");
//       }
//       setLoading(false);
//     };

//     fetchBlog();
//   }, [slug]);

//   if (loading) return <p className="text-center py-5">Loading...</p>;
//   if (!blog) return <p className="text-center py-5">Blog not found.</p>;

//   return (
//     <div>
//       <Header />
//       <div className="container py-5">
//         <h1 className="mb-3">{blog.title}</h1>
//         <p
//           className="text-muted mb-4 d-flex gap-3 align-items-center"
//           style={{ fontSize: "0.9rem" }}
//         >
//           <span className="d-flex align-items-center gap-1">
//             <FaUser /> {blog.authorName || "Admin"}
//           </span>
//           <span className="d-flex align-items-center gap-1">
//             <FaCalendarAlt />{" "}
//             {new Date(blog.publishDate).toLocaleDateString("en-US", {
//               day: "2-digit",
//               month: "short",
//               year: "numeric",
//             })}
//           </span>
//         </p>
//         {blog.coverImage && (
//           <img
//             src={blog.coverImage}
//             alt={blog.title}
//             className="img-fluid mb-4"
//             style={{ maxHeight: "600px", objectFit: "cover", width: "100%" }}
//           />
//         )}
//         <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//       </div>
//       <Footer />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import Head from "next/head";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { FaUser, FaCalendarAlt, FaTag, FaFolder } from "react-icons/fa";
import Link from "next/link";

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/getBySlug?slug=${slug}`);
        const data = await res.json();
        if (data.success) {
          setBlog(data.blog);

          // Fetch related posts (same category, excluding current post)
          if (data.blog.category) {
            const relRes = await fetch(
              `/api/blogs/getAll?status=published&category=${data.blog.category}`
            );
            const relData = await relRes.json();
            if (relData.success) {
              setRelatedBlogs(
                relData.data.filter((b) => b._id !== data.blog._id).slice(0, 3)
              ); // show max 3 related
            }
          }
        } else {
          toast.error(data.message || "Blog not found");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error while fetching blog");
      }
      setLoading(false);
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <p className="text-center py-5">Loading...</p>;
  if (!blog) return <p className="text-center py-5">Blog not found.</p>;

  return (
    <div>
      {/* Dynamic meta tags for SEO */}
      <Head>
        <title>{blog.metaTitle || blog.title}</title>

        {blog.metaDescription && (
          <meta name="description" content={blog.metaDescription} />
        )}

        {blog.metaKeywords && (
          <meta
            name="keywords"
            content={
              Array.isArray(blog.metaKeywords)
                ? blog.metaKeywords.join(", ")
                : blog.metaKeywords // if already string
            }
          />
        )}
      </Head>

      <Header />
      <div className="container py-5">
        {/* Blog Title */}
        <h1 className="mb-3">{blog.title}</h1>

        {/* Author & Date */}
        <p
          className="text-muted mb-2 d-flex gap-3 align-items-center"
          style={{ fontSize: "0.9rem" }}
        >
          <span className="d-flex align-items-center gap-1">
            <FaUser /> {blog.authorName || "Admin"}
          </span>
          <span className="d-flex align-items-center gap-1">
            <FaCalendarAlt />{" "}
            {new Date(blog.publishDate).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </p>

        {/* Cover Image */}
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="img-fluid mb-4"
            style={{ maxHeight: "600px", objectFit: "cover", width: "100%", borderRadius: "6px" }}
          />
        )}

        {/* Blog Content */}
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="mb-5"
        />

        {/* Category & Tags */}
        <p
          className=" p-2 text-muted mb-4 d-flex flex-wrap gap-2"
          style={{ fontSize: "0.85rem" }}
        >
          {blog.category && (
            <span className="d-flex align-items-center gap-1 border rounded px-2 py-1 text-primary">
              <FaFolder /> {blog.category}
            </span>
          )}

          {blog.tags &&
            blog.tags.length > 0 &&
            blog.tags.map((tag) => (
              <span
                key={tag}
                className="d-flex align-items-center gap-1 border rounded px-2 py-1"
              >
                <FaTag /> {tag}
              </span>
            ))}
        </p>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <div className="mt-5">
            <h4>Related Posts</h4>
            <div className="row">
              {relatedBlogs.map((rb) => (
                <div key={rb._id} className="col-md-4 mb-3">
                  <div className="card h-100">
                    {rb.coverImage && (
                      <img
                        src={rb.coverImage}
                        alt={rb.title}
                        className="card-img-top"
                        style={{ height: "150px", objectFit: "cover" }}
                      />
                    )}
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{rb.title}</h6>
                      <Link
                        href={`/blogs/${rb.slug}`}
                        className="btn btn-sm btn-primary mt-auto"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
