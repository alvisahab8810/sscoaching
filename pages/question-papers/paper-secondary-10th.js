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

export default function paperSeconday10th() {
  return (
    <>
      <Head>
        <title>
          NIOS Secondary Class 10th Previous Question Papers and NIOS Sample Paper 2025
        </title>
        <meta name="description" content="The Students can download free Question Papers of Previous Year Examination Secondary 10th class of National Institute of Open Schooling for various subjects like Hindi, English, Urdu, Science, Maths, Psychology, Painting, Data Entry, Home Science etc." />
        <meta name="keywords" content="Previous year question papers of NIOS, NIOS exam paper solution, NIOS previous year question, Question papers of 10th class, NIOS previous question papers 10th secondary 2023, 10th class previous question papers, Sample paper of 10th class NIOS 2023, NIOS previous year question papers class 10, NIOS sample papers,10th class question papers, NIOS papers 10th, Question paper of 10th class 2023,10th class question papers free download, 10th class model question papers, NIOS model papers for 2024,10th class question papers 2023, 10th class model papers, NIOS model papers, CBSE 10th class sample papers, 10th previous year question papers, CBSE pattern class 10 sample papers, NIOS past papers secondary exam, CBSE question paper, NIOS sample paper for 2023-24, Download 10th papers for exam preparation 2024, Question paper of 10th class 2022, Question paper of 10th class 2021, Question paper of 10th class 2020, NIOS previous year question papers 2020, NIOS previous year question papers 2021, NIOS previous year question papers 2022, NIOS previous year question papers 2023, NIOS model papers 2020, NIOS model papers 2022, NIOS model papers 2021,NIOS model papers 2023, question papers, question papers 2022, question papers 2023, NIOS sample paper class 10 2025, NIOS sample paper 2025 class 10, NIOS question paper class 10 2024, NIOS sample paper class 10 2025, NIOS 10 sample paper 2025, NIOS secondary exams sample papers 2025," />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="paper-secondary-10th">
        <Header />
        <Offcanvas />
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
