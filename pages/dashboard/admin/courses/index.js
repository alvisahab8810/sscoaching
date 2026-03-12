
// import { useState, useRef, useEffect, useCallback } from "react";
// import { withAdminAuth } from "@/lib/withAdminAuth";
// import Head from "next/head";
// import Topbar from "@/components/dashboard/Topbar";
// import Sidebar from "@/components/dashboard/Sidebar";
// import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
// import { toast } from "sonner";
// import {
//   MdAdd, MdEdit, MdDelete, MdPublish, MdUnpublished,
//   MdSchool, MdPeople, MdPlayCircle, MdFolder, MdFolderOpen,
//   MdArrowBack, MdExpandMore, MdExpandLess, MdClose,
//   MdCheckCircle, MdDrafts, MdVideoLibrary, MdTimelapse,
//   MdImage, MdLink, MdCloudUpload, MdSave, MdRefresh,
// } from "react-icons/md";
// import { FaRupeeSign } from "react-icons/fa";
// import { BiSolidBookContent } from "react-icons/bi";
// import { BsCollection } from "react-icons/bs";

// /* ─────────────────────────────────────────
//    CONSTANTS
// ───────────────────────────────────────── */
// const subjects = ["Mathematics","Physics","Chemistry","Biology","English","Hindi","Social Science","Computer Science"];
// const batches  = ["Class 9","Class 10","Class 11","Class 12","NIOS Stream 1","NIOS Stream 2","Dropper Batch"];

// const subjectColors = {
//   Mathematics:"#6c47d4", Physics:"#0ea5e9", Chemistry:"#f59e0b",
//   Biology:"#10b981", English:"#f43f5e", Hindi:"#8b5cf6",
//   "Social Science":"#64748b", "Computer Science":"#06b6d4",
// };
// const subjectIcons = {
//   Mathematics:"📐", Physics:"⚛️", Chemistry:"🧪",
//   Biology:"🧬", English:"📖", Hindi:"🪔",
//   "Social Science":"🌍", "Computer Science":"💻",
// };
// const getColor = (s) => subjectColors[s] || "#6c47d4";

// const EMPTY_FORM = {
//   title:"", subject:"", batch:"", price:"",
//   isFree:false, description:"", status:"draft", featureImage:"",
// };

// /* ─────────────────────────────────────────
//    IMAGE UPLOADER (reusable component)
// ───────────────────────────────────────── */
// function ImageUploader({ value, onChange }) {
//   const [tab, setTab]           = useState("upload");
//   const [dragging, setDragging] = useState(false);
//   const [urlInput, setUrlInput] = useState(value && !value.startsWith("data:") ? value : "");
//   const fileRef                 = useRef(null);

//   const handleFile = (file) => {
//     if (!file) return;
//     if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
//     if (file.size > 5 * 1024 * 1024)    { toast.error("Image must be under 5MB"); return; }
//     const reader = new FileReader();
//     reader.onloadend = () => { onChange(reader.result); toast.success("Image loaded!"); };
//     reader.readAsDataURL(file);
//   };

//   const handleUrlBlur = () => {
//     if (urlInput.trim()) onChange(urlInput.trim());
//   };

//   const clear = () => {
//     onChange("");
//     setUrlInput("");
//     if (fileRef.current) fileRef.current.value = "";
//   };

//   return (
//     <div className="cr-img-box">
//       {/* Tabs */}
//       <div className="cr-img-tabs">
//         <button className={`cr-img-tab ${tab === "upload" ? "cr-img-tab-active" : ""}`} onClick={() => setTab("upload")}>
//           <MdCloudUpload size={15} /> Upload / Drag &amp; Drop
//         </button>
//         <button className={`cr-img-tab ${tab === "url" ? "cr-img-tab-active" : ""}`} onClick={() => setTab("url")}>
//           <MdLink size={15} /> Paste URL
//         </button>
//       </div>

//       {/* Preview */}
//       {value ? (
//         <div className="cr-img-preview-wrap">
//           <img src={value} alt="Preview" className="cr-img-preview-img" onError={clear} />
//           <div className="cr-img-preview-overlay">
//             <button className="cr-img-remove-btn" onClick={clear}><MdClose size={14} /> Remove</button>
//           </div>
//           <div className="cr-img-preview-label"><MdCheckCircle size={13} color="#10b981" /> Image ready</div>
//           <div className="cr-img-switch-hint">
//             Want a different image?
//             <button className="cr-img-switch-btn" onClick={clear}>Choose another</button>
//           </div>
//         </div>
//       ) : tab === "upload" ? (
//         <div
//           className={`cr-img-dropzone ${dragging ? "cr-img-dropzone-active" : ""}`}
//           onDragOver={e => { e.preventDefault(); setDragging(true); }}
//           onDragLeave={e => { e.preventDefault(); setDragging(false); }}
//           onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
//           onClick={() => fileRef.current?.click()}
//         >
//           <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }}
//             onChange={e => handleFile(e.target.files[0])} />
//           <div className="cr-img-dropzone-icon"><MdCloudUpload size={42} /></div>
//           <div className="cr-img-dropzone-title">{dragging ? "Drop it here!" : "Drag & drop your image here"}</div>
//           <div className="cr-img-dropzone-sub">or click to browse files</div>
//           <div className="cr-img-dropzone-hint">PNG, JPG, WEBP · Max 5MB</div>
//         </div>
//       ) : (
//         <div className="cr-img-url-wrap">
//           <div className="cr-img-url-row">
//             <MdLink size={16} className="cr-img-link-icon" />
//             <input className="cr-input" placeholder="https://example.com/course-thumbnail.jpg"
//               value={urlInput}
//               onChange={e => setUrlInput(e.target.value)}
//               onBlur={handleUrlBlur}
//               onKeyDown={e => e.key === "Enter" && handleUrlBlur()}
//             />
//           </div>
//           <div className="cr-img-url-hint">
//             💡 Upload to <strong>Google Drive</strong> or <strong>Imgur</strong> → copy direct link → paste here
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ─────────────────────────────────────────
//    MAIN PAGE
// ───────────────────────────────────────── */
// export default function AdminCoursesPage({ admin }) {
//   const [view, setView]                       = useState("list");
//   const [courses, setCourses]                 = useState([]);
//   const [loading, setLoading]                 = useState(true);
//   const [saving, setSaving]                   = useState(false);
//   const [selectedCourse, setSelectedCourse]   = useState(null);
//   const [activeChapter, setActiveChapter]     = useState(null);
//   const [showLessonForm, setShowLessonForm]   = useState(null);
//   const [showChapterForm, setShowChapterForm] = useState(false);
//   const [chapterInput, setChapterInput]       = useState("");
//   const [lessonForm, setLessonForm]           = useState({ title:"", youtubeLink:"", duration:"" });

//   // Shared form used for both CREATE and EDIT
//   const [form, setForm]       = useState(EMPTY_FORM);
//   const [isEditing, setIsEditing] = useState(false); // true = editing existing course info

//   const totalLessons = (c) => c.chapters?.reduce((a, ch) => a + ch.lessons.length, 0) || 0;

//   /* ── Fetch all courses ── */
//   const fetchCourses = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res  = await fetch("/api/courses");
//       const data = await res.json();
//       if (data.success) setCourses(data.courses);
//       else toast.error("Failed to load courses");
//     } catch { toast.error("Network error"); }
//     finally  { setLoading(false); }
//   }, []);

//   useEffect(() => { fetchCourses(); }, [fetchCourses]);

//   /* ── Reset and go back ── */
//   const resetAndGoBack = () => {
//     setView("list");
//     setSelectedCourse(null);
//     setForm(EMPTY_FORM);
//     setIsEditing(false);
//     setActiveChapter(null);
//     setShowChapterForm(false);
//     setShowLessonForm(null);
//   };

//   /* ── Open edit panel (populates form with existing data) ── */
//   const openManage = (course) => {
//     setSelectedCourse(course);
//     setForm({
//       title:        course.title,
//       subject:      course.subject,
//       batch:        course.batch,
//       price:        course.price?.toString() || "",
//       isFree:       course.isFree,
//       description:  course.description,
//       status:       course.status,
//       featureImage: course.featureImage || "",
//     });
//     setIsEditing(false); // start in "content" tab, not edit
//     setView("detail");
//   };

//   /* ════════════════════════════════════════
//      API CALLS
//   ════════════════════════════════════════ */

//   /* ── Create course ── */
//   const handleCreate = async () => {
//     if (!form.title.trim()) { toast.error("Title is required"); return; }
//     if (!form.subject)      { toast.error("Subject is required"); return; }
//     if (!form.batch)        { toast.error("Batch is required"); return; }
//     setSaving(true);
//     try {
//       const res  = await fetch("/api/courses", {
//         method: "POST",
//         headers: { "Content-Type":"application/json" },
//         body: JSON.stringify({ ...form, price: Number(form.price) || 0 }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("Course created!");
//         setCourses(prev => [data.course, ...prev]);
//         setSelectedCourse(data.course);
//         setForm({
//           title: data.course.title, subject: data.course.subject,
//           batch: data.course.batch, price: data.course.price?.toString(),
//           isFree: data.course.isFree, description: data.course.description,
//           status: data.course.status, featureImage: data.course.featureImage || "",
//         });
//         setView("detail");
//       } else { toast.error(data.error || "Failed to create"); }
//     } catch { toast.error("Network error"); }
//     finally { setSaving(false); }
//   };

