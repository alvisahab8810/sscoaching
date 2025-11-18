"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";

export default function SubjectTable() {
 const subjects = [
    { code: 201, name: "Hindi", url: "https://sscoaching.in/hindi-201_3357.html" },
    { code: 202, name: "English", url: "https://sscoaching.in/ENGLISH-202_3309.html" },
    { code: 213, name: "Social Science", url: "https://sscoaching.in/social-science_3314.html" },
    { code: 223, name: "Indian Culture and Heritage", url: "https://sscoaching.in/Indian-Culture-and-Heritage(223)_3312.html" },
    { code: 225, name: "Painting", url: "https://sscoaching.in/Painting-(225)_3315.html" },
    { code: 229, name: "Data Entry Operation", url: "https://sscoaching.in/Data-Entry-Operations-(229)_3316.html" },
    { code: 216, name: "Home Science", url: "https://sscoaching.in/Home-Science-(216)_3323.html" },
    { code: 211, name: "Mathematics", url: "https://sscoaching.in/Mathematics-(211)_3326.html" },
    { code: 212, name: "Science and Technology", url: "https://sscoaching.in/Science-and-Technology-(212)_3328.html" },
    { code: 214, name: "Economics", url: "https://sscoaching.in/Economics-(214)_3329.html" },
    { code: 215, name: "Business Studies", url: "https://sscoaching.in/Business-Studies-(215)_3330.html" },
    { code: 222, name: "Psychology", url: "https://sscoaching.in/Psychology-(222)_3331.html" },
    { code: 224, name: "Accountancy", url: "https://sscoaching.in/Accountancy-(224)_3319.html" },
  ];

  return (
    <section className="subject-table-section ">
      <div className="container">
        <div className="hero-text ">
          <h1 className="qustion-paper-hero-title">
            <span className="highlight text-left">NIOS Secondary Courses</span>
          </h1>
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
                    <a
                      href={subj.url}
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
        
          tbody td {
            // display: block;
            text-align: right;
            border: none;
            padding: 10px 15px;
          }
          tbody tr {
            margin-bottom: 10px;
            // display: block;
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
