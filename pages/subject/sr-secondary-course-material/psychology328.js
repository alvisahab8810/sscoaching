"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Psychology328() {

  const chapters = [
    { name: "Lesson 1", url: "https://nios.ac.in/media/documents/328-New/Ch-1.pdf" },
    { name: "Lesson 2", url: "https://nios.ac.in/media/documents/328-New/Ch-2.pdf" },
    { name: "Lesson 3", url: "https://nios.ac.in/media/documents/328-New/Ch-3.pdf" },
    { name: "Lesson 4", url: "https://nios.ac.in/media/documents/328-New/Ch-4.pdf" },
    { name: "Lesson 5", url: "https://nios.ac.in/media/documents/328-New/Ch-5.pdf" },
    { name: "Lesson 6", url: "https://nios.ac.in/media/documents/328-New/Ch-6.pdf" },
    { name: "Lesson 7", url: "https://nios.ac.in/media/documents/328-New/Ch-7.pdf" },
    { name: "Lesson 8", url: "https://nios.ac.in/media/documents/328-New/Ch-8.pdf" },
    { name: "Lesson 9", url: "https://nios.ac.in/media/documents/328-New/Ch-9.pdf" },
    { name: "Lesson 10", url: "https://nios.ac.in/media/documents/328-New/Ch-10.pdf" },
    { name: "Lesson 11", url: "https://nios.ac.in/media/documents/328-New/Ch-11.pdf" },
    { name: "Lesson 12", url: "https://nios.ac.in/media/documents/328-New/Ch-12.pdf" },
    { name: "Lesson 13", url: "https://nios.ac.in/media/documents/328-New/Ch-13.pdf" },
    { name: "Lesson 14", url: "https://nios.ac.in/media/documents/328-New/Ch-14.pdf" },
    { name: "Lesson 15", url: "https://nios.ac.in/media/documents/328-New/Ch-15.pdf" },
    { name: "Lesson 16", url: "https://nios.ac.in/media/documents/328-New/Ch-16.pdf" },
    { name: "Lesson 17", url: "https://nios.ac.in/media/documents/328-New/Ch-17.pdf" },
    { name: "Lesson 18", url: "https://nios.ac.in/media/documents/328-New/Ch-18.pdf" },
    { name: "Lesson 19", url: "https://nios.ac.in/media/documents/328-New/Ch-19.pdf" },
    { name: "Lesson 20", url: "https://nios.ac.in/media/documents/328-New/Ch-20.pdf" },
    { name: "Lesson 21", url: "https://nios.ac.in/media/documents/328-New/Ch-21.pdf" },
    { name: "Lesson 22", url: "https://nios.ac.in/media/documents/328-New/Ch-22.pdf" },
    { name: "Lesson 23", url: "https://nios.ac.in/media/documents/328-New/Ch-23.pdf" },
    { name: "Lesson 24", url: "https://nios.ac.in/media/documents/328-New/Ch-24.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Psychology 328</title>
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
                  Psychology (328) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Book Download Section */}
            <div className="mb-4">
              <p>
                📘 <a
                  href="https://nios.ac.in/media/documents/328-New/328_New_Eng_Book-1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-link"
                >
                  Download Book 1
                </a>
              </p>

              <p>
                📘 <a
                  href="https://nios.ac.in/media/documents/328-New/328_New_Eng_Book-2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-link"
                >
                  Download Book 2
                </a>
              </p>
            </div>

            <div className="table-responsive">
              <table className="table table-striped custom-table align-middle mb-0">
                <thead>
                  <tr>
                    <th className="text-center1">Sr. no.</th>
                    <th>Chapter Name</th>
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
            }
          `}</style>

        </section>

        <Footer />
      </div>
    </>
  );
}
