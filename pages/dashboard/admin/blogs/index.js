
"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { toast } from "sonner";
import {
  FaUser,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaFolder,
} from "react-icons/fa";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    author: "",
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/blogs/getAll?${query}`);
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
        setPagination(data.pagination);
      } else {
        toast.error(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while fetching blogs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(`/api/blogs/delete?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Blog deleted successfully");
        fetchBlogs();
      } else {
        toast.error(data.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error while deleting blog");
    }
  };

  return (
    <div className="admin-blogs-lists">
      <Topbar />
       <AdminOffcanvas/>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <div className="flex-grow-1 bg-light width-80">
          <div className="container-fluid p-4">
            <div className="admin-row">
              <h4 className="fw-bold">Blog List</h4>

              <a
                href="/dashboard/admin/blogs/create"
                className="d-flex add-new-blogs"
              >
                <img src="/assets/icons/add-new.svg" className="me-2" /> Add New
                Blog
              </a>
            </div>

            {/* Filters */}
            <div className="row g-3 mb-5">
              <div className="col-md-3">
                <input
                  type="text"
                  name="search"
                  placeholder="Search by title or content"
                  className="form-control"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  className="form-control"
                  value={filters.category}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-3">
                <select
                  name="status"
                  className="form-select"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  name="author"
                  placeholder="Author"
                  className="form-control"
                  value={filters.author}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            {/* Blog Cards */}
            {loading ? (
              <p className="text-center">Loading blogs...</p>
            ) : blogs.length === 0 ? (
              <p className="text-center">No blogs found</p>
            ) : (
              <div className="blog-list-area row g-3">
                {blogs.map((blog) => (
                  <div key={blog._id} className="col-md-6 col-lg-3">
                    <div
                      style={{
                        background: "#fff",
                        borderRadius: "10px",
                        overflow: "hidden",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      {blog.coverImage && (
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          style={{
                            width: "100%",
                            height: "180px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                      <div
                        style={{
                          padding: "15px",
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* <h5 style={{ fontWeight: "600", marginBottom: "10px" }}>
                          {blog.title}
                        </h5> */}
                        <h5 style={{ fontWeight: 600, marginBottom: "10px" }}>
                          {blog.title.length > 40
                            ? blog.title.substring(0, 40) + "..."
                            : blog.title}
                        </h5>

                        <div
                          style={{
                            fontSize: "0.85rem",
                            color: "#555",
                            marginBottom: "10px",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                          }}
                        >
                          {/* {blog.category && (
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <FaFolder /> {blog.category}
                            </span>
                          )} */}
                          {/* {blog.tags &&
                            blog.tags.length > 0 &&
                            blog.tags.map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  border: "1px solid #ccc",
                                  padding: "2px 6px",
                                  borderRadius: "4px",
                                  fontSize: "0.8rem",
                                }}
                              >
                                #{tag}
                              </span>
                            ))} */}
                        </div>
                        {/* <p
                          style={{
                            fontSize: "0.85rem",
                            color: "#666",
                            flexGrow: 1,
                          }}
                        >
                          {blog.shortDescription
                            ? blog.shortDescription.length > 100
                              ? blog.shortDescription.slice(0, 100) + "..."
                              : blog.shortDescription
                            : blog.content.length > 100
                            ? blog.content.slice(0, 100) + "..."
                            : blog.content}
                        </p> */}
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "#777",
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "0px",
                            alignItems: "center",
                          }}
                        >
                          {/* <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <FaUser /> {blog.authorName || "Admin"}
                          </span> */}
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <FaCalendarAlt />{" "}
                            {new Date(blog.publishDate).toLocaleDateString()}
                          </span>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            {blog.status === "published" ? (
                              <span
                                style={{
                                  color: "green",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "3px",
                                }}
                              >
                                <FaCheckCircle /> Published
                              </span>
                            ) : (
                              <span
                                style={{
                                  color: "orange",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "3px",
                                }}
                              >
                                <FaTimesCircle /> Draft
                              </span>
                            )}
                          </span>
                        </div>
                        <div
                          style={{
                            marginTop: "20px",
                            display: "flex",
                            gap: "10px",
                          }}
                        >
                          <a
                            href={`/dashboard/admin/blogs/edit/${blog._id}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              background: "#624ce5",
                              color: "#fff",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              textDecoration: "none",
                              fontSize: "0.85rem",
                            }}
                          >
                            <FaEdit /> Edit
                          </a>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              background: "#dc3545",
                              color: "#fff",
                              padding: "5px 10px",
                              borderRadius: "5px",
                              border: "none",
                              fontSize: "0.85rem",
                              cursor: "pointer",
                            }}
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${
                    filters.page === 1 ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(filters.page - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: pagination.totalPages || 1 }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      filters.page === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    filters.page === pagination.totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(filters.page + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
