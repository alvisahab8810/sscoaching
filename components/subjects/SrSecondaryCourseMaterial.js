"use client";
import React from "react";
import { FaFilePdf } from "react-icons/fa";

export default function SrSecondaryCourseMaterial() {
  const subjects = [


    
  { code: 301, name: "Hindi Book-1", url: "https://nios.ac.in/media/documents/301-New/Book-1/301-Book-1.pdf" },
  { code: 301, name: "Hindi Book-2", url: "https://nios.ac.in/media/documents/301-New/Book-2/301-Book-2.pdf" },

  { code: 302, name: "English Book-1", url: "https://nios.ac.in/media/documents/302-New/Book-1/Book-1.pdf" },
  { code: 302, name: "English Book-2", url: "https://nios.ac.in/media/documents/302-New/Book-2/Book-2.pdf" },


  { code: 309, name: "Sanskrit Book-1", url: "https://nios.ac.in/media/documents/309sanskrit_new/book_309_1.pdf" },
  { code: 309, name: "Sanskrit Book-2", url: "https://nios.ac.in/media/documents/309sanskrit_new/book_309_2.pdf" },


  { code: 311, name: "Mathematics Book-1", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_E_book1.pdf" },
  { code: 311, name: "Mathematics Book-2", url: "https://nios.ac.in/media/documents/SrSec311NEW/311_E_book2.pdf" },


  { code: 312, name: "Physics Book-1", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_E_book1.pdf" },
  { code: 312, name: "Physics Book-2", url: "https://nios.ac.in/media/documents/SrSec312NEW/312_E_book2.pdf" },


  { code: 313, name: "Chemistry Book-1", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_E_book1.pdf" },
  { code: 313, name: "Chemistry Book-2", url: "https://nios.ac.in/media/documents/SrSec313NEW/313_E_book2.pdf" },


  { code: 314, name: "Biology Book-1", url: "https://nios.ac.in/media/documents/SrSec314NewE/314_Book-1_Eng.pdf" },
  { code: 314, name: "Biology Book-2  ", url: "https://nios.ac.in/media/documents/SrSec314NewE/314_Book-2_Eng.pdf" },

  { code: 315, name: "History Book-1", url: "https://nios.ac.in/media/documents/SrSec315NewH/historybook1hindi.pdf" },
  { code: 315, name: "History Book-2", url: "https://nios.ac.in/media/documents/SrSec315NewH/History16_21.pdf" },
  { code: 315, name: "History Book-3", url: "https://nios.ac.in/media/documents/SrSec315NewH/historybook3hindi.pdf" },


  { code: 316, name: "Geography Book-1", url: "https://nios.ac.in/media/documents/316-New/Book-1/Geography-316-Book-1.pdf" },
  { code: 316, name: "Geography Book-2", url: "https://nios.ac.in/media/documents/316-New/Book-2/Geography-316-New-Book-2.pdf" },



  { code: 317, name: "Political Science", url: "https://nios.ac.in/media/documents/DAISYSECENG/srsec/317_Political_Science_Eng_Sr_sec.zip" },

  { code: 318, name: "Economics Book-1", url: "https://nios.ac.in/media/documents/SrSec318NEW/Book1_318.pdf" },
  { code: 318, name: "Economics Book-2", url: "https://nios.ac.in/media/documents/SrSec318NEW/Book2_318.pdf" },



  { code: 319, name: "Business Studies Book-1", url: "https://nios.ac.in/media/documents/319-New/HindiMedium/Book-1.pdf" },
  { code: 319, name: "Business Studies Book-2", url: "https://nios.ac.in/media/documents/319-New/HindiMedium/Book-2.pdf" },



  { code: 320, name: "Accountancy Book-1", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_E_book1.pdf" },
  { code: 320, name: "Accountancy Book-2", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_E_book2.pdf" },
  { code: 320, name: "Accountancy Book-3", url: "https://nios.ac.in/media/documents/SrSec320NEW/320_E_book3.pdf" },




  { code: 321, name: "Home Science", url: "https://nios.ac.in/online-course-material/sr-secondary-courses/Home-Science-(321)/english-medium.aspx" },


  { code: 328, name: "Psychology Book-1", url: "https://nios.ac.in/media/documents/328-New/328_New_Eng_Book-1.pdf" },
  { code: 328, name: "Psychology Book-2", url: "https://nios.ac.in/media/documents/328-New/328_New_Eng_Book-2.pdf" },


  { code: 330, name: "Computer Science", url: "https://nios.ac.in/online-course-material/sr-secondary-courses/Computer-Science-(330).aspx" },



  { code: 331, name: "Sociology", url: "https://nios.ac.in/online-course-material/sr-secondary-courses/Sociology-(331)/english-medium.aspx" },


  { code: 332, name: "Painting Book-1 (Theory)", url: "https://nios.ac.in/media/documents/332-New/Book-1/332_Painting_Theory_New.pdf" },
  { code: 332, name: "Painting Book-2 (Practical)", url: "https://nios.ac.in/media/documents/332-New/Book-2/332_Painting_Practical_New.pdf" },
  { code: 332, name: "Painting Book-3 (Guide Book)", url: "https://nios.ac.in/media/documents/332-New/Book-3/332_Painting_guide-book_New.pdf" },



  { code: 333, name: "Environmental Science", url: "https://nios.ac.in/online-course-material/sr-secondary-courses/Enviornmental-Science-(333)/english-medium.aspx" },
  
  { code: 335, name: "Mass Communication", url: "https://nios.ac.in/media/documents/srsec335new/335EContent.pdf" },

  { code: 336, name: "Data Entry Operations", url: "https://nios.ac.in/media/documents/SrSec336Neweng/srsec336eng.pdf" },

  { code: 337, name: "Tourism Book-1", url: "https://nios.ac.in/media/documents/tourism_337_courseE/Tourism_Book-01.pdf" },
  { code: 337, name: "Tourism Book-2", url: "https://nios.ac.in/media/documents/tourism_337_courseE/Tourism_Book-02.pdf" },
  { code: 337, name: "Tourism Book-3", url: "https://nios.ac.in/media/documents/tourism_337_courseE/Tourism_Book-03.pdf" },
  { code: 337, name: "Tourism Book-4", url: "https://nios.ac.in/media/documents/tourism_337_courseE/Tourism_Book-04.pdf" },



  
  { code: 338, name: "Introduction To Law Book-1", url: "https://nios.ac.in/media/documents/SrSec338new/338_Book1_New.pdf" },
  { code: 338, name: "Introduction To Law Book-2", url: "https://nios.ac.in/media/documents/SrSec338new/338_Book2_New.pdf" },

  { code: 373, name: "Physical Education And Yog", url: "https://nios.ac.in/media/documents/Physical_Education_and_Yog_373/Book-1-373.pdf" },

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
