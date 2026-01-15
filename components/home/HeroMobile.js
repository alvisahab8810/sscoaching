



// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";

// export default function Hero() {
//   return (
//     <section className="hero-sections desktop-none">
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
//             style={{ backgroundImage: "url(/assets/images/home/mobile-slider.webp)" }}
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
                 
//                 </div>
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>

//         {/* ---------- Slide 2 (Right Aligned) ---------- */}
//         <SwiperSlide className="second-slider-home">
//           <div
//             className="hero-slide text-white"
//             style={{ backgroundImage: "url(/assets/images/home/mobile-slider2.webp)" }}
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
                  
//                 </div>
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>

//         {/* ---------- Slide 3 (Left Aligned) ---------- */}
//         <SwiperSlide>
//           <div
//             className="hero-slide text-white"
//             style={{ backgroundImage: "url(/assets/images/home/mobile-slider3.webp)" }}
//           >
//             <div className="overlay"></div>
//             <div className="container position-relative">
//               <div className="row align-items-center">
//                 <div className="col-md-6 hero-content text-start">
//                   <h1 className="hero-title fade-text mb-4">
//                     <span className="brand">Best NIOS Board</span>
//                     <span className="highlight">Coaching in India</span>
//                   </h1>
                  
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
//           height: auto;
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
//             z-index: 2;
//     color: #fff;
//     max-width: fit-content;
//     margin: auto;
//     padding: 40px 0px 207px 0px;
//     animation: 1s 
// ease-in-out fadeUp;
//     position: relative;

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

//       <div className="hero-mobile-strip">
//          <a href="#" className="cta-btn-2nd">GET ADMISSION</a>
//       </div>
//     </section>
//   );
// }



"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Hero() {
  return (
    <section className="hero-wrapper desktop-none">
      <Swiper
        slidesPerView={1}
        allowTouchMove={false}   // ❌ no swipe
        loop={false}             // ❌ no loop
      >
        {/* SINGLE SLIDE ONLY */}
        <SwiperSlide>
          <div className="container">
            <div className="hero-card">
              <div className="hero-left">
                <h1>
                  India’s Most<br/> Trusted
                 NIOS  <br /> Coaching
                </h1>
                <p>Helping students since 2001</p>
              </div>

              <div className="hero-right">
                <img
                  src="/assets/images/home/mobile-hero.svg"
                  alt="NIOS Coaching"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
