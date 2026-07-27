// // "use client";
// // import React from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Autoplay, EffectFade } from "swiper/modules";
// // import "swiper/css";
// // import "swiper/css/effect-fade";

// // export default function Hero() {
// //   const slides = [
// //     {
// //       image: "/assets/images/hero1.png",
// //       title: (
// //         <>
// //           <span className="brand">Best NIOS Board <br/> Coaching </span>

// //           <span className="highlight">in India</span>
// //         </>
// //       ),
// //       buttonText: "Get Admission",
// //     },
// //     {
// //       image: "/assets/images/hero2.png",
// //       title: (
// //         <>
// //           <span className="brand">Pass 10th & 12th</span>

// //           <span className="highlight">in Same Year</span>
// //         </>
// //       ),
// //       buttonText: "Apply Now",
// //     },
// //     {
// //       image: "/assets/images/hero3.png",
// //       title: (
// //         <>
// //           <span className="brand">Failed in 9th or 11th?</span>

// //           <span className="highlight">Get  Admission</span>
// //         </>
// //       ),
// //       buttonText: "Join Today",
// //     },
// //   ];

// //   return (
// //     <section className="hero-section mobile-none">
// //       <Swiper
// //         modules={[Autoplay, EffectFade]}
// //         // effect="fade"
// //         loop={true}
// //         // autoplay={{ delay: 3500, disableOnInteraction: false }}
// //         className="hero-swiper"
// //       >
// //         {slides.map((slide, index) => (
// //           <SwiperSlide key={index}>
// //             <div
// //               className="hero-slide"
// //               style={{ backgroundImage: `url(${slide.image})` }}
// //             >
// //               <div className="overlay"></div>
// //               <div className="container">
// //                 <div className="hero-content">
// //                   <h1 className="hero-title fade-text">{slide.title}</h1>
// //                   <a href="#" className="cta-button fade-text">
// //                     {slide.buttonText}
// //                   </a>
// //                 </div>
// //               </div>
// //             </div>
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>

// //       <style jsx>{`
// //         .hero-section {
// //           position: relative;
// //           width: 100%;
// //           overflow: hidden;
// //         }

// //         .hero-slide {
// //           width: 100%;
// //           height: 475px;
// //           background-size: cover;
// //           background-position: right;
// //           position: relative;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //         }

// //         .overlay {
// //           position: absolute;
// //           inset: 0;
// //           z-index: 1;
// //         }

// //         .hero-content {
// //           position: relative;
// //           z-index: 2;
// //           color: #fff;
// //           text-align: center;
// //           max-width: fit-content;
// //           // margin: 0 auto;
// //           animation: fadeUp 1s ease-in-out;
// //          padding: 158px 0px;
// //         }

// //         /* Fade-in animations */
// //         @keyframes fadeUp {
// //           from {
// //             opacity: 0;
// //             transform: translateY(20px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }

// //         @keyframes fadeIn {
// //           from {
// //             opacity: 0;
// //           }
// //           to {
// //             opacity: 1;
// //           }
// //         }

// //         /* Swiper fade transition */
// //         :global(.swiper-fade .swiper-slide) {
// //           opacity: 0 !important;
// //           // transition: opacity 1s ease-in-out !important;
// //         }

// //         :global(.swiper-fade .swiper-slide-active) {
// //           opacity: 1 !important;
// //         }
// //       `}</style>
// //     </section>
// //   );
// // }

// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";

// export default function Hero() {
//   return (
//     <section className="hero-section mobile-none">
//       <Swiper
//         modules={[Autoplay, EffectFade]}
//         effect="fade"
//         loop={true}
//         autoplay={{ delay: 4000, disableOnInteraction: false }}
//         className="hero-swiper"
//       >
//         {/* ---------- Slide 1 (Left Aligned) ---------- */}
//         <SwiperSlide>
//           <div
//             className="hero-slide text-white"
//             style={{ backgroundImage: "url(/assets/images/hero1.png)" }}
//           >
//             <div className="overlay"></div>
//             <div className="container position-relative">
//               <div className="row align-items-center">
//                 <div className="col-md-6 hero-content text-start">
//                   <h1 className="hero-title fade-text mb-4">
//                     <span className="brand">
//                       Best NIOS Board <br/>

//                     </span>
//                      Coaching <b>in India</b>

//                   </h1>
//                   <a href="#" className="cta-button  cta-btn fade-text">
//                     Get Admission
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>

//         {/* ---------- Slide 2 (Right Aligned) ---------- */}
//         <SwiperSlide className="second-slider-home">
//           <div
//             className="hero-slide text-white"
//             style={{ backgroundImage: "url(/assets/images/hero2.png)" }}
//           >
//             <div className="overlay"></div>
//             <div className="container position-relative">
//               <div className="row">
//                   <div className="col-md-6">

//                 </div>
//                 <div className="col-md-6 hero-content text-end">
//                   <h1 className="hero-title fade-text mb-4">
//                     <span className="brand">Pass 10th & 12th</span>
//                     <span className="highlight">Easily in 45 Days</span>
//                   </h1>
//                   <a href="#" className="cta-button fade-text cta-btn">
//                     Via NIOS Board
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>

