"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import Head from "next/head";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Hindi201() {
  const chapters = [
    {
      name: "बहादुर (कहानी)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-1.pdf",
    },
    {
      name: "दोहे (कविता)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-2.pdf",
    },
    {
      name: "गिल्लू (रेखाचित्र)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-3.pdf",
    },
    {
      name: "आहवान (कविता)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-4.pdf",
    },
    {
      name: "राबर्ट नर्सिंग होम मैं (रेपोतार्ज)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-5.pdf",
    },
    {
      name: "भारत की ये बहादुर बेटियाँ (फीचर)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-6.pdf",
    },
    {
      name: "आजादी (कविता)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-7.pdf",
    },
    {
      name: "चन्द्रगहना से लौटती बेर (कविता)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-8.pdf",
    },
    {
      name: "अख़बार की दुनिया (गद्य)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-9.pdf",
    },
    {
      name: "पढ़ें कैसे (गद्य)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-10.pdf",
    },
    {
      name: "सार कैसे लिखें (लेखन)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-11.pdf",
    },
    {
      name: "इसे जगाओ (कविता)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-12.pdf",
    },
    {
      name: "सुखी राजकुमार (कहानी)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-13.pdf",
    },
    {
      name: "बूढ़ी पृथ्वी का दुख (कविता)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-14.pdf",
    },
    {
      name: "अँधेर नगरी (नाटक)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-15.pdf",
    },
    {
      name: "अपना पराया (वैज्ञानिक)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-16.pdf",
    },
    {
      name: "बीती विभावरी जाग री (कविता)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-17.pdf",
    },
    {
      name: "नाखून क्यों बढ़ते हैं (ललित निबंध)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-18.pdf",
    },
    {
      name: "शतरंज के खिलाडी (कहानी)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-19.pdf",
    },
    {
      name: "उनको प्रणाम (कविता)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-20.pdf",
    },
    {
      name: "पत्र कैसे लिखें (लेखन)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-21.pdf",
    },
    {
      name: "निबंध कैसे लिखें (लेखन)",
      url: "https://nios.ac.in/media/documents/sechincour/Chapter-22.pdf",
    },
  ];

  return (
    <div>
      <Head>
        <title>NIOS Secondary Course Hindi 201</title>
        <meta
          name="description"
          content="SS Coaching provides NIOS Secondary (10th Class ) Course Materials with Subject-Wise for students. It helps students study, understand courses, and prepare for exams."
        />
        <meta
          name="keywords"
          content="10th NIOS secondary course open syllabus, Secondary open school NIOS certification high school main subjects, Regular subjects 10th pass board, Mandatory subjects NIOS 10th, Subject list 10th 2025, NIOS subject codes for 10th, NIOS subject choice 10th board NIOS, All NIOS language subjects for 10th, 2025 list of updated subjects, Open school syllabus India, Additional subject to clear exam from NIOS, Detailed overview of different subject NIOS, Codes of NIOS subject in 10th, NIOS admission 2025-2026"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
                  Hindi (201) - Chapters
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
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "even-row" : ""}
                    >
                      <td className="text-center1">{index + 1}</td>
                      <td>
                        <strong>{chapter.name}</strong>
                      </td>
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
          `}</style>
        </section>

        
      </div>
              <Footer />
      
    </div>
  );
}
