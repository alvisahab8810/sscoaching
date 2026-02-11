import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import FAQ from "@/components/home/FAQ";
import Popup from "@/components/home/Popup";
import Hero10th from "@/components/subjects/syllabus/Hero10th";
import SyllabusSecondary from "@/components/subjects/syllabus/SyllabusSecondary";
import React from "react";

import Head from "next/head";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
export default function SyllabusClass12th() {
  return (
    <>
      <Head>
        <title>
          NIOS Subject details, syllabus and curriculum for Secondary (10th) 2025
        </title>
        <meta name="description" content="SS Coaching provides the overview of class 10th syllabus, curriculum and summary for the NIOS Board for secondary class. National Institute of Open Schooling (NIOS) Board have all main subject like English, Mathematics, Hindi, etc. SS Coaching provides you with a detailed syllabus along with the curriculum of each subject. You can also get an overview of the subject in this section." />
        <meta name="keywords" content="NIOS admission 2025-2026, NIOS Secondary syllabus, NIOS syllabus for 10th, National institute of open schooling 10th, 10th NIOS syllabus, Language courses, Secondary 10th language learning, NIOS Secondary 10th syllabus, National institute of open schooling syllabus Lucknow, NIOS Syllabus for Class 10th, nios curriculum, nios online classes, nios online classes 10th, nios online study material, nios online admission, nios online, nios online classes, nios fees structure, syllabus nios, nios syllabus for 10th,study material, study material nios, nios books, Nios syllabus 2025, NIOS 12th syllabus 2025, NIOS secondary 10th syllabus, NIOS Syllabus class 10th 2025, NIOS Latest Syllabus, New NIOS Syllabus 2025, NIOS New Syllabus 2025, NIOS New Syllabus 2025 Class 10, NIOS Syllabus 10th 2025, NIOS Secondary new syllabus class 10, Latest NIOS Syllabus, Class 10th NIOS Syllabus 2025," />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="paper-secondary-10th">
        <Header />
        <Offcanvas />
        <Hero10th />
        <SyllabusSecondary />
               <BranchContactCanvas/>
        

        <Footer />
        <Popup />
      </div>
    </>
  );
}
