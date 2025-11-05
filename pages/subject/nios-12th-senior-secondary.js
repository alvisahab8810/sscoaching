import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Popup from "@/components/home/Popup";
import Hero from "@/components/subjects/syllabus/Nios12thSecondaryHero";
import SchemeOfStudies from "@/components/subjects/syllabus/SubjectSection";
import SubjectSection from "@/components/subjects/syllabus/SubjectSection";

import React from "react";

export default function SyllabusClass12th() {
  return (
    <div id="paper-secondary-10th">
      <Header />
      <Offcanvas />

      <Hero />

      <SchemeOfStudies />

      <section className="notes-section">
        <p className="note-text">
          Five subjects with either one or two languages from Group A and the
          remaining subjects from Group B, C, D, E and F (only one subject from
          each group C, D, E and F).
        </p>
        <p className="note-text">
          Two additional subjects can be taken from any group (only one subject
          from each group C, D, E and F) with additional fee as per NIOS norms.
        </p>

        <div className="note-box">
          <p className="note-content">
            Note : 1. Subjects with asterisk have theory as well as practical
            work
          </p>
        </div>

        <div className="note-box">
          <p className="note-content">
            Note : 2. Learner can opt only one subject from each of Group C, D,
            E and F
          </p>
        </div>
      </section>

      <div className="footer-park">
        <div className="container">
          <p>
            Regular subjects 10+2 pass board, Subject list 12th 2025-26, NIOS
            subject codes 10+2, NIOS subject choice 12th board NIOS, Detailed
            overview of various subject 12th NIOS, Subject list of NIOS senior
            Secondary subject list of NIOS secondary, How to get a subject list
            of NIOS class 12th, Mandatory subjects NIOS 12th, All NIOS language
            subjects for 12th, 2025 list of updated subjects for 12th, Advised
            and beneficial senior secondary, NIOS fees structure, Subject list
            NIOS, Subject list NIOS 2025, NIOS subject list, NIOS subject list
            2025, NIOS subject list 12th, Nios Admission Class 12Th Subject
            list, nios 12th subject list, nios 12th subject list 2025, nios
            course, nios course 2025,
          </p>
        </div>
      </div>
      
      <Popup/>

      <Footer />
    </div>
  );
}
