import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const SUBJECT_META = {
  hindi:        { color: "#7c3aed", light: "#f5f3ff", icon: "🪔" },
  english:      { color: "#e11d48", light: "#fff1f2", icon: "📖" },
  mathematics:  { color: "#1d4ed8", light: "#eff6ff", icon: "📐" },
  maths:        { color: "#1d4ed8", light: "#eff6ff", icon: "📐" },
  physics:      { color: "#0284c7", light: "#f0f9ff", icon: "⚛️" },
  chemistry:    { color: "#d97706", light: "#fffbeb", icon: "🧪" },
  biology:      { color: "#16a34a", light: "#f0fdf4", icon: "🧬" },
  science:      { color: "#16a34a", light: "#f0fdf4", icon: "🔬" },
  history:      { color: "#ea580c", light: "#fff7ed", icon: "🏛️" },
  geography:    { color: "#059669", light: "#ecfdf5", icon: "🌍" },
  accounts:     { color: "#ca8a04", light: "#fefce8", icon: "📊" },
  economics:    { color: "#0d9488", light: "#f0fdfa", icon: "📈" },
  "political science": { color: "#6d28d9", light: "#f5f3ff", icon: "⚖️" },
  default:      { color: "#4441e5", light: "#f0eeff", icon: "📚" },
};

function getMeta(subject) {
  const key = (subject || "").toLowerCase().trim();
  return SUBJECT_META[key] || SUBJECT_META.default;
}

function CourseCard({ course, onClick }) {
  const meta     = getMeta(course.subject);
  const isBundle = course.courseType === "bundle";
  const lessons  = course.chapters?.reduce((a, c) => a + (c.lessons?.length || 0), 0) || 0;
  const chapters = course.chapters?.length || 0;

  return (
    <div className="hcc-card" onClick={() => onClick(course)}>
      {/* Top colour strip */}
      <div className="hcc-strip" style={{ background: meta.color }} />

      {/* Thumbnail */}
      <div className="hcc-thumb">
        {course.featureImage ? (
          <img src={course.featureImage} alt={course.title} className="hcc-img" />
        ) : (
          <div className="hcc-no-img" style={{ background: meta.light }}>
            <span style={{ fontSize: 48 }}>{isBundle ? "📦" : meta.icon}</span>
          </div>
        )}
        {/* overlay badges */}
        <div className="hcc-badges">
          <span className="hcc-subj-badge" style={{ background: meta.color }}>
            {isBundle ? "Bundle" : (course.subject || "Course")}
          </span>
          {course.isFree && <span className="hcc-free-badge">FREE</span>}
        </div>
      </div>

      {/* Content */}
      <div className="hcc-content">
        <h3 className="hcc-title">{course.title}</h3>

        <div className="hcc-chips">
          {!isBundle && course.batch && (
            <span className="hcc-chip"><i>📅</i>{course.batch}</span>
          )}
          {isBundle && (
            <span className="hcc-chip"><i>📦</i>{(course.bundledSubjects || []).length} Subjects</span>
          )}
          {!isBundle && chapters > 0 && (
            <span className="hcc-chip"><i>📂</i>{chapters} ch</span>
          )}
          {!isBundle && lessons > 0 && (
            <span className="hcc-chip"><i>▶</i>{lessons} lessons</span>
          )}
        </div>

        {course.description && (
          <p className="hcc-desc">{course.description}</p>
        )}
      </div>

      {/* Footer */}
      <div className="hcc-footer">
        <div className="hcc-price-wrap">
          {course.isFree ? (
            <span className="hcc-free-price">Free</span>
          ) : (
            <>
              <span className="hcc-price">₹{Number(course.price).toLocaleString("en-IN")}</span>
              {course.enrolledCount > 0 && (
                <span className="hcc-enrolled">👥 {course.enrolledCount} students</span>
              )}
            </>
          )}
        </div>
        <button className="hcc-btn" style={{ background: meta.color }}>
          Enroll →
        </button>
      </div>
    </div>
  );
}

