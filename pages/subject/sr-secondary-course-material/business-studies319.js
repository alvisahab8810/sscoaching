"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function BusinessStudies319() {

  const chapters = [
    { name: "Nature and Scope of Business", url: "https://nios.ac.in/media/documents/319-New/Book-1/Ch-1.pdf" },
    { name: "Business Support Services", url: "https://nios.ac.in/media/documents/319-New/Book-1/Ch-2.pdf" },
    { name: "Business Environment", url: "https://nios.ac.in/media/documents/319-New/Book-1/Ch-3.pdf" },
    { name: "Forms of Business Organisations", url: "https://nios.ac.in/media/documents/319-New/Book-1/Ch-4.pdf" },
    { name: "Company Form of Business Organisation", url: "https://nios.ac.in/media/documents/319-New/Book-1/Ch-5.pdf" },
    { name: "Fundamentals of Management", url: "https://nios.ac.in/media/documents/319-New/Book-1/Ch-6.pdf" },
    { name: "Planning and Organising", url: "https://nios.ac.in/media/documents/319-New/Book-1/Ch-7.pdf" },
    { name: "Staffing and Directing", url: "https://nios.ac.in/media/documents/319-New/Book-1/Ch-8.pdf" },
    { name: "Co-ordination and Controlling", url: "https://nios.ac.in/media/documents/319-New/Book-1/Ch-9.pdf" },
    { name: "Financial Planning and Management", url: "https://nios.ac.in/media/documents/319-New/Book-1/Ch-10.pdf" },
    { name: "Short Term Sources of Finance", url: "https://nios.ac.in/media/documents/319-New/Book-1/Ch-11.pdf" },
    { name: "Long-Term Sources of Business Finance", url: "https://nios.ac.in/media/documents/319-New/Book-1/Ch-12.pdf" },
    { name: "The Financial Market", url: "https://nios.ac.in/media/documents/319-New/Book-1/Ch-13.pdf" },

    { name: "Introduction to Marketing", url: "https://nios.ac.in/media/documents/319-New/Book-2/Ch-14.pdf" },
    { name: "The Marketing Mix", url: "https://nios.ac.in/media/documents/319-New/Book-2/Ch-15.pdf" },
    { name: "Advertising and Salesmanship", url: "https://nios.ac.in/media/documents/319-New/Book-2/Ch-16.pdf" },
    { name: "Consumer Protection", url: "https://nios.ac.in/media/documents/319-New/Book-2/Ch-17.pdf" },
    { name: "Internal Trade", url: "https://nios.ac.in/media/documents/319-New/Book-2/Ch-18.pdf" },
    { name: "External Trade", url: "https://nios.ac.in/media/documents/319-New/Book-2/Ch-19.pdf" },
    { name: "Self-Employment", url: "https://nios.ac.in/media/documents/319-New/Book-2/Ch-20.pdf" },
    { name: "Job Employment", url: "https://nios.ac.in/media/documents/319-New/Book-2/Ch-21.pdf" },
    { name: "Skill Development", url: "https://nios.ac.in/media/documents/319-New/Book-2/Ch-22.pdf" },
    { name: "Modern Modes of Business", url: "https://nios.ac.in/media/documents/319-New/Book-2/Ch-23.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Business Studies 319</title>
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
                  Business Studies (319) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Book Download Section */}
            {/* <div className="mb-4">
              <p>
                📘 <a href="https://nios.ac.in/media/documents/319-New/HindiMedium/Book-1.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 1
                </a>
              </p>
              <p>
                📘 <a href="https://nios.ac.in/media/documents/319-New/HindiMedium/Book-2.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 2
                </a>
              </p>
            </div> */}

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

            .even-row {
              background-color: #f9fafc;
            }

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
