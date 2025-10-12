// import React from "react";

// export default function StudentSuccess() {
//   return (
//     <section className="students-section">
//       <div className="container">
//         <div className="students-grid">
//           <div className="student-card" style={{ backgroundColor: "#ffeed1;" }}>
//             <img
//               src="/assets/images/students/student1.png"
//               alt="Student Arpit Yadav"
//               className="student-image"
//             />
//             <div className="student-overlay">
//               <div className="student-score">96.2%</div>
//               <div className="student-name">ARPIT YADAV</div>
//             </div>
//           </div>
//           <div className="student-card" style={{ backgroundColor: "#f3efd0;" }}>
//             <img
//               src="/assets/images/students/student2.png"
//               alt="Student Ayush Rai"
//               className="student-image"
//             />
//             <div className="student-overlay">
//               <div className="student-score">96%</div>
//               <div className="student-name">AYUSH RAI</div>
//             </div>
//           </div>
//           <div className="student-card" style={{ backgroundColor: "#e1e9fe;" }}>
//             <img
//               src="/assets/images/students/student3.png"
//               alt="Student Roshan Chhetri"
//               className="student-image"
//             />
//             <div className="student-overlay">
//               <div className="student-score">96%</div>
//               <div className="student-name">ROSHAN CHHETRI</div>
//             </div>
//           </div>
//           <div className="student-card" style={{ backgroundColor: "#ebf5d5;" }}>
//             <img
//               src="/assets/images/students/student4.png"
//               alt="Student Anshika Raj"
//               className="student-image"
//             />
//             <div className="student-overlay">
//               <div className="student-score">96.4%</div>
//               <div className="student-name">Anshika Raj</div>
//             </div>
//           </div>
//           <div className="student-card" style={{ backgroundColor: "#ffeed1" }}>
//             <img
//               src="/assets/images/students/student1.png"
//               alt="Student Ashwani Singh"
//               className="student-image"
//             />
//             <div className="student-overlay">
//               <div className="student-score">95.8%</div>
//               <div className="student-name">ASHWANI SINGH</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
















"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Autoplay, FreeMode } from "swiper/modules";

export default function StudentSuccess() {
  const students = [
    {
      name: "ARPIT YADAV",
      score: "96.2%",
      img: "/assets/images/students/student1.png",
      bg: "#ffeed1",
    },
    {
      name: "AYUSH RAI",
      score: "96%",
      img: "/assets/images/students/student2.png",
      bg: "#f3efd0",
    },
    {
      name: "ROSHAN CHHETRI",
      score: "96%",
      img: "/assets/images/students/student3.png",
      bg: "#e1e9fe",
    },
    {
      name: "ANSHIKA RAJ",
      score: "96.4%",
      img: "/assets/images/students/student4.png",
      bg: "#ebf5d5",
    },
    {
      name: "ASHWANI SINGH",
      score: "95.8%",
      img: "/assets/images/students/student1.png",
      bg: "#ffeed1",
    },
  ];

  return (
    <section className="students-section ">
      <div className="container">
        <Swiper
          modules={[Autoplay, FreeMode]}
          freeMode={true}
          loop={true}
          speed={6000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          slidesPerView={5}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1.5 },
            576: { slidesPerView: 2.5 },
            992: { slidesPerView: 5 },
          }}
          allowTouchMove={false}
          className="students-swiper"
        >
          {[...students, ...students].map((student, index) => (
            <SwiperSlide key={index}>
              <div
                className="student-card"
             
              >
                <img
                  src={student.img}
                  alt={student.name}
                  className="student-image"
                 
                />
                <div className="student-overlay">
                  <div className="student-score ">
                    {student.score}
                  </div>
                  <div className="student-name">
                    {student.name}
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
