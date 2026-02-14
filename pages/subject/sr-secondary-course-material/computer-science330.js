"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function ComputerScience330() {

  const chapters = [
    { name: "Lesson 1. Computer Fundamentals", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_01.pdf" },
    { name: "Lesson 2. Binary Logic", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_02.pdf" },
    { name: "Lesson 3. Computer Software", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_03.pdf" },
    { name: "Lesson 4. Operating Systems", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_04.pdf" },
    { name: "Lesson 5. Data Communication and Networking", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_05.pdf" },
    { name: "Lesson 6. Communications on Internet", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_06.pdf" },
    { name: "Lesson 7. Emailing", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_07.pdf" },
    { name: "Lesson 8. Digital Documentation", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_08.pdf" },
    { name: "Lesson 9. Spreadsheets", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_09.pdf" },
    { name: "Lesson 10. Digital Presentation", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_10.pdf" },
    { name: "Lesson 11. Open Source Resources", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_11.pdf" },
    { name: "Lesson 12. Introduction to C++", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_12.pdf" },
    { name: "Lesson 13. Basic Concepts of OOP", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_13.pdf" },
    { name: "Lesson 14. Control Statements", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_14.pdf" },
    { name: "Lesson 15. Functions", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_15.pdf" },
    { name: "Lesson 16. Array", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_16.pdf" },
    { name: "Lesson 17. Structure, Type Def & Enumerated Data Type", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_17.pdf" },
    { name: "Lesson 18. Classes and Objects with Constructors / Destructors", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_18.pdf" },
    { name: "Lesson 19. Inheritance Extending Classes", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_19.pdf" },
    { name: "Lesson 20. Pointer", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_20.pdf" },
    { name: "Lesson 21. Files", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_21.pdf" },
    { name: "Lesson 22. Fundamentals of Data Structure & Web Designing", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_22.pdf" },
    { name: "Lesson 23. Database Management Systems", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_23.pdf" },
    { name: "Lesson 24. Web Designing using HTML", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_24.pdf" },
    { name: "Lesson 25. Inserting Images and Lists in a Web Page", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_25.pdf" },
    { name: "Lesson 26. New Trends in Computing", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_26.pdf" },
    { name: "Lesson 27. Project Management Skills", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_27.pdf" },
    { name: "Lesson 28. Entrepreneurship Skills", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_28.pdf" },
    { name: "Lesson 29. Professional Communication Skills", url: "https://nios.ac.in/media/documents/330srsec/online_course_material_330/Theory/Lesson_29.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Computer Science 330</title>
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
                  Computer Science (330) – Sr Secondary Chapters
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
              text-align: center;
            }

            tbody td:nth-child(2) {
              text-align: left;
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
