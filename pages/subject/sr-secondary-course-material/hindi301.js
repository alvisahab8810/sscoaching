"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Hindi301() {

  const chapters = [
    { name: "निर्गुण भक्तिकाव्य : कबीर और जायसी", url: "https://nios.ac.in/media/documents/301-New/Book-1/L-1NF.pdf" },
    { name: "सगुण भक्तिकाव्य : तुलसीदास, सूरदास और मीराँबाई", url: "https://nios.ac.in/media/documents/301-New/Book-1/L-2NF.pdf" },
    { name: "रीतिकाव्य : बिहारी और पद्माकर", url: "https://nios.ac.in/media/documents/301-New/Book-1/L-3NF.pdf" },
    { name: "छायावादी काव्य : निराला और प्रसाद", url: "https://nios.ac.in/media/documents/301-New/Book-1/L-4NF.pdf" },
    { name: "उत्तर छायावादी कविता : दिनकर और बच्चन", url: "https://nios.ac.in/media/documents/301-New/Book-1/L-5NF.pdf" },
    { name: "नयी कविता : अज्ञेय और भवानीप्रसाद मिश्र", url: "https://nios.ac.in/media/documents/301-New/Book-1/L-6NF.pdf" },
    { name: "साठोत्तरी कविता : सर्वेश्वरदयाल सक्सेना और दुष्यंत कुमार", url: "https://nios.ac.in/media/documents/301-New/Book-1/L-7NF.pdf" },
    { name: "समकालीन कविता : राजेश जोशी तथा नरेश सक्सेना", url: "https://nios.ac.in/media/documents/301-New/Book-1/L-8NF.pdf" },
    { name: "चीफ़ की दावत : भीष्म साहनी", url: "https://nios.ac.in/media/documents/301-New/Book-1/L-9NF.pdf" },
    { name: "पीढ़ियाँ और गिट्टियाँ : हरिशंकर परसाई", url: "https://nios.ac.in/media/documents/301-New/Book-1/L-10NF.pdf" },
    { name: "दो कलाकार : मन्नू भंडारी", url: "https://nios.ac.in/media/documents/301-New/Book-1/L-11NF.pdf" },
    { name: "जिजीविषा की विजय : कैलाश चंद्र भाटिया", url: "https://nios.ac.in/media/documents/301-New/Book-1/L-12NF.pdf" },
    { name: "सुभद्रा कुमारी चौहान : महादेवी वर्मा", url: "https://nios.ac.in/media/documents/301-New/Book-1/L-13NF.pdf" },
    { name: "कुटज : आचार्य हजारीप्रसाद द्विवेदी", url: "https://nios.ac.in/media/documents/301-New/Book-1/L-14NF.pdf" },
    { name: "ठेस : फणीश्वरनाथ 'रेणु'", url: "https://nios.ac.in/media/documents/301-New/Book-1/L-15NF.pdf" },

    { name: "रीढ़ की हड्डी : जगदीशचन्द्र माथुर", url: "https://nios.ac.in/media/documents/301-New/Book-2/L-16NF.pdf" },
    { name: "अंडमान डायरी : श्रीकांत वर्मा", url: "https://nios.ac.in/media/documents/301-New/Book-2/L-17NF.pdf" },
    { name: "यक्ष-प्रश्न : चक्रवर्ती राजगोपालाचारी", url: "https://nios.ac.in/media/documents/301-New/Book-2/L-18NF.pdf" },
    { name: "लेखन-कौशल : अनुच्छेद लेखन, फीचर तथा रिपोर्टिंग", url: "https://nios.ac.in/media/documents/301-New/Book-2/L-19NF.pdf" },
    { name: "कार्यालयी पत्राचार", url: "https://nios.ac.in/media/documents/301-New/Book-2/L-20NF.pdf" },
    { name: "टिप्पणी और प्रारूपण", url: "https://nios.ac.in/media/documents/301-New/Book-2/L-21NF.pdf" },
    { name: "सभा एवं मंच संचालन और उद्घोषणा", url: "https://nios.ac.in/media/documents/301-New/Book-2/L-22NF.pdf" },
    { name: "हिंदी के विविध प्रयुक्ति-क्षेत्र", url: "https://nios.ac.in/media/documents/301-New/Book-2/L-23NF.pdf" },
    { name: "हिंदी और जनसंचार-माध्यम", url: "https://nios.ac.in/media/documents/301-New/Book-2/L-24NF.pdf" },
    { name: "हिंदी और प्रौद्योगिकी", url: "https://nios.ac.in/media/documents/301-New/Book-2/L-25NF.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Hindi 301</title>
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
                  Hindi (301) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Book Download Links */}
            <div className="mb-4">
              <p>
                📘 <a href="https://nios.ac.in/media/documents/301-New/Book-1/301-Book-1.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 1
                </a>
              </p>

              <p>
                📘 <a href="https://nios.ac.in/media/documents/301-New/Book-2/301-Book-2.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 2
                </a>
              </p>
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
