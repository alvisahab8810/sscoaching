// import React from "react";

// // =========================
// // PART 1 — Scheme of Studies
// // =========================


// const rows = [
//   // ================= Group A =================
//   { type: "group", label: "Group (A) — Languages"  ,  appliesTo: ["Secondary", "Senior"] },

// { level: "Secondary (X)", code: "201", subject: "Hindi", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
// { level: "Secondary (X)", code: "202", subject: "English", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
// { level: "Secondary (X)", code: "206", subject: "Urdu", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
// { level: "Secondary (X)", code: "209", subject: "Sanskrit", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },

// {
//   level: "Secondary (X)",
//   code: "203",
//   subject: "Bengali",
//   tp: ["Theory"],
//   dateNote: "Examination of these subjects will be held on same day and same time",
//   papers: "1",
//   marks: "100",
//   duration: "3",
// },

// { level: "Secondary (X)", code: "204", subject: "Marathi", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
// { level: "Secondary (X)", code: "205", subject: "Telugu", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
// { level: "Secondary (X)", code: "207", subject: "Gujarati", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
// { level: "Secondary (X)", code: "208", subject: "Kannada", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
// { level: "Secondary (X)", code: "210", subject: "Punjabi", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
// { level: "Secondary (X)", code: "228", subject: "Assamese", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
// { level: "Secondary (X)", code: "231", subject: "Nepali", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
// { level: "Secondary (X)", code: "232", subject: "Malayalam", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
// { level: "Secondary (X)", code: "233", subject: "Oriya", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
// { level: "Secondary (X)", code: "235", subject: "Arabic", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
// { level: "Secondary (X)", code: "236", subject: "Persian", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
// { level: "Secondary (X)", code: "237", subject: "Tamil", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },

  

//   // ================= Group B =================

//   { type: "group", label: "Group (B)" , appliesTo: ["Secondary", "Senior"] },

// // Mathematics
// { level: "Secondary (X)", code: "211", subject: "Mathematics", tp: ["Theory"], papers: "1", marks: "85", duration: "3" },
// { level: "Secondary (X)", code: "211P", subject: "Mathematics", tp: ["Practical"], papers: "1", marks: "15", duration: "2½" },

// // Science & Technology
// { level: "Secondary (X)", code: "212", subject: "Science and Technology", tp: ["Theory"], papers: "1", marks: "85", duration: "2½" },
// { level: "Secondary (X)", code: "212P", subject: "Science and Technology", tp: ["Practical"], papers: "1", marks: "15", duration: "3" },

// // Social Science
// { level: "Secondary (X)", code: "213", subject: "Social Science", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },

// // Economics
// { level: "Secondary (X)", code: "214", subject: "Economics", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },

// // Business Studies
// { level: "Secondary (X)", code: "215", subject: "Business Studies", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },

// // Home Science
// { level: "Secondary (X)", code: "216", subject: "Home Science", tp: ["Theory"], papers: "1", marks: "85", duration: "2½" },
// { level: "Secondary (X)", code: "216P", subject: "Home Science", tp: ["Practical"], papers: "1", marks: "15", duration: "3" },

// // Psychology
// { level: "Secondary (X)", code: "222", subject: "Psychology", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },

// // Indian Culture & Heritage
// { level: "Secondary (X)", code: "223", subject: "Indian Culture and Heritage", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },

// // Accountancy
// { level: "Secondary (X)", code: "224", subject: "Accountancy", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },

// // Painting
// { level: "Secondary (X)", code: "225", subject: "Painting", tp: ["Theory"], papers: "1", marks: "30", duration: "1½" },
// { level: "Secondary (X)", code: "225P", subject: "Painting", tp: ["Practical"], papers: "1", marks: "70", duration: "3" },

