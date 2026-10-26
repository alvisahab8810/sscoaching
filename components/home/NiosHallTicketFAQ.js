"use client";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const faqData = [
  {
    q: "Has the NIOS hall ticket for October 2026 been released?",
    a: "Yes. The NIOS hall ticket for the October–November 2026 public examination has been released. Both the theory hall ticket and the practical hall ticket can now be downloaded from the NIOS Student Portal at sdmis.nios.ac.in using your enrollment number.",
  },
  {
    q: "How do I download the NIOS theory and practical hall ticket 2026?",
    a: "Open sdmis.nios.ac.in, enter your 12-digit enrollment number, choose either Hall Ticket for Theory Examination or Hall Ticket for Practical Examination from the Hall Ticket Type dropdown, and click Submit. Download and print both hall tickets separately.",
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
    a: "Yes, they are two separate documents on the portal. Select Hall Ticket for Theory Examination for your written papers and Hall Ticket for Practical Examination for your practical exams, and carry a printed copy of each to the respective exam.",
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
