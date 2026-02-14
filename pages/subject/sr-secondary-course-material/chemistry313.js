"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Chemistry313() {

  const chapters = [
    { name: "Atoms, Molecules and Chemical Arithmetic", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson1.pdf" },
    { name: "Atomic Structure", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson2.pdf" },
    { name: "Periodic Table and Periodicity in Properties", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson3.pdf" },
    { name: "Chemical Bonding", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson4.pdf" },
    { name: "The Gaseous State and Liquid State", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson5.pdf" },
    { name: "The Solid State", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson6.pdf" },
    { name: "Solutions", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson7.pdf" },
    { name: "Colloids", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson8.pdf" },
    { name: "Chemical Thermodynamics", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson9.pdf" },
    { name: "Spontaneity of Chemical Reactions", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson10.pdf" },
    { name: "Chemical Equilibrium", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson11.pdf" },
    { name: "Ionic Equilibrium", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson12.pdf" },
    { name: "Electrochemistry", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson13.pdf" },
    { name: "Chemical Kinetics", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson14.pdf" },
    { name: "Adsorption and Catalysis", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson15.pdf" },
    { name: "Occurrence and Extraction of Metals", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson16.pdf" },
    { name: "Hydrogen and s-Block Elements", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson17.pdf" },
    { name: "General Characteristics of the p-block Elements", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson18.pdf" },
    { name: "p-block Elements and their Compounds - I", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson19.pdf" },
    { name: "p-block Elements and their Compounds - II", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson20.pdf" },
    { name: "d-Block and f-Block Elements", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson21.pdf" },
    { name: "Coordination Compounds", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson22.pdf" },
    { name: "Nomenclature and General Principles", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson23.pdf" },
    { name: "Hydrocarbons", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson24.pdf" },
    { name: "Compounds of Carbon Containing Halogens (Haloalkanes and Haloarenes)", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson25.pdf" },
    { name: "Alcohols, Phenols and Ethers", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson26.pdf" },
    { name: "Aldehydes, Ketones and Carboxylic Acids", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson27.pdf" },
    { name: "Compounds of Carbon Containing Nitrogen", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson28.pdf" },
    { name: "Biomolecules", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson29.pdf" },
    { name: "Drugs and Medicines", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson30.pdf" },
    { name: "Soaps, Detergents and Polymers", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson31.pdf" },
    { name: "Environmental Chemistry", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_Chemistry_Eng/313_Chemistry_Eng_Lesson32.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Chemistry 313</title>
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
                  Chemistry (313) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Book Download Section */}
            <div className="mb-4">
              <p>
                📘 <a href="https://nios.ac.in/media/documents/SrSec313NEW/313_E_book1.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 1
                </a>
              </p>

              <p>
                📘 <a href="https://nios.ac.in/media/documents/SrSec313NEW/313_E_book2.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
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
