"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import Head from "next/head";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Accountancy224() {

  const chapters = [
    { name: "Introduction to Accounting", url: "https://nios.ac.in/media/documents/Seccour224New/ch_1.pdf" },
    { name: "Accounting Concepts and Conventions", url: "https://nios.ac.in/media/documents/Seccour224New/ch_2.pdf" },
    { name: "Accounting Terms", url: "https://nios.ac.in/media/documents/Seccour224New/ch_3.pdf" },
    { name: "Accounting Equations", url: "https://nios.ac.in/media/documents/Seccour224New/ch_4.pdf" },
    { name: "Double Entry System", url: "https://nios.ac.in/media/documents/Seccour224New/ch_5.pdf" },
    { name: "Journal", url: "https://nios.ac.in/media/documents/Seccour224New/ch_6.pdf" },
    { name: "Cash Book", url: "https://nios.ac.in/media/documents/Seccour224New/ch_7.pdf" },
    { name: "Bank Reconciliation Statement", url: "https://nios.ac.in/media/documents/Seccour224New/ch_8.pdf" },
    { name: "Purchases and Sales Book", url: "https://nios.ac.in/media/documents/Seccour224New/ch_9.pdf" },
    { name: "Ledger", url: "https://nios.ac.in/media/documents/Seccour224New/ch_10.pdf" },
    { name: "Trial Balance and Accounting Errors", url: "https://nios.ac.in/media/documents/Seccour224New/ch_11.pdf" },
    { name: "Depreciation", url: "https://nios.ac.in/media/documents/Seccour224New/ch_12.pdf" },
    { name: "Provisions and Reserve", url: "https://nios.ac.in/media/documents/Seccour224New/ch_13.pdf" },
    { name: "Financial Statements Without Adjustments", url: "https://nios.ac.in/media/documents/Seccour224New/ch_14.pdf" },
    { name: "Financial Statements With Adjustments", url: "https://nios.ac.in/media/documents/Seccour224New/ch_15.pdf" },
    { name: "Computers in Accounting", url: "https://nios.ac.in/media/documents/Seccour224New/ch_16.pdf" },
    { name: "Introduction to Tally", url: "https://nios.ac.in/media/documents/Seccour224New/ch_17.pdf" },
  ];

  return (
    <div>
      <Head>
        <title>NIOS Secondary Course Accountancy 224</title>
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
                  Accountancy (224) - Chapters
                </span>
              </h1>
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

          {/* SAME CSS */}
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
          `}</style>

        </section>
      </div>

      <Footer />
    </div>
  );
}
