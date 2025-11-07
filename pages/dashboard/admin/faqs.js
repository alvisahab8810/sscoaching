"use client";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FaqManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [faqsPerPage] = useState(6); // You can change to 5, 10, etc.

  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ question: "", answer: "", category: "" });
  const [editing, setEditing] = useState(null);

  const fetchFaqs = async () => {
    const res = await fetch("/api/faqs");
    const data = await res.json();
    if (data.success) setFaqs(data.data);
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/faqs/${editing}` : "/api/faqs";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data.success) {
      toast.success(editing ? "FAQ updated" : "FAQ added");
      setForm({ question: "", answer: "", category: "" });
      setEditing(null);
      fetchFaqs();
    } else {
      toast.error(data.message || "Error saving FAQ");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      toast.success("FAQ deleted");
      fetchFaqs();
    } else toast.error("Failed to delete FAQ");
  };

  // Search + Filter + Sort Logic
  const filteredFaqs = faqs
    .filter((faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((faq) => {
      const created = new Date(faq.createdAt);
      const afterStart = fromDate ? created >= new Date(fromDate) : true;
      const beforeEnd = toDate ? created <= new Date(toDate) : true;
      return afterStart && beforeEnd;
    })
    .filter((faq) => {
      if (sortOrder === "published") return faq.status === "published";
      if (sortOrder === "draft") return faq.status !== "published";
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredFaqs.length / faqsPerPage);
  const indexOfLastFaq = currentPage * faqsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - faqsPerPage;
  const paginatedFaqs = filteredFaqs.slice(indexOfFirstFaq, indexOfLastFaq);

  const handleFilterApply = () => {
    setShowFilter(false);
    setCurrentPage(1);
  };

  return (
    <div className="faq-section faq-section-admin">
      <Topbar />
      <AdminOffcanvas/>

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />
        <div className="flex-grow-1 bg-light">
          <div className="container-fluid p-4">
            <div className="admin-row">
              <h4 className="fw-bold">Frequently Asked Questions</h4>
              {/* <a
                href="/dashboard/admin/blogs/create"
                className="d-flex add-new-blogs"
              >
                <img src="/assets/icons/add-new.svg" className="me-2" /> Add New
                Blog
              </a> */}
            </div>
            <form
              onSubmit={handleSubmit}
              className="border rounded p-4 shadow-sm mb-4 bg-light"
            >
              <div className="row g-3">
                <div className="col-md-12">
                  <label className="form-label fw-semibold">Question</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.question}
                    onChange={(e) =>
                      setForm({ ...form, question: e.target.value })
                    }
                    required
                  />
                </div>
                {/* <div className="col-md-6">
                  <label className="form-label fw-semibold">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  />
                </div> */}
                <div className="col-12">
                  <label className="form-label fw-semibold">Answer</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    value={form.answer}
                    onChange={(e) =>
                      setForm({ ...form, answer: e.target.value })
                    }
                    required
                  ></textarea>
                </div>
              </div>
              <div className="mt-3 d-flex">
                <button
                  className="btn btn-primary px-4 me-2 brandbg"
                  type="submit"
                >
                  <img src="/assets/icons/publish.svg" />
                  {editing ? "Update" : "Publish"}
                </button>
                {editing && (
                  <button
                    type="button"
                    className="btn btn-secondary brand-cancel"
                    onClick={() => {
                      setForm({ question: "", answer: "", category: "" });
                      setEditing(null);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* FAQ List */}
            {/* <div className="table-responsive">
              <table className="table table-striped align-middle shadow-sm">
                <thead className="table-primary">
                  <tr>
                    <th>Question</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.map((faq) => (
                    <tr key={faq._id}>
                      <td>{faq.question}</td>
                      <td>{faq.category}</td>
                      <td>
                        <span
                          className={`badge ${
                            faq.status === "published"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {faq.status}
                        </span>
                      </td>
                      <td>{new Date(faq.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => {
                            setForm(faq);
                            setEditing(faq._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(faq._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {faqs.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">
                        No FAQs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div> */}

            {/* Search + Filter Bar */}
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
              <div
                className="mobile-full d-flex align-items-center mb-2 mb-md-0"
                style={{ gap: "10px" }}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search questions..."
                  style={{ minWidth: "250px" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Filter Button */}
                <div className="mobile-none w-100">
                  <button
                    className="btn d-flex btn-outline-secondary w-100 filter-btn "
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    {/* You can replace with your filter icon */}
                    <img
                      src="/assets/icons/filter.svg"
                      width={15}
                      className="me-2"
                    ></img>
                    Filter
                  </button>
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="mobile-none">
                <select
                  className="form-select "
                  style={{ width: "180px" }}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  {/* <option value="published">Published</option> */}
                  {/* <option value="draft">Draft Only</option> */}
                </select>
              </div>
            </div>

            {/* Date Filter Panel */}
            <div className="mobile-none">
              {showFilter && (
                <div className="filter-panel p-3 rounded shadow-sm mb-3 bg-light">
                  <div className="row g-3">
                    <div className="col-md-5">
                      <label className="form-label fw-semibold">
                        From Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-5">
                      <label className="form-label fw-semibold">To Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                      <button
                        className="btn btn-primary w-100 brandbg"
                        onClick={handleFilterApply}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ List Table */}
            {/* FAQ List */}
            <div className="table-container table-responsive">
              <table className="table faq-table align-middle">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Created</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedFaqs.length > 0 ? (
                    paginatedFaqs.map((faq) => (
                      <tr key={faq._id}>
                        <td className="faq-question">
                          {faq.question.length > 80
                            ? faq.question.substring(0, 80) + "..."
                            : faq.question}
                        </td>

                        <td className="faq-date">
                          {new Date(faq.createdAt).toLocaleDateString()}
                        </td>

                        <td>
                          <span
                            className={`status-badge ${
                              faq.status === "published"
                                ? "status-published"
                                : "status-draft"
                            }`}
                          >
                            {faq.status === "published" ? "Published" : "Draft"}
                          </span>
                        </td>

                        <td className="text-end faq-actions">
                          <button
                            className="icon-btn me-2"
                            onClick={() => {
                              setForm(faq);
                              setEditing(faq._id);
                            }}
                            title="Edit"
                          >
                            <img
                              src="/assets/icons/edit.svg"
                              alt="edit"
                              width="18"
                            />
                          </button>

                          <button
                            className="icon-btn"
                            onClick={() => handleDelete(faq._id)}
                            title="Delete"
                          >
                            <img
                              src="/assets/icons/delete.svg"
                              alt="delete"
                              width="18"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        No FAQs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="faq-toolbar-mobile desktop-none">
              {/* Date Filter Panel */}
              <div className="desktop-none date-filter-mob">
                {showFilter && (
                  <div className="filter-panel p-3 rounded shadow-sm mb-3 bg-light">
                    <div className="row g-3">
                      <div className="col-md-5">
                        <label className="form-label fw-semibold">
                          From Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                        />
                      </div>
                      <div className="col-md-5">
                        <label className="form-label fw-semibold">
                          To Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                        />
                      </div>
                      <div className="col-md-2 d-flex align-items-end">
                        <button
                          className="btn btn-primary w-100 brandbg"
                          onClick={handleFilterApply}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="controls">
                <button
                  className="btn d-flex align-items-center btn-outline-secondary filter-btn"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <img
                    src="/assets/icons/filter.svg"
                    width={15}
                    className="me-2"
                    alt="Filter"
                  />
                  Filter
                </button>

                <select
                  className="form-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            {/* Pagination */}
            {/* {totalPages > 1 && (
              <nav>
                <ul className="pagination justify-content-center mt-3">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Prev
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )} */}


            {totalPages > 1 && (
  <nav className="pagination-wrapper mt-3">
    <ul className="pagination justify-content-center flex-nowrap">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
      </li>

      {Array.from({ length: totalPages }, (_, i) => (
        <li
          key={i}
          className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        </li>
      ))}

      <li
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
)}

          </div>
        </div>
      </div>
    </div>
  );
}
