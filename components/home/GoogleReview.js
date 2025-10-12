"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Loop } from "swiper/modules";
// import "swiper/css";

export default function GoogleReview() {
  return (
    <section className="reviews-section">
      <div className="mini-container">
        <h2 className="section-title">
          Google <span className="highlight">Reviews</span>
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
            {/* Review 1 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/user.svg"
                    alt="Chloe Patterson"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>Chloe Patterson</h4>
                    <p>May 5, 2023</p>
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
                  Great quality and attention to detail. Their designs elevated
                  my brand. I just wish they had a more flexible payment plan for
                  small businesses.
                </p>
              </div>
            </SwiperSlide>

            {/* Review 2 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/user.svg"
                    alt="Chloe Patterson"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>Chloe Patterson</h4>
                    <p>May 5, 2023</p>
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
                  Great quality and attention to detail. Their designs elevated
                  my brand. I just wish they had a more flexible payment plan for
                  small businesses.
                </p>
              </div>
            </SwiperSlide>

            {/* Review 3 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/user.svg"
                    alt="Chloe Patterson"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>Chloe Patterson</h4>
                    <p>May 5, 2023</p>
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
                  Great quality and attention to detail. Their designs elevated
                  my brand. I just wish they had a more flexible payment plan for
                  small businesses.
                </p>
              </div>
            </SwiperSlide>

            {/* Review 4 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/user.svg"
                    alt="Ethan Clark"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>Ethan Clark</h4>
                    <p>April 10, 2023</p>
                  </div>
           
                </div>
                <div className="rating-stars">
                  <img src="/assets/images/g-reviews/rating.svg" alt="SS Coaching 5 stars by Students"></img>
                </div>
                <p className="review-text">
                  They are skilled professionals, and the service was decent.
                  However, their pricing structure is confusing, and we had some
                  unexpected charges.
                </p>
              </div>
            </SwiperSlide>


              {/* Review 1 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/user.svg"
                    alt="Chloe Patterson"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>Chloe Patterson</h4>
                    <p>May 5, 2023</p>
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
                  Great quality and attention to detail. Their designs elevated
                  my brand. I just wish they had a more flexible payment plan for
                  small businesses.
                </p>
              </div>
            </SwiperSlide>

            {/* Review 2 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/user.svg"
                    alt="Chloe Patterson"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>Chloe Patterson</h4>
                    <p>May 5, 2023</p>
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
                  Great quality and attention to detail. Their designs elevated
                  my brand. I just wish they had a more flexible payment plan for
                  small businesses.
                </p>
              </div>
            </SwiperSlide>

            {/* Review 3 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/user.svg"
                    alt="Chloe Patterson"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>Chloe Patterson</h4>
                    <p>May 5, 2023</p>
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
                  Great quality and attention to detail. Their designs elevated
                  my brand. I just wish they had a more flexible payment plan for
                  small businesses.
                </p>
              </div>
            </SwiperSlide>

            {/* Review 4 */}
            <SwiperSlide>
              <div className="review-card">
                <div className="review-header">
                  <img
                    src="/assets/images/g-reviews/user.svg"
                    alt="Ethan Clark"
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-info">
                    <h4>Ethan Clark</h4>
                    <p>April 10, 2023</p>
                  </div>
           
                </div>
                <div className="rating-stars">
                  <img src="/assets/images/g-reviews/rating.svg" alt="SS Coaching 5 stars by Students"></img>
                </div>
                <p className="review-text">
                  They are skilled professionals, and the service was decent.
                  However, their pricing structure is confusing, and we had some
                  unexpected charges.
                </p>
              </div>
            </SwiperSlide>


           
          </Swiper>
        </div>
      </div>
    </section>
  );
}
