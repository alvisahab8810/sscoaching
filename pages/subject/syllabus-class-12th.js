import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import FAQ from "@/components/home/FAQ";
import Popup from "@/components/home/Popup";
import Contact from "@/components/question-papers/paper-secondary-10th/Contact";
import Download from "@/components/question-papers/paper-secondary-10th/Download";
import QuestionPapers from "@/components/question-papers/paper-secondary-10th/Filter";
import Hero from "@/components/subjects/syllabus/Hero";
import SeniosSecondary from "@/components/subjects/syllabus/SeniosSecondary";
import React from "react";
import Head from "next/head";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
export default function SyllabusClass12th() {
  return (
    <>
      <Head>
        <title>
           NIOS 12th Syllabus 2026 – Complete Curriculum Guide
        </title>
        <meta name="description" content="SS Coaching provides the overview of the class 12th syllabus, curriculum and summary for the NIOS Board for senior secondary class. National Institute of Open Schooling (NIOS) Board have all main subject like English, Mathematics, Hindi, etc. SS Coaching provides you detailed syllabus along with the curriculum of each subject. You can also get an overview of the subject in this section." />
        <meta name="keywords" content="NIOS syllabus for 12th, NIOS 12th syllabus, NIOS senior secondary 12th syllabus, National institute of open schooling syllabus Lucknow , Senior secondary NIOS syllabus, NIOS Subject, nios subject list, nios 12th subject list, nios subject list class 12, nios syllabus 2025, nios 12th syllabus 2025, NIOS senior secondary 12th syllabus 2025,NIOS Syllabus 12th 2025, NIOS New Syllabus 2025, NIOS Syllabus 12th 2025," />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="paper-secondary-10th">
        <Header />
        <Offcanvas />
               <BranchContactCanvas/>
        
        <Hero />
        <SeniosSecondary />

        <Footer />
        <Popup />
      </div>
    </>
  );
}
