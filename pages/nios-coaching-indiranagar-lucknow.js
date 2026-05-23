"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Popup from "@/components/home/Popup";
import Image from "next/image";
import Head from "next/head";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaBus,
  FaWhatsapp,
  FaEnvelope,
  FaUserGraduate,
  FaBriefcase,
  FaSchool,
} from "react-icons/fa";
import { useState } from "react";
import StatsSectionMobile from "@/components/home/StatsSectionMobile";
import StatsSection from "@/components/home/StatsSection";
import StudentSuccess from "@/components/home/StudentSuccess";
import GoogleReview from "@/components/home/GoogleReview";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Hero from "@/components/home/Hero";
import HeroMobile from "@/components/home/HeroMobile";
import ChipSection from "@/components/home/ChipSection";
import MobileQuickInfo from "@/components/home/MobileQuickInfo";
import BranchGallery from "@/components/BranchGallery";

const indiraganagarImages = Array.from({ length: 24 }, (_, i) => `/assets/images/gallery/indiranagar/gallery${i + 1}.webp`);
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaFileAlt,
  FaCalendarAlt,
  FaAward,
} from "react-icons/fa";

/* ─────────────────────────── DATA ─────────────────────────── */

// UPDATED FAQs — SEO-optimised for Indiranagar
const faqs = [
  {
    q: "Which is the best NIOS coaching in Indra Nagar Lucknow for 10th and 12th students?",
    a: "SS Coaching is widely known as one of the best institutes for NIOS coaching in Indra Nagar Lucknow for 10th and 12th students, providing expert faculty, structured classes, and complete exam preparation support.",
  },
  {
    q: "How can I take NIOS admission in Indra Nagar Lucknow with coaching support?",
    a: "Students can easily complete NIOS admission in Indra Nagar Lucknow with coaching guidance by visiting SS Coaching, where experts help with registration, subject selection, and document verification.",
  },
  {
    q: "Is NIOS coaching available for 10th class students in Lucknow?",
    a: "Yes, SS Coaching provides NIOS coaching for 10th class students in Lucknow, including subject-wise teaching, study materials, and exam preparation strategies.",
  },
  {
    q: "Where can I find NIOS coaching for 12th in Indra Nagar Lucknow?",
    a: "Students can join SS Coaching for NIOS coaching for 12th in Indra Nagar Lucknow, where experienced teachers guide them through the NIOS syllabus and examination pattern.",
  },
  {
    q: "What is the fee for NIOS coaching and admission in Lucknow?",
    a: "The fee for NIOS coaching and admission in Lucknow depends on the course, number of subjects, and exam stream selected by the student. Visit us for a free counselling session to get complete fee details.",
  },
  {
    q: "Can failed students complete 10th or 12th through NIOS coaching in Lucknow?",
    a: "Yes, students who failed in board exams can join NIOS coaching for failed students in Lucknow and complete their secondary or senior secondary education without losing a year.",
  },
  {
    q: "Is the NIOS certificate valid for higher education and government jobs?",
    a: "Yes, the NIOS board is recognized by the Government of India, which means students can apply for college admission after NIOS 12th as well as government and private sector jobs.",
  },
  {
    q: "How long does it take to complete 10th or 12th through NIOS in Lucknow?",
    a: "Students can complete NIOS 10th or 12th through coaching in Lucknow depending on the chosen exam stream and preparation timeline. NIOS On-Demand Exam allows students to pass in as little as 45 days.",
  },
];

const streams = [
  { color: "blue",   icon: "🎓", title: "NIOS Stream 1 — Fresh Start (Class 9/11 Failed)",  desc: "Failed Class 9 or 11? Directly appear for Class 10 or 12 through NIOS. No repeating. No attendance needed. Start fresh today.",                                   pill: "Saves Time",     pillColor: "blue"   },
  { color: "teal",   icon: "🔁", title: "NIOS Stream 2 — Same Year Pass (Board Failed)",     desc: "Failed CBSE, ICSE, or UP Board this year? Don't lose a year. NIOS Stream 2 lets you pass in the very same academic year.",                                          pill: "Same Year Pass", pillColor: "teal"   },
  { color: "orange", icon: "⚡", title: "NIOS Stream 3 & 4 — On-Demand (45 Days)",           desc: "Pass in as little as 45 days through NIOS On-Demand Exam. Appear when ready — no waiting for March/October exam cycle.",                                            pill: "Fastest Option", pillColor: "orange" },
  { color: "blue",   icon: "📚", title: "Subject-Wise Improvement",                          desc: "Failed only specific subjects? Appear for only those, not the full exam. Save time, money, and years of your life.",                                                  pill: "Flexible",       pillColor: "blue"   },
  { color: "teal",   icon: "🏆", title: "JEE / NEET / CA Aspirants",                        desc: "Zero mandatory attendance — perfect for competitive exam students. Pass your 12th board while focusing 100% on your entrance exam.",                                   pill: "For Aspirants",  pillColor: "teal"   },
];

const whys = [
  { icon: <FaChalkboardTeacher />, color: "blue",   title: "Experienced Professionals", desc: "NIOS-specialist faculty with years of experience — committed to making every concept simple and every student exam-ready." },
  { icon: <FaBookOpen />,          color: "teal",   title: "Best Study Materials",      desc: "Exclusive notes, previous year question papers, and focused mock test series aligned with the latest NIOS syllabus." },
  { icon: <FaFileAlt />,           color: "orange", title: "Smooth NIOS Admission",     desc: "We handle the entire online admission process — form filling, document upload, subject selection — all under one roof." },
  { icon: <FaCalendarAlt />,       color: "green",  title: "Flexible & No Attendance",  desc: "Study at your own pace with zero mandatory attendance — perfect for competitive exam aspirants and working students." },
  { icon: <FaMapMarkerAlt />,      color: "purple", title: "Prime Lucknow Location",    desc: "Conveniently located in Indiranagar — well connected by metro and bus routes from all parts of Lucknow." },
  { icon: <FaAward />,             color: "red",    title: "Trusted Since 2001",        desc: "Over 25 years, 100K+ students guided, 4.8★ Google rating — our legacy is the city's trust and our students' success." },
];

