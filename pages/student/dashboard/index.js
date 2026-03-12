import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  MdDashboard,
  MdLiveTv,
  MdCalendarToday,
  MdCheckCircle,
  MdLogout,
  MdMenu,
  MdPlayCircle,
  MdPauseCircle,
  MdNotifications,
  MdSchool,
  MdAccessTime,
  MdDateRange,
  MdTimelapse,
  MdVideoLibrary,
  MdSignalCellularAlt,
  MdPerson,
  MdEdit,
  MdSave,
  MdClose,
  MdPhone,
  MdShoppingCart,
  MdDelete,
  MdLocalOffer,
  MdLock,
  MdCheck,
  MdSearch,
  MdFolder,
  MdArrowBack,
  MdExpandMore,
  MdExpandLess,
  MdOndemandVideo,
} from "react-icons/md";
import { FaChalkboardTeacher, FaGraduationCap, FaRupeeSign } from "react-icons/fa";
import { BiSolidBookOpen } from "react-icons/bi";
import { BsCollection, BsCartCheck } from "react-icons/bs";

/* ─── Subject helpers ─── */
const subjectColors = {
  Mathematics: "#6c47d4", Physics: "#0ea5e9", Chemistry: "#f59e0b",
  Biology: "#10b981", English: "#f43f5e", Hindi: "#8b5cf6",
  "Social Science": "#64748b", "Computer Science": "#06b6d4",
};
const subjectIcons = {
  Mathematics: "📐", Physics: "⚛️", Chemistry: "🧪",
  Biology: "🧬", English: "📖", Hindi: "🪔",
  "Social Science": "🌍", "Computer Science": "💻",
};
const getSubjectColor = (s) => subjectColors[s] || "#6c47d4";

