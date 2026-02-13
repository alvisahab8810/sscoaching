"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import Head from "next/head";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function SocialScience213() {

  const chapters = [
    { name: "Introduction to Social Science", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-00.pdf" },
    { name: "Ancient World", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-01.pdf" },
    { name: "Medieval World", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-02.pdf" },
    { name: "Modern World - I", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-03.pdf" },
    { name: "Modern World - II", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-04.pdf" },
    { name: "Impact of British Rule on India", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-05.pdf" },
    { name: "Religious and Social Awakening in Colonial India", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-06.pdf" },
    { name: "Popular Resistance to the British Rule", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-07.pdf" },
    { name: "Indian National Movement", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-08.pdf" },
    { name: "Physiography of India", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-09.pdf" },
    { name: "Climate", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-10.pdf" },
    { name: "Bio-Diversity", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-11.pdf" },
    { name: "Agriculture in India", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-12.pdf" },
    { name: "Transport and Communication", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-13.pdf" },
    { name: "Population: Our Greatest Resource", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-14.pdf" },
    { name: "Constitutional Values and Political System in India", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-15.pdf" },
    { name: "Fundamental Rights and Fundamental Duties", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-16.pdf" },
    { name: "India - A Welfare State", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-17.pdf" },
    { name: "Local Governments and Field Administration", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-18.pdf" },
    { name: "Governance at the State Level", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-19.pdf" },
    { name: "Governance at the Union Level", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-20.pdf" },
    { name: "Political Parties and Pressure Groups", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-21.pdf" },
    { name: "People's Participation in the Democratic Process", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-22.pdf" },
    { name: "Challenges to Indian Democracy", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-23.pdf" },
    { name: "National Integration and Secularism", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-24.pdf" },
    { name: "Socio-Economic Development and Empowerment of Disadvantaged Groups", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-25.pdf" },
    { name: "Environmental Degradation and Disaster Management", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-26.pdf" },
    { name: "Peace and Security", url: "https://nios.ac.in/media/documents/SecSocSciCour/English/Lesson-27.pdf" },
  ];

  return (
    <div>
      <Head>
        <title>NIOS Secondary Course Social Science 213</title>
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
                  Social Science (213) - Books & Chapters
                </span>
              </h1>
            </div>

            {/* Book Links */}
            <div className="mb-4">
              <p>
                📘 <a href="https://nios.ac.in/media/documents/SecSocSciCour/English/Book1.pdf" target="_blank" className="book-link">Download Book 1</a>
              </p>
              <p>
                📘 <a href="https://nios.ac.in/media/documents/SecSocSciCour/English/Book2.pdf" target="_blank" className="book-link">Download Book 2</a>
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

            thead tr {
              background: #f9fafc;
            }

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
          `}</style>
        </section>
      </div>

      <Footer />
    </div>
  );
}
