import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import FAQ from "@/components/home/FAQ";
import Popup from "@/components/home/Popup";
import SubjectTable from "@/components/subjects/SecondaryCourseMaterial";
import Head from "next/head";
import React from "react";

export default function TmaSrsecondary12th() {
  return (
    <>
      <Head>
        <title>
          NIOS Secondary Course Materials With Subject Wise
        </title>
        <meta name="description" content="SS Coaching provides NIOS Secondary (10th Class ) Course Materials with Subject-Wise for students. It helps students study, understand courses, and prepare for exams." />
        <meta name="keywords" content="10th NIOS secondary course open syllabus, Secondary open school NIOS certification high school main subjects, Regular subjects 10th pass board, Mandatory subjects NIOS 10th, Subject list 10th 2025, NIOS subject codes for 10th, NIOS subject choice 10th board NIOS, All NIOS language subjects for 10th, 2025 list of updated subjects, Open school syllabus India, Additional subject to clear exam from NIOS, Detailed overview of different subject NIOS, Codes of NIOS subject in 10th, NIOS admission 2025-2026" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="paper-secondary-10th" className="tma-sr-secondary">
        <Header />
        <Offcanvas />
               <BranchContactCanvas/>
        
        <SubjectTable />
        <div className="container desktop-none">
          <a href="tel:+91 9935035316" className="cta-button">
            For any help related to admission in NIOS please contact SS Coaching
            on our Mobile No. +91 9935035316
          </a>
        </div>

        {/* <FAQ /> */}
        <FAQ limit={8} showViewMore={true} />

        <div className="container mobile-none">
          <a href="tel:+91 9935035316" className="cta-button mt-0">
            For any help related to admission in NIOS please contact SS Coaching
            on our Mobile No. +91 9935035316
          </a>
        </div>

        <div className="footer-park">
          <div className="container">
            <p>
              10th NIOS secondary course open syllabus, Secondary open school
              NIOS certification high school main subjects, Regular subjects
              10th pass board, Mandatory subjects NIOS 10th, Subject list 10th
              2025, NIOS subject codes for 10th, NIOS subject choice 10th board
              NIOS, All NIOS language subjects for 10th, 2025 list of updated
              subjects, Open school syllabus India, Additional subject to clear
              exam from NIOS, Detailed overview of different subject NIOS, Codes
              of NIOS subject in 10th, NIOS admission 2025-2026
            </p>
          </div>
        </div>

        <Footer />
        <Popup />
      </div>
    </>
  );
}
