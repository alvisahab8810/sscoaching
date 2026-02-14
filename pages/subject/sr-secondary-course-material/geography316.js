"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Geography316() {

  const chapters = [
    { name: "Nature and Subject Matter of Geography", url: "https://nios.ac.in/media/documents/316-New/Book-1/Ch-1.pdf" },
    { name: "Endogenic Forces", url: "https://nios.ac.in/media/documents/316-New/Book-1/Ch-2.pdf" },
    { name: "Exogenic Forces and their Resultant Landforms", url: "https://nios.ac.in/media/documents/316-New/Book-1/Ch-3.pdf" },
    { name: "Running Water, Moving Ice, Wind and Sea Waves", url: "https://nios.ac.in/media/documents/316-New/Book-1/Ch-4.pdf" },
    { name: "Hydrological Cycle and Ocean", url: "https://nios.ac.in/media/documents/316-New/Book-1/Ch-5.pdf" },
    { name: "Structure and Composition; Insolation", url: "https://nios.ac.in/media/documents/316-New/Book-1/Ch-6.pdf" },
    { name: "Atmospheric Pressure and Winds", url: "https://nios.ac.in/media/documents/316-New/Book-1/Ch-7.pdf" },
    { name: "Humidity and Precipitation", url: "https://nios.ac.in/media/documents/316-New/Book-1/Ch-8.pdf" },
    { name: "Climate and Climate Change", url: "https://nios.ac.in/media/documents/316-New/Book-1/Ch-9.pdf" },
    { name: "Biosphere, Biomes and Biodiversity", url: "https://nios.ac.in/media/documents/316-New/Book-1/Ch-10.pdf" },
    { name: "Physical Settings", url: "https://nios.ac.in/media/documents/316-New/Book-1/Ch-11.pdf" },
    { name: "Climate", url: "https://nios.ac.in/media/documents/316-New/Book-1/Ch-12.pdf" },
    { name: "Natural Hazards and Disasters", url: "https://nios.ac.in/media/documents/316-New/Book-1/Ch-13.pdf" },
    { name: "Land and Soil Resources", url: "https://nios.ac.in/media/documents/316-New/Book-2/Ch-14.pdf" },
    { name: "Forests and Biodiversity", url: "https://nios.ac.in/media/documents/316-New/Book-2/Ch-15.pdf" },
    { name: "Water Resources", url: "https://nios.ac.in/media/documents/316-New/Book-2/Ch-16.pdf" },
    { name: "Agriculture and Food Security", url: "https://nios.ac.in/media/documents/316-New/Book-2/Ch-17.pdf" },
    { name: "Mineral and Energy Resources", url: "https://nios.ac.in/media/documents/316-New/Book-2/Ch-18.pdf" },
    { name: "Major Industries and Industrial Complexes", url: "https://nios.ac.in/media/documents/316-New/Book-2/Ch-19.pdf" },
    { name: "Foreign Direct Investment (FDI), Transport, Communication and Trade", url: "https://nios.ac.in/media/documents/316-New/Book-2/Ch-20.pdf" },
    { name: "Population Growth and Distribution", url: "https://nios.ac.in/media/documents/316-New/Book-2/Ch-21.pdf" },
    { name: "Population Composition", url: "https://nios.ac.in/media/documents/316-New/Book-2/Ch-22.pdf" },
    { name: "Human Development", url: "https://nios.ac.in/media/documents/316-New/Book-2/Ch-23.pdf" },
    { name: "Sustainable Development Goals (SDGs)", url: "https://nios.ac.in/media/documents/316-New/Book-2/Ch-24.pdf" },
    { name: "Environment, Health and Sanitation", url: "https://nios.ac.in/media/documents/316-New/Book-2/Ch-25.pdf" },
    { name: "Practical 1: Maps (Types and Elements; Toposheets)", url: "https://nios.ac.in/media/documents/316-New/Book-2/Practical-1.pdf" },
    { name: "Practical 2: Geospatial Technologies", url: "https://nios.ac.in/media/documents/316-New/Book-2/Practical-2.pdf" },
    { name: "Practical 3: Data and Statistical Diagrams", url: "https://nios.ac.in/media/documents/316-New/Book-2/Practical-3.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Geography 316</title>
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
                  Geography (316) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Book Download Section */}
            <div className="mb-4">
              <p>
                📘 <a href="https://nios.ac.in/media/documents/316-New/Book-1/Geography-316-Book-1.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 1
                </a>
              </p>

              <p>
                📘 <a href="https://nios.ac.in/media/documents/316-New/Book-2/Geography-316-New-Book-2.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
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
