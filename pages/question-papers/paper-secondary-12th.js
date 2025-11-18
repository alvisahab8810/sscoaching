import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import FAQ from "@/components/home/FAQ";
import Popup from "@/components/home/Popup";
import Download from "@/components/question-papers/paper-secondary-10th/Download";
import QuestionPapers from "@/components/question-papers/paper-secondary-10th/Filter";
import Contact from "@/components/question-papers/paper-secondary-12th/Contact";
import Class12Papers from "@/components/question-papers/paper-secondary-12th/Filter";
import Hero from "@/components/question-papers/paper-secondary-12th/Hero";
import React from "react";
import Head from "next/head";
export default function paperSeconday12th() {
  return (
    <>
      <Head>
        <title>
          NIOS Senior Secondary (Class 12th) Previous Examination Question
          Papers and NIOS Sample Paper 2025
        </title>
        <meta
          name="description"
          content="The Students can download free Question Papers of Previous Year Examination NIOS. Students can also Download the Latest NIOS Sample Paper 2025 Senior Secondary 12th class of National Institute of Open Schooling for various subjects like Hindi, English, Urdu, Science, Maths, Psychology, Painting, Data Entry, Physics, Chemistry, Biology, Computer, Home Science etc."
        />
        <meta
          name="keywords"
          content="NIOS senior secondary sample question paper, Download model test question papers. NIOS question paper for class 12th, NIOS old question papers ,12th question paper senior secondary NIOS, Old year paper NIOS collection, Download pdf format file old question answer paper, NIOS sample question papers series, NIOS question paper for class 12 , NIOS latest question paper with solution for 2023 exam, Question papers online NIOS, Exam sheets of NIOS senior secondary, Last year NIOS question bank, National institute of open schooling previous year question paper, NIOS all question bank, NIOS senior secondary question papers, NIOS previous year question papers, Paper of NIOS senior secondary previous last years, NIOS senior secondary question papers 2020, NIOS senior secondary question papers 2023, NIOS senior secondary question papers 2021, NIOS senior secondary question papers 2022, NIOS all question bank 2020, NIOS all question bank 2021, NIOS all question bank 2022, NIOS all question bank 2023, Download pdf format file old question answer paper 2020, Download pdf format file old question answer paper 2021, Download pdf format file old question answer paper 2022, Download pdf format file old question answer paper 2023, question papers, question papers 2022, question papers 2023, nios question paper for class 12 with answers pdf, nios question paper, nios previous year question papers with solutions class 12, nios question paper with answers, nios sample paper, nios previous question papers, NIOS sample paper 2025 class 12, NIOS question paper class 12 2024, NIOS sample paper class 12 2025, NIOS 12 sample paper 2025, NIOS senior secondary exams sample papers 2025, NIOS question papers 2024, NIOS class 12 question paper 2024, NIOS senior secondary question paper 2025, previous years 12th question papers for NIOS 2025"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="paper-secondary-10th">
        <Header />
        <Offcanvas />
        <Hero />
        <Class12Papers />
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
