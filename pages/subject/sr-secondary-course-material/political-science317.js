"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function PoliticalScience317() {

  const chapters = [
    { name: "Meaning and Scope of Political Science", url: "https://nios.ac.in/media/documents/srsec317newE/317EL1.pdf" },
    { name: "Nation and State", url: "https://nios.ac.in/media/documents/srsec317newE/317EL2.pdf" },
    { name: "Distinction between Society, Nation, State and Government", url: "https://nios.ac.in/media/documents/srsec317newE/317EL3.pdf" },
    { name: "Major Political Theories", url: "https://nios.ac.in/media/documents/srsec317newE/317EL4.pdf" },
    { name: "Preamble and Salient Features of the Constitution of India", url: "https://nios.ac.in/media/documents/srsec317newE/317EL5.pdf" },
    { name: "Fundamental Rights", url: "https://nios.ac.in/media/documents/srsec317newE/317EL6.pdf" },
    { name: "Directive Principles and Fundamental Duties", url: "https://nios.ac.in/media/documents/srsec317newE/317EL7.pdf" },
    { name: "Indian Federal System", url: "https://nios.ac.in/media/documents/srsec317newE/317EL8.pdf" },
    { name: "Emergency Provisions", url: "https://nios.ac.in/media/documents/srsec317newE/317EL9.pdf" },
    { name: "Union Executive", url: "https://nios.ac.in/media/documents/srsec317newE/317EL10.pdf" },
    { name: "Parliament of India", url: "https://nios.ac.in/media/documents/srsec317newE/317EL11.pdf" },
    { name: "Supreme Court of India", url: "https://nios.ac.in/media/documents/srsec317newE/317EL12.pdf" },
    { name: "Executive in the States", url: "https://nios.ac.in/media/documents/srsec317newE/317EL13.pdf" },
    { name: "State Legislature", url: "https://nios.ac.in/media/documents/srsec317newE/317EL14.pdf" },
    { name: "High Courts and Subordinate Courts", url: "https://nios.ac.in/media/documents/srsec317newE/317EL15.pdf" },
    { name: "Local Government: Urban and Rural", url: "https://nios.ac.in/media/documents/srsec317newE/317EL16.pdf" },
    { name: "Universal Adult Franchise and Methods of Representation", url: "https://nios.ac.in/media/documents/srsec317newE/317EL17.pdf" },
    { name: "Electoral System in India", url: "https://nios.ac.in/media/documents/srsec317newE/317EL18.pdf" },
    { name: "National Political Parties", url: "https://nios.ac.in/media/documents/srsec317newE/317EL19.pdf" },
    { name: "Regionalism and Regional Parties", url: "https://nios.ac.in/media/documents/srsec317newE/317EL20.pdf" },
    { name: "Public Opinion and Pressure Groups", url: "https://nios.ac.in/media/documents/srsec317newE/317EL21.pdf" },
    { name: "Communalism, Caste and Reservations", url: "https://nios.ac.in/media/documents/srsec317newE/317EL22.pdf" },
    { name: "Environmental Awareness", url: "https://nios.ac.in/media/documents/srsec317newE/317EL23.pdf" },
    { name: "Good Governance", url: "https://nios.ac.in/media/documents/srsec317newE/317EL24.pdf" },
    { name: "Human Rights", url: "https://nios.ac.in/media/documents/srsec317newE/317EL25.pdf" },
    { name: "India's Foreign Policy", url: "https://nios.ac.in/media/documents/srsec317newE/317EL26.pdf" },
    { name: "India's Relations with USA and Russia", url: "https://nios.ac.in/media/documents/srsec317newE/317EL27.pdf" },
    { name: "India and its Neighbours", url: "https://nios.ac.in/media/documents/srsec317newE/317EL28.pdf" },
    { name: "Contemporary World Order", url: "https://nios.ac.in/media/documents/srsec317newE/317EL29.pdf" },
    { name: "The United Nations", url: "https://nios.ac.in/media/documents/srsec317newE/317EL30.pdf" },
    { name: "United Nations Peace Activities", url: "https://nios.ac.in/media/documents/srsec317newE/317EL31.pdf" },
    { name: "United Nations and Economic & Social Development", url: "https://nios.ac.in/media/documents/srsec317newE/317EL32.pdf" },
    { name: "Public Service Commission", url: "https://nios.ac.in/media/documents/srsec317newE/317EL33.pdf" },
    { name: "Administrative Machinery at Centre, States and District", url: "https://nios.ac.in/media/documents/srsec317newE/317EL34.pdf" },
    { name: "Political Executive and Bureaucracy", url: "https://nios.ac.in/media/documents/srsec317newE/317EL35.pdf" },
    { name: "Public Grievances and Redressal Machinery", url: "https://nios.ac.in/media/documents/srsec317newE/317EL36.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Political Science 317</title>
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
                  Political Science (317) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            <div className="table-responsive">
              <table className="table table-striped custom-table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Chapter Name</th>
                    <th>PDF</th>
                  </tr>
                </thead>

                <tbody>
                  {chapters.map((chapter, index) => (
                    <tr key={index} className={index % 2 === 0 ? "even-row" : ""}>
                      <td>{index + 1}</td>
                      <td><strong>{chapter.name}</strong></td>
                      <td>
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
          `}</style>

        </section>

        <Footer />
      </div>
    </>
  );
}
