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
        "text": "NIOS is expected to release the official theory exam date sheet for the October 2026 session in September 2026. The board publishes it as a downloadable PDF on its official websites, sdmis.nios.ac.in and nios.ac.in, listing subject-wise dates, exam timings, and reporting instructions for both Class 10 and Class 12 students. Students should keep checking the official portal from early September onward, since the exact release date is announced through a public notice a few days in advance."
      }
    },
    {
      "@type": "Question",
      "name": "What are the NIOS Class 10 October 2026 exam dates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The NIOS Class 10 theory exams for the October 2026 session are expected to run from October 14 to November 18, 2026. Major subjects include Hindi on October 24, Mathematics on October 30, Social Science on November 3, and English on November 11. Regional languages such as Bengali, Marathi, Telugu, and Gujarati are scheduled together on October 16. The full subject-wise schedule is listed in the date sheet table above."
      }
    },
    {
      "@type": "Question",
      "name": "What are the NIOS Class 12 October 2026 exam dates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The NIOS Class 12 theory exams for the October 2026 session are expected to run from October 14 to November 18, 2026, similar to Class 10 but with a different subject-date mapping. Key subjects include Geography on October 16, Chemistry on October 29, English on October 31, Physics on November 6, and Mathematics on November 11. Vocational and skill-based subjects such as Housekeeping and Web Development are scheduled on the final exam date, November 18."
      }
    },
    {
      "@type": "Question",
      "name": "When are the NIOS practical exams for the October 2026 session?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NIOS practical exams for the October 2026 session are expected to be conducted in four batches between September 12 and September 27, 2026. Science subjects like Physics, Chemistry, and Biology are typically held early in this window (September 12-19), while vocational subjects such as Computer Applications, Web Development, and Beauty & Wellness courses are scheduled in the later batches (September 20-27). Students must clear their practical exams before appearing for the corresponding theory papers."
      }
    },
    {
      "@type": "Question",
      "name": "What is the exam timing for NIOS October 2026 theory exams?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NIOS theory exams are conducted from 2:15 PM to 5:30 PM. Students get an additional 15 minutes of reading time, generally from 2:15 PM to 2:30 PM, to go through the question paper before they can start writing answers. Candidates are advised to reach the exam centre at least 30 minutes before the reporting time to complete verification and be seated on time."
      }
    },
    {
      "@type": "Question",
      "name": "When will the NIOS admit card for the October 2026 session be released?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The NIOS theory exam admit card for the October 2026 session is expected to be released in October 2026, shortly before the exams begin. The practical exam admit card is released earlier, in September 2026. Students can download both admit cards from the official NIOS student login portal, sdmis.nios.ac.in, using their enrollment number and date of birth."
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
        "text": "NIOS is expected to declare the results for the October-November 2026 session in December 2026. Results for both Class 10 and Class 12 are usually announced on the same day and can be checked on the official results portal, results.nios.ac.in, using the student's roll number. A physical marksheet is issued later through the respective regional NIOS study centre."
      }
    },
    {
      "@type": "Question",
      "name": "Are NIOS Class 10 and Class 12 October exam dates the same?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, NIOS Class 10 and Class 12 exams follow separate subject-wise date sheets, even though both are conducted within the same overall period from mid-October to mid-November. A subject common to both classes, such as Mathematics or English, is usually scheduled on a different date for Class 10 than for Class 12, so students must check the specific date sheet for their class rather than assuming the schedules match."
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
          content="NIOS Date Sheet 2026 for Class 10 & 12: Check the latest October/November exam date sheet, theory and practical dates, timings, PDF download and exam updates."
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
              NIOS Date Sheet 2026 for Class 10 & 12 – October/November Exam Dates
            </h1>

            <div className="spacer-area">
              <p>
                NIOS students preparing for the October–November 2026 Public Examination need a clear and reliable examination schedule to plan their preparation effectively. The National Institute of Open Schooling (NIOS) conducts Public Examinations for Secondary (Class 10) and Senior Secondary (Class 12) courses in different examination sessions during the year.
              </p>
              <p>
                This page provides the latest information about the NIOS Date Sheet 2026 for Class 10 and Class 12, including the October–November 2026 theory examination schedule, practical examination dates, exam timings, date sheet release status, PDF download information and important instructions for students.
              </p>
            </div>

            <h2>
              <span className="nios-125h-senior-highlight">
                NIOS Date Sheet 2026 – October/November Exam Latest Update
              </span>
            </h2>

            <div className="spacer-area">
              <p>
                The official NIOS October/November 2026 theory examination date sheet for Class 10 and Class 12 has not been released yet.
              </p>
              <p>
                NIOS has already started the examination-related process for the upcoming October 2026 Public Examination. Students can check official notifications regarding examination fee payment, exam centre registration and other examination-related updates through the NIOS website.
              </p>
              <p>
                Once NIOS officially releases the October/November 2026 date sheet, this page will be updated with the subject-wise examination dates, examination timings and official PDF download link.
              </p>
              <p>
                Students should avoid relying on unofficial or unconfirmed exam dates until the official NIOS date sheet is published.
              </p>
            </div>

            <h3 className="nios-125h-senior-hero-title">
              NIOS October 2026 Session: Key Dates at a Glance
            </h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th className="date-col">Expected Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Practical exam timetable release</td>
                    <td className="date-col">August 2026</td>
                  </tr>
                  <tr>
                    <td>Practical admit card</td>
                    <td className="date-col">September 2026</td>
                  </tr>
                  <tr>
                    <td>Practical exams</td>
                    <td className="date-col">September 2026</td>
                  </tr>
                  <tr>
                    <td>Theory timetable release</td>
                    <td className="date-col">September 2026</td>
                  </tr>
                  <tr>
                    <td>Theory admit card</td>
                    <td className="date-col">October 2026</td>
                  </tr>
                  <tr>
                    <td>Class 10 theory exams</td>
                    <td className="date-col">October–November 2026</td>
                  </tr>
                  <tr>
                    <td>Class 12 theory exams</td>
                    <td className="date-col">October–November 2026</td>
                  </tr>
                  <tr>
                    <td>Result declaration</td>
                    <td className="date-col">December 2026</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="nios-125h-senior-hero-title">
              NIOS Class 10th October Session Theory Exam Date Sheet 2026 (Expected)
            </h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th className="date-col">Exam Date</th>
                    <th>Subjects</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="date-col">Oct 14, 2026</td>
                    <td>Sanskrit Literature, Entrepreneurship</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 15, 2026</td>
                    <td>Bhartiya Darshan</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 16, 2026</td>
                    <td>Bengali, Marathi, Telugu, Gujarati, Urdu, Kannada, Punjabi, Assamese, Odia, Malayalam, Nepali, Arabic, Persian, Tamil, Sindhi</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 17, 2026</td>
                    <td>Psychology</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 24, 2026</td>
                    <td>Hindi</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 25, 2026</td>
                    <td>Employability Skills</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 29, 2026</td>
                    <td>Data Entry Operations (IT)</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 30, 2026</td>
                    <td>Mathematics</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 31, 2026</td>
                    <td>Business Studies</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 3, 2026</td>
                    <td>Social Science</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 4, 2026</td>
                    <td>Economics, Veda Adhyayan</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 6, 2026</td>
                    <td>Painting</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 7, 2026</td>
                    <td>Science & Technology</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 8, 2026</td>
                    <td>Folk Art</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 10, 2026</td>
                    <td>Urdu, Sanskrit, Indian Sign Language, Bodh Darshan</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 11, 2026</td>
                    <td>English</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 12, 2026</td>
                    <td>Bakery & Confectionery, Food Production, Food & Beverage, Housekeeping, Beauty & Health Care</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 13, 2026</td>
                    <td>Home Science</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 14, 2026</td>
                    <td>Hindustani Sangeet, Natyakala</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 17, 2026</td>
                    <td>Indian Culture & Heritage, Carnatic Sangeet</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 18, 2026</td>
                    <td>Accountancy, Sanskrit Vyakaran</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="nios-125h-senior-hero-title">
              NIOS Class 12th October Session Theory Exam Date Sheet 2026 (Expected)
            </h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th className="date-col">Exam Date</th>
                    <th>Subjects</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="date-col">Oct 14, 2026</td>
                    <td>Early Childhood Care and Education</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 15, 2026</td>
                    <td>Psychology, Sanskrit Vyakaran</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 16, 2026</td>
                    <td>Geography</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 17, 2026</td>
                    <td>Sanskrit</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 24, 2026</td>
                    <td>Bengali, Tamil, Odia, Gujarati, Punjabi, Arabic, Persian, Malayalam, Sindhi, Bhoti</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 25, 2026</td>
                    <td>Gender Studies</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 29, 2026</td>
                    <td>Chemistry, Political Science, Mass Communication, Military Studies</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 30, 2026</td>
                    <td>Home Science</td>
                  </tr>
                  <tr>
                    <td className="date-col">Oct 31, 2026</td>
                    <td>English</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 3, 2026</td>
                    <td>Computer Science, Physical Education, Sociology, Tourism</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 4, 2026</td>
                    <td>Hindi, Employability Skills & Entrepreneurship</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 6, 2026</td>
                    <td>Physics, History, Environmental Science, Library & Information Science</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 7, 2026</td>
                    <td>Data Entry Operations (Theory)</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 10, 2026</td>
                    <td>Biology, Accountancy, Introduction to Law, Military History</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 11, 2026</td>
                    <td>Mathematics, Veda Adhyayan</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 12, 2026</td>
                    <td>Painting</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 13, 2026</td>
                    <td>Business Studies, Sanskrit Sahitya</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 14, 2026</td>
                    <td>Urdu, Bharatiya Darshan, Natyakala</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 17, 2026</td>
                    <td>Economics, Bodh Darshan</td>
                  </tr>
                  <tr>
                    <td className="date-col">Nov 18, 2026</td>
                    <td>Housekeeping, Catering Management, Food Processing, Hotel Front Office Operations, Preservation of Fruits & Vegetables, Web Designing & Development, Computer & Office Applications, Data Entry Operations, Web Development, CRM Domestic Voice, Computer Hardware Assembly & Maintenance, Yoga Assistant</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="spacer-area">
              <p>
                Note: This is the expected schedule based on the pattern followed in previous sessions. NIOS usually confirms the final date sheet on its official portals — sdmis.nios.ac.in and nios.ac.in — a few weeks before the exams begin. We&apos;ll update this page the moment the official PDF is out.
              </p>
            </div>

            <h3 className="nios-125h-senior-hero-title">
              NIOS Practical Exam Dates 2026 (October Session – Expected)
            </h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th className="date-col">Date Range</th>
                    <th>Senior Secondary (Class 12)</th>
                    <th>Secondary (Class 10)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="date-col">Sep 12–15, 2026</td>
                    <td>Home Science, Biology, Geography, Painting, Computer Science, Mass Communication, ECCE</td>
                    <td>Science & Technology, Home Science, Carnatic Sangeet, Folk Art</td>
                  </tr>
                  <tr>
                    <td className="date-col">Sep 16–19, 2026</td>
                    <td>Chemistry, Physics, Environmental Science, Physical Education & Yoga, Data Entry Operations, Library Science, Natyakala</td>
                    <td>Painting, Maths, Hindustani Music, Data Entry Operations, Natyakala</td>
                  </tr>
                  <tr>
                    <td className="date-col">Sep 20–23, 2026</td>
                    <td>Computer & Office Applications, Data Entry Operations, Web Development, IT Essentials, CRM Domestic Voice, Computer Hardware, Yog Assistant</td>
                    <td>Hair Care & Styling, Hand & Foot Care, Bakery & Confectionery, Basic Computing, Desktop Publishing, Yoga, Indian Sign Language</td>
                  </tr>
                  <tr>
                    <td className="date-col">Sep 24–27, 2026</td>
                    <td>Housekeeping, Catering Management, Food Processing, Hotel Front Office, Preservation of Fruits & Vegetables, Web Designing</td>
                    <td>Cutting & Tailoring, Dress Making, Beauty Culture & Hair Care, Indian Embroidery, Beauty Therapy</td>
                  </tr>
                </tbody>
              </table>
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
                <li>The exam runs from 2:15 PM to 5:30 PM.</li>
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
