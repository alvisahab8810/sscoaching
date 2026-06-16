import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import FAQ from "@/components/home/FAQ";
import Popup from "@/components/home/Popup";
import Contact from "@/components/question-papers/paper-secondary-10th/Contact";
import Download from "@/components/question-papers/paper-secondary-10th/Download";
import QuestionPapers from "@/components/question-papers/paper-secondary-10th/Filter";
import Hero from "@/components/question-papers/paper-secondary-10th/Hero";
import React from "react";
import Head from "next/head";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";

export default function paperSeconday10th() {
  return (
    <>
      <Head>
        <title>
          NIOS 10th Question Papers 2026 – Previous Year & Sample Papers Download
        </title>
        <meta name="description" content="Download free NIOS 10th Question Papers of Previous Years Examination 2026 for Secondary class of National Institute of Open Schooling for subjects like Hindi, English, Urdu, Science, Maths, Psychology, Painting, Data Entry, Home Science etc." />
        <meta name="keywords" content="NIOS 10th question papers 2026, NIOS sample paper class 10 2026, NIOS sample paper 2026 class 10, NIOS question paper class 10 2026, NIOS 10 sample paper 2026, NIOS secondary exams sample papers 2026, Previous year question papers of NIOS, NIOS exam paper solution, NIOS previous year question, Question papers of 10th class, 10th class previous question papers, NIOS previous year question papers class 10, NIOS sample papers, 10th class question papers, NIOS papers 10th, 10th class question papers free download, 10th class model question papers, 10th class model papers, NIOS model papers, CBSE 10th class sample papers, 10th previous year question papers, CBSE pattern class 10 sample papers, NIOS past papers secondary exam, CBSE question paper, Download 10th papers for exam preparation 2026, Question paper of 10th class 2025, Question paper of 10th class 2024, Question paper of 10th class 2023, NIOS previous year question papers 2022, NIOS previous year question papers 2023, NIOS previous year question papers 2024, NIOS previous year question papers 2025" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="paper-secondary-10th">
        <Header />
        <Offcanvas />
                <BranchContactCanvas/>
        
        <Hero />
        <QuestionPapers />
        <Contact />
        <Download />
        {/* <FAQ/> */}
        <FAQ limit={8} showViewMore={true} />

        <Footer />

        <Popup />
      </div>
    </>
  );
}
