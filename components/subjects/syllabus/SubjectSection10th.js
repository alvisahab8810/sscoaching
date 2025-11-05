import React from "react";

const rows = [
  { code: "201", subject: "Hindi", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { code: "202", subject: "English", tp: ["Theory", "Practical"], papers: "1", marks: "85/15", duration: "3/2.5" },
  { code: "206", subject: "Urdu", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { code: "209", subject: "Sanskrit", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { code: "203", subject: "Bengali", tp: ["Practical"], papers: "1", marks: "100", duration: "2.5" },
  { code: "204", subject: "Marathi", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { code: "205", subject: "Telugu", tp: ["Theory", "Practical"], papers: "1", marks: "100/85", duration: "3/2.5" },
  { code: "207", subject: "Gujarati", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { code: "208", subject: "Kannada", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { code: "210", subject: "Punjabi", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { code: "228", subject: "Assamese", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { code: "231", subject: "Nepali", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
];

export default function SubjectScheme10th() {
  return (
    <div className="scheme-wrap">
      <div className="container">
        <header className="scheme-header">
          <h1 className="nios-125h-senior-hero-title">
            Nios Admission{" "}
            <span className="nios-125h-senior-highlight">
              Class 10Th Subject list
            </span>
          </h1>
          <p className="nios-125h-senior-hero-subtitle">
            Scheme of Studies for Academic courses
          </p>
        </header>

        <div className="table-card">
          <table
            className="scheme-table"
            role="table"
            aria-label="Scheme of Studies"
          >
            <thead>
              <tr>
                <th className="scheme-cell th-left">SECONDARY LEVEL (X)</th>
                <th className="scheme-cell">Theory/Practical</th>
                <th className="scheme-cell">No. of papers</th>
                <th className="scheme-cell">Maxi. Marks</th>
                <th className="scheme-cell">Durations (hrs.)</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, idx) => (
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

                  <td className="scheme-cell center">{r.papers}</td>
                  <td className="scheme-cell center">{r.marks}</td>
                  <td className="scheme-cell center">{r.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
