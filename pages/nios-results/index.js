"use client";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";
import Link from "next/link";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import { useState } from "react";

const faqData = [
  { q: "How can I check my NIOS Result 2026 online?", a: "Visit the official NIOS result portal at results.nios.ac.in. Select your examination type — Secondary (Class 10) or Senior Secondary (Class 12). Enter your NIOS Enrollment Number and Date of Birth, then click Submit. Your subject-wise marks, total score, and pass/fail status will be displayed on screen. Download the result as a PDF immediately for your records. The result is also available on DigiLocker at digilocker.gov.in." },
  { q: "What details are mentioned in the NIOS Result 2026?", a: "The NIOS result marksheet contains the student's name, enrollment number, date of birth, course and stream, examination session, subject-wise theory and practical marks, total marks obtained, qualifying status (Pass/Fail/Compartment), and mother's name. Students should verify all details carefully after downloading and report any errors to their NIOS Regional Centre within 30 days of result declaration." },
  { q: "What should I do if I have passed the NIOS Class 10 examination?", a: "Students who pass the NIOS Secondary Examination (Class 10) can apply for Senior Secondary (Class 12) admission through NIOS, state boards, or CBSE. Choosing the right stream — Science, Commerce, or Arts — is a critical next step. SS Coaching has been helping NIOS students make informed stream and subject selection decisions since 2001. Free counseling is available for all Class 10 passout students." },
  { q: "What should I do after passing the NIOS Class 12 examination?", a: "After passing NIOS Class 12, students can apply for UGC-recognized universities and colleges via CUET or state entrance tests, polytechnic diploma programs, nursing, ITI, hotel management, and professional certification courses. Students are also eligible for SSC, banking, railway, and state PSC competitive examinations. SS Coaching provides free post-result career counseling based on your stream and marks." },
  { q: "Is the NIOS Class 12 certificate valid for college admissions?", a: "Yes. NIOS Senior Secondary certificates are recognized by UGC, all central and state universities, government institutions, and employers across India. NIOS students are eligible for CUET and state university entrance tests for undergraduate admissions, subject to the eligibility criteria of the respective institution." },
  { q: "Can I apply for improvement examinations after the NIOS Result 2026?", a: "Yes. NIOS provides two pathways: the Improvement Examination for passed students who want higher marks (higher score is retained as final result), and the Re-Appear Examination for students who failed in one or more subjects. Both are available in subsequent NIOS examination sessions. SS Coaching guides students through the entire re-registration and preparation process." },
  { q: "How can I download my NIOS marksheet 2026?", a: "After checking your result at results.nios.ac.in, download the provisional marksheet as a PDF. Save both a digital copy and a printed copy. The original physical marksheet cum certificate is dispatched by NIOS to your Accredited Institute (AI) or Study Centre — collect it from there. A verified digital marksheet is also available on DigiLocker at digilocker.gov.in." },
  { q: "Can I take admission to colleges after passing NIOS?", a: "Yes. Students who complete NIOS Senior Secondary (Class 12) education are eligible to apply for undergraduate courses, diploma programs, and professional certifications at recognized institutions across India. NIOS certification is recognized by UGC and is equivalent to any Class 12 board qualification for admission purposes." },
  { q: "Is NIOS recognized by UGC, colleges, and government organizations?", a: "Yes. NIOS is an autonomous institution under the Ministry of Education, Government of India. Its certificates are recognized for higher education admissions, competitive examinations, and employment by UGC, central and state universities, and government departments across the country." },
  { q: "How can SS Coaching help after NIOS Result 2026?", a: "SS Coaching provides complete post-result guidance including admission counseling, stream and subject selection, improvement examination registration and preparation, re-evaluation advice (Class 12), marksheet assistance, and career planning. Having guided NIOS students since 2001, our counselors understand every aspect of the NIOS system and help students make the best decisions after result declaration. Initial counseling sessions are free." },
  { q: "What are the best courses after NIOS Class 12?", a: "The best course depends on your stream and career goals. Science students can pursue B.Sc., Engineering, BCA, Nursing, or Pharmacy. Commerce students can explore B.Com, BBA, or CA Foundation. Arts students can consider BA, Law, Journalism, Mass Communication, or D.El.Ed. NIOS students are also eligible for polytechnic, hotel management, aviation, and digital marketing programs." },
  { q: "Why do students trust SS Coaching for NIOS guidance?", a: "Since 2001, SS Coaching has supported thousands of NIOS students with admissions, examination preparation, result guidance, and career counseling. Our experienced counselors, personalized mentoring, and student-first approach have helped learners across India successfully achieve their academic goals for over two decades." },
  { q: "How do I know which stream is right for me after Class 10?", a: "The choice between Science, Commerce, and Arts should be based on your academic strengths, interests, and long-term career plans. Science leads to engineering, medical, and research. Commerce suits business, finance, and CA aspirants. Arts is ideal for civil services, law, and journalism. SS Coaching provides free stream selection counseling for all NIOS Class 10 passout students." },
  { q: "Can I appear for competitive exams after completing NIOS?", a: "Yes. NIOS-qualified students can apply for SSC CGL, SSC CHSL, IBPS banking exams, RRB railway exams, state PSC examinations, and many other central and state government competitive tests — provided they meet the specific eligibility criteria set by each examination authority." },
  { q: "Does SS Coaching provide free counseling after NIOS results?", a: "Yes. Students can connect with SS Coaching academic counselors for free guidance on admissions, improvement exams, re-evaluation decisions, stream selection, and career planning after the declaration of NIOS Result 2026. Counseling is available for students across all states and regions of India." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a }
  }))
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.sscoaching.in/" },
    { "@type": "ListItem", "position": 2, "name": "NIOS Result 2026", "item": "https://www.sscoaching.in/nios-results" }
  ]
};

