import React from "react";

export default function AboutUsHero() {
  return (
    <section className="about-us-hero">
      <div className="container">
        <div className="about-us-container">
        <div className="about-us-content">
          <h1 className="about-us-title">
            SS Coaching <br />
            <span className="highlight">
              Founder, Director's 
            </span>
            Message to Students
          </h1>

          <div className="about-us-director mobile-none">
            <p className="director-name">Sarvesh Sonkar</p>
            <p className="director-role">FOUNDER DIRECTOR</p>
            <p className="director-contact">CELL: 9839065533</p>
          </div>

        </div>

        <div className="about-us-image">
          <img
            src="/assets/images/about-us-hero.png"
            alt="Founder Director"
          />
        </div>


           <div className="about-us-director desktop-none">
            <p className="director-name">Sarvesh Sonkar</p>
            <p className="director-role">FOUNDER DIRECTOR</p>
            <p className="director-contact">CELL: 9839065533</p>
          </div>
      </div>

      
          <p className="about-us-text">
            Education is the might and potential of any boosting economy. The
            education sector is booming and growing with the need of skilled
            manpower. India being a fully knowledge rich economy, will assuredly
            have an immense demand of highly proficient and skillful in 21st
            century Coaching that impart knowledge spanning to all knowledge
            domains. The right kind of training and skill can only be grasped by
            taking up a course with a Coaching which teaches and educates you
            with current training and instruction trends, especially through
            application of general concepts and sector specific knowledge. With
            this in view, The S.S. Coaching is an initiative to offer Academic
            education, 10th & 12th courses programme that develops skill-sets
            through distinguished methodologies like case studies/project work/
            Industrial training to provide a powerful confidence and exposure to
            outside world, processes and regulations of companies. The S.S.
            Coaching Education aims to produce efficient budding professionals
            who have a deep sentiment of accountability and morality and
            competence and engagement with the given tasks. The question then is
            not why you should join the S.S. Coaching, but what you are going to
            lose if you are still wondering to decide.
          </p>

          <p className="about-us-signature">Sarvesh Sonkar . .</p>
      </div>
    </section>
  );
}
