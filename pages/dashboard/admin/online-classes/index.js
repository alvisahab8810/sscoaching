// import { withAdminAuth } from "@/lib/withAdminAuth";
// import React, { useState, useEffect } from "react";
// import Topbar from "@/components/dashboard/Topbar";
// import Sidebar from "@/components/dashboard/Sidebar";
// import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
// import { toast } from "sonner";

// const subjects = [
//   "Mathematics",
//   "Physics",
//   "Chemistry",
//   "Biology",
//   "English",
//   "Hindi",
//   "Social Science",
//   "Computer Science",
// ];

// const batches = [
//   "Class 9",
//   "Class 10",
//   "Class 11",
//   "Class 12",
//   "NIOS Stream 1",
//   "NIOS Stream 2",
//   "Dropper Batch",
// ];

// const durations = [
//   "30 mins",
//   "45 mins",
//   "1 hour",
//   "1.5 hours",
//   "2 hours",
//   "2.5 hours",
//   "3 hours",
// ];

// const initialForm = {
//   title: "",
//   teacher: "",
//   subject: "",
//   chapter: "",
//   topic: "",
//   batch: "",
//   date: "",
//   time: "",
//   duration: "",
//   streamLink: "",
//   description: "",
//   status: "upcoming",
// };

// export default function OnlineClassesAdmin() {
//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [activeTab, setActiveTab] = useState("create");

//   // All classes state
//   const [classes, setClasses] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const limit = 10;

//   /* ================= FETCH ALL CLASSES ================= */
//   const fetchClasses = async (currentPage = page) => {
//     try {
//       const res = await fetch(
//         `/api/onlineClasses?page=${currentPage}&limit=${limit}`,
//         { cache: "no-store" }
//       );
//       const data = await res.json();
//       if (data.success) {
//         setClasses(data.data);
//         setTotalPages(data.pagination.totalPages);
//       }
//     } catch (err) {
//       toast.error("Failed to fetch classes");
//     }
//   };

//   useEffect(() => {
//     fetchClasses(page);
//   }, [page]);

//   /* ================= FORM CHANGE ================= */
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   /* ================= RESET ================= */
//   const resetForm = () => {
//     setForm(initialForm);
//     setEditingId(null);
//   };

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const url = editingId
//       ? `/api/onlineClasses/${editingId}`
//       : "/api/onlineClasses";