// // Data Entry Operations
// { level: "Secondary (X)", code: "229", subject: "Data Entry Operations", tp: ["Theory"], papers: "1", marks: "40", duration: "2" },
// { level: "Secondary (X)", code: "229P", subject: "Data Entry Operations", tp: ["Practical"], papers: "1", marks: "60", duration: "2" },


//   // ⚠️ PART 1 ENDS HERE
// // ================= Group C =================
// { type: "group", label: "Group (C)", appliesTo: ["Senior"] },

// // ---------- Secondary (X) ----------
// {
//   level: "Secondary (X)",
//   code: "213",
//   subject: "Social Science",
//   tp: ["Theory"],
//   dateNote: "",
//   papers: "1",
//   marks: "100",
//   duration: "3",
// },
// {
//   level: "Secondary (X)",
//   code: "214",
//   subject: "Economics",
//   tp: ["Theory"],
//   dateNote: "",
//   papers: "1",
//   marks: "100",
//   duration: "3",
// },

// // ---------- Senior Secondary (XII) ----------
// {
//   level: "Senior Secondary (XII)",
//   code: "312",
//   subject: "Physics",
//   tp: ["Theory"],
//   dateNote:
//     "Examination of these subjects will be held on same day and same time",
//   papers: "1",
//   marks: "80",
//   duration: "3",
// },
// {
//   level: "Senior Secondary (XII)",
//   code: "312P",
//   subject: "Physics",
//   tp: ["Practical"],
//   dateNote: "",
//   papers: "1",
//   marks: "20",
//   duration: "3",
// },
// {
//   level: "Senior Secondary (XII)",
//   code: "315",
//   subject: "History",
//   tp: ["Theory"],
//   dateNote: "",
//   papers: "1",
//   marks: "100",
//   duration: "3",
// },
// {
//   level: "Senior Secondary (XII)",
//   code: "339",
//   subject: "Library and Information Science",
//   tp: ["Theory"],
//   dateNote: "",
//   papers: "1",
//   marks: "80",
//   duration: "3",
// },
// {
//   level: "Senior Secondary (XII)",
//   code: "339P",
//   subject: "Library and Information Science",
//   tp: ["Practical"],
//   dateNote: "",
//   papers: "1",
//   marks: "20",
//   duration: "3",
// },

// // ================= Group D =================
// { type: "group", label: "Group (D)", appliesTo: ["Senior"] },

// // ---------- Secondary (X) ----------
// {
//   level: "Secondary (X)",
//   code: "215",
//   subject: "Business Studies",
//   tp: ["Theory"],
//   dateNote: "",
//   papers: "1",
//   marks: "100",
//   duration: "3",
// },
// {
//   level: "Secondary (X)",
//   code: "216",
//   subject: "Home Science",
//   tp: ["Theory"],
//   dateNote: "",
//   papers: "1",
//   marks: "85",
//   duration: "2½",
// },
// {
//   level: "Secondary (X)",
//   code: "216P",
//   subject: "Home Science",
//   tp: ["Practical"],
//   dateNote: "",
//   papers: "1",
//   marks: "15",
//   duration: "3",
// },

// // ---------- Senior Secondary (XII) ----------
// {
//   level: "Senior Secondary (XII)",
//   code: "313",
//   subject: "Chemistry",
//   tp: ["Theory"],
//   dateNote:
//     "Examination of these subjects will be held on same day and same time",
//   papers: "1",
//   marks: "80",
//   duration: "3",
// },
// {
//   level: "Senior Secondary (XII)",
//   code: "313P",
//   subject: "Chemistry",
//   tp: ["Practical"],
//   dateNote: "",
//   papers: "1",
//   marks: "20",
//   duration: "3",
// },
// {
//   level: "Senior Secondary (XII)",
//   code: "317",
//   subject: "Political Science",
//   tp: ["Theory"],
//   dateNote: "",
//   papers: "1",
//   marks: "100",
//   duration: "3",
// },
// {
//   level: "Senior Secondary (XII)",
//   code: "335",
//   subject: "Mass Communication",
//   tp: ["Theory"],
//   dateNote: "",
//   papers: "1",
//   marks: "80",
//   duration: "3",
// },
// {
//   level: "Senior Secondary (XII)",
//   code: "335P",
//   subject: "Mass Communication",
//   tp: ["Practical"],
//   dateNote: "",
//   papers: "1",
//   marks: "20",
//   duration: "3",
// },

