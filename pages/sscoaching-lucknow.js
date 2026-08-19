"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Popup from "@/components/home/Popup";
import Hero from "@/components/home/Hero";
import HeroMobile from "@/components/home/HeroMobile";
import ChipSection from "@/components/home/ChipSection";
import MobileQuickInfo from "@/components/home/MobileQuickInfo";
import StatsSectionMobile from "@/components/home/StatsSectionMobile";
import StatsSection from "@/components/home/StatsSection";
import StudentSuccess from "@/components/home/StudentSuccess";
import GoogleReview from "@/components/home/GoogleReview";
import Head from "next/head";
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaBus,
  FaWhatsapp,
  FaEnvelope,
  FaChalkboardTeacher,
  FaBookOpen,
  FaFileAlt,
  FaCalendarAlt,
  FaAward,
} from "react-icons/fa";

/* ─────────────────────────── DATA ─────────────────────────── */

const faqs = [
  {
    q: "What is the best NIOS coaching in Lucknow for 10th and 12th students?",
    a: "The best NIOS coaching in Lucknow for 10th and 12th students is the institute that provides experienced teachers, proper study materials, regular mock tests, and full admission guidance. Many students prefer professional institutes like SS Coaching because they offer structured classes, subject guidance, and support throughout the NIOS admission process in Lucknow.",
  },
  {
    q: "How can I take NIOS admission in Lucknow for 10th or 12th?",
    a: "To complete NIOS admission in Lucknow for 10th or 12th, students must register through the official NIOS portal. The process includes selecting the course, choosing subjects, uploading documents, and paying the admission fee. Many students join a NIOS coaching centre in Lucknow for admission guidance and exam preparation.",
  },
  {
    q: "Who should join NIOS coaching in Lucknow?",
    a: "Students who cannot continue regular schooling can benefit from NIOS coaching in Lucknow for school dropout students, failed students, and working students. It is also suitable for athletes, artists, or anyone who needs a flexible education system with open schooling.",
  },
  {
    q: "Is NIOS certificate valid for government jobs and higher education?",
    a: "Yes, the NIOS board certificate is valid for government jobs, college admissions, and competitive exams in India. NIOS is recognized by the Government of India, and students can apply for graduation courses after completing NIOS 12th in Lucknow.",
  },
  {
    q: "How long does it take to complete NIOS 10th or 12th course?",
    a: "The duration depends on the exam schedule and preparation time. Generally, students can complete NIOS 10th or 12th course in Lucknow within 6 months to 1 year, depending on the exam stream and preparation level.",
  },
  {
    q: "What are the benefits of joining a NIOS coaching centre in Lucknow?",
    a: "Joining a NIOS coaching centre in Lucknow for board exam preparation helps students understand the syllabus better, follow a structured study schedule, and practice with mock tests. Coaching institutes also provide subject guidance, doubt clearing sessions, and exam strategies.",
  },
  {
    q: "What documents are required for NIOS admission in Lucknow?",
    a: "For NIOS online admission in Lucknow, students usually need documents such as previous academic certificates, identity proof (Aadhaar card), passport size photographs, and address proof. A coaching institute can help verify documents and complete the admission process smoothly.",
  },
  {
    q: "Can failed students apply for NIOS coaching in Lucknow?",
    a: "Yes, failed students can apply for NIOS coaching in Lucknow for 10th or 12th board exam improvement. NIOS provides flexible exam options that allow students to complete their education without losing valuable time.",
  },
];

const branches = [
  {
    name: "Hazratganj Branch",
    address:
      "3rd Floor, Shri Chamber, Naza Computer Market, near Basant Cinema, Sushanpura, Nagar Nigam Market, Hazratganj, Lucknow, Uttar Pradesh 226001",
    phone: "098390 65533",
    tel: "09839065533",
    href: "/nios-coaching-hazratganj-lucknow",
    color: "blue",
    icon: "🏛️",
  },
  {
    name: "Indra Nagar Branch",
    address:
      "Infront Babian Restaurant, S97, 3rd Floor Lekhraj Palace, above Rama Sarees, Bhoothnath Market, Indira Nagar, Lucknow, Uttar Pradesh 226016",
    phone: "097921 11121",
    tel: "09792111121",
    href: "/nios-coaching-indiranagar-lucknow",
    color: "teal",
    icon: "🌳",
  },
  {
    name: "Alambagh Branch",
    address:
      "U.R Plaza, near Phoenix Mall, beside Acumen Hotel, Sector B, Bargawan, Alambagh, Lucknow, Uttar Pradesh 226005",
    phone: "099350 35316",
    tel: "09935035316",
    href: "/nios-coaching-alambagh-lucknow",
    color: "orange",
    icon: "🏪",
  },
];

