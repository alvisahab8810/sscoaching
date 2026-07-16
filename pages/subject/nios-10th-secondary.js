import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Popup from "@/components/home/Popup";
import Hero from "@/components/subjects/syllabus/Nios10thSecondary";
import SchemeOfStudies from "@/components/subjects/syllabus/SubjectSection";
import SubjectSection from "@/components/subjects/syllabus/SubjectSection";
import SubjectScheme10th from "@/components/subjects/syllabus/SubjectSection10th";

import React from "react";
import Head from "next/head";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";

export default function SyllabusClass12th() {
  return (
    <>
      <Head>
        <title>NIOS 10th Secondary Course 2026 – Subjects & Admission Guide</title>
        <meta
          name="description"
          content="Secondary Course is equivalent to the X th standard. You can choose subjects from the Scheme of Studies, complete a minimum of five subjects with atleast one language or at most two languages, which is compulsory for certification."
        />
        <meta
          name="keywords"
          content="10th NIOS secondary course open syllabus, Secondary open school NIOS certification high school main subjects, Regular subjects 10th pass board, Mandatory subjects NIOS 10th, subject list 10th 2023, NIOS subject codes for 10th, NIOS subject choice 10th board NIOS, All NIOS language subjects for 10th, 2023 list of updated subjects, Open school syllabus India, Additional subject to clear exam from NIOS, Detailed overview of different subject NIOS, Codes of NIOS subject in 10th, NIOS admission 2022-2023, NIOS hindi Theory syllabus , Nios Admission Class 10Th Subject list, Nios Admission Class 10Th Subject list 2023, Subject list NIOS, Subject list NIOS 2023, NIOS subject list, NIOS subject list 2023, nios fees structure,"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="paper-secondary-10th">
        <Header />
        <Offcanvas />
               <BranchContactCanvas/>
        
        <Hero />


    <section className="nios-12th-senior-hero-section">
      <div className="container">

        <div className="nios-125h-senior-text">
          <h2 className="nios-125h-senior-hero-title">
            Subject, Syllabus & Study Material Overview
          </h2>

          <p className="nios-125h-senior-hero-subtitle">
            Understanding subjects, syllabus, and study materials is essential for success in NIOS.  <br/>
            Explore the sections below to make informed decisions for your academic journey.
          </p>
        </div>

        <div className="nios-125h-senior-content-section pt-0 pb-4">

          <div>
            <h3 className="nios-125h-senior-section-title">
              Subject List Class 10th
            </h3>
            <p className="nios-125h-senior-section-text">
              For students enrolling in Secondary courses, understanding available subjects is essential.  
              Explore all subjects and choose the right combination based on your goals.
            </p>
          </div>

          <div>
            <h3 className="nios-125h-senior-section-title">
              Subject List Class 12th
            </h3>
            <p className="nios-125h-senior-section-text">
              Subject selection plays a key role in career planning.  
              NIOS offers flexibility to choose subjects based on interests and future goals.
            </p>
          </div>

          <div>
            <h3 className="nios-125h-senior-section-title">
              Syllabus Class 10th
            </h3>
            <p className="nios-125h-senior-section-text">
              Understanding the syllabus helps students focus on important topics and prepare effectively for exams.
            </p>
          </div>

          <div>
            <h3 className="nios-125h-senior-section-title">
              Syllabus Class 12th
            </h3>
            <p className="nios-125h-senior-section-text">
              A clear syllabus helps students stay on track and prepare confidently for their exams.
            </p>
          </div>

          <div>
            <h3 className="nios-125h-senior-section-title">
              Secondary Course Material
            </h3>
            <p className="nios-125h-senior-section-text">
              Study material is essential for understanding concepts and scoring well.  
              Access complete resources for 10th class preparation.
            </p>
          </div>

          <div>
            <h3 className="nios-125h-senior-section-title">
              Sr Secondary Course Material
            </h3>
            <p className="nios-125h-senior-section-text">
              Proper study material improves understanding and exam performance for 12th students.
            </p>
          </div>

        </div>

      </div>
    </section>

        <SubjectScheme10th />

        <section className="notes-section">
          <p className="note-text">
            Five subjects with either one or two languages from Group A and the
            remaining subjects from Group B
          </p>
          <p className="note-text">
            Two additional subjects can be taken from either of the two groups
            with additional fees as per NIOS norms.
          </p>

          <div className="note-box">
            <p className="note-content">
              Note : 1. Subjects with asterisk have theory as well as practical
              work
            </p>
          </div>
        </section>


    <section className="nios-12th-senior-hero-section">
      <div className="container">

        <div className="nios-125h-senior-text">
          <h2 className="nios-125h-senior-hero-title">
            Start Your Learning Journey with SS Coaching
          </h2>

          <p className="nios-125h-senior-hero-subtitle">
            At SS Coaching, we make your NIOS admission journey simple and structured.  
            From subject selection to syllabus and study materials, we guide you at every step.
            <br /><br />
            Explore the sections above and take the next step toward completing your education with confidence.
          </p>
        </div>

        <a href="tel:9792111121" className="cta-button-gallery cta-button1">
          Call Now for NIOS Admission Guidance
        </a>

      </div>
    </section>


        {/* Keyword Cluster section removed per request
        <div className="footer-park">
          <div className="container">
            <p>
              10th NIOS secondary course open syllabus, Secondary open school
              NIOS certification high school main subjects, Regular subjects
              10th pass board, Mandatory subjects NIOS 10th, subject list 10th
              2023, NIOS subject codes for 10th, NIOS subject choice 10th board
              NIOS, All NIOS language subjects for 10th, 2023 list of updated
              subjects, Open school syllabus India, Additional subject to clear
              exam from NIOS, Detailed overview of different subject NIOS, Codes
              of NIOS subject in 10th, NIOS admission 2022-2023, NIOS hindi
              Theory syllabus , Nios Admission Class 10Th Subject list, Nios
              Admission Class 10Th Subject list 2023, Subject list NIOS, Subject
              list NIOS 2023, NIOS subject list, NIOS subject list 2023, nios
              fees structure,
            </p>
          </div>
        </div>
        */}

        <Footer />
        <Popup />
      </div>
    </>
  );
}
