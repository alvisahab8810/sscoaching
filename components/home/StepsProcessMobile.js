import React from "react";
import Link from "next/link";

export default function StepProcessMobile() {
  return (
    <section className="process-section desktop-none">
      <div className="container">
        <h2 className="process-title">
          Easy NIOS Admission <span className="highlight">with SS Coaching</span>
        </h2>
        <div className="process-container">
          <div className="process-content mobile-none">
            <div className="process-steps">

              <div className="process-step">
                <div className="step-number">01</div>
                <div className="step-content">
                  <h3>Visit a Branch</h3>
                  <p>
                    Walk in to your nearest SS Coaching branch, discuss your NIOS subjects, and get enrolled the same day.
                  </p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-content">
                  <h3>Get Study Material</h3>
                  <p>
                    Receive chapter notes, solved TMAs, and previous year papers — ready to use from day one.
                  </p>
                </div>
                <div className="step-number">02</div>
              </div>

              <div className="process-step">
                <div className="step-number">03</div>
                <div className="step-content">
                  <h3>Attend Regular Classes</h3>
                  <p>
                    Learn from experienced NIOS faculty with full syllabus coverage and assignment support.
                  </p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-content">
                  <h3>Practice &amp; Pass</h3>
                  <p>
                    Mock tests, revision sessions, and doubt-clearing classes to clear your NIOS board exam confidently.
                  </p>
                </div>
                <div className="step-number">04</div>
              </div>

            </div>
          </div>

          <div className="mobile-scroll-section">
            <div className="card-one">
              <div className="card-one-number">1</div>
              <div className="card-one-content">
                <h3 className="card-one-title">Visit a Branch</h3>
                <p className="card-one-text">
                  Walk in to your nearest SS Coaching branch, discuss your NIOS subjects, and get enrolled the same day.
                </p>
              </div>
            </div>

            <div className="card-two">
              <div className="card-two-number">2</div>
              <div className="card-two-content">
                <h3 className="card-two-title">Get Study Material</h3>
                <p className="card-two-text">
                  Receive chapter notes, solved TMAs, and previous year papers — ready to use from day one.
                </p>
              </div>
            </div>

            <div className="card-three">
              <div className="card-three-number">3</div>
              <div className="card-three-content">
                <h3 className="card-three-title">Attend Regular Classes</h3>
                <p className="card-three-text">
                  Learn from experienced NIOS faculty with full syllabus coverage and assignment support.
                </p>
              </div>
            </div>

            <div className="card-one">
              <div className="card-one-number">4</div>
              <div className="card-one-content">
                <h3 className="card-one-title">Practice &amp; Pass</h3>
                <p className="card-one-text">
                  Mock tests, revision sessions, and doubt-clearing classes to clear your NIOS board exam confidently.
                </p>
              </div>
            </div>
          </div>

          <div className="process-images">
            <img
              src="/assets/images/home/steps-process/photo1.svg"
              alt="NIOS admission guidance and learning process for students at SS Coaching"
              title="Start Your NIOS Journey with SS Coaching Lucknow"
              className="process-image process-1"
            />

            <div className="process-stat">
              <div className="stat-avatars">
                <img
                  src="/assets/images/home/steps-process/avatar.svg"
                  alt="Student 1"
                  className="stat-avatar"
                />
                <img
                  src="/assets/images/home/steps-process/avatar1.svg"
                  alt="Student 2"
                  className="stat-avatar"
                />
                <img
                  src="/assets/images/home/steps-process/avatar2.svg"
                  alt="Student 3"
                  className="stat-avatar"
                />
              </div>
              <div className="stat-text">
                <h4>100K +</h4>
                <p>Students passed</p>
              </div>
            </div>

            <img
              src="/assets/images/home/steps-process/photo.svg"
              alt="NIOS admission guidance and learning process for students at SS Coaching"
              title="Start Your NIOS Journey with SS Coaching Lucknow"
              className="process-image process-2"
            />
          </div>

          <div style={{ textAlign: "center", marginTop: "28px" }}>
            <Link
              href="/contact-us"
              style={{
                display: "inline-block",
                background: "#4441e5",
                color: "#fff",
                padding: "13px 28px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              Start Your NIOS Admission Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
