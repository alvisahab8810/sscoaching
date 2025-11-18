"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";

export default function SrSecondaryCourseMaterial() {
  const subjects = [
  { code: 301, name: "Hindi", url: "https://sscoaching.in/Hindi(301)_3321.html" },
  { code: 302, name: "English", url: "https://sscoaching.in/English(302)_3317.html" },
  { code: 309, name: "Sanskrit", url: "https://sscoaching.in/Sanskrit(309)_3322.html" },
  { code: 311, name: "Mathematics", url: "https://sscoaching.in/Mathematics-311_3352.html" },
  { code: 312, name: "Physics", url: "https://sscoaching.in/Physics(312)_3318.html" },
  { code: 313, name: "Chemistry", url: "https://sscoaching.in/Chemistry(313)_3320.html" },
  { code: 314, name: "Biology", url: "https://sscoaching.in/Biology(314)_3324.html" },
  { code: 315, name: "History", url: "https://sscoaching.in/History(315)_3325.html" },
  { code: 316, name: "Geography", url: "https://sscoaching.in/Geography(316)_3327.html" },
  { code: 317, name: "Political Science", url: "https://sscoaching.in/Poltical-Science(317)_3332.html" },
  { code: 318, name: "Economics", url: "https://sscoaching.in/Economics-318_3354.html" },
  { code: 319, name: "Business Studies", url: "https://sscoaching.in/Business-Studies(319)_3333.html" },
  { code: 320, name: "Accountancy", url: "https://sscoaching.in/Acoountacy(320)_3334.html" },
  { code: 321, name: "Home Science", url: "https://sscoaching.in/Home-Science(321)_3335.html" },
  { code: 328, name: "Psychology", url: "https://sscoaching.in/Psychology(328)_3338.html" },
  { code: 330, name: "Computer Science", url: "https://sscoaching.in/Computer-Science(330)_3339.html" },
  { code: 331, name: "Sociology", url: "https://sscoaching.in/Sociology(331)_3340.html" },
  { code: 332, name: "Painting", url: "https://sscoaching.in/Painting(332)_3341.html" },
  { code: 333, name: "Environmental Science", url: "https://sscoaching.in/Enviornmental-Science-(333)_3342.html" },
  { code: 335, name: "Mass Communication", url: "https://sscoaching.in/Mass-Communications(335)_3343.html" },
  { code: 336, name: "Data Entry Operations", url: "https://sscoaching.in/Data-Entry-Operations(336)_3345.html" },
  { code: 337, name: "Tourism", url: "https://sscoaching.in/Tourism(337)_3346.htmlx " },
  { code: 338, name: "Introduction To Law", url: "https://sscoaching.in/intoduction-To-law-(338)_3347.html" },
  { code: 373, name: "Physical Education And Yog", url: "http://sscoaching.in/Physical-Education-And-Yog-(373)_3348.html" },
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