//         {/* ---------- Slide 3 (Left Aligned) ---------- */}
//         <SwiperSlide>
//           <div
//             className="hero-slide text-white"
//             style={{ backgroundImage: "url(/assets/images/hero3.png)" }}
//           >
//             <div className="overlay"></div>
//             <div className="container position-relative">
//               <div className="row align-items-center">
//                 <div className="col-md-6 hero-content text-start">
//                   <h1 className="hero-title fade-text mb-4">
//                     <span className="brand">Best NIOS Board</span>
//                     <span className="highlight">Coaching in India</span>
//                   </h1>
//                   <a href="#" className="cta-button fade-text cta-btn">
//                     Get Admission
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>
//       </Swiper>

//       <style jsx>{`
//         .hero-section {
//           position: relative;
//           width: 100%;
//           overflow: hidden;
//         }

//         .hero-swiper,
//         .hero-slide {
//           width: 100%;
//           height: 475px;
//         }

//         .hero-slide {
//           background-size: cover;
//           background-position: right;
//           position: relative;
//           display: flex;
//           align-items: center;
//         }

//         .overlay {
//           position: absolute;
//           inset: 0;
//           z-index: 1;
//         }

//         .hero-content {
//           position: relative;
//           z-index: 2;
//           color: #fff;
//           max-width: fit-content;
//           animation: fadeUp 1s ease-in-out;
//           padding: 158px 0px;
//         }

//         .brand {
//           color: #fff;
//           display: block;
//         }

//         .highlight {
//           color: #fff;
//           display: block;
//         }

//         /* Animations */
//         @keyframes fadeUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         /* Swiper fade transition */
//         :global(.swiper-fade .swiper-slide) {
//           opacity: 0 !important;
//           transition: opacity 1s ease-in-out !important;
//         }

//         :global(.swiper-fade .swiper-slide-active) {
//           opacity: 1 !important;
//         }

//         @media (max-width: 768px) {

//           .cta-button {
//             margin-top: 10px;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }

// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";

// export default function Hero() {
//   return (
//     <section className="hero-wrapper mobile-none">
//       <Swiper
//         modules={[Autoplay]}
//         // effect="fade"
//         loop
//         // autoplay={{ delay: 4000, disableOnInteraction: false }}
//       >
//         {[1, 2, 3].map((_, index) => (
//           <SwiperSlide key={index}>
//             <div className="container">
//               <div className="hero-card">
//               <div className="hero-left">
//                 <h1>
//                   India’s Most Trusted <br />
//                   <span>NIOS Coaching</span>
//                 </h1>
//                 <p>Helping students since 2001</p>
//               </div>

//               <div className="hero-right">
//                 <img
//                   src="/assets/images/home/personal.png"
//                   alt="NIOS Coaching"
//                 />
//               </div>
//             </div>
//             </div>
//           </SwiperSlide>

//         ))}
//       </Swiper>

//     </section>
//   );
// }

"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function Hero() {
  return (
    <section className="hero-desktop-section">
          <section className="hero-wrapper mobile-none">
      <div className="container">
          <Swiper
          slidesPerView={1}
          loop={true}                 // ✅ infinite loop
          allowTouchMove={true}       // ✅ swipe enabled
          autoplay={{
            delay: 3000,              // ⏱️ 3 seconds
            disableOnInteraction: false, // ✅ keeps autoplay after swipe
          }}
          modules={[Autoplay]}        // ✅ IMPORTANT
        >


          <SwiperSlide>
              <a href="/student/login">
            <div className="hero-card3"></div>
            </a>
          </SwiperSlide>

             <SwiperSlide>
           <div
  className="hero-card2"
  title="NIOS Experts Committed to Student Success | SS Coaching Lucknow"
  aria-label="SS Coaching faculty team offering expert support for NIOS students in Lucknow"
></div>
          </SwiperSlide>
          <SwiperSlide>
              <div
    className="hero-card1"
    title="A Moment of Honour and Recognition in Lucknow"
    aria-label="Honouring education excellence with chief guest Dr Jawaid Alam Khan in Lucknow"
  ></div>
          </SwiperSlide>
          {/* SINGLE SLIDE ONLY */}
          <SwiperSlide>
            <div className="hero-card">
              <div className="hero-left">
                {/* <h1>
                  India’s Most Trusted <br />
                  <span>NIOS Coaching</span>
                </h1> */}

                 <h1>
                  Lucknow’s Best <br />
                  <span>NIOS Coaching</span>
                </h1>
                <p>Helping students since 2001</p>
              </div>

              <div className="hero-right">
                <img
                  src="/assets/images/home/personal.png"
                   alt="SS Coaching providing NIOS education support in Lucknow since 2001"
                  title="Lucknow’s Best NIOS Coaching Helping Students Since 2001"
                  priority
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="hero-card1"></div>
          </SwiperSlide>
          {/* SINGLE SLIDE ONLY */}
          <SwiperSlide>
            <div className="hero-card">
              <div className="hero-left">
                <h1>
                  India’s Most Trusted <br />
                  <span>NIOS Coaching</span>
                </h1>
                <p>Helping students since 2001</p>
              </div>

              <div className="hero-right">
                <img
                  src="/assets/images/home/personal.png"
                   alt="SS Coaching providing NIOS education support in Lucknow since 2001"
                   title="Lucknow’s Best NIOS Coaching Helping Students Since 2001"
                  priority
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
    </section>
  );
}
