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
            <span className="highlight">FAQ:</span>
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
                  1. Value of NIOS Board for IIT JEE, PMT, and government job
                  exams?
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
                    The value of NIOS Board for IIT JEE, PMT, and government job
                    exams is generally good, provided the student completes the
                    course properly and fulfills eligibility rules. Many
                    students choose NIOS admission in India because it offers
                    flexibility, recognized certification, and the ability to
                    prepare for competitive exams alongside schooling.
                  </p>

                  <h5 className="fw-bold mt-4">
                    1. Recognition of NIOS Board in India
                  </h5>

                  <p>
                    The National Institute of Open Schooling (NIOS) is approved
                    by the Government of India and recognized by major education
                    authorities like CBSE, state boards, and universities.
                    Because of this recognition:
                  </p>

                  <ul>
                    <li>NIOS certificates are valid for higher education</li>
                    <li>Accepted in most competitive exams</li>
                    <li>
                      Eligible for government jobs (where 10th/12th
                      qualification is required)
                    </li>
                  </ul>

                  <p>
                    Students taking NIOS admission in India can appear for
                    national-level exams without any problem if they meet the
                    subject requirements.
                  </p>

                  <h5 className="fw-bold mt-4">2. NIOS Board for IIT JEE</h5>

                  <p>
                    For Indian Institutes of Technology entrance exam (JEE),
                    NIOS students are eligible if:
                  </p>

                  <ul>
                    <li>
                      They pass 12th with Physics, Chemistry, and Mathematics
                    </li>
                    <li>
                      They meet percentage criteria (if applicable for the year)
                    </li>
                    <li>They appear from a recognized board like NIOS</li>
                  </ul>

                  <p>
                    Thousands of students prepare for JEE along with NIOS
                    admission in India because NIOS gives extra time for
                    self-study.
                  </p>

                  <p className="fw-bold">Advantage:</p>

                  <ul>
                    <li>Flexible exam schedule</li>
                    <li>More time for coaching</li>
                    <li>Valid certificate for JEE Main & Advanced</li>
                  </ul>

                  <h5 className="fw-bold mt-4">
                    3. NIOS Board for PMT / NEET (Medical Exams)
                  </h5>

                  <p>
                    For medical entrance exams like NEET (earlier PMT), NIOS is
                    accepted if:
                  </p>

                  <ul>
                    <li>Biology, Physics, Chemistry studied in 12th</li>
                    <li>Practical subjects completed</li>
                    <li>Certificate issued by NIOS</li>
                  </ul>

                  <p>
                    Many medical aspirants take NIOS admission in India to focus
                    fully on NEET preparation.
                  </p>

                  <p className="fw-bold">Important:</p>

                  <p>
                    Always check the latest eligibility rules from the exam
                    authority, because medical exams sometimes change subject
                    requirements.
                  </p>

                  <h5 className="fw-bold mt-4">
                    4. NIOS Board for Government Job Exams
                  </h5>

                  <p>NIOS is valid for most government jobs such as:</p>

                  <ul>
                    <li>SSC</li>
                    <li>Railways</li>
                    <li>Police</li>
                    <li>Army / Defence</li>
                    <li>State government jobs</li>
                    <li>Banking exams</li>
                  </ul>

                  <p>
                    Since NIOS is a government-recognized board, students with
                    NIOS admission in india can apply for jobs where
                    qualification is:
                  </p>

                  <ul>
                    <li>10th pass</li>
                    <li>12th pass</li>
                    <li>Graduation (after higher studies)</li>
                  </ul>

                  <h5 className="fw-bold mt-4">
                    5. Advantages of NIOS Admission in India for Competitive
                    Exams
                  </h5>

                  <ul>
                    <li>Flexible study schedule</li>
                    <li>No regular school pressure</li>
                    <li>More time for coaching</li>
                    <li>Valid for IIT, NEET, SSC, UPSC, etc</li>
                    <li>Government-approved certificate</li>
                  </ul>

                  <h5 className="fw-bold mt-4">6. Conclusion</h5>

                  <p>
                    The NIOS Board has good value for IIT JEE, PMT/NEET, and
                    government job exams as long as the student selects correct
                    subjects and follows eligibility rules. With proper
                    planning, NIOS admission in India can be a smart choice for
                    students who want to focus on competitive exam preparation.
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
                  2. Can I do 10th and 12th from NIOS at home?
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
                  <p>Yes, you can do both 10th and 12th from NIOS at home.</p>

                  <p>
                    The National Institute of Open Schooling (NIOS) is specially
                    designed for students who want flexible education. You can
                    study from home and appear for exams at your selected exam
                    center.
                  </p>

                  <h5 className="fw-bold mt-4">How It Works:</h5>

                  <p>
                    <strong>NIOS 10th admission</strong> – If you want to
                    complete your secondary education (Class 10), you can apply
                    online and prepare from home using self-study materials
                    provided by NIOS.
                  </p>

                  <p>
                    <strong>NIOS 12th admission</strong> – After completing 10th
                    (from any recognized board), you can enroll in Senior
                    Secondary (Class 12) and study from home.
                  </p>

                  <h5 className="fw-bold mt-4">Study Pattern:</h5>

                  <ul>
                    <li>Self-study books provided by NIOS</li>
                    <li>Online classes & support (optional)</li>
                    <li>Flexible exam attempts (Public Exams twice a year)</li>
                    <li>Choice of subjects</li>
                  </ul>

                  <h5 className="fw-bold mt-4">Who Can Apply?</h5>

                  <ul>
                    <li>School dropouts</li>
                    <li>Working students</li>
                    <li>Students who failed in regular board</li>
                    <li>Anyone who wants flexible education</li>
                  </ul>

                  <p>
                    So yes, you can comfortably complete NIOS 10th admission and
                    NIOS 12th admission from home without attending regular
                    school.
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
                  3. Can fail students continue study from NIOS?
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
                    Yes Fail students can absolutely continue their studies from
                    NIOS.
                  </p>

                  <h5 className="fw-bold mt-4">
                    National Institute of Open Schooling
                  </h5>

                  <p>
                    The National Institute of Open Schooling (NIOS) is specially
                    designed for students who could not continue regular
                    schooling due to failure, personal reasons, health issues,
                    or other challenges.
                  </p>

                  <h5 className="fw-bold mt-4">
                    Can Fail Students Take Admission?
                  </h5>

                  <p>Yes, 100%</p>

                  <ul>
                    <li>Students who failed in 9th, 10th, 11th, or 12th</li>
                    <li>
                      Students who failed in any board exam (CBSE, ICSE, State
                      Board, etc.)
                    </li>
                    <li>School dropouts</li>
                    <li>Working students</li>
                  </ul>

                  <p>
                    All can apply through NIOS admission in India and continue
                    their education without losing a year.
                  </p>

                  <h5 className="fw-bold mt-4">How It Helps Failed Students</h5>

                  <ul>
                    <li>Flexible study from home</li>
                    <li>Choose subjects as per comfort</li>
                    <li>Public exams twice a year</li>
                    <li>On-Demand Examination option</li>
                    <li>Valid certificate for jobs & college</li>
                  </ul>

                  <p>
                    If a student failed in 10th → They can apply for Secondary
                    Course (10th).
                  </p>

                  <p>
                    If failed in 12th → They can apply for Senior Secondary
                    Course (12th).
                  </p>

                  <h5 className="fw-bold mt-4">Is NIOS Certificate Valid?</h5>

                  <p>
                    Yes. NIOS is a Government of India recognized board. The
                    certificate is valid for:
                  </p>

                  <ul>
                    <li>College admission</li>
                    <li>Government jobs</li>
                    <li>Private sector jobs</li>
                    <li>Competitive exams</li>
                  </ul>

                  <p>So, if you failed in regular school, don’t worry</p>

                  <p>
                    You can restart your academic journey through NIOS admission
                    in India and complete your 10th or 12th successfully.
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
      4. Can I get a government job after NIOS?
    </div>
    <div className="faq-icon">
      {openIndex === 3 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
    </div>
  </div>

  {openIndex === 3 && (
    <div className="faq-answer mt-3">

      <p>
        Yes  You can get a government job after completing your studies from NIOS.
      </p>

      <h5 className="fw-bold mt-4">
        National Institute of Open Schooling
      </h5>

      <p>
        NIOS is a Government of India recognized board under the Ministry of Education. Its 10th and 12th certificates are valid across India for higher studies and government jobs.
      </p>

      <h5 className="fw-bold mt-4">
        Is NIOS Certificate Valid for Government Jobs?
      </h5>

      <p>
        Yes, absolutely
      </p>

      <p>
        Students who complete 10th or 12th from NIOS are eligible to apply for:
      </p>

      <ul>
        <li>SSC (Staff Selection Commission) exams</li>
        <li>Railway jobs</li>
        <li>Police recruitment</li>
        <li>Army / Defence exams</li>
        <li>State government jobs</li>
        <li>Banking exams (after 12th/Graduation eligibility)</li>
      </ul>

      <p>
        As long as the job notification mentions “recognized board,” NIOS students are eligible.
      </p>

      <h5 className="fw-bold mt-4">
        Important Points
      </h5>

      <ul>
        <li>NIOS certificate is valid all over India</li>
        <li>Accepted in central & state government jobs</li>
        <li>Eligible for college admission and competitive exams</li>
        <li>Flexible education for working or private students</li>
      </ul>

      <p>
        If you are planning for NIOS admission 2026, you can confidently continue your studies and prepare for government job exams without any issue.
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
      5. Why students choose NIOS admission in India?
    </div>
    <div className="faq-icon">
      {openIndex === 4 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
    </div>
  </div>

  {openIndex === 4 && (
    <div className="faq-answer mt-3">

      <h5 className="fw-bold mt-4">
        National Institute of Open Schooling
      </h5>

      <p>
        Students across the country choose open schooling for flexibility and a second chance to succeed. Here’s why many prefer it:
      </p>

      <h5 className="fw-bold mt-4">
        Why Students Choose NIOS Admission in India?
      </h5>

      <h6 className="fw-bold mt-3">
        Flexible Study System
      </h6>
      <p>
        Students can study from home at their own pace. There is no need to attend regular school daily.
      </p>

      <h6 className="fw-bold mt-3">
        Best Option for Failed Students
      </h6>
      <p>
        Those who failed in 9th, 10th, or 12th can restart their education without losing years.
      </p>

      <h6 className="fw-bold mt-3">
        Recognized & Valid Certificate
      </h6>
      <p>
        NIOS is a Government-recognized board. Its certificate is valid for college admissions, competitive exams, and government jobs.
      </p>

      <h6 className="fw-bold mt-3">
        On-Demand Examination
      </h6>
      <p>
        Students can appear in exams when they feel prepared through the On-Demand Examination system.
      </p>

      <h6 className="fw-bold mt-3">
        Suitable for Working & Private Students
      </h6>
      <p>
        Ideal for athletes, working professionals, homemakers, and students preparing for competitive exams.
      </p>

      <h6 className="fw-bold mt-3">
        Wide Subject Choice
      </h6>
      <p>
        Students can choose subjects according to their career goals and interests.
      </p>

      <h5 className="fw-bold mt-4">
        Planning for the Future?
      </h5>

      <p>
        If you are thinking about NIOS admission 2026, it can be a smart decision for flexible and recognized education in India.
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
