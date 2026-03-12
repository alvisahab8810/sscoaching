import { useState, useEffect } from "react";
import Head from "next/head";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";
import {
  MdSearch,
  MdFilterList,
  MdDelete,
  MdPhone,
  MdCheckCircle,
  MdCancel,
  MdRefresh,
  MdPersonAdd,
  MdGroup,
} from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";

export default function StudentsListPage({ admin }) {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, profileComplete: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  /* ===== FETCH STUDENTS ===== */
  const fetchStudents = async (pg = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pg,
        limit: 15,
        ...(search && { search }),
        ...(filterClass && { className: filterClass }),
      });

      const res = await fetch(`/api/admin/students?${params}`);
      const data = await res.json();

      if (data.success) {
        setStudents(data.data);
        setStats(data.stats);
        setPagination(data.pagination);
      }
    } catch (err) {
      toast.error("Failed to load students");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents(1);
    setPage(1);
  }, [search, filterClass]);

  /* ===== DELETE STUDENT ===== */
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/students?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Student deleted");
        fetchStudents(page);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to delete");
    }
    setDeleteConfirm(null);
  };

  /* ===== FORMAT DATE ===== */
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <>
      <Head><title>Students — SS Coaching Admin</title></Head>

      <div className="oc-wrapper">
        <Topbar admin={admin} />
        <AdminOffcanvas />

        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />

          <div className="flex-grow-1 bg-light">
            <div className="container-fluid p-4">
              <div className="stu-page">

                {/* ===== PAGE HEADER ===== */}
                <div className="stu-header">
                  <div>
                    <h1 className="stu-title">
                      <MdGroup size={28} /> Students
                    </h1>
                    <p className="stu-subtitle">All registered students on the platform</p>
                  </div>
                  <button className="stu-refresh-btn" onClick={() => fetchStudents(page)}>
                    <MdRefresh size={18} /> Refresh
                  </button>
                </div>

                {/* ===== STATS CARDS ===== */}
                <div className="stu-stats-row">
                  <div className="stu-stat-card">
                    <div className="stu-stat-icon stu-icon-total">
                      <MdGroup size={22} />
                    </div>
                    <div>
                      <div className="stu-stat-num">{stats.total}</div>
                      <div className="stu-stat-label">Total Students</div>
                    </div>
                  </div>
                  <div className="stu-stat-card">
                    <div className="stu-stat-icon stu-icon-active">
                      <MdCheckCircle size={22} />
                    </div>
                    <div>
                      <div className="stu-stat-num">{stats.active}</div>
                      <div className="stu-stat-label">Active Students</div>
                    </div>
                  </div>
                  <div className="stu-stat-card">
                    <div className="stu-stat-icon stu-icon-profile">
                      <FaGraduationCap size={20} />
                    </div>
                    <div>
                      <div className="stu-stat-num">{stats.profileComplete}</div>
                      <div className="stu-stat-label">Profile Complete</div>
                    </div>
                  </div>
                  <div className="stu-stat-card">
                    <div className="stu-stat-icon stu-icon-incomplete">
                      <MdPersonAdd size={22} />
                    </div>
                    <div>
                      <div className="stu-stat-num">{stats.total - stats.profileComplete}</div>
                      <div className="stu-stat-label">Incomplete Profile</div>
                    </div>
                  </div>
                </div>

                {/* ===== FILTERS ===== */}
                <div className="stu-filters">
                  <div className="stu-search-wrap">
                    <MdSearch size={18} className="stu-search-icon" />
                    <input
                      type="text"
                      className="stu-search-input"
                      placeholder="Search by name or phone..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="stu-filter-wrap">
                    <MdFilterList size={18} />
                    <select
                      className="stu-filter-select"
                      value={filterClass}
                      onChange={(e) => setFilterClass(e.target.value)}
                    >
                      <option value="">All Classes</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                      <option value="NIOS Stream 1">NIOS Stream 1</option>
                      <option value="NIOS Stream 2">NIOS Stream 2</option>
                      <option value="Dropper Batch">Dropper Batch</option>
                    </select>
                  </div>
                </div>

                {/* ===== TABLE ===== */}
                <div className="stu-table-card">
                  {loading ? (
                    <div className="stu-loading">
                      <div className="stu-spinner"></div>
                      <p>Loading students...</p>
                    </div>
                  ) : students.length === 0 ? (
                    <div className="stu-empty">
                      <MdGroup size={48} />
                      <p>No students found</p>
                    </div>
                  ) : (
                    <div className="stu-table-wrap">
                      <table className="stu-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Student</th>
                            <th>Phone</th>
                            <th>Class</th>
                            <th>Batch</th>
                            <th>Profile</th>
                            <th>Joined</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((s, i) => (
                            <tr key={s._id}>
                              <td className="stu-td-num">
                                {(pagination.page - 1) * pagination.limit + i + 1}
                              </td>

                              {/* Student Name + Avatar */}
                              <td>
                                <div className="stu-name-cell">
                                  <div className="stu-avatar">
                                    {s.name ? s.name.charAt(0).toUpperCase() : "?"}
                                  </div>
                                  <div className="stu-name">
                                    {s.name || <span className="stu-na">No name</span>}
                                  </div>
                                </div>
                              </td>

                              {/* Phone */}
                              <td>
                                <div className="stu-phone">
                                  <MdPhone size={13} /> +91 {s.phone}
                                </div>
                              </td>

                              {/* Class */}
                              <td>
                                {s.className ? (
                                  <span className="stu-class-badge">{s.className}</span>
                                ) : (
                                  <span className="stu-na">—</span>
                                )}
                              </td>

                              {/* Batch */}
                              <td>
                                <span className="stu-batch">
                                  {s.batch || <span className="stu-na">—</span>}
                                </span>
                              </td>

                              {/* Profile Complete */}
                              <td>
                                {s.isProfileComplete ? (
                                  <span className="stu-status-badge stu-status-complete">
                                    <MdCheckCircle size={13} /> Complete
                                  </span>
                                ) : (
                                  <span className="stu-status-badge stu-status-pending">
                                    <MdCancel size={13} /> Pending
                                  </span>
                                )}
                              </td>

                              {/* Joined Date */}
                              <td>
                                <div className="stu-date">
                                  <div>{formatDate(s.createdAt)}</div>
                                  <div className="stu-time">{formatTime(s.createdAt)}</div>
                                </div>
                              </td>

                              {/* Actions */}
                              <td>
                                {deleteConfirm === s._id ? (
                                  <div className="stu-confirm-row">
                                    <button
                                      className="stu-confirm-yes"
                                      onClick={() => handleDelete(s._id)}
                                    >
                                      Yes
                                    </button>
                                    <button
                                      className="stu-confirm-no"
                                      onClick={() => setDeleteConfirm(null)}
                                    >
                                      No
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    className="stu-delete-btn"
                                    onClick={() => setDeleteConfirm(s._id)}
                                    title="Delete student"
                                  >
                                    <MdDelete size={16} />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* ===== PAGINATION ===== */}
                  {pagination.totalPages > 1 && (
                    <div className="stu-pagination">
                      <span className="stu-page-info">
                        Showing {(pagination.page - 1) * pagination.limit + 1}–
                        {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                        {pagination.total} students
                      </span>
                      <div className="stu-page-btns">
                        <button
                          className="stu-page-btn"
                          disabled={pagination.page <= 1}
                          onClick={() => { setPage(p => p - 1); fetchStudents(page - 1); }}
                        >
                          ← Prev
                        </button>
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                          .filter(p => p === 1 || p === pagination.totalPages || Math.abs(p - pagination.page) <= 1)
                          .map((p, idx, arr) => (
                            <span key={p}>
                              {idx > 0 && arr[idx - 1] !== p - 1 && (
                                <span className="stu-page-dots">...</span>
                              )}
                              <button
                                className={`stu-page-btn ${p === pagination.page ? "stu-page-active" : ""}`}
                                onClick={() => { setPage(p); fetchStudents(p); }}
                              >
                                {p}
                              </button>
                            </span>
                          ))}
                        <button
                          className="stu-page-btn"
                          disabled={pagination.page >= pagination.totalPages}
                          onClick={() => { setPage(p => p + 1); fetchStudents(page + 1); }}
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withAdminAuth(async (context) => {
  return { props: {} };
});