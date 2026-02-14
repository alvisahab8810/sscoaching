"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function EnvironmentalScience333() {

  const chapters = [
    { name: "Origin of Earth and Evolution of the Environment", url: "https://nios.ac.in/media/documents/333courseE/1.pdf" },
    { name: "Environment and Human Society", url: "https://nios.ac.in/media/documents/333courseE/2.pdf" },
    { name: "Degradation of Natural Environment", url: "https://nios.ac.in/media/documents/333courseE/3.pdf" },
    { name: "Principles of Ecology", url: "https://nios.ac.in/media/documents/333courseE/4.pdf" },
    { name: "Ecosystem", url: "https://nios.ac.in/media/documents/333courseE/5.pdf" },
    { name: "Natural Ecosystem", url: "https://nios.ac.in/media/documents/333courseE/6.pdf" },
    { name: "Human Modified Ecosystems", url: "https://nios.ac.in/media/documents/333courseE/7.pdf" },
    { name: "Human Societies", url: "https://nios.ac.in/media/documents/333courseE/8.pdf" },
    { name: "Deforestation", url: "https://nios.ac.in/media/documents/333courseE/9.pdf" },
    { name: "Environmental Pollution", url: "https://nios.ac.in/media/documents/333courseE/10.pdf" },
    { name: "Environment and Health", url: "https://nios.ac.in/media/documents/333courseE/11.pdf" },
    { name: "Disasters and their Management", url: "https://nios.ac.in/media/documents/333courseE/12.pdf" },
    { name: "National Environmental Issues", url: "https://nios.ac.in/media/documents/333courseE/13.pdf" },
    { name: "Global Environmental Issues", url: "https://nios.ac.in/media/documents/333courseE/14.pdf" },
    { name: "Biodiversity Conservation", url: "https://nios.ac.in/media/documents/333courseE/15.pdf" },
    { name: "Conservation of Other Natural Resources", url: "https://nios.ac.in/media/documents/333courseE/16.pdf" },
    { name: "Conservation of Soil and Land", url: "https://nios.ac.in/media/documents/333courseE/17.pdf" },
    { name: "Water and Energy Conservation", url: "https://nios.ac.in/media/documents/333courseE/18.pdf" },
    { name: "Origin and Concept of Sustainable Development", url: "https://nios.ac.in/media/documents/333courseE/19.pdf" },
    { name: "Modern Agriculture", url: "https://nios.ac.in/media/documents/333courseE/20.pdf" },
    { name: "Concept of Sustainable Agriculture", url: "https://nios.ac.in/media/documents/333courseE/21.pdf" },
    { name: "Cleaner Technology", url: "https://nios.ac.in/media/documents/333courseE/22.pdf" },
    { name: "Environmental Legislation", url: "https://nios.ac.in/media/documents/333courseE/23.pdf" },
    { name: "Environmental Impact Assessment", url: "https://nios.ac.in/media/documents/333courseE/24.pdf" },
    { name: "Environmental Related Institutions and Organisations", url: "https://nios.ac.in/media/documents/333courseE/25.pdf" },
    { name: "Environmental Ethics and Gandhian Approach", url: "https://nios.ac.in/media/documents/333courseE/26.pdf" },
    { name: "Global Circulation of Water", url: "https://nios.ac.in/media/documents/333courseE/27.pdf" },
    { name: "Ground Water Resources", url: "https://nios.ac.in/media/documents/333courseE/28.pdf" },
    { name: "Fresh Water Resources", url: "https://nios.ac.in/media/documents/333courseE/29.pdf" },
    { name: "Methods of Water Harvesting", url: "https://nios.ac.in/media/documents/333courseE/30.pdf" },
    { name: "Water Conservation at Different Levels", url: "https://nios.ac.in/media/documents/333courseE/31.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Environmental Science 333</title>
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
                  Environmental Science (333) – Sr Secondary Chapters
                </span>
              </h1>
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
          `}</style>

        </section>

        <Footer />
      </div>
    </>
  );
}
