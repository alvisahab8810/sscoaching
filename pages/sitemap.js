import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const SITEMAP = [
  {
    category: "Main Pages",
    icon: "🏠",
    pages: [
      { label: "Home",                                        href: "/" },
      { label: "About Us",                                    href: "/about-us" },
      { label: "Gallery",                                     href: "/gallery" },
      { label: "FAQ",                                         href: "/faq" },
      { label: "Contact Us",                                  href: "/contact-us" },
      { label: "Online Forms",                                href: "/onlineforms" },
      { label: "Blogs",                                       href: "/blogs" },
      { label: "Online Classes Time Table",                   href: "/online-classes-time-table" },
      { label: "Benefits & Importance of NIOS",               href: "/benefits-importance-nios" },
      { label: "Future of NIOS",                              href: "/future-of-nios" },
      { label: "Boards Recognizing NIOS",                     href: "/boards-recognizing-nios" },
      { label: "Universities Recognizing NIOS",               href: "/list-of-universities-institutions-recognizing-nios-examination-degree-certificate" },
      { label: "Universities Recognizing NIOS (Page 2)",      href: "/universities-recognising-nios-page2" },
      { label: "Can NIOS Students Take MBBS Admission?",      href: "/nios-mbbs-admission" },
      { label: "Sitemap",                                     href: "/sitemap" },
    ],
  },
  {
    category: "NIOS Admission",
    icon: "📋",
    pages: [
      { label: "Stream 1 Admission",     href: "/nios-admission/admission-in-nios-stream-1" },
      { label: "Stream 2 Admission",     href: "/nios-admission/admission-in-nios-stream-2" },
      { label: "Stream 3 & 4 Admission", href: "/nios-admission/admission-in-nios-stream-3&4" },
    ],
  },
  {
    category: "Our Branches",
    icon: "📍",
    pages: [
      { label: "Hazratganj Branch",          href: "/nios-coaching-hazratganj-lucknow" },
      { label: "Indira Nagar Branch",        href: "/nios-coaching-indiranagar-lucknow" },
      { label: "Alambagh Branch",            href: "/nios-coaching-alambagh-lucknow" },
      { label: "Time Table — Hazratganj",    href: "/time-table-hazratganj" },
      { label: "Time Table — Alambagh",      href: "/time-table-alambagh" },
    ],
  },
  {
    category: "NIOS Results & Exam Info",
    icon: "🏆",
    pages: [
      { label: "NIOS 12th Result",                       href: "/nios-results/nios-12th-result" },
      { label: "NIOS 10th Result",                       href: "/nios-results/nios-10th-result" },
      { label: "NIOS Hall Ticket",                       href: "/nios-hall-ticket" },
      { label: "NIOS Hall Ticket 2025 (10th & 12th)",    href: "/nios-hall-ticket-for-class-10th-12th" },
      { label: "NIOS Date Sheet",                        href: "/nios-datesheet" },
    ],
  },
  {
    category: "Question Papers",
    icon: "📝",
    pages: [
      { label: "All Question Papers",           href: "/question-papers" },
      { label: "Papers — Secondary (10th)",     href: "/question-papers/paper-secondary-10th" },
      { label: "Papers — Sr. Secondary (12th)", href: "/question-papers/paper-secondary-12th" },
      { label: "TMA — Secondary (10th)",        href: "/question-papers/tma-secondary-10th" },
      { label: "TMA — Sr. Secondary (12th)",    href: "/question-papers/tma-sr-secondary-12th" },
    ],
  },
  {
    category: "Subject List",
    icon: "📚",
    pages: [
      { label: "Complete Subject List (10th & 12th)", href: "/subject/subject-list" },
      { label: "10th Secondary Subjects",             href: "/subject/nios-10th-secondary" },
      { label: "12th Sr. Secondary Subjects",         href: "/subject/nios-12th-senior-secondary" },
      { label: "Syllabus — Class 10th",               href: "/subject/syllabus-class-10th" },
      { label: "Syllabus — Class 12th",               href: "/subject/syllabus-class-12th" },
      { label: "Secondary Course Material",           href: "/subject/secondary-course-material" },
      { label: "Sr. Secondary Course Material",       href: "/subject/sr-secondary-course-material" },
    ],
  },
  {
    category: "10th Syllabus",
    icon: "📗",
    pages: [
      { label: "Hindi (201)",                       href: "/subject/syllabus-class-10th/syllabus-hindi-nios-201" },
      { label: "English (202)",                     href: "/subject/syllabus-class-10th/syllabus-english-nios-202" },
      { label: "Sanskrit (209)",                    href: "/subject/syllabus-class-10th/syllabus-sanskrit-nios-209" },
      { label: "Mathematics (211)",                 href: "/subject/syllabus-class-10th/syllabus-mathematics-nios-211" },
      { label: "Science & Technology (212)",        href: "/subject/syllabus-class-10th/syllabus-science-&-technology-212" },
      { label: "Social Science (213)",              href: "/subject/syllabus-class-10th/syllabus-social-science-nios-213" },
      { label: "Economics (214)",                   href: "/subject/syllabus-class-10th/syllabus-economics-nios-214" },
      { label: "Business Studies (215)",            href: "/subject/syllabus-class-10th/syllabus-business-studioes-nios-215" },
      { label: "Home Science (216)",                href: "/subject/syllabus-class-10th/syllabus-home-science-216" },
      { label: "Psychology (222)",                  href: "/subject/syllabus-class-10th/syllabus-psychology-nios-222" },
      { label: "Indian Heritage & Culture (223)",   href: "/subject/syllabus-class-10th/syllabus-Indian-heritage-culture-nios-223" },
      { label: "Painting (225)",                    href: "/subject/syllabus-class-10th/syllabus-painting-nios-225" },
      { label: "Data Entry Operations (229)",       href: "/subject/syllabus-class-10th/syllabus-data-entry-operations-229" },
    ],
  },
  {
    category: "12th Syllabus",
    icon: "📘",
    pages: [
      { label: "Hindi (301)",                   href: "/subject/syllabus-class-12th/syllabus-hindi-senior-secondary-nios-301" },
      { label: "English (302)",                 href: "/subject/syllabus-class-12th/syllabus-english-senior-secondary-nios-302" },
      { label: "Urdu (306)",                    href: "/subject/syllabus-class-12th/syllabus-urdu-senior-secondary-nios-306" },
      { label: "Sanskrit (309)",                href: "/subject/syllabus-class-12th/syllabus-sanskrit-senior-secondary-nios-309" },
      { label: "Mathematics (311)",             href: "/subject/syllabus-class-12th/syllabus-mathematics-senior-secondary-nios-311" },
      { label: "Physics (312)",                 href: "/subject/syllabus-class-12th/syllabus-physics-senior-secondary-nios-312" },
      { label: "Chemistry (313)",               href: "/subject/syllabus-class-12th/syllabus-chemistry-senior-secondary-nios-313" },
      { label: "Biology (314)",                 href: "/subject/syllabus-class-12th/syllabus-biology-senior-secondary-nios-314" },
      { label: "History (315)",                 href: "/subject/syllabus-class-12th/syllabus-history-senior-secondary-nios-315" },
      { label: "Geography (316)",               href: "/subject/syllabus-class-12th/syllabus-geography-senior-secondary-316" },
      { label: "Political Science (317)",       href: "/subject/syllabus-class-12th/syllabus-political-science-senior-secondary-nios-317" },
      { label: "Economics (318)",               href: "/subject/syllabus-class-12th/syllabus-economics-senior-secondary-nios-318" },
      { label: "Commerce (319)",                href: "/subject/syllabus-class-12th/syllabus-commerce-senior-secondary-nios-319" },
      { label: "Accountancy (320)",             href: "/subject/syllabus-class-12th/syllabus-accountancy-senior-secondary-nios-320" },
      { label: "Home Science (321)",            href: "/subject/syllabus-class-12th/syllabus-home-science-senior-secondary-nios-321" },
      { label: "Psychology (328)",              href: "/subject/syllabus-class-12th/syllabus-psychology-senior-secondary-nios-328" },
      { label: "Computer Science (330)",        href: "/subject/syllabus-class-12th/syllabus-computer-science-senior-secondary-nios-330" },
      { label: "Sociology (331)",               href: "/subject/syllabus-class-12th/syllabus-sociology-senior-secondary-nios-331" },
      { label: "Painting (332)",                href: "/subject/syllabus-class-12th/syllabus-painting-senior-secondary-nios-332" },
      { label: "Environmental Science (333)",   href: "/subject/syllabus-class-12th/syllabus-environmental-science-senior-secondary-nios-333" },
      { label: "Mass Communication",            href: "/subject/syllabus-class-12th/syllabus-mass-communication-senior-secondary-nios" },
      { label: "Data Entry Operations (336)",   href: "/subject/syllabus-class-12th/syllabus-data-entry-operations-senior-secondary-nios-336" },
    ],
  },
  {
    category: "10th Course Material",
    icon: "📓",
    pages: [
      { label: "Hindi (201)",                     href: "/subject/secondary-course-material/hindi201" },
      { label: "English (202)",                   href: "/subject/secondary-course-material/english202" },
      { label: "Mathematics (211)",               href: "/subject/secondary-course-material/mathematics211" },
      { label: "Science (212)",                   href: "/subject/secondary-course-material/science212" },
      { label: "Social Science (213)",            href: "/subject/secondary-course-material/socialscience213" },
      { label: "Economics (214)",                 href: "/subject/secondary-course-material/economics214" },
      { label: "Business Studies (215)",          href: "/subject/secondary-course-material/business-studies215" },
      { label: "Home Science (216)",              href: "/subject/secondary-course-material/homescience216" },
      { label: "Psychology (222)",                href: "/subject/secondary-course-material/psychology222" },
      { label: "Indian Culture & Heritage (223)", href: "/subject/secondary-course-material/ich223" },
      { label: "Painting (225)",                  href: "/subject/secondary-course-material/painting225" },
      { label: "Data Entry Operations (229)",     href: "/subject/secondary-course-material/deo229" },
      { label: "Accountancy (224)",               href: "/subject/secondary-course-material/accountancy224" },
    ],
  },
  {
    category: "12th Course Material",
    icon: "📕",
    pages: [
      { label: "Hindi (301)",                    href: "/subject/sr-secondary-course-material/hindi301" },
      { label: "English (302)",                  href: "/subject/sr-secondary-course-material/english302" },
      { label: "Sanskrit (309)",                 href: "/subject/sr-secondary-course-material/sanskrit309" },
      { label: "Mathematics (311)",              href: "/subject/sr-secondary-course-material/mathematics311" },
      { label: "Physics (312)",                  href: "/subject/sr-secondary-course-material/physics312" },
      { label: "Chemistry (313)",                href: "/subject/sr-secondary-course-material/chemistry313" },
      { label: "Biology (314)",                  href: "/subject/sr-secondary-course-material/biology314" },
      { label: "History (315)",                  href: "/subject/sr-secondary-course-material/history315" },
      { label: "Geography (316)",                href: "/subject/sr-secondary-course-material/geography316" },
      { label: "Political Science (317)",        href: "/subject/sr-secondary-course-material/political-science317" },
      { label: "Economics (318)",                href: "/subject/sr-secondary-course-material/economics318" },
      { label: "Business Studies (319)",         href: "/subject/sr-secondary-course-material/business-studies319" },
      { label: "Accountancy (320)",              href: "/subject/sr-secondary-course-material/accountancy320" },
      { label: "Home Science (321)",             href: "/subject/sr-secondary-course-material/homescience321" },
      { label: "Psychology (328)",               href: "/subject/sr-secondary-course-material/psychology328" },
      { label: "Computer Science (330)",         href: "/subject/sr-secondary-course-material/computer-science330" },
      { label: "Sociology (331)",                href: "/subject/sr-secondary-course-material/sociology331" },
      { label: "Painting (332)",                 href: "/subject/sr-secondary-course-material/painting332" },
      { label: "Environmental Science (333)",    href: "/subject/sr-secondary-course-material/environmental-science333" },
      { label: "Mass Communication (335)",       href: "/subject/sr-secondary-course-material/mass-communication335" },
      { label: "Data Entry Operations (336)",    href: "/subject/sr-secondary-course-material/deo336" },
      { label: "Tourism (337)",                  href: "/subject/sr-secondary-course-material/tourism337" },
      { label: "Law (338)",                      href: "/subject/sr-secondary-course-material/law338" },
      { label: "Physical Education (373)",       href: "/subject/sr-secondary-course-material/physical-education373" },
    ],
  },
  {
    category: "FAQ — About NIOS",
    icon: "❓",
    pages: [
      { label: "What is NIOS?",                            href: "/faq/what-is-nios" },
      { label: "How is NIOS Different?",                   href: "/faq/how-is-nios-different" },
      { label: "NIOS vs Regular School / Institution",     href: "/faq/different-nios-any-regular-institution-school" },
      { label: "Is NIOS Same as NOS?",                     href: "/faq/nios-same-nos" },
      { label: "Is NIOS a Valid Board?",                   href: "/faq/nios-valid-board" },
      { label: "NIOS Functions & Objectives",              href: "/faq/nios-functions-and-objective" },
      { label: "Objectives of NIOS",                       href: "/faq/objectives-of-nios" },
      { label: "Role & Importance of NIOS",                href: "/faq/role-importance-nios" },
      { label: "NIOS Changing Lives",                      href: "/faq/nios-changing-lives" },
      { label: "NIOS Learner Profile",                     href: "/faq/nios-learner-profile" },
      { label: "Students in NIOS",                         href: "/faq/students-in-nios" },
      { label: "Achievements of NIOS",                     href: "/faq/achievements-of-nios" },
      { label: "Flexibility in NIOS",                      href: "/faq/flexibility-in-nios" },
      { label: "NIOS Alternative Education",               href: "/faq/nios-alternative-education" },
    ],
  },
  {
    category: "FAQ — Admission & Eligibility",
    icon: "📌",
    pages: [
      { label: "Procedure for NIOS Admission",             href: "/faq/procedure-for-nios-admission" },
      { label: "NIOS Secondary (10th) Eligibility",        href: "/faq/nios-secondary-course-eligibility" },
      { label: "Minimum Age for Sr. Secondary",            href: "/faq/nios-minimum-age-senior-secondary" },
      { label: "Direct Admission in Sr. Secondary",        href: "/faq/direct-admission-senior-secondary" },
      { label: "Admission Validity Period",                 href: "/faq/admission-validity-period" },
      { label: "Correction in Admission Record",           href: "/faq/correction-in-admission-record" },
      { label: "Valid Proof of Date of Birth",             href: "/faq/valid-dob-proof" },
      { label: "Class 11 in NIOS",                         href: "/faq/class-11-in-nios" },
      { label: "NIOS 12th After 10th (2 Year Gap)",        href: "/faq/nios-12th-after-10th" },
      { label: "Change Subjects After Admission",          href: "/faq/subjects-change-after-admission-nios" },
      { label: "Language Choice in 10th & 12th",          href: "/faq/language-choice-10th-12th-nios-board" },
      { label: "Subjects Required to Pass in NIOS",        href: "/faq/subject-required-to-pass-in-nios" },
      { label: "NIOS Medium of Subjects",                  href: "/faq/nios-medium-of-subjects" },
      { label: "Concession in NIOS Fees",                  href: "/faq/concession-In-nios-fees" },
      { label: "Subjects Passed in Other Board to NIOS",   href: "/faq/subjects-passed-other-board-moved-to-nios" },
    ],
  },
  {
    category: "FAQ — Exams & Results",
    icon: "✍️",
    pages: [
      { label: "Month NIOS Conducts Public Exams",           href: "/faq/nios-public-exam-month" },
      { label: "Range of Percentage Marks in NIOS",          href: "/faq/nios-percentage-marks-range" },
      { label: "Score Better in NIOS than CBSE",             href: "/faq/score-better-in-nios-than-cbse" },
      { label: "Learner Scores Better in NIOS Public Exam",  href: "/faq/learner-scores-better-in-nios-public-examination" },
      { label: "Distribution of Marks — Theory & Practical", href: "/faq/marks-distribution-in-nios-theory-practical-exams" },
      { label: "Improvement Exams in NIOS",                  href: "/faq/improvement-exams-nios" },
      { label: "Re-Examination Fees & Procedure",            href: "/faq/re-exam-fees-procedure" },
      { label: "Apply for Re-Evaluation of Answersheet",     href: "/faq/nios-re-evaluation-answersheet" },
      { label: "Exemption in NIOS Board",                    href: "/faq/exemption-in-nios-board" },
      { label: "Students Passed NIOS Competitive Exams",     href: "/faq/students-passed-nios-competitive-examinations" },
      { label: "Top 20 Percentile in Boards (IIT/JEE)",      href: "/faq/top-20-percentile-in-boards" },
      { label: "Value & Validity for IIT JEE / PMT",         href: "/faq/value-validity-clear-iitjee-pmt" },
    ],
  },
  {
    category: "FAQ — Certificates & Recognition",
    icon: "🎓",
    pages: [
      { label: "NIOS Certificate Validity & Importance",   href: "/faq/nios-certificate-validity" },
      { label: "Degree Awarded by NIOS",                   href: "/faq/degree-awarded-nios" },
      { label: "Graduation & Post-Graduation via NIOS",    href: "/faq/graduation-and-post-graduation-nios" },
      { label: "Duplicate NIOS Certificate",               href: "/faq/duplicate-nios-certificate" },
      { label: "Duplicate Identity Card",                  href: "/faq/duplicate-identity-card" },
      { label: "State Govt Recognizes NIOS Certificate",   href: "/faq/state-government-shall-recognize-nios-certificate" },
      { label: "Regular Student in NIOS",                  href: "/faq/regular-student-in-nios" },
      { label: "ICSE / CBSE / NIOS — Difference",          href: "/faq/icse-cbse-nios" },
      { label: "Difference: Open & Distance Learning",     href: "/faq/difference-open-distance-learning" },
      { label: "Difference: Regular & Open School",        href: "/faq/difference-regular-and-open-school" },
    ],
  },
  {
    category: "FAQ — Study & Coaching",
    icon: "🧑‍🏫",
    pages: [
      { label: "Are NCERT Books Prescribed for NIOS?",     href: "/faq/ncert-books-prescribed-nios" },
      { label: "Fee for Study Materials in NIOS",          href: "/faq/fee-paid-for-study-materials-nios" },
      { label: "Study Material for NIOS Board",            href: "/faq/study-material-for-nios-board" },
      { label: "Tuition & Coaching for NIOS",              href: "/faq/tuition-coaching-service-nios" },
      { label: "How Coaching Helps Clear NIOS Exam",       href: "/faq/coaching-helps-clear-nios-exam" },
      { label: "SS Coaching Suggestions for NIOS Students",href: "/faq/sscoaching-suggestion-for-nios-students" },
      { label: "Success Mantra for NIOS",                  href: "/faq/success-mantra-nios" },
      { label: "Advice for Failed Students (CBSE/ICSE/UP)",href: "/faq/advice-for-failed-students-cbse-icse-up-board" },
      { label: "Personal Contact Programme (PCP)",         href: "/faq/personal-contact-programme-nios" },
      { label: "Reason Why Students Fail",                 href: "/faq/reason-why-students-fail" },
      { label: "Parents' Responsibility for Board Exam",   href: "/faq/parents-responsibility-for-child-board-exam" },
      { label: "Best Subjects to Opt in NIOS",             href: "/faq/best-subjects-to-opt-in-nios-board" },
    ],
  },
  {
    category: "FAQ — Special Programs",
    icon: "🌟",
    pages: [
      { label: "Vocational Courses in NIOS",               href: "/faq/vocational-courses-nios" },
      { label: "Virtual Open School (VOS)",                 href: "/faq/virtual-open-school-nios" },
      { label: "Open Basic Education (OBE)",                href: "/faq/open-basic-education-obe-nios" },
      { label: "Life Enrichment Programme",                 href: "/faq/life-enrichment-programme" },
      { label: "Adolescence Education Programme (AEP)",     href: "/faq/adolescence-education-programme" },
      { label: "Learn & Earn via NIOS",                     href: "/faq/learn-earn-nios" },
      { label: "Home School — Is it Legal?",                href: "/faq/home-school-is-legal-or-not" },
      { label: "NIOS Facilitation Centres",                 href: "/faq/nios-facilitation-centres-act-as" },
    ],
  },
  {
    category: "Legal & Policy",
    icon: "⚖️",
    pages: [
      { label: "Privacy Policy",      href: "/privacy-policy" },
      { label: "Disclaimer",          href: "/disclaimer" },
      { label: "Terms & Conditions",  href: "/terms-&-conditions" },
    ],
  },
];

