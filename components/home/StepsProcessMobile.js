import React from "react";

export default function StepProcessMobile() {
  return (
    <section className="process-section desktop-none">
      <div className="container">
        <h2 className="process-title">
          Our Simple <span className="highlight">3-Step Process</span>
        </h2>
        <div className="process-container">
          <div className="process-content mobile-none">
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">01</div>
                <div className="step-content">
                  <h3>Free Counselling</h3>
                  <p>
                    Get expert guidance from our supportive teachers for easy
                    admission.
                  </p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-content">
                  <h3>Start Learning</h3>
                  <p>
                    Begin your classes with flexible study options and prepare
                    confidently for exams.
                  </p>
                </div>
                <div className="step-number">02</div>
              </div>

              <div className="process-step">
                <div className="step-number">03</div>
                <div className="step-content">
                  <h3>Pass with NIOS</h3>
                  <p>
                    Score high, earn a valid government-recognized certificate,
                    and move forward in your career.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mobile-scroll-section">
            <div className="card-one">
              <div className="card-one-number">1</div>
              <div className="card-one-content">
                <h3 className="card-one-title">Free Counselling</h3>
                <p className="card-one-text">
                  Get expert guidance from our supportive teachers for easy
                  admission.
                </p>
              </div>
            </div>

            <div className="card-two">
              <div className="card-two-number">2</div>
              <div className="card-two-content">
                <h3 className="card-two-title">Start Learning</h3>
                <p className="card-two-text">
                  Begin your learning journey with flexible schedules and guided
                  preparation.
                </p>
              </div>
            </div>

            <div className="card-three">
              <div className="card-three-number">3</div>
              <div className="card-three-content">
                <h3 className="card-three-title">Achieve Success</h3>
                <p className="card-three-text">
                  Complete your course with confidence and achieve your
                  educational goals.
                </p>
              </div>
            </div>
          </div>

          <div className="process-images">
            <img
              src="/assets/images/home/steps-process/photo1.svg"
              alt="Student studying"
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
                <h4>50K +</h4>
                <p>Students passed</p>
              </div>
            </div>

            <img
              src="/assets/images/home/steps-process/photo.svg"
              alt="Students in classroom"
              className="process-image process-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
