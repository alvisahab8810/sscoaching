"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import Head from "next/head";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function BusinessStudies215() {

  const chapters = [
    { name: "Nature and Scope of Business", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-1.pdf" },
    { name: "Industry and Commerce", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-2.pdf" },
    { name: "Sole Proprietorship, Partnership and Hindu Undivided Family", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-3.pdf" },
    { name: "Cooperative Societies and Joint Stock Companies", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-4.pdf" },
    { name: "Transport Services", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-5.pdf" },
    { name: "Warehousing", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-6.pdf" },
    { name: "Communication Services", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-7.pdf" },
    { name: "Postal and Courier Services", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-8.pdf" },
    { name: "Banking Services", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-9.pdf" },
    { name: "Insurance Services", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-10.pdf" },
    { name: "Outsourcing", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-11.pdf" },
    { name: "Purchase and Sale", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-12.pdf" },
    { name: "Channels of Distribution", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-13.pdf" },
    { name: "Retail Trade", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-14.pdf" },
    { name: "Advertising", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-15.pdf" },
    { name: "Sales Promotion and Personal Selling", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-16.pdf" },
    { name: "Rights and Responsibilities of Consumers", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-17.pdf" },
    { name: "Consumer Protection", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-18.pdf" },
    { name: "Choosing a Career", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-19.pdf" },
    { name: "Entrepreneurship", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-20.pdf" },
    { name: "Project Work", url: "https://nios.ac.in/media/documents/Secbuscour/English/chapter-21.pdf" },
  ];

  return (
    <div>
      <Head>
        <title>NIOS Secondary Course Business Studies 215</title>
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
                  Business Studies (215) - Chapters
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
