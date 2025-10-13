import React from "react";

export default function StatsSectionMobile() {
  return (
    <section className="stats-section stats-section-mobile desktop-none">
      <div className="container">

        <div className="info-mob-card">
            <img src="/assets/icons/abstract.svg" alt="Abstract Icons" className="abstrac-icon"></img>
    
            <h2 className="section-title-mobile">Best NIOS Board Coaching</h2>
        <h2 className="highlight-mobile">in Uttar Pradesh</h2>
        <div className="stats-grid-items">
          <div className="stat-item">
            <div className="stat-icon">
              <img
                src="/assets/icons/stats/google.svg"
                alt="Google Reviews Icon"
              />
            </div>
            <div className="stat-content">
              <h3>4.8</h3>
              <p>Google reviews</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <img src="/assets/icons/stats/hat.svg" alt="Students Icon" />
            </div>
            <div className="stat-content">
              <h3>50K+</h3>
              <p>Students passed</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <img
                src="/assets/icons/stats/student.svg"
                alt="Experience Icon"
              />
            </div>
            <div className="stat-content">
              <h3>25+</h3>
              <p>Years Of Experience</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <img src="/assets/icons/stats/uni.svg" alt="Branches Icon" />
            </div>
            <div className="stat-content">
              <h3>03</h3>
              <p>Branches</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