//   /* ── Save course info edits ── */
//   const handleSaveInfo = async () => {
//     if (!form.title.trim()) { toast.error("Title is required"); return; }
//     setSaving(true);
//     try {
//       const res  = await fetch(`/api/courses/${selectedCourse._id}?action=info`, {
//         method: "PUT",
//         headers: { "Content-Type":"application/json" },
//         body: JSON.stringify({ ...form, price: Number(form.price) || 0 }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("Course updated!");
//         setSelectedCourse(data.course);
//         setCourses(prev => prev.map(c => c._id === data.course._id ? data.course : c));
//         setIsEditing(false);
//       } else { toast.error(data.error || "Update failed"); }
//     } catch { toast.error("Network error"); }
//     finally { setSaving(false); }
//   };

//   /* ── Toggle publish from list ── */
//   const handleTogglePublish = async (course) => {
//     try {
//       const res  = await fetch(`/api/courses/${course._id}?action=toggle-status`, {
//         method: "PUT", headers: { "Content-Type":"application/json" },
//       });
//       const data = await res.json();
//       if (data.success) {
//         setCourses(prev => prev.map(c => c._id === data.course._id ? data.course : c));
//         if (selectedCourse?._id === data.course._id) setSelectedCourse(data.course);
//         toast.success(`Course ${data.course.status === "published" ? "published" : "unpublished"}!`);
//       }
//     } catch { toast.error("Network error"); }
//   };

//   /* ── Delete course ── */
//   const handleDelete = async (id) => {
//     if (!confirm("Delete this course? This cannot be undone.")) return;
//     try {
//       const res  = await fetch(`/api/courses/${id}`, { method: "DELETE" });
//       const data = await res.json();
//       if (data.success) {
//         setCourses(prev => prev.filter(c => c._id !== id));
//         toast.success("Course deleted");
//         if (selectedCourse?._id === id) resetAndGoBack();
//       }
//     } catch { toast.error("Network error"); }
//   };

//   /* ── Add chapter ── */
//   const handleAddChapter = async () => {
//     if (!chapterInput.trim()) { toast.error("Chapter title required"); return; }
//     setSaving(true);
//     try {
//       const res  = await fetch(`/api/courses/${selectedCourse._id}?action=add-chapter`, {
//         method: "PUT", headers: { "Content-Type":"application/json" },
//         body: JSON.stringify({ title: chapterInput.trim() }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setSelectedCourse(data.course);
//         setCourses(prev => prev.map(c => c._id === data.course._id ? data.course : c));
//         setChapterInput("");
//         setShowChapterForm(false);
//         toast.success("Chapter added!");
//       } else { toast.error(data.error || "Failed"); }
//     } catch { toast.error("Network error"); }
//     finally { setSaving(false); }
//   };

//   /* ── Delete chapter ── */
//   const handleDeleteChapter = async (chapterId) => {
//     if (!confirm("Delete this chapter and all its lessons?")) return;
//     try {
//       const res  = await fetch(`/api/courses/${selectedCourse._id}?action=delete-chapter`, {
//         method: "PUT", headers: { "Content-Type":"application/json" },
//         body: JSON.stringify({ chapterId }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setSelectedCourse(data.course);
//         setCourses(prev => prev.map(c => c._id === data.course._id ? data.course : c));
//         toast.success("Chapter deleted");
//       }
//     } catch { toast.error("Network error"); }
//   };

//   /* ── Add lesson ── */
//   const handleAddLesson = async (chapterId) => {
//     if (!lessonForm.title.trim())       { toast.error("Lesson title required"); return; }
//     if (!lessonForm.youtubeLink.trim()) { toast.error("YouTube link required"); return; }
//     setSaving(true);
//     try {
//       const res  = await fetch(`/api/courses/${selectedCourse._id}?action=add-lesson`, {
//         method: "PUT", headers: { "Content-Type":"application/json" },
//         body: JSON.stringify({ chapterId, ...lessonForm }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setSelectedCourse(data.course);
//         setCourses(prev => prev.map(c => c._id === data.course._id ? data.course : c));
//         setLessonForm({ title:"", youtubeLink:"", duration:"" });
//         setShowLessonForm(null);
//         toast.success("Lesson added!");
//       } else { toast.error(data.error || "Failed"); }
//     } catch { toast.error("Network error"); }
//     finally { setSaving(false); }
//   };

//   /* ── Delete lesson ── */
//   const handleDeleteLesson = async (chapterId, lessonId) => {
//     if (!confirm("Delete this lesson?")) return;
//     try {
//       const res  = await fetch(`/api/courses/${selectedCourse._id}?action=delete-lesson`, {
//         method: "PUT", headers: { "Content-Type":"application/json" },
//         body: JSON.stringify({ chapterId, lessonId }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         setSelectedCourse(data.course);
//         setCourses(prev => prev.map(c => c._id === data.course._id ? data.course : c));
//         toast.success("Lesson deleted");
//       }
//     } catch { toast.error("Network error"); }
//   };

//   /* ════════════════════════════════════════
//      RENDER
//   ════════════════════════════════════════ */
//   return (
//     <>
//       <Head><title>Courses — SS Coaching Admin</title></Head>
//       <div className="oc-wrapper">
//         <Topbar admin={admin} />
//         <AdminOffcanvas />
//         <div className="d-flex" style={{ minHeight:"100vh" }}>
//           <Sidebar />
//           <div className="flex-grow-1 bg-light">
//             <div className="container-fluid p-4">

//               {/* ── PAGE HEADER ── */}
//               <div className="cr-page-header">
//                 <div className="cr-page-header-left">
//                   {view !== "list" && (
//                     <button className="cr-back-btn" onClick={resetAndGoBack}>
//                       <MdArrowBack size={16} /> Back to Courses
//                     </button>
//                   )}
//                   <div>
//                     <h4 className="cr-page-title">
//                       <BsCollection size={22} />
//                       {view === "list"   && "Courses"}
//                       {view === "create" && "Create New Course"}
//                       {view === "detail" && (selectedCourse?.title || "Course Detail")}
//                     </h4>
//                     <p className="cr-page-subtitle">
//                       {view === "list"   && "Create and manage your course catalog"}
//                       {view === "create" && "Fill in course details below"}
//                       {view === "detail" && `${selectedCourse?.subject} • ${selectedCourse?.batch}`}
//                     </p>
//                   </div>
//                 </div>
//                 {view === "list" && (
//                   <div style={{ display:"flex", gap:10 }}>
//                     <button className="cr-cancel-btn" onClick={fetchCourses} disabled={loading}>
//                       <MdRefresh size={16} /> Refresh
//                     </button>
//                     <button className="cr-primary-btn" onClick={() => { setForm(EMPTY_FORM); setView("create"); }}>
//                       <MdAdd size={18} /> New Course
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* ══════════════════════════════
//                   LIST VIEW
//               ══════════════════════════════ */}
//               {view === "list" && (
//                 <div>
//                   {/* Stats */}
//                   <div className="cr-stats-row">
//                     {[
//                       { label:"Total Courses",  value: courses.length,                                       color:"#6c47d4", Icon:BsCollection },
//                       { label:"Published",      value: courses.filter(c=>c.status==="published").length,     color:"#10b981", Icon:MdCheckCircle },
//                       { label:"Drafts",         value: courses.filter(c=>c.status==="draft").length,         color:"#f59e0b", Icon:MdDrafts },
//                       { label:"Total Enrolled", value: courses.reduce((a,c)=>a+c.enrolledCount,0),           color:"#0ea5e9", Icon:MdPeople },
//                     ].map(s => (
//                       <div key={s.label} className="cr-stat-card">
//                         <div className="cr-stat-icon" style={{ background: s.color+"18" }}>
//                           <s.Icon size={22} color={s.color} />
//                         </div>
//                         <div>
//                           <div className="cr-stat-num">{s.value}</div>
//                           <div className="cr-stat-label">{s.label}</div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {loading ? (
//                     <div className="cr-loading">
//                       <div className="cr-spinner" />
//                       <span>Loading courses...</span>
//                     </div>
//                   ) : courses.length === 0 ? (
//                     <div className="cr-empty">
//                       <MdFolderOpen size={52} className="cr-empty-icon" />
//                       <div className="cr-empty-title">No Courses Yet</div>
//                       <p>Click "New Course" to create your first course.</p>
//                       <button className="cr-primary-btn" onClick={() => setView("create")}>
//                         <MdAdd size={16} /> Create First Course
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="cr-cards-grid">
//                       {courses.map(course => (
//                         <div key={course._id} className={`cr-course-card ${course.status==="draft" ? "cr-card-draft":""}`}>
//                           <div className="cr-card-thumb" style={{
//                             background: course.featureImage
//                               ? `url(${course.featureImage}) center/cover no-repeat`
//                               : `linear-gradient(135deg,${getColor(course.subject)}22,${getColor(course.subject)}55)`
//                           }}>
//                             {!course.featureImage && (
//                               <span className="cr-card-thumb-icon">{subjectIcons[course.subject]||"📚"}</span>
//                             )}
//                             <span className={`cr-status-badge ${course.status==="published"?"cr-badge-published":"cr-badge-draft"}`}>
//                               {course.status==="published" ? <><MdCheckCircle size={11}/> Published</> : <><MdDrafts size={11}/> Draft</>}
//                             </span>
//                             <span className={`cr-price-badge ${course.isFree?"cr-badge-free":"cr-badge-paid"}`}>
//                               {course.isFree ? "FREE" : <><FaRupeeSign size={10}/>{course.price}</>}
//                             </span>
//                           </div>

