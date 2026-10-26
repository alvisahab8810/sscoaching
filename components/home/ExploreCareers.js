import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const CAREERS = [
  {
    image: "/assets/images/teacher/1.webp",
    name: "Abhishek Tandon Sir",
    description:
      "Accountancy, Business Studies, Data Entry",
  },
  {
    image: "/assets/images/teacher/2.webp",
    name: "Baqar Zaidi Sir",
    description:
      "English, Accountancy, Business Studies",
  },
  {
    image: "/assets/images/teacher/3.webp",
    name: "Girish Shukla Sir",
    description:
      "Chemistry, Biology, Painting",
  },
  {
    image: "/assets/images/teacher/4.webp",
    name: "Mohit Rastogi Sir",
    description:
      "Mathematics, Science, Data Entry",
  },
  {
    image: "/assets/images/teacher/5.webp",
    name: "Nishtha Ma'am",
    description:
      "Social Science, English, Painting",
  },
];

export default function ExploreCareers() {
  return (
    <section className="careers-section">
      <div className="container">
        <div className="careers-head">
          <h2 className="section-title careers-title">
            Meet Our <span className="highlight">Teachers</span>
          </h2>
          <a href="/about-us" className="careers-view-all">
            View all 
          </a>
        </div>

        <Swiper
          className="careers-swiper"
          modules={[Autoplay, FreeMode]}
          freeMode
          loop
          speed={5000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          grabCursor
          breakpoints={{
            0: { slidesPerView: 2.2, spaceBetween: 12 },
            576: { slidesPerView: 2.3, spaceBetween: 15 },
            768: { slidesPerView: 3.3, spaceBetween: 15 },
            1200: { slidesPerView: 4.4, spaceBetween: 15 },
          }}
        >
          {CAREERS.map((career) => (
            <SwiperSlide key={career.name}>
              <article className="career-card">
                <div className="career-card-thumb">
                  <img src={career.image} alt={career.name} loading="lazy" />
                </div>

                <div className="career-card-body">
                  <h3 className="career-card-name">{career.name}</h3>
                  <p className="career-card-desc">{career.description}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
