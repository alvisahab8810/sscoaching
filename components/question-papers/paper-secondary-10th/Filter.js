// import React, { useState, useMemo } from "react";
// import { ChevronDown } from "lucide-react";

// const QuestionPapers = () => {
//   const [openMenu, setOpenMenu] = useState(null);
//   const [filters, setFilters] = useState({
//     paperType: "All",
//     session: "",
//     subject: "",
//     search: "",
//     sort: "",
//   });

//   const handleToggle = (name) => {
//     setOpenMenu(openMenu === name ? null : name);
//   };

//   const handleSelect = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//     setOpenMenu(null);
//   };

//   const handleSearch = (e) => {
//     setFilters((prev) => ({ ...prev, search: e.target.value }));
//   };

//   const handleSort = (e) => {
//     setFilters((prev) => ({ ...prev, sort: e.target.value }));
//   };

//   const papersData = [
//     {
//       id: 1,
//       title: "Class 10 - 201 Hindi (April 2025)",
//       session: "April 2025",
//       subject: "Hindi",
//       sample: false,
//     },
//     {
//       id: 2,
//       title: "Class 10 - 201 Hindi (Oct 2024)",
//       session: "October 2024",
//       subject: "Hindi",
//       sample: false,
//     },
//     {
//       id: 3,
//       title: "Class 10 - 201 Hindi (April 2024)",
//       session: "April 2024",
//       subject: "Hindi",
//       sample: false,
//     },
//     {
//       id: 4,
//       title: "Class 10 - 201 Hindi Sample paper",
//       session: "2024",
//       subject: "Hindi",
//       sample: true,
//     },
//     {
//       id: 5,
//       title: "Class 10 - 202 English (April 2025)",
//       session: "April 2025",
//       subject: "English",
//       sample: false,
//     },
//     {
//       id: 6,
//       title: "Class 10 - 202 English (Oct 2024)",
//       session: "October 2024",
//       subject: "English",
//       sample: false,
//     },
//     {
//       id: 7,
//       title: "Class 10 - 202 English (April 2024)",
//       session: "April 2024",
//       subject: "English",
//       sample: false,
//     },
//     {
//       id: 8,
//       title: "Class 10 - 202 English Sample paper",
//       session: "2024",
//       subject: "English",
//       sample: true,
//     },
//     {
//       id: 9,
//       title: "Class 10 - 211 Maths (April 2025)",
//       session: "April 2025",
//       subject: "Maths",
//       sample: false,
//     },
//     {
//       id: 10,
//       title: "Class 10 - 211 Maths Sample paper",
//       session: "2024",
//       subject: "Maths",
//       sample: true,
//     },
//     {
//       id: 11,
//       title: "Class 10 - 212 Science (April 2025)",
//       session: "April 2025",
//       subject: "Science",
//       sample: false,
//     },
//     {
//       id: 12,
//       title: "Class 10 - 212 Science Sample paper",
//       session: "2024",
//       subject: "Science",
//       sample: true,
//     },
//   ];

//   const filteredPapers = useMemo(() => {
//     let filtered = [...papersData];

//     if (filters.subject)
//       filtered = filtered.filter(
//         (p) => p.subject.toLowerCase() === filters.subject.toLowerCase()
//       );

//     if (filters.session)
//       filtered = filtered.filter(
//         (p) => p.session.toLowerCase() === filters.session.toLowerCase()
//       );

//     if (filters.search)
//       filtered = filtered.filter((p) =>
//         p.title.toLowerCase().includes(filters.search.toLowerCase())
//       );

//     if (filters.sort === "newest") {
//       filtered = filtered.sort((a, b) => b.session.localeCompare(a.session));
//     } else if (filters.sort === "oldest") {
//       filtered = filtered.sort((a, b) => a.session.localeCompare(b.session));
//     } else if (filters.sort === "subject") {
//       filtered = filtered.sort((a, b) => a.subject.localeCompare(b.subject));
//     }

//     return filtered;
//   }, [filters, papersData]);

//   const sessions = ["April 2025", "October 2024", "April 2024", "2024"];
//   const subjects = ["Hindi", "English", "Maths", "Science"];

//   return (
//     <section className="qustion-paper-hero-section1">
//       <div className="container">
//         {/* FILTER CARDS */}
//         <div className="filtercards-section">
//           <div className="filtercards-row">
//             {/* All Papers */}
//             <div
//               className="filtercards-card filtercards-blue"
//               onClick={() => handleToggle("papers")}
//             >
//               <div className="filtercards-card-content">
//                 <div className="filtercards-text">
//                   <p className="filtercards-label">All Secondary papers</p>
//                   <h3 className="filtercards-value">{filteredPapers.length}</h3>
//                 </div>
//                 <div className="filtercards-icon">
//                   <img
//                     src="/assets/images/question-papers/icons/file.svg"
//                     alt="papers"
//                   />
//                   <ChevronDown
//                     className={`filtercards-arrow ${
//                       openMenu === "papers" ? "filtercards-rotate" : ""
//                     }`}
//                   />
//                 </div>
//               </div>