//                           <div className="cr-card-body">
//                             <div className="cr-card-subject" style={{ color:getColor(course.subject) }}>
//                               <MdSchool size={13}/> {course.subject} • {course.batch}
//                             </div>
//                             <div className="cr-card-title">{course.title}</div>
//                             <div className="cr-card-desc">{(course.description||"No description").slice(0,72)}...</div>
//                             <div className="cr-card-meta">
//                               <span className="cr-meta-tag"><MdFolder size={13}/> {course.chapters?.length||0} Chapters</span>
//                               <span className="cr-meta-tag"><MdVideoLibrary size={13}/> {totalLessons(course)} Lessons</span>
//                               <span className="cr-meta-tag"><MdPeople size={13}/> {course.enrolledCount||0} Enrolled</span>
//                             </div>
//                             <div className="cr-card-actions">
//                               <button className="cr-action-manage" onClick={() => openManage(course)}>
//                                 <MdEdit size={15}/> Manage
//                               </button>
//                               <button
//                                 className={`cr-action-publish ${course.status==="published"?"cr-action-unpublish":"cr-action-dopublish"}`}
//                                 onClick={() => handleTogglePublish(course)}
//                               >
//                                 {course.status==="published"
//                                   ? <><MdUnpublished size={15}/> Unpublish</>
//                                   : <><MdPublish size={15}/> Publish</>
//                                 }
//                               </button>
//                               <button className="cr-action-delete" onClick={() => handleDelete(course._id)}>
//                                 <MdDelete size={16}/>
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* ══════════════════════════════
//                   CREATE COURSE FORM
//               ══════════════════════════════ */}
//               {view === "create" && (
//                 <div className="cr-form-wrap">
//                   <div className="cr-form-card">
//                     <div className="cr-form-card-title">
//                       <BiSolidBookContent size={20} color="#6c47d4"/> Course Details
//                     </div>
//                     <CourseFormFields form={form} setForm={setForm} />
//                     <div className="cr-form-footer">
//                       <span className="cr-hint">Fields marked * are required</span>
//                       <div className="cr-form-footer-btns">
//                         <button className="cr-cancel-btn" onClick={resetAndGoBack}>
//                           <MdClose size={15}/> Cancel
//                         </button>
//                         <button className="cr-primary-btn" onClick={handleCreate} disabled={saving}>
//                           {saving ? "Creating..." : <><MdAdd size={16}/> Create Course &amp; Add Content →</>}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* ══════════════════════════════
//                   DETAIL / MANAGE VIEW
//               ══════════════════════════════ */}
//               {view === "detail" && selectedCourse && (
//                 <div className="cr-detail-grid">

//                   {/* LEFT — Info panel */}
//                   <div className="cr-detail-left">

//                     {/* Tab switcher: Info | Content */}
//                     <div className="cr-detail-tabs">
//                       <button
//                         className={`cr-detail-tab ${!isEditing ? "cr-detail-tab-active" : ""}`}
//                         onClick={() => setIsEditing(false)}
//                       >
//                         <MdFolder size={15}/> Content
//                       </button>
//                       <button
//                         className={`cr-detail-tab ${isEditing ? "cr-detail-tab-active" : ""}`}
//                         onClick={() => setIsEditing(true)}
//                       >
//                         <MdEdit size={15}/> Edit Info
//                       </button>
//                     </div>

//                     {isEditing ? (
//                       /* ── EDIT INFO PANEL ── */
//                       <div className="cr-edit-panel">
//                         <CourseFormFields form={form} setForm={setForm} compact />
//                         <div className="cr-edit-panel-footer">
//                           <button className="cr-cancel-btn" onClick={() => setIsEditing(false)}>
//                             <MdClose size={14}/> Cancel
//                           </button>
//                           <button className="cr-primary-btn" onClick={handleSaveInfo} disabled={saving}>
//                             {saving ? "Saving..." : <><MdSave size={15}/> Save Changes</>}
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       /* ── INFO DISPLAY PANEL ── */
//                       <div className="cr-info-card">
//                         {selectedCourse.featureImage && (
//                           <div className="cr-info-feature-img">
//                             <img src={selectedCourse.featureImage} alt={selectedCourse.title}
//                               onError={e => e.target.style.display="none"} />
//                           </div>
//                         )}
//                         <div className="cr-info-subject" style={{ color:getColor(selectedCourse.subject) }}>
//                           <MdSchool size={13}/> {selectedCourse.subject} • {selectedCourse.batch}
//                         </div>
//                         <div className="cr-info-title">{selectedCourse.title}</div>
//                         {selectedCourse.description && (
//                           <div className="cr-info-desc">{selectedCourse.description}</div>
//                         )}
//                         <div className="cr-info-badges">
//                           <span className={`cr-info-badge ${selectedCourse.isFree?"cr-badge-free":"cr-badge-paid"}`}>
//                             {selectedCourse.isFree ? "FREE" : <><FaRupeeSign size={11}/>{selectedCourse.price}</>}
//                           </span>
//                           <span className={`cr-info-badge ${selectedCourse.status==="published"?"cr-badge-published":"cr-badge-draft"}`}>
//                             {selectedCourse.status==="published"
//                               ? <><MdCheckCircle size={12}/> Published</>
//                               : <><MdDrafts size={12}/> Draft</>
//                             }
//                           </span>
//                         </div>
//                         <div className="cr-info-stats">
//                           {[
//                             { Icon:MdFolder,       label:"Chapters", val:selectedCourse.chapters?.length||0 },
//                             { Icon:MdVideoLibrary, label:"Lessons",  val:totalLessons(selectedCourse) },
//                             { Icon:MdPeople,       label:"Enrolled", val:selectedCourse.enrolledCount||0 },
//                           ].map(m => (
//                             <div key={m.label} className="cr-info-stat">
//                               <m.Icon size={18} color="#6c47d4"/>
//                               <div className="cr-info-stat-num">{m.val}</div>
//                               <div className="cr-info-stat-label">{m.label}</div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Publish toggle — always visible */}
//                     {!isEditing && (
//                       <button
//                         className={`cr-publish-toggle-btn ${selectedCourse.status==="published"?"cr-toggle-unpublish":"cr-toggle-publish"}`}
//                         onClick={() => handleTogglePublish(selectedCourse)}
//                       >
//                         {selectedCourse.status==="published"
//                           ? <><MdUnpublished size={18}/> Unpublish Course</>
//                           : <><MdPublish size={18}/> Publish Course</>
//                         }
//                       </button>
//                     )}

//                     {/* Delete course button */}
//                     {!isEditing && (
//                       <button className="cr-delete-course-btn" onClick={() => handleDelete(selectedCourse._id)}>
//                         <MdDelete size={16}/> Delete Course
//                       </button>
//                     )}
//                   </div>

//                   {/* RIGHT — Chapters & Lessons */}
//                   <div className="cr-chapters-card">
//                     <div className="cr-chapters-header">
//                       <div className="cr-chapters-title">
//                         <MdFolder size={20} color="#6c47d4"/> Course Content
//                         <span className="cr-chapters-count">{selectedCourse.chapters?.length||0} chapters</span>
//                       </div>
//                       <button className="cr-add-chapter-btn" onClick={() => setShowChapterForm(true)}>
//                         <MdAdd size={16}/> Add Chapter
//                       </button>
//                     </div>

//                     {showChapterForm && (
//                       <div className="cr-chapter-form">
//                         <div className="cr-chapter-form-title">New Chapter</div>
//                         <div className="cr-chapter-form-row">
//                           <input className="cr-input" placeholder="e.g. Real Numbers"
//                             value={chapterInput} onChange={e => setChapterInput(e.target.value)}
//                             onKeyDown={e => e.key==="Enter" && handleAddChapter()} autoFocus />
//                           <button className="cr-primary-btn" onClick={handleAddChapter} disabled={saving}>
//                             {saving ? "..." : "Add"}
//                           </button>
//                           <button className="cr-cancel-btn" onClick={() => { setShowChapterForm(false); setChapterInput(""); }}>
//                             <MdClose size={16}/>
//                           </button>
//                         </div>
//                       </div>
//                     )}

