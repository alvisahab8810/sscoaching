"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import Head from "next/head";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function DEO229() {

const chapters = [
  { name: "Lesson 1 - Basics of Computer", url: "https://nios.ac.in/media/documents/sec229new/Lesson1.pdf" },
  { name: "Lesson 2 - Data Entry Level Security", url: "https://nios.ac.in/media/documents/sec229new/Lesson2.pdf" },
  { name: "Lesson 3 - Basics of Word Processing", url: "https://nios.ac.in/media/documents/sec229new/Lesson3.pdf" },
  { name: "Lesson 4 - Formatting Documents", url: "https://nios.ac.in/media/documents/sec229new/Lesson4.pdf" },
  { name: "Lesson 5 - Mail Merge", url: "https://nios.ac.in/media/documents/sec229new/Lesson5.pdf" },
  { name: "Lesson 6 - Basics of Spreadsheet", url: "https://nios.ac.in/media/documents/sec229new/Lesson6.pdf" },
  { name: "Lesson 7 - Formatting Worksheets", url: "https://nios.ac.in/media/documents/sec229new/Lesson7.pdf" },
  { name: "Lesson 8 - Formulas, Functions and Charts", url: "https://nios.ac.in/media/documents/sec229new/Lesson8.pdf" },
  { name: "Lesson 9 - Creating Presentation", url: "https://nios.ac.in/media/documents/sec229new/Lesson9.pdf" },
];


  return (
    <div>
      <Head>
        <title>NIOS Secondary Course Data Entry Operations 229</title>
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
                  Data Entry Operations (229) - Study Material
                </span>
              </h1>
            </div>

            {/* Books */}
            <div className="mb-4">
          

              <p>
                📘 <a
                  href="https://nios.ac.in/media/documents/sec229new/deo_229_content_complete1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-link"
                >
                  Download Complete Book (Hindi)
                </a>
              </p>
            </div>

            {/* Lessons Table */}
            <div className="table-responsive mb-5">
              <table className="table table-striped custom-table align-middle mb-0">
                <thead>
                  <tr>
                    <th className="text-center1">Sr. no.</th>
                    <th>Lesson Name</th>
                    <th className="text-center">PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {chapters.map((chapter, index) => (
                    <tr key={index} className={index % 2 === 0 ? "even-row" : ""}>
                      <td className="text-center1">{index + 1}</td>
                      <td><strong>{chapter.name}</strong></td>
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

            {/* Practical Manual */}
            {/* <div className="mb-4">
              <p>
                🛠️ <a
                  href="https://nios.ac.in/media/documents/sec229new/practical_lab_manual.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-link"
                >
                  Download Practical Lab Manual
                </a>
              </p>
            </div> */}

          </div>

          {/* SAME CSS AS HINDI */}
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
            }

            tbody td {
              padding: 10px;
              font-size: 15px;
              border-top: 1px solid #f1f1f1;
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
              color: #1d4ed8;
            }
          `}</style>

        </section>
      </div>

      <Footer />
    </div>
  );
}
