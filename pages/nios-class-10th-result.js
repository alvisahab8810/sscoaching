import { useState } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Link from "next/link";

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
    q: "When will the NIOS Class 10 Result 2026 be declared?",
    a: "The NIOS Secondary Result 2026 for the April–May session is typically declared in June–July 2026. The October–November session result is usually announced in December–January. Students can check their result at results.nios.ac.in once officially announced. SS Coaching updates students on result dates through our counseling platform.",
  },
  {
    q: "How can I check my NIOS 10th Result 2026?",
    a: "Visit results.nios.ac.in, select the Secondary (Class 10) result link, enter your NIOS Enrollment Number and Date of Birth, and click Submit. Your subject-wise marks, total score, and pass/fail status will appear on screen. Download the PDF immediately for your records.",
  },
  {
    q: "What is the passing mark for NIOS Class 10 2026?",
    a: "A student must score a minimum of 33% marks in each subject (theory and practical separately, where applicable) to pass the NIOS Secondary examination. Failing even one subject means the student has not cleared that subject, irrespective of aggregate performance.",
  },
  {
    q: "What is the grace mark provision in NIOS Class 10?",
    a: "NIOS applies grace marks to students who narrowly miss the passing threshold in a subject. Grace marks are awarded at NIOS's discretion as per its internal policy and are reflected in the final published result. Students who receive grace marks are considered officially passed.",
  },
  {
    q: "What should I do if I fail in one or two subjects in NIOS Class 10?",
    a: "Students who fail in one or two subjects are considered compartment candidates and can appear for the re-appear examination in the next NIOS session. You do not need to re-register for all subjects — only the failed ones. SS Coaching helps compartment students prepare strategically and re-register correctly.",
  },
  {
    q: "Can I improve my NIOS Class 10 marks after passing?",
    a: "Yes. NIOS allows passed students to appear for improvement examinations in subsequent sessions. The higher of the two scores is considered final. This is particularly helpful for students who need better marks for specific college admissions or stream eligibility.",
  },
  {
    q: "Is the NIOS Class 10 certificate valid for Class 12 admission?",
    a: "Yes. The NIOS Secondary certificate is recognized by all state boards, CBSE, NIOS itself, and higher education institutions across India. It is equivalent to any Class 10 board certification and is accepted for Class 11 or NIOS Senior Secondary admission.",
  },
  {
    q: "How do I get my original NIOS 10th marksheet?",
    a: "The original marksheet cum certificate and migration certificate are sent by NIOS to your Accredited Institute (AI) or Study Centre. Collect it from there after result declaration. It is also available digitally on DigiLocker (digilocker.gov.in) as a verified document.",
  },
  {
    q: "What if I find errors in my NIOS Class 10 result or marksheet?",
    a: "Report any discrepancy — marks, name, or personal details — to your NIOS Regional Centre within 30 days of result declaration. Do not delay, as corrections after this period involve a more complex process.",
  },
  {
    q: "Can I apply for rechecking of my NIOS Class 10 answer sheet?",
    a: "Yes. NIOS provides a rechecking facility at ₹400 per subject (plus ₹50 processing fee). This involves re-totalling of marks to ensure no marks were missed. Note that detailed re-evaluation is only available for Class 12, not Class 10. The rechecking window typically opens within 15 days of result declaration.",
  },
  {
    q: "Which stream should I choose for NIOS Class 12 after passing Class 10?",
    a: "The choice of stream — Science, Commerce, or Arts — should be based on your academic strengths, interests, and long-term career plans. This is a critical decision. SS Coaching provides free, structured stream selection counseling to help NIOS students make the right choice.",
  },
  {
    q: "How can SS Coaching help me after my NIOS Class 10 Result 2026?",
    a: "SS Coaching has guided NIOS students since 2001. After result declaration, we assist with marksheet verification, improvement exam registration, NIOS Class 12 admission, stream and subject selection, study planning, and complete academic counseling. Our services are available free for initial counseling.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When will the NIOS Class 10 Result 2026 be declared?",
      acceptedAnswer: { "@type": "Answer", text: "The NIOS Class 10 Result 2026 for the April–May session is typically declared in June–July 2026. The October–November session result is usually announced in December–January. Students can check their result at results.nios.ac.in once officially announced by the National Institute of Open Schooling." },
    },
    {
      "@type": "Question",
      name: "How can I check my NIOS Class 10 Result 2026?",
      acceptedAnswer: { "@type": "Answer", text: "Visit the official NIOS result portal at results.nios.ac.in. Click on the Secondary (Class 10) result link, enter your NIOS Enrollment Number and Date of Birth, then click Submit. Your subject-wise marks, total score, and pass/fail status will appear on screen. Download the result as a PDF immediately for your records. The result is also available on DigiLocker at digilocker.gov.in." },
    },
    {
      "@type": "Question",
      name: "What are the passing marks for NIOS Class 10 in 2026?",
      acceptedAnswer: { "@type": "Answer", text: "To pass the NIOS Secondary (Class 10) examination, a student must score a minimum of 33% marks in each individual subject, including both theory and practical components where applicable. There is no aggregate-only passing system — each subject must be cleared independently with at least 33%." },
    },
    {
      "@type": "Question",
      name: "What is the grace mark provision in NIOS Class 10?",
      acceptedAnswer: { "@type": "Answer", text: "NIOS applies grace marks to students who narrowly miss the passing threshold in a subject. Grace marks are awarded at NIOS's discretion as per its internal policy and are reflected in the final published result. Students who receive grace marks are considered officially passed." },
    },
    {
      "@type": "Question",
      name: "What should I do if I fail in one or two subjects in NIOS Class 10?",
      acceptedAnswer: { "@type": "Answer", text: "Students who fail in one or two subjects are classified as compartment candidates and can appear for the re-appear examination in the next NIOS session. You do not need to re-register for all subjects — only the failed ones need to be cleared. Students who fail in more than two subjects must re-appear in all failed subjects in subsequent sessions." },
    },
    {
      "@type": "Question",
      name: "Can I improve my NIOS Class 10 marks after passing?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. NIOS allows passed students to appear for improvement examinations in subsequent sessions. The higher of the two scores is considered the final result. This is helpful for students who need better marks for specific Class 12 school admissions or stream eligibility requirements." },
    },
    {
      "@type": "Question",
      name: "Is the NIOS Class 10 certificate valid for Class 12 admission?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. The NIOS Secondary certificate is recognized by all state boards, CBSE, NIOS itself, and higher education institutions across India. It is equivalent to any Class 10 board certification and is fully accepted for Class 11 or NIOS Senior Secondary admission." },
    },
  ],
};

