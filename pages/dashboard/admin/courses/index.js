
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
//                               <span className="cr-meta-tag"><MdVideoLibrary size={13}/> {totalLessons(course)} Topics</span>
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
//                                   <MdVideoLibrary size={11}/> {chapter.lessons.length} topics
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
//                                     <MdVideoLibrary size={15} color="#6c47d4"/> Add New Topic
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
  MdLibraryBooks, MdAssignment, MdDescription, MdMenuBook, MdQuiz,
  MdPackage, MdLocalOffer,
} from "react-icons/md";
import { FaRupeeSign, FaYoutube, FaVideo } from "react-icons/fa";
import { BiSolidBookContent } from "react-icons/bi";
import { BsCollection, BsFilePdf, BsFileEarmarkText, BsBoxSeam } from "react-icons/bs";

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const subjects = ["Mathematics","Physics","Chemistry","Biology","English","Hindi","Social Science","Computer Science","Science","History","Geography","Economics","Political Science","Accountancy","Business Studies"];
const batches  = ["Class 9","Class 10","Class 11","Class 12","NIOS Stream 1","NIOS Stream 2","Dropper Batch"];

const MATERIAL_SECTIONS = [
  { key:"books",        label:"Books",         icon:"📚", color:"#6c47d4" },
  { key:"tma",          label:"TMA",           icon:"📝", color:"#f59e0b" },
  { key:"assignments",  label:"Assignments",   icon:"📋", color:"#0ea5e9" },
  { key:"samplePapers", label:"Sample Papers", icon:"📄", color:"#10b981" },
  { key:"notes",        label:"Notes",         icon:"🗒️", color:"#f43f5e" },
];

const EMPTY_BUNDLE = {
  title:"", batch:"", price:"", isFree:false,
  description:"", status:"draft", featureImage:"",
  bundledSubjects:[], includedCourses:[],
};

const EMPTY_MATERIAL = { section:"books", title:"", fileUrl:"" };

const subjectColors = {
  Mathematics:"#6c47d4", Physics:"#0ea5e9", Chemistry:"#f59e0b",
  Biology:"#10b981", English:"#f43f5e", Hindi:"#8b5cf6",
  "Social Science":"#64748b", "Computer Science":"#06b6d4",
  Accountancy:"#0d9488", "Business Studies":"#d97706",
};
const subjectIcons = {
  Mathematics:"📐", Physics:"⚛️", Chemistry:"🧪",
  Biology:"🧬", English:"📖", Hindi:"🪔",
  "Social Science":"🌍", "Computer Science":"💻",
  Accountancy:"📒", "Business Studies":"💼",
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
  title:"", videoType:"bunny", youtubeLink:"", videoUrl:"", duration:"",
};

const EMPTY_NOTE = { noteTitle:"", fileUrl:"", type:"pdf" };

