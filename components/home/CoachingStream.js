import React from "react";

export default function CoachingStream() {
  return (
    <section className="coaching-section">
      <div className="container">
        <h2 className="coaching-title">

          We Are the Best Nios Coaching in <span className="highlight">India</span>
        </h2>
        <div className="coaching-grid">
          <div className="coaching-card">
            <div className="coaching-header">
              <div className="coaching-text">
                Failed in 9th & 11th get admission in 10th & 12th
              </div>
              <div className="coaching-icon">
                <img
                  src="/assets/icons/arrow1.svg"
                  alt="Stream 1 Icon"
                />
              </div>
            </div>
            <div className="coaching-content">
              <h3>
                NIOS Stream 1 (Saves Time)
              </h3>
              <p className="para-primary">
                9th & 11th failed students can get NIOS Admission to pass
                directly 10th & 12th in Stream 1st of NIOS board by getting NIOS
                Admission in best NIOS Coaching in Lucknow - CBSE Pattern (GOVT
                OF INDIA).
              </p>
            </div>
          </div>
          <div className="coaching-card">
            <div className="coaching-header stream2">
              <div className="coaching-text">Pass 10th & 12th in <br/> same year</div>
              <div className="coaching-icon">
                <img
                  src="/assets/icons/arrow2.svg"
                  alt="Stream 2 Icon"
                />
              </div>
            </div>
            <div className="coaching-content">
              <h3>
                NIOS Stream 2 (Saves Year)
              </h3>
              <p className="para-primary">
                Failed Student from any recognize board of India can get
                admission & pass 10th & 12th the same year through NIOS board in
                Stream 2- CBSE Pattern (GOVT OF INDIA).
              </p>
            </div>
          </div>
          <div className="coaching-card">
            <div className="coaching-header stream3">
              <div className="coaching-text">Pass 10th & 12th in<br/> 45 Days</div>
              <div className="coaching-icon">
                <img
                  src="/assets/icons/arrow3.svg"
                  alt="Stream 3 Icon"
                />
              </div>
            </div>
            <div className="coaching-content">
              <h3>
                NIOS Stream 3 & 4 (Pass in 45 Days)
              </h3>
              <p className="para-primary">
                The students who fail any recognized board in India can pass
                within 45 Days with the top On-Demand Examination System (ODES)
                at NIOS board, following the CBSE pattern.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
