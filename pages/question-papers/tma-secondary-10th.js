import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import FAQ from "@/components/home/FAQ";
import Popup from "@/components/home/Popup";
import Contact from "@/components/subjects/syllabus/Contact";
import Download from "@/components/subjects/syllabus/Download";
import Hero10th from "@/components/subjects/syllabus/Hero10th";
import SyllabusSecondary from "@/components/subjects/syllabus/SyllabusSecondary";
import TmaHero from "@/components/subjects/syllabus/TmaHero";
import TmaSubjects from "@/components/subjects/syllabus/TmaSubjects";
import React from "react";
import Head from "next/head";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
export default function SyllabusClass12th() {
  return (
    <>
      <Head>
        <title>
          NIOS TMA 10th 2026 – Assignments & Submission Guide
        </title>
        <meta name="description" content="Download TMA Sheets 2025-26 for Class 10th Secondary from SS Coaching, the Best NIOS Center in Lucknow. Get guidance to complete your TMA assignments on time and excel in NIOS Exams 2025. Simplify your TMA submission with expert help today!" />
        <meta name="keywords" content="NIOS tutor marked assignments answers, Open school assignment with answers, online tuition 10th assignment, Online assignment session 2025-26 NIOS, Academic writing, Online tutor, Assignment help online, Online assignments, Help with NIOS assignment, Physics TMA, IGNOU TMA assignment, NIOS assignments, assignment submission, NIOS assignment answers, Tutoring online, Submission of assignment, Tutor-marked assignment secondary 10th, Tutor-marked assignment NIOS 2025-26, School assignments, Online tutoring, NIOS tutor marked assignments, assignment IGNOU, Assignment of NIOS, National Institute Open Schooling session 2025-26, IGNOU assignment 2025, NIOS tutor marked assignments answers 2025-26, online tuition 10th assignment 2025, online tuition 10th assignment 2025," />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        id="paper-secondary-10th"
        className="paper-secondary-10th paper-secondary-12th"
      >
        <Header />
        <Offcanvas />
                <BranchContactCanvas/>
        
        <TmaHero />
        <TmaSubjects />
        <Download />

        <Contact />
        {/* <FAQ/> */}
        <FAQ limit={8} showViewMore={true} />

        <Footer />
        <Popup />
      </div>
    </>
  );
}
