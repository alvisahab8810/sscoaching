"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import Head from "next/head";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function HomeScience216() {

  const chapters = [
    { name: "What is Home Science", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-1.pdf" },
    { name: "Food and its Nutrients", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-2.pdf" },
    { name: "Food Groups", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-3.pdf" },
    { name: "Methods of Cooking Food", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-4.pdf" },
    { name: "Preservation of Food", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-5.pdf" },
    { name: "Environment", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-6.pdf" },
    { name: "Health", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-7.pdf" },
    { name: "Communicable and Lifestyle Diseases", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-8.pdf" },
    { name: "Care and Maintenance of Fabric", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-9.pdf" },
    { name: "Fibre to Fabric", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-10.pdf" },
    { name: "Fabric Finishes", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-11.pdf" },
    { name: "Housing", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-12.pdf" },
    { name: "Safety in Home", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-13.pdf" },
    { name: "Introduction to Resources", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-14.pdf" },
    { name: "Managing Time and Energy", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-15.pdf" },
    { name: "Managing Income", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-16.pdf" },
    { name: "Life Begins", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-17.pdf" },
    { name: "Concept of Development", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-18.pdf" },
    { name: "My Family and I", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-19.pdf" },
    { name: "Adolescence: Charms and Challenges", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-20.pdf" },
    { name: "Ethics in Daily Life", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-21.pdf" },
    { name: "Consumer! Beware, Be Aware", url: "https://nios.ac.in/media/documents/SecHmscicour/english/Home%20Science%20(Eng)%20Ch-22.pdf" },
  ];

  return (
    <div>
      <Head>
        <title>NIOS Secondary Course Home Science 216</title>
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
                  Home Science (216) - Chapters
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
          `}</style>

        </section>
      </div>

      <Footer />
    </div>
  );
}
