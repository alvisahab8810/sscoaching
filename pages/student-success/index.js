// "use client";

// import React, { useEffect, useState } from "react";
// import Header from "@/components/header/Header";
// import Footer from "@/components/footer/Footer";

// export default function StudentSuccessPage() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedYear, setSelectedYear] = useState("all");

//   const limit = 12;

//   const fetchStudents = async () => {
//     setLoading(true);

//     let url = `/api/student-success?page=${page}&limit=${limit}`;
//     if (selectedYear !== "all") {
//       url += `&year=${selectedYear}`;
//     }

//     const res = await fetch(url, { cache: "no-store" });
//     const data = await res.json();

//     if (data.success) {
//       setStudents(data.data);
//       setTotalPages(data.pagination.totalPages);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, [page, selectedYear]);

//   return (
//     <>
//       <Header />

//       <section className="students-page py-5">
//         <div className="container">

//           {/* ===== HEADER ===== */}
//           <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
//             <h2 className="fw-bold">Student Success Stories</h2>

//             {/* YEAR FILTER */}
//             <select
//               className="form-select w-auto"
//               value={selectedYear}
//               onChange={(e) => {
//                 setPage(1);
//                 setSelectedYear(e.target.value);
//               }}
//             >
//               <option value="all">All Years</option>
//               {Array.from({ length: 8 }).map((_, i) => {
//                 const y = new Date().getFullYear() - i;
//                 return (
//                   <option key={y} value={y}>
//                     {y}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>

//           {/* ===== LOADING ===== */}
//           {loading && <p>Loading student success...</p>}

//           {/* ===== GRID ===== */}
//           {!loading && students.length === 0 && (
//             <p className="text-muted">No records found.</p>
//           )}

//           <div className="row g-4">
//             {students.map((student) => (
//               <div key={student._id} className="col-lg-2 col-md-2 col-sm-6">
//                 <div
//                   className="student-card h-100"
//                   style={{ backgroundColor: student.bgColor || "#ffeed1" }}
//                 >
//                   <img
//                     src={student.image}
//                     alt={student.name}
//                     className="student-image"
//                     loading="lazy"
//                   />

//                   <div className="student-overlay">
//                     <div className="student-score">{student.score}</div>
//                     <div className="student-name">{student.name}</div>

//                     <div className="student-meta">
//                       <div>{student.rollNo}</div>
//                       <div>{student.className}</div>
//                       <div>{student.year}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ===== PAGINATION ===== */}
//           {totalPages > 1 && (
//             <div className="d-flex justify-content-center gap-2 mt-5 flex-wrap">
//               <button
//                 className="btn btn-outline-primary btn-sm"
//                 disabled={page === 1}
//                 onClick={() => setPage(page - 1)}
//               >
//                 Prev
//               </button>

//               {Array.from({ length: totalPages }).map((_, i) => {
//                 const p = i + 1;

//                 if (
//                   p === 1 ||
//                   p === totalPages ||
//                   (p >= page - 2 && p <= page + 2)
//                 ) {
//                   return (
//                     <button
//                       key={p}
//                       className={`btn btn-sm ${
//                         page === p
//                           ? "btn-primary"
//                           : "btn-outline-primary"
//                       }`}
//                       onClick={() => setPage(p)}
//                     >
//                       {p}
//                     </button>
//                   );
//                 }

//                 if (p === page - 3 || p === page + 3) {
//                   return <span key={p}>…</span>;
//                 }

//                 return null;
//               })}

//               <button
//                 className="btn btn-outline-primary btn-sm"
//                 disabled={page === totalPages}
//                 onClick={() => setPage(page + 1)}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const YEARS = [2026, 2025, 2024, 2023]; // auto works even if no data

export default function StudentSuccessPage() {
  return (
    <>
      <Header />
      <section className="students-page py-5">
        <div className="container">
          {YEARS.map((year) => (
            <YearSection key={year} year={year} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

/* ================= YEAR SECTION ================= */

function YearSection({ year }) {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 100;

  const fetchStudents = async () => {
    setLoading(true);

    const res = await fetch(
      `/api/student-success?year=${year}&page=${page}&limit=${limit}`,
      { cache: "no-store" }
    );
    const data = await res.json();

    if (data.success) {
      setStudents(data.data);
      setTotalPages(data.pagination.totalPages);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  if (!loading && students.length === 0) return null;

  return (
    <div className="all-students-results mb-5">
      {/* ===== YEAR HEADING ===== */}
      <h3 className="fw-bold mb-4">
        Student Success Stories {year}
      </h3>

      {loading && <p>Loading...</p>}

      {/* ===== CARDS ===== */}
      <div className="row g-4">
        {students.map((student) => (
        //   <div key={student._id} className="col-lg-2 col-md-2 col-sm-2">
        <div key={student._id} className="col-6 col-md-4 col-lg-2">

            <div
              className="student-card h-100"
              style={{ backgroundColor: student.bgColor || "#ffeed1" }}
            >
              <img
                src={student.image}
                alt={student.name}
                className="student-image"
                loading="lazy"
              />

              <div className="student-overlay">
                <div className="student-score">{student.score}</div>
                <div className="student-name">{student.name}</div>

                <div className="student-meta">
                  <div>{student.rollNo}</div>
                  <div>{student.className}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== PAGINATION (ONLY IF > 100) ===== */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center gap-2 mt-4 flex-wrap">
          <button
            className="btn btn-outline-primary btn-sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;

            if (
              p === 1 ||
              p === totalPages ||
              (p >= page - 1 && p <= page + 1)
            ) {
              return (
                <button
                  key={p}
                  className={`btn btn-sm ${
                    page === p
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              );
            }

            if (p === page - 2 || p === page + 2) {
              return <span key={p}>…</span>;
            }

            return null;
          })}

          <button
            className="btn btn-outline-primary btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