//                     {(!selectedCourse.chapters || selectedCourse.chapters.length === 0) ? (
//                       <div className="cr-empty cr-chapters-empty">
//                         <MdFolderOpen size={48} className="cr-empty-icon"/>
//                         <div className="cr-empty-title">No chapters yet</div>
//                         <p>Click "Add Chapter" to start building your course content</p>
//                       </div>
//                     ) : (
//                       selectedCourse.chapters.map((chapter, ci) => (
//                         <div key={chapter._id} className="cr-chapter-item">
//                           <div
//                             className={`cr-chapter-header ${activeChapter===chapter._id?"cr-chapter-open":""}`}
//                             onClick={() => setActiveChapter(activeChapter===chapter._id ? null : chapter._id)}
//                           >
//                             <div className="cr-chapter-left">
//                               <span className="cr-chapter-num">{ci+1}</span>
//                               <div>
//                                 <div className="cr-chapter-name">{chapter.title}</div>
//                                 <div className="cr-chapter-count">
//                                   <MdVideoLibrary size={11}/> {chapter.lessons.length} lessons
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="cr-chapter-actions">
//                               <button className="cr-del-chapter-btn"
//                                 onClick={e => { e.stopPropagation(); handleDeleteChapter(chapter._id); }}>
//                                 <MdDelete size={14}/>
//                               </button>
//                               {activeChapter===chapter._id
//                                 ? <MdExpandLess size={22} color="#9ca3af"/>
//                                 : <MdExpandMore size={22} color="#9ca3af"/>
//                               }
//                             </div>
//                           </div>

//                           {activeChapter===chapter._id && (
//                             <div className="cr-lessons-wrap">
//                               {chapter.lessons.map((lesson, li) => (
//                                 <div key={lesson._id} className="cr-lesson-item">
//                                   <span className="cr-lesson-num">{li+1}</span>
//                                   <MdPlayCircle size={17} color="#6c47d4"/>
//                                   <span className="cr-lesson-title">{lesson.title}</span>
//                                   {lesson.duration && (
//                                     <span className="cr-lesson-duration">
//                                       <MdTimelapse size={12}/> {lesson.duration}
//                                     </span>
//                                   )}
//                                   <button className="cr-del-lesson-btn"
//                                     onClick={() => handleDeleteLesson(chapter._id, lesson._id)}>
//                                     <MdDelete size={13}/>
//                                   </button>
//                                 </div>
//                               ))}

//                               {showLessonForm===chapter._id ? (
//                                 <div className="cr-lesson-form">
//                                   <div className="cr-lesson-form-title">
//                                     <MdVideoLibrary size={15} color="#6c47d4"/> Add New Lesson
//                                   </div>
//                                   <input className="cr-input" placeholder="Lesson title"
//                                     value={lessonForm.title}
//                                     onChange={e => setLessonForm({...lessonForm, title:e.target.value})} autoFocus />
//                                   <input className="cr-input" placeholder="YouTube link https://youtube.com/watch?v=..."
//                                     value={lessonForm.youtubeLink}
//                                     onChange={e => setLessonForm({...lessonForm, youtubeLink:e.target.value})} />
//                                   <input className="cr-input" placeholder="Duration e.g. 45 mins"
//                                     value={lessonForm.duration}
//                                     onChange={e => setLessonForm({...lessonForm, duration:e.target.value})} />
//                                   <div className="cr-lesson-form-btns">
//                                     <button className="cr-primary-btn" style={{ flex:1, justifyContent:"center" }}
//                                       onClick={() => handleAddLesson(chapter._id)} disabled={saving}>
//                                       <MdCheckCircle size={15}/> {saving ? "Adding..." : "Add Lesson"}
//                                     </button>
//                                     <button className="cr-cancel-btn"
//                                       onClick={() => { setShowLessonForm(null); setLessonForm({ title:"", youtubeLink:"", duration:"" }); }}>
//                                       <MdClose size={15}/> Cancel
//                                     </button>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <button className="cr-add-lesson-btn" onClick={() => setShowLessonForm(chapter._id)}>
//                                   <MdAdd size={16}/> Add Lesson
//                                 </button>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 </div>
//               )}

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// /* ─────────────────────────────────────────
//    COURSE FORM FIELDS (shared by create + edit)
// ───────────────────────────────────────── */
// function CourseFormFields({ form, setForm, compact = false }) {
//   return (
//     <div className={`cr-form-grid ${compact ? "cr-form-grid-compact" : ""}`}>

//       {/* Feature Image */}
//       <div className="cr-field cr-field-full">
//         <label className="cr-label">
//           <MdImage size={15} style={{ marginRight:5, verticalAlign:"middle" }}/>
//           Feature Image
//           <span style={{ color:"#9ca3af", fontWeight:400, fontSize:12, marginLeft:6 }}>(optional)</span>
//         </label>
//         <ImageUploader
//           value={form.featureImage}
//           onChange={(val) => setForm({...form, featureImage:val})}
//         />
//       </div>

//       {/* Title */}
//       <div className="cr-field cr-field-full">
//         <label className="cr-label">Course Title <span className="cr-req">*</span></label>
//         <input className="cr-input" placeholder="e.g. Complete Mathematics Class 10"
//           value={form.title} onChange={e => setForm({...form, title:e.target.value})} />
//       </div>

//       {/* Subject + Batch */}
//       <div className="cr-field">
//         <label className="cr-label">Subject <span className="cr-req">*</span></label>
//         <select className="cr-input" value={form.subject} onChange={e => setForm({...form, subject:e.target.value})}>
//           <option value="">Select Subject</option>
//           {subjects.map(s => <option key={s} value={s}>{s}</option>)}
//         </select>
//       </div>

//       <div className="cr-field">
//         <label className="cr-label">Batch / Class <span className="cr-req">*</span></label>
//         <select className="cr-input" value={form.batch} onChange={e => setForm({...form, batch:e.target.value})}>
//           <option value="">Select Batch</option>
//           {batches.map(b => <option key={b} value={b}>{b}</option>)}
//         </select>
//       </div>

//       {/* Pricing */}
//       <div className="cr-field cr-field-full">
//         <label className="cr-label">Pricing <span className="cr-req">*</span></label>
//         <div className="cr-pricing-row">
//           {[{ label:"Free", val:true }, { label:"Paid", val:false }].map(opt => (
//             <button key={opt.label}
//               className={`cr-pricing-btn ${form.isFree===opt.val ? "cr-pricing-active":""}`}
//               onClick={() => setForm({...form, isFree:opt.val, price:opt.val?"0":form.price})}
//             >
//               {opt.val ? "🆓 Free" : <><FaRupeeSign size={13}/> Paid</>}
//             </button>
//           ))}
//           {!form.isFree && (
//             <div className="cr-price-input-wrap">
//               <FaRupeeSign size={13} className="cr-rupee-icon"/>
//               <input className="cr-input cr-price-input" placeholder="e.g. 1999" type="number"
//                 value={form.price} onChange={e => setForm({...form, price:e.target.value})} />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Description */}
//       <div className="cr-field cr-field-full">
//         <label className="cr-label">Description</label>
//         <textarea className="cr-input cr-textarea"
//           placeholder="What will students learn in this course?"
//           value={form.description} onChange={e => setForm({...form, description:e.target.value})} />
//       </div>

//       {/* Status */}
//       <div className="cr-field cr-field-full">
//         <label className="cr-label">Status</label>
//         <div className="cr-status-row">
//           {[
//             { val:"draft",     label:"Save as Draft", Icon:MdDrafts,  activeColor:"#f59e0b", activeBg:"#fef3c7", activeText:"#92400e" },
//             { val:"published", label:"Publish Now",   Icon:MdPublish, activeColor:"#10b981", activeBg:"#d1fae5", activeText:"#065f46" },
//           ].map(s => (
//             <button key={s.val}
//               className={`cr-status-btn ${form.status===s.val?"cr-status-btn-active":""}`}
//               style={form.status===s.val ? { borderColor:s.activeColor, background:s.activeBg, color:s.activeText } : {}}
//               onClick={() => setForm({...form, status:s.val})}
//             >
//               <s.Icon size={15}/> {s.label}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export const getServerSideProps = withAdminAuth(async () => {
//   return { props: {} };
// });



import { useState, useRef, useEffect, useCallback } from "react";
import { withAdminAuth } from "@/lib/withAdminAuth";
import Head from "next/head";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import AdminOffcanvas from "@/components/dashboard/AdminOffcanvas";
import { toast } from "sonner";
import {
  MdAdd, MdEdit, MdDelete, MdPublish, MdUnpublished,
  MdSchool, MdPeople, MdPlayCircle, MdFolder, MdFolderOpen,
  MdArrowBack, MdExpandMore, MdExpandLess, MdClose,
  MdCheckCircle, MdDrafts, MdVideoLibrary, MdTimelapse,
  MdImage, MdLink, MdCloudUpload, MdSave, MdRefresh,
  MdAttachFile, MdPictureAsPdf, MdOndemandVideo, MdYoutubeSearchedFor,
} from "react-icons/md";
import { FaRupeeSign, FaYoutube, FaVideo } from "react-icons/fa";
import { BiSolidBookContent } from "react-icons/bi";
import { BsCollection, BsFilePdf, BsFileEarmarkText } from "react-icons/bs";

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const subjects = ["Mathematics","Physics","Chemistry","Biology","English","Hindi","Social Science","Computer Science"];
const batches  = ["Class 9","Class 10","Class 11","Class 12","NIOS Stream 1","NIOS Stream 2","Dropper Batch"];

