"use client";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

export default function Stream1Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section stream-1-faq">
      <div className="container">
        <div className="faq-container">
          <h2 className="faq-title">
            <span className="highlight">FAQs:</span>
          </h2>

          <div className="faq-list">
            {/* ================= FAQ 1 ================= */}

            <div className={`faq-item ${openIndex === 0 ? "expanded" : ""}`}>
              <div
                className="faq-question d-flex justify-content-between align-items-center"
                onClick={() => toggleFAQ(0)}
                style={{ cursor: "pointer" }}
              >
                <div className="faq-question-text fw-bold">
                 Is NIOS valid for government jobs?

                </div>
                <div className="faq-icon">
                  {openIndex === 0 ? (
                    <AiOutlineClose size={26} />
                  ) : (
                    <AiOutlinePlus size={26} />
                  )}
                </div>
              </div>

              {openIndex === 0 && (
                <div className="faq-answer mt-3">
                  <p>
                   Yes, NIOS certificates are recognized by the Government of India and are valid for government jobs, higher education, and competitive exams.

                  </p>

                
                </div>
              )}
            </div>

            {/* ================= FAQ 2 ================= */}

            <div className={`faq-item ${openIndex === 1 ? "expanded" : ""}`}>
              <div
                className="faq-question d-flex justify-content-between align-items-center"
                onClick={() => toggleFAQ(1)}
                style={{ cursor: "pointer" }}
              >
                <div className="faq-question-text  fw-bold">
                   Who can apply for NIOS admission in Lucknow?

                </div>
                <div className="faq-icon">
                  {openIndex === 1 ? (
                    <AiOutlineClose size={26} />
                  ) : (
                    <AiOutlinePlus size={26} />
                  )}
                </div>
              </div>

              {openIndex === 1 && (
                <div className="faq-answer mt-3">

                  <p>
                    Students who want to complete their 10th or 12th education, including school dropouts and working students, can apply for NIOS admission in Lucknow.

                  </p>

                 
                </div>
              )}
            </div>

            {/* ================= FAQ 3 ================= */}

            <div className={`faq-item ${openIndex === 2 ? "expanded" : ""}`}>
              <div
                className="faq-question d-flex justify-content-between align-items-center"
                onClick={() => toggleFAQ(2)}
                style={{ cursor: "pointer" }}
              >
                <div className="faq-question-text  fw-bold">
                 How long does NIOS admission take?

                </div>
                <div className="faq-icon">
                  {openIndex === 2 ? (
                    <AiOutlineClose size={26} />
                  ) : (
                    <AiOutlinePlus size={26} />
                  )}
                </div>
              </div>

              {openIndex === 2 && (
                <div className="faq-answer mt-3">
                  <p>
                    The admission process is usually completed within a few days once all documents are submitted and the online form is approved.

                  </p>

                 
                </div>
              )}
            </div>


            {/* ================= FAQ 4 ================= */}

<div className={`faq-item ${openIndex === 3 ? "expanded" : ""}`}>
  <div
    className="faq-question d-flex justify-content-between align-items-center"
    onClick={() => toggleFAQ(3)}
    style={{ cursor: "pointer" }}
  >
    <div className="faq-question-text  fw-bold">
     Can I take coaching with NIOS admission?
    </div>
    <div className="faq-icon">
      {openIndex === 3 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
    </div>
  </div>

  {openIndex === 3 && (
    <div className="faq-answer mt-3">

      <p>
       Yes, many institutes provide NIOS Coaching and Admission in Lucknow to help students prepare better for their exams.

      </p>

      

    </div>
  )}
</div>



{/* ================= FAQ 5 ================= */}

<div className={`faq-item ${openIndex === 4 ? "expanded" : ""}`}>
  <div
    className="faq-question d-flex justify-content-between align-items-center"
    onClick={() => toggleFAQ(4)}
    style={{ cursor: "pointer" }}
  >
    <div className="faq-question-text  fw-bold">
       Is NIOS easier than regular school?

    </div>
    <div className="faq-icon">
      {openIndex === 4 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
    </div>
  </div>

  {openIndex === 4 && (
    <div className="faq-answer mt-3">

  

      <p>
        NIOS provides flexible learning and multiple exam opportunities, which makes it easier for many students to complete their education.

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
