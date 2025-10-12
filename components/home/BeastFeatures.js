import React from 'react'

export default function BeastFeatures() {
  return (
       <section className="best-coaching">
        <div className="container">
            <h2 className="best-title"><span className="highlight">The best</span> NIOS Coaching in Lucknow</h2>
            <div className="features-grid">
            <div className="feature-card">
                <div className="feature-icon-container professionals">
                <img src="/assets/icons/best-features/file-invoice.svg" alt="Professionals Icon" className="feature-icon" />
                </div>
                <div className="feature-content">
                <h3 className="feature-title">Experienced Professionals</h3>
                <p className="feature-description">We have the most experienced faculty of tutors who are truly determined to cover all the concepts and prepare you to give your best in the NIOS Exams.</p>
                </div>
            </div>
            <div className="feature-card">
                <div className="feature-icon-container materials">
                <img src="/assets/icons/best-features/calendar.svg" alt="Materials Icon" className="feature-icon" />
                </div>
                <div className="feature-content">
                <h3 className="feature-title">Best Study Materials</h3>
                <p className="feature-description">Study Materials of the SS Coaching are designed by professionals which consist of the latest syllabus, Test series with illustrative examples and Proper Notes.</p>
                </div>
            </div>
            <div className="feature-card">
                <div className="feature-icon-container infrastructure">
                <img src="/assets/icons/best-features/users.svg" alt="Infrastructure Icon" className="feature-icon" />
                </div>
                <div className="feature-content">
                <h3 className="feature-title">Best Infrastructure</h3>
                <p className="feature-description">SS Coaching has 3 easily accessible branches across the city. We offer spacious classrooms designed for focused learning. Each center is equipped with a dedicated library for students.</p>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}