function toYoutubeEmbed(url) {
  const m = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

/* ─────────────────────────────────────────
   IMAGE UPLOADER (unchanged)
───────────────────────────────────────── */
function ImageUploader({ value, onChange }) {
  const [tab, setTab]           = useState("upload");
  const [dragging, setDragging] = useState(false);
  const [urlInput, setUrlInput] = useState(value && !value.startsWith("data:") ? value : "");
  const fileRef                 = useRef(null);

  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    if (file.size > 10 * 1024 * 1024)   { toast.error("Image must be under 10MB"); return; }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res  = await fetch("/api/upload/image", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        onChange(data.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch {
      toast.error("Upload failed. Please try again.");
    }
    setUploading(false);
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
          <div className="cr-img-dropzone-title">{uploading?"Uploading..." : dragging?"Drop it here!":"Drag & drop your image here"}</div>
          <div className="cr-img-dropzone-sub">{uploading ? "Please wait..." : "or click to browse files"}</div>
          <div className="cr-img-dropzone-hint">PNG, JPG, WEBP · Max 10MB</div>
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
  const [editingChapterId, setEditingChapterId] = useState(null);
  const [editChapterInput, setEditChapterInput] = useState("");
  const [editingLessonId, setEditingLessonId]   = useState(null);
  const [previewLessonId, setPreviewLessonId]   = useState(null);
  // Note form — keyed by lessonId
  const [showNoteForm, setShowNoteForm]       = useState(null); // lessonId
  const [noteForm, setNoteForm]               = useState(EMPTY_NOTE);
  const [uploading, setUploading]             = useState(false);
  const [uploadProgress, setUploadProgress]   = useState(0);
  const videoFileRef                          = useRef(null);
  const bsubVideoFileRef                      = useRef(null);
  const [bsubUploading, setBsubUploading]     = useState(false);
  const [bsubUploadProgress, setBsubUploadProgress] = useState(0);

  const [form, setForm]           = useState(EMPTY_FORM);
  const [isEditing, setIsEditing] = useState(false);

  // Bundle state
  const [courseTypeTab, setCourseTypeTab]   = useState("subject"); // "subject" | "bundle"
  const [bundleForm, setBundleForm]         = useState(EMPTY_BUNDLE);
  const [materialForm, setMaterialForm]     = useState(EMPTY_MATERIAL);
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [activeMatTab, setActiveMatTab]     = useState("books");
  const [uploadingPdf, setUploadingPdf]     = useState(false);
  const [linkedClasses, setLinkedClasses]   = useState([]);
  const [editingBundleCourses, setEditingBundleCourses] = useState(false);
  const [bundleCourseEdits, setBundleCourseEdits]       = useState([]);
  // Per-subject content management for bundles
  const [bsubActiveChapter, setBsubActiveChapter]       = useState(null); // "subject::chapterId"
  const [bsubShowChapterForm, setBsubShowChapterForm]   = useState(null); // subject name
  const [bsubChapterInput, setBsubChapterInput]         = useState("");
  const [bsubShowLessonForm, setBsubShowLessonForm]     = useState(null); // "subject::chapterId"
  const [bsubLessonForm, setBsubLessonForm]             = useState(EMPTY_LESSON);
  const [bsubFetching, setBsubFetching]                 = useState(null); // subject being fetched

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
    setEditingChapterId(null); setEditChapterInput("");
    setEditingLessonId(null); setPreviewLessonId(null);
    setShowNoteForm(null); setShowMaterialForm(false);
    setBundleForm(EMPTY_BUNDLE); setLinkedClasses([]);
    setEditingBundleCourses(false); setBundleCourseEdits([]);
    setBsubActiveChapter(null); setBsubShowChapterForm(null); setBsubChapterInput("");
    setBsubShowLessonForm(null); setBsubLessonForm(EMPTY_LESSON); setBsubFetching(null);
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
    const firstSub = course.courseType === "bundle"
      ? (course.bundledSubjects?.[0] || "")
      : (course.subject || "");
    setActiveMatTab(firstSub);
    // Fetch linked online classes
    fetch(`/api/onlineClasses?course=${course._id}&limit=50`)
      .then(r => r.json())
      .then(d => { if (d.success) setLinkedClasses(d.data || []); })
      .catch(() => {});
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

  const handleEditChapter = async (chapterId) => {
    if (!editChapterInput.trim()) { toast.error("Chapter title required"); return; }
    setSaving(true);
    try {
      const res  = await fetch(`/api/courses/${selectedCourse._id}?action=edit-chapter`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({chapterId, title:editChapterInput.trim()}),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedCourse(data.course);
        setCourses(prev => prev.map(c => c._id===data.course._id ? data.course : c));
        setEditingChapterId(null); setEditChapterInput("");
        toast.success("Chapter updated!");
      } else { toast.error(data.error||"Failed"); }
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  const handleEditLesson = async (chapterId, lessonId) => {
    if (!lessonForm.title.trim()) { toast.error("Topic title required"); return; }
    if (lessonForm.videoType==="youtube" && !lessonForm.youtubeLink.trim()) {
      toast.error("YouTube link required"); return;
    }
    if (lessonForm.videoType==="custom" && !lessonForm.videoUrl.trim()) {
      toast.error("Video URL required"); return;
    }
    if (lessonForm.videoType==="bunny" && !lessonForm.videoUrl.trim()) {
      toast.error("Please upload a video first"); return;
    }
    setSaving(true);
    try {
      const res  = await fetch(`/api/courses/${selectedCourse._id}?action=edit-lesson`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({chapterId, lessonId, ...lessonForm}),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedCourse(data.course);
        setCourses(prev => prev.map(c => c._id===data.course._id ? data.course : c));
        setEditingLessonId(null); setLessonForm(EMPTY_LESSON);
        toast.success("Topic updated!");
      } else { toast.error(data.error||"Failed"); }
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  /* ── Add lesson — now with videoType ── */
  const handleAddLesson = async (chapterId) => {
    if (!lessonForm.title.trim()) { toast.error("Topic title required"); return; }
    if (lessonForm.videoType==="youtube" && !lessonForm.youtubeLink.trim()) {
      toast.error("YouTube link required"); return;
    }
    if (lessonForm.videoType==="custom" && !lessonForm.videoUrl.trim()) {
      toast.error("Video URL required"); return;
    }
    if (lessonForm.videoType==="bunny" && !lessonForm.videoUrl.trim()) {
      toast.error("Please upload a video first"); return;
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
        toast.success("Topic added!");
      } else { toast.error(data.error||"Failed"); }
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  /* ── Upload video directly to Bunny Stream via TUS (resumable, no size limit) ── */
  const handleBunnyUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    setUploadProgress(0);

    try {
      // Step 1: create video entry + get TUS auth signature from server
      const createRes  = await fetch("/api/bunny/create-video", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ title: lessonForm.title?.trim() || file.name }),
      });
      const createData = await createRes.json();
      if (!createData.videoId) {
        toast.error(createData.error || "Failed to create video on Bunny");
        setUploading(false);
        return;
      }

      const { videoId, cdnUrl, tusSignature, tusExpiry, libraryId } = createData;

      // Step 2: load tus-js-client only in browser and upload directly to Bunny
      const tus = await import("tus-js-client");

      await new Promise((resolve, reject) => {
        const upload = new tus.Upload(file, {
          endpoint:    "https://video.bunnycdn.com/tusupload",
          retryDelays: [0, 3000, 5000, 10000, 20000, 30000],
          headers: {
            AuthorizationSignature: tusSignature,
            AuthorizationExpire:    String(tusExpiry),
            VideoId:                videoId,
            LibraryId:              String(libraryId),
          },
          metadata: {
            filetype: file.type,
            title:    lessonForm.title?.trim() || file.name,
          },
          onError:    (err) => reject(err),
          onProgress: (uploaded, total) => {
            setUploadProgress(Math.round((uploaded / total) * 100));
          },
          onSuccess:  resolve,
        });

        // Resume a previous incomplete upload if one exists
        upload.findPreviousUploads().then((prev) => {
          if (prev.length) upload.resumeFromPreviousUpload(prev[0]);
          upload.start();
        });
      });

      setLessonForm(prev => ({ ...prev, videoUrl: cdnUrl, videoType: "bunny" }));
      toast.success("Video uploaded! Bunny is now encoding it.");
    } catch (err) {
      console.error("TUS upload error:", err);
      toast.error(err?.message || "Upload failed — check your internet and try again");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (videoFileRef.current) videoFileRef.current.value = "";
    }
  };

  /* ── Bunny upload for bundle subject lessons ── */
  const handleBsubBunnyUpload = async (file) => {
    if (!file) return;
    setBsubUploading(true);
    setBsubUploadProgress(0);
    try {
      const createRes  = await fetch("/api/bunny/create-video", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ title: bsubLessonForm.title?.trim() || file.name }),
      });
      const createData = await createRes.json();
      if (!createData.videoId) { toast.error(createData.error || "Failed to create video"); return; }
      const { videoId, cdnUrl, tusSignature, tusExpiry, libraryId } = createData;
      const tus = await import("tus-js-client");
      await new Promise((resolve, reject) => {
        const upload = new tus.Upload(file, {
          endpoint: "https://video.bunnycdn.com/tusupload",
          retryDelays: [0, 3000, 5000, 10000, 20000],
          headers: {
            AuthorizationSignature: tusSignature, AuthorizationExpire: String(tusExpiry),
            VideoId: videoId, LibraryId: String(libraryId),
          },
          metadata: { filetype: file.type, title: bsubLessonForm.title?.trim() || file.name },
          onError: reject,
          onProgress: (u, t) => setBsubUploadProgress(Math.round((u/t)*100)),
          onSuccess: resolve,
        });
        upload.findPreviousUploads().then(prev => { if (prev.length) upload.resumeFromPreviousUpload(prev[0]); upload.start(); });
      });
      setBsubLessonForm(prev => ({ ...prev, videoUrl: cdnUrl, videoType: "bunny" }));
      toast.success("Video uploaded to Bunny CDN!");
    } catch (err) {
      toast.error(err?.message || "Upload failed");
    } finally {
      setBsubUploading(false);
      setBsubUploadProgress(0);
      if (bsubVideoFileRef.current) bsubVideoFileRef.current.value = "";
    }
  };

  const handleDeleteLesson = async (chapterId, lessonId) => {
    if (!confirm("Delete this topic?")) return;
    try {
      const res  = await fetch(`/api/courses/${selectedCourse._id}?action=delete-lesson`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({chapterId, lessonId}),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedCourse(data.course);
        setCourses(prev => prev.map(c => c._id===data.course._id ? data.course : c));
        toast.success("Topic deleted");
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

  /* ── Create Bundle ── */
  const handleCreateBundle = async () => {
    if (!bundleForm.title.trim()) { toast.error("Bundle title required"); return; }
    if (!bundleForm.batch)        { toast.error("Batch / Class required"); return; }
    if (!bundleForm.bundledSubjects.length) { toast.error("Select at least one subject"); return; }
    setSaving(true);
    try {
      const res  = await fetch("/api/courses", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ ...bundleForm, courseType:"bundle", price:Number(bundleForm.price)||0 }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Bundle created!");
        setCourses(prev => [data.course, ...prev]);
        setSelectedCourse(data.course);
        setView("detail");
        setBundleForm(EMPTY_BUNDLE);
      } else { toast.error(data.error||"Failed"); }
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  const toggleBundleSubject = (sub) => {
    setBundleForm(prev => {
      const has = prev.bundledSubjects.includes(sub);
      const newSubjects = has ? prev.bundledSubjects.filter(s=>s!==sub) : [...prev.bundledSubjects, sub];
      const matched = courses.filter(c =>
        c.courseType !== "bundle" && c.batch === prev.batch &&
        (newSubjects.length === 0 || newSubjects.includes(c.subject))
      );
      return { ...prev, bundledSubjects: newSubjects, includedCourses: matched.map(c => c._id) };
    });
  };

  /* ── Update bundle's linked courses ── */
  const handleUpdateBundleCourses = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/courses/${selectedCourse._id}?action=update-bundle`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ includedCourses: bundleCourseEdits }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedCourse(data.course);
        setCourses(prev => prev.map(c => c._id===data.course._id ? data.course : c));
        setEditingBundleCourses(false);
        toast.success("Bundle content updated!");
      } else { toast.error(data.error||"Failed"); }
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  /* ── Bundle subject content handlers ── */
  const bsubCall = async (action, body) => {
    const res  = await fetch(`/api/courses/${selectedCourse._id}?action=${action}`, {
      method:"PUT", headers:{"Content-Type":"application/json"},
      body:JSON.stringify(body),
    });
    const data = await res.json();
    if (data.success) {
      setSelectedCourse(data.course);
      setCourses(prev => prev.map(c => c._id===data.course._id ? data.course : c));
    } else { toast.error(data.error||"Failed"); }
    return data.success;
  };

  const handleBsubAddChapter = async (subject) => {
    if (!bsubChapterInput.trim()) { toast.error("Chapter title required"); return; }
    setSaving(true);
    const ok = await bsubCall("add-bsubject-chapter", { subject, title: bsubChapterInput.trim() });
    if (ok) { setBsubChapterInput(""); setBsubShowChapterForm(null); toast.success("Chapter added!"); }
    setSaving(false);
  };

  const handleBsubAddLesson = async (subject, chapterId) => {
    if (!bsubLessonForm.title.trim()) { toast.error("Topic title required"); return; }
    setSaving(true);
    const ok = await bsubCall("add-bsubject-lesson", { subject, chapterId, lesson: bsubLessonForm });
    if (ok) { setBsubLessonForm(EMPTY_LESSON); setBsubShowLessonForm(null); toast.success("Topic added!"); }
    setSaving(false);
  };

  const handleBsubDeleteChapter = async (subject, chapterId) => {
    if (!confirm("Delete this chapter?")) return;
    setSaving(true);
    const ok = await bsubCall("delete-bsubject-chapter", { subject, chapterId });
    if (ok) toast.success("Chapter deleted");
    setSaving(false);
  };

  const handleBsubEditChapter = async (subject, chapterId) => {
    if (!editChapterInput.trim()) { toast.error("Chapter title required"); return; }
    setSaving(true);
    const ok = await bsubCall("edit-bsubject-chapter", { subject, chapterId, title: editChapterInput.trim() });
    if (ok) { setEditingChapterId(null); setEditChapterInput(""); toast.success("Chapter updated!"); }
    setSaving(false);
  };

  const handleBsubDeleteLesson = async (subject, chapterId, lessonId) => {
    if (!confirm("Delete this topic?")) return;
    const ok = await bsubCall("delete-bsubject-lesson", { subject, chapterId, lessonId });
    if (ok) toast.success("Topic deleted");
  };

  const handleBsubEditLesson = async (subject, chapterId, lessonId) => {
    if (!bsubLessonForm.title.trim()) { toast.error("Topic title required"); return; }
    if (bsubLessonForm.videoType==="youtube" && !bsubLessonForm.youtubeLink.trim()) { toast.error("YouTube link required"); return; }
    if ((bsubLessonForm.videoType==="custom" || bsubLessonForm.videoType==="bunny") && !bsubLessonForm.videoUrl.trim()) {
      toast.error(bsubLessonForm.videoType==="bunny" ? "Please upload a video first" : "Video URL required"); return;
    }
    setSaving(true);
    const ok = await bsubCall("edit-bsubject-lesson", { subject, chapterId, lessonId, ...bsubLessonForm });
    if (ok) { setEditingLessonId(null); setBsubLessonForm(EMPTY_LESSON); toast.success("Topic updated!"); }
    setSaving(false);
  };

  const handleBsubFetch = async (subject) => {
    if (!confirm(`Fetch chapters from existing ${subject} (${selectedCourse.batch}) course? This will replace current content for this subject.`)) return;
    setBsubFetching(subject);
    const ok = await bsubCall("fetch-bsubject-content", { subject });
    if (ok) toast.success(`Imported chapters from ${subject} course!`);
    setBsubFetching(null);
  };

  /* ── Upload PDF for materials ── */
  const handlePdfUpload = async (file, onUrl) => {
    if (!file) return;
    if (!file.type.includes("pdf") && !file.type.includes("document")) {
      toast.error("Upload a PDF file"); return;
    }
    setUploadingPdf(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      // x-upload-type: file → saves to private_uploads/ (not public)
      const res = await fetch("/api/upload/image", { method:"POST", body:fd, headers:{"x-upload-type":"file"} });
      const data = await res.json();
      if (data.success) { onUrl(data.url); toast.success("File uploaded!"); }
      else toast.error(data.message || "Upload failed");
    } catch { toast.error("Upload failed"); }
    finally { setUploadingPdf(false); }
  };

  /* ── Add material to course ── */
  const handleAddMaterial = async (overrideForm) => {
    const f = overrideForm || materialForm;
    if (!f.title.trim()) { toast.error("Title required"); return; }
    if (!f.fileUrl.trim()) { toast.error("Upload a file first"); return; }
    setSaving(true);
    try {
      const res  = await fetch(`/api/courses/${selectedCourse._id}?action=add-material`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ section:f.section, title:f.title, fileUrl:f.fileUrl }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedCourse(data.course);
        setCourses(prev => prev.map(c => c._id===data.course._id ? data.course : c));
        setMaterialForm(EMPTY_MATERIAL);
        setShowMaterialForm(false);
        toast.success("Material added!");
      } else { toast.error(data.error||"Failed"); }
    } catch { toast.error("Network error"); }
    finally { setSaving(false); }
  };

  const handleDeleteMaterial = async (section, materialId) => {
    if (!confirm("Remove this material?")) return;
    try {
      const res  = await fetch(`/api/courses/${selectedCourse._id}?action=delete-material`, {
        method:"PUT", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ section, materialId }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedCourse(data.course);
        setCourses(prev => prev.map(c => c._id===data.course._id ? data.course : c));
        toast.success("Removed");
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
                      {view==="list"          && "Courses"}
                      {view==="create"        && "Create Subject Course"}
                      {view==="create-bundle" && "Create Full Bundle"}
                      {view==="detail"        && (selectedCourse?.title||"Course Detail")}
                    </h4>
                    <p className="cr-page-subtitle">
                      {view==="list"          && "Manage subject courses and full bundles"}
                      {view==="create"        && "Single subject course with chapters & videos"}
                      {view==="create-bundle" && "Multi-subject package with all study materials"}
                      {view==="detail"        && (selectedCourse?.courseType==="bundle"
                        ? `Bundle • ${selectedCourse?.batch} • ${selectedCourse?.bundledSubjects?.length||0} subjects`
                        : `${selectedCourse?.subject} • ${selectedCourse?.batch}`)}
                    </p>
                  </div>
                </div>
                {view==="list" && (
                  <div style={{display:"flex",gap:10}}>
                    <button className="cr-cancel-btn" onClick={fetchCourses} disabled={loading}>
                      <MdRefresh size={16}/> Refresh
                    </button>
                    {courseTypeTab === "subject" ? (
                      <button className="cr-primary-btn" onClick={()=>{setForm(EMPTY_FORM);setView("create");}}>
                        <MdAdd size={18}/> New Subject Course
                      </button>
                    ) : (
                      <button className="cr-primary-btn" style={{background:"#f59e0b"}} onClick={()=>{setBundleForm(EMPTY_BUNDLE);setView("create-bundle");}}>
                        <BsBoxSeam size={16}/> New Full Bundle
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* ══════ LIST VIEW ══════ */}
              {view==="list" && (
                <div>
                  {/* Type tabs */}
                  <div style={{display:"flex",gap:8,marginBottom:20}}>
                    {[{key:"subject",label:"📘 Subject Courses"},{key:"bundle",label:"📦 Full Bundles"}].map(t=>(
                      <button key={t.key}
                        onClick={()=>setCourseTypeTab(t.key)}
                        style={{padding:"8px 20px",borderRadius:8,border:"2px solid",fontWeight:600,fontSize:14,cursor:"pointer",transition:"all 0.2s",
                          borderColor:courseTypeTab===t.key?"#6c47d4":"#e5e7eb",
                          background:courseTypeTab===t.key?"#6c47d4":"white",
                          color:courseTypeTab===t.key?"white":"#6b7280"
                        }}
                      >{t.label}</button>
                    ))}
                  </div>
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
                      {courses
                        .filter(c => courseTypeTab==="bundle" ? c.courseType==="bundle" : c.courseType!=="bundle")
                        .map(course=>(
                        <div key={course._id} className={`cr-course-card ${course.status==="draft"?"cr-card-draft":""}`}>
                          <div className="cr-card-thumb" style={{
                            background:course.featureImage
                              ?`url(${course.featureImage}) center/cover no-repeat`
                              :course.courseType==="bundle"
                                ?"linear-gradient(135deg,#f59e0b22,#f59e0b55)"
                                :`linear-gradient(135deg,${getColor(course.subject)}22,${getColor(course.subject)}55)`
                          }}>
                            {!course.featureImage && (
                              <span className="cr-card-thumb-icon">
                                {course.courseType==="bundle" ? "📦" : (subjectIcons[course.subject]||"📚")}
                              </span>
                            )}
                            {course.courseType==="bundle" && (
                              <span style={{position:"absolute",top:8,left:8,background:"#f59e0b",color:"white",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20}}>
                                BUNDLE
                              </span>
                            )}
                            <span className={`cr-status-badge ${course.status==="published"?"cr-badge-published":"cr-badge-draft"}`}>
                              {course.status==="published"?<><MdCheckCircle size={11}/> Published</>:<><MdDrafts size={11}/> Draft</>}
                            </span>
                            <span className={`cr-price-badge ${course.isFree?"cr-badge-free":"cr-badge-paid"}`}>
                              {course.isFree?"FREE":<><FaRupeeSign size={10}/>{course.price}</>}
                            </span>
                          </div>
                          <div className="cr-card-body">
                            <div className="cr-card-subject" style={{color:course.courseType==="bundle"?"#f59e0b":getColor(course.subject)}}>
                              {course.courseType==="bundle"
                                ? <><BsBoxSeam size={13}/> {course.batch} • {course.bundledSubjects?.length||0} Subjects</>
                                : <><MdSchool size={13}/> {course.subject} • {course.batch}</>
                              }
                            </div>
                            <div className="cr-card-title">{course.title}</div>
                            {course.courseType==="bundle" && (
                              <div style={{display:"flex",flexWrap:"wrap",gap:4,margin:"6px 0"}}>
                                {(course.bundledSubjects||[]).slice(0,4).map(s=>(
                                  <span key={s} style={{fontSize:10,padding:"2px 6px",background:"#f59e0b18",color:"#b45309",borderRadius:20,fontWeight:600}}>{s}</span>
                                ))}
                                {(course.bundledSubjects||[]).length>4 && <span style={{fontSize:10,color:"#9ca3af"}}>+{course.bundledSubjects.length-4} more</span>}
                              </div>
                            )}
                            <div className="cr-card-desc">{(course.description||"No description").slice(0,72)}...</div>
                            <div className="cr-card-meta">
                              {course.courseType==="bundle" ? (
                                <span className="cr-meta-tag"><BsBoxSeam size={13}/> {course.bundledSubjects?.length||0} Subjects</span>
                              ) : (
                                <><span className="cr-meta-tag"><MdFolder size={13}/> {course.chapters?.length||0} Chapters</span>
                                <span className="cr-meta-tag"><MdVideoLibrary size={13}/> {totalLessons(course)} Topics</span></>
                              )}
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
                      {courses.filter(c => courseTypeTab==="bundle" ? c.courseType==="bundle" : c.courseType!=="bundle").length===0 && (
                        <div className="cr-empty" style={{gridColumn:"1/-1"}}>
                          <span style={{fontSize:40}}>{courseTypeTab==="bundle"?"📦":"📘"}</span>
                          <div className="cr-empty-title">{courseTypeTab==="bundle"?"No Bundles Yet":"No Subject Courses Yet"}</div>
                          <p>{courseTypeTab==="bundle"?"Create a Full Bundle to sell multiple subjects together.":"Create individual subject courses."}</p>
                        </div>
                      )}
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

              {/* ══════ CREATE BUNDLE VIEW ══════ */}
              {view==="create-bundle" && (
                <div className="cr-form-wrap">
                  <div className="cr-form-card">
                    <div className="cr-form-card-title" style={{color:"#f59e0b"}}>
                      <BsBoxSeam size={20}/> Full Bundle Details
                    </div>

                    {/* Basic info */}
                    <div className="cr-field-group">
                      <label className="cr-label">Bundle Title *</label>
                      <input className="cr-input" placeholder="e.g. Class 10 Complete Package"
                        value={bundleForm.title} onChange={e=>setBundleForm(p=>({...p,title:e.target.value}))}/>
                    </div>
                    <div className="cr-field-row">
                      <div className="cr-field-group">
                        <label className="cr-label">Class / Batch *</label>
                        <select className="cr-input" value={bundleForm.batch} onChange={e=>{
                          const batch = e.target.value;
                          const matched = courses.filter(c =>
                            c.courseType !== "bundle" && c.batch === batch &&
                            (bundleForm.bundledSubjects.length === 0 || bundleForm.bundledSubjects.includes(c.subject))
                          );
                          setBundleForm(p=>({...p, batch, includedCourses: matched.map(c=>c._id)}));
                        }}>
                          <option value="">Select batch</option>
                          {batches.map(b=><option key={b}>{b}</option>)}
                        </select>
                      </div>
                      <div className="cr-field-group">
                        <label className="cr-label">Price (₹)</label>
                        <input className="cr-input" type="number" placeholder="5999"
                          value={bundleForm.price} onChange={e=>setBundleForm(p=>({...p,price:e.target.value}))}
                          disabled={bundleForm.isFree}/>
                      </div>
                    </div>
                    <div className="cr-field-group">
                      <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:14}}>
                        <input type="checkbox" checked={bundleForm.isFree}
                          onChange={e=>setBundleForm(p=>({...p,isFree:e.target.checked,price:e.target.checked?"0":p.price}))}/>
                        Free Bundle
                      </label>
                    </div>
                    <div className="cr-field-group">
                      <label className="cr-label">Description</label>
                      <textarea className="cr-input" rows={3} placeholder="What's included in this bundle..."
                        value={bundleForm.description} onChange={e=>setBundleForm(p=>({...p,description:e.target.value}))}/>
                    </div>

                    {/* Subject selector */}
                    <div className="cr-field-group">
                      <label className="cr-label">Included Subjects * <span style={{color:"#9ca3af",fontWeight:400}}>(select all that apply)</span></label>
                      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:8}}>
                        {subjects.map(sub=>{
                          const sel = bundleForm.bundledSubjects.includes(sub);
                          return (
                            <button key={sub} type="button"
                              onClick={()=>toggleBundleSubject(sub)}
                              style={{padding:"6px 14px",borderRadius:20,border:`2px solid ${sel?"#6c47d4":"#e5e7eb"}`,
                                background:sel?"#6c47d4":"white",color:sel?"white":"#374151",
                                fontWeight:600,fontSize:13,cursor:"pointer",transition:"all 0.15s"
                              }}
                            >{sub}</button>
                          );
                        })}
                      </div>
                      {bundleForm.bundledSubjects.length>0 && (
                        <div style={{marginTop:8,fontSize:12,color:"#6c47d4",fontWeight:600}}>
                          ✓ Selected: {bundleForm.bundledSubjects.join(", ")}
                        </div>
                      )}
                    </div>

                    {/* Auto-import chapters & videos from existing courses */}
                    {bundleForm.batch && (()=>{
                      const matchedCourses = courses.filter(c =>
                        c.courseType !== "bundle" && c.batch === bundleForm.batch &&
                        (bundleForm.bundledSubjects.length === 0 || bundleForm.bundledSubjects.includes(c.subject))
                      );
                      return (
                        <div className="cr-field-group">
                          <label className="cr-label" style={{display:"flex",alignItems:"center",gap:8}}>
                            📚 Auto-import Videos &amp; Chapters
                            <span style={{fontWeight:400,color:"#9ca3af",fontSize:12}}>
                              ({matchedCourses.length} course{matchedCourses.length!==1?"s":""} found for {bundleForm.batch})
                            </span>
                          </label>
                          {matchedCourses.length===0 ? (
                            <div style={{padding:"12px 16px",background:"#f9fafb",borderRadius:10,fontSize:13,color:"#9ca3af",border:"1.5px dashed #e5e7eb"}}>
                              No individual courses found for <strong>{bundleForm.batch}</strong> yet. Create subject courses first, then they'll auto-import here.
                            </div>
                          ) : (
                            <div style={{display:"flex",flexDirection:"column",gap:8}}>
                              <div style={{fontSize:12,color:"#6b7280",marginBottom:4}}>
                                Students who enroll in this bundle will get access to all selected course content below.
                              </div>
                              {matchedCourses.map(c=>{
                                const isSel = bundleForm.includedCourses.includes(c._id);
                                const chCount = c.chapters?.length||0;
                                const topicCount = c.chapters?.reduce((a,ch)=>a+(ch.lessons?.length||0),0)||0;
                                return (
                                  <label key={c._id} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 14px",
                                    borderRadius:10,border:`2px solid ${isSel?"#6c47d4":"#e5e7eb"}`,
                                    background:isSel?"#f5f3ff":"#fafafa",cursor:"pointer",transition:"all 0.15s"}}>
                                    <input type="checkbox" checked={isSel}
                                      onChange={()=>setBundleForm(prev=>({
                                        ...prev,
                                        includedCourses: isSel
                                          ? prev.includedCourses.filter(id=>id!==c._id)
                                          : [...prev.includedCourses, c._id]
                                      }))}
                                      style={{marginTop:3,accentColor:"#6c47d4"}}/>
                                    <div style={{flex:1}}>
                                      <div style={{fontWeight:700,fontSize:14,color:"#1f2937"}}>{c.title}</div>
                                      <div style={{fontSize:12,color:"#6b7280",marginTop:3,display:"flex",gap:12,flexWrap:"wrap"}}>
                                        <span>📘 {c.subject||"—"}</span>
                                        <span>📂 {chCount} chapter{chCount!==1?"s":""}</span>
                                        <span>🎬 {topicCount} topic{topicCount!==1?"s":""}</span>
                                        <span style={{padding:"1px 8px",borderRadius:20,fontSize:11,fontWeight:600,
                                          background:c.status==="published"?"#d1fae5":"#fef3c7",
                                          color:c.status==="published"?"#065f46":"#92400e"}}>
                                          {c.status}
                                        </span>
                                      </div>
                                    </div>
                                  </label>
                                );
                              })}
                              <div style={{fontSize:12,color:"#6c47d4",fontWeight:600,marginTop:2}}>
                                ✓ {bundleForm.includedCourses.filter(id=>matchedCourses.some(c=>c._id===id)).length} of {matchedCourses.length} courses selected
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Thumbnail */}
                    <div className="cr-field-group">
                      <label className="cr-label">Thumbnail Image</label>
                      <ImageUploader value={bundleForm.featureImage} onChange={val=>setBundleForm(p=>({...p,featureImage:val}))}/>
                    </div>

                    <div className="cr-form-footer">
                      <span className="cr-hint">* required fields</span>
                      <div className="cr-form-footer-btns">
                        <button className="cr-cancel-btn" onClick={()=>{setView("list");setBundleForm(EMPTY_BUNDLE);}}>
                          <MdClose size={15}/> Cancel
                        </button>
                        <button className="cr-primary-btn" style={{background:"#f59e0b"}} onClick={handleCreateBundle} disabled={saving}>
                          {saving?"Creating...":<><BsBoxSeam size={15}/> Create Bundle →</>}
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
                            {Icon:MdVideoLibrary, label:"Topics",   val:totalLessons(selectedCourse)},
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

                  {/* RIGHT COLUMN — everything stacked */}
                  <div style={{display:"flex",flexDirection:"column",gap:16}}>

                  {/* Chapters & Lessons (subject courses only) */}
                  {selectedCourse.courseType !== "bundle" && <div className="cr-chapters-card">
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
                                {editingChapterId===chapter._id ? (
                                  <div className="cr-chapter-form-row" onClick={e=>e.stopPropagation()}>
                                    <input className="cr-input" value={editChapterInput}
                                      onChange={e=>setEditChapterInput(e.target.value)}
                                      onKeyDown={e=>e.key==="Enter"&&handleEditChapter(chapter._id)}
                                      autoFocus/>
                                    <button className="cr-primary-btn" onClick={()=>handleEditChapter(chapter._id)} disabled={saving}>
                                      {saving?"...":"Save"}
                                    </button>
                                    <button className="cr-cancel-btn"
                                      onClick={()=>{setEditingChapterId(null);setEditChapterInput("");}}>
                                      <MdClose size={16}/>
                                    </button>
                                  </div>
                                ) : (
                                  <div className="cr-chapter-name">{chapter.title}</div>
                                )}
                                <div className="cr-chapter-count">
                                  <MdVideoLibrary size={11}/> {chapter.lessons.length} topics
                                </div>
                              </div>
                            </div>
                            <div className="cr-chapter-actions">
                              {editingChapterId!==chapter._id && (
                                <button className="cr-edit-chapter-btn" title="Edit chapter"
                                  onClick={e=>{e.stopPropagation();setEditingChapterId(chapter._id);setEditChapterInput(chapter.title);}}>
                                  <MdEdit size={14}/>
                                </button>
                              )}
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
                                      {lesson.videoType!=="none" && (lesson.youtubeLink || lesson.videoUrl) && (
                                        <button className="cr-preview-lesson-btn" title="Preview video"
                                          onClick={()=>setPreviewLessonId(previewLessonId===lesson._id?null:lesson._id)}>
                                          <MdPlayCircle size={13}/> Preview
                                        </button>
                                      )}
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
                                      {editingLessonId!==lesson._id && (
                                        <button className="cr-edit-lesson-btn" title="Edit topic"
                                          onClick={()=>{
                                            setEditingLessonId(lesson._id);
                                            setLessonForm({
                                              title: lesson.title||"",
                                              videoType: lesson.videoType||"none",
                                              youtubeLink: lesson.youtubeLink||"",
                                              videoUrl: lesson.videoUrl||"",
                                              duration: lesson.duration||"",
                                            });
                                          }}>
                                          <MdEdit size={13}/>
                                        </button>
                                      )}
                                      <button className="cr-del-lesson-btn"
                                        onClick={()=>handleDeleteLesson(chapter._id, lesson._id)}>
                                        <MdDelete size={13}/>
                                      </button>
                                    </div>
                                  </div>

                                  {/* ── Video preview panel ── */}
                                  {previewLessonId===lesson._id && (
                                    <div className="cr-video-preview">
                                      {lesson.videoType==="youtube" && toYoutubeEmbed(lesson.youtubeLink) ? (
                                        <iframe
                                          src={toYoutubeEmbed(lesson.youtubeLink)}
                                          title={lesson.title}
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                          allowFullScreen
                                        />
                                      ) : lesson.videoUrl ? (
                                        <video src={lesson.videoUrl} controls/>
                                      ) : (
                                        <div className="cr-video-url-hint">No valid video source to preview.</div>
                                      )}
                                    </div>
                                  )}

                                  {/* ── Edit topic form ── */}
                                  {editingLessonId===lesson._id && (
                                    <div className="cr-lesson-form">
                                      <div className="cr-lesson-form-title">
                                        <MdEdit size={15} color="#6c47d4"/> Edit Topic
                                      </div>

                                      <input className="cr-input" placeholder="Topic title"
                                        value={lessonForm.title}
                                        onChange={e=>setLessonForm({...lessonForm,title:e.target.value})} autoFocus/>

                                      <div className="cr-video-type-row">
                                        <span className="cr-video-type-label">Video source:</span>
                                        <button
                                          className={`cr-video-type-btn ${lessonForm.videoType==="bunny"?"cr-video-type-active":""}`}
                                          onClick={()=>setLessonForm({...lessonForm,videoType:"bunny",youtubeLink:"",videoUrl:""})}
                                          disabled={uploading}
                                        >
                                          <MdCloudUpload size={14} color={lessonForm.videoType==="bunny"?"#fff":"#6c47d4"}/> Upload
                                        </button>
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

                                      {lessonForm.videoType==="youtube" && (
                                        <input className="cr-input"
                                          placeholder="YouTube link https://youtube.com/watch?v=..."
                                          value={lessonForm.youtubeLink}
                                          onChange={e=>setLessonForm({...lessonForm,youtubeLink:e.target.value})}/>
                                      )}

                                      {lessonForm.videoType==="bunny" && (
                                        <div className="cr-bunny-upload">
                                          <input
                                            ref={videoFileRef}
                                            type="file"
                                            accept="video/*"
                                            style={{display:"none"}}
                                            onChange={e=>e.target.files[0] && handleBunnyUpload(e.target.files[0])}
                                          />
                                          {lessonForm.videoUrl ? (
                                            <div className="cr-bunny-success">
                                              <MdCheckCircle size={16} color="#10b981"/>
                                              <span>Video uploaded to Bunny Stream</span>
                                              <button className="cr-bunny-change-btn"
                                                onClick={()=>setLessonForm(prev=>({...prev,videoUrl:""}))}>
                                                Change
                                              </button>
                                            </div>
                                          ) : (
                                            <>
                                              <button
                                                className="cr-bunny-pick-btn"
                                                onClick={()=>videoFileRef.current?.click()}
                                                disabled={uploading}
                                              >
                                                <MdCloudUpload size={18}/>
                                                {uploading ? `Uploading... ${uploadProgress}%` : "Choose Video File"}
                                              </button>
                                              {uploading && (
                                                <div className="cr-progress-bar">
                                                  <div className="cr-progress-fill" style={{width:`${uploadProgress}%`}}/>
                                                </div>
                                              )}
                                              <div className="cr-video-url-hint">
                                                💡 Video will be encoded automatically and streamed via <strong>Bunny CDN</strong> (HLS adaptive quality).
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      )}

                                      {lessonForm.videoType==="custom" && (
                                        <>
                                          <input className="cr-input"
                                            placeholder="Video URL (Vimeo, Drive, S3...)"
                                            value={lessonForm.videoUrl}
                                            onChange={e=>setLessonForm({...lessonForm,videoUrl:e.target.value})}/>
                                          <div className="cr-video-url-hint">
                                            💡 Paste a direct video URL from <strong>Vimeo</strong>, <strong>Google Drive</strong> (Share → Anyone with link) or <strong>S3</strong>.
                                          </div>
                                        </>
                                      )}

                                      <input className="cr-input" placeholder="Duration e.g. 45 mins"
                                        value={lessonForm.duration}
                                        onChange={e=>setLessonForm({...lessonForm,duration:e.target.value})}/>

                                      <div className="cr-lesson-form-btns">
                                        <button className="cr-primary-btn" style={{flex:1,justifyContent:"center"}}
                                          onClick={()=>handleEditLesson(chapter._id, lesson._id)} disabled={saving}>
                                          <MdCheckCircle size={15}/> {saving?"Saving...":"Save Changes"}
                                        </button>
                                        <button className="cr-cancel-btn"
                                          onClick={()=>{setEditingLessonId(null);setLessonForm(EMPTY_LESSON);}}>
                                          <MdClose size={15}/> Cancel
                                        </button>
                                      </div>
                                    </div>
                                  )}

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
                                    <MdVideoLibrary size={15} color="#6c47d4"/> Add New Topic
                                  </div>

                                  {/* Lesson title */}
                                  <input className="cr-input" placeholder="Topic title"
                                    value={lessonForm.title}
                                    onChange={e=>setLessonForm({...lessonForm,title:e.target.value})} autoFocus/>

                                  {/* Video type toggle */}
                                  <div className="cr-video-type-row">
                                    <span className="cr-video-type-label">Video source:</span>
                                    <button
                                      className={`cr-video-type-btn ${lessonForm.videoType==="bunny"?"cr-video-type-active":""}`}
                                      onClick={()=>setLessonForm({...lessonForm,videoType:"bunny",youtubeLink:"",videoUrl:""})}
                                      disabled={uploading}
                                    >
                                      <MdCloudUpload size={14} color={lessonForm.videoType==="bunny"?"#fff":"#6c47d4"}/> Upload
                                    </button>
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

                                  {/* Bunny Stream upload */}
                                  {lessonForm.videoType==="bunny" && (
                                    <div className="cr-bunny-upload">
                                      <input
                                        ref={videoFileRef}
                                        type="file"
                                        accept="video/*"
                                        style={{display:"none"}}
                                        onChange={e=>e.target.files[0] && handleBunnyUpload(e.target.files[0])}
                                      />
                                      {lessonForm.videoUrl ? (
                                        <div className="cr-bunny-success">
                                          <MdCheckCircle size={16} color="#10b981"/>
                                          <span>Video uploaded to Bunny Stream</span>
                                          <button className="cr-bunny-change-btn"
                                            onClick={()=>setLessonForm(prev=>({...prev,videoUrl:""}))}>
                                            Change
                                          </button>
                                        </div>
                                      ) : (
                                        <>
                                          <button
                                            className="cr-bunny-pick-btn"
                                            onClick={()=>videoFileRef.current?.click()}
                                            disabled={uploading}
                                          >
                                            <MdCloudUpload size={18}/>
                                            {uploading ? `Uploading... ${uploadProgress}%` : "Choose Video File"}
                                          </button>
                                          {uploading && (
                                            <div className="cr-progress-bar">
                                              <div className="cr-progress-fill" style={{width:`${uploadProgress}%`}}/>
                                            </div>
                                          )}
                                          <div className="cr-video-url-hint">
                                            💡 Video will be encoded automatically and streamed via <strong>Bunny CDN</strong> (HLS adaptive quality).
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  )}

                                  {/* Custom video URL */}
                                  {lessonForm.videoType==="custom" && (
                                    <>
                                      <input className="cr-input"
                                        placeholder="Video URL (Vimeo, Drive, S3...)"
                                        value={lessonForm.videoUrl}
                                        onChange={e=>setLessonForm({...lessonForm,videoUrl:e.target.value})}/>
                                      <div className="cr-video-url-hint">
                                        💡 Paste a direct video URL from <strong>Vimeo</strong>, <strong>Google Drive</strong> (Share → Anyone with link) or <strong>S3</strong>.
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
                                      <MdCheckCircle size={15}/> {saving?"Adding...":"Add Topic"}
                                    </button>
                                    <button className="cr-cancel-btn"
                                      onClick={()=>{setShowLessonForm(null);setLessonForm(EMPTY_LESSON);}}>
                                      <MdClose size={15}/> Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button className="cr-add-lesson-btn" onClick={()=>setShowLessonForm(chapter._id)}>
                                  <MdAdd size={16}/> Add Topic
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>}

                  {/* Bundle subject-wise course content */}
                  {selectedCourse.courseType === "bundle" && (
                    <div className="cr-chapters-card">
                      <div className="cr-chapters-header">
                        <div className="cr-chapters-title">
                          <BsBoxSeam size={18} color="#f59e0b"/> Bundle Course Content
                          <span className="cr-chapters-count" style={{background:"#fef3c7",color:"#92400e"}}>
                            {(selectedCourse.bundledSubjects||[]).length} subjects
                          </span>
                        </div>
                      </div>

                      {(selectedCourse.bundledSubjects||[]).length===0 ? (
                        <div className="cr-empty cr-chapters-empty">
                          <span style={{fontSize:40}}>📦</span>
                          <div className="cr-empty-title">No subjects in this bundle</div>
                          <p>Edit bundle info to add subjects first.</p>
                        </div>
                      ) : (selectedCourse.bundledSubjects||[]).map(subject => {
                        const sc = (selectedCourse.subjectContents||[]).find(s=>s.subject===subject);
                        const chapters = sc?.chapters||[];
                        const topicTotal = chapters.reduce((a,ch)=>a+(ch.lessons?.length||0),0);

                        return (
                          <div key={subject} style={{border:"1.5px solid #fde68a",borderRadius:12,marginBottom:12,overflow:"hidden"}}>
                            {/* Subject header */}
                            <div style={{background:"#fffbeb",padding:"12px 16px",display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                              <span style={{fontSize:18}}>{subjectIcons[subject]||"📚"}</span>
                              <div style={{flex:1}}>
                                <div style={{fontWeight:700,fontSize:14,color:"#92400e"}}>{subject}</div>
                                <div style={{fontSize:12,color:"#78350f"}}>
                                  {chapters.length} chapter{chapters.length!==1?"s":""} · {topicTotal} topic{topicTotal!==1?"s":""}
                                </div>
                              </div>
                              {/* Fetch from existing course button */}
                              <button
                                onClick={()=>handleBsubFetch(subject)}
                                disabled={bsubFetching===subject}
                                style={{fontSize:12,padding:"5px 12px",borderRadius:8,border:"1.5px solid #f59e0b",
                                  background:"white",color:"#92400e",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                                {bsubFetching===subject
                                  ? "Importing..."
                                  : <><MdRefresh size={14}/> Fetch from existing course</>}
                              </button>
                              <button
                                onClick={()=>{ setBsubShowChapterForm(subject); setBsubChapterInput(""); }}
                                style={{fontSize:12,padding:"5px 12px",borderRadius:8,border:"none",
                                  background:"#f59e0b",color:"white",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                                <MdAdd size={14}/> Add Chapter
                              </button>
                            </div>

                            {/* Add chapter form */}
                            {bsubShowChapterForm===subject && (
                              <div style={{padding:"12px 16px",borderBottom:"1px solid #fde68a",background:"#fefce8"}}>
                                <div style={{fontWeight:600,fontSize:13,color:"#92400e",marginBottom:8}}>New Chapter</div>
                                <div style={{display:"flex",gap:8}}>
                                  <input className="cr-input" placeholder="e.g. Cell Biology"
                                    value={bsubChapterInput}
                                    onChange={e=>setBsubChapterInput(e.target.value)}
                                    onKeyDown={e=>e.key==="Enter"&&handleBsubAddChapter(subject)}
                                    autoFocus style={{flex:1}}/>
                                  <button className="cr-primary-btn" style={{background:"#f59e0b"}}
                                    onClick={()=>handleBsubAddChapter(subject)} disabled={saving}>
                                    {saving?"...":"Add"}
                                  </button>
                                  <button className="cr-cancel-btn"
                                    onClick={()=>setBsubShowChapterForm(null)}>
                                    <MdClose size={15}/>
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* Chapters list */}
                            <div style={{padding:"8px 0"}}>
                              {chapters.length===0 ? (
                                <div style={{padding:"16px",textAlign:"center",color:"#9ca3af",fontSize:13}}>
                                  No chapters yet — click "Add Chapter" or "Fetch from existing course"
                                </div>
                              ) : chapters.map((ch, ci) => {
                                const chKey = `${subject}::${ch._id}`;
                                const isOpen = bsubActiveChapter===chKey;
                                return (
                                  <div key={ch._id} className="cr-chapter-item">
                                    <div
                                      className={`cr-chapter-header ${isOpen?"cr-chapter-open":""}`}
                                      onClick={()=>setBsubActiveChapter(isOpen?null:chKey)}>
                                      <div className="cr-chapter-left">
                                        <span className="cr-chapter-num">{ci+1}</span>
                                        <div>
                                          {editingChapterId===String(ch._id) ? (
                                            <div className="cr-chapter-form-row" onClick={e=>e.stopPropagation()}>
                                              <input className="cr-input" value={editChapterInput}
                                                onChange={e=>setEditChapterInput(e.target.value)}
                                                onKeyDown={e=>e.key==="Enter"&&handleBsubEditChapter(subject,String(ch._id))}
                                                autoFocus/>
                                              <button className="cr-primary-btn" onClick={()=>handleBsubEditChapter(subject,String(ch._id))} disabled={saving}>
                                                {saving?"...":"Save"}
                                              </button>
                                              <button className="cr-cancel-btn"
                                                onClick={()=>{setEditingChapterId(null);setEditChapterInput("");}}>
                                                <MdClose size={16}/>
                                              </button>
                                            </div>
                                          ) : (
                                            <div className="cr-chapter-name">{ch.title}</div>
                                          )}
                                          <div className="cr-chapter-count">
                                            <MdVideoLibrary size={11}/> {ch.lessons?.length||0} topics
                                          </div>
                                        </div>
                                      </div>
                                      <div className="cr-chapter-actions">
                                        {editingChapterId!==String(ch._id) && (
                                          <button className="cr-edit-chapter-btn" title="Edit chapter"
                                            onClick={e=>{e.stopPropagation();setEditingChapterId(String(ch._id));setEditChapterInput(ch.title);}}>
                                            <MdEdit size={14}/>
                                          </button>
                                        )}
                                        <button className="cr-del-chapter-btn"
                                          onClick={e=>{e.stopPropagation();handleBsubDeleteChapter(subject,String(ch._id));}}>
                                          <MdDelete size={14}/>
                                        </button>
                                        {isOpen?<MdExpandLess size={22} color="#9ca3af"/>:<MdExpandMore size={22} color="#9ca3af"/>}
                                      </div>
                                    </div>

                                    {isOpen && (
                                      <div className="cr-lessons-wrap">
                                        {(ch.lessons||[]).map((lesson,li)=>(
                                          <div key={lesson._id} className="cr-lesson-item-wrap">
                                          <div className="cr-lesson-item">
                                            <span className="cr-lesson-num">{li+1}</span>
                                            {lesson.videoType==="youtube"
                                              ?<FaYoutube size={15} color="#ef4444"/>
                                              :lesson.videoType==="bunny"
                                                ?<FaVideo size={14} color="#6c47d4"/>
                                                :<MdVideoLibrary size={15} color="#9ca3af"/>}
                                            <span className="cr-lesson-title">{lesson.title}</span>
                                            {lesson.duration&&<span className="cr-lesson-duration"><MdTimelapse size={12}/> {lesson.duration}</span>}
                                            <div className="cr-lesson-btns">
                                              {lesson.videoType!=="none" && (lesson.youtubeLink || lesson.videoUrl) && (
                                                <button className="cr-preview-lesson-btn" title="Preview video"
                                                  onClick={()=>setPreviewLessonId(previewLessonId===String(lesson._id)?null:String(lesson._id))}>
                                                  <MdPlayCircle size={13}/> Preview
                                                </button>
                                              )}
                                              {editingLessonId!==String(lesson._id) && (
                                                <button className="cr-edit-lesson-btn" title="Edit topic"
                                                  onClick={()=>{
                                                    setEditingLessonId(String(lesson._id));
                                                    setBsubLessonForm({
                                                      title: lesson.title||"",
                                                      videoType: lesson.videoType||"none",
                                                      youtubeLink: lesson.youtubeLink||"",
                                                      videoUrl: lesson.videoUrl||"",
                                                      duration: lesson.duration||"",
                                                    });
                                                  }}>
                                                  <MdEdit size={13}/>
                                                </button>
                                              )}
                                              <button className="cr-del-lesson-btn"
                                                onClick={()=>handleBsubDeleteLesson(subject,String(ch._id),String(lesson._id))}>
                                                <MdDelete size={13}/>
                                              </button>
                                            </div>
                                          </div>

                                          {/* ── Video preview panel ── */}
                                          {previewLessonId===String(lesson._id) && (
                                            <div className="cr-video-preview">
                                              {lesson.videoType==="youtube" && toYoutubeEmbed(lesson.youtubeLink) ? (
                                                <iframe
                                                  src={toYoutubeEmbed(lesson.youtubeLink)}
                                                  title={lesson.title}
                                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                  allowFullScreen
                                                />
                                              ) : lesson.videoUrl ? (
                                                <video src={lesson.videoUrl} controls/>
                                              ) : (
                                                <div className="cr-video-url-hint">No valid video source to preview.</div>
                                              )}
                                            </div>
                                          )}

                                          {/* ── Edit topic form ── */}
                                          {editingLessonId===String(lesson._id) && (
                                            <div className="cr-lesson-form">
                                              <div className="cr-lesson-form-title">
                                                <MdEdit size={15} color="#f59e0b"/> Edit Topic
                                              </div>
                                              <input className="cr-input" placeholder="Topic title"
                                                value={bsubLessonForm.title}
                                                onChange={e=>setBsubLessonForm({...bsubLessonForm,title:e.target.value})} autoFocus/>

                                              <div className="cr-video-type-row">
                                                <span className="cr-video-type-label">Video source:</span>
                                                {[
                                                  {t:"bunny",label:"Upload",icon:<MdCloudUpload size={14} color={bsubLessonForm.videoType==="bunny"?"#fff":"#6c47d4"}/>},
                                                  {t:"youtube",label:"YouTube",icon:<FaYoutube size={14} color={bsubLessonForm.videoType==="youtube"?"#fff":"#ef4444"}/>},
                                                  {t:"custom",label:"Custom URL",icon:<FaVideo size={13} color={bsubLessonForm.videoType==="custom"?"#fff":"#6c47d4"}/>},
                                                  {t:"none",label:"No Video",icon:"📄"},
                                                ].map(({t,label,icon})=>(
                                                  <button key={t}
                                                    className={`cr-video-type-btn ${bsubLessonForm.videoType===t?"cr-video-type-active":""}`}
                                                    onClick={()=>setBsubLessonForm({...bsubLessonForm,videoType:t,youtubeLink:"",videoUrl:""})}>
                                                    {icon} {label}
                                                  </button>
                                                ))}
                                              </div>

                                              {bsubLessonForm.videoType==="youtube" && (
                                                <input className="cr-input" placeholder="YouTube link https://youtube.com/watch?v=..."
                                                  value={bsubLessonForm.youtubeLink}
                                                  onChange={e=>setBsubLessonForm({...bsubLessonForm,youtubeLink:e.target.value})}/>
                                              )}
                                              {bsubLessonForm.videoType==="custom" && (
                                                <>
                                                  <input className="cr-input" placeholder="Video URL (Vimeo, Drive, S3...)"
                                                    value={bsubLessonForm.videoUrl}
                                                    onChange={e=>setBsubLessonForm({...bsubLessonForm,videoUrl:e.target.value})}/>
                                                  <div className="cr-video-url-hint">
                                                    💡 Paste direct video URL from Vimeo, Google Drive, or S3.
                                                  </div>
                                                </>
                                              )}
                                              {bsubLessonForm.videoType==="bunny" && (
                                                <div className="cr-bunny-upload">
                                                  <input ref={bsubVideoFileRef} type="file" accept="video/*" style={{display:"none"}}
                                                    onChange={e=>e.target.files[0]&&handleBsubBunnyUpload(e.target.files[0])}/>
                                                  {bsubLessonForm.videoUrl ? (
                                                    <div className="cr-bunny-success">
                                                      <MdCheckCircle size={16} color="#10b981"/>
                                                      <span>Video uploaded to Bunny CDN</span>
                                                      <button className="cr-bunny-change-btn"
                                                        onClick={()=>setBsubLessonForm(prev=>({...prev,videoUrl:""}))}>Change</button>
                                                    </div>
                                                  ) : (
                                                    <>
                                                      <button className="cr-bunny-pick-btn"
                                                        onClick={()=>bsubVideoFileRef.current?.click()}
                                                        disabled={bsubUploading}>
                                                        <MdCloudUpload size={18}/>
                                                        {bsubUploading ? `Uploading... ${bsubUploadProgress}%` : "Choose Video File"}
                                                      </button>
                                                      {bsubUploading && (
                                                        <div className="cr-progress-bar">
                                                          <div className="cr-progress-fill" style={{width:`${bsubUploadProgress}%`}}/>
                                                        </div>
                                                      )}
                                                      <div className="cr-video-url-hint">
                                                        💡 Video will be encoded and streamed via <strong>Bunny CDN</strong>.
                                                      </div>
                                                    </>
                                                  )}
                                                </div>
                                              )}
                                              <input className="cr-input" placeholder="Duration e.g. 45 mins"
                                                value={bsubLessonForm.duration}
                                                onChange={e=>setBsubLessonForm({...bsubLessonForm,duration:e.target.value})}/>

                                              <div className="cr-lesson-form-btns">
                                                <button className="cr-primary-btn" style={{flex:1,justifyContent:"center",background:"#f59e0b"}}
                                                  onClick={()=>handleBsubEditLesson(subject,String(ch._id),String(lesson._id))} disabled={saving}>
                                                  <MdCheckCircle size={15}/> {saving?"Saving...":"Save Changes"}
                                                </button>
                                                <button className="cr-cancel-btn"
                                                  onClick={()=>{setEditingLessonId(null);setBsubLessonForm(EMPTY_LESSON);}}>
                                                  <MdClose size={15}/> Cancel
                                                </button>
                                              </div>
                                            </div>
                                          )}
                                          </div>
                                        ))}

                                        {/* Add lesson form */}
                                        {bsubShowLessonForm===chKey ? (
                                          <div className="cr-lesson-form">
                                            <div className="cr-lesson-form-title">
                                              <MdVideoLibrary size={15} color="#f59e0b"/> Add New Topic
                                            </div>
                                            <input className="cr-input" placeholder="Topic title"
                                              value={bsubLessonForm.title}
                                              onChange={e=>setBsubLessonForm({...bsubLessonForm,title:e.target.value})} autoFocus/>

                                            {/* Video type */}
                                            <div className="cr-video-type-row">
                                              <span className="cr-video-type-label">Video source:</span>
                                              {[
                                                {t:"bunny",label:"Upload",icon:<MdCloudUpload size={14} color={bsubLessonForm.videoType==="bunny"?"#fff":"#6c47d4"}/>},
                                                {t:"youtube",label:"YouTube",icon:<FaYoutube size={14} color={bsubLessonForm.videoType==="youtube"?"#fff":"#ef4444"}/>},
                                                {t:"custom",label:"Custom URL",icon:<FaVideo size={13} color={bsubLessonForm.videoType==="custom"?"#fff":"#6c47d4"}/>},
                                                {t:"none",label:"No Video",icon:"📄"},
                                              ].map(({t,label,icon})=>(
                                                <button key={t}
                                                  className={`cr-video-type-btn ${bsubLessonForm.videoType===t?"cr-video-type-active":""}`}
                                                  onClick={()=>setBsubLessonForm({...bsubLessonForm,videoType:t,youtubeLink:"",videoUrl:""})}>
                                                  {icon} {label}
                                                </button>
                                              ))}
                                            </div>

                                            {bsubLessonForm.videoType==="youtube" && (
                                              <input className="cr-input" placeholder="YouTube link https://youtube.com/watch?v=..."
                                                value={bsubLessonForm.youtubeLink}
                                                onChange={e=>setBsubLessonForm({...bsubLessonForm,youtubeLink:e.target.value})}/>
                                            )}
                                            {bsubLessonForm.videoType==="custom" && (
                                              <>
                                                <input className="cr-input" placeholder="Video URL (Vimeo, Drive, S3...)"
                                                  value={bsubLessonForm.videoUrl}
                                                  onChange={e=>setBsubLessonForm({...bsubLessonForm,videoUrl:e.target.value})}/>
                                                <div className="cr-video-url-hint">
                                                  💡 Paste direct video URL from Vimeo, Google Drive, or S3.
                                                </div>
                                              </>
                                            )}
                                            {bsubLessonForm.videoType==="bunny" && (
                                              <div className="cr-bunny-upload">
                                                <input ref={bsubVideoFileRef} type="file" accept="video/*" style={{display:"none"}}
                                                  onChange={e=>e.target.files[0]&&handleBsubBunnyUpload(e.target.files[0])}/>
                                                {bsubLessonForm.videoUrl ? (
                                                  <div className="cr-bunny-success">
                                                    <MdCheckCircle size={16} color="#10b981"/>
                                                    <span>Video uploaded to Bunny CDN</span>
                                                    <button className="cr-bunny-change-btn"
                                                      onClick={()=>setBsubLessonForm(prev=>({...prev,videoUrl:""}))}>Change</button>
                                                  </div>
                                                ) : (
                                                  <>
                                                    <button className="cr-bunny-pick-btn"
                                                      onClick={()=>bsubVideoFileRef.current?.click()}
                                                      disabled={bsubUploading}>
                                                      <MdCloudUpload size={18}/>
                                                      {bsubUploading ? `Uploading... ${bsubUploadProgress}%` : "Choose Video File"}
                                                    </button>
                                                    {bsubUploading && (
                                                      <div className="cr-progress-bar">
                                                        <div className="cr-progress-fill" style={{width:`${bsubUploadProgress}%`}}/>
                                                      </div>
                                                    )}
                                                    <div className="cr-video-url-hint">
                                                      💡 Video will be encoded and streamed via <strong>Bunny CDN</strong>.
                                                    </div>
                                                  </>
                                                )}
                                              </div>
                                            )}
                                            <input className="cr-input" placeholder="Duration e.g. 45 mins"
                                              value={bsubLessonForm.duration}
                                              onChange={e=>setBsubLessonForm({...bsubLessonForm,duration:e.target.value})}/>

                                            <div className="cr-lesson-form-btns">
                                              <button className="cr-primary-btn" style={{flex:1,justifyContent:"center",background:"#f59e0b"}}
                                                onClick={()=>handleBsubAddLesson(subject,String(ch._id))} disabled={saving}>
                                                <MdCheckCircle size={15}/> {saving?"Adding...":"Add Topic"}
                                              </button>
                                              <button className="cr-cancel-btn"
                                                onClick={()=>{setBsubShowLessonForm(null);setBsubLessonForm(EMPTY_LESSON);}}>
                                                <MdClose size={15}/> Cancel
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <button className="cr-add-lesson-btn"
                                            onClick={()=>setBsubShowLessonForm(chKey)}>
                                            <MdAdd size={16}/> Add Topic
                                          </button>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* ── MATERIALS SECTION ── */}
                  <MaterialsPanel
                    course={selectedCourse}
                    showForm={showMaterialForm}
                    setShowForm={setShowMaterialForm}
                    form={materialForm}
                    setForm={setMaterialForm}
                    activeTab={activeMatTab}
                    setActiveTab={setActiveMatTab}
                    uploadingPdf={uploadingPdf}
                    handlePdfUpload={handlePdfUpload}
                    handleAdd={handleAddMaterial}
                    handleDelete={handleDeleteMaterial}
                    saving={saving}
                  />

                  {/* ── ONLINE CLASSES LINKED TO THIS COURSE ── */}
                  <div style={{background:"#f0f9ff",border:"1.5px solid #bae6fd",borderRadius:12,padding:20}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                      <div style={{fontWeight:700,color:"#0369a1",fontSize:15,display:"flex",alignItems:"center",gap:8}}>
                        📡 Online Classes Linked to This Course
                        <span style={{background:"#0369a1",color:"white",borderRadius:20,fontSize:11,padding:"2px 8px",fontWeight:600}}>
                          {linkedClasses.length}
                        </span>
                      </div>
                      <a
                        href="/dashboard/admin/online-classes"
                        style={{fontSize:12,color:"#0369a1",textDecoration:"none",fontWeight:600,border:"1.5px solid #bae6fd",borderRadius:6,padding:"4px 10px"}}
                      >
                        + Add Online Class →
                      </a>
                    </div>
                    {linkedClasses.length === 0 ? (
                      <div style={{textAlign:"center",padding:"20px 0",color:"#64748b",fontSize:13}}>
                        <div style={{fontSize:32,marginBottom:8}}>📭</div>
                        No online classes linked to this course yet.
                        <div style={{marginTop:8,fontSize:12}}>
                          Go to <strong>Online Classes</strong> → Schedule a class → Select this course in "Link to Course" dropdown.
                        </div>
                      </div>
                    ) : (
                      <div style={{display:"flex",flexDirection:"column",gap:8}}>
                        {linkedClasses.map(cls => {
                          const statusColors = { upcoming:"#f59e0b", live:"#ef4444", completed:"#10b981" };
                          return (
                            <div key={cls._id} style={{background:"white",borderRadius:8,padding:"10px 14px",display:"flex",alignItems:"center",gap:12,border:"1px solid #e0f2fe"}}>
                              <span style={{width:8,height:8,borderRadius:"50%",background:statusColors[cls.status]||"#9ca3af",flexShrink:0}}/>
                              <div style={{flex:1,minWidth:0}}>
                                <div style={{fontWeight:600,fontSize:13,color:"#1e3a5f",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{cls.title}</div>
                                <div style={{fontSize:11,color:"#64748b",marginTop:2}}>
                                  {cls.teacher} · {cls.date} {cls.time} {cls.duration ? `· ${cls.duration}` : ""}
                                </div>
                              </div>
                              <span style={{fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,background:statusColors[cls.status]+"22",color:statusColors[cls.status]}}>
                                {cls.status?.toUpperCase()}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div style={{marginTop:12,fontSize:11,color:"#0369a1",background:"#e0f2fe",borderRadius:6,padding:"8px 10px"}}>
                      ✓ Only students enrolled in this course can access these online classes.
                      {selectedCourse.isFree ? " (Free course — students enroll directly)" : " (Paid course — students must purchase first)"}
                    </div>
                  </div>

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
   MATERIALS PANEL
───────────────────────────────────────── */
function MaterialsPanel({ course, showForm, setShowForm, form, setForm, activeTab, setActiveTab, uploadingPdf, handlePdfUpload, handleAdd, handleDelete, saving }) {
  const [openSection, setOpenSection] = useState(null); // "books" | "tma" | etc
  const [inlineForm, setInlineForm]   = useState({ title:"", fileUrl:"" });
  const [localUploading, setLocalUploading] = useState(false);

  const isBundle = course.courseType === "bundle";
  const subjects = isBundle ? (course.bundledSubjects || []) : [course.subject || "General"];

  // activeTab may be a leftover section key ("books") or a subject name — always prefer a known subject
  const activeSubject = subjects.includes(activeTab) ? activeTab : (subjects[0] || "");

  const getMaterials = (sub, sec) => {
    const mats = course.materials?.[sec] || [];
    if (!isBundle) return mats;
    return mats.filter(m => m.title.startsWith(`${sub} | `));
  };

  const totalForSubject = (sub) =>
    MATERIAL_SECTIONS.reduce((a, s) => a + getMaterials(sub, s.key).length, 0);

  const doUpload = async (file, onUrl) => {
    if (!file) return;
    setLocalUploading(true);
    try {
      const fd = new FormData(); fd.append("file", file);
      const res = await fetch("/api/upload/image", { method:"POST", body:fd, headers:{"x-upload-type":"file"} });
      const d = await res.json();
      if (d.success) { onUrl(d.url); }
      else toast.error("Upload failed");
    } catch { toast.error("Upload failed"); }
    finally { setLocalUploading(false); }
  };

  const doAdd = async (sub, secKey) => {
    if (!inlineForm.title.trim()) { toast.error("Title required"); return; }
    if (!inlineForm.fileUrl.trim()) { toast.error("Upload or paste a URL first"); return; }
    const finalTitle = isBundle ? `${sub} | ${inlineForm.title}` : inlineForm.title;
    await handleAdd({ section: secKey, title: finalTitle, fileUrl: inlineForm.fileUrl });
    setInlineForm({ title:"", fileUrl:"" });
    setOpenSection(null);
  };

  return (
    <div className="cr-chapters-card">
      <div className="cr-chapters-header">
        <div className="cr-chapters-title">
          <MdLibraryBooks size={20} color="#6c47d4"/> Study Materials
          <span className="cr-chapters-count">{isBundle ? `${subjects.length} subjects` : "Books · TMA · Notes · More"}</span>
        </div>
      </div>

      {/* Subject pills (bundle) or single subject header */}
      <div style={{padding:"0 16px 12px",display:"flex",flexWrap:"wrap",gap:8}}>
        {subjects.map(sub => {
          const cnt = totalForSubject(sub);
          const isSel = sub === activeSubject;
          return (
            <button key={sub} onClick={()=>{ setActiveTab(sub); setOpenSection(null); setInlineForm({title:"",fileUrl:""}); }}
              style={{padding:"7px 18px",borderRadius:10,border:`2px solid ${isSel?"#6c47d4":"#e5e7eb"}`,
                background:isSel?"#6c47d4":"white",color:isSel?"white":"#374151",
                fontWeight:700,fontSize:13,cursor:"pointer",transition:"all 0.15s",display:"flex",alignItems:"center",gap:6
              }}
            >
              {sub}
              {cnt>0 && <span style={{background:isSel?"rgba(255,255,255,0.25)":"#ede9fe",color:isSel?"white":"#6c47d4",
                borderRadius:20,padding:"1px 7px",fontSize:11,fontWeight:700}}>{cnt}</span>}
            </button>
          );
        })}
      </div>

      {/* Content-type rows for selected subject */}
      <div style={{padding:"0 16px 16px",display:"flex",flexDirection:"column",gap:10}}>
        {MATERIAL_SECTIONS.map(sec => {
          const files = getMaterials(activeSubject, sec.key);
          const isOpen = openSection === sec.key;
          return (
            <div key={sec.key} style={{border:`1.5px solid ${isOpen?sec.color:"#e5e7eb"}`,borderRadius:12,overflow:"hidden",transition:"border-color 0.15s"}}>
              {/* Section header row */}
              <div style={{display:"flex",alignItems:"center",padding:"11px 16px",background:isOpen?`${sec.color}10`:"#fafafa",cursor:"pointer",gap:10}}
                onClick={()=>{ setOpenSection(isOpen?null:sec.key); setInlineForm({title:"",fileUrl:""}); }}
              >
                <span style={{fontSize:18}}>{sec.icon}</span>
                <span style={{fontWeight:700,fontSize:14,color:isOpen?sec.color:"#374151",flex:1}}>{sec.label}</span>
                {files.length>0 && <span style={{fontSize:12,fontWeight:600,background:`${sec.color}18`,color:sec.color,padding:"2px 10px",borderRadius:20}}>{files.length} file{files.length>1?"s":""}</span>}
                <span style={{color:"#9ca3af",fontSize:18,lineHeight:1}}>{isOpen?"−":"+"}</span>
              </div>

              {/* Expanded content */}
              {isOpen && (
                <div style={{padding:"12px 16px",background:"white",borderTop:`1px solid ${sec.color}30`}}>
                  {/* Existing files */}
                  {files.length > 0 && (
                    <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:12}}>
                      {files.map(mat => {
                        const displayTitle = isBundle ? mat.title.replace(`${activeSubject} | `,"") : mat.title;
                        return (
                          <div key={mat._id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:"#fafafa",border:"1px solid #e5e7eb",borderRadius:8}}>
                            <span style={{fontSize:16}}>📄</span>
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{fontWeight:600,fontSize:13,color:"#111827",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{displayTitle}</div>
                              <a href={mat.fileUrl} target="_blank" rel="noreferrer" style={{fontSize:11,color:"#6c47d4",textDecoration:"none"}}>View / Download ↗</a>
                            </div>
                            <button onClick={()=>handleDelete(sec.key,mat._id)}
                              style={{background:"#fee2e2",border:"none",cursor:"pointer",color:"#ef4444",padding:"5px 7px",borderRadius:7,flexShrink:0}}>
                              <MdDelete size={15}/>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Upload form */}
                  <div style={{background:`${sec.color}08`,border:`1px dashed ${sec.color}50`,borderRadius:10,padding:14}}>
                    <div style={{fontWeight:600,fontSize:12,color:sec.color,marginBottom:10}}>+ Add {sec.label}</div>
                    <input className="cr-input" placeholder={`Title e.g. ${activeSubject} ${sec.label} Chapter 1`}
                      value={inlineForm.title} onChange={e=>setInlineForm(f=>({...f,title:e.target.value}))}
                      style={{marginBottom:8}}/>
                    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:inlineForm.fileUrl?8:0}}>
                      <input className="cr-input" placeholder="Paste file URL (Google Drive, etc.)"
                        value={inlineForm.fileUrl} onChange={e=>setInlineForm(f=>({...f,fileUrl:e.target.value}))}/>
                      <label style={{cursor:"pointer",padding:"9px 14px",background:localUploading?"#e5e7eb":`${sec.color}18`,
                        color:sec.color,borderRadius:8,fontWeight:700,fontSize:12,whiteSpace:"nowrap",flexShrink:0,border:`1.5px solid ${sec.color}40`}}>
                        {localUploading?"⏳...":"📎 Upload"}
                        <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xlsx" style={{display:"none"}} disabled={localUploading}
                          onChange={e=>doUpload(e.target.files[0], url=>setInlineForm(f=>({...f,fileUrl:url})))}/>
                      </label>
                    </div>
                    {inlineForm.fileUrl && (
                      <div style={{fontSize:11,color:"#166534",background:"#f0fdf4",padding:"5px 10px",borderRadius:6,marginBottom:8}}>
                        ✓ Ready: {inlineForm.fileUrl.split("/").pop()}
                      </div>
                    )}
                    <button className="cr-primary-btn" style={{marginTop:4,background:sec.color}}
                      onClick={()=>doAdd(activeSubject,sec.key)} disabled={saving}>
                      <MdCheckCircle size={14}/> {saving?"Saving...":"Save File"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
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