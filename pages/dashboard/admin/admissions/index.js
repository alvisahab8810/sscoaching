// /pages/dashboard/admin/admissions/index.jsx
"use client";
import { withAdminAuth } from "@/lib/withAdminAuth";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  FiSearch, FiFilter, FiEye, FiCheck, FiX, FiTrash2,
  FiUser, FiPhone, FiMapPin, FiBook,
  FiChevronLeft, FiChevronRight, FiFileText, FiImage,
  FiUsers, FiClock, FiCheckCircle, FiXCircle, FiCalendar,
} from "react-icons/fi";

export default function AdminAdmissions() {
  const [admissions, setAdmissions]         = useState([]);
  const [loading, setLoading]               = useState(true);
  const [searchQuery, setSearchQuery]       = useState("");
  const [statusFilter, setStatusFilter]     = useState("all");
  const [sortOrder, setSortOrder]           = useState("newest");
  const [showFilter, setShowFilter]         = useState(false);
  const [fromDate, setFromDate]             = useState("");
  const [toDate, setToDate]                 = useState("");
  const [currentPage, setCurrentPage]       = useState(1);
  const [slideAdmission, setSlideAdmission] = useState(null);
  const perPage = 8;

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admissions");
      const data = await res.json();
      if (data.success) setAdmissions(data.data);
    } catch { toast.error("Failed to load admissions"); }
    setLoading(false);
  };

  useEffect(() => { fetchAdmissions(); }, []);

  const updateStatus = async (id, status) => {
    const res  = await fetch(`/api/admissions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success(`Marked as ${status}`);
      setAdmissions((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
      if (slideAdmission?._id === id) setSlideAdmission((prev) => ({ ...prev, status }));
    } else toast.error("Failed to update status");
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this application?")) return;
    const res  = await fetch(`/api/admissions/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      toast.success("Deleted successfully");
      setAdmissions((prev) => prev.filter((a) => a._id !== id));
      if (slideAdmission?._id === id) setSlideAdmission(null);
    } else toast.error("Failed to delete");
  };

  const filtered = admissions
    .filter((a) => {
      const q = searchQuery.toLowerCase();
      return (
        a.studentName?.toLowerCase().includes(q) ||
        a.fatherName?.toLowerCase().includes(q)  ||
        a.mobile?.includes(q) ||
        a.courseApplying?.toLowerCase().includes(q)
      );
    })
    .filter((a) => statusFilter === "all" || a.status === statusFilter)
    .filter((a) => {
      const d = new Date(a.createdAt);
      return (fromDate ? d >= new Date(fromDate) : true) &&
             (toDate   ? d <= new Date(toDate)   : true);
    })
    .sort((a, b) =>
      sortOrder === "oldest"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated  = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const stats = [
    { label: "Total",    value: admissions.length,                                        icon: <FiUsers />,       color: "#4441e5" },
    { label: "Pending",  value: admissions.filter((a) => a.status === "pending").length,  icon: <FiClock />,       color: "#f59e0b" },
    { label: "Approved", value: admissions.filter((a) => a.status === "approved").length, icon: <FiCheckCircle />, color: "#00cbb8" },
    { label: "Rejected", value: admissions.filter((a) => a.status === "rejected").length, icon: <FiXCircle />,     color: "#b94040" },
  ];

  const Badge = ({ s }) => {
    const cls = { pending: "adm-badge-pending", approved: "adm-badge-approved", rejected: "adm-badge-rejected" };
    return <span className={`adm-badge ${cls[s] || "adm-badge-pending"}`}>{s}</span>;
  };

  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

  return (
    <div className="faq-section faq-section-admin">
      <Topbar />
      <AdminOffcanvas />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />

        <div className="flex-grow-1 bg-light">
          <div className="container-fluid p-4">

            <div className="admin-row mb-4">
              <h4 className="fw-bold mb-0">Admission Applications</h4>
            </div>

            {/* Stats */}
            <div className="adm-stats-row">
              {stats.map((s) => (
                <div key={s.label} className="adm-stat-card" style={{ "--adm-bar": s.color }}>
                  <div className="adm-stat-icon-wrap" style={{ background: `${s.color}18`, color: s.color }}>
                    {s.icon}
                  </div>
                  <div className="adm-stat-label">{s.label}</div>
                  <div className="adm-stat-value">{s.value}</div>
                  <div className="adm-stat-bg-icon" style={{ color: s.color }}>{s.icon}</div>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="adm-toolbar">
              <div className="adm-toolbar-left">
                <div className="adm-search-wrap">
                  <span className="adm-search-icon"><FiSearch /></span>
                  <input
                    className="adm-search-input"
                    type="text"
                    placeholder="Search name, mobile, course…"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  />
                </div>
                <button
                  className={`adm-filter-btn ${showFilter ? "active" : ""}`}
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <FiFilter /> Filter
                </button>
              </div>
              <div className="adm-toolbar-right">
                <select className="adm-select" value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <select className="adm-select" value={sortOrder}
                  onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1); }}>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            {/* Date Filter */}
            {showFilter && (
              <div className="adm-filter-panel">
                <div className="row g-3 align-items-end">
                  <div className="col-md-5">
                    <label className="form-label fw-semibold" style={{ fontSize: ".82rem" }}>From Date</label>
                    <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                  </div>
                  <div className="col-md-5">
                    <label className="form-label fw-semibold" style={{ fontSize: ".82rem" }}>To Date</label>
                    <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                  </div>
                  <div className="col-md-2">
                    <button className="btn w-100 brandbg btn-primary"
                      onClick={() => { setShowFilter(false); setCurrentPage(1); }}>Apply</button>
                  </div>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Mobile</th>
                    <th>Category</th>
                    <th>Applied On</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className="adm-empty-row">
                      <td colSpan={8}>
                        <div className="adm-spinner" />
                        <div>Loading…</div>
                      </td>
                    </tr>
                  ) : paginated.length === 0 ? (
                    <tr className="adm-empty-row">
                      <td colSpan={8}>No applications found</td>
                    </tr>
                  ) : paginated.map((a, i) => (
                    <tr key={a._id}>
                      <td style={{ color: "#aab0be", fontSize: ".8rem" }}>{(currentPage - 1) * perPage + i + 1}</td>
                      <td>
                        <div className="adm-student-name">{a.studentName}</div>
                        <div className="adm-student-sub">S/o {a.fatherName}</div>
                      </td>
                      <td>{a.courseApplying}</td>
                      <td>{a.mobile}</td>
                      <td>{a.category}</td>
                      <td className="adm-date-cell">{fmtDate(a.createdAt)}</td>
                      <td><Badge s={a.status} /></td>
                      <td>
                        <div className="adm-action-btns">
                          <button className="adm-icon-btn" title="View" onClick={() => setSlideAdmission(a)}><FiEye /></button>
                          {a.status !== "approved" && (
                            <button className="adm-icon-btn approve" title="Approve" onClick={() => updateStatus(a._id, "approved")}><FiCheck /></button>
                          )}
                          {a.status !== "rejected" && (
                            <button className="adm-icon-btn reject" title="Reject" onClick={() => updateStatus(a._id, "rejected")}><FiX /></button>
                          )}
                          <button className="adm-icon-btn delete" title="Delete" onClick={() => handleDelete(a._id)}><FiTrash2 /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="adm-pagination">
                <button className="adm-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                  <FiChevronLeft />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} className={`adm-page-btn ${currentPage === i + 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                ))}
                <button className="adm-page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                  <FiChevronRight />
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ── Slide Panel ── */}
      {slideAdmission && (
        <>
          <div className="adm-overlay" onClick={() => setSlideAdmission(null)} />
          <div className="adm-slide-panel">

            <div className="adm-panel-head">
              <div className="adm-panel-head-left">
                <div className="adm-panel-title">Application Details</div>
                <div className="adm-panel-subtitle">ID: {slideAdmission._id?.slice(-8).toUpperCase()}</div>
              </div>
              <button className="adm-panel-close" onClick={() => setSlideAdmission(null)}><FiX /></button>
            </div>

            <div className="adm-panel-status-bar">
              <span className="adm-panel-status-label">Current Status</span>
              <Badge s={slideAdmission.status} />
            </div>

            <div className="adm-panel-body">

              <div className="adm-panel-section">
                <div className="adm-panel-section-title"><FiUser /> Personal Details</div>
                {[
                  ["Student Name",  slideAdmission.studentName],
                  ["Father's Name", slideAdmission.fatherName],
                  ["Mother's Name", slideAdmission.motherName],
                  ["Gender",        slideAdmission.gender],
                  ["Date of Birth", fmtDate(slideAdmission.dob)],
                  ["Nationality",   slideAdmission.nationality || "Indian"],
                ].map(([l, v]) => (
                  <div className="adm-info-row" key={l}>
                    <span className="adm-info-label">{l}</span>
                    <span className="adm-info-value">{v || "—"}</span>
                  </div>
                ))}
              </div>

              <div className="adm-panel-section">
                <div className="adm-panel-section-title"><FiBook /> Course Details</div>
                {[
                  ["Course",      slideAdmission.courseApplying],
                  ["Batch / TOC", slideAdmission.toc || "—"],
                  ["Category",    slideAdmission.category],
                //   ["Employment",  slideAdmission.employmentStatus || "—"],
                ].map(([l, v]) => (
                  <div className="adm-info-row" key={l}>
                    <span className="adm-info-label">{l}</span>
                    <span className="adm-info-value">{v || "—"}</span>
                  </div>
                ))}
              </div>

              <div className="adm-panel-section">
                <div className="adm-panel-section-title"><FiPhone /> Contact</div>
                {[
                  ["Mobile", slideAdmission.mobile],
                  ["Phone",  slideAdmission.phone || "—"],
                  ["Email",  slideAdmission.email || "—"],
                ].map(([l, v]) => (
                  <div className="adm-info-row" key={l}>
                    <span className="adm-info-label">{l}</span>
                    <span className="adm-info-value">{v || "—"}</span>
                  </div>
                ))}
              </div>

              <div className="adm-panel-section">
                <div className="adm-panel-section-title"><FiMapPin /> Address</div>
                {[
                  ["Corr. Address", slideAdmission.correspondingAddress],
                  ["Perm. Address", slideAdmission.permanentAddress || "Same as above"],
                  ["Pin Code",      slideAdmission.pinCode || "—"],
                  ["District",      slideAdmission.district || "—"],
                  ["State",         slideAdmission.state],
                ].map(([l, v]) => (
                  <div className="adm-info-row" key={l}>
                    <span className="adm-info-label">{l}</span>
                    <span className="adm-info-value">{v || "—"}</span>
                  </div>
                ))}
              </div>

              <div className="adm-panel-section">
                <div className="adm-panel-section-title"><FiFileText /> Documents</div>
                <div className="adm-file-row">
                  <span className="adm-file-row-label"><FiImage /> Passport Photo</span>
                  {slideAdmission.photo
                    ? <a href={slideAdmission.photo} target="_blank" rel="noreferrer" className="adm-file-link"><FiEye /> View Photo</a>
                    : <span style={{ fontSize: ".8rem", color: "#aab0be" }}>Not uploaded</span>
                  }
                </div>
                <div className="adm-file-row">
                  <span className="adm-file-row-label"><FiFileText /> Documents</span>
                  {slideAdmission.documents
                    ? <a href={slideAdmission.documents} target="_blank" rel="noreferrer" className="adm-file-link"><FiEye /> View Document</a>
                    : <span style={{ fontSize: ".8rem", color: "#aab0be" }}>Not uploaded</span>
                  }
                </div>
              </div>

              <div className="adm-panel-section">
                <div className="adm-panel-section-title"><FiCalendar /> Timeline</div>
                <div className="adm-info-row">
                  <span className="adm-info-label">Applied On</span>
                  <span className="adm-info-value">{fmtDate(slideAdmission.createdAt)}</span>
                </div>
                <div className="adm-info-row">
                  <span className="adm-info-label">Last Updated</span>
                  <span className="adm-info-value">{fmtDate(slideAdmission.updatedAt)}</span>
                </div>
              </div>

            </div>

            <div className="adm-panel-footer">
              {slideAdmission.status !== "approved" && (
                <button className="adm-panel-btn approve" onClick={() => updateStatus(slideAdmission._id, "approved")}>
                  <FiCheck /> Approve
                </button>
              )}
              {slideAdmission.status !== "rejected" && (
                <button className="adm-panel-btn reject" onClick={() => updateStatus(slideAdmission._id, "rejected")}>
                  <FiX /> Reject
                </button>
              )}
              <button className="adm-panel-btn delete" onClick={() => handleDelete(slideAdmission._id)}>
                <FiTrash2 />
              </button>
            </div>

          </div>
        </>
      )}

    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => ({ props: {} }));