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
import { Autoplay, FreeMode } from "swiper/modules";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=in.sscoaching.app";

// Each banner is a single flat image, so the whole card is the link target.
// That keeps the in-image button clickable without hard-coding hotspot
// coordinates that would drift the moment a banner is re-exported.
const BANNERS = [
  {
    src: "/assets/images/home/b1.webp",
    href: PLAY_STORE_URL,
    external: true,
    alt: "Join 1 Lakh+ students on the SS Coaching app for NIOS 10th and 12th online courses",
    title: "Join 1 Lakh+ Students On SS Coaching App Today",
  },
  {
    src: "/assets/images/home/b2.webp",
    href: "/nios-admission",
    external: false,
    alt: "SS Coaching faculty team offering expert support for NIOS students in Lucknow",
    title: "NIOS Experts Committed for Student Success",
  },
  {
    src: "/assets/images/home/b3.webp",
    href: PLAY_STORE_URL,
    external: true,
    alt: "Watch a free demo class with SS Coaching expert teachers",
    title: "Watch Free Demo - 25+ Years of Experience with Expert Teachers",
  },
];

// Swiper needs more slides than it shows for a seamless loop; with only three
// banners the duplicated set keeps every snap at "two full cards + a peek".
const SLIDES = [...BANNERS, ...BANNERS];

export default function Hero() {
  return (
    <section className="hero-desktop-section">
      <section className="hero-wrapper mobile-none">
        {/* full-bleed on purpose: a marquee that stops at the container edge
            looks like a chopped card instead of a moving strip */}
        <div className="container hero-peek-container">
          {/* delay 0 + a long speed turns the step-by-step slide into one
              continuous marquee-style drift; the linear timing function is set
              in the CSS below, otherwise every cycle eases in and out */}
          <Swiper
            className="hero-peek-swiper"
            slidesPerView={2.5}
            spaceBetween={20}
            /* on a tablet two and a half banners shrink to the point where
               the text inside them is unreadable, so fewer are shown */
            breakpoints={{
              768: { slidesPerView: 1.6, spaceBetween: 16 },
              1025: { slidesPerView: 2.1, spaceBetween: 18 },
              1241: { slidesPerView: 2.5, spaceBetween: 20 },
            }}
            slidesPerGroup={1}
            loop={true}
            loopAdditionalSlides={3}
            allowTouchMove={true}
            speed={6000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            freeMode={{ enabled: true, momentum: false }}
            modules={[Autoplay, FreeMode]}
          >
            {SLIDES.map((banner, index) => (
              <SwiperSlide key={`${banner.src}-${index}`}>
                <a
                  className="hero-peek-card"
                  href={banner.href}
                  {...(banner.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <img src={banner.src} alt={banner.alt} title={banner.title} />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <style jsx global>{`
        /* .container is capped at 1368px with !important globally, so the
           override has to shout back to let the strip reach both edges */
        .hero-wrapper .hero-peek-container {
          max-width: 100% !important;
          width: 100%;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin: 0;
        }

        .hero-peek-swiper {
          /* keeps the strip inside the container, so each snap shows exactly
             two full banners plus the peek of the next one */
          overflow: hidden;
        }

        .hero-peek-swiper .swiper-wrapper {
          align-items: stretch;
          /* constant speed, no easing at the start and end of each cycle */
          transition-timing-function: linear !important;
        }

        .hero-peek-card {
          display: block;
          border-radius: 16px;
          overflow: hidden;
          line-height: 0;
        }

        .hero-peek-card img {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>
    </section>
  );
}
