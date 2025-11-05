
// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-fade";

// export default function HeroMobile() {
//   const slides = [
//     {
//       image: "/assets/images/hero/hero1.jpg",
//       title: (
//         <>
//           <span className="highlight">Best NIOS Board Coaching</span> <br/>

//           <span className="brand">in India</span>
//         </>
//       ),
//       buttonText: "Get Admission",
//     },
//     {
//       image: "/assets/images/hero/hero1.jpg",
//       title: (
//         <>
//           <span className="highlight">Pass 10th & 12th</span><br/>

//           <span className="brand">in Same Year</span>
//         </>
//       ),
//       buttonText: "Apply Now",
//     },
//     {
//       image: "/assets/images/hero/hero1.jpg",
//       title: (
//         <>
//           <span className="highlight">Failed in 9th or 11th?</span>

//           <span className="brand">Get Admission</span>
//         </>
//       ),
//       buttonText: "Join Today",
//     },
//   ];

//   return (
//     <section className="hero-section desktop-none">
//       <Swiper
//         modules={[Autoplay, EffectFade]}
//         effect="fade"
//         loop={true}
//         autoplay={{ delay: 3500, disableOnInteraction: false }}
//         className="hero-swiper"
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div
//               className="hero-slide"
//               style={{ backgroundImage: `url(${slide.image})` }}
//             >
//               <div className="overlay"></div>
//               <div className="container">
//                 <div className="hero-content">
//                   <h1 className="hero-title fade-text">{slide.title}</h1>
//                   <a href="#" className="cta-button fade-text">
//                     {slide.buttonText}
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <div className="chip-container">
//         <div className="chip-item">
//           <img
//             src="/assets/images/home/mob-arrow.svg"
//             alt="SS Coacning pass 10th & 12th"
//           ></img>{" "}
//           Pass 10th & 12th in same year
//         </div>
//         <div className="chip-item">
//           <img
//              src="/assets/images/home/mob-arrow.svg"
//             alt="SS Coacning pass 10th & 12th"
//           ></img>
//           Failed in 9th & 11th, get admission in 10th & 12th
//         </div>
//         <div className="chip-item">
//           <img
//             src="/assets/images/home/mob-arrow.svg"
//             alt="SS Coacning pass 10th & 12th"
//           ></img>
//           Pass 10th & 12th in 45 Days
//         </div>
//       </div>

//       <style jsx>{`
//         .hero-section {
//           position: relative;
//           width: 100%;
//           overflow: hidden;
//         }

//         .hero-slide {
//           width: 100%;
//           height: 100%;
//           background-size: cover;
//           background-position: center;
//           position: relative;
//           display: flex;
//           align-items: center;
//           justify-content: center;
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
//           text-align: center;
//           // max-width: 800px;
//           margin: 0 auto;
//           animation: fadeUp 1s ease-in-out;
//         }

//         /* Fade-in animations */
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

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }

//         /* Swiper fade transition */
//         :global(.swiper-fade .swiper-slide) {
//           opacity: 0 !important;
//           // transition: opacity 1s ease-in-out !important;
//         }

//         :global(.swiper-fade .swiper-slide-active) {
//           opacity: 1 !important;
//         }
//       `}</style>
//     </section>
//   );
// }





"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function Hero() {
  return (
    <section className="hero-sections desktop-none">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="hero-swiper"
      >
        {/* ---------- Slide 1 (Left Aligned) ---------- */}
        <SwiperSlide>
          <div
            className="hero-slide text-white"
            style={{ backgroundImage: "url(/assets/images/home/mobile-slider.webp)" }}
          >
            <div className="overlay"></div>
            <div className="container position-relative">
              <div className="row align-items-center">
                <div className="col-md-6 hero-content text-start">
                  <h1 className="hero-title fade-text mb-4">
                    <span className="brand">
                      Best NIOS Board <br/>
                     
                    </span>
                     Coaching <b>in India</b>
                    
                  </h1>
                 
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ---------- Slide 2 (Right Aligned) ---------- */}
        <SwiperSlide className="second-slider-home">
          <div
            className="hero-slide text-white"
            style={{ backgroundImage: "url(/assets/images/home/mobile-slider2.webp)" }}
          >
            <div className="overlay"></div>
            <div className="container position-relative">
              <div className="row">
                  <div className="col-md-6">
                  
                </div>
                <div className="col-md-6 hero-content text-end">
                  <h1 className="hero-title fade-text mb-4">
                    <span className="brand">Pass 10th & 12th</span>
                    <span className="highlight">Easily in 45 Days</span>
                  </h1>
                  
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* ---------- Slide 3 (Left Aligned) ---------- */}
        <SwiperSlide>
          <div
            className="hero-slide text-white"
            style={{ backgroundImage: "url(/assets/images/home/mobile-slider3.webp)" }}
          >
            <div className="overlay"></div>
            <div className="container position-relative">
              <div className="row align-items-center">
                <div className="col-md-6 hero-content text-start">
                  <h1 className="hero-title fade-text mb-4">
                    <span className="brand">Best NIOS Board</span>
                    <span className="highlight">Coaching in India</span>
                  </h1>
                  
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .hero-swiper,
        .hero-slide {
          width: 100%;
          height: auto;
        }

        .hero-slide {
          background-size: cover;
          background-position: right;
          position: relative;
          display: flex;
          align-items: center;
        }

        .overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero-content {
            z-index: 2;
    color: #fff;
    max-width: fit-content;
    margin: auto;
    padding: 40px 0px 207px 0px;
    animation: 1s 
ease-in-out fadeUp;
    position: relative;

        }

    
      
        .brand {
          color: #fff;
          display: block;
        }

        .highlight {
          color: #fff;
          display: block;
        }

  

        /* Animations */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Swiper fade transition */
        :global(.swiper-fade .swiper-slide) {
          opacity: 0 !important;
          transition: opacity 1s ease-in-out !important;
        }

        :global(.swiper-fade .swiper-slide-active) {
          opacity: 1 !important;
        }

        @media (max-width: 768px) {
         


          .cta-button {
            margin-top: 10px;
          }
        }
      `}</style>

      <div className="hero-mobile-strip">
         <a href="#" className="cta-btn-2nd">GET ADMISSION</a>
      </div>
    </section>
  );
}
