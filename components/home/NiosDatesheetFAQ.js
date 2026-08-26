"use client";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const faqData = [
  {
    q: "When will NIOS release the October 2026 theory exam date sheet?",
    a: "NIOS is expected to release the official theory exam date sheet for the October 2026 session in September 2026. The board publishes it as a downloadable PDF on its official websites, sdmis.nios.ac.in and nios.ac.in, listing subject-wise dates, exam timings, and reporting instructions for both Class 10 and Class 12 students. Students should keep checking the official portal from early September onward, since the exact release date is announced through a public notice a few days in advance.",
  },
  {
    q: "What are the NIOS Class 10 October 2026 exam dates?",
    a: "The NIOS Class 10 theory exams for the October 2026 session are expected to run from October 14 to November 18, 2026. Major subjects include Hindi on October 24, Mathematics on October 30, Social Science on November 3, and English on November 11. Regional languages such as Bengali, Marathi, Telugu, and Gujarati are scheduled together on October 16. The full subject-wise schedule is listed in the date sheet table above.",
  },
  {
    q: "What are the NIOS Class 12 October 2026 exam dates?",
    a: "The NIOS Class 12 theory exams for the October 2026 session are expected to run from October 14 to November 18, 2026, similar to Class 10 but with a different subject-date mapping. Key subjects include Geography on October 16, Chemistry on October 29, English on October 31, Physics on November 6, and Mathematics on November 11. Vocational and skill-based subjects such as Housekeeping and Web Development are scheduled on the final exam date, November 18.",
  },
  {
    q: "When are the NIOS practical exams for the October 2026 session?",
    a: "NIOS practical exams for the October 2026 session are expected to be conducted in four batches between September 12 and September 27, 2026. Science subjects like Physics, Chemistry, and Biology are typically held early in this window (September 12–19), while vocational subjects such as Computer Applications, Web Development, and Beauty & Wellness courses are scheduled in the later batches (September 20–27). Students must clear their practical exams before appearing for the corresponding theory papers.",
  },
  {
    q: "What is the exam timing for NIOS October 2026 theory exams?",
    a: "NIOS theory exams are conducted from 2:15 PM to 5:30 PM. Students get an additional 15 minutes of reading time, generally from 2:15 PM to 2:30 PM, to go through the question paper before they can start writing answers. Candidates are advised to reach the exam centre at least 30 minutes before the reporting time to complete verification and be seated on time.",
  },
  {
    q: "When will the NIOS admit card for the October 2026 session be released?",
    a: "The NIOS theory exam admit card for the October 2026 session is expected to be released in October 2026, shortly before the exams begin. The practical exam admit card is released earlier, in September 2026. Students can download both admit cards from the official NIOS student login portal, sdmis.nios.ac.in, using their enrollment number and date of birth.",
  },
  {
    q: "What is the last date to apply for the NIOS October 2026 session?",
    a: "The last date to submit the NIOS admission form for the October 2026 session is typically around March 15, 2026. Since NIOS occasionally extends this deadline or opens a late registration window with an additional fee, students should confirm the exact date through the official notification on nios.ac.in before the session closes, rather than relying solely on the previous year's timeline.",
  },
  {
    q: "When will the NIOS October 2026 exam results be declared?",
    a: "NIOS is expected to declare the results for the October–November 2026 session in December 2026. Results for both Class 10 and Class 12 are usually announced on the same day and can be checked on the official results portal, results.nios.ac.in, using the student's roll number. A physical marksheet is issued later through the respective regional NIOS study centre.",
  },
  {
    q: "Are NIOS Class 10 and Class 12 October exam dates the same?",
    a: "No, NIOS Class 10 and Class 12 exams follow separate subject-wise date sheets, even though both are conducted within the same overall period from mid-October to mid-November. A subject common to both classes, such as Mathematics or English, is usually scheduled on a different date for Class 10 than for Class 12, so students must check the specific date sheet for their class rather than assuming the schedules match.",
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
