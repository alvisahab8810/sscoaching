import CTA2 from "@/components/home/CTA2";
import CTA3 from "@/components/home/CTA3";
import { Link as ScrollLink, Element, scroller } from "react-scroll";

import parse from "html-react-parser";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import Head from "next/head";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { FaUser, FaCalendarAlt, FaTag, FaFolder } from "react-icons/fa";
import Link from "next/link";
import RegistrationForm from "@/components/home/RegistrationForm";
import Popup from "@/components/home/Popup";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [headings, setHeadings] = useState([]);
  const [processedHTML, setProcessedHTML] = useState("");

  // ✅ Decode HTML entities (e.g. &nbsp;) so TOC labels/ids don't contain
  // literal entity text — safe here since this only ever runs client-side.
  const decodeEntities = (str) => {
    const el = document.createElement("textarea");
    el.innerHTML = str;
    return el.value;
  };

  // ✅ Single pass: inject unique heading IDs and collect the matching TOC
  // list together, so the rendered anchors and the TOC links can never
  // drift apart (e.g. from duplicate heading text or formatted headings).
  const processBlogContent = (htmlContent) => {
    if (!htmlContent) return { html: "", headings: [] };

    const extractedHeadings = [];
    let counter = 0;

    const html = htmlContent.replace(
      /<(h2|h3)[^>]*>([\s\S]*?)<\/\1>/g,
      (match, tag, innerHtml) => {
        const text = decodeEntities(innerHtml.replace(/<[^>]+>/g, "")).trim();
        const baseId = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        const id = `${baseId || "section"}-${counter}`;
        counter++;
        extractedHeadings.push({ id, text, level: tag.toUpperCase() });
        return `<${tag} id="${id}">${innerHtml}</${tag}>`;
      }
    );

    return { html, headings: extractedHeadings };
  };

  const renderBlogContent = (htmlContent) => {
    if (!htmlContent) return null;

    const elements = parse(htmlContent);
    const contentArray = Array.isArray(elements) ? elements : [elements];
    const enhancedContent = [];

    contentArray.forEach((element, index) => {
      enhancedContent.push(element);
      // if (index === 10) enhancedContent.push(<CTA2 key="cta2" />);
      // if (index === 20) enhancedContent.push(<CTA3 key="cta3" />);
      // if (index === 30) enhancedContent.push(<CTA2 key="cta4" />);
    });

    return enhancedContent;
  };

  useEffect(() => {
    if (blog?.content) {
      const { html, headings: h } = processBlogContent(blog.content);
      setProcessedHTML(html);
      setHeadings(h);
    }
  }, [blog]);

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
    <div className="blogs-details-area">
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
      <Offcanvas />
              <BranchContactCanvas/>
      
      
      <div className="container py-5 blog-details-page">
        <div className="row main-layout">
          <div className="col-md-8 left-col">
            <div className="content">
              {/* Cover Image */}
              {blog.coverImage && (
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="img-fluid mb-4"
                  style={{
                    maxHeight: "509px",
                    // minHeight: "509px",
                    objectFit: "cover",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                />
              )}

                  {/* Blog Title */}
              <h1 className="mb-3">{blog.title}</h1>

              {/* Author & Date */}
              <p
                className="text-muted mb-2 d-flex gap-3 align-items-center"
                style={{ fontSize: "0.9rem" }}
              >


                   <span className="author-icons d-flex align-items-center gap-1">
                  <FaCalendarAlt />{" "}
                  {new Date(blog.publishDate).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="author-icons d-flex align-items-center gap-1">
                  <FaUser /> {blog.authorName || "Admin"}
                </span>
             
              </p>

          

              {/* Blog Content */}
              {/* <div
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                  className="mb-5"
                /> */}

              <div className="mb-5">{renderBlogContent(processedHTML)}</div>

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
                  <h4 className="mb-3">Related Posts</h4>
                  <div className="row">
                    {relatedBlogs.map((rb) => (
                      <div key={rb._id} className="col-md-4 mb-3">
                        <Link href={`/blogs/${rb.slug}`}>
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
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4 right-col">
            {headings.length > 0 && (
              <div className="blog-toc mb-4 p-3 shadow-sm  rounded bg-white">
                <h4 className="mb-3 fw-semibold text-primary border-bottom pb-2">
                  📚 Table of Contents
                </h4>

                <ul className="list-unstyled ps-1">
                  {(() => {
                    let mainCount = 0;
                    let subCount = 0;
                    const tocItems = [];

                    headings.forEach((h, i) => {
                      if (h.level === "H2") {
                        mainCount++;
                        subCount = 0;
                        tocItems.push(
                          <li key={h.id} className="mb-2 text-dark">
                            <ScrollLink
                              to={h.id}
                              smooth={true}
                              duration={500}
                              offset={-120}
                              spy={true}
                              activeClass="active-toc"
                              className="d-block text-decoration-none text-dark toc-link fw-semibold"
                            >
                              {`${mainCount}. ${h.text}`}
                            </ScrollLink>
                          </li>
                        );
                      } else if (h.level === "H3") {
                        subCount++;
                        tocItems.push(
                          <li key={h.id} className="mb-2 ms-3 small">
                            <ScrollLink
                              to={h.id}
                              smooth={true}
                              duration={500}
                              offset={-120}
                              spy={true}
                              activeClass="active-toc"
                              className="d-block text-decoration-none text-secondary toc-link"
                            >
                              {`${mainCount}.${subCount} ${h.text}`}
                            </ScrollLink>
                          </li>
                        );
                      }
                    });

                    return tocItems;
                  })()}
                </ul>
              </div>
            )}

            <RegistrationForm />

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
              <div className="mt-5">
                <h4 className="mb-3">Recent Posts</h4>
                <div className="row">
                  {relatedBlogs.map((rb) => (
                    <Link href={`/blogs/${rb.slug}`}>
                      <div key={rb._id} className="col-md-12 mb-3">
                        <div className="card h-100 d-flex recent-posts">
                          {rb.coverImage && (
                            <img
                              src={rb.coverImage}
                              alt={rb.title}
                              className="card-img-top"
                              style={{ width: "50%", objectFit: "cover" }}
                            />
                          )}
                          <div className="card-body d-flex flex-column">
                            <h6 className="card-title">{rb.title}</h6>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Popup/>
      <Footer />
      <Popup/>
    </div>
  );
}
