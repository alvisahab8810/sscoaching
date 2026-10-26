"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, FreeMode } from "swiper/modules";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=in.sscoaching.app";

// Phone-sized exports of the desktop banners (485x224); the desktop files are
// too wide to stay readable on a phone. Each banner is one flat image, so the
// whole card is the link.
const BANNERS = [
  {
    src: "/assets/images/home/b1-mobile.png",
    href: PLAY_STORE_URL,
    external: true,
    alt: "Join 1 Lakh+ students on the SS Coaching app for NIOS 10th and 12th online courses",
    title: "Join 1 Lakh+ Students On SS Coaching App Today",
  },
  {
    src: "/assets/images/home/b2-mobile.png",
    href: "/nios-admission",
    external: false,
    alt: "SS Coaching faculty team offering expert support for NIOS students in Lucknow",
    title: "NIOS Experts Committed for Student Success",
  },
  {
    src: "/assets/images/home/b3-mobile.png",
    href: PLAY_STORE_URL,
    external: true,
    alt: "Watch a free demo class with SS Coaching expert teachers",
    title: "Watch Free Demo - 25+ Years of Experience with Expert Teachers",
  },
];

// Swiper needs more slides than it shows for a seamless loop; with only three
// banners the duplicated set keeps every snap at "one full card + a peek".
const SLIDES = [...BANNERS, ...BANNERS];

export default function HeroPeekMobile() {
  return (
    <section className="mobile-hero-section">
      <section className="hero-wrapper">
        <div className="container hero-mobile-peek-container">
          {/* delay 0 with a long speed drifts the strip continuously instead of
              stepping slide by slide, matching the desktop hero */}
          <Swiper
            className="hero-mobile-peek-swiper"
            slidesPerView={1.12}
            spaceBetween={12}
            slidesPerGroup={1}
            loop={true}
            loopAdditionalSlides={3}
            allowTouchMove={true}
            speed={5000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            freeMode={{ enabled: true, momentum: false }}
            modules={[Autoplay, FreeMode]}
          >
            {SLIDES.map((banner, index) => (
              <SwiperSlide key={`${banner.src}-${index}`}>
                <a
                  className="hero-mobile-peek-card"
                  href={banner.href}
                  {...(banner.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <img
                    src={banner.src}
                    alt={banner.alt}
                    title={banner.title}
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </section>
  );
}