//     const method = editingId ? "PUT" : "POST";

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (data.success) {
//         toast.success(editingId ? "Class updated!" : "Class scheduled!");
//         resetForm();
//         fetchClasses(page);
//         if (!editingId) setActiveTab("manage");
//       } else {
//         toast.error(data.message || "Something went wrong");
//       }
//     } catch (err) {
//       toast.error("Server error");
//     }

//     setLoading(false);
//   };

//   /* ================= EDIT ================= */
//   const handleEdit = (item) => {
//     setEditingId(item._id);
//     setForm({
//       title: item.title,
//       teacher: item.teacher,
//       subject: item.subject,
//       chapter: item.chapter,
//       topic: item.topic,
//       batch: item.batch,
//       date: item.date,
//       time: item.time,
//       duration: item.duration,
//       streamLink: item.streamLink,
//       description: item.description,
//       status: item.status,
//     });
//     setActiveTab("create");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this class?")) return;

//     try {
//       const res = await fetch(`/api/onlineClasses/${id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("Class deleted successfully");
//         fetchClasses(page);
//       } else {
//         toast.error(data.message || "Delete failed");
//       }
//     } catch (err) {
//       toast.error("Server error");
//     }
//   };

//   /* ================= STATUS BADGE ================= */
//   const StatusBadge = ({ status }) => {
//     const config = {
//       upcoming: { label: "Upcoming", cls: "oc-badge-upcoming" },
//       live:     { label: "🔴 Live",   cls: "oc-badge-live" },
//       completed:{ label: "Completed", cls: "oc-badge-completed" },
//     };
//     const { label, cls } = config[status] || config.upcoming;
//     return <span className={`oc-badge ${cls}`}>{label}</span>;
//   };

//   return (
//     <div className="oc-wrapper">
//       <Topbar />
//       <AdminOffcanvas />

//       <div className="d-flex" style={{ minHeight: "100vh" }}>
//         <Sidebar />

//         <div className="flex-grow-1 bg-light">
//           <div className="container-fluid p-4">

//             {/* ===== PAGE HEADER ===== */}
//             <div className="oc-page-header mb-3">
//               <div>
//                 <h4 className="fw-bold mb-0">Online Classes</h4>
//                 <p className="oc-page-subtitle">
//                   Schedule and manage live streaming sessions for students
//                 </p>
//               </div>
//             </div>

//             {/* ===== TABS ===== */}
//             <div className="oc-tabs">
//               <button
//                 className={`oc-tab-btn ${activeTab === "create" ? "oc-tab-active" : ""}`}
//                 onClick={() => setActiveTab("create")}
//               >
//                 {editingId ? "✏️ Edit Class" : "➕ Schedule Class"}
//               </button>
//               <button
//                 className={`oc-tab-btn ${activeTab === "manage" ? "oc-tab-active" : ""}`}
//                 onClick={() => { setActiveTab("manage"); fetchClasses(page); }}
//               >
//                 📋 All Classes
//               </button>
//             </div>

//             {/* ===== CREATE / EDIT FORM ===== */}
//             {activeTab === "create" && (
//               <div className="oc-card">

//                 {/* Card Top Bar */}
//                 <div className="oc-card-header">
//                   <div className="oc-card-header-icon">🎬</div>
//                   <div>
//                     <div className="oc-card-header-title">
//                       {editingId ? "Edit Live Class" : "Schedule New Live Class"}
//                     </div>
//                     <div className="oc-card-header-desc">
//                       Fill in the details below to create a new live streaming session
//                     </div>
//                   </div>
//                   <div className="oc-live-badge">
//                     <span className="oc-live-dot"></span>
//                      Online Classes
//                   </div>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="oc-form-body">

//                   {/* ---- SECTION: Stream Info ---- */}
//                   <div className="oc-section-label">📡 Stream Information</div>
//                   <div className="row g-3 mb-4">
//                     <div className="col-12">
//                       <label className="form-label fw-semibold">
//                         Class Title <span className="oc-req">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control oc-input"
//                         name="title"
//                         value={form.title}
//                         onChange={handleChange}
//                         placeholder="e.g. Complete Trigonometry – Part 3"
//                         required
//                       />
//                     </div>

//                     <div className="col-12">
//                       <label className="form-label fw-semibold">
//                         YouTube Live Stream Link <span className="oc-req">*</span>
//                       </label>
//                       <div className="oc-link-input-wrap">
//                         <span className="oc-link-icon">▶</span>
//                         <input
//                           type="url"
//                           className="form-control oc-input oc-link-input"
//                           name="streamLink"
//                           value={form.streamLink}
//                           onChange={handleChange}
//                           placeholder="https://www.youtube.com/watch?v=..."
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* ---- SECTION: Class Details ---- */}
//                   <div className="oc-section-label">📚 Class Details</div>
//                   <div className="row g-3 mb-4">
//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">
//                         Teacher / Instructor <span className="oc-req">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control oc-input"
//                         name="teacher"
//                         value={form.teacher}
//                         onChange={handleChange}
//                         placeholder="e.g. Mr. Riyaz Alvi"
//                         required
//                       />
//                     </div>

