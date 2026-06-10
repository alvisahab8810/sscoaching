"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Loop } from "swiper/modules";
// import "swiper/css";

export default function LearnersNios() {
  return (
    <section className="reviews-section mobile-none">
      <div className="container">
        <h2 className="section-title">
          Successfull Learners of  <span className="highlight"> NIOS Board</span>
        </h2>

        <div className="reviews-container">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={7}
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
                <img src="/assets/images/home/learners-nios/img1.png" 
                alt=" Successful NIOS learners achieving recognition at SS Coaching Lucknow"
                title="Our Achievers | SS Coaching Lucknow "></img>
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img2.png" 
                alt="Award-winning students and achievers from SS Coaching Lucknow"
                title="Celebrating Student Success at SS Coaching Lucknow"></img>
              </div>
            </SwiperSlide>
            
             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img3.png" 
                alt="Successful NIOS learners achieving recognition at SS Coaching Lucknow "
                title="Successful Learners of NIOS Board at SS Coaching Lucknow"></img>
              </div>
            </SwiperSlide>


            <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img4.webp" 
                alt=" Successful NIOS learners achieving recognition at SS Coaching Lucknow"
                title="Our Achievers | SS Coaching Lucknow "></img>
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img5.webp" 
                alt="Award-winning students and achievers from SS Coaching Lucknow"
                title="Celebrating Student Success at SS Coaching Lucknow"></img>
              </div>
            </SwiperSlide>
            
             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img6.webp" 
                alt="Successful NIOS learners achieving recognition at SS Coaching Lucknow "
                title="Successful Learners of NIOS Board at SS Coaching Lucknow"></img>
              </div>
            </SwiperSlide>

              <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img7.webp" 
                alt=" Successful NIOS learners achieving recognition at SS Coaching Lucknow"
                title="Our Achievers | SS Coaching Lucknow "></img>
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img8.webp" 
                alt="Award-winning students and achievers from SS Coaching Lucknow"
                title="Celebrating Student Success at SS Coaching Lucknow"></img>
              </div>
            </SwiperSlide>


            
            
              {/* Leanrers 1 Duplicate */}
            <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img1.png" 
                alt=" Successful NIOS learners achieving recognition at SS Coaching Lucknow"
                title="Our Achievers | SS Coaching Lucknow "></img>
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img2.png" 
                alt="Award-winning students and achievers from SS Coaching Lucknow"
                title="Celebrating Student Success at SS Coaching Lucknow"></img>
              </div>
            </SwiperSlide>
            
             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img3.png" 
                alt="Successful NIOS learners achieving recognition at SS Coaching Lucknow "
                title="Successful Learners of NIOS Board at SS Coaching Lucknow"></img>
              </div>
            </SwiperSlide>


            <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img4.webp" 
                alt=" Successful NIOS learners achieving recognition at SS Coaching Lucknow"
                title="Our Achievers | SS Coaching Lucknow "></img>
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img5.webp" 
                alt="Award-winning students and achievers from SS Coaching Lucknow"
                title="Celebrating Student Success at SS Coaching Lucknow"></img>
              </div>
            </SwiperSlide>
            
             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img6.webp" 
                alt="Successful NIOS learners achieving recognition at SS Coaching Lucknow "
                title="Successful Learners of NIOS Board at SS Coaching Lucknow"></img>
              </div>
            </SwiperSlide>

              <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img7.webp" 
                alt=" Successful NIOS learners achieving recognition at SS Coaching Lucknow"
                title="Our Achievers | SS Coaching Lucknow "></img>
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div className="learners-nios">
                <img src="/assets/images/home/learners-nios/img8.webp" 
                alt="Award-winning students and achievers from SS Coaching Lucknow"
                title="Celebrating Student Success at SS Coaching Lucknow"></img>
              </div>
            </SwiperSlide>


             
         

           
          </Swiper>
        </div>
      </div>
    </section>
  );
}