// // ================= Group E =================
// { type: "group", label: "Group (E)", appliesTo: ["Senior"] },

// // ---------- Senior Secondary (XII) ----------
// {
//   level: "Senior Secondary (XII)",
//   code: "314",
//   subject: "Biology",
//   tp: ["Theory"],
//   dateNote:
//     "Examination of these subjects will be held on same day and same time",
//   papers: "1",
//   marks: "80",
//   duration: "3",
// },
// {
//   level: "Senior Secondary (XII)",
//   code: "314P",
//   subject: "Biology",
//   tp: ["Practical"],
//   dateNote: "",
//   papers: "1",
//   marks: "20",
//   duration: "3",
// },
// {
//   level: "Senior Secondary (XII)",
//   code: "320",
//   subject: "Accountancy",
//   tp: ["Theory"],
//   dateNote: "",
//   papers: "1",
//   marks: "100",
//   duration: "3",
// },
// {
//   level: "Senior Secondary (XII)",
//   code: "338",
//   subject: "Introduction to Law",
//   tp: ["Theory"],
//   dateNote: "",
//   papers: "1",
//   marks: "100",
//   duration: "3",
// },

// // ================= Group F =================

// { type: "group", label: "Group (F)", appliesTo: ["Senior"] },

// // ---------- Senior Secondary (XII) ----------
// {
//   level: "Senior Secondary (XII)",
//   code: "330",
//   subject: "Computer Science",
//   tp: ["Theory"],
//   dateNote:
//     "Examination of these subjects will be held on same day and same time",
//   papers: "1",
//   marks: "60",
//   duration: "3",
// },
// {
//   level: "Senior Secondary (XII)",
//   code: "330P",
//   subject: "Computer Science",
//   tp: ["Practical"],
//   dateNote: "",
//   papers: "1",
//   marks: "40",
//   duration: "2",
// },
// {
//   level: "Senior Secondary (XII)",
//   code: "331",
//   subject: "Sociology",
//   tp: ["Theory"],
//   dateNote: "",
//   papers: "1",
//   marks: "100",
//   duration: "3",
// },
// {
//   level: "Senior Secondary (XII)",
//   code: "333",
//   subject: "Environmental Science",
//   tp: ["Theory"],
//   dateNote: "",
//   papers: "1",
//   marks: "80",
//   duration: "3",
// },
// {
//   level: "Senior Secondary (XII)",
//   code: "333P",
//   subject: "Environmental Science",
//   tp: ["Practical"],
//   dateNote: "",
//   papers: "1",
//   marks: "20",
//   duration: "3",
// },
// ];



// const secondaryRows = rows.filter(
//   (r) =>
//     (r.type === "group" && r.appliesTo?.includes("Secondary")) ||
//     r.level === "Secondary (X)"
// );

// const seniorSecondaryRows = rows.filter(
//   (r) =>
//     (r.type === "group" && r.appliesTo?.includes("Senior")) ||
//     r.level === "Senior Secondary (XII)"
// );






// export default function SecondaryOrSrSecodary() {
//   return (
//     <div>
//         <h2 className="nios-125h-senior-hero-title">
//           Secondary Course <span className="nios-125h-senior-highlight">(Class X)</span>
//         </h2>

