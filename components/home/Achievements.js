// "use client";
// import React, { useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

// const videoSources = [
//   "/assets/instagram/video1.mp4",
//   "/assets/instagram/video8.mp4",
//   "/assets/instagram/video3.mp4",
//   "/assets/instagram/video4.mp4",
//   "/assets/instagram/video5.mp4",
//   "/assets/instagram/video6.mp4",
//   "/assets/instagram/video7.mp4",
//   "/assets/instagram/video8.mp4",
// ];

// export default function Instagram() {
//   const videoRefs = useRef([]);
//   const [unmutedIndex, setUnmutedIndex] = useState(null);

//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   const toggleMute = (index) => {
//     videoRefs.current.forEach((video, i) => {
//       if (video) {
//         if (i === index) {
//           video.muted = !video.muted;
//           setUnmutedIndex(video.muted ? null : i);
//         } else {
//           video.muted = true;
//         }
//       }
//     });
//   };

//   return (
//     <>
//       <section className="achievements-section instagram-section pb-80">
//         <div className="container">
//           <div className="achievements-header">
//             <h2 className="achievements-title">
//               Our students{" "}
//               <span className="highlight">achievements, and learning moments.</span>
//             </h2>
//             <div className="slider-controls">
//               <button ref={prevRef} className="slider-btn prev">
//                 <img src="/assets/icons/arrow-left-line.svg" alt="Previous" />
//               </button>
//               <button ref={nextRef} className="slider-btn next">
//                 <img src="/assets/icons/arrow-right-line.svg" alt="Next" />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="container">
//           <Swiper
//             spaceBetween={10}
//             loop={true}
//             slidesPerView={6}
//             breakpoints={{
//               240: { slidesPerView: 2.5, spaceBetween: 10, centeredSlides: true },
//               768: { slidesPerView: 3, spaceBetween: 10 },
//               1024: { slidesPerView: 6, spaceBetween: 10 },
//             }}
//             navigation={{
//               prevEl: prevRef.current,
//               nextEl: nextRef.current,
//             }}
//             onInit={(swiper) => {
//               // link the refs after Swiper initializes
//               swiper.params.navigation.prevEl = prevRef.current;
//               swiper.params.navigation.nextEl = nextRef.current;
//               swiper.navigation.init();
//               swiper.navigation.update();
//             }}
//             modules={[Autoplay, Navigation]}
//             className="swiper mySwiper4 pt-80"
//           >
//             {videoSources.map((src, index) => (
//               <SwiperSlide key={index} className="swiper-slide relative">
//                 <div className="video-container">
//                   <video
//                     ref={(el) => (videoRefs.current[index] = el)}
//                     src={src}
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                     className="video-element"
//                   />
//                   <button
//                     className="mute-toggle-button"
//                     onClick={() => toggleMute(index)}
//                   >
//                     {unmutedIndex === index ? <FaVolumeUp size={15} /> : <FaVolumeMute size={15} />}
//                   </button>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </section>

//       <style jsx>{`
//         .video-container {
//           position: relative;
//           width: 100%;
//           height: 100%;
//         }

//         .video-element {
//           width: 100%;
//           height: auto;
//           border-radius: 12px;
//         }

//         .mute-toggle-button {
//           position: absolute;
//           bottom: 19px;
//            right: 16px;
//           background-color: rgba(0, 0, 0, 0.6);
//           border: none;
//           color: white;
//           padding: 8px;
//           border-radius: 50%;
//           cursor: pointer;
//           transition: background 0.3s ease;
//           z-index: 10;
//           line-height: 0;
//         }

//         .mute-toggle-button:hover {
//           background-color: rgba(255, 255, 255, 0.2);
//         }
//       `}</style>
//     </>
//   );
// }




// "use client";
// import React, { useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

// const videoSources = [
//   "/assets/instagram/video1.mp4",
//   "/assets/instagram/video8.mp4",
//   "/assets/instagram/video3.mp4",
//   "/assets/instagram/video4.mp4",
//   "/assets/instagram/video5.mp4",
//   "/assets/instagram/video6.mp4",
//   "/assets/instagram/video7.mp4",
//   "/assets/instagram/video8.mp4",
  
// ];

// export default function Instagram() {
//   const videoRefs = useRef([]);
//   const [unmutedIndex, setUnmutedIndex] = useState(null);

//   const prevRef = useRef(null);
//   const nextRef = useRef(null);

//   const toggleMute = (index) => {
//     videoRefs.current.forEach((video, i) => {
//       if (!video) return;

//       if (i === index) {
//         video.muted = !video.muted;
//         setUnmutedIndex(video.muted ? null : i);
//       } else {
//         video.muted = true;
//       }
//     });
//   };

//   return (
//     <>
//       <section className="achievements-section instagram-section pb-80">
//         <div className="container">
//           <div className="achievements-header">
//             <h2 className="achievements-title">
//               Our students{" "}
//               <span className="highlight">
//                 achievements, and learning moments.
//               </span>
//             </h2>

