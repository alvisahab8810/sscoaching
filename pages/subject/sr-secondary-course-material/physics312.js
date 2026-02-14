"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Physics312() {

  const chapters = [
    { name: "Units, Dimensions and Vectors", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson1.pdf" },
    { name: "Motion in a Straight Line", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson2.pdf" },
    { name: "Laws of Motion", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson3.pdf" },
    { name: "Motion in a Plane", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson4.pdf" },
    { name: "Gravitation", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson5.pdf" },
    { name: "Work, Energy and Power", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson6.pdf" },
    { name: "Motion of a Rigid Body", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson7.pdf" },
    { name: "Elastic Properties of Solids", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson8.pdf" },
    { name: "Properties of Fluids", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson9.pdf" },
    { name: "Kinetic Theory of Gases", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson10.pdf" },
    { name: "Thermodynamics", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson11.pdf" },
    { name: "Heat Transfer and Solar Energy", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson12.pdf" },
    { name: "Simple Harmonic Motion", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson13.pdf" },
    { name: "Wave Phenomena", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson14.pdf" },
    { name: "Electric Charge and Electric Field", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson15.pdf" },
    { name: "Electric Potential and Capacitors", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson16.pdf" },
    { name: "Electric Current", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson17.pdf" },
    { name: "Magnetism and Magnetic Effect of Electric Current", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson18.pdf" },
    { name: "Electromagnetic Induction and Alternating Current", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson19.pdf" },
    { name: "Reflection and Refraction of Light", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson20.pdf" },
    { name: "Dispersion and Scattering of Light", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson21.pdf" },
    { name: "Wave Phenomena and Light", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson22.pdf" },
    { name: "Optical Instruments", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson23.pdf" },
    { name: "Structure of Atom", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson24.pdf" },
    { name: "Dual Nature of Radiation and Matter", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson25.pdf" },
    { name: "Nuclei and Radioactivity", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson26.pdf" },
    { name: "Nuclear Fission and Fusion", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson27.pdf" },
    { name: "Semiconductors and Semiconducting Devices", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson28.pdf" },
    { name: "Applications of Semiconductor Devices", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson29.pdf" },
    { name: "Communication Systems", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_Physics_Eng/312_Physics_Eng_Lesson30.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Physics 312</title>
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
                  Physics (312) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Book Download Section */}
            <div className="mb-4">
              <p>
                📘 <a href="https://nios.ac.in/media/documents/SrSec312NEW/312_E_book1.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 1
                </a>
              </p>

              <p>
                📘 <a href="https://nios.ac.in/media/documents/SrSec312NEW/312_E_book2.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
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
