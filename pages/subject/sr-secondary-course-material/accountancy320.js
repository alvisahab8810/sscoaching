"use client";
import React from "react";
import Head from "next/head";
import { FaFilePdf } from "react-icons/fa";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Footer from "@/components/footer/Footer";

export default function Accountancy320() {

  const chapters = [
    { name: "Accounting - An Introduction", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson1.pdf" },
    { name: "Accounting Concepts", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson2.pdf" },
    { name: "Accounting Conventions and Standards", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson3.pdf" },
    { name: "Accounting for Business Transactions", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson4.pdf" },
    { name: "Journal", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson5.pdf" },
    { name: "Ledger", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson6.pdf" },
    { name: "Cash Book", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson7.pdf" },
    { name: "Special Purpose Books", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson8.pdf" },
    { name: "Trial Balance", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson9.pdf" },
    { name: "Bank Reconciliation Statement", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson10.pdf" },
    { name: "Bills of Exchange", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson11.pdf" },
    { name: "Errors and their Rectification", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson12.pdf" },
    { name: "Computer and Computerised Accounting System", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson13.pdf" },
    { name: "Depreciation", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson14.pdf" },
    { name: "Provision and Reserves", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson15.pdf" },
    { name: "Financial Statements - An Introduction", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson16.pdf" },
    { name: "Financial Statements - I", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson17.pdf" },
    { name: "Financial Statements - II", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson18.pdf" },
    { name: "Not for Profit Organisations - An Introduction", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson19.pdf" },
    { name: "Financial Statements (Not for Profit Organisations)", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson20.pdf" },
    { name: "Accounts From Incomplete Records", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson21.pdf" },
    { name: "Partnership - An Introduction", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson22.pdf" },
    { name: "Admission of a Partner", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson23.pdf" },
    { name: "Retirement and Death of a Partner", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson24.pdf" },
    { name: "Dissolution of a Partnership Firm", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson25.pdf" },
    { name: "Company - An Introduction", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson26.pdf" },
    { name: "Issue of Shares", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson27.pdf" },
    { name: "Forfeiture of Shares", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson28.pdf" },
    { name: "Reissue of Forfeited Shares", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson29.pdf" },
    { name: "Issue of Debentures", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson30.pdf" },
    { name: "Financial Statements Analysis - An Introduction", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson31.pdf" },
    { name: "Accounting Ratios - I", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson32.pdf" },
    { name: "Accounting Ratios - II", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson33.pdf" },
    { name: "Cash Flow Statement", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson34.pdf" },
    { name: "Electronic Spreadsheet", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson35.pdf" },
    { name: "Use of Spreadsheet in Business Application", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson36.pdf" },
    { name: "Graphs and Charts for Business", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson37.pdf" },
    { name: "Database Management System for Accounting", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_Accountancy_Eng/320_Accountancy_Eng_Lesson38.pdf" },
  ];

  return (
    <>
      <Head>
        <title>NIOS Sr Secondary Course Accountancy 320</title>
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
                  Accountancy (320) – Sr Secondary Chapters
                </span>
              </h1>
            </div>

            {/* Book Download Section */}
            <div className="mb-4">
              <p>📘 <a href="https://nios.ac.in/media/documents/SrSec320NEW/320_E_book1.pdf" target="_blank" className="book-link">Download Book 1</a></p>
              <p>📘 <a href="https://nios.ac.in/media/documents/SrSec320NEW/320_E_book2.pdf" target="_blank" className="book-link">Download Book 2</a></p>
              <p>📘 <a href="https://nios.ac.in/media/documents/SrSec320NEW/320_E_book3.pdf" target="_blank" className="book-link">Download Book 3</a></p>
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
                        <a href={chapter.url} target="_blank" className="pdf-icon">
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
              background: #fff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 16px rgba(0,0,0,0.05);
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
              text-align: center;
              border-top: 1px solid #f1f1f1;
            }
            .even-row { background-color: #f9fafc; }
            tbody tr:hover { background-color: #f1f5ff; transition: 0.2s ease; }
            .pdf-icon { color: #e63946; font-size: 22px; transition: 0.2s ease; }
            .pdf-icon:hover { transform: scale(1.1); color: #c71f1f; }
            .book-link { font-weight: 600; color: #2563eb; text-decoration: none; }
            .book-link:hover { text-decoration: underline; }
          `}</style>

        </section>

        <Footer />
      </div>
    </>
  );
}
