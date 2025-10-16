// import React from "react";

// export default function SecondaryCourseMaterial() {
//   return (
//     //    <!-- Hero Section -->
//     <section className="qustion-paper-hero-section tma-hero">
//       <div className="container">
//         <div className="hero-text">
//           <h1 className="qustion-paper-hero-title">
//            <span className="highlight text-left">NIOS Secondary Courses</span> 
//           </h1>
//           {/* <p className="hero-description text-left">
//             Senior Secondary (12th) Tutor Marked Assignment Question papers
//           </p> */}
//         </div>

        
//       </div>
//     </section>
//   );
// }





"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";

export default function SubjectTable() {
  const subjects = [
    { code: 201, name: "Hindi" },
    { code: 202, name: "English" },
    { code: 213, name: "Social Science" },
    { code: 223, name: "Indian Culture and Heritage" },
    { code: 225, name: "Painting" },
    { code: 229, name: "Data Entry Operation" },
    { code: 216, name: "Home Science" },
    { code: 211, name: "Mathematics" },
    { code: 212, name: "Science and Technology" },
    { code: 214, name: "Economics" },
    { code: 215, name: "Business Studies" },
    { code: 222, name: "Psychology" },
    { code: 224, name: "Accountancy" },
  ];

  return (
    <section className="subject-table-section">
      <div className="container">
           <div className="hero-text">
          <h1 className="qustion-paper-hero-title">
           <span className="highlight text-left">NIOS Secondary Courses</span> 
          </h1>
          {/* <p className="hero-description text-left">
            Senior Secondary (12th) Tutor Marked Assignment Question papers
          </p> */}
        </div>
        <div className="table-responsive">
          <table className="table custom-table align-middle mb-0">
            <thead>
              <tr>
                <th scope="col" className="text-center">
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
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <strong>({subj.code})</strong> {subj.name}
                  </td>
                  <td className="text-center">
                    <a href="#" className="pdf-icon">
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
        }

        thead tr {
          background: #f9fafc;
        }

        thead th {
          font-weight: 600;
          font-size: 15px;
          color: #222;
          border-bottom: none;
          padding: 16px 20px;
        }

        tbody td {
          padding: 14px 20px;
          font-size: 15px;
          color: #333;
          border-top: 1px solid #f1f1f1;
        }

        tbody tr:hover {
          background-color: #f7f9ff;
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
            display: block;
            text-align: right;
            border: none;
            padding: 10px 15px;
          }
          tbody tr {
            margin-bottom: 10px;
            display: block;
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





