//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">
//                         Batch / Class <span className="oc-req">*</span>
//                       </label>
//                       <select
//                         className="form-select oc-input"
//                         name="batch"
//                         value={form.batch}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Select Batch</option>
//                         {batches.map((b) => (
//                           <option key={b} value={b}>{b}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">
//                         Subject <span className="oc-req">*</span>
//                       </label>
//                       <select
//                         className="form-select oc-input"
//                         name="subject"
//                         value={form.subject}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="">Select Subject</option>
//                         {subjects.map((s) => (
//                           <option key={s} value={s}>{s}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">Chapter</label>
//                       <input
//                         type="text"
//                         className="form-control oc-input"
//                         name="chapter"
//                         value={form.chapter}
//                         onChange={handleChange}
//                         placeholder="e.g. Chapter 8 – Trigonometry"
//                       />
//                     </div>

//                     <div className="col-12">
//                       <label className="form-label fw-semibold">Topic</label>
//                       <input
//                         type="text"
//                         className="form-control oc-input"
//                         name="topic"
//                         value={form.topic}
//                         onChange={handleChange}
//                         placeholder="e.g. Sine Rule and Cosine Rule – Detailed Explanation"
//                       />
//                     </div>
//                   </div>

//                   {/* ---- SECTION: Schedule ---- */}
//                   <div className="oc-section-label">🗓️ Schedule</div>
//                   <div className="row g-3 mb-4">
//                     <div className="col-md-4">
//                       <label className="form-label fw-semibold">
//                         Date <span className="oc-req">*</span>
//                       </label>
//                       <input
//                         type="date"
//                         className="form-control oc-input"
//                         name="date"
//                         value={form.date}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-4">
//                       <label className="form-label fw-semibold">
//                         Time <span className="oc-req">*</span>
//                       </label>
//                       <input
//                         type="time"
//                         className="form-control oc-input"
//                         name="time"
//                         value={form.time}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-4">
//                       <label className="form-label fw-semibold">Duration</label>
//                       <select
//                         className="form-select oc-input"
//                         name="duration"
//                         value={form.duration}
//                         onChange={handleChange}
//                       >
//                         <option value="">Select Duration</option>
//                         {durations.map((d) => (
//                           <option key={d} value={d}>{d}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   {/* ---- SECTION: Additional ---- */}
//                   <div className="oc-section-label">📝 Additional Info</div>
//                   <div className="row g-3 mb-4">
//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">Status</label>
//                       <div className="oc-status-row">
//                         {["upcoming", "live", "completed"].map((s) => (
//                           <div key={s} className="oc-status-option">
//                             <input
//                               type="radio"
//                               id={`status_${s}`}
//                               name="status"
//                               value={s}
//                               checked={form.status === s}
//                               onChange={handleChange}
//                               className="d-none"
//                             />
//                             <label
//                               htmlFor={`status_${s}`}
//                               className={`oc-status-label ${
//                                 form.status === s ? "oc-status-active" : ""
//                               }`}
//                             >
//                               <span className={`oc-status-dot oc-dot-${s}`}></span>
//                               {s.charAt(0).toUpperCase() + s.slice(1)}
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="col-12">
//                       <label className="form-label fw-semibold">
//                         Description / Notes
//                       </label>
//                       <textarea
//                         className="form-control oc-input"
//                         name="description"
//                         value={form.description}
//                         onChange={handleChange}
//                         rows={3}
//                         placeholder="What will students learn? Any prerequisites or materials needed?"
//                       />
//                     </div>
//                   </div>

//                   {/* ---- FOOTER BUTTONS ---- */}
//                   <div className="oc-form-footer">
//                     <span className="oc-hint-text">
//                       ⚡ Fields marked with * are required
//                     </span>
//                     <div className="d-flex gap-2">
//                       <button
//                         type="button"
//                         className="btn btn-secondary oc-btn-reset"
//                         onClick={resetForm}
//                       >
//                         Reset
//                       </button>
//                       <button
//                         type="submit"
//                         className="btn oc-btn-submit"
//                         disabled={loading}
//                       >
//                         {loading
//                           ? "Saving..."
//                           : editingId
//                           ? "✏️ Update Class"
//                           : "🚀 Schedule Class"}
//                       </button>
//                     </div>
//                   </div>

