"use client";
import { withAdminAuth } from "@/lib/withAdminAuth";
import React, { useEffect, useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";
import { FaPen, FaTrash, FaTimes, FaPlus, FaSync, FaUserGraduate } from "react-icons/fa";

// Class 10 has no streams; class 12 is split by stream.
const CLASS_OPTIONS = [
  "10th",
  "12th",
  "12th PCM",
  "12th PCB",
  "12th PCMB",
  "12th Science",
  "12th Commerce",
  "12th Arts",
];

export default function StudentSuccessAdmin() {
  const [rollNo, setRollNo] = useState("");
  const [className, setClassName] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [bgColor, setBgColor] = useState("#ffeed1");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [yearFilter, setYearFilter] = useState("all");
  const [fetching, setFetching] = useState(true);
  const [confirming, setConfirming] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const limit = 10; // records per page

  const yearChoices = Array.from({ length: 8 }).map(
    (_, i) => new Date().getFullYear() - 2 + i
  );

  /* ================= FETCH ================= */
  const fetchStudents = async (currentPage = page, currentYear = yearFilter) => {
    setFetching(true);
    // sort=recent is required — the API sorts by score by default (for the
    // toppers list on the public website), which pushed a new entry far down
    // the list so it never showed up on page 1 here.
    const params = new URLSearchParams({
      page: String(currentPage),
      limit: String(limit),
      sort: "recent",
    });
    if (currentYear !== "all") params.set("year", currentYear);

    const res = await fetch(`/api/student-success?${params.toString()}`, {
      cache: "no-store",
    });

    const data = await res.json();

    if (data.success) {
      setStudents(data.data);
      setTotalPages(data.pagination.totalPages);
      setTotalRecords(data.pagination.totalRecords || 0);
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchStudents(page, yearFilter);
  }, [page, yearFilter]);

  /* ================= IMAGE ================= */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImage(URL.createObjectURL(file)); // preview only
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("rollNo", rollNo);
    formData.append("className", className);
    formData.append("year", year);
    // The score is always stored as "96.4%" in the DB. The input only takes a
    // number, so the % is appended here.
    const cleanScore = String(score).replace(/[^\d.]/g, "");
    formData.append("score", cleanScore ? `${cleanScore}%` : "");
    formData.append("bgColor", bgColor);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const url = editingId
      ? `/api/student-success/${editingId}`
      : "/api/student-success";

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      toast.success(editingId ? "Student updated" : "Student added");
      resetForm();
      fetchStudents(page, yearFilter);
    } else {
      toast.error(data.message || "Something went wrong");
    }

    setLoading(false);
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setEditingId(item._id);
    setName(item.name);
    setRollNo(item.rollNo);
    setClassName(item.className);
    setYear(item.year);
    // Stored as "96.4%" -> the input shows only 96.4, the % renders as a suffix.
    setScore(String(item.score ?? "").replace(/[^\d.]/g, ""));
    setBgColor(item.bgColor);
    setImage(item.image);
    setImageFile(null);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const deleteStudent = async () => {
    if (!confirming) return;
    setDeleting(true);

    const res = await fetch(`/api/student-success/${confirming._id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Student deleted");
      setConfirming(null);
      fetchStudents(page, yearFilter);
    } else {
      toast.error(data.message || "Could not delete student");
    }
    setDeleting(false);
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setEditingId(null);
    setName("");
    setRollNo("");
    setClassName("");
    setYear(new Date().getFullYear());
    setScore("");
    setBgColor("#ffeed1");
    setImage("");
    setImageFile(null);
  };

  return (
    <div className="student-success-admin">
      <Topbar />
      <AdminOffcanvas />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />

        <div className="flex-grow-1 ss-bg" style={{ minWidth: 0 }}>
          <div className="container-fluid p-4">

            {/* ===== HEADER ===== */}
            <div className="ss-head">
              <div>
                <h4 className="ss-title">Student Success</h4>
                <p className="ss-sub">
                  Toppers shown on the website homepage.
                </p>
              </div>
              <button
                className="ss-icon-btn"
                onClick={() => fetchStudents(page, yearFilter)}
                title="Refresh"
              >
                <span className="ss-ico"><FaSync /></span>
              </button>
            </div>

            {/* ===== FORM ===== */}
            <form onSubmit={handleSubmit} className="ss-card">
              <div className="ss-card-title">
                <span className="ss-ico"><FaPlus /></span>
                {editingId ? "Edit student" : "Add a student"}
              </div>

              <div className="ss-grid">
                <div className="ss-field wide">
                  <label>Student Name</label>
                  <input
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="ss-field">
                  <label>Roll No</label>
                  <input
                    type="text"
                    value={rollNo}
                    required
                    onChange={(e) => setRollNo(e.target.value)}
                  />
                </div>

                <div className="ss-field">
                  <label>Class</label>
                  <select
                    value={className}
                    required
                    onChange={(e) => setClassName(e.target.value)}
                  >
                    <option value="">Select Class</option>
                    {CLASS_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}

                    {/* Older records may hold a class value that is no longer offered.
                        Without this the select renders blank while editing and the
                        value changes silently on save. */}
                    {className && !CLASS_OPTIONS.includes(className) && (
                      <option value={className}>{className}</option>
                    )}
                  </select>
                </div>

                <div className="ss-field">
                  <label>Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                  >
                    {yearChoices.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ss-field">
                  <label>Score</label>
                  <div className="ss-suffix">
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="96.4"
                      value={score}
                      required
                      /* Only digits and a single decimal point are allowed. The
                         user never types the %, it shows as a suffix and is
                         appended on save. */
                      onChange={(e) =>
                        setScore(
                          e.target.value
                            .replace(/[^\d.]/g, "")
                            .replace(/^(\d*\.?\d*).*$/, "$1")
                        )
                      }
                    />
                    <span>%</span>
                  </div>
                </div>

                <div className="ss-field">
                  <label>Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="ss-field">
                  <label>Preview</label>
                  {image ? (
                    <div className="ss-preview" style={{ background: bgColor }}>
                      <img src={image} alt="preview" />
                    </div>
                  ) : (
                    <div className="ss-preview empty">
                      <span className="ss-ico"><FaUserGraduate /></span>
                    </div>
                  )}
                </div>
              </div>

              <div className="ss-form-foot">
                <button type="submit" className="ss-btn" disabled={loading}>
                  {loading
                    ? "Saving…"
                    : editingId
                    ? "Update Student"
                    : "Add Student"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="ss-btn-ghost"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* ===== TOOLBAR ===== */}
            <div className="ss-card">
              <div className="ss-toolbar">
                <select
                  className="ss-select"
                  value={yearFilter}
                  onChange={(e) => {
                    setPage(1);
                    setYearFilter(e.target.value);
                  }}
                >
                  <option value="all">All years</option>
                  {yearChoices.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>

                <span className="ss-count">
                  {totalRecords} student{totalRecords === 1 ? "" : "s"}
                </span>
              </div>

              {/* ===== TABLE ===== */}
              <div className="ss-table-wrap">
                <table className="ss-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Roll No</th>
                      <th>Class</th>
                      <th>Year</th>
                      <th>Score</th>
                      <th className="ss-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetching ? (
                      <tr>
                        <td colSpan="6" className="ss-blank">
                          Loading students…
                        </td>
                      </tr>
                    ) : students.length ? (
                      students.map((s) => (
                        <tr key={s._id}>
                          <td>
                            <div className="ss-person">
                              {s.image ? (
                                <img
                                  className="ss-thumb"
                                  src={s.image}
                                  alt={s.name}
                                />
                              ) : (
                                <span className="ss-thumb empty">
                                  {s.name?.charAt(0).toUpperCase()}
                                </span>
                              )}
                              <span className="ss-strong">{s.name}</span>
                            </div>
                          </td>
                          <td>{s.rollNo}</td>
                          <td>
                            <span className="ss-pill">{s.className}</span>
                          </td>
                          <td>{s.year}</td>
                          <td>
                            <span className="ss-score">{s.score}</span>
                          </td>
                          <td className="ss-right">
                            <div className="ss-actions">
                              <button
                                className="ss-row-btn primary"
                                onClick={() => handleEdit(s)}
                                title="Edit student"
                              >
                                <span className="ss-ico"><FaPen /></span>
                                Edit
                              </button>
                              <button
                                className="ss-icon-btn danger sm"
                                onClick={() => setConfirming(s)}
                                title="Delete student"
                              >
                                <span className="ss-ico"><FaTrash /></span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="ss-blank">
                          No records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* ===== PAGINATION ===== */}
              {totalPages > 1 && (
                <div className="ss-pager">
                  <button
                    className="ss-page-btn"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;

                    // show limited page numbers
                    if (
                      p === 1 ||
                      p === totalPages ||
                      (p >= page - 2 && p <= page + 2)
                    ) {
                      return (
                        <button
                          key={p}
                          className={`ss-page-btn ${
                            page === p ? "is-active" : ""
                          }`}
                          onClick={() => setPage(p)}
                        >
                          {p}
                        </button>
                      );
                    }

                    if (p === page - 3 || p === page + 3) {
                      return (
                        <span key={p} className="ss-gap">
                          …
                        </span>
                      );
                    }

                    return null;
                  })}

                  <button
                    className="ss-page-btn"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ===== DELETE CONFIRM ===== */}
      {confirming && (
        <>
          <div className="ss-backdrop" onClick={() => setConfirming(null)} />
          <div className="ss-modal-wrap">
            <div className="ss-modal">
              <div className="ss-modal-head danger">
                <span>Delete student</span>
                <button
                  className="ss-modal-x"
                  onClick={() => setConfirming(null)}
                >
                  <span className="ss-ico"><FaTimes /></span>
                </button>
              </div>
              <div className="ss-modal-body">
                <p className="ss-modal-text">
                  <strong>{confirming.name}</strong> ({confirming.rollNo}) will
                  be removed from the website. This cannot be undone.
                </p>
              </div>
              <div className="ss-modal-foot">
                <button
                  className="ss-btn-ghost"
                  onClick={() => setConfirming(null)}
                >
                  Cancel
                </button>
                <button
                  className="ss-btn danger"
                  onClick={deleteStudent}
                  disabled={deleting}
                >
                  {deleting ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .ss-bg {
          background: #f1f5f9;
        }

        /* react-icons renders its own svg, which styled-jsx will not scope,
           so every icon that needs sizing sits inside a span. */
        .ss-ico {
          display: inline-flex;
          align-items: center;
        }

        .ss-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }
        .ss-title {
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }
        .ss-sub {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 0.86rem;
        }

        .ss-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 16px;
          margin-bottom: 14px;
        }
        .ss-card-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          color: #0f172a;
          font-size: 0.92rem;
          margin-bottom: 14px;
        }
        .ss-card-title .ss-ico {
          color: #5641ce;
        }

        /* ----- form ----- */
        .ss-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
        }
        .ss-field.wide {
          grid-column: span 2;
        }
        .ss-field label {
          display: block;
          font-size: 0.78rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 6px;
        }
        .ss-field input,
        .ss-field select {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.88rem;
          color: #334155;
          background: #fff;
          outline: none;
        }
        .ss-field input:focus,
        .ss-field select:focus {
          border-color: #5641ce;
          box-shadow: 0 0 0 3px rgba(86, 65, 206, 0.1);
        }
        .ss-field input[type="file"] {
          padding: 8px 12px;
          font-size: 0.82rem;
          color: #64748b;
        }

        .ss-suffix {
          display: flex;
          align-items: stretch;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
        }
        .ss-suffix input {
          border: none;
          border-radius: 0;
          flex: 1 1 auto;
          min-width: 0;
        }
        .ss-suffix input:focus {
          box-shadow: none;
        }
        .ss-suffix span {
          display: flex;
          align-items: center;
          background: #f8fafc;
          border-left: 1px solid #e2e8f0;
          padding: 0 14px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #64748b;
        }

        .ss-preview {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ss-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ss-preview.empty {
          background: #f8fafc;
          color: #cbd5e1;
          font-size: 1.3rem;
        }

        .ss-form-foot {
          display: flex;
          gap: 10px;
          margin-top: 18px;
        }

        /* ----- buttons ----- */
        .ss-btn {
          background: #5641ce;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 9px 18px;
          font-weight: 600;
          font-size: 0.88rem;
        }
        .ss-btn:hover {
          background: #4634ad;
        }
        .ss-btn:disabled {
          opacity: 0.6;
        }
        .ss-btn.danger {
          background: #b91c1c;
        }
        .ss-btn.danger:hover {
          background: #991b1b;
        }
        .ss-btn-ghost {
          background: #fff;
          color: #334155;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 9px 18px;
          font-weight: 600;
          font-size: 0.88rem;
        }
        .ss-btn-ghost:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        .ss-icon-btn {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          width: 40px;
          height: 40px;
          color: #475569;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ss-icon-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        .ss-icon-btn.sm {
          width: 32px;
          height: 32px;
          border-radius: 8px;
        }
        .ss-icon-btn.danger {
          color: #ef4444;
          border-color: #fecaca;
          background: #fef2f2;
        }
        .ss-icon-btn.danger:hover {
          background: #fee2e2;
          border-color: #fca5a5;
        }
        .ss-row-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #334155;
        }
        .ss-row-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        .ss-row-btn.primary {
          border-color: #ded7f6;
          background: #f1eefc;
          color: #4634ad;
        }
        .ss-row-btn.primary:hover {
          background: #e8e2fa;
        }

        /* ----- toolbar ----- */
        .ss-toolbar {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 4px;
        }
        .ss-select {
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.88rem;
          color: #334155;
          background: #fff;
          min-width: 150px;
          outline: none;
        }
        .ss-select:focus {
          border-color: #5641ce;
          box-shadow: 0 0 0 3px rgba(86, 65, 206, 0.1);
        }
        .ss-count {
          margin-left: auto;
          font-size: 0.82rem;
          font-weight: 700;
          color: #0f172a;
        }

        /* ----- table ----- */
        .ss-table-wrap {
          overflow-x: auto;
        }
        .ss-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .ss-table thead th {
          text-align: left;
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #94a3b8;
          font-weight: 700;
          padding: 10px 12px;
          border-bottom: 1px solid #e2e8f0;
          white-space: nowrap;
        }
        .ss-table tbody td {
          padding: 12px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
          color: #334155;
          white-space: nowrap;
        }
        .ss-table tbody tr:hover {
          background: #f8fafc;
        }
        .ss-right {
          text-align: right;
        }
        .ss-blank {
          text-align: center;
          color: #94a3b8;
          padding: 34px 12px !important;
        }
        .ss-strong {
          font-weight: 600;
          color: #0f172a;
        }

        .ss-person {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ss-thumb {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid #e2e8f0;
          flex-shrink: 0;
        }
        .ss-thumb.empty {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          color: #475569;
          font-weight: 700;
          font-size: 0.85rem;
        }

        .ss-pill {
          background: #f1f5f9;
          color: #475569;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .ss-score {
          background: #f1eefc;
          color: #4634ad;
          border: 1px solid #ded7f6;
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .ss-actions {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* ----- pager ----- */
        .ss-pager {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          padding-top: 16px;
        }
        .ss-page-btn {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #334155;
          min-width: 34px;
        }
        .ss-page-btn:hover:not(:disabled) {
          background: #f8fafc;
          border-color: #cbd5e1;
        }
        .ss-page-btn:disabled {
          opacity: 0.45;
        }
        .ss-page-btn.is-active {
          background: #f1eefc;
          border-color: #ded7f6;
          color: #4634ad;
        }
        .ss-gap {
          color: #94a3b8;
          padding: 0 2px;
        }

        /* ----- modal ----- */
        .ss-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.5);
          z-index: 1060;
        }
        .ss-modal-wrap {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          z-index: 1061;
          pointer-events: none;
        }
        .ss-modal {
          background: #fff;
          border-radius: 16px;
          width: 100%;
          max-width: 420px;
          overflow: hidden;
          pointer-events: auto;
        }
        .ss-modal-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: #5641ce;
          color: #fff;
          font-weight: 700;
          font-size: 0.92rem;
        }
        .ss-modal-head.danger {
          background: #b91c1c;
        }
        .ss-modal-x {
          background: rgba(255, 255, 255, 0.18);
          border: none;
          border-radius: 8px;
          width: 32px;
          height: 32px;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .ss-modal-x:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        .ss-modal-body {
          padding: 18px;
        }
        .ss-modal-text {
          margin: 0;
          color: #475569;
          font-size: 0.88rem;
          line-height: 1.55;
        }
        .ss-modal-text strong {
          color: #0f172a;
        }
        .ss-modal-foot {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding: 14px 18px;
          border-top: 1px solid #e2e8f0;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => {
  return {
    props: {},
  };
});
