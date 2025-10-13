import React from "react";

export default function StepProcess() {
  return (
    <section className="process-section mobile-none">
      <div className="container">
        <div className="process-container">
          <div className="process-content">
            <h2 className="process-title">
              Our Simple <span className="highlight">3-Step Process</span>
            </h2>
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
