"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FaqManager() {
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

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        <Topbar />
        <div className="container-fluid p-4">
          <h3 className="mb-4 fw-bold text-primary">FAQ Manager</h3>
          <form
            onSubmit={handleSubmit}
            className="border rounded p-4 shadow-sm mb-4 bg-light"
          >
            <div className="row g-3">
              <div className="col-md-6">
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
              <div className="col-md-6">
                <label className="form-label fw-semibold">Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Answer</label>
                <textarea
                  rows="3"
                  className="form-control"
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  required
                ></textarea>
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-primary px-4 me-2" type="submit">
                {editing ? "Update FAQ" : "Add FAQ"}
              </button>
              {editing && (
                <button
                  type="button"
                  className="btn btn-secondary"
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
          <div className="table-responsive">
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
          </div>
        </div>
      </div>
    </div>
  );
}
