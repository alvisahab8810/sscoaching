import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";
import {
  MdPersonAdd, MdSearch, MdRefresh, MdPeople, MdCheckCircle,
  MdBlock, MdDelete, MdVisibility, MdToggleOn, MdToggleOff,
} from "react-icons/md";

const FEATURE_LABELS = {
  blogs: "Blogs", faqs: "FAQs", students: "Students", courses: "Courses",
  admissions: "Applications", announcements: "Announcements", leads: "Leads",
  "student-success": "Student Success", "online-classes": "Online Classes",
  invoices: "Invoices", enrollments: "Enrollments",
};

export default function SubAdminsPage() {
  const [subAdmins, setSubAdmins] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toggling, setToggling] = useState(null);

  const fetchSubAdmins = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: 50, ...(search && { search }), ...(filterStatus && { status: filterStatus }) });
      const res = await fetch(`/api/admin/sub-admins?${params}`);
      const data = await res.json();
      if (data.success) {
        setSubAdmins(data.data);
        const active = data.data.filter(s => s.status === "active").length;
        setStats({ total: data.total, active, inactive: data.total - active });
      }
    } catch {
      toast.error("Failed to load sub-admins");
    }
    setLoading(false);
  };

  useEffect(() => { fetchSubAdmins(); }, [search, filterStatus]);

  const handleToggleStatus = async (sa) => {
    setToggling(sa._id);
    try {
      const newStatus = sa.status === "active" ? "inactive" : "active";
      const res = await fetch(`/api/admin/sub-admins/${sa._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`${sa.name} ${newStatus === "active" ? "activated" : "deactivated"}`);
        fetchSubAdmins();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to update status");
    }
    setToggling(null);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/sub-admins/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Sub-admin deleted");
        fetchSubAdmins();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to delete");
    }
    setDeleteConfirm(null);
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

  return (
    <>
      <Head><title>Sub-Admins — SS Coaching</title></Head>
      <div className="oc-wrapper">
        <Topbar />
        <AdminOffcanvas />
        <div className="d-flex" style={{ minHeight: "100vh" }}>
          <Sidebar />
          <div className="flex-grow-1 bg-light">
            <div className="container-fluid p-4">

              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <div>
                  <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f1f3d", margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
                    <MdPeople size={28} color="#5641CE" /> Sub-Admin Management
                  </h1>
                  <p style={{ color: "#6b7a99", margin: "4px 0 0", fontSize: "0.9rem" }}>Manage sub-admins, permissions, and access control</p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={fetchSubAdmins} style={btnStyle("#6b7a99")}><MdRefresh size={16} /> Refresh</button>
                  <Link href="/dashboard/admin/sub-admins/invite" style={{ ...btnStyle("#5641CE"), textDecoration: "none" }}>
                    <MdPersonAdd size={16} /> Invite Sub-Admin
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
                {[
                  { label: "Total Sub-Admins", value: stats.total, color: "#5641CE", icon: <MdPeople size={22} /> },
                  { label: "Active", value: stats.active, color: "#22c55e", icon: <MdCheckCircle size={22} /> },
                  { label: "Inactive", value: stats.inactive, color: "#ef4444", icon: <MdBlock size={22} /> },
                ].map(s => (
                  <div key={s.label} style={{ background: "#fff", borderRadius: 12, padding: "1.2rem 1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ background: s.color + "18", color: s.color, borderRadius: 10, padding: 10, display: "flex" }}>{s.icon}</div>
                    <div>
                      <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0f1f3d" }}>{s.value}</div>
                      <div style={{ fontSize: "0.82rem", color: "#6b7a99" }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div style={{ background: "#fff", borderRadius: 12, padding: "1rem 1.2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: "1rem", display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <MdSearch size={18} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#6b7a99" }} />
                  <input
                    type="text" placeholder="Search by name, email, or username..."
                    value={search} onChange={e => setSearch(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem 0.8rem 0.5rem 2.2rem", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: "0.9rem", outline: "none" }}
                  />
                </div>
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                  style={{ padding: "0.5rem 0.8rem", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: "0.9rem", color: "#374151" }}>
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Table */}
              <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" }}>
                {loading ? (
                  <div style={{ padding: "3rem", textAlign: "center", color: "#6b7a99" }}>Loading...</div>
                ) : subAdmins.length === 0 ? (
                  <div style={{ padding: "3rem", textAlign: "center", color: "#6b7a99" }}>
                    <MdPeople size={48} style={{ opacity: 0.3, marginBottom: 12 }} />
                    <div style={{ fontWeight: 600 }}>No sub-admins found</div>
                    <Link href="/dashboard/admin/sub-admins/invite" style={{ color: "#5641CE", fontSize: "0.9rem" }}>Invite your first sub-admin →</Link>
                  </div>
                ) : (
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f8f9ff", borderBottom: "2px solid #e8eaf5" }}>
                        {["Name", "Username", "Email", "Permissions", "Status", "Created", "Actions"].map(h => (
                          <th key={h} style={{ padding: "0.85rem 1rem", textAlign: "left", fontSize: "0.78rem", fontWeight: 700, color: "#6b7a99", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {subAdmins.map((sa, i) => (
                        <tr key={sa._id} style={{ borderBottom: "1px solid #f0f1f5", background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
                          <td style={{ padding: "0.9rem 1rem" }}>
                            <div style={{ fontWeight: 700, color: "#0f1f3d" }}>{sa.name}</div>
                          </td>
                          <td style={{ padding: "0.9rem 1rem" }}>
                            <code style={{ background: "#f0f1f5", padding: "2px 8px", borderRadius: 4, fontSize: "0.85rem", color: "#5641CE" }}>{sa.username}</code>
                          </td>
                          <td style={{ padding: "0.9rem 1rem", fontSize: "0.88rem", color: "#374151" }}>{sa.email}</td>
                          <td style={{ padding: "0.9rem 1rem" }}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                              {sa.permissions.length === 0 ? (
                                <span style={{ fontSize: "0.78rem", color: "#9ca3af" }}>None</span>
                              ) : sa.permissions.slice(0, 3).map(p => (
                                <span key={p} style={{ background: "#ede9ff", color: "#5641CE", padding: "2px 8px", borderRadius: 20, fontSize: "0.72rem", fontWeight: 600 }}>
                                  {FEATURE_LABELS[p] || p}
                                </span>
                              ))}
                              {sa.permissions.length > 3 && (
                                <span style={{ background: "#f0f1f5", color: "#6b7a99", padding: "2px 8px", borderRadius: 20, fontSize: "0.72rem" }}>
                                  +{sa.permissions.length - 3} more
                                </span>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: "0.9rem 1rem" }}>
                            <span style={{
                              background: sa.status === "active" ? "#dcfce7" : "#fee2e2",
                              color: sa.status === "active" ? "#16a34a" : "#dc2626",
                              padding: "3px 12px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 700,
                            }}>{sa.status}</span>
                          </td>
                          <td style={{ padding: "0.9rem 1rem", fontSize: "0.82rem", color: "#6b7a99" }}>{formatDate(sa.createdAt)}</td>
                          <td style={{ padding: "0.9rem 1rem" }}>
                            <div style={{ display: "flex", gap: 6 }}>
                              <Link href={`/dashboard/admin/sub-admins/${sa._id}`} title="View Details"
                                style={{ background: "#ede9ff", color: "#5641CE", border: "none", borderRadius: 6, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", textDecoration: "none" }}>
                                <MdVisibility size={16} />
                              </Link>
                              <button onClick={() => handleToggleStatus(sa)} disabled={toggling === sa._id} title={sa.status === "active" ? "Deactivate" : "Activate"}
                                style={{ background: sa.status === "active" ? "#fee2e2" : "#dcfce7", color: sa.status === "active" ? "#dc2626" : "#16a34a", border: "none", borderRadius: 6, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                                {sa.status === "active" ? <MdToggleOff size={16} /> : <MdToggleOn size={16} />}
                              </button>
                              <button onClick={() => setDeleteConfirm(sa)} title="Delete"
                                style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 6, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                                <MdDelete size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", maxWidth: 400, width: "90%", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>⚠️</div>
            <h3 style={{ fontWeight: 800, color: "#0f1f3d", marginBottom: 8 }}>Delete Sub-Admin?</h3>
            <p style={{ color: "#6b7a99", marginBottom: "1.5rem" }}>
              Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This will also delete all their activity logs. This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ ...btnStyle("#6b7a99"), padding: "0.6rem 1.5rem" }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm._id)} style={{ ...btnStyle("#ef4444"), padding: "0.6rem 1.5rem" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function btnStyle(color) {
  return {
    background: color, color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 1rem",
    cursor: "pointer", fontSize: "0.88rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6,
  };
}

export const getServerSideProps = withAdminAuth(async () => {
  return { props: {} };
}, { superAdminOnly: true });
