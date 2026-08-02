import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  MdDashboard, MdLiveTv, MdCalendarToday, MdCheckCircle,
  MdLogout, MdMenu, MdPlayCircle, MdPauseCircle, MdNotifications,
  MdVolumeUp, MdVolumeOff, MdFullscreen, MdFullscreenExit,
  MdFastRewind, MdFastForward, MdSettings,
  MdSchool, MdAccessTime, MdDateRange, MdTimelapse, MdVideoLibrary,
  MdSignalCellularAlt, MdPerson, MdEdit, MdSave, MdClose, MdPhone,
  MdShoppingCart, MdDelete, MdLocalOffer, MdLock, MdCheck, MdSearch,
  MdFolder, MdArrowBack, MdExpandMore, MdExpandLess, MdOndemandVideo,
  MdAttachFile, MdArrowForward, MdReceipt, MdDownload, MdOpenInNew,
  MdPayment, MdFavorite, MdFavoriteBorder,
  MdMenuBook, MdAssignment, MdArticle, MdStickyNote2, MdInventory2,
  MdViewList, MdChevronRight,
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
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen]         = useState(false);
  const [activeCourse, setActiveCourse]   = useState(null);
  const [detailCourseId, setDetailCourseId] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = async (courseId) => {
    const token = localStorage.getItem("studentToken");
    if (!token) return;
    const already = wishlist.includes(courseId);
    // Optimistic update
    setWishlist(prev => already ? prev.filter(id => id !== courseId) : [...prev, courseId]);
    if (already) toast.info("Removed from wishlist", { icon: "💔" });
    else toast.success("Added to wishlist!", { icon: "❤️" });
    try {
      await fetch("/api/student/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId }),
      });
    } catch {
      setWishlist(prev => already ? [...prev, courseId] : prev.filter(id => id !== courseId));
    }
  };

  /* ── Auth + init ── */
  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    const info  = localStorage.getItem("studentInfo");
    if (!token || !info) { router.push("/student/login"); return; }

    // Load cached data instantly (normalize class→className for Edit Profile form)
    const cached = JSON.parse(info);
    const normalizeStu = (s) => ({ ...s, className: s.className || s.class || "" });
    setStudent(normalizeStu(cached));

    // Fetch fresh from server so app edits reflect on web immediately
    fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => {
        if (d.success && d.user) {
          const fresh = normalizeStu(d.user);
          localStorage.setItem("studentInfo", JSON.stringify(fresh));
          setStudent(fresh);
        }
      })
      .catch(() => {});

    fetchClasses(token);
    fetchCourses(token);
    // Load wishlist + cart from DB
    const headers = { Authorization: `Bearer ${token}` };
    fetch("/api/student/wishlist", { headers })
      .then(r => r.json()).then(d => { if (d.success) setWishlist(d.wishlist || []); }).catch(() => {});
    fetch("/api/student/cart", { headers })
      .then(r => r.json()).then(d => {
        if (d.success) {
          // cart IDs — will be matched against courses once courses load
          localStorage.setItem("ss_cart_ids", JSON.stringify(d.cart || []));
        }
      }).catch(() => {});
  }, []);

  /* ── Restore active tab + course from URL on load / refresh ── */
  useEffect(() => {
    if (!router.isReady) return;
    const { tab, courseId, detailId } = router.query;
    if (tab) setActiveMenu(tab);
    if (courseId) setActiveCourse(courseId);
    if (detailId) setDetailCourseId(detailId);
  }, [router.isReady, router.query.tab, router.query.courseId, router.query.detailId]);

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
      if (data.success) {
        setCourses(data.courses);
        // Reconcile cart: match saved cart IDs with fetched courses
        try {
          const cartIds = JSON.parse(localStorage.getItem("ss_cart_ids") || "[]");
          if (cartIds.length > 0) {
            const matched = data.courses.filter(c => cartIds.includes(c._id));
            setCart(matched);
          }
        } catch {}
      }
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

  const addToCart = async (course) => {
    if (cart.find((c) => c._id === course._id)) { setCartOpen(true); return; }
    // Optimistic update
    const next = [...cart, course];
    setCart(next);
    localStorage.setItem("ss_cart_ids", JSON.stringify(next.map(c => c._id)));
    setCartOpen(true);
    const token = localStorage.getItem("studentToken");
    try {
      await fetch("/api/student/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId: course._id }),
      });
    } catch {}
  };

  const removeFromCart = async (id) => {
    const next = cart.filter((c) => c._id !== id);
    setCart(next);
    localStorage.setItem("ss_cart_ids", JSON.stringify(next.map(c => c._id)));
    const token = localStorage.getItem("studentToken");
    try {
      await fetch("/api/student/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ courseId: id }),
      });
    } catch {}
  };
  const enrolledCourses = courses.filter((c) => c.isEnrolled);
  const navigate = (menu) => {
    setActiveMenu(menu);
    setSidebarOpen(false);
    setActiveCourse(null);
    setDetailCourseId(null);
    router.replace({ pathname: "/student/dashboard", query: { tab: menu } }, undefined, { shallow: true });
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
              {student.avatar
                ? <img src={student.avatar} alt="avatar" style={{width:32,height:32,borderRadius:"50%",objectFit:"cover",border:"2px solid rgba(255,255,255,0.4)"}}/>
                : <div className="sd-user-pill-av">{student.name ? student.name.charAt(0).toUpperCase() : "S"}</div>
              }
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
              {student.avatar
                ? <img src={student.avatar} alt="avatar" style={{width:36,height:36,borderRadius:"50%",objectFit:"cover",border:"2px solid #ede9fe",flexShrink:0}}/>
                : <div className="sd-profile-chip-av">{student.name ? student.name.charAt(0).toUpperCase() : "S"}</div>
              }
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
                                    {totalLessons} Topics
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
                onOpenCourse={(id) => {
                  setActiveCourse(id);
                  router.replace({ pathname: router.pathname, query: { tab:"courses", courseId:id } }, undefined, { shallow:true });
                }}
                wishlist={wishlist} toggleWishlist={toggleWishlist}
                openDetail={(id) => {
                  setDetailCourseId(id);
                  router.replace({ pathname: router.pathname, query: { tab:"courses", detailId:id } }, undefined, { shallow:true });
                }}
              />
            )}

            {/* COURSES — detail page */}
            {activeMenu === "courses" && !activeCourse && detailCourseId && (
              <CourseDetailPage
                courseId={detailCourseId}
                cart={cart}
                addToCart={addToCart}
                onEnrolled={() => {
                  fetchCourses(localStorage.getItem("studentToken"));
                  setDetailCourseId(null);
                  router.replace({ pathname: router.pathname, query: { tab:"courses" } }, undefined, { shallow:true });
                }}
                onBack={() => {
                  setDetailCourseId(null);
                  router.replace({ pathname: router.pathname, query: { tab:"courses" } }, undefined, { shallow:true });
                }}
                onOpenPlayer={(id) => {
                  setActiveCourse(id); setDetailCourseId(null);
                  router.replace({ pathname: router.pathname, query: { tab:"courses", courseId:id } }, undefined, { shallow:true });
                }}
              />
            )}

            {/* COURSES — player */}
            {activeMenu === "courses" && activeCourse && (
              <CoursePlayer courseId={activeCourse} onBack={() => {
                setActiveCourse(null);
                router.replace({ pathname: router.pathname, query: { tab:"courses" } }, undefined, { shallow:true });
              }}/>
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
                        onOpen={() => {
                          setActiveCourse(course._id); setActiveMenu("courses");
                          router.replace({ pathname: router.pathname, query: { tab:"courses", courseId:course._id } }, undefined, { shallow:true });
                        }}
                        wishlist={wishlist} toggleWishlist={toggleWishlist}
                        openDetail={(id) => {
                          setDetailCourseId(id); setActiveMenu("courses");
                          router.replace({ pathname: router.pathname, query: { tab:"courses", detailId:id } }, undefined, { shallow:true });
                        }}
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
                  {liveClasses.length === 0 ? (
                    <div style={{gridColumn:"1/-1",textAlign:"center",padding:"60px 20px",color:"#9ca3af"}}>
                      <div style={{fontSize:40,marginBottom:12}}>📡</div>
                      <div style={{fontWeight:600,fontSize:16}}>No live classes right now</div>
                    </div>
                  ) : liveClasses.map((cls) => (
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
                  {upcomingClasses.length === 0 ? (
                    <div style={{gridColumn:"1/-1",textAlign:"center",padding:"60px 20px",color:"#9ca3af"}}>
                      <div style={{fontSize:40,marginBottom:12}}>📅</div>
                      <div style={{fontWeight:600,fontSize:16}}>No upcoming classes</div>
                    </div>
                  ) : upcomingClasses.map((cls) => (
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
            const token = localStorage.getItem("studentToken");
            fetchCourses(token);
            setCart([]);
            localStorage.removeItem("ss_cart_ids");
            // Clear cart in DB too
            fetch("/api/student/cart", {
              method: "DELETE",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify({}),
            }).catch(() => {});
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

      {/* Invoices table */}
      {invoices.length === 0 ? (
        <div style={{textAlign:"center",padding:"60px 20px",color:"#9ca3af"}}>
          <div style={{fontSize:40,marginBottom:12}}>🧾</div>
          <div style={{fontWeight:600,fontSize:16,marginBottom:6}}>No invoices yet</div>
          <div style={{fontSize:14}}>Your course purchase invoices will appear here.</div>
        </div>
      ) : (
        <div className="sdinv-wrap">
          <div className="sdinv-head">
            <span>Invoice</span>
            <span>Date</span>
            <span>Payment</span>
            <span>Amount</span>
            <span></span>
          </div>
          {invoices.map((inv) => {
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
                    <button className="sdinv-icon-btn" title="Download PDF" onClick={() => downloadPdf(inv)}><MdDownload size={16}/></button>
                    <button className="sdinv-icon-btn" title="View Details" onClick={() => setSelected(inv)}><MdOpenInNew size={15}/></button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
    if (filter === "enrolled" && !c.isEnrolled)          return false;
    if (filter === "free"     && !c.isFree)              return false;
    if (filter === "paid"     && c.isFree)               return false;
    if (filter === "bundle"   && c.courseType !== "bundle") return false;
    if (subject && c.subject !== subject)                return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) &&
        !(c.subject||"").toLowerCase().includes(search.toLowerCase()) &&
        !(c.bundledSubjects||[]).some(s => s.toLowerCase().includes(search.toLowerCase()))) return false;
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
          {[
            {val:"all",label:"All courses"},
            {val:"bundle",label:"📦 Full Bundles"},
            {val:"free",label:"Free"},
            {val:"paid",label:"Paid"},
            {val:"enrolled",label:"My Courses"},
          ].map((f) => (
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
  const isBundle = course.courseType === "bundle";
  const bundledSubs = course.bundledSubjects || [];
  const SUBJ_COLORS = ["#6c47d4","#f59e0b","#0ea5e9","#10b981","#f43f5e","#8b5cf6","#06b6d4","#84cc16","#f97316","#ec4899","#14b8a6","#a855f7","#ef4444"];

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
        {isBundle ? (
          /* Bundle card meta */
          <div>
            <div className="sdc-card-meta" style={{marginBottom:6}}>
              <div className="sdc-meta-left">
                <span style={{background:"#fff7ed",color:"#f59e0b",fontWeight:700,fontSize:11,padding:"2px 8px",borderRadius:20,border:"1px solid #fde68a"}}>📦 BUNDLE</span>
                <span style={{fontSize:11,color:"#6b7280",fontWeight:600,marginLeft:4}}>{bundledSubs.length} Subjects</span>
              </div>
              <div className="sdc-meta-right">
                {course.batch && <span className="sdc-tag-cls-pill">{course.batch.toUpperCase()}</span>}
              </div>
            </div>
            {/* Subject pills — max 4 visible */}
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:6}}>
              {bundledSubs.slice(0,4).map((s,i) => (
                <span key={s} style={{fontSize:10,fontWeight:600,color:SUBJ_COLORS[i%SUBJ_COLORS.length],background:`${SUBJ_COLORS[i%SUBJ_COLORS.length]}15`,padding:"2px 7px",borderRadius:10}}>
                  {s}
                </span>
              ))}
              {bundledSubs.length > 4 && (
                <span style={{fontSize:10,color:"#9ca3af",fontWeight:600,padding:"2px 7px"}}>+{bundledSubs.length-4} more</span>
              )}
            </div>
          </div>
        ) : (
          /* Subject course meta */
          <div className="sdc-card-meta">
            <div className="sdc-meta-left">
              <span className="sdc-meta-item">
                <img src="/assets/images/online-classes/icons/chapter.svg" alt="" className="sdc-meta-icon"/>
                {course.chapters?.length||0} Chapters
              </span>
              <span className="sdc-meta-item">
                <img src="/assets/images/online-classes/icons/lesson.svg" alt="" className="sdc-meta-icon"/>
                {totalLessons} Topics
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
        )}
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
  const [showDemo, setShowDemo]     = useState(false);

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

  const isBundle     = course.courseType === "bundle";
  const inCart       = cart?.find((c) => c._id === course._id);
  const totalLessons = course.chapters?.reduce((a,c) => a + c.lessons.length, 0) || 0;
  const thumbClass   = getSubjectThumbClass(course.subject);
  const subjectColor = getSubjectColor(course.subject);
  const hasImg       = !!course.featureImage;
  const bundledSubs  = course.bundledSubjects || [];

  const demoLesson    = course.chapters?.[0]?.lessons?.[0];
  const getDemoYtId   = (url) => {
    if (!url) return null;
    const pats = [/youtube\.com\/watch\?v=([^&]+)/,/youtu\.be\/([^?]+)/,/youtube\.com\/embed\/([^?]+)/,/youtube\.com\/live\/([^?]+)/];
    for (const p of pats) { const m = url.match(p); if (m) return m[1]; }
    return null;
  };
  const demoYtId      = demoLesson?.videoType==="youtube" ? getDemoYtId(demoLesson.youtubeLink) : null;
  const hasDemoVideo  = !!(demoLesson && ((demoLesson.videoType==="youtube" && demoLesson.youtubeLink) || ((demoLesson.videoType==="custom"||demoLesson.videoType==="bunny") && demoLesson.videoUrl)));

  // Count total materials across all sections
  const matSections  = ["books","tma","assignments","samplePapers","notes"];
  const matLabels    = { books:"Books", tma:"TMA", assignments:"Assignments", samplePapers:"Sample Papers", notes:"Notes" };
  const matIcons     = { books:"📚", tma:"📝", assignments:"📋", samplePapers:"📄", notes:"🗒️" };
  const totalMats    = matSections.reduce((a,k) => a + (course.materials?.[k]?.length||0), 0);

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

  const INCLUDED_SUBJECT = [
    "Live Video Classes","Chapter-wise Study Notes",
    "TMA & Practice Tests","Sample Papers (Previous Year)",
    "Assignments & Worksheets","1:1 Doubt Support",
    "Student Performance Dashboard","Online & Offline Tests",
  ];
  const INCLUDED_BUNDLE = [
    `All ${bundledSubs.length} Subjects Covered`,"Live Classes For Every Subject",
    "Books, Notes & Study Material","TMA, Assignments & Sample Papers",
    "1:1 Live Doubt Support (48Hrs/Week)","Student Performance Dashboard & Insights",
    "Premium SS Coaching Content","Online & Offline Tests",
  ];
  const INCLUDED = isBundle ? INCLUDED_BUNDLE : INCLUDED_SUBJECT;

  const SUBJ_COLORS = ["#6c47d4","#f59e0b","#0ea5e9","#10b981","#f43f5e","#8b5cf6","#06b6d4","#84cc16","#f97316","#ec4899","#14b8a6","#a855f7","#ef4444"];

  return (
    <div className="cdp-wrapper">
      <button className="scp-back-btn" onClick={onBack} style={{marginBottom:20}}><MdArrowBack size={18}/> Back to Courses</button>

      {/* Bundle banner */}
      {isBundle && (
        <div style={{background:"linear-gradient(135deg,#EFEFFF,#e8e4ff)",border:"2px solid #c5b8f8",borderRadius:16,padding:"16px 24px",marginBottom:20,display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:28}}>📦</span>
          <div>
            <div style={{fontWeight:800,fontSize:16,color:"#4c1d95"}}>Complete Bundle Course</div>
            <div style={{fontSize:13,color:"#5b21b6",marginTop:2}}>Includes all {bundledSubs.length} subjects — Live classes unlocked automatically for all subjects</div>
          </div>
        </div>
      )}

      <div className="cdp-body">
        {/* ── LEFT ── */}
        <div className="cdp-left">
          <div className="cdp-header">
            <h1 className="cdp-title">{course.title}</h1>
            <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginTop:6}}>
              {isBundle && <span style={{background:"#702dff",color:"white",fontWeight:800,fontSize:11,padding:"3px 10px",borderRadius:20}}>📦 BUNDLE</span>}
              {(course.batch||course.className) && <p className="cdp-class-tag" style={{margin:0}}>{(course.batch||course.className).toUpperCase()}</p>}
              {!isBundle && course.subject && <span style={{background:`${subjectColor}22`,color:subjectColor,fontWeight:700,fontSize:12,padding:"3px 10px",borderRadius:20}}>{course.subject}</span>}
            </div>
          </div>

          {/* Details box */}
          <div className="cdp-details-box">
            <h2>Course Details</h2>
            <div className="cdp-details-row">
              {isBundle ? (
                <>
                  <div className="cdp-detail-item"><small>Subjects</small><b>{bundledSubs.length} Subjects</b></div>
                  <div className="cdp-detail-item"><small>BUNDLE FEE</small><b>₹{course.price?.toLocaleString("en-IN")||"—"}</b></div>
                  <div className="cdp-detail-item"><small>Study Materials</small><b>{totalMats > 0 ? `${totalMats} Files` : "Included"}</b></div>
                </>
              ) : (
                <>
                  <div className="cdp-detail-item"><small>Topics covered</small><b>{totalLessons} Topics</b></div>
                  <div className="cdp-detail-item"><small>BATCH FEE</small><b>₹{course.price?.toLocaleString("en-IN")||"—"}</b></div>
                  <div className="cdp-detail-item"><small>Duration</small><b>{course.duration||"Self-paced"}</b></div>
                </>
              )}
            </div>
          </div>

          {/* Bundle: Included subjects */}
          {isBundle && bundledSubs.length > 0 && (
            <div className="cdp-content-box" style={{background:"#EFEFFF",border:"1.5px solid #c5b8f8"}}>
              <h2 className="cdp-content-title" style={{color:"#4c1d95"}}>📚 Subjects Included in this Bundle</h2>
              <div style={{display:"flex",flexWrap:"wrap",gap:10,marginTop:12}}>
                {bundledSubs.map((sub,i) => (
                  <div key={sub} style={{display:"flex",alignItems:"center",gap:8,background:"white",border:`2px solid ${SUBJ_COLORS[i%SUBJ_COLORS.length]}30`,borderRadius:12,padding:"8px 16px",boxShadow:"0 1px 3px rgba(0,0,0,0.06)"}}>
                    <span style={{width:10,height:10,borderRadius:"50%",background:SUBJ_COLORS[i%SUBJ_COLORS.length],flexShrink:0,display:"inline-block"}}/>
                    <span style={{fontWeight:700,fontSize:14,color:"#374151"}}>{sub}</span>
                  </div>
                ))}
              </div>
              <div style={{marginTop:14,padding:"10px 14px",background:"#f0fdf4",borderRadius:10,fontSize:13,color:"#166534",fontWeight:600}}>
                ✓ Purchasing this bundle unlocks Live Classes for ALL subjects automatically
              </div>
            </div>
          )}

          {/* Bundle: Subject-wise material preview */}
          {isBundle && totalMats > 0 && (
            <div className="cdp-content-box">
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
                <h2 className="cdp-content-title" style={{margin:0}}>📁 Study Materials — Subject Wise</h2>
                <span style={{fontSize:12,color:"#6c47d4",fontWeight:700,background:"#ede9fe",padding:"3px 10px",borderRadius:20}}>{totalMats} Total Files</span>
              </div>
              {bundledSubs.map((sub, si) => {
                const subMats = matSections.flatMap(k =>
                  (course.materials?.[k]||[])
                    .filter(m => m.title.startsWith(`${sub} | `))
                    .map(m => ({ ...m, secKey: k, icon: matIcons[k], label: matLabels[k] }))
                );
                if (subMats.length === 0) return null;
                const color = SUBJ_COLORS[si % SUBJ_COLORS.length];
                return (
                  <div key={sub} style={{marginBottom:16,border:`1.5px solid ${color}30`,borderRadius:14,overflow:"hidden"}}>
                    {/* Subject header */}
                    <div style={{background:`${color}12`,padding:"10px 16px",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${color}20`}}>
                      <span style={{width:10,height:10,borderRadius:"50%",background:color,flexShrink:0,display:"inline-block"}}/>
                      <span style={{fontWeight:800,fontSize:14,color:"#1f2937"}}>{sub}</span>
                      <span style={{fontSize:11,color:color,fontWeight:600,background:`${color}15`,padding:"1px 8px",borderRadius:12,marginLeft:"auto"}}>{subMats.length} file{subMats.length>1?"s":""}</span>
                    </div>
                    {/* File rows */}
                    <div style={{padding:"10px 14px",display:"flex",flexDirection:"column",gap:8,background:"white"}}>
                      {subMats.map((mat) => {
                        const displayTitle = mat.title.replace(`${sub} | `,"");
                        return (
                          <div key={mat._id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",background:"#fafafa",border:"1.5px solid #e5e7eb",borderRadius:10,position:"relative",overflow:"hidden"}}>
                            {/* File icon */}
                            <div style={{width:38,height:46,background:`${color}15`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:`1px solid ${color}25`}}>
                              <span style={{fontSize:20}}>{mat.icon}</span>
                            </div>
                            <div style={{flex:1,minWidth:0}}>
                              <div style={{fontWeight:700,fontSize:13,color:"#111827",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{displayTitle}</div>
                              <div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{mat.label}</div>
                            </div>
                            {course.isEnrolled ? (
                              <a href={mat.fileUrl} target="_blank" rel="noreferrer"
                                style={{flexShrink:0,padding:"6px 14px",background:color,color:"white",borderRadius:8,fontSize:12,fontWeight:700,textDecoration:"none"}}
                                onClick={e=>e.stopPropagation()}>
                                View ↗
                              </a>
                            ) : (
                              <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                                <div style={{width:32,height:32,background:"#f3f4f6",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",border:"1.5px solid #e5e7eb"}}>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                  </svg>
                                </div>
                                <span style={{fontSize:9,color:"#9ca3af",fontWeight:600}}>LOCKED</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {!course.isEnrolled && (
                <div style={{textAlign:"center",padding:"12px 16px",background:"#f8f7ff",border:"1.5px dashed #c4b5fd",borderRadius:12,marginTop:4}}>
                  <span style={{fontSize:16}}>🔒</span>
                  <div style={{fontWeight:700,fontSize:13,color:"#6c47d4",marginTop:4}}>Enroll to unlock all study materials</div>
                  <div style={{fontSize:12,color:"#9ca3af",marginTop:2}}>Books · TMA · Assignments · Sample Papers · Notes</div>
                </div>
              )}
            </div>
          )}

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

          {/* Subject course: Course Content chapters */}
          {!isBundle && (
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
                  {totalLessons} Topics
                </span>
              </div>
              {course.chapters?.map((ch,ci) => (
                <div key={ch._id||ci} className={`cdp-chapter ${openChapters[ci] ? "cdp-chapter-open" : ""}`}>
                  <button className="cdp-chapter-hd" onClick={() => setOpenChapters(p=>({...p,[ci]:!p[ci]}))}>
                    <span className="cdp-chapter-title-row">
                      <span className="cdp-chapter-num">{ci+1}</span>
                      <span className="cdp-chapter-title-txt">{ch.title}</span>
                    </span>
                    <span className="cdp-chapter-right">
                      <span className="cdp-chapter-count">{ch.lessons.length} Lectures</span>
                      <span className="cdp-chapter-chevron"><MdExpandMore size={16}/></span>
                    </span>
                  </button>
                  {openChapters[ci] && (
                    <div className="cdp-lessons">
                      {ch.lessons.map((les,li) => (
                        <div key={les._id||li} className="cdp-lesson-row">
                          <span className="cdp-lesson-icon-wrap"><MdPlayCircle size={14}/></span>
                          <span className="cdp-lesson-name">{les.title}</span>
                          {les.duration && <span className="cdp-lesson-dur">{les.duration}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Subject course: material preview */}
          {!isBundle && totalMats > 0 && (
            <div className="cdp-content-box">
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <h2 className="cdp-content-title" style={{margin:0}}>📁 Study Materials</h2>
                <span style={{fontSize:12,color:"#6c47d4",fontWeight:700,background:"#ede9fe",padding:"3px 10px",borderRadius:20}}>{totalMats} Files</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {matSections.flatMap(k =>
                  (course.materials?.[k]||[]).map(mat => ({...mat, secKey:k, icon:matIcons[k], label:matLabels[k]}))
                ).map((mat) => (
                  <div key={mat._id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",background:"#fafafa",border:"1.5px solid #e5e7eb",borderRadius:10}}>
                    <div style={{width:38,height:46,background:"#ede9fe",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontSize:20}}>{mat.icon}</span>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:700,fontSize:13,color:"#111827",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{mat.title}</div>
                      <div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{mat.label}</div>
                    </div>
                    {course.isEnrolled ? (
                      <a href={mat.fileUrl} target="_blank" rel="noreferrer"
                        style={{flexShrink:0,padding:"6px 14px",background:"#6c47d4",color:"white",borderRadius:8,fontSize:12,fontWeight:700,textDecoration:"none"}}
                        onClick={e=>e.stopPropagation()}>
                        View ↗
                      </a>
                    ) : (
                      <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                        <div style={{width:32,height:32,background:"#f3f4f6",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",border:"1.5px solid #e5e7eb"}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                          </svg>
                        </div>
                        <span style={{fontSize:9,color:"#9ca3af",fontWeight:600}}>LOCKED</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {!course.isEnrolled && (
                <div style={{textAlign:"center",padding:"10px 14px",background:"#f8f7ff",border:"1.5px dashed #c4b5fd",borderRadius:10,marginTop:8}}>
                  <span style={{fontSize:13,fontWeight:700,color:"#6c47d4"}}>🔒 Enroll to unlock all materials</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── RIGHT ── */}
        <div className="cdp-right">
          <div className={`cdp-preview ${hasImg ? "sdc-thumb-has-img" : thumbClass}`}
               style={{...(hasImg ? {backgroundImage:`url(${course.featureImage})`,backgroundSize:"cover",backgroundPosition:"center"} : {}), cursor: hasDemoVideo ? "pointer" : "default"}}
               onClick={() => hasDemoVideo && setShowDemo(true)}>
            <span className="cdp-preview-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#702DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="#702DFF" stroke="none"/>
              </svg>
              Watch Free Demo
            </span>
          </div>

          {showDemo && hasDemoVideo && (
            <div className="cdp-demo-overlay" onClick={() => setShowDemo(false)}>
              <div className="cdp-demo-modal" onClick={(e) => e.stopPropagation()}>
                <button className="cdp-demo-close" onClick={() => setShowDemo(false)}><MdClose size={22}/></button>
                {demoYtId ? (
                  <div className="scp-video-wrap">
                    <iframe src={`https://www.youtube.com/embed/${demoYtId}?autoplay=1&rel=0`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen className="scp-iframe" title="Free Demo"/>
                  </div>
                ) : demoLesson.videoType==="bunny" ? (
                  <div className="scp-video-wrap"><BunnyPlayer src={demoLesson.videoUrl}/></div>
                ) : (
                  <div className="scp-video-wrap">
                    <video controls autoPlay className="scp-iframe" style={{background:"#000"}}>
                      <source src={demoLesson.videoUrl}/>
                    </video>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="cdp-price-card">
            <div className="cdp-price-meta">
              <div className="cdp-meta-left-g">
                {isBundle ? (
                  <span style={{fontSize:11,color:"#f59e0b",fontWeight:700,background:"#fff7ed",padding:"2px 8px",borderRadius:10}}>📦 {bundledSubs.length} Subjects</span>
                ) : (
                  <>
                    <span className="sdc-meta-item" style={{fontSize:11,color:"#555"}}>
                      <img src="/assets/images/online-classes/icons/chapter.svg" alt="" className="sdc-meta-icon"/>
                      {course.chapters?.length||0} Chapters
                    </span>
                    <span className="sdc-meta-item" style={{fontSize:11,color:"#555"}}>
                      <img src="/assets/images/online-classes/icons/lesson.svg" alt="" className="sdc-meta-icon"/>
                      {totalLessons} Topics
                    </span>
                  </>
                )}
              </div>
              <div className="cdp-meta-right-g">
                {isBundle && <span style={{background:"#fef3c7",color:"#92400e",fontWeight:700,fontSize:10,padding:"2px 8px",borderRadius:10}}>BUNDLE</span>}
                {!isBundle && course.subject && <span className="sdc-tag" style={{background:`${subjectColor}22`,color:subjectColor,fontSize:10}}>{course.subject.toUpperCase()}</span>}
                {(course.batch||course.className) && <span className="sdc-tag-cls-pill" style={{fontSize:10}}>{(course.batch||course.className).toUpperCase()}</span>}
              </div>
            </div>
            <div className="cdp-price-title">{course.title}</div>
            <div className="cdp-price-row">
              <span className="cdp-price-now">₹{course.price?.toLocaleString("en-IN")||"Free"}</span>
              {course.originalPrice && <span className="cdp-price-old">₹{course.originalPrice?.toLocaleString("en-IN")}</span>}
            </div>

            {course.isEnrolled ? (
              <button className="cdp-btn-start" onClick={() => onOpenPlayer && onOpenPlayer(course._id)}><MdPlayCircle size={18}/> {isBundle?"Access All Subjects":"Start Learning"}</button>
            ) : course.isFree ? (
              <button className="cdp-btn-enroll" onClick={handleFreeEnroll} disabled={enrolling}>{enrolling?"Enrolling...":<><MdCheck size={16}/> Enroll Free</>}</button>
            ) : inCart ? (
              <button className="cdp-btn-incart"><img src="/assets/images/online-classes/icons/cart.svg" alt="" className="sdc-btn-icon"/> In Cart · ₹{course.price?.toLocaleString("en-IN")}</button>
            ) : (
              <button className="cdp-btn-cart" onClick={handleAddToCart}><img src="/assets/images/online-classes/icons/cart.svg" alt="" className="sdc-btn-icon"/> Add To Cart &nbsp;₹{course.price?.toLocaleString("en-IN")}</button>
            )}

            {/* Bundle quick-info in sidebar */}
            {isBundle && bundledSubs.length > 0 && (
              <div style={{marginTop:14,padding:"12px",background:"#EFEFFF",borderRadius:10,border:"1px solid #c5b8f8"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#4c1d95",marginBottom:8}}>SUBJECTS IN THIS BUNDLE</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                  {bundledSubs.map((s,i) => (
                    <span key={s} style={{fontSize:11,fontWeight:600,color:SUBJ_COLORS[i%SUBJ_COLORS.length],background:`${SUBJ_COLORS[i%SUBJ_COLORS.length]}15`,padding:"2px 8px",borderRadius:12}}>{s}</span>
                  ))}
                </div>
              </div>
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
   BUNNY HLS PLAYER — secured
════════════════════════════════════════ */
const WATERMARK_POSITIONS = [
  { top:"15%",  left:"8%"  },
  { top:"72%",  left:"58%" },
  { top:"38%",  left:"32%" },
  { top:"82%",  left:"12%" },
  { top:"22%",  left:"62%" },
  { top:"55%",  left:"5%"  },
  { top:"10%",  left:"45%" },
];

function BunnyPlayer({ src, videoId, courseId }) {
  const videoRef    = useRef(null);
  const hlsRef      = useRef(null);
  const hlsAuthRef  = useRef(null); // { token, expires } for signing segment requests
  const pendingResumeRef = useRef(null); // seconds to seek to once metadata is ready
  const lastTapRef   = useRef({ left: 0, right: 0 }); // per-zone double-tap timestamps
  const flashTimeoutRef = useRef(null);
  const [signedSrc, setSignedSrc]   = useState(null);
  const [hlsError,  setHlsError]    = useState(null);
  const [wmText,    setWmText]      = useState("");
  const [wmPos,     setWmPos]       = useState(WATERMARK_POSITIONS[0]);
  const [wmVisible, setWmVisible]   = useState(true);
  const [isPaused,  setIsPaused]    = useState(true);
  const [seekFlash, setSeekFlash]   = useState(null); // "left" | "right" | null
  const [usingHlsJs, setUsingHlsJs] = useState(false); // native Safari HLS has no manual quality control
  const [qualityLevels, setQualityLevels]     = useState([]); // [{index, height}], high→low
  const [currentQualityIndex, setCurrentQualityIndex] = useState(-1); // -1 = Auto (ABR)
  const [activeHeight, setActiveHeight] = useState(null); // actually-playing height while on Auto
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  /* ── Continue Watching: fetch saved progress and silently resume from it — no prompt.
     User can still drag the native seek bar to jump anywhere else. ── */
  useEffect(() => {
    if (!videoId || !courseId) return;
    const token = localStorage.getItem("studentToken");
    if (!token) return;
    fetch(`/api/watch-progress/${videoId}?courseId=${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(d => {
        if (d.success && d.watchPercentage < 95 && d.watchedTime > 10) {
          applyResumeSeek(d.watchedTime);
        }
      })
      .catch(() => {});
  }, [videoId, courseId]);

  /* ── Continue Watching: periodically save playback position ── */
  useEffect(() => {
    if (!videoId || !courseId) return;
    const video = videoRef.current;
    if (!video) return;
    const token = localStorage.getItem("studentToken");
    if (!token) return;

    const saveWatchProgress = () => {
      if (!video.duration || isNaN(video.duration)) return;
      fetch(`/api/watch-progress/${videoId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          courseId,
          watchedTime: Math.floor(video.currentTime),
          duration: Math.floor(video.duration),
        }),
        keepalive: true,
      }).catch(() => {});
    };

    const interval = setInterval(() => { if (!video.paused) saveWatchProgress(); }, 5000);
    video.addEventListener("pause", saveWatchProgress);
    video.addEventListener("ended", saveWatchProgress);
    window.addEventListener("beforeunload", saveWatchProgress);

    return () => {
      clearInterval(interval);
      video.removeEventListener("pause", saveWatchProgress);
      video.removeEventListener("ended", saveWatchProgress);
      window.removeEventListener("beforeunload", saveWatchProgress);
    };
  }, [videoId, courseId]);

  const applyResumeSeek = (seconds) => {
    const video = videoRef.current;
    if (!video) return;
    const doSeek = () => { video.currentTime = seconds; video.play().catch(() => {}); };
    if (video.readyState >= 1) {
      doSeek();
    } else {
      pendingResumeRef.current = seconds;
      const onMeta = () => {
        video.removeEventListener("loadedmetadata", onMeta);
        if (pendingResumeRef.current != null) { doSeek(); pendingResumeRef.current = null; }
      };
      video.addEventListener("loadedmetadata", onMeta);
    }
  };

  /* ── 1. Fetch server-signed expiring URL ── */
  useEffect(() => {
    if (!src) return;
    fetch("/api/bunny/signed-url", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ videoUrl: src }),
    })
      .then(r => r.json())
      .then(d => {
        console.log("[BunnyPlayer] signed URL:", d.url);
        console.log("[BunnyPlayer] token auth:", d.token ? "YES (token present)" : "NO token");
        setSignedSrc(d.url || src);
        if (d.token) hlsAuthRef.current = { token: d.token, expires: d.expires };
      })
      .catch((err) => {
        console.error("[BunnyPlayer] signed-url API error:", err);
        setSignedSrc(src);
      });
  }, [src]);

  /* ── 2. Load student watermark text from localStorage ── */
  useEffect(() => {
    try {
      const info = JSON.parse(localStorage.getItem("studentInfo") || "{}");
      const parts = [info.name, info.phone ? `+91 ${info.phone}` : ""].filter(Boolean);
      setWmText(parts.join("  •  ") || "SS Coaching");
    } catch { setWmText("SS Coaching"); }
  }, []);

  /* ── 3. Slowly drift watermark position ── */
  useEffect(() => {
    if (!wmText) return;
    let idx = 0;
    const t = setInterval(() => {
      idx = (idx + 1) % WATERMARK_POSITIONS.length;
      setWmVisible(false);
      setTimeout(() => {
        setWmPos(WATERMARK_POSITIONS[idx]);
        setWmVisible(true);
      }, 600);
    }, 6000);
    return () => clearInterval(t);
  }, [wmText]);

  /* ── 4. Block keyboard shortcuts + blackout on capture attempt ── */
  useEffect(() => {
    const blackout = () => {
      const v = videoRef.current;
      if (!v) return;
      v.style.visibility = "hidden";
      navigator.clipboard?.writeText("").catch(() => {});
      toast.error("Recording / screenshots are not allowed", { duration: 3000 });
      setTimeout(() => { if (videoRef.current) videoRef.current.style.visibility = "visible"; }, 1200);
    };

    const onKey = (e) => {
      const k = e.key?.toLowerCase() ?? "";
      // PrintScreen / Snipping Tool
      if (e.key === "PrintScreen") { blackout(); e.preventDefault(); return; }
      // Ctrl+Shift+R (some recording apps), Ctrl+Shift+S (Windows snip)
      if (e.ctrlKey && e.shiftKey && ["r","s"].includes(k)) { blackout(); e.preventDefault(); return; }
      // Dev-tools / save / print shortcuts
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i","j","c"].includes(k)) ||
        (e.ctrlKey && ["s","u","p","a"].includes(k))
      ) { e.preventDefault(); }
    };

    // Pause + blackout when window loses focus (user Alt-Tabs to recording app)
    const onBlur = () => {
      const v = videoRef.current;
      if (v && !v.paused) {
        v.style.visibility = "hidden";
        setTimeout(() => { if (videoRef.current) videoRef.current.style.visibility = "visible"; }, 800);
      }
    };

    document.addEventListener("keydown", onKey, { capture: true });
    window.addEventListener("blur", onBlur);
    return () => {
      document.removeEventListener("keydown", onKey, { capture: true });
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  /* ── 5. HLS setup (runs only after signed URL is ready) ── */
  useEffect(() => {
    if (!signedSrc) return;
    let cancelled = false;

    const destroyHls = () => {
      if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null; }
    };

    const setup = () => {
      const video = videoRef.current;
      if (!video || cancelled) return;

      destroyHls();
      setQualityLevels([]);
      setCurrentQualityIndex(-1);
      setActiveHeight(null);
      setShowQualityMenu(false);

      // Only use native HLS on real Safari (iOS/macOS); Chrome falsely reports canPlayType
      const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
      const isSafari = /Safari/i.test(ua) && !/Chrome|CriOS|FxiOS|EdgA|Android/i.test(ua);
      if (isSafari && video.canPlayType("application/vnd.apple.mpegurl")) {
        console.log("[BunnyPlayer] Safari native HLS path");
        setUsingHlsJs(false); // native HLS has no manual quality-level API
        video.src = signedSrc;
        video.load();
        video.play().catch(() => {});
        return;
      }

      // hls.js path — Chrome, Firefox, Edge, etc.
      import("hls.js").then(({ default: Hls }) => {
        if (cancelled || !videoRef.current) return; // unmounted or effect re-ran
        if (!Hls.isSupported()) {
          setHlsError("HLS is not supported in this browser");
          return;
        }
        console.log("[BunnyPlayer] hls.js path, loading:", signedSrc);
        const hls = new Hls({ enableWorker: true, startLevel: -1 });
        setUsingHlsJs(true);
        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("[BunnyPlayer] HLS error:", data.type, data.details,
            "HTTP:", data.response?.code, "URL:", data.url);
          if (data.fatal) setHlsError(`${data.details} (HTTP ${data.response?.code ?? "?"})`);
        });
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("[BunnyPlayer] manifest parsed — playing");
          videoRef.current?.play().catch(() => {});
          const levels = (hls.levels || [])
            .map((lvl, idx) => ({ index: idx, height: lvl.height || 0 }))
            .filter((l) => l.height > 0)
            .sort((a, b) => b.height - a.height);
          setQualityLevels(levels);
        });
        hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
          setActiveHeight(hls.levels?.[data.level]?.height || null);
        });
        hls.loadSource(signedSrc);
        hls.attachMedia(videoRef.current);
        hlsRef.current = hls;
      }).catch((err) => {
        console.error("[BunnyPlayer] failed to import hls.js:", err);
        setHlsError("Failed to load video player");
      });
    };

    // videoRef.current is populated once the <video> element mounts.
    // On the very first render it should already be set; use rAF as a safety net.
    if (videoRef.current) {
      setup();
    } else {
      const raf = requestAnimationFrame(() => { setup(); });
      return () => {
        cancelled = true;
        cancelAnimationFrame(raf);
        destroyHls();
      };
    }

    return () => {
      cancelled = true;
      destroyHls();
    };
  }, [signedSrc]);

  /* ── 6. Auto-landscape fullscreen on device rotation (mobile) ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isFullscreen = () =>
      !!(document.fullscreenElement || document.webkitFullscreenElement);

    const enterFullscreen = () => {
      if (isFullscreen()) return;
      if (video.requestFullscreen) video.requestFullscreen().catch(() => {});
      else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen(); // iOS Safari native player
    };

    const exitFullscreen = () => {
      if (video.webkitDisplayingFullscreen && video.webkitExitFullscreen) {
        video.webkitExitFullscreen(); // iOS Safari native player
        return;
      }
      if (!isFullscreen()) return;
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    };

    const onOrientationChange = () => {
      const isMobile = window.matchMedia("(max-width: 900px)").matches || "ontouchstart" in window;
      if (!isMobile) return; // don't hijack desktop window resizes
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      if (isLandscape) enterFullscreen();
      else exitFullscreen();
    };

    const mq = window.matchMedia("(orientation: landscape)");
    if (mq.addEventListener) mq.addEventListener("change", onOrientationChange);
    else mq.addListener(onOrientationChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onOrientationChange);
      else mq.removeListener(onOrientationChange);
    };
  }, []);

  /* ── 7. Track play/pause state for the overlay center button ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay  = () => setIsPaused(false);
    const onPause = () => setIsPaused(true);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    setIsPaused(video.paused);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const showSeekFlash = (side) => {
    setSeekFlash(side);
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    flashTimeoutRef.current = setTimeout(() => setSeekFlash(null), 1000);
  };

  /* Double-tap (or double-click) left/right half → seek ±10s. Timestamp-based
     so the same handler works uniformly for mouse (desktop) and touch (mobile). */
  const handleSeekZoneTap = (side) => {
    const video = videoRef.current;
    if (!video) return;
    const now = Date.now();
    const last = lastTapRef.current[side] || 0;
    if (now - last < 350) {
      lastTapRef.current[side] = 0;
      if (video.duration && !isNaN(video.duration)) {
        const delta = side === "left" ? -10 : 10;
        video.currentTime = Math.min(Math.max(video.currentTime + delta, 0), video.duration);
      }
      showSeekFlash(side);
    } else {
      lastTapRef.current[side] = now;
    }
  };

  useEffect(() => () => { if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current); }, []);

  const selectQuality = (index) => {
    if (hlsRef.current) hlsRef.current.currentLevel = index; // -1 = back to Auto (ABR)
    setCurrentQualityIndex(index);
    setShowQualityMenu(false);
  };

  const blockContext = (e) => e.preventDefault();

  return (
    <div className="bvp-wrap" onContextMenu={blockContext}>
      {hlsError && (
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", background:"#111", color:"#fff",
          zIndex:10, gap:8, padding:20, textAlign:"center" }}>
          <span style={{fontSize:32}}>⚠️</span>
          <strong>Video failed to load</strong>
          <span style={{fontSize:12, color:"#aaa"}}>{hlsError}</span>
          <button onClick={()=>window.location.reload()}
            style={{marginTop:8,padding:"6px 16px",background:"#6c47d4",color:"#fff",
              border:"none",borderRadius:6,cursor:"pointer"}}>Retry</button>
        </div>
      )}
      {/* actual video */}
      <video
        ref={videoRef}
        controls
        playsInline
        className="scp-iframe"
        style={{ background:"#000", width:"100%", height:"100%", display:"block" }}
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        onContextMenu={blockContext}
      />

      {/* double-tap seek zones + center play/pause — sits above the video but
          leaves the bottom strip free for the native <video controls> bar */}
      {!hlsError && (
        <div
          style={{ position:"absolute", left:0, right:0, top:0, bottom:46, zIndex:5, display:"flex" }}
          onClick={() => setShowQualityMenu(false)}
        >
          <div style={{ flex:1, position:"relative" }} onClick={() => handleSeekZoneTap("left")}>
            {seekFlash === "left" && (
              <div style={{
                position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
                display:"flex", alignItems:"center", gap:6, color:"#fff", fontSize:18, fontWeight:700,
                background:"rgba(0,0,0,0.55)", padding:"10px 18px", borderRadius:999,
                pointerEvents:"none", animation:"bvpSeekFlash 1s ease forwards",
              }}>
                <MdFastRewind size={24}/> 10
              </div>
            )}
          </div>
          <div style={{ flex:1, position:"relative" }} onClick={() => handleSeekZoneTap("right")}>
            {seekFlash === "right" && (
              <div style={{
                position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
                display:"flex", alignItems:"center", gap:6, color:"#fff", fontSize:18, fontWeight:700,
                background:"rgba(0,0,0,0.55)", padding:"10px 18px", borderRadius:999,
                pointerEvents:"none", animation:"bvpSeekFlash 1s ease forwards",
              }}>
                10 <MdFastForward size={24}/>
              </div>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
            aria-label={isPaused ? "Play" : "Pause"}
            style={{
              position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
              width:56, height:56, borderRadius:"50%", background:"rgba(0,0,0,0.45)",
              border:"2px solid rgba(255,255,255,0.6)", color:"#fff", zIndex:2,
              display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
            }}
          >
            {isPaused ? <MdPlayCircle size={34}/> : <MdPauseCircle size={34}/>}
          </button>

          {/* quality selector — only meaningful on the hls.js path; native Safari
              HLS has no manual level-switching API */}
          {usingHlsJs && qualityLevels.length > 0 && (
            <div style={{ position:"absolute", top:10, right:10, zIndex:3 }}>
              <button
                onClick={(e) => { e.stopPropagation(); setShowQualityMenu(v => !v); }}
                style={{
                  display:"flex", alignItems:"center", gap:4, background:"rgba(0,0,0,0.55)",
                  color:"#fff", border:"1px solid rgba(255,255,255,0.3)", borderRadius:6,
                  padding:"5px 10px", fontSize:12, fontWeight:600, cursor:"pointer",
                }}
              >
                <MdSettings size={15}/>
                {currentQualityIndex === -1
                  ? `Auto${activeHeight ? ` ${activeHeight}p` : ""}`
                  : `${qualityLevels.find(l => l.index === currentQualityIndex)?.height}p`}
              </button>
              {showQualityMenu && (
                <div style={{
                  position:"absolute", top:"calc(100% + 4px)", right:0,
                  background:"rgba(20,20,20,0.95)", border:"1px solid rgba(255,255,255,0.15)",
                  borderRadius:8, overflow:"hidden", minWidth:100,
                }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); selectQuality(-1); }}
                    style={{
                      display:"block", width:"100%", textAlign:"left", padding:"8px 12px", fontSize:12,
                      background: currentQualityIndex === -1 ? "rgba(108,71,212,0.5)" : "transparent",
                      color:"#fff", border:"none", cursor:"pointer",
                    }}
                  >Auto</button>
                  {qualityLevels.map(l => (
                    <button
                      key={l.index}
                      onClick={(e) => { e.stopPropagation(); selectQuality(l.index); }}
                      style={{
                        display:"block", width:"100%", textAlign:"left", padding:"8px 12px", fontSize:12,
                        background: currentQualityIndex === l.index ? "rgba(108,71,212,0.5)" : "transparent",
                        color:"#fff", border:"none", cursor:"pointer",
                      }}
                    >{l.height}p</button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <style>{`@keyframes bvpSeekFlash{0%{opacity:1}70%{opacity:1}100%{opacity:0}}`}</style>

      {/* floating watermark */}
      {wmText && (
        <div
          className={`bvp-watermark ${wmVisible ? "bvp-wm-show" : "bvp-wm-hide"}`}
          style={{ top: wmPos.top, left: wmPos.left }}
          aria-hidden="true"
        >
          {wmText}
        </div>
      )}

      {/* transparent interaction guard — blocks right-click on overlapping UI */}
      <div className="bvp-guard" onContextMenu={blockContext} aria-hidden="true"/>
    </div>
  );
}

/* ════════════════════════════════════════
   COURSE PLAYER
════════════════════════════════════════ */
/* ── Secure in-app file viewer modal ── */
function SecureFileViewer({ courseId, mat, secKey, subject, onClose }) {
  const containerRef = useRef(null);
  const [status, setStatus]   = useState("loading"); // loading | done | error
  const [errMsg, setErrMsg]   = useState("");
  const MAT_ICONS  = { books:"📚", tma:"📝", assignments:"📋", samplePapers:"📄", notes:"🗒️" };
  const displayTitle = subject ? mat.title.replace(`${subject} | `, "") : mat.title;

  // Block Ctrl+S/P/C and F12 on the parent window
  useEffect(() => {
    const block = (e) => {
      if ((e.ctrlKey || e.metaKey) && ["s","S","p","P","c","C","a","A"].includes(e.key))
        e.preventDefault();
      if (e.key === "F12") e.preventDefault();
    };
    window.addEventListener("keydown", block);
    return () => window.removeEventListener("keydown", block);
  }, []);

  // Load PDF.js from CDN then fetch PDF bytes and render as canvas directly in DOM
  // No iframe → no src URL visible in DevTools Elements tab
  useEffect(() => {
    let cancelled = false;

    function drawWatermark(ctx, w, h) {
      ctx.save();
      ctx.globalAlpha = 0.10;
      ctx.font = "bold 28px Arial";
      ctx.fillStyle = "#6c47d4";
      ctx.translate(w / 2, h / 2);
      ctx.rotate(-30 * Math.PI / 180);
      ctx.textAlign = "center";
      for (let y = -h; y < h; y += 110) {
        ctx.fillText("SS Coaching — Protected", 0, y);
        ctx.fillText("© sscoaching.in", 0, y + 34);
      }
      ctx.restore();
    }

    async function loadPdfJs() {
      if (window.pdfjsLib) return;
      await new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        s.onload = resolve; s.onerror = reject;
        document.head.appendChild(s);
      });
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    }

    async function renderPdf() {
      try {
        await loadPdfJs();
        if (cancelled) return;

        const token = localStorage.getItem("studentToken") || "";
        // Fetch PDF bytes — shows in Network tab briefly, but no URL in Elements tab
        const proxyUrl = `/api/student/file?token=${encodeURIComponent(token)}&courseId=${courseId}&matId=${mat._id}`;
        const resp = await fetch(proxyUrl);
        if (!resp.ok) throw new Error("Access denied or file not found");
        if (cancelled) return;

        const buffer = await resp.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
        if (cancelled) return;

        const el = containerRef.current;
        if (!el) return;
        el.innerHTML = ""; // clear spinner

        for (let n = 1; n <= pdf.numPages; n++) {
          if (cancelled) return;
          const page     = await pdf.getPage(n);
          const viewport = page.getViewport({ scale: 1.8 });
          const canvas   = document.createElement("canvas");
          canvas.width   = viewport.width;
          canvas.height  = viewport.height;
          Object.assign(canvas.style, {
            display:"block", maxWidth:"100%", margin:"0 auto 20px",
            boxShadow:"0 4px 20px rgba(0,0,0,.5)", borderRadius:"2px"
          });
          const ctx = canvas.getContext("2d");
          await page.render({ canvasContext: ctx, viewport }).promise;
          drawWatermark(ctx, viewport.width, viewport.height);
          el.appendChild(canvas);
          if (n === 1) setStatus("done");
        }
        setStatus("done");
      } catch (err) {
        if (!cancelled) { setStatus("error"); setErrMsg(err.message); }
      }
    }

    renderPdf();
    return () => { cancelled = true; };
  }, [courseId, mat._id]);

  return (
    <div
      style={{position:"fixed",inset:0,zIndex:9999,display:"flex",flexDirection:"column",userSelect:"none"}}
      onContextMenu={e => e.preventDefault()}
    >
      {/* Header */}
      <div style={{background:"#1a1f4b",padding:"12px 20px",display:"flex",alignItems:"center",gap:14,flexShrink:0,boxShadow:"0 2px 8px rgba(0,0,0,0.4)"}}>
        <span style={{fontSize:22}}>{MAT_ICONS[secKey]||"📄"}</span>
        <div style={{flex:1,minWidth:0}}>
          <div style={{color:"white",fontWeight:700,fontSize:15,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{displayTitle}</div>
          {subject && <div style={{color:"#a5b4fc",fontSize:12,marginTop:2}}>{subject}</div>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:11,color:"#a5b4fc",background:"rgba(255,255,255,0.08)",padding:"4px 12px",borderRadius:20,fontWeight:600,border:"1px solid rgba(255,255,255,0.12)"}}>🔒 Protected</span>
          <button onClick={onClose} style={{background:"#ef4444",color:"white",border:"none",borderRadius:8,padding:"8px 18px",fontWeight:700,cursor:"pointer",fontSize:14}}>✕ Close</button>
        </div>
      </div>

      {/* Canvas area — PDF pages rendered directly here, no iframe */}
      <div style={{flex:1,overflow:"auto",background:"#404040",WebkitUserSelect:"none"}} onContextMenu={e=>e.preventDefault()}>
        {status === "loading" && (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"white",gap:16}}>
            <div style={{width:40,height:40,border:"3px solid rgba(255,255,255,0.2)",borderTop:"3px solid white",borderRadius:"50%",animation:"sfv-spin 0.8s linear infinite"}}/>
            <div style={{fontSize:13,fontWeight:600}}>Loading document…</div>
          </div>
        )}
        {status === "error" && (
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",color:"#fca5a5",fontSize:13,padding:24,textAlign:"center"}}>
            Could not load document. Please close and try again.<br/><small>{errMsg}</small>
          </div>
        )}
        <div ref={containerRef} style={{padding:"24px 16px",minHeight:"100%"}} />
      </div>

      {/* Footer */}
      <div style={{background:"#111827",padding:"5px 20px",textAlign:"center",flexShrink:0}}>
        <span style={{fontSize:11,color:"#4b5563"}}>© SS Coaching — Protected material. Downloading, sharing or screenshotting is strictly prohibited.</span>
      </div>

      <style jsx global>{`@keyframes sfv-spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function CoursePlayer({ courseId, onBack }) {
  const [course, setCourse]             = useState(null);
  const [loading, setLoading]           = useState(true);
  const [activeLesson, setActiveLesson] = useState(null);
  const [openChapters, setOpenChapters] = useState({});
  const [openSubjects, setOpenSubjects] = useState({});
  const [viewingMat, setViewingMat]     = useState(null); // { mat, secKey, subject }
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [linkedClasses, setLinkedClasses] = useState([]);
  const [showLinkedClasses, setShowLinkedClasses] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(new Set());

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("studentToken");
        const [courseRes, progressRes] = await Promise.all([
          fetch(`/api/courses/${courseId}`, { headers:{ Authorization:`Bearer ${token}` } }),
          fetch(`/api/courses/${courseId}/progress`, { headers:{ Authorization:`Bearer ${token}` } }),
        ]);
        const data  = await courseRes.json();
        const pData = await progressRes.json().catch(() => ({}));

        if (pData.success) setCompletedLessons(new Set(pData.completedLessons || []));

        if (data.success) {
          setCourse(data.course);
          if (data.course.courseType === "bundle") {
            setOpenSubjects({ 0: true });
          } else if (data.course.chapters?.length > 0) {
            // Auto-resume to last watched lesson
            let resumed = false;
            if (pData.lastLessonId) {
              for (let ci = 0; ci < data.course.chapters.length; ci++) {
                const ch = data.course.chapters[ci];
                for (let li = 0; li < ch.lessons.length; li++) {
                  if (String(ch.lessons[li]._id) === pData.lastLessonId) {
                    setOpenChapters({ [ci]: true });
                    setActiveLesson({ chapterIdx: ci, lessonIdx: li, lesson: ch.lessons[li] });
                    resumed = true;
                    break;
                  }
                }
                if (resumed) break;
              }
            }
            if (!resumed) {
              setOpenChapters({ 0: true });
              const fl = data.course.chapters[0]?.lessons?.[0];
              if (fl) setActiveLesson({ chapterIdx:0, lessonIdx:0, lesson:fl });
            }
          }
        }
      } catch {}
      setLoading(false);
    };
    load();
    // Fetch linked online classes
    const token = localStorage.getItem("studentToken");
    fetch(`/api/onlineClasses?course=${courseId}&limit=50`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(r => r.json())
      .then(d => { if (d.success) setLinkedClasses(d.data || []); })
      .catch(() => {});
  }, [courseId]);

  const toggleChapter = (idx) => setOpenChapters(prev => ({ ...prev, [idx]: !prev[idx] }));
  const toggleSubject = (idx) => setOpenSubjects(prev => ({ ...prev, [idx]: !prev[idx] }));

  const savePosition = (les, ci, li) => {
    const token = localStorage.getItem("studentToken");
    if (!token || !les?._id) return;
    fetch(`/api/courses/${courseId}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ lessonId: les._id, chapterIdx: ci, lessonIdx: li, action: "position" }),
    }).catch(() => {});
  };

  const toggleComplete = (lessonId) => {
    const done = completedLessons.has(String(lessonId));
    setCompletedLessons(prev => {
      const next = new Set(prev);
      done ? next.delete(String(lessonId)) : next.add(String(lessonId));
      return next;
    });
    const token = localStorage.getItem("studentToken");
    fetch(`/api/courses/${courseId}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        lessonId, action: done ? "uncomplete" : "complete",
        chapterIdx: activeLesson?.chapterIdx ?? 0,
        lessonIdx:  activeLesson?.lessonIdx  ?? 0,
      }),
    }).catch(() => {});
  };

  const getYoutubeId = (url) => {
    if (!url) return null;
    const pats = [/youtube\.com\/watch\?v=([^&]+)/,/youtu\.be\/([^?]+)/,/youtube\.com\/embed\/([^?]+)/,/youtube\.com\/live\/([^?]+)/];
    for (const p of pats) { const m = url.match(p); if (m) return m[1]; }
    return null;
  };

  const lessonHasVideo   = (l) => !l ? false :
    (l.videoType==="youtube" && l.youtubeLink) ||
    (l.videoType==="custom"  && l.videoUrl)    ||
    (l.videoType==="bunny"   && l.videoUrl);
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

  const isBundle   = course.courseType === "bundle";
  const bundleSubs = course.bundledSubjects || [];
  const MAT_SECTIONS = [
    {key:"books",       label:"Books",         Icon:MdMenuBook,    color:"#6c47d4"},
    {key:"tma",         label:"TMA",           Icon:MdInventory2,  color:"#f59e0b"},
    {key:"assignments", label:"Assignments",   Icon:MdAssignment,  color:"#0ea5e9"},
    {key:"samplePapers",label:"Sample Papers", Icon:MdArticle,     color:"#10b981"},
    {key:"notes",       label:"Notes",         Icon:MdStickyNote2, color:"#f43f5e"},
  ];
  const SUBJ_COLORS = ["#6c47d4","#f59e0b","#0ea5e9","#10b981","#f43f5e","#8b5cf6","#06b6d4","#84cc16","#f97316","#ec4899","#14b8a6","#a855f7","#ef4444"];

  const getSubjectMats = (sub) =>
    MAT_SECTIONS.flatMap(s =>
      (course.materials?.[s.key]||[])
        .filter(m => m.title.startsWith(`${sub} | `))
        .map(m => ({ ...m, secKey:s.key, Icon:s.Icon, color:s.color, label:s.label }))
    );

  const openViewer = (mat, secKey, subject) => setViewingMat({ mat, secKey, subject });

  return (
    <>
      {/* Secure file viewer overlay */}
      {viewingMat && (
        <SecureFileViewer
          courseId={courseId}
          mat={viewingMat.mat}
          secKey={viewingMat.secKey}
          subject={viewingMat.subject}
          onClose={() => setViewingMat(null)}
        />
      )}

      <div className="scp-wrapper">
        <div className="scp-header">
          <button className="scp-back-btn" onClick={onBack}><MdArrowBack size={18}/> Back to Courses</button>
          <div className="scp-header-info">
            <div className="scp-course-title">{course.title}</div>
            <div className="scp-course-meta">
              {isBundle ? (
                <><span style={{color:"#f59e0b"}}>📦 Bundle</span><span>•</span><span>{bundleSubs.length} Subjects</span></>
              ) : (
                <><span style={{color:getSubjectColor(course.subject)}}>{subjectIcons[course.subject]||"📚"} {course.subject}</span>
                <span>•</span><span>{course.batch}</span>
                <span>•</span><span>{course.chapters?.length||0} Chapters</span>
                <span>•</span><span>{totalLessons} Topics</span></>
              )}
            {!isBundle && totalLessons > 0 && (
              <div style={{display:"flex",alignItems:"center",gap:8,marginTop:5,width:"100%"}}>
                <div style={{flex:1,height:4,background:"rgba(255,255,255,0.18)",borderRadius:2,overflow:"hidden",maxWidth:200}}>
                  <div style={{height:"100%",borderRadius:2,transition:"width 0.35s ease",
                    background: completedLessons.size === totalLessons ? "#10b981" : "#a78bfa",
                    width:`${Math.round(completedLessons.size/totalLessons*100)}%`}}/>
                </div>
                <span style={{fontSize:11,color:"rgba(255,255,255,0.75)",fontWeight:700,whiteSpace:"nowrap"}}>
                  {completedLessons.size}/{totalLessons} done
                  {completedLessons.size === totalLessons && " 🎉"}
                </span>
              </div>
            )}
            </div>
          </div>
          {linkedClasses.length > 0 && (
            <button
              onClick={() => setShowLinkedClasses(v => !v)}
              style={{
                display:"flex",alignItems:"center",gap:6,
                background:showLinkedClasses?"#6c47d4":"rgba(108,71,212,0.12)",
                color:showLinkedClasses?"white":"#6c47d4",
                border:"1.5px solid #6c47d4",borderRadius:8,
                padding:"6px 14px",fontWeight:700,fontSize:12,
                cursor:"pointer",flexShrink:0,whiteSpace:"nowrap",
              }}
            >
              📡 Live Classes
              {linkedClasses.filter(c=>c.status==="live").length > 0 && (
                <span style={{background:"#ef4444",color:"white",borderRadius:20,fontSize:10,padding:"1px 6px",fontWeight:800}}>
                  {linkedClasses.filter(c=>c.status==="live").length} LIVE
                </span>
              )}
              {linkedClasses.filter(c=>c.status==="live").length === 0 && (
                <span style={{background:showLinkedClasses?"rgba(255,255,255,0.25)":"#ede9ff",color:showLinkedClasses?"white":"#6c47d4",borderRadius:20,fontSize:10,padding:"1px 6px",fontWeight:800}}>
                  {linkedClasses.length}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Linked online classes panel */}
        {showLinkedClasses && linkedClasses.length > 0 && (
          <div style={{background:"#f8f7ff",borderBottom:"2px solid #e8e0ff",padding:"16px 20px"}}>
            <div style={{fontWeight:700,fontSize:14,color:"#4c1d95",marginBottom:12}}>
              📡 Online Classes for this Course
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
              {linkedClasses.map(cls => {
                const statusColor = {live:"#ef4444",upcoming:"#f59e0b",completed:"#10b981"}[cls.status]||"#9ca3af";
                const isLive = cls.status === "live";
                return (
                  <div key={cls._id} style={{background:"white",border:`2px solid ${isLive?"#ef4444":"#e5e7eb"}`,borderRadius:10,padding:"12px 16px",minWidth:200,maxWidth:280,flex:"1 1 200px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                      <span style={{width:8,height:8,borderRadius:"50%",background:statusColor,flexShrink:0}}/>
                      <span style={{fontSize:10,fontWeight:800,color:statusColor,textTransform:"uppercase",letterSpacing:0.5}}>{cls.status}</span>
                    </div>
                    <div style={{fontWeight:700,fontSize:13,color:"#1e293b",marginBottom:4,lineHeight:1.3}}>{cls.title}</div>
                    <div style={{fontSize:11,color:"#64748b",marginBottom:8}}>
                      {cls.teacher} · {cls.date} {cls.time ? `· ${cls.time}` : ""}
                    </div>
                    {isLive && cls.isUnlocked && cls.streamLink && (
                      <a href={cls.streamLink} target="_blank" rel="noopener noreferrer"
                        style={{display:"inline-flex",alignItems:"center",gap:4,background:"#ef4444",color:"white",borderRadius:6,padding:"5px 12px",fontSize:11,fontWeight:700,textDecoration:"none"}}>
                        ◉ Watch Live
                      </a>
                    )}
                    {cls.status === "upcoming" && (
                      <div style={{fontSize:11,color:"#f59e0b",fontWeight:600}}>🕐 Upcoming</div>
                    )}
                    {cls.status === "completed" && cls.isUnlocked && cls.streamLink && (
                      <a href={cls.streamLink} target="_blank" rel="noopener noreferrer"
                        style={{display:"inline-flex",alignItems:"center",gap:4,background:"#6c47d4",color:"white",borderRadius:6,padding:"5px 12px",fontSize:11,fontWeight:700,textDecoration:"none"}}>
                        ▶ Watch Recording
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="scp-body">
          {/* ── MAIN AREA ── */}
          <div className="scp-video-area">
            {!isBundle && (
              <>
                {lesson && ytId && (
                  <>
                    <div className="scp-video-wrap">
                      <iframe key={ytId} src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen className="scp-iframe" title={lesson.title}/>
                    </div>
                    <LessonInfoPanel lesson={lesson} course={course} activeLesson={activeLesson} isCompleted={completedLessons.has(String(lesson._id))} onToggleComplete={toggleComplete}/>
                  </>
                )}
                {lesson && lesson.videoType==="custom" && lesson.videoUrl && !ytId && (
                  <>
                    <div className="scp-video-wrap">
                      <video key={lesson.videoUrl} controls autoPlay className="scp-iframe" style={{background:"#000"}}>
                        <source src={lesson.videoUrl}/>
                      </video>
                    </div>
                    <LessonInfoPanel lesson={lesson} course={course} activeLesson={activeLesson} isCompleted={completedLessons.has(String(lesson._id))} onToggleComplete={toggleComplete}/>
                  </>
                )}
                {lesson && lesson.videoType==="bunny" && lesson.videoUrl && (
                  <>
                    <div className="scp-video-wrap"><BunnyPlayer key={lesson._id} src={lesson.videoUrl} videoId={String(lesson._id)} courseId={courseId}/></div>
                    <LessonInfoPanel lesson={lesson} course={course} activeLesson={activeLesson} isCompleted={completedLessons.has(String(lesson._id))} onToggleComplete={toggleComplete}/>
                  </>
                )}
                {lesson && !lessonHasVideo(lesson) && lessonHasNotes(lesson) && (
                  <>
                    <div className="scp-notes-only-header">
                      <div style={{fontSize:"2.8rem",marginBottom:10}}>📂</div>
                      <div style={{fontSize:"1.15rem",fontWeight:700,marginBottom:6}}>{lesson.title}</div>
                      <div style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.48)"}}>Study materials — no video</div>
                    </div>
                    <LessonInfoPanel lesson={lesson} course={course} activeLesson={activeLesson} isCompleted={completedLessons.has(String(lesson._id))} onToggleComplete={toggleComplete}/>
                  </>
                )}
                {lesson && !lessonHasVideo(lesson) && !lessonHasNotes(lesson) && (
                  <div className="scp-locked"><MdOndemandVideo size={48}/><div>No content available yet</div></div>
                )}
                {!lesson && (
                  <div className="scp-no-lesson"><MdOndemandVideo size={64}/><div>Select a topic to start</div></div>
                )}
              </>
            )}

            {/* Bundle: main welcome area */}
            {isBundle && (
              <div className="bcp-welcome">
                {/* Hero */}
                <div className="bcp-hero">
                  <div className="bcp-hero-icon">
                    <MdInventory2 size={32} color="#fff"/>
                  </div>
                  <h1 className="bcp-hero-title">{course.title}</h1>
                  <p className="bcp-hero-sub">Bundle Course &nbsp;·&nbsp; {bundleSubs.length} Subjects</p>
                  <div className="bcp-protected-pill">
                    <MdLock size={11}/> All materials are protected
                  </div>
                </div>

                {/* Subject cards grid */}
                <div className="bcp-subjects-label">Subjects Included</div>
                <div className="bcp-subject-grid">
                  {bundleSubs.map((s, i) => {
                    const color   = SUBJ_COLORS[i % SUBJ_COLORS.length];
                    const subMats = getSubjectMats(s);
                    return (
                      <button key={s} className="bcp-subj-card"
                        style={{"--subj-color": color}}
                        onClick={() => {
                          toggleSubject(i);
                          setMobileSidebar(true);
                        }}>
                        <div className="bcp-subj-dot" style={{background:color}}/>
                        <span className="bcp-subj-name">{s}</span>
                        <span className="bcp-subj-count" style={{color,background:`${color}18`}}>
                          {subMats.length > 0 ? `${subMats.length} files` : "No files"}
                        </span>
                        <MdChevronRight size={15} color={color}/>
                      </button>
                    );
                  })}
                </div>

                {/* Mobile sidebar toggle */}
                <button className="bcp-mobile-mat-btn" onClick={() => setMobileSidebar(true)}>
                  <MdViewList size={18}/> View All Materials
                </button>
              </div>
            )}
          </div>

          {/* Mobile drawer overlay */}
          {mobileSidebar && isBundle && (
            <div className="bcp-drawer-overlay" onClick={() => setMobileSidebar(false)}/>
          )}

          {/* ── SIDEBAR ── */}
          <div className={`scp-sidebar${isBundle && mobileSidebar ? " bcp-drawer-open" : ""}`}>
            {!isBundle && (
              <>
                <div className="scp-sidebar-title">Course Content</div>
                {course.chapters?.length === 0 && <div className="scp-no-content">No chapters yet.</div>}
                {/* Subject course materials */}
                {(() => {
                  const allMats = MAT_SECTIONS.flatMap(s =>
                    (course.materials?.[s.key]||[]).map(m => ({...m, secKey:s.key, Icon:s.Icon, label:s.label}))
                  );
                  if (!allMats.length) return null;
                  return (
                    <div className="scp-materials-section">
                      <div className="scp-materials-title">📁 Study Materials</div>
                      <div className="scp-materials-list">
                        {allMats.map(mat => {
                          const MatIcon = mat.Icon;
                          return (
                            <button key={mat._id} className="scp-material-link" onClick={() => openViewer(mat, mat.secKey, null)}
                              style={{width:"100%",textAlign:"left",cursor:"pointer",border:"none",background:"white"}}>
                              <span className="scp-material-icon">
                                {MatIcon ? <MatIcon size={14} color={mat.color||"#6c47d4"}/> : "📁"}
                              </span>
                              <span className="scp-material-name">{mat.title}</span>
                              <span className="scp-material-open">View</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
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
                          {(() => {
                            const done = chapter.lessons.filter(l => completedLessons.has(String(l._id))).length;
                            return (
                              <span className="scp-chapter-count" style={done===chapter.lessons.length&&chapter.lessons.length>0?{color:"#10b981",fontWeight:700}:{}}>
                                {done > 0 ? `${done}/${chapter.lessons.length}` : `${chapter.lessons.length} topics`}
                              </span>
                            );
                          })()}
                          {isOpen?<MdExpandLess size={18}/>:<MdExpandMore size={18}/>}
                        </div>
                      </button>
                      {isOpen && (
                        <div className="scp-lessons">
                          {chapter.lessons.length===0 && <div className="scp-no-content" style={{padding:"10px 16px"}}>No topics yet</div>}
                          {chapter.lessons.map((les, li) => {
                            const isActive  = activeLesson?.chapterIdx===ci && activeLesson?.lessonIdx===li;
                            const canOpen   = lessonAccessible(les);
                            const hasNotes  = lessonHasNotes(les);
                            const isDone    = completedLessons.has(String(les._id));
                            return (
                              <button key={les._id||li}
                                className={`scp-lesson ${isActive?"scp-lesson-active":""} ${!canOpen?"scp-lesson-locked":""}`}
                                onClick={() => { if (canOpen) { setActiveLesson({ chapterIdx:ci, lessonIdx:li, lesson:les }); savePosition(les,ci,li); } }}
                                disabled={!canOpen}>
                                <div className="scp-lesson-left">
                                  {isDone
                                    ? <MdCheckCircle size={15} color={isActive?"#fff":"#10b981"} style={{flexShrink:0}}/>
                                    : les.videoType==="youtube"&&les.youtubeLink ? <FaYoutube size={14} color={isActive?"#fff":"#ef4444"} style={{flexShrink:0}}/>
                                    : les.videoType==="custom"&&les.videoUrl ? <FaVideo size={13} color={isActive?"#fff":"#6c47d4"} style={{flexShrink:0}}/>
                                    : les.videoType==="bunny"&&les.videoUrl ? <FaVideo size={13} color={isActive?"#fff":"#10b981"} style={{flexShrink:0}}/>
                                    : hasNotes ? <MdAttachFile size={15} color={isActive?"#fff":"#f59e0b"} style={{flexShrink:0}}/>
                                    : canOpen ? <FaVideo size={13} color={isActive?"#fff":"#10b981"} style={{flexShrink:0}}/>
                                    : <MdLock size={13} className="scp-lock-icon" style={{flexShrink:0}}/>}
                                  <span className="scp-lesson-name" style={isDone&&!isActive?{color:"#10b981"}:{}}>{les.title}</span>
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
              </>
            )}

            {/* Bundle sidebar — subjects accordion */}
            {isBundle && (
              <>
                <div className="bcp-sb-header">
                  <div style={{flex:1,minWidth:0}}>
                    <div className="bcp-sb-title">{course.title}</div>
                    <div className="bcp-sb-meta">{bundleSubs.length} Subjects</div>
                  </div>
                  <button className="bcp-sb-close-btn" onClick={() => setMobileSidebar(false)}>
                    <MdClose size={18}/>
                  </button>
                </div>
                {bundleSubs.map((sub, si) => {
                  const color   = SUBJ_COLORS[si % SUBJ_COLORS.length];
                  const subMats = getSubjectMats(sub);
                  const isOpen  = !!openSubjects[si];
                  return (
                    <div key={sub} className="bcp-sb-subject">
                      <button
                        className={`bcp-sb-subj-btn${isOpen ? " bcp-sb-subj-open" : ""}`}
                        style={{"--sc":color}}
                        onClick={() => toggleSubject(si)}
                      >
                        <span className="bcp-sb-dot" style={{background:color}}/>
                        <span className="bcp-sb-subj-name">{sub}</span>
                        {subMats.length > 0
                          ? <span className="bcp-sb-badge" style={{color,background:`${color}18`}}>{subMats.length}</span>
                          : <span className="bcp-sb-nofile">No files</span>}
                        {isOpen ? <MdExpandLess size={16}/> : <MdExpandMore size={16}/>}
                      </button>

                      {isOpen && subMats.length > 0 && (
                        <div className="bcp-sb-mats">
                          {subMats.map(mat => {
                            const displayTitle = mat.title.replace(`${sub} | `, "");
                            const MatIcon = mat.Icon || MdMenuBook;
                            return (
                              <button key={mat._id}
                                className="bcp-sb-mat-row"
                                style={{"--mc": mat.color || color}}
                                onClick={() => { openViewer(mat, mat.secKey, sub); setMobileSidebar(false); }}
                              >
                                <span className="bcp-sb-mat-icon" style={{background:`${mat.color||color}15`}}>
                                  <MatIcon size={14} color={mat.color||color}/>
                                </span>
                                <div className="bcp-sb-mat-info">
                                  <div className="bcp-sb-mat-title">{displayTitle}</div>
                                  <div className="bcp-sb-mat-type">{mat.label}</div>
                                </div>
                                <span className="bcp-sb-mat-view" style={{color:mat.color||color}}>View</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
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
    </>
  );
}

function LessonInfoPanel({ lesson, course, activeLesson, isCompleted, onToggleComplete }) {
  return (
    <div className="scp-lesson-info">
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
        <div className="scp-lesson-title">{lesson.title}</div>
        <div style={{display:"flex",gap:6,flexShrink:0,flexWrap:"wrap",alignItems:"center"}}>
          {lesson.videoType==="youtube" && <span style={{fontSize:"0.7rem",background:"#fee2e2",color:"#ef4444",padding:"2px 9px",borderRadius:"100px",fontWeight:700,display:"flex",alignItems:"center",gap:4}}><FaYoutube size={11}/> YouTube</span>}
          {lesson.videoType==="custom"  && <span style={{fontSize:"0.7rem",background:"#ede9fe",color:"#6c47d4",padding:"2px 9px",borderRadius:"100px",fontWeight:700,display:"flex",alignItems:"center",gap:4}}><FaVideo size={10}/> Video</span>}
          {lesson.duration && <span style={{fontSize:"0.7rem",background:"#f3f4f6",color:"#374151",padding:"2px 9px",borderRadius:"100px",fontWeight:600,display:"flex",alignItems:"center",gap:4}}><MdTimelapse size={12}/> {lesson.duration}</span>}
          {onToggleComplete && (
            <button
              onClick={() => onToggleComplete(lesson._id)}
              style={{
                display:"flex",alignItems:"center",gap:5,
                background: isCompleted ? "#d1fae5" : "#f3f4f6",
                color:      isCompleted ? "#065f46" : "#374151",
                border:     isCompleted ? "1.5px solid #10b981" : "1.5px solid #d1d5db",
                borderRadius:"100px",padding:"4px 12px",fontSize:"0.72rem",fontWeight:700,
                cursor:"pointer",transition:"all 0.2s",
              }}
            >
              <MdCheckCircle size={14} color={isCompleted?"#10b981":"#9ca3af"}/>
              {isCompleted ? "Completed" : "Mark Done"}
            </button>
          )}
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
  const [saving, setSaving]           = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [form, setForm]               = useState({ name:student.name||"", className:student.className||"", batch:student.batch||"", phone:student.phone||"" });
  const [successMsg, setSuccessMsg]   = useState("");
  const [errorMsg, setErrorMsg]       = useState("");
  const [hasChanges, setHasChanges]   = useState(false);
  const [avatarSrc, setAvatarSrc]     = useState(student.avatar && !student.avatar.startsWith("data:") ? student.avatar : "");
  const fileRef                       = useRef(null);

  // Change Password state
  const [cpCurrent, setCpCurrent]     = useState("");
  const [cpNew, setCpNew]             = useState("");
  const [cpConfirm, setCpConfirm]     = useState("");
  const [cpSaving, setCpSaving]       = useState(false);
  const [cpSuccess, setCpSuccess]     = useState("");
  const [cpError, setCpError]         = useState("");
  const [showCpCurrent, setShowCpCurrent] = useState(false);
  const [showCpNew, setShowCpNew]     = useState(false);
  const [showCpConfirm, setShowCpConfirm] = useState(false);

  const cpStrength = (() => {
    if (!cpNew) return 0;
    let s = 0;
    if (cpNew.length >= 6) s++;
    if (cpNew.length >= 8) s++;
    if (/[A-Z]/.test(cpNew)) s++;
    if (/[0-9]/.test(cpNew)) s++;
    if (/[^A-Za-z0-9]/.test(cpNew)) s++;
    return Math.min(s, 4);
  })();
  const cpStrengthColors = ["#e2e8f0","#ef4444","#f59e0b","#22c55e","#16a34a"];
  const cpStrengthLabels = ["","Weak","Fair","Good","Strong"];

  const handleChangePassword = async () => {
    setCpError(""); setCpSuccess("");
    if (!cpCurrent || !cpNew || !cpConfirm) { setCpError("Please fill in all three fields."); return; }
    if (cpNew.length < 6) { setCpError("New password must be at least 6 characters."); return; }
    if (cpNew !== cpConfirm) { setCpError("New password and confirm password do not match."); return; }
    if (cpNew === cpCurrent) { setCpError("New password cannot be the same as your current password."); return; }
    setCpSaving(true);
    try {
      const token = localStorage.getItem("studentToken");
      const res = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: cpCurrent, newPassword: cpNew }),
      });
      const data = await res.json();
      if (data.success) {
        setCpSuccess("Password changed successfully!");
        setCpCurrent(""); setCpNew(""); setCpConfirm("");
        setTimeout(() => setCpSuccess(""), 4000);
      } else {
        setCpError(data.message || "Failed to change password.");
      }
    } catch { setCpError("Server error. Please try again."); }
    setCpSaving(false);
  };

  useEffect(() => {
    const changed =
      form.name      !== (student.name||"")      ||
      form.className !== (student.className||"") ||
      form.batch     !== (student.batch||"")     ||
      form.phone     !== (student.phone||"");
    setHasChanges(changed);
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
        body: JSON.stringify({ ...form, email: student.email }),
      });
      const data = await res.json();
      if (data.success) {
        const updated = { ...student, ...data.student, email: student.email };
        localStorage.setItem("studentInfo", JSON.stringify(updated));
        setStudent(updated);
        setSuccessMsg("Profile updated successfully!");
        setHasChanges(false);
        setTimeout(()=>setSuccessMsg(""), 3000);
      } else { setErrorMsg(data.message||"Failed to update"); }
    } catch { setErrorMsg("Server error. Please try again."); }
    setSaving(false);
  };

  const handleReset = () => {
    setForm({ name:student.name||"", className:student.className||"", batch:student.batch||"", phone:student.phone||"" });
    setErrorMsg(""); setSuccessMsg("");
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setErrorMsg("Image must be under 2MB"); return; }
    setUploadingPhoto(true);
    setErrorMsg("");
    try {
      const token = localStorage.getItem("studentToken");
      const fd = new FormData();
      fd.append("avatar", file);
      const res  = await fetch("/api/auth/avatar", { method:"POST", headers:{ Authorization:`Bearer ${token}` }, body: fd });
      const data = await res.json();
      if (data.success) {
        setAvatarSrc(data.avatar);
        const updated = { ...student, avatar: data.avatar };
        localStorage.setItem("studentInfo", JSON.stringify(updated));
        setStudent(updated);
        setSuccessMsg("Profile photo updated!");
        setTimeout(()=>setSuccessMsg(""), 3000);
      } else { setErrorMsg(data.message || "Upload failed"); }
    } catch { setErrorMsg("Upload failed. Please try again."); }
    setUploadingPhoto(false);
    e.target.value = "";
  };

  const initials = student.name ? student.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase() : "S";

  return (
    <div>

      {/* ── Main edit card ── */}
      <div className="sdpr-box" style={{marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:24}}>
          <MdEdit size={20} color="#7c3aed"/>
          <h3 style={{margin:0,fontSize:18,fontWeight:700,color:"#1e1b4b"}}>Edit Profile</h3>
          {hasChanges && <span className="sdpr-unsaved" style={{marginLeft:"auto"}}>Unsaved changes</span>}
        </div>

        {successMsg && <div className="sdpr-msg-ok" style={{marginBottom:16}}>✅ {successMsg}</div>}
        {errorMsg   && <div className="sdpr-msg-err" style={{marginBottom:16}}>⚠️ {errorMsg}</div>}

        {/* Avatar row */}
        <div style={{display:"flex",alignItems:"center",gap:20,marginBottom:28,paddingBottom:24,borderBottom:"1px solid #f0effe"}}>
          <div style={{position:"relative",flexShrink:0}}>
            {avatarSrc ? (
              <img src={avatarSrc} alt="avatar" style={{width:88,height:88,borderRadius:24,objectFit:"cover",border:"3px solid #ede9fe"}}/>
            ) : (
              <div style={{width:88,height:88,borderRadius:24,background:"linear-gradient(135deg,#7c3aed,#5b21b6)",display:"flex",alignItems:"center",justifyContent:"center",border:"3px solid #ede9fe"}}>
                <span style={{fontSize:32,fontWeight:800,color:"#fff"}}>{initials}</span>
              </div>
            )}
            <button
              onClick={()=>fileRef.current?.click()}
              disabled={uploadingPhoto}
              style={{position:"absolute",bottom:-4,right:-4,width:30,height:30,borderRadius:"50%",background:"#7c3aed",border:"2px solid #fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:"0 2px 6px rgba(124,58,237,0.4)"}}
              title="Change profile photo"
            >
              {uploadingPhoto
                ? <span style={{width:12,height:12,border:"2px solid #fff",borderTopColor:"transparent",borderRadius:"50%",display:"inline-block",animation:"spin 0.7s linear infinite"}}/>
                : <MdEdit size={14} color="#fff"/>
              }
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handlePhotoChange}/>
          </div>
          <div>
            <div style={{fontWeight:700,fontSize:18,color:"#1e1b4b"}}>{student.name||"Student"}</div>
            <div style={{color:"#6b7280",fontSize:13,marginTop:2}}>{student.email||""}</div>
            <div style={{color:"#7c3aed",fontSize:12,fontWeight:600,marginTop:6,cursor:"pointer"}} onClick={()=>fileRef.current?.click()}>
              📷 Change profile photo
            </div>
          </div>
        </div>

        {/* Form grid */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div className="sdpr-field" style={{margin:0}}>
            <label className="sdpr-label">Full Name <span className="sdpr-req">*</span></label>
            <input type="text" className="sdpr-input" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Your full name"/>
          </div>
          <div className="sdpr-field" style={{margin:0}}>
            <label className="sdpr-label">Mobile Number</label>
            <input type="tel" className="sdpr-input" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value.replace(/\D/g,"").slice(0,10)})} placeholder="10-digit mobile number"/>
          </div>
          <div className="sdpr-field" style={{margin:0}}>
            <label className="sdpr-label">Email Address <span style={{background:"#f0fdf4",color:"#16a34a",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:6,marginLeft:6}}>🔒 Fixed</span></label>
            <input type="email" className="sdpr-input" value={student.email||""} readOnly style={{background:"#f9fafb",color:"#6b7280",cursor:"not-allowed"}}/>
          </div>
          <div className="sdpr-field" style={{margin:0}}>
            <label className="sdpr-label">Class <span className="sdpr-req">*</span></label>
            <select className="sdpr-input" value={form.className} onChange={(e)=>setForm({...form,className:e.target.value})}>
              <option value="">Select your class</option>
              {["Class 9","Class 10","Class 11","Class 12","NIOS Stream 1","NIOS Stream 2","Dropper Batch"].map(cl=>(
                <option key={cl} value={cl}>{cl}</option>
              ))}
            </select>
          </div>
          <div className="sdpr-field" style={{margin:0,gridColumn:"1/-1"}}>
            <label className="sdpr-label">Batch <span className="sdpr-optional">(optional)</span></label>
            <input type="text" className="sdpr-input" value={form.batch} onChange={(e)=>setForm({...form,batch:e.target.value})} placeholder="e.g. Morning Batch"/>
          </div>
        </div>

        <div className="sdpr-actions" style={{marginTop:20}}>
          <button className="sdpr-reset-btn" onClick={handleReset} disabled={!hasChanges||saving}><MdClose size={15}/> Reset</button>
          <button className="sdpr-save-btn" onClick={handleSave} disabled={!hasChanges||saving}>
            {saving ? <><span className="sdpr-spinner"/>&nbsp;Saving...</> : <><MdSave size={15}/> Save Changes</>}
          </button>
        </div>
      </div>

      {/* ── Change Password card ── */}
      <div className="sdpr-box" style={{marginBottom:24}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
          <MdLock size={20} color="#7c3aed"/>
          <h3 style={{margin:0,fontSize:18,fontWeight:700,color:"#1e1b4b"}}>Change Password</h3>
        </div>

        {cpSuccess && <div className="sdpr-msg-ok" style={{marginBottom:16}}>✅ {cpSuccess}</div>}
        {cpError   && <div className="sdpr-msg-err" style={{marginBottom:16}}>⚠️ {cpError}</div>}

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
          {/* Current Password */}
          <div className="sdpr-field" style={{margin:0}}>
            <label className="sdpr-label">Current Password</label>
            <div style={{position:"relative"}}>
              <input type={showCpCurrent?"text":"password"} className="sdpr-input" value={cpCurrent} onChange={e=>setCpCurrent(e.target.value)} placeholder="Current password" style={{paddingRight:36}}/>
              <span onClick={()=>setShowCpCurrent(v=>!v)} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",cursor:"pointer",color:"#9ca3af",fontSize:16}}>{showCpCurrent?"🙈":"👁"}</span>
            </div>
          </div>
          {/* New Password */}
          <div className="sdpr-field" style={{margin:0}}>
            <label className="sdpr-label">New Password</label>
            <div style={{position:"relative"}}>
              <input type={showCpNew?"text":"password"} className="sdpr-input" value={cpNew} onChange={e=>setCpNew(e.target.value)} placeholder="New password (min 6 chars)" style={{paddingRight:36}}/>
              <span onClick={()=>setShowCpNew(v=>!v)} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",cursor:"pointer",color:"#9ca3af",fontSize:16}}>{showCpNew?"🙈":"👁"}</span>
            </div>
            {/* Strength bar */}
            {cpNew.length > 0 && (
              <div style={{display:"flex",alignItems:"center",gap:6,marginTop:6}}>
                <div style={{display:"flex",gap:3,flex:1}}>
                  {[1,2,3,4].map(i=>(
                    <div key={i} style={{flex:1,height:4,borderRadius:2,background:i<=cpStrength?cpStrengthColors[cpStrength]:"#e2e8f0"}}/>
                  ))}
                </div>
                <span style={{fontSize:10,fontWeight:700,color:cpStrengthColors[cpStrength]}}>{cpStrengthLabels[cpStrength]}</span>
              </div>
            )}
          </div>
          {/* Confirm Password */}
          <div className="sdpr-field" style={{margin:0}}>
            <label className="sdpr-label">Confirm New Password</label>
            <div style={{position:"relative"}}>
              <input type={showCpConfirm?"text":"password"} className="sdpr-input" value={cpConfirm} onChange={e=>setCpConfirm(e.target.value)} placeholder="Re-enter new password" style={{paddingRight:36}}/>
              <span onClick={()=>setShowCpConfirm(v=>!v)} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",cursor:"pointer",color:"#9ca3af",fontSize:16}}>{showCpConfirm?"🙈":"👁"}</span>
            </div>
            {cpConfirm.length>0 && (
              <div style={{display:"flex",alignItems:"center",gap:5,marginTop:6}}>
                {cpNew===cpConfirm
                  ? <><span style={{color:"#16a34a",fontSize:12}}>✓</span><span style={{fontSize:12,color:"#16a34a",fontWeight:600}}>Passwords match</span></>
                  : <><span style={{color:"#ef4444",fontSize:12}}>✗</span><span style={{fontSize:12,color:"#ef4444",fontWeight:600}}>Don't match</span></>
                }
              </div>
            )}
          </div>
        </div>

        {/* Rules */}
        <div style={{display:"flex",gap:16,flexWrap:"wrap",marginTop:12,padding:"10px 14px",background:"#f9fafb",borderRadius:10,border:"1px solid #f0effe"}}>
          {[
            {text:"At least 6 characters", ok:cpNew.length>=6},
            {text:"Must differ from current", ok:cpNew.length>0&&cpNew!==cpCurrent},
            {text:"Passwords match", ok:cpConfirm.length>0&&cpNew===cpConfirm},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:5}}>
              <span style={{color:r.ok?"#16a34a":"#9ca3af",fontSize:13}}>{r.ok?"✓":"○"}</span>
              <span style={{fontSize:12,color:r.ok?"#16a34a":"#6b7280",fontWeight:r.ok?700:400}}>{r.text}</span>
            </div>
          ))}
        </div>

        <div style={{marginTop:16,display:"flex",gap:10}}>
          <button className="sdpr-save-btn" onClick={handleChangePassword} disabled={cpSaving} style={{minWidth:160}}>
            {cpSaving ? <><span className="sdpr-spinner"/>&nbsp;Updating...</> : <><MdLock size={14}/> Update Password</>}
          </button>
          <button className="sdpr-reset-btn" onClick={()=>{setCpCurrent("");setCpNew("");setCpConfirm("");setCpError("");setCpSuccess("");}}>
            <MdClose size={14}/> Clear
          </button>
        </div>
      </div>

      {/* ── Info + Courses grid ── */}
      <div className="sdpr-grid">
        <div>
          <div className="sdpr-box">
            <h3>Contact Information</h3>
            {student.phone && (
              <div className="sdpr-info">
                <div className="sdpr-info-ic"><MdPhone size={16}/></div>
                <div><small>Mobile</small><b>+91 {student.phone}</b></div>
              </div>
            )}
            {student.email && (
              <div className="sdpr-info">
                <div className="sdpr-info-ic"><MdPerson size={16}/></div>
                <div><small>Email</small><b>{student.email}</b></div>
              </div>
            )}
          </div>
          <div className="sdpr-box" style={{marginTop:16}}>
            <h3>Academic Info</h3>
            <div className="sdpr-info">
              <div className="sdpr-info-ic"><MdSchool size={16}/></div>
              <div><small>Class</small><b>{student.className||"—"}</b></div>
            </div>
            <div className="sdpr-info">
              <div className="sdpr-info-ic"><FaGraduationCap size={14}/></div>
              <div><small>Batch</small><b>{student.batch||"—"}</b></div>
            </div>
          </div>
        </div>
        <div>
          <div className="sdpr-box">
            <h3 className="sdpr-cc-title">Current Courses</h3>
            {enrolledCourses.length === 0 ? (
              <p style={{color:"#888",fontSize:14}}>No enrolled courses yet.</p>
            ) : (
              enrolledCourses.map((c) => {
                const tc = getSubjectThumbClass(c.subject);
                const sc = getSubjectColor(c.subject);
                const totalLessons = c.chapters?.reduce((a,ch)=>a+ch.lessons.length,0)||0;
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
                        {totalLessons} Topics
                      </div>
                      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:4}}>
                        {c.subject && <span className="sdc-tag" style={{background:`${sc}22`,color:sc}}>{c.subject.toUpperCase()}</span>}
                        {c.batch && <span className="sdc-tag-cls-pill">{c.batch.toUpperCase()}</span>}
                      </div>
                    </div>
                    <button className="sdpr-btn-watch">▶ Continue</button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   SECURE YOUTUBE PLAYER
════════════════════════════════════════ */
/* In-app live chat panel — replaces YouTube Live Chat iframe */
function LiveChatPanel({ classId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText]         = useState("");
  const [sending, setSending]   = useState(false);
  const [error, setError]       = useState("");
  const bottomRef               = useRef(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("studentToken") : null;

  const fetchMessages = async () => {
    if (!classId || !token) return;
    try {
      const res = await fetch(`/api/onlineClasses/${classId}/chat`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setMessages(data.messages || []);
    } catch {}
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [classId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim() || !token) return;
    setSending(true); setError("");
    try {
      const res = await fetch(`/api/onlineClasses/${classId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ message: text.trim() }),
      });
      const data = await res.json();
      if (data.success) { setText(""); fetchMessages(); }
      else setError(data.message || "Failed to send");
    } catch { setError("Network error"); }
    setSending(false);
  };

  const onKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const timeStr = (iso) => {
    try { const d = new Date(iso); return `${d.getHours()}:${String(d.getMinutes()).padStart(2,"0")}`; }
    catch { return ""; }
  };

  return (
    <div style={{background:"#0f0f1e",borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",flexDirection:"column",height:340}}>
      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 14px 6px",borderBottom:"1px solid rgba(255,255,255,0.06)",flexShrink:0}}>
        <span style={{color:"#a78bfa",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",gap:5}}>
          <span style={{width:6,height:6,background:"#10b981",borderRadius:"50%",display:"inline-block"}}/>
          Live Chat
        </span>
        <span style={{color:"#4b5563",fontSize:10}}>{messages.length} messages</span>
      </div>
      {/* Messages */}
      <div style={{flex:1,overflowY:"auto",padding:"10px 14px",display:"flex",flexDirection:"column",gap:6}}>
        {messages.length === 0 && (
          <div style={{color:"#4b5563",fontSize:12,textAlign:"center",marginTop:20}}>No messages yet. Start the conversation!</div>
        )}
        {messages.map((m, i) => (
          <div key={m._id || i} style={{display:"flex",gap:8,alignItems:"flex-start"}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:"#6c47d4",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"white",fontWeight:700,flexShrink:0}}>
              {(m.senderName||"S")[0].toUpperCase()}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                <span style={{color:"#a78bfa",fontSize:11,fontWeight:700}}>{m.senderName}</span>
                <span style={{color:"#374151",fontSize:10}}>{timeStr(m.createdAt)}</span>
              </div>
              <div style={{color:"#d1d5db",fontSize:12,lineHeight:1.4,wordBreak:"break-word"}}>{m.message}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef}/>
      </div>
      {/* Input */}
      {error && <div style={{padding:"4px 14px",color:"#ef4444",fontSize:11}}>{error}</div>}
      <div style={{display:"flex",gap:6,padding:"8px 10px",borderTop:"1px solid rgba(255,255,255,0.06)",flexShrink:0}}>
        <input
          value={text} onChange={e=>setText(e.target.value)} onKeyDown={onKey}
          placeholder="Type a message..."
          maxLength={500}
          style={{flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:6,padding:"6px 10px",color:"#e2e8f0",fontSize:12,outline:"none"}}
        />
        <button
          onClick={sendMessage} disabled={sending || !text.trim()}
          style={{background:sending||!text.trim()?"#2d2d4e":"#6c47d4",color:"white",border:"none",borderRadius:6,padding:"6px 12px",fontSize:12,fontWeight:700,cursor:sending||!text.trim()?"not-allowed":"pointer",flexShrink:0}}
        >
          {sending ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

function SecureYouTubePlayer({ videoId, isLive = false, classId = null }) {
  const divId     = useRef(`syp-${Math.random().toString(36).slice(2)}`);
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(false);
  const [ready,   setReady]   = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    let destroyed = false;

    function initPlayer() {
      const el = document.getElementById(divId.current);
      if (!el || destroyed) return;
      // eslint-disable-next-line no-new
      new window.YT.Player(divId.current, {
        videoId,
        playerVars: { autoplay: 1, controls: 0, rel: 0, modestbranding: 1, iv_load_policy: 3, fs: 0, disablekb: 1, playsinline: 1 },
        events: {
          onReady: (e) => {
            if (destroyed) return;
            playerRef.current = e.target;
            setReady(true);
            setPlaying(true);
            try { e.target.playVideo(); } catch {}
          },
          onStateChange: (e) => {
            if (destroyed) return;
            const s = e.data;
            setPlaying(s === window.YT.PlayerState.PLAYING || s === window.YT.PlayerState.BUFFERING);
          },
          onError: () => { if (!destroyed) setReady(false); },
        },
      });
    }

    // Small delay ensures div is in DOM before YT.Player tries to find it
    const timer = setTimeout(() => {
      if (window.YT && window.YT.Player) {
        initPlayer();
      } else {
        if (!document.getElementById("yt-iframe-api")) {
          const tag = document.createElement("script");
          tag.id = "yt-iframe-api";
          tag.src = "https://www.youtube.com/iframe_api";
          document.head.appendChild(tag);
        }
        const prev = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => { if (prev) prev(); initPlayer(); };
      }
    }, 50);

    return () => {
      destroyed = true;
      clearTimeout(timer);
      try { playerRef.current?.destroy(); } catch {}
      playerRef.current = null;
      setReady(false);
      setPlaying(false);
    };
  }, [videoId]);

  const containerRef = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const onFsChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const togglePlay = () => {
    if (!playerRef.current || !ready) return;
    try { playing ? playerRef.current.pauseVideo() : playerRef.current.playVideo(); } catch {}
  };
  const toggleMute = () => {
    if (!playerRef.current || !ready) return;
    try {
      if (muted) { playerRef.current.unMute(); setMuted(false); }
      else        { playerRef.current.mute();   setMuted(true);  }
    } catch {}
  };
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const iconBtn = (onClick, active = true) => ({
    onClick, disabled: !active,
    style: {
      display:"flex", alignItems:"center", justifyContent:"center",
      background: "rgba(255,255,255,0.07)",
      color: active ? "#e2e8f0" : "#444",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 8, padding: "6px 10px",
      cursor: active ? "pointer" : "not-allowed",
      transition: "background 0.15s", flexShrink: 0,
    }
  });

  return (
    <div ref={containerRef} style={{borderRadius:"14px 14px 0 0",background:"#0a0a14"}}>
      {/* Video area — overflow hidden only here for radius */}
      <div style={{position:"relative",paddingBottom:"56.25%",height:0,background:"#0a0a14",borderRadius:"14px 14px 0 0",overflow:"hidden"}}>
        <div id={divId.current} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}/>
        {/* Full overlay — blocks all YouTube UI; click = play/pause */}
        <div style={{position:"absolute",inset:0,zIndex:10,cursor:ready?"pointer":"default"}} onClick={togglePlay}/>
        {/* Loading */}
        {!ready && (
          <div style={{position:"absolute",inset:0,zIndex:20,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#0a0a14",gap:12}}>
            <div style={{width:36,height:36,border:"3px solid #6c47d422",borderTop:"3px solid #6c47d4",borderRadius:"50%",animation:"spin 0.8s linear infinite"}}/>
            <span style={{color:"#6b7280",fontSize:12}}>Loading stream...</span>
          </div>
        )}
        {/* Paused overlay */}
        {ready && !playing && (
          <div style={{position:"absolute",inset:0,zIndex:11,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
            <div style={{background:"rgba(108,71,212,0.8)",borderRadius:"50%",width:60,height:60,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <MdPlayCircle size={38} color="#fff"/>
            </div>
          </div>
        )}
        {/* LIVE pill — inside video top-right, always visible */}
        {isLive && (
          <div style={{position:"absolute",top:10,right:10,zIndex:12,display:"flex",alignItems:"center",gap:5,background:"rgba(239,68,68,0.9)",borderRadius:20,padding:"4px 10px",backdropFilter:"blur(4px)"}}>
            <span style={{width:6,height:6,background:"#fff",borderRadius:"50%",display:"inline-block",animation:"pulse 1.2s ease-in-out infinite"}}/>
            <span style={{color:"#fff",fontSize:11,fontWeight:800,letterSpacing:1.5}}>LIVE</span>
          </div>
        )}
      </div>

      {/* Control bar — single row */}
      <div style={{display:"flex",alignItems:"center",gap:6,padding:"9px 12px",background:"linear-gradient(135deg,#0f0f1e,#160f30)"}}>
        {/* Play/Pause */}
        <button
          onClick={togglePlay} disabled={!ready}
          style={{display:"flex",alignItems:"center",gap:5,background:ready?"#6c47d4":"#2d2d4e",color:"#fff",border:"none",borderRadius:8,padding:"6px 14px",fontWeight:700,cursor:ready?"pointer":"not-allowed",fontSize:12,flexShrink:0,whiteSpace:"nowrap"}}
        >
          {playing ? <><MdPauseCircle size={15}/> Pause</> : <><MdPlayCircle size={15}/> Play</>}
        </button>

        {/* Mute — icon only */}
        <button {...iconBtn(toggleMute, ready)} title={muted ? "Unmute" : "Mute"}>
          {muted ? <MdVolumeOff size={18} color="#f59e0b"/> : <MdVolumeUp size={18}/>}
        </button>

        <div style={{flex:1}}/>

        {!isLive && <span style={{color:"#4b5563",fontSize:11,whiteSpace:"nowrap"}}>⏺ Rec</span>}

        {/* Chat toggle — only for live */}
        {isLive && (
          <button
            onClick={() => setShowChat(c => !c)}
            style={{display:"flex",alignItems:"center",gap:4,background:showChat?"rgba(108,71,212,0.3)":"rgba(255,255,255,0.07)",color:showChat?"#a78bfa":"#9ca3af",border:`1px solid ${showChat?"#6c47d4":"rgba(255,255,255,0.1)"}`,borderRadius:8,padding:"6px 10px",cursor:"pointer",fontSize:11,fontWeight:600,flexShrink:0}}
          >
            💬 {showChat ? "Hide Chat" : "Live Chat"}
          </button>
        )}

        {/* Fullscreen — icon only */}
        <button {...iconBtn(toggleFullscreen, true)} title={fullscreen ? "Exit fullscreen" : "Fullscreen"}>
          {fullscreen ? <MdFullscreenExit size={18}/> : <MdFullscreen size={18}/>}
        </button>
      </div>

      {/* In-app Live Chat panel */}
      {isLive && showChat && classId && <LiveChatPanel classId={classId} />}

      <style>{`
        @keyframes spin  { to { transform:rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
      `}</style>
    </div>
  );
}

/* ════════════════════════════════════════
   CLASS CARD
════════════════════════════════════════ */
function ClassCard({ cls, formatDate, formatTime, getYoutubeId }) {
  const [watching, setWatching]   = useState(false);
  const [recording, setRecording] = useState(false);
  const isLocked = cls.isUnlocked === false;
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
    <div className="sdc-card-meta" style={{marginTop:10}}>
      <div className="sdc-meta-left">
        <span className="sdc-meta-item">
          <img src="/assets/images/online-classes/icons/chapter.svg" alt="" className="sdc-meta-icon"/>
          {cls.chapters?.length||0} Chapters
        </span>
        <span className="sdc-meta-item">
          <img src="/assets/images/online-classes/icons/lesson.svg" alt="" className="sdc-meta-icon"/>
          {cls.chapters?.reduce((a,c)=>a+c.lessons.length,0)||0} Topics
        </span>
      </div>
      <div className="sdc-meta-right">
        {cls.subject && <span className="sdc-tag" style={{background:`${subjectColor}22`,color:subjectColor}}>{cls.subject.toUpperCase()}</span>}
        {(cls.batch||cls.className) && <span className="sdc-tag-cls-pill">{(cls.batch||cls.className).toUpperCase()}</span>}
      </div>
    </div>
  );

  /* ── LOCKED (not enrolled in this subject) ── */
  if (isLocked) {
    return (
      <div className="sdc-card" style={{position:"relative",overflow:"hidden"}}>
        <div className={`sdc-card-thumb ${thumbClass}`} style={{...thumbStyle,filter:"blur(2px)",opacity:0.5}}/>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.55)",zIndex:2}}>
          <span style={{fontSize:32,marginBottom:8}}>🔒</span>
          <div style={{color:"white",fontWeight:700,fontSize:14,textAlign:"center",padding:"0 16px"}}>Purchase {cls.subject} course to unlock</div>
          <div style={{color:"rgba(255,255,255,0.7)",fontSize:12,marginTop:4}}>{cls.batch}</div>
        </div>
        <div className="sdc-card-body">
          {meta}
          <div className="sdc-cc-name" style={{color:"#9ca3af"}}>{cls.title}</div>
          <div style={{padding:"6px 12px",background:"#f3f4f6",borderRadius:8,fontSize:12,color:"#6b7280",textAlign:"center"}}>
            {cls.status==="live"?"🔴 Live now — purchase to watch":cls.status==="upcoming"?`🕐 ${formatDate(cls.date)}`:"✓ Completed"}
          </div>
        </div>
      </div>
    );
  }

  /* ── LIVE ── */
  if (cls.status === "live") {
    return (
      <div className="sdc-card">
        {watching && ytId ? (
          <SecureYouTubePlayer videoId={ytId} isLive={true} classId={cls._id} />
        ) : thumb}
        <div className="sdc-card-body">
          {meta}
          <div className="sdc-cc-name">{cls.title}</div>
          <div className="clsc-prog-bar"><i style={{width:"30%",background:"#f0473e"}}/></div>
          <button className="sdc-btn clsc-btn-live" onClick={() => ytId && setWatching(!watching)} disabled={!ytId} style={{opacity:ytId?1:0.5}}>
            {watching ? "✕ Close Stream" : "▶ Watch Now"}
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
          <>
            <button className="sdc-btn clsc-btn-done" onClick={() => setRecording(!recording)}>
              {recording ? "✕ Close Recording" : "▶ Watch Recording"}
            </button>
            {recording && ytId && (
              <div style={{marginTop:10,borderRadius:10,overflow:"hidden"}}>
                <SecureYouTubePlayer videoId={ytId} isLive={false} />
              </div>
            )}
          </>
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
//             <span>•</span><span>{totalLessons} Topics</span>
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
//                     <span className="scp-chapter-count">{chapter.lessons.length} topics</span>
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



