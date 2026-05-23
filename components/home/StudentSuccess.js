

// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import { Autoplay, FreeMode } from "swiper/modules";

// export default function StudentSuccess() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         // const res = await fetch("/api/student-success?limit=15", {
//         //   cache: "no-store",
//         // });

//         const res = await fetch(
//   "/api/student-success?limit=15&minScore=95",
//   { cache: "no-store" }
// );
//         const result = await res.json();

//         if (result.success) {
//           setStudents(result.data);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, []);

//   if (loading || students.length === 0) return null;

//   return (
//     <section className="students-section">
//       <div className="container">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           {/* <h3> </h3> */}
//            <h2 className="section-title">
//           Student <span className="highlight">Success</span>
//         </h2>
//           <Link href="/student-success" className="btn btn-sm btn-outline-primary">
//             View All
//           </Link>
//         </div>

//         <Swiper
//           modules={[Autoplay, FreeMode]}
//           freeMode
//           loop={students.length > 6}
//           speed={5000}
//           autoplay={{ delay: 0 }}
//           slidesPerView={7}
//           spaceBetween={10}
//           breakpoints={{
//             0: { slidesPerView: 2.2 },
//             576: { slidesPerView: 2.2 },
//             768: { slidesPerView: 4 },
//             992: { slidesPerView: 5 },

//             1240: { slidesPerView: 7 },


//           }}
//         >
//           {students.map((student) => (
//             <SwiperSlide key={student._id}>
//               <div
//                 className="student-card"
//                 style={{ backgroundColor: student.bgColor || "#ffeed1" }}
//               >
//                 <img
//                   src={student.image || "/assets/images/default-student.png"}
//                   alt={student.name}
//                   loading="lazy"
//                   className="student-image"
//                 />

//                 <div className="student-overlay">
//                   <div className="student-score">{student.score}</div>
//                   <div className="student-name">{student.name}</div>
//                   <div className="student-meta">
//                     <div>{student.rollNo}</div>
//                     <div>{student.className}</div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// }





"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Autoplay, FreeMode } from "swiper/modules";

const imagesMeta = [
  { title: "NIOS Student Success Through SS Coaching Lucknow",       alt: "Student passing NIOS exams successfully through SS Coaching Lucknow" },
  { title: "Outstanding NIOS Results at SS Coaching",                alt: "NIOS student achieving excellent marks with SS Coaching support" },
  { title: "Student Achievement Celebrated at SS Coaching",          alt: "Successful student from SS Coaching Lucknow NIOS classes" },
  { title: "Bright Academic Future with SS Coaching",                alt: "NIOS student success story from SS Coaching Lucknow" },
  { title: "NIOS Exam Success Story from SS Coaching",               alt: "Student scoring high marks in NIOS exams through SS Coaching" },
  { title: "SS Coaching Students Achieving Excellence",              alt: "Academic success achieved with SS Coaching NIOS guidance" },
  { title: "Top Performance in NIOS Exams",                         alt: "Top-performing NIOS student from SS Coaching Lucknow" },
  { title: "Successful Journey with SS Coaching Lucknow",            alt: "Student achieving academic goals through SS Coaching" },
  { title: "Academic Success Powered by SS Coaching",                alt: "Successful NIOS exam result with SS Coaching support" },
  { title: "Proud NIOS Achiever from SS Coaching",                   alt: "NIOS Class 12 student succeeding at SS Coaching Lucknow" },
  { title: "Student Excellence in NIOS Class 12 Exams",             alt: "Student achievement in NIOS Class 12 exams at SS Coaching" },
  { title: "SS Coaching Creating Student Success Stories",           alt: "NIOS coaching success story from SS Coaching Lucknow" },
  { title: "Successful Results with Expert NIOS Coaching",           alt: "Student celebrating success in NIOS exams through SS Coaching" },
  { title: "NIOS Learning Success at SS Coaching",                   alt: "High-scoring student from SS Coaching Lucknow NIOS batch" },
  { title: "Student Growth and Achievement at SS Coaching",          alt: "Successful academic journey with SS Coaching NIOS classes" },
];

export default function StudentSuccess() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          "/api/student-success?limit=15&minScore=95",
          { cache: "no-store" }
        );
        const result = await res.json();

        if (result.success) {
          setStudents(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // ⏳ Delay fetch until browser is idle (Lighthouse-friendly)
    if ("requestIdleCallback" in window) {
      requestIdleCallback(fetchStudents);
    } else {
      setTimeout(fetchStudents, 1500);
    }
  }, []);

  if (loading || students.length === 0) return null;

  return (
    <section className="students-section">
      <div className="container">
        <div className="hazratgn d-flex justify-content-between align-items-center mb-3">
          <h2 className="section-title">
            Student <span className="highlight">Success</span>
          </h2>

          <Link
            href="/student-success"
            className="btn btn-sm btn-outline-primary"
          >
            View All
          </Link>
        </div>

        <Swiper
          modules={[Autoplay, FreeMode]}
          freeMode
          loop={students.length > 6}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          slidesPerView={7}
          spaceBetween={10}

          // 🔽 Reduce unnecessary recalculations
          watchSlidesProgress={false}
          updateOnWindowResize={false}
          observer={false}
          observeParents={false}

          breakpoints={{
            0: { slidesPerView: 2.2 },
            576: { slidesPerView: 2.2 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 5 },
            1240: { slidesPerView: 7 },
          }}
        >
          {students.map((student, index) => {
            const meta = imagesMeta[index] || { title: student.name, alt: student.name };
            return (
            <SwiperSlide key={student._id}>
              <div
                className="student-card"
                style={{ backgroundColor: student.bgColor || "#ffeed1" }}
              >
                <img
                  src={student.image || "/assets/images/default-student.png"}
                  alt={meta.alt}
                  title={meta.title}
                  loading="lazy"
                  width="170"
                  height="200"
                  className="student-image"
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
            </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
