import React from "react";

export default function Hero() {
  return (
    <>
      <section className="nios-12th-senior-hero-section">
        <div className="container">
          <div className="nios-125h-senior-text">
            <h1 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">NIOS</span> Secondary
              Subject List
            </h1>

            <h4>NIOS Subjects, Syllabus & Course Material Overview
</h4>
            <p className="nios-125h-senior-hero-subtitle">
              At SS Coaching, we provide complete guidance for students enrolling in NIOS admission, helping them understand subjects, syllabus, and study materials.<br/>
Whether you are planning for NIOS 10th or 12th admission, understanding the subject structure is the first step toward success.

            </p>
          </div>

          <img
            src="/assets/images/syllabus/subject-list-10th.webp"
            title ="nios-study-material-banner"
            alt="Student studying with laptop and notebook in library for NIOS course preparation"
            className="hero-image"
          />

          <div className="nios-125h-senior-content-section">
            <div>
              <h2 className="nios-125h-senior-section-title">
               NIOS SECONDARY COURSES
              </h2>
              <p className="nios-125h-senior-section-text">
                For students enrolling in Secondary courses, it is important to understand the available subjects before making a decision.<br/>
The subject structure is designed to build a strong academic foundation and help students continue their education smoothly.

               </p>
            </div>

            <div>
              <h2 className="nios-125h-senior-section-title">SCHEME OF STUDIES</h2>
              <p className="nios-125h-senior-section-text">
                Students must pass a minimum of five subjects, including at least one language (maximum two languages).<br/>
You can choose additional subjects based on your needs, making a total of up to seven subjects. This flexibility allows students to plan their studies effectively.

               </p>
            </div>
          </div>

          <a href="tel:9792111121" className="cta-button-gallery cta-button1">
           For NIOS admission and better preparation, contact SS Coaching at 9792111121
          </a>
        </div>
      </section>
    </>
  );
}
