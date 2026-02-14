"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function History315() {

  const chapters = [
    { name: "Understanding Indian History", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson1.pdf" },
    { name: "The Geographical Setting and Pre-Historic Cultures of India", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson2.pdf" },
    { name: "The Harappan Civilization", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson3.pdf" },
    { name: "The Vedic Age (1500 BC - 600 BC)", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson4.pdf" },
    { name: "From Janapadas to Empire", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson5.pdf" },
    { name: "Post Mauryan Developments", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson6.pdf" },
    { name: "The Guptas and Their Successors (A.D. 300-750)", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson7.pdf" },
    { name: "India Between A.D. 750-1200", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson8.pdf" },
    { name: "Establishment and Expansion of the Delhi Sultanate", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson9.pdf" },
    { name: "Establishment of the Mughal Rule", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson10.pdf" },
    { name: "Emergence of Regional States in India", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson11.pdf" },
    { name: "Administrative System and Institutions", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson12.pdf" },
    { name: "Economy", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson13.pdf" },
    { name: "Cultural Developments in Medieval India", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson14.pdf" },
    { name: "Understanding Eighteenth Century India", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson15.pdf" },
    { name: "Establishment of British Rule in India till 1857", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson16.pdf" },
    { name: "Economic Changes", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson17.pdf" },
    { name: "Social Changes", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson18.pdf" },
    { name: "Popular Resistance to Company Rule", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson19.pdf" },
    { name: "Nationalism", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson20.pdf" },
    { name: "National Movement & Indian Democracy", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson21.pdf" },
    { name: "Legacy of 19th Century", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson22.pdf" },
    { name: "World War I and the Russian Revolution", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson23.pdf" },
    { name: "The Inter-War Period and the Second World War", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson24.pdf" },
    { name: "Cold War and Its Effects", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson25.pdf" },
    { name: "National Liberation Movements", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson26.pdf" },
    { name: "Social Transformation in the Twentieth Century", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson27.pdf" },
    { name: "Changes in the Twentieth Century", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson28.pdf" },
    { name: "Towards Formation of State (29A)", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson29A.pdf" },
    { name: "Contemporary Cultural Situation (29B)", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson29B.pdf" },
    { name: "Early States (30A)", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson30A.pdf" },
    { name: "Cultural Production (30B)", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson30B.pdf" },
    { name: "Medieval States (31A)", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson31A.pdf" },
    { name: "Cultural Communication (31B)", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson31B.pdf" },
    { name: "Colonial State (32A)", url: "https://nios.ac.in/media/documents/SrSec315NEW/315_History_Eng/315_History_Eng_Lesson32A.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course History 315</title>
      </Head>

      <div id="paper-secondary-10th" className="tma-sr-secondary">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <section className="subject-table-section">
          <div className="container">

            <div className="hero-text">
              <h1 className="qustion-paper-hero-title">
                <span className="highlight text-left">
                  History (315) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            <div className="table-responsive">
              <table className="table table-striped custom-table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Chapter Name</th>
                    <th>PDF</th>
                  </tr>
                </thead>

                <tbody>
                  {chapters.map((chapter, index) => (
                    <tr key={index} className={index % 2 === 0 ? "even-row" : ""}>
                      <td>{index + 1}</td>
                      <td><strong>{chapter.name}</strong></td>
                      <td>
                        <a
                          href={chapter.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pdf-icon"
                        >
                          <FaFilePdf />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          <style jsx>{`
            .custom-table {
              width: 100%;
              border-collapse: separate;
              border-spacing: 0;
              background: #fff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
              border: 1px solid #ddd;
            }

            thead th {
              padding: 15px 10px;
              font-size: 16px;
              font-weight: 700;
              text-align: center;
            }

            tbody td {
              padding: 10px;
              font-size: 15px;
              border-top: 1px solid #f1f1f1;
              text-align: center;
            }

            .even-row { background-color: #f9fafc; }

            tbody tr:hover {
              background-color: #f1f5ff;
              transition: 0.2s ease;
            }

            .pdf-icon {
              color: #e63946;
              font-size: 22px;
              transition: 0.2s ease;
            }

            .pdf-icon:hover {
              transform: scale(1.1);
              color: #c71f1f;
            }
          `}</style>

        </section>

        <Footer />
      </div>
    </>
  );
}
