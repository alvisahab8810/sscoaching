// import React from "react";

// export default function HeroMobile() {
//   return (
//     <section className="hero-mobile-area desktop-none">
//       <div className="hero-mobile">
//         <div className="hero-container">
//           <img
//             src="/assets/images/home/hero-mobile.png"
//             alt="Student"
//             className="hero-image"
//           />

//           <div className="hero-overlay">
//             <ChecklistItem text="Pass 10th & 12th in same year" />
//             <ChecklistItem text="Pass 10th & 12th in 45 Days" />
//             <ChecklistItem text="Failed in 9th & 11th, get admission in 10th & 12th" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function ChecklistItem({ text }) {
//   return (
//     <div className="checklist-item">
//       <img
//         src="/assets/images/home/check.svg"
//         alt="check"
//         className="check-icon"
//       />
//       <span className="check-text">{text}</span>
//     </div>
//   );
// }

"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function HeroMobile() {
  const slides = [
    {
      image: "/assets/images/hero/hero1.jpg",
      title: (
        <>
          <span className="highlight">Best NIOS Board Coaching</span> <br/>

          <span className="brand">in India</span>
        </>
      ),
      buttonText: "Get Admission",
    },
    {
      image: "/assets/images/hero/hero1.jpg",
      title: (
        <>
          <span className="highlight">Pass 10th & 12th</span><br/>

          <span className="brand">in Same Year</span>
        </>
      ),
      buttonText: "Apply Now",
    },
    {
      image: "/assets/images/hero/hero1.jpg",
      title: (
        <>
          <span className="highlight">Failed in 9th or 11th?</span>

          <span className="brand">Get Admission</span>
        </>
      ),
      buttonText: "Join Today",
    },
  ];

  return (
    <section className="hero-section desktop-none">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="overlay"></div>
              <div className="container">
                <div className="hero-content">
                  <h1 className="hero-title fade-text">{slide.title}</h1>
                  <a href="#" className="cta-button fade-text">
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="chip-container">
        <div className="chip-item">
          <img
            src="/assets/images/home/mob-arrow.svg"
            alt="SS Coacning pass 10th & 12th"
          ></img>{" "}
          Pass 10th & 12th in same year
        </div>
        <div className="chip-item">
          <img
             src="/assets/images/home/mob-arrow.svg"
            alt="SS Coacning pass 10th & 12th"
          ></img>
          Failed in 9th & 11th, get admission in 10th & 12th
        </div>
        <div className="chip-item">
          <img
            src="/assets/images/home/mob-arrow.svg"
            alt="SS Coacning pass 10th & 12th"
          ></img>
          Pass 10th & 12th in 45 Days
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .hero-slide {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          color: #fff;
          text-align: center;
          // max-width: 800px;
          margin: 0 auto;
          animation: fadeUp 1s ease-in-out;
        }

        /* Fade-in animations */
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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Swiper fade transition */
        :global(.swiper-fade .swiper-slide) {
          opacity: 0 !important;
          // transition: opacity 1s ease-in-out !important;
        }

        :global(.swiper-fade .swiper-slide-active) {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