export default function NIOSClass10Result2026() {
  return (
    <>
      <Head>
        <title>NIOS Class 10 Result 2026 - Download Marksheet & Check Now | SS Coaching</title>
        <meta
          name="description"
          content="Check NIOS Class 10 Result 2026 at results.nios.ac.in. SS Coaching provides complete guidance on NIOS Secondary Result 2026 — marksheet download, passing criteria, improvement exam, and Class 12 admission planning. Free counseling available."
        />
        <meta
          name="keywords"
          content="NIOS Class 10 Result 2026, NIOS 10th Result 2026, NIOS Secondary Result 2026, results.nios.ac.in Class 10, NIOS 10th Marksheet Download 2026, NIOS Secondary Passing Criteria 2026, NIOS Class 10 Improvement Exam 2026"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <section className="home-page-area">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        {/* ===== HERO BANNER ===== */}
        <div style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 50%, #fff7ed 100%)",
          borderBottom: "1px solid #e5e7eb",
          padding: "60px 0 52px",
        }}>
          <div className="container">
            <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
              <span style={{
                display: "inline-block",
                background: "#dcfce7",
                color: "#059669",
                borderRadius: "30px",
                padding: "6px 20px",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.4px",
                marginBottom: "20px",
                border: "1px solid #bbf7d0",
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
                NIOS Class 10 Result 2026 –{" "}
                <span style={{ color: "#059669" }}>Secondary Examination Result</span>
              </h1>

              <p style={{
                fontSize: "clamp(13px, 1.8vw, 15px)",
                color: "#6b7280",
                lineHeight: "1.6",
                marginBottom: "18px",
              }}>
                Check Result on results.nios.ac.in &bull; Marksheet Download Guide &bull; Passing Criteria &bull; Improvement Exam &bull; Free Admission Counseling
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
                The National Institute of Open Schooling (NIOS) has declared the NIOS Class 10 Result 2026 for the Secondary examination. Students who appeared in the April–May or October–November session can now check their result, download their provisional marksheet, and verify their pass/fail status at results.nios.ac.in. SS Coaching provides complete step-by-step guidance for every NIOS Class 10 student — from understanding your result to planning your next academic step.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
                <a
                  href="https://results.nios.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#059669",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "13px 26px",
                    fontSize: "14px",
                    fontWeight: "700",
                    textDecoration: "none",
                    display: "inline-block",
                    boxShadow: "0 4px 14px rgba(5,150,105,0.25)",
                  }}
                >
                  Check NIOS 10th Result Now – results.nios.ac.in
                </a>
                <a
                  href="tel:09839065533"
                  style={{
                    background: "#fff",
                    color: "#059669",
                    border: "2px solid #059669",
                    borderRadius: "8px",
                    padding: "13px 26px",
                    fontSize: "14px",
                    fontWeight: "700",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Get Free Counseling – 09839065533
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="syllabus-nios">
          <div className="container">

            {/* ===== INTERNAL LINKS STRIP ===== */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "36px",
              padding: "14px 18px",
              background: "#f8faff",
              borderRadius: "8px",
              border: "1px solid #e0e7ff",
            }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#6b7280", alignSelf: "center" }}>Related:</span>
              <Link href="/nios-results" style={{ fontSize: "13.5px", fontWeight: "600", color: "#4441e5", textDecoration: "none", background: "#eef2ff", padding: "5px 14px", borderRadius: "20px", border: "1px solid #c4b5fd" }}>
                NIOS Results 2026 (All)
              </Link>
              <Link href="/nios-class-12th-result" style={{ fontSize: "13.5px", fontWeight: "600", color: "#4441e5", textDecoration: "none", background: "#eef2ff", padding: "5px 14px", borderRadius: "20px", border: "1px solid #c4b5fd" }}>
                NIOS Class 12th Result 2026
              </Link>
              <Link href="/nios-admission" style={{ fontSize: "13.5px", fontWeight: "600", color: "#059669", textDecoration: "none", background: "#f0fdf4", padding: "5px 14px", borderRadius: "20px", border: "1px solid #bbf7d0" }}>
                NIOS Admission 2026
              </Link>
            </div>

            {/* ===== SECTION 2: INSTANT RESULT CHECK ===== */}
            <div style={{
              background: "#fff",
              border: "1px solid #d1fae5",
              borderTop: "4px solid #059669",
              borderRadius: "12px",
              padding: "28px 28px 24px",
              marginBottom: "50px",
              boxShadow: "0 2px 16px rgba(5,150,105,0.06)",
            }}>
              <span style={{
                display: "inline-block",
                background: "#f0fdf4",
                color: "#059669",
                borderRadius: "6px",
                padding: "3px 14px",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: "10px",
              }}>
                Check Your NIOS Class 10 Result 2026 Right Now
              </span>

              <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "14px" }}>
                NIOS 10th Result 2026 – Check on the Official Portal Instantly
              </h2>

              <p style={{ marginBottom: "20px", lineHeight: "1.7", fontSize: "15px", color: "#374151" }}>
                Your NIOS Secondary Result 2026 is now available on the official NIOS result portal. Follow these steps to check your result right now:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "22px" }}>
                {[
                  { step: "Step 1", text: "Open the official NIOS result portal — results.nios.ac.in (Direct link, no login required)", link: "https://results.nios.ac.in" },
                  { step: "Step 2", text: 'Click on "Secondary (Class 10) Public Examination Result 2026"' },
                  { step: "Step 3", text: "Enter your NIOS Enrollment Number (printed on your Admit Card)" },
                  { step: "Step 4", text: "Enter your Date of Birth and the on-screen captcha code" },
                  { step: "Step 5", text: 'Click "Submit" — your result will appear on screen' },
                  { step: "Step 6", text: "Check your subject-wise marks, total score, and pass/fail status" },
                  { step: "Step 7", text: "Download as PDF and take a printout for your records" },
                  { step: "Step 8", text: "Collect your original marksheet from your NIOS Study Centre / Accredited Institute (AI)" },
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
                      background: "#059669",
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
                        ? <><span>Open the official NIOS result portal — </span><a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: "#059669", fontWeight: "600" }}>results.nios.ac.in</a><span> (Direct link, no login required)</span></>
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
                <strong>Important:</strong> The NIOS result portal may experience high traffic immediately after declaration. If the page is slow to load, try accessing it during off-peak hours (early morning or late night) or use the alternate portal at{" "}
                <a href="https://nios.ac.in" target="_blank" rel="noopener noreferrer" style={{ color: "#059669", fontWeight: "600" }}>nios.ac.in</a>.
              </div>

              <div style={{ marginBottom: "22px" }}>
                <p style={{ fontWeight: "600", fontSize: "14px", marginBottom: "8px", color: "#374151" }}>Also Available On:</p>
                <ul style={{ paddingLeft: "20px", lineHeight: "2", fontSize: "14px", color: "#374151" }}>
                  <li><a href="https://digilocker.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#059669", fontWeight: "600" }}>DigiLocker (digilocker.gov.in)</a> — download verified digital marksheet</li>
                  <li>NIOS Mobile App</li>
                </ul>
              </div>

              <div style={{
                background: "linear-gradient(90deg, #f0fdf4 0%, #fff7ed 100%)",
                border: "1px solid #d1fae5",
                borderRadius: "10px",
                padding: "18px 22px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "14px",
              }}>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5", color: "#374151", fontWeight: "500" }}>
                  Still having trouble checking your result? Our team is available to help.
                </p>
                <a href="tel:09839065533" style={{
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
                  Talk to an NIOS Expert — 09839065533
                </a>
              </div>
            </div>

            {/* ===== SECTION 3: INTRODUCTION ===== */}
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
              About NIOS Class 10 Result 2026
            </span>

            <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "16px" }}>
              NIOS Class 10 Result 2026: Everything a Student Needs to Know
            </h2>

            <p style={{ marginBottom: "16px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
              The NIOS Secondary (Class 10) Result 2026 has been officially declared by the National Institute of Open Schooling for students who appeared in the April–May and October–November examination sessions. The result is available online at{" "}
              <a href="https://results.nios.ac.in" target="_blank" rel="noopener noreferrer" style={{ color: "#059669", fontWeight: "600" }}>results.nios.ac.in</a>{" "}
              and includes subject-wise marks, total marks obtained, and qualifying status. Students who appeared under the On-Demand Examination (ODE) system can also access their results through the same official portal.
            </p>

            <p style={{ marginBottom: "26px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
              At SS Coaching, we have supported thousands of NIOS Secondary students since 2001 — helping them understand their results, navigate passing criteria and grace mark provisions, register for improvement examinations, and plan their Senior Secondary (Class 12) admission. Whether you have passed, failed in one subject, or are looking to improve your marks, our certified NIOS counselors provide structured guidance tailored to your specific result outcome.
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
                "Marksheet Download Guidance",
                "Improvement & Re-Appear Exam Help",
                "NIOS Class 12 Admission Planning",
                "Stream Selection Counseling",
              ].map((item, i) => (
                <div key={i} style={{
                  background: "#f0fdf4",
                  border: "1px solid #d1fae5",
                  borderLeft: "3px solid #059669",
                  borderRadius: "7px",
                  padding: "11px 14px",
                  fontSize: "13.5px",
                  fontWeight: "600",
                  color: "#374151",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}>
                  <span style={{ color: "#059669" }}>✔</span> {item}
                </div>
              ))}
            </div>

            {/* ===== SECTION 4: MARKSHEET CONTENTS ===== */}
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
              Understanding Your NIOS 10th Marksheet
            </span>

            <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "12px" }}>
              What Information Is Shown on the NIOS Class 10 Result 2026?
            </h2>

            <p style={{ marginBottom: "16px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
              Once you access your NIOS Secondary Result 2026 on the portal, you will see a provisional marksheet with the following details. It is essential to verify every field carefully immediately after downloading, and report any errors to your Regional Centre within 30 days of result declaration.
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
                    ["Course / Class", "Secondary (Class 10)"],
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
              <strong>Note:</strong> The result available online is a provisional marksheet. Your original marksheet cum certificate and migration certificate will be dispatched to your Accredited Institute (AI) / Study Centre. Collect it promptly and verify all personal and academic details.
            </div>

            {/* ===== SECTION 5: PASSING CRITERIA ===== */}
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
                NIOS Secondary Passing Criteria 2026
              </span>

              <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "14px" }}>
                NIOS Class 10 Passing Marks &amp; Criteria 2026 – Know Your Status
              </h2>

              <p style={{ marginBottom: "20px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
                To pass the NIOS Secondary (Class 10) examination in 2026, a student must secure a minimum of 33% marks in each individual subject, including both theory and practical components where applicable. There is no aggregate-only passing system — each subject must be cleared independently.
              </p>

              <h3 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "10px", color: "#101727" }}>
                NIOS Class 10 Minimum Passing Marks 2026
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
                Grace Mark Provision – NIOS Class 10
              </h3>
              <p style={{ marginBottom: "20px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
                NIOS applies a grace mark provision to assist students who narrowly miss the passing threshold. If a student is short of passing marks in one or more subjects by a small margin, NIOS may award grace marks based on its internal policy to help the student pass. Grace marks are applied at the board's discretion and appear in the final result.
              </p>

              <h3 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "8px", color: "#101727" }}>
                Compartment / Failed in Subjects
              </h3>
              <p style={{ marginBottom: "20px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
                Students who fail in one or two subjects may be eligible for the Compartment Examination or Re-Appear Examination in the next session without having to re-register for all subjects. Students who fail in more than two subjects are required to re-appear in the failed subjects in subsequent examination sessions.
              </p>

              <div style={{
                background: "linear-gradient(90deg, #f0fdf4 0%, #fff7ed 100%)",
                border: "1px solid #d1fae5",
                borderRadius: "10px",
                padding: "16px 20px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "14px",
              }}>
                <p style={{ margin: 0, fontSize: "14px", color: "#374151", fontWeight: "500" }}>
                  Not sure if you've passed or how grace marks apply to you?
                </p>
                <a href="tel:09839065533" style={{
                  background: "#FF9422",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  fontWeight: "700",
                  fontSize: "13.5px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}>
                  Talk to Our NIOS Counselor — Free Session
                </a>
              </div>
            </div>

            {/* ===== SECTION 6: NEXT STEPS AFTER PASSING ===== */}
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
                After NIOS Class 10 Result 2026
              </span>

              <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "14px" }}>
                Passed NIOS Class 10? Here Is What You Should Do Next
              </h2>

              <p style={{ marginBottom: "20px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
                Clearing the NIOS Secondary examination opens up a range of academic pathways. Your next step — choosing the right stream and subjects for Senior Secondary (Class 12) — is one of the most important decisions of your academic life. A well-informed choice at this stage significantly impacts your higher education and career options.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px", marginBottom: "28px" }}>
                <div style={{ background: "#f8faff", border: "1px solid #e0e7ff", borderTop: "3px solid #4441e5", borderRadius: "10px", padding: "20px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#4441e5", marginBottom: "10px" }}>
                    Option 1 — Continue with NIOS Senior Secondary (Class 12)
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#374151" }}>
                    Students can continue their Class 12 education through NIOS itself by registering for the Senior Secondary course. NIOS offers three streams: Science, Commerce, and Arts/Humanities, with flexible subject combinations. Ideal for students who need flexibility in schedule, have professional commitments, or want to study at their own pace.
                  </p>
                </div>

                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderTop: "3px solid #059669", borderRadius: "10px", padding: "20px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#059669", marginBottom: "10px" }}>
                    Option 2 — Join a Regular State Board or CBSE Open School for Class 12
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#374151" }}>
                    NIOS Class 10 certification is recognized by all state boards, CBSE, and higher education institutions. Qualified students can apply for Class 11 admission in regular schools affiliated with state boards or CBSE.
                  </p>
                </div>

                <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderTop: "3px solid #FF9422", borderRadius: "10px", padding: "20px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#c2410c", marginBottom: "10px" }}>
                    Option 3 — Vocational or ITI Courses
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#374151" }}>
                    Students who wish to enter skill-based or vocational programs can use their NIOS Class 10 certificate to apply for ITI trades, short-term skill courses, and NSDC-affiliated programs.
                  </p>
                </div>
              </div>

              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "10px", color: "#101727" }}>
                Stream Comparison Guide for NIOS Class 12
              </h3>

              <div className="table-wrapper" style={{ marginBottom: "22px" }}>
                <table>
                  <thead>
                    <tr>
                      <th><b>Stream</b></th>
                      <th><b>Best For</b></th>
                      <th><b>Key Subjects</b></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Science</strong></td>
                      <td>Engineering, Medical, Research</td>
                      <td>Physics, Chemistry, Biology/Maths</td>
                    </tr>
                    <tr>
                      <td><strong>Commerce</strong></td>
                      <td>Business, Finance, CA, MBA</td>
                      <td>Accountancy, Economics, Business Studies</td>
                    </tr>
                    <tr>
                      <td><strong>Arts/Humanities</strong></td>
                      <td>Civil Services, Law, Journalism, Teaching</td>
                      <td>History, Geography, Political Science</td>
                    </tr>
                  </tbody>
                </table>
              </div>

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
                Get Free Stream Selection Counseling from SS Coaching
              </a>
            </div>

            {/* ===== SECTION 7: IMPROVEMENT EXAM ===== */}
            <div style={{ marginBottom: "50px" }}>
              <span style={{
                display: "inline-block",
                background: "#fff7ed",
                color: "#c2410c",
                border: "1px solid #fed7aa",
                borderRadius: "6px",
                padding: "3px 14px",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                marginBottom: "12px",
              }}>
                NIOS Class 10 Improvement Exam 2026
              </span>

              <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "14px" }}>
                NIOS 10th Improvement &amp; Re-Appear Examination 2026 – Complete Guide
              </h2>

              <p style={{ marginBottom: "20px", lineHeight: "1.8", fontSize: "15px", color: "#374151" }}>
                If you are not satisfied with your NIOS Class 10 Result 2026 marks, or if you failed in one or more subjects, NIOS provides structured pathways to improve your academic standing:
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px", marginBottom: "24px" }}>
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderTop: "3px solid #059669", borderRadius: "10px", padding: "20px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#059669", marginBottom: "10px" }}>
                    1. Improvement Examination (for students who have passed)
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#374151" }}>
                    Students who have cleared all subjects but want higher marks — particularly for competitive cutoffs or stream eligibility — can appear for improvement examinations in the next NIOS session. The better of the two scores is considered in the final result.
                  </p>
                </div>

                <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderTop: "3px solid #dc2626", borderRadius: "10px", padding: "20px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#dc2626", marginBottom: "10px" }}>
                    2. Re-Appear / Compartment Examination (failed in subjects)
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.7", color: "#374151" }}>
                    Students who failed in up to two subjects can appear for the re-appear examination in the next NIOS session without re-registering from scratch. This allows students to complete their Class 10 certification efficiently.
                  </p>
                </div>
              </div>

              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "10px", color: "#101727" }}>
                Who Should Apply for NIOS Class 10 Improvement Exam 2026?
              </h3>
              <ul style={{ paddingLeft: "20px", lineHeight: "2", marginBottom: "22px", fontSize: "14.5px", color: "#374151" }}>
                <li>Students who passed but need higher marks for specific Class 12 school admissions</li>
                <li>Students who want a stronger foundation before taking up Science or Commerce stream</li>
                <li>Students who failed in 1–2 subjects (compartment candidates)</li>
                <li>On-Demand (ToD) examination students seeking better marks</li>
                <li>Students with discrepancies in subject-wise scores they believe should be reviewed</li>
              </ul>

              <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "10px", color: "#101727" }}>
                Rechecking &amp; Re-evaluation After NIOS Class 10 Result 2026
              </h3>

              <div style={{
                background: "#f8faff",
                border: "1px solid #e0e7ff",
                borderRadius: "10px",
                padding: "18px 20px",
                marginBottom: "20px",
              }}>
                <ul style={{ paddingLeft: "18px", lineHeight: "2", fontSize: "14px", color: "#374151", margin: 0 }}>
                  <li><strong>Rechecking (Class 10):</strong> ₹400 per subject — re-totalling of marks to check for any calculation errors</li>
                  <li><strong>Processing Fee:</strong> ₹50 per application (online)</li>
                  <li><strong>Timeline:</strong> Application window typically opens within 15 days of result declaration</li>
                  <li><strong>Note:</strong> Detailed re-evaluation is <strong>not available</strong> for Class 10 (only for Class 12)</li>
                </ul>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
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
                  Check Improvement Exam Eligibility — Free
                </a>
                <Link href="/nios-class-12th-result" style={{
                  display: "inline-block",
                  background: "#fff",
                  color: "#4441e5",
                  border: "2px solid #4441e5",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontWeight: "700",
                  fontSize: "14px",
                  textDecoration: "none",
                }}>
                  Also See: NIOS Class 12 Result 2026
                </Link>
              </div>
            </div>

            {/* ===== SECTION 8: MARKSHEET GUIDE ===== */}
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
                NIOS Marksheet 2026 – Download &amp; Collection
              </span>

              <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "22px" }}>
                NIOS Class 10 Marksheet 2026 – How to Download &amp; Collect Original
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "22px" }}>
                {[
                  {
                    title: "Provisional Marksheet (Online)",
                    borderColor: "#059669",
                    bgColor: "#f0fdf4",
                    points: [
                      "Visit results.nios.ac.in",
                      "Access your result using your enrollment number",
                      "Download the result PDF",
                      "Keep both a digital copy (phone/cloud) and a printed copy",
                    ],
                    note: "Valid for immediate admission and verification purposes.",
                  },
                  {
                    title: "Original Marksheet cum Certificate",
                    borderColor: "#4441e5",
                    bgColor: "#f8faff",
                    points: [
                      "Physical certificate dispatched by NIOS to your AI or Study Centre",
                      "Collect from your AI promptly after declaration",
                      "If AI is cancelled, NIOS sends to the Regional Centre",
                    ],
                    note: "Required for final admission and official verification.",
                  },
                  {
                    title: "DigiLocker – Verified Digital Marksheet",
                    borderColor: "#0ea5e9",
                    bgColor: "#f0f9ff",
                    points: [
                      "Available on DigiLocker (digilocker.gov.in)",
                      "Officially verified digital document",
                      "Useful for online college portals and government verification",
                    ],
                    note: "",
                  },
                  {
                    title: "Corrections in NIOS Marksheet",
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
            </div>

          </div>
        </div>

        {/* ===== SECTION 9: FAQs ===== */}
        <div style={{ background: "#f8faff", borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "10px 0 0" }}>
          <div className="container" style={{ paddingTop: "10px" }}>
            <h2 className="nios-125h-senior-hero-title" style={{ marginBottom: "6px", paddingTop: "30px" }}>
              Frequently Asked Questions – NIOS Class 10 Result 2026
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

        {/* ===== SECTION 10: ABOUT SS COACHING (E-E-A-T) ===== */}
        <div style={{ background: "#fff", padding: "50px 0" }}>
          <div className="container">
            <div style={{
              background: "linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 60%, #fff7ed 100%)",
              border: "1px solid #d1fae5",
              borderRadius: "16px",
              padding: "40px 32px",
            }}>
              <span style={{
                display: "inline-block",
                background: "#dcfce7",
                color: "#059669",
                border: "1px solid #bbf7d0",
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
                SS Coaching – Your Trusted NIOS Class 10 Guidance Partner Since 2001
              </h2>

              <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#374151", marginBottom: "14px" }}>
                The period immediately after NIOS Class 10 result declaration is one of the most critical windows in a student's academic journey. The decisions made in these weeks — about improvement exams, stream selection, and Class 12 admission — have long-term consequences that many students and families are not fully equipped to evaluate alone.
              </p>

              <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#374151", marginBottom: "14px" }}>
                SS Coaching has been an authoritative NIOS guidance partner since 2001. Our team of experienced academic counselors has an in-depth understanding of the NIOS examination structure, passing criteria, grace mark policy, compartment examination rules, and admission processes. We have helped thousands of NIOS Secondary students successfully navigate their post-result journey — from those who needed improvement exam guidance to students building pathways toward higher education and professional careers.
              </p>

              <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#374151", marginBottom: "26px" }}>
                Our guidance covers every academic outcome: students who passed with distinction, students who narrowly passed, compartment candidates, and students who need to re-appear. All initial counseling sessions are free, and our team is available for students from all states and regions across India.
              </p>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                gap: "10px",
                marginBottom: "28px",
              }}>
                {[
                  "Guidance Since 2001",
                  "Thousands of NIOS Students Helped",
                  "Certified Academic Counselors",
                  "Free Initial Counseling",
                  "All India Student Support",
                  "Expert in NIOS Rules & Policies",
                ].map((item, i) => (
                  <div key={i} style={{
                    background: "#fff",
                    border: "1px solid #d1fae5",
                    borderLeft: "3px solid #059669",
                    borderRadius: "7px",
                    padding: "11px 14px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#374151",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}>
                    <span style={{ color: "#059669" }}>✔</span> {item}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href="/nios-admission" style={{
                  display: "inline-block",
                  background: "#059669",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "13px 28px",
                  fontWeight: "700",
                  fontSize: "15px",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(5,150,105,0.25)",
                }}>
                  Connect With an SS Coaching NIOS Counselor — Free
                </a>
                <Link href="/nios-class-12th-result" style={{
                  display: "inline-block",
                  background: "#fff",
                  color: "#4441e5",
                  border: "2px solid #4441e5",
                  borderRadius: "8px",
                  padding: "13px 28px",
                  fontWeight: "700",
                  fontSize: "15px",
                  textDecoration: "none",
                }}>
                  NIOS Class 12 Result 2026 →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