const subjectColors = {
  Mathematics:"#6c47d4", Physics:"#0ea5e9", Chemistry:"#f59e0b",
  Biology:"#10b981", English:"#f43f5e", Hindi:"#8b5cf6",
  "Social Science":"#64748b", "Computer Science":"#06b6d4",
};
const subjectIcons = {
  Mathematics:"📐", Physics:"⚛️", Chemistry:"🧪",
  Biology:"🧬", English:"📖", Hindi:"🪔",
  "Social Science":"🌍", "Computer Science":"💻",
};
const getColor = (s) => subjectColors[s] || "#6c47d4";

const NOTE_TYPES = [
  { val:"pdf",   label:"PDF",      icon:"📄" },
  { val:"doc",   label:"Word Doc", icon:"📝" },
  { val:"ppt",   label:"PPT",      icon:"📊" },
  { val:"link",  label:"Link",     icon:"🔗" },
  { val:"other", label:"Other",    icon:"📁" },
];

const EMPTY_FORM = {
  title:"", subject:"", batch:"", price:"",
  isFree:false, description:"", status:"draft", featureImage:"",
};

const EMPTY_LESSON = {
  title:"", videoType:"youtube", youtubeLink:"", videoUrl:"", duration:"",
};

const EMPTY_NOTE = { noteTitle:"", fileUrl:"", type:"pdf" };

