import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  MdDashboard, MdLiveTv, MdCalendarToday, MdCheckCircle,
  MdLogout, MdMenu, MdPlayCircle, MdPauseCircle, MdNotifications,
  MdSchool, MdAccessTime, MdDateRange, MdTimelapse, MdVideoLibrary,
  MdSignalCellularAlt, MdPerson, MdEdit, MdSave, MdClose, MdPhone,
  MdShoppingCart, MdDelete, MdLocalOffer, MdLock, MdCheck, MdSearch,
  MdFolder, MdArrowBack, MdExpandMore, MdExpandLess, MdOndemandVideo,
  MdAttachFile, MdArrowForward, MdReceipt, MdDownload, MdOpenInNew,
  MdPayment, MdFavorite, MdFavoriteBorder,
} from "react-icons/md";
import {
  FaGraduationCap, FaRupeeSign,
  FaYoutube, FaVideo, FaMoneyBillWave,
} from "react-icons/fa";
import { BiSolidBookOpen } from "react-icons/bi";
import { BsCollection } from "react-icons/bs";

/* ─── Subject helpers ─── */
const subjectColors = {
  Mathematics: "#6c47d4", Physics: "#0ea5e9", Chemistry: "#f59e0b",
  Biology: "#10b981", English: "#f43f5e", Hindi: "#8b5cf6",
  "Social Science": "#64748b", "Computer Science": "#06b6d4",
};
const subjectIcons = {
  Mathematics:"📐", Physics:"⚛️", Chemistry:"🧪",
  Biology:"🧬", English:"📖", Hindi:"🪔",
  "Social Science":"🌍", "Computer Science":"💻",
};
const getSubjectColor = (s) => subjectColors[s] || "#6c47d4";

const getSubjectThumbClass = (s = "") => {
  const l = s.toLowerCase();
  if (l.includes("math")) return "sdc-thumb-mat";
  if (l.includes("sci") || l.includes("phys") || l.includes("chem") || l.includes("bio")) return "sdc-thumb-sci";
  if (l.includes("social") || l.includes("hist") || l.includes("geo")) return "sdc-thumb-soc";
  return "sdc-thumb-eng";
};

const NOTE_ICONS  = { pdf:"📄", doc:"📝", ppt:"📊", link:"🔗", other:"📁" };
const NOTE_LABELS = { pdf:"PDF", doc:"Word Doc", ppt:"PPT", link:"Link", other:"File" };

const STATUS_INV = {
  paid:      { label:"Paid",      bg:"#d1fae5", color:"#065f46", dot:"#10b981" },
  pending:   { label:"Pending",   bg:"#fef3c7", color:"#92400e", dot:"#f59e0b" },
  refunded:  { label:"Refunded",  bg:"#fef3c7", color:"#92400e", dot:"#f59e0b" },
  cancelled: { label:"Cancelled", bg:"#fee2e2", color:"#991b1b", dot:"#ef4444" },
};

function fmtMoney(n) {
  return new Intl.NumberFormat("en-IN", { style:"currency", currency:"INR", maximumFractionDigits:0 }).format(n||0);
}
function fmtDate(d) {
  return d ? new Date(d).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }) : "—";
}