//                 </form>
//               </div>
//             )}

//             {/* ===== ALL CLASSES TABLE ===== */}
//             {activeTab === "manage" && (
//               <div className="oc-card">

//                 <div className="oc-card-header">
//                   <div className="oc-card-header-icon">📋</div>
//                   <div>
//                     <div className="oc-card-header-title">All Scheduled Classes</div>
//                     <div className="oc-card-header-desc">
//                       Manage, edit or delete your live classes
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-3">
//                   {classes.length === 0 ? (
//                     <div className="oc-empty-state">
//                       <div className="oc-empty-icon">📭</div>
//                       <div className="oc-empty-title">No Classes Scheduled Yet</div>
//                       <p className="text-muted">
//                         Go to "Schedule Class" tab to create your first live class.
//                       </p>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="table-responsive">
//                         <table className="table oc-table align-middle">
//                           <thead>
//                             <tr>
//                               <th>#</th>
//                               <th>Title</th>
//                               <th>Teacher</th>
//                               <th>Subject</th>
//                               <th>Batch</th>
//                               <th>Date</th>
//                               <th>Time</th>
//                               <th>Duration</th>
//                               <th>Status</th>
//                               <th className="text-end">Actions</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {classes.map((item, index) => (
//                               <tr key={item._id}>
//                                 <td className="oc-table-num">
//                                   {(page - 1) * limit + index + 1}
//                                 </td>
//                                 <td>
//                                   <div className="oc-table-title">{item.title}</div>
//                                   {item.chapter && (
//                                     <div className="oc-table-sub">{item.chapter}</div>
//                                   )}
//                                 </td>
//                                 <td>{item.teacher}</td>
//                                 <td>{item.subject}</td>
//                                 <td>
//                                   <span className="oc-batch-tag">{item.batch}</span>
//                                 </td>
//                                 <td>{item.date}</td>
//                                 <td>{item.time}</td>
//                                 <td>{item.duration || "—"}</td>
//                                 <td>
//                                   <StatusBadge status={item.status} />
//                                 </td>
//                                 <td className="text-end">
//                                   <button
//                                     className="oc-icon-btn me-2"
//                                     title="Edit"
//                                     onClick={() => handleEdit(item)}
//                                   >
//                                     ✏️
//                                   </button>
//                                   <button
//                                     className="oc-icon-btn text-danger"
//                                     title="Delete"
//                                     onClick={() => handleDelete(item._id)}
//                                   >
//                                     🗑️
//                                   </button>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>

//                       {/* PAGINATION */}
//                       {totalPages > 1 && (
//                         <div className="d-flex justify-content-center align-items-center gap-2 mt-3 flex-wrap">
//                           <button
//                             className="btn btn-outline-secondary btn-sm"
//                             disabled={page === 1}
//                             onClick={() => setPage(page - 1)}
//                           >
//                             Prev
//                           </button>

//                           {Array.from({ length: totalPages }).map((_, i) => {
//                             const p = i + 1;
//                             if (
//                               p === 1 ||
//                               p === totalPages ||
//                               (p >= page - 2 && p <= page + 2)
//                             ) {
//                               return (
//                                 <button
//                                   key={p}
//                                   className={`btn btn-sm ${
//                                     page === p
//                                       ? "oc-btn-submit"
//                                       : "btn-outline-secondary"
//                                   }`}
//                                   onClick={() => setPage(p)}
//                                 >
//                                   {p}
//                                 </button>
//                               );
//                             }
//                             if (p === page - 3 || p === page + 3) {
//                               return <span key={p}>…</span>;
//                             }
//                             return null;
//                           })}

//                           <button
//                             className="btn btn-outline-secondary btn-sm"
//                             disabled={page === totalPages}
//                             onClick={() => setPage(page + 1)}
//                           >
//                             Next
//                           </button>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export const getServerSideProps = withAdminAuth(async () => {
//   return { props: {} };
// });




