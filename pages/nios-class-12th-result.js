import { useState } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
function AccordionFAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? "expanded" : ""}`}
        >
          <div
            className="faq-question d-flex justify-content-between align-items-center"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            style={{ cursor: "pointer" }}
          >
            <div className="faq-question-text">{item.q}</div>
            <div className="faq-icon" style={{ fontSize: "22px", fontWeight: "700", color: "#4441e5", flexShrink: 0, marginLeft: "12px" }}>
              {openIndex === index ? "−" : "+"}
            </div>
          </div>
          {openIndex === index && (
            <div className="faq-answer mt-2" style={{ fontSize: "14px", lineHeight: "1.75", color: "#374151" }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const faqItems = [
  {
    q: "When will the NIOS Class 12 Result 2026 be declared?",
    a: "The NIOS Senior Secondary Result 2026 for the April–May session is typically declared in June–July 2026. The October–November session result is usually announced in December–January. Students should regularly check results.nios.ac.in for the latest updates. SS Coaching also notifies registered students as soon as results are declared.",
  },
  {
    q: "How can I check my NIOS 12th Result 2026?",
    a: "Visit results.nios.ac.in, select the Senior Secondary (Class 12) result link, enter your NIOS Enrollment Number and Date of Birth, and click Submit. Your subject-wise marks, total score, and qualifying status will be displayed. Download the PDF immediately for your records. The result is also accessible on DigiLocker.",
  },
  {
    q: "What are the passing marks for NIOS Class 12 2026?",
    a: "Students must score a minimum of 33% marks in each individual subject, including theory and practical components separately where applicable. There is no overall aggregate-only passing system — every subject must individually clear the 33% threshold.",
  },
  {
    q: "What should I do if I fail in one subject in NIOS Class 12?",
    a: "Students who fail in one or two subjects are classified as compartment candidates. They can appear for the re-appear examination in the next NIOS session without re-registering for all subjects. SS Coaching helps compartment candidates prepare targeted improvement plans and complete the re-registration process correctly.",
  },
  {
    q: "Can I improve my NIOS Class 12 marks to meet college cutoffs?",
    a: "Yes. NIOS allows passed students to appear for improvement examinations in subsequent sessions. The higher of the two scores is retained. This is particularly important for students targeting specific university cutoffs, professional course eligibility requirements, or competitive examination mark thresholds.",
  },
  {
    q: "Is the NIOS Class 12 certificate recognized for college admissions?",
    a: "Yes. NIOS Senior Secondary certificates are recognized by UGC, all central universities, state universities, government institutions, and employers across India. NIOS-qualified students are eligible for CUET, state university entrance tests, and direct admissions to all undergraduate programs offered by recognized institutions.",
  },
  {
    q: "Can I appear for competitive exams after NIOS Class 12?",
    a: "Yes. NIOS Class 12 qualifiers are eligible for SSC CGL, SSC CHSL, IBPS banking exams, RRB exams, state PSC examinations, and many other competitive examinations — provided they meet the specific eligibility criteria set by the respective examination authority.",
  },
  {
    q: "What are the best courses after NIOS Class 12?",
    a: "The best option depends on your stream and marks. Science students can pursue B.Sc., Engineering, BCA, or Nursing. Commerce students can explore B.Com, BBA, or CA Foundation. Arts students can consider BA, Journalism, Mass Communication, D.El.Ed, or Law. SS Coaching provides personalized course guidance based on your specific result profile.",
  },
  {
    q: "How do I get my original NIOS 12th marksheet?",
    a: "The original marksheet cum certificate and migration certificate are dispatched to your Accredited Institute (AI) or Study Centre. Collect these documents from your AI after declaration. If your AI has been cancelled, contact your NIOS Regional Centre. The marksheet is also available digitally on DigiLocker (digilocker.gov.in).",
  },
  {
    q: "What if there is a mistake in my NIOS Class 12 marksheet?",
    a: "Report any discrepancy — in marks, name spelling, date of birth, or other personal details — to your NIOS Regional Centre within 30 days of result declaration. Corrections made after this deadline involve a more complex and time-consuming process.",
  },
  {
    q: "Does NIOS Class 12 qualify students for CUET?",
    a: "Yes. NIOS Class 12 qualifiers are eligible to appear for CUET for admission to central universities across India, subject to the eligibility criteria set by the respective university for the specific program.",
  },
  {
    q: "What streams are available in NIOS Class 12?",
    a: "NIOS offers three streams for Class 12: Science, Commerce, and Arts/Humanities. Within each stream, students can choose specific subject combinations with some flexibility. This flexibility is one of the key advantages of NIOS over regular board examinations.",
  },
  {
    q: "Can NIOS Class 12 students apply for government jobs?",
    a: "Yes. NIOS Senior Secondary certificates are accepted by all central and state government departments for recruitment purposes, wherever Class 12 qualification is a requirement. Students are eligible for SSC, railway, banking, and state government job applications.",
  },
  {
    q: "How can SS Coaching help me after my NIOS Class 12 Result 2026?",
    a: "SS Coaching has guided NIOS students since 2001. After your Class 12 result, we help you with re-evaluation decisions, improvement exam planning, college admission applications, course selection based on your stream and marks, and competitive exam eligibility assessment. All initial counseling sessions are free and available to students across India.",
  },
];

export default function NIOSClass12Result2026() {
  return (
    <>
      <Head>
        <title>NIOS Class 12th Result 2026 – Check Senior Secondary Result | SS Coaching</title>
        <meta
          name="description"
          content="Check NIOS Class 12 Result 2026 at results.nios.ac.in. SS Coaching provides complete guidance on NIOS Senior Secondary Result 2026 — marksheet download, passing marks, re-evaluation, improvement exam, college admissions, and career planning. Free counseling available."
        />
        <meta
          name="keywords"
          content="NIOS Class 12 Result 2026, NIOS 12th Result 2026, NIOS Senior Secondary Result 2026, results.nios.ac.in Class 12, NIOS 12th Marksheet Download 2026, NIOS Senior Secondary Passing Criteria 2026, NIOS Class 12 Improvement Exam 2026, courses after NIOS Class 12"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        {/* ===== HERO BANNER ===== */}
        <div style={{
          background: "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #fff7ed 100%)",
          borderBottom: "1px solid #e5e7eb",
          padding: "60px 0 52px",
        }}>
          <div className="container">
            <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
              <span style={{
                display: "inline-block",
                background: "#ede9fe",
                color: "#4441e5",
                borderRadius: "30px",
                padding: "6px 20px",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.4px",
                marginBottom: "20px",
                border: "1px solid #c4b5fd",
              }}>
                SS Coaching – Official NIOS Guidance Partner Since 2001
              </span>

              <h1 style={{
                fontSize: "clamp(24px, 4vw, 40px)",
                fontWeight: "700",
                lineHeight: "1.25",
                color: "#101727",
                marginBottom: "16px",
                fontFamily: "SF Pro Display, Poppins, sans-serif",
              }}>
                NIOS Class 12 Result 2026 –{" "}
                <span style={{ color: "#4441e5" }}>Senior Secondary Examination Result Declared</span>
              </h1>

              <p style={{
                fontSize: "clamp(13px, 1.8vw, 15px)",
                color: "#6b7280",
                lineHeight: "1.6",
                marginBottom: "18px",
              }}>
                Check Result on results.nios.ac.in &bull; Marksheet Download Guide &bull; Passing Criteria &bull; Re-evaluation &bull; College Admission Counseling
              </p>

              <p style={{
                fontSize: "clamp(13px, 1.6vw, 15px)",
                color: "#374151",
                lineHeight: "1.75",
                marginBottom: "32px",
                textAlign: "left",
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "18px 20px",
              }}>
                The National Institute of Open Schooling (NIOS) has declared the NIOS Class 12 Result 2026 for the Senior Secondary examination across all streams — Science, Commerce, and Arts. Students who appeared in the April–May or October–November session can check their result, download their provisional marksheet, and verify their qualifying status at results.nios.ac.in. SS Coaching provides expert post-result guidance — from understanding your marks to securing college admissions and planning your career path.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
                <a
                  href="https://results.nios.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#4441e5",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "13px 26px",
                    fontSize: "14px",
                    fontWeight: "700",
                    textDecoration: "none",
                    display: "inline-block",
                    boxShadow: "0 4px 14px rgba(68,65,229,0.25)",
                  }}
                >
                  Check NIOS 12th Result Now – results.nios.ac.in
                </a>
                <a
                  href="/nios-admission"
                  style={{
                    background: "#fff",
                    color: "#4441e5",
                    border: "2px solid #4441e5",
                    borderRadius: "8px",
                    padding: "13px 26px",
                    fontSize: "14px",
                    fontWeight: "700",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Get Free NIOS Class 12 Counseling
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="syllabus-nios">
          <div className="container">

            {/* ===== SECTION 2: INSTANT RESULT CHECK ===== */}
            <div style={{
              background: "#fff",
              border: "1px solid #e0e7ff",
              borderTop: "4px solid #4441e5",
              borderRadius: "12px",
              padding: "28px 28px 24px",
              marginBottom: "50px",
              boxShadow: "0 2px 16px rgba(68,65,229,0.06)",
            }}>
              <span style={{
                display: "inline-block",
                background: "#eef2ff",
                color: "#4441e5",
                borderRadius: "6px",
                padding: "3px 14px",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: "10px",
              }}>
                Check Your NIOS Class 12 Result 2026 Right Now
              </span>

              <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "14px" }}>
                NIOS 12th Result 2026 – Check on Official Portal Instantly
              </h2>

              <p style={{ marginBottom: "20px", lineHeight: "1.7", fontSize: "15px", color: "#374151" }}>
                Your NIOS Senior Secondary Result 2026 is now available on the official NIOS result portal. Follow these steps to check your result immediately:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "22px" }}>
                {[
                  { step: "Step 1", text: "Open the official NIOS result portal — results.nios.ac.in (Direct link, no login required)", link: "https://results.nios.ac.in" },
                  { step: "Step 2", text: 'Click on "Senior Secondary (Class 12) Public Examination Result 2026"' },
                  { step: "Step 3", text: "Enter your NIOS Enrollment Number (printed on your Admit Card)" },
                  { step: "Step 4", text: "Enter your Date of Birth and the on-screen captcha code" },
                  { step: "Step 5", text: 'Click "Submit" — your result will appear on screen' },
                  { step: "Step 6", text: "Review your subject-wise marks, total score, stream performance, and pass/fail status" },
                  { step: "Step 7", text: "Download as PDF immediately and take a printout for your records" },
                  { step: "Step 8", text: "Collect your original marksheet from your NIOS Accredited Institute (AI) / Study Centre" },
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    background: "#f9fafb",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    border: "1px solid #f3f4f6",
                  }}>
                    <span style={{
                      background: "#4441e5",
                      color: "#fff",
                      borderRadius: "50%",
                      minWidth: "26px",
                      height: "26px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: "700",
                      flexShrink: 0,
                    }}>{idx + 1}</span>
                    <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.65", color: "#374151" }}>
                      <strong>{item.step}:</strong>{" "}
                      {item.link
                        ? <><span>Open the official NIOS result portal — </span><a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: "#4441e5", fontWeight: "600" }}>results.nios.ac.in</a><span> (Direct link, no login required)</span></>
                        : item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{
                background: "#fffbeb",
                border: "1px solid #fcd34d",
                borderRadius: "8px",
                padding: "13px 16px",
                marginBottom: "18px",
                fontSize: "13.5px",
                lineHeight: "1.7",
                color: "#374151",
              }}>
                <strong>Important:</strong> The NIOS result portal may face high traffic in the first 24–48 hours after declaration. If the page does not load, use the alternate URL nios.ac.in or try accessing during early morning hours. Your result is also available on{" "}
                <a href="https://digilocker.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#4441e5", fontWeight: "600" }}>DigiLocker (digilocker.gov.in)</a>{" "}
                as a verified digital document.
              </div>

              <div style={{ marginBottom: "22px" }}>
                <p style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", color: "#374151" }}>Also Available On:</p>
                <ul style={{ paddingLeft: "20px", lineHeight: "2", fontSize: "14px", color: "#374151" }}>
                  <li><a href="https://digilocker.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#4441e5", fontWeight: "600" }}>DigiLocker (digilocker.gov.in)</a> — verified digital marksheet</li>
                  <li>NIOS Mobile App</li>
                </ul>
              </div>

              <div style={{
                background: "linear-gradient(90deg, #eef2ff 0%, #fff7ed 100%)",
                border: "1px solid #e0e7ff",
                borderRadius: "10px",
                padding: "18px 22px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "14px",
              }}>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5", color: "#374151", fontWeight: "500" }}>
                  Checked your result and need help deciding your next step? We're here.
                </p>
                <a href="/nios-admission" style={{
                  background: "#FF9422",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "11px 22px",
                  fontWeight: "700",
                  fontSize: "13.5px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  boxShadow: "0 3px 10px rgba(255,148,34,0.3)",
                }}>
                  Talk to an NIOS Expert — Free
                </a>
              </div>
            </div>

            {/* ===== SECTION 3: INTRODUCTION ===== */}
            <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "16px" }}>
              NIOS Class 12 Result 2026: What Every Senior Secondary Student Must Know
            </h2>

            <p style={{ marginBottom: "16px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
              The NIOS Senior Secondary (Class 12) Result 2026 has been officially declared by the National Institute of Open Schooling for students across all three streams — Science, Commerce, and Arts/Humanities — who appeared in the April–May and October–November examination sessions. The result, available at{" "}
              <a href="https://results.nios.ac.in" target="_blank" rel="noopener noreferrer" style={{ color: "#4441e5", fontWeight: "600" }}>results.nios.ac.in</a>, includes subject-wise marks, total score, and qualifying status. Students who appeared under the On-Demand Examination (ToD) system can also check their results through the same portal.
            </p>

            <p style={{ marginBottom: "26px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
              The NIOS Class 12 result is a significant milestone. It determines eligibility for undergraduate college admissions, competitive examinations, diploma programs, and professional courses. At SS Coaching, we have guided NIOS Senior Secondary students since 2001 — helping them understand their result, apply for re-evaluation, improve their marks, and navigate college admission processes. Our counselors work with students across every outcome — distinction, pass, compartment, and re-appear — to build the right forward path.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "10px",
              marginBottom: "50px",
            }}>
              {[
                "Result Verification Support",
                "Passing Criteria & Grace Marks Explained",
                "Re-evaluation & Rechecking Guidance",
                "Improvement Exam Registration Help",
                "College & University Admission Planning",
                "Career Counseling Based on Stream & Marks",
              ].map((item, i) => (
                <div key={i} style={{
                  background: "#f8faff",
                  border: "1px solid #e0e7ff",
                  borderLeft: "3px solid #4441e5",
                  borderRadius: "7px",
                  padding: "11px 14px",
                  fontSize: "13.5px",
                  fontWeight: "600",
                  color: "#374151",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}>
                  <span style={{ color: "#4441e5" }}>✔</span> {item}
                </div>
              ))}
            </div>

            {/* ===== SECTION 4: MARKSHEET CONTENTS ===== */}
            <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "12px" }}>
              What Information Is Shown on the NIOS Class 12 Result 2026?
            </h2>

            <p style={{ marginBottom: "16px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
              Your NIOS Senior Secondary Result 2026 on results.nios.ac.in is a provisional marksheet. Verify every field carefully after downloading, and report errors to your Regional Centre within 30 days:
            </p>

            <div className="table-wrapper mb-4">
              <table>
                <thead>
                  <tr>
                    <th><b>Field</b></th>
                    <th><b>Description</b></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Candidate's Name", "Full name as registered with NIOS"],
                    ["Enrollment Number", "Your unique NIOS ID"],
                    ["Date of Birth", "As submitted at registration"],
                    ["Course / Class", "Senior Secondary (Class 12)"],
                    ["Stream", "Science / Commerce / Arts"],
                    ["Examination Session", "April–May 2026 / October–November 2026"],
                    ["Subject-wise Marks", "Theory + Practical marks per subject"],
                    ["Total Marks Obtained", "Aggregate score across all subjects"],
                    ["Qualifying Status", "Pass / Fail / Compartment"],
                    ["Mother's Name", "As registered with NIOS"],
                    ["Result Declaration Date", "Displayed on the marksheet"],
                  ].map(([field, desc], i) => (
                    <tr key={i}>
                      <td><strong>{field}</strong></td>
                      <td>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{
              background: "#fffbeb",
              border: "1px solid #fcd34d",
              borderRadius: "8px",
              padding: "13px 16px",
              marginBottom: "50px",
              fontSize: "13.5px",
              lineHeight: "1.7",
              color: "#374151",
            }}>
              <strong>Note:</strong> The online result is a provisional marksheet. Your original marksheet cum certificate and migration cum transfer certificate will be sent to your Accredited Institute (AI) or Study Centre. Collect these promptly. If your AI is cancelled, documents are sent to your NIOS Regional Centre.
            </div>

            {/* ===== SECTION 5: PASSING CRITERIA ===== */}
            <div style={{ marginBottom: "50px" }}>
              <span style={{
                display: "inline-block",
                background: "#eef2ff",
                color: "#4441e5",
                border: "1px solid #c4b5fd",
                borderRadius: "6px",
                padding: "3px 14px",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                marginBottom: "12px",
              }}>
                NIOS Senior Secondary Passing Criteria 2026
              </span>

              <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "14px" }}>
                NIOS Class 12 Passing Marks &amp; Criteria 2026 – Understanding Your Result
              </h2>

              <p style={{ marginBottom: "20px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
                To pass the NIOS Senior Secondary (Class 12) examination in 2026, students must secure a minimum of 33% marks in each individual subject, including both theory and practical components where applicable. The passing requirement is per-subject — not aggregate-only. A strong performance in other subjects does not compensate for failing one subject.
              </p>

              <h3 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "10px", color: "#101727" }}>
                NIOS Class 12 Minimum Passing Marks 2026
              </h3>

              <div className="table-wrapper" style={{ marginBottom: "24px" }}>
                <table>
                  <thead>
                    <tr>
                      <th><b>Component</b></th>
                      <th><b>Minimum Required</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Theory Exam (per subject)</td><td><strong>33% of theory marks</strong></td></tr>
                    <tr><td>Practical Exam (where applicable)</td><td><strong>33% of practical marks</strong></td></tr>
                    <tr><td>Overall per subject</td><td><strong>33% (theory + practical combined)</strong></td></tr>
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "8px", color: "#101727" }}>
                Grace Mark Provision – NIOS Class 12
              </h3>
              <p style={{ marginBottom: "20px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
                NIOS applies a grace mark provision to assist students who narrowly miss the passing threshold in a subject. Grace marks are awarded at the board's discretion and applied to the final published result. Students whose results reflect grace marks are officially considered passed. The grace mark policy varies by session and is applied internally.
              </p>

              <h3 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "8px", color: "#101727" }}>
                Compartment / Failed in Subjects
              </h3>
              <p style={{ lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
                Students who fail in one or two subjects are classified as compartment candidates and can appear for the re-appear examination in the next NIOS session without re-registering for all subjects. This allows targeted subject-level clearing to complete the Senior Secondary certification.
              </p>
            </div>

            {/* ===== SECTION 6: RE-EVALUATION ===== */}
            <div style={{ marginBottom: "50px" }}>
              <span style={{
                display: "inline-block",
                background: "#fef2f2",
                color: "#dc2626",
                border: "1px solid #fca5a5",
                borderRadius: "6px",
                padding: "3px 14px",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                marginBottom: "12px",
              }}>
                NIOS 12th Re-evaluation 2026
              </span>

              <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "14px" }}>
                Not Satisfied With Your NIOS Class 12 Result 2026? Know Your Options
              </h2>

              <p style={{ marginBottom: "20px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
                If your NIOS Class 12 marks are lower than expected, NIOS provides two formal post-result review mechanisms — Rechecking and Re-evaluation. Understanding the difference between these two options is important before applying, as they serve different purposes and have separate fees.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px", marginBottom: "20px" }}>
                <div style={{ background: "#f8faff", border: "1px solid #dbeafe", borderTop: "3px solid #4441e5", borderRadius: "10px", padding: "20px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#4441e5", marginBottom: "10px" }}>
                    Rechecking (Available for Class 12)
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#374151", marginBottom: "10px" }}>
                    Rechecking involves a re-totalling of marks to verify that no marks were missed or miscalculated during evaluation.
                  </p>
                  <ul style={{ paddingLeft: "16px", fontSize: "13.5px", lineHeight: "2", color: "#374151" }}>
                    <li><strong>Fee:</strong> As per the official NIOS board</li>
                    <li><strong>Applicable For:</strong> Class 12 (and Class 10)</li>
                    <li><strong>Timeline:</strong> ~15 days after result, open for 15 days</li>
                  </ul>
                </div>

                <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderTop: "3px solid #f59e0b", borderRadius: "10px", padding: "20px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#b45309", marginBottom: "10px" }}>
                    Re-evaluation (Class 12 ONLY)
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#374151", marginBottom: "10px" }}>
                    Re-evaluation involves a detailed review of your answer sheet by a qualified examiner — answers themselves are reassessed, not just re-totalled.
                  </p>
                  <ul style={{ paddingLeft: "16px", fontSize: "13.5px", lineHeight: "2", color: "#374151" }}>
                    <li><strong>Fee:</strong> As per the official NIOS board</li>
                    <li><strong>Applicable For:</strong> Class 12 ONLY (not Class 10)</li>
                    <li><strong>Timeline:</strong> Same window as rechecking</li>
                  </ul>
                </div>
              </div>

              <div style={{
                background: "#fef2f2",
                border: "1px solid #fca5a5",
                borderRadius: "8px",
                padding: "13px 16px",
                marginBottom: "20px",
                fontSize: "13.5px",
                lineHeight: "1.7",
                color: "#374151",
              }}>
                <strong>Important:</strong> Both rechecking and re-evaluation applications must be submitted within the designated window, typically announced within 15 days of result declaration. Missing this window means you cannot apply.
              </div>

              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "10px", color: "#101727" }}>
                When Should You Apply for Re-evaluation?
              </h3>
              <ul style={{ paddingLeft: "20px", lineHeight: "2", marginBottom: "22px", fontSize: "14.5px", color: "#374151" }}>
                <li>If your marks are significantly lower than your preparation level and mock test performance</li>
                <li>If the result shows a failing status in a subject you were confident about</li>
                <li>If you need to clear a subject to meet a specific college or course cutoff</li>
                <li>If a re-evaluation could make the difference between a compartment status and a full pass</li>
              </ul>

              <a href="/nios-admission" style={{
                display: "inline-block",
                background: "#4441e5",
                color: "#fff",
                borderRadius: "8px",
                padding: "12px 24px",
                fontWeight: "700",
                fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 3px 10px rgba(68,65,229,0.2)",
              }}>
                Get Expert Help Deciding Whether to Apply for Re-evaluation — Free
              </a>
            </div>

            {/* ===== SECTION 7: IMPROVEMENT EXAM ===== */}
            <div style={{ marginBottom: "50px" }}>
              <span style={{
                display: "inline-block",
                background: "#f0fdf4",
                color: "#059669",
                border: "1px solid #bbf7d0",
                borderRadius: "6px",
                padding: "3px 14px",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                marginBottom: "12px",
              }}>
                NIOS Class 12 Improvement Exam 2026
              </span>

              <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "14px" }}>
                NIOS 12th Improvement &amp; Re-Appear Examination 2026 – Complete Guide
              </h2>

              <p style={{ marginBottom: "20px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
                NIOS provides structured pathways for students who want to improve their Class 12 performance or complete pending subjects. The two available options differ based on your current result status:
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px", marginBottom: "22px" }}>
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderTop: "3px solid #059669", borderRadius: "10px", padding: "20px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#059669", marginBottom: "10px" }}>
                    1. Improvement Examination (for students who have passed)
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#374151" }}>
                    Students who have cleared all subjects but want higher marks — for college merit lists, competitive examination eligibility, or stream-specific subject strength — can appear for improvement examinations in the next NIOS session. The higher of the two scores is retained as the final result.
                  </p>
                </div>

                <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderTop: "3px solid #dc2626", borderRadius: "10px", padding: "20px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#dc2626", marginBottom: "10px" }}>
                    2. Re-Appear / Compartment Examination (failed in subjects)
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#374151" }}>
                    Students who failed in one or two subjects can appear for the re-appear examination in the subsequent session. They do not need to re-register for all subjects — only the failed ones need to be cleared to complete Senior Secondary certification.
                  </p>
                </div>
              </div>

              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "10px", color: "#101727" }}>
                Who Should Apply for NIOS Class 12 Improvement Exam 2026?
              </h3>
              <ul style={{ paddingLeft: "20px", lineHeight: "2", marginBottom: "22px", fontSize: "14.5px", color: "#374151" }}>
                <li>Students who passed but need higher marks for competitive college cutoffs (CUET, state university entrance tests)</li>
                <li>Students targeting specific percentage thresholds for professional course admissions (nursing, polytechnic, BCA)</li>
                <li>Students who failed in 1–2 subjects (compartment candidates)</li>
                <li>Students who want stronger subject-specific scores for competitive exam eligibility (SSC, banking, railways)</li>
                <li>On-Demand (ToD) examination students seeking performance improvement</li>
              </ul>

              <a href="/nios-admission" style={{
                display: "inline-block",
                background: "#059669",
                color: "#fff",
                borderRadius: "8px",
                padding: "12px 24px",
                fontWeight: "700",
                fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 3px 10px rgba(5,150,105,0.2)",
              }}>
                Check Your NIOS Class 12 Improvement Exam Eligibility — Speak to an Expert
              </a>
            </div>

            {/* ===== SECTION 8: CAREER OPTIONS ===== */}
            <div style={{ marginBottom: "50px" }}>
              <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "14px" }}>
                Career &amp; College Options After NIOS Class 12 Result 2026
              </h2>

              <p style={{ marginBottom: "20px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
                A passing NIOS Senior Secondary (Class 12) certificate opens the door to a wide range of undergraduate courses, diploma programs, professional certifications, and competitive examinations. The NIOS Class 12 certificate is recognized by UGC, all central and state universities, government organizations, and employers across India.
              </p>

              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "#101727" }}>Undergraduate College Admissions</h3>
              <p style={{ marginBottom: "18px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
                NIOS Senior Secondary students are eligible to apply for all UGC-recognized undergraduate programs. Students can appear for CUET (Central University Entrance Test) and apply to central universities, state university entrance tests, and open university admissions (IGNOU and others).
              </p>

              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "#101727" }}>Professional &amp; Diploma Programs</h3>
              <ul style={{ paddingLeft: "20px", lineHeight: "2", marginBottom: "20px", fontSize: "14.5px", color: "#374151" }}>
                <li>Polytechnic Diploma programs (engineering, computer science, architecture)</li>
                <li>Nursing &amp; Paramedical courses (GNM, ANM, B.Sc. Nursing — subject to state eligibility)</li>
                <li>Hotel Management and Hospitality courses</li>
                <li>Aviation and Travel &amp; Tourism programs</li>
                <li>BCA, BBA, B.Com programs</li>
                <li>Mass Communication and Journalism</li>
              </ul>

              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "10px", color: "#101727" }}>Competitive Examinations</h3>
              <div className="table-wrapper" style={{ marginBottom: "24px" }}>
                <table>
                  <thead>
                    <tr><th><b>Examination</b></th><th><b>Organization</b></th></tr>
                  </thead>
                  <tbody>
                    {[
                      ["SSC CGL / CHSL / MTS", "Staff Selection Commission"],
                      ["Banking Clerk / PO", "IBPS / SBI"],
                      ["Railway Group C & D", "RRB (select categories)"],
                      ["State PSC exams", "All state public service commissions"],
                      ["NDA (if age eligible)", "UPSC"],
                      ["Various state government jobs", "Multiple departments"],
                    ].map(([exam, org], i) => (
                      <tr key={i}><td>{exam}</td><td>{org}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "10px", color: "#101727" }}>Stream-Wise Best Options After NIOS Class 12</h3>
              <div className="table-wrapper" style={{ marginBottom: "22px" }}>
                <table>
                  <thead>
                    <tr><th><b>Stream</b></th><th><b>Top Course Options</b></th></tr>
                  </thead>
                  <tbody>
                    <tr><td><strong>Science</strong></td><td>B.Sc., MBBS, Engineering, BCA, Nursing, Pharmacy</td></tr>
                    <tr><td><strong>Commerce</strong></td><td>B.Com, BBA, CA Foundation, Banking, SSC</td></tr>
                    <tr><td><strong>Arts/Humanities</strong></td><td>BA, Law (BA LLB), Journalism, Mass Comm, Teaching (D.El.Ed)</td></tr>
                  </tbody>
                </table>
              </div>

              <p style={{ marginBottom: "22px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
                The right course selection after NIOS Class 12 depends on your subject marks, stream, personal interests, and long-term career goals. SS Coaching provides structured career counseling to help students identify the most suitable higher education pathway based on their specific NIOS result and academic profile.
              </p>

              <a href="/nios-admission" style={{
                display: "inline-block",
                background: "#FF9422",
                color: "#fff",
                borderRadius: "8px",
                padding: "12px 24px",
                fontWeight: "700",
                fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 3px 10px rgba(255,148,34,0.25)",
              }}>
                Get Career Counseling After NIOS Class 12 — Free Session With SS Coaching
              </a>
            </div>

            {/* ===== SECTION 9: MARKSHEET GUIDE ===== */}
            <div style={{ marginBottom: "50px" }}>
              <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "22px" }}>
                NIOS Class 12 Marksheet 2026 – How to Download &amp; Collect Original
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "22px" }}>
                {[
                  {
                    title: "Provisional Marksheet (Online)",
                    borderColor: "#4441e5",
                    bgColor: "#f8faff",
                    points: [
                      "Visit results.nios.ac.in and access your result",
                      "Download the result as PDF",
                      "Save a digital copy and take a printout",
                      "Use enrollment number for verification",
                    ],
                    note: "Valid for immediate use — college applications and exam form-filling.",
                  },
                  {
                    title: "Original Marksheet cum Certificate",
                    borderColor: "#059669",
                    bgColor: "#f0fdf4",
                    points: [
                      "Physical certificate dispatched by NIOS to your AI or Study Centre",
                      "Collect from your AI promptly",
                      "If AI is cancelled, NIOS sends to Regional Centre",
                    ],
                    note: "Required for final college admission and official document submission.",
                  },
                  {
                    title: "DigiLocker – Verified Digital Marksheet",
                    borderColor: "#0ea5e9",
                    bgColor: "#f0f9ff",
                    points: [
                      "Available on DigiLocker (digilocker.gov.in)",
                      "Officially verified digital document",
                      "Accepted by most college portals and government processes",
                    ],
                    note: "",
                  },
                  {
                    title: "Corrections in NIOS Class 12 Marksheet",
                    borderColor: "#dc2626",
                    bgColor: "#fef2f2",
                    points: [
                      "Verify all details immediately after downloading",
                      "Check name, DOB, enrollment number, and marks",
                      "Contact NIOS Regional Centre within 30 days of result declaration",
                    ],
                    note: "Corrections after 30 days involve a more complex process.",
                  },
                ].map((card, i) => (
                  <div key={i} style={{
                    background: card.bgColor,
                    border: `1px solid ${card.borderColor}30`,
                    borderTop: `3px solid ${card.borderColor}`,
                    borderRadius: "10px",
                    padding: "18px",
                  }}>
                    <h3 style={{ fontSize: "14px", fontWeight: "700", color: card.borderColor, marginBottom: "10px" }}>
                      {card.title}
                    </h3>
                    <ul style={{ paddingLeft: "16px", fontSize: "13px", lineHeight: "1.9", color: "#374151", marginBottom: card.note ? "8px" : "0" }}>
                      {card.points.map((pt, j) => <li key={j}>{pt}</li>)}
                    </ul>
                    {card.note && <p style={{ fontSize: "12px", color: "#6b7280", fontStyle: "italic", margin: 0 }}>{card.note}</p>}
                  </div>
                ))}
              </div>

              <div style={{
                background: "linear-gradient(90deg, #eef2ff 0%, #fff7ed 100%)",
                border: "1px solid #e0e7ff",
                borderRadius: "10px",
                padding: "18px 22px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "14px",
              }}>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5", color: "#374151", fontWeight: "500" }}>
                  Need Help With Your NIOS 12th Marksheet Collection or Correction?
                </p>
                <a href="/nios-admission" style={{
                  background: "#FF9422",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "11px 22px",
                  fontWeight: "700",
                  fontSize: "13.5px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  boxShadow: "0 3px 10px rgba(255,148,34,0.3)",
                }}>
                  Ask Our Team
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ===== SECTION 10: FAQs ===== */}
        <div style={{ background: "#f8faff", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "10px 0 0" }}>
          <div className="container" style={{ paddingTop: "10px" }}>
            <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "6px", paddingTop: "30px" }}>
              Frequently Asked Questions – NIOS Class 12 Result 2026
            </h2>
          </div>
          <div className="faq-section" style={{ background: "transparent" }}>
            <div className="container">
              <div className="faq-container">
                <AccordionFAQ items={faqItems} />
              </div>
            </div>
          </div>
        </div>

        {/* ===== SECTION 11: ABOUT SS COACHING (E-E-A-T) ===== */}
        <div style={{ background: "#fff", padding: "50px 0" }}>
          <div className="container">
            <div style={{
              background: "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 60%, #fff7ed 100%)",
              border: "1px solid #e0e7ff",
              borderRadius: "16px",
              padding: "40px 32px",
            }}>
              <span style={{
                display: "inline-block",
                background: "#ede9fe",
                color: "#4441e5",
                border: "1px solid #c4b5fd",
                borderRadius: "6px",
                padding: "3px 14px",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                marginBottom: "14px",
              }}>
                Why Students Trust SS Coaching for NIOS Guidance
              </span>

              <h2 style={{
                fontSize: "clamp(20px, 3vw, 30px)",
                fontWeight: "700",
                color: "#101727",
                marginBottom: "16px",
                fontFamily: "SF Pro Display, Poppins, sans-serif",
              }}>
                SS Coaching – Trusted NIOS Class 12 Guidance Partner Since 2001
              </h2>

              <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#374151", marginBottom: "14px" }}>
                The days immediately following NIOS Class 12 result declaration are among the most consequential in a student's academic life. College application deadlines, improvement exam windows, re-evaluation cutoff dates — all of these run on tight timelines that students and families often navigate without adequate guidance.
              </p>

              <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#374151", marginBottom: "14px" }}>
                SS Coaching has been an authoritative guidance resource for NIOS Senior Secondary students since 2001. Our experienced academic counselors understand the NIOS examination system comprehensively — including passing criteria, grace mark application, re-evaluation vs. rechecking procedures, compartment examination rules, and admission processes for universities and professional programs. We have helped thousands of NIOS Class 12 students across all streams successfully move into higher education and career pathways.
              </p>

              <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#374151", marginBottom: "26px" }}>
                Our support covers every result outcome: students who passed with distinction seeking top college admissions, students who narrowly passed and need better marks for cutoffs, compartment candidates clearing pending subjects, and students applying for re-evaluation. All initial counseling is free and available for students from all states and regions.
              </p>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                gap: "10px",
                marginBottom: "28px",
              }}>
                {[
                  "NIOS Guidance Since 2001",
                  "Thousands of Class 12 Students Helped",
                  "Certified Academic Counselors",
                  "Free Initial Counseling Sessions",
                  "All India Student Support",
                  "Expert in Re-evaluation, Improvement & Admission",
                ].map((item, i) => (
                  <div key={i} style={{
                    background: "#fff",
                    border: "1px solid #e0e7ff",
                    borderLeft: "3px solid #4441e5",
                    borderRadius: "7px",
                    padding: "11px 14px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    <span style={{ color: "#4441e5" }}>✔</span> {item}
                  </div>
                ))}
              </div>

              <a href="/nios-admission" style={{
                display: "inline-block",
                background: "#4441e5",
                color: "#fff",
                borderRadius: "8px",
                padding: "13px 28px",
                fontWeight: "700",
                fontSize: "15px",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(68,65,229,0.25)",
              }}>
                Connect With an SS Coaching NIOS Counselor — Free
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
