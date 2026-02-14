"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Painting332() {

  const chapters = [

    // THEORY (Book 1)
    { name: "Prehistoric Painting of India", url: "https://nios.ac.in/media/documents/332-New/Book-1/lesson-01.pdf" },
    { name: "Painting of Indus Valley Civilization", url: "https://nios.ac.in/media/documents/332-New/Book-1/lesson-02.pdf" },
    { name: "Ajanta and Post Ajanta Painting", url: "https://nios.ac.in/media/documents/332-New/Book-1/lesson-03.pdf" },
    { name: "Sculpture of Indus Valley Civilization", url: "https://nios.ac.in/media/documents/332-New/Book-1/lesson-04.pdf" },
    { name: "Mauryan and Post Mauryan Art", url: "https://nios.ac.in/media/documents/332-New/Book-1/lesson-05.pdf" },
    { name: "Medieval Period Painting", url: "https://nios.ac.in/media/documents/332-New/Book-1/lesson-06.pdf" },
    { name: "Mughal Painting", url: "https://nios.ac.in/media/documents/332-New/Book-1/lesson-07.pdf" },
    { name: "Pahari Painting", url: "https://nios.ac.in/media/documents/332-New/Book-1/lesson-08.pdf" },
    { name: "South Indian Painting", url: "https://nios.ac.in/media/documents/332-New/Book-1/lesson-09.pdf" },
    { name: "Company School of Painting", url: "https://nios.ac.in/media/documents/332-New/Book-1/lesson-10.pdf" },
    { name: "Contemporary Art and Artist", url: "https://nios.ac.in/media/documents/332-New/Book-1/lesson-11.pdf" },
    { name: "Fresco and Tempera in Indian Art", url: "https://nios.ac.in/media/documents/332-New/Book-1/lesson-12.pdf" },
    { name: "Drawing and Painting with Dry Medium", url: "https://nios.ac.in/media/documents/332-New/Book-1/lesson-13.pdf" },
    { name: "Mural and Printing", url: "https://nios.ac.in/media/documents/332-New/Book-1/lesson-14.pdf" },
    { name: "Folk and Tribal Art", url: "https://nios.ac.in/media/documents/332-New/Book-1/lesson-15.pdf" },

   // PRACTICAL (Book 2)
{ name: "Practical-1: Nature Study with Pencil and Colour", url: "https://nios.ac.in/media/documents/332-New/Book-2/Practical_Lesson-01.pdf" },
{ name: "Practical-2: Still Life with Shading", url: "https://nios.ac.in/media/documents/332-New/Book-2/Practical_Lesson-02.pdf" },
{ name: "Practical-3: Portraiture", url: "https://nios.ac.in/media/documents/332-New/Book-2/Practical_Lesson-03.pdf" },
{ name: "Practical-4: Creating Forms of Composition", url: "https://nios.ac.in/media/documents/332-New/Book-2/Practical_Lesson-04.pdf" },
{ name: "Practical-5: Poster Making", url: "https://nios.ac.in/media/documents/332-New/Book-2/Practical_Lesson-05.pdf" },
{ name: "Practical-6: Creating Texture and Printing", url: "https://nios.ac.in/media/documents/332-New/Book-2/Practical_Lesson-06.pdf" },
{ name: "Practical-7: Collage Making", url: "https://nios.ac.in/media/documents/332-New/Book-2/Practical_Lesson-07.pdf" },
{ name: "Practical-8: Applied Art Graphic Design", url: "https://nios.ac.in/media/documents/332-New/Book-2/Practical_Lesson-08.pdf" },
{ name: "Practical-9: Creative Design with Tribal and Folk Art", url: "https://nios.ac.in/media/documents/332-New/Book-2/Practical_Lesson-09.pdf" },


    // GUIDE BOOK (Book 3)
    { name: "Guide-1: Nature Study with Pencil and Colour", url: "https://nios.ac.in/media/documents/332-New/Book-3/lesson-01.pdf" },
    { name: "Guide-2: Still Life with Shading", url: "https://nios.ac.in/media/documents/332-New/Book-3/lesson-02.pdf" },
    { name: "Guide-3: Portraiture", url: "https://nios.ac.in/media/documents/332-New/Book-3/lesson-03.pdf" },
    { name: "Guide-4: Creative Forms of Composition", url: "https://nios.ac.in/media/documents/332-New/Book-3/lesson-04.pdf" },
    { name: "Guide-5: Poster Making", url: "https://nios.ac.in/media/documents/332-New/Book-3/lesson-05.pdf" },
    { name: "Guide-6: Creating Texture and Printing", url: "https://nios.ac.in/media/documents/332-New/Book-3/lesson-06.pdf" },
    { name: "Guide-7: Collage Making", url: "https://nios.ac.in/media/documents/332-New/Book-3/lesson-07.pdf" },
    { name: "Guide-8: Graphic Design Manual and Digital", url: "https://nios.ac.in/media/documents/332-New/Book-3/lesson-08.pdf" },
    { name: "Guide-9: Creative Design with Tribal and Folk Art", url: "https://nios.ac.in/media/documents/332-New/Book-3/lesson-09.pdf" },

  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Painting 332</title>
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
                  Painting (332) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Book Section */}
            <div className="mb-4">
              <p>
                📘 <a href="https://nios.ac.in/media/documents/332-New/Book-1/332_Painting_Theory_New.pdf"
                  target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 1 (Theory)
                </a>
              </p>

              <p>
                📘 <a href="https://nios.ac.in/media/documents/332-New/Book-2/332_Painting_Practical_New.pdf"
                  target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 2 (Practical)
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
                      <td className="text-center"><strong>{chapter.name}</strong></td>
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
