import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import NiosDatesheetFAQ from "@/components/home/NiosDatesheetFAQ";
import Head from "next/head";
import { useEffect, useRef } from "react";

const nios2026FaqSchemaJSON = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is NIOS valid for government jobs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, NIOS certificates are recognized by the Government of India and are valid for government jobs, higher education, and competitive exams."
      }
    },
    {
      "@type": "Question",
      "name": "Is the NIOS certificate valid for higher education and college admission in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the NIOS board is recognized by the Government of India. Students who complete their education through NIOS can apply for higher education courses, college admissions, competitive exams, and government or private sector jobs. Many universities and colleges accept NIOS certificates for admission."
      }
    },
    {
      "@type": "Question",
      "name": "Is NIOS easier than regular school?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NIOS provides flexible learning and multiple exam opportunities, which makes it easier for many students to complete their education at their own pace."
      }
    },
    {
      "@type": "Question",
      "name": "Can I prepare for competitive exams like JEE, NEET, or CLAT along with NIOS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, NIOS allows students to manage their time effectively, making it easier to prepare for competitive exams like JEE, NEET, CLAT, and more alongside their board studies."
      }
    },
    {
      "@type": "Question",
      "name": "Who can apply for NIOS admission in Lucknow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students who want to complete their 10th or 12th education, including school dropouts, working students, students who failed board exams, and learners looking for a flexible education system can apply for NIOS admission in Lucknow."
      }
    },
    {
      "@type": "Question",
      "name": "How long does NIOS admission take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The admission process is usually completed within a few days once all documents are submitted and the online form is approved."
      }
    },
    {
      "@type": "Question",
      "name": "How can I apply for NIOS admission in Lucknow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can apply by visiting SS Coaching or contacting their team. They guide you through registration, document submission, and subject selection to make the process simple and smooth."
      }
    },
    {
      "@type": "Question",
      "name": "What is the process for NIOS admission in Lucknow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The NIOS admission process in Lucknow includes course selection, online registration, document submission, and coaching support for exam preparation."
      }
    },
    {
      "@type": "Question",
      "name": "Can failed students complete 10th or 12th through NIOS coaching in Lucknow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, students who failed in board exams can join NIOS coaching for failed students in Lucknow and complete their secondary or senior secondary education."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I find a trusted NIOS center in Lucknow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SS Coaching provides complete support for students who want to complete their Class 10th or 12th through NIOS. With expert guidance and a supportive environment, students can easily continue their education. They have branches in Hazratganj, Indira Nagar, and Alambagh."
      }
    },
    {
      "@type": "Question",
      "name": "Is SS Coaching the NIOS head office in Lucknow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SS Coaching is not the official NIOS office. However, they provide complete admission guidance and coaching support for NIOS students in Lucknow."
      }
    },
    {
      "@type": "Question",
      "name": "Which areas in Lucknow does SS Coaching cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SS Coaching has branches in Hazratganj, Indira Nagar, and Alambagh, making it easy for students across Lucknow to access their NIOS coaching and admission services."
      }
    },
    {
      "@type": "Question",
      "name": "Which is the best NIOS coaching in Hazratganj Lucknow for 10th and 12th students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SS Coaching is considered one of the most trusted institutes for NIOS coaching in Hazratganj Lucknow for 10th and 12th students. The institute provides experienced teachers, structured study material, and proper exam preparation guidance, helping students perform confidently in NIOS board examinations."
      }
    },
    {
      "@type": "Question",
      "name": "Which is the best NIOS coaching in Indra Nagar Lucknow for 10th and 12th students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SS Coaching is widely known as one of the best institutes for NIOS coaching in Indra Nagar Lucknow, providing expert faculty, structured classes, and complete exam preparation support for 10th and 12th students."
      }
    },
    {
      "@type": "Question",
      "name": "Which is the best NIOS coaching in Alambagh Lucknow for 10th and 12th students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SS Coaching is considered one of the best options for NIOS coaching in Alambagh Lucknow for 10th and 12th students, offering expert faculty and complete exam preparation guidance."
      }
    },
    {
      "@type": "Question",
      "name": "Which is the best NIOS institute in Lucknow for admission and coaching?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students looking for the best NIOS institute in Lucknow for admission and coaching often choose SS Coaching because of its experienced teachers, supportive environment, and proven academic results."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a NIOS study center in Alambagh Lucknow for board exam preparation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SS Coaching operates as a trusted NIOS study center in Alambagh Lucknow for 10th and 12th exam preparation with experienced teachers and structured classes."
      }
    },
    {
      "@type": "Question",
      "name": "Why should students choose a NIOS coaching center in Lucknow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Joining a NIOS coaching center in Lucknow helps students receive professional academic guidance and structured preparation. Coaching institutes provide regular classes, doubt-clearing sessions, and exam practice that help students understand the syllabus more effectively and improve their chances of passing the NIOS exams successfully."
      }
    },
    {
      "@type": "Question",
      "name": "What subjects are available in NIOS coaching for 10th and 12th in Lucknow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students joining NIOS coaching for 10th and 12th in Lucknow can choose from a variety of subjects including English, Hindi, Mathematics, Science, Social Science, Business Studies, Economics, and other optional subjects depending on their course and career goals."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to complete NIOS 10th or 12th in Lucknow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The duration depends on the student's learning pace and examination schedule. NIOS offers flexible learning options, and many students complete their 10th or 12th within the same academic year depending on their preparation and exam availability."
      }
    },
    {
      "@type": "Question",
      "name": "What is the fee for NIOS coaching and admission in Lucknow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The fee for NIOS coaching and admission in Lucknow depends on the course, number of subjects, and exam stream selected by the student. Please contact SS Coaching directly for the latest fee details."
      }
    },
    {
      "@type": "Question",
      "name": "Is NIOS coaching available for 10th class students in Lucknow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SS Coaching provides NIOS coaching for 10th class students in Lucknow, including subject-wise teaching, study materials, and exam preparation strategies."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I find NIOS coaching for 12th in Indra Nagar Lucknow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students can join SS Coaching for NIOS coaching for 12th in Indra Nagar Lucknow, where experienced teachers guide them through the NIOS syllabus and examination pattern."
      }
    },
    {
      "@type": "Question",
      "name": "Can I take coaching with NIOS admission?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, many institutes provide NIOS coaching and admission support in Lucknow to help students prepare better for their exams while completing the admission process simultaneously."
      }
    },
    {
      "@type": "Question",
      "name": "Is coaching necessary for NIOS students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While NIOS is a flexible system, proper coaching helps students understand the syllabus better, stay consistent, and perform well in exams with confidence."
      }
    },
    {
      "@type": "Question",
      "name": "How can I take NIOS admission in Hazratganj Lucknow for 10th or 12th?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students who want NIOS admission in Hazratganj Lucknow for 10th or 12th can visit SS Coaching for complete guidance. The institute helps students with the entire admission process including subject selection, document verification, online registration, and exam preparation."
      }
    },
    {
      "@type": "Question",
      "name": "How can I take NIOS admission in Indra Nagar Lucknow with coaching support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students can easily complete NIOS admission in Indra Nagar Lucknow with coaching guidance by visiting SS Coaching, where experts help with registration, subject selection, and document verification."
      }
    },
    {
      "@type": "Question",
      "name": "How can I get NIOS admission in Alambagh Lucknow with coaching support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students can take NIOS admission in Alambagh Lucknow with coaching support by visiting SS Coaching, where teachers guide them through the registration process, subject selection, and exam preparation."
      }
    },
    {
      "@type": "Question",
      "name": "Who should join NIOS coaching in Lucknow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students who could not complete their studies through regular schooling should join NIOS coaching in Lucknow. This includes students who failed in board exams, school dropouts, working students, or learners looking for a flexible education system that allows them to complete education at their own pace."
      }
    },
    {
      "@type": "Question",
      "name": "Is NIOS coaching available for both 10th and 12th classes in Lucknow?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, SS Coaching provides NIOS coaching for both 10th and 12th classes in Lucknow with subject-wise teaching and exam preparation support."
      }
    },
    {
      "@type": "Question",
      "name": "When will NIOS release the October 2026 theory exam date sheet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NIOS released the official theory exam date sheet for the October 2026 session on 08 October 2026 through Notification No. 63/2026. It is available as a downloadable PDF on the official websites, sdmis.nios.ac.in and nios.ac.in, listing subject-wise dates, exam timings, and reporting instructions for both Class 10th and Class 12th students. The same official schedule is reproduced in the date sheet tables on this page."
      }
    },
    {
      "@type": "Question",
      "name": "What are the NIOS Class 10th October 2026 exam dates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As per the official date sheet, the NIOS Class 10th theory exams for the October 2026 session will run from 22 October to 07 December 2026. Major subjects include Psychology on 04 November, Mathematics on 05 November, Science on 06 November, English on 12 November, Business Studies on 17 November, Hindi on 18 November, Economics on 20 November, Social Science on 21 November and Urdu on 26 November 2026. Regional languages such as Bengali, Marathi, Telugu, and Gujarati are scheduled together on 28 October 2026. The full subject-wise schedule is listed in the date sheet table above."
      }
    },
    {
      "@type": "Question",
      "name": "What are the NIOS Class 12th October 2026 exam dates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As per the official date sheet, the NIOS Class 12th theory exams for the October 2026 session will run from 22 October to 05 December 2026, with a different subject-date mapping from Class 10th. Key subjects include Geography on 24 October, English on 28 October, Mathematics on 31 October, Physics and History on 02 November, Hindi on 04 November, Biology and Accountancy on 05 November, Business Studies on 06 November, Chemistry and Political Science on 17 November and Economics on 21 November 2026. Vocational and skill-based subjects such as House Keeping and Web Development are scheduled on 01 December 2026."
      }
    },
    {
      "@type": "Question",
      "name": "When are the NIOS practical exams for the October 2026 session?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The NIOS practical exams for the October 2026 session will be conducted from 14 September to 29 September 2026 at designated AI/Practical Examination Centres for Secondary and Senior Secondary students. The practical exams are divided into four batches: 14-17 September, 18-21 September, 22-25 September, and 26-29 September 2026. Students should contact their study centre or examination centre to confirm their allotted practical exam date and batch."
      }
    },
    {
      "@type": "Question",
      "name": "What is the exam timing for NIOS October 2026 theory exams?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All NIOS October 2026 theory exams begin at 2:30 PM, with 15 minutes of reading time given before that (generally 2:15 PM to 2:30 PM) to go through the question paper. Most papers run from 2:30 PM to 5:30 PM, while some papers end at 4:00 PM, 4:30 PM or 5:00 PM - the exact end time for each subject is shown in the date sheet tables above. Candidates are advised to reach the exam centre at least 30 minutes before the reporting time to complete verification and be seated on time."
      }
    },
    {
      "@type": "Question",
      "name": "When will the NIOS admit card for the October 2026 session be released?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The NIOS theory exam admit card (Intimation cum Hall Ticket) for the October 2026 session is released in October 2026, shortly before the exams begin on 22 October 2026. The practical exam admit card was released earlier, in September 2026. Students can download both admit cards from the official NIOS student login portal, sdmis.nios.ac.in, using their enrollment number and date of birth."
      }
    },
    {
      "@type": "Question",
      "name": "What is the last date to apply for the NIOS October 2026 session?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The last date to submit the NIOS admission form for the October 2026 session is typically around March 15, 2026. Since NIOS occasionally extends this deadline or opens a late registration window with an additional fee, students should confirm the exact date through the official notification on nios.ac.in before the session closes, rather than relying solely on the previous year's timeline."
      }
    },
    {
      "@type": "Question",
      "name": "When will the NIOS October 2026 exam results be declared?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NIOS is expected to declare the results for the October-November 2026 session about 7 weeks after the last examination, i.e. around January 2027. Results for both Class 10th and Class 12th are usually announced on the same day and can be checked on the official results portal, results.nios.ac.in, using the student's roll number. A physical marksheet is issued later through the respective regional NIOS study centre."
      }
    },
    {
      "@type": "Question",
      "name": "Are NIOS Class 10th and Class 12th October exam dates the same?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, NIOS Class 10th and Class 12th exams follow separate subject-wise date sheets, even though both are conducted within the same overall period from late October to early December. A subject common to both classes, such as Mathematics or English, is usually scheduled on a different date for Class 10th than for Class 12th, so students must check the specific date sheet for their class rather than assuming the schedules match."
      }
    },
    {
      "@type": "Question",
      "name": "Can NIOS October 2026 exam dates change after the date sheet is released?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, NIOS date sheets can be revised after their initial release due to reasons such as state elections, natural events, or administrative rescheduling in specific regions. In past sessions, NIOS has postponed exams for particular states while keeping the schedule unchanged for the rest of the country. Students should treat the published date sheet as authoritative but keep checking the official NIOS website and their registered email or SMS alerts for any last-minute revisions closer to the exam dates."
      }
    }
  ]
}`;

export default function NIOSDatesheet2026() {
  const pdfIframeRef = useRef(null);

  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = "/assets/nios-theory-examination-date-sheet.pdf";
    document.body.appendChild(iframe);
    pdfIframeRef.current = iframe;
    return () => {
      if (iframe.parentNode) document.body.removeChild(iframe);
    };
  }, []);

  const handlePrint = () => {
    const iframe = pdfIframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.print();
    }
  };

  return (
    <>
      <Head>
        <title>NIOS Date Sheet 2026 Class 10th & 12th – October/November Exam Dates</title>
        <meta
          name="description"
          content="NIOS Date Sheet 2026 for Class 10th & 12th: Check the latest October/November exam date sheet, theory and practical dates, timings, PDF download and exam updates."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: nios2026FaqSchemaJSON }}
        />
        <style>{`
          .syllabus-nios h2 {
            margin-top: 40px;
            margin-bottom: 0;
          }
          .syllabus-nios h3.nios-125h-senior-hero-title {
            margin-top: 40px;
            margin-bottom: 0;
          }
          .syllabus-nios h2 + .table-wrapper,
          .syllabus-nios h3.nios-125h-senior-hero-title + .table-wrapper {
            margin-top: 16px;
          }
          .syllabus-nios .table-wrapper {
            margin-bottom: 24px;
          }
          .syllabus-nios ul {
            margin-bottom: 20px;
          }
          .syllabus-nios .table-wrapper table {
            table-layout: auto;
          }
          .syllabus-nios .table-wrapper th,
          .syllabus-nios .table-wrapper td {
            word-break: normal;
            overflow-wrap: break-word;
          }
          .syllabus-nios .table-wrapper .date-col {
            white-space: nowrap;
          }
          @media (max-width: 576px) {
            .syllabus-nios .table-wrapper .date-col {
              white-space: normal;
            }
          }
          @media print {
            header, nav, footer, .offcanvas, .branch-contact-canvas,
            .faq-section, .no-print {
              display: none !important;
            }
            .syllabus-nios {
              padding: 0 !important;
            }
            body {
              font-size: 12px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #333;
              padding: 6px 8px;
            }
          }
        `}</style>
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              NIOS Date Sheet 2026 for Class 10th & 12th – October/November Exam Dates
            </h1>

            <div className="spacer-area">
              <p>
                NIOS students preparing for the October–November 2026 Public Examination need a clear and reliable examination schedule to plan their preparation effectively. The National Institute of Open Schooling (NIOS) conducts Public Examinations for Secondary (Class 10th) and Senior Secondary (Class 12th) courses in different examination sessions during the year.
              </p>
              <p>
                This page provides the latest information about the NIOS Date Sheet 2026 for Class 10th and Class 12th, including the October–November 2026 theory examination schedule, practical examination dates, exam timings, date sheet release status, PDF download information and important instructions for students.
              </p>
            </div>

            <h2>
              <span className="nios-125h-senior-highlight">
                NIOS Date Sheet 2026 – October/November Exam Latest Update
              </span>
            </h2>

            <div className="spacer-area">
              <p>
                <strong>Official update:</strong> NIOS has released the official
                theory examination date sheet for the October 2026 Public
                Examination through Notification No. 63/2026 dated 08 October
                2026. The schedule below is taken directly from that official
                notification.
              </p>
              <p>
                The October 2026 theory examinations for both Secondary (Class
                10) and Senior Secondary (Class 12th) will begin on{" "}
                <strong>22 October 2026</strong> and conclude on{" "}
                <strong>07 December 2026</strong>. All papers start at{" "}
                <strong>2:30 P.M.</strong>, with an additional{" "}
                <strong>15 minutes of reading time</strong> given before writing
                begins. The end time depends on the paper, as shown in the
                tables below.
              </p>
              <p>
                NIOS has stated that there will be no change in these
                examination dates. Students must download their Intimation cum
                Hall Ticket (admit card) from the official student portal{" "}
                <strong>sdmis.nios.ac.in</strong> and verify their own
                subject-wise dates and reporting time before the exam.
              </p>
            </div>

            {/* ===== October 2026 Theory Date Sheet Download Button ===== */}
            <div className="no-print" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href="/uploads/nios-oct-nov-2026-datesheet.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#1a73e8",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  fontSize: "15px",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download NIOS October 2026 Theory Date Sheet (PDF)
              </a>
            </div>

            <h3 className="nios-125h-senior-hero-title">
              NIOS October 2026 Session: Key Dates at a Glance
            </h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th className="date-col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Practical exams</td>
                    <td className="date-col">14 – 29 September 2026 (completed)</td>
                  </tr>
                  <tr>
                    <td>Theory date sheet released</td>
                    <td className="date-col">08 October 2026 (Notification 63/2026)</td>
                  </tr>
                  <tr>
                    <td>Theory admit card (Intimation cum Hall Ticket)</td>
                    <td className="date-col">October 2026 – sdmis.nios.ac.in</td>
                  </tr>
                  <tr>
                    <td>Class 10th theory exams</td>
                    <td className="date-col">22 October – 07 December 2026</td>
                  </tr>
                  <tr>
                    <td>Class 12th theory exams</td>
                    <td className="date-col">22 October – 05 December 2026</td>
                  </tr>
                  <tr>
                    <td>Exam timing</td>
                    <td className="date-col">2:30 P.M. onwards (+15 min reading time)</td>
                  </tr>
                  <tr>
                    <td>Result declaration (expected)</td>
                    <td className="date-col">Approx. 7 weeks after the last exam</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="nios-125h-senior-hero-title">
              NIOS Class 10th (Secondary) October 2026 Theory Exam Date Sheet – Official
            </h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>SUBJECT &amp; CODE</th>
                    <th>TIME</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Thursday, 22nd October, 2026 †</td>
                    <td>
                      Folk Art (244)<br />
                      Veda Adhyayan (245)<br />
                      Logistics and Supply Chain Management (258)<br />
                      Warehousing Principles and Inventory Management (259)<br />
                      Physical Education (273)
                    </td>
                    <td>
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 5.30 P.M.<br />
                      2.30 P.M. to 5.30 P.M.<br />
                      2.30 P.M. to 5.30 P.M.<br />
                      2.30 P.M. to 4.30 P.M.
                    </td>
                  </tr>
                  <tr>
                    <td>Friday, 23rd October, 2026 †</td>
                    <td>
                      Accountancy (224)<br />
                      Indian Sign Language (230)
                    </td>
                    <td>
                      2.30 P.M. to 5.30 P.M.<br />
                      2.30 P.M. to 4.30 P.M.
                    </td>
                  </tr>
                  <tr>
                    <td>Saturday, 24th October, 2026</td>
                    <td>Painting (225)</td>
                    <td>2.30 P.M. to 4.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Wednesday, 28th October, 2026</td>
                    <td>
                      Bengali (203), Marathi (204), Telugu (205), Gujarati (207), Kannada (208), Punjabi (210),
                      Assamese (228), Nepali (231), Malayalam (232), Odia (233), Bhoti Language (234),
                      Arabic (235), Persian (236), Tamil (237), Sindhi (238)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Thursday, 29th October, 2026</td>
                    <td>Data Entry Operations (Th) (229)</td>
                    <td>2.30 P.M. to 4.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Saturday, 31st October, 2026</td>
                    <td>Home Science (216)</td>
                    <td>2.30 P.M. to 5.00 P.M.</td>
                  </tr>
                  <tr>
                    <td>Monday, 02nd November, 2026</td>
                    <td>
                      Sanskrit (209), Bodh Darshan (241), Employability Skills (250), Military Studies (274)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Wednesday, 04th November, 2026</td>
                    <td><strong>Psychology (222)</strong></td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Thursday, 05th November, 2026</td>
                    <td><strong>Mathematics (211)</strong></td>
                    <td>2.30 P.M. to 5.00 P.M.</td>
                  </tr>
                  <tr>
                    <td>Friday, 06th November, 2026</td>
                    <td><strong>Science (212)</strong></td>
                    <td>2.30 P.M. to 5.00 P.M.</td>
                  </tr>
                  <tr>
                    <td>Thursday, 12th November, 2026</td>
                    <td><strong>English (202)</strong></td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Tuesday, 17th November, 2026</td>
                    <td><strong>Business Studies (215)</strong></td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Wednesday, 18th November, 2026</td>
                    <td><strong>Hindi (201)</strong></td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Friday, 20th November, 2026 *</td>
                    <td>
                      <strong>Economics (214)</strong><br />
                      Natyakala (285)
                    </td>
                    <td>
                      2.30 P.M. to 5.30 P.M.<br />
                      2.30 P.M. to 4.30 P.M.
                    </td>
                  </tr>
                  <tr>
                    <td>Saturday, 21st November, 2026</td>
                    <td><strong>Social Science (213)</strong></td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Wednesday, 25th November, 2026</td>
                    <td>Indian Culture and Heritage (223)</td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Thursday, 26th November, 2026</td>
                    <td><strong>Urdu (206)</strong></td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Saturday, 28th November, 2026</td>
                    <td>Hindustani Sangeet (242)</td>
                    <td>2.30 P.M. to 4.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Tuesday, 01st December, 2026</td>
                    <td>
                      Sanskrit Vyakaran (246), Entrepreneurship (249)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Wednesday, 02nd December, 2026</td>
                    <td>
                      Bakery and Confectionary (256)<br />
                      Cutting and Tailoring (605)<br />
                      Dress Making (606)<br />
                      Certificate in Basic Computing (Theory) (608)<br />
                      Beauty Culture and Hair Care (612)<br />
                      Certificate in Desk Top Publishing (613)<br />
                      Certificate in Yog (614)<br />
                      Certificate in Indian Embroidery (628)<br />
                      Beauty Therapy (640)<br />
                      Hair Care and Styling (641)<br />
                      Hand and Foot Care (642)
                    </td>
                    <td>
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.00 P.M.<br />
                      2.30 P.M. to 4.00 P.M.<br />
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.00 P.M.<br />
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.00 P.M.<br />
                      2.30 P.M. to 4.00 P.M.<br />
                      2.30 P.M. to 4.00 P.M.<br />
                      2.30 P.M. to 4.00 P.M.
                    </td>
                  </tr>
                  <tr>
                    <td>Friday, 04th December, 2026</td>
                    <td>Carnatic Sangeet (243)</td>
                    <td>2.30 P.M. to 4.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Saturday, 05th December, 2026</td>
                    <td>Bharatiya Darshan (247)</td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Monday, 07th December, 2026</td>
                    <td>Sanskrit Sahitya (248)</td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="nios-125h-senior-hero-title">
              NIOS Class 12th (Senior Secondary) October 2026 Theory Exam Date Sheet – Official
            </h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>SUBJECT &amp; CODE</th>
                    <th>TIME</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Thursday, 22nd October, 2026 †</td>
                    <td>
                      Sanskrit Vyakaran (346), Basics of Transportation (379), Bodh Darshan (381)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Friday, 23rd October, 2026 †</td>
                    <td>Early Childhood Care and Education (376)</td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Saturday, 24th October, 2026</td>
                    <td><strong>Geography (316)</strong></td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Wednesday, 28th October, 2026</td>
                    <td><strong>English (302)</strong></td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Thursday, 29th October, 2026</td>
                    <td>Painting (332)</td>
                    <td>2.30 P.M. to 4.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Saturday, 31st October, 2026</td>
                    <td>
                      <strong>Mathematics (311)</strong>, Transportation and Warehouse Management (377)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Monday, 02nd November, 2026</td>
                    <td>
                      <strong>Physics (312)</strong>, <strong>History (315)</strong>, Environmental Science (333),
                      Library and Information Science (339)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Wednesday, 04th November, 2026</td>
                    <td>
                      <strong>Hindi (301)</strong>, Employability Skills and Entrepreneurship (350),
                      Inventory Management (378)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Thursday, 05th November, 2026</td>
                    <td>
                      <strong>Biology (314)</strong>, <strong>Accountancy (320)</strong>,
                      Introduction to Law (338), Military History (375)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Friday, 06th November, 2026</td>
                    <td><strong>Business Studies (319)</strong></td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Thursday, 12th November, 2026</td>
                    <td>
                      <strong>Computer Science (330)</strong>, <strong>Sociology (331)</strong>,
                      Tourism (337), Physical Education (373)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Tuesday, 17th November, 2026</td>
                    <td>
                      <strong>Chemistry (313)</strong>, <strong>Political Science (317)</strong>,
                      Mass Communication (335), Military Studies (374)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Wednesday, 18th November, 2026</td>
                    <td>
                      Bengali (303), Tamil (304), Odia (305), Gujarati (307), Punjabi (310),
                      Arabic (341), Persian (342), Malayalam (343), Sindhi (344), Bhoti Language (380)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Friday, 20th November, 2026 *</td>
                    <td>Sanskrit (309)</td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Saturday, 21st November, 2026</td>
                    <td><strong>Economics (318)</strong></td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Wednesday, 25th November, 2026</td>
                    <td><strong>Home Science (321)</strong></td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Thursday, 26th November, 2026</td>
                    <td>Data Entry Operations (Th) (336)</td>
                    <td>2.30 P.M. to 4.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Saturday, 28th November, 2026</td>
                    <td>
                      <strong>Psychology (328)</strong><br />
                      Indian Sign Language (382)
                    </td>
                    <td>
                      2.30 P.M. to 5.30 P.M.<br />
                      2.30 P.M. to 4.30 P.M.
                    </td>
                  </tr>
                  <tr>
                    <td>Tuesday, 01st December, 2026</td>
                    <td>
                      House Keeping (356)<br />
                      Catering Management (357)<br />
                      Food Processing (358)<br />
                      Hotel Front Office Operations (360)<br />
                      Preservation of Fruits and Vegetables (363)<br />
                      Web Designing and Development (Th) (622)<br />
                      Computer and Office Applications (631)<br />
                      Data Entry Operations (632)<br />
                      Web Development (660)<br />
                      CRM Domestic Voice (661)<br />
                      Computer Hardware Assembly and Maintenance (663)<br />
                      Yog Assistant (667)
                    </td>
                    <td>
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 5.30 P.M.<br />
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.00 P.M.<br />
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.00 P.M.<br />
                      2.30 P.M. to 5.30 P.M.
                    </td>
                  </tr>
                  <tr>
                    <td>Wednesday, 02nd December, 2026</td>
                    <td>
                      <strong>Urdu (306)</strong>, Veda Adhyayan (345), Entrepreneurship (349)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Friday, 04th December, 2026</td>
                    <td>
                      Bharatiya Darshan (347)<br />
                      Krishi: Production, Processing and Making (383)<br />
                      Natyakala (385)
                    </td>
                    <td>
                      2.30 P.M. to 5.30 P.M.<br />
                      2.30 P.M. to 5.30 P.M.<br />
                      2.30 P.M. to 4.30 P.M.
                    </td>
                  </tr>
                  <tr>
                    <td>Saturday, 05th December, 2026</td>
                    <td>
                      Gender Studies (340), Sanskrit Sahitya (348)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="spacer-area">
              <p>
                <strong>* Important for Lucknow students (NIOS Regional Centre Prayagraj):</strong>{" "}
                The papers scheduled for <strong>20 November 2026</strong> will
                instead be held on <strong>03 December 2026</strong>. The same
                change applies to students under Regional Centre Dehradun.
              </p>
              <p>
                <strong>† For Regional Centre Gangtok only:</strong> the papers
                scheduled for 22 October 2026 will be held on{" "}
                <strong>27 October 2026</strong>, and the papers scheduled for
                23 October 2026 will be held on{" "}
                <strong>03 November 2026</strong>.
              </p>
              <p>
                All examinations begin at <strong>2:30 P.M.</strong> with 15
                minutes of reading time. Where a date has more than one subject,
                the time column shows the end time for each paper separately.
                Main subjects are highlighted in bold.
              </p>
              <p>
                Students must download the Intimation cum Hall Ticket from{" "}
                <strong>sdmis.nios.ac.in</strong> and cross-check their
                subject-wise dates. This schedule is reproduced from NIOS
                Notification No. 63/2026 dated 08 October 2026; NIOS has
                confirmed there will be no change in the exam dates.
              </p>
            </div>

            <h3 className="nios-125h-senior-hero-title">
              NIOS Practical Exam Dates 2026 – Official September Practical Exam Schedule
            </h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th className="date-col">Date Range</th>
                    <th>Sr. Secondary</th>
                    <th>Secondary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="date-col">14th September to 17th September, 2026</td>
                    <td>Home Science (321), Biology (314), Geography (316), Painting (332), Computer Science (330), Mass Communication (335), ECCE (376), Entrepreneurship (349)</td>
                    <td>Science (212), Home Science (216), Carnatic Sangeet (243), Folk Art (244), Physical Education (273)</td>
                  </tr>
                  <tr>
                    <td className="date-col">18th September to 21st September, 2026</td>
                    <td>Chemistry (313), Physics (312), Environmental Science (333), Physical Education (373), Data Entry Operations (336), Library & Information Science (339), Natyakala (385)</td>
                    <td>Painting (225), Maths (211), Hindustani Music (242), Data Entry Operations (229), Natyakala (285)</td>
                  </tr>
                  <tr>
                    <td className="date-col">22nd September to 25th September, 2026</td>
                    <td>Computer & Office Applications (631), Data Entry Operations (632), Web Development (660), IT Essentials (651), CRM Domestic Voice (661), Computer Hardware (663), Yoga Assistant (667)</td>
                    <td>Hair Care & Styling (641), Hand & Foot Care (642), Bakery & Confectionary (256), Certificate in Basic Computing (608), Certificate in Desktop Publishing (613), Yoga, Indian Sign Language (230)</td>
                  </tr>
                  <tr>
                    <td className="date-col">26th September to 29th September, 2026</td>
                    <td>House Keeping (356), Catering Management (357), Food Processing (358), Hotel Front Office Operations (360), Preservation of Fruits & Vegetables (363), Web Designing & Development (622), Indian Sign Language (382)</td>
                    <td>Cutting & Tailoring (605), Dress Making (606), Beauty Culture & Hair Care (612), Certificate in Indian Embroidery (628), Beauty Therapy (640)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="spacer-area">
              <p>
                Note: Students can download the official NIOS Practical Exam Date Sheet 2026 for the September practical examinations by clicking the download button below.
              </p>
            </div>

            {/* ===== Practical Date Sheet Download Button ===== */}
            <div className="no-print" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href="/papers/nios-practical-datesheet-for-september-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#1a73e8",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  fontSize: "15px",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Date Sheet
              </a>
            </div>

            <h2>
              <span className="nios-125h-senior-highlight">
                NIOS April/May 2026 Date Sheet – Previous Examination
              </span>
            </h2>

            <div className="spacer-area">
              <p>
                The April/May 2026 Public Examination has already been conducted. The previous examination schedule is retained below for reference.
              </p>
              <p>
                Students looking for the current examination schedule should refer to the October/November 2026 section above.
              </p>
            </div>

            {/* ===== Download & Print Buttons ===== */}
            <div className="no-print" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href="/assets/nios-theory-examination-date-sheet.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#1a73e8",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  fontSize: "15px",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download NIOS Date Sheet 2026 (April/May)
              </a>

              <button
                onClick={handlePrint}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#fff",
                  color: "#333",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  fontSize: "15px",
                  border: "2px solid #333",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9"/>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                  <rect x="6" y="14" width="12" height="8"/>
                </svg>
                Print Date Sheet
              </button>
            </div>

            <h3 className="nios-125h-senior-hero-title">
              NIOS Datesheet 2026 Theory exams for Class 10th: NIOS Class 10th Timetable
            </h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>SUBJECT & CODE</th>
                    <th>TIME</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Friday, 10th April, 2026</td>
                    <td>
                      Folk Art (244)<br />
                      Sanskrit Sahitya (248)<br />
                      Logistics and Supply Chain Management (258)<br />
                      Warehousing Principles and Inventory Management (259)
                    </td>
                    <td>
                      2.30 P.M. to 4.30 P.M<br />
                      2.30 P.M. to 5.30 P.M<br />
                      2.30 P.M. to 5.30 P.M<br />
                      2.30 P.M. to 5.30 P.M
                    </td>
                  </tr>
                  <tr>
                    <td>Saturday, 11th April, 2026 (Thursday, 7th May, 2026 only for the State of Rajasthan)</td>
                    <td>Hindustani Sangeet (242)</td>
                    <td>2.30 P.M. to 4.30 P.M</td>
                  </tr>
                  <tr>
                    <td>Monday, 13th April, 2026</td>
                    <td>
                      Bengali (203), Marathi (204), Telugu (205), Gujarati (207), Kannada (208), Punjabi (210),
                      Assamese (228), Nepali (231), Malayalam (232), Odia (233), Bhoti Language (234),
                      Arabic (235), Persian (236), Tamil (237), Sindhi (238)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Thursday, 16th April, 2026</td>
                    <td>
                      Urdu (206)<br />
                      Sanskrit (209)<br />
                      Indian Sign Language (230)<br />
                      Bodh Darshan (241)
                    </td>
                    <td>
                      2.30 P.M. to 5.30 P.M<br />
                      2.30 P.M. to 5.30 P.M<br />
                      2.30 P.M. to 4.30 P.M<br />
                      2.30 P.M. to 5.30 P.M
                    </td>
                  </tr>
                  <tr>
                    <td>Friday, 17th April, 2026</td>
                    <td>
                      Economics (214)<br />
                      Natyakala (285)
                    </td>
                    <td>
                      2.30 P.M. to 5.30 P.M<br />
                      2.30 P.M. to 4.30 P.M
                    </td>
                  </tr>
                  <tr>
                    <td>Saturday, 18th April, 2026</td>
                    <td>
                      Carnatic Sangeet (243)<br />
                      Bharatiya Darshan (247)<br />
                      Employability Skills (250)<br />
                      Military Studies (274)
                    </td>
                    <td>
                      2.30 P.M. to 4.30 P.M<br />
                      2.30 P.M. to 5.30 P.M<br />
                      2.30 P.M. to 5.30 P.M<br />
                      2.30 P.M. to 5.30 P.M
                    </td>
                  </tr>
                  <tr>
                    <td>Monday, 20th April, 2026 (Thursday, 7th May, 2026 only for the State of Karnataka)</td>
                    <td>Mathematics (211)</td>
                    <td>2.30 P.M. to 5.00 PM</td>
                  </tr>
                  <tr>
                    <td>Tuesday, 21st April, 2026</td>
                    <td>Psychology (222)</td>
                    <td>2.30 P.M. to 5.30 P.M</td>
                  </tr>
                  <tr>
                    <td>Wednesday, 22nd April, 2026</td>
                    <td>English (202)</td>
                    <td>2.30 P.M. to 5.30 P.M</td>
                  </tr>
                  <tr>
                    <td>Thursday, 23rd April, 2026 (Friday, 8th May, 2026 only for the State of West Bengal, Bihar, Karnataka & Tamilnadu)</td>
                    <td>Business Studies (215)</td>
                    <td>2.30 P.M. to 5.30 P.M</td>
                  </tr>
                  <tr>
                    <td>Friday, 24th April, 2026 (Saturday, 9th May, 2026 only for the State of Karnataka)</td>
                    <td>Indian Culture and Heritage (223)</td>
                    <td>2.30 P.M. to 5.30 P.М</td>
                  </tr>
                  <tr>
                    <td>Saturday, 25th April, 2026 (Thursday, 7th May, 2026 only for the State of Uttar Pradesh)</td>
                    <td>
                      Painting (225)<br />
                      Physical Education (273)
                    </td>
                    <td>
                      2.30 P.M. to 4.30 P.М<br />
                      2.30 P.M. to 5.30 P.M
                    </td>
                  </tr>
                  <tr>
                    <td>Monday, 27th April, 2026 (Saturday, 9th May, 2026 only for the State of Uttar Pradesh)</td>
                    <td>Data Entry Operations (Th) (229)</td>
                    <td>2.30 P.M. to 4.30 P.M</td>
                  </tr>
                  <tr>
                    <td>Tuesday, 28th April, 2026</td>
                    <td>
                      Sanskrit Vyakaran (246)<br />
                      Entrepreneurship (249)
                    </td>
                    <td>2.30 P.M. to 5.30 P.М</td>
                  </tr>
                  <tr>
                    <td>Wednesday, 29th April, 2026 (Thursday, 7th May, 2026 only for the State of West Bengal)</td>
                    <td>Home Science (216)</td>
                    <td>2.30 P.M. to 5.00 P.M</td>
                  </tr>
                  <tr>
                    <td>Thursday, 30th April, 2026</td>
                    <td>Social Science (213)</td>
                    <td>2.30 P.M. to 5.30 P.М</td>
                  </tr>
                  <tr>
                    <td>Saturday, 02nd May, 2026</td>
                    <td>Hindi (201)</td>
                    <td>2.30 P.M. to 5.30 P.М</td>
                  </tr>
                  <tr>
                    <td>Monday, 04th May, 2026</td>
                    <td>Science (212)</td>
                    <td>2.30 P.M. to 5.00 P.М</td>
                  </tr>
                  <tr>
                    <td>Tuesday, 05th May, 2026</td>
                    <td>
                      Bakery & Confectionary (256)<br />
                      Cutting & Tailoring (605)<br />
                      Dress Making (606)<br />
                      Certificate in Basic Computing (Theory) (608)<br />
                      Beauty Culture & Hair Care (612)<br />
                      Certificate in Desk Top Publishing (613)<br />
                      Certificate in Yog (614)<br />
                      Certificate in Indian Embroidery (628)<br />
                      Beauty Therapy (640)<br />
                      Hair Care and Styling (641)<br />
                      Hand & Foot Care (642)
                    </td>
                    <td>
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.00 P.M.<br />
                      2.30 P.M. to 4.00 P.M.<br />
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.00 P.M.<br />
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.00 P.M.<br />
                      2.30 P.M. to 4.00 P.M.<br />
                      2.30 P.M. to 4.00 P.M.<br />
                      2.30 P.M. to 4.00 P.M.
                    </td>
                  </tr>
                  <tr>
                    <td>Wednesday, 6th May, 2026</td>
                    <td>
                      Accountancy (224)<br />
                      Veda Adhyayan (245)
                    </td>
                    <td>2.30 P.M. to 5.30 P.М</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <br />

            <h3 className="nios-125h-senior-hero-title">
              NIOS Datesheet 2026 Theory Exams For Class 12th: NIOS Class 12th Timetable
            </h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>SUBJECT & CODE</th>
                    <th>TIME</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Friday, 10th April, 2026</td>
                    <td>
                      Sanskrit Vyakaran (346)<br />
                      Early Childhood Care & Education (376)<br />
                      Inventory Management (378)<br />
                      Basics of Transportation (379)
                    </td>
                    <td>
                      2:30 PM – 4:30 PM<br />
                      2:30 PM – 5:30 PM<br />
                      2:30 PM – 5:30 PM<br />
                      2:30 PM – 5:30 PM
                    </td>
                  </tr>
                  <tr>
                    <td>Saturday, 11th April, 2026 (Thursday, 7th May, 2026 only for the State of Rajasthan)</td>
                    <td>
                      Urdu (306)<br />
                      Sanskrit Sahitya (348)<br />
                      Krishi (Agriculture) (383)
                    </td>
                    <td>
                      2:30 PM – 5:30 PM<br />
                      2:30 PM – 5:30 PM<br />
                      2:30 PM – 5:30 PM
                    </td>
                  </tr>
                  <tr>
                    <td>Monday, 13th April, 2026</td>
                    <td>
                      Geography (316)<br />
                      Transportation & Warehouse Manag. (377)<br />
                      Natyakala (385)<br />
                      Indian Sign Language (382)
                    </td>
                    <td>
                      2.30 P.M. to 5.30 P.M<br />
                      2.30 P.M. to 5.30 P.M<br />
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 4.30 P.M.
                    </td>
                  </tr>
                  <tr>
                    <td>Thursday, 16th April, 2026</td>
                    <td>
                      Biology (314)<br />
                      Accountancy (320)<br />
                      Introduction to Law (338)<br />
                      Military History (375)
                    </td>
                    <td>
                      2:30 PM – 5:30 PM<br />
                      2:30 PM – 5:30 PM<br />
                      2:30 PM – 5:30 PM<br />
                      2:30 PM – 5:30 PM
                    </td>
                  </tr>
                  <tr>
                    <td>Friday, 17th April, 2026</td>
                    <td>
                      Hindi (301)<br />
                      Employability Skills & Entrepreneurship (350)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M</td>
                  </tr>
                  <tr>
                    <td>Saturday, 18th April, 2026</td>
                    <td>
                      Physics (312)<br />
                      History (315)<br />
                      Environmental Science (333)<br />
                      Library & Information Science (339)
                    </td>
                    <td>
                      2:30 PM – 5:30 PM<br />
                      2:30 PM – 5:30 PM<br />
                      2:30 PM – 5:30 PM<br />
                      2:30 PM – 5:30 PM
                    </td>
                  </tr>
                  <tr>
                    <td>Monday, 20th April, 2026 (Thursday, 7th May, 2026 only for the State of Karnataka)</td>
                    <td>Home Science (321)</td>
                    <td>2.30 P.M. to 5.30 P.M</td>
                  </tr>
                  <tr>
                    <td>Tuesday, 21st April, 2026</td>
                    <td>
                      Chemistry (313)<br />
                      Political Science (317)<br />
                      Mass Communication (335)<br />
                      Military Studies (374)
                    </td>
                    <td>
                      2.30 P.M. to 5.30 P.М.<br />
                      2.30 P.M. to 5.30 P.М.<br />
                      2.30 P.M. to 5.30 P.М.<br />
                      2.30 P.M. to 5.30 P.М.
                    </td>
                  </tr>
                  <tr>
                    <td>Wednesday, 22nd April, 2026</td>
                    <td>Psychology (328)</td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Thursday, 23rd April, 2026 (Friday, 8th May, 2026 only for the State of West Bengal, Bihar, Karnataka & Tamilnadu)</td>
                    <td>
                      Sanskrit (309)<br />
                      Gender Studies (340)
                    </td>
                    <td>
                      2.30 P.M. to 5.30 P.M.<br />
                      2.30 P.M. to 5.30 P.M.
                    </td>
                  </tr>
                  <tr>
                    <td>Friday, 24th April, 2026 (Saturday, 9th May, 2026 only for the State of Karnataka)</td>
                    <td>
                      Economics (318)<br />
                      Bodh Darshan (381)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Saturday, 25th April, 2026 (Thursday, 7th May, 2026 only for the State of Uttar Pradesh)</td>
                    <td>Mathematics (311)</td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Monday, 27th April, 2026 (Saturday, 9th May, 2026 only for the State of Uttar Pradesh)</td>
                    <td>
                      Bharatiya Darshan (347)<br />
                      Entrepreneurship (349)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Tuesday, 28th April, 2026</td>
                    <td>English (302)</td>
                    <td>2.30 P.M. to 5.30 P.М.</td>
                  </tr>
                  <tr>
                    <td>Thursday, 30th April, 2026</td>
                    <td>
                      Computer Science (330)<br />
                      Sociology (331)<br />
                      Tourism (337)<br />
                      Physical Education (373)
                    </td>
                    <td>2.30 P.M. to 5.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Saturday, 02nd May, 2026</td>
                    <td>
                      Bengali (303)<br />
                      Tamil (304)<br />
                      Odia (305)<br />
                      Gujarati (307)<br />
                      Punjabi (310)<br />
                      Arabic (341), Persian (342)<br />
                      Malayalam (343)<br />
                      Sindhi (344)<br />
                      Bhoti Language (380)
                    </td>
                    <td>2.30 P.M. to 5.30 P.М.</td>
                  </tr>
                  <tr>
                    <td>Monday, 04th May, 2026</td>
                    <td>
                      Data Entry Operations (Th) (336)<br />
                      Veda Adhyayan (345)
                    </td>
                    <td>
                      2.30 P.M. to 4.30 P.M.<br />
                      2.30 P.M. to 5.30 P.M.
                    </td>
                  </tr>
                  <tr>
                    <td>Tuesday, 05th May, 2026</td>
                    <td>Painting (332)</td>
                    <td>2.30 P.M. to 4.30 P.M.</td>
                  </tr>
                  <tr>
                    <td>Wednesday, 6th May, 2026</td>
                    <td>
                      House Keeping (356)<br />
                      Catering Management (357)<br />
                      Food Processing (358)<br />
                      Hotel Front Office Operations (360)<br />
                      Preservation of Fruits & Vegetables (363)<br />
                      Web Designing & Development (Th) (622)<br />
                      Computer and Office Applications (631)<br />
                      Data Entry Operations (632)<br />
                      Web Development (660)<br />
                      CRM Domestic Voice (661)<br />
                      Computer Hardware Assembly & Maint (663)<br />
                      Yog Assistant (667)
                    </td>
                    <td>
                      2.30 P.M. to 4.30 P.M<br />
                      2.30 P.M. to 4.30 P.M<br />
                      2.30 P.M. to 4.30 P.M<br />
                      2.30 P.M. to 4.30 P.M<br />
                      2.30 P.M. to 4.30 P.M<br />
                      2.30 P.M. to 5.30 P.M.<br />
                      2.30 P.M. to 4.30 P.M<br />
                      2.30 P.M. to 4.30 P.M<br />
                      2.30 P.M. to 4.00 P.M<br />
                      2.30 P.M. to 4.00 P.M<br />
                      2.30 P.M. to 4.00 P.M<br />
                      2.30 P.M. to 5.30 P.M
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="nios-125h-senior-hero-title">
              NIOS Exam Timing on the Day of the Exam
            </h3>

            <div className="spacer-area">
              <ul>
                <li>Reach the exam centre at least 30 minutes before the reporting time.</li>
                <li>Students get 15 minutes of reading time (usually 2:15 PM to 2:30 PM) to go through the question paper before writing begins.</li>
                <li>Most papers run from 2:30 PM to 5:30 PM; some papers end at 4:00 PM, 4:30 PM or 5:00 PM, as shown in the date sheet tables above.</li>
              </ul>
            </div>

            <h3 className="nios-125h-senior-hero-title">
              NIOS Admission Dates 2026
            </h3>

            <div className="spacer-area">
              <p>
                Students must register through the NIOS admission portal before the cut-off. As a general pattern, applications for the October session close around March 15, while April session applications close around September 15. Always confirm the exact date on the official NIOS site before submitting, since deadlines can shift slightly year to year.
              </p>
            </div>

            <h3 className="nios-125h-senior-hero-title">
              NIOS Exam Fee Payment Dates
            </h3>

            <div className="spacer-area">
              <p>
                Exam fee payment windows are announced separately for the April and October sessions on the official NIOS portal. Missing this window usually means paying a late fee, so it&apos;s worth setting a reminder as soon as the notification is out.
              </p>
            </div>

            <h3 className="nios-125h-senior-hero-title">
              NIOS On-Demand Exam (ODE) Dates 2026
            </h3>

            <div className="spacer-area">
              <p>
                NIOS also runs an On-Demand Examination system that gives students flexibility outside the two fixed public exam sessions:
              </p>
              <ul>
                <li>Admissions for ODE are open all year round.</li>
                <li>ODE exams are held every month except April, May, October, and November (these are reserved for the public exam sessions).</li>
                <li>Students select their preferred exam date at the time of registration.</li>
                <li>Results for ODE are typically declared 45 days after the exam is conducted.</li>
              </ul>
            </div>

          </div>
        </div>

        <div className="container">
          <NiosDatesheetFAQ />
        </div>
        <Footer />
      </section>
    </>
  );
}
