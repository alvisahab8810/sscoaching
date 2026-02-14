"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Mathematics311() {

  const chapters = [
    { name: "Sets", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson1.pdf" },
    { name: "Relations and Functions - I", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson2.pdf" },
    { name: "Trigonometric Functions - I", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson3.pdf" },
    { name: "Trigonometric Functions - II", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson4.pdf" },
    { name: "Relation between Sides and Angles of a Triangle", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson5.pdf" },
    { name: "Sequences and Series", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson6.pdf" },
    { name: "Some Special Sequences", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson7.pdf" },
    { name: "Complex Numbers", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson8.pdf" },
    { name: "Quadratic Equations and Linear Inequalities", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson9.pdf" },
    { name: "Principle of Mathematical Induction", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson10.pdf" },
    { name: "Permutations and Combinations", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson11.pdf" },
    { name: "Binomial Theorem", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson12.pdf" },
    { name: "Cartesian System of Rectangular Co-ordinates", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson13.pdf" },
    { name: "Straight Lines", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson14.pdf" },
    { name: "Circles", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson15.pdf" },
    { name: "Conic Sections", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson16.pdf" },
    { name: "Measures of Dispersion", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson17.pdf" },
    { name: "Random Experiments and Events", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson18.pdf" },
    { name: "Probability", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson19.pdf" },
    { name: "Matrices", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson20.pdf" },
    { name: "Determinants", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson21.pdf" },
    { name: "Inverse of a Matrix and its Applications", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson22.pdf" },
    { name: "Relation and Functions - II", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson23.pdf" },
    { name: "Inverse Trigonometric Functions", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson24.pdf" },
    { name: "Limits and Continuity", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson25.pdf" },
    { name: "Differentiation", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson26.pdf" },
    { name: "Differentiation of Trigonometric Functions", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson27.pdf" },
    { name: "Differentiation of Exponential and Logarithmic Functions", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson28.pdf" },
    { name: "Application of Derivatives", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson29.pdf" },
    { name: "Integration", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson30.pdf" },
    { name: "Definite Integrals", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson31.pdf" },
    { name: "Differential Equations", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson32.pdf" },
    { name: "Introduction to 3-D", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson33.pdf" },
    { name: "Vectors", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson34.pdf" },
    { name: "Plane", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson35.pdf" },
    { name: "Straight Line", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson36.pdf" },
    { name: "Linear Programming", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson37.pdf" },
    { name: "Mathematical Reasoning", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_Maths_Eng/311_Maths_Eng_Lesson38.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Mathematics 311</title>
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
                  Mathematics (311) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Book Download Section */}
            <div className="mb-4">
              <p>
                📘 <a href="https://nios.ac.in/media/documents/SrSec311NEW/311_E_book1.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 1
                </a>
              </p>

              <p>
                📘 <a href="https://nios.ac.in/media/documents/SrSec311NEW/311_E_book2.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
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
