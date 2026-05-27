import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const faqs = [
  {
    question: "How many subjects are required in NIOS Class 10?",
    answer: "NIOS Secondary students typically need to pass 5 subjects to receive the Secondary certificate. Students can choose from a range of compulsory and elective subjects based on their academic background and stream preference."
  },
  {
    question: "Can I choose my own subjects in NIOS Class 12?",
    answer: "Yes. NIOS offers subject flexibility at Senior Secondary level. Students can select subjects based on their preferred stream — Science, Commerce, or Arts — along with vocational options. Proper guidance helps avoid difficult combinations."
  },
  {
    question: "What is TMA in NIOS and how does it affect results?",
    answer: "TMA stands for Tutor Marked Assignment. It is a mandatory assignment component submitted to the study centre. TMA marks contribute to the final NIOS result, making proper assignment completion an important part of board preparation."
  },
  {
    question: "Is NIOS suitable for failed and dropout students?",
    answer: "Yes. NIOS (National Institute of Open Schooling) is specifically designed to support students who could not complete regular schooling — including failed candidates, school dropouts, private learners, and working individuals seeking board certification."
  },
  {
    question: "Are NIOS study materials available for all subjects?",
    answer: "SS Coaching provides chapter-wise study materials covering major NIOS Secondary and Sr. Secondary subjects. Materials include simplified notes, important questions, solved assignments, and previous question papers for board exam preparation."
  },
  {
    question: "How is the NIOS syllabus different from CBSE?",
    answer: "The NIOS syllabus is generally more flexible and self-paced compared to CBSE. While topics overlap in many core subjects, NIOS places less emphasis on classroom regularity and more on assignment completion and public exam performance — making it accessible to a wider range of learners."
  }
];

