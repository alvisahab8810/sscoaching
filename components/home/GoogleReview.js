"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Loop } from "swiper/modules";
// import "swiper/css";

export default function GoogleReview() {
  return (
    <section className="reviews-section">
      <div className="container">
        <h2 className="section-title">
          Google <span className="highlight">Reviews</span>
        </h2>

        <div className="reviews-container">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={4.2}
              breakpoints={{
              240: { slidesPerView: 1.2, spaceBetween: 10, centeredSlides: true },
              768: { slidesPerView: 3, spaceBetween: 10 },
              1024: { slidesPerView: 3, spaceBetween: 10 },
            }}
            grabCursor={true}
            
            centeredSlides={true}
            loop={true}
            speed={3000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            freeMode={true}
            allowTouchMove={false}
          >

            {/* Review 1 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/g-review1.png"
                    alt="Chloe Patterson"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>Krislay Saini</h4>
                    <p>2 months ago</p>
                  </div>
                  <img
                    src="/assets/images/g-reviews/google.svg"
                    alt="Google Icon"
                    className="google-icon"
                  />
                </div>
                <div className="rating-stars">
                  <img src="/assets/images/g-reviews/rating.svg" alt="SS Coaching 5 star by Students"></img>
                </div>
                <p className="review-text">
                  I wanted to get 12th passed with nios same year and ss coaching guided me perfectly the teachers are patientbamd the process was smooth .
                </p>
              </div>
            </SwiperSlide>

            {/* Review 2 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/g-review1.png"
                    alt="Chloe Patterson"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>Kazmi Mirza</h4>
                    <p>a month ago</p>
                  </div>
                  <img
                    src="/assets/images/g-reviews/google.svg"
                    alt="Google Icon"
                    className="google-icon"
                  />
                </div>
                <div className="rating-stars">
                  <img src="/assets/images/g-reviews/rating.svg" alt="SS Coaching 5 star by Students"></img>
                </div>
                <p className="review-text">
                 Ss coaching is the best choice for students seeking genuine guidence . I joined for contact for nios helpline , and their response was quick 
                </p>
              </div>
            </SwiperSlide>

            {/* Review 3 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/g-review2.png"
                    alt="Chloe Patterson"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>Gauransh Mahendra</h4>
                    <p>a week ago</p>
                  </div>
                  <img
                    src="/assets/images/g-reviews/google.svg"
                    alt="Google Icon"
                    className="google-icon"
                  />
                </div>
                <div className="rating-stars">
                 
                  <img src="/assets/images/g-reviews/rating.svg" alt="SS Coaching 5 star by Students"></img>
                 
                </div>
                <p className="review-text">
                  Ss coaching nios admission in hazratganj lucknow is the most trusted place for students who want expert guidance smooth admission process.
                </p>
              </div>
            </SwiperSlide>

            {/* Review 4 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/g-review4.png"
                    alt="Ethan Clark"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>AR Rehman</h4>
                    <p>5 months ago</p>
                  </div>
           
                </div>
                <div className="rating-stars">
                  <img src="/assets/images/g-reviews/rating.svg" alt="SS Coaching 5 stars by Students"></img>
                </div>
                <p className="review-text">
                 I joined ss coaching after hearing about their reputation for having the best nios teachers in hazratganj Lucknow.
                </p>
              </div>
            </SwiperSlide>


              {/* Review 1 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/g-review1.png"
                    alt="Chloe Patterson"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>KR Ramesh</h4>
                    <p>3 months ago</p>
                  </div>
                  <img
                    src="/assets/images/g-reviews/google.svg"
                    alt="Google Icon"
                    className="google-icon"
                  />
                </div>
                <div className="rating-stars">
                  <img src="/assets/images/g-reviews/rating.svg" alt="SS Coaching 5 star by Students"></img>
                </div>
                <p className="review-text">
                   The ss coaching centre has been noted for following social distancing norms, providing a safe learning environment for nios students in lucknow.
                </p>
              </div>
            </SwiperSlide>

            {/* Review 2 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/g-review5.png"
                    alt="Chloe Patterson"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>Yuvraj Singh Bagga</h4>
                    <p>5 Months ago</p>
                  </div>
                  <img
                    src="/assets/images/g-reviews/google.svg"
                    alt="Google Icon"
                    className="google-icon"
                  />
                </div>
                <div className="rating-stars">
                  <img src="/assets/images/g-reviews/rating.svg" alt="SS Coaching 5 star by Students"></img>
                </div>
                <p className="review-text">
                   I was struggling after falling my board exams, but SS coaching’s support and excellent coaching at their Nios centre in Hazratganj.
                </p>
              </div>
            </SwiperSlide>

            {/* Review 3 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/g-review6.png"
                    alt="Chloe Patterson"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>Sudha Singh</h4>
                    <p>3 months ago</p>
                  </div>
                  <img
                    src="/assets/images/g-reviews/google.svg"
                    alt="Google Icon"
                    className="google-icon"
                  />
                </div>
                <div className="rating-stars">
                 
                  <img src="/assets/images/g-reviews/rating.svg" alt="SS Coaching 5 star by Students"></img>
                 
                </div>
                <p className="review-text">
                  Ss coaching boosts a strong track record of helping students, including those who previously failed, achieve excellent results in nios exam in lucknow
                </p>
              </div>
            </SwiperSlide>

            {/* Review 4 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/g-review7.png"
                    alt="Ethan Clark"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>Zen</h4>
                    <p>3 months ago</p>
                  </div>
           
                </div>
                <div className="rating-stars">
                  <img src="/assets/images/g-reviews/rating.svg" alt="SS Coaching 5 stars by Students"></img>
                </div>
                <p className="review-text">
                 As one of the oldest nios centres in lucknow since 2001, ss coaching has built a legacy of excellence in providing nios services.
                </p>
              </div>
            </SwiperSlide>


           
          </Swiper>
        </div>
      </div>
    </section>
  );
}












// "use client";
// import React, { useRef, useState, useEffect } from "react";

// export default function GoogleReview() {
//   const scrollerRef = useRef(null);
//   const [peek, setPeek] = useState(true);

//   const reviews = [
//     {
//       name: "Chloe Patterson",
//       date: "May 5, 2023",
//       text: "Great quality and attention to detail. Their designs elevated my brand. I just wish they had a more flexible payment plan for small businesses.",
//     },
//     {
//       name: "Ethan Clark",
//       date: "April 10, 2023",
//       text: "They are skilled professionals, and the service was decent. However, their pricing structure is confusing, and we had some unexpected charges.",
//     },
//     {
//       name: "Chloe Patterson",
//       date: "May 5, 2023",
//       text: "Great quality and attention to detail. Their designs elevated my brand. I just wish they had a more flexible payment plan for small businesses.",
//     },
//     {
//       name: "Ethan Clark",
//       date: "April 10, 2023",
//       text: "They are skilled professionals, and the service was decent. However, their pricing structure is confusing, and we had some unexpected charges.",
//     },
//   ];

//   // Remove peek on first user interaction
//   useEffect(() => {
//     const scroller = scrollerRef.current;
//     const handleUserScroll = () => peek && setPeek(false);

//     scroller.addEventListener("wheel", handleUserScroll);
//     scroller.addEventListener("touchstart", handleUserScroll);
//     scroller.addEventListener("scroll", handleUserScroll);

//     return () => {
//       scroller.removeEventListener("wheel", handleUserScroll);
//       scroller.removeEventListener("touchstart", handleUserScroll);
//       scroller.removeEventListener("scroll", handleUserScroll);
//     };
//   }, [peek]);

//   // Scroll exactly by one card width
//   const scrollByCard = (direction = "right") => {
//     const scroller = scrollerRef.current;
//     if (!scroller) return;

//     const card = scroller.querySelector(".review-card");
//     if (!card) return;

//     const style = window.getComputedStyle(card);
//     const cardWidth = card.offsetWidth;
//     const gap = parseInt(style.marginRight || 20, 10);
//     const scrollAmount = cardWidth + gap;

//     // Calculate target scrollLeft
//     const targetScroll = direction === "right" ? scroller.scrollLeft + scrollAmount : scroller.scrollLeft - scrollAmount;

//     scroller.scrollTo({
//       left: targetScroll,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section className="reviews-section" style={{ padding: "2rem 0", position: "relative" }}>
//       <div className="mini-container" style={{ overflow: "hidden" }}>
//         <h2 className="section-title" style={{ marginBottom: "1rem" }}>
//           Google <span className="highlight">Reviews</span>
//         </h2>

//         {/* Navigation buttons */}
//         <button
//           onClick={() => scrollByCard("left")}
//           style={{
//             position: "absolute",
//             left: 0,
//             top: "50%",
//             transform: "translateY(-50%)",
//             zIndex: 10,
//             background: "#fff",
//             border: "1px solid #ccc",
//             borderRadius: "50%",
//             width: "36px",
//             height: "36px",
//             cursor: "pointer",
//           }}
//         >
//           &#10094;
//         </button>
//         <button
//           onClick={() => scrollByCard("right")}
//           style={{
//             position: "absolute",
//             right: 0,
//             top: "50%",
//             transform: "translateY(-50%)",
//             zIndex: 10,
//             background: "#fff",
//             border: "1px solid #ccc",
//             borderRadius: "50%",
//             width: "36px",
//             height: "36px",
//             cursor: "pointer",
//           }}
//         >
//           &#10095;
//         </button>

//         <div
//           ref={scrollerRef}
//           className="reviews-scroller-wrapper"
//           style={{
//             display: "flex",
//             overflowX: "auto",
//             scrollBehavior: "smooth",
//             paddingLeft: peek ? "20%" : "0",
//             gap: "20px",
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//           }}
//         >
//           <style jsx>{`
//             .reviews-scroller-wrapper::-webkit-scrollbar {
//               display: none;
//             }
//           `}</style>

//           {reviews.map((rev, idx) => (
//             <div
//               key={idx}
//               className="review-card"
//               style={{
//                 flex: "0 0 auto",
//                 width: "280px",
//                 marginRight: "20px",
//                 padding: "1rem",
//                 borderRadius: "8px",
//                 background: "#fff",
//                 boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//               }}
//             >
//               <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "0.5rem" }}>
//                 <img
//                   src="/assets/images/g-reviews/user.svg"
//                   alt={rev.name}
//                   style={{ width: "40px", height: "40px", borderRadius: "50%" }}
//                 />
//                 <div>
//                   <h4 style={{ margin: 0, fontSize: "0.9rem" }}>{rev.name}</h4>
//                   <p style={{ margin: 0, fontSize: "0.75rem", color: "#666" }}>{rev.date}</p>
//                 </div>
//                 <img
//                   src="/assets/images/g-reviews/google.svg"
//                   alt="Google Icon"
//                   style={{ width: "16px", height: "16px", marginLeft: "auto" }}
//                 />
//               </div>
//               <div style={{ marginBottom: "0.5rem" }}>
//                 <img src="/assets/images/g-reviews/rating.svg" alt="5 stars" style={{ width: "100px" }} />
//               </div>
//               <p style={{ fontSize: "0.8rem", color: "#333" }}>{rev.text}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
