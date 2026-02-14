"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import Head from "next/head";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Psychology222() {

  const chapters = [
    { name: "An Introduction to Psychology", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-1.pdf" },
    { name: "Methods of Psychology", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-2.pdf" },
    { name: "Individual Differences", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-3.pdf" },
    { name: "Learning", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-4.pdf" },
    { name: "Sensory Processes: Attention and Perception", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-5.pdf" },
    { name: "Memory", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-6.pdf" },
    { name: "Thinking and Problem Solving", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-7.pdf" },
    { name: "Motivation and Emotion", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-8.pdf" },
    { name: "Nature and Determinants of Development", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-9.pdf" },
    { name: "Childhood", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-10.pdf" },
    { name: "Adolescence and Its Challenges", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-11.pdf" },
    { name: "Adulthood and Ageing", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-12.pdf" },
    { name: "Group and Leadership", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-13.pdf" },
    { name: "Communication", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-14.pdf" },
    { name: "Attitudes, Beliefs and Social Cognition", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-15.pdf" },
    { name: "Social and Educational Problem", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-16.pdf" },
    { name: "Happiness and Well-being", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-17.pdf" },
    { name: "Mental Disorders and Their Treatment", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-18.pdf" },
    { name: "Mental Health and Hygiene", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-19.pdf" },
    { name: "Aptitude, Interest and Job Requirements", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-20.pdf" },
    { name: "Preparation for the Vocational Role", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-21.pdf" },
    { name: "The World of Organizations", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-22.pdf" },
    { name: "Environmental Stress", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-23.pdf" },
    { name: "Healthy Mind in Healthy Body", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-24.pdf" },
    { name: "Self Development and Yoga", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-25.pdf" },
    { name: "Nurturing the Whole Being: An Indian Perspective", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-26.pdf" },
    { name: "Controlling and Disciplining the Mind", url: "https://nios.ac.in/media/documents/secpsycour/English/Chapter-27.pdf" },
  ];

  return (
    <div>
      <Head>
        <title>NIOS Secondary Course Psychology 222</title>
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
                  Psychology (222) - Chapters
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