//             <div className="slider-controls">
//               <button ref={prevRef} className="slider-btn prev">
//                 <img src="/assets/icons/arrow-left-line.svg" alt="Previous" />
//               </button>
//               <button ref={nextRef} className="slider-btn next">
//                 <img src="/assets/icons/arrow-right-line.svg" alt="Next" />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="container">
//           <Swiper
//             spaceBetween={10}
//             loop={true}
//             slidesPerView={6}
//             breakpoints={{
//               240: { slidesPerView: 2.5, spaceBetween: 10, centeredSlides: true },
//               768: { slidesPerView: 3, spaceBetween: 10 },
//               1024: { slidesPerView: 6, spaceBetween: 10 },
//             }}
//             navigation={{
//               prevEl: prevRef.current,
//               nextEl: nextRef.current,
//             }}
//             onInit={(swiper) => {
//               swiper.params.navigation.prevEl = prevRef.current;
//               swiper.params.navigation.nextEl = nextRef.current;
//               swiper.navigation.init();
//               swiper.navigation.update();
//             }}
//             modules={[Autoplay, Navigation]}
//             className="swiper mySwiper4 pt-80"
//           >
//             {videoSources.map((src, index) => (
//               <SwiperSlide key={index} className="swiper-slide relative">
//                 <div className="video-container">
//                   <video
//                     ref={(el) => (videoRefs.current[index] = el)}
//                     src={src}
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                     preload="metadata"
//                     loading="lazy"
//                     className="video-element"
//                   />

//                   <button
//                     className="mute-toggle-button"
//                     onClick={() => toggleMute(index)}
//                   >
//                     {unmutedIndex === index ? (
//                       <FaVolumeUp size={15} />
//                     ) : (
//                       <FaVolumeMute size={15} />
//                     )}
//                   </button>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </section>

//       {/* CSS unchanged */}
//       <style jsx>{`
//         .video-container {
//           position: relative;
//           width: 100%;
//           height: 100%;
//         }

//         .video-element {
//           width: 100%;
//           height: auto;
//           border-radius: 12px;
//         }

//         .mute-toggle-button {
//           position: absolute;
//           bottom: 19px;
//           right: 16px;
//           background-color: rgba(0, 0, 0, 0.6);
//           border: none;
//           color: white;
//           padding: 8px;
//           border-radius: 50%;
//           cursor: pointer;
//           transition: background 0.3s ease;
//           z-index: 10;
//           line-height: 0;
//         }

//         .mute-toggle-button:hover {
//           background-color: rgba(255, 255, 255, 0.2);
//         }
//       `}</style>
//     </>
//   );
// }




"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const videoSources = [
  { src: "/assets/instagram/video1.mp4", poster: "/assets/instagram/posters/video1.webp" },
  { src: "/assets/instagram/video8.mp4", poster: "/assets/instagram/posters/video8.webp" },
  { src: "/assets/instagram/video3.mp4", poster: "/assets/instagram/posters/video3.webp" },
  { src: "/assets/instagram/video4.mp4", poster: "/assets/instagram/posters/video4.webp" },
  { src: "/assets/instagram/video5.mp4", poster: "/assets/instagram/posters/video5.webp" },
  { src: "/assets/instagram/video6.mp4", poster: "/assets/instagram/posters/video6.webp" },
  { src: "/assets/instagram/video7.mp4", poster: "/assets/instagram/posters/video7.webp" },
  { src: "/assets/instagram/video8.mp4", poster: "/assets/instagram/posters/video8.webp" },
  { src: "/assets/instagram/video9.mp4", poster: "/assets/instagram/posters/video9.webp" },
  { src: "/assets/instagram/video10.mp4", poster: "/assets/instagram/posters/video10.webp" },
  { src: "/assets/instagram/video11.mp4", poster: "/assets/instagram/posters/video11.webp" },
  { src: "/assets/instagram/video12.mp4", poster: "/assets/instagram/posters/video12.webp" },

];

export default function Instagram() {
  const videoRefs = useRef([]);
  const [unmutedIndex, setUnmutedIndex] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const toggleMute = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;

      if (i === index) {
        video.muted = !video.muted;
        setUnmutedIndex(video.muted ? null : i);
      } else {
        video.muted = true;
      }
    });
  };

  return (
    <>
      <section className="achievements-section instagram-section pb-80">
        <div className="container">
          <div className="achievements-header">
            <h2 className="achievements-title">
              Our students{" "}
              <span className="highlight">
                achievements, and learning moments.
              </span>
            </h2>

            <div className="slider-controls">
              <button ref={prevRef} className="slider-btn prev">
                <img src="/assets/icons/arrow-left-line.svg" alt="Previous" />
              </button>
              <button ref={nextRef} className="slider-btn next">
                <img src="/assets/icons/arrow-right-line.svg" alt="Next" />
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          <Swiper
            spaceBetween={10}
            loop={true}
            slidesPerView={6}
            breakpoints={{
              240: { slidesPerView: 2.5, spaceBetween: 10, centeredSlides: true },
              768: { slidesPerView: 3, spaceBetween: 10 },
              1024: { slidesPerView: 6, spaceBetween: 10 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            modules={[Autoplay, Navigation]}
            className="swiper mySwiper4 pt-80"
          >
            {videoSources.map((item, index) => (
              <SwiperSlide key={index} className="swiper-slide relative">
                <div className="video-container">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={item.src}
                    poster={item.poster}          // ✅ prevents blank
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"            // ✅ keeps autoplay smooth
                    fetchpriority="low"           // ✅ reduces network pressure
                    className="video-element"
                  />

                  <button
                    className="mute-toggle-button"
                    onClick={() => toggleMute(index)}
                  >
                    {unmutedIndex === index ? (
                      <FaVolumeUp size={15} />
                    ) : (
                      <FaVolumeMute size={15} />
                    )}
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CSS unchanged */}
      <style jsx>{`
        .video-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .video-element {
          width: 100%;
          height: auto;
          border-radius: 12px;
        }

        .mute-toggle-button {
          position: absolute;
          bottom: 19px;
          right: 16px;
          background-color: rgba(0, 0, 0, 0.6);
          border: none;
          color: white;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s ease;
          z-index: 10;
          line-height: 0;
        }

        .mute-toggle-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}