export default function SitemapPage() {
  const [open, setOpen] = useState(
    SITEMAP.reduce((a, s) => ({ ...a, [s.category]: true }), {})
  );
  const toggle = (cat) => setOpen((p) => ({ ...p, [cat]: !p[cat] }));
  const total = SITEMAP.reduce((a, s) => a + s.pages.length, 0);

  return (
    <>
      <Head>
        <title>Sitemap — SS Coaching Lucknow</title>
        <meta name="description" content={`Complete sitemap of SS Coaching — ${SITEMAP.length} sections, ${total}+ pages.`} />
      </Head>

      <Header/>

      <div className="sp">

        {/* HERO */}
        <div className="sp-hero">
          <div className="sp-g1" /><div className="sp-g2" />
          <div className="container">
            <div className="sp-hero-c">
              <span className="sp-badge">
                <svg viewBox="0 0 16 16" fill="currentColor" width="11" height="11">
                  <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8S12.42 0 8 0zm0 2c.34 0 .67.04 1 .09V5H7V2.09C7.33 2.04 7.66 2 8 2zm-2 .44V5H3.51A6.01 6.01 0 016 2.44zM2.09 7H5v2H2.09a6.04 6.04 0 010-2zm1.42 4H6v2.56A6.01 6.01 0 013.51 11zM7 13.91V11h2v2.91c-.33.05-.66.09-1 .09s-.67-.04-1-.09zm3-.35V11h2.49A6.01 6.01 0 0110 13.56zm3.91-4.56H11V7h2.91a6.04 6.04 0 010 2zm-3.42-4H13.5A6.01 6.01 0 0110 2.44V5z"/>
                </svg>
                Website Sitemap
              </span>
              <h1>Complete Page <em>Directory</em></h1>
              <p>{SITEMAP.length} sections &nbsp;·&nbsp; {total}+ pages &nbsp;·&nbsp; Every URL organized</p>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="container">
          <div className="sp-wrap">

            {/* SIDEBAR */}
            <aside className="sp-side">
              <div className="sp-side-box">
                <div className="sp-side-hd">Jump to Section</div>
                <div className="sp-side-body">
                  {SITEMAP.map((s) => (
                    <a
                      key={s.category}
                      href={`#sec-${s.category.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
                      className="sp-side-a"
                    >
                      <span>{s.icon}</span>
                      <span className="sp-side-name">{s.category}</span>
                      <span className="sp-side-n">{s.pages.length}</span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="sp-content">
              {SITEMAP.map((section) => {
                const id = `sec-${section.category.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
                const isOpen = open[section.category];
                return (
                  <div key={section.category} id={id} className="sp-sec">

                    <button className="sp-sec-hd" onClick={() => toggle(section.category)}>
                      <div className="sp-sec-left">
                        <span className="sp-sec-ico">{section.icon}</span>
                        <div className="sp-sec-info">
                          <span className="sp-sec-title">{section.category}</span>
                          <span className="sp-sec-ct">{section.pages.length} pages</span>
                        </div>
                      </div>
                      <svg
                        className={`sp-arr${isOpen ? " sp-arr--up" : ""}`}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="sp-sec-body">
                        <div className="sp-grid">
                          {section.pages.map((p) => (
                            <Link key={p.href} href={p.href} className="sp-lnk">
                              <svg className="sp-lnk-i" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.2"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                              {p.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <p className="sp-fnote">
                Can't find what you're looking for?{" "}
                <Link href="/contact-us">Contact Us</Link> — we're happy to help.
              </p>
            </main>

          </div>
        </div>
      </div>

      <style jsx>{`

        .sp { background: #f3f4ff; min-height: 100vh; }

        /* HERO */
        .sp-hero {
          position: relative;
          background: linear-gradient(140deg, #080f2e 0%, #1b1870 55%, #080f2e 100%);
          padding: 70px 0 78px;
          overflow: hidden;
          text-align: center;
        }
        .sp-g1, .sp-g2 {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
        }
        .sp-g1 { width: 500px; height: 500px; background: #4441e5; opacity: 0.25; top: -140px; left: -60px; }
        .sp-g2 { width: 400px; height: 400px; background: #00cbb8; opacity: 0.18; bottom: -100px; right: -40px; }
        .sp-hero-c { position: relative; }

        .sp-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(68,65,229,0.22);
          border: 1px solid rgba(68,65,229,0.5);
          color: #00cbb8;
          font-size: 0.71rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 15px;
          border-radius: 100px;
          margin-bottom: 20px;
        }

        .sp-hero h1 {
          font-size: clamp(1.85rem, 4.5vw, 2.9rem);
          font-weight: 900;
          color: #fff;
          margin: 0 0 12px;
          line-height: 1.18;
        }
        .sp-hero h1 em {
          font-style: normal;
          background: linear-gradient(90deg, #6b68ff 0%, #00cbb8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .sp-hero p {
          color: rgba(255,255,255,0.48);
          font-size: 0.88rem;
          margin: 0;
          letter-spacing: 0.01em;
        }

        /* LAYOUT */
        .sp-wrap {
          display: grid;
          grid-template-columns: 224px 1fr;
          gap: 26px;
          padding: 38px 0 60px;
          align-items: start;
        }

        /* SIDEBAR */
        .sp-side { position: sticky; top: 80px; }
        .sp-side-box {
          background: #fff;
          border-radius: 13px;
          border: 1.5px solid #d8dcf5;
          overflow: hidden;
          box-shadow: 0 2px 14px rgba(68,65,229,0.07);
        }
        .sp-side-hd {
          padding: 12px 15px 10px;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #7e8db5;
          background: #f6f7ff;
          border-bottom: 1.5px solid #eaecfa;
        }
        .sp-side-body {
          overflow-y: auto;
          max-height: calc(100vh - 170px);
          scrollbar-width: thin;
          scrollbar-color: #c8cdf0 transparent;
        }
        .sp-side-a {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          font-size: 0.76rem;
          font-weight: 500;
          color: #3b4870;
          text-decoration: none;
          border-bottom: 1px solid #f1f2fb;
          transition: background 0.12s, color 0.12s;
        }
        .sp-side-a:last-child { border-bottom: none; }
        .sp-side-a:hover { background: #eef0ff; color: #4441e5; }
        .sp-side-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .sp-side-n {
          flex-shrink: 0;
          font-size: 0.62rem;
          font-weight: 800;
          background: #eef0ff;
          color: #4441e5;
          padding: 2px 6px;
          border-radius: 100px;
        }

        /* MAIN */
        .sp-content { display: flex; flex-direction: column; gap: 10px; }

        /* SECTION CARD */
        .sp-sec {
          background: #fff;
          border-radius: 13px;
          border: 1.5px solid #d8dcf5;
          overflow: hidden;
          box-shadow: 0 1px 8px rgba(68,65,229,0.05);
          transition: box-shadow 0.18s;
        }
        .sp-sec:hover { box-shadow: 0 4px 20px rgba(68,65,229,0.1); }

        .sp-sec-hd {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 15px 20px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.12s;
          gap: 12px;
        }
        .sp-sec-hd:hover { background: #f6f7ff; }

        .sp-sec-left { display: flex; align-items: center; gap: 12px; }

        .sp-sec-ico {
          width: 38px; height: 38px;
          background: #eef0ff;
          border: 1.5px solid #d4d2f7;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .sp-sec-info { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; }

        .sp-sec-title {
          font-size: 0.92rem;
          font-weight: 800;
          color: #0f1f3d;
          line-height: 1;
        }

        .sp-sec-ct {
          font-size: 8px;
          font-weight: 700;
          color: #4441e5;
          background: #eef0ff;
          border: 1px solid #c8c6f5;
          padding: 2px 8px;
          border-radius: 100px;
          line-height: 1.5;
        }

        .sp-arr {
          width: 17px; height: 17px;
          color: #a0aabe;
          flex-shrink: 0;
          transition: transform 0.22s ease, color 0.15s;
        }
        .sp-arr--up { transform: rotate(180deg); color: #4441e5; }

        /* LINK GRID */
        .sp-sec-body {
          padding: 16px 20px 20px;
          border-top: 1.5px solid #eceeff;
          background: #f8f9ff;
        }

        .sp-grid {
          display: grid;
          font-size:12px;
          grid-template-columns: repeat(auto-fill, minmax(228px, 1fr));
          gap: 7px;
        }

        .sp-lnk {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 9px 12px;
          background: #fff;
          border: 1.5px solid #e0e3f5;
          border-radius: 8px;
          color: #2d3a5a;
          font-size: 0.8rem;
          font-weight: 500;
          text-decoration: none;
          line-height: 1.38;
          transition: border-color 0.13s, color 0.13s, background 0.13s, transform 0.13s;
        }
        .sp-lnk:hover {
          border-color: #4441e5;
          color: #4441e5;
          background: #eef0ff;
          transform: translateX(3px);
        }

        .sp-lnk-i {
          width: 13px; height: 13px;
          flex-shrink: 0;
          margin-top: 2px;
          color: #4441e5;
          opacity: 0.4;
          transition: opacity 0.13s, transform 0.13s;
        }
        .sp-lnk:hover .sp-lnk-i { opacity: 1; transform: translateX(2px); }

        /* FOOTER NOTE */
        .sp-fnote {
          text-align: center;
          padding: 18px 0 2px;
          font-size: 0.85rem;
          color: #8491aa;
          margin: 0;
        }
        .sp-fnote a { color: #4441e5; font-weight: 700; text-decoration: none; }
        .sp-fnote a:hover { text-decoration: underline; }

        /* RESPONSIVE */
        @media (max-width: 920px) {
          .sp-wrap { grid-template-columns: 1fr; padding: 28px 0 44px; }
          .sp-side { display: none; }
        }
        @media (max-width: 500px) {
          .sp-hero { padding: 48px 0 54px; }
          .sp-grid { grid-template-columns: 1fr; }
          .sp-sec-hd, .sp-sec-body { padding-left: 14px; padding-right: 14px; }
        }
      `}</style>
 

    <Footer/>
        
      
    </>
  );
}