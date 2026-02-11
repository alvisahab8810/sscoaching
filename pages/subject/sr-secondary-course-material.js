import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import FAQ from "@/components/home/FAQ";
import Popup from "@/components/home/Popup";
import SrSecondaryCourseMaterial from "@/components/subjects/SrSecondaryCourseMaterial";
import Head from "next/head";
import React from "react";

export default function srsecondary() {
  return (
    <>
      <Head>
        <title>
         NIOS Sr Secondary Course Materials
        </title>
        <meta name="description" content="SS Coaching provides NIOS Sr Secondary Course Materials for students. It helps students study and understand courses and prepare for the exam." />
        <meta name="keywords" content="12th NIOS secondary course open syllabus, secondary open school NIOS certification high school main subjects, regular subjects 10th pass board, mandatory subjects NIOS 10th, Subject list 12th 2025, NIOS subject codes for 12th, NIOS subject choice 12th board NIOS, All NIOS language subjects for 12th, 2025 list of updated subjects, Open school syllabus India, Additional subject to clear exam from NIOS, Detailed overview of different subject NIOS, Codes of NIOS subject in 12th, NIOS admission 2025-2026" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="paper-secondary-10th" className="srsecondary-course-material">
        <Header />
        <Offcanvas />
               <BranchContactCanvas/>
        
        <SrSecondaryCourseMaterial />

        {/* <div className="full-btn cta-btn-2nd">
          <a href="#" className="contact-btn">
            Contact Us For help
          </a>
          <div className="contact-btn1">
            <img
              src="/assets/images/question-papers/icons/send.svg"
              alt="Send"
              width="16"
              height="16"
            />
          </div>
        </div> */}

        {/* <FAQ /> */}
        <FAQ limit={8} showViewMore={true} />

        <div className="container">
          <a href="tel:+91 9935035316" className="cta-button">
            For any help related to admission in NIOS please contact SS Coaching
            on our Mobile No. +91 9935035316
          </a>
        </div>

        <div className="footer-park">
          <div className="container">
            <p>
              12th NIOS secondary course open syllabus, secondary open school
              NIOS certification high school main subjects, regular subjects
              10th pass board, mandatory subjects NIOS 10th, Subject list 12th
              2025, NIOS subject codes for 12th, NIOS subject choice 12th board
              NIOS, All NIOS language subjects for 12th, 2025 list of updated
              subjects, Open school syllabus India, Additional subject to clear
              exam from NIOS, Detailed overview of different subject NIOS, Codes
              of NIOS subject in 12th, NIOS admission 2025-2026
            </p>
          </div>
        </div>

        <Footer />
        <Popup />
      </div>
    </>
  );
}
