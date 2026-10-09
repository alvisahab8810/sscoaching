import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import NiosDatesheetFAQ from "@/components/home/NiosDatesheetFAQ";
import PageSections from "@/components/PageSections";
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

export default function NIOSDatesheet2026({ sections, metaTitle, metaDescription }) {
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

  // The print button now comes from the CMS as raw HTML, so it cannot carry
  // a React onClick. The seed marks that button with data-nios-print, and we
  // delegate the click to restore the original behaviour.
  useEffect(() => {
    const onClick = (e) => {
      if (!e.target.closest("[data-nios-print]")) return;
      e.preventDefault();
      const iframe = pdfIframeRef.current;
      if (iframe && iframe.contentWindow) iframe.contentWindow.print();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
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
            <PageSections sections={sections} />
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

/**
 * Page content now comes from the DB (PageContent collection) so it can be
 * edited from the admin dashboard. The markup and CSS are unchanged -- the
 * sections render exactly the elements that used to be hardcoded here.
 *
 * If the DB is down or the page is deleted by mistake we fall back to the
 * seed file, otherwise the live page would go blank.
 */
export async function getStaticProps() {
  const SLUG = "nios-datesheet";
  const fallback = require("../scripts/seed-data/nios-datesheet.json");

  let page = null;

  try {
    const [{ default: dbConnect }, { default: PageContent }] = await Promise.all([
      import("@/lib/dbConnect"),
      import("@/models/PageContent"),
    ]);

    await dbConnect();
    page = await PageContent.findOne({ slug: SLUG, isPublished: true }).lean();
  } catch (err) {
    console.error("nios-datesheet: PageContent fetch failed, using seed fallback:", err.message);
  }

  const source = page || fallback;

  const sections = (source.sections || [])
    .filter((s) => s && s.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return {
    props: {
      sections: JSON.parse(JSON.stringify(sections)),
      metaTitle: source.metaTitle || fallback.metaTitle,
      metaDescription: source.metaDescription || fallback.metaDescription,
    },
    revalidate: 60,
  };
}
