"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Sanskrit309() {

  const chapters = [
    { name: "जीवन संदेशः", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson1.pdf" },
    { name: "यदि जानासि तद् वद", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson2.pdf" },
    { name: "आरोग्यं परमं सुखम्", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson3.pdf" },
    { name: "वाचां मण्डनं सत्यम्", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson4.pdf" },
    { name: "अतिलोभः न कर्त्तव्यः", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson5.pdf" },
    { name: "राजते खलु कन्याकुमारी", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson6.pdf" },
    { name: "एतद् उपास्यम्", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson7.pdf" },
    { name: "परार्थे आत्मोत्सर्गः", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson8.pdf" },
    { name: "काले फलति सौभाग्यम्", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson9.pdf" },
    { name: "पतन्ति परपीडकाः", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson10.pdf" },
    { name: "अनुच्छेदलेखनम्", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson11.pdf" },
    { name: "संवादलेखनम्", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson12.pdf" },
    { name: "वर्षर्तुवर्णनम्", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson13.pdf" },
    { name: "अमृतस्य पन्थाः", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson14.pdf" },
    { name: "हिमालयो नाम नगाधिराजः", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson15.pdf" },
    { name: "मानो हि महतां धनम्", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson16.pdf" },
    { name: "कल्पनाकीर्तिः विजयते", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson17.pdf" },
    { name: "पर्यावरणस्य संरक्षणम्", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson18.pdf" },
    { name: "क्रोधोऽनर्थकारकः", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson19.pdf" },
    { name: "अनन्तःज्ञानसागरः", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson20.pdf" },
    { name: "शल्यचिकित्साजनकः सुश्रुतः", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson21.pdf" },
    { name: "कष्टं न्यासस्य रक्षणम्", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson22.pdf" },
    { name: "हृदय परिवर्तनम्", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson23.pdf" },
    { name: "पत्रं लिखामः", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson24.pdf" },
    { name: "परियोजना-निर्माणम्", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson25.pdf" },
    { name: "समसामयिकं संस्कृतसाहित्यम्", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson26A.pdf" },
    { name: "भारतीयज्ञानविज्ञानपरम्परा", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson27A.pdf" },
    { name: "संस्कृतम् अन्याः भारतीयाः भाषाः च", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson28A.pdf" },
    { name: "भारतीयसंस्कृतौ संस्काराः", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson29A.pdf" },
    { name: "संस्कृतस्य प्रयोजनमूलकता", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson26B.pdf" },
    { name: "जनसचारमाध्यमः", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson27B.pdf" },
    { name: "संस्कृतपत्रकारिता", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson28B.pdf" },
    { name: "पत्रिकाप्रारूपम्", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson29B.pdf" },
    { name: "मुद्रणत्रुटिशोधनम्", url: "https://nios.ac.in/media/documents/309sanskrit_new/309_Sanskrit/309_Sanskrit_Lesson30B.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Sanskrit 309</title>
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
                  Sanskrit (309) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Book Download Links */}
            <div className="mb-4">
              <p>
                📘 <a href="https://nios.ac.in/media/documents/309sanskrit_new/book_309_1.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 1
                </a>
              </p>

              <p>
                📘 <a href="https://nios.ac.in/media/documents/309sanskrit_new/book_309_2.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
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