const streams = [
  {
    color: "blue",
    icon: "🎓",
    title: "NIOS Stream 1 — Fresh Start",
    sub: "Class 9th / 11th Failed",
    desc: "Failed Class 9 or 11? Directly appear for Class 10 or 12 through NIOS. No repeating. No attendance needed.",
    pill: "Saves Time",
    href: "/nios-admission/admission-in-nios-stream-1",
  },
  {
    color: "teal",
    icon: "🔁",
    title: "NIOS Stream 2 — Same Year Pass",
    sub: "Board Exam Failed",
    desc: "Failed CBSE, ICSE, or UP Board this year? Don't lose a year. NIOS Stream 2 lets you pass in the very same year.",
    pill: "Same Year Pass",
    href: "/nios-admission/admission-in-nios-stream-2",
  },
  {
    color: "orange",
    icon: "⚡",
    title: "NIOS Stream 3 & 4 — On-Demand",
    sub: "Pass in 45 Days",
    desc: "Pass in as little as 45 days through NIOS On-Demand Exam. Appear when ready — no waiting for exam cycles.",
    pill: "Fastest Option",
    href: "/nios-admission/admission-in-nios-stream-3&4",
  },
];

const whys = [
  {
    icon: <FaChalkboardTeacher />,
    color: "blue",
    title: "Experienced Professionals",
    desc: "NIOS-specialist faculty with years of experience — committed to making every concept simple and every student exam-ready.",
  },
  {
    icon: <FaBookOpen />,
    color: "teal",
    title: "Best Study Materials",
    desc: "Exclusive notes, previous year question papers, and focused mock test series aligned with the latest NIOS syllabus.",
  },
  {
    icon: <FaFileAlt />,
    color: "orange",
    title: "Smooth NIOS Admission",
    desc: "We handle the entire online admission process — form filling, document upload, subject selection — all under one roof.",
  },
  {
    icon: <FaCalendarAlt />,
    color: "green",
    title: "Flexible & No Attendance",
    desc: "Study at your own pace with zero mandatory attendance — perfect for competitive exam aspirants and working students.",
  },
  {
    icon: <FaMapMarkerAlt />,
    color: "purple",
    title: "3 Branches in Lucknow",
    desc: "Located in Hazratganj, Indiranagar, and Alambagh — accessible from every part of the city.",
  },
  {
    icon: <FaAward />,
    color: "red",
    title: "Trusted Since 2001",
    desc: "Over 25 years, 100K+ students guided, 4.8★ Google rating — our legacy is the city's trust and our students' success.",
  },
];

/* ─────────────────────────── COMPONENT ─────────────────────────── */

