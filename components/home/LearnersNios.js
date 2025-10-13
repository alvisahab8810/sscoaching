"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Loop } from "swiper/modules";
// import "swiper/css";

export default function LearnersNios() {
  return (
    <section className="reviews-section mobile-none">
      <div className="mini-container">
        <h2 className="section-title">
          Successfull Learners of  <span className="highlight"> NIOS Board</span>
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
