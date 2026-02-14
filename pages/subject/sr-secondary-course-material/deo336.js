"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function DataEntryOperations336() {

  const chapters = [
    { name: "Basics of Computer", url: "https://nios.ac.in/media/documents/SrSec336Neweng/336_Data_Entry_Operations_Lesson1.pdf" },
    { name: "Operating System", url: "https://nios.ac.in/media/documents/SrSec336Neweng/336_Data_Entry_Operations_Lesson2.pdf" },
    { name: "Basics of Word Processing", url: "https://nios.ac.in/media/documents/SrSec336Neweng/336_Data_Entry_Operations_Lesson3.pdf" },
    { name: "Formatting Documents", url: "https://nios.ac.in/media/documents/SrSec336Neweng/336_Data_Entry_Operations_Lesson4.pdf" },
    { name: "Mail Merge", url: "https://nios.ac.in/media/documents/SrSec336Neweng/336_Data_Entry_Operations_Lesson5.pdf" },
    { name: "Basics of Spreadsheet", url: "https://nios.ac.in/media/documents/SrSec336Neweng/336_Data_Entry_Operations_Lesson6.pdf" },
    { name: "Formatting Worksheets", url: "https://nios.ac.in/media/documents/SrSec336Neweng/336_Data_Entry_Operations_Lesson7.pdf" },
    { name: "Formulas, Functions and Charts", url: "https://nios.ac.in/media/documents/SrSec336Neweng/336_Data_Entry_Operations_Lesson8.pdf" },
    { name: "Creating Presentation", url: "https://nios.ac.in/media/documents/SrSec336Neweng/336_Data_Entry_Operations_Lesson9.pdf" },
    { name: "Introduction to Internet", url: "https://nios.ac.in/media/documents/SrSec336Neweng/336_Data_Entry_Operations_Lesson10.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Data Entry Operations 336</title>
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
                  Data Entry Operations (336) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Book Download Section */}
            <div className="mb-4">
              <p>
                📘 <a href="https://nios.ac.in/media/documents/SrSec336Neweng/srsec336eng.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book
                </a>
              </p>
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

            .book-link {
              font-weight: 600;
              color: #2563eb;
              text-decoration: none;
            }

            .book-link:hover {
              text-decoration: underline;
            }
          `}</style>

        </section>

        <Footer />
      </div>
    </>
  );
}
