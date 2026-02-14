"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import Head from "next/head";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Mathematics211() {

  const chapters = [
    { name: "Number Systems", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-1.pdf" },
    { name: "Exponents and Radicals", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-2.pdf" },
    { name: " Algebraic Expressions and Polynomials", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-3.pdf" },
    { name: " Special Products and Factorization", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-4.pdf" },
    { name: " Linear Equations", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-5.pdf" },
    { name: " Quadratic Equations", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-6.pdf" },
    { name: " Arithmetic Progressions", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-7.pdf" },
    { name: " Percentage and its Applications", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-8.pdf" },
    { name: " Instalment Buying", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-9.pdf" },
    { name: " Lines and Angles", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-10.pdf" },
    { name: "Congruence of Triangles", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-11.pdf" },
    { name: "Concurrent Lines", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-12.pdf" },
    { name: "Quadrilaterals", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-13.pdf" },
    { name: " Similarity of Triangles", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-14.pdf" },
    { name: "Circles", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-15.pdf" },
    { name: " Angles in a Circle and Cyclic Quadrilateral", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-16.pdf" },
    { name: " Secants, Tangents and their Properties", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-17.pdf" },
    { name: " Constructions", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-18.pdf" },
    { name: " Co-ordinate Geometry", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-19.pdf" },
    { name: " Perimeters and Area of Plane Figures", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-20.pdf" },
    { name: " Surface Area and Volume of Solid Figures", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-21.pdf" },
    { name: " Introduction to Trigonometry", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-22.pdf" },
    { name: " Trigonometric Ratios of Some Special Angles", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-23.pdf" },
    { name: " Data and Their Representation", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-24.pdf" },
    { name: " Measures of Central Tendency", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-25.pdf" },
    { name: " Introduction to Probability", url: "https://nios.ac.in/media/documents/SecMathcour/Eng/Chapter-26.pdf" },
  ];

  return (
    <div>
      <Head>
        <title>NIOS Secondary Course Mathematics 211</title>
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
                  Mathematics (211) - Chapters
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
                        <a href={chapter.url} target="_blank" rel="noopener noreferrer" className="pdf-icon">
                          <FaFilePdf />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


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
