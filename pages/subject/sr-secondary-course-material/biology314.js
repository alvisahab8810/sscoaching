"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Biology314() {

  const chapters = [
    { name: "Origin and Evolution of Life and Introduction to Classification", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-01.pdf" },
    { name: "The Kingdom Monera, Protoctista and Fungi", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-02.pdf" },
    { name: "Kingdom Plantae and Animalia", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-03.pdf" },
    { name: "Cell Structure and Function", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-04.pdf" },
    { name: "Tissues and other Level of Organization", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-05.pdf" },
    { name: "Root System", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-06.pdf" },
    { name: "Shoot System", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-07.pdf" },
    { name: "Absorption, Transport and Water Loss in Plants", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-08.pdf" },
    { name: "Nutrition in Plants - Mineral Nutrition", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-09.pdf" },
    { name: "Nitrogen Metabolism", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-10.pdf" },
    { name: "Photosynthesis", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-11.pdf" },
    { name: "Respiration in Plants", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-12.pdf" },
    { name: "Nutrition and Digestion", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-13.pdf" },
    { name: "Respiration and Elimination of Nitrogenous Wastes", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-14.pdf" },
    { name: "Circulation of Body Fluids", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-15.pdf" },
    { name: "Locomotion and Movement", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-16.pdf" },
    { name: "Coordination and Control - The Nervous and Endocrine Systems", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-17.pdf" },
    { name: "Homeostasis: The Steady State", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-18.pdf" },
    { name: "Reproduction in Plants", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-19.pdf" },
    { name: "Growth and Development in Plants", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-20.pdf" },
    { name: "Reproduction and Population Control", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-21.pdf" },
    { name: "Principles of Genetics", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-22.pdf" },
    { name: "Molecular Inheritance and Gene Expression", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-23.pdf" },
    { name: "Genetics and Society", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-24.pdf" },
    { name: "Principles of Ecology", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-25.pdf" },
    { name: "Conservation and Use of Natural Resources", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-26.pdf" },
    { name: "Pollution", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-27.pdf" },
    { name: "Nutrition and Health", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-28.pdf" },
    { name: "Some Common Human Diseases", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-29.pdf" },
    { name: "Biotechnology", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-30.pdf" },
    { name: "Immunobiology: An Introduction", url: "https://nios.ac.in/media/documents/SrSec314NewE/Lesson-31.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Biology 314</title>
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
                  Biology (314) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            <div className="mb-4">
              <p>
                📘 <a
                  href="https://nios.ac.in/media/documents/SrSec314NewE/314_Book-1_Eng.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-link"
                >
                  Download Book 1
                </a>
              </p>

              <p>
                📘 <a
                  href="https://nios.ac.in/media/documents/SrSec314NewE/314_Book-2_Eng.pdf"
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

  thead tr {
    background: #f9fafc;
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
    text-align: center;   /* ✅ ALL CENTER */
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
    color: #1d4ed8;
  }

  .table-responsive {
    border-radius: 12px;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    thead {
      display: none;
    }

    tbody td {
      display: block;
      text-align: right;
      border: none;
      padding: 10px 15px;
    }

    tbody tr {
      margin-bottom: 10px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    tbody td::before {
      content: attr(data-label);
      float: left;
      font-weight: 600;
      color: #666;
    }
  }
`}</style>

        </section>

        <Footer />
      </div>
    </>
  );
}
