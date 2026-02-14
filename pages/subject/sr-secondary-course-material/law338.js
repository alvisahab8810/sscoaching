"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Law338() {

  const chapters = [
  { name: "MEANING OF LAW", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L1.pdf" },
  { name: "CLASSIFICATION OF LEGAL SYSTEM", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L2.pdf" },
  { name: "PERSONAL LAW - I : HINDU & MUSLIM LAW", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L3.pdf" },
  { name: "PERSONAL LAW II CHRISTIAN, PARSI & JEWISH LAW", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L4.pdf" },
  { name: "NORMATIVE FUNCTIONS OF LAW & SOCIAL CONTROL", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L5.pdf" },
  { name: "PRINCIPLES OF NATURAL JUSTICE", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L6.pdf" },
  { name: "TECHNIQUES OF LAW AND REMEDIES I", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L7.pdf" },
  { name: "TECHNIQUES OF LAW AND REMEDIES II", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L8.pdf" },
  { name: "TERRITORIAL LAW", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L9.pdf" },
  { name: "CIVIL AND CRIMINAL LAW", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L10.pdf" },
  { name: "SUBSTANTIVE LAW AND PROCEDURAL OR ADJECTIVE LAW", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L11.pdf" },
  { name: "PUBLIC LAW AND PRIVATE LAW", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L12.pdf" },
  { name: "INDIAN JUDICIAL SYSTEM", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L13.pdf" },
  { name: "JUSTICE DELIVERY SYSTEM", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L14.pdf" },
  { name: "ALTERNATE DISPUTE RESOLUTION MECHANISM", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L15.pdf" },
  { name: "LEGAL SERVICES AND LOK ADALAT", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L16.pdf" },
  { name: "THE CONSTITUTION OF INDIA - ITS NATURE", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L17.pdf" },
  { name: "CONSTITUTIONALISM AND PREAMBLE", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L18.pdf" },
  { name: "FUNDAMENTAL RIGHTS AND DUTIES", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L19.pdf" },
  { name: "DIRECTIVE PRINCIPLES OF STATE POLICY", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L20.pdf" },
  { name: "THE EXECUTIVE", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L21.pdf" },
  { name: "THE LEGISLATURE", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L22.pdf" },
  { name: "THE JUDICIARY", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L23.pdf" },
  { name: "ENVIRONMENTAL LAW", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L24.pdf" },
  { name: "SUSTAINABLE DEVELOPMENT", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L25.pdf" },
  { name: "GENERAL PRINCIPLES OF ENVIRONMENTAL LAW", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L26.pdf" },
  { name: "CONTEMPORARY DEVELOPMENTS", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L27.pdf" },
  { name: "CONSUMER PROTECTION", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L28.pdf" },
  { name: "UNFAIR TRADE PRACTICES", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L29.pdf" },
  { name: "CONSUMER DISPUTES REDRESSAL AGENCIES", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L30.pdf" },
  { name: "CONSUMER ACTIVISM", url: "https://nios.ac.in/media/documents/SrSec338New/338_Introduction_To_Law_Eng/338_Introduction_To_Law_Eng_L31.pdf" },
];


  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Introduction to Law 338</title>
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
                  Introduction to Law (338) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Books Row */}
            <div className="book-row mb-4">
              <a href="https://nios.ac.in/media/documents/SrSec338new/338_Book1_New.pdf" target="_blank" className="book-link">📘 Book 1</a>
              <a href="https://nios.ac.in/media/documents/SrSec338new/338_Book2_New.pdf" target="_blank" className="book-link">📘 Book 2</a>
            </div>

            <div className="table-responsive">
              <table className="table table-striped custom-table align-middle mb-0">
                <thead>
                  <tr>
                    <th className="text-center1">Sr. no.</th>
                    <th className="text-center">Chapter Name</th>
                    <th className="text-center">PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {chapters.map((chapter, index) => (
                    <tr key={index} className={index % 2 === 0 ? "even-row" : ""}>
                      <td className="text-center1">{index + 1}</td>
                      <td className="text-center"><strong>{chapter.name}</strong></td>
                      <td className="text-center">
                        <a href={chapter.url} target="_blank" className="pdf-icon">
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
            .book-row {
              display: flex;
              gap: 15px;
              flex-wrap: wrap;
            }

            .book-link {
              font-weight: 600;
              color: #2563eb;
              text-decoration: none;
              background: #f1f5ff;
              padding: 8px 14px;
              border-radius: 6px;
            }

            .book-link:hover {
              background: #dbeafe;
            }

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

            thead tr { background: #f9fafc; }

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