const steps = [
  "Visit → results.nios.ac.in",
  "Select your examination — Secondary (Class 10) or Senior Secondary (Class 12)",
  "Enter your NIOS Enrollment Number (from your Admit Card)",
  "Enter your Date of Birth and on-screen captcha",
  "Click \"Submit\" — your result appears on screen",
  "Check subject-wise marks, total score, and pass/fail status",
  "Download as PDF — save a digital copy and take a printout",
  "Collect your original marksheet from your NIOS Accredited Institute (AI) / Study Centre",
];

const BLUE = "#3949ab";
const DARK_BLUE = "#1a237e";
const RED = "#c62828";
const DARK_RED = "#b71c1c";

export default function NIOSResult2026() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="nios-results-main-page">
      <Head>
        <title>NIOS Result 2026 – Class 10 & Class 12 Result | SS Coaching</title>
        <meta name="description" content="NIOS Result 2026 has been declared for Class 10 & Class 12. Check your Secondary and Senior Secondary results at results.nios.ac.in. SS Coaching provides free guidance on marksheet download, passing criteria, improvement exams & college admissions. Trusted since 2001." />
        <meta name="keywords" content="nios result 2026, nios result 2026 class 10, nios result 2026 class 12, results.nios.ac.in, nios secondary result 2026, nios senior secondary result 2026, nios marksheet download 2026, nios result date 2026, nios enrollment number result, nios results, nios on demand result, nios 10th result, nios 12th result, NIOS Result 2026 Class 10, NIOS Result 2026 Class 12, nios result check, nios board result, nios exam result 2026, nios marksheet, nios passing certificate, nios improvement exam 2026" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <section className="home-page-area">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        {/* ══════════════════════════════════════════
            SECTION 1 — HERO
        ══════════════════════════════════════════ */}
        <div style={{ background: "linear-gradient(135deg,#1a237e 0%,#283593 55%,#3949ab 100%)", padding: "56px 0 52px", color: "#fff" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
              <span style={{ background: "rgba(255,255,255,0.13)", border: "1px solid rgba(255,255,255,0.28)", borderRadius: "20px", padding: "6px 18px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.6px", display: "inline-block", marginBottom: "20px", textTransform: "uppercase" }}>
                SS Coaching – Official NIOS Guidance Partner Since 2001
              </span>
              <h1 style={{ fontSize: "clamp(26px,5vw,44px)", fontWeight: 800, lineHeight: 1.2, marginBottom: "14px" }}>
                NIOS Result 2026 – Class 10 &amp; Class 12 Result
              </h1>
              <p style={{ fontSize: "clamp(13px,2vw,16px)", opacity: 0.88, marginBottom: "18px", lineHeight: 1.7 }}>
                Check Secondary &amp; Senior Secondary Result &bull; Marksheet Download Guide &bull; Improvement Exam Help &bull; Free Admission Counseling
              </p>
              <p style={{ fontSize: "15px", opacity: 0.82, lineHeight: 1.85, marginBottom: "30px", maxWidth: "700px", margin: "0 auto 30px" }}>
                The National Institute of Open Schooling (NIOS) has declared the NIOS Result 2026 for Secondary (Class 10) and Senior Secondary (Class 12) examinations. Students can check their results at{" "}
                <a href="https://results.nios.ac.in/" target="_blank" rel="noopener noreferrer" style={{ color: "#90caf9", fontWeight: 700 }}>results.nios.ac.in</a>{" "}
                using their enrollment number. SS Coaching provides comprehensive guidance on marksheet download, improvement exams, and admissions after the NIOS Result 2026.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="https://results.nios.ac.in/" target="_blank" rel="noopener noreferrer" style={{ background: "#ef5350", color: "#fff", padding: "13px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>
                  Check NIOS Result 2026
                </a>
                <Link href="/contact-us" style={{ background: "rgba(255,255,255,0.13)", border: "2px solid rgba(255,255,255,0.45)", color: "#fff", padding: "13px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>
                  Free Counseling
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 2 — RESULT GATEWAY
        ══════════════════════════════════════════ */}
        <div style={{ background: "#f4f5ff", padding: "64px 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "38px" }}>
              <span style={{ background: "#e8eaf6", color: BLUE, borderRadius: "20px", padding: "5px 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                Check Your NIOS Result 2026 — Select Your Class
              </span>
              <h2 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 800, marginTop: "14px", color: DARK_BLUE }}>
                NIOS Result 2026 – Check Your Result Right Now
              </h2>
              <p style={{ color: "#555", maxWidth: "580px", margin: "0 auto", fontSize: "15px", lineHeight: 1.7 }}>
                The NIOS Result 2026 is now available on the official portal. Select your class below to check your result and get complete post-result guidance:
              </p>
            </div>

            <div className="row g-4 mb-4">
              {/* CLASS 10 */}
              <div className="col-md-6">
                <div style={{ background: "#fff", borderRadius: "16px", border: `2px solid ${BLUE}`, padding: "32px", height: "100%", boxShadow: "0 6px 24px rgba(57,73,171,0.09)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
                    <div style={{ background: "#e8eaf6", borderRadius: "12px", padding: "12px 14px", fontSize: "30px", lineHeight: 1 }}>📘</div>
                    <div>
                      <div style={{ color: BLUE, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>NIOS Class 10 Result 2026</div>
                      <div style={{ fontSize: "18px", fontWeight: 800, color: DARK_BLUE }}>Secondary Examination</div>
                    </div>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px" }}>
                    {["Check subject-wise marks & pass/fail status", "Marksheet download guide", "Passing criteria & grace marks explained", "Stream selection & Class 12 admission help"].map((t, i) => (
                      <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", fontSize: "14px", color: "#444" }}>
                        <span style={{ color: "#43a047", fontWeight: 700, flexShrink: 0 }}>✅</span>{t}
                      </li>
                    ))}
                  </ul>
                  <Link href="/nios-class-10th-result" style={{ display: "block", background: BLUE, color: "#fff", padding: "13px 18px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", textAlign: "center", fontSize: "15px" }}>
                    → Check NIOS Class 10 Result 2026
                  </Link>
                </div>
              </div>

              {/* CLASS 12 */}
              <div className="col-md-6">
                <div style={{ background: "#fff", borderRadius: "16px", border: `2px solid ${RED}`, padding: "32px", height: "100%", boxShadow: "0 6px 24px rgba(198,40,40,0.09)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
                    <div style={{ background: "#ffebee", borderRadius: "12px", padding: "12px 14px", fontSize: "30px", lineHeight: 1 }}>📗</div>
                    <div>
                      <div style={{ color: RED, fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>NIOS Class 12 Result 2026</div>
                      <div style={{ fontSize: "18px", fontWeight: 800, color: DARK_RED }}>Senior Secondary Examination</div>
                    </div>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px" }}>
                    {["Check marks across Science / Commerce / Arts", "Marksheet download guide", "Re-evaluation & improvement exam guidance", "College admissions & career counseling"].map((t, i) => (
                      <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", fontSize: "14px", color: "#444" }}>
                        <span style={{ color: "#43a047", fontWeight: 700, flexShrink: 0 }}>✅</span>{t}
                      </li>
                    ))}
                  </ul>
                  <Link href="/nios-class-12th-result" style={{ display: "block", background: RED, color: "#fff", padding: "13px 18px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", textAlign: "center", fontSize: "15px" }}>
                    → Check NIOS Class 12 Result 2026
                  </Link>
                </div>
              </div>
            </div>

            {/* QUICK LINK BOX */}
            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #dde0f0", padding: "24px 28px", textAlign: "center" }}>
              <p style={{ marginBottom: "8px", fontWeight: 700, color: "#333", fontSize: "15px" }}>
                🔗 Direct Link to Official Portal:{" "}
                <a href="https://results.nios.ac.in/" target="_blank" rel="noopener noreferrer" style={{ color: BLUE, fontWeight: 700 }}>results.nios.ac.in</a>
              </p>
              <p style={{ color: "#666", fontSize: "14px", marginBottom: "16px", lineHeight: 1.6 }}>
                Enter your NIOS Enrollment Number + Date of Birth to check your result. Result also available on:{" "}
                <a href="https://digilocker.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: BLUE }}>DigiLocker (digilocker.gov.in)</a>
              </p>
              <Link href="/contact-us" style={{ background: "#e8eaf6", color: BLUE, padding: "10px 24px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                Not sure where to go? Talk to Our NIOS Expert — Free
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 3 — HOW TO CHECK
        ══════════════════════════════════════════ */}
        <div style={{ background: "#fff", padding: "64px 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "42px" }}>
              <span style={{ background: "#e8f5e9", color: "#2e7d32", borderRadius: "20px", padding: "5px 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                How to Check NIOS Result 2026
              </span>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, marginTop: "14px", color: DARK_BLUE }}>
                How to Check NIOS Result 2026 Online – Step-by-Step
              </h2>
              <p style={{ color: "#555", maxWidth: "580px", margin: "0 auto", fontSize: "15px", lineHeight: 1.7 }}>
                Both Secondary (Class 10) and Senior Secondary (Class 12) results are available on the same official NIOS portal. Follow these steps:
              </p>
            </div>

            <div className="row g-3 mb-4">
              {steps.map((text, i) => (
                <div key={i} className="col-md-6 col-lg-3">
                  <div style={{ background: "#f4f5ff", borderRadius: "12px", padding: "18px 16px", height: "100%", borderLeft: `4px solid ${BLUE}` }}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <div style={{ background: BLUE, color: "#fff", borderRadius: "50%", minWidth: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "13px", flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <p style={{ margin: 0, fontSize: "13px", color: "#444", lineHeight: 1.65 }}>{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SMS METHOD */}
            <div style={{ background: "#fff3e0", borderRadius: "12px", padding: "20px 24px", marginBottom: "16px", border: "1px solid #ffe0b2" }}>
              <p style={{ fontWeight: 700, color: "#e65100", marginBottom: "10px", fontSize: "14px" }}>📱 Check NIOS Result 2026 via SMS (If portal is slow due to heavy traffic)</p>
              <p style={{ color: "#555", marginBottom: "6px", fontSize: "14px" }}><strong>For Class 10:</strong> NIOS10 &lt;space&gt; Your Roll Number – Send to 5676750</p>
              <p style={{ color: "#555", marginBottom: 0, fontSize: "14px" }}><strong>For Class 12:</strong> NIOS12 &lt;space&gt; Your Roll Number – Send to 5676750</p>
            </div>

            <div style={{ background: "#fff8e1", borderRadius: "10px", padding: "14px 20px", border: "1px solid #ffe082", marginBottom: "28px" }}>
              <p style={{ margin: 0, fontSize: "14px", color: "#5d4037", lineHeight: 1.6 }}>
                ⚠️ <strong>Portal Tip:</strong> results.nios.ac.in may experience high traffic after declaration. If slow, try during early morning hours or access via nios.ac.in. Result also available on DigiLocker.
              </p>
            </div>

            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/nios-class-10th-result" style={{ background: BLUE, color: "#fff", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                Get Complete Class 10 Guidance →
              </Link>
              <Link href="/nios-class-12th-result" style={{ background: RED, color: "#fff", padding: "12px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                Get Complete Class 12 Guidance →
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 4 — OVERVIEW
        ══════════════════════════════════════════ */}
        <div style={{ background: "#f4f5ff", padding: "64px 0" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <span style={{ background: "#e8eaf6", color: BLUE, borderRadius: "20px", padding: "5px 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                NIOS Result 2026 – Complete Student Guide
              </span>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, marginTop: "14px", marginBottom: "20px", color: DARK_BLUE }}>
                NIOS Result 2026: Everything Students Need to Know After Declaration
              </h2>
              <p style={{ color: "#555", lineHeight: 1.9, fontSize: "15px", marginBottom: "18px" }}>
                The NIOS Result 2026 for both the April–May and October–November examination sessions has been officially declared by the National Institute of Open Schooling. Students who appeared for the Secondary (Class 10) or Senior Secondary (Class 12) examinations can access their results, download provisional marksheets, and verify their qualifying status at the official NIOS results portal. Students who appeared under the On-Demand Examination (ToD) system can also check their results through the same portal at results.nios.ac.in.
              </p>
              <p style={{ color: "#555", lineHeight: 1.9, fontSize: "15px", marginBottom: "30px" }}>
                At SS Coaching, we have guided thousands of NIOS students since 2001 through every step after result declaration — understanding grace marks and passing criteria, registering for improvement examinations, selecting the right stream, and securing college admissions. Our certified academic counselors provide structured, personalized support based on your specific result outcome — whether you passed with distinction, narrowly cleared, or need to re-appear in one or more subjects.
              </p>
              <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e0e3f5", padding: "26px" }}>
                <div className="row g-3">
                  {["Result & Marksheet Guidance", "Passing Criteria & Grace Marks Explained", "Improvement & Re-Appear Exam Support", "Stream Selection Counseling (Class 10 → 12)", "College & University Admission Planning", "Free Counseling for All NIOS Students"].map((t, i) => (
                    <div key={i} className="col-md-6">
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <span style={{ color: BLUE, fontWeight: 800, fontSize: "15px", flexShrink: 0 }}>✔</span>
                        <span style={{ color: "#444", fontSize: "14px" }}>{t}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 5 — CLASS 10
        ══════════════════════════════════════════ */}
        <div style={{ background: "#fff", padding: "64px 0" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <span style={{ background: "#e8eaf6", color: BLUE, borderRadius: "20px", padding: "5px 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                NIOS Secondary Result 2026
              </span>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, marginTop: "14px", marginBottom: "20px", color: DARK_BLUE }}>
                NIOS Class 10 Result 2026 – Secondary Examination Result &amp; Next Steps
              </h2>
              <p style={{ color: "#555", lineHeight: 1.9, fontSize: "15px", marginBottom: "18px" }}>
                Students who appeared in the NIOS Secondary Examination 2026 can check their Class 10 result online at results.nios.ac.in by entering their enrollment number and date of birth. The NIOS Class 10 result includes subject-wise marks, total score, and pass/fail qualifying status. Students who appeared under the On-Demand (ToD) system can also access results through the same portal.
              </p>
              <p style={{ color: "#555", lineHeight: 1.9, fontSize: "15px", marginBottom: "28px" }}>
                After clearing the NIOS Secondary examination, students become eligible for Senior Secondary (Class 12) admission — either through NIOS, regular state boards, or open schooling. The choice of stream at this stage — Science, Commerce, or Arts/Humanities — has significant long-term implications for career and higher education planning.
              </p>

              <div style={{ background: "#f4f5ff", borderRadius: "12px", padding: "24px", marginBottom: "22px", borderLeft: `4px solid ${BLUE}` }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: DARK_BLUE, marginBottom: "12px" }}>NIOS Class 10 Passing Criteria 2026</h3>
                <p style={{ color: "#555", lineHeight: 1.85, fontSize: "15px", marginBottom: 0 }}>
                  Students must score a minimum of 33% marks in each subject — theory and practical separately where applicable — to pass the NIOS Secondary examination. NIOS also provides a grace mark provision for students who narrowly miss the passing threshold. Students who fail in up to two subjects are eligible for the compartment or re-appear examination in the next session.
                </p>
              </div>

              <div style={{ background: "#f4f5ff", borderRadius: "12px", padding: "24px", marginBottom: "22px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: DARK_BLUE, marginBottom: "16px" }}>What Students Can Do After NIOS Class 10 Result 2026</h3>
                <ul style={{ paddingLeft: "20px", color: "#555", lineHeight: 2.1, fontSize: "15px", marginBottom: 0 }}>
                  <li>Continue with NIOS Senior Secondary (Class 12) registration</li>
                  <li>Join Class 11 in a regular state board or CBSE school</li>
                  <li>Apply for ITI trades or NSDC vocational skill courses</li>
                  <li>Apply for rechecking (₹400/subject) if marks seem incorrect</li>
                  <li>Appear for improvement examination in the next session</li>
                </ul>
              </div>

              {/* Marksheet download steps — from original content */}
              <div style={{ background: "#e8eaf6", borderRadius: "12px", padding: "22px 24px", marginBottom: "28px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: DARK_BLUE, marginBottom: "12px" }}>NIOS Class 10 Marksheet Download — Step by Step</h3>
                <ol style={{ paddingLeft: "20px", color: "#555", lineHeight: 2, fontSize: "14px", marginBottom: "10px" }}>
                  <li>Visit <a href="https://nios.ac.in/" target="_blank" rel="noopener noreferrer" style={{ color: BLUE }}>nios.ac.in</a></li>
                  <li>Go to Learner&apos;s Corner → Results</li>
                  <li>Choose Secondary</li>
                  <li>Enter your Enrollment Number</li>
                  <li>Download the NIOS Marksheet 2026</li>
                  <li>Take a printout for official use</li>
                </ol>
                <p style={{ color: "#666", fontSize: "13px", marginBottom: 0 }}>Original marksheet &amp; certificate are later sent to your AI/Study Center.</p>
              </div>

              <Link href="/nios-class-10th-result" style={{ display: "inline-block", background: BLUE, color: "#fff", padding: "13px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>
                → NIOS Class 10 Result 2026 – Complete Guide
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 6 — CLASS 12
        ══════════════════════════════════════════ */}
        <div style={{ background: "#fff9f9", padding: "64px 0" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <span style={{ background: "#ffebee", color: RED, borderRadius: "20px", padding: "5px 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                NIOS Senior Secondary Result 2026
              </span>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, marginTop: "14px", marginBottom: "20px", color: DARK_RED }}>
                NIOS Class 12 Result 2026 – Senior Secondary Examination Result &amp; Career Path
              </h2>
              <p style={{ color: "#555", lineHeight: 1.9, fontSize: "15px", marginBottom: "18px" }}>
                The NIOS Senior Secondary Result 2026 is a critical milestone for students seeking college admissions, professional diploma enrollments, and competitive examination eligibility. Students who appeared in the NIOS Class 12 examinations across all streams — Science, Commerce, and Arts — can check their results using their enrollment number at results.nios.ac.in.
              </p>
              <p style={{ color: "#555", lineHeight: 1.9, fontSize: "15px", marginBottom: "28px" }}>
                A passing NIOS Class 12 result makes students eligible for UGC-recognized university admissions, polytechnic diploma programs, ITI courses, nursing programs, and all major competitive examinations including SSC, banking, railways, and state PSCs. SS Coaching provides structured career counseling to help students identify the right next step based on their stream, marks, and academic goals.
              </p>

              {/* Why This Result Matters */}
              <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ffcdd2", padding: "22px 24px", marginBottom: "22px" }}>
                <p style={{ fontWeight: 700, color: RED, marginBottom: "14px", fontSize: "15px" }}>Why This Result Matters?</p>
                <div className="row g-2">
                  {["All Central & State Universities", "ITI (after NIOS bridge requirements)", "NEET, JEE, CUET eligibility", "Government job applications"].map((t, i) => (
                    <div key={i} className="col-md-6">
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <span style={{ color: "#43a047", fontWeight: 800, flexShrink: 0 }}>✓</span>
                        <span style={{ color: "#444", fontSize: "14px" }}>{t}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#fff9f9", borderRadius: "12px", padding: "24px", marginBottom: "22px", borderLeft: `4px solid ${RED}` }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: DARK_RED, marginBottom: "12px" }}>NIOS Class 12 Passing Criteria 2026</h3>
                <p style={{ color: "#555", lineHeight: 1.85, fontSize: "15px", marginBottom: 0 }}>
                  Students must score a minimum of 33% marks in each subject to pass the NIOS Senior Secondary examination. NIOS applies grace marks in borderline cases at its discretion. Students who do not pass all subjects can appear for improvement or re-appear examinations in the subsequent session. Re-evaluation is available exclusively for Class 12 students at ₹1,200 per subject.
                </p>
              </div>

              <div style={{ background: "#fff9f9", borderRadius: "12px", padding: "24px", marginBottom: "28px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: DARK_RED, marginBottom: "16px" }}>What Students Can Do After NIOS Class 12 Result 2026</h3>
                <ul style={{ paddingLeft: "20px", color: "#555", lineHeight: 2.1, fontSize: "15px", marginBottom: 0 }}>
                  <li>Apply for undergraduate colleges via CUET or state entrance tests</li>
                  <li>Enroll in polytechnic, nursing, hotel management, or aviation programs</li>
                  <li>Register for SSC, banking, railways, or state PSC competitive exams</li>
                  <li>Apply for re-evaluation (Class 12 only) at ₹1,200 per subject</li>
                  <li>Appear for improvement exam to meet specific college cutoffs</li>
                </ul>
              </div>

              <Link href="/nios-class-12th-result" style={{ display: "inline-block", background: RED, color: "#fff", padding: "13px 28px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "15px" }}>
                → NIOS Class 12 Result 2026 – Complete Guide
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            RESULT DETAILS & ABBREVIATIONS (original content)
        ══════════════════════════════════════════ */}
        <div style={{ background: "#fff", padding: "60px 0" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 800, color: DARK_BLUE, marginBottom: "22px" }}>
                Details Mentioned in NIOS Result 2026
              </h2>
              <div className="row g-2 mb-4">
                {["Candidate's Name", "Enrollment Number", "Father's Name", "Mother's Name", "Date of Birth", "Exam Month & Year", "Subject-wise Marks", "TMA Scores", "Practical Scores", "Total Marks", "Result Status (Pass/Fail)", "Abbreviations", "Course (10th/12th)"].map((t, i) => (
                  <div key={i} className="col-6 col-md-4">
                    <div style={{ background: "#f4f5ff", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#444", borderLeft: `3px solid ${BLUE}` }}>{t}</div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 700, color: DARK_BLUE, marginBottom: "16px" }}>NIOS Result 2026 Abbreviations Meaning</h3>
              <div className="table-wrapper mb-4">
                <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: "10px", overflow: "hidden" }}>
                  <thead>
                    <tr style={{ background: BLUE, color: "#fff" }}>
                      <th style={{ padding: "12px 18px", textAlign: "left", fontSize: "14px" }}>Abbreviation</th>
                      <th style={{ padding: "12px 18px", textAlign: "left", fontSize: "14px" }}>Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[["P", "Passed"], ["AB", "Absent"], ["SYC", "Subject Yet to be Cleared"], ["TMA", "Tutor Marked Assignment"], ["ADDL", "Appeared for Additional Subject"], ["IMPR", "Appeared for Improvement"]].map(([a, m], i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#f4f5ff" : "#fff" }}>
                        <td style={{ padding: "10px 18px", fontWeight: 700, color: BLUE, borderBottom: "1px solid #e8eaf6", fontSize: "14px" }}>{a}</td>
                        <td style={{ padding: "10px 18px", color: "#555", borderBottom: "1px solid #e8eaf6", fontSize: "14px" }}>{m}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 700, color: DARK_BLUE, marginBottom: "14px" }}>NIOS Passing Marks 2026 (10th &amp; 12th)</h3>
              <div style={{ background: "#f4f5ff", borderRadius: "12px", padding: "20px 24px", marginBottom: "32px" }}>
                {["Theory Minimum: 33%", "Practical Minimum: 33%", "Total Subjects to Pass: 5 (At least one language)"].map((t, i, arr) => (
                  <div key={i} style={{ display: "flex", gap: "12px", padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid #dde0f0" : "none", fontSize: "15px", color: "#444" }}>
                    <span style={{ color: BLUE, fontWeight: 700, flexShrink: 0 }}>→</span>{t}
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize: "20px", fontWeight: 700, color: DARK_BLUE, marginBottom: "14px" }}>Previous NIOS Results For Reference</h3>
              <div style={{ background: "#f4f5ff", borderRadius: "12px", padding: "20px 24px" }}>
                {[
                  "NIOS 12th Result April/May 2025 – Declared 15 June 2025",
                  "NIOS 10th Result April/May 2025 – Declared 20 June 2025",
                  "NIOS October 2024 Result – Declared 17 January 2025",
                  "NIOS 10th Result 2024 (April) – Declared 27 June 2024",
                ].map((t, i, arr) => (
                  <div key={i} style={{ display: "flex", gap: "12px", padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid #dde0f0" : "none", fontSize: "14px", color: "#555" }}>
                    <span style={{ flexShrink: 0 }}>📅</span>{t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 7 — IMPROVEMENT EXAM
        ══════════════════════════════════════════ */}
        <div style={{ background: "#f4f5ff", padding: "64px 0" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <span style={{ background: "#e8f5e9", color: "#2e7d32", borderRadius: "20px", padding: "5px 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                NIOS Improvement &amp; Re-Appear Exam 2026
              </span>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, marginTop: "14px", marginBottom: "20px", color: DARK_BLUE }}>
                NIOS Improvement Exam 2026 – How to Improve Your Result After Declaration
              </h2>
              <p style={{ color: "#555", lineHeight: 1.9, fontSize: "15px", marginBottom: "18px" }}>
                If you are not satisfied with your NIOS Result 2026 marks — or if you failed in one or more subjects — the National Institute of Open Schooling offers two structured pathways: the Improvement Examination for students who have passed but want better marks, and the Re-Appear Examination for students who failed in one or more subjects. Both options are available in subsequent NIOS examination sessions.
              </p>
              <p style={{ color: "#555", lineHeight: 1.9, fontSize: "15px", marginBottom: "28px" }}>
                SS Coaching guides students through the entire improvement process — from assessing whether improvement is strategically beneficial for your target college or course, to completing online re-registration, selecting the right subjects, and preparing effectively for the next examination session.
              </p>

              <div style={{ background: "#fff", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: DARK_BLUE, marginBottom: "16px" }}>Who Should Apply for NIOS Improvement Exam 2026?</h3>
                <ul style={{ paddingLeft: "20px", color: "#555", lineHeight: 2.1, fontSize: "15px", marginBottom: 0 }}>
                  <li>Students who passed but need higher marks for specific college cutoffs</li>
                  <li>Students who failed in 1–2 subjects (compartment candidates)</li>
                  <li>Students who want stronger scores in stream-specific subjects for Class 12 or higher education</li>
                  <li>On-Demand (ToD) students seeking better marks</li>
                  <li>Class 12 students who want to trigger re-evaluation alongside improvement planning</li>
                </ul>
              </div>

              <h3 style={{ fontSize: "18px", fontWeight: 700, color: DARK_BLUE, marginBottom: "14px" }}>Quick Comparison</h3>
              <div className="table-wrapper mb-4">
                <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: "10px", overflow: "hidden" }}>
                  <thead>
                    <tr style={{ background: BLUE, color: "#fff" }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px" }}>Option</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px" }}>Who It&apos;s For</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontSize: "13px" }}>When Available</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Improvement Exam", "Passed students wanting higher marks", "Next NIOS session"],
                      ["Re-Appear Exam", "Failed in 1–2 subjects", "Next NIOS session"],
                      ["Rechecking (Class 10 & 12)", "Any student — re-totalling of marks", "₹400/subject, within 15 days of result"],
                      ["Re-evaluation (Class 12 only)", "Class 12 students — detailed answer review", "₹1,200/subject, within 15 days of result"],
                    ].map(([opt, who, when], i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#f4f5ff" : "#fff" }}>
                        <td style={{ padding: "10px 16px", fontWeight: 600, color: BLUE, borderBottom: "1px solid #e8eaf6", fontSize: "13px" }}>{opt}</td>
                        <td style={{ padding: "10px 16px", color: "#555", borderBottom: "1px solid #e8eaf6", fontSize: "13px" }}>{who}</td>
                        <td style={{ padding: "10px 16px", color: "#555", borderBottom: "1px solid #e8eaf6", fontSize: "13px" }}>{when}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <Link href="/nios-class-10th-result" style={{ background: BLUE, color: "#fff", padding: "12px 24px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                  Check Class 10 Improvement Exam Details →
                </Link>
                <Link href="/nios-class-12th-result" style={{ background: RED, color: "#fff", padding: "12px 24px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                  Check Class 12 Improvement Exam Details →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 8 — FAQ
        ══════════════════════════════════════════ */}
        <div style={{ background: "#fff", padding: "64px 0" }}>
          <div className="container">
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, color: DARK_BLUE, marginBottom: "32px", textAlign: "center" }}>
                Frequently Asked Questions – NIOS Result 2026
              </h2>
              {faqData.map((item, i) => (
                <div key={i} style={{ borderBottom: "1px solid #e8eaf6" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: "100%", background: "none", border: "none", textAlign: "left", padding: "16px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "14px" }}
                  >
                    <span style={{ fontWeight: 700, color: DARK_BLUE, fontSize: "15px", lineHeight: 1.55 }}>
                      {i + 1}. {item.q}
                    </span>
                    <span style={{ color: BLUE, fontSize: "22px", flexShrink: 0, lineHeight: 1, marginTop: "2px" }}>
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 0 18px 28px", color: "#555", lineHeight: 1.85, fontSize: "15px" }}>
                      {item.a}
                    </div>
                  )}
                </div>
              ))}

              {/* Quick FAQs from original page */}
              <div style={{ marginTop: "28px", background: "#f4f5ff", borderRadius: "12px", padding: "26px" }}>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: DARK_BLUE, marginBottom: "18px" }}>More Quick Questions</h3>
                {[
                  { q: "When Will NIOS Result Oct/Nov 2025 Be Declared?", a: "Expected January 2026 for both 10th and 12th." },
                  { q: "Can I join NIOS if I fail 12th?", a: "Yes, students who failed boards can take NIOS re-admission." },
                  { q: "What Are the Passing Marks in NIOS 12th?", a: "Minimum 33% per subject." },
                  { q: "Can NIOS Students Give NEET?", a: "Yes, NIOS students are eligible for NEET, provided PCB subjects are completed." },
                  { q: "How Are NIOS Marks Calculated?", a: "Theory (70 marks) + Practical (30 marks) + TMA (10 marks, subject dependent)." },
                  { q: "Is NIOS Valid for Jobs & Colleges After Result?", a: "Absolutely YES — recognized by Government of India and accepted by all universities & jobs." },
                  { q: "When Will NIOS Result 2025 Be Declared For April Exams?", a: "Declared in June 2026." },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: "16px" }}>
                    <p style={{ fontWeight: 700, color: DARK_BLUE, marginBottom: "4px", fontSize: "14px" }}>Q{i + 1}. {item.q}</p>
                    <p style={{ color: "#555", fontSize: "14px", margin: 0, lineHeight: 1.7 }}>{item.a}</p>
                  </div>
                ))}
                <p style={{ marginBottom: 0, fontSize: "14px" }}>
                  <strong>Official NIOS Result Website:</strong>{" "}
                  <a href="https://results.nios.ac.in/" target="_blank" rel="noopener noreferrer" style={{ color: BLUE, fontWeight: 700 }}>
                    👉 results.nios.ac.in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 10 — INTERNAL LINKS
        ══════════════════════════════════════════ */}
        <div style={{ background: "#f4f5ff", padding: "64px 0" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "34px" }}>
              <span style={{ background: "#e8eaf6", color: BLUE, borderRadius: "20px", padding: "5px 16px", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>
                Explore More NIOS Resources
              </span>
              <h2 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, marginTop: "14px", color: DARK_BLUE }}>
                Complete NIOS 2026 Resources – Explore by Topic
              </h2>
            </div>
            <div className="row g-3" style={{ maxWidth: "900px", margin: "0 auto" }}>
              {[
                { label: "NIOS Class 10 Result 2026 – Complete Guide", href: "/nios-class-10th-result", color: BLUE },
                { label: "NIOS Class 12 Result 2026 – Complete Guide", href: "/nios-class-12th-result", color: RED },
                { label: "NIOS Class 12 Admission 2026", href: "/nios-admission/admission-in-nios-stream-1", color: "#2e7d32" },
                { label: "NIOS Improvement Exam 2026", href: "/nios-admission/admission-in-nios-stream-2", color: "#e65100" },
                { label: "NIOS Syllabus 2026", href: "/subject/syllabus-class-10th", color: "#1565c0" },
                { label: "NIOS Study Material", href: "/subject/secondary-course-material", color: "#6a1b9a" },
                { label: "NIOS Passing Certificate", href: "/faq/nios-certificate-and-marksheet-available", color: "#00695c" },
              ].map((link, i) => (
                <div key={i} className="col-md-6">
                  <Link href={link.href} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#fff", borderRadius: "10px", padding: "14px 18px", textDecoration: "none", border: "1px solid #dde0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <span style={{ color: link.color, fontWeight: 800, fontSize: "17px", flexShrink: 0 }}>→</span>
                    <span style={{ color: "#333", fontWeight: 600, fontSize: "14px" }}>{link.label}</span>
                  </Link>
                </div>
              ))}
              <div className="col-md-6">
                <a href="https://results.nios.ac.in/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "12px", background: "#fff", borderRadius: "10px", padding: "14px 18px", textDecoration: "none", border: "1px solid #dde0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <span style={{ color: "#f57c00", fontWeight: 800, fontSize: "17px", flexShrink: 0 }}>🔗</span>
                  <span style={{ color: "#333", fontWeight: 600, fontSize: "14px" }}>Official NIOS Result Portal → results.nios.ac.in</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 11 — FINAL CTA
        ══════════════════════════════════════════ */}
        <div style={{ background: "linear-gradient(135deg,#1a237e 0%,#283593 55%,#3949ab 100%)", padding: "64px 0", color: "#fff" }}>
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto" }}>
              <h2 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 800, marginBottom: "16px" }}>
                Need Help After Your NIOS Result 2026? SS Coaching Is Here.
              </h2>
              <p style={{ opacity: 0.88, lineHeight: 1.85, fontSize: "15px", marginBottom: "32px" }}>
                Whether you have just checked your NIOS Result 2026 and are unsure what to do next — or you need help with marksheet download, improvement exam registration, re-evaluation, college admission planning, or stream selection — SS Coaching provides free, structured, personalized guidance. Our counselors work with your specific result and goals to build the clearest academic path forward.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "18px" }}>
                <Link href="/nios-class-10th-result" style={{ background: BLUE, border: "2px solid rgba(255,255,255,0.4)", color: "#fff", padding: "13px 22px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                  → Check NIOS Class 10 Result 2026
                </Link>
                <Link href="/nios-class-12th-result" style={{ background: RED, border: "2px solid rgba(255,255,255,0.3)", color: "#fff", padding: "13px 22px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                  → Check NIOS Class 12 Result 2026
                </Link>
                <Link href="/contact-us" style={{ background: "#fff", color: DARK_BLUE, padding: "13px 22px", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                  Book Free NIOS Counseling Call
                </Link>
              </div>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="https://results.nios.ac.in/" target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.28)", color: "#fff", padding: "10px 20px", borderRadius: "8px", fontWeight: 600, textDecoration: "none", fontSize: "14px" }}>
                  NIOS 10th Result (Official)
                </a>
                <a href="https://results.nios.ac.in/home/on-demand?type=2" target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.28)", color: "#fff", padding: "10px 20px", borderRadius: "8px", fontWeight: 600, textDecoration: "none", fontSize: "14px" }}>
                  NIOS 12th Result (Official)
                </a>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </section>
   </div>
  );
}
