import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Popup from "@/components/home/Popup";
import Hero from "@/components/subjects/syllabus/Nios10thSecondary";
import SchemeOfStudies from "@/components/subjects/syllabus/SubjectSection";
import SubjectSection from "@/components/subjects/syllabus/SubjectSection";
import SubjectScheme10th from "@/components/subjects/syllabus/SubjectSection10th";

import React from "react";

export default function SyllabusClass12th() {
  return (
    <div id="paper-secondary-10th">
      <Header />
      <Offcanvas />
      <Hero/>

     <SubjectScheme10th/>

      <section className="notes-section">
        <p className="note-text">
          Five subjects with either one or two languages from Group A and the remaining subjects from Group B
        </p>
        <p className="note-text">
          Two additional subjects can be taken from either of the two groups with additional fees as per NIOS norms.
        </p>

        <div className="note-box">
          <p className="note-content">
            Note : 1. Subjects with asterisk have theory as well as practical work
          </p>
        </div>

     
      </section>

      <div className="footer-park">
        <div className="container">
          <p>
            10th NIOS secondary course open syllabus, Secondary open school NIOS certification high school main subjects, Regular subjects 10th pass board, Mandatory subjects NIOS 10th, subject list 10th 2023, NIOS subject codes for 10th, NIOS subject choice 10th board NIOS, All NIOS language subjects for 10th, 2023 list of updated subjects, Open school syllabus India, Additional subject to clear exam from NIOS, Detailed overview of different subject NIOS, Codes of NIOS subject in 10th, NIOS admission 2022-2023, NIOS hindi Theory syllabus , Nios Admission Class 10Th Subject list, Nios Admission Class 10Th Subject list 2023, Subject list NIOS, Subject list NIOS 2023, NIOS subject list, NIOS subject list 2023, nios fees structure,
          </p>
        </div>
      </div>

      <Footer />
      <Popup/>
    </div>
  );
}