//         <div className="scheme-wrap">
//         <div className="container">
//             <div className="table-card">
//             <table className="scheme-table" role="table">
//                 <thead>
//                 <tr>
//                     <th className="scheme-cell th-left">Code & Subject</th>
//                     <th className="scheme-cell">Theory / Practical</th>
//                     <th className="scheme-cell">Date</th>
//                     <th className="scheme-cell">No. of Papers</th>
//                     <th className="scheme-cell">Max Marks</th>
//                     <th className="scheme-cell">Duration (hrs.)</th>
//                 </tr>
//                 </thead>

//                 <tbody>
//                 {secondaryRows.map((r, idx) =>
//                     r.type === "group" ? (
//                     <tr key={idx} className="group-row">
//                         <td colSpan="6" className="scheme-cell group-cell">
//                         {r.label}
//                         </td>
//                     </tr>
//                     ) : (
//                     <tr key={idx} className="data-row">
//                         <td className="scheme-cell th-left">
//                         <div className="code">{r.code}</div>
//                         <div className="subject">{r.subject}</div>
//                         </td>

//                         <td className="scheme-cell">
//                         <div className="tp">
//                             {r.tp.map((t, i) => (
//                             <span key={i} className={`pill ${t.toLowerCase()}`}>
//                                 <svg width="5" height="5" viewBox="0 0 7 7">
//                                 <circle
//                                     cx="3.5"
//                                     cy="3.5"
//                                     r="3.5"
//                                     fill={t === "Theory" ? "#409261" : "#007BFF"}
//                                 />
//                                 </svg>
//                                 {t}
//                             </span>
//                             ))}
//                         </div>
//                         </td>

//                         <td className="scheme-cell center">
//                         {r.dateNote && <div className="date-note">{r.dateNote}</div>}
//                         </td>

//                         <td className="scheme-cell center">{r.papers}</td>
//                         <td className="scheme-cell center">{r.marks}</td>
//                         <td className="scheme-cell center">{r.duration}</td>
//                     </tr>
//                     )
//                 )}
//                 </tbody>
//             </table>
//             </div>
//         </div>
//         </div>

//         <h2 className="nios-125h-senior-hero-title">
//   Senior Secondary Course <span className="nios-125h-senior-highlight">(Class XII)</span>
// </h2>

// <div className="scheme-wrap">
//   <div className="container">
//     <div className="table-card">
//       <table className="scheme-table" role="table">
//         <thead>
//           <tr>
//             <th className="scheme-cell th-left">Code & Subject</th>
//             <th className="scheme-cell">Theory / Practical</th>
//             <th className="scheme-cell">Date</th>
//             <th className="scheme-cell">No. of Papers</th>
//             <th className="scheme-cell">Max Marks</th>
//             <th className="scheme-cell">Duration (hrs.)</th>
//           </tr>
//         </thead>

//         <tbody>
//           {seniorSecondaryRows.map((r, idx) =>
//             r.type === "group" ? (
//               <tr key={idx} className="group-row">
//                 <td colSpan="6" className="scheme-cell group-cell">
//                   {r.label}
//                 </td>
//               </tr>
//             ) : (
//               <tr key={idx} className="data-row">
//                 <td className="scheme-cell th-left">
//                   <div className="code">{r.code}</div>
//                   <div className="subject">{r.subject}</div>
//                 </td>

//                 <td className="scheme-cell">
//                   <div className="tp">
//                     {r.tp.map((t, i) => (
//                       <span key={i} className={`pill ${t.toLowerCase()}`}>
//                         <svg width="5" height="5" viewBox="0 0 7 7">
//                           <circle
//                             cx="3.5"
//                             cy="3.5"
//                             r="3.5"
//                             fill={t === "Theory" ? "#409261" : "#007BFF"}
//                           />
//                         </svg>
//                         {t}
//                       </span>
//                     ))}
//                   </div>
//                 </td>

//                 <td className="scheme-cell center">
//                   {r.dateNote && <div className="date-note">{r.dateNote}</div>}
//                 </td>

