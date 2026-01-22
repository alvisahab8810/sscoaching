// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import { Autoplay, FreeMode } from "swiper/modules";

// export default function StudentSuccess() {
//   const students = [
//     {
//       name: "Anshika Raj",
//       score: "96.4%",
//       img: "/assets/images/students/stu1.svg",
//       bg: "#ffeed1",
//     },
//     {
//       name: "ROSHAN CHHETRI",
//       score: "96%",
//       img: "/assets/images/students/stu2.svg",
//       bg: "#e1e9fe",
//     },
//     {
//       name: "AYUSH RAI",
//       score: "96%",
//       img: "/assets/images/students/stu3.svg",
//       bg: "#f3efd0",
//     },

//     {
//       name: "ARPITA YADAV",
//       score: "96.2%",
//       img: "/assets/images/students/stu4.svg",
//       bg: "#ffeed1",
//     },
//      {
//       name: "ASHWANI SINGH",
//       score: "95.8%",
//       img: "/assets/images/students/stu5.svg",
//       bg: "#ffeed1",
//     },
//      {
//       name: "CHAUDHARY SANA",
//       score: "95.8%",
//       img: "/assets/images/students/stu6.svg",
//       bg: "#ebf5d5",
//     },
//   ];

//   return (
//     <section className="students-section">
//       <div className="container">
//         <Swiper
//           modules={[Autoplay, FreeMode]}
//           freeMode={true}
//           loop={true}
//           speed={5000}
//           autoplay={{
//             delay: 0,
//             // disableOnInteraction: false,
//           }}
//           slidesPerView={7}
//           spaceBetween={10}
//           breakpoints={{
//             0: { slidesPerView: 2.5 },
//             576: { slidesPerView: 2.5 },
//             992: { slidesPerView: 7 },
//           }}
//           allowTouchMove={true}
//           className="students-swiper"
//         >
//           {[...students, ...students].map((student, index) => (
//             <SwiperSlide key={index}>
//               <div
//                 className="student-card"

//               >
//                 <img
//                   src={student.img}
//                   alt={student.name}
//                   className="student-image"

//                 />
//                 <div className="student-overlay">
//                   <div className="student-score ">
//                     {student.score}
//                   </div>
//                   <div className="student-name">
//                     {student.name}
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

// "use client";

// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import { Autoplay, FreeMode } from "swiper/modules";

// export default function StudentSuccess() {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await fetch("/api/student-success");
//         const result = await res.json();

//         if (result.success && Array.isArray(result.data)) {
//           setStudents(result.data);
//         }
//       } catch (error) {
//         console.error("Failed to load student success data", error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   // Safety: if no data, don’t render section
//   if (!students.length) return null;

//   return (
//     <section className="students-section">
//       <div className="container">
//         <Swiper
//           modules={[Autoplay, FreeMode]}
//           freeMode={true}
//           loop={true}
//           speed={5000}
//           autoplay={{
//             delay: 0,
//           }}
//           slidesPerView={7}
//           spaceBetween={10}
//           breakpoints={{
//             0: { slidesPerView: 2.2 },
//             576: { slidesPerView: 2.2 },
//             992: { slidesPerView: 7 },
//           }}
//           allowTouchMove={true}
//           className="students-swiper"
//         >
//           {students.map((student) => (
//             // <SwiperSlide key={student._id}>
//             //   <div
//             //     className="student-card"
//             //     style={{
//             //       backgroundColor: student.bgColor || "#ffeed1",
//             //     }}
//             //   >
//             //     <img
//             //       src={student.image}
//             //       alt={student.name}
//             //       className="student-image"
//             //     />

//             //     <div className="student-overlay">
//             //       <div className="student-score">
//             //         {student.score}
//             //       </div>
//             //       <div className="student-name">
//             //         {student.name}
//             //       </div>
//             //     </div>
//             //   </div>
//             // </SwiperSlide>

//             <SwiperSlide key={student._id}>
//               <div
//                 className="student-card"
//                 style={{
//                   backgroundColor: student.bgColor || "#ffeed1",
//                 }}
//               >
//                 <img
//                   src={student.image}
//                   alt={student.name}
//                   className="student-image"
//                 />

//                 <div className="student-overlay">
//                   <div className="student-score">{student.score}</div>

//                   <div className="student-name">
//                     <div>{student.name}</div>
//                   </div>

//                   <div className="student-meta">
//                     <div className="student-roll">{student.rollNo}</div>

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

export default function StudentSuccess() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // const res = await fetch("/api/student-success?limit=15", {
        //   cache: "no-store",
        // });

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

    fetchStudents();
  }, []);

  if (loading || students.length === 0) return null;

  return (
    <section className="students-section">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* <h3> </h3> */}
           <h2 className="section-title">
          Student <span className="highlight">Success</span>
        </h2>
          <Link href="/student-success" className="btn btn-sm btn-outline-primary">
            View All
          </Link>
        </div>

        <Swiper
          modules={[Autoplay, FreeMode]}
          freeMode
          loop={students.length > 6}
          speed={5000}
          autoplay={{ delay: 0 }}
          slidesPerView={7}
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 2.2 },
            576: { slidesPerView: 2.2 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 5 },

            1240: { slidesPerView: 7 },


          }}
        >
          {students.map((student) => (
            <SwiperSlide key={student._id}>
              <div
                className="student-card"
                style={{ backgroundColor: student.bgColor || "#ffeed1" }}
              >
                <img
                  src={student.image || "/assets/images/default-student.png"}
                  alt={student.name}
                  loading="lazy"
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
          ))}
        </Swiper>
      </div>
    </section>
  );
}