export default function SSCoachingLucknow() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeWhy, setActiveWhy] = useState(null);
  const toggle = (i) => setOpenFaq((prev) => (prev === i ? null : i));
  const toggleWhy = (i) => setActiveWhy((prev) => (prev === i ? null : i));

  return (
    <div className="hg-page lko-page">
      <Head>
        <title>
          Best NIOS Coaching in Lucknow for 10th & 12th | SS Coaching Lucknow
        </title>
        <meta
          name="description"
          content="SS Coaching is the best NIOS coaching in Lucknow for Class 10th and 12th students. Get expert guidance, complete admission support, and flexible learning across 3 branches — Hazratganj, Indiranagar, and Alambagh."
        />
        <meta
          name="keywords"
          content="NIOS coaching in Lucknow, best NIOS coaching Lucknow, NIOS admission Lucknow, NIOS coaching for 10th Lucknow, NIOS coaching for 12th Lucknow, NIOS institute Lucknow, SS Coaching Lucknow, NIOS 2026 Lucknow, open schooling Lucknow, NIOS board coaching Lucknow"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* ── TOPBAR ── */}
      <div className="hg-topbar">
        <div className="hg-tb-inner">
          <span className="d-flex align-items-center">
            <img
              className="location-pins"
              src="/assets/images/contacts/location.svg"
              alt=""
            />
            <strong>SS Coaching Lucknow</strong> — Hazratganj | Indiranagar | Alambagh
          </span>
          <span className="d-flex align-items-center">
            <img
              src="/assets/icons/footer/call.svg"
              alt="Phone"
              className="contact-icon"
            />
            <a href="tel:+919935035316">+91 99350 35316</a>
            &nbsp;|&nbsp;
            <img
              src="/assets/icons/footer/gmail.svg"
              alt="Email"
              className="contact-icon"
            />
            <a href="mailto:contact@sscoaching.in">contact@sscoaching.in</a>
          </span>
        </div>
      </div>

      <Header />
      <Offcanvas />
      <BranchContactCanvas />

      {/* ── SECTION 1: HERO BANNER ── */}
      <Hero />
      <HeroMobile />

      <br/>

      {/* ── SECTION 1B: H1 + INTRO ── */}
      <section className="hg-intro-section lko-intro">
        <div className="container">
          <h1 className="hg-intro-h1">
            Best NIOS Coaching in Lucknow for Class 10th &amp; 12th Students
          </h1>
          <p className="hg-intro-text">
            Every success story begins with a courageous decision — and at SS Coaching, we
            proudly celebrate the inspiring journeys of our NIOS Board students who dared to
            dream bigger and worked tirelessly to achieve their goals.
          </p>
          <p className="hg-intro-text">
            These shining stars enrolled in Class 10th and 12th through NIOS at SS Coaching —
            the <strong>Best NIOS Coaching in Lucknow</strong> — and today, they stand as
            examples of dedication, perseverance, and success.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: CHIPS + QUICK INFO ── */}
      <ChipSection />
      <MobileQuickInfo />

      {/* ── SECTION 3: CONTACT STRIP ── */}
      <section className="ss-contact-strip-v2">
        <div className="ss-strip-container">
          <div className="ss-mobile-heading desktop-none">Call Us Now!</div>
          <div className="ss-strip-item">
            <div className="ss-strip-inner">
              <a href="tel:09935035316">
                <div className="ss-strip-icon">
                  <img src="/assets/images/contacts/call.svg" alt="Call" />
                </div>
              </a>
              <div>
                <div className="ss-strip-title">SS Coaching Lucknow</div>
                <div className="d-flex gap-2">
                  <a href="tel:09935035316" className="ss-strip-phone">
                    09935035316
                  </a>
                  <a href="tel:09839065533" className="ss-strip-phone">
                    09839065533
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: ABOUT / WHY TRUSTED ── */}
      <section className="hg-section lko-about-section" id="about">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">
              Why SS Coaching is a{" "}
              <span>Trusted NIOS Coaching in Lucknow</span>
            </h2>
          </div>
          <div className="container">
            <div className="lko-about-grid">
              <div className="lko-about-images">
                <img
                  src="/assets/images/gallery/gallery2.png"
                  alt="SS Coaching Lucknow classroom"
                  className="lko-about-img lko-img-main"
                />
                <img
                  src="/assets/images/gallery/gallery5.png"
                  alt="Teachers at SS Coaching Lucknow"
                  className="lko-about-img lko-img-secondary"
                />
                <div className="lko-about-badge">
                  <strong>25+</strong>
                  <span>Years of Trust</span>
                </div>
              </div>
              <div className="lko-about-content">
                <div className="lko-tag">Established 2001</div>
                <p>
                  What makes student achievements at SS Coaching even more remarkable is their
                  focus on preparing for competitive exams like IIT, JEE, NEET, CA, CS, CLAT, and
                  more — while continuing their board education through NIOS.
                </p>
                <p>
                  NIOS offers flexibility that helps students save time and focus on their goals.
                  With no strict attendance rules and a supportive learning environment, SS Coaching
                  has become a <strong>trusted choice for NIOS Coaching in Lucknow</strong>.
                </p>
                <p>
                  This growing trend reflects how students are choosing a smarter path toward
                  higher education and career success.
                </p>
                <div className="lko-about-stats">
                  <div className="lko-stat">
                    <strong>100K+</strong>
                    <span>Students Passed</span>
                  </div>
                  <div className="lko-stat">
                    <strong>4.8 ★</strong>
                    <span>Google Rating</span>
                  </div>
                  <div className="lko-stat">
                    <strong>3</strong>
                    <span>Branches</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: STATS ── */}
      <StatsSectionMobile />
      <StatsSection />

      {/* ── SECTION 6: STUDENT SUCCESS (TOP) ── */}
      <section className="hg-section" id="success-stories">
        <div className="hg-sec">
          <div className="hg-sh">
            <div className="lko-success-tag">Real students. Real success stories.</div>
            <h2 className="hg-stitle">
              Student <span>Success Stories</span>
            </h2>
            <p className="hg-sdesc">
              Meet the toppers who chose NIOS at SS Coaching — and never looked back.
            </p>
          </div>
          <StudentSuccess />
          <div className="container">
            <div className="lko-success-text">
              <p>
                If you are determined to complete your secondary or senior secondary education
                while focusing on competitive goals, <strong>SS Coaching – Best NIOS Coaching in
                Lucknow</strong> is here to guide you.
              </p>
              <p>
                At SS Coaching, we understand that every student's journey is different. Some
                continue after a gap, while others choose flexibility for competitive preparation.
                Through NIOS, students can complete Class 10th and 12th with a flexible schedule
                that supports their goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: GOOGLE REVIEWS ── */}
      <GoogleReview />

      {/* ── SECTION 8: COMPETITIVE EXAM PREP ── */}
      <section className="hg-section lko-comp-section hg-bg-off" id="competitive">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">
              Balance Board Education with{" "}
              <span>Competitive Exam Preparation</span>
            </h2>
          </div>
          <div className="container">
            <div className="lko-comp-grid">
              <div className="lko-comp-content">
                <p>
                  Many students prefer NIOS Coaching in Lucknow because it helps them manage time
                  while preparing for exams like JEE, NEET, CLAT, CA Foundation, and more.
                </p>
                <p>
                  With proper guidance and a focused plan, students can balance both academics and
                  career goals. NIOS also reduces academic pressure through flexible exams and
                  subject choices.
                </p>
                <p>
                  With the right mentorship from the{" "}
                  <strong>Best NIOS Coaching in Lucknow</strong>, students can confidently move
                  toward a better future.
                </p>
                <div className="lko-comp-exams">
                  {["JEE / IIT", "NEET", "CLAT", "CA Foundation", "CS", "ICWA"].map((ex) => (
                    <span key={ex} className="lko-exam-pill">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lko-comp-visual">
                <img
                  src="/assets/images/gallery/gallery8.png"
                  alt="Students balancing NIOS board and competitive exam preparation at SS Coaching Lucknow"
                  className="lko-comp-img"
                />
                <div className="lko-comp-card">
                  <div className="lko-comp-card-ico">🎯</div>
                  <div>
                    <strong>Zero Attendance</strong>
                    <span>Study at your own pace</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: STREAM OPTIONS ── */}
      <section className="hg-section" id="streams">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">
              NIOS Admission Streams —{" "}
              <span>Choose Your Path</span>
            </h2>
            <p className="hg-sdesc">
              Every student situation is different. SS Coaching guides you to the right stream.
            </p>
          </div>
          <div className="container">
            <div className="lko-stream-grid">
              {streams.map((s) => (
                <a
                  key={s.title}
                  href={s.href}
                  className={`lko-stream-card lko-stream-${s.color}`}
                >
                  <div className={`lko-str-icon lko-str-icon-${s.color}`}>{s.icon}</div>
                  <div className="lko-str-body">
                    <div className="lko-str-sub">{s.sub}</div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                  <span className={`hg-pill hg-pill-${s.color}`}>{s.pill}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 10: REGISTRATION CTA ── */}
      <div className="hg-reg">
        <div className="hg-reg-in">
          <div className="hg-reg-l">
            <h2>
              Registration Open! <span>Limited Seats</span>
            </h2>
            <p>
              Admissions for NIOS 2026 are open now across all three branches. Don't wait —
              seats fill fast.
            </p>
            <div className="hg-reg-btns">
              <button className="hg-btn-yl cta-btn-2nd">Enrol Now</button>
              <a href="https://wa.me/09935035316" className="hg-btn-cl">
                <FaWhatsapp className="text-green-500 whatsppp-ico" /> WhatsApp Us
              </a>
            </div>
          </div>
          <div className="hg-reg-badge">
            <strong>95%</strong>
            <span>
              Pass Rate
              <br />
              2024 Batch
            </span>
          </div>
        </div>
      </div>

      {/* ── SECTION 11: SUCCESSFUL LEARNERS ── */}
      <section className="hg-section hg-bg-off" id="learners">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">
              Successful Learners of <span>NIOS Board</span>
            </h2>
          </div>
          <div className="container">
            <div className="lko-learners-grid">
              <div className="lko-learners-content">
                <p>
                  Many students perform well in some subjects but struggle in others. At SS
                  Coaching — NIOS Coaching in Lucknow, students can appear for selected subjects
                  first and complete remaining ones later.
                </p>
                <p>
                  This approach reduces pressure and improves success rates. NIOS is also ideal
                  for students who failed in Class 9th or 11th and want to directly appear for
                  10th or 12th.
                </p>
                <p>
                  With expert guidance, students can continue their education confidently and
                  build a better future.
                </p>
                <div className="lko-learner-tags">
                  {[
                    "Failed in 9th / 11th",
                    "Board Exam Failed",
                    "School Dropouts",
                    "Working Students",
                    "Competitive Aspirants",
                    "Flexible Learners",
                  ].map((t) => (
                    <span key={t} className="lko-learner-tag">
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="lko-learners-visual">
                <img
                  src="/assets/images/gallery/gallery4.png"
                  alt="Successful NIOS board students at SS Coaching Lucknow"
                  className="lko-learners-img"
                />
                <div className="lko-success-tag-badge">
                  <div className="lko-success-tag-ico">🏆</div>
                  <div>
                    <strong>See how our students achieved success.</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "40px" }}>
            <StudentSuccess />
          </div>
        </div>
      </section>

      {/* ── SECTION 12: WHY BEST NIOS — DESKTOP ── */}
      <section className="hg-section mobile-none" id="why-us">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">
              Why SS Coaching is the <span>Best NIOS</span> in Lucknow
            </h2>
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

      {/* ── SECTION 12B: WHY BEST NIOS — MOBILE ── */}
      <section className="hg-section desktop-none" id="why-us-mobile">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">
              Why SS Coaching is the <span>Best NIOS</span> in Lucknow
            </h2>
          </div>
          <div className="container">
            <div className="hg-why-grid">
              {whys.map((w, index) => (
                <div key={w.title} className="hg-wc">
                  <div
                    className="why-row"
                    onClick={() => toggleWhy(index)}
                  >
                    <div className={`hg-wico hg-wico-${w.color}`}>{w.icon}</div>
                    <h4>{w.title}</h4>
                  </div>
                  <p
                    className={`why-desc ${activeWhy === index ? "show-desc" : ""}`}
                  >
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 13: BRANCHES ── */}
      <section className="hg-section hg-bg-off lko-branches-section" id="branches">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">
              Our NIOS Coaching <span>Branches in Lucknow</span>
            </h2>
            <p className="hg-sdesc">
              3 conveniently located branches — find a centre near you.
            </p>
          </div>
          <div className="container">
            <div className="lko-branch-grid">
              {branches.map((b) => (
                <div key={b.name} className={`lko-branch-card lko-branch-${b.color}`}>
                  <div className="lko-branch-top">
                    <div className={`lko-branch-ico lko-branch-ico-${b.color}`}>
                      {b.icon}
                    </div>
                    <h3>{b.name}</h3>
                  </div>
                  <div className="lko-branch-addr">
                    <FaMapMarkerAlt className="lko-branch-pin" />
                    <p>{b.address}</p>
                  </div>
                  <div className="lko-branch-phone">
                    <FaPhoneAlt className="lko-branch-pin" />
                    <a href={`tel:${b.tel}`}>{b.phone}</a>
                  </div>
                  <a href={b.href} className={`lko-branch-btn lko-branch-btn-${b.color}`}>
                    View Branch →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 14: NIOS 2026 STREAM CTA BANNER ── */}
      <div className="hg-reg">
        <div className="hg-reg-in">
          <div className="hg-reg-l">
            <h2>
              NIOS 2026: <span>A Year of Determination, Dreams &amp; Success</span>
            </h2>
            <p>
              New batch starting soon at all branches. Whether you're going for Stream 1, 2, 3,
              or 4 — there's a path here for you.
            </p>
            <div className="mobile-none">
              <div className="hg-reg-btns">
                <button className="hg-btn-yl cta-btn-2nd">
                  Book Free Counselling
                </button>
              </div>
            </div>
          </div>
          <div className="hg-reg-badges-col">
            <div className="hg-reg-badge">
              <a href="/nios-admission/admission-in-nios-stream-1">
                <strong>NIOS STREAM 1</strong>
                <span>Class 9th/11th Exam</span>
              </a>
            </div>
            <div className="hg-reg-badge">
              <a href="/nios-admission/admission-in-nios-stream-2">
                <strong>NIOS STREAM 2</strong>
                <span>Class 10th/12th Exam</span>
              </a>
            </div>
            <div className="hg-reg-badge">
              <a href="/nios-admission/admission-in-nios-stream-3&4">
                <strong>STREAM 3 &amp; 4</strong>
                <span>On-Demand · 45 Days</span>
              </a>
            </div>
            <div className="desktop-none" style={{ width: "100%" }}>
              <div className="hg-reg-btns desktop-none">
                <button className="hg-btn-yl cta-btn-2nd">
                  Book Free Counselling
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 15: 3-STEP PROCESS ── */}
      <section className="hg-section" id="process">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">
              Our Simple <span>3-Step Process</span>
            </h2>
            <p className="hg-sdesc">
              Getting your NIOS admission done at SS Coaching takes just 3 easy steps.
            </p>
          </div>
          <div className="hg-proc-grid">
            <div className="hg-proc-vis">
              <span className="hg-proc-ico">
                <img
                  src="/assets/images/home/steps-process/photo.svg"
                  alt="Process"
                />
              </span>
              <div className="hg-proc-big">3</div>
            </div>
            <div className="hg-steps">
              {[
                {
                  num: "01",
                  cls: "hg-snum-blue",
                  title: "Free Counselling",
                  desc: "Get expert guidance for NIOS admission in Lucknow. Our experts assess your situation and recommend the perfect NIOS stream at zero cost.",
                },
                {
                  num: "02",
                  cls: "hg-snum-teal",
                  title: "Admission & Documentation",
                  desc: "We handle the complete NIOS admission process including subject selection, document verification, online registration, and fee payment — hassle-free.",
                },
                {
                  num: "03",
                  cls: "hg-snum-orange",
                  title: "Study, Appear & Pass",
                  desc: "Start your coaching, prepare for exams with structured study material, and complete your 10th or 12th successfully.",
                },
              ].map((s) => (
                <div key={s.num} className="hg-step">
                  <div className={`hg-snum ${s.cls}`}>{s.num}</div>
                  <div className="hg-sbody">
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 16: GALLERY ── */}
      <section className="hg-section hg-bg-off" id="gallery">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">
              Our <span>Gallery</span>
            </h2>
          </div>
          <div className="container">
            <div className="hg-gallery-grid">
              {[
                { src: "/assets/images/gallery/gallery5.png", alt: "SS Coaching Lucknow Classroom" },
                { src: "/assets/images/gallery/gallery8.png", alt: "Students at SS Coaching Lucknow" },
                { src: "/assets/images/gallery/gallery4.png", alt: "Teaching session at SS Coaching Lucknow" },
                { src: "/assets/images/gallery/gallery3.png", alt: "Interior of SS Coaching Lucknow" },
              ].map((img) => (
                <div key={img.src} className="hg-gallery-item">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="hg-gallery-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 17: FAQ ── */}
      <section className="hg-section" id="faq">
        <div className="hg-sec">
          <div className="hg-sh">
            <h2 className="hg-stitle">
              Frequently Asked <span>Questions</span>
            </h2>
            <p className="hg-sdesc">
              Everything you want to know before enrolling at SS Coaching Lucknow.
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

      {/* ── OTHER BRANCHES FOOTER STRIP ── */}
      <div className="ob">
        <div className="ob-in">
          <h3>Find Us at Your Nearest Branch</h3>
          <p>SS Coaching is spread across the city — find a centre near you.</p>
          <div className="b-row">
            <a href="/nios-coaching-hazratganj-lucknow" className="bcard">
              <div>
                <strong>Hazratganj Branch</strong>
                <span>3rd Floor, Shree Chamber, Hazratganj, Lucknow</span>
              </div>
              <span className="ba">→</span>
            </a>
            <a href="/nios-coaching-indiranagar-lucknow" className="bcard">
              <div>
                <strong>Indiranagar Branch</strong>
                <span>Lekhraj Palace, Bhoothnath Market, Indiranagar</span>
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

      <Popup />
      <Footer />
    </div>
  );
}