/* ─────────────────────────── COMPONENT ─────────────────────────── */

export default function IndiraganagarPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const toggle = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  const [activeIndex, setActiveIndex] = useState(null);
  const toggleItem = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <div className="hg-page">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "SS Coaching — Indra Nagar",
              "url": "https://sscoaching.in/nios-coaching-indiranagar-lucknow",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Infront Babian Restaurant, S97, 3rd Floor Lekhraj Palace, above Rama Sarees, Bhoothnath Market, Indira Nagar, Lucknow",
                "addressLocality": "Indira Nagar",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "226016",
                "addressCountry": "IN"
              },
              "telephone": "9792111121"
            })
          }}
        />
      </Head>

      {/* ── TOPBAR ── */}
      <div className="hg-topbar">
        <div className="hg-tb-inner">
          <span className="d-flex align-items-center">
            <img className="location-pins" src="/assets/images/contacts/location.svg" alt="location" />
            <strong>Indiranagar Branch</strong> — Sector 9, Near Lekhraj Market, Indiranagar, Lucknow – 226016
          </span>
          <span className="d-flex align-items-center">
            <img src="/assets/icons/footer/call.svg" alt="Phone Icon" className="contact-icon" />
            <a href="tel:+919792111121">+91 97921 11121</a>
            &nbsp;|&nbsp;
            <img src="/assets/icons/footer/gmail.svg" alt="Email Icon" className="contact-icon" />
            <a href="mailto:info@sscoaching.in">info@sscoaching.in</a>
          </span>
        </div>
      </div>

      <Header />
      <Offcanvas />
      <BranchContactCanvas />

      {/* ── SECTION 1: HERO BANNER ── */}
      <Hero />
      <HeroMobile />

      {/* ── SECTION 1B: H1 + INTRO TEXT (below banner) ── */}
      <section className="hg-intro-section">
        <div className="container">
          <h1 className="hg-intro-h1">
            NIOS Coaching in Indra Nagar Lucknow –{" "}
            <span className="highlight">Best NIOS Institute for 10th &amp; 12th Students</span>
          </h1>
          <p className="hg-intro-text">
            Students looking for NIOS Coaching in Indra Nagar Lucknow often need a flexible way
            to complete their education. Many face challenges continuing regular schooling due to
            academic or personal reasons.
          </p>
          <p className="hg-intro-text">
            The National Institute of Open Schooling (NIOS) offers a reliable alternative to
            complete 10th or 12th. SS Coaching provides trusted guidance, helping students with
            <a href="/nios-admission">NIOS admission in Lucknow</a>, exam preparation, and complete academic support.
          </p>

          {/* Highlights */}
          <ul className="hg-intro-highlights">
            <li>✅ Expert faculty</li>
            <li>✅ NIOS Coaching for 10th &amp; 12th</li>
            <li>✅ Complete admission guidance</li>
          </ul>

          {/* CTAs */}
          <div className="hg-intro-ctas">
            <a href="tel:09792111121" className="hg-intro-btn hg-intro-btn-primary">
              📞 Call Now
            </a>
            <a href="#contact" className="hg-intro-btn hg-intro-btn-outline">
              📍 Visit Indra Nagar Branch
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: FEATURE CARDS ── */}
      <ChipSection />
      <MobileQuickInfo />

      {/* ── SECTION 3: CONTACT STRIP ── */}
      <section className="ss-contact-strip-v2">
        <div className="ss-strip-container">
          <div className="ss-mobile-heading desktop-none">Call Us Now!</div>
          <div className="ss-strip-item">
            <div className="ss-strip-inner">
              <a href="tel:09792111121">
                <div className="ss-strip-icon">
                  <img src="/assets/images/contacts/call.svg" alt="Call" />
                </div>
              </a>
              <div>
                <div className="ss-strip-title">Indiranagar Lucknow</div>
                <div className="d-flex gap-2">
                  <a href="tel:09792111121" className="ss-strip-phone">09792111121</a>
                  <a href="tel:09956493857" className="ss-strip-phone">09956493857</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: STATS ── */}
      <StatsSectionMobile />
      <StatsSection />

      {/* ── SECTION 5: STUDENT SUCCESS STORIES ── */}
      <section className="hg-section" id="about">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">Student <span>Success</span> Stories</h2>
            <p className="hg-sdesc">
              Every topper at SS Coaching Indiranagar is proof that the right guidance changes everything. Meet our stars.
            </p>
          </div>
          <StudentSuccess />
        </div>
      </section>

      {/* ── SECTION 6: GOOGLE REVIEWS ── */}
      <GoogleReview />

      {/* ── SECTION 7: 3-STEP PROCESS (updated content) ── */}
      <section className="hg-section" id="process">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">Our Simple <span>3-Step Process</span></h2>
            <p className="hg-sdesc">
              Getting your NIOS admission done at SS Coaching Indra Nagar takes just 3 easy steps.
            </p>
          </div>
          <div className="hg-proc-grid">
            <div className="hg-proc-vis">
              <span className="hg-proc-ico">
                <img src="/assets/images/home/steps-process/photo.svg" alt="process" />
              </span>
              <div className="hg-proc-big">3</div>
            </div>
            <div className="hg-steps">
              {[
                { num: "01", cls: "hg-snum-blue",   title: "Free Counselling",          desc: "Get expert guidance for NIOS admission in Lucknow. Our experts assess your situation and recommend the perfect NIOS stream at zero cost." },
                { num: "02", cls: "hg-snum-teal",   title: "Admission & Documentation", desc: "We handle the complete NIOS admission process including subject selection, document submission, and online registration — hassle-free." },
                { num: "03", cls: "hg-snum-orange", title: "Study, Appear & Pass",      desc: "Start your coaching, prepare for exams with structured study material, and complete your 10th or 12th successfully." },
              ].map((s) => (
                <div key={s.num} className="hg-step">
                  <div className={`hg-snum ${s.cls}`}>{s.num}</div>
                  <div className="hg-sbody"><h4>{s.title}</h4><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: STREAM OPTIONS ── */}
      <section className="hg-section hg-bg-off" id="streams">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">We Are the Best NIOS Coaching <br /><span>in Lucknow</span></h2>
          </div>
          <div className="container">
            <div className="hg-str-grid">
              {streams.map((s) => (
                <div key={s.title} className={`hg-strc hg-strc-${s.color}`}>
                  <div className="d-flex align-items-center gap-2">
                    <div className={`hg-str-ico hg-str-ico-${s.color}`}>{s.icon}</div>
                    <h3>{s.title}</h3>
                  </div>
                  <p>{s.desc}</p>
                  <span className={`hg-pill hg-pill-${s.pillColor}`}>{s.pill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: REGISTRATION CTA BANNER ── */}
      <div className="hg-reg">
        <div className="hg-reg-in">
          <div className="hg-reg-l">
            <h2>Registration Open! <span>Limited Seats</span></h2>
            <p>Admissions for NIOS 2025–26 are open now at our Indiranagar centre. Don't wait — seats fill fast.</p>
            <div className="hg-reg-btns">
              <button className="hg-btn-yl cta-btn-2nd">Enrol Now</button>
              <a href="https://wa.me/919792111121" className="hg-btn-cl">
                <FaWhatsapp className="text-green-500 whatsppp-ico" /> WhatsApp Us
              </a>
            </div>
          </div>
          <div className="hg-reg-badge"><strong>95%</strong><span>Pass Rate<br />2024 Batch</span></div>
        </div>
      </div>

      {/* ── SECTION 10: WHY BEST NIOS COACHING — DESKTOP ── */}
      <section className="hg-section mobile-none">
        <div className="hg-sec">
          <div className="hg-sh">
           <h2 className="hg-stitle">WHY BEST <span> NIOS</span></h2>
          </div>
          <div className="container">
            <div className="hg-why-grid">
              {whys.map((w) => (
                <div key={w.title} className="hg-wc">
                  <div className={`hg-wico hg-wico-${w.color}`}>{w.icon}</div>
                  <h4>{w.title}</h4>
                  <p>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 10: WHY BEST NIOS COACHING — MOBILE ── */}
      <section className="hg-section desktop-none">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">WHY BEST <span> NIOS</span></h2>
          </div>
          <div className="container">
            <div className="hg-why-grid">
              {whys.map((w, index) => (
                <div key={w.title} className="hg-wc">
                  <div className="why-row" onClick={() => toggleItem(index)}>
                    <div className={`hg-wico hg-wico-${w.color}`}>{w.icon}</div>
                    <h4>{w.title}</h4>
                  </div>
                  <p className={`why-desc ${activeIndex === index ? "show-desc" : ""}`}>
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 11: NIOS 2026 CTA BANNER ── */}
      <div className="hg-reg">
        <div className="hg-reg-in">
          <div className="hg-reg-l">
            <h2>NIOS 2026: <span>A Year of Determination, Dreams &amp; Success</span></h2>
            <p>New batch starting soon at Indiranagar. Whether you're going for Stream 1, 2, 3, or 4 — there's a path here for you.</p>
            <div className="mobile-none">
              <div className="hg-reg-btns">
                <button className="hg-btn-yl cta-btn-2nd">Book Free Counselling</button>
              </div>
            </div>
          </div>
          <div className="hg-reg-badges-col">
            <div className="hg-reg-badge">
              <a href="/nios-admission/admission-in-nios-stream-1">
                <strong>NIOS STREAM 1</strong><span>Class 9th/11th Exam</span>
              </a>
            </div>
            <div className="hg-reg-badge">
              <a href="/nios-admission/admission-in-nios-stream-2">
                <strong>NIOS STREAM 2</strong><span>Class 10th/12th Exam</span>
              </a>
            </div>
            <div className="hg-reg-badge">
              <a href="/nios-admission/admission-in-nios-stream-3&4">
                <strong>STREAM 3 &amp; 4</strong><span>On-Demand · 45 Days</span>
              </a>
            </div>
            <div className="desktop-none" style={{ width: "100%" }}>
              <div className="hg-reg-btns desktop-none">
                <button className="hg-btn-yl cta-btn-2nd">Book Free Counselling</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 12: ABOUT SS COACHING INDIRANAGAR (NEW) ── */}
      <section className="hg-section hg-bg-off" id="about-indiranagar">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">
              About SS Coaching –{" "}
              <span>Trusted NIOS Institute in Lucknow</span>
            </h2>
          </div>
          <div className="container">
            <div className="hg-about-grid">
              {/* Two side-by-side images */}
              <div className="hg-about-images">
                <div className="hg-about-img-wrap">
                  <img
                    src="/assets/images/gallery/indiranagar/gallery1.webp"
                    alt="SS Coaching Indiranagar Classroom"
                    className="hg-about-img"
                  />
                  <img
                    src="/assets/images/gallery/indiranagar/gallery2.webp"
                    alt="Teacher teaching students at SS Coaching Indiranagar"
                    className="hg-about-img"
                  />
                </div>
              </div>
              {/* Content */}
              <div className="hg-about-content">
                <p>
                  SS Coaching is a reliable NIOS institute in Lucknow helping students complete
                  10th and 12th education. We provide expert guidance, structured learning, and a
                  supportive environment for students who have faced academic challenges.
                </p>
                <p>
                  With multiple branches across Lucknow, students can easily access quality NIOS
                  coaching near them. Our Indiranagar branch is conveniently located in Sector 9,
                  near Lekhraj Market, making it accessible from Gomti Nagar, Hazratganj, and
                  surrounding areas.
                </p>
                <p>
                  Our experienced faculty ensures that every student receives personal attention,
                  clear subject guidance, and the right exam preparation strategy to pass
                  confidently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 13: WHY CHOOSE US — INDIRANAGAR (NEW) ── */}
      <section className="hg-section" id="why-choose-indiranagar">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">
              Why Choose NIOS Coaching in{" "}
              <span>Indra Nagar Lucknow</span>
            </h2>
          </div>
          <div className="container">
            <div className="hg-choose-grid">
              {/* Motivational image */}
              <div className="hg-choose-img-wrap">
                <img
                  src="/assets/images/gallery/indiranagar/gallery3.webp"
                  alt="Students at SS Coaching Indra Nagar Lucknow"
                  className="hg-choose-img"
                />
              </div>
              {/* Content */}
              <div className="hg-choose-content">
                <p>
                  SS Coaching provides a focused and supportive learning environment with
                  experienced teachers who understand the specific needs of NIOS students.
                </p>
                <p>
                  Students receive simple explanations, doubt-solving support, and complete
                  guidance for NIOS admission in Lucknow — from the very first counselling
                  session to the final exam.
                </p>
                <p>
                  Small batch sizes ensure personal attention and better learning outcomes,
                  helping every student stay consistent and build confidence in their preparation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 14: NIOS COACHING FOR 10TH & 12TH (NEW) ── */}
      <section className="hg-section hg-bg-off" id="nios-coaching-10th-12th">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">
              NIOS Coaching for 10th &amp; 12th{" "}
              <span>Students in Indra Nagar</span>
            </h2>
          </div>
          <div className="container">
            <div className="hg-course-grid">
              {/* Two images stacked */}
              <div className="hg-course-images">
                <img
                  src="/assets/images/gallery/indiranagar/gallery4.webp"
                  alt="Students studying NIOS at SS Coaching Indiranagar"
                  className="hg-course-img"
                />
                <img
                  src="/assets/images/gallery/indiranagar/gallery5.webp"
                  alt="NIOS study material at SS Coaching Indiranagar"
                  className="hg-course-img"
                />
              </div>
              {/* Content */}
              <div className="hg-course-content">
                <p>
                  We offer specialized coaching for both 10th and 12th NIOS students at our
                  Indra Nagar branch. Our programs are structured to match the NIOS board
                  syllabus and help students prepare with confidence.
                </p>

                <div className="hg-course-block">
                  <h4>NIOS Secondary Course (10th)</h4>
                  <p>
                    Subject-wise guidance with strong basics in Maths, Science, Social Science,
                    Hindi, and English. Regular practice and revision help students build a
                    solid foundation.
                  </p>
                </div>

                <div className="hg-course-block">
                  <h4>NIOS Senior Secondary Course (12th)</h4>
                  <p>
                    Concept-based learning with exam-focused preparation. Teachers simplify
                    complex topics and ensure students understand the syllabus clearly before
                    appearing for the board exam.
                  </p>
                </div>

                <p>
                  Regular practice and revision help students stay consistent and confident
                  throughout their preparation, making SS Coaching a reliable option for:
                </p>
                <ul className="hg-course-list">
                  <li>NIOS Coaching for 10th in Lucknow</li>
                  <li>NIOS Coaching for 12th in Lucknow</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 15: ADMISSION GUIDANCE (NEW) ── */}
      {/* <section className="hg-section" id="admission-guidance">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">
              NIOS Admission in Lucknow –{" "}
              <span>Complete Guidance</span>
            </h2>
          </div>
          <div className="container">
            <div className="hg-admit-steps">
              {[
                {
                  step: "01",
                  title: "Free Counselling Session",
                  desc: "Visit SS Coaching Indiranagar for a free counselling session. Our experts assess your background and guide you to the right NIOS stream.",
                },
                {
                  step: "02",
                  title: "Subject Selection",
                  desc: "We help you choose the right subjects based on your course (10th or 12th) and future career goals.",
                },
                {
                  step: "03",
                  title: "Document Verification",
                  desc: "Submit your Aadhar card, previous marksheet or TC, passport photo, and address proof. We verify and prepare everything.",
                },
                {
                  step: "04",
                  title: "Online Registration",
                  desc: "We complete your NIOS online registration and fee payment on your behalf — quick, accurate, and hassle-free.",
                },
                {
                  step: "05",
                  title: "Start Learning & Prepare",
                  desc: "Begin structured classes, receive study material, and prepare confidently for your NIOS board exams with full teacher support.",
                },
              ].map((s) => (
                <div key={s.step} className="hg-admit-step">
                  <div className="hg-admit-num">{s.step}</div>
                  <div className="hg-admit-body">
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* ── SECTION 16: WHO SHOULD JOIN (NEW) ── */}
      <section className="hg-section hg-bg-off" id="who-should-join">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">
              Who Should Join NIOS Coaching{" "}
              <span>in Indra Nagar</span>
            </h2>
          </div>
          <div className="container">
            <p className="hg-sdesc" style={{ marginBottom: "36px" }}>
              NIOS offers a flexible way to complete education without pressure. It is ideal for
              students from all walks of life who could not continue through regular schooling.
            </p>
            <div className="hg-who-grid">
              <div className="hg-who-card">
                <div className="hg-who-icon hg-who-icon-blue">
                  <FaUserGraduate />
                </div>
                <h4>Students Who Failed in Board Exams</h4>
                <p>
                  Students who failed in CBSE, ICSE, or UP Board can complete their 10th or
                  12th through NIOS without losing a year.
                </p>
              </div>
              <div className="hg-who-card">
                <div className="hg-who-icon hg-who-icon-teal">
                  <FaSchool />
                </div>
                <h4>School Dropouts</h4>
                <p>
                  Students who dropped out of school due to any reason can restart their
                  education through NIOS and earn a government-recognized certificate.
                </p>
              </div>
              <div className="hg-who-card">
                <div className="hg-who-icon hg-who-icon-orange">
                  <FaBriefcase />
                </div>
                <h4>Working Students</h4>
                <p>
                  With flexible exam schedules and no mandatory attendance, NIOS is the perfect
                  option for students who are working or have other responsibilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 17: GALLERY ── */}
      <section className="hg-section hg-bg-off" id="gallery">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">Our <span>Gallery</span></h2>
          </div>
          <div className="container">
            <BranchGallery images={indiraganagarImages} />
          </div>
        </div>
      </section>

      {/* ── SECTION 20: ADDRESS + GOOGLE MAP ── */}
      <section className="hg-section hg-bg-off" id="contact">
        <div className="hg-sec">
          <div className="hg-sh">
            <div className="hg-stag">Visit Us</div>
            <h2 className="hg-stitle">Find Our <span>Indiranagar Centre</span></h2>
          </div>
          <div className="container">
            <div className="hg-loc-grid">
              <div className="hg-map-box">
                {/* Google Maps embed */}
                <iframe
                  title="SS Coaching Indiranagar Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.0!2d80.9915!3d26.8550!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSW5kaXJhbmFnYXIsIHNzIGNvYWNoaW5n!5e0!3m2!1sen!2sin!4v1680000000001!5m2!1sen!2sin"
                  width="100%"
                  height="280"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="hg-map-addr">
                  Sector 9, Near Lekhraj Market<br />
                  Indiranagar<br />
                  Lucknow – 226016
                </div>
                <div className="hg-map-sub">Near Lekhraj Metro Station</div>
                <a
                  href="https://maps.google.com/?q=SS+Coaching+Indiranagar+Lucknow"
                  target="_blank"
                  rel="noreferrer"
                  className="hg-map-go"
                >
                  📍 Open in Google Maps
                </a>
              </div>

              <div className="hg-locs">
                {[
                  {
                    ico: <FaMapMarkerAlt />,
                    label: "Address",
                    content: (
                      <span>Sector 9, Near Lekhraj Market, Indiranagar, Lucknow – 226016</span>
                    ),
                  },
                  {
                    ico: <FaPhoneAlt />,
                    label: "Phone / WhatsApp",
                    content: (
                      <>
                        <a href="tel:+919792111121">+91 9792111121</a>
                        <a href="tel:+919956493857">+91 9956493857</a>
                      </>
                    ),
                  },
                  {
                    ico: <FaEnvelope />,
                    label: "Email",
                    content: <a href="mailto:info@sscoaching.in">info@sscoaching.in</a>,
                  },
                  {
                    ico: <FaClock />,
                    label: "Office Hours",
                    content: (
                      <>
                        <span>Monday – Saturday: 9:00 AM – 7:00 PM</span>
                        <span>Sunday: By Appointment Only</span>
                      </>
                    ),
                  },
                  {
                    ico: <FaBus />,
                    label: "How to Reach",
                    content: (
                      <>
                        <span>Near Lekhraj Metro Station</span>
                        <span>Easy access from Gomti Nagar &amp; Hazratganj · Multiple bus routes</span>
                      </>
                    ),
                  },
                ].map((l) => (
                  <div key={l.label} className="hg-lc">
                    <div className="hg-lco">{l.ico}</div>
                    <div>
                      <strong>{l.label}</strong>
                      {l.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 21: FAQ (Updated with Indiranagar SEO FAQs) ── */}
      <section className="hg-section" id="faq">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">Frequently Asked <span>Questions</span></h2>
            <p className="hg-sdesc">
              Everything you want to know before enrolling at SS Coaching Indra Nagar.
            </p>
          </div>
          <div className="container">
            <div className="hg-fq-grid">
              {faqs.map((f, i) => (
                <div
                  key={`faq-${i}`}
                  className={`hg-fqi ${openFaq === i ? "hg-fqi-open" : ""}`}
                >
                  <button className="hg-fqb" onClick={() => toggle(i)}>
                    {f.q}
                    <span className="hg-fqico">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && <div className="hg-fqa">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Popup />

      {/* ── OTHER BRANCHES ── */}
      <div className="ob">
        <div className="ob-in">
          <h3>Other Branches in Lucknow</h3>
          <p>SS Coaching is spread across the city — find a centre near you.</p>
          <div className="b-row">
            <a href="/nios-coaching-hazratganj-lucknow" className="bcard">
              <div>
                <strong>Hazratganj Branch</strong>
                <span>3rd Floor, Shree Chamber, Near Basant Cinema, Hazratganj</span>
              </div>
              <span className="ba">→</span>
            </a>
            <a href="/nios-coaching-alambagh-lucknow" className="bcard">
              <div>
                <strong>Alambagh Branch</strong>
                <span>U.R. Plaza, Near Phoenix Mall, Alambagh</span>
              </div>
              <span className="ba">→</span>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


// "use client";
// import Footer from "@/components/footer/Footer";
// import Header from "@/components/header/Header";
// import Popup from "@/components/home/Popup";
// import Image from "next/image";
// import {
//   FaMapMarkerAlt,
//   FaPhoneAlt,
//   FaClock,
//   FaBus,
//   FaWhatsapp,
//   FaEnvelope,
// } from "react-icons/fa";
// import { useState } from "react";
// import StatsSectionMobile from "@/components/home/StatsSectionMobile";
// import StatsSection from "@/components/home/StatsSection";
// import StudentSuccess from "@/components/home/StudentSuccess";
// import GoogleReview from "@/components/home/GoogleReview";
// import Offcanvas from "@/components/header/Offcanvas";
// import BranchContactCanvas from "@/components/header/BranchContactCanvas";
// import Hero from "@/components/home/Hero";
// import HeroMobile from "@/components/home/HeroMobile";
// import ChipSection from "@/components/home/ChipSection";
// import MobileQuickInfo from "@/components/home/MobileQuickInfo";
// import {
//   FaChalkboardTeacher,
//   FaBookOpen,
//   FaFileAlt,
//   FaCalendarAlt,
//   FaAward,
// } from "react-icons/fa";

// const faqs = [
//   {
//     q: "Is NIOS certificate valid for college admissions?",
//     a: "Yes! NIOS is fully recognised by the Government of India and is equivalent to CBSE. It is accepted by all universities, colleges, and government job applications across India.",
//   },
//   {
//     q: "Can I pass 12th in the same year after failing UP Board?",
//     a: "Absolutely. Through NIOS Stream 2, students who failed CBSE, ICSE, or UP Board can pass in the same academic year. Our team handles everything for you.",
//   },
//   {
//     q: "What is the On-Demand Exam and how fast can I pass?",
//     a: "NIOS On-Demand Examination (ODES) lets you appear throughout the year. With our focused coaching, students regularly pass in 45–60 days from the date of admission.",
//   },
//   {
//     q: "Is NIOS suitable for JEE / NEET aspirants?",
//     a: "Yes — NIOS is the most popular board choice because there is no mandatory attendance. You can prepare for your entrance exam while your 12th board is on track.",
//   },
//   {
//     q: "What documents are needed for NIOS admission?",
//     a: "Typically: Aadhar Card, previous school marksheet/TC, passport-size photo, and address proof. Our staff guides you through exact requirements in a free counselling session.",
//   },
//   {
//     q: "Is there a free counselling session before enrolling?",
//     a: "Yes! Walk in or call us for a completely free, no-obligation counselling session. Our experts assess your situation and suggest the best NIOS stream for your goals.",
//   },
//   {
//     q: "Can I appear for only failing subjects?",
//     a: "Yes. NIOS allows students to appear for individual failing subjects without retaking the full exam — saving time, money, and a year of your life.",
//   },
//   {
//     q: "Is there any age limit for NIOS admission?",
//     a: "Minimum age is 14 for Class 10 and 15 for Class 12. There is no upper age limit — making NIOS ideal for students, working adults, and learners of all ages.",
//   },
// ];

// const admitData = [
//   {
//     cls: "hg-ac-blue",
//     icon: "/assets/icons/group1.png",
//     title: "Pass 10th/12th in Same Year",
//     sub: "Stream 1 & 2 Admission Open",
//   },
//   {
//     cls: "hg-ac-teal",
//     icon: "/assets/icons/group2.svg",
//     title: "Pass 10th/12th in just 45 Days",
//     sub: "On-Demand Exam (ODES)",
//   },
//   {
//     cls: "hg-ac-orange",
//     icon: "/assets/icons/group3.svg",
//     title: "Failed in 10th/12th this year?",
//     sub: "Same-year pass — still possible!",
//   },
// ];

// const streams = [
//   { color: "blue",   icon: "🎓", title: "NIOS Stream 1 — Fresh Start (Class 9/11 Failed)",    desc: "Failed Class 9 or 11? Directly appear for Class 10 or 12 through NIOS. No repeating. No attendance needed. Start fresh today.",                                                     pill: "Saves Time",    pillColor: "blue"   },
//   { color: "teal",   icon: "🔁", title: "NIOS Stream 2 — Same Year Pass (Board Failed)",       desc: "Failed CBSE, ICSE, or UP Board this year? Don't lose a year. NIOS Stream 2 lets you pass in the very same academic year.",                                                          pill: "Same Year Pass", pillColor: "teal"   },
//   { color: "orange", icon: "⚡", title: "NIOS Stream 3 & 4 — On-Demand (45 Days)",             desc: "Pass in as little as 45 days through NIOS On-Demand Exam. Appear when ready — no waiting for March/October exam cycle.",                                                            pill: "Fastest Option", pillColor: "orange" },
//   { color: "blue",   icon: "📚", title: "Subject-Wise Improvement",                            desc: "Failed only specific subjects? Appear for only those, not the full exam. Save time, money, and years of your life.",                                                                pill: "Flexible",       pillColor: "blue"   },
//   { color: "teal",   icon: "🏆", title: "JEE / NEET / CA Aspirants",                          desc: "Zero mandatory attendance — perfect for competitive exam students. Pass your 12th board while focusing 100% on your entrance exam.",                                                 pill: "For Aspirants",  pillColor: "teal"   },
// ];

// const whys = [
//   { icon: <FaChalkboardTeacher />, color: "blue",   title: "Experienced Professionals", desc: "NIOS-specialist faculty with years of experience — committed to making every concept simple and every student exam-ready." },
//   { icon: <FaBookOpen />,          color: "teal",   title: "Best Study Materials",      desc: "Exclusive notes, previous year question papers, and focused mock test series aligned with the latest NIOS syllabus." },
//   { icon: <FaFileAlt />,           color: "orange", title: "Smooth NIOS Admission",     desc: "We handle the entire online admission process — form filling, document upload, subject selection — all under one roof." },
//   { icon: <FaCalendarAlt />,       color: "green",  title: "Flexible & No Attendance",  desc: "Study at your own pace with zero mandatory attendance — perfect for competitive exam aspirants and working students." },
//   { icon: <FaMapMarkerAlt />,      color: "purple", title: "Prime Lucknow Location",    desc: "Conveniently located in Indiranagar — well connected by metro and bus routes from all parts of Lucknow." },
//   { icon: <FaAward />,             color: "red",    title: "Trusted Since 2001",        desc: "Over 23 years, 10,000+ students, 4.7★ Google rating — our legacy is the city's trust and our students' success." },
// ];

// export default function IndiraganagarPage() {
//   const [openFaq, setOpenFaq] = useState(null);
//   const toggle = (i) => setOpenFaq((prev) => (prev === i ? null : i));

//   const [activeIndex, setActiveIndex] = useState(null);
//   const toggleItem = (index) => setActiveIndex(activeIndex === index ? null : index);

//   return (
//     <div className="hg-page">

//       {/* TOPBAR */}
//       <div className="hg-topbar">
//         <div className="hg-tb-inner">
//           <span className="d-flex align-items-center">
//             <img className="location-pins" src="/assets/images/contacts/location.svg" alt="location" />
//             <strong>Indiranagar Branch</strong> — Sector 9, Near Lekhraj Market, Indiranagar, Lucknow – 226016
//           </span>
//           <span className="d-flex align-items-center">
//             <img src="/assets/icons/footer/call.svg" alt="Phone Icon" className="contact-icon" />
//             <a href="tel:+919839065533">+91 98390 65533</a>
//             &nbsp;|&nbsp;
//             <img src="/assets/icons/footer/gmail.svg" alt="Email Icon" className="contact-icon" />
//             <a href="mailto:info@sscoaching.in">info@sscoaching.in</a>
//           </span>
//         </div>
//       </div>

//       <Header />
//       <Offcanvas />
//       <BranchContactCanvas />

//       <Hero />
//       <HeroMobile />

//       <ChipSection />
//       <MobileQuickInfo />

//         <section className="ss-contact-strip-v2">
//       <div className="ss-strip-container">


//         <div className="ss-mobile-heading desktop-none">Call Us Now!</div>

        
//         <div className="ss-strip-item">
//           <div className="ss-strip-inner">

//             <a href="tel:09792111121">
//             <div className="ss-strip-icon">
//               <img
//                 src="/assets/images/contacts/call.svg"
//                 alt="Call"
//               />
//             </div>

//             </a>
//             <div>
//               <div className="ss-strip-title">Indiranagar Lucknow</div>
//               <div className="d-flex gap-2">
//                 <a href="tel:09792111121" className="ss-strip-phone">
//                 09792111121
//               </a>
//      <a href="tel:09956493857" className="ss-strip-phone">
//                  09956493857
//               </a>
//               </div>

             
//             </div>
//           </div>
//         </div>


        



        
   

  



//       </div>
//     </section>

//       {/* STATS */}
//       <StatsSectionMobile />
//       <StatsSection />

//       {/* STUDENT SUCCESS */}
//       <section className="hg-section" id="about">
//         <div className="hg-sec">
//           <div className="hg-sh">
//             <h2 className="hg-stitle">Student <span>Success</span> Stories</h2>
//             <p className="hg-sdesc">
//               Every topper at SS Coaching Indiranagar is proof that the right guidance changes everything. Meet our stars.
//             </p>
//           </div>
//           <StudentSuccess />
//         </div>
//       </section>

//       <GoogleReview />

//       {/* PROCESS */}
//       <section className="hg-section" id="process">
//         <div className="hg-sec">
//           <div className="hg-sh">
//             <h2 className="hg-stitle">Our Simple <span>3-Step Process</span></h2>
//             <p className="hg-sdesc">
//               Getting your NIOS admission done at SS Coaching Indiranagar takes just 3 easy steps.
//             </p>
//           </div>
//           <div className="hg-proc-grid">
//             <div className="hg-proc-vis">
//               <span className="hg-proc-ico">
//                 <img src="/assets/images/home/steps-process/photo.svg" alt="process" />
//               </span>
//               <div className="hg-proc-big">3</div>
//             </div>
//             <div className="hg-steps">
//               {[
//                 { num: "01", cls: "hg-snum-blue",   title: "Free Counselling",            desc: "Our experts analyse your situation — past exams, age, goals — and recommend the perfect NIOS stream at zero cost." },
//                 { num: "02", cls: "hg-snum-teal",   title: "Admission & Documentation",   desc: "We handle the entire NIOS online admission — form filling, document upload, subject selection, fee payment. One visit, hassle-free." },
//                 { num: "03", cls: "hg-snum-orange", title: "Study, Appear & Pass",        desc: "Attend classes, use our exclusive study materials, crack mock tests, and pass with confidence. Our 95% pass rate says it all!" },
//               ].map((s) => (
//                 <div key={s.num} className="hg-step">
//                   <div className={`hg-snum ${s.cls}`}>{s.num}</div>
//                   <div className="hg-sbody"><h4>{s.title}</h4><p>{s.desc}</p></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* STREAMS */}
//       <section className="hg-section hg-bg-off" id="streams">
//         <div className="hg-sec">
//           <div className="hg-sh">
//             <h2 className="hg-stitle">We Are the Best NIOS Coaching <br /> <span>in Lucknow</span></h2>
//           </div>
//           <div className="container">
//             <div className="hg-str-grid">
//               {streams.map((s) => (
//                 <div key={s.title} className={`hg-strc hg-strc-${s.color}`}>
//                   <div className="d-flex align-items-center gap-2">
//                     <div className={`hg-str-ico hg-str-ico-${s.color}`}>{s.icon}</div>
//                     <h3>{s.title}</h3>
//                   </div>
//                   <p>{s.desc}</p>
//                   <span className={`hg-pill hg-pill-${s.pillColor}`}>{s.pill}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* REG BANNER BLUE */}
//       <div className="hg-reg">
//         <div className="hg-reg-in">
//           <div className="hg-reg-l">
//             <h2>Registration Open! <span>Limited Seats</span></h2>
//             <p>Admissions for NIOS 2025–26 are open now at our Indiranagar centre. Don't wait — seats fill fast.</p>
//             <div className="hg-reg-btns">
//               <button className="hg-btn-yl cta-btn-2nd">Enrol Now</button>
//               <a href="https://wa.me/919839065533" className="hg-btn-cl">
//                 <FaWhatsapp className="text-green-500 whatsppp-ico" /> WhatsApp Us
//               </a>
//             </div>
//           </div>
//           <div className="hg-reg-badge"><strong>95%</strong><span>Pass Rate<br />2024 Batch</span></div>
//         </div>
//       </div>

//       {/* WHY US — Desktop */}
//       <section className="hg-section mobile-none">
//         <div className="hg-sec">
//           <div className="hg-sh">
//             <h2 className="hg-stitle">The Best NIOS Coaching<br /> <span>in Lucknow</span></h2>
//           </div>
//           <div className="container">
//             <div className="hg-why-grid">
//               {whys.map((w) => (
//                 <div key={w.title} className="hg-wc">
//                   <div className={`hg-wico hg-wico-${w.color}`}>{w.icon}</div>
//                   <h4>{w.title}</h4>
//                   <p>{w.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* WHY US — Mobile (accordion) */}
//       <section className="hg-section desktop-none">
//         <div className="hg-sec">
//           <div className="hg-sh">
//             <h2 className="hg-stitle">The Best NIOS Coaching<br /> <span>in Lucknow</span></h2>
//           </div>
//           <div className="container">
//             <div className="hg-why-grid">
//               {whys.map((w, index) => (
//                 <div key={w.title} className="hg-wc">
//                   <div className="why-row" onClick={() => toggleItem(index)}>
//                     <div className={`hg-wico hg-wico-${w.color}`}>{w.icon}</div>
//                     <h4>{w.title}</h4>
//                   </div>
//                   <p className={`why-desc ${activeIndex === index ? "show-desc" : ""}`}>
//                     {w.desc}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* REG BANNER GREEN */}
//       <div className="hg-reg">
//         <div className="hg-reg-in">
//           <div className="hg-reg-l">
//             <h2>NIOS 2026: <span>A Year of Determination, Dreams & Success</span></h2>
//             <p>New batch starting soon at Indiranagar. Whether you're going for Stream 1, 2, 3, or 4 — there's a path here for you.</p>
//             <div className="mobile-none">
//               <div className="hg-reg-btns">
//                 <button className="hg-btn-yl cta-btn-2nd">Book Free Counselling</button>
//               </div>
//             </div>
//           </div>
//           <div className="hg-reg-badges-col">
//             <div className="hg-reg-badge">
//               <a href="/nios-admission/admission-in-nios-stream-1">
//                 <strong>NIOS STREAM 1</strong><span>Class 9th/11th Exam</span>
//               </a>
//             </div>
//             <div className="hg-reg-badge">
//               <a href="/nios-admission/admission-in-nios-stream-2">
//                 <strong>NIOS STREAM 2</strong><span>Class 10th/12th Exam</span>
//               </a>
//             </div>
//             <div className="hg-reg-badge">
//               <a href="/nios-admission/admission-in-nios-stream-3&4">
//                 <strong>STREAM 3 & 4</strong><span>On-Demand · 45 Days</span>
//               </a>
//             </div>
//             <div className="desktop-none" style={{ width: "100%" }}>
//               <div className="hg-reg-btns desktop-none">
//                 <button className="hg-btn-yl cta-btn-2nd">Book Free Counselling</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FAQ */}
//       <section className="hg-section" id="faq">
//         <div className="hg-sec">
//           <div className="hg-sh">
//             <h2 className="hg-stitle">Frequently Asked <span>Questions</span></h2>
//             <p className="hg-sdesc">
//               Everything you want to know before enrolling at SS Coaching Indiranagar.
//             </p>
//           </div>
//           <div className="container">
//             <div className="hg-fq-grid">
//               {faqs.map((f, i) => (
//                 <div
//                   key={`faq-${i}`}
//                   className={`hg-fqi ${openFaq === i ? "hg-fqi-open" : ""}`}
//                 >
//                   <button className="hg-fqb" onClick={() => toggle(i)}>
//                     {f.q}
//                     <span className="hg-fqico">{openFaq === i ? "−" : "+"}</span>
//                   </button>
//                   {openFaq === i && <div className="hg-fqa">{f.a}</div>}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* LOCATION */}
//       <section className="hg-section hg-bg-off" id="contact">
//         <div className="hg-sec">
//           <div className="hg-sh">
//             <div className="hg-stag">Visit Us</div>
//             <h2 className="hg-stitle">Find Our <span>Indiranagar Centre</span></h2>
//           </div>
//           <div className="container">
//             <div className="hg-loc-grid">
//               <div className="hg-map-box">
//                 <div className="hg-map-em">🗺️</div>
//                 <div className="hg-map-addr">
//                   Sector 9, Near Lekhraj Market<br />
//                   Indiranagar<br />
//                   Lucknow – 226016
//                 </div>
//                 <div className="hg-map-sub">Near Lekhraj Metro Station</div>
//                 <a
//                   href="https://maps.google.com/?q=Indiranagar+Lucknow+SS+Coaching"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="hg-map-go"
//                 >
//                   📍 Open in Google Maps
//                 </a>
//               </div>
//               <div className="hg-locs">
//                 {[
//                   {
//                     ico: <FaMapMarkerAlt />,
//                     label: "Address",
//                     content: (
//                       <span>
//                         Sector 9, Near Lekhraj Market, Indiranagar, Lucknow – 226016
//                       </span>
//                     ),
//                   },
//                   {
//                     ico: <FaPhoneAlt />,
//                     label: "Phone / WhatsApp",
//                     content: (
//                       <>
//                         <a href="tel:+919839065533">+91 9839065533</a>
//                         <a href="tel:+916386570743">+91 6386570743</a>
//                       </>
//                     ),
//                   },
//                   {
//                     ico: <FaEnvelope />,
//                     label: "Email",
//                     content: <a href="mailto:info@sscoaching.in">info@sscoaching.in</a>,
//                   },
//                   {
//                     ico: <FaClock />,
//                     label: "Office Hours",
//                     content: (
//                       <>
//                         <span>Monday – Saturday: 9:00 AM – 7:00 PM</span>
//                         <span>Sunday: By Appointment Only</span>
//                       </>
//                     ),
//                   },
//                   {
//                     ico: <FaBus />,
//                     label: "How to Reach",
//                     content: (
//                       <>
//                         <span>Near Lekhraj Metro Station</span>
//                         <span>Easy access from Gomti Nagar & Hazratganj · Multiple bus routes</span>
//                       </>
//                     ),
//                   },
//                 ].map((l) => (
//                   <div key={l.label} className="hg-lc">
//                     <div className="hg-lco">{l.ico}</div>
//                     <div>
//                       <strong>{l.label}</strong>
//                       {l.content}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Popup />

//       {/* OTHER BRANCHES */}
//       <div className="ob">
//         <div className="ob-in">
//           <h3>Other Branches in Lucknow</h3>
//           <p>SS Coaching is spread across the city — find a centre near you.</p>
//           <div className="b-row">
//             <a href="/nios-coaching-hazratganj-lucknow" className="bcard">
//               <div>
//                 <strong>Hazratganj Branch</strong>
//                 <span>3rd Floor, Shree Chamber, Near Basant Cinema, Hazratganj</span>
//               </div>
//               <span className="ba">→</span>
//             </a>
//             <a href="/nios-coaching-alambagh-lucknow" className="bcard">
//               <div>
//                 <strong>Alambagh Branch</strong>
//                 <span>U.R. Plaza, Near Phoenix Mall, Alambagh</span>
//               </div>
//               <span className="ba">→</span>
//             </a>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }