import React from "react";

const rows = [
  // Group A - Code Subject Group (A)
  { type: "group", label: "Code Subject Group (A)" },
  { code: "201", subject: "Hindi", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "3" },
  { code: "202", subject: "English", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "3" },
  { code: "206", subject: "Urdu", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "3" },
  { code: "209", subject: "Sanskrit", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "3" },
  { code: "307", subject: "Gujarati", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "3" },
  { code: "303", subject: "Bengali", tp: ["Theory"], dateNote: "Examination of these subjects will be\nheld on same day and same time", papers: "1", marks: "100", duration: "3" },
  { code: "304", subject: "Tamil", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "3" },
  { code: "305", subject: "Odia", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "3" },
  { code: "310", subject: "Punjabi", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "3" },

  // Group B
  { type: "group", label: "Group (B)" },
  { code: "311", subject: "Mathematics", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "3" },
  { code: "321", subject: "Home Science", tp: ["Theory", "Practical"], dateNote: "", papers: "1", marks: "80/20", duration: "3" },
  { code: "328", subject: "Psychology", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "3" },
  { code: "316", subject: "Geography", tp: ["Theory", "Practical"], dateNote: "", papers: "1", marks: "100/20", duration: "3" },
  { code: "318", subject: "Economics", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "3" },
  { code: "319", subject: "Business Studies", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "3" },
  { code: "332", subject: "Painting", tp: ["Theory"], dateNote: "", papers: "1", marks: "30", duration: "1.5" },
  { code: "336", subject: "Data Entry Operations", tp: ["Theory"], dateNote: "", papers: "1", marks: "40", duration: "2" },

  // Group C
  { type: "group", label: "Group (C)" },
  { code: "312", subject: "Physics", tp: ["Theory", "Practical"], dateNote: "Examination of these subjects will be\nheld on same day and same time", papers: "1", marks: "80/20", duration: "3" },
  { code: "315", subject: "History", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "3" },
  { code: "339", subject: "Library and Information Science", tp: ["Theory", "Practical"], dateNote: "", papers: "1", marks: "80/20", duration: "3" },

  // Group D
  { type: "group", label: "Group (D)" },
  { code: "313", subject: "Chemistry", tp: ["Theory", "Practical"], dateNote: "Examination of these subjects will be\nheld on same day and same time", papers: "1", marks: "80/20", duration: "3" },
  { code: "317", subject: "Political Science", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "1.5" },
  { code: "335", subject: "Mass Communication", tp: ["Theory", "Practical"], dateNote: "", papers: "1", marks: "80/20", duration: "2" },

  // Group E
  { type: "group", label: "Group (E)" },
  { code: "314", subject: "Biology", tp: ["Theory", "Practical"], dateNote: "Examination of these subjects will be\nheld on same day and same time", papers: "1", marks: "80/20", duration: "3" },
  { code: "320", subject: "Accountancy", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "3" },
  { code: "338", subject: "Introduction to Law", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "3" },

  // Group F
  { type: "group", label: "Group (F)" },
  { code: "330", subject: "Computer Science", tp: ["Theory", "Practical"], dateNote: "Examination of these subjects will be\nheld on same day and same time", papers: "1", marks: "60/40", duration: "3" },
  { code: "331", subject: "Sociology", tp: ["Theory"], dateNote: "", papers: "1", marks: "100", duration: "1.5" },
  { code: "333", subject: "Environmental Science", tp: ["Theory", "Practical"], dateNote: "", papers: "1", marks: "80/20", duration: "2" },
];

export default function SchemeOfStudies() {
  return (
    <div className="scheme-wrap">
      <div className="container">
         <header className="scheme-header">
        <h1 className="nios-125h-senior-hero-title">
          Nios Admission <span className="nios-125h-senior-highlight">Class 12Th Subject list</span>
        </h1>
        <p className="nios-125h-senior-hero-subtitle">Scheme of Studies for Academic courses</p>
      </header>

      <div className="table-card">
        <h3 className="table-title">Table-1 : Scheme of Studies for Academic Courses</h3>

        <table className="scheme-table" role="table" aria-label="Scheme of Studies">
          <thead>
            <tr>
              <th className="scheme-cell th-left">SENIOR SECONDARY LEVEL (XII)</th>
              <th className="scheme-cell">Theory/Practical</th>
              <th className="scheme-cell">Date</th>
              <th className="scheme-cell">No. of papers</th>
              <th className="scheme-cell">Max. Marks</th>
              <th className="scheme-cell">Durations (hrs.)</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r, idx) =>
              r.type === "group" ? (
                <tr key={idx} className="group-row">
                  <td className="scheme-cell group-cell" colSpan="6">
                    {r.label}
                  </td>
                </tr>
              ) : (
                <tr key={idx} className="data-row">
                  <td className="scheme-cell th-left">
                    <div className="code">{r.code}</div>
                    <div className="subject">{r.subject}</div>
                  </td>

                  <td className="scheme-cell">
                    <div className="tp">
                      {r.tp.map((t, i) => (
                        <span key={i} className={`pill ${t.toLowerCase()}`}>
                            <svg  className="green-svg" width="5" height="5" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="3.5" cy="3.5" r="3.5" fill="#409261" />
                                    </svg>
                                    <svg className="blue-svg" width="5" height="5" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="3.5" cy="3.5" r="3.5" fill="#007BFF"/>
                                            </svg>


                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="scheme-cell center " >
                    {r.dateNote ? <div className="date-note">{r.dateNote}</div> : ""}
                  </td>

                  <td className="scheme-cell center">{r.papers}</td>
                  <td className="scheme-cell center">{r.marks}</td>
                  <td className="scheme-cell center">{r.duration}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