/* ─────────────────────────────────────────
   IMAGE UPLOADER (unchanged)
───────────────────────────────────────── */
function ImageUploader({ value, onChange }) {
  const [tab, setTab]           = useState("upload");
  const [dragging, setDragging] = useState(false);
  const [urlInput, setUrlInput] = useState(value && !value.startsWith("data:") ? value : "");
  const fileRef                 = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    if (file.size > 5 * 1024 * 1024)    { toast.error("Image must be under 5MB"); return; }
    const reader = new FileReader();
    reader.onloadend = () => { onChange(reader.result); toast.success("Image loaded!"); };
    reader.readAsDataURL(file);
  };

  const handleUrlBlur = () => { if (urlInput.trim()) onChange(urlInput.trim()); };

  const clear = () => {
    onChange(""); setUrlInput("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="cr-img-box">
      <div className="cr-img-tabs">
        <button className={`cr-img-tab ${tab==="upload"?"cr-img-tab-active":""}`} onClick={() => setTab("upload")}>
          <MdCloudUpload size={15}/> Upload / Drag &amp; Drop
        </button>
        <button className={`cr-img-tab ${tab==="url"?"cr-img-tab-active":""}`} onClick={() => setTab("url")}>
          <MdLink size={15}/> Paste URL
        </button>
      </div>
      {value ? (
        <div className="cr-img-preview-wrap">
          <img src={value} alt="Preview" className="cr-img-preview-img" onError={clear}/>
          <div className="cr-img-preview-overlay">
            <button className="cr-img-remove-btn" onClick={clear}><MdClose size={14}/> Remove</button>
          </div>
          <div className="cr-img-preview-label"><MdCheckCircle size={13} color="#10b981"/> Image ready</div>
          <div className="cr-img-switch-hint">
            Want a different image?
            <button className="cr-img-switch-btn" onClick={clear}>Choose another</button>
          </div>
        </div>
      ) : tab==="upload" ? (
        <div
          className={`cr-img-dropzone ${dragging?"cr-img-dropzone-active":""}`}
          onDragOver={e=>{e.preventDefault();setDragging(true);}}
          onDragLeave={e=>{e.preventDefault();setDragging(false);}}
          onDrop={e=>{e.preventDefault();setDragging(false);handleFile(e.dataTransfer.files[0]);}}
          onClick={() => fileRef.current?.click()}
        >
          <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}}
            onChange={e=>handleFile(e.target.files[0])}/>
          <div className="cr-img-dropzone-icon"><MdCloudUpload size={42}/></div>
          <div className="cr-img-dropzone-title">{dragging?"Drop it here!":"Drag & drop your image here"}</div>
          <div className="cr-img-dropzone-sub">or click to browse files</div>
          <div className="cr-img-dropzone-hint">PNG, JPG, WEBP · Max 5MB</div>
        </div>
      ) : (
        <div className="cr-img-url-wrap">
          <div className="cr-img-url-row">
            <MdLink size={16} className="cr-img-link-icon"/>
            <input className="cr-input" placeholder="https://example.com/course-thumbnail.jpg"
              value={urlInput} onChange={e=>setUrlInput(e.target.value)}
              onBlur={handleUrlBlur} onKeyDown={e=>e.key==="Enter"&&handleUrlBlur()}/>
          </div>
          <div className="cr-img-url-hint">
            💡 Upload to <strong>Google Drive</strong> or <strong>Imgur</strong> → copy direct link → paste here
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function AdminCoursesPage({ admin }) {
  const [view, setView]                       = useState("list");
  const [courses, setCourses]                 = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [saving, setSaving]                   = useState(false);
  const [selectedCourse, setSelectedCourse]   = useState(null);
  const [activeChapter, setActiveChapter]     = useState(null);
  const [showLessonForm, setShowLessonForm]   = useState(null);
  const [showChapterForm, setShowChapterForm] = useState(false);
  const [chapterInput, setChapterInput]       = useState("");
  const [lessonForm, setLessonForm]           = useState(EMPTY_LESSON);
  // Note form — keyed by lessonId
  const [showNoteForm, setShowNoteForm]       = useState(null); // lessonId
  const [noteForm, setNoteForm]               = useState(EMPTY_NOTE);

  const [form, setForm]           = useState(EMPTY_FORM);
  const [isEditing, setIsEditing] = useState(false);

  const totalLessons = (c) => c.chapters?.reduce((a, ch) => a + ch.lessons.length, 0) || 0;

  /* ── Fetch courses ── */
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/courses?admin=1");
      const data = await res.json();
      if (data.success) setCourses(data.courses);
      else toast.error("Failed to load courses");
    } catch { toast.error("Network error"); }
    finally  { setLoading(false); }
  }, []);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const resetAndGoBack = () => {
    setView("list"); setSelectedCourse(null); setForm(EMPTY_FORM);
    setIsEditing(false); setActiveChapter(null);
    setShowChapterForm(false); setShowLessonForm(null);
    setShowNoteForm(null);
  };

  const openManage = (course) => {
    setSelectedCourse(course);
    setForm({
      title:course.title, subject:course.subject, batch:course.batch,
      price:course.price?.toString()||"", isFree:course.isFree,
      description:course.description, status:course.status,
      featureImage:course.featureImage||"",
    });
    setIsEditing(false);
    setView("detail");
  };

  /* ════════════════════════════════════════
     API CALLS
  ════════════════════════════════════════ */

  const handleCreate = async () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    if (!form.subject)      { toast.error("Subject is required"); return; }
    if (!form.batch)        { toast.error("Batch is required"); return; }
    setSaving(true);
    try {
      const res  = await fetch("/api/courses", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...form, price:Number(form.price)||0}),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Course created!");
        setCourses(prev => [data.course, ...prev]);
        setSelectedCourse(data.course);
        setForm({ title:data.course.title, subject:data.course.subject, batch:data.course.batch,
          price:data.course.price?.toString(), isFree:data.course.isFree,
          description:data.course.description, status:data.course.status,
          featureImage:data.course.featureImage||"" });
        setView("detail");
      } else { toast.error(data.error||"Failed to create"); }
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  const handleSaveInfo = async () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    setSaving(true);
    try {
      const res  = await fetch(`/api/courses/${selectedCourse._id}?action=info`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...form, price:Number(form.price)||0}),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Course updated!");
        setSelectedCourse(data.course);
        setCourses(prev => prev.map(c => c._id===data.course._id ? data.course : c));
        setIsEditing(false);
      } else { toast.error(data.error||"Update failed"); }
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  const handleTogglePublish = async (course) => {
    try {
      const res  = await fetch(`/api/courses/${course._id}?action=toggle-status`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
      });
      const data = await res.json();
      if (data.success) {
        setCourses(prev => prev.map(c => c._id===data.course._id ? data.course : c));
        if (selectedCourse?._id===data.course._id) setSelectedCourse(data.course);
        toast.success(`Course ${data.course.status==="published"?"published":"unpublished"}!`);
      }
    } catch { toast.error("Network error"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this course? This cannot be undone.")) return;
    try {
      const res  = await fetch(`/api/courses/${id}`, {method:"DELETE"});
      const data = await res.json();
      if (data.success) {
        setCourses(prev => prev.filter(c => c._id!==id));
        toast.success("Course deleted");
        if (selectedCourse?._id===id) resetAndGoBack();
      }
    } catch { toast.error("Network error"); }
  };

  const handleAddChapter = async () => {
    if (!chapterInput.trim()) { toast.error("Chapter title required"); return; }
    setSaving(true);
    try {
      const res  = await fetch(`/api/courses/${selectedCourse._id}?action=add-chapter`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({title:chapterInput.trim()}),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedCourse(data.course);
        setCourses(prev => prev.map(c => c._id===data.course._id ? data.course : c));
        setChapterInput(""); setShowChapterForm(false);
        toast.success("Chapter added!");
      } else { toast.error(data.error||"Failed"); }
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  const handleDeleteChapter = async (chapterId) => {
    if (!confirm("Delete this chapter and all its lessons?")) return;
    try {
      const res  = await fetch(`/api/courses/${selectedCourse._id}?action=delete-chapter`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({chapterId}),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedCourse(data.course);
        setCourses(prev => prev.map(c => c._id===data.course._id ? data.course : c));
        toast.success("Chapter deleted");
      }
    } catch { toast.error("Network error"); }
  };

  /* ── Add lesson — now with videoType ── */
  const handleAddLesson = async (chapterId) => {
    if (!lessonForm.title.trim()) { toast.error("Lesson title required"); return; }
    if (lessonForm.videoType==="youtube" && !lessonForm.youtubeLink.trim()) {
      toast.error("YouTube link required"); return;
    }
    if (lessonForm.videoType==="custom" && !lessonForm.videoUrl.trim()) {
      toast.error("Video URL required"); return;
    }
    setSaving(true);
    try {
      const res  = await fetch(`/api/courses/${selectedCourse._id}?action=add-lesson`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({chapterId, ...lessonForm}),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedCourse(data.course);
        setCourses(prev => prev.map(c => c._id===data.course._id ? data.course : c));
        setLessonForm(EMPTY_LESSON); setShowLessonForm(null);
        toast.success("Lesson added!");
      } else { toast.error(data.error||"Failed"); }
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  const handleDeleteLesson = async (chapterId, lessonId) => {
    if (!confirm("Delete this lesson?")) return;
    try {
      const res  = await fetch(`/api/courses/${selectedCourse._id}?action=delete-lesson`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({chapterId, lessonId}),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedCourse(data.course);
        setCourses(prev => prev.map(c => c._id===data.course._id ? data.course : c));
        toast.success("Lesson deleted");
      }
    } catch { toast.error("Network error"); }
  };

  /* ── Add note ── */
  const handleAddNote = async (chapterId, lessonId) => {
    if (!noteForm.noteTitle.trim()) { toast.error("Note title required"); return; }
    if (!noteForm.fileUrl.trim())   { toast.error("File URL required"); return; }
    setSaving(true);
    try {
      const res  = await fetch(`/api/courses/${selectedCourse._id}?action=add-note`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({chapterId, lessonId, ...noteForm}),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedCourse(data.course);
        setCourses(prev => prev.map(c => c._id===data.course._id ? data.course : c));
        setNoteForm(EMPTY_NOTE); setShowNoteForm(null);
        toast.success("Note added!");
      } else { toast.error(data.error||"Failed"); }
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  /* ── Delete note ── */
  const handleDeleteNote = async (chapterId, lessonId, noteId) => {
    if (!confirm("Remove this note?")) return;
    try {
      const res  = await fetch(`/api/courses/${selectedCourse._id}?action=delete-note`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({chapterId, lessonId, noteId}),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedCourse(data.course);
        setCourses(prev => prev.map(c => c._id===data.course._id ? data.course : c));
        toast.success("Note removed");
      }
    } catch { toast.error("Network error"); }
  };

  /* ════════════════════════════════════════
     RENDER
  ════════════════════════════════════════ */
  return (
    <>
      <Head><title>Courses — SS Coaching Admin</title></Head>
      <div className="oc-wrapper">
        <Topbar admin={admin}/>
        <AdminOffcanvas/>
        <div className="d-flex" style={{minHeight:"100vh"}}>
          <Sidebar/>
          <div className="flex-grow-1 bg-light">
            <div className="container-fluid p-4">

              {/* PAGE HEADER */}
              <div className="cr-page-header">
                <div className="cr-page-header-left">
                  {view!=="list" && (
                    <button className="cr-back-btn" onClick={resetAndGoBack}>
                      <MdArrowBack size={16}/> Back to Courses
                    </button>
                  )}
                  <div>
                    <h4 className="cr-page-title">
                      <BsCollection size={22}/>
                      {view==="list"   && "Courses"}
                      {view==="create" && "Create New Course"}
                      {view==="detail" && (selectedCourse?.title||"Course Detail")}
                    </h4>
                    <p className="cr-page-subtitle">
                      {view==="list"   && "Create and manage your course catalog"}
                      {view==="create" && "Fill in course details below"}
                      {view==="detail" && `${selectedCourse?.subject} • ${selectedCourse?.batch}`}
                    </p>
                  </div>
                </div>
                {view==="list" && (
                  <div style={{display:"flex",gap:10}}>
                    <button className="cr-cancel-btn" onClick={fetchCourses} disabled={loading}>
                      <MdRefresh size={16}/> Refresh
                    </button>
                    <button className="cr-primary-btn" onClick={()=>{setForm(EMPTY_FORM);setView("create");}}>
                      <MdAdd size={18}/> New Course
                    </button>
                  </div>
                )}
              </div>

              {/* ══════ LIST VIEW ══════ */}
              {view==="list" && (
                <div>
                  <div className="cr-stats-row">
                    {[
                      {label:"Total Courses",  value:courses.length,                               color:"#6c47d4", Icon:BsCollection},
                      {label:"Published",      value:courses.filter(c=>c.status==="published").length, color:"#10b981", Icon:MdCheckCircle},
                      {label:"Drafts",         value:courses.filter(c=>c.status==="draft").length, color:"#f59e0b", Icon:MdDrafts},
                      {label:"Total Enrolled", value:courses.reduce((a,c)=>a+c.enrolledCount,0),   color:"#0ea5e9", Icon:MdPeople},
                    ].map(s=>(
                      <div key={s.label} className="cr-stat-card">
                        <div className="cr-stat-icon" style={{background:s.color+"18"}}>
                          <s.Icon size={22} color={s.color}/>
                        </div>
                        <div>
                          <div className="cr-stat-num">{s.value}</div>
                          <div className="cr-stat-label">{s.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {loading ? (
                    <div className="cr-loading"><div className="cr-spinner"/><span>Loading courses...</span></div>
                  ) : courses.length===0 ? (
                    <div className="cr-empty">
                      <MdFolderOpen size={52} className="cr-empty-icon"/>
                      <div className="cr-empty-title">No Courses Yet</div>
                      <p>Click "New Course" to create your first course.</p>
                      <button className="cr-primary-btn" onClick={()=>setView("create")}>
                        <MdAdd size={16}/> Create First Course
                      </button>
                    </div>
                  ) : (
                    <div className="cr-cards-grid">
                      {courses.map(course=>(
                        <div key={course._id} className={`cr-course-card ${course.status==="draft"?"cr-card-draft":""}`}>
                          <div className="cr-card-thumb" style={{
                            background:course.featureImage
                              ?`url(${course.featureImage}) center/cover no-repeat`
                              :`linear-gradient(135deg,${getColor(course.subject)}22,${getColor(course.subject)}55)`
                          }}>
                            {!course.featureImage && (
                              <span className="cr-card-thumb-icon">{subjectIcons[course.subject]||"📚"}</span>
                            )}
                            <span className={`cr-status-badge ${course.status==="published"?"cr-badge-published":"cr-badge-draft"}`}>
                              {course.status==="published"?<><MdCheckCircle size={11}/> Published</>:<><MdDrafts size={11}/> Draft</>}
                            </span>
                            <span className={`cr-price-badge ${course.isFree?"cr-badge-free":"cr-badge-paid"}`}>
                              {course.isFree?"FREE":<><FaRupeeSign size={10}/>{course.price}</>}
                            </span>
                          </div>
                          <div className="cr-card-body">
                            <div className="cr-card-subject" style={{color:getColor(course.subject)}}>
                              <MdSchool size={13}/> {course.subject} • {course.batch}
                            </div>
                            <div className="cr-card-title">{course.title}</div>
                            <div className="cr-card-desc">{(course.description||"No description").slice(0,72)}...</div>
                            <div className="cr-card-meta">
                              <span className="cr-meta-tag"><MdFolder size={13}/> {course.chapters?.length||0} Chapters</span>
                              <span className="cr-meta-tag"><MdVideoLibrary size={13}/> {totalLessons(course)} Lessons</span>
                              <span className="cr-meta-tag"><MdPeople size={13}/> {course.enrolledCount||0} Enrolled</span>
                            </div>
                            <div className="cr-card-actions">
                              <button className="cr-action-manage" onClick={()=>openManage(course)}>
                                <MdEdit size={15}/> Manage
                              </button>
                              <button
                                className={`cr-action-publish ${course.status==="published"?"cr-action-unpublish":"cr-action-dopublish"}`}
                                onClick={()=>handleTogglePublish(course)}
                              >
                                {course.status==="published"?<><MdUnpublished size={15}/> Unpublish</>:<><MdPublish size={15}/> Publish</>}
                              </button>
                              <button className="cr-action-delete" onClick={()=>handleDelete(course._id)}>
                                <MdDelete size={16}/>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ══════ CREATE FORM ══════ */}
              {view==="create" && (
                <div className="cr-form-wrap">
                  <div className="cr-form-card">
                    <div className="cr-form-card-title">
                      <BiSolidBookContent size={20} color="#6c47d4"/> Course Details
                    </div>
                    <CourseFormFields form={form} setForm={setForm}/>
                    <div className="cr-form-footer">
                      <span className="cr-hint">Fields marked * are required</span>
                      <div className="cr-form-footer-btns">
                        <button className="cr-cancel-btn" onClick={resetAndGoBack}>
                          <MdClose size={15}/> Cancel
                        </button>
                        <button className="cr-primary-btn" onClick={handleCreate} disabled={saving}>
                          {saving?"Creating...":<><MdAdd size={16}/> Create Course &amp; Add Content →</>}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ══════ DETAIL VIEW ══════ */}
              {view==="detail" && selectedCourse && (
                <div className="cr-detail-grid">

                  {/* LEFT */}
                  <div className="cr-detail-left">
                    <div className="cr-detail-tabs">
                      <button className={`cr-detail-tab ${!isEditing?"cr-detail-tab-active":""}`} onClick={()=>setIsEditing(false)}>
                        <MdFolder size={15}/> Content
                      </button>
                      <button className={`cr-detail-tab ${isEditing?"cr-detail-tab-active":""}`} onClick={()=>setIsEditing(true)}>
                        <MdEdit size={15}/> Edit Info
                      </button>
                    </div>

                    {isEditing ? (
                      <div className="cr-edit-panel">
                        <CourseFormFields form={form} setForm={setForm} compact/>
                        <div className="cr-edit-panel-footer">
                          <button className="cr-cancel-btn" onClick={()=>setIsEditing(false)}>
                            <MdClose size={14}/> Cancel
                          </button>
                          <button className="cr-primary-btn" onClick={handleSaveInfo} disabled={saving}>
                            {saving?"Saving...":<><MdSave size={15}/> Save Changes</>}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="cr-info-card">
                        {selectedCourse.featureImage && (
                          <div className="cr-info-feature-img">
                            <img src={selectedCourse.featureImage} alt={selectedCourse.title}
                              onError={e=>e.target.style.display="none"}/>
                          </div>
                        )}
                        <div className="cr-info-subject" style={{color:getColor(selectedCourse.subject)}}>
                          <MdSchool size={13}/> {selectedCourse.subject} • {selectedCourse.batch}
                        </div>
                        <div className="cr-info-title">{selectedCourse.title}</div>
                        {selectedCourse.description && (
                          <div className="cr-info-desc">{selectedCourse.description}</div>
                        )}
                        <div className="cr-info-badges">
                          <span className={`cr-info-badge ${selectedCourse.isFree?"cr-badge-free":"cr-badge-paid"}`}>
                            {selectedCourse.isFree?"FREE":<><FaRupeeSign size={11}/>{selectedCourse.price}</>}
                          </span>
                          <span className={`cr-info-badge ${selectedCourse.status==="published"?"cr-badge-published":"cr-badge-draft"}`}>
                            {selectedCourse.status==="published"?<><MdCheckCircle size={12}/> Published</>:<><MdDrafts size={12}/> Draft</>}
                          </span>
                        </div>
                        <div className="cr-info-stats">
                          {[
                            {Icon:MdFolder,       label:"Chapters", val:selectedCourse.chapters?.length||0},
                            {Icon:MdVideoLibrary, label:"Lessons",  val:totalLessons(selectedCourse)},
                            {Icon:MdPeople,       label:"Enrolled", val:selectedCourse.enrolledCount||0},
                          ].map(m=>(
                            <div key={m.label} className="cr-info-stat">
                              <m.Icon size={18} color="#6c47d4"/>
                              <div className="cr-info-stat-num">{m.val}</div>
                              <div className="cr-info-stat-label">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!isEditing && (
                      <button
                        className={`cr-publish-toggle-btn ${selectedCourse.status==="published"?"cr-toggle-unpublish":"cr-toggle-publish"}`}
                        onClick={()=>handleTogglePublish(selectedCourse)}
                      >
                        {selectedCourse.status==="published"
                          ?<><MdUnpublished size={18}/> Unpublish Course</>
                          :<><MdPublish size={18}/> Publish Course</>
                        }
                      </button>
                    )}
                    {!isEditing && (
                      <button className="cr-delete-course-btn" onClick={()=>handleDelete(selectedCourse._id)}>
                        <MdDelete size={16}/> Delete Course
                      </button>
                    )}
                  </div>

                  {/* RIGHT — Chapters & Lessons */}
                  <div className="cr-chapters-card">
                    <div className="cr-chapters-header">
                      <div className="cr-chapters-title">
                        <MdFolder size={20} color="#6c47d4"/> Course Content
                        <span className="cr-chapters-count">{selectedCourse.chapters?.length||0} chapters</span>
                      </div>
                      <button className="cr-add-chapter-btn" onClick={()=>setShowChapterForm(true)}>
                        <MdAdd size={16}/> Add Chapter
                      </button>
                    </div>

                    {showChapterForm && (
                      <div className="cr-chapter-form">
                        <div className="cr-chapter-form-title">New Chapter</div>
                        <div className="cr-chapter-form-row">
                          <input className="cr-input" placeholder="e.g. Real Numbers"
                            value={chapterInput} onChange={e=>setChapterInput(e.target.value)}
                            onKeyDown={e=>e.key==="Enter"&&handleAddChapter()} autoFocus/>
                          <button className="cr-primary-btn" onClick={handleAddChapter} disabled={saving}>
                            {saving?"...":"Add"}
                          </button>
                          <button className="cr-cancel-btn" onClick={()=>{setShowChapterForm(false);setChapterInput("");}}>
                            <MdClose size={16}/>
                          </button>
                        </div>
                      </div>
                    )}

                    {(!selectedCourse.chapters||selectedCourse.chapters.length===0) ? (
                      <div className="cr-empty cr-chapters-empty">
                        <MdFolderOpen size={48} className="cr-empty-icon"/>
                        <div className="cr-empty-title">No chapters yet</div>
                        <p>Click "Add Chapter" to start building your course content</p>
                      </div>
                    ) : (
                      selectedCourse.chapters.map((chapter, ci) => (
                        <div key={chapter._id} className="cr-chapter-item">
                          <div
                            className={`cr-chapter-header ${activeChapter===chapter._id?"cr-chapter-open":""}`}
                            onClick={()=>setActiveChapter(activeChapter===chapter._id?null:chapter._id)}
                          >
                            <div className="cr-chapter-left">
                              <span className="cr-chapter-num">{ci+1}</span>
                              <div>
                                <div className="cr-chapter-name">{chapter.title}</div>
                                <div className="cr-chapter-count">
                                  <MdVideoLibrary size={11}/> {chapter.lessons.length} lessons
                                </div>
                              </div>
                            </div>
                            <div className="cr-chapter-actions">
                              <button className="cr-del-chapter-btn"
                                onClick={e=>{e.stopPropagation();handleDeleteChapter(chapter._id);}}>
                                <MdDelete size={14}/>
                              </button>
                              {activeChapter===chapter._id
                                ?<MdExpandLess size={22} color="#9ca3af"/>
                                :<MdExpandMore size={22} color="#9ca3af"/>
                              }
                            </div>
                          </div>

                          {activeChapter===chapter._id && (
                            <div className="cr-lessons-wrap">
                              {chapter.lessons.map((lesson, li) => (
                                <div key={lesson._id} className="cr-lesson-item-wrap">
                                  {/* ── Lesson row ── */}
                                  <div className="cr-lesson-item">
                                    <span className="cr-lesson-num">{li+1}</span>
                                    {lesson.videoType==="youtube"
                                      ? <FaYoutube size={15} color="#ef4444"/>
                                      : lesson.videoType==="custom"
                                        ? <FaVideo size={14} color="#6c47d4"/>
                                        : <MdVideoLibrary size={15} color="#9ca3af"/>
                                    }
                                    <span className="cr-lesson-title">{lesson.title}</span>
                                    {lesson.duration && (
                                      <span className="cr-lesson-duration">
                                        <MdTimelapse size={12}/> {lesson.duration}
                                      </span>
                                    )}
                                    {lesson.notes?.length > 0 && (
                                      <span className="cr-lesson-notes-badge">
                                        <MdAttachFile size={12}/> {lesson.notes.length}
                                      </span>
                                    )}
                                    <div className="cr-lesson-btns">
                                      <button
                                        className="cr-add-note-inline-btn"
                                        title="Add note/PDF"
                                        onClick={() => {
                                          setShowNoteForm(showNoteForm===lesson._id?null:lesson._id);
                                          setNoteForm(EMPTY_NOTE);
                                        }}
                                      >
                                        <MdAttachFile size={13}/> Notes
                                      </button>
                                      <button className="cr-del-lesson-btn"
                                        onClick={()=>handleDeleteLesson(chapter._id, lesson._id)}>
                                        <MdDelete size={13}/>
                                      </button>
                                    </div>
                                  </div>

                                  {/* ── Existing notes under lesson ── */}
                                  {lesson.notes?.length > 0 && (
                                    <div className="cr-lesson-notes-list">
                                      {lesson.notes.map(note => {
                                        const nt = NOTE_TYPES.find(t=>t.val===note.type)||NOTE_TYPES[0];
                                        return (
                                          <div key={note._id} className="cr-note-row">
                                            <span className="cr-note-icon">{nt.icon}</span>
                                            <a href={note.fileUrl} target="_blank" rel="noreferrer"
                                              className="cr-note-title">{note.title}</a>
                                            <span className="cr-note-type-tag">{nt.label}</span>
                                            <button className="cr-del-note-btn"
                                              onClick={()=>handleDeleteNote(chapter._id, lesson._id, note._id)}>
                                              <MdClose size={12}/>
                                            </button>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {/* ── Add note form ── */}
                                  {showNoteForm===lesson._id && (
                                    <div className="cr-note-form">
                                      <div className="cr-note-form-title">
                                        <MdAttachFile size={15} color="#6c47d4"/> Add Study Material
                                      </div>
                                      <input className="cr-input" placeholder="Title e.g. Chapter 1 Notes"
                                        value={noteForm.noteTitle}
                                        onChange={e=>setNoteForm({...noteForm,noteTitle:e.target.value})}/>
                                      <input className="cr-input"
                                        placeholder="File URL (Google Drive, Cloudinary, direct link)"
                                        value={noteForm.fileUrl}
                                        onChange={e=>setNoteForm({...noteForm,fileUrl:e.target.value})}/>
                                      <div className="cr-note-type-row">
                                        <span className="cr-note-type-label">Type:</span>
                                        {NOTE_TYPES.map(t=>(
                                          <button key={t.val}
                                            className={`cr-note-type-btn ${noteForm.type===t.val?"cr-note-type-active":""}`}
                                            onClick={()=>setNoteForm({...noteForm,type:t.val})}
                                          >
                                            {t.icon} {t.label}
                                          </button>
                                        ))}
                                      </div>
                                      <div className="cr-note-url-hint">
                                        💡 Upload PDF to <strong>Google Drive</strong> → Share → <em>Anyone with link</em> → copy URL
                                      </div>
                                      <div className="cr-lesson-form-btns">
                                        <button className="cr-primary-btn" style={{flex:1,justifyContent:"center"}}
                                          onClick={()=>handleAddNote(chapter._id, lesson._id)} disabled={saving}>
                                          <MdCheckCircle size={15}/> {saving?"Adding...":"Add Material"}
                                        </button>
                                        <button className="cr-cancel-btn"
                                          onClick={()=>{setShowNoteForm(null);setNoteForm(EMPTY_NOTE);}}>
                                          <MdClose size={15}/> Cancel
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}

                              {/* ── Add lesson form ── */}
                              {showLessonForm===chapter._id ? (
                                <div className="cr-lesson-form">
                                  <div className="cr-lesson-form-title">
                                    <MdVideoLibrary size={15} color="#6c47d4"/> Add New Lesson
                                  </div>

                                  {/* Lesson title */}
                                  <input className="cr-input" placeholder="Lesson title"
                                    value={lessonForm.title}
                                    onChange={e=>setLessonForm({...lessonForm,title:e.target.value})} autoFocus/>

                                  {/* Video type toggle */}
                                  <div className="cr-video-type-row">
                                    <span className="cr-video-type-label">Video source:</span>
                                    <button
                                      className={`cr-video-type-btn ${lessonForm.videoType==="youtube"?"cr-video-type-active":""}`}
                                      onClick={()=>setLessonForm({...lessonForm,videoType:"youtube",videoUrl:""})}
                                    >
                                      <FaYoutube size={14} color={lessonForm.videoType==="youtube"?"#fff":"#ef4444"}/> YouTube
                                    </button>
                                    <button
                                      className={`cr-video-type-btn ${lessonForm.videoType==="custom"?"cr-video-type-active":""}`}
                                      onClick={()=>setLessonForm({...lessonForm,videoType:"custom",youtubeLink:""})}
                                    >
                                      <FaVideo size={13} color={lessonForm.videoType==="custom"?"#fff":"#6c47d4"}/> Custom URL
                                    </button>
                                    <button
                                      className={`cr-video-type-btn ${lessonForm.videoType==="none"?"cr-video-type-active":""}`}
                                      onClick={()=>setLessonForm({...lessonForm,videoType:"none",youtubeLink:"",videoUrl:""})}
                                    >
                                      📄 No Video
                                    </button>
                                  </div>

                                  {/* YouTube link */}
                                  {lessonForm.videoType==="youtube" && (
                                    <input className="cr-input"
                                      placeholder="YouTube link https://youtube.com/watch?v=..."
                                      value={lessonForm.youtubeLink}
                                      onChange={e=>setLessonForm({...lessonForm,youtubeLink:e.target.value})}/>
                                  )}

                                  {/* Custom video URL */}
                                  {lessonForm.videoType==="custom" && (
                                    <>
                                      <input className="cr-input"
                                        placeholder="Video URL (Cloudinary, Vimeo, Drive, S3...)"
                                        value={lessonForm.videoUrl}
                                        onChange={e=>setLessonForm({...lessonForm,videoUrl:e.target.value})}/>
                                      <div className="cr-video-url-hint">
                                        💡 Upload video to <strong>Cloudinary</strong> or <strong>Google Drive</strong>
                                        (Share → Anyone with link) and paste the direct URL here.
                                      </div>
                                    </>
                                  )}

                                  {/* Duration */}
                                  <input className="cr-input" placeholder="Duration e.g. 45 mins"
                                    value={lessonForm.duration}
                                    onChange={e=>setLessonForm({...lessonForm,duration:e.target.value})}/>

                                  <div className="cr-lesson-form-btns">
                                    <button className="cr-primary-btn" style={{flex:1,justifyContent:"center"}}
                                      onClick={()=>handleAddLesson(chapter._id)} disabled={saving}>
                                      <MdCheckCircle size={15}/> {saving?"Adding...":"Add Lesson"}
                                    </button>
                                    <button className="cr-cancel-btn"
                                      onClick={()=>{setShowLessonForm(null);setLessonForm(EMPTY_LESSON);}}>
                                      <MdClose size={15}/> Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button className="cr-add-lesson-btn" onClick={()=>setShowLessonForm(chapter._id)}>
                                  <MdAdd size={16}/> Add Lesson
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   COURSE FORM FIELDS (unchanged)
───────────────────────────────────────── */
function CourseFormFields({ form, setForm, compact=false }) {
  return (
    <div className={`cr-form-grid ${compact?"cr-form-grid-compact":""}`}>
      <div className="cr-field cr-field-full">
        <label className="cr-label">
          <MdImage size={15} style={{marginRight:5,verticalAlign:"middle"}}/>
          Feature Image
          <span style={{color:"#9ca3af",fontWeight:400,fontSize:12,marginLeft:6}}>(optional)</span>
        </label>
        <ImageUploader value={form.featureImage} onChange={val=>setForm({...form,featureImage:val})}/>
      </div>
      <div className="cr-field cr-field-full">
        <label className="cr-label">Course Title <span className="cr-req">*</span></label>
        <input className="cr-input" placeholder="e.g. Complete Mathematics Class 10"
          value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
      </div>
      <div className="cr-field">
        <label className="cr-label">Subject <span className="cr-req">*</span></label>
        <select className="cr-input" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}>
          <option value="">Select Subject</option>
          {subjects.map(s=><option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="cr-field">
        <label className="cr-label">Batch / Class <span className="cr-req">*</span></label>
        <select className="cr-input" value={form.batch} onChange={e=>setForm({...form,batch:e.target.value})}>
          <option value="">Select Batch</option>
          {batches.map(b=><option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div className="cr-field cr-field-full">
        <label className="cr-label">Pricing <span className="cr-req">*</span></label>
        <div className="cr-pricing-row">
          {[{label:"Free",val:true},{label:"Paid",val:false}].map(opt=>(
            <button key={opt.label}
              className={`cr-pricing-btn ${form.isFree===opt.val?"cr-pricing-active":""}`}
              onClick={()=>setForm({...form,isFree:opt.val,price:opt.val?"0":form.price})}
            >
              {opt.val?"🆓 Free":<><FaRupeeSign size={13}/> Paid</>}
            </button>
          ))}
          {!form.isFree && (
            <div className="cr-price-input-wrap">
              <FaRupeeSign size={13} className="cr-rupee-icon"/>
              <input className="cr-input cr-price-input" placeholder="e.g. 1999" type="number"
                value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
            </div>
          )}
        </div>
      </div>
      <div className="cr-field cr-field-full">
        <label className="cr-label">Description</label>
        <textarea className="cr-input cr-textarea"
          placeholder="What will students learn in this course?"
          value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
      </div>
      <div className="cr-field cr-field-full">
        <label className="cr-label">Status</label>
        <div className="cr-status-row">
          {[
            {val:"draft",     label:"Save as Draft",Icon:MdDrafts, activeColor:"#f59e0b",activeBg:"#fef3c7",activeText:"#92400e"},
            {val:"published", label:"Publish Now",  Icon:MdPublish,activeColor:"#10b981",activeBg:"#d1fae5",activeText:"#065f46"},
          ].map(s=>(
            <button key={s.val}
              className={`cr-status-btn ${form.status===s.val?"cr-status-btn-active":""}`}
              style={form.status===s.val?{borderColor:s.activeColor,background:s.activeBg,color:s.activeText}:{}}
              onClick={()=>setForm({...form,status:s.val})}
            >
              <s.Icon size={15}/> {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withAdminAuth(async () => {
  return { props: {} };
});