//               {openMenu === "papers" && (
//                 <div className="filtercards-dropdown">
//                   <ul>
//                     <li onClick={() => handleSelect("paperType", "All")}>
//                       All Papers
//                     </li>
//                     <li onClick={() => handleSelect("paperType", "Sample")}>
//                       Sample Papers
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>

//             {/* Latest Papers */}
//             <div
//               className="filtercards-card filtercards-green"
//               onClick={() => handleToggle("latest")}
//             >
//               <div className="filtercards-card-content">
//                 <div className="filtercards-text">
//                   <p className="filtercards-label">Latest papers</p>
//                   <h3 className="filtercards-value">
//                     {filters.session || "Select"}
//                   </h3>
//                 </div>
//                 <div className="filtercards-icon">
//                   <img
//                     src="/assets/images/question-papers/icons/date.svg"
//                     alt="calendar"
//                   />
//                   <ChevronDown
//                     className={`filtercards-arrow ${
//                       openMenu === "latest" ? "filtercards-rotate" : ""
//                     }`}
//                   />
//                 </div>
//               </div>

//               {openMenu === "latest" && (
//                 <div className="filtercards-dropdown">
//                   <ul>
//                     {sessions.map((s) => (
//                       <li key={s} onClick={() => handleSelect("session", s)}>
//                         {s}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             {/* Subjects */}
//             <div
//               className="filtercards-card filtercards-purple"
//               onClick={() => handleToggle("subjects")}
//             >
//               <div className="filtercards-card-content">
//                 <div className="filtercards-text">
//                   <p className="filtercards-label">Subjects</p>
//                   <h3 className="filtercards-value">
//                     {filters.subject || "Select"}
//                   </h3>
//                 </div>
//                 <div className="filtercards-icon">
//                   <img
//                     src="/assets/images/question-papers/icons/book.svg"
//                     alt="book"
//                   />
//                   <ChevronDown
//                     className={`filtercards-arrow ${
//                       openMenu === "subjects" ? "filtercards-rotate" : ""
//                     }`}
//                   />
//                 </div>
//               </div>

//               {openMenu === "subjects" && (
//                 <div className="filtercards-dropdown">
//                   <ul>
//                     {subjects.map((sub) => (
//                       <li
//                         key={sub}
//                         onClick={() => handleSelect("subject", sub)}
//                       >
//                         {sub}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* SEARCH SECTION */}
//         <div className="search-section">
//           <div className="search-row">
//             <div className="serarch-filter-bx p-relative">
//               <img src="/assets/images/question-papers/icons/search.svg" alt="Search Icon" className="serach-icon"></img>
//             <input
//               type="text"
//               className="search-input"
//               placeholder="Search papers..."
//               value={filters.search}
//               onChange={handleSearch}
//             />
//             </div>
//             <select
//               className="sort-dropdown"
//               value={filters.sort}
//               onChange={handleSort}
//             >
//               <option value="">Sort By</option>
//               <option value="newest">Newest First</option>
//               <option value="oldest">Oldest First</option>
//               <option value="subject">By Subject</option>
//             </select>
//           </div>
//         </div>

//         {/* PAPERS GRID */}
//         <section className="papers-grid">
//           {filteredPapers.map((paper) => (
//             <article key={paper.id} className="paper-card">
//               {paper.sample && <div className="sample-badge">sample</div>}
//               <h2 className="paper-title">{paper.title}</h2>
//               <div className="paper-details">
//                 <div className="paper-meta">
//                   <div className="meta-item">
//                     <img
//                       src="/assets/images/question-papers/icons/calender.svg"
//                       alt="Date"
//                       className="meta-icon"
//                     />
//                     <span className="meta-text">{paper.session}</span>
//                   </div>
//                   <div className="meta-item">
//                     <img
//                       src="/assets/images/question-papers/icons/book-light.svg"
//                       alt="Subject"
//                       className="meta-icon"
//                     />
//                     <span className="meta-text">{paper.subject}</span>
//                   </div>
//                 </div>
//                 <div className="paper-actions">
//                   <a href="#" className="action-btn preview-btn">
//                     <img
//                       src="/assets/images/question-papers/icons/eye.svg"
//                       alt="Preview"
//                       className="meta-icon"
//                     />
//                     Preview
//                   </a>
//                   <a href="#" className="action-btn download-btn">
//                     <img
//                       src="/assets/images/question-papers/icons/download.svg"
//                       alt="Download"
//                       className="meta-icon"
//                     />
//                     Download
//                   </a>
//                 </div>
//               </div>
//             </article>
//           ))}