export default function NIOSCompleteSubjectsList() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>NIOS Subject List, Syllabus & Study Material for Class 10 & 12 | SS Coaching</title>
        <meta
          name="description"
          content="Get complete NIOS subject list, detailed syllabus for Class 10 and Class 12, and chapter-wise study materials. SS Coaching guides failed, dropout & private students for NIOS board preparation."
        />
        <meta
          name="keywords"
          content="NIOS subject list, NIOS syllabus class 10, NIOS syllabus class 12, NIOS study material, NIOS secondary course material, NIOS sr secondary material, NIOS admission guidance, NIOS open schooling"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        {/* SECTION 1 — HERO BANNER */}
        <div style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)", padding: "60px 0 50px" }}>
          <div className="container">
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "inline-block", background: "#4441e5", color: "#fff", borderRadius: "20px", padding: "6px 22px", fontSize: "14px", fontWeight: "600", marginBottom: "22px" }}>
                SS Coaching — NIOS Academic Hub
              </span>
              <h1 className="nios-125h-senior-hero-title" style={{ marginBottom: "18px" }}>
                Complete NIOS Subject Guidance for Class 10 & 12 Students
              </h1>
              <p className="nios-125h-senior-hero-subtitle" style={{ marginBottom: "14px" }}>
                Subject Lists · Detailed Syllabus · Chapter-wise Study Materials for Secondary & Senior Secondary
              </p>
              <p style={{ fontSize: "16px", color: "#444", lineHeight: "1.8", maxWidth: "720px", margin: "0 auto 32px" }}>
                Explore every important academic resource needed for smarter NIOS board preparation — from understanding subject combinations and syllabus planning to complete chapter-wise study materials for open schooling success.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="#nios-resources" style={{ display: "inline-block", padding: "13px 30px", background: "#4441e5", color: "#fff", borderRadius: "8px", fontWeight: "700", fontSize: "15px", textDecoration: "none" }}>
                  Explore NIOS Resources
                </a>
                <a href="tel:9792111121" style={{ display: "inline-block", padding: "13px 30px", border: "2px solid #4441e5", color: "#4441e5", borderRadius: "8px", fontWeight: "600", fontSize: "15px", textDecoration: "none" }}>
                  Get Free Counseling
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2 — INTRODUCTION */}
        <div className="syllabus-nios" id="nios-resources">
          <div className="container">
            <p style={{ color: "#4441e5", fontWeight: "600", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>
              NIOS Academic Resource Centre
            </p>
            <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "22px" }}>
              Your Complete Destination for NIOS Subjects, Syllabus & Study Support
            </h2>
            <p style={{ fontSize: "16px", color: "#333", lineHeight: "1.8", marginBottom: "16px" }}>
              Students preparing through NIOS — the National Institute of Open Schooling — often face one critical challenge after admission: they do not know where to begin. Many students remain confused about NIOS subject combinations, some struggle to understand the exact Secondary or Sr. Secondary syllabus, while others waste weeks searching for reliable notes and course materials across scattered websites.
            </p>
            <p style={{ fontSize: "16px", color: "#333", lineHeight: "1.8", marginBottom: "28px" }}>
              To make NIOS board preparation easier and more structured, SS Coaching has organised every major academic support system into one dedicated subject hub. Here, students can smoothly move from the NIOS Subject List Class 10 and NIOS Subject List Class 12 to complete chapter-wise Syllabus for Class 10, Syllabus for Class 12, NIOS Secondary Course Material, and NIOS Sr. Secondary Course Material — all without confusion or wasted time.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "30px" }}>
              {["✔ Better Subject Planning", "✔ Updated Syllabus Guidance", "✔ Ready Study Materials", "✔ Easier Board Preparation"].map((chip, i) => (
                <span key={i} style={{ background: "#eef2ff", color: "#4441e5", padding: "9px 20px", borderRadius: "20px", fontWeight: "600", fontSize: "14px" }}>
                  {chip}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {[
                { label: "Subject List 10th", href: "/subject/nios-10th-secondary" },
                { label: "Subject List 12th", href: "/subject/nios-10th-secondary" },
                { label: "Syllabus Class 10", href: "/subject/syllabus-class-10th" },
                { label: "Syllabus Class 12", href: "/subject/syllabus-class-12th" },
                { label: "Secondary Material", href: "/subject/secondary-course-material" },
                { label: "Sr. Secondary Material", href: "/subject/sr-secondary-course-material" },
              ].map((btn, i) => (
                <a key={i} href={btn.href} style={{ display: "inline-block", padding: "10px 22px", background: "#4441e5", color: "#fff", borderRadius: "8px", fontWeight: "600", fontSize: "14px", textDecoration: "none" }}>
                  {btn.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3 — SUBJECT LIST CLASS 10th */}
        <div className="sl-section sl-bg-light">
          <div className="container">
            <div className="sl-row">
              <div className="sl-img-col">
                <div className="sl-img-wrap">
                  <img
                    src="/assets/images/nios-admission/stream2-about.webp"
                    alt="NIOS Subject List Class 10"
                    className="sl-img"
                  />
                </div>
              </div>
              <div className="sl-text-col">
                <p className="sl-label">Secondary Level</p>
                <h2 className="sl-heading">NIOS Subject List for Class 10th (Secondary)</h2>
                <p className="sl-para">
                  Selecting the right NIOS subjects at Secondary level is one of the most important academic decisions. The wrong subject combination makes studies unnecessarily difficult, increases exam pressure, and lowers passing confidence — especially for students who have already faced failures in regular board exams.
                </p>
                <p className="sl-para">
                  This section helps students understand the complete NIOS Secondary subject structure — including compulsory subjects, elective options, and scoring combinations — before finalising admission. It is especially valuable for failed students, private learners, school dropouts, and candidates who need lower study pressure with realistic passing chances in the NIOS board examination.
                </p>
                <ul className="sl-list">
                  <li>Easy subject selection guidance</li>
                  <li>Compulsory vs elective clarity</li>
                  <li>Scoring combinations explained</li>
                  <li>Lower academic burden options</li>
                  <li>Guidance for failed students</li>
                  <li>Private & dropout-friendly plan</li>
                </ul>
                <p className="sl-italic">A strong NIOS subject start creates a strong exam finish.</p>
                <a href="/subject/nios-10th-secondary" className="sl-btn">Explore NIOS Class 10 Subjects</a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4 — SUBJECT LIST CLASS 12th */}
        <div className="sl-section sl-bg-white">
          <div className="container">
            <div className="sl-row">
              <div className="sl-text-col">
                <p className="sl-label">Senior Secondary Level</p>
                <h2 className="sl-heading">NIOS Subject List for Class 12th (Sr. Secondary)</h2>
                <p className="sl-para">
                  Senior Secondary subject planning requires much more careful thought because NIOS Class 12 subjects are broader, directly tied to future academic goals, and carry long-term implications for higher education and career planning. Choosing subjects without informed guidance often creates lasting academic stress.
                </p>
                <p className="sl-para">
                  This section gives students a comprehensive understanding of all NIOS Sr. Secondary subject options so they can choose balanced stream-wise combinations aligned with their exam comfort level and future plans. Students learn how to avoid difficult random selections and build a smarter, more manageable Class 12 NIOS preparation path.
                </p>
                <ul className="sl-list">
                  <li>Stream-wise subject guidance</li>
                  <li>Balanced subject combinations</li>
                  <li>Lower exam pressure options</li>
                  <li>Future-focused planning support</li>
                  <li>Science, Arts & Commerce streams</li>
                  <li>Vocational subject options</li>
                </ul>
                <p className="sl-italic">The right NIOS Sr. Secondary planning always saves effort later.</p>
                <a href="/subject/nios-10th-secondary" className="sl-btn">Explore NIOS Class 12 Subjects</a>
              </div>
              <div className="sl-img-col">
                <div className="sl-img-wrap">
                  <img
                    src="/assets/images/nios-admission/stream3&4.webp"
                    alt="NIOS Subject List Class 12"
                    className="sl-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5 — TRUST STRIP */}
        <div style={{ background: "#4441e5", padding: "18px 0", overflow: "hidden" }}>
          <div style={{ display: "flex", animation: "niosMarquee 28s linear infinite", whiteSpace: "nowrap" }}>
            {[
              "Smarter NIOS Subject Selection",
              "Better Syllabus Direction",
              "Organised Study Notes & Materials",
              "Faster Exam Readiness",
              "TMA & Assignment Support",
              "Trusted by NIOS Students",
            ].concat([
              "Smarter NIOS Subject Selection",
              "Better Syllabus Direction",
              "Organised Study Notes & Materials",
              "Faster Exam Readiness",
              "TMA & Assignment Support",
              "Trusted by NIOS Students",
            ]).map((item, i) => (
              <span key={i} style={{ color: "#fff", fontWeight: "600", fontSize: "15px", padding: "0 40px", flexShrink: 0 }}>
                · {item}
              </span>
            ))}
          </div>
        </div>

        {/* SECTION 6 — SYLLABUS CLASS 10th */}
        <div className="sl-section sl-bg-light">
          <div className="container">
            <div className="sl-row">
              <div className="sl-img-col">
                <div className="sl-img-wrap">
                  <img
                    src="/assets/images/nios-admission/stream3&4-info.webp"
                    alt="NIOS Syllabus Class 10"
                    className="sl-img"
                  />
                </div>
              </div>
              <div className="sl-text-col">
                <p className="sl-label">Syllabus — Secondary</p>
                <h2 className="sl-heading">NIOS Syllabus for Class 10th — Chapter-wise Study Roadmap</h2>
                <p className="sl-para">
                  Many NIOS students begin their preparation by simply reading books from page one — but without understanding the syllabus, this approach wastes significant time. NIOS Secondary preparation becomes far more efficient when students clearly know which chapters carry exam importance, which units are assignment-based, and which topics appear most frequently in public examinations.
                </p>
                <p className="sl-para">
                  This section provides a focused, chapter-wise NIOS Class 10 study roadmap so learners can divide subjects into smaller, achievable monthly targets and complete their preparation with greater clarity. Instead of random reading, students follow a practical, exam-oriented learning route designed specifically for NIOS Secondary board success.
                </p>
                <ul className="sl-list">
                  <li>Chapter-wise exam clarity</li>
                  <li>Important topics highlighted</li>
                  <li>Better TMA assignment support</li>
                  <li>Monthly target planning</li>
                  <li>Faster revision structure</li>
                  <li>Board exam-oriented focus</li>
                </ul>
                <p className="sl-italic">A well-planned NIOS syllabus always removes unnecessary confusion.</p>
                <a href="/subject/syllabus-class-10th" className="sl-btn">View NIOS Class 10 Syllabus</a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 7 — SYLLABUS CLASS 12th */}
        <div className="sl-section sl-bg-white">
          <div className="container">
            <div className="sl-row">
              <div className="sl-text-col">
                <p className="sl-label">Syllabus — Sr. Secondary</p>
                <h2 className="sl-heading">NIOS Syllabus for Class 12th — Structured Chapter Planning</h2>
                <p className="sl-para">
                  NIOS Sr. Secondary subjects are considerably more detailed and lengthy compared to Secondary level, making systematic chapter planning absolutely essential. Without a clear NIOS Class 12 syllabus map, students often feel overwhelmed and lose consistency — leading to incomplete preparation close to exam time.
                </p>
                <p className="sl-para">
                  This section helps learners understand the complete NIOS 12th curriculum in a more manageable, step-by-step format. It provides proper chapter flow, practical-plus-theory understanding, TMA (Tutor Marked Assignment) focus, and revision support — allowing students to study with structured direction rather than an unplanned burden that grows closer to public exam dates.
                </p>
                <ul className="sl-list">
                  <li>Detailed chapter-wise planning</li>
                  <li>Practical + theory understanding</li>
                  <li>TMA submission guidance</li>
                  <li>Better revision route</li>
                  <li>Stress-free preparation path</li>
                  <li>Exam-focused topic priority</li>
                </ul>
                <p className="sl-italic">A structured NIOS syllabus turns difficult studies into achievable goals.</p>
                <a href="/subject/syllabus-class-12th" className="sl-btn">View NIOS Class 12 Syllabus</a>
              </div>
              <div className="sl-img-col">
                <div className="sl-img-wrap">
                  <img
                    src="/assets/images/nios-admission/stream2-about.webp"
                    alt="NIOS Syllabus Class 12"
                    className="sl-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 8 — COURSE MATERIAL CARDS */}
        <div style={{ background: "#f0f4ff", padding: "60px 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "14px" }}>
                NIOS Study Materials — Secondary & Sr. Secondary
              </h2>
              <p className="nios-125h-senior-hero-subtitle">
                Chapter-wise notes, solved assignments, previous papers, and TMA support — everything a NIOS student needs, in one place.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "28px" }}>

              <div style={{ flex: "1 1 300px", background: "#fff", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
                <h3 className="nios-125h-senior-section-title" style={{ marginBottom: "16px" }}>
                  NIOS Secondary Course Material (Class 10)
                </h3>
                <p style={{ fontSize: "15px", color: "#333", lineHeight: "1.8", marginBottom: "14px" }}>
                  Good NIOS Secondary preparation requires more than just reading textbooks. Students need subject-specific notes that are simplified for self-study, assignment guidance that follows the NIOS pattern, and previous paper practice that builds real exam confidence. Without the right course material, students spend more time searching than actually learning.
                </p>
                <p style={{ fontSize: "15px", color: "#333", lineHeight: "1.8", marginBottom: "20px" }}>
                  SS Coaching's Secondary course material brings together all essential study resources in one structured package — making self-study faster, more organised, and genuinely effective for NIOS board exam preparation.
                </p>
                <ul style={{ paddingLeft: "20px", marginBottom: "26px", lineHeight: "2.2" }}>
                  <li>Chapter-wise simplified notes</li>
                  <li>Important questions per subject</li>
                  <li>Solved TMA assignments</li>
                  <li>Quick revision sheets</li>
                  <li>Previous year question papers</li>
                  <li>Self-study friendly format</li>
                </ul>
                <a href="/subject/secondary-course-material" style={{ display: "block", textAlign: "center", padding: "13px", background: "#4441e5", color: "#fff", borderRadius: "8px", fontWeight: "700", fontSize: "15px", textDecoration: "none" }}>
                  Get Class 10 Study Material
                </a>
              </div>

              <div style={{ flex: "1 1 300px", background: "#fff", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
                <h3 className="nios-125h-senior-section-title" style={{ marginBottom: "16px" }}>
                  NIOS Sr. Secondary Course Material (Class 12)
                </h3>
                <p style={{ fontSize: "15px", color: "#333", lineHeight: "1.8", marginBottom: "14px" }}>
                  Senior Secondary NIOS preparation demands higher-quality study resources because subjects are longer, theory is more detailed, and practical components add extra preparation demand. Students who prepare without proper structured notes often find revision stressful and incomplete as exam dates approach.
                </p>
                <p style={{ fontSize: "15px", color: "#333", lineHeight: "1.8", marginBottom: "20px" }}>
                  SS Coaching's Sr. Secondary course material provides detailed subject-wise notes, theory explanations, TMA (Tutor Marked Assignment) samples, sample papers, and practical guidance — giving students a complete, confidence-building revision toolkit tailored specifically for NIOS Class 12 board exams.
                </p>
                <ul style={{ paddingLeft: "20px", marginBottom: "26px", lineHeight: "2.2" }}>
                  <li>Detailed subject-wise notes</li>
                  <li>Theory support & explanation</li>
                  <li>Sample papers with solutions</li>
                  <li>TMA guidance & samples</li>
                  <li>Practical exam preparation</li>
                  <li>Structured revision resources</li>
                </ul>
                <a href="/subject/sr-secondary-course-material" style={{ display: "block", textAlign: "center", padding: "13px", background: "#4441e5", color: "#fff", borderRadius: "8px", fontWeight: "700", fontSize: "15px", textDecoration: "none" }}>
                  Get Class 12 Study Material
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* SECTION 9 — SEO SUPPORT CONTENT BAND */}
        <div className="syllabus-nios">
          <div className="container">
            <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "22px" }}>
              Everything You Need for a Smarter NIOS Learning Journey
            </h2>
            <p style={{ fontSize: "16px", color: "#333", lineHeight: "1.8", marginBottom: "16px" }}>
              NIOS — the National Institute of Open Schooling — offers a flexible and recognised pathway to Secondary and Senior Secondary certification for students across India. However, the open schooling model works best when students have access to proper academic guidance rather than scattered, unreliable resources. That is exactly the gap SS Coaching addresses through this dedicated NIOS subject and syllabus resource hub.
            </p>
            <p style={{ fontSize: "16px", color: "#333", lineHeight: "1.8" }}>
              By connecting every critical academic stage — from choosing the right NIOS subject combination and understanding the correct Class 10 or Class 12 syllabus, to accessing chapter-wise notes and course materials — SS Coaching ensures that students no longer waste time searching across multiple platforms. Whether you are a failed student seeking a fresh academic start, a school dropout planning your board completion, or a private candidate preparing for NIOS public examinations, every resource you need is structured, accessible, and ready to support your preparation from day one. Our aim is to make NIOS board preparation more confident, more organised, and genuinely achievable for every learner.
            </p>
          </div>
        </div>

        {/* SECTION 10 — STUDENT BENEFIT SECTION */}
        <div style={{ background: "#101727", padding: "60px 0" }}>
          <div className="container">
            <h2 className="nios-125h-senior-hero-title" style={{ color: "#fff", textAlign: "center", marginBottom: "16px" }}>
              Built Especially for Failed, Dropout & Private Students
            </h2>
            <p style={{ color: "#ccc", fontSize: "16px", textAlign: "center", lineHeight: "1.8", maxWidth: "700px", margin: "0 auto 40px" }}>
              SS Coaching provides simplified academic support designed to reduce confusion, build confidence, and give every NIOS student — regardless of their past academic history — a real, achievable path to board certification.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginBottom: "40px" }}>
              <div style={{ flex: "1 1 250px", background: "#1e2a3a", borderRadius: "12px", padding: "30px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "14px", color: "#fff" }}>Easy to Understand</h3>
                <p style={{ fontSize: "15px", color: "#aab", lineHeight: "1.8" }}>
                  Simple, student-friendly notes and syllabus breakdowns that avoid unnecessary complexity — designed for learners who study independently without classroom support.
                </p>
              </div>
              <div style={{ flex: "1 1 250px", background: "#1e2a3a", borderRadius: "12px", padding: "30px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "14px", color: "#fff" }}>Time-Saving Resources</h3>
                <p style={{ fontSize: "15px", color: "#aab", lineHeight: "1.8" }}>
                  Chapter-wise materials, solved assignments, and organised syllabus guides that save weeks of searching — so students can spend more time preparing and less time looking.
                </p>
              </div>
              <div style={{ flex: "1 1 250px", background: "#1e2a3a", borderRadius: "12px", padding: "30px" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "14px", color: "#fff" }}>Better Passing Confidence</h3>
                <p style={{ fontSize: "15px", color: "#aab", lineHeight: "1.8" }}>
                  With the right subjects, a clear syllabus plan, and proper study materials, NIOS students gain the structured preparation foundation needed to pass the board exam with genuine confidence.
                </p>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <a href="tel:9792111121" style={{ display: "inline-block", padding: "14px 36px", background: "#4441e5", color: "#fff", borderRadius: "8px", fontWeight: "700", fontSize: "15px", textDecoration: "none" }}>
                Talk to NIOS Experts
              </a>
            </div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <section className="faq-section pt-50">
          <div className="container">
            <div className="faq-container">
              <h2 className="faq-title">
                <span className="highlight">FAQ:</span> Frequently Asked Questions about NIOS Subjects & Syllabus
              </h2>
              <p style={{ color: "#666", fontSize: "16px", marginBottom: "28px", textAlign: "center" }}>
                Quick answers to the most common NIOS academic queries from students and parents.
              </p>
              <div className="faq-list">
                {faqs.map((item, index) => (
                  <div
                    key={index}
                    className={`faq-item ${openIndex === index ? "expanded" : ""}`}
                  >
                    <div
                      className="faq-question d-flex justify-content-between align-items-center"
                      onClick={() => toggleFAQ(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="faq-question-text">{item.question}</div>
                      <div className="faq-icon">
                        {openIndex === index ? (
                          <AiOutlineClose size={28} />
                        ) : (
                          <AiOutlinePlus size={28} />
                        )}
                      </div>
                    </div>
                    {openIndex === index && item.answer && (
                      <div className="faq-answer mt-2">{item.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 11 — FINAL CTA */}
        <div style={{ background: "linear-gradient(135deg, #4441e5 0%, #2d2ab0 100%)", padding: "60px 0", textAlign: "center" }}>
          <div className="container">
            <h2 className="nios-125h-senior-hero-title" style={{ color: "#fff", marginBottom: "18px" }}>
              Need Help with NIOS Admission or Board Preparation?
            </h2>
            <p style={{ color: "#dde", fontSize: "16px", lineHeight: "1.8", maxWidth: "720px", margin: "0 auto 36px" }}>
              Our experienced NIOS faculty is ready to guide you with subject selection, syllabus planning, Tutor Marked Assignments (TMA), study materials, and complete NIOS board exam support — from admission to final result.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="tel:9792111121" style={{ display: "inline-block", padding: "14px 36px", background: "#fff", color: "#4441e5", borderRadius: "8px", fontWeight: "700", fontSize: "15px", textDecoration: "none" }}>
                Contact SS Coaching
              </a>
              <a href="tel:9792111121" style={{ display: "inline-block", padding: "14px 36px", border: "2px solid #fff", color: "#fff", borderRadius: "8px", fontWeight: "600", fontSize: "15px", textDecoration: "none" }}>
                Get Free NIOS Counseling
              </a>
            </div>
          </div>
        </div>

        <Footer />

        <style jsx>{`
          /* ── IMAGE+CONTENT SECTIONS ─────────────────────── */
          .sl-section { padding: 50px 0; }
          .sl-bg-light { background: #f8faff; }
          .sl-bg-white { background: #fff; }

          .sl-row {
            display: flex;
            align-items: center;
            gap: 40px;
          }

          /* Image column — fixed width, never stretch */
          .sl-img-col {
            flex: 0 0 38%;
            max-width: 38%;
          }
          .sl-img-wrap {
            width: 100%;
            height: 100%;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 6px 24px rgba(68,65,229,0.10);
          }
          .sl-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center top;
            display: block;
          }

          /* Text column fills the rest */
          .sl-text-col { flex: 1; min-width: 0; }

          .sl-label {
            color: #4441e5;
            font-weight: 600;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1.2px;
            margin-bottom: 10px;
          }
          .sl-heading {
            font-size: 26px;
            font-weight: 700;
            color: #101727;
            line-height: 1.35;
            margin-bottom: 16px;
            font-family: SF Pro Display, Poppins, sans-serif;
          }
          .sl-para {
            font-size: 15px;
            color: #444;
            line-height: 1.8;
            margin-bottom: 14px;
          }
          .sl-list {
            padding-left: 20px;
            margin-bottom: 18px;
            font-size: 15px;
            color: #333;
            line-height: 2;
          }
          .sl-italic {
            font-style: italic;
            color: #4441e5;
            font-weight: 600;
            font-size: 15px;
            margin-bottom: 20px;
          }
          .sl-btn {
            display: inline-block;
            padding: 12px 26px;
            background: #4441e5;
            color: #fff;
            border-radius: 8px;
            font-weight: 700;
            font-size: 14px;
            text-decoration: none;
          }
          .sl-btn:hover { background: #2d2ab0; }

          /* ── TABLET (768px) ─────────────────────────────── */
          @media (max-width: 900px) {
            .sl-img-col { flex: 0 0 44%; max-width: 44%; }
            .sl-img-wrap { height: 280px; margin-top:20px;}
            .sl-heading { font-size: 22px; }
          }

          /* ── MOBILE (640px) ─────────────────────────────── */
          @media (max-width: 640px) {
            .sl-section { padding: 36px 0; }
            .sl-img{
            object-position: center!important;
            }
            .sl-row, .sl-row-reverse { flex-direction: column; gap: 0; }

            /* On mobile image becomes a compact banner at top */
            .sl-img-col {
              flex: none;
              width: 100%;
              max-width: 100%;
              margin-bottom: 20px;
            }
            .sl-img-wrap { height: 200px; border-radius: 10px; }

            .sl-heading { font-size: 20px; }
            .sl-para { font-size: 14px; }
            .sl-list { font-size: 14px; }
            .sl-btn { width: 100%; text-align: center; }
          }

          @keyframes niosMarquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>
    </>
  );
}












// import Header from "@/components/header/Header";
// import Footer from "@/components/footer/Footer";
// import Offcanvas from "@/components/header/Offcanvas";
// import Head from "next/head";
// import SecondaryOrSrSecondary from "@/components/subjects/SecondaryOrSrSecodary";
// import BranchContactCanvas from "@/components/header/BranchContactCanvas";

// export default function Subject() {
//   return (
//     <>
//       <Head>
//         <title>NIOS Complete Subjects List 10th & 12th</title>
//         <meta
//           name="description"
//           content="NIOS Complete Subjects List for Class 10th and 12th | Secondary & Senior Secondary Course | Scheme of Studies"
//         />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       <section className="home-page-area">
//         <Header />
//         <Offcanvas />
//                <BranchContactCanvas/>
        

//         <div className="syllabus-nios">
//           <div className="container">

//             <h1 className="nios-125h-senior-hero-title">
//               NIOS Complete Subjects List 10th 12th
//             </h1>

//             <p style={{ color: "red", fontWeight: "600" }}>
//               OUR NIOS COURSES
//             </p>

//             <p style={{ color: "blue", fontWeight: "600" }}>
//               SECONDARY COURSE (CLASS X) And SENIOR SECONDARY COURSE (CLASS XII)
//             </p>

//             <h3>SECONDARY COURSE</h3>
//             <p>
//               This Course is equivalent to the Xth standard. You can choose
//               subjects from the Scheme of Studies given in below Table.
//               However, you will be required to success complete a minimum of
//               five subjects with atleast one language or at most two languages,
//               which is compulsory for certification.
//             </p>

//             <h3>SENIOR SECONDARY COURSE</h3>
//             <p>
//               This Course is designed for those who have passed the Xth standard
//               or equivalent examination from a recognised Board and would like
//               to continue their education towards a Senior Secondary
//               Certification, equivalent to XII standard. You can choose
//               subjects from the Scheme of Subjects given in below Table.
//               However, you will be required to successfully complete a minimum
//               of five subjects with atleast one language or at most two
//               languages, which is compulsory for Certification.
//             </p>

//             <h3>SCHEME OF STUDIES</h3>
//             <p>
//               The Scheme of Studies for Secondary and Senior Secondary Courses is
//               shown in below Table. For obtaining a pass certificate, you are
//               required to pass in a minimum of five subjects including a
//               maximum of two languages from Group 'A' and other three or four
//               subjects from Group (B). However you are free to take upto two
//               additional subjects. Thus in all you can choose maximum of seven
//               subjects.
//             </p>

//             <p style={{ color: "green", fontWeight: "600" }}>
//               For Admission in nios and also for the good percentage in NIOS
//               please contact SS Coaching at <strong>9792111121</strong>
//             </p>

//             <h3 style={{ textAlign: "center", color: "purple" }}>
//               Table-1 : Scheme of Studies for Academic Courses
//             </h3>

//             {/* <SecondaryOrSrSecondary/> */}


//             <h2 className="nios-125h-senior-hero-title">
//   Table-1 : Scheme of Studies for Academic Courses
// </h2>

// <h3 className="nios-125h-senior-hero-subtitle">
//   SECONDARY LEVEL (X)
// </h3>

// <div className="table-wrapper">
//   <table>
//     <thead>
//       <tr>
//         <th>Code Subject</th>
//         <th>Theory / Practical</th>
//         <th>Number of Papers</th>
//         <th>Maximum Marks</th>
//         <th>Duration (Hours)</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td colSpan="5"><strong>Group (A)</strong></td>
//       </tr>

//       <tr><td>(201) Hindi</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(202) English</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(206) Urdu</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(209) Sanskrit</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

//       <tr>
//         <td>(203) Bengali</td>
//         <td>Theory<br/>Examination of these subjects will be held on same day and same time</td>
//         <td>1</td>
//         <td>100</td>
//         <td>3</td>
//       </tr>

//       <tr><td>(204) Marathi</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(205) Telugu</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(207) Gujarati</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(208) Kannada</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(210) Punjabi</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(228) Assamese</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(231) Nepali</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(232) Malyalam</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(233) Oriya</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(235) Arabic</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(236) Persian</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(237) Tamil</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//             <tr>
//         <td colSpan="5"><strong>Group (B)</strong></td>
//       </tr>

//       <tr>
//         <td>(211) Mathematics</td>
//         <td>Theory</td>
//         <td>1</td>
//         <td>85</td>
//         <td>3</td>
//       </tr>
//       <tr>
//         <td>(211) Mathematics</td>
//         <td>Practical</td>
//         <td>1</td>
//         <td>15</td>
//         <td>2½</td>
//       </tr>

//       <tr>
//         <td>(212) Science andTechnology</td>
//         <td>Theory</td>
//         <td>1</td>
//         <td>85</td>
//         <td>2½</td>
//       </tr>
//       <tr>
//         <td>(212) Science andTechnology</td>
//         <td>Practical</td>
//         <td>1</td>
//         <td>15</td>
//         <td>3</td>
//       </tr>

//       <tr>
//         <td>(213) Social Science</td>
//         <td>Theory</td>
//         <td>1</td>
//         <td>100</td>
//         <td>3</td>
//       </tr>

//       <tr>
//         <td>(214) Economics</td>
//         <td>Theory</td>
//         <td>1</td>
//         <td>100</td>
//         <td>3</td>
//       </tr>

//       <tr>
//         <td>(215) Business Studies</td>
//         <td>Theory</td>
//         <td>1</td>
//         <td>100</td>
//         <td>3</td>
//       </tr>

//       <tr>
//         <td>(216) Home Science</td>
//         <td>Theory</td>
//         <td>1</td>
//         <td>85</td>
//         <td>2½</td>
//       </tr>
//       <tr>
//         <td>(216) Home Science</td>
//         <td>Practical</td>
//         <td>1</td>
//         <td>15</td>
//         <td>3</td>
//       </tr>

//       <tr>
//         <td>(222) Psychology</td>
//         <td>Theory</td>
//         <td>1</td>
//         <td>100</td>
//         <td>3</td>
//       </tr>

//       <tr>
//         <td>(223) Indian Culture and Heritage</td>
//         <td>Theory</td>
//         <td>1</td>
//         <td>100</td>
//         <td>3</td>
//       </tr>

//       <tr>
//         <td>(224) Accountancy</td>
//         <td>Theory</td>
//         <td>1</td>
//         <td>100</td>
//         <td>3</td>
//       </tr>

//       <tr>
//         <td>(225) Painting</td>
//         <td>Theory</td>
//         <td>1</td>
//         <td>30</td>
//         <td>1½</td>
//       </tr>
//       <tr>
//         <td>(225) Painting</td>
//         <td>Practical</td>
//         <td>1</td>
//         <td>70</td>
//         <td>3</td>
//       </tr>

//       <tr>
//         <td>(229) Data Entry Operations</td>
//         <td>Theory</td>
//         <td>1</td>
//         <td>40</td>
//         <td>2</td>
//       </tr>
//       <tr>
//         <td>(229) Data Entry Operations</td>
//         <td>Practical</td>
//         <td>1</td>
//         <td>60</td>
//         <td>2</td>
//       </tr>

//     </tbody>
//   </table>
// </div>

// <br/>

// <p>
//   Five subjects with either one or two languages from Group A and the remaining subjects from Group B
// </p>

// <p>
//   Two additional subjects can be taken from either of the two groups with additional fees as per NIOS norms
// </p>




// <h3 className="nios-125h-senior-hero-subtitle">
//   SENIOR SECONDARY LEVEL (XII)
// </h3>

// <div className="table-wrapper">
//   <table>
//     <thead>
//       <tr>
//         <th>Code Subject</th>
//         <th>Theory / Practical</th>
//         <th>Number Of Papers</th>
//         <th>Maximum Marks</th>
//         <th>Duration (Hours)</th>
//       </tr>
//     </thead>
//     <tbody>

//       <tr>
//         <td colSpan="5"><strong>Group (A)</strong></td>
//       </tr>

//       <tr><td>(301) Hindi</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(302) English</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(306) Urdu</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(309) Sanskrit</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

//       <tr>
//         <td>(307) Gujarati</td>
//         <td>Theory<br/>Examination of these subjects will be held on same day and same time</td>
//         <td>1</td>
//         <td>100</td>
//         <td>3</td>
//       </tr>

//       <tr><td>(303) Bengali</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(304) Tamil</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(305) Odia</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(310) Punjabi</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>



//       <tr>
//         <td colSpan="5"><strong>Group (B)</strong></td>
//       </tr>

//       <tr><td>(311) Mathematics</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

//       <tr><td>(321) Home Science</td><td>Theory</td><td>1</td><td>80</td><td>3</td></tr>
//       <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>

//       <tr><td>(328) Psychology</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

//       <tr><td>(316) Geography</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>

//       <tr><td>(318) Economics</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(319) Business Studies</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

//       <tr><td>(332) Painting</td><td>Theory</td><td>1</td><td>30</td><td>1½</td></tr>
//       <tr><td></td><td>Practical</td><td>1</td><td>70</td><td>6</td></tr>

//       <tr><td>(336) Data Entry Operations</td><td>Theory</td><td>1</td><td>40</td><td>2</td></tr>
//       <tr><td></td><td>Practical</td><td>1</td><td>60</td><td>2</td></tr>


//       <tr>
//         <td colSpan="5"><strong>Group (C)</strong></td>
//       </tr>

//       <tr>
//         <td>(312) Physics</td>
//         <td>Theory<br/>Examination of these subjects will be held on same day and same time</td>
//         <td>1</td>
//         <td>80</td>
//         <td>3</td>
//       </tr>
//       <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>

//       <tr><td>(315) History</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

//       <tr><td>(339) Library and Information Science</td><td>Theory</td><td>1</td><td>80</td><td>3</td></tr>
//       <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>


//       <tr>
//         <td colSpan="5"><strong>Group (D)</strong></td>
//       </tr>

//       <tr>
//         <td>(313) Chemistry</td>
//         <td>Theory<br/>Examination of these subjects will be held on same day and same time</td>
//         <td>1</td>
//         <td>80</td>
//         <td>3</td>
//       </tr>
//       <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>

//       <tr><td>(317) Political Science</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

//       <tr><td>(335) Mass Communication</td><td>Theory</td><td>1</td><td>80</td><td>3</td></tr>
//       <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>


//       <tr>
//         <td colSpan="5"><strong>Group (E)</strong></td>
//       </tr>

//       <tr>
//         <td>(314) Biology</td>
//         <td>Theory<br/>Examination of these subjects will be held on same day and same time .</td>
//         <td>1</td>
//         <td>80</td>
//         <td>3</td>
//       </tr>
//       <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>

//       <tr><td>(320) Accountancy</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
//       <tr><td>(338) Introduction to Law</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>


//       <tr>
//         <td colSpan="5"><strong>Group (F)</strong></td>
//       </tr>

//       <tr>
//         <td>(330) Computer Science</td>
//         <td>Theory<br/>Examination of these subjects will be held on same day and same time .</td>
//         <td>1</td>
//         <td>60</td>
//         <td>3</td>
//       </tr>
//       <tr><td></td><td>Practical</td><td>1</td><td>40</td><td>2</td></tr>

//       <tr><td>(331) Sociology</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

//       <tr><td>(333) Environmental Science</td><td>Theory</td><td>1</td><td>80</td><td>3</td></tr>
//       <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>

//     </tbody>
//   </table>
// </div>


// <br/>

// <p>
// Five subjects with either one or two languages from Group A and the remaining subjects from Group B, C, D, E and F (only one subject from each group C, D, E and F)
// </p>

// <p>
// Two additional subjects can be taken from any group (only one subject from each group C, D, E and F) with additional fee as per NIOS norms
// </p>






//             <h3>Note:</h3>

//             <p style={{ color: "red" }}>
//               Note : 1. Subjects with asterisk * have theory as well as practical
//               work
//             </p>

//             <p style={{ color: "red" }}>
//               Note : 2. Learner can opt only one subject from each of Group C, D,
//               E and F
//             </p>

//           </div>
//         </div>

//         <Footer />
//       </section>
//     </>
//   );
// }
