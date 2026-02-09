"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";

export default function SrSecondaryCourseMaterial() {
  const subjects = [
  { code: 301, name: "Hindi", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/301Bifurcation_new.pdf" },
  { code: 302, name: "English", url: "https://nios.ac.in/media/documents/Course_Bifurcation_2023/12th/302Bifurcation_new.pdf" },
  { code: 309, name: "Sanskrit", url: "https://nios.ac.in/media/documents/Course_Bifurcation_2023/12th/309Bifurcation.pdf" },
  { code: 311, name: "Mathematics", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/311Bifurcation.pdf" },
  { code: 312, name: "Physics", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/312Bifurcation.pdf" },
  { code: 313, name: "Chemistry", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/313Bifurcation.pdf" },
  { code: 314, name: "Biology", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/314Bifurcation.pdf" },
  { code: 315, name: "History", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/315Bifurcation.pdf" },
  { code: 316, name: "Geography", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/316Bifurcation_new.pdf" },
  { code: 317, name: "Political Science", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/317Bifurcation.pdf" },
  { code: 318, name: "Economics", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/318Bifurcation.pdf" },
  { code: 319, name: "Business Studies", url: "https://nios.ac.in/media/documents/Course_Bifurcation_2023/12th/319Bifurcation_new.pdf" },
  { code: 320, name: "Accountancy", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/320Bifurcation.pdf" },
  { code: 321, name: "Home Science", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/321Bifurcation.pdf" },
  { code: 328, name: "Psychology", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/328Bifurcation_new.pdf" },
  { code: 330, name: "Computer Science", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/330Bifurcation.pdf" },
  { code: 331, name: "Sociology", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/331Bifurcation.pdf" },
  { code: 332, name: "Painting", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/332Bifurcation_new.pdf" },
  { code: 333, name: "Environmental Science", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/333Bifurcation.pdf" },
  { code: 335, name: "Mass Communication", url: "https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/335Bifurcation.pdf" },
  { code: 336, name: "Data Entry Operations", url: "https://cdn.nios.ac.in/cms/documents/2020/Jul/02/srsec336eng.pdf" },
  { code: 337, name: "Tourism", url: "http://nios.ac.in/media/documents/Course_Bifurcation_2023/12th/337Bifurcation.pdf" },
  { code: 338, name: "Introduction To Law", url: "http://nios.ac.in/media/documents/Course_Bifurcation_2023/12th/338Bifurcation.pdf" },
  { code: 373, name: "Physical Education And Yog", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-2-373.pdf" },
];


  return (
    <section className="subject-table-section ">
      <div className="container">
        <div className="hero-text ">
          <h4 className="mb-4">
            NIOS Sr Secondary Course Materials for Class 12th
          </h4>
          <h1 className="qustion-paper-hero-title">
            <span className="highlight text-left">Sr. Secondary Courses</span>
          </h1>

          <p className="hero-description text-left">
            {" "}
            Curricuram of Sr. Secondary Course 2025{" "}
          </p>
        </div>

        <div className="table-responsive">
          <table className="table table-striped custom-table align-middle mb-0">
            <thead>
              <tr>
                <th scope="col" className="text-center1">
                  Sr. no.
                </th>
                <th scope="col">TOPIC SUBJECT</th>
                <th scope="col" className="text-center">
                  Theory/Practical
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subj, index) => (
                <tr key={index} className={index % 2 === 0 ? "even-row" : ""}>
                  <td className="text-center1">{index + 1}</td>
                  <td>
                    <strong>({subj.code})</strong> {subj.name}
                  </td>
                  <td className="text-center">
                    <a href={subj.url} target="_blank" rel="noopener noreferrer" className="pdf-icon">
                      <FaFilePdf />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Custom CSS ===== */}
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
          color: #222;
          border-bottom: none;
          padding: 15px 10px;
          font-size: 16px;
          font-weight: 700;
        }

        tbody td {
          padding: 5px 10px;
          font-size: 15px;
          color: #333;
          border-top: 1px solid #f1f1f1;
        }

        /* Alternate row background like in your screenshot */
        .even-row {
          background-color: #f9fafc;
        }

        tbody tr:hover {
          background-color: #f1f5ff;
          transition: background-color 0.2s ease;
        }

        .pdf-icon {
          color: #e63946;
          font-size: 22px;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .pdf-icon:hover {
          transform: scale(1.1);
          color: #c71f1f;
        }

        .table-responsive {
          border-radius: 12px;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          thead {
            display: none;
          }
          tbody td {
            // display: block;
            text-align: right;
            border: none;
            padding: 10px 15px;
          }
          tbody tr {
            margin-bottom: 10px;
            // display: block;x
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          }
          tbody td::before {
            content: attr(data-label);
            float: left;
            font-weight: 600;
            color: #666;
          }
        }
      `}</style>
    </section>
  );
}
