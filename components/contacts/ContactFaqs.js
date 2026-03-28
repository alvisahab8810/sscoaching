"use client";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

export default function ContactFaqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section contact-faqs">
      <div className="container">
        <div className="faq-container">

          <h2 className="faq-title">
            Frequently Asked Questions
          </h2>

          <div className="faq-list">

            {/* FAQ 1 */}
            <div className={`faq-item ${openIndex === 0 ? "expanded" : ""}`}>
              <div
                className="faq-question d-flex justify-content-between align-items-center"
                onClick={() => toggleFAQ(0)}
                style={{ cursor: "pointer" }}
              >
                <div className="faq-question-text fw-bold">
                  Where can I find a trusted NIOS Center in Lucknow?
                </div>
                <div className="faq-icon">
                  {openIndex === 0 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
                </div>
              </div>

              {openIndex === 0 && (
                <div className="faq-answer mt-3">
                  <p>
                    SS Coaching provides complete support for students who want to complete their Class 10th or 12th through NIOS. With expert guidance and a supportive environment, students can easily continue their education.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className={`faq-item ${openIndex === 1 ? "expanded" : ""}`}>
              <div
                className="faq-question d-flex justify-content-between align-items-center"
                onClick={() => toggleFAQ(1)}
                style={{ cursor: "pointer" }}
              >
                <div className="faq-question-text fw-bold">
                   How can I apply for NIOS Admission in Lucknow?
                </div>
                <div className="faq-icon">
                  {openIndex === 1 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
                </div>
              </div>

              {openIndex === 1 && (
                <div className="faq-answer mt-3">
                  <p>
                    You can apply by visiting our center or contacting our team. We guide you through registration, document submission, and subject selection to make the process simple and smooth.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className={`faq-item ${openIndex === 2 ? "expanded" : ""}`}>
              <div
                className="faq-question d-flex justify-content-between align-items-center"
                onClick={() => toggleFAQ(2)}
                style={{ cursor: "pointer" }}
              >
                <div className="faq-question-text fw-bold">
                   Is coaching necessary for NIOS students?
                </div>
                <div className="faq-icon">
                  {openIndex === 2 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
                </div>
              </div>

              {openIndex === 2 && (
                <div className="faq-answer mt-3">
                  <p>
                    While NIOS is flexible, proper coaching helps students understand the syllabus better, stay consistent, and perform well in exams with confidence.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className={`faq-item ${openIndex === 3 ? "expanded" : ""}`}>
              <div
                className="faq-question d-flex justify-content-between align-items-center"
                onClick={() => toggleFAQ(3)}
                style={{ cursor: "pointer" }}
              >
                <div className="faq-question-text fw-bold">
                   Is SS Coaching the NIOS head office in Lucknow?
                </div>
                <div className="faq-icon">
                  {openIndex === 3 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
                </div>
              </div>

              {openIndex === 3 && (
                <div className="faq-answer mt-3">
                  <p>
                    SS Coaching is not the official NIOS office. However, we provide complete admission guidance and coaching support for NIOS students.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 5 */}
            <div className={`faq-item ${openIndex === 4 ? "expanded" : ""}`}>
              <div
                className="faq-question d-flex justify-content-between align-items-center"
                onClick={() => toggleFAQ(4)}
                style={{ cursor: "pointer" }}
              >
                <div className="faq-question-text fw-bold">
                   Which areas do you cover in Lucknow?
                </div>
                <div className="faq-icon">
                  {openIndex === 4 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
                </div>
              </div>

              {openIndex === 4 && (
                <div className="faq-answer mt-3">
                  <p>
                    We have branches in Hazratganj, Indira Nagar, and Alambagh, making it easy for students across Lucknow to access our services.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 6 */}
            <div className={`faq-item ${openIndex === 5 ? "expanded" : ""}`}>
              <div
                className="faq-question d-flex justify-content-between align-items-center"
                onClick={() => toggleFAQ(5)}
                style={{ cursor: "pointer" }}
              >
                <div className="faq-question-text fw-bold">
                   Who can take admission in NIOS?
                </div>
                <div className="faq-icon">
                  {openIndex === 5 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
                </div>
              </div>

              {openIndex === 5 && (
                <div className="faq-answer mt-3">
                  <p>
                    NIOS is ideal for students who want a flexible learning system, including those continuing studies after a gap or preparing for competitive exams.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 7 */}
            <div className={`faq-item ${openIndex === 6 ? "expanded" : ""}`}>
              <div
                className="faq-question d-flex justify-content-between align-items-center"
                onClick={() => toggleFAQ(6)}
                style={{ cursor: "pointer" }}
              >
                <div className="faq-question-text fw-bold">
                   Can I prepare for competitive exams along with NIOS?
                </div>
                <div className="faq-icon">
                  {openIndex === 6 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
                </div>
              </div>

              {openIndex === 6 && (
                <div className="faq-answer mt-3">
                  <p>
                    Yes, NIOS allows students to manage their time effectively, making it easier to prepare for exams like JEE, NEET, CLAT, and more alongside board studies.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}