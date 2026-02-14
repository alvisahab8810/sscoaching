"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function English302() {

  const chapters = [
    { name: "The Crow and the Deer", url: "https://nios.ac.in/media/documents/302-New/Book-1/Ch-1.pdf" },
    { name: "Mary Kom's Interview", url: "https://nios.ac.in/media/documents/302-New/Book-1/Ch-2.pdf" },
    { name: "An Astrologer's Day", url: "https://nios.ac.in/media/documents/302-New/Book-1/Ch-3.pdf" },
    { name: "Bholi", url: "https://nios.ac.in/media/documents/302-New/Book-1/Ch-4.pdf" },
    { name: "Ecology and Environment", url: "https://nios.ac.in/media/documents/302-New/Book-1/Ch-5.pdf" },
    { name: "Andha Yug", url: "https://nios.ac.in/media/documents/302-New/Book-1/Ch-6.pdf" },
    { name: "After Twenty Years", url: "https://nios.ac.in/media/documents/302-New/Book-1/Ch-7.pdf" },
    { name: "The Necklace", url: "https://nios.ac.in/media/documents/302-New/Book-1/Ch-8.pdf" },
    { name: "Three Questions", url: "https://nios.ac.in/media/documents/302-New/Book-1/Ch-9.pdf" },
    { name: "Of Studies", url: "https://nios.ac.in/media/documents/302-New/Book-1/Ch-10.pdf" },
    { name: "Night of the Scorpion", url: "https://nios.ac.in/media/documents/302-New/Book-1/Ch-11.pdf" },
    { name: "Where the Mind is without Fear", url: "https://nios.ac.in/media/documents/302-New/Book-1/Ch-12.pdf" },
    { name: "If", url: "https://nios.ac.in/media/documents/302-New/Book-1/Ch-13.pdf" },
    { name: "The Bazaars of Hyderabad", url: "https://nios.ac.in/media/documents/302-New/Book-1/Ch-14.pdf" },
    { name: "Reading with Understanding (Thimakka & Biomedical Waste)", url: "https://nios.ac.in/media/documents/302-New/Book-2/Ch-15.pdf" },
    { name: "Reading with Understanding (Stress before Examination)", url: "https://nios.ac.in/media/documents/302-New/Book-2/Ch-16.pdf" },
    { name: "Kabir and Thirvalluvar", url: "https://nios.ac.in/media/documents/302-New/Book-2/Ch-17.pdf" },
    { name: "Reading with Understanding (Nation Builders of India)", url: "https://nios.ac.in/media/documents/302-New/Book-2/Ch-18.pdf" },
    { name: "Reading with Understanding (International Fight Against Drug Abuse)", url: "https://nios.ac.in/media/documents/302-New/Book-2/Ch-19.pdf" },
    { name: "Reading with Understanding (Losar and Bihu)", url: "https://nios.ac.in/media/documents/302-New/Book-2/Ch-20.pdf" },
    { name: "Kalidas", url: "https://nios.ac.in/media/documents/302-New/Book-2/Ch-21.pdf" },
    { name: "Face-to-Face Communication", url: "https://nios.ac.in/media/documents/302-New/Book-2/Ch-22.pdf" },
    { name: "Writing Letters", url: "https://nios.ac.in/media/documents/302-New/Book-2/Ch-23.pdf" },
    { name: "Writing Emails", url: "https://nios.ac.in/media/documents/302-New/Book-2/Ch-24.pdf" },
    { name: "Writing Reports", url: "https://nios.ac.in/media/documents/302-New/Book-2/Ch-25.pdf" },
    { name: "Writing Job Applications", url: "https://nios.ac.in/media/documents/302-New/Book-2/Ch-26.pdf" },
    
    { name: "Appearing for an Interview", url: "https://nios.ac.in/media/documents/302-New/Book-2/Ch-27.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course English 302</title>
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
                  English (302) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Book Links */}
            <div className="mb-4">
              <p>
                📘 <a href="https://nios.ac.in/media/documents/302-New/Book-1/Book-1.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
                  Download Book 1
                </a>
              </p>

              <p>
                📘 <a href="https://nios.ac.in/media/documents/302-New/Book-2/Book-2.pdf" target="_blank" rel="noopener noreferrer" className="book-link">
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
