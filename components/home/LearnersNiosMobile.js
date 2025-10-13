"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Loop } from "swiper/modules";
// import "swiper/css";

export default function LearnersNiosMobile() {
  return (
    <section className="learners-nios-mobile desktop-none">
      <div className="mini-container">
        <h2 className="section-title">
          Successfull Learners of <br/> <span className="highlight"> NIOS Board</span>
        </h2>

        <div className="reviews-container">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={4.2}
            grabCursor={true}
            // centeredSlides={true}
            loop={true}
            speed={3000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}


            freeMode={true}
            allowTouchMove={false}

              breakpoints={{
              240: { slidesPerView: 2, spaceBetween: 10, centeredSlides: true },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
          >
            {/* Leanrers 1 */}
            <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img1.png" alt="Learners NIOS Board"></img>
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img2.png" alt="Learners NIOS Board"></img>
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img3.png" alt="Learners NIOS Board"></img>
              </div>
            </SwiperSlide>


             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img1.png" alt="Learners NIOS Board"></img>
              </div>
            </SwiperSlide>


             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img2.png" alt="Learners NIOS Board"></img>
              </div>
            </SwiperSlide>


             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img3.png" alt="Learners NIOS Board"></img>
              </div>
            </SwiperSlide>


             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img2.png" alt="Learners NIOS Board"></img>
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img3.png" alt="Learners NIOS Board"></img>
              </div>
            </SwiperSlide>

             
         

           
          </Swiper>
        </div>
      </div>
    </section>
  );
}