/* ════════════════════════════════════════
   MAIN DASHBOARD
════════════════════════════════════════ */
export default function StudentDashboard() {
  const router = useRouter();

  const [student, setStudent]           = useState(null);
  const [classes, setClasses]           = useState([]);
  const [courses, setCourses]           = useState([]);
  const [loading, setLoading]           = useState(true);
  const [activeMenu, setActiveMenu]     = useState("dashboard");
  const [heroSlide, setHeroSlide]       = useState(0);
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [cart, setCart]                 = useState([]);
  const [cartOpen, setCartOpen]         = useState(false);
  const [activeCourse, setActiveCourse]   = useState(null);
  const [detailCourseId, setDetailCourseId] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("studentWishlist") || "[]"); } catch { return []; }
  });

  const toggleWishlist = (courseId) => {
    setWishlist((prev) => {
      const already = prev.includes(courseId);
      const next = already ? prev.filter((id) => id !== courseId) : [...prev, courseId];
      localStorage.setItem("studentWishlist", JSON.stringify(next));
      if (already) toast.info("Removed from wishlist", { icon: "💔" });
      else toast.success("Added to wishlist!", { icon: "❤️" });
      return next;
    });
  };

  /* ── Auth + init ── */
  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    const info  = localStorage.getItem("studentInfo");
    if (!token || !info) { router.push("/student/login"); return; }
    setStudent(JSON.parse(info));
    fetchClasses(token);
    fetchCourses(token);
  }, []);

  /* ── Restore active tab from URL on load / refresh ── */
  useEffect(() => {
    if (!router.isReady) return;
    const tab = router.query.tab;
    if (tab) setActiveMenu(tab);
  }, [router.isReady, router.query.tab]);

  const fetchClasses = async (token) => {
    try {
      const info = JSON.parse(localStorage.getItem("studentInfo"));
      const studentClass = info?.className || "";
      const url = studentClass
        ? `/api/onlineClasses?limit=50&batch=${encodeURIComponent(studentClass)}`
        : `/api/onlineClasses?limit=50`;
      const res  = await fetch(url, { headers:{ Authorization:`Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setClasses(data.data);
    } catch {}
    setLoading(false);
  };

  const fetchCourses = async (token) => {
    try {
      const res  = await fetch("/api/courses", { headers:{ Authorization:`Bearer ${token}` } });
      const data = await res.json();
      if (data.success) setCourses(data.courses);
    } catch {}
  };

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentInfo");
    router.push("/student/login");
  };

  const liveClasses      = classes.filter((c) => c.status === "live");
  const upcomingClasses  = classes.filter((c) => c.status === "upcoming");
  const completedClasses = classes.filter((c) => c.status === "completed");

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });
  };
  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":");
    const hour = parseInt(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${hour % 12 || 12}:${m} ${ampm}`;
  };
  const getYoutubeId = (url) => {
    if (!url) return null;
    const pats = [
      /youtube\.com\/watch\?v=([^&]+)/,
      /youtu\.be\/([^?]+)/,
      /youtube\.com\/embed\/([^?]+)/,
      /youtube\.com\/live\/([^?]+)/,
      /studio\.youtube\.com\/video\/([^/]+)/,
    ];
    for (const p of pats) { const m = url.match(p); if (m) return m[1]; }
    return null;
  };

  /* ── Hero slider auto-advance ── */
  useEffect(() => {
    if (activeMenu !== "dashboard") return;
    const SLIDES = 3;
    const t = setInterval(() => setHeroSlide((s) => (s + 1) % SLIDES), 4500);
    return () => clearInterval(t);
  }, [activeMenu]);

  const addToCart = (course) => {
    if (cart.find((c) => c._id === course._id)) { setCartOpen(true); return; }
    setCart((prev) => [...prev, course]);
    setCartOpen(true);
  };
  const removeFromCart  = (id) => setCart((prev) => prev.filter((c) => c._id !== id));
  const enrolledCourses = courses.filter((c) => c.isEnrolled);
  const navigate = (menu) => {
    setActiveMenu(menu);
    setSidebarOpen(false);
    router.replace(`/student/dashboard?tab=${menu}`, undefined, { shallow: true });
  };

  if (!student) return null;

  return (
    <>
      <Head><title>Dashboard — SS Coaching</title></Head>
      <div className="sd-page">

        {/* ── TOP NAVBAR ── */}
        <nav className="sd-navbar">
          <div className="sd-nav-left">
            <button className="sd-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <span/><span/><span/>
            </button>
            <div className="sd-brand" onClick={() => navigate("dashboard")}>
              <img src="/assets/images/online-classes/online-classes-logo.svg" alt="SS Coaching" className="sd-brand-img"/>
            </div>
          </div>
          <div className="sd-navbar-right">
            <div className="sd-user-pill">
              <div className="sd-user-pill-av">{student.name ? student.name.charAt(0).toUpperCase() : "S"}</div>
              <span>{student.name || "Student"}</span>
            </div>
            <button className="sd-navbar-cart" onClick={() => setCartOpen(true)}>
              <MdShoppingCart size={20}/>
              {cart.length > 0 && <span className="sd-navbar-cart-count">{cart.length}</span>}
            </button>
          </div>
        </nav>

        {/* ── LAYOUT (white sidebar + main) ── */}
        <div className="sd-layout">

          {/* ── WHITE SIDEBAR ── */}
          <aside className={`sd-white-sidebar ${sidebarOpen ? "sd-sidebar-open" : ""}`}>
            <div className="sd-profile-chip">
              <div className="sd-profile-chip-av">{student.name ? student.name.charAt(0).toUpperCase() : "S"}</div>
              <span>{student.name || "Student"}</span>
            </div>
            <ul className="sd-nav-menu">
              {[
                { key:"dashboard", Icon:MdDashboard,     label:"Dashboard" },
                { key:"courses",   Icon:BsCollection,    label:"Courses",          badge: enrolledCourses.length || 0 },
                { key:"wishlist",  Icon:MdFavorite,      label:"Wishlist",         badge: wishlist.length || 0 },
                { key:"invoices",  Icon:MdReceipt,       label:"My Invoices" },
                { key:"live",      Icon:MdLiveTv,        label:"Live Classes",     badge: liveClasses.length || 0 },
                { key:"upcoming",  Icon:MdCalendarToday, label:"Upcoming Classes" },
                { key:"completed", Icon:MdCheckCircle,   label:"Completed Classes" },
                { key:"profile",   Icon:MdPerson,        label:"My Profile" },
              ].map(({ key, Icon, label, badge }) => (
                <li key={key}>
                  <button
                    className={`sd-nav-link ${activeMenu === key ? "sd-nav-link-active" : ""}`}
                    onClick={() => navigate(key)}
                  >
                    <Icon size={20}/> {label}
                    {badge > 0 && <span className="sd-nav-link-badge">{badge}</span>}
                  </button>
                </li>
              ))}
              <li>
                <button className="sd-nav-link sd-nav-link-logout" onClick={handleLogout}>
                  <MdLogout size={20}/> Logout
                </button>
              </li>
            </ul>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <div className="sd-main">
            <div className="sd-content">

            {/* DASHBOARD HOME */}
            {activeMenu === "dashboard" && (
              <div>
                {/* Free demo banner */}
                <div className="sdd-demo-banner">
                  Enroll for a <b>FREE DEMO CLASS</b> Now
                </div>

                {/* Hero Slider */}
                {(() => {
                  const slides = [
                    {
                      // tag: "WELCOME BACK",
                      heading: ["Welcome,", `${student.name || "Student"}!`],
                      sub: student.className ? `${student.className.toUpperCase()} · NIOS` : "NIOS COACHING",
                      btn: "Explore Courses",
                    },
                    {
                      // tag: "EXPERT FACULTY",
                      heading: ["NIOS Experts", "For Your Success"],
                      sub: "RISE FROM FAILURE · EST. 2001",
                      btn: "View Live Classes",
                    },
                    {
                      // tag: "100% RESULTS",
                      heading: ["Your Learning", "Journey Starts Here"],
                      sub: "CLASS 10 · CLASS 12 · NIOS",
                      btn: "Browse Courses",
                    },
                  ];
                  const actions = [
                    () => navigate("courses"),
                    () => navigate("live"),
                    () => navigate("courses"),
                  ];
                  return (
                    <>
                      <div className="sdd-hero-slider">
                        {slides.map((slide, i) => (
                          <div key={i} className={`sdd-hero ${heroSlide === i ? "sdd-hero-active" : ""}`}>
                            <div className="sdd-hero-img"/>
                            <div className="sdd-hero-content">
                              {/* <div className="sdd-hero-tag">{slide.tag}</div> */}
                              <h1>{slide.heading[0]}<br/>{slide.heading[1]}</h1>
                              <p>{slide.sub}</p>
                              <button className="sdd-hero-enroll" onClick={actions[i]}>
                                {slide.btn}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="sdd-dots">
                        {slides.map((_, i) => (
                          <i key={i} className={heroSlide === i ? "on" : ""} onClick={() => setHeroSlide(i)} style={{cursor:"pointer"}}/>
                        ))}
                      </div>
                    </>
                  );
                })()}

                <h2 className="sdd-title-c">NIOS Experts Determined For Your Success</h2>
                <p className="sdd-sub-c">Don't Just Take Our Word For It. Delve Into Classes And Witness The Excellence For Yourself</p>

                {/* Stats grid */}
                <div className="sdd-stats">
                  <div className="sdd-stat" onClick={() => navigate("live")}>
                    <div className="sdd-stat-ic"><MdLiveTv size={24}/></div>
                    <div>
                      <div className="sdd-stat-num">{liveClasses.length}</div>
                      <div className="sdd-stat-lbl">Live Now</div>
                    </div>
                  </div>
                  <div className="sdd-stat" onClick={() => navigate("upcoming")}>
                    <div className="sdd-stat-ic"><MdCalendarToday size={24}/></div>
                    <div>
                      <div className="sdd-stat-num">{upcomingClasses.length}</div>
                      <div className="sdd-stat-lbl">Upcoming</div>
                    </div>
                  </div>
                  <div className="sdd-stat" onClick={() => navigate("completed")}>
                    <div className="sdd-stat-ic"><MdCheckCircle size={24}/></div>
                    <div>
                      <div className="sdd-stat-num">{completedClasses.length}</div>
                      <div className="sdd-stat-lbl">Completed</div>
                    </div>
                  </div>
                  <div className="sdd-stat" onClick={() => navigate("courses")}>
                    <div className="sdd-stat-ic"><BsCollection size={22}/></div>
                    <div>
                      <div className="sdd-stat-num">{enrolledCourses.length}</div>
                      <div className="sdd-stat-lbl">My Courses</div>
                    </div>
                  </div>
                </div>

                {/* Continue Watching */}
                {enrolledCourses.length > 0 && (
                  <div className="sdd-cw-section">
                    <h2 className="sdd-sec-h">Continue Watching</h2>
                    <div className="sdd-cw-grid">
                      {enrolledCourses.slice(0,4).map((course) => {
                        const totalLessons = course.chapters?.reduce((a,c) => a + (c.lessons?.length || 0), 0) || 0;
                        const subjectColor = getSubjectColor(course.subject);
                        const thumbClass   = getSubjectThumbClass(course.subject);
                        const hasImg       = !!course.featureImage;
                        return (
                          <div key={course._id} className="sdc-card" onClick={() => { setActiveCourse(course._id); navigate("courses"); }} style={{cursor:"pointer"}}>
                            <div
                              className={`sdc-card-thumb ${hasImg ? "sdc-thumb-has-img" : thumbClass}`}
                              style={hasImg ? {backgroundImage:`url(${course.featureImage})`,backgroundSize:"cover",backgroundPosition:"center"} : {}}
                            />
                            <div className="sdc-card-body">
                              <div className="sdc-card-meta">
                                <div className="sdc-meta-left">
                                  <span className="sdc-meta-item">
                                    <img src="/assets/images/online-classes/icons/chapter.svg" alt="" className="sdc-meta-icon"/>
                                    {course.chapters?.length||0} Chapters
                                  </span>
                                  <span className="sdc-meta-item">
                                    <img src="/assets/images/online-classes/icons/lesson.svg" alt="" className="sdc-meta-icon"/>
                                    {totalLessons} Lessons
                                  </span>
                                </div>
                                <div className="sdc-meta-right">
                                  {course.subject && <span className="sdc-tag" style={{background:`${subjectColor}22`,color:subjectColor}}>{course.subject.toUpperCase()}</span>}
                                  {(course.batch||course.className) && <span className="sdc-tag-cls-pill">{(course.batch||course.className).toUpperCase()}</span>}
                                </div>
                              </div>
                              <div className="sdc-cc-name">{course.title}</div>
                              <button className="sdc-btn sdc-btn-start" onClick={(e) => { e.stopPropagation(); setActiveCourse(course._id); navigate("courses"); }}>
                                <MdPlayCircle size={16}/> Continue Learning
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Live right now */}
                {liveClasses.length > 0 && (
                  <div className="sd-section">
                    <div className="sd-section-header"><span className="sd-live-pulse"></span> Live Right Now</div>
                    <div className="sd-cards-grid">
                      {liveClasses.map((cls) => (
                        <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId}/>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upcoming */}
                {upcomingClasses.length > 0 && (
                  <div className="sd-section">
                    <div className="sd-section-header"><MdCalendarToday size={18} style={{color:"#4F2E97"}}/> Upcoming Classes</div>
                    <div className="sd-cards-grid">
                      {upcomingClasses.slice(0,4).map((cls) => (
                        <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId}/>
                      ))}
                    </div>
                  </div>
                )}

                {classes.length === 0 && !loading && (
                  <div className="sd-empty">
                    <MdVideoLibrary size={52} className="sd-empty-svg"/>
                    <div className="sd-empty-title">No Classes Yet</div>
                    <p>Your teacher hasn't scheduled any classes yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* COURSES — grid */}
            {activeMenu === "courses" && !activeCourse && !detailCourseId && (
              <CoursesSection
                courses={courses} cart={cart} addToCart={addToCart}
                setCartOpen={setCartOpen}
                onEnrolled={() => fetchCourses(localStorage.getItem("studentToken"))}
                onOpenCourse={setActiveCourse}
                wishlist={wishlist} toggleWishlist={toggleWishlist}
                openDetail={setDetailCourseId}
              />
            )}

            {/* COURSES — detail page */}
            {activeMenu === "courses" && !activeCourse && detailCourseId && (
              <CourseDetailPage
                courseId={detailCourseId}
                cart={cart}
                addToCart={addToCart}
                onEnrolled={() => { fetchCourses(localStorage.getItem("studentToken")); setDetailCourseId(null); }}
                onBack={() => setDetailCourseId(null)}
                onOpenPlayer={(id) => { setActiveCourse(id); setDetailCourseId(null); }}
              />
            )}

            {/* COURSES — player */}
            {activeMenu === "courses" && activeCourse && (
              <CoursePlayer courseId={activeCourse} onBack={() => setActiveCourse(null)}/>
            )}

            {/* WISHLIST */}
            {activeMenu === "wishlist" && (
              <div>
                <h1 className="sdlc-page-title">My Wishlist</h1>
                <p className="sdlc-page-sub">Courses you saved for later</p>
                {wishlist.length === 0 ? (
                  <div className="sd-empty">
                    <MdFavoriteBorder size={52} className="sd-empty-svg"/>
                    <div className="sd-empty-title">No saved courses yet</div>
                    <p>Click the ♥ icon on any course to save it here.</p>
                    <button className="sdc-browse-btn" onClick={() => setActiveMenu("courses")}>Browse Courses</button>
                  </div>
                ) : (
                  <div className="sdc-grid">
                    {courses.filter((c) => wishlist.includes(c._id)).map((course) => (
                      <CourseCard
                        key={course._id} course={course} cart={cart} addToCart={addToCart}
                        onEnrolled={() => fetchCourses(localStorage.getItem("studentToken"))}
                        onOpen={() => { setActiveCourse(course._id); setActiveMenu("courses"); }}
                        wishlist={wishlist} toggleWishlist={toggleWishlist}
                        openDetail={(id) => { setDetailCourseId(id); setActiveMenu("courses"); }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── INVOICES TAB ── */}
            {activeMenu === "invoices" && <InvoicesSection />}

            {/* LIVE */}
            {activeMenu === "live" && (
              <div>
                <h1 className="sdlc-page-title">Live Classes</h1>
                <p className="sdlc-page-sub">Watch Live Classes</p>
                <div className="sdlc-grid4">
                  {(liveClasses.length > 0 ? liveClasses : STATIC_LIVE_CLASSES).map((cls) => (
                    <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId}/>
                  ))}
                </div>
              </div>
            )}

            {/* UPCOMING */}
            {activeMenu === "upcoming" && (
              <div>
                <h1 className="sdlc-page-title">Upcoming Classes</h1>
                <p className="sdlc-page-sub">Download And View All Upcoming Classes</p>
                <div className="sdlc-grid4">
                  {(upcomingClasses.length > 0 ? upcomingClasses : STATIC_UPCOMING_CLASSES).map((cls) => (
                    <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId}/>
                  ))}
                </div>
              </div>
            )}

            {/* COMPLETED */}
            {activeMenu === "completed" && (
              <div>
                <h1 className="sdlc-page-title">Completed Classes</h1>
                <p className="sdlc-page-sub">Download And View All Your Complete Courses</p>
                {completedClasses.length === 0 ? (
                  <div className="sd-empty">
                    <MdCheckCircle size={52} className="sd-empty-svg"/>
                    <div className="sd-empty-title">No Completed Classes Yet</div>
                    <p>Completed classes will appear here.</p>
                  </div>
                ) : (
                  <div className="sdlc-grid3">
                    {completedClasses.map((cls) => (
                      <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId}/>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PROFILE */}
            {activeMenu === "profile" && (
              <ProfileSection student={student} setStudent={setStudent} enrolledCourses={enrolledCourses}/>
            )}

            </div>
          </div>
        </div>

        {sidebarOpen && <div className="sd-overlay" onClick={() => setSidebarOpen(false)} />}
        {cartOpen && <div className="sd-overlay sdc-overlay-top" onClick={() => setCartOpen(false)}/>}
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

        {/* ── BOTTOM NAV (mobile only) ── */}
        <nav className="sd-bottom-nav">
          {[
            { key: "dashboard", Icon: MdDashboard, label: "Dashboard" },
            { key: "courses",   Icon: BsCollection, label: "Courses"  },
            { key: "live",      Icon: MdLiveTv,     label: "Live"     },
            { key: "profile",   Icon: MdPerson,     label: "Profile"  },
          ].map(({ key, Icon, label }) => (
            <button
              key={key}
              className={`sd-bottom-nav-item${activeMenu === key ? " sdbn-active" : ""}`}
              onClick={() => navigate(key)}
            >
              <Icon size={22}/>
              <span>{label}</span>
            </button>
          ))}
          <button
            className="sd-bottom-nav-item"
            onClick={() => setSidebarOpen(true)}
          >
            <MdMenu size={22}/>
            <span>More</span>
          </button>
        </nav>

      </div>
    </>
  );
}

/* ════════════════════════════════════════
   INVOICES SECTION  ← new, fully inline
════════════════════════════════════════ */
const STATIC_LIVE_CLASSES = [
  { _id:"sl1", title:"An Astrologers Day", subject:"English", className:"Class 10", batch:"CLASS 10TH", status:"live",
    streamLink:"https://www.youtube.com/watch?v=LXb3EKWsInQ", chapters:[], notes:[] },
  { _id:"sl2", title:"Soap, Detergents And Polymers", subject:"Physics", className:"Class 12", batch:"CLASS 12TH", status:"live",
    streamLink:"https://www.youtube.com/watch?v=9bZkp7q19f0", chapters:[], notes:[] },
  { _id:"sl3", title:"Cartesian System Of Rectangular Coordinates", subject:"Mathematics", className:"Class 12", batch:"CLASS 12TH", status:"live",
    streamLink:"https://www.youtube.com/watch?v=JGwVdJCpHqc", chapters:[], notes:[] },
  { _id:"sl4", title:"Data Science Explained - How It Works, Its Effects On Modern Science", subject:"Science", className:"Class 10", batch:"CLASS 10TH", status:"live",
    streamLink:"https://www.youtube.com/watch?v=X3paOmcrTjQ", chapters:[], notes:[] },
];

const STATIC_UPCOMING_CLASSES = [
  { _id:"su1", title:"An Astrologers Day", subject:"English", className:"Class 10", batch:"CLASS 10TH", status:"upcoming",
    date:"2026-06-22", time:"14:00", streamLink:null, chapters:[], notes:[] },
  { _id:"su2", title:"Soap, Detergents And Polymers", subject:"Physics", className:"Class 12", batch:"CLASS 12TH", status:"upcoming",
    date:"2026-06-23", time:"10:00", streamLink:null, chapters:[], notes:[] },
  { _id:"su3", title:"Cartesian System Of Rectangular Coordinates", subject:"Mathematics", className:"Class 12", batch:"CLASS 12TH", status:"upcoming",
    date:"2026-06-24", time:"11:00", streamLink:null, chapters:[], notes:[] },
  { _id:"su4", title:"Data Science Explained - How It Works, Its Effects On Modern Science", subject:"Science", className:"Class 10", batch:"CLASS 10TH", status:"upcoming",
    date:"2026-06-25", time:"15:00", streamLink:null, chapters:[], notes:[] },
  { _id:"su5", title:"Polynomials And Algebraic Expressions", subject:"Mathematics", className:"Class 9", batch:"CLASS 9TH", status:"upcoming",
    date:"2026-06-26", time:"09:00", streamLink:null, chapters:[], notes:[] },
  { _id:"su6", title:"Reflection Of Light", subject:"Physics", className:"Class 10", batch:"CLASS 10TH", status:"upcoming",
    date:"2026-06-27", time:"14:00", streamLink:null, chapters:[], notes:[] },
  { _id:"su7", title:"The Fun They Had", subject:"English", className:"Class 9", batch:"CLASS 9TH", status:"upcoming",
    date:"2026-06-28", time:"16:00", streamLink:null, chapters:[], notes:[] },
  { _id:"su8", title:"Chemical Reactions And Equations", subject:"Science", className:"Class 10", batch:"CLASS 10TH", status:"upcoming",
    date:"2026-06-29", time:"13:00", streamLink:null, chapters:[], notes:[] },
];

const STATIC_INVOICES = [
  { _id:"s1", invoiceNumber:"SS-2026-0003", courseTitle:"English Full Course - Class 10th",      issuedAt:"2026-06-14T00:00:00Z", paymentMethod:"Online", total:1248, status:"paid",    isStatic:true },
  { _id:"s2", invoiceNumber:"SS-2026-0025", courseTitle:"Science Full Course - Class 10th",      issuedAt:"2026-06-13T00:00:00Z", paymentMethod:"Online", total:1350, status:"pending", isStatic:true },
  { _id:"s3", invoiceNumber:"SS-2026-0008", courseTitle:"Social Science Full Course - Class 10th",issuedAt:"2026-06-12T00:00:00Z", paymentMethod:"Cash",   total:1260, status:"paid",    isStatic:true },
  { _id:"s4", invoiceNumber:"SS-2026-0012", courseTitle:"Maths Full Course - Class 10th",        issuedAt:"2026-06-11T00:00:00Z", paymentMethod:"Online", total:1420, status:"pending", isStatic:true },
];

function InvoicesSection() {
  const [invoices, setInvoices]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [selected, setSelected]     = useState(null);
  const [downloading, setDownloading] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("studentToken");
        const res   = await fetch("/api/invoices/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setInvoices(data.invoices);
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const downloadPdf = (invoice) => {
    window.open(`/student/invoice-print?id=${invoice._id}`, "_blank");
  };

  if (loading) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:64,gap:12,color:"#8491a8"}}>
      <div style={{width:22,height:22,border:"2px solid #e2e5f8",borderTopColor:"#6c47d4",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/>
      Loading your invoices...
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );

  return (
    <div className="si-wrap">

      {/* Header */}
      <div className="sdinv-top">
        <h1 className="sdinv-page-title">My Invoices</h1>
        {invoices.length > 0 && <span className="sdinv-count">{invoices.length} invoice{invoices.length !== 1 ? "s" : ""}</span>}
      </div>
      <p className="sdinv-page-sub">Download and view all your course purchase invoices</p>

      {/* Table — real invoices or static placeholders */}
      {(() => {
        const rows = invoices.length > 0 ? invoices : STATIC_INVOICES;
        return (
          <div className="sdinv-wrap">
            <div className="sdinv-head">
              <span>Invoice</span>
              <span>Date</span>
              <span>Payment</span>
              <span>Amount</span>
              <span></span>
            </div>
            {rows.map((inv) => {
              const sc = STATUS_INV[inv.status] || STATUS_INV.paid;
              return (
                <div key={inv._id} className="sdinv-row">
                  <div className="sdinv-info">
                    <div className="sdinv-ic"><MdReceipt size={20}/></div>
                    <div>
                      <div className="sdinv-id">{inv.invoiceNumber}</div>
                      <div className="sdinv-course">{inv.courseTitle}</div>
                      <div className="sdinv-date-small">{fmtDate(inv.issuedAt)}</div>
                    </div>
                  </div>
                  <div className="sdinv-col">{fmtDate(inv.issuedAt)}</div>
                  <div className="sdinv-col">{inv.paymentMethod || "—"}</div>
                  <div className="sdinv-amt">{fmtMoney(inv.total)}</div>
                  <div className="sdinv-actions">
                    <span className={inv.status === "pending" ? "sdinv-pay-pend" : "sdinv-pay-paid"}>{sc.label}</span>
                    {!inv.isStatic && <button className="sdinv-icon-btn" title="Download PDF" onClick={() => downloadPdf(inv)}><MdDownload size={16}/></button>}
                    {!inv.isStatic && <button className="sdinv-icon-btn" title="View Details" onClick={() => setSelected(inv)}><MdOpenInNew size={15}/></button>}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })()}

      {/* Detail modal */}
      {selected && (
        <>
          <div className="si-modal-overlay" onClick={() => setSelected(null)}/>
          <div className="si-modal">
            <div className="si-modal-hd">
              <div>
                <div className="si-modal-num">{selected.invoiceNumber}</div>
                <div className="si-modal-sub">Invoice Details</div>
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <button className="si-modal-pdf-btn" onClick={() => downloadPdf(selected)}>
                  <MdDownload size={15}/> Download PDF
                </button>
                <button className="si-modal-close" onClick={() => setSelected(null)}>
                  <MdClose size={20}/>
                </button>
              </div>
            </div>

            <div className="si-modal-body">
              {/* Hero amount */}
              <div className="si-modal-hero">
                <div className="si-mh-label">Amount {selected.paymentMethod === "Cash on Delivery" ? "to Pay" : "Paid"}</div>
                <div className="si-mh-amount">{fmtMoney(selected.total)}</div>
                {selected.discount > 0 && (
                  <div className="si-mh-saved">🎉 You saved {fmtMoney(selected.discount)}{selected.couponCode ? ` with ${selected.couponCode}` : ""}</div>
                )}
                <div style={{marginTop:10}}>
                  {(() => {
                    const sc = STATUS_INV[selected.status] || STATUS_INV.paid;
                    return (
                      <span style={{background:"rgba(255,255,255,0.2)",color:"#fff",padding:"3px 14px",borderRadius:100,fontSize:"0.72rem",fontWeight:700}}>
                        {sc.label}
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* COD notice */}
              {selected.paymentMethod === "Cash on Delivery" && selected.status === "pending" && (
                <div className="si-cod-notice">
                  <div style={{fontSize:"0.85rem",fontWeight:700,color:"#92400e",marginBottom:4}}>📍 Payment Pending</div>
                  <div style={{fontSize:"0.78rem",color:"#78350f",lineHeight:1.6}}>
                    Please visit <strong>SS Coaching, Lucknow</strong> and pay <strong>{fmtMoney(selected.total)}</strong> in cash.
                    Show invoice number <strong>{selected.invoiceNumber}</strong> at the counter.
                  </div>
                </div>
              )}

              {/* Course */}
              <div className="si-detail-section">
                <div className="si-detail-title">Course</div>
                <div className="si-detail-row"><span>Course Name</span><span>{selected.courseTitle}</span></div>
                {selected.courseSubject && <div className="si-detail-row"><span>Subject</span><span>{selected.courseSubject}</span></div>}
                {selected.courseBatch   && <div className="si-detail-row"><span>Batch</span><span>{selected.courseBatch}</span></div>}
              </div>

              {/* Payment */}
              <div className="si-detail-section">
                <div className="si-detail-title">Payment Details</div>
                <div className="si-detail-row"><span>Date</span><span>{fmtDate(selected.issuedAt)}</span></div>
                <div className="si-detail-row"><span>Method</span><span>{selected.paymentMethod || "—"}</span></div>
                <div className="si-detail-row"><span>Order ID</span><span className="si-mono">{selected.orderId || "—"}</span></div>
                {selected.paymentId && <div className="si-detail-row"><span>Payment ID</span><span className="si-mono">{selected.paymentId}</span></div>}
              </div>

              {/* Breakdown */}
              <div className="si-detail-section">
                <div className="si-detail-title">Amount Breakdown</div>
                <div className="si-detail-row"><span>Course Price</span><span>{fmtMoney(selected.subtotal)}</span></div>
                {selected.discount > 0 && (
                  <div className="si-detail-row" style={{color:"#10b981"}}>
                    <span>Discount {selected.couponCode ? `(${selected.couponCode})` : ""}</span>
                    <span>− {fmtMoney(selected.discount)}</span>
                  </div>
                )}
                <div className="si-detail-row si-row-total"><span>Total</span><span>{fmtMoney(selected.total)}</span></div>
              </div>

              {/* Email */}
              <div className="si-detail-section">
                <div className="si-detail-title">Invoice Email</div>
                <div className="si-detail-row">
                  <span>Delivery Status</span>
                  <span style={{color: selected.emailSent ? "#10b981" : "#f59e0b", fontWeight:700}}>
                    {selected.emailSent
                      ? `✅ Sent on ${fmtDate(selected.emailSentAt)}`
                      : "⏳ Sending..."}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .si-wrap { padding-bottom: 40px; }

        .si-page-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:22px; }
        .si-page-title  { font-size:1.05rem; font-weight:800; color:#1a1f4b; display:flex; align-items:center; gap:8px; margin-bottom:3px; }
        .si-page-sub    { font-size:0.78rem; color:#8491a8; }
        .si-count-badge { font-size:0.73rem; font-weight:700; background:#ede9fe; color:#6c47d4; padding:4px 12px; border-radius:100px; white-space:nowrap; }

        .si-list { display:flex; flex-direction:column; gap:10px; }

        .si-card {
          background:#fff; border:1.5px solid #e2e5f8; border-radius:13px;
          padding:14px 16px; display:flex; align-items:center; gap:12px;
          transition:box-shadow 0.15s;
        }
        .si-card:hover { box-shadow:0 4px 18px rgba(108,71,212,0.1); }

        .si-card-icon-wrap {
          width:44px; height:44px; background:#ede9fe; border-radius:11px;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .si-card-info  { flex:1; min-width:0; }
        .si-card-num   { font-size:0.82rem; font-weight:800; color:#6c47d4; }
        .si-card-course { font-size:0.85rem; font-weight:600; color:#1a1f4b; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px; }
        .si-card-meta  { display:flex; align-items:center; gap:10px; margin-top:4px; font-size:0.7rem; color:#8491a8; flex-wrap:wrap; }
        .si-coupon     { background:#ede9fe; color:#6c47d4; padding:1px 7px; border-radius:100px; font-weight:700; font-size:0.68rem; }

        .si-card-right { display:flex; flex-direction:column; align-items:flex-end; gap:4px; flex-shrink:0; }
        .si-card-amount { font-size:1rem; font-weight:900; color:#1a1f4b; }
        .si-card-saved  { font-size:0.68rem; color:#10b981; font-weight:700; }

        .si-status-pill { display:inline-flex; align-items:center; padding:3px 10px; border-radius:100px; font-size:0.68rem; font-weight:700; }

        .si-card-actions { display:flex; flex-direction:column; gap:6px; flex-shrink:0; }
        .si-action-btn  { width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:8px; border:1.5px solid #e2e5f8; background:#fff; cursor:pointer; transition:all 0.13s; }
        .si-action-pdf:hover  { background:#ede9fe; border-color:#6c47d4; color:#6c47d4; }
        .si-action-view:hover { background:#f0fdf4; border-color:#10b981; color:#10b981; }

        /* Modal */
        .si-modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.3); z-index:1040; }
        .si-modal {
          position:fixed; bottom:0; left:0; right:0;
          background:#fff; border-radius:20px 20px 0 0; z-index:1050;
          max-height:92vh; overflow-y:auto;
          box-shadow:0 -8px 40px rgba(0,0,0,0.15);
        }
        @media(min-width:640px){
          .si-modal { top:50%; left:50%; right:auto; bottom:auto; transform:translate(-50%,-50%); width:480px; max-height:88vh; border-radius:16px; }
        }

        .si-modal-hd {
          display:flex; align-items:center; justify-content:space-between;
          padding:18px 20px; border-bottom:1.5px solid #eceeff;
          position:sticky; top:0; background:#fff; z-index:2;
        }
        .si-modal-num  { font-size:1rem; font-weight:800; color:#6c47d4; }
        .si-modal-sub  { font-size:0.72rem; color:#8491a8; margin-top:2px; }
        .si-modal-pdf-btn { display:flex; align-items:center; gap:5px; padding:8px 14px; border:1.5px solid #6c47d4; border-radius:8px; background:#ede9fe; color:#6c47d4; font-size:0.78rem; font-weight:700; cursor:pointer; white-space:nowrap; }
        .si-modal-pdf-btn:hover { background:#ddd6fe; }
        .si-modal-close { width:34px; height:34px; display:flex; align-items:center; justify-content:center; border:1.5px solid #e2e5f8; border-radius:8px; background:#fff; cursor:pointer; color:#6b7a99; }

        .si-modal-body { padding:20px; }

        .si-modal-hero {
          background:linear-gradient(135deg,#6c47d4,#8b5cf6);
          border-radius:12px; padding:22px; text-align:center; color:#fff; margin-bottom:16px;
        }
        .si-mh-label  { font-size:0.7rem; font-weight:700; opacity:0.7; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:6px; }
        .si-mh-amount { font-size:2rem; font-weight:900; }
        .si-mh-saved  { font-size:0.8rem; opacity:0.8; margin-top:6px; }

        .si-cod-notice { background:#fff7e6; border:1.5px solid #fed7aa; border-radius:10px; padding:14px 16px; margin-bottom:16px; }

        .si-detail-section { margin-bottom:16px; }
        .si-detail-title {
          font-size:0.66rem; font-weight:800; letter-spacing:0.1em;
          text-transform:uppercase; color:#8491a8; margin-bottom:8px;
        }
        .si-detail-row { display:flex; justify-content:space-between; padding:7px 0; border-bottom:1px solid #f3f4fb; font-size:0.82rem; gap:12px; }
        .si-detail-row span:first-child { color:#8491a8; flex-shrink:0; }
        .si-detail-row span:last-child  { color:#1a1f4b; font-weight:600; text-align:right; word-break:break-all; }
        .si-row-total span { font-weight:800 !important; font-size:0.9rem !important; color:#6c47d4 !important; }
        .si-mono { font-family:monospace; font-size:0.74rem !important; }
      `}</style>
    </div>
  );
}

/* ════════════════════════════════════════
   COURSES SECTION
════════════════════════════════════════ */
function CoursesSection({ courses, cart, addToCart, setCartOpen, onEnrolled, onOpenCourse, wishlist = [], toggleWishlist, openDetail }) {
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
        !(c.subject||"").toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  return (
    <div>
      {/* Explore Subjects */}
      {subjects.length > 0 && (
        <>
          <h2 className="sdc-explore-title">Explore Subjects</h2>
          <div className="sdc-subjects">
            {subjects.slice(0,4).map((s) => (
              <div
                key={s}
                className={`sdc-subj ${subject === s ? "sdc-subj-active" : ""}`}
                onClick={() => setSubject(subject === s ? "" : s)}
              >
                <b>{s}</b>
                <small>{courses.filter((c) => c.subject === s).length}+ Courses</small>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Continue Learning strip removed — enrolled courses shown on Dashboard "Continue Watching" */}

      <h2 className="sdc-cfy">Courses For You</h2>

      {/* Search + filter chips */}
      <div className="sdc-searchbar">
        <div className="sdc-search-wrap" style={{flex:1,minWidth:240}}>
          <MdSearch size={18} className="sdc-search-icon"/>
          <input className="sdc-search" placeholder="Search your course here...." value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div className="sdc-filter-row" style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
          {[{val:"all",label:"All courses"},{val:"free",label:"Free"},{val:"paid",label:"Paid"},{val:"enrolled",label:"My Courses"}].map((f) => (
            <button key={f.val} className={`sdc-chip ${filter===f.val?"sdc-chip-active":""}`} onClick={() => setFilter(f.val)}>{f.label}</button>
          ))}
          {subjects.length > 1 && (
            <select className="sdc-subject-select" value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="">All Subjects</option>
              {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="sd-empty">
          <BsCollection size={48} className="sd-empty-svg"/>
          <div className="sd-empty-title">{filter==="enrolled"?"No Enrolled Courses":"No Courses Found"}</div>
          <p>{filter==="enrolled"?"Browse courses and enroll to start learning!":"Try a different filter."}</p>
          {filter==="enrolled" && <button className="sdc-browse-btn" onClick={() => setFilter("all")}>Browse All Courses</button>}
        </div>
      ) : (
        <div className="sdc-grid">
          {filtered.map((course) => (
            <CourseCard key={course._id} course={course} cart={cart} addToCart={addToCart} onEnrolled={onEnrolled} onOpen={() => onOpenCourse(course._id)} wishlist={wishlist} toggleWishlist={toggleWishlist} openDetail={openDetail}/>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   COURSE CARD
════════════════════════════════════════ */
function CourseCard({ course, cart, addToCart, onEnrolled, onOpen, wishlist = [], toggleWishlist, openDetail }) {
  const [enrolling, setEnrolling] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);
  const inCart = cart.find((c) => c._id === course._id);
  const totalLessons = course.chapters?.reduce((a,c) => a + c.lessons.length, 0) || 0;
  const isWishlisted = wishlist.includes(course._id);

  const handleWishlist = (e) => {
    e.stopPropagation();
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 550);
    toggleWishlist && toggleWishlist(course._id);
  };

  const handleFreeEnroll = async () => {
    setEnrolling(true);
    try {
      const token = localStorage.getItem("studentToken");
      const res   = await fetch("/api/courses/enroll", {
        method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
        body: JSON.stringify({ courseId: course._id }),
      });
      const data = await res.json();
      if (data.success) { onEnrolled(); } else alert(data.error||"Failed to enroll");
    } catch { alert("Network error"); }
    setEnrolling(false);
  };

  const thumbClass = getSubjectThumbClass(course.subject);
  const hasImg = !!course.featureImage;

  const handleCardClick = () => {
    if (course.isEnrolled) { onOpen(); }
    else if (openDetail) { openDetail(course._id); }
  };

  return (
    <div className="sdc-card" onClick={handleCardClick} style={{cursor:"pointer"}}>
      {/* Thumb */}
      <div
        className={`sdc-card-thumb ${hasImg ? "sdc-thumb-has-img" : thumbClass}`}
        style={hasImg ? {backgroundImage:`url(${course.featureImage})`,backgroundSize:"cover",backgroundPosition:"center"} : {}}
      >
        <button
          className={`sdc-fav-btn${isWishlisted ? " sdc-fav-active" : ""}${heartAnim ? " sdc-fav-pop" : ""}`}
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            fill={isWishlisted ? "#e11d48" : "none"}
            stroke={isWishlisted ? "#e11d48" : "white"}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="sdc-card-body">
        <div className="sdc-card-meta">
          <div className="sdc-meta-left">
            <span className="sdc-meta-item">
              <img src="/assets/images/online-classes/icons/chapter.svg" alt="" className="sdc-meta-icon"/>
              {course.chapters?.length||0} Chapters
            </span>
            <span className="sdc-meta-item">
              <img src="/assets/images/online-classes/icons/lesson.svg" alt="" className="sdc-meta-icon"/>
              {totalLessons} Lessons
            </span>
          </div>
          <div className="sdc-meta-right">
            {course.subject && (
              <span className="sdc-tag" style={{background:`${getSubjectColor(course.subject)}22`,color:getSubjectColor(course.subject)}}>
                {course.subject.toUpperCase()}
              </span>
            )}
            {course.batch && <span className="sdc-tag-cls-pill">{course.batch.toUpperCase()}</span>}
          </div>
        </div>
        <div className="sdc-cc-name">{course.title}</div>
        {course.isEnrolled ? (
          <button className="sdc-btn sdc-btn-start" onClick={(e) => { e.stopPropagation(); onOpen(); }}><MdPlayCircle size={16}/> Continue Learning</button>
        ) : course.isFree ? (
          <button className="sdc-btn sdc-btn-free" onClick={(e) => { e.stopPropagation(); handleFreeEnroll(); }} disabled={enrolling}>
            {enrolling ? "Enrolling..." : <><MdCheck size={15}/> Enroll Free</>}
          </button>
        ) : inCart ? (
          <button className="sdc-btn sdc-btn-incart" onClick={(e) => { e.stopPropagation(); openDetail && openDetail(course._id); }}>
            <img src="/assets/images/online-classes/icons/cart.svg" alt="" className="sdc-btn-icon"/> In Cart
          </button>
        ) : (
          <button className="sdc-btn sdc-btn-buy" onClick={(e) => { e.stopPropagation(); openDetail ? openDetail(course._id) : addToCart(course); }}>
            <img src="/assets/images/online-classes/icons/cart.svg" alt="" className="sdc-btn-icon"/> Add To Cart &nbsp;₹ {course.price}
          </button>
        )}
      </div>
    </div>
  );
}


/* ════════════════════════════════════════
   COURSE DETAIL PAGE (pre-purchase)
════════════════════════════════════════ */
function CourseDetailPage({ courseId, cart, addToCart, onEnrolled, onBack, onOpenPlayer }) {
  const [course, setCourse]         = useState(null);
  const [loading, setLoading]       = useState(true);
  const [coupon, setCoupon]         = useState("");
  const [couponMsg, setCouponMsg]   = useState("");
  const [enrolling, setEnrolling]   = useState(false);
  const [openChapters, setOpenChapters] = useState({ 0: true });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("studentToken");
        const res   = await fetch(`/api/courses/${courseId}`, { headers:{ Authorization:`Bearer ${token}` } });
        const data  = await res.json();
        if (data.success) setCourse(data.course);
      } catch {}
      setLoading(false);
    };
    load();
  }, [courseId]);

  if (loading) return <div className="scp-loading"><div className="scp-spinner-ring"></div><p>Loading...</p></div>;
  if (!course)  return (
    <div className="sd-empty">
      <MdVideoLibrary size={48} className="sd-empty-svg"/>
      <div className="sd-empty-title">Course not found</div>
      <button className="sdc-browse-btn" onClick={onBack}>← Go Back</button>
    </div>
  );

  const inCart       = cart?.find((c) => c._id === course._id);
  const totalLessons = course.chapters?.reduce((a,c) => a + c.lessons.length, 0) || 0;
  const thumbClass   = getSubjectThumbClass(course.subject);
  const subjectColor = getSubjectColor(course.subject);
  const hasImg       = !!course.featureImage;

  const handleAddToCart = (e) => { e.stopPropagation(); addToCart(course); setCouponMsg("Added to cart!"); };

  const handleFreeEnroll = async () => {
    setEnrolling(true);
    try {
      const token = localStorage.getItem("studentToken");
      const res   = await fetch("/api/courses/enroll", {
        method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
        body: JSON.stringify({ courseId: course._id }),
      });
      const data = await res.json();
      if (data.success) { onEnrolled(); onOpenPlayer && onOpenPlayer(course._id); }
      else alert(data.error||"Failed to enroll");
    } catch { alert("Network error"); }
    setEnrolling(false);
  };

  const INCLUDED = [
    "Limited Classroom Size","Experienced Teachers",
    "Live Classes And Doubt Session","Premium Study Materials From SS Coaching",
    "1:1 Live Doubt & Academic Support (48Hrs Per Week)",
    "Student Performance Dashboard & Insights","Online & Offline Tests",
  ];

  return (
    <div className="cdp-wrapper">
      <button className="scp-back-btn" onClick={onBack} style={{marginBottom:20}}><MdArrowBack size={18}/> Back to Courses</button>

      <div className="cdp-body">
        {/* ── LEFT ── */}
        <div className="cdp-left">
          <div className="cdp-header">
            <h1 className="cdp-title">{course.title}</h1>
            {(course.batch||course.className) && <p className="cdp-class-tag">{(course.batch||course.className).toUpperCase()}</p>}
          </div>

          {/* Details box */}
          <div className="cdp-details-box">
            <h2>Course Details</h2>
            <div className="cdp-details-row">
              <div className="cdp-detail-item"><small>Topics covered</small><b>{totalLessons} Lessons</b></div>
              <div className="cdp-detail-item"><small>BATCH FEE</small><b>₹{course.price?.toLocaleString("en-IN")||"—"}<span className="cdp-detail-note">/month</span></b></div>
              <div className="cdp-detail-item"><small>Duration</small><b>{course.duration||"Self-paced"}</b></div>
            </div>
          </div>

          {/* What's Included */}
          <div className="cdp-included-box">
            <h2>What's Included</h2>
            <div className="cdp-included-grid">
              {INCLUDED.map((item,i) => (
                <div key={i} className="cdp-included-item">
                  <img src="/assets/images/online-classes/icons/check.svg" alt="" className="cdp-check-icon"/>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Content */}
          <div className="cdp-content-box">
            <h2 className="cdp-content-title">Course Content</h2>
            <div className="cdp-content-meta">
              <span className="sdc-meta-item">
                <img src="/assets/images/online-classes/icons/chapter.svg" alt="" className="sdc-meta-icon"/>
                {course.chapters?.length||0} Chapters
              </span>
              <span className="cdp-content-meta-dot">·</span>
              <span className="sdc-meta-item">
                <img src="/assets/images/online-classes/icons/lesson.svg" alt="" className="sdc-meta-icon"/>
                {totalLessons} Lessons
              </span>
            </div>
            {course.chapters?.map((ch,ci) => (
              <div key={ch._id||ci} className="cdp-chapter">
                <button className="cdp-chapter-hd" onClick={() => setOpenChapters(p=>({...p,[ci]:!p[ci]}))}>
                  <span>{ch.title}</span>
                  <span className="cdp-chapter-right">
                    <span className="cdp-chapter-count">{ch.lessons.length} Lectures</span>
                    {openChapters[ci] ? <MdExpandLess size={18}/> : <MdExpandMore size={18}/>}
                  </span>
                </button>
                {openChapters[ci] && (
                  <div className="cdp-lessons">
                    {ch.lessons.map((les,li) => (
                      <div key={les._id||li} className="cdp-lesson-row">
                        <span className="cdp-lesson-dot"/>
                        <span className="cdp-lesson-name">{les.title}</span>
                        {les.duration && <span className="cdp-lesson-dur">{les.duration}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="cdp-right">
          <div className={`cdp-preview ${hasImg ? "sdc-thumb-has-img" : thumbClass}`}
               style={hasImg ? {backgroundImage:`url(${course.featureImage})`,backgroundSize:"cover",backgroundPosition:"center"} : {}}>
            <span className="cdp-preview-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#702DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="#702DFF" stroke="none"/>
              </svg>
              Watch Free Demo
            </span>
          </div>

          <div className="cdp-price-card">
            <div className="cdp-price-meta">
              <div className="cdp-meta-left-g">
                <span className="sdc-meta-item" style={{fontSize:11,color:"#555"}}>
                  <img src="/assets/images/online-classes/icons/chapter.svg" alt="" className="sdc-meta-icon"/>
                  {course.chapters?.length||0} Chapters
                </span>
                <span className="sdc-meta-item" style={{fontSize:11,color:"#555"}}>
                  <img src="/assets/images/online-classes/icons/lesson.svg" alt="" className="sdc-meta-icon"/>
                  {totalLessons} Lessons
                </span>
              </div>
              <div className="cdp-meta-right-g">
                {course.subject && <span className="sdc-tag" style={{background:`${subjectColor}22`,color:subjectColor,fontSize:10}}>{course.subject.toUpperCase()}</span>}
                {(course.batch||course.className) && <span className="sdc-tag-cls-pill" style={{fontSize:10}}>{(course.batch||course.className).toUpperCase()}</span>}
              </div>
            </div>
            <div className="cdp-price-title">{course.title}</div>
            <div className="cdp-price-row">
              <span className="cdp-price-now">₹{course.price?.toLocaleString("en-IN")||"Free"}</span>
              {course.originalPrice && <span className="cdp-price-old">₹{course.originalPrice?.toLocaleString("en-IN")}</span>}
              <span className="cdp-price-month">/Month</span>
            </div>

            {course.isEnrolled ? (
              <button className="cdp-btn-start" onClick={() => onOpenPlayer && onOpenPlayer(course._id)}><MdPlayCircle size={18}/> Start Learning</button>
            ) : course.isFree ? (
              <button className="cdp-btn-enroll" onClick={handleFreeEnroll} disabled={enrolling}>{enrolling?"Enrolling...":<><MdCheck size={16}/> Enroll Free</>}</button>
            ) : inCart ? (
              <button className="cdp-btn-incart"><img src="/assets/images/online-classes/icons/cart.svg" alt="" className="sdc-btn-icon"/> In Cart · ₹{course.price?.toLocaleString("en-IN")}</button>
            ) : (
              <button className="cdp-btn-cart" onClick={handleAddToCart}><img src="/assets/images/online-classes/icons/cart.svg" alt="" className="sdc-btn-icon"/> Add To Cart &nbsp;₹{course.price?.toLocaleString("en-IN")}</button>
            )}

            {!course.isEnrolled && !course.isFree && (
              <div className="cdp-coupon">
                <span className="cdp-coupon-label">Apply Coupon</span>
                <div className="cdp-coupon-row">
                  <input className="cdp-coupon-input" placeholder="Enter Coupon" value={coupon} onChange={(e)=>setCoupon(e.target.value)}/>
                  <button className="cdp-coupon-btn" onClick={()=>coupon&&setCouponMsg("Coupon Code Applied!")}>Apply</button>
                </div>
                {couponMsg && <span className="cdp-coupon-msg">✓ {couponMsg}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   COURSE PLAYER
════════════════════════════════════════ */
function CoursePlayer({ courseId, onBack }) {
  const [course, setCourse]             = useState(null);
  const [loading, setLoading]           = useState(true);
  const [activeLesson, setActiveLesson] = useState(null);
  const [openChapters, setOpenChapters] = useState({});

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("studentToken");
        const res   = await fetch(`/api/courses/${courseId}`, { headers:{ Authorization:`Bearer ${token}` } });
        const data  = await res.json();
        if (data.success) {
          setCourse(data.course);
          if (data.course.chapters?.length > 0) {
            setOpenChapters({ 0: true });
            const fl = data.course.chapters[0]?.lessons?.[0];
            if (fl) setActiveLesson({ chapterIdx:0, lessonIdx:0, lesson:fl });
          }
        }
      } catch {}
      setLoading(false);
    };
    load();
  }, [courseId]);

  const toggleChapter = (idx) => setOpenChapters(prev => ({ ...prev, [idx]: !prev[idx] }));

  const getYoutubeId = (url) => {
    if (!url) return null;
    const pats = [/youtube\.com\/watch\?v=([^&]+)/,/youtu\.be\/([^?]+)/,/youtube\.com\/embed\/([^?]+)/,/youtube\.com\/live\/([^?]+)/];
    for (const p of pats) { const m = url.match(p); if (m) return m[1]; }
    return null;
  };

  const lessonHasVideo   = (l) => !l ? false : (l.videoType==="youtube"&&l.youtubeLink)||(l.videoType==="custom"&&l.videoUrl);
  const lessonHasNotes   = (l) => l?.notes?.length > 0;
  const lessonAccessible = (l) => lessonHasVideo(l) || lessonHasNotes(l);

  const totalLessons = course?.chapters?.reduce((a,c) => a + c.lessons.length, 0) || 0;
  const lesson = activeLesson?.lesson;
  const ytId   = lesson?.videoType==="youtube" ? getYoutubeId(lesson.youtubeLink) : null;

  if (loading) return <div className="scp-loading"><div className="scp-spinner-ring"></div><p>Loading course...</p></div>;
  if (!course) return (
    <div className="sd-empty">
      <MdVideoLibrary size={48} className="sd-empty-svg"/>
      <div className="sd-empty-title">Course not found</div>
      <button className="sdc-browse-btn" onClick={onBack}>← Go Back</button>
    </div>
  );

  return (
    <div className="scp-wrapper">
      <div className="scp-header">
        <button className="scp-back-btn" onClick={onBack}><MdArrowBack size={18}/> Back to Courses</button>
        <div className="scp-header-info">
          <div className="scp-course-title">{course.title}</div>
          <div className="scp-course-meta">
            <span style={{color:getSubjectColor(course.subject)}}>{subjectIcons[course.subject]||"📚"} {course.subject}</span>
            <span>•</span><span>{course.batch}</span>
            <span>•</span><span>{course.chapters?.length||0} Chapters</span>
            <span>•</span><span>{totalLessons} Lessons</span>
          </div>
        </div>
      </div>
      <div className="scp-body">
        <div className="scp-video-area">
          {lesson && ytId && (
            <>
              <div className="scp-video-wrap">
                <iframe key={ytId} src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen className="scp-iframe" title={lesson.title}/>
              </div>
              <LessonInfoPanel lesson={lesson} course={course} activeLesson={activeLesson}/>
            </>
          )}
          {lesson && lesson.videoType==="custom" && lesson.videoUrl && !ytId && (
            <>
              <div className="scp-video-wrap">
                <video key={lesson.videoUrl} controls autoPlay className="scp-iframe" style={{background:"#000"}}>
                  <source src={lesson.videoUrl}/>
                </video>
              </div>
              <LessonInfoPanel lesson={lesson} course={course} activeLesson={activeLesson}/>
            </>
          )}
          {lesson && !lessonHasVideo(lesson) && lessonHasNotes(lesson) && (
            <>
              <div className="scp-notes-only-header">
                <div style={{fontSize:"2.8rem",marginBottom:10}}>📂</div>
                <div style={{fontSize:"1.15rem",fontWeight:700,marginBottom:6}}>{lesson.title}</div>
                <div style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.48)"}}>Study materials — no video</div>
              </div>
              <LessonInfoPanel lesson={lesson} course={course} activeLesson={activeLesson}/>
            </>
          )}
          {lesson && !lessonHasVideo(lesson) && !lessonHasNotes(lesson) && (
            <div className="scp-locked"><MdOndemandVideo size={48}/><div>No content available yet</div></div>
          )}
          {!lesson && (
            <div className="scp-no-lesson"><MdOndemandVideo size={64}/><div>Select a lesson to start</div></div>
          )}
        </div>
        <div className="scp-sidebar">
          <div className="scp-sidebar-title">Course Content</div>
          {course.chapters?.length === 0 && <div className="scp-no-content">No chapters yet.</div>}
          {course.chapters?.map((chapter, ci) => {
            const isOpen = !!openChapters[ci];
            return (
              <div key={chapter._id||ci} className="scp-chapter">
                <button className="scp-chapter-header" onClick={() => toggleChapter(ci)}>
                  <div className="scp-chapter-left">
                    <span className="scp-chapter-num">Ch {ci+1}</span>
                    <span className="scp-chapter-title">{chapter.title}</span>
                  </div>
                  <div className="scp-chapter-right">
                    <span className="scp-chapter-count">{chapter.lessons.length} lessons</span>
                    {isOpen?<MdExpandLess size={18}/>:<MdExpandMore size={18}/>}
                  </div>
                </button>
                {isOpen && (
                  <div className="scp-lessons">
                    {chapter.lessons.length===0 && <div className="scp-no-content" style={{padding:"10px 16px"}}>No lessons yet</div>}
                    {chapter.lessons.map((les, li) => {
                      const isActive = activeLesson?.chapterIdx===ci && activeLesson?.lessonIdx===li;
                      const canOpen  = lessonAccessible(les);
                      const hasNotes = lessonHasNotes(les);
                      return (
                        <button key={les._id||li}
                          className={`scp-lesson ${isActive?"scp-lesson-active":""} ${!canOpen?"scp-lesson-locked":""}`}
                          onClick={() => { if (canOpen) setActiveLesson({ chapterIdx:ci, lessonIdx:li, lesson:les }); }}
                          disabled={!canOpen}
                        >
                          <div className="scp-lesson-left">
                            {les.videoType==="youtube"&&les.youtubeLink ? <FaYoutube size={14} color={isActive?"#fff":"#ef4444"} style={{flexShrink:0}}/>
                              : les.videoType==="custom"&&les.videoUrl ? <FaVideo size={13} color={isActive?"#fff":"#6c47d4"} style={{flexShrink:0}}/>
                              : hasNotes ? <MdAttachFile size={15} color={isActive?"#fff":"#f59e0b"} style={{flexShrink:0}}/>
                              : <MdLock size={13} className="scp-lock-icon" style={{flexShrink:0}}/>}
                            <span className="scp-lesson-name">{les.title}</span>
                          </div>
                          <div style={{display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
                            {hasNotes && <span className="scp-notes-badge">📎{les.notes.length}</span>}
                            {les.duration && <span className="scp-lesson-time">{les.duration}</span>}
                          </div>
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
      <style jsx>{`
        .scp-notes-only-header{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:44px 24px 32px;background:linear-gradient(135deg,#1a1f4b,#0f1530);text-align:center;color:#fff;min-height:180px;}
        .scp-notes-badge{font-size:.62rem;font-weight:700;background:rgba(245,158,11,.18);color:#f59e0b;padding:1px 5px;border-radius:4px;white-space:nowrap;}
        .scp-lesson-active .scp-notes-badge{background:rgba(255,255,255,.2);color:#fff;}
        .scp-materials-section{margin-top:16px;padding:14px 16px 16px;background:#f8f9ff;border-radius:10px;border:1.5px solid #e0e3f5;}
        .scp-materials-title{font-size:.78rem;font-weight:800;color:#4441e5;margin-bottom:10px;display:flex;align-items:center;gap:5px;}
        .scp-materials-list{display:flex;flex-direction:column;gap:7px;}
        .scp-material-link{display:flex;align-items:center;gap:9px;padding:9px 12px;background:#fff;border:1.5px solid #e0e3f5;border-radius:8px;text-decoration:none;color:#2d3a5a;font-size:.81rem;font-weight:500;transition:border-color .13s,background .13s,color .13s;}
        .scp-material-link:hover{border-color:#4441e5;background:#eef0ff;color:#4441e5;}
        .scp-material-icon{font-size:1rem;flex-shrink:0;}
        .scp-material-name{flex:1;}
        .scp-material-badge{font-size:.63rem;font-weight:700;background:#eef0ff;color:#4441e5;padding:2px 7px;border-radius:100px;flex-shrink:0;}
        .scp-material-open{font-size:.72rem;color:#4441e5;font-weight:600;flex-shrink:0;}
        .scp-iframe{width:100%;height:100%;border:none;display:block;}
      `}</style>
    </div>
  );
}

function LessonInfoPanel({ lesson, course, activeLesson }) {
  return (
    <div className="scp-lesson-info">
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
        <div className="scp-lesson-title">{lesson.title}</div>
        <div style={{display:"flex",gap:6,flexShrink:0,flexWrap:"wrap"}}>
          {lesson.videoType==="youtube" && <span style={{fontSize:"0.7rem",background:"#fee2e2",color:"#ef4444",padding:"2px 9px",borderRadius:"100px",fontWeight:700,display:"flex",alignItems:"center",gap:4}}><FaYoutube size={11}/> YouTube</span>}
          {lesson.videoType==="custom"  && <span style={{fontSize:"0.7rem",background:"#ede9fe",color:"#6c47d4",padding:"2px 9px",borderRadius:"100px",fontWeight:700,display:"flex",alignItems:"center",gap:4}}><FaVideo size={10}/> Video</span>}
          {lesson.duration && <span style={{fontSize:"0.7rem",background:"#f3f4f6",color:"#374151",padding:"2px 9px",borderRadius:"100px",fontWeight:600,display:"flex",alignItems:"center",gap:4}}><MdTimelapse size={12}/> {lesson.duration}</span>}
        </div>
      </div>
      {activeLesson && (
        <div className="scp-lesson-chapter">
          Chapter {activeLesson.chapterIdx+1}: {course.chapters[activeLesson.chapterIdx]?.title}
        </div>
      )}
      {lesson.notes?.length > 0 && (
        <div className="scp-materials-section">
          <div className="scp-materials-title">
            <MdAttachFile size={15}/> Study Materials &nbsp;
            <span style={{background:"#4441e5",color:"#fff",borderRadius:"100px",padding:"0 7px",fontSize:"0.65rem"}}>{lesson.notes.length}</span>
          </div>
          <div className="scp-materials-list">
            {lesson.notes.map((note) => (
              <a key={note._id} href={note.fileUrl} target="_blank" rel="noreferrer" className="scp-material-link">
                <span className="scp-material-icon">{NOTE_ICONS[note.type]||"📁"}</span>
                <span className="scp-material-name">{note.title}</span>
                <span className="scp-material-badge">{NOTE_LABELS[note.type]||"File"}</span>
                <span className="scp-material-open">Open →</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   CART DRAWER — navigate to checkout
════════════════════════════════════════ */
function CartDrawer({ open, onClose, cart, removeFromCart, onEnrolled }) {
  const router = useRouter();
  const [coupon, setCoupon]               = useState("");
  const [couponApplied, setCouponApplied] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError]     = useState("");
  const [enrollingFree, setEnrollingFree] = useState(false);

  const subtotal = cart.reduce((a,c) => a + (c.isFree ? 0 : Number(c.price||0)), 0);
  const discount = couponApplied
    ? couponApplied.type==="percent" ? Math.round(subtotal*couponApplied.value/100) : Math.min(couponApplied.value,subtotal)
    : 0;
  const total   = Math.max(0, subtotal - discount);
  const hasPaid = cart.some((c) => !c.isFree);
  const allFree = cart.every((c) => c.isFree);

  const applyCoupon = async () => {
    if (!coupon.trim()) return;
    setCouponLoading(true); setCouponError("");
    try {
      const paidCourse = cart.find((c) => !c.isFree);
      if (!paidCourse) { setCouponError("No paid courses in cart"); setCouponLoading(false); return; }
      const token = localStorage.getItem("studentToken");
      const res   = await fetch("/api/courses/enroll", {
        method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
        body: JSON.stringify({ courseId:paidCourse._id, couponCode:coupon }),
      });
      const data = await res.json();
      if (data.success && data.type==="paid") setCouponApplied({ code:data.couponCode, discount:data.discount, type:"flat", value:data.discount });
      else if (data.success && data.type==="free") setCouponApplied({ code:coupon.toUpperCase(), discount:subtotal, type:"flat", value:subtotal });
      else { setCouponError(data.error||"Invalid coupon"); setCouponApplied(null); }
    } catch { setCouponError("Network error"); }
    setCouponLoading(false);
  };

  const removeCoupon = () => { setCouponApplied(null); setCoupon(""); setCouponError(""); };

  const enrollFreeItems = async () => {
    setEnrollingFree(true);
    const token = localStorage.getItem("studentToken");
    for (const c of cart.filter((c) => c.isFree)) {
      await fetch("/api/courses/enroll", {
        method:"POST", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
        body: JSON.stringify({ courseId:c._id }),
      }).catch(() => {});
    }
    setEnrollingFree(false);
    onEnrolled();
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) return;
    localStorage.setItem("ss_checkout_cart", JSON.stringify(cart));
    if (couponApplied) localStorage.setItem("ss_checkout_coupon", JSON.stringify({...couponApplied,discount}));
    else localStorage.removeItem("ss_checkout_coupon");
    onClose();
    router.push("/student/checkout");
  };

  return (
    <div className={`sdc-cart-drawer ${open?"sdc-cart-open":""}`}>
      <div className="sdc-cart-header">
        <div className="sdc-cart-title"><MdShoppingCart size={20}/> My Cart {cart.length>0&&<span className="sdc-cart-badge">{cart.length}</span>}</div>
        <button className="sdc-cart-close" onClick={onClose}><MdClose size={22}/></button>
      </div>
      {cart.length===0 ? (
        <div className="sdc-cart-empty">
          <MdShoppingCart size={52} className="sdc-cart-empty-icon"/>
          <div>Your cart is empty</div>
          <p>Add a course to get started!</p>
        </div>
      ) : (
        <>
          <div className="sdc-cart-items">
            {cart.map((course) => (
              <div key={course._id} className="sdc-cart-item">
                <div className="sdc-cart-item-thumb" style={{
                  background: course.featureImage
                    ? `url(${course.featureImage}) center/cover no-repeat`
                    : `linear-gradient(135deg,${getSubjectColor(course.subject)}33,${getSubjectColor(course.subject)}66)`,
                }}>
                  {!course.featureImage&&<span style={{fontSize:18}}>{subjectIcons[course.subject]||"📚"}</span>}
                </div>
                <div className="sdc-cart-item-info">
                  <div className="sdc-cart-item-title">{course.title}</div>
                  <div className="sdc-cart-item-sub">{course.subject} • {course.batch}</div>
                  <div className="sdc-cart-item-price">
                    {course.isFree?<span className="sdc-free-tag">FREE</span>:<span><FaRupeeSign size={11}/>{course.price}</span>}
                  </div>
                </div>
                <button className="sdc-cart-remove" onClick={() => removeFromCart(course._id)}><MdDelete size={17}/></button>
              </div>
            ))}
          </div>
          {hasPaid && (
            <div className="sdc-coupon-wrap">
              <div className="sdc-coupon-title"><MdLocalOffer size={14}/> Have a coupon code?</div>
              {couponApplied ? (
                <div className="sdc-coupon-applied">
                  <MdCheck size={15} color="#10b981"/>
                  <span><strong>{couponApplied.code}</strong> — ₹{discount} off!</span>
                  <button className="sdc-coupon-remove" onClick={removeCoupon}><MdClose size={14}/></button>
                </div>
              ) : (
                <div className="sdc-coupon-row">
                  <input className="sdc-coupon-input" placeholder="COUPON CODE" value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key==="Enter"&&applyCoupon()}/>
                  <button className="sdc-coupon-btn" onClick={applyCoupon} disabled={couponLoading}>{couponLoading?"...":"Apply"}</button>
                </div>
              )}
              {couponError&&<div className="sdc-coupon-error">{couponError}</div>}
            </div>
          )}
          <div className="sdc-summary">
            <div className="sdc-summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
            {couponApplied&&<div className="sdc-summary-row sdc-summary-discount"><span>Discount ({couponApplied.code})</span><span>−₹{discount}</span></div>}
            <div className="sdc-summary-row sdc-summary-total">
              <span>Total</span>
              <span>{total===0?<span style={{color:"#10b981",fontWeight:800}}>FREE 🎉</span>:`₹${total}`}</span>
            </div>
          </div>
          {allFree||total===0 ? (
            <button className="sdc-checkout-btn" onClick={enrollFreeItems} disabled={enrollingFree}>
              {enrollingFree?"Enrolling...":<><MdCheck size={18}/> Enroll Now — Free!</>}
            </button>
          ) : (
            <button className="sdc-checkout-btn" onClick={proceedToCheckout}>
              <MdArrowForward size={17}/> Proceed to Checkout
            </button>
          )}
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:10,flexWrap:"wrap"}}>
            <span style={{fontSize:"0.68rem",fontWeight:700,padding:"3px 9px",borderRadius:100,background:"#d1fae5",color:"#065f46"}}>💵 Cash on Delivery</span>
            <span style={{fontSize:"0.68rem",fontWeight:700,padding:"3px 9px",borderRadius:100,background:"#f3f4f6",color:"#6b7280"}}>💳 Online — Coming Soon</span>
          </div>
        </>
      )}
    </div>
  );
}

/* ════════════════════════════════════════
   PROFILE SECTION
════════════════════════════════════════ */
function ProfileSection({ student, setStudent, enrolledCourses = [] }) {
  const [saving, setSaving]         = useState(false);
  const [form, setForm]             = useState({ name:student.name||"", className:student.className||"", batch:student.batch||"" });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg]     = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(form.name!==(student.name||"")||form.className!==(student.className||"")||form.batch!==(student.batch||""));
  }, [form, student]);

  const handleSave = async () => {
    setErrorMsg(""); setSuccessMsg("");
    if (!form.name.trim()) { setErrorMsg("Name is required"); return; }
    if (!form.className)   { setErrorMsg("Class is required"); return; }
    setSaving(true);
    try {
      const token = localStorage.getItem("studentToken");
      const res   = await fetch("/api/student/update-profile", {
        method:"PUT", headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        const updated = {...student,...data.student};
        localStorage.setItem("studentInfo", JSON.stringify(updated));
        setStudent(updated);
        setSuccessMsg("Profile updated successfully!");
        setHasChanges(false);
        setTimeout(()=>setSuccessMsg(""),3000);
      } else { setErrorMsg(data.message||"Failed to update"); }
    } catch { setErrorMsg("Server error. Please try again."); }
    setSaving(false);
  };

  const handleReset = () => { setForm({name:student.name||"",className:student.className||"",batch:student.batch||""}); setErrorMsg(""); setSuccessMsg(""); };

  return (
    <div>
      {/* Hero — profile-banner.svg background */}
      <div className="sdpr-hero">
        <div className="sdpr-hero-av">{student.name ? student.name.charAt(0).toUpperCase() : "S"}</div>
        <div>
          <h1>{student.name || "Student"}</h1>
          <p>{student.className || ""}{student.batch ? ` · ${student.batch}` : ""}</p>
        </div>
      </div>

      {/* Grid: left info boxes | right current courses + edit form */}
      <div className="sdpr-grid">

        {/* ── Left ── */}
        <div>
          <div className="sdpr-box">
            <h3>Contact Information</h3>
            <div className="sdpr-info">
              <div className="sdpr-info-ic"><MdPhone size={16}/></div>
              <div><small>Mobile</small><b>+91 {student.phone}</b></div>
            </div>
            {student.email && (
              <div className="sdpr-info">
                <div className="sdpr-info-ic"><MdPerson size={16}/></div>
                <div><small>Email</small><b>{student.email}</b></div>
              </div>
            )}
          </div>
          <div className="sdpr-box">
            <h3>Academic Info</h3>
            <div className="sdpr-info">
              <div className="sdpr-info-ic"><MdSchool size={16}/></div>
              <div><small>Class</small><b>{student.className || "—"}</b></div>
            </div>
            <div className="sdpr-info">
              <div className="sdpr-info-ic"><FaGraduationCap size={14}/></div>
              <div><small>Batch</small><b>{student.batch || "—"}</b></div>
            </div>
          </div>
        </div>

        {/* ── Right ── */}
        <div>
          {/* Current Courses */}
          <div className="sdpr-box" style={{marginBottom:24}}>
            <h3 className="sdpr-cc-title">Current Courses</h3>
            {enrolledCourses.length === 0 ? (
              <p style={{color:"#888",fontSize:14}}>No enrolled courses yet.</p>
            ) : (
              enrolledCourses.map((c) => {
                const tc = getSubjectThumbClass(c.subject);
                const sc = getSubjectColor(c.subject);
                const totalLessons = c.chapters?.reduce((a, ch) => a + ch.lessons.length, 0) || 0;
                return (
                  <div key={c._id} className="sdpr-ccourse">
                    <div className={`sdpr-ct ${tc}`}>
                      {c.subject ? c.subject.split(" ").slice(0,2).join("\n") : c.title?.split(" ").slice(0,2).join("\n")}
                    </div>
                    <div className="sdpr-cinfo">
                      <div className="sdpr-cn">{c.title}</div>
                      <div className="sdpr-cm">
                        <img src="/assets/images/online-classes/icons/chapter.svg" alt="" className="sdc-meta-icon"/>
                        {c.chapters?.length||0} Chapters &nbsp;
                        <img src="/assets/images/online-classes/icons/lesson.svg" alt="" className="sdc-meta-icon"/>
                        {totalLessons} Lessons
                      </div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:4}}>
                        {c.subject && <span className="sdc-tag" style={{background:`${sc}22`,color:sc}}>{c.subject.toUpperCase()}</span>}
                        {c.batch && <span className="sdc-tag-cls-pill">{c.batch.toUpperCase()}</span>}
                      </div>
                      <div className="sdpr-cbar"><i style={{width:"0%",background:"#7c3aed"}}/></div>
                    </div>
                    <button className="sdpr-btn-watch">▶ Continue</button>
                  </div>
                );
              })
            )}
          </div>

          {/* Edit Profile */}
          <div className="sdpr-box">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
              <h3 style={{marginBottom:0}}>Edit Profile</h3>
              {hasChanges && <span className="sdpr-unsaved">Unsaved changes</span>}
            </div>
            {successMsg && <div className="sdpr-msg-ok">✅ {successMsg}</div>}
            {errorMsg   && <div className="sdpr-msg-err">⚠️ {errorMsg}</div>}
            <div className="sdpr-field">
              <label className="sdpr-label">Full Name <span className="sdpr-req">*</span></label>
              <input type="text" className="sdpr-input" value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} placeholder="Your full name"/>
            </div>
            <div className="sdpr-field">
              <label className="sdpr-label">Mobile Number</label>
              <input type="text" className="sdpr-input" value={`+91 ${student.phone}`} disabled/>
              <div className="sdpr-hint">📵 Phone number cannot be changed</div>
            </div>
            <div className="sdpr-field">
              <label className="sdpr-label">Class <span className="sdpr-req">*</span></label>
              <select className="sdpr-input" value={form.className} onChange={(e) => setForm({...form,className:e.target.value})}>
                <option value="">Select your class</option>
                {["Class 9","Class 10","Class 11","Class 12","NIOS Stream 1","NIOS Stream 2","Dropper Batch"].map((cl) => (
                  <option key={cl} value={cl}>{cl}</option>
                ))}
              </select>
            </div>
            <div className="sdpr-field">
              <label className="sdpr-label">Batch <span className="sdpr-optional">(optional)</span></label>
              <input type="text" className="sdpr-input" value={form.batch} onChange={(e) => setForm({...form,batch:e.target.value})} placeholder="e.g. Morning Batch"/>
            </div>
            <div className="sdpr-actions">
              <button className="sdpr-reset-btn" onClick={handleReset} disabled={!hasChanges || saving}><MdClose size={15}/> Reset</button>
              <button className="sdpr-save-btn" onClick={handleSave} disabled={!hasChanges || saving}>
                {saving ? <><span className="sdpr-spinner"/>&nbsp;Saving...</> : <><MdSave size={15}/> Save Changes</>}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   CLASS CARD
════════════════════════════════════════ */
function ClassCard({ cls, formatDate, formatTime, getYoutubeId }) {
  const [watching, setWatching] = useState(false);
  const ytId = getYoutubeId(cls.streamLink);
  const noteColors = { notes:"#6c47d4", assignment:"#d97706", solution:"#059669", other:"#6b7280" };
  const thumbClass = getSubjectThumbClass(cls.subject);
  const subjectColor = getSubjectColor(cls.subject);
  const hasImg = !!ytId;

  const thumbStyle = hasImg
    ? { backgroundImage:`url(https://img.youtube.com/vi/${ytId}/hqdefault.jpg)`, backgroundSize:"cover", backgroundPosition:"center" }
    : {};

  const notesSection = cls.notes && cls.notes.length > 0 && (
    <div className="clsc-notes">
      <div className="clsc-notes-title">📎 Study Materials</div>
      {cls.notes.map((note) => (
        <a key={note._id} href={note.driveLink} target="_blank" rel="noopener noreferrer" className="clsc-note-btn">
          <span style={{display:"flex",alignItems:"center",gap:6}}>
            <span className="clsc-note-dot" style={{background:noteColors[note.type]||"#6b7280"}}/>
            {note.title}
          </span>
          <span>Open →</span>
        </a>
      ))}
    </div>
  );

  /* Shared card shell — same visual as CourseCard */
  const thumb = (
    <div className={`sdc-card-thumb ${hasImg ? "sdc-thumb-has-img" : thumbClass}`} style={thumbStyle}>
      {/* Status pill top-left */}
      {cls.status === "live"      && <span className="clsc-live-pill">◉ LIVE</span>}
      {cls.status === "completed" && <span className="clsc-done-pill">✓ DONE</span>}
      {/* Play overlay for YouTube */}
      {hasImg && !watching && cls.status !== "upcoming" && (
        <div className="clsc-play-overlay">
          <MdPlayCircle size={42} color="#fff" style={{filter:"drop-shadow(0 2px 6px rgba(0,0,0,0.5))"}}/>
        </div>
      )}
      {/* Heart */}
      <button className="sdc-fav-btn" onClick={(e) => e.stopPropagation()} aria-label="Wishlist">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>
  );

  /* Meta row — same as CourseCard */
  const meta = (
    <div className="sdc-card-meta">
      <div className="sdc-meta-left">
        <span className="sdc-meta-item">
          <img src="/assets/images/online-classes/icons/chapter.svg" alt="" className="sdc-meta-icon"/>
          {cls.chapters?.length||0} Chapters
        </span>
        <span className="sdc-meta-item">
          <img src="/assets/images/online-classes/icons/lesson.svg" alt="" className="sdc-meta-icon"/>
          {cls.chapters?.reduce((a,c)=>a+c.lessons.length,0)||0} Lessons
        </span>
      </div>
      <div className="sdc-meta-right">
        {cls.subject && <span className="sdc-tag" style={{background:`${subjectColor}22`,color:subjectColor}}>{cls.subject.toUpperCase()}</span>}
        {(cls.batch||cls.className) && <span className="sdc-tag-cls-pill">{(cls.batch||cls.className).toUpperCase()}</span>}
      </div>
    </div>
  );

  /* ── LIVE ── */
  if (cls.status === "live") {
    return (
      <div className="sdc-card">
        {watching && ytId ? (
          <div style={{position:"relative",paddingBottom:"56.25%",height:0,background:"#000",borderRadius:"14px 14px 0 0",overflow:"hidden"}}>
            <iframe src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
              style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}}
              allowFullScreen allow="autoplay; encrypted-media"/>
          </div>
        ) : thumb}
        <div className="sdc-card-body">
          {meta}
          <div className="sdc-cc-name">{cls.title}</div>
          <div className="clsc-prog-bar"><i style={{width:"30%",background:"#f0473e"}}/></div>
          <button className="sdc-btn clsc-btn-live" onClick={() => ytId && setWatching(!watching)} disabled={!ytId} style={{opacity:ytId?1:0.5}}>
            {watching ? <><MdPauseCircle size={15}/> Hide Stream</> : <>▶ Watch Now</>}
          </button>
          {notesSection}
        </div>
      </div>
    );
  }

  /* ── UPCOMING ── */
  if (cls.status === "upcoming") {
    return (
      <div className="sdc-card">
        {thumb}
        <div className="sdc-card-body">
          {meta}
          <div className="sdc-cc-name">{cls.title}</div>
          <button className="sdc-btn clsc-btn-upcoming">
            🕐 {formatDate(cls.date)}{cls.time ? ` · ${formatTime(cls.time)}` : ""}
          </button>
          {notesSection}
        </div>
      </div>
    );
  }

  /* ── COMPLETED ── */
  return (
    <div className="sdc-card">
      {thumb}
      <div className="sdc-card-body">
        {meta}
        <div className="sdc-cc-name">{cls.title}</div>
        <div className="clsc-kmeta">
          {cls.duration && <span>⏱ {cls.duration}</span>}
          {cls.time     && <span>🕐 {formatTime(cls.time)}</span>}
          {cls.date     && <span>📅 {formatDate(cls.date)}</span>}
        </div>
        {cls.streamLink ? (
          <a href={cls.streamLink} target="_blank" rel="noopener noreferrer" className="sdc-btn clsc-btn-done" style={{display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none"}}>
            ▶ Watch Recording
          </a>
        ) : (
          <button className="sdc-btn clsc-btn-done" style={{opacity:0.5}} disabled>▶ Watch Recording</button>
        )}
        {notesSection}
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
//   MdShoppingCart,
//   MdDelete,
//   MdLocalOffer,
//   MdLock,
//   MdCheck,
//   MdSearch,
//   MdFolder,
//   MdArrowBack,
//   MdExpandMore,
//   MdExpandLess,
//   MdOndemandVideo,
//   MdAttachFile,   // ← ADD THIS
// } from "react-icons/md";
// import { FaChalkboardTeacher, FaGraduationCap, FaRupeeSign, FaYoutube, FaVideo } from "react-icons/fa"; // ← ADD FaYoutube, FaVideo
// import { BiSolidBookOpen } from "react-icons/bi";
// import { BsCollection, BsCartCheck } from "react-icons/bs";

// /* ─── Subject helpers ─── */
// const subjectColors = {
//   Mathematics: "#6c47d4", Physics: "#0ea5e9", Chemistry: "#f59e0b",
//   Biology: "#10b981", English: "#f43f5e", Hindi: "#8b5cf6",
//   "Social Science": "#64748b", "Computer Science": "#06b6d4",
// };
// const subjectIcons = {
//   Mathematics: "📐", Physics: "⚛️", Chemistry: "🧪",
//   Biology: "🧬", English: "📖", Hindi: "🪔",
//   "Social Science": "🌍", "Computer Science": "💻",
// };
// const getSubjectColor = (s) => subjectColors[s] || "#6c47d4";

// /* ─── Note type helpers ─── */
// const NOTE_ICONS  = { pdf: "📄", doc: "📝", ppt: "📊", link: "🔗", other: "📁" };
// const NOTE_LABELS = { pdf: "PDF", doc: "Word Doc", ppt: "PPT", link: "Link", other: "File" };

// /* ════════════════════════════════════════
//    MAIN DASHBOARD
// ════════════════════════════════════════ */
// export default function StudentDashboard() {
//   const router = useRouter();
//   const [student, setStudent]           = useState(null);
//   const [classes, setClasses]           = useState([]);
//   const [courses, setCourses]           = useState([]);
//   const [loading, setLoading]           = useState(true);
//   const [activeMenu, setActiveMenu]     = useState("dashboard");
//   const [sidebarOpen, setSidebarOpen]   = useState(false);
//   const [cart, setCart]                 = useState([]);
//   const [cartOpen, setCartOpen]         = useState(false);
//   const [activeCourse, setActiveCourse] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("studentToken");
//     const info  = localStorage.getItem("studentInfo");
//     if (!token || !info) { router.push("/student/login"); return; }
//     setStudent(JSON.parse(info));
//     fetchClasses(token);
//     fetchCourses(token);
//   }, []);

//   const fetchClasses = async (token) => {
//     try {
//       const info = JSON.parse(localStorage.getItem("studentInfo"));
//       const studentClass = info?.className || "";
//       const url = studentClass
//         ? `/api/onlineClasses?limit=50&batch=${encodeURIComponent(studentClass)}`
//         : `/api/onlineClasses?limit=50`;
//       const res  = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
//       const data = await res.json();
//       if (data.success) setClasses(data.data);
//     } catch (err) { console.error("Failed to fetch classes"); }
//     setLoading(false);
//   };

//   const fetchCourses = async (token) => {
//     try {
//       const res  = await fetch("/api/courses", { headers: { Authorization: `Bearer ${token}` } });
//       const data = await res.json();
//       if (data.success) setCourses(data.courses);
//     } catch {}
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("studentToken");
//     localStorage.removeItem("studentInfo");
//     router.push("/student/login");
//   };

//   const liveClasses      = classes.filter((c) => c.status === "live");
//   const upcomingClasses  = classes.filter((c) => c.status === "upcoming");
//   const completedClasses = classes.filter((c) => c.status === "completed");

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "";
//     return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
//   };

//   const formatTime = (timeStr) => {
//     if (!timeStr) return "";
//     const [h, m] = timeStr.split(":");
//     const hour   = parseInt(h);
//     const ampm   = hour >= 12 ? "PM" : "AM";
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

//   const addToCart = (course) => {
//     if (cart.find((c) => c._id === course._id)) { setCartOpen(true); return; }
//     setCart((prev) => [...prev, course]);
//     setCartOpen(true);
//   };
//   const removeFromCart  = (id) => setCart((prev) => prev.filter((c) => c._id !== id));
//   const enrolledCourses = courses.filter((c) => c.isEnrolled);
//   const navigate = (menu) => { setActiveMenu(menu); setSidebarOpen(false); };

//   if (!student) return null;

//   return (
//     <>
//       <Head><title>Dashboard — SS Coaching</title></Head>
//       <div className="sd-wrapper">

//         {/* SIDEBAR */}
//         <div className={`sd-sidebar ${sidebarOpen ? "sd-sidebar-open" : ""}`}>
//           <div className="sl-logo">
//             <div className="sl-logo-icon">SS</div>
//             <div>
//               <div className="sl-logo-name">SS Coaching</div>
//               <div className="sl-logo-tag">Rise From Failure • Estd. 2001</div>
//             </div>
//           </div>
//           <div className="sd-student-info">
//             <div className="sd-student-avatar">
//               {student.name ? student.name.charAt(0).toUpperCase() : "S"}
//             </div>
//             <div>
//               <div className="sd-student-name">{student.name || "Student"}</div>
//               <div className="sd-student-class">{student.className || ""}</div>
//             </div>
//           </div>
//           <nav className="sd-nav">
//             <button className={`sd-nav-item ${activeMenu === "dashboard" ? "sd-nav-active" : ""}`} onClick={() => navigate("dashboard")}>
//               <MdDashboard className="sd-nav-icon" /> Dashboard
//             </button>
//             <button className={`sd-nav-item ${activeMenu === "courses" ? "sd-nav-active" : ""}`} onClick={() => navigate("courses")}>
//               <BsCollection className="sd-nav-icon" /> Courses
//               {enrolledCourses.length > 0 && <span className="sd-nav-badge">{enrolledCourses.length}</span>}
//             </button>
//             <button className={`sd-nav-item ${activeMenu === "live" ? "sd-nav-active" : ""}`} onClick={() => navigate("live")}>
//               <MdLiveTv className="sd-nav-icon" /> Live Classes
//               {liveClasses.length > 0 && <span className="sd-nav-badge">{liveClasses.length}</span>}
//             </button>
//             <button className={`sd-nav-item ${activeMenu === "upcoming" ? "sd-nav-active" : ""}`} onClick={() => navigate("upcoming")}>
//               <MdCalendarToday className="sd-nav-icon" /> Upcoming Classes
//             </button>
//             <button className={`sd-nav-item ${activeMenu === "completed" ? "sd-nav-active" : ""}`} onClick={() => navigate("completed")}>
//               <MdCheckCircle className="sd-nav-icon" /> Completed Classes
//             </button>
//             <button className={`sd-nav-item ${activeMenu === "profile" ? "sd-nav-active" : ""}`} onClick={() => navigate("profile")}>
//               <MdPerson className="sd-nav-icon" /> My Profile
//             </button>
//           </nav>
//           <button className="sd-logout-btn" onClick={handleLogout}>
//             <MdLogout size={16} /> Logout
//           </button>
//         </div>

//         {sidebarOpen && <div className="sd-overlay" onClick={() => setSidebarOpen(false)} />}

//         {/* MAIN */}
//         <div className="sd-main">
//           <div className="sd-topbar">
//             <button className="sd-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
//               <MdMenu size={24} />
//             </button>
//             <div className="sd-topbar-title">
//               {activeMenu === "dashboard" && "Dashboard"}
//               {activeMenu === "courses"   && <span><BsCollection size={18} style={{ marginRight: 6 }} /> Courses</span>}
//               {activeMenu === "live"      && <span className="sd-topbar-live"><MdLiveTv size={20} /> Live Classes</span>}
//               {activeMenu === "upcoming"  && <span className="sd-topbar-upcoming"><MdCalendarToday size={18} /> Upcoming Classes</span>}
//               {activeMenu === "completed" && <span className="sd-topbar-completed"><MdCheckCircle size={18} /> Completed Classes</span>}
//               {activeMenu === "profile"   && <span><MdPerson size={20} /> My Profile</span>}
//             </div>
//             <div className="sd-topbar-right">
//               <button className="sd-cart-btn" onClick={() => setCartOpen(true)}>
//                 <MdShoppingCart size={22} />
//                 {cart.length > 0 && <span className="sd-cart-count">{cart.length}</span>}
//               </button>
//               <div className="sd-topbar-avatar" onClick={() => navigate("profile")} style={{ cursor: "pointer" }} title="My Profile">
//                 {student.name ? student.name.charAt(0).toUpperCase() : "S"}
//               </div>
//             </div>
//           </div>

//           <div className="sd-content">

//             {/* DASHBOARD HOME */}
//             {activeMenu === "dashboard" && (
//               <div>
//                 <div className="sd-welcome-banner">
//                   <div>
//                     <div className="sd-welcome-text">Welcome back, <strong>{student.name || "Student"}!</strong></div>
//                     <div className="sd-welcome-sub">{student.className && `${student.className} • `}Ready to learn today?</div>
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
//                   <div className="sd-stat-card sd-stat-total" onClick={() => navigate("courses")} style={{ cursor: "pointer" }}>
//                     <BsCollection size={26} className="sd-stat-svg" />
//                     <div className="sd-stat-num">{enrolledCourses.length}</div>
//                     <div className="sd-stat-label">My Courses</div>
//                   </div>
//                 </div>
//                 {enrolledCourses.length > 0 && (
//                   <div className="sd-section">
//                     <div className="sd-section-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                       <span><BsCollection size={16} style={{ color: "#6c47d4", marginRight: 6 }} />My Courses</span>
//                       <button className="sdc-see-all-btn" onClick={() => navigate("courses")}>See all →</button>
//                     </div>
//                     <div className="sdc-enrolled-strip-scroll">
//                       {enrolledCourses.slice(0, 4).map((course) => (
//                         <EnrolledCourseCard key={course._id} course={course} onOpen={() => { setActiveCourse(course._id); navigate("courses"); }} />
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {liveClasses.length > 0 && (
//                   <div className="sd-section">
//                     <div className="sd-section-header"><span className="sd-live-pulse"></span> Live Right Now</div>
//                     <div className="sd-cards-grid">
//                       {liveClasses.map((cls) => (
//                         <ClassCard key={cls._id} cls={cls} formatDate={formatDate} formatTime={formatTime} getYoutubeId={getYoutubeId} />
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {upcomingClasses.length > 0 && (
//                   <div className="sd-section">
//                     <div className="sd-section-header"><MdCalendarToday size={18} style={{ color: "#6c47d4" }} /> Upcoming Classes</div>
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

//             {/* COURSES TAB */}
//             {activeMenu === "courses" && !activeCourse && (
//               <CoursesSection
//                 courses={courses}
//                 cart={cart}
//                 addToCart={addToCart}
//                 setCartOpen={setCartOpen}
//                 onEnrolled={() => fetchCourses(localStorage.getItem("studentToken"))}
//                 onOpenCourse={setActiveCourse}
//               />
//             )}

//             {/* COURSE PLAYER */}
//             {activeMenu === "courses" && activeCourse && (
//               <CoursePlayer courseId={activeCourse} onBack={() => setActiveCourse(null)} />
//             )}

//             {/* LIVE */}
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

//             {/* UPCOMING */}
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

//             {/* COMPLETED */}
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

//             {/* PROFILE */}
//             {activeMenu === "profile" && (
//               <ProfileSection student={student} setStudent={setStudent} />
//             )}

//           </div>
//         </div>

//         {cartOpen && <div className="sd-overlay sdc-overlay-top" onClick={() => setCartOpen(false)} />}
//         <CartDrawer
//           open={cartOpen}
//           onClose={() => setCartOpen(false)}
//           cart={cart}
//           removeFromCart={removeFromCart}
//           onEnrolled={() => {
//             fetchCourses(localStorage.getItem("studentToken"));
//             setCart([]);
//             setCartOpen(false);
//           }}
//         />
//       </div>
//     </>
//   );
// }

// /* ════════════════════════════════════════
//    COURSES SECTION
// ════════════════════════════════════════ */
// function CoursesSection({ courses, cart, addToCart, setCartOpen, onEnrolled, onOpenCourse }) {
//   const [filter, setFilter]   = useState("all");
//   const [search, setSearch]   = useState("");
//   const [subject, setSubject] = useState("");

//   const subjects = [...new Set(courses.map((c) => c.subject).filter(Boolean))];

//   const filtered = courses.filter((c) => {
//     if (filter === "enrolled" && !c.isEnrolled) return false;
//     if (filter === "free"     && !c.isFree)     return false;
//     if (filter === "paid"     && c.isFree)      return false;
//     if (subject && c.subject !== subject)        return false;
//     if (search && !c.title.toLowerCase().includes(search.toLowerCase()) &&
//         !(c.subject || "").toLowerCase().includes(search.toLowerCase())) return false;
//     return true;
//   });

//   const enrolled = courses.filter((c) => c.isEnrolled);

//   return (
//     <div>
//       {enrolled.length > 0 && (
//         <div className="sdc-enrolled-strip">
//           <div className="sdc-strip-title">
//             <BsCartCheck size={17} style={{ color: "#6c47d4", marginRight: 7 }} />
//             Continue Learning
//           </div>
//           <div className="sdc-enrolled-strip-scroll">
//             {enrolled.map((c) => (
//               <EnrolledCourseCard key={c._id} course={c} onOpen={() => onOpenCourse(c._id)} />
//             ))}
//           </div>
//         </div>
//       )}
//       <div className="sdc-filters">
//         <div className="sdc-search-wrap">
//           <MdSearch size={18} className="sdc-search-icon" />
//           <input className="sdc-search" placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} />
//         </div>
//         <div className="sdc-filter-row">
//           {[
//             { val: "all", label: "All Courses" },
//             { val: "free", label: "Free" },
//             { val: "paid", label: "Paid" },
//             { val: "enrolled", label: "My Courses" },
//           ].map((f) => (
//             <button key={f.val} className={`sdc-filter-btn ${filter === f.val ? "sdc-filter-active" : ""}`} onClick={() => setFilter(f.val)}>
//               {f.label}
//             </button>
//           ))}
//           {subjects.length > 1 && (
//             <select className="sdc-subject-select" value={subject} onChange={(e) => setSubject(e.target.value)}>
//               <option value="">All Subjects</option>
//               {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
//             </select>
//           )}
//         </div>
//       </div>
//       {filtered.length === 0 ? (
//         <div className="sd-empty">
//           <BsCollection size={48} className="sd-empty-svg" />
//           <div className="sd-empty-title">{filter === "enrolled" ? "No Enrolled Courses" : "No Courses Found"}</div>
//           <p>{filter === "enrolled" ? "Browse courses and enroll to start learning!" : "Try a different filter or search term."}</p>
//           {filter === "enrolled" && <button className="sdc-browse-btn" onClick={() => setFilter("all")}>Browse All Courses</button>}
//         </div>
//       ) : (
//         <div className="sdc-grid">
//           {filtered.map((course) => (
//             <CourseCard key={course._id} course={course} cart={cart} addToCart={addToCart} onEnrolled={onEnrolled} onOpen={() => onOpenCourse(course._id)} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// /* ════════════════════════════════════════
//    COURSE CARD
// ════════════════════════════════════════ */
// function CourseCard({ course, cart, addToCart, onEnrolled, onOpen }) {
//   const [enrolling, setEnrolling] = useState(false);
//   const inCart = cart.find((c) => c._id === course._id);
//   const totalLessons = course.chapters?.reduce((a, c) => a + c.lessons.length, 0) || 0;

//   const handleFreeEnroll = async () => {
//     setEnrolling(true);
//     try {
//       const token = localStorage.getItem("studentToken");
//       const res   = await fetch("/api/courses/enroll", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ courseId: course._id }),
//       });
//       const data = await res.json();
//       if (data.success) { onEnrolled(); }
//       else alert(data.error || "Failed to enroll");
//     } catch { alert("Network error"); }
//     setEnrolling(false);
//   };

//   return (
//     <div className={`sdc-card ${course.isEnrolled ? "sdc-card-enrolled" : ""}`}>
//       <div className="sdc-card-thumb" style={{
//         background: course.featureImage
//           ? `url(${course.featureImage}) center/cover no-repeat`
//           : `linear-gradient(135deg,${getSubjectColor(course.subject)}22,${getSubjectColor(course.subject)}66)`,
//       }}>
//         {!course.featureImage && <span className="sdc-thumb-icon">{subjectIcons[course.subject] || "📚"}</span>}
//         <span className={`sdc-price-badge ${course.isFree ? "sdc-badge-free" : "sdc-badge-paid"}`}>
//           {course.isFree ? "FREE" : <><FaRupeeSign size={10} />{course.price}</>}
//         </span>
//         {course.isEnrolled && <span className="sdc-enrolled-badge"><MdCheck size={11} /> Enrolled</span>}
//       </div>
//       <div className="sdc-card-body">
//         <div className="sdc-card-subject" style={{ color: getSubjectColor(course.subject) }}>
//           {subjectIcons[course.subject] || "📚"} {course.subject} • {course.batch}
//         </div>
//         <div className="sdc-card-title">{course.title}</div>
//         {course.description && <div className="sdc-card-desc">{course.description.slice(0, 80)}...</div>}
//         <div className="sdc-card-meta">
//           <span><MdFolder size={12} /> {course.chapters?.length || 0} Chapters</span>
//           <span><MdVideoLibrary size={12} /> {totalLessons} Lessons</span>
//         </div>
//         {course.isEnrolled ? (
//           <button className="sdc-btn sdc-btn-start" onClick={onOpen}><MdPlayCircle size={16} /> Continue Learning</button>
//         ) : course.isFree ? (
//           <button className="sdc-btn sdc-btn-free" onClick={handleFreeEnroll} disabled={enrolling}>
//             {enrolling ? "Enrolling..." : <><MdCheck size={15} /> Enroll Free</>}
//           </button>
//         ) : inCart ? (
//           <button className="sdc-btn sdc-btn-incart"><BsCartCheck size={15} /> In Cart</button>
//         ) : (
//           <button className="sdc-btn sdc-btn-buy" onClick={() => addToCart(course)}>
//             <MdShoppingCart size={15} /> Add to Cart &nbsp;•&nbsp; <FaRupeeSign size={11} />{course.price}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ════════════════════════════════════════
//    ENROLLED COURSE CARD (compact)
// ════════════════════════════════════════ */
// function EnrolledCourseCard({ course, onOpen }) {
//   const totalLessons = course.chapters?.reduce((a, c) => a + c.lessons.length, 0) || 0;
//   return (
//     <div className="sdc-enrolled-card">
//       <div className="sdc-enrolled-thumb" style={{
//         background: course.featureImage
//           ? `url(${course.featureImage}) center/cover no-repeat`
//           : `linear-gradient(135deg,${getSubjectColor(course.subject)}33,${getSubjectColor(course.subject)}66)`,
//       }}>
//         {!course.featureImage && <span style={{ fontSize: 24 }}>{subjectIcons[course.subject] || "📚"}</span>}
//       </div>
//       <div className="sdc-enrolled-body">
//         <div className="sdc-enrolled-subject" style={{ color: getSubjectColor(course.subject) }}>{course.subject}</div>
//         <div className="sdc-enrolled-title">{course.title}</div>
//         <div className="sdc-enrolled-meta">
//           <span><MdFolder size={11} /> {course.chapters?.length || 0} ch</span>
//           <span><MdVideoLibrary size={11} /> {totalLessons} lessons</span>
//         </div>
//         <button className="sdc-enrolled-cta" onClick={onOpen}><MdPlayCircle size={13} /> Continue</button>
//       </div>
//     </div>
//   );
// }

// /* ════════════════════════════════════════
//    COURSE PLAYER — UPDATED
//    Supports: videoType (youtube/custom/none)
//              videoUrl (custom video)
//              notes (study materials per lesson)
// ════════════════════════════════════════ */
// function CoursePlayer({ courseId, onBack }) {
//   const [course, setCourse]             = useState(null);
//   const [loading, setLoading]           = useState(true);
//   const [activeLesson, setActiveLesson] = useState(null);
//   const [openChapters, setOpenChapters] = useState({});

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("studentToken");
//         const res   = await fetch(`/api/courses/${courseId}`, { headers: { Authorization: `Bearer ${token}` } });
//         const data  = await res.json();
//         if (data.success) {
//           setCourse(data.course);
//           if (data.course.chapters?.length > 0) {
//             setOpenChapters({ 0: true });
//             // Auto-select first lesson that has any content
//             const firstLesson = data.course.chapters[0]?.lessons?.[0];
//             if (firstLesson) setActiveLesson({ chapterIdx: 0, lessonIdx: 0, lesson: firstLesson });
//           }
//         }
//       } catch {}
//       setLoading(false);
//     };
//     load();
//   }, [courseId]);

//   const toggleChapter = (idx) => setOpenChapters(prev => ({ ...prev, [idx]: !prev[idx] }));

//   const getYoutubeId = (url) => {
//     if (!url) return null;
//     const patterns = [
//       /youtube\.com\/watch\?v=([^&]+)/,
//       /youtu\.be\/([^?]+)/,
//       /youtube\.com\/embed\/([^?]+)/,
//       /youtube\.com\/live\/([^?]+)/,
//     ];
//     for (const p of patterns) { const m = url.match(p); if (m) return m[1]; }
//     return null;
//   };

//   /* ── helpers ── */
//   const lessonHasVideo = (les) => {
//     if (!les) return false;
//     if (les.videoType === "youtube" && les.youtubeLink) return true;
//     if (les.videoType === "custom"  && les.videoUrl)    return true;
//     return false;
//   };
//   const lessonHasNotes = (les) => les?.notes?.length > 0;
//   const lessonAccessible = (les) => lessonHasVideo(les) || lessonHasNotes(les);

//   const totalLessons = course?.chapters?.reduce((a, c) => a + c.lessons.length, 0) || 0;
//   const lesson = activeLesson?.lesson;
//   const ytId   = lesson?.videoType === "youtube" ? getYoutubeId(lesson.youtubeLink) : null;

//   if (loading) return (
//     <div className="scp-loading"><div className="scp-spinner-ring"></div><p>Loading course...</p></div>
//   );
//   if (!course) return (
//     <div className="sd-empty">
//       <MdVideoLibrary size={48} className="sd-empty-svg" />
//       <div className="sd-empty-title">Course not found</div>
//       <button className="sdc-browse-btn" onClick={onBack}>← Go Back</button>
//     </div>
//   );

//   return (
//     <div className="scp-wrapper">

//       {/* Header */}
//       <div className="scp-header">
//         <button className="scp-back-btn" onClick={onBack}><MdArrowBack size={18} /> Back to Courses</button>
//         <div className="scp-header-info">
//           <div className="scp-course-title">{course.title}</div>
//           <div className="scp-course-meta">
//             <span style={{ color: getSubjectColor(course.subject) }}>{subjectIcons[course.subject] || "📚"} {course.subject}</span>
//             <span>•</span><span>{course.batch}</span>
//             <span>•</span><span>{course.chapters?.length || 0} Chapters</span>
//             <span>•</span><span>{totalLessons} Lessons</span>
//           </div>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="scp-body">

//         {/* ── VIDEO / CONTENT AREA ── */}
//         <div className="scp-video-area">

//           {/* ① YouTube */}
//           {lesson && ytId && (
//             <>
//               <div className="scp-video-wrap">
//                 <iframe
//                   key={ytId}
//                   src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen className="scp-iframe" title={lesson.title}
//                 />
//               </div>
//               <LessonInfoPanel lesson={lesson} course={course} activeLesson={activeLesson} />
//             </>
//           )}

//           {/* ② Custom video URL */}
//           {lesson && lesson.videoType === "custom" && lesson.videoUrl && !ytId && (
//             <>
//               <div className="scp-video-wrap">
//                 <video key={lesson.videoUrl} controls autoPlay className="scp-iframe" style={{ background: "#000" }}>
//                   <source src={lesson.videoUrl} />
//                   Your browser does not support video playback.
//                 </video>
//               </div>
//               <LessonInfoPanel lesson={lesson} course={course} activeLesson={activeLesson} />
//             </>
//           )}

//           {/* ③ Notes-only lesson (videoType === "none" or no video) */}
//           {lesson && !lessonHasVideo(lesson) && lessonHasNotes(lesson) && (
//             <>
//               <div className="scp-notes-only-header">
//                 <div className="scp-notes-only-icon">📂</div>
//                 <div className="scp-notes-only-title">{lesson.title}</div>
//                 <div className="scp-notes-only-sub">This lesson contains study materials — no video</div>
//               </div>
//               <LessonInfoPanel lesson={lesson} course={course} activeLesson={activeLesson} />
//             </>
//           )}

//           {/* ④ Lesson with no video and no notes */}
//           {lesson && !lessonHasVideo(lesson) && !lessonHasNotes(lesson) && (
//             <div className="scp-locked">
//               <MdOndemandVideo size={48} />
//               <div>No content available for this lesson yet</div>
//             </div>
//           )}

//           {/* ⑤ Nothing selected yet */}
//           {!lesson && (
//             <div className="scp-no-lesson">
//               <MdOndemandVideo size={64} />
//               <div>Select a lesson from the right to start</div>
//             </div>
//           )}
//         </div>

//         {/* ── CHAPTER / LESSON SIDEBAR ── */}
//         <div className="scp-sidebar">
//           <div className="scp-sidebar-title">Course Content</div>

//           {course.chapters?.length === 0 && <div className="scp-no-content">No chapters added yet.</div>}

//           {course.chapters?.map((chapter, ci) => {
//             const isOpen = !!openChapters[ci];
//             return (
//               <div key={chapter._id || ci} className="scp-chapter">
//                 <button className="scp-chapter-header" onClick={() => toggleChapter(ci)}>
//                   <div className="scp-chapter-left">
//                     <span className="scp-chapter-num">Ch {ci + 1}</span>
//                     <span className="scp-chapter-title">{chapter.title}</span>
//                   </div>
//                   <div className="scp-chapter-right">
//                     <span className="scp-chapter-count">{chapter.lessons.length} lessons</span>
//                     {isOpen ? <MdExpandLess size={18} /> : <MdExpandMore size={18} />}
//                   </div>
//                 </button>

//                 {isOpen && (
//                   <div className="scp-lessons">
//                     {chapter.lessons.length === 0 && (
//                       <div className="scp-no-content" style={{ padding: "10px 16px" }}>No lessons yet</div>
//                     )}
//                     {chapter.lessons.map((les, li) => {
//                       const isActive  = activeLesson?.chapterIdx === ci && activeLesson?.lessonIdx === li;
//                       const canOpen   = lessonAccessible(les);
//                       const hasVideo  = lessonHasVideo(les);
//                       const hasNotes  = lessonHasNotes(les);

//                       return (
//                         <button
//                           key={les._id || li}
//                           className={`scp-lesson ${isActive ? "scp-lesson-active" : ""} ${!canOpen ? "scp-lesson-locked" : ""}`}
//                           onClick={() => { if (canOpen) setActiveLesson({ chapterIdx: ci, lessonIdx: li, lesson: les }); }}
//                           disabled={!canOpen}
//                         >
//                           <div className="scp-lesson-left">
//                             {/* icon by type */}
//                             {les.videoType === "youtube" && les.youtubeLink ? (
//                               <FaYoutube size={14} color={isActive ? "#fff" : "#ef4444"} style={{ flexShrink: 0 }} />
//                             ) : les.videoType === "custom" && les.videoUrl ? (
//                               <FaVideo size={13} color={isActive ? "#fff" : "#6c47d4"} style={{ flexShrink: 0 }} />
//                             ) : hasNotes ? (
//                               <MdAttachFile size={15} color={isActive ? "#fff" : "#f59e0b"} style={{ flexShrink: 0 }} />
//                             ) : (
//                               <MdLock size={13} className="scp-lock-icon" style={{ flexShrink: 0 }} />
//                             )}
//                             <span className="scp-lesson-name">{les.title}</span>
//                           </div>
//                           <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
//                             {/* notes badge */}
//                             {hasNotes && (
//                               <span className="scp-notes-badge">
//                                 📎{les.notes.length}
//                               </span>
//                             )}
//                             {les.duration && <span className="scp-lesson-time">{les.duration}</span>}
//                           </div>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <style jsx>{`
//         /* Notes-only lesson header */
//         .scp-notes-only-header {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 44px 24px 32px;
//           background: linear-gradient(135deg, #1a1f4b 0%, #0f1530 100%);
//           text-align: center;
//           color: #fff;
//           min-height: 180px;
//         }
//         .scp-notes-only-icon  { font-size: 2.8rem; margin-bottom: 10px; }
//         .scp-notes-only-title { font-size: 1.15rem; font-weight: 700; margin-bottom: 6px; }
//         .scp-notes-only-sub   { font-size: 0.8rem; color: rgba(255,255,255,0.48); }

//         /* Notes badge in sidebar */
//         .scp-notes-badge {
//           font-size: 0.62rem;
//           font-weight: 700;
//           background: rgba(245,158,11,0.18);
//           color: #f59e0b;
//           padding: 1px 5px;
//           border-radius: 4px;
//           white-space: nowrap;
//         }
//         .scp-lesson-active .scp-notes-badge {
//           background: rgba(255,255,255,0.2);
//           color: #fff;
//         }

//         /* Notes section (below video) */
//         .scp-materials-section {
//           margin-top: 16px;
//           padding: 14px 16px 16px;
//           background: #f8f9ff;
//           border-radius: 10px;
//           border: 1.5px solid #e0e3f5;
//         }
//         .scp-materials-title {
//           font-size: 0.78rem;
//           font-weight: 800;
//           color: #4441e5;
//           margin-bottom: 10px;
//           display: flex;
//           align-items: center;
//           gap: 5px;
//         }
//         .scp-materials-list {
//           display: flex;
//           flex-direction: column;
//           gap: 7px;
//         }
//         .scp-material-link {
//           display: flex;
//           align-items: center;
//           gap: 9px;
//           padding: 9px 12px;
//           background: #fff;
//           border: 1.5px solid #e0e3f5;
//           border-radius: 8px;
//           text-decoration: none;
//           color: #2d3a5a;
//           font-size: 0.81rem;
//           font-weight: 500;
//           transition: border-color 0.13s, background 0.13s, color 0.13s;
//         }
//         .scp-material-link:hover {
//           border-color: #4441e5;
//           background: #eef0ff;
//           color: #4441e5;
//         }
//         .scp-material-icon  { font-size: 1rem; flex-shrink: 0; }
//         .scp-material-name  { flex: 1; }
//         .scp-material-badge {
//           font-size: 0.63rem;
//           font-weight: 700;
//           background: #eef0ff;
//           color: #4441e5;
//           padding: 2px 7px;
//           border-radius: 100px;
//           flex-shrink: 0;
//         }
//         .scp-material-open {
//           font-size: 0.72rem;
//           color: #4441e5;
//           font-weight: 600;
//           flex-shrink: 0;
//         }

//         /* video tag fills wrapper same as iframe */
//         .scp-iframe {
//           width: 100%;
//           height: 100%;
//           border: none;
//           display: block;
//         }
//       `}</style>
//     </div>
//   );
// }

// /* ────────────────────────────────────────
//    LESSON INFO PANEL  (below video/content)
//    Shows: title · duration · chapter · notes
// ──────────────────────────────────────── */
// function LessonInfoPanel({ lesson, course, activeLesson }) {
//   return (
//     <div className="scp-lesson-info">

//       {/* Title row */}
//       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
//         <div className="scp-lesson-title">{lesson.title}</div>
//         <div style={{ display: "flex", gap: 6, flexShrink: 0, flexWrap: "wrap" }}>
//           {lesson.videoType === "youtube" && (
//             <span style={{ fontSize: "0.7rem", background: "#fee2e2", color: "#ef4444", padding: "2px 9px", borderRadius: "100px", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
//               <FaYoutube size={11} /> YouTube
//             </span>
//           )}
//           {lesson.videoType === "custom" && (
//             <span style={{ fontSize: "0.7rem", background: "#ede9fe", color: "#6c47d4", padding: "2px 9px", borderRadius: "100px", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
//               <FaVideo size={10} /> Video
//             </span>
//           )}
//           {lesson.duration && (
//             <span style={{ fontSize: "0.7rem", background: "#f3f4f6", color: "#374151", padding: "2px 9px", borderRadius: "100px", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
//               <MdTimelapse size={12} /> {lesson.duration}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Chapter label */}
//       {activeLesson && (
//         <div className="scp-lesson-chapter">
//           Chapter {activeLesson.chapterIdx + 1}: {course.chapters[activeLesson.chapterIdx]?.title}
//         </div>
//       )}

//       {/* ── Study Materials / Notes ── */}
//       {lesson.notes?.length > 0 && (
//         <div className="scp-materials-section">
//           <div className="scp-materials-title">
//             <MdAttachFile size={15} /> Study Materials &nbsp;
//             <span style={{ background: "#4441e5", color: "#fff", borderRadius: "100px", padding: "0 7px", fontSize: "0.65rem" }}>
//               {lesson.notes.length}
//             </span>
//           </div>
//           <div className="scp-materials-list">
//             {lesson.notes.map((note) => (
//               <a key={note._id} href={note.fileUrl} target="_blank" rel="noreferrer" className="scp-material-link">
//                 <span className="scp-material-icon">{NOTE_ICONS[note.type] || "📁"}</span>
//                 <span className="scp-material-name">{note.title}</span>
//                 <span className="scp-material-badge">{NOTE_LABELS[note.type] || "File"}</span>
//                 <span className="scp-material-open">Open →</span>
//               </a>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ════════════════════════════════════════
//    CART DRAWER
// ════════════════════════════════════════ */
// function CartDrawer({ open, onClose, cart, removeFromCart, onEnrolled }) {
//   const [coupon, setCoupon]               = useState("");
//   const [couponApplied, setCouponApplied] = useState(null);
//   const [couponLoading, setCouponLoading] = useState(false);
//   const [couponError, setCouponError]     = useState("");
//   const [paying, setPaying]               = useState(false);

//   const subtotal = cart.reduce((a, c) => a + (c.isFree ? 0 : c.price), 0);
//   const discount = couponApplied
//     ? couponApplied.type === "percent"
//       ? Math.round((subtotal * couponApplied.value) / 100)
//       : Math.min(couponApplied.value, subtotal)
//     : 0;
//   const total = Math.max(0, subtotal - discount);

//   const applyCoupon = async () => {
//     if (!coupon.trim()) return;
//     setCouponLoading(true); setCouponError("");
//     try {
//       const paidCourse = cart.find((c) => !c.isFree);
//       if (!paidCourse) { setCouponError("No paid courses in cart"); setCouponLoading(false); return; }
//       const token = localStorage.getItem("studentToken");
//       const res   = await fetch("/api/courses/enroll", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ courseId: paidCourse._id, couponCode: coupon }),
//       });
//       const data = await res.json();
//       if (data.success && data.type === "paid") {
//         setCouponApplied({ code: data.couponCode, discount: data.discount, type: "flat", value: data.discount });
//       } else if (data.success && data.type === "free") {
//         setCouponApplied({ code: coupon.toUpperCase(), discount: subtotal, type: "flat", value: subtotal });
//       } else { setCouponError(data.error || "Invalid coupon"); setCouponApplied(null); }
//     } catch { setCouponError("Network error"); }
//     setCouponLoading(false);
//   };

//   const removeCoupon = () => { setCouponApplied(null); setCoupon(""); setCouponError(""); };

//   const handleCheckout = async () => {
//     if (cart.length === 0) return;
//     setPaying(true);
//     const freeItems = cart.filter((c) => c.isFree);
//     const paidItems = cart.filter((c) => !c.isFree);
//     const token = localStorage.getItem("studentToken");
//     for (const c of freeItems) {
//       await fetch("/api/courses/enroll", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ courseId: c._id }),
//       });
//     }
//     if (paidItems.length === 0 || total === 0) { onEnrolled(); setPaying(false); return; }
//     for (const course of paidItems) {
//       await checkoutCourse(course._id, couponApplied?.code || "", discount, total);
//     }
//     setPaying(false);
//   };

//   const checkoutCourse = (courseId, couponCode, discountAmt, amount) =>
//     new Promise(async (resolve) => {
//       const token = localStorage.getItem("studentToken");
//       const oRes  = await fetch("/api/courses/payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ courseId, couponCode }),
//       });
//       const oData = await oRes.json();
//       if (!oData.success) { alert(oData.error || "Payment init failed"); resolve(); return; }
//       const options = {
//         key: oData.keyId, amount: oData.amount * 100, currency: "INR",
//         name: "SS Coaching", description: oData.courseName, order_id: oData.orderId,
//         prefill: { contact: JSON.parse(localStorage.getItem("studentInfo") || "{}").phone || "" },
//         theme: { color: "#6c47d4" },
//         handler: async (response) => {
//           const vRes = await fetch("/api/courses/verify-payment", {
//             method: "POST",
//             headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//             body: JSON.stringify({ ...response, courseId, couponCode, discount: discountAmt, amount: oData.amount }),
//           });
//           const vData = await vRes.json();
//           if (vData.success) { onEnrolled(); resolve(); }
//           else { alert("Payment failed: " + (vData.error || "Unknown error")); resolve(); }
//         },
//         modal: { ondismiss: resolve },
//       };
//       if (typeof window !== "undefined" && window.Razorpay) { new window.Razorpay(options).open(); }
//       else { alert("Payment gateway not loaded. Please refresh."); resolve(); }
//     });

//   return (
//     <div className={`sdc-cart-drawer ${open ? "sdc-cart-open" : ""}`}>
//       <div className="sdc-cart-header">
//         <div className="sdc-cart-title">
//           <MdShoppingCart size={20} /> My Cart
//           {cart.length > 0 && <span className="sdc-cart-badge">{cart.length}</span>}
//         </div>
//         <button className="sdc-cart-close" onClick={onClose}><MdClose size={22} /></button>
//       </div>
//       {cart.length === 0 ? (
//         <div className="sdc-cart-empty">
//           <MdShoppingCart size={52} className="sdc-cart-empty-icon" />
//           <div>Your cart is empty</div>
//           <p>Add a course to get started!</p>
//         </div>
//       ) : (
//         <>
//           <div className="sdc-cart-items">
//             {cart.map((course) => (
//               <div key={course._id} className="sdc-cart-item">
//                 <div className="sdc-cart-item-thumb" style={{
//                   background: course.featureImage
//                     ? `url(${course.featureImage}) center/cover no-repeat`
//                     : `linear-gradient(135deg,${getSubjectColor(course.subject)}33,${getSubjectColor(course.subject)}66)`,
//                 }}>
//                   {!course.featureImage && <span style={{ fontSize: 18 }}>{subjectIcons[course.subject] || "📚"}</span>}
//                 </div>
//                 <div className="sdc-cart-item-info">
//                   <div className="sdc-cart-item-title">{course.title}</div>
//                   <div className="sdc-cart-item-sub">{course.subject} • {course.batch}</div>
//                   <div className="sdc-cart-item-price">
//                     {course.isFree ? <span className="sdc-free-tag">FREE</span> : <span><FaRupeeSign size={11} />{course.price}</span>}
//                   </div>
//                 </div>
//                 <button className="sdc-cart-remove" onClick={() => removeFromCart(course._id)}><MdDelete size={17} /></button>
//               </div>
//             ))}
//           </div>
//           <div className="sdc-coupon-wrap">
//             <div className="sdc-coupon-title"><MdLocalOffer size={14} /> Have a coupon code?</div>
//             {couponApplied ? (
//               <div className="sdc-coupon-applied">
//                 <MdCheck size={15} color="#10b981" />
//                 <span><strong>{couponApplied.code}</strong> — ₹{discount} off!</span>
//                 <button className="sdc-coupon-remove" onClick={removeCoupon}><MdClose size={14} /></button>
//               </div>
//             ) : (
//               <div className="sdc-coupon-row">
//                 <input className="sdc-coupon-input" placeholder="COUPON CODE"
//                   value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())}
//                   onKeyDown={(e) => e.key === "Enter" && applyCoupon()} />
//                 <button className="sdc-coupon-btn" onClick={applyCoupon} disabled={couponLoading}>
//                   {couponLoading ? "..." : "Apply"}
//                 </button>
//               </div>
//             )}
//             {couponError && <div className="sdc-coupon-error">{couponError}</div>}
//           </div>
//           <div className="sdc-summary">
//             <div className="sdc-summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
//             {couponApplied && (
//               <div className="sdc-summary-row sdc-summary-discount">
//                 <span>Discount ({couponApplied.code})</span><span>−₹{discount}</span>
//               </div>
//             )}
//             <div className="sdc-summary-row sdc-summary-total">
//               <span>Total</span>
//               <span>{total === 0 ? <span style={{ color: "#10b981", fontWeight: 800 }}>FREE 🎉</span> : `₹${total}`}</span>
//             </div>
//           </div>
//           <button className="sdc-checkout-btn" onClick={handleCheckout} disabled={paying}>
//             {paying ? "Processing..." : total === 0
//               ? <><MdCheck size={18} /> Enroll Now — Free!</>
//               : <><MdLock size={15} /> Pay ₹{total} Securely</>
//             }
//           </button>
//           <div className="sdc-secure-note"><MdLock size={11} /> Secured by Razorpay &nbsp;•&nbsp; UPI, Cards, NetBanking</div>
//         </>
//       )}
//     </div>
//   );
// }

// /* ════════════════════════════════════════
//    PROFILE SECTION — unchanged
// ════════════════════════════════════════ */
// function ProfileSection({ student, setStudent }) {
//   const [saving, setSaving]         = useState(false);
//   const [form, setForm]             = useState({ name: student.name || "", className: student.className || "", batch: student.batch || "" });
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg]     = useState("");
//   const [hasChanges, setHasChanges] = useState(false);

//   useEffect(() => {
//     const changed = form.name !== (student.name || "") || form.className !== (student.className || "") || form.batch !== (student.batch || "");
//     setHasChanges(changed);
//   }, [form, student]);

//   const handleSave = async () => {
//     setErrorMsg(""); setSuccessMsg("");
//     if (!form.name.trim()) { setErrorMsg("Name is required"); return; }
//     if (!form.className)   { setErrorMsg("Class is required"); return; }
//     setSaving(true);
//     try {
//       const token = localStorage.getItem("studentToken");
//       const res   = await fetch("/api/student/update-profile", {
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
//       } else { setErrorMsg(data.message || "Failed to update"); }
//     } catch { setErrorMsg("Server error. Please try again."); }
//     setSaving(false);
//   };

//   const handleReset = () => { setForm({ name: student.name || "", className: student.className || "", batch: student.batch || "" }); setErrorMsg(""); setSuccessMsg(""); };

//   return (
//     <div className="sp-wrapper">
//       <div className="sp-two-col">
//         <div className="sp-left-col">
//           <div className="sp-avatar-card">
//             <div className="sp-avatar-bg"></div>
//             <div className="sp-avatar-content">
//               <div className="sp-big-avatar">{student.name ? student.name.charAt(0).toUpperCase() : "S"}</div>
//               <div className="sp-display-name">{student.name || "Student"}</div>
//               <div className="sp-display-phone">+91 {student.phone}</div>
//               <div className="sp-badges-row">
//                 {student.className && <span className="sp-class-badge">{student.className}</span>}
//                 {student.batch     && <span className="sp-batch-badge">{student.batch}</span>}
//               </div>
//             </div>
//           </div>
//           <div className="sp-summary-card">
//             <div className="sp-summary-title">Account Info</div>
//             <div className="sp-summary-row"><MdPerson size={15} className="sp-summary-icon" /><div><div className="sp-summary-label">Full Name</div><div className="sp-summary-value">{student.name || "—"}</div></div></div>
//             <div className="sp-summary-row"><MdPhone size={15} className="sp-summary-icon" /><div><div className="sp-summary-label">Mobile</div><div className="sp-summary-value">+91 {student.phone}</div></div></div>
//             <div className="sp-summary-row"><MdSchool size={15} className="sp-summary-icon" /><div><div className="sp-summary-label">Class</div><div className="sp-summary-value">{student.className || "—"}</div></div></div>
//             <div className="sp-summary-row"><FaGraduationCap size={14} className="sp-summary-icon" /><div><div className="sp-summary-label">Batch</div><div className="sp-summary-value">{student.batch || "—"}</div></div></div>
//           </div>
//         </div>
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
//                 <input type="text" className="sp-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
//               </div>
//               <div className="sp-field">
//                 <label className="sp-label">Mobile Number</label>
//                 <input type="text" className="sp-input sp-input-disabled" value={`+91 ${student.phone}`} disabled />
//                 <div className="sp-hint">📵 Phone number cannot be changed</div>
//               </div>
//               <div className="sp-field">
//                 <label className="sp-label">Class <span className="sp-req">*</span></label>
//                 <select className="sp-input" value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })}>
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
//                 <input type="text" className="sp-input" value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })} placeholder="e.g. Morning Batch / Evening Batch" />
//               </div>
//             </div>
//             <div className="sp-form-actions">
//               <button className="sp-reset-btn" onClick={handleReset} disabled={!hasChanges || saving}><MdClose size={15} /> Reset</button>
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

// /* ════════════════════════════════════════
//    CLASS CARD — unchanged
// ════════════════════════════════════════ */
// function ClassCard({ cls, formatDate, formatTime, getYoutubeId }) {
//   const [watching, setWatching] = useState(false);
//   const ytId = getYoutubeId(cls.streamLink);
//   const statusConfig = {
//     live:      { label: "Live Now",  cls: "sd-badge-live" },
//     upcoming:  { label: "Upcoming",  cls: "sd-badge-upcoming" },
//     completed: { label: "Completed", cls: "sd-badge-completed" },
//   };
//   const { label, cls: badgeCls } = statusConfig[cls.status] || statusConfig.upcoming;
//   const noteColors = { notes: "#6c47d4", assignment: "#d97706", solution: "#059669", other: "#6b7280" };

//   return (
//     <div className={`sd-class-card ${cls.status === "live" ? "sd-card-live" : ""}`}>
//       {cls.status === "live" && ytId && (
//         watching ? (
//           <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000" }}>
//             <iframe src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
//               style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
//               allowFullScreen allow="autoplay; encrypted-media" />
//           </div>
//         ) : (
//           <div onClick={() => setWatching(true)} style={{ position: "relative", height: 180, background: "#000", cursor: "pointer", overflow: "hidden" }}>
//             <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={cls.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//             <div className="sd-live-overlay"><span className="sd-live-dot-sm"></span> LIVE</div>
//             <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
//               <MdPlayCircle size={56} color="#fff" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))" }} />
//             </div>
//           </div>
//         )
//       )}
//       {cls.status === "completed" && ytId && (
//         <div style={{ height: 180, background: "#000", overflow: "hidden" }}>
//           <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={cls.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//         </div>
//       )}
//       {cls.status === "upcoming" && ytId && (
//         <div style={{ height: 180, background: "#1a1f4b", overflow: "hidden", position: "relative" }}>
//           <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={cls.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
//           <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 600 }}>Not started yet</div>
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
//         {cls.notes && cls.notes.length > 0 && (
//           <div className="sd-notes-section">
//             <div className="sd-notes-title">📎 Study Materials</div>
//             <div className="sd-notes-list">
//               {cls.notes.map((note) => (
//                 <a key={note._id} href={note.driveLink} target="_blank" rel="noopener noreferrer" className="sd-note-btn">
//                   <div className="sd-note-btn-left">
//                     <div className="sd-note-type-dot" style={{ background: noteColors[note.type] || "#6b7280" }} />
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