/* ════════════════════════════════════════
   MAIN DASHBOARD
════════════════════════════════════════ */
export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent]         = useState(null);
  const [classes, setClasses]         = useState([]);
  const [courses, setCourses]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeMenu, setActiveMenu]   = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cart, setCart]               = useState([]);
  const [cartOpen, setCartOpen]       = useState(false);
  const [activeCourse, setActiveCourse] = useState(null); // course being watched

  /* ── Auth ── */
  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    const info  = localStorage.getItem("studentInfo");
    if (!token || !info) { router.push("/student/login"); return; }
    setStudent(JSON.parse(info));
    fetchClasses(token);
    fetchCourses(token);
  }, []);

  /* ── Fetch classes (ORIGINAL LOGIC — unchanged) ── */
  const fetchClasses = async (token) => {
    try {
      const info = JSON.parse(localStorage.getItem("studentInfo"));
      const studentClass = info?.className || "";
      const url = studentClass
        ? `/api/onlineClasses?limit=50&batch=${encodeURIComponent(studentClass)}`
        : `/api/onlineClasses?limit=50`;
      const res  = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setClasses(data.data);
    } catch (err) {
      console.error("Failed to fetch classes");
    }
    setLoading(false);
  };

  /* ── Fetch courses (NEW) ── */
  const fetchCourses = async (token) => {
    try {
      const res  = await fetch("/api/courses", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setCourses(data.courses);
    } catch {}
  };

  /* ── Logout (ORIGINAL — unchanged) ── */
  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentInfo");
    router.push("/student/login");
  };

  /* ── Class filters (ORIGINAL — unchanged) ── */
  const liveClasses      = classes.filter((c) => c.status === "live");
  const upcomingClasses  = classes.filter((c) => c.status === "upcoming");
  const completedClasses = classes.filter((c) => c.status === "completed");

  /* ── Format helpers (ORIGINAL — unchanged) ── */
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":");
    const hour   = parseInt(h);
    const ampm   = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  const getYoutubeId = (url) => {
    if (!url) return null;
    const patterns = [
      /youtube\.com\/watch\?v=([^&]+)/,
      /youtu\.be\/([^?]+)/,
      /youtube\.com\/embed\/([^?]+)/,
      /youtube\.com\/live\/([^?]+)/,
      /studio\.youtube\.com\/video\/([^/]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  /* ── Cart helpers ── */
  const addToCart = (course) => {
    if (cart.find((c) => c._id === course._id)) { setCartOpen(true); return; }
    setCart((prev) => [...prev, course]);
    setCartOpen(true);
  };
  const removeFromCart  = (id) => setCart((prev) => prev.filter((c) => c._id !== id));
  const enrolledCourses = courses.filter((c) => c.isEnrolled);

  const navigate = (menu) => { setActiveMenu(menu); setSidebarOpen(false); };

  if (!student) return null;

  return (
    <>
      <Head><title>Dashboard — SS Coaching</title></Head>

      <div className="sd-wrapper">

        {/* ═══════════════ SIDEBAR (original structure kept) ═══════════════ */}
        <div className={`sd-sidebar ${sidebarOpen ? "sd-sidebar-open" : ""}`}>

          {/* Logo — ORIGINAL */}
          <div className="sl-logo">
            <div className="sl-logo-icon">SS</div>
            <div>
              <div className="sl-logo-name">SS Coaching</div>
              <div className="sl-logo-tag">Rise From Failure • Estd. 2001</div>
            </div>
          </div>

          {/* Student Info — ORIGINAL */}
          <div className="sd-student-info">
            <div className="sd-student-avatar">
              {student.name ? student.name.charAt(0).toUpperCase() : "S"}
            </div>
            <div>
              <div className="sd-student-name">{student.name || "Student"}</div>
              <div className="sd-student-class">{student.className || ""}</div>
            </div>
          </div>

          {/* Nav Menu — ORIGINAL items + new Courses item */}
          <nav className="sd-nav">
            <button
              className={`sd-nav-item ${activeMenu === "dashboard" ? "sd-nav-active" : ""}`}
              onClick={() => navigate("dashboard")}
            >
              <MdDashboard className="sd-nav-icon" /> Dashboard
            </button>

            {/* ── NEW: Courses ── */}
            <button
              className={`sd-nav-item ${activeMenu === "courses" ? "sd-nav-active" : ""}`}
              onClick={() => navigate("courses")}
            >
              <BsCollection className="sd-nav-icon" /> Courses
              {enrolledCourses.length > 0 && (
                <span className="sd-nav-badge">{enrolledCourses.length}</span>
              )}
            </button>

            <button
              className={`sd-nav-item ${activeMenu === "live" ? "sd-nav-active" : ""}`}
              onClick={() => navigate("live")}
            >
              <MdLiveTv className="sd-nav-icon" /> Live Classes
              {liveClasses.length > 0 && (
                <span className="sd-nav-badge">{liveClasses.length}</span>
              )}
            </button>

            <button
              className={`sd-nav-item ${activeMenu === "upcoming" ? "sd-nav-active" : ""}`}
              onClick={() => navigate("upcoming")}
            >
              <MdCalendarToday className="sd-nav-icon" /> Upcoming Classes
            </button>

            <button
              className={`sd-nav-item ${activeMenu === "completed" ? "sd-nav-active" : ""}`}
              onClick={() => navigate("completed")}
            >
              <MdCheckCircle className="sd-nav-icon" /> Completed Classes
            </button>

            <button
              className={`sd-nav-item ${activeMenu === "profile" ? "sd-nav-active" : ""}`}
              onClick={() => navigate("profile")}
            >
              <MdPerson className="sd-nav-icon" /> My Profile
            </button>
          </nav>

          {/* Logout — ORIGINAL */}
          <button className="sd-logout-btn" onClick={handleLogout}>
            <MdLogout size={16} /> Logout
          </button>
        </div>

        {/* Overlay — ORIGINAL */}
        {sidebarOpen && (
          <div className="sd-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ═══════════════ MAIN ═══════════════ */}
        <div className="sd-main">

          {/* Topbar — ORIGINAL + cart icon added */}
          <div className="sd-topbar">
            <button className="sd-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <MdMenu size={24} />
            </button>
            <div className="sd-topbar-title">
              {activeMenu === "dashboard" && "Dashboard"}
              {activeMenu === "courses"   && <span><BsCollection size={18} style={{ marginRight: 6 }} /> Courses</span>}
              {activeMenu === "live"      && <span className="sd-topbar-live"><MdLiveTv size={20} /> Live Classes</span>}
              {activeMenu === "upcoming"  && <span className="sd-topbar-upcoming"><MdCalendarToday size={18} /> Upcoming Classes</span>}
              {activeMenu === "completed" && <span className="sd-topbar-completed"><MdCheckCircle size={18} /> Completed Classes</span>}
              {activeMenu === "profile"   && <span><MdPerson size={20} /> My Profile</span>}
            </div>
            <div className="sd-topbar-right">
              {/* Cart button — NEW */}
              <button className="sd-cart-btn" onClick={() => setCartOpen(true)}>
                <MdShoppingCart size={22} />
                {cart.length > 0 && <span className="sd-cart-count">{cart.length}</span>}
              </button>
              {/* Avatar — ORIGINAL */}
              <div
                className="sd-topbar-avatar"
                onClick={() => navigate("profile")}
                style={{ cursor: "pointer" }}
                title="My Profile"
              >
                {student.name ? student.name.charAt(0).toUpperCase() : "S"}
              </div>
            </div>
          </div>

          <div className="sd-content">

            {/* ═══ DASHBOARD HOME — ORIGINAL + enrolled courses preview ═══ */}
            {activeMenu === "dashboard" && (
              <div>
                <div className="sd-welcome-banner">
                  <div>
                    <div className="sd-welcome-text">
                      Welcome back, <strong>{student.name || "Student"}!</strong>
                    </div>
                    <div className="sd-welcome-sub">
                      {student.className && `${student.className} • `}Ready to learn today?
                    </div>
                  </div>
                  <div className="sd-welcome-icon-wrap">
                    <FaGraduationCap size={52} color="rgba(255,255,255,0.15)" />
                  </div>
                </div>

                <div className="sd-stats-row">
                  <div className="sd-stat-card sd-stat-live">
                    <MdLiveTv size={28} className="sd-stat-svg" />
                    <div className="sd-stat-num">{liveClasses.length}</div>
                    <div className="sd-stat-label">Live Now</div>
                  </div>
                  <div className="sd-stat-card sd-stat-upcoming">
                    <MdCalendarToday size={28} className="sd-stat-svg" />
                    <div className="sd-stat-num">{upcomingClasses.length}</div>
                    <div className="sd-stat-label">Upcoming</div>
                  </div>
                  <div className="sd-stat-card sd-stat-completed">
                    <MdCheckCircle size={28} className="sd-stat-svg" />
                    <div className="sd-stat-num">{completedClasses.length}</div>
                    <div className="sd-stat-label">Completed</div>
                  </div>
                  <div
                    className="sd-stat-card sd-stat-total"
                    onClick={() => navigate("courses")}
                    style={{ cursor: "pointer" }}
                  >
                    <BsCollection size={26} className="sd-stat-svg" />
                    <div className="sd-stat-num">{enrolledCourses.length}</div>
                    <div className="sd-stat-label">My Courses</div>
                  </div>
                </div>

                {/* My enrolled courses strip — NEW */}
                {enrolledCourses.length > 0 && (
                  <div className="sd-section">
                    <div className="sd-section-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span><BsCollection size={16} style={{ color: "#6c47d4", marginRight: 6 }} />My Courses</span>
                      <button className="sdc-see-all-btn" onClick={() => navigate("courses")}>See all →</button>
                    </div>
                    <div className="sdc-enrolled-strip-scroll">
                      {enrolledCourses.slice(0, 4).map((course) => (
                        <EnrolledCourseCard key={course._id} course={course} onOpen={() => { setActiveCourse(course._id); navigate("courses"); }} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Live now — ORIGINAL */}
                {liveClasses.length > 0 && (
                  <div className="sd-section">
                    <div className="sd-section-header">
                      <span className="sd-live-pulse"></span> Live Right Now
                    </div>
                    <div className="sd-cards-grid">
                      {liveClasses.map((cls) => (
                        <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Upcoming preview — ORIGINAL */}
                {upcomingClasses.length > 0 && (
                  <div className="sd-section">
                    <div className="sd-section-header">
                      <MdCalendarToday size={18} style={{ color: "#6c47d4" }} /> Upcoming Classes
                    </div>
                    <div className="sd-cards-grid">
                      {upcomingClasses.slice(0, 4).map((cls) => (
                        <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId} />
                      ))}
                    </div>
                  </div>
                )}

                {classes.length === 0 && !loading && (
                  <div className="sd-empty">
                    <MdVideoLibrary size={52} className="sd-empty-svg" />
                    <div className="sd-empty-title">No Classes Yet</div>
                    <p>Your teacher hasn't scheduled any classes yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* ═══ COURSES TAB — NEW ═══ */}
            {activeMenu === "courses" && !activeCourse && (
              <CoursesSection
                courses={courses}
                cart={cart}
                addToCart={addToCart}
                setCartOpen={setCartOpen}
                onEnrolled={() => fetchCourses(localStorage.getItem("studentToken"))}
                onOpenCourse={setActiveCourse}
              />
            )}

            {/* ═══ COURSE PLAYER ═══ */}
            {activeMenu === "courses" && activeCourse && (
              <CoursePlayer
                courseId={activeCourse}
                onBack={() => setActiveCourse(null)}
              />
            )}

            {/* ═══ LIVE — ORIGINAL ═══ */}
            {activeMenu === "live" && (
              <div>
                {liveClasses.length === 0 ? (
                  <div className="sd-empty">
                    <MdSignalCellularAlt size={52} className="sd-empty-svg" />
                    <div className="sd-empty-title">No Live Classes Right Now</div>
                    <p>Check back when your teacher goes live!</p>
                  </div>
                ) : (
                  <div className="sd-cards-grid">
                    {liveClasses.map((cls) => (
                      <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ═══ UPCOMING — ORIGINAL ═══ */}
            {activeMenu === "upcoming" && (
              <div>
                {upcomingClasses.length === 0 ? (
                  <div className="sd-empty">
                    <MdCalendarToday size={52} className="sd-empty-svg" />
                    <div className="sd-empty-title">No Upcoming Classes</div>
                    <p>No classes scheduled yet. Stay tuned!</p>
                  </div>
                ) : (
                  <div className="sd-cards-grid">
                    {upcomingClasses.map((cls) => (
                      <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ═══ COMPLETED — ORIGINAL ═══ */}
            {activeMenu === "completed" && (
              <div>
                {completedClasses.length === 0 ? (
                  <div className="sd-empty">
                    <MdCheckCircle size={52} className="sd-empty-svg" />
                    <div className="sd-empty-title">No Completed Classes Yet</div>
                    <p>Completed classes will appear here.</p>
                  </div>
                ) : (
                  <div className="sd-cards-grid">
                    {completedClasses.map((cls) => (
                      <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ═══ PROFILE — ORIGINAL ═══ */}
            {activeMenu === "profile" && (
              <ProfileSection student={student} setStudent={setStudent} />
            )}

          </div>
        </div>

        {/* ═══ CART DRAWER — NEW (outside main, fixed) ═══ */}
        {cartOpen && <div className="sd-overlay sdc-overlay-top" onClick={() => setCartOpen(false)} />}
        <CartDrawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          removeFromCart={removeFromCart}
          onEnrolled={() => {
            fetchCourses(localStorage.getItem("studentToken"));
            setCart([]);
            setCartOpen(false);
          }}
        />

      </div>
    </>
  );
}

/* ════════════════════════════════════════
   COURSES SECTION — NEW
════════════════════════════════════════ */
function CoursesSection({ courses, cart, addToCart, setCartOpen, onEnrolled, onOpenCourse }) {
  const [filter, setFilter]   = useState("all");
  const [search, setSearch]   = useState("");
  const [subject, setSubject] = useState("");

  const subjects = [...new Set(courses.map((c) => c.subject).filter(Boolean))];

  const filtered = courses.filter((c) => {
    if (filter === "enrolled" && !c.isEnrolled) return false;
    if (filter === "free"     && !c.isFree)     return false;
    if (filter === "paid"     && c.isFree)      return false;
    if (subject && c.subject !== subject)        return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) &&
        !(c.subject || "").toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const enrolled = courses.filter((c) => c.isEnrolled);

  return (
    <div>
      {/* Continue Learning strip */}
      {enrolled.length > 0 && (
        <div className="sdc-enrolled-strip">
          <div className="sdc-strip-title">
            <BsCartCheck size={17} style={{ color: "#6c47d4", marginRight: 7 }} />
            Continue Learning
          </div>
          <div className="sdc-enrolled-strip-scroll">
            {enrolled.map((c) => (
              <EnrolledCourseCard key={c._id} course={c} onOpen={() => onOpenCourse(c._id)} />
            ))}
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div className="sdc-filters">
        <div className="sdc-search-wrap">
          <MdSearch size={18} className="sdc-search-icon" />
          <input
            className="sdc-search"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="sdc-filter-row">
          {[
            { val: "all",      label: "All Courses" },
            { val: "free",     label: "Free" },
            { val: "paid",     label: "Paid" },
            { val: "enrolled", label: "My Courses" },
          ].map((f) => (
            <button
              key={f.val}
              className={`sdc-filter-btn ${filter === f.val ? "sdc-filter-active" : ""}`}
              onClick={() => setFilter(f.val)}
            >
              {f.label}
            </button>
          ))}
          {subjects.length > 1 && (
            <select
              className="sdc-subject-select"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">All Subjects</option>
              {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          )}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="sd-empty">
          <BsCollection size={48} className="sd-empty-svg" />
          <div className="sd-empty-title">
            {filter === "enrolled" ? "No Enrolled Courses" : "No Courses Found"}
          </div>
          <p>
            {filter === "enrolled"
              ? "Browse courses and enroll to start learning!"
              : "Try a different filter or search term."}
          </p>
          {filter === "enrolled" && (
            <button className="sdc-browse-btn" onClick={() => setFilter("all")}>
              Browse All Courses
            </button>
          )}
        </div>
      ) : (
        <div className="sdc-grid">
          {filtered.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              cart={cart}
              addToCart={addToCart}
              onEnrolled={onEnrolled}
              onOpen={() => onOpenCourse(course._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   COURSE CARD — NEW
════════════════════════════════════════ */
function CourseCard({ course, cart, addToCart, onEnrolled, onOpen }) {
  const [enrolling, setEnrolling] = useState(false);
  const inCart = cart.find((c) => c._id === course._id);
  const totalLessons = course.chapters?.reduce((a, c) => a + c.lessons.length, 0) || 0;

  const handleFreeEnroll = async () => {
    setEnrolling(true);
    try {
      const token = localStorage.getItem("studentToken");
      const res   = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId: course._id }),
      });
      const data = await res.json();
      if (data.success) { onEnrolled(); }
      else alert(data.error || "Failed to enroll");
    } catch { alert("Network error"); }
    setEnrolling(false);
  };

  return (
    <div className={`sdc-card ${course.isEnrolled ? "sdc-card-enrolled" : ""}`}>
      {/* Thumbnail */}
      <div
        className="sdc-card-thumb"
        style={{
          background: course.featureImage
            ? `url(${course.featureImage}) center/cover no-repeat`
            : `linear-gradient(135deg,${getSubjectColor(course.subject)}22,${getSubjectColor(course.subject)}66)`,
        }}
      >
        {!course.featureImage && (
          <span className="sdc-thumb-icon">{subjectIcons[course.subject] || "📚"}</span>
        )}
        <span className={`sdc-price-badge ${course.isFree ? "sdc-badge-free" : "sdc-badge-paid"}`}>
          {course.isFree ? "FREE" : <><FaRupeeSign size={10} />{course.price}</>}
        </span>
        {course.isEnrolled && (
          <span className="sdc-enrolled-badge"><MdCheck size={11} /> Enrolled</span>
        )}
      </div>

      <div className="sdc-card-body">
        <div className="sdc-card-subject" style={{ color: getSubjectColor(course.subject) }}>
          {subjectIcons[course.subject] || "📚"} {course.subject} • {course.batch}
        </div>
        <div className="sdc-card-title">{course.title}</div>
        {course.description && (
          <div className="sdc-card-desc">{course.description.slice(0, 80)}...</div>
        )}
        <div className="sdc-card-meta">
          <span><MdFolder size={12} /> {course.chapters?.length || 0} Chapters</span>
          <span><MdVideoLibrary size={12} /> {totalLessons} Lessons</span>
        </div>

        {/* CTA */}
        {course.isEnrolled ? (
          <button className="sdc-btn sdc-btn-start" onClick={onOpen}>
            <MdPlayCircle size={16} /> Continue Learning
          </button>
        ) : course.isFree ? (
          <button className="sdc-btn sdc-btn-free" onClick={handleFreeEnroll} disabled={enrolling}>
            {enrolling ? "Enrolling..." : <><MdCheck size={15} /> Enroll Free</>}
          </button>
        ) : inCart ? (
          <button className="sdc-btn sdc-btn-incart">
            <BsCartCheck size={15} /> In Cart
          </button>
        ) : (
          <button className="sdc-btn sdc-btn-buy" onClick={() => addToCart(course)}>
            <MdShoppingCart size={15} /> Add to Cart &nbsp;•&nbsp; <FaRupeeSign size={11} />{course.price}
          </button>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   ENROLLED COURSE CARD (compact) — NEW
════════════════════════════════════════ */
function EnrolledCourseCard({ course, onOpen }) {
  const totalLessons = course.chapters?.reduce((a, c) => a + c.lessons.length, 0) || 0;
  return (
    <div className="sdc-enrolled-card">
      <div
        className="sdc-enrolled-thumb"
        style={{
          background: course.featureImage
            ? `url(${course.featureImage}) center/cover no-repeat`
            : `linear-gradient(135deg,${getSubjectColor(course.subject)}33,${getSubjectColor(course.subject)}66)`,
        }}
      >
        {!course.featureImage && (
          <span style={{ fontSize: 24 }}>{subjectIcons[course.subject] || "📚"}</span>
        )}
      </div>
      <div className="sdc-enrolled-body">
        <div className="sdc-enrolled-subject" style={{ color: getSubjectColor(course.subject) }}>
          {course.subject}
        </div>
        <div className="sdc-enrolled-title">{course.title}</div>
        <div className="sdc-enrolled-meta">
          <span><MdFolder size={11} /> {course.chapters?.length || 0} ch</span>
          <span><MdVideoLibrary size={11} /> {totalLessons} lessons</span>
        </div>
        <button className="sdc-enrolled-cta" onClick={onOpen}>
          <MdPlayCircle size={13} /> Continue
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   COURSE PLAYER — chapter/lesson view
════════════════════════════════════════ */
function CoursePlayer({ courseId, onBack }) {
  const [course, setCourse]           = useState(null);
  const [loading, setLoading]         = useState(true);
  const [activeLesson, setActiveLesson] = useState(null); // { chapterIdx, lessonIdx, lesson }
  const [openChapters, setOpenChapters] = useState({});   // { chapterIdx: true/false }

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("studentToken");
        const res   = await fetch(`/api/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setCourse(data.course);
          // Open first chapter by default and play first lesson
          if (data.course.chapters?.length > 0) {
            setOpenChapters({ 0: true });
            const firstLesson = data.course.chapters[0]?.lessons?.[0];
            if (firstLesson?.youtubeLink) {
              setActiveLesson({ chapterIdx: 0, lessonIdx: 0, lesson: firstLesson });
            }
          }
        }
      } catch {}
      setLoading(false);
    };
    load();
  }, [courseId]);

  const toggleChapter = (idx) =>
    setOpenChapters(prev => ({ ...prev, [idx]: !prev[idx] }));

  const getYoutubeId = (url) => {
    if (!url) return null;
    const patterns = [
      /youtube\.com\/watch\?v=([^&]+)/,
      /youtu\.be\/([^?]+)/,
      /youtube\.com\/embed\/([^?]+)/,
      /youtube\.com\/live\/([^?]+)/,
    ];
    for (const p of patterns) { const m = url.match(p); if (m) return m[1]; }
    return null;
  };

  const totalLessons = course?.chapters?.reduce((a, c) => a + c.lessons.length, 0) || 0;
  const ytId = activeLesson?.lesson?.youtubeLink
    ? getYoutubeId(activeLesson.lesson.youtubeLink)
    : null;

  if (loading) {
    return (
      <div className="scp-loading">
        <div className="scp-spinner-ring"></div>
        <p>Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="sd-empty">
        <MdVideoLibrary size={48} className="sd-empty-svg" />
        <div className="sd-empty-title">Course not found</div>
        <button className="sdc-browse-btn" onClick={onBack}>← Go Back</button>
      </div>
    );
  }

  return (
    <div className="scp-wrapper">

      {/* ── Header ── */}
      <div className="scp-header">
        <button className="scp-back-btn" onClick={onBack}>
          <MdArrowBack size={18} /> Back to Courses
        </button>
        <div className="scp-header-info">
          <div className="scp-course-title">{course.title}</div>
          <div className="scp-course-meta">
            <span style={{ color: getSubjectColor(course.subject) }}>
              {subjectIcons[course.subject] || "📚"} {course.subject}
            </span>
            <span>•</span>
            <span>{course.batch}</span>
            <span>•</span>
            <span>{course.chapters?.length || 0} Chapters</span>
            <span>•</span>
            <span>{totalLessons} Lessons</span>
          </div>
        </div>
      </div>

      {/* ── Body: video + sidebar ── */}
      <div className="scp-body">

        {/* ── Video area ── */}
        <div className="scp-video-area">
          {activeLesson && ytId ? (
            <>
              <div className="scp-video-wrap">
                <iframe
                  key={ytId}
                  src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="scp-iframe"
                  title={activeLesson.lesson.title}
                />
              </div>
              <div className="scp-lesson-info">
                <div className="scp-lesson-title">{activeLesson.lesson.title}</div>
                {activeLesson.lesson.duration && (
                  <div className="scp-lesson-dur">
                    <MdTimelapse size={14} /> {activeLesson.lesson.duration}
                  </div>
                )}
                <div className="scp-lesson-chapter">
                  Chapter {activeLesson.chapterIdx + 1}: {course.chapters[activeLesson.chapterIdx]?.title}
                </div>
              </div>
            </>
          ) : activeLesson && !ytId ? (
            // lesson exists but no link (shouldn't happen for enrolled, but safety)
            <div className="scp-locked">
              <MdLock size={48} />
              <div>This lesson link is not available</div>
            </div>
          ) : (
            <div className="scp-no-lesson">
              <MdOndemandVideo size={64} />
              <div>Select a lesson to start watching</div>
            </div>
          )}
        </div>

        {/* ── Chapter / Lesson Sidebar ── */}
        <div className="scp-sidebar">
          <div className="scp-sidebar-title">Course Content</div>

          {course.chapters?.length === 0 && (
            <div className="scp-no-content">No chapters added yet.</div>
          )}

          {course.chapters?.map((chapter, ci) => {
            const isOpen = !!openChapters[ci];
            return (
              <div key={chapter._id || ci} className="scp-chapter">

                {/* Chapter header */}
                <button
                  className="scp-chapter-header"
                  onClick={() => toggleChapter(ci)}
                >
                  <div className="scp-chapter-left">
                    <span className="scp-chapter-num">Ch {ci + 1}</span>
                    <span className="scp-chapter-title">{chapter.title}</span>
                  </div>
                  <div className="scp-chapter-right">
                    <span className="scp-chapter-count">{chapter.lessons.length} lessons</span>
                    {isOpen ? <MdExpandLess size={18} /> : <MdExpandMore size={18} />}
                  </div>
                </button>

                {/* Lessons */}
                {isOpen && (
                  <div className="scp-lessons">
                    {chapter.lessons.length === 0 && (
                      <div className="scp-no-content" style={{ padding: "10px 16px" }}>No lessons yet</div>
                    )}
                    {chapter.lessons.map((lesson, li) => {
                      const isActive = activeLesson?.chapterIdx === ci && activeLesson?.lessonIdx === li;
                      const hasLink  = !!lesson.youtubeLink;

                      return (
                        <button
                          key={lesson._id || li}
                          className={`scp-lesson ${isActive ? "scp-lesson-active" : ""} ${!hasLink ? "scp-lesson-locked" : ""}`}
                          onClick={() => {
                            if (hasLink) setActiveLesson({ chapterIdx: ci, lessonIdx: li, lesson });
                          }}
                          disabled={!hasLink}
                        >
                          <div className="scp-lesson-left">
                            {hasLink ? (
                              <MdPlayCircle size={16} className={isActive ? "scp-play-active" : "scp-play-icon"} />
                            ) : (
                              <MdLock size={14} className="scp-lock-icon" />
                            )}
                            <span className="scp-lesson-name">{lesson.title}</span>
                          </div>
                          {lesson.duration && (
                            <span className="scp-lesson-time">{lesson.duration}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   CART DRAWER — NEW
════════════════════════════════════════ */
function CartDrawer({ open, onClose, cart, removeFromCart, onEnrolled }) {
  const [coupon, setCoupon]               = useState("");
  const [couponApplied, setCouponApplied] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError]     = useState("");
  const [paying, setPaying]               = useState(false);

  const subtotal = cart.reduce((a, c) => a + (c.isFree ? 0 : c.price), 0);
  const discount = couponApplied
    ? couponApplied.type === "percent"
      ? Math.round((subtotal * couponApplied.value) / 100)
      : Math.min(couponApplied.value, subtotal)
    : 0;
  const total = Math.max(0, subtotal - discount);

  const applyCoupon = async () => {
    if (!coupon.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const paidCourse = cart.find((c) => !c.isFree);
      if (!paidCourse) { setCouponError("No paid courses in cart"); setCouponLoading(false); return; }
      const token = localStorage.getItem("studentToken");
      const res   = await fetch("/api/courses/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId: paidCourse._id, couponCode: coupon }),
      });
      const data = await res.json();
      if (data.success && data.type === "paid") {
        setCouponApplied({ code: data.couponCode, discount: data.discount, type: "flat", value: data.discount });
      } else if (data.success && data.type === "free") {
        setCouponApplied({ code: coupon.toUpperCase(), discount: subtotal, type: "flat", value: subtotal });
      } else {
        setCouponError(data.error || "Invalid coupon");
        setCouponApplied(null);
      }
    } catch { setCouponError("Network error"); }
    setCouponLoading(false);
  };

  const removeCoupon = () => { setCouponApplied(null); setCoupon(""); setCouponError(""); };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setPaying(true);

    // Free items first
    const freeItems = cart.filter((c) => c.isFree);
    const paidItems = cart.filter((c) => !c.isFree);

    const token = localStorage.getItem("studentToken");
    for (const c of freeItems) {
      await fetch("/api/courses/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId: c._id }),
      });
    }

    if (paidItems.length === 0 || total === 0) { onEnrolled(); setPaying(false); return; }

    // Razorpay for paid items
    for (const course of paidItems) {
      await checkoutCourse(course._id, couponApplied?.code || "", discount, total);
    }
    setPaying(false);
  };

  const checkoutCourse = (courseId, couponCode, discountAmt, amount) =>
    new Promise(async (resolve) => {
      const token = localStorage.getItem("studentToken");
      const oRes  = await fetch("/api/courses/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId, couponCode }),
      });
      const oData = await oRes.json();
      if (!oData.success) { alert(oData.error || "Payment init failed"); resolve(); return; }

      const options = {
        key:         oData.keyId,
        amount:      oData.amount * 100,
        currency:    "INR",
        name:        "SS Coaching",
        description: oData.courseName,
        order_id:    oData.orderId,
        prefill:     { contact: JSON.parse(localStorage.getItem("studentInfo") || "{}").phone || "" },
        theme:       { color: "#6c47d4" },
        handler: async (response) => {
          const vRes = await fetch("/api/courses/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ ...response, courseId, couponCode, discount: discountAmt, amount: oData.amount }),
          });
          const vData = await vRes.json();
          if (vData.success) { onEnrolled(); resolve(); }
          else { alert("Payment failed: " + (vData.error || "Unknown error")); resolve(); }
        },
        modal: { ondismiss: resolve },
      };
      if (typeof window !== "undefined" && window.Razorpay) {
        new window.Razorpay(options).open();
      } else {
        alert("Payment gateway not loaded. Please refresh.");
        resolve();
      }
    });

  return (
    <div className={`sdc-cart-drawer ${open ? "sdc-cart-open" : ""}`}>
      <div className="sdc-cart-header">
        <div className="sdc-cart-title">
          <MdShoppingCart size={20} /> My Cart
          {cart.length > 0 && <span className="sdc-cart-badge">{cart.length}</span>}
        </div>
        <button className="sdc-cart-close" onClick={onClose}><MdClose size={22} /></button>
      </div>

      {cart.length === 0 ? (
        <div className="sdc-cart-empty">
          <MdShoppingCart size={52} className="sdc-cart-empty-icon" />
          <div>Your cart is empty</div>
          <p>Add a course to get started!</p>
        </div>
      ) : (
        <>
          {/* Items */}
          <div className="sdc-cart-items">
            {cart.map((course) => (
              <div key={course._id} className="sdc-cart-item">
                <div
                  className="sdc-cart-item-thumb"
                  style={{
                    background: course.featureImage
                      ? `url(${course.featureImage}) center/cover no-repeat`
                      : `linear-gradient(135deg,${getSubjectColor(course.subject)}33,${getSubjectColor(course.subject)}66)`,
                  }}
                >
                  {!course.featureImage && (
                    <span style={{ fontSize: 18 }}>{subjectIcons[course.subject] || "📚"}</span>
                  )}
                </div>
                <div className="sdc-cart-item-info">
                  <div className="sdc-cart-item-title">{course.title}</div>
                  <div className="sdc-cart-item-sub">{course.subject} • {course.batch}</div>
                  <div className="sdc-cart-item-price">
                    {course.isFree
                      ? <span className="sdc-free-tag">FREE</span>
                      : <span><FaRupeeSign size={11} />{course.price}</span>
                    }
                  </div>
                </div>
                <button className="sdc-cart-remove" onClick={() => removeFromCart(course._id)}>
                  <MdDelete size={17} />
                </button>
              </div>
            ))}
          </div>

          {/* Coupon */}
          <div className="sdc-coupon-wrap">
            <div className="sdc-coupon-title"><MdLocalOffer size={14} /> Have a coupon code?</div>
            {couponApplied ? (
              <div className="sdc-coupon-applied">
                <MdCheck size={15} color="#10b981" />
                <span><strong>{couponApplied.code}</strong> — ₹{discount} off!</span>
                <button className="sdc-coupon-remove" onClick={removeCoupon}><MdClose size={14} /></button>
              </div>
            ) : (
              <div className="sdc-coupon-row">
                <input
                  className="sdc-coupon-input"
                  placeholder="COUPON CODE"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                />
                <button className="sdc-coupon-btn" onClick={applyCoupon} disabled={couponLoading}>
                  {couponLoading ? "..." : "Apply"}
                </button>
              </div>
            )}
            {couponError && <div className="sdc-coupon-error">{couponError}</div>}
          </div>

          {/* Summary */}
          <div className="sdc-summary">
            <div className="sdc-summary-row">
              <span>Subtotal</span><span>₹{subtotal}</span>
            </div>
            {couponApplied && (
              <div className="sdc-summary-row sdc-summary-discount">
                <span>Discount ({couponApplied.code})</span>
                <span>−₹{discount}</span>
              </div>
            )}
            <div className="sdc-summary-row sdc-summary-total">
              <span>Total</span>
              <span>
                {total === 0
                  ? <span style={{ color: "#10b981", fontWeight: 800 }}>FREE 🎉</span>
                  : `₹${total}`}
              </span>
            </div>
          </div>

          <button className="sdc-checkout-btn" onClick={handleCheckout} disabled={paying}>
            {paying
              ? "Processing..."
              : total === 0
                ? <><MdCheck size={18} /> Enroll Now — Free!</>
                : <><MdLock size={15} /> Pay ₹{total} Securely</>
            }
          </button>
          <div className="sdc-secure-note">
            <MdLock size={11} /> Secured by Razorpay &nbsp;•&nbsp; UPI, Cards, NetBanking
          </div>
        </>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   PROFILE SECTION — ORIGINAL (zero changes)
════════════════════════════════════════ */
function ProfileSection({ student, setStudent }) {
  const [saving, setSaving]       = useState(false);
  const [form, setForm]           = useState({
    name: student.name || "",
    className: student.className || "",
    batch: student.batch || "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg]     = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const changed =
      form.name      !== (student.name      || "") ||
      form.className !== (student.className || "") ||
      form.batch     !== (student.batch     || "");
    setHasChanges(changed);
  }, [form, student]);

  const handleSave = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    if (!form.name.trim()) { setErrorMsg("Name is required"); return; }
    if (!form.className)   { setErrorMsg("Class is required"); return; }
    setSaving(true);
    try {
      const token = localStorage.getItem("studentToken");
      const res   = await fetch("/api/student/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        const updatedInfo = { ...student, ...data.student };
        localStorage.setItem("studentInfo", JSON.stringify(updatedInfo));
        setStudent(updatedInfo);
        setSuccessMsg("Profile updated successfully!");
        setHasChanges(false);
        setTimeout(() => setSuccessMsg(""), 3000);
      } else {
        setErrorMsg(data.message || "Failed to update");
      }
    } catch {
      setErrorMsg("Server error. Please try again.");
    }
    setSaving(false);
  };

  const handleReset = () => {
    setForm({ name: student.name || "", className: student.className || "", batch: student.batch || "" });
    setErrorMsg("");
    setSuccessMsg("");
  };

  return (
    <div className="sp-wrapper">
      <div className="sp-two-col">

        {/* LEFT COLUMN — ORIGINAL */}
        <div className="sp-left-col">
          <div className="sp-avatar-card">
            <div className="sp-avatar-bg"></div>
            <div className="sp-avatar-content">
              <div className="sp-big-avatar">
                {student.name ? student.name.charAt(0).toUpperCase() : "S"}
              </div>
              <div className="sp-display-name">{student.name || "Student"}</div>
              <div className="sp-display-phone">+91 {student.phone}</div>
              <div className="sp-badges-row">
                {student.className && <span className="sp-class-badge">{student.className}</span>}
                {student.batch     && <span className="sp-batch-badge">{student.batch}</span>}
              </div>
            </div>
          </div>

          <div className="sp-summary-card">
            <div className="sp-summary-title">Account Info</div>
            <div className="sp-summary-row">
              <MdPerson size={15} className="sp-summary-icon" />
              <div><div className="sp-summary-label">Full Name</div><div className="sp-summary-value">{student.name || "—"}</div></div>
            </div>
            <div className="sp-summary-row">
              <MdPhone size={15} className="sp-summary-icon" />
              <div><div className="sp-summary-label">Mobile</div><div className="sp-summary-value">+91 {student.phone}</div></div>
            </div>
            <div className="sp-summary-row">
              <MdSchool size={15} className="sp-summary-icon" />
              <div><div className="sp-summary-label">Class</div><div className="sp-summary-value">{student.className || "—"}</div></div>
            </div>
            <div className="sp-summary-row">
              <FaGraduationCap size={14} className="sp-summary-icon" />
              <div><div className="sp-summary-label">Batch</div><div className="sp-summary-value">{student.batch || "—"}</div></div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — ORIGINAL */}
        <div className="sp-right-col">
          <div className="sp-edit-card">
            <div className="sp-edit-card-header">
              <div>
                <div className="sp-edit-card-title"><MdEdit size={18} /> Edit Profile</div>
                <div className="sp-edit-card-sub">Update your personal information below</div>
              </div>
              {hasChanges && <span className="sp-unsaved-badge">Unsaved changes</span>}
            </div>

            {successMsg && <div className="sp-success">✅ {successMsg}</div>}
            {errorMsg   && <div className="sp-error">⚠️ {errorMsg}</div>}

            <div className="sp-form-fields">
              <div className="sp-field">
                <label className="sp-label">Full Name <span className="sp-req">*</span></label>
                <input type="text" className="sp-input" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name" />
              </div>
              <div className="sp-field">
                <label className="sp-label">Mobile Number</label>
                <input type="text" className="sp-input sp-input-disabled"
                  value={`+91 ${student.phone}`} disabled />
                <div className="sp-hint">📵 Phone number cannot be changed</div>
              </div>
              <div className="sp-field">
                <label className="sp-label">Class <span className="sp-req">*</span></label>
                <select className="sp-input" value={form.className}
                  onChange={(e) => setForm({ ...form, className: e.target.value })}>
                  <option value="">Select your class</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                  <option value="NIOS Stream 1">NIOS Stream 1</option>
                  <option value="NIOS Stream 2">NIOS Stream 2</option>
                  <option value="Dropper Batch">Dropper Batch</option>
                </select>
              </div>
              <div className="sp-field">
                <label className="sp-label">Batch <span className="sp-optional">(optional)</span></label>
                <input type="text" className="sp-input" value={form.batch}
                  onChange={(e) => setForm({ ...form, batch: e.target.value })}
                  placeholder="e.g. Morning Batch / Evening Batch" />
              </div>
            </div>

            <div className="sp-form-actions">
              <button className="sp-reset-btn" onClick={handleReset} disabled={!hasChanges || saving}>
                <MdClose size={15} /> Reset
              </button>
              <button className="sp-save-btn" onClick={handleSave} disabled={!hasChanges || saving}>
                {saving
                  ? <><span className="sp-spinner"></span> Saving...</>
                  : <><MdSave size={15} /> Save Changes</>
                }
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   CLASS CARD — ORIGINAL (zero changes)
════════════════════════════════════════ */
function ClassCard({ cls, formatDate, formatTime, getYoutubeId }) {
  const [watching, setWatching] = useState(false);
  const ytId = getYoutubeId(cls.streamLink);

  const statusConfig = {
    live:      { label: "Live Now",  cls: "sd-badge-live" },
    upcoming:  { label: "Upcoming",  cls: "sd-badge-upcoming" },
    completed: { label: "Completed", cls: "sd-badge-completed" },
  };
  const { label, cls: badgeCls } = statusConfig[cls.status] || statusConfig.upcoming;

  const noteColors = {
    notes:      "#6c47d4",
    assignment: "#d97706",
    solution:   "#059669",
    other:      "#6b7280",
  };

  return (
    <div className={`sd-class-card ${cls.status === "live" ? "sd-card-live" : ""}`}>

      {cls.status === "live" && ytId && (
        watching ? (
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000" }}>
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              allowFullScreen allow="autoplay; encrypted-media"
            />
          </div>
        ) : (
          <div onClick={() => setWatching(true)}
            style={{ position: "relative", height: 180, background: "#000", cursor: "pointer", overflow: "hidden" }}>
            <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={cls.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div className="sd-live-overlay"><span className="sd-live-dot-sm"></span> LIVE</div>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
              <MdPlayCircle size={56} color="#fff" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))" }} />
            </div>
          </div>
        )
      )}

      {cls.status === "completed" && ytId && (
        <div style={{ height: 180, background: "#000", overflow: "hidden" }}>
          <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={cls.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}

      {cls.status === "upcoming" && ytId && (
        <div style={{ height: 180, background: "#1a1f4b", overflow: "hidden", position: "relative" }}>
          <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={cls.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
            justifyContent: "center", color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600 }}>
            Not started yet
          </div>
        </div>
      )}

      <div className="sd-card-body">
        <div className="sd-card-top">
          <span className={`sd-badge ${badgeCls}`} style={{ display: "inline-flex", alignItems: "center" }}>
            {cls.status === "live"      && <MdLiveTv size={11} style={{ marginRight: 3 }} />}
            {cls.status === "upcoming"  && <MdAccessTime size={11} style={{ marginRight: 3 }} />}
            {cls.status === "completed" && <MdCheckCircle size={11} style={{ marginRight: 3 }} />}
            {label}
          </span>
          <span className="sd-card-subject">{cls.subject}</span>
        </div>

        <div className="sd-card-title">{cls.title}</div>
        {cls.chapter && <div className="sd-card-chapter">{cls.chapter}</div>}

        <div className="sd-card-meta">
          <span className="sd-meta-item"><FaChalkboardTeacher size={13} /> {cls.teacher}</span>
          <span className="sd-meta-item"><MdSchool size={13} /> {cls.batch}</span>
        </div>

        <div className="sd-card-time">
          <span className="sd-meta-item"><MdDateRange size={13} /> {formatDate(cls.date)}</span>
          <span className="sd-meta-item"><MdAccessTime size={13} /> {formatTime(cls.time)}</span>
          {cls.duration && <span className="sd-meta-item"><MdTimelapse size={13} /> {cls.duration}</span>}
        </div>

        {cls.status === "live" && (
          <button className="sd-watch-btn sd-watch-live" onClick={() => setWatching(!watching)}>
            {watching ? <><MdPauseCircle size={16} /> Hide Stream</> : <><MdPlayCircle size={16} /> Join Live Class</>}
          </button>
        )}

        {cls.status === "completed" && cls.streamLink && (
          <a href={cls.streamLink} target="_blank" rel="noopener noreferrer" className="sd-watch-btn sd-watch-recorded">
            <MdVideoLibrary size={16} /> Watch Recording
          </a>
        )}

        {cls.status === "upcoming" && (
          <div className="sd-upcoming-tag">
            <MdNotifications size={14} />
            Class starts on {formatDate(cls.date)} at {formatTime(cls.time)}
          </div>
        )}

        {/* Notes section — ORIGINAL */}
        {cls.notes && cls.notes.length > 0 && (
          <div className="sd-notes-section">
            <div className="sd-notes-title">📎 Study Materials</div>
            <div className="sd-notes-list">
              {cls.notes.map((note) => (
                <a key={note._id} href={note.driveLink} target="_blank" rel="noopener noreferrer" className="sd-note-btn">
                  <div className="sd-note-btn-left">
                    <div className="sd-note-type-dot" style={{ background: noteColors[note.type] || "#6b7280" }} />
                    <span className="sd-note-name">{note.title}</span>
                  </div>
                  <span className="sd-note-download">Open →</span>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
















// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import {
//   MdDashboard,
//   MdLiveTv,
//   MdCalendarToday,
//   MdCheckCircle,
//   MdLogout,
//   MdMenu,
//   MdPlayCircle,
//   MdPauseCircle,
//   MdNotifications,
//   MdSchool,
//   MdAccessTime,
//   MdDateRange,
//   MdTimelapse,
//   MdVideoLibrary,
//   MdSignalCellularAlt,
//   MdPerson,
//   MdEdit,
//   MdSave,
//   MdClose,
//   MdPhone,
// } from "react-icons/md";
// import { FaChalkboardTeacher, FaGraduationCap } from "react-icons/fa";
// import { BiSolidBookOpen } from "react-icons/bi";

// export default function StudentDashboard() {
//   const router = useRouter();
//   const [student, setStudent] = useState(null);
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeMenu, setActiveMenu] = useState("dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   /* ================= AUTH CHECK ================= */
//   useEffect(() => {
//     const token = localStorage.getItem("studentToken");
//     const info = localStorage.getItem("studentInfo");
//     if (!token || !info) {
//       router.push("/student/login");
//       return;
//     }
//     setStudent(JSON.parse(info));
//     fetchClasses(token);
//   }, []);

//   /* ================= FETCH CLASSES ================= */
//   const fetchClasses = async (token) => {
//     try {
//       const info = JSON.parse(localStorage.getItem("studentInfo"));
//       const studentClass = info?.className || "";
//       const url = studentClass
//         ? `/api/onlineClasses?limit=50&batch=${encodeURIComponent(studentClass)}`
//         : `/api/onlineClasses?limit=50`;

//       const res = await fetch(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (data.success) setClasses(data.data);
//     } catch (err) {
//       console.error("Failed to fetch classes");
//     }
//     setLoading(false);
//   };

//   /* ================= LOGOUT ================= */
//   const handleLogout = () => {
//     localStorage.removeItem("studentToken");
//     localStorage.removeItem("studentInfo");
//     router.push("/student/login");
//   };

//   /* ================= FILTER CLASSES ================= */
//   const liveClasses = classes.filter((c) => c.status === "live");
//   const upcomingClasses = classes.filter((c) => c.status === "upcoming");
//   const completedClasses = classes.filter((c) => c.status === "completed");

//   /* ================= FORMAT HELPERS ================= */
//   const formatDate = (dateStr) => {
//     if (!dateStr) return "";
//     return new Date(dateStr).toLocaleDateString("en-IN", {
//       day: "numeric", month: "short", year: "numeric",
//     });
//   };

//   const formatTime = (timeStr) => {
//     if (!timeStr) return "";
//     const [h, m] = timeStr.split(":");
//     const hour = parseInt(h);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     const hour12 = hour % 12 || 12;
//     return `${hour12}:${m} ${ampm}`;
//   };

//   const getYoutubeId = (url) => {
//     if (!url) return null;
//     const patterns = [
//       /youtube\.com\/watch\?v=([^&]+)/,
//       /youtu\.be\/([^?]+)/,
//       /youtube\.com\/embed\/([^?]+)/,
//       /youtube\.com\/live\/([^?]+)/,
//       /studio\.youtube\.com\/video\/([^/]+)/,
//     ];
//     for (const pattern of patterns) {
//       const match = url.match(pattern);
//       if (match) return match[1];
//     }
//     return null;
//   };

//   if (!student) return null;

//   return (
//     <>
//       <Head><title>Dashboard — SS Coaching</title></Head>

//       <div className="sd-wrapper">

//         {/* ===== SIDEBAR ===== */}
//         <div className={`sd-sidebar ${sidebarOpen ? "sd-sidebar-open" : ""}`}>

//           {/* Logo */}
//           <div className="sl-logo">
//             <div className="sl-logo-icon">SS</div>
//             <div>
//               <div className="sl-logo-name">SS Coaching</div>
//               <div className="sl-logo-tag">Rise From Failure • Estd. 2001</div>
//             </div>
//           </div>

//           {/* Student Info */}
//           <div className="sd-student-info">
//             <div className="sd-student-avatar">
//               {student.name ? student.name.charAt(0).toUpperCase() : "S"}
//             </div>
//             <div>
//               <div className="sd-student-name">{student.name || "Student"}</div>
//               <div className="sd-student-class">{student.className || ""}</div>
//             </div>
//           </div>

//           {/* Nav Menu */}
//           <nav className="sd-nav">
//             <button
//               className={`sd-nav-item ${activeMenu === "dashboard" ? "sd-nav-active" : ""}`}
//               onClick={() => { setActiveMenu("dashboard"); setSidebarOpen(false); }}
//             >
//               <MdDashboard className="sd-nav-icon" /> Dashboard
//             </button>

//             <button
//               className={`sd-nav-item ${activeMenu === "live" ? "sd-nav-active" : ""}`}
//               onClick={() => { setActiveMenu("live"); setSidebarOpen(false); }}
//             >
//               <MdLiveTv className="sd-nav-icon" /> Live Classes
//               {liveClasses.length > 0 && (
//                 <span className="sd-nav-badge">{liveClasses.length}</span>
//               )}
//             </button>

//             <button
//               className={`sd-nav-item ${activeMenu === "upcoming" ? "sd-nav-active" : ""}`}
//               onClick={() => { setActiveMenu("upcoming"); setSidebarOpen(false); }}
//             >
//               <MdCalendarToday className="sd-nav-icon" /> Upcoming Classes
//             </button>

//             <button
//               className={`sd-nav-item ${activeMenu === "completed" ? "sd-nav-active" : ""}`}
//               onClick={() => { setActiveMenu("completed"); setSidebarOpen(false); }}
//             >
//               <MdCheckCircle className="sd-nav-icon" /> Completed Classes
//             </button>

//             <button
//               className={`sd-nav-item ${activeMenu === "profile" ? "sd-nav-active" : ""}`}
//               onClick={() => { setActiveMenu("profile"); setSidebarOpen(false); }}
//             >
//               <MdPerson className="sd-nav-icon" /> My Profile
//             </button>
//           </nav>

//           {/* Logout */}
//           <button className="sd-logout-btn" onClick={handleLogout}>
//             <MdLogout size={16} /> Logout
//           </button>
//         </div>

//         {/* Overlay */}
//         {sidebarOpen && (
//           <div className="sd-overlay" onClick={() => setSidebarOpen(false)} />
//         )}

//         {/* ===== MAIN ===== */}
//         <div className="sd-main">

//           {/* Topbar */}
//           <div className="sd-topbar">
//             <button className="sd-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
//               <MdMenu size={24} />
//             </button>
//             <div className="sd-topbar-title">
//               {activeMenu === "dashboard" && "Dashboard"}
//               {activeMenu === "live" && <span className="sd-topbar-live"><MdLiveTv size={20} /> Live Classes</span>}
//               {activeMenu === "upcoming" && <span className="sd-topbar-upcoming"><MdCalendarToday size={18} /> Upcoming Classes</span>}
//               {activeMenu === "completed" && <span className="sd-topbar-completed"><MdCheckCircle size={18} /> Completed Classes</span>}
//               {activeMenu === "profile" && <span><MdPerson size={20} /> My Profile</span>}
//             </div>
//             <div className="sd-topbar-right">
//               <div
//                 className="sd-topbar-avatar"
//                 onClick={() => setActiveMenu("profile")}
//                 style={{ cursor: "pointer" }}
//                 title="My Profile"
//               >
//                 {student.name ? student.name.charAt(0).toUpperCase() : "S"}
//               </div>
//             </div>
//           </div>

//           <div className="sd-content">

//             {/* ===== DASHBOARD ===== */}
//             {activeMenu === "dashboard" && (
//               <div>
//                 <div className="sd-welcome-banner">
//                   <div>
//                     <div className="sd-welcome-text">
//                       Welcome back, <strong>{student.name || "Student"}!</strong>
//                     </div>
//                     <div className="sd-welcome-sub">
//                       {student.className && `${student.className} • `}Ready to learn today?
//                     </div>
//                   </div>
//                   <div className="sd-welcome-icon-wrap">
//                     <FaGraduationCap size={52} color="rgba(255,255,255,0.15)" />
//                   </div>
//                 </div>

//                 <div className="sd-stats-row">
//                   <div className="sd-stat-card sd-stat-live">
//                     <MdLiveTv size={28} className="sd-stat-svg" />
//                     <div className="sd-stat-num">{liveClasses.length}</div>
//                     <div className="sd-stat-label">Live Now</div>
//                   </div>
//                   <div className="sd-stat-card sd-stat-upcoming">
//                     <MdCalendarToday size={28} className="sd-stat-svg" />
//                     <div className="sd-stat-num">{upcomingClasses.length}</div>
//                     <div className="sd-stat-label">Upcoming</div>
//                   </div>
//                   <div className="sd-stat-card sd-stat-completed">
//                     <MdCheckCircle size={28} className="sd-stat-svg" />
//                     <div className="sd-stat-num">{completedClasses.length}</div>
//                     <div className="sd-stat-label">Completed</div>
//                   </div>
//                   <div className="sd-stat-card sd-stat-total">
//                     <BiSolidBookOpen size={28} className="sd-stat-svg" />
//                     <div className="sd-stat-num">{classes.length}</div>
//                     <div className="sd-stat-label">Total Classes</div>
//                   </div>
//                 </div>

//                 {liveClasses.length > 0 && (
//                   <div className="sd-section">
//                     <div className="sd-section-header">
//                       <span className="sd-live-pulse"></span> Live Right Now
//                     </div>
//                     <div className="sd-cards-grid">
//                       {liveClasses.map((cls) => (
//                         <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId} />
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {upcomingClasses.length > 0 && (
//                   <div className="sd-section">
//                     <div className="sd-section-header">
//                       <MdCalendarToday size={18} style={{ color: "#6c47d4" }} /> Upcoming Classes
//                     </div>
//                     <div className="sd-cards-grid">
//                       {upcomingClasses.slice(0, 4).map((cls) => (
//                         <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId} />
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {classes.length === 0 && !loading && (
//                   <div className="sd-empty">
//                     <MdVideoLibrary size={52} className="sd-empty-svg" />
//                     <div className="sd-empty-title">No Classes Yet</div>
//                     <p>Your teacher hasn't scheduled any classes yet.</p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* ===== LIVE ===== */}
//             {activeMenu === "live" && (
//               <div>
//                 {liveClasses.length === 0 ? (
//                   <div className="sd-empty">
//                     <MdSignalCellularAlt size={52} className="sd-empty-svg" />
//                     <div className="sd-empty-title">No Live Classes Right Now</div>
//                     <p>Check back when your teacher goes live!</p>
//                   </div>
//                 ) : (
//                   <div className="sd-cards-grid">
//                     {liveClasses.map((cls) => (
//                       <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId} />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* ===== UPCOMING ===== */}
//             {activeMenu === "upcoming" && (
//               <div>
//                 {upcomingClasses.length === 0 ? (
//                   <div className="sd-empty">
//                     <MdCalendarToday size={52} className="sd-empty-svg" />
//                     <div className="sd-empty-title">No Upcoming Classes</div>
//                     <p>No classes scheduled yet. Stay tuned!</p>
//                   </div>
//                 ) : (
//                   <div className="sd-cards-grid">
//                     {upcomingClasses.map((cls) => (
//                       <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId} />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* ===== COMPLETED ===== */}
//             {activeMenu === "completed" && (
//               <div>
//                 {completedClasses.length === 0 ? (
//                   <div className="sd-empty">
//                     <MdCheckCircle size={52} className="sd-empty-svg" />
//                     <div className="sd-empty-title">No Completed Classes Yet</div>
//                     <p>Completed classes will appear here.</p>
//                   </div>
//                 ) : (
//                   <div className="sd-cards-grid">
//                     {completedClasses.map((cls) => (
//                       <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId} />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* ===== PROFILE ===== */}
//             {activeMenu === "profile" && (
//               <ProfileSection student={student} setStudent={setStudent} />
//             )}

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// /* ================= PROFILE SECTION ================= */
// function ProfileSection({ student, setStudent }) {
//   const [saving, setSaving] = useState(false);
//   const [form, setForm] = useState({
//     name: student.name || "",
//     className: student.className || "",
//     batch: student.batch || "",
//   });
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [hasChanges, setHasChanges] = useState(false);

//   useEffect(() => {
//     const changed =
//       form.name !== (student.name || "") ||
//       form.className !== (student.className || "") ||
//       form.batch !== (student.batch || "");
//     setHasChanges(changed);
//   }, [form, student]);

//   const handleSave = async () => {
//     setErrorMsg("");
//     setSuccessMsg("");
//     if (!form.name.trim()) { setErrorMsg("Name is required"); return; }
//     if (!form.className)   { setErrorMsg("Class is required"); return; }
//     setSaving(true);
//     try {
//       const token = localStorage.getItem("studentToken");
//       const res = await fetch("/api/student/update-profile", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (data.success) {
//         const updatedInfo = { ...student, ...data.student };
//         localStorage.setItem("studentInfo", JSON.stringify(updatedInfo));
//         setStudent(updatedInfo);
//         setSuccessMsg("Profile updated successfully!");
//         setHasChanges(false);
//         setTimeout(() => setSuccessMsg(""), 3000);
//       } else {
//         setErrorMsg(data.message || "Failed to update");
//       }
//     } catch {
//       setErrorMsg("Server error. Please try again.");
//     }
//     setSaving(false);
//   };

//   const handleReset = () => {
//     setForm({ name: student.name || "", className: student.className || "", batch: student.batch || "" });
//     setErrorMsg("");
//     setSuccessMsg("");
//   };

//   return (
//     <div className="sp-wrapper">
//       <div className="sp-two-col">

//         {/* LEFT COLUMN */}
//         <div className="sp-left-col">
//           <div className="sp-avatar-card">
//             <div className="sp-avatar-bg"></div>
//             <div className="sp-avatar-content">
//               <div className="sp-big-avatar">
//                 {student.name ? student.name.charAt(0).toUpperCase() : "S"}
//               </div>
//               <div className="sp-display-name">{student.name || "Student"}</div>
//               <div className="sp-display-phone">+91 {student.phone}</div>
//               <div className="sp-badges-row">
//                 {student.className && <span className="sp-class-badge">{student.className}</span>}
//                 {student.batch && <span className="sp-batch-badge">{student.batch}</span>}
//               </div>
//             </div>
//           </div>

//           <div className="sp-summary-card">
//             <div className="sp-summary-title">Account Info</div>
//             <div className="sp-summary-row">
//               <MdPerson size={15} className="sp-summary-icon" />
//               <div><div className="sp-summary-label">Full Name</div><div className="sp-summary-value">{student.name || "—"}</div></div>
//             </div>
//             <div className="sp-summary-row">
//               <MdPhone size={15} className="sp-summary-icon" />
//               <div><div className="sp-summary-label">Mobile</div><div className="sp-summary-value">+91 {student.phone}</div></div>
//             </div>
//             <div className="sp-summary-row">
//               <MdSchool size={15} className="sp-summary-icon" />
//               <div><div className="sp-summary-label">Class</div><div className="sp-summary-value">{student.className || "—"}</div></div>
//             </div>
//             <div className="sp-summary-row">
//               <FaGraduationCap size={14} className="sp-summary-icon" />
//               <div><div className="sp-summary-label">Batch</div><div className="sp-summary-value">{student.batch || "—"}</div></div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="sp-right-col">
//           <div className="sp-edit-card">
//             <div className="sp-edit-card-header">
//               <div>
//                 <div className="sp-edit-card-title"><MdEdit size={18} /> Edit Profile</div>
//                 <div className="sp-edit-card-sub">Update your personal information below</div>
//               </div>
//               {hasChanges && <span className="sp-unsaved-badge">Unsaved changes</span>}
//             </div>

//             {successMsg && <div className="sp-success">✅ {successMsg}</div>}
//             {errorMsg   && <div className="sp-error">⚠️ {errorMsg}</div>}

//             <div className="sp-form-fields">
//               <div className="sp-field">
//                 <label className="sp-label">Full Name <span className="sp-req">*</span></label>
//                 <input type="text" className="sp-input" value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
//               </div>
//               <div className="sp-field">
//                 <label className="sp-label">Mobile Number</label>
//                 <input type="text" className="sp-input sp-input-disabled" value={`+91 ${student.phone}`} disabled />
//                 <div className="sp-hint">📵 Phone number cannot be changed</div>
//               </div>
//               <div className="sp-field">
//                 <label className="sp-label">Class <span className="sp-req">*</span></label>
//                 <select className="sp-input" value={form.className}
//                   onChange={(e) => setForm({ ...form, className: e.target.value })}>
//                   <option value="">Select your class</option>
//                   <option value="Class 9">Class 9</option>
//                   <option value="Class 10">Class 10</option>
//                   <option value="Class 11">Class 11</option>
//                   <option value="Class 12">Class 12</option>
//                   <option value="NIOS Stream 1">NIOS Stream 1</option>
//                   <option value="NIOS Stream 2">NIOS Stream 2</option>
//                   <option value="Dropper Batch">Dropper Batch</option>
//                 </select>
//               </div>
//               <div className="sp-field">
//                 <label className="sp-label">Batch <span className="sp-optional">(optional)</span></label>
//                 <input type="text" className="sp-input" value={form.batch}
//                   onChange={(e) => setForm({ ...form, batch: e.target.value })}
//                   placeholder="e.g. Morning Batch / Evening Batch" />
//               </div>
//             </div>

//             <div className="sp-form-actions">
//               <button className="sp-reset-btn" onClick={handleReset} disabled={!hasChanges || saving}>
//                 <MdClose size={15} /> Reset
//               </button>
//               <button className="sp-save-btn" onClick={handleSave} disabled={!hasChanges || saving}>
//                 {saving ? <><span className="sp-spinner"></span> Saving...</> : <><MdSave size={15} /> Save Changes</>}
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// /* ================= CLASS CARD ================= */
// function ClassCard({ cls, formatDate, formatTime, getYoutubeId }) {
//   const [watching, setWatching] = useState(false);
//   const ytId = getYoutubeId(cls.streamLink);

//   const statusConfig = {
//     live:      { label: "Live Now",  cls: "sd-badge-live" },
//     upcoming:  { label: "Upcoming",  cls: "sd-badge-upcoming" },
//     completed: { label: "Completed", cls: "sd-badge-completed" },
//   };
//   const { label, cls: badgeCls } = statusConfig[cls.status] || statusConfig.upcoming;

//   /* ---- Notes type colors ---- */
//   const noteColors = {
//     notes:      "#6c47d4",
//     assignment: "#d97706",
//     solution:   "#059669",
//     other:      "#6b7280",
//   };

//   return (
//     <div className={`sd-class-card ${cls.status === "live" ? "sd-card-live" : ""}`}>

//       {cls.status === "live" && ytId && (
//         watching ? (
//           <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000" }}>
//             <iframe
//               src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
//               style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
//               allowFullScreen allow="autoplay; encrypted-media"
//             />
//           </div>
//         ) : (
//           <div onClick={() => setWatching(true)}
//             style={{ position: "relative", height: 180, background: "#000", cursor: "pointer", overflow: "hidden" }}>
//             <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={cls.title}
//               style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//             <div className="sd-live-overlay"><span className="sd-live-dot-sm"></span> LIVE</div>
//             <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
//               <MdPlayCircle size={56} color="#fff" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))" }} />
//             </div>
//           </div>
//         )
//       )}

//       {cls.status === "completed" && ytId && (
//         <div style={{ height: 180, background: "#000", overflow: "hidden" }}>
//           <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={cls.title}
//             style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//         </div>
//       )}

//       {cls.status === "upcoming" && ytId && (
//         <div style={{ height: 180, background: "#1a1f4b", overflow: "hidden", position: "relative" }}>
//           <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={cls.title}
//             style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
//           <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
//             justifyContent: "center", color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600 }}>
//             Not started yet
//           </div>
//         </div>
//       )}

//       <div className="sd-card-body">
//         <div className="sd-card-top">
//           <span className={`sd-badge ${badgeCls}`} style={{ display: "inline-flex", alignItems: "center" }}>
//             {cls.status === "live"      && <MdLiveTv size={11} style={{ marginRight: 3 }} />}
//             {cls.status === "upcoming"  && <MdAccessTime size={11} style={{ marginRight: 3 }} />}
//             {cls.status === "completed" && <MdCheckCircle size={11} style={{ marginRight: 3 }} />}
//             {label}
//           </span>
//           <span className="sd-card-subject">{cls.subject}</span>
//         </div>

//         <div className="sd-card-title">{cls.title}</div>
//         {cls.chapter && <div className="sd-card-chapter">{cls.chapter}</div>}

//         <div className="sd-card-meta">
//           <span className="sd-meta-item"><FaChalkboardTeacher size={13} /> {cls.teacher}</span>
//           <span className="sd-meta-item"><MdSchool size={13} /> {cls.batch}</span>
//         </div>

//         <div className="sd-card-time">
//           <span className="sd-meta-item"><MdDateRange size={13} /> {formatDate(cls.date)}</span>
//           <span className="sd-meta-item"><MdAccessTime size={13} /> {formatTime(cls.time)}</span>
//           {cls.duration && <span className="sd-meta-item"><MdTimelapse size={13} /> {cls.duration}</span>}
//         </div>

//         {cls.status === "live" && (
//           <button className="sd-watch-btn sd-watch-live" onClick={() => setWatching(!watching)}>
//             {watching ? <><MdPauseCircle size={16} /> Hide Stream</> : <><MdPlayCircle size={16} /> Join Live Class</>}
//           </button>
//         )}

//         {cls.status === "completed" && cls.streamLink && (
//           <a href={cls.streamLink} target="_blank" rel="noopener noreferrer" className="sd-watch-btn sd-watch-recorded">
//             <MdVideoLibrary size={16} /> Watch Recording
//           </a>
//         )}

//         {cls.status === "upcoming" && (
//           <div className="sd-upcoming-tag">
//             <MdNotifications size={14} />
//             Class starts on {formatDate(cls.date)} at {formatTime(cls.time)}
//           </div>
//         )}

//         {/* ===== NOTES SECTION — NEW ===== */}
//         {cls.notes && cls.notes.length > 0 && (
//           <div className="sd-notes-section">
//             <div className="sd-notes-title">📎 Study Materials</div>
//             <div className="sd-notes-list">
//               {cls.notes.map((note) => (
//                 <a
//                   key={note._id}
//                   href={note.driveLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="sd-note-btn"
//                 >
//                   <div className="sd-note-btn-left">
//                     <div
//                       className="sd-note-type-dot"
//                       style={{ background: noteColors[note.type] || "#6b7280" }}
//                     />
//                     <span className="sd-note-name">{note.title}</span>
//                   </div>
//                   <span className="sd-note-download">Open →</span>
//                 </a>
//               ))}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }






