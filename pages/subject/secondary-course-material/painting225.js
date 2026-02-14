"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import Head from "next/head";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Painting225() {

  const theoryLessons = [
    { name: "Lesson 1 - History and Appreciation of Indian Art (3000 B.C - 600 A.D)", url: "https://nios.ac.in/media/documents/sec225new/Lesson-1.pdf" },
    { name: "Lesson 2 - History and Appreciation of Art (7th - 12th Century A.D)", url: "https://nios.ac.in/media/documents/sec225new/Lesson-2.pdf" },
    { name: "Lesson 3 - Art (13th - 18th Century A.D)", url: "https://nios.ac.in/media/documents/sec225new/Lesson-3.pdf" },
    { name: "Lesson 4 - Introduction to Indian Folk Art", url: "https://nios.ac.in/media/documents/sec225new/Lesson-4.pdf" },
    { name: "Lesson 5 - Renaissance", url: "https://nios.ac.in/media/documents/sec225new/Lesson-5.pdf" },
    { name: "Lesson 6 - Impressionism", url: "https://nios.ac.in/media/documents/sec225new/Lesson-6.pdf" },
    { name: "Lesson 7 - Cubism, Surrealism and Abstract Art", url: "https://nios.ac.in/media/documents/sec225new/Lesson-7.pdf" },
    { name: "Lesson 8 - Pioneers of Contemporary Indian Art", url: "https://nios.ac.in/media/documents/sec225new/Lesson-8.pdf" },
    { name: "Lesson 9 - Contemporary Indian Art", url: "https://nios.ac.in/media/documents/sec225new/Lesson-9.pdf" },
  ];

//   const practicalLessons = [
//     { name: "Practical 1 - Tools and Material (Guideline)", url: "https://nios.ac.in/media/documents/sec225new/P-01.pdf" },
//     { name: "Practical 2 - Object Study (Guideline)", url: "https://nios.ac.in/media/documents/sec225new/P-02.pdf" },
//     { name: "Practical 3 - Nature Study (Guideline)", url: "https://nios.ac.in/media/documents/sec225new/P-03.pdf" },
//     { name: "Practical 4 - Human Figure (Guideline)", url: "https://nios.ac.in/media/documents/sec225new/P-04.pdf" },
//     { name: "Practical 5 - Study of Animals and Birds (Guideline)", url: "https://nios.ac.in/media/documents/sec225new/P-05.pdf" },
//     { name: "Practical 6 - Composition (Guideline)", url: "https://nios.ac.in/media/documents/sec225new/P-06.pdf" },
//   ];

  return (
    <div>
      <Head>
        <title>NIOS Secondary Course Painting 225</title>
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
                  Painting (225) - Study Material
                </span>
              </h1>
            </div>

            {/* Books */}
            <div className="mb-4">
              <p>
                📘 <a href="https://nios.ac.in/media/documents/sec225new/225EContent.pdf" target="_blank" className="book-link">
                  Download Complete Book
                </a>
              </p>
            </div>

            {/* THEORY TABLE */}
            {/* <h5 className="mb-3"><strong>Theory Lessons</strong></h5> */}

            <div className="table-responsive mb-5">
              <table className="table table-striped custom-table align-middle mb-0">
                <thead>
                  <tr>
                    <th className="text-center1">Sr. no.</th>
                    <th>Lesson Name</th>
                    <th className="text-center">PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {theoryLessons.map((lesson, index) => (
                    <tr key={index} className={index % 2 === 0 ? "even-row" : ""}>
                      <td className="text-center1">{index + 1}</td>
                      <td><strong>{lesson.name}</strong></td>
                      <td className="text-center">
                        <a href={lesson.url} target="_blank" className="pdf-icon">
                          <FaFilePdf />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PRACTICAL TABLE */}
            {/* <h5 className="mb-3"><strong>Practical Guidelines</strong></h5>

            <div className="table-responsive">
              <table className="table table-striped custom-table align-middle mb-0">
                <thead>
                  <tr>
                    <th className="text-center1">Sr. no.</th>
                    <th>Practical Name</th>
                    <th className="text-center">PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {practicalLessons.map((lesson, index) => (
                    <tr key={index} className={index % 2 === 0 ? "even-row" : ""}>
                      <td className="text-center1">{index + 1}</td>
                      <td><strong>{lesson.name}</strong></td>
                      <td className="text-center">
                        <a href={lesson.url} target="_blank" className="pdf-icon">
                          <FaFilePdf />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}

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
