"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import Head from "next/head";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function English202() {
  const chapters = [
    { name: "Snake Bite", url: "https://nios.ac.in/media/documents/Secengcour/book1/L_1.pdf" },
    { name: "How the Squirrel Got Its Stripes", url: "https://nios.ac.in/media/documents/Secengcour/book1/L_2.pdf" },
    { name: "Kondiba – A Hero", url: "https://nios.ac.in/media/documents/Secengcour/book1/L_3.pdf" },
    { name: "Tall Trees", url: "https://nios.ac.in/media/documents/Secengcour/book1/L_4.pdf" },
    { name: "A Tiger Comes to Town – I", url: "https://nios.ac.in/media/documents/Secengcour/book1/L_5.pdf" },
    { name: "A Tiger Comes to Town – II", url: "https://nios.ac.in/media/documents/Secengcour/book1/L_6.pdf" },
    { name: "The Shoeshine", url: "https://nios.ac.in/media/documents/Secengcour/book1/L_7.pdf" },
    { name: "A Birthday Letter", url: "https://nios.ac.in/media/documents/Secengcour/book1/L_8.pdf" },
    { name: "Nine Gold Medals", url: "https://nios.ac.in/media/documents/Secengcour/book1/L_9.pdf" },
    { name: "Noise: How It Affects Our Lives", url: "https://nios.ac.in/media/documents/Secengcour/book1/L_10.pdf" },
    { name: "My Elder Brother", url: "https://nios.ac.in/media/documents/Secengcour/book1/L_11.pdf" },
    { name: "Indian Weavers", url: "https://nios.ac.in/media/documents/Secengcour/book1/L_12.pdf" },
    { name: "The Last Stone Mason", url: "https://nios.ac.in/media/documents/Secengcour/book1/L_13.pdf" },
    { name: "Stealing and Atonement", url: "https://nios.ac.in/media/documents/Secengcour/book1/L_14.pdf" },
    { name: "My Vision for India", url: "https://nios.ac.in/media/documents/Secengcour/book2/L_15.pdf" },
    { name: "My Only Cry", url: "https://nios.ac.in/media/documents/Secengcour/book2/L_16.pdf" },
    { name: "Caring for Others", url: "https://nios.ac.in/media/documents/Secengcour/book2/L_17.pdf" },
    { name: "The Little Girl", url: "https://nios.ac.in/media/documents/Secengcour/book2/L_18.pdf" },
    { name: "A Prayer for Healing", url: "https://nios.ac.in/media/documents/Secengcour/book2/L_19.pdf" },
    { name: "New Good Things from Rubbish", url: "https://nios.ac.in/media/documents/Secengcour/book2/L_20.pdf" },
    { name: "The Village Pharmacy", url: "https://nios.ac.in/media/documents/Secengcour/book2/L_21.pdf" },
    { name: "The Truth", url: "https://nios.ac.in/media/documents/Secengcour/book2/L_22.pdf" },
    { name: "The Return of the Lion (One Act Play)", url: "https://nios.ac.in/media/documents/Secengcour/book2/L_23.pdf" },
    { name: "Co-operate and Prosper", url: "https://nios.ac.in/media/documents/Secengcour/book2/L_24.pdf" },
    { name: "Once Upon a Time", url: "https://nios.ac.in/media/documents/Secengcour/book2/L_25.pdf" },
    { name: "Ustad Bismillah Khan", url: "https://nios.ac.in/media/documents/Secengcour/book2/L_26.pdf" },
    { name: "The Parrot Who Wouldn't Talk", url: "https://nios.ac.in/media/documents/Secengcour/book2/L_27.pdf" },
  ];

  return (
    <div>
      <Head>
        <title>NIOS Secondary Course English 202</title>
        <meta
          name="description"
          content="Download NIOS English (202) Chapter-wise PDF for Secondary Course students."
        />
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
                  English (202) - Chapters
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
            thead th { padding: 15px 10px; font-size: 16px; font-weight: 700; }
            tbody td { padding: 10px; font-size: 15px; border-top: 1px solid #f1f1f1; }
            .even-row { background-color: #f9fafc; }
            tbody tr:hover { background-color: #f1f5ff; transition: 0.2s ease; }
            .pdf-icon { color: #e63946; font-size: 22px; transition: 0.2s ease; }
            .pdf-icon:hover { transform: scale(1.1); color: #c71f1f; }
          `}</style>
        </section>
      </div>

      <Footer />
    </div>
  );
}
