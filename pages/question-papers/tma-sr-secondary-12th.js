import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import FAQ from "@/components/home/FAQ";
import Popup from "@/components/home/Popup";

import TmaSrContact from "@/components/subjects/syllabus/TmaSrContact";
import TmaSrDownload from "@/components/subjects/syllabus/TmaSrDownload";
import TmaSrHero from "@/components/subjects/syllabus/TmaSrHero";
import TmaSrSubjects from "@/components/subjects/syllabus/TmaSrSubjects";
import React from "react";
import Head from "next/head";
export default function TmaSrsecondary12th() {
  return (
    <>
      <Head>
        <title>
          NIOS TMA Question Papers Sr. Secondary (12th) session 2025-26
        </title>
        <meta name="description" content="Download NIOS TMA Sheets 2025-26 for Class 12th Secondary from SS Coaching, the Best NIOS Center in Lucknow. Get guidance to complete your assignments with correct answers to each TMA Question, on time and excel in NIOS Exams 2025. Simplify your TMA submission with expert" />
        <meta name="keywords" content="NIOS admission, Tutor for NIOS Lucknow TMA, Tutor-marked assignment senior secondary, NIOS Stream1, Tutor assignments NIOS, TMA assignment 2025, Tutor at NIOS, 12th submission assignment, Tutor service NIOS, Mathematics tutoring, Mathematics foundation degree the open assignment,National open university tutor-marked assignment, Submission of assignments 2025 senior secondary 12th, National schooling, Need a tutoring service, Foundation course in Mathematics,Assignment online TMA session 2025-26, Open university courses 12th, Open university assignments online, NIOS 2025-26,NIOS admission 2025, NIOS Stream1 2025,Tutor at NIOS 2025,Tutor at NIOS 2026, nios tma, tma nios, nios tma 2025, nios assignment, nios tma marks, NIOS TMA Question Papers Sr. Secondary" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="paper-secondary-10th" className="paper-secondary-10th">
        <Header />
        <Offcanvas />

        <TmaSrHero />
        <TmaSrSubjects />
        <TmaSrContact />

        <TmaSrDownload />

        {/* <FAQ/> */}
        <FAQ limit={8} showViewMore={true} />

        <Footer />
        <Popup />
      </div>
    </>
  );
}
