"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function MassCommunication335() {

  const chapters = [
    { name: "Introduction to Communication", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L1.pdf" },
    { name: "Mass Communication", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L2.pdf" },
    { name: "Role and Impact of Mass Media", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L3.pdf" },
    { name: "Development Communication", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L4.pdf" },
    { name: "Introduction to Print Media", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L5.pdf" },
    { name: "What is News?", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L6.pdf" },
    { name: "Reporting and Editing", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L7.pdf" },
    { name: "Language Press in India", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L8.pdf" },
    { name: "Characteristics of Radio", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L9.pdf" },
    { name: "The Radio Station", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L10.pdf" },
    { name: "Formats of Radio Programmes", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L11.pdf" },
    { name: "Radio Programme Production", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L12.pdf" },
    { name: "Television in India", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L13.pdf" },
    { name: "Role of Television as a Mass Medium", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L14.pdf" },
    { name: "Television Channels", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L15.pdf" },
    { name: "Television Program Production", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L16.pdf" },
    { name: "Advertising - An Introduction", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L17.pdf" },
    { name: "Advertising - An Industry", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L18.pdf" },
    { name: "Public Relations - An Introduction", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L19.pdf" },
    { name: "Public Relations - Tools", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L20.pdf" },
    { name: "Characteristics of New Media", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L21.pdf" },
    { name: "New Media: The Industry", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L22.pdf" },
    { name: "New Media: Target Audience", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L23.pdf" },
    { name: "New Media: Employment Opportunities", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L24.pdf" },
    { name: "25A. Introduction to Traditional Media", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L25A.pdf" },
    { name: "25B. Introduction to Photography", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L25B.pdf" },
    { name: "26A. Types of Traditional Media", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L26A.pdf" },
    { name: "26B. The Camera", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L26B.pdf" },
    { name: "27A. Comparison of Traditional Media with Electronic Media", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L27A.pdf" },
    { name: "27B. Photojournalism", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L27B.pdf" },
    { name: "28A. Communication through Traditional Media", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L28A.pdf" },
    { name: "28B. Role of a Photojournalist", url: "https://nios.ac.in/media/documents/srsec335new/335_Mass_Communication_Eng/335_Mass_Communication_Eng_L28B.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Mass Communication 335</title>
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
                  Mass Communication (335) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Book Download Section */}
            <div className="mb-4">
              <p>
                📘 <a href="https://nios.ac.in/media/documents/srsec335new/335EContent.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book
                </a>
              </p>
            </div>

            <div className="table-responsive">
              <table className="table table-striped custom-table align-middle mb-0">
                <thead>
                  <tr>
                    <th className="text-center1">Sr. no.</th>
                    <th className="text-center">Chapter Name</th>
                    <th className="text-center">PDF</th>
                  </tr>
                </thead>

                <tbody>
                  {chapters.map((chapter, index) => (
                    <tr key={index} className={index % 2 === 0 ? "even-row" : ""}>
                      <td className="text-center1">{index + 1}</td>
                      <td className="text-center"><strong>{chapter.name}</strong></td>
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
              text-align: center;
            }

            tbody td {
              padding: 10px;
              font-size: 15px;
              border-top: 1px solid #f1f1f1;
              text-align: center;
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
