"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import Head from "next/head";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Economics214() {

  const chapters = [
    { name: "What is Economics", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-1.pdf" },
    { name: "Human Wants", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-2.pdf" },
    { name: "Goods and Services", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-3.pdf" },
    { name: "Economy - Its Meaning and Types", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-4.pdf" },
    { name: "Central Problems of an Economy", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-5.pdf" },
    { name: "Basic Economic Activities", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-6.pdf" },
    { name: "Production", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-7.pdf" },
    { name: "Cost and Revenue", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-8.pdf" },
    { name: "Demand", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-9.pdf" },
    { name: "Supply", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-10.pdf" },
    { name: "Determination of Price and Quantity", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-11.pdf" },
    { name: "Market", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-12.pdf" },
    { name: "Role of Government in Determination of Price and Quantity System", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-13.pdf" },
    { name: "Money and Its Roles", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-14.pdf" },
    { name: "Banking and Credit", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-15.pdf" },
    { name: "Savings and Insurance", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-16.pdf" },
    { name: "Collection and Presentation of Data", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-17.pdf" },
    { name: "Analysis of Data", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-18.pdf" },
    { name: "An Overview of Indian Economy", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-19.pdf" },
    { name: "Sectoral Aspects of Indian Economy", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-20.pdf" },
    { name: "Challenges before Indian Economy", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-21.pdf" },
    { name: "Indian Economy in Global Context", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-22.pdf" },
    { name: "Environment and Sustainable Development", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-23.pdf" },
    { name: "Consumer Awareness", url: "https://nios.ac.in/media/documents/SecEcoCour/English/Chapter-24.pdf" },
  ];

  return (
    <div>
      <Head>
        <title>NIOS Secondary Course Economics 214</title>
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
                  Economics (214) - Chapters
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
          `}</style>

        </section>
      </div>

      <Footer />
    </div>
  );
}
