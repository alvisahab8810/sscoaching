"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Economics318() {

  const chapters = [
    { name: "Overview of Indian Economy", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson1.pdf" },
    { name: "Economic Planning in India", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson2.pdf" },
    { name: "Economic Growth and Economic Development", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson3.pdf" },
    { name: "Problem of Unemployment, Poverty and Inequality", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson4.pdf" },
    { name: "Meaning, Scope and Need in Economics", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson5.pdf" },
    { name: "Collection and Classification of Data", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson6.pdf" },
    { name: "Presentation of Data", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson7.pdf" },
    { name: "Measures of Central Tendency", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson8.pdf" },
    { name: "Measures of Dispersion", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson9.pdf" },
    { name: "Correlation Analysis", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson10.pdf" },
    { name: "Index Numbers", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson11.pdf" },
    { name: "Introduction to the Study of Economics", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson12.pdf" },
    { name: "Central Problems of an Economy", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson13.pdf" },
    { name: "Consumer's Equilibrium", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson14.pdf" },
    { name: "Demand", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson15.pdf" },
    { name: "Price Elasticity of Demand", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson16.pdf" },
    { name: "Production Function", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson17.pdf" },
    { name: "Cost of Production", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson18.pdf" },
    { name: "Supply", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson19.pdf" },
    { name: "Price Elasticity of Supply", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson20.pdf" },
    { name: "Forms of Market", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson21.pdf" },
    { name: "Price Determination Under Perfect Competition", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson22.pdf" },
    { name: "Revenue and Profit Maximization of a Competitive Firm", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson23.pdf" },
    { name: "National Income and Related Aggregates", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson24.pdf" },
    { name: "National Income and its Measurement", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson25.pdf" },
    { name: "Consumption, Saving and Investment", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson26.pdf" },
    { name: "Theory of Income Determination", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson27.pdf" },
    { name: "Money and Banking", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson28.pdf" },
    { name: "Government and the Budget", url: "https://nios.ac.in/media/documents/SrSec318NEW/318_Economics_Eng/318_Economics_Eng_Lesson29.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Economics 318</title>
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
                  Economics (318) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Book Download Section */}
            <div className="mb-4">
              <p>
                📘 <a href="https://nios.ac.in/media/documents/SrSec318NEW/Book1_318.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 1
                </a>
              </p>
              <p>
                📘 <a href="https://nios.ac.in/media/documents/SrSec318NEW/Book2_318.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 2
                </a>
              </p>
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