//                 <td className="scheme-cell center">{r.papers}</td>
//                 <td className="scheme-cell center">{r.marks}</td>
//                 <td className="scheme-cell center">{r.duration}</td>
//               </tr>
//             )
//           )}
//         </tbody>
//       </table>
//     </div>
//   </div>
// </div>


//     </div>
//   );
// }




import React from "react";

/* =========================
   DATA (SCREENSHOT-ACCURATE)
========================= */

const rows = [
  /* ================= GROUP A (LANGUAGES) ================= */
  { type: "group", label: "Group (A) – Languages", appliesTo: ["Secondary", "Senior"] },

  // Secondary (X)
  { level: "Secondary", code: "201", subject: "Hindi", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "202", subject: "English", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "206", subject: "Urdu", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "209", subject: "Sanskrit", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },

  {
    level: "Secondary",
    code: "203",
    subject: "Bengali",
    tp: ["Theory"],
    dateNote: "Examination of these subjects will be held on same day and same time",
    papers: "1",
    marks: "100",
    duration: "3",
  },

  { level: "Secondary", code: "204", subject: "Marathi", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "205", subject: "Telugu", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "207", subject: "Gujarati", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "208", subject: "Kannada", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "210", subject: "Punjabi", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "228", subject: "Assamese", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "231", subject: "Nepali", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "232", subject: "Malayalam", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "233", subject: "Oriya", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "235", subject: "Arabic", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "236", subject: "Persian", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "237", subject: "Tamil", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },

  /* ================= GROUP B ================= */
  { type: "group", label: "Group (B)", appliesTo: ["Secondary", "Senior"] },

  { level: "Secondary", code: "211", subject: "Mathematics", tp: ["Theory"], papers: "1", marks: "85", duration: "3" },
  { level: "Secondary", code: "211P", subject: "Mathematics", tp: ["Practical"], papers: "1", marks: "15", duration: "2½" },

  { level: "Secondary", code: "212", subject: "Science and Technology", tp: ["Theory"], papers: "1", marks: "85", duration: "2½" },
  { level: "Secondary", code: "212P", subject: "Science and Technology", tp: ["Practical"], papers: "1", marks: "15", duration: "3" },

  { level: "Secondary", code: "213", subject: "Social Science", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "214", subject: "Economics", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "215", subject: "Business Studies", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },

  { level: "Secondary", code: "216", subject: "Home Science", tp: ["Theory"], papers: "1", marks: "85", duration: "2½" },
  { level: "Secondary", code: "216P", subject: "Home Science", tp: ["Practical"], papers: "1", marks: "15", duration: "3" },

  { level: "Secondary", code: "222", subject: "Psychology", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "223", subject: "Indian Culture and Heritage", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Secondary", code: "224", subject: "Accountancy", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },

  { level: "Secondary", code: "225", subject: "Painting", tp: ["Theory"], papers: "1", marks: "30", duration: "1½" },
  { level: "Secondary", code: "225P", subject: "Painting", tp: ["Practical"], papers: "1", marks: "70", duration: "3" },

  { level: "Secondary", code: "229", subject: "Data Entry Operations", tp: ["Theory"], papers: "1", marks: "40", duration: "2" },
  { level: "Secondary", code: "229P", subject: "Data Entry Operations", tp: ["Practical"], papers: "1", marks: "60", duration: "2" },

  /* ================= GROUP C (SENIOR ONLY) ================= */
  { type: "group", label: "Group (C)", appliesTo: ["Senior"] },

  { level: "Senior", code: "312", subject: "Physics", tp: ["Theory"], dateNote: "Examination of these subjects will be held on same day and same time", papers: "1", marks: "80", duration: "3" },
  { level: "Senior", code: "312P", subject: "Physics", tp: ["Practical"], papers: "1", marks: "20", duration: "3" },
  { level: "Senior", code: "315", subject: "History", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Senior", code: "339", subject: "Library and Information Science", tp: ["Theory"], papers: "1", marks: "80", duration: "3" },
  { level: "Senior", code: "339P", subject: "Library and Information Science", tp: ["Practical"], papers: "1", marks: "20", duration: "3" },

  /* ================= GROUP D ================= */
  { type: "group", label: "Group (D)", appliesTo: ["Senior"] },

  { level: "Senior", code: "313", subject: "Chemistry", tp: ["Theory"], dateNote: "Examination of these subjects will be held on same day and same time", papers: "1", marks: "80", duration: "3" },
  { level: "Senior", code: "313P", subject: "Chemistry", tp: ["Practical"], papers: "1", marks: "20", duration: "3" },
  { level: "Senior", code: "317", subject: "Political Science", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Senior", code: "335", subject: "Mass Communication", tp: ["Theory"], papers: "1", marks: "80", duration: "3" },
  { level: "Senior", code: "335P", subject: "Mass Communication", tp: ["Practical"], papers: "1", marks: "20", duration: "3" },

  /* ================= GROUP E ================= */
  { type: "group", label: "Group (E)", appliesTo: ["Senior"] },

  { level: "Senior", code: "314", subject: "Biology", tp: ["Theory"], dateNote: "Examination of these subjects will be held on same day and same time", papers: "1", marks: "80", duration: "3" },
  { level: "Senior", code: "314P", subject: "Biology", tp: ["Practical"], papers: "1", marks: "20", duration: "3" },
  { level: "Senior", code: "320", subject: "Accountancy", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Senior", code: "338", subject: "Introduction to Law", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },

  /* ================= GROUP F ================= */
  { type: "group", label: "Group (F)", appliesTo: ["Senior"] },

  { level: "Senior", code: "330", subject: "Computer Science", tp: ["Theory"], dateNote: "Examination of these subjects will be held on same day and same time", papers: "1", marks: "60", duration: "3" },
  { level: "Senior", code: "330P", subject: "Computer Science", tp: ["Practical"], papers: "1", marks: "40", duration: "2" },
  { level: "Senior", code: "331", subject: "Sociology", tp: ["Theory"], papers: "1", marks: "100", duration: "3" },
  { level: "Senior", code: "333", subject: "Environmental Science", tp: ["Theory"], papers: "1", marks: "80", duration: "3" },
  { level: "Senior", code: "333P", subject: "Environmental Science", tp: ["Practical"], papers: "1", marks: "20", duration: "3" },
];

/* =========================
   FILTERS
========================= */

const secondaryRows = rows.filter(
  r => (r.type === "group" && r.appliesTo.includes("Secondary")) || r.level === "Secondary"
);

const seniorRows = rows.filter(
  r => (r.type === "group" && r.appliesTo.includes("Senior")) || r.level === "Senior"
);

/* =========================
   COMPONENT
========================= */

export default function SecondaryOrSrSecondary() {
  const renderTable = (data) => (
    <table className="scheme-table">
      <thead>
        <tr>
          <th>Code & Subject</th>
          <th>Theory / Practical</th>
          <th>Date</th>
          <th>No. of Papers</th>
          <th>Max Marks</th>
          <th>Duration (hrs.)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r, i) =>
          r.type === "group" ? (
            <tr key={i} className="group-row">
              <td colSpan="6">{r.label}</td>
            </tr>
          ) : (
            <tr key={i}>
              <td><strong>{r.code}</strong><br />{r.subject}</td>
              <td>{r.tp.join(", ")}</td>
              <td>{r.dateNote || ""}</td>
              <td>{r.papers}</td>
              <td>{r.marks}</td>
              <td>{r.duration}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );

  return (
    <div className="scheme-page">
      <h2>Secondary Course <span>(Class X)</span></h2>
      {renderTable(secondaryRows)}

      <h2>Senior Secondary Course <span>(Class XII)</span></h2>
      {renderTable(seniorRows)}
    </div>
  );
}