//           {filteredPapers.length === 0 && (
//             <p style={{ textAlign: "center", padding: "30px" }}>
//               No papers found for the selected filters.
//             </p>
//           )}
//         </section>


//           <a href="#" className="cta-button">You can download Secondary className 10th previous year's NIOS question papers and NIOS Sample paper 2025 from SS Coaching website exclusively.</a>

//       </div>
//     </section>
//   );
// };

// export default QuestionPapers;







import React, { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";

const QuestionPapers = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [filters, setFilters] = useState({
    paperType: "All",
    session: "",
    subject: "",
    search: "",
    sort: "",
  });

  const handleToggle = (name) => setOpenMenu(openMenu === name ? null : name);
  const handleSelect = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setOpenMenu(null);
  };
  const handleSearch = (e) =>
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  const handleSort = (e) =>
    setFilters((prev) => ({ ...prev, sort: e.target.value }));

  // -------------------------
  // All question paper entries
  // -------------------------
  const papersData = [
    // 201 - Hindi
    { id: 201001, code: "201", subject: "Hindi", title: "201 - Hindi (April 2025)", session: "April 2025", sample: false, file: "/papers/201-hindi-apr-2025.pdf" },
    { id: 201002, code: "201", subject: "Hindi", title: "201 - Hindi (October 2024)", session: "October 2024", sample: false, file: "/papers/201-hindi-oct-2024.pdf" },
    { id: 201003, code: "201", subject: "Hindi", title: "201 - Hindi (April 2024)", session: "April 2024", sample: false, file: "/papers/201-hindi-apr-2024.pdf" },
    { id: 201004, code: "201", subject: "Hindi", title: "201 - Hindi (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/201-hindi-sample-2024.pdf" },
    { id: 201005, code: "201", subject: "Hindi", title: "201 - Hindi (April 2023)", session: "April 2023", sample: false, file: "/papers/201-hindi-apr-2023.pdf" },
    { id: 201006, code: "201", subject: "Hindi", title: "201 - Hindi (October 2022)", session: "October 2022", sample: false, file: "/papers/201-hindi-oct-2022.pdf" },
    { id: 201007, code: "201", subject: "Hindi", title: "201 - Hindi (April 2022)", session: "April 2022", sample: false, file: "/papers/201-hindi-apr-2022.pdf" },

    // 202 - English
    { id: 202001, code: "202", subject: "English", title: "202 - English (April 2025)", session: "April 2025", sample: false, file: "/papers/202-english-apr-2025.pdf" },
    { id: 202002, code: "202", subject: "English", title: "202 - English (October 2024)", session: "October 2024", sample: false, file: "/papers/202-english-oct-2024.pdf" },
    { id: 202003, code: "202", subject: "English", title: "202 - English (April 2024)", session: "April 2024", sample: false, file: "/papers/202-english-apr-2024.pdf" },
    { id: 202004, code: "202", subject: "English", title: "202 - English (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/202-english-sample-2024.pdf" },
    { id: 202005, code: "202", subject: "English", title: "202 - English (April 2023)", session: "April 2023", sample: false, file: "/papers/202-english-apr-2023.pdf" },
    { id: 202006, code: "202", subject: "English", title: "202 - English (October 2022)", session: "October 2022", sample: false, file: "/papers/202-english-oct-2022.pdf" },
    { id: 202007, code: "202", subject: "English", title: "202 - English (April 2022)", session: "April 2022", sample: false, file: "/papers/202-english-apr-2022.pdf" },

    // 206 - Urdu
    { id: 206001, code: "206", subject: "Urdu", title: "206 - Urdu (April 2025)", session: "April 2025", sample: false, file: "/papers/206-urdu-apr-2025.pdf" },
    { id: 206002, code: "206", subject: "Urdu", title: "206 - Urdu (October 2024)", session: "October 2024", sample: false, file: "/papers/206-urdu-oct-2024.pdf" },
    { id: 206003, code: "206", subject: "Urdu", title: "206 - Urdu (April 2024)", session: "April 2024", sample: false, file: "/papers/206-urdu-apr-2024.pdf" },
    { id: 206004, code: "206", subject: "Urdu", title: "206 - Urdu (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/206-urdu-sample-2024.pdf" },
    { id: 206005, code: "206", subject: "Urdu", title: "206 - Urdu (April 2023)", session: "April 2023", sample: false, file: "/papers/206-urdu-apr-2023.pdf" },
    { id: 206006, code: "206", subject: "Urdu", title: "206 - Urdu (October 2022)", session: "October 2022", sample: false, file: "/papers/206-urdu-oct-2022.pdf" },
    { id: 206007, code: "206", subject: "Urdu", title: "206 - Urdu (April 2022)", session: "April 2022", sample: false, file: "/papers/206-urdu-apr-2022.pdf" },

    // 209 - Sanskrit
    { id: 209001, code: "209", subject: "Sanskrit", title: "209 - Sanskrit (April 2025)", session: "April 2025", sample: false, file: "/papers/209-sanskrit-apr-2025.pdf" },
    { id: 209002, code: "209", subject: "Sanskrit", title: "209 - Sanskrit (October 2024)", session: "October 2024", sample: false, file: "/papers/209-sanskrit-oct-2024.pdf" },
    { id: 209003, code: "209", subject: "Sanskrit", title: "209 - Sanskrit (April 2024)", session: "April 2024", sample: false, file: "/papers/209-sanskrit-apr-2024.pdf" },
    { id: 209004, code: "209", subject: "Sanskrit", title: "209 - Sanskrit (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/209-sanskrit-sample-2024.pdf" },
    { id: 209005, code: "209", subject: "Sanskrit", title: "209 - Sanskrit (April 2023)", session: "April 2023", sample: false, file: "/papers/209-sanskrit-apr-2023.pdf" },
    { id: 209006, code: "209", subject: "Sanskrit", title: "209 - Sanskrit (October 2022)", session: "October 2022", sample: false, file: "/papers/209-sanskrit-oct-2022.pdf" },
    { id: 209007, code: "209", subject: "Sanskrit", title: "209 - Sanskrit (April 2022)", session: "April 2022", sample: false, file: "/papers/209-sanskrit-apr-2022.pdf" },

    // 211 - Maths
    { id: 211001, code: "211", subject: "Maths", title: "211 - Maths (April 2025)", session: "April 2025", sample: false, file: "/papers/211-maths-apr-2025.pdf" },
    { id: 211002, code: "211", subject: "Maths", title: "211 - Maths (October 2024)", session: "October 2024", sample: false, file: "/papers/211-maths-oct-2024.pdf" },
    { id: 211003, code: "211", subject: "Maths", title: "211 - Maths (April 2024)", session: "April 2024", sample: false, file: "/papers/211-maths-apr-2024.pdf" },
    { id: 211004, code: "211", subject: "Maths", title: "211 - Maths (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/211-maths-sample-2024.pdf" },
    { id: 211005, code: "211", subject: "Maths", title: "211 - Maths (April 2023)", session: "April 2023", sample: false, file: "/papers/211-maths-apr-2023.pdf" },
    { id: 211006, code: "211", subject: "Maths", title: "211 - Maths (October 2022)", session: "October 2022", sample: false, file: "/papers/211-maths-oct-2022.pdf" },
    { id: 211007, code: "211", subject: "Maths", title: "211 - Maths (April 2022)", session: "April 2022", sample: false, file: "/papers/211-maths-apr-2022.pdf" },

    // 212 - Science
    { id: 212001, code: "212", subject: "Science", title: "212 - Science (April 2025)", session: "April 2025", sample: false, file: "/papers/212-science-apr-2025.pdf" },
    { id: 212002, code: "212", subject: "Science", title: "212 - Science (October 2024)", session: "October 2024", sample: false, file: "/papers/212-science-oct-2024.pdf" },
    { id: 212003, code: "212", subject: "Science", title: "212 - Science (April 2024)", session: "April 2024", sample: false, file: "/papers/212-science-apr-2024.pdf" },
    { id: 212004, code: "212", subject: "Science", title: "212 - Science (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/212-science-sample-2024.pdf" },
    { id: 212005, code: "212", subject: "Science", title: "212 - Science (April 2023)", session: "April 2023", sample: false, file: "/papers/212-science-apr-2023.pdf" },
    { id: 212006, code: "212", subject: "Science", title: "212 - Science (October 2022)", session: "October 2022", sample: false, file: "/papers/212-science-oct-2022.pdf" },
    { id: 212007, code: "212", subject: "Science", title: "212 - Science (April 2022)", session: "April 2022", sample: false, file: "/papers/212-science-apr-2022.pdf" },

    // 213 - Social Science
    { id: 213001, code: "213", subject: "Social Science", title: "213 - Social Science (April 2025)", session: "April 2025", sample: false, file: "/papers/213-social-science-apr-2025.pdf" },
    { id: 213002, code: "213", subject: "Social Science", title: "213 - Social Science (October 2024)", session: "October 2024", sample: false, file: "/papers/213-social-science-oct-2024.pdf" },
    { id: 213003, code: "213", subject: "Social Science", title: "213 - Social Science (April 2024)", session: "April 2024", sample: false, file: "/papers/213-social-science-apr-2024.pdf" },
    { id: 213004, code: "213", subject: "Social Science", title: "213 - Social Science (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/213-social-science-sample-2024.pdf" },
    { id: 213005, code: "213", subject: "Social Science", title: "213 - Social Science (April 2023)", session: "April 2023", sample: false, file: "/papers/213-social-science-apr-2023.pdf" },
    { id: 213006, code: "213", subject: "Social Science", title: "213 - Social Science (October 2022)", session: "October 2022", sample: false, file: "/papers/213-social-science-oct-2022.pdf" },
    { id: 213007, code: "213", subject: "Social Science", title: "213 - Social Science (April 2022)", session: "April 2022", sample: false, file: "/papers/213-social-science-apr-2022.pdf" },

    // 214 - Economics
    { id: 214001, code: "214", subject: "Economics", title: "214 - Economics (April 2025)", session: "April 2025", sample: false, file: "/papers/214-economics-apr-2025.pdf" },
    { id: 214002, code: "214", subject: "Economics", title: "214 - Economics (October 2024)", session: "October 2024", sample: false, file: "/papers/214-economics-oct-2024.pdf" },
    { id: 214003, code: "214", subject: "Economics", title: "214 - Economics (April 2024)", session: "April 2024", sample: false, file: "/papers/214-economics-apr-2024.pdf" },
    { id: 214004, code: "214", subject: "Economics", title: "214 - Economics (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/214-economics-sample-2024.pdf" },
    { id: 214005, code: "214", subject: "Economics", title: "214 - Economics (April 2023)", session: "April 2023", sample: false, file: "/papers/214-economics-apr-2023.pdf" },
    { id: 214006, code: "214", subject: "Economics", title: "214 - Economics (October 2022)", session: "October 2022", sample: false, file: "/papers/214-economics-oct-2022.pdf" },
    { id: 214007, code: "214", subject: "Economics", title: "214 - Economics (April 2022)", session: "April 2022", sample: false, file: "/papers/214-economics-apr-2022.pdf" },

    // 215 - Business Studies
    { id: 215001, code: "215", subject: "Business Studies", title: "215 - Business Studies (April 2025)", session: "April 2025", sample: false, file: "/papers/215-business-studies-apr-2025.pdf" },
    { id: 215002, code: "215", subject: "Business Studies", title: "215 - Business Studies (October 2024)", session: "October 2024", sample: false, file: "/papers/215-business-studies-oct-2024.pdf" },
    { id: 215003, code: "215", subject: "Business Studies", title: "215 - Business Studies (April 2024)", session: "April 2024", sample: false, file: "/papers/215-business-studies-apr-2024.pdf" },
    { id: 215004, code: "215", subject: "Business Studies", title: "215 - Business Studies (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/215-business-studies-sample-2024.pdf" },
    { id: 215005, code: "215", subject: "Business Studies", title: "215 - Business Studies (April 2023)", session: "April 2023", sample: false, file: "/papers/215-business-studies-apr-2023.pdf" },
    { id: 215006, code: "215", subject: "Business Studies", title: "215 - Business Studies (October 2022)", session: "October 2022", sample: false, file: "/papers/215-business-studies-oct-2022.pdf" },
    { id: 215007, code: "215", subject: "Business Studies", title: "215 - Business Studies (April 2022)", session: "April 2022", sample: false, file: "/papers/215-business-studies-apr-2022.pdf" },

    // 216 - Home Science
    { id: 216001, code: "216", subject: "Home Science", title: "216 - Home Science (April 2025)", session: "April 2025", sample: false, file: "/papers/216-home-science-apr-2025.pdf" },
    { id: 216002, code: "216", subject: "Home Science", title: "216 - Home Science (October 2024)", session: "October 2024", sample: false, file: "/papers/216-home-science-oct-2024.pdf" },
    { id: 216003, code: "216", subject: "Home Science", title: "216 - Home Science (April 2024)", session: "April 2024", sample: false, file: "/papers/216-home-science-apr-2024.pdf" },
    { id: 216004, code: "216", subject: "Home Science", title: "216 - Home Science (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/216-home-science-sample-2024.pdf" },
    { id: 216005, code: "216", subject: "Home Science", title: "216 - Home Science (April 2023)", session: "April 2023", sample: false, file: "/papers/216-home-science-apr-2023.pdf" },
    { id: 216006, code: "216", subject: "Home Science", title: "216 - Home Science (October 2022)", session: "October 2022", sample: false, file: "/papers/216-home-science-oct-2022.pdf" },
    { id: 216007, code: "216", subject: "Home Science", title: "216 - Home Science (April 2022)", session: "April 2022", sample: false, file: "/papers/216-home-science-apr-2022.pdf" },

    // 222 - Psychology
    { id: 222001, code: "222", subject: "Psychology", title: "222 - Psychology (April 2025)", session: "April 2025", sample: false, file: "/papers/222-psychology-apr-2025.pdf" },
    { id: 222002, code: "222", subject: "Psychology", title: "222 - Psychology (October 2024)", session: "October 2024", sample: false, file: "/papers/222-psychology-oct-2024.pdf" },
    { id: 222003, code: "222", subject: "Psychology", title: "222 - Psychology (April 2024)", session: "April 2024", sample: false, file: "/papers/222-psychology-apr-2024.pdf" },
    { id: 222004, code: "222", subject: "Psychology", title: "222 - Psychology (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/222-psychology-sample-2024.pdf" },
    { id: 222005, code: "222", subject: "Psychology", title: "222 - Psychology (April 2023)", session: "April 2023", sample: false, file: "/papers/222-psychology-apr-2023.pdf" },
    { id: 222006, code: "222", subject: "Psychology", title: "222 - Psychology (October 2022)", session: "October 2022", sample: false, file: "/papers/222-psychology-oct-2022.pdf" },
    { id: 222007, code: "222", subject: "Psychology", title: "222 - Psychology (April 2022)", session: "April 2022", sample: false, file: "/papers/222-psychology-apr-2022.pdf" },

    // 223 - Indian Culture & Heritage
    { id: 223001, code: "223", subject: "Indian Culture & Heritage", title: "223 - Indian Culture & Heritage (April 2025)", session: "April 2025", sample: false, file: "/papers/223-indian-culture-heritage-apr-2025.pdf" },
    { id: 223002, code: "223", subject: "Indian Culture & Heritage", title: "223 - Indian Culture & Heritage (October 2024)", session: "October 2024", sample: false, file: "/papers/223-indian-culture-heritage-oct-2024.pdf" },
    { id: 223003, code: "223", subject: "Indian Culture & Heritage", title: "223 - Indian Culture & Heritage (April 2024)", session: "April 2024", sample: false, file: "/papers/223-indian-culture-heritage-apr-2024.pdf" },
    { id: 223004, code: "223", subject: "Indian Culture & Heritage", title: "223 - Indian Culture & Heritage (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/223-indian-culture-heritage-sample-2024.pdf" },
    { id: 223005, code: "223", subject: "Indian Culture & Heritage", title: "223 - Indian Culture & Heritage (April 2023)", session: "April 2023", sample: false, file: "/papers/223-indian-culture-heritage-apr-2023.pdf" },
    { id: 223006, code: "223", subject: "Indian Culture & Heritage", title: "223 - Indian Culture & Heritage (October 2022)", session: "October 2022", sample: false, file: "/papers/223-indian-culture-heritage-oct-2022.pdf" },
    { id: 223007, code: "223", subject: "Indian Culture & Heritage", title: "223 - Indian Culture & Heritage (April 2022)", session: "April 2022", sample: false, file: "/papers/223-indian-culture-heritage-apr-2022.pdf" },

    // 225 - Painting
    { id: 225001, code: "225", subject: "Painting", title: "225 - Painting (April 2025)", session: "April 2025", sample: false, file: "/papers/225-painting-apr-2025.pdf" },
    { id: 225002, code: "225", subject: "Painting", title: "225 - Painting (October 2024)", session: "October 2024", sample: false, file: "/papers/225-painting-oct-2024.pdf" },
    { id: 225003, code: "225", subject: "Painting", title: "225 - Painting (April 2024)", session: "April 2024", sample: false, file: "/papers/225-painting-apr-2024.pdf" },
    { id: 225004, code: "225", subject: "Painting", title: "225 - Painting (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/225-painting-sample-2024.pdf" },
    { id: 225005, code: "225", subject: "Painting", title: "225 - Painting (April 2023)", session: "April 2023", sample: false, file: "/papers/225-painting-apr-2023.pdf" },
    { id: 225006, code: "225", subject: "Painting", title: "225 - Painting (October 2022)", session: "October 2022", sample: false, file: "/papers/225-painting-oct-2022.pdf" },
    { id: 225007, code: "225", subject: "Painting", title: "225 - Painting (April 2022)", session: "April 2022", sample: false, file: "/papers/225-painting-apr-2022.pdf" },

    // 229 - Data Entry Operation
    { id: 229001, code: "229", subject: "Data Entry Operation", title: "229 - Data Entry Operation (April 2025)", session: "April 2025", sample: false, file: "/papers/229-data-entry-operation-apr-2025.pdf" },
    { id: 229002, code: "229", subject: "Data Entry Operation", title: "229 - Data Entry Operation (October 2024)", session: "October 2024", sample: false, file: "/papers/229-data-entry-operation-oct-2024.pdf" },
    { id: 229003, code: "229", subject: "Data Entry Operation", title: "229 - Data Entry Operation (April 2024)", session: "April 2024", sample: false, file: "/papers/229-data-entry-operation-apr-2024.pdf" },
    { id: 229004, code: "229", subject: "Data Entry Operation", title: "229 - Data Entry Operation (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/229-data-entry-operation-sample-2024.pdf" },
    { id: 229005, code: "229", subject: "Data Entry Operation", title: "229 - Data Entry Operation (April 2023)", session: "April 2023", sample: false, file: "/papers/229-data-entry-operation-apr-2023.pdf" },
    { id: 229006, code: "229", subject: "Data Entry Operation", title: "229 - Data Entry Operation (October 2022)", session: "October 2022", sample: false, file: "/papers/229-data-entry-operation-oct-2022.pdf" },
    { id: 229007, code: "229", subject: "Data Entry Operation", title: "229 - Data Entry Operation (April 2022)", session: "April 2022", sample: false, file: "/papers/229-data-entry-operation-apr-2022.pdf" },

    // 224 - Accountancy
    { id: 224001, code: "224", subject: "Accountancy", title: "224 - Accountancy (April 2025)", session: "April 2025", sample: false, file: "/papers/224-accountancy-apr-2025.pdf" },
    { id: 224002, code: "224", subject: "Accountancy", title: "224 - Accountancy (October 2024)", session: "October 2024", sample: false, file: "/papers/224-accountancy-oct-2024.pdf" },
    { id: 224003, code: "224", subject: "Accountancy", title: "224 - Accountancy (April 2024)", session: "April 2024", sample: false, file: "/papers/224-accountancy-apr-2024.pdf" },
    { id: 224004, code: "224", subject: "Accountancy", title: "224 - Accountancy (Sample Paper 2024)", session: "Sample 2024", sample: true, file: "/papers/224-accountancy-sample-2024.pdf" },
    { id: 224005, code: "224", subject: "Accountancy", title: "224 - Accountancy (April 2023)", session: "April 2023", sample: false, file: "/papers/224-accountancy-apr-2023.pdf" },
    { id: 224006, code: "224", subject: "Accountancy", title: "224 - Accountancy (October 2022)", session: "October 2022", sample: false, file: "/papers/224-accountancy-oct-2022.pdf" },
    { id: 224007, code: "224", subject: "Accountancy", title: "224 - Accountancy (April 2022)", session: "April 2022", sample: false, file: "/papers/224-accountancy-apr-2022.pdf" },
  ];

  // 🧠 Filters + Sorting
  const filteredPapers = useMemo(() => {
    let filtered = [...papersData];

    // Paper type filter (All vs Sample)
    if (filters.paperType === "Sample") {
      filtered = filtered.filter((p) => p.sample);
    }

    if (filters.subject) {
      filtered = filtered.filter(
        (p) => p.subject.toLowerCase() === filters.subject.toLowerCase()
      );
    }

    if (filters.session) {
      filtered = filtered.filter(
        (p) => p.session.toLowerCase() === filters.session.toLowerCase()
      );
    }

    if (filters.search) {
      filtered = filtered.filter((p) =>
        (p.title + " " + p.code + " " + p.subject)
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      );
    }

    if (filters.sort === "newest") {
      // Simple string sort works for our labels
      filtered.sort((a, b) => b.session.localeCompare(a.session));
    } else if (filters.sort === "oldest") {
      filtered.sort((a, b) => a.session.localeCompare(b.session));
    } else if (filters.sort === "subject") {
      filtered.sort((a, b) => a.subject.localeCompare(b.subject));
    }

    return filtered;
  }, [filters]);

  const sessions = [
    "April 2025",
    "October 2024",
    "April 2024",
    "Sample 2024",
    "April 2023",
    "October 2022",
    "April 2022",
  ];

  const subjects = [
    "Hindi",
    "English",
    "Urdu",
    "Sanskrit",
    "Maths",
    "Science",
    "Social Science",
    "Economics",
    "Business Studies",
    "Home Science",
    "Psychology",
    "Indian Culture & Heritage",
    "Painting",
    "Data Entry Operation",
    "Accountancy",
  ];

  return (
    <section className="qustion-paper-hero-section1">
      <div className="container">
        {/* FILTER CARDS */}
        <div className="filtercards-section">
          <div className="filtercards-row">
            {/* Paper Type */}
            <div
              className="filtercards-card filtercards-blue"
              onClick={() => handleToggle("papers")}
            >
              <div className="filtercards-card-content">
                <div className="filtercards-text">
                  <p className="filtercards-label">Paper Type</p>
                  <h3 className="filtercards-value">
                    {filters.paperType || "All"}
                  </h3>
                </div>
                <div className="filtercards-icon">
                  <img
                    src="/assets/images/question-papers/icons/file.svg"
                    alt="papers"
                  />
                  <ChevronDown
                    className={`filtercards-arrow ${
                      openMenu === "papers" ? "filtercards-rotate" : ""
                    }`}
                  />
                </div>
              </div>

              {openMenu === "papers" && (
                <div className="filtercards-dropdown">
                  <ul>
                    <li onClick={() => handleSelect("paperType", "All")}>
                      All Papers
                    </li>
                    <li onClick={() => handleSelect("paperType", "Sample")}>
                      Sample Papers
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Session */}
            <div
              className="filtercards-card filtercards-green"
              onClick={() => handleToggle("latest")}
            >
              <div className="filtercards-card-content">
                <div className="filtercards-text">
                  <p className="filtercards-label">Session</p>
                  <h3 className="filtercards-value">
                    {filters.session || "Select"}
                  </h3>
                </div>
                <div className="filtercards-icon">
                  <img
                    src="/assets/images/question-papers/icons/date.svg"
                    alt="calendar"
                  />
                  <ChevronDown
                    className={`filtercards-arrow ${
                      openMenu === "latest" ? "filtercards-rotate" : ""
                    }`}
                  />
                </div>
              </div>

              {openMenu === "latest" && (
                <div className="filtercards-dropdown">
                  <ul>
                    {sessions.map((s) => (
                      <li key={s} onClick={() => handleSelect("session", s)}>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Subjects */}
            <div
              className="filtercards-card filtercards-purple"
              onClick={() => handleToggle("subjects")}
            >
              <div className="filtercards-card-content">
                <div className="filtercards-text">
                  <p className="filtercards-label">Subjects</p>
                  <h3 className="filtercards-value">
                    {filters.subject || "Select"}
                  </h3>
                </div>
                <div className="filtercards-icon">
                  <img
                    src="/assets/images/question-papers/icons/book.svg"
                    alt="book"
                  />
                  <ChevronDown
                    className={`filtercards-arrow ${
                      openMenu === "subjects" ? "filtercards-rotate" : ""
                    }`}
                  />
                </div>
              </div>

              {openMenu === "subjects" && (
                <div className="filtercards-dropdown">
                  <ul>
                    {subjects.map((sub) => (
                      <li
                        key={sub}
                        onClick={() => handleSelect("subject", sub)}
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SEARCH SECTION */}
        <div className="search-section">
          <div className="search-row">
            <div className="serarch-filter-bx p-relative">
              <img
                src="/assets/images/question-papers/icons/search.svg"
                alt="Search Icon"
                className="serach-icon"
              />
              <input
                type="text"
                className="search-input"
                placeholder="Search papers..."
                value={filters.search}
                onChange={handleSearch}
              />
            </div>
            <select
              className="sort-dropdown"
              value={filters.sort}
              onChange={handleSort}
            >
              <option value="">Sort By</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="subject">By Subject</option>
            </select>
          </div>
        </div>

        {/* PAPERS GRID */}
        <section className="papers-grid">
          {filteredPapers.map((paper) => (
            <article key={paper.id} className="paper-card">
              {paper.sample && <div className="sample-badge">Sample</div>}
              <h2 className="paper-title">{paper.title}</h2>
              <div className="paper-details">
                <div className="paper-meta">
                  <div className="meta-item">
                    <img
                      src="/assets/images/question-papers/icons/calender.svg"
                      alt="Date"
                      className="meta-icon"
                    />
                    <span className="meta-text">{paper.session}</span>
                  </div>
                  <div className="meta-item">
                    <img
                      src="/assets/images/question-papers/icons/book-light.svg"
                      alt="Subject"
                      className="meta-icon"
                    />
                    <span className="meta-text">
                      {paper.code} • {paper.subject}
                    </span>
                  </div>
                </div>
                <div className="paper-actions">
                  <a
                    href={paper.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn preview-btn"
                  >
                    <img
                      src="/assets/images/question-papers/icons/eye.svg"
                      alt="Preview"
                      className="meta-icon"
                    />
                    Preview
                  </a>
                  <a href={paper.file} download className="action-btn download-btn">
                    <img
                      src="/assets/images/question-papers/icons/download.svg"
                      alt="Download"
                      className="meta-icon"
                    />
                    Download
                  </a>
                </div>
              </div>
            </article>
          ))}

          {filteredPapers.length === 0 && (
            <p style={{ textAlign: "center", padding: "30px" }}>
              No papers found for the selected filters.
            </p>
          )}
        </section>

        <a href="#" className="cta-button">
          You can download Secondary Class 10th previous year’s NIOS question
          papers and NIOS Sample Paper 2025 from SS Coaching website
          exclusively.
        </a>
      </div>
    </section>
  );
};

export default QuestionPapers;
