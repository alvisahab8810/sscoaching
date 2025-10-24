import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import FAQ from "@/components/home/FAQ";
import SrSecondaryCourseMaterial from "@/components/subjects/SrSecondaryCourseMaterial";

import React from "react";

export default function srsecondary() {
  return (
    <div id="paper-secondary-10th">
      <Header />
      <Offcanvas />
      <SrSecondaryCourseMaterial/>

      <FAQ />
      <div className="container">
        <a href="#" className="cta-button">
          For any help related to admission in NIOS please contact SS Coaching
          on our Mobile No. +91 9935035316
        </a>
      </div>

      <div className="footer-park">
        <div className="container">
          <p>
            12th NIOS secondary course open syllabus, secondary open school NIOS certification high school main subjects, regular subjects 10th pass board, mandatory subjects NIOS 10th, Subject list 12th 2025, NIOS subject codes for 12th, NIOS subject choice 12th board NIOS, All NIOS language subjects for 12th, 2025 list of updated subjects, Open school syllabus India, Additional subject to clear exam from NIOS, Detailed overview of different subject NIOS, Codes of NIOS subject in 12th, NIOS admission 2025-2026
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
