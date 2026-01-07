"use client";

import React, { useEffect, useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";

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
const limit = 10; // records per page

  /* ================= FETCH ================= */
  // const fetchStudents = async () => {
  //   const res = await fetch("/api/student-success");
  //   const data = await res.json();
  //   if (data.success) setStudents(data.data);
  // };



  const fetchStudents = async (currentPage = page) => {
  const res = await fetch(
    `/api/student-success?page=${currentPage}&limit=${limit}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (data.success) {
    setStudents(data.data);
    setTotalPages(data.pagination.totalPages);
  }
};

useEffect(() => {
  fetchStudents(page);
}, [page]);


  /* ================= IMAGE ================= */
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onloadend = () => setImage(reader.result);
  //   reader.readAsDataURL(file);
  // };

  /* =======
  
  
  ========== SUBMIT ================= */


  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setImageFile(file);
  setImage(URL.createObjectURL(file)); // preview only
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData();
  formData.append("name", name);
  formData.append("rollNo", rollNo);
  formData.append("className", className);
  formData.append("year", year);
  formData.append("score", score);
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
    body: formData, // ❌ no JSON
  });

  const data = await res.json();

  if (data.success) {
    toast.success(editingId ? "Student updated" : "Student added");
    resetForm();
    // fetchStudents();
    fetchStudents(page);

  } else {
    toast.error(data.message || "Something went wrong");
  }

  setLoading(false);
};


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const payload = {  name,
  // rollNo,
  // className,
  // year,
  // score,
  // bgColor,
  // image, };
  //   const url = editingId
  //     ? `/api/student-success/${editingId}`
  //     : "/api/student-success";

  //   const method = editingId ? "PUT" : "POST";

  //   const res = await fetch(url, {
  //     method,
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //   });

  //   const data = await res.json();

  //   if (data.success) {
  //     toast.success(editingId ? "Student updated" : "Student added");
  //     resetForm();
  //     fetchStudents();
  //   } else {
  //     toast.error("Something went wrong");
  //   }

  //   setLoading(false);
  // };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
  setEditingId(item._id);
  setName(item.name);
  setRollNo(item.rollNo);
  setClassName(item.className);
  setYear(item.year);
  setScore(item.score);
  setBgColor(item.bgColor);
  setImage(item.image);
};

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Delete this student?")) return;

    const res = await fetch(`/api/student-success/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Student deleted");
      fetchStudents(page);

    }
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
};

  return (
    <div className="student-success-admin">
      <Topbar />
      <AdminOffcanvas />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />

        <div className="flex-grow-1 bg-light">
          <div className="container-fluid p-4">

            {/* ===== HEADER ===== */}
            <div className="admin-row mb-3">
              <h4 className="fw-bold">Student Success Manager</h4>
            </div>

            {/* ===== FORM ===== */}

            <form
  onSubmit={handleSubmit}
  className="student-form border rounded shadow-sm p-4 mb-4 bg-white"
>
  <div className="row g-3">

    {/* ===== STUDENT IDENTITY ===== */}
    <div className="col-md-6">
      <label className="form-label fw-semibold">Student Name</label>
      <input
        type="text"
        className="form-control"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div className="col-md-3">
      <label className="form-label fw-semibold">Roll No</label>
      <input
        type="text"
        className="form-control"
        value={rollNo}
        required
        onChange={(e) => setRollNo(e.target.value)}
      />
    </div>

    <div className="col-md-3">
      <label className="form-label fw-semibold">Class</label>
      <input
        type="text"
        className="form-control"
        placeholder="10th / 12th / NEET"
        value={className}
        required
        onChange={(e) => setClassName(e.target.value)}
      />
    </div>

    {/* ===== ACADEMIC YEAR ===== */}
    <div className="col-md-3">
      <label className="form-label fw-semibold">Year</label>
      <select
  className="form-select"
  value={year}
  onChange={(e) => setYear(Number(e.target.value))}
>
  {Array.from({ length: 8 }).map((_, i) => {
    const y = new Date().getFullYear() - 2 + i; // 2024, 2025, 2026...
    return (
      <option key={y} value={y}>
        {y}
      </option>
    );
  })}
</select>

    </div>

    {/* ===== RESULT INFO ===== */}
    <div className="col-md-3">
      <label className="form-label fw-semibold">Score</label>
      <input
        type="text"
        className="form-control"
        placeholder="96.4%"
        value={score}
        required
        onChange={(e) => setScore(e.target.value)}
      />
    </div>

    {/* ===== DESIGN OPTIONS ===== */}
    {/* <div className="col-md-3">
      <label className="form-label fw-semibold">BG Color</label>
      <input
        type="color"
        className="form-control form-control-color"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
      />
    </div> */}

    {/* ===== IMAGE UPLOAD ===== */}
    <div className="col-md-6">
      <label className="form-label fw-semibold">Upload Image</label>
      <input
        type="file"
        className="form-control"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>

    <div className="col-md-6 d-flex align-items-end">
      {image && (
        <div className="preview-box" style={{ background: bgColor }}>
          <img src={image} alt="preview" />
        </div>
      )}
    </div>

  </div>

  {/* ===== ACTION BUTTONS ===== */}
  <div className="mt-4 d-flex">
    <button
      type="submit"
      className="btn btn-primary brandbg me-2"
      disabled={loading}
    >
      {editingId ? "Update" : "Add"} Student
    </button>

    {editingId && (
      <button
        type="button"
        className="btn btn-secondary"
        onClick={resetForm}
      >
        Cancel
      </button>
    )}
  </div>
</form>

         

            {/* ===== TABLE ===== */}
            <div className="table-responsive">
              <table className="table student-table align-middle">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Roll No</th>
                    <th>Class</th>
                    <th>Year</th>
                    <th>Score</th>
                    <th>BG</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length ? (
                    students.map((s) => (
                      <tr key={s._id}>
                        <td>
                          <img src={s.image} className="table-img" />
                        </td>
                        <td>{s.name}</td>
                        <td>{s.rollNo}</td>
                        <td>{s.className}</td>
                        <td>{s.year}</td>
                        <td>{s.score}</td>
                        <td>
                          <span
                            className="color-dot"
                            style={{ background: s.bgColor }}
                          />
                        </td>
                        <td className="text-end">
                          <button
                            className="icon-btn me-2"
                            onClick={() => handleEdit(s)}
                          >
                            ✏️
                          </button>
                          <button
                            className="icon-btn text-danger"
                            onClick={() => handleDelete(s._id)}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ===== PAGINATION ===== */}
{totalPages > 1 && (
  <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">

    <button
      className="btn btn-outline-secondary btn-sm"
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
            className={`btn btn-sm ${
              page === p ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        );
      }

      if (p === page - 3 || p === page + 3) {
        return <span key={p}>…</span>;
      }

      return null;
    })}

    <button
      className="btn btn-outline-secondary btn-sm"
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
  );
}
