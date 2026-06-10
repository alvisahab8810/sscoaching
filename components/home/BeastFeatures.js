import React from 'react'

const cards = [
  {
    icon: "/assets/icons/best-features/file-invoice.svg",
    alt: "Experienced NIOS Faculty",
    containerClass: "professionals",
    title: "Experienced NIOS Faculty",
    desc: "Our academic team specialises exclusively in NIOS Secondary and Sr. Secondary preparation. Every faculty member understands NIOS exam patterns, TMA requirements, and subject combinations — ensuring students receive guidance that is both accurate and exam-focused.",
  },
  {
    icon: "/assets/icons/best-features/calendar.svg",
    alt: "Chapter-wise NIOS Study Materials",
    containerClass: "materials",
    title: "Chapter-wise NIOS Study Materials",
    desc: "All study materials at SS Coaching are prepared specifically for the NIOS syllabus — including simplified chapter notes, important questions, solved TMA assignments, and previous year question papers for Class 10 and Class 12 board exams.",
  },
  {
    icon: "/assets/icons/best-features/users.svg",
    alt: "Complete Syllabus & Subject Guidance",
    containerClass: "infrastructure",
    title: "Complete Syllabus & Subject Guidance",
    desc: "From choosing the right NIOS subject combination to understanding the full Class 10 or Class 12 syllabus structure, SS Coaching provides step-by-step academic direction so students never feel lost at any stage of their NIOS preparation journey.",
  },
  {
    icon: "/assets/icons/best-features/file-invoice.svg",
    alt: "TMA & Assignment Support",
    containerClass: "professionals",
    title: "TMA & Assignment Support",
    desc: "Tutor Marked Assignments are a mandatory and marks-bearing part of every NIOS subject. SS Coaching provides complete TMA guidance, solved samples, and submission support — so students never lose marks due to incomplete or incorrect assignments.",
  },
  {
    icon: "/assets/icons/best-features/users.svg",
    alt: "3 Accessible Coaching Centres",
    containerClass: "infrastructure",
    title: "3 Accessible Coaching Centres",
    desc: "SS Coaching operates 3 well-located branches with spacious, distraction-free classrooms and dedicated student libraries. Each centre is designed to support focused NIOS learning for both regular attendees and drop-in students.",
  },
  {
    icon: "/assets/icons/best-features/calendar.svg",
    alt: "Free NIOS Admission Counseling",
    containerClass: "materials",
    title: "Free NIOS Admission Counseling",
    desc: "Not sure which subjects to choose or how to begin NIOS admission? Our counselors provide free, personalised guidance for failed students, school dropouts, and private candidates — helping them make the right academic decisions from day one.",
  },
];

export default function BeastFeatures() {
  return (
    <section className="best-coaching">
      <div className="container">
        <div className="the-best-nios">
          <h2 className="best-title text-center">
            Why Students Choose{" "}
            <span className="highlight">SS Coaching</span>{" "}
            for NIOS Preparation
          </h2>
          <p className="best-subtitle text-center">
            Trusted by thousands of Secondary and Sr. Secondary students across India for NIOS admission, syllabus guidance, and board exam success.
          </p>
          <div className="features-grid">
            {cards.map((card, i) => (
              <div className="feature-card" key={i}>
                <div className={`feature-icon-container ${card.containerClass}`}>
                  <img
                    src={card.icon}
                    alt={card.alt}
                    className="feature-icon"
                  />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{card.title}</h3>
                  <p className="feature-description">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
