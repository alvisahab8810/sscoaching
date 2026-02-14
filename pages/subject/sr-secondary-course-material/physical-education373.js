"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function PhysicalEducation373() {

  const chapters = [
    // Book 1
    { name: "INTRODUCTION AND HISTORICAL DEVELOPMENT", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-1/Lesson1.pdf" },
    { name: "ETHICS AND VALUES", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-1/Lesson2.pdf" },
    { name: "PHYSICAL FITNESS AND WELLNESS", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-1/Lesson3.pdf" },
    { name: "CAREER ASPECTS OF PHYSICAL EDUCATION", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-1/Lesson4.pdf" },
    { name: "PHYSICAL AND PHYSIOLOGICAL ASPECTS OF PHYSICAL EDUCATION", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-1/Lesson5.pdf" },
    { name: "PSYCHOLOGICAL ASPECTS", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-1/Lesson6.pdf" },
    { name: "SOCIAL ASPECTS", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-1/Lesson7.pdf" },
    { name: "SPIRITUAL ASPECTS", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-1/Lesson8.pdf" },
    { name: "INTRODUCTION TO HEALTH", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-1/Lesson9.pdf" },
    { name: "DIET AND NUTRITION", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-1/Lesson10.pdf" },
    { name: "AWARENESS OF LIFESTYLE DISORDERS", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-1/Lesson11.pdf" },
    { name: "SCHOOL HEALTH PROGRAMME", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-1/Lesson12.pdf" },

    // Book 2 (Corrected path)
    { name: "PHYSICAL EDUCATION FOR VARIOUS POPULATIONS", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/book-2/Lesson-13.pdf" },
    { name: "SPORTS TRAINING", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/book-2/Lesson-14.pdf" },
    { name: "TESTS AND MEASUREMENTS", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/book-2/Lesson-15.pdf" },
    { name: "ORGANIZATION OF TOURNAMENT", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/book-2/Lesson-16.pdf" },
    { name: "ATHLETIC INJURIES, FIRST AID AND SAFETY", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/book-2/Lesson-17.pdf" },
    { name: "HATHA YOG", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/book-2/Lesson-18.pdf" },
    { name: "SHATKARMA", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/book-2/Lesson-19.pdf" },
    { name: "ASANA", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/book-2/Lesson-20.pdf" },
    { name: "PRANAYAM", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/book-2/Lesson-21.pdf" },
    { name: "MUDRA AND BANDHA", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/book-2/Lesson-22.pdf" },
  ];

  const practicals = Array.from({ length: 33 }, (_, i) => ({
    name: `Practical ${i + 1}`,
    url: `https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/practical/${i + 1}.pdf`
  }));

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Physical Education (373)</title>
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
                  Physical Education (373)
                </span>
              </h1>
            </div>

            {/* Book Section */}
            <div className="mb-4">
              <p>
                📘 <a href="https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-1-373.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 1
                </a>
              </p>

              <p>
                📘 <a href="https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-2-373.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 2
                </a>
              </p>

              <p>
                📙 <a href="https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Practical-373.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Practical Manual
                </a>
              </p>
            </div>

            <div className="table-responsive mb-5">
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

            {/* Practical Table */}
            <div className="table-responsive">
              <h4 className="mb-3">Practical Files</h4>
              <table className="table table-striped custom-table align-middle mb-0">
                <thead>
                  <tr>
                    <th className="text-center1">Sr. no.</th>
                    <th>Practical Name</th>
                    <th className="text-center">PDF</th>
                  </tr>
                </thead>

                <tbody>
                  {practicals.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "even-row" : ""}>
                      <td className="text-center1">{index + 1}</td>
                      <td><strong>{item.name}</strong></td>
                      <td className="text-center">
                        <a
                          href={item.url}
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

          {/* SAME CSS — NOT CHANGED */}
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
