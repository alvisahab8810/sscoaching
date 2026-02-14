"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import Head from "next/head";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Science212() {

  const chapters = [
    { name: "Measurement in Science and Technology", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-1.pdf" },
    { name: "Matter in Our Surroundings", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-2.pdf" },
    { name: "Atom and Molecules", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-3.pdf" },
    { name: "Chemical Reaction and Equations", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-4.pdf" },
    { name: "Atomic Structure", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-5.pdf" },
    { name: "Periodic Classification of Elements", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-6.pdf" },
    { name: "Chemical Bonding", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-7.pdf" },
    { name: "Acids, Bases and Salts", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-8.pdf" },
    { name: "Motion and its Description", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-9.pdf" },
    { name: "Force and Motion", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-10.pdf" },
    { name: "Gravitation", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-11.pdf" },
    { name: "Sources of Energy", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-12.pdf" },
    { name: "Work and Energy", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-13.pdf" },
    { name: "Thermal Energy", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-14.pdf" },
    { name: "Light Energy", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-15.pdf" },
    { name: "Electrical Energy", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-16.pdf" },
    { name: "Magnetic Effect of Electric Current", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-17.pdf" },
    { name: "Sound and Communication", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-18.pdf" },
    { name: "Classification of Living Organisms", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-19.pdf" },
    { name: "History of Life on Earth", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-20.pdf" },
    { name: "Building Blocks of Life - Cell and Tissues", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-21.pdf" },
    { name: "Life Processes - Nutrition, Transportation, Respiration and Excretion", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-22.pdf" },
    { name: "Life Processes - Control and Coordination", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-23.pdf" },
    { name: "Life Processes - Reproduction", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-24.pdf" },
    { name: "Heredity", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-25.pdf" },
    { name: "Air and Water", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-26.pdf" },
    { name: "Metals and Non-metals", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-27.pdf" },
    { name: "Carbon and Its Compounds", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-28.pdf" },
    { name: "Natural Environment", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-29.pdf" },
    { name: "Human Impact on Environment", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-30.pdf" },
    { name: "Food Production", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-31.pdf" },
    { name: "Health and Hygiene", url: "https://nios.ac.in/media/documents/secscicour/English/Chapter-32.pdf" },
  ];

  return (
    <div>
      <Head>
        <title>NIOS Secondary Course Science and Technology 212</title>
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
                  Science and Technology (212) - Chapters
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
