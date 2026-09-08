"use client";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const faqData = [
  {
    q: "Has the NIOS practical hall ticket for October 2026 been released?",
    a: "No. The NIOS practical exam dates for October–November 2026 have been announced, but the practical hall ticket has not been released yet. It is expected shortly before the practical exams begin at your study centre.",
  },
  {
    q: "When will the NIOS theory hall ticket 2026 be released?",
    a: "The NIOS theory hall ticket for the October–November 2026 session is expected in the last week of September 2026, a few days before theory exams start.",
  },
  {
    q: "Where can I download the NIOS Hall Ticket 2026?",
    a: "You can download it only from the official NIOS Student Portal at sdmis.nios.ac.in using your enrollment number. NIOS does not send hall tickets by post or email.",
  },
  {
    q: "What details do I need to download the NIOS hall ticket?",
    a: "You only need your 12-digit NIOS enrollment number. Your exam fee must be paid and your photograph updated with NIOS for the hall ticket to generate.",
  },
  {
    q: "Is the NIOS practical hall ticket different from the theory hall ticket?",
    a: "Yes. Students should carry a printed copy of their hall ticket to the examination centre along with the required identification documents.",
  },
  {
    q: "What if my NIOS hall ticket is not generating?",
    a: "This usually means your exam fee is unpaid or your photograph is missing from NIOS records. Contact your Regional Centre or study centre immediately.",
  },
  {
    q: "Is it compulsory to carry the NIOS hall ticket to the exam?",
    a: "Yes. NIOS does not permit any candidate to enter the theory or practical exam hall without a printed hall ticket, so carry it along with a valid photo ID.",
  },
  {
    q: "Can I get my NIOS hall ticket corrected if there is a mistake?",
    a: "Yes. If you notice any discrepancy in your name, subjects, photograph, or exam centre on your hall ticket, report it to your study centre or NIOS Regional Centre immediately for correction before your exam date.",
  },
];

export default function NiosHallTicketFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="faq-section" id="nios-hall-ticket-faq">
      <div className="faq-container">
        <h2 className="faq-title">
          <span className="highlight">FAQ&apos;s</span>
        </h2>
        <p className="faq-subtitle">
          Common questions students ask about the NIOS October/November 2026 hall ticket, download steps and admit card issues.
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
