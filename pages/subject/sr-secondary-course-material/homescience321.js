"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function HomeScience321() {

  const chapters = [
    { name: "Home, Family and Home Science", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-1.pdf" },
    { name: "Ethics in Daily Life", url: "https://nios.ac.in/media/documents/srsec321newE/321-Lesson-2.pdf" },
    { name: "Family Health and Security", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-3.pdf" },
    { name: "Food, Nutrition and Health", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-4.pdf" },
    { name: "Meal Planning", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-5.pdf" },
    { name: "Nutritional Status", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-6.pdf" },
    { name: "Purchase and Storage of Food", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-7.pdf" },
    { name: "Preparation of Food", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-8.pdf" },
    { name: "Food Preservation", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-9.pdf" },
    { name: "Family Resources Management", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-10.pdf" },
    { name: "Time and Energy Management", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-11.pdf" },
    { name: "Space Management", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-12.pdf" },
    { name: "Income Management", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-13.pdf" },
    { name: "Energy Conservation", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-14.pdf" },
    { name: "Environment Management", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-15.pdf" },
    { name: "Household Equipment", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-16.pdf" },
    { name: "Consumer Education", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-17.pdf" },
    { name: "Growth and Development (0–5 Years)", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-18.pdf" },
    { name: "Growth and Development (6–11 Years)", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-19.pdf" },
    { name: "Adolescence", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-20.pdf" },
    { name: "Concerns and Issues in Human Development", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-21.pdf" },
    { name: "Introduction to Fabric Sciences", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-22.pdf" },
    { name: "Yarn and its Construction", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-23.pdf" },
    { name: "Fabric Construction", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-24.pdf" },
    { name: "Textile Finishes", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-25.pdf" },
    { name: "Selection of Textiles and Clothing", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-26.pdf" },
    { name: "Care and Maintenance", url: "https://nios.ac.in/media/documents/srsec321newE/321-E-Lesson-27.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Home Science 321</title>
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
                  Home Science (321) – Sr Secondary Chapters
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