export default function HomeCourses() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then(r => r.json())
      .then(d => { if (d.success) setCourses(d.courses || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleClick = () => {
    const token = typeof window !== "undefined" && localStorage.getItem("studentToken");
    router.push(token ? "/student/dashboard" : "/student/login");
  };

  if (loading || !courses.length) return null;

  return (
    <section className="hcc-section">
      <div className="container">
        {/* Header */}
        <div className="hcc-header">
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Our <span className="highlight">Courses</span>
          </h2>
          <a href="/student/login" className="hcc-see-all">See all courses →</a>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={3800}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          freeMode={true}
          grabCursor={true}
          breakpoints={{
            0:    { slidesPerView: 1.5, spaceBetween: 12 },
            480:  { slidesPerView: 2.1, spaceBetween: 16 },
            768:  { slidesPerView: 3,   spaceBetween: 18 },
            1024: { slidesPerView: 4,   spaceBetween: 20 },
          }}
        >
          {courses.map(course => (
            <SwiperSlide key={course._id} style={{ height: "auto" }}>
              <CourseCard course={course} onClick={handleClick} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .hcc-section {
          padding: 64px 0 80px;
          margin-bottom: 100px;
          background: #f8f7ff;
          border-top: 1px solid #ebe8fe;
        }

        .hcc-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 28px;
        }

        .hcc-see-all {
          font-size: 13.5px;
          font-weight: 700;
          color: #4441e5;
          text-decoration: none;
          border: 2px solid #4441e5;
          border-radius: 8px;
          padding: 8px 18px;
          transition: all 0.18s;
          white-space: nowrap;
          font-family: 'Poppins', sans-serif;
        }
        .hcc-see-all:hover {
          background: #4441e5;
          color: #fff;
        }

        /* ─── Card ─── */
        :global(.hcc-card) {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1.5px solid #ede9fe;
          transition: transform 0.22s, box-shadow 0.22s;
          position: relative;
          user-select: none;
        }
        :global(.hcc-card:hover) {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(68,65,229,0.13);
          border-color: #c4b5fd;
        }

        /* colour strip top */
        :global(.hcc-strip) {
          height: 4px;
          width: 100%;
          flex-shrink: 0;
        }

        /* Thumb */
        :global(.hcc-thumb) {
          position: relative;
          height: 152px;
          overflow: hidden;
          flex-shrink: 0;
        }
        :global(.hcc-img) {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.4s ease;
        }
        :global(.hcc-card:hover .hcc-img) {
          transform: scale(1.04);
        }
        :global(.hcc-no-img) {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
        }
        :global(.hcc-badges) {
          position: absolute; top: 10px; left: 10px;
          display: flex; gap: 6px; flex-wrap: wrap;
        }
        :global(.hcc-subj-badge) {
          color: #fff; font-size: 10px; font-weight: 800;
          padding: 3px 10px; border-radius: 100px;
          text-transform: uppercase; letter-spacing: 0.06em;
          backdrop-filter: blur(4px);
        }
        :global(.hcc-free-badge) {
          background: #16a34a; color: #fff;
          font-size: 10px; font-weight: 800;
          padding: 3px 9px; border-radius: 100px;
          letter-spacing: 0.04em;
        }

        /* Content */
        :global(.hcc-content) {
          padding: 14px 15px 8px;
          flex: 1;
        }
        :global(.hcc-title) {
          font-size: 14px; font-weight: 800; color: #0f172a;
          line-height: 1.35; margin: 0 0 8px;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
          font-family: 'Poppins', sans-serif;
        }
        :global(.hcc-chips) {
          display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 8px;
        }
        :global(.hcc-chip) {
          display: inline-flex; align-items: center; gap: 3px;
          font-size: 10.5px; color: #475569; background: #f1f5f9;
          border-radius: 6px; padding: 3px 8px; font-weight: 600;
        }
        :global(.hcc-chip i) {
          font-style: normal; font-size: 11px;
        }
        :global(.hcc-desc) {
          font-size: 11.5px; color: #94a3b8; line-height: 1.55;
          margin: 0; display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }

        /* Footer */
        :global(.hcc-footer) {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 10px 15px 14px;
          border-top: 1px solid #f1f5f9;
          gap: 8px;
        }
        :global(.hcc-price-wrap) {
          display: flex; flex-direction: column; gap: 1px;
          min-width: 0;
        }
        :global(.hcc-free-price) {
          font-size: 17px; font-weight: 900; color: #16a34a;
        }
        :global(.hcc-price) {
          font-size: 17px; font-weight: 900; color: #0f172a;
          white-space: nowrap;
        }
        :global(.hcc-enrolled) {
          font-size: 10px; color: #94a3b8; font-weight: 600;
        }
        :global(.hcc-btn) {
          flex-shrink: 0;
          color: #fff; border: none; border-radius: 9px;
          padding: 7px 16px; font-size: 12px; font-weight: 700;
          cursor: pointer; transition: opacity 0.15s, transform 0.15s;
          font-family: 'Poppins', sans-serif; white-space: nowrap;
        }
        :global(.hcc-btn:hover) {
          opacity: 0.87; transform: scale(1.03);
        }

        @media (max-width: 768px) {
          .hcc-section { padding: 44px 0 56px; margin-bottom: 0 !important; }
        }
      `}</style>
    </section>
  );
}
