"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

export default function FAQSection() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setFaqs(data.data);
      });
  }, []);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <Head>
        <title>Frequently Asked Questions For SS Coaching</title>
        <meta
          name="description"
          content="SS Coaching NIOS Center in Lucknow, Provides form filling for admission in NIOS Board (National Institute of Open Schooling) as well as NIOS Coaching Classes, Syllabus and Tuition for 10th (secondary) & 12th (senior secondary) Students. Contact us for all inquiries related to NIOS Board in Lucknow"
        />
        <meta
          name="keywords"
          content="NIOS exam centre registration, NIOS Study Centre Contact Number, nios head office contact number, nios regional centre list, nios contact number, NIOS Study Centre List, NIOS Coaching in Lucknow, NIOS admission Lucknow,"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "Is NIOS valid for government jobs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NIOS certificates are recognized by the Government of India and are valid for government jobs, higher education, and competitive exams." } },
                { "@type": "Question", "name": "Is the NIOS certificate valid for higher education and college admission in India?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the NIOS board is recognized by the Government of India. Students who complete their education through NIOS can apply for higher education courses, college admissions, competitive exams, and government or private sector jobs. Many universities and colleges accept NIOS certificates for admission." } },
                { "@type": "Question", "name": "Is NIOS easier than regular school?", "acceptedAnswer": { "@type": "Answer", "text": "NIOS provides flexible learning and multiple exam opportunities, which makes it easier for many students to complete their education at their own pace." } },
                { "@type": "Question", "name": "Can I prepare for competitive exams like JEE, NEET, or CLAT along with NIOS?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NIOS allows students to manage their time effectively, making it easier to prepare for competitive exams like JEE, NEET, CLAT, and more alongside their board studies." } },
                { "@type": "Question", "name": "Who can apply for NIOS admission in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Students who want to complete their 10th or 12th education, including school dropouts, working students, students who failed board exams, and learners looking for a flexible education system can apply for NIOS admission in Lucknow." } },
                { "@type": "Question", "name": "How long does NIOS admission take?", "acceptedAnswer": { "@type": "Answer", "text": "The admission process is usually completed within a few days once all documents are submitted and the online form is approved." } },
                { "@type": "Question", "name": "How can I apply for NIOS admission in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "You can apply by visiting SS Coaching or contacting their team. They guide you through registration, document submission, and subject selection to make the process simple and smooth." } },
                { "@type": "Question", "name": "What is the process for NIOS admission in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "The NIOS admission process in Lucknow includes course selection, online registration, document submission, and coaching support for exam preparation." } },
                { "@type": "Question", "name": "Can failed students complete 10th or 12th through NIOS coaching in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, students who failed in board exams can join NIOS coaching for failed students in Lucknow and complete their secondary or senior secondary education." } },
                { "@type": "Question", "name": "Where can I find a trusted NIOS center in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "SS Coaching provides complete support for students who want to complete their Class 10th or 12th through NIOS. With expert guidance and a supportive environment, students can easily continue their education. They have branches in Hazratganj, Indira Nagar, and Alambagh." } },
                { "@type": "Question", "name": "Is SS Coaching the NIOS head office in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "SS Coaching is not the official NIOS office. However, they provide complete admission guidance and coaching support for NIOS students in Lucknow." } },
                { "@type": "Question", "name": "Which areas in Lucknow does SS Coaching cover?", "acceptedAnswer": { "@type": "Answer", "text": "SS Coaching has branches in Hazratganj, Indira Nagar, and Alambagh, making it easy for students across Lucknow to access their NIOS coaching and admission services." } },
                { "@type": "Question", "name": "Which is the best NIOS coaching in Hazratganj Lucknow for 10th and 12th students?", "acceptedAnswer": { "@type": "Answer", "text": "SS Coaching is considered one of the most trusted institutes for NIOS coaching in Hazratganj Lucknow for 10th and 12th students. The institute provides experienced teachers, structured study material, and proper exam preparation guidance, helping students perform confidently in NIOS board examinations." } },
                { "@type": "Question", "name": "Which is the best NIOS coaching in Indra Nagar Lucknow for 10th and 12th students?", "acceptedAnswer": { "@type": "Answer", "text": "SS Coaching is widely known as one of the best institutes for NIOS coaching in Indra Nagar Lucknow, providing expert faculty, structured classes, and complete exam preparation support for 10th and 12th students." } },
                { "@type": "Question", "name": "Which is the best NIOS coaching in Alambagh Lucknow for 10th and 12th students?", "acceptedAnswer": { "@type": "Answer", "text": "SS Coaching is considered one of the best options for NIOS coaching in Alambagh Lucknow for 10th and 12th students, offering expert faculty and complete exam preparation guidance." } },
                { "@type": "Question", "name": "Which is the best NIOS institute in Lucknow for admission and coaching?", "acceptedAnswer": { "@type": "Answer", "text": "Students looking for the best NIOS institute in Lucknow for admission and coaching often choose SS Coaching because of its experienced teachers, supportive environment, and proven academic results." } },
                { "@type": "Question", "name": "Is there a NIOS study center in Alambagh Lucknow for board exam preparation?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, SS Coaching operates as a trusted NIOS study center in Alambagh Lucknow for 10th and 12th exam preparation with experienced teachers and structured classes." } },
                { "@type": "Question", "name": "Why should students choose a NIOS coaching center in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Joining a NIOS coaching center in Lucknow helps students receive professional academic guidance and structured preparation. Coaching institutes provide regular classes, doubt-clearing sessions, and exam practice that help students understand the syllabus more effectively and improve their chances of passing the NIOS exams successfully." } },
                { "@type": "Question", "name": "What subjects are available in NIOS coaching for 10th and 12th in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Students joining NIOS coaching for 10th and 12th in Lucknow can choose from a variety of subjects including English, Hindi, Mathematics, Science, Social Science, Business Studies, Economics, and other optional subjects depending on their course and career goals." } },
                { "@type": "Question", "name": "How long does it take to complete NIOS 10th or 12th in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "The duration depends on the student's learning pace and examination schedule. NIOS offers flexible learning options, and many students complete their 10th or 12th within the same academic year depending on their preparation and exam availability." } },
                { "@type": "Question", "name": "What is the fee for NIOS coaching and admission in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "The fee for NIOS coaching and admission in Lucknow depends on the course, number of subjects, and exam stream selected by the student. SS Coaching offers affordable fee structures accessible to every student. Please contact SS Coaching directly for the latest fee details." } },
                { "@type": "Question", "name": "Is NIOS coaching available for 10th class students in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, SS Coaching provides NIOS coaching for 10th class students in Lucknow, including subject-wise teaching, study materials, and exam preparation strategies." } },
                { "@type": "Question", "name": "Where can I find NIOS coaching for 12th in Indra Nagar Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Students can join SS Coaching for NIOS coaching for 12th in Indra Nagar Lucknow, where experienced teachers guide them through the NIOS syllabus and examination pattern." } },
                { "@type": "Question", "name": "Can I take coaching with NIOS admission?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, many institutes provide NIOS coaching and admission support in Lucknow to help students prepare better for their exams while completing the admission process simultaneously." } },
                { "@type": "Question", "name": "Is coaching necessary for NIOS students?", "acceptedAnswer": { "@type": "Answer", "text": "While NIOS is a flexible system, proper coaching helps students understand the syllabus better, stay consistent, and perform well in exams with confidence." } },
                { "@type": "Question", "name": "How can I take NIOS admission in Hazratganj Lucknow for 10th or 12th?", "acceptedAnswer": { "@type": "Answer", "text": "Students who want NIOS admission in Hazratganj Lucknow for 10th or 12th can visit SS Coaching for complete guidance. The institute helps students with the entire admission process including subject selection, document verification, online registration, and exam preparation." } },
                { "@type": "Question", "name": "How can I take NIOS admission in Indra Nagar Lucknow with coaching support?", "acceptedAnswer": { "@type": "Answer", "text": "Students can easily complete NIOS admission in Indra Nagar Lucknow with coaching guidance by visiting SS Coaching, where experts help with registration, subject selection, and document verification." } },
                { "@type": "Question", "name": "How can I get NIOS admission in Alambagh Lucknow with coaching support?", "acceptedAnswer": { "@type": "Answer", "text": "Students can take NIOS admission in Alambagh Lucknow with coaching support by visiting SS Coaching, where teachers guide them through the registration process, subject selection, and exam preparation." } },
                { "@type": "Question", "name": "Who should join NIOS coaching in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Students who could not complete their studies through regular schooling should join NIOS coaching in Lucknow. This includes students who failed in board exams, school dropouts, working students, or learners looking for a flexible education system that allows them to complete education at their own pace." } },
                { "@type": "Question", "name": "Is NIOS coaching available for both 10th and 12th classes in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, SS Coaching provides NIOS coaching for both 10th and 12th classes in Lucknow with subject-wise teaching and exam preparation support." } },
                { "@type": "Question", "name": "Is NIOS valid and recognised by the Government of India?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. NIOS — National Institute of Open Schooling — is fully recognised by the Ministry of Education, Government of India. A NIOS Class 10 or Class 12 certificate carries equal value to CBSE, ICSE, or any State Board certificate for college admissions, government jobs, and competitive exams. SS Coaching has been guiding students through NIOS board preparation for over 25 years with proven results." } },
                { "@type": "Question", "name": "Can a failed student take admission in NIOS?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. NIOS is specifically designed for students who have failed in Class 10 or Class 12 from any recognised board. Failed students can enroll in NIOS, choose their subjects, and clear their board exam without repeating the entire year. SS Coaching has helped 100,000+ failed and dropout students successfully complete their NIOS certification across Lucknow." } },
                { "@type": "Question", "name": "What is the last date for NIOS admission?", "acceptedAnswer": { "@type": "Answer", "text": "NIOS admission is open throughout the year. However, specific exam cycles have their own deadlines. With 25+ years of NIOS admission experience, SS Coaching counselors will confirm the current admission window immediately and ensure you never miss your exam cycle." } },
                { "@type": "Question", "name": "What is TMA in NIOS and is it compulsory?", "acceptedAnswer": { "@type": "Answer", "text": "TMA stands for Tutor Marked Assignment. It is mandatory for every NIOS subject and contributes marks to your final result. SS Coaching provides complete TMA guidance, solved samples, and submission support — backed by 25+ years of NIOS assignment expertise — so students never lose marks on assignments." } },
                { "@type": "Question", "name": "How many subjects do I need to pass in NIOS Class 10 and Class 12?", "acceptedAnswer": { "@type": "Answer", "text": "NIOS Secondary (Class 10) and Sr. Secondary (Class 12) students both need to pass 5 subjects to receive their certificate. SS Coaching's experienced faculty personally guides every student toward the most scoring and manageable subject combination based on their academic background." } },
                { "@type": "Question", "name": "Can I transfer subjects I already passed from CBSE or State Board to NIOS?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. NIOS allows Transfer of Credit (TOC) for up to 2 subjects already passed from recognised boards including CBSE, ICSE, and State Boards. SS Coaching counselors — with 25+ years of NIOS admission experience — help students correctly apply TOC and reduce their exam burden significantly." } },
                { "@type": "Question", "name": "How many times can I appear in NIOS board exams in a year?", "acceptedAnswer": { "@type": "Answer", "text": "NIOS conducts public examinations twice a year — in April and October. Students can choose their preferred exam cycle at the time of admission. SS Coaching's structured preparation classes ensure students are fully exam-ready well before every public examination date." } },
                { "@type": "Question", "name": "Does SS Coaching offer online NIOS classes?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. SS Coaching offers fully equipped online NIOS classes with high-tech smart coaching technology — giving students the same quality of learning from home as they would receive at our physical centres. Online students receive the same study materials, TMA support, and faculty guidance as classroom students." } },
                { "@type": "Question", "name": "What facilities does SS Coaching provide at its coaching centres?", "acceptedAnswer": { "@type": "Answer", "text": "SS Coaching's three centres — located at Hazratganj, Indiranagar, and Alambagh — offer fully air-conditioned, clean, and calm classrooms designed for distraction-free NIOS preparation. Each centre is equipped with high-tech smart teaching equipment, a dedicated student library, and experienced NIOS faculty — all at genuinely affordable fees accessible to every student." } },
                { "@type": "Question", "name": "Is a gap year a problem for NIOS admission?", "acceptedAnswer": { "@type": "Answer", "text": "No. NIOS has no age bar or gap year restriction for Secondary and Sr. Secondary admission. Students who dropped out years ago can still enroll and complete their board certification without any academic penalty. SS Coaching has successfully guided thousands of gap-year and overage students back into education over 25+ years." } },
                { "@type": "Question", "name": "Why should I choose SS Coaching for NIOS preparation in Lucknow?", "acceptedAnswer": { "@type": "Answer", "text": "SS Coaching brings together everything a NIOS student needs — 25+ years of experience, affordable fee structure, three prime location branches at Hazratganj, Indiranagar, and Alambagh, fully AC smart classrooms, online classes with high-tech equipment, NIOS-specific study materials, TMA support, and a proven track record of 100,000+ students passed. No other NIOS coaching centre in Lucknow offers this complete combination." } }
              ]
            })
          }}
        />
      </Head>

      <section className="faq-section">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <section className="faq-area-page">
          <div className="container">
            <div className="faq-container">
              <h2 className="faq-title">
                <span className="highlight">FAQ&apos;s</span>
              </h2>
              <p className="faq-subtitle">
                Everything failed students, dropouts, and private candidates ask
                before joining SS Coaching — Lucknow&apos;s most trusted NIOS
                coaching centre with 25+ years of experience.
              </p>

              <div className="faq-list">
                {faqs.length === 0 ? (
                  <p className="text-center text-muted py-4">Loading FAQs…</p>
                ) : (
                  faqs.map((item, index) => (
                    <div
                      key={item._id || index}
                      className={`faq-item ${openIndex === index ? "expanded" : ""}`}
                    >
                      <div
                        className="faq-question d-flex justify-content-between align-items-center"
                        onClick={() => toggle(index)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="faq-question-text">{item.question}</div>
                        <div className="faq-icon">
                          {openIndex === index ? (
                            <AiOutlineClose size={26} />
                          ) : (
                            <AiOutlinePlus size={26} />
                          )}
                        </div>
                      </div>
                      {openIndex === index && (
                        <div className="faq-answer mt-2">
                          {/<\/?[a-z][\s\S]*>/i.test(item.answer) ? (
                            <span dangerouslySetInnerHTML={{ __html: item.answer }} />
                          ) : (
                            item.answer
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
}
