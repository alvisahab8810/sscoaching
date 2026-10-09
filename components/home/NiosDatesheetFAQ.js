"use client";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const faqData = [
  {
    q: "When will NIOS release the October 2026 theory exam date sheet?",
    a: "NIOS released the official theory exam date sheet for the October 2026 session on 08 October 2026 through Notification No. 63/2026. It is available as a downloadable PDF on the official websites, sdmis.nios.ac.in and nios.ac.in, listing subject-wise dates, exam timings, and reporting instructions for both Class 10th and Class 12th students. The same official schedule is reproduced in the date sheet tables on this page.",
  },
  {
    q: "What are the NIOS Class 10th October 2026 exam dates?",
    a: "As per the official date sheet, the NIOS Class 10th theory exams for the October 2026 session will run from 22 October to 07 December 2026. Major subjects include Psychology on 04 November, Mathematics on 05 November, Science on 06 November, English on 12 November, Business Studies on 17 November, Hindi on 18 November, Economics on 20 November, Social Science on 21 November and Urdu on 26 November 2026. Regional languages such as Bengali, Marathi, Telugu, and Gujarati are scheduled together on 28 October 2026. The full subject-wise schedule is listed in the date sheet table above.",
  },
  {
    q: "What are the NIOS Class 12th October 2026 exam dates?",
    a: "As per the official date sheet, the NIOS Class 12th theory exams for the October 2026 session will run from 22 October to 05 December 2026, with a different subject-date mapping from Class 10th. Key subjects include Geography on 24 October, English on 28 October, Mathematics on 31 October, Physics and History on 02 November, Hindi on 04 November, Biology and Accountancy on 05 November, Business Studies on 06 November, Chemistry and Political Science on 17 November and Economics on 21 November 2026. Vocational and skill-based subjects such as House Keeping and Web Development are scheduled on 01 December 2026.",
  },
  {
    q: "When are the NIOS practical exams for the October 2026 session?",
    a: "The NIOS practical exams for the October 2026 session will be conducted from 14 September to 29 September 2026 at designated AI/Practical Examination Centres for Secondary and Senior Secondary students. The practical exams are divided into four batches: 14–17 September, 18–21 September, 22–25 September, and 26–29 September 2026. Students should contact their study centre or examination centre to confirm their allotted practical exam date and batch.",
  },
  {
    q: "What is the exam timing for NIOS October 2026 theory exams?",
    a: "All NIOS October 2026 theory exams begin at 2:30 PM, with 15 minutes of reading time given before that (generally 2:15 PM to 2:30 PM) to go through the question paper. Most papers run from 2:30 PM to 5:30 PM, while some papers end at 4:00 PM, 4:30 PM or 5:00 PM - the exact end time for each subject is shown in the date sheet tables above. Candidates are advised to reach the exam centre at least 30 minutes before the reporting time to complete verification and be seated on time.",
  },
  {
    q: "When will the NIOS admit card for the October 2026 session be released?",
    a: "The NIOS theory exam admit card (Intimation cum Hall Ticket) for the October 2026 session is released in October 2026, shortly before the exams begin on 22 October 2026. The practical exam admit card was released earlier, in September 2026. Students can download both admit cards from the official NIOS student login portal, sdmis.nios.ac.in, using their enrollment number and date of birth.",
  },
  {
    q: "What is the last date to apply for the NIOS October 2026 session?",
    a: "The last date to submit the NIOS admission form for the October 2026 session is typically around March 15, 2026. Since NIOS occasionally extends this deadline or opens a late registration window with an additional fee, students should confirm the exact date through the official notification on nios.ac.in before the session closes, rather than relying solely on the previous year's timeline.",
  },
  {
    q: "When will the NIOS October 2026 exam results be declared?",
    a: "NIOS is expected to declare the results for the October–November 2026 session about 7 weeks after the last examination, i.e. around January 2027. Results for both Class 10th and Class 12th are usually announced on the same day and can be checked on the official results portal, results.nios.ac.in, using the student's roll number. A physical marksheet is issued later through the respective regional NIOS study centre.",
  },
  {
    q: "Are NIOS Class 10th and Class 12th October exam dates the same?",
    a: "No, NIOS Class 10th and Class 12th exams follow separate subject-wise date sheets, even though both are conducted within the same overall period from late October to early December. A subject common to both classes, such as Mathematics or English, is usually scheduled on a different date for Class 10th than for Class 12th, so students must check the specific date sheet for their class rather than assuming the schedules match.",
  },
  {
    q: "Can NIOS October 2026 exam dates change after the date sheet is released?",
    a: "Yes, NIOS date sheets can be revised after their initial release due to reasons such as state elections, natural events, or administrative rescheduling in specific regions. In past sessions, NIOS has postponed exams for particular states while keeping the schedule unchanged for the rest of the country. Students should treat the published date sheet as authoritative but keep checking the official NIOS website and their registered email/SMS alerts for any last-minute revisions closer to the exam dates.",
  },
];

export default function NiosDatesheetFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="faq-section" id="nios-datesheet-faq">
      <div className="faq-container">
        <h2 className="faq-title">
          <span className="highlight">FAQs</span>
        </h2>
        <p className="faq-subtitle">
          Common questions students ask about the NIOS October/November 2026 date sheet, exam timings, admit card and results.
        </p>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "expanded" : ""}`}
            >
              <div
                className="faq-question d-flex justify-content-between align-items-center"
                onClick={() => toggle(index)}
                style={{ cursor: "pointer" }}
              >
                <div className="faq-question-text">{item.q}</div>
                <div className="faq-icon">
                  {openIndex === index ? (
                    <AiOutlineClose size={26} />
                  ) : (
                    <AiOutlinePlus size={26} />
                  )}
                </div>
              </div>
              {openIndex === index && (
                <div className="faq-answer mt-2">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
