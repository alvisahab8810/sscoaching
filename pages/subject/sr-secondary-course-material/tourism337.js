"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Tourism337() {

  const chapters = [
    { name: "Evolution of Tourism", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L1.pdf" },
    { name: "Tourism Industry and its Organization", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L2.pdf" },
    { name: "Impact of Tourism", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L3.pdf" },
    { name: "Fundamentals of Travel and Tourism Geography", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L4.pdf" },
    { name: "Transport for Tourism", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L5.pdf" },
    { name: "Understanding Indian Culture and Heritage", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L6.pdf" },
    { name: "Performing Art Heritage in India", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L7.pdf" },
    { name: "Indian Architecture as Tourist Attractions", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L8.pdf" },
    { name: "Culture and Heritages in India-I", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L9.pdf" },
    { name: "Culture and Heritages in India-II", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L10.pdf" },
    { name: "Cultural Attractions of India", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L11.pdf" },
    { name: "Natural Tourist Attractions in India", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L12.pdf" },
    { name: "Growth and Patterns of Tourism in India", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L13.pdf" },
    { name: "Growth and Patterns of Tourism in World", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L14.pdf" },
    { name: "Tourism Management", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L15.pdf" },
    { name: "Human Resource Management-I", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L16.pdf" },
    { name: "Human Resource Management-II", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L17.pdf" },
    { name: "Communication and Personality Development", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L18.pdf" },
    { name: "Tourism Marketing", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L19.pdf" },
    { name: "Fundamentals of Travels Agency and Tour Operation Business (20A)", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L20A.pdf" },
    { name: "Hospitality and Catering Industry (20B)", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L20B.pdf" },
    { name: "Functions of Travel Agencies and Tour Operations (21A)", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L21A.pdf" },
    { name: "Front Office Operations (21B)", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L21B.pdf" },
    { name: "Itinerary Planning and Tour Packaging (22A)", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L22A.pdf" },
    { name: "Supporting Operations of Hotel (22B)", url: "https://nios.ac.in/media/documents/tourism_337_courseE/337_Tourism_Eng/337_Tourism_Eng_L22B.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Tourism 337</title>
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
                  Tourism (337) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Books in ONE ROW */}
            <div className="book-row mb-4">
              <a href="https://nios.ac.in/media/documents/tourism_337_courseE/Tourism_Book-01.pdf" target="_blank" className="book-link">📘 Book 1</a>
              <a href="https://nios.ac.in/media/documents/tourism_337_courseE/Tourism_Book-02.pdf" target="_blank" className="book-link">📘 Book 2</a>
              <a href="https://nios.ac.in/media/documents/tourism_337_courseE/Tourism_Book-03.pdf" target="_blank" className="book-link">📘 Book 3</a>
              <a href="https://nios.ac.in/media/documents/tourism_337_courseE/Tourism_Book-04.pdf" target="_blank" className="book-link">📘 Book 4</a>
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
                        <a href={chapter.url} target="_blank" className="pdf-icon">
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
            .book-row {
              display: flex;
              gap: 15px;
              flex-wrap: wrap;
            }

            .book-link {
              font-weight: 600;
              color: #2563eb;
              text-decoration: none;
              background: #f1f5ff;
              padding: 8px 14px;
              border-radius: 6px;
            }

            .book-link:hover {
              background: #dbeafe;
            }

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
          `}</style>

        </section>

        <Footer />
      </div>
    </>
  );
}
