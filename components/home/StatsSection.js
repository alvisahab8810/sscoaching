import React from 'react'

export default function StatsSection() {
  return (
       <section className="stats-section">
        <div className="container">
            <div className="stats-grid">
            <div className="stat-item">
                <div className="stat-icon">
                <img src="/assets/icons/stats/google.svg" alt="Google Reviews Icon" />
                </div>
                <div className="stat-content">
                <h3>4.8</h3>
                <p>Google reviews</p>
                </div>
            </div>
            <div className="stat-item">
                <div className="stat-icon">
                <img src="/assets/icons/stats/hat.svg" alt="Students Icon"  />
                </div>
                <div className="stat-content">
                <h3>50K+</h3>
                <p>Students passed</p>
                </div>
            </div>
            <div className="stat-item">
                <div className="stat-icon">
                <img src="/assets/icons/stats/student.svg" alt="Experience Icon"  />
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
        </section>
  )
}
