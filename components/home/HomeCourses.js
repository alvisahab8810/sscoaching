import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ICON_BASE = "/assets/images/courses/icons";

const FEATURES = [
  { icon: "live-classes.svg", line1: "Live", line2: "Classes" },
  { icon: "study-materials.svg", line1: "Study", line2: "Materials" },
  { icon: "doubt-clearing-sessions.svg", line1: "Doubt Clearing", line2: "Sessions" },
  { icon: "solved-tmas.svg", line1: "Solved", line2: "TMA's" },
  { icon: "question-bank.svg", line1: "Get Question", line2: "Bank" },
  { icon: "study-tracker.svg", line1: "Study", line2: "Tracker" },
  { icon: "experienced-teachers.svg", line1: "Experienced", line2: "Teachers" },
];

// Shown on every card. There is no rating field on the Course model, so this
// mirrors the aggregate Google rating used elsewhere on the site.
const RATING = { score: "4.7", count: "101K" };

const SECTIONS = [
  { batch: "Class 10", prefix: "10th NIOS", suffix: "Online Courses" },
  { batch: "Class 12", prefix: "12th NIOS", suffix: "Online Courses" },
];

const CARDS_PER_SECTION = 4;

// Courses store the batch as "Class 10" / "Class 12"; the cards show it ordinal.
function formatBatch(batch) {
  return (batch || "").replace(/(\d+)\s*$/, "$1th");
}

function CourseCard({ course, onClick }) {
  const isBundle = course.courseType === "bundle";
  const chapters = course.chapters?.length || 0;
  const topics =
    course.chapters?.reduce((a, c) => a + (c.lessons?.length || 0), 0) || 0;
  const subjects = (course.bundledSubjects || []).length;

  return (
    <div className="hc-card" onClick={() => onClick(course)}>
      <div className="hc-thumb">
        {/* a missing upload would otherwise render the alt text inside the card */}
        <img
          src={course.featureImage}
          alt={course.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.visibility = "hidden";
          }}
        />
      </div>

      <div className="hc-tags">
        {isBundle ? (
          <span className="hc-tag hc-tag--bundle">Bundle</span>
        ) : (
          <span className="hc-tag hc-tag--subject">
            {course.subject || "Course"}
          </span>
        )}
        <span className="hc-tag hc-tag--class">{formatBatch(course.batch)}</span>
      </div>

      <h3 className="hc-title">{course.title.trim()}</h3>

      <div className="hc-meta">
        <span className="hc-meta-item hc-meta-item--rating">
          <span className="hc-star">&#9733;</span>
          {RATING.score} ({RATING.count})
        </span>

        <span className="hc-meta-right">
          {isBundle ? (
            <span className="hc-meta-item">{subjects} Subjects</span>
          ) : (
            <>
              <span className="hc-meta-item">
                <img src={`${ICON_BASE}/chapter.svg`} alt="" aria-hidden="true" />
                {chapters} Chapters
              </span>
              <span className="hc-meta-item">
                <img src={`${ICON_BASE}/topic.svg`} alt="" aria-hidden="true" />
                {topics} Topics
              </span>
            </>
          )}
        </span>
      </div>

      <button type="button" className="hc-buy">
        BUY NOW
      </button>
    </div>
  );
}

export default function HomeCourses() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCourses(d.courses || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleClick = () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("studentToken");
    router.push(token ? "/student/dashboard" : "/student/login");
  };

  if (loading || !courses.length) return null;

  return (
    <section className="hc-section">
      <div className="container">
        {SECTIONS.map((section) => {
          const list = courses
            .filter((c) => c.batch === section.batch)
            .slice(0, CARDS_PER_SECTION);

          if (!list.length) return null;

          return (
            <div className="hc-block" key={section.batch}>
              <div className="hc-head">
                <h2 className="hc-head-title">
                  <span>{section.prefix}</span> {section.suffix}
                </h2>
                <a href="/student/login" className="hc-view-all">
                  View all 
                </a>
              </div>

              <div className="hc-panel">
                <div className="hc-grid">
                  {list.map((course) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      onClick={handleClick}
                    />
                  ))}
                </div>

                {/* On phones the "View all" link sits inside the panel, under the cards */}
                <a href="/student/login" className="hc-view-all hc-view-all--mobile">
                  View all 
                </a>

                <div className="hc-features">
                  {FEATURES.map((f) => (
                    <div className="hc-feature" key={f.icon}>
                      <img src={`${ICON_BASE}/${f.icon}`} alt="" aria-hidden="true" />
                      <span>
                        {f.line1}
                        <br />
                        {f.line2}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