import { withAdminAuth } from "@/lib/withAdminAuth";
import React, { useState, useEffect } from "react";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Hindi",
  "Social Science",
  "Computer Science",
];

const batches = [
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "NIOS Stream 1",
  "NIOS Stream 2",
  "Dropper Batch",
];

const durations = [
  "30 mins",
  "45 mins",
  "1 hour",
  "1.5 hours",
  "2 hours",
  "2.5 hours",
  "3 hours",
];

const initialForm = {
  title: "",
  teacher: "",
  subject: "",
  chapter: "",
  topic: "",
  batch: "",
  date: "",
  time: "",
  duration: "",
  streamLink: "",
  description: "",
  status: "upcoming",
};

/* ================================================================
   NOTES MANAGER MODAL COMPONENT
================================================================ */
function NotesManager({ cls, onClose, onUpdate }) {
  const [notes, setNotes] = useState(cls.notes || []);
  const [form, setForm] = useState({ title: "", driveLink: "", type: "notes" });
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const typeConfig = {
    notes:      { label: "Notes",      color: "#6c47d4", bg: "#ede9ff" },
    assignment: { label: "Assignment", color: "#d97706", bg: "#fef3c7" },
    solution:   { label: "Solution",   color: "#059669", bg: "#d1fae5" },
    other:      { label: "Other",      color: "#6b7280", bg: "#f3f4f6" },
  };

  const handleAdd = async () => {
    setError("");
    if (!form.title.trim()) { setError("Title is required"); return; }
    if (!form.driveLink.trim()) { setError("Google Drive link is required"); return; }
    if (!form.driveLink.includes("drive.google.com") && !form.driveLink.includes("docs.google.com")) {
      setError("Please paste a valid Google Drive link"); return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/notes?id=${cls._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setNotes(data.notes);
        onUpdate(data.notes);
        setForm({ title: "", driveLink: "", type: "notes" });
        setAdding(false);
        toast.success("Note added!");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Server error");
    }
    setLoading(false);
  };

  const handleDelete = async (noteId) => {
    if (!confirm("Delete this note?")) return;
    try {
      const res = await fetch(`/api/admin/notes?id=${cls._id}&noteId=${noteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setNotes(data.notes);
        onUpdate(data.notes);
        toast.success("Note deleted");
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="nm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="nm-modal">

        {/* HEADER */}
        <div className="nm-header">
          <div>
            <div className="nm-title">📎 Notes & Materials</div>
            <div className="nm-subtitle">{cls.title}</div>
          </div>
          <button className="nm-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* BODY */}
        <div className="nm-body">
          {notes.length === 0 && !adding ? (
            <div className="nm-empty">
              <div className="nm-empty-icon">📭</div>
              <div>No notes added yet</div>
              <button className="nm-add-first-btn" onClick={() => setAdding(true)}>
                + Add First Note
              </button>
            </div>
          ) : (
            <div className="nm-notes-list">
              {notes.map((note) => (
                <div key={note._id} className="nm-note-item">
                  <div className="nm-note-left">
                    <span
                      className="nm-note-type"
                      style={{
                        background: typeConfig[note.type]?.bg || "#f3f4f6",
                        color: typeConfig[note.type]?.color || "#6b7280",
                      }}
                    >
                      {typeConfig[note.type]?.label || note.type}
                    </span>
                    <span className="nm-note-title">{note.title}</span>
                  </div>
                  <div className="nm-note-actions">
                    <a
                      href={note.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nm-view-btn"
                    >
                      👁 View
                    </a>
                    <button className="nm-del-btn" onClick={() => handleDelete(note._id)}>
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ADD FORM */}
          {adding && (
            <div className="nm-add-form">
              <div className="nm-add-form-title">Add New Material</div>
              {error && <div className="nm-error">{error}</div>}

              <div className="nm-field">
                <label className="nm-label">Type</label>
                <div className="nm-type-row">
                  {Object.entries(typeConfig).map(([key, val]) => (
                    <button
                      key={key}
                      className={`nm-type-btn ${form.type === key ? "nm-type-active" : ""}`}
                      style={form.type === key ? { background: val.bg, color: val.color, borderColor: val.color } : {}}
                      onClick={() => setForm({ ...form, type: key })}
                    >
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="nm-field">
                <label className="nm-label">Title <span style={{ color: "#ef4444" }}>*</span></label>
                <input
                  type="text"
                  className="nm-input"
                  placeholder="e.g. Chapter 5 Notes, Assignment 3"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  autoFocus
                />
              </div>

              <div className="nm-field">
                <label className="nm-label">Google Drive Link <span style={{ color: "#ef4444" }}>*</span></label>
                <input
                  type="url"
                  className="nm-input"
                  placeholder="https://drive.google.com/file/d/..."
                  value={form.driveLink}
                  onChange={(e) => setForm({ ...form, driveLink: e.target.value })}
                />
                <div className="nm-hint">
                  📌 Make sure file is set to "Anyone with link can view" in Google Drive
                </div>
              </div>

              <div className="nm-form-btns">
                <button className="nm-cancel-btn" onClick={() => { setAdding(false); setError(""); }}>
                  Cancel
                </button>
                <button className="nm-save-btn" onClick={handleAdd} disabled={loading}>
                  {loading ? "Adding..." : "✓ Add Note"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {!adding && (
          <div className="nm-footer">
            <span className="nm-count">{notes.length} material{notes.length !== 1 ? "s" : ""} added</span>
            <button className="nm-add-btn" onClick={() => setAdding(true)}>
              + Add Material
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================
   MAIN PAGE
================================================================ */
export default function OnlineClassesAdmin() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState("create");

  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // Notes modal state
  const [notesModal, setNotesModal] = useState(null);

  /* ================= FETCH ALL CLASSES ================= */
  const fetchClasses = async (currentPage = page) => {
    try {
      const res = await fetch(
        `/api/onlineClasses?page=${currentPage}&limit=${limit}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      if (data.success) {
        setClasses(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      toast.error("Failed to fetch classes");
    }
  };

  useEffect(() => {
    fetchClasses(page);
  }, [page]);

  /* ================= FORM CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = editingId
      ? `/api/onlineClasses/${editingId}`
      : "/api/onlineClasses";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editingId ? "Class updated!" : "Class scheduled!");
        resetForm();
        fetchClasses(page);
        if (!editingId) setActiveTab("manage");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Server error");
    }

    setLoading(false);
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      teacher: item.teacher,
      subject: item.subject,
      chapter: item.chapter,
      topic: item.topic,
      batch: item.batch,
      date: item.date,
      time: item.time,
      duration: item.duration,
      streamLink: item.streamLink,
      description: item.description,
      status: item.status,
    });
    setActiveTab("create");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this class?")) return;
    try {
      const res = await fetch(`/api/onlineClasses/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Class deleted successfully");
        fetchClasses(page);
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  /* ================= STATUS BADGE ================= */
  const StatusBadge = ({ status }) => {
    const config = {
      upcoming:  { label: "Upcoming",  cls: "oc-badge-upcoming" },
      live:      { label: "🔴 Live",   cls: "oc-badge-live" },
      completed: { label: "Completed", cls: "oc-badge-completed" },
    };
    const { label, cls } = config[status] || config.upcoming;
    return <span className={`oc-badge ${cls}`}>{label}</span>;
  };

  return (
    <div className="oc-wrapper">
      <Topbar />
      <AdminOffcanvas />

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Sidebar />

        <div className="flex-grow-1 bg-light">
          <div className="container-fluid p-4">

            {/* ===== PAGE HEADER ===== */}
            <div className="oc-page-header mb-3">
              <div>
                <h4 className="fw-bold mb-0">Online Classes</h4>
                <p className="oc-page-subtitle">
                  Schedule and manage live streaming sessions for students
                </p>
              </div>
            </div>

            {/* ===== TABS ===== */}
            <div className="oc-tabs">
              <button
                className={`oc-tab-btn ${activeTab === "create" ? "oc-tab-active" : ""}`}
                onClick={() => setActiveTab("create")}
              >
                {editingId ? "✏️ Edit Class" : "➕ Schedule Class"}
              </button>
              <button
                className={`oc-tab-btn ${activeTab === "manage" ? "oc-tab-active" : ""}`}
                onClick={() => { setActiveTab("manage"); fetchClasses(page); }}
              >
                📋 All Classes
              </button>
            </div>

            {/* ===== CREATE / EDIT FORM ===== */}
            {activeTab === "create" && (
              <div className="oc-card">
                <div className="oc-card-header">
                  <div className="oc-card-header-icon">🎬</div>
                  <div>
                    <div className="oc-card-header-title">
                      {editingId ? "Edit Live Class" : "Schedule New Live Class"}
                    </div>
                    <div className="oc-card-header-desc">
                      Fill in the details below to create a new live streaming session
                    </div>
                  </div>
                  <div className="oc-live-badge">
                    <span className="oc-live-dot"></span>
                    Online Classes
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="oc-form-body">

                  <div className="oc-section-label">📡 Stream Information</div>
                  <div className="row g-3 mb-4">
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Class Title <span className="oc-req">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control oc-input"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g. Complete Trigonometry – Part 3"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        YouTube Live Stream Link <span className="oc-req">*</span>
                      </label>
                      <div className="oc-link-input-wrap">
                        <span className="oc-link-icon">▶</span>
                        <input
                          type="url"
                          className="form-control oc-input oc-link-input"
                          name="streamLink"
                          value={form.streamLink}
                          onChange={handleChange}
                          placeholder="https://www.youtube.com/watch?v=..."
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="oc-section-label">📚 Class Details</div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Teacher / Instructor <span className="oc-req">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control oc-input"
                        name="teacher"
                        value={form.teacher}
                        onChange={handleChange}
                        placeholder="e.g. Mr. Riyaz Alvi"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Batch / Class <span className="oc-req">*</span>
                      </label>
                      <select
                        className="form-select oc-input"
                        name="batch"
                        value={form.batch}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Batch</option>
                        {batches.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Subject <span className="oc-req">*</span>
                      </label>
                      <select
                        className="form-select oc-input"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Subject</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Chapter</label>
                      <input
                        type="text"
                        className="form-control oc-input"
                        name="chapter"
                        value={form.chapter}
                        onChange={handleChange}
                        placeholder="e.g. Chapter 8 – Trigonometry"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">Topic</label>
                      <input
                        type="text"
                        className="form-control oc-input"
                        name="topic"
                        value={form.topic}
                        onChange={handleChange}
                        placeholder="e.g. Sine Rule and Cosine Rule – Detailed Explanation"
                      />
                    </div>
                  </div>

                  <div className="oc-section-label">🗓️ Schedule</div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Date <span className="oc-req">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control oc-input"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">
                        Time <span className="oc-req">*</span>
                      </label>
                      <input
                        type="time"
                        className="form-control oc-input"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Duration</label>
                      <select
                        className="form-select oc-input"
                        name="duration"
                        value={form.duration}
                        onChange={handleChange}
                      >
                        <option value="">Select Duration</option>
                        {durations.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="oc-section-label">📝 Additional Info</div>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Status</label>
                      <div className="oc-status-row">
                        {["upcoming", "live", "completed"].map((s) => (
                          <div key={s} className="oc-status-option">
                            <input
                              type="radio"
                              id={`status_${s}`}
                              name="status"
                              value={s}
                              checked={form.status === s}
                              onChange={handleChange}
                              className="d-none"
                            />
                            <label
                              htmlFor={`status_${s}`}
                              className={`oc-status-label ${form.status === s ? "oc-status-active" : ""}`}
                            >
                              <span className={`oc-status-dot oc-dot-${s}`}></span>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Description / Notes
                      </label>
                      <textarea
                        className="form-control oc-input"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="What will students learn? Any prerequisites or materials needed?"
                      />
                    </div>
                  </div>

                  <div className="oc-form-footer">
                    <span className="oc-hint-text">
                      ⚡ Fields marked with * are required
                    </span>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-secondary oc-btn-reset"
                        onClick={resetForm}
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="btn oc-btn-submit"
                        disabled={loading}
                      >
                        {loading
                          ? "Saving..."
                          : editingId
                          ? "✏️ Update Class"
                          : "🚀 Schedule Class"}
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            )}

            {/* ===== ALL CLASSES TABLE ===== */}
            {activeTab === "manage" && (
              <div className="oc-card">
                <div className="oc-card-header">
                  <div className="oc-card-header-icon">📋</div>
                  <div>
                    <div className="oc-card-header-title">All Scheduled Classes</div>
                    <div className="oc-card-header-desc">
                      Manage, edit or delete your live classes
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  {classes.length === 0 ? (
                    <div className="oc-empty-state">
                      <div className="oc-empty-icon">📭</div>
                      <div className="oc-empty-title">No Classes Scheduled Yet</div>
                      <p className="text-muted">
                        Go to "Schedule Class" tab to create your first live class.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="table-responsive">
                        <table className="table oc-table align-middle">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Title</th>
                              <th>Teacher</th>
                              <th>Subject</th>
                              <th>Batch</th>
                              <th>Date</th>
                              <th>Time</th>
                              <th>Duration</th>
                              <th>Status</th>
                              <th className="text-end">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {classes.map((item, index) => (
                              <tr key={item._id}>
                                <td className="oc-table-num">
                                  {(page - 1) * limit + index + 1}
                                </td>
                                <td>
                                  <div className="oc-table-title">{item.title}</div>
                                  {item.chapter && (
                                    <div className="oc-table-sub">{item.chapter}</div>
                                  )}
                                </td>
                                <td>{item.teacher}</td>
                                <td>{item.subject}</td>
                                <td>
                                  <span className="oc-batch-tag">{item.batch}</span>
                                </td>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td>{item.duration || "—"}</td>
                                <td>
                                  <StatusBadge status={item.status} />
                                </td>
                                <td className="text-end">
                                  {/* 📎 NOTES BUTTON — NEW */}
                                  <button
                                    className="oc-icon-btn me-2"
                                    title="Notes & Materials"
                                    onClick={() => setNotesModal(item)}
                                  >
                                    📎
                                    {item.notes?.length > 0 && (
                                      <span className="oc-notes-count">
                                        {item.notes.length}
                                      </span>
                                    )}
                                  </button>
                                  <button
                                    className="oc-icon-btn me-2"
                                    title="Edit"
                                    onClick={() => handleEdit(item)}
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    className="oc-icon-btn text-danger"
                                    title="Delete"
                                    onClick={() => handleDelete(item._id)}
                                  >
                                    🗑️
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* PAGINATION */}
                      {totalPages > 1 && (
                        <div className="d-flex justify-content-center align-items-center gap-2 mt-3 flex-wrap">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                          >
                            Prev
                          </button>
                          {Array.from({ length: totalPages }).map((_, i) => {
                            const p = i + 1;
                            if (p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2)) {
                              return (
                                <button
                                  key={p}
                                  className={`btn btn-sm ${page === p ? "oc-btn-submit" : "btn-outline-secondary"}`}
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
                    </>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ===== NOTES MODAL ===== */}
      {notesModal && (
        <NotesManager
          cls={notesModal}
          onClose={() => setNotesModal(null)}
          onUpdate={(updatedNotes) => {
            setClasses((prev) =>
              prev.map((c) =>
                c._id === notesModal._id ? { ...c, notes: updatedNotes } : c
              )
            );
          }}
        />
      )}

    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => {
  return { props: {} };
});