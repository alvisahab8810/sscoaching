"use client";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

export default function Stream3and4Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-container">

          <h2 className="faq-title">
            Frequently Asked Questions (NIOS Registration 2026)
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
                   What is NIOS Registration?
                </div>
                <div className="faq-icon">
                  {openIndex === 0 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
                </div>
              </div>

              {openIndex === 0 && (
                <div className="faq-answer mt-3">
                  <p>
                    NIOS Registration is the process of enrolling in the National Institute of Open Schooling to complete 10th or 12th education through open and flexible learning.
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
                   What is the NIOS Registration 2026 last date?
                </div>
                <div className="faq-icon">
                  {openIndex === 1 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
                </div>
              </div>

              {openIndex === 1 && (
                <div className="faq-answer mt-3">
                  <p>
                    The NIOS Registration 2026 last date usually falls around July for Block 1 admission and January for Block 2 admission.
                  </p>
                  <p>
                    Students should apply early to avoid late fees and ensure smooth admission.
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
                   Can I apply for NIOS Registration online?
                </div>
                <div className="faq-icon">
                  {openIndex === 2 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
                </div>
              </div>

              {openIndex === 2 && (
                <div className="faq-answer mt-3">
                  <p>
                    Yes, students can complete NIOS Online Registration 2026 through the official admission portal or with the help of a registered coaching institute.
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
                   Who can apply for NIOS 10th Class Registration 2026?
                </div>
                <div className="faq-icon">
                  {openIndex === 3 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
                </div>
              </div>

              {openIndex === 3 && (
                <div className="faq-answer mt-3">
                  <p>
                    Students who are at least 14 years old and have basic education up to Class 8 can apply for NIOS 10th Class Registration 2026.
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
                   Is NIOS 12th valid for college admission?
                </div>
                <div className="faq-icon">
                  {openIndex === 4 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
                </div>
              </div>

              {openIndex === 4 && (
                <div className="faq-answer mt-3">
                  <p>
                    Yes, NIOS 12th is completely valid for college admission, government jobs, and competitive exams because NIOS is a recognized national board.
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


// "use client";
// import React, { useState } from "react";
// import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

// export default function Stream3and4Faqs() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <section className="faq-section">
//       <div className="container">
//         <div className="faq-container">

//           <h2 className="faq-title">
//             <span className="highlight">FAQ:</span>
//           </h2>

//           <div className="faq-list">

// {/* ================= FAQ 1 ================= */}

// <div className={`faq-item ${openIndex === 0 ? "expanded" : ""}`}>
//   <div
//     className="faq-question d-flex justify-content-between align-items-center"
//     onClick={() => toggleFAQ(0)}
//     style={{ cursor: "pointer" }}
//   >
//     <div className="faq-question-text  fw-bold">
//       1. What is NIOS ODE registration and how does it work?
//     </div>
//     <div className="faq-icon">
//       {openIndex === 0 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
//     </div>
//   </div>

//   {openIndex === 0 && (
//     <div className="faq-answer mt-3">

//       <h5 className="fw-bold">National Institute of Open Schooling</h5>

//       <h5 className="fw-bold mt-3">
//         What Is NIOS ODE Registration and How Does It Work?
//       </h5>

//       <p>
//         NIOS ODE registration refers to the On-Demand Examination (ODE) system introduced by NIOS. It allows students to appear for exams when they feel fully prepared, instead of waiting for fixed board exam dates.
//       </p>

//       <h6 className="fw-bold mt-3">What Is NIOS ODE?</h6>
//       <p>NIOS ODE (On-Demand Examination) is a flexible exam system where students can:</p>

//       <ul>
//         <li>Choose their exam date</li>
//         <li>Select subject(s)</li>
//         <li>Appear for the exam as per availability of seats</li>
//         <li>Improve marks if needed</li>
//       </ul>

//       <p>
//         It is available for both Secondary (10th) and Senior Secondary (12th) courses at selected exam centers.
//       </p>

//       <h6 className="fw-bold mt-3">How Does NIOS ODE Registration Work?</h6>

//       <ul>
//         <li>Login to Official Portal</li>
//         <li>Fill ODE Application Form</li>
//         <li>Choose Exam Date</li>
//         <li>Pay Exam Fees</li>
//         <li>Download Hall Ticket</li>
//       </ul>

//       <h6 className="fw-bold mt-3">Who Can Apply for NIOS ODE Registration?</h6>
//       <ul>
//         <li>Already enrolled NIOS students</li>
//         <li>Students who want to improve marks</li>
//         <li>Students who failed in one or more subjects</li>
//         <li>Students who want early result instead of waiting for public exams</li>
//       </ul>

//       <h6 className="fw-bold mt-3">Key Benefits</h6>
//       <ul>
//         <li>No need to wait for board exam schedule</li>
//         <li>Faster result declaration</li>
//         <li>Flexible and student-friendly system</li>
//       </ul>

//     </div>
//   )}
// </div>

// {/* ================= FAQ 2 ================= */}

// <div className={`faq-item ${openIndex === 1 ? "expanded" : ""}`}>
//   <div
//     className="faq-question d-flex justify-content-between align-items-center"
//     onClick={() => toggleFAQ(1)}
//     style={{ cursor: "pointer" }}
//   >
//     <div className="faq-question-text  fw-bold">
//      2. What is the difference between online NIOS registration and NIOS ODE registration?
//     </div>
//     <div className="faq-icon">
//       {openIndex === 1 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
//     </div>
//   </div>

//   {openIndex === 1 && (
//     <div className="faq-answer mt-3">

//       <h5 className="fw-bold">National Institute of Open Schooling</h5>

//       <p>
//         Many students get confused between Online NIOS registration and NIOS ODE registration. Both are different processes and serve different purposes.
//       </p>

//       <h5 className="fw-bold mt-3">
//         Difference Between Online NIOS Registration and NIOS ODE Registration
//       </h5>

//       <h6 className="fw-bold mt-3">Online NIOS Registration</h6>
//       <ul>
//         <li>Online NIOS registration is the admission process.</li>
//         <li>It is used when a student wants to take fresh admission in 10th (Secondary Course) or 12th (Senior Secondary Course).</li>
//         <li>Includes filling admission form, uploading documents, selecting subjects, and paying course fees.</li>
//       </ul>

//       <h6 className="fw-bold mt-3">NIOS ODE Registration</h6>
//       <ul>
//         <li>NIOS ODE registration is for the On-Demand Examination system.</li>
//         <li>Used by already enrolled students.</li>
//         <li>Includes selecting subject, choosing exam date, paying exam fee, and appearing for exam.</li>
//       </ul>

//       <h5 className="fw-bold mt-4">Simple Comparison</h5>

//       <div className="table-responsive mt-3">
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Point</th>
//               <th>Online NIOS Registration</th>
//               <th>NIOS ODE Registration</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Purpose</td>
//               <td>New Admission</td>
//               <td>Exam Booking</td>
//             </tr>
//             <tr>
//               <td>Who Can Apply</td>
//               <td>New Students</td>
//               <td>Enrolled Students</td>
//             </tr>
//             <tr>
//               <td>Includes</td>
//               <td>Subjects + Course Enrollment</td>
//               <td>Subject-wise Exam</td>
//             </tr>
//             <tr>
//               <td>Timing</td>
//               <td>During Admission Session</td>
//               <td>Anytime (Seat Availability)</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <h6 className="fw-bold mt-3">Conclusion</h6>
//       <p>
//         Choose Online NIOS registration if you want to take admission in 10th or 12th.
//         Choose NIOS ODE registration if you are already enrolled and want to appear in On-Demand exams.
//       </p>

//     </div>
//   )}
// </div>

// {/* ================= FAQ 3 ================= */}

// <div className={`faq-item ${openIndex === 2 ? "expanded" : ""}`}>
//   <div
//     className="faq-question d-flex justify-content-between align-items-center"
//     onClick={() => toggleFAQ(2)}
//     style={{ cursor: "pointer" }}
//   >
//     <div className="faq-question-text  fw-bold">
//       3. Can 10th fail students apply for online NIOS registration?
//     </div>
//     <div className="faq-icon">
//       {openIndex === 2 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
//     </div>
//   </div>

//   {openIndex === 2 && (
//     <div className="faq-answer mt-3">

//       <h5 className="fw-bold">National Institute of Open Schooling</h5>

//       <p>
//         Yes  10th fail students can apply for Online NIOS registration.
//       </p>

//       <p>
//         NIOS is specially designed to give students a second chance to complete their education without losing valuable time.
//       </p>

//       <h5 className="fw-bold mt-3">
//         Can 10th Fail Students Apply for Online NIOS Registration?
//       </h5>

//       <p className="fw-bold">Yes, 100% Eligible</p>

//       <p>Students who:</p>
//       <ul>
//         <li>Failed in Class 10</li>
//         <li>Failed in one or more subjects</li>
//         <li>Dropped out of school</li>
//         <li>Want flexible study options</li>
//       </ul>

//       <p>
//         can apply through Online NIOS registration and continue their education.
//       </p>

//       <h5 className="fw-bold mt-3">What Are the Options for 10th Fail Students?</h5>

//       <p className="fw-bold">
//         Option 1: Fresh Admission in 10th (Secondary Course)
//       </p>
//       <p>
//         If a student failed completely, they can take fresh admission in 10th through Online NIOS registration and reappear for all required subjects.
//       </p>

//       <p className="fw-bold mt-3">
//         Option 2: Improvement / Transfer of Credit (If Eligible)
//       </p>
//       <p>
//         If a student passed some subjects from a recognized board, they may transfer eligible subjects as per NIOS rules.
//       </p>

//       <h6 className="fw-bold mt-3">Benefits for 10th Fail Students</h6>
//       <ul>
//         <li>Study from home</li>
//         <li>Flexible exam schedule</li>
//         <li>On-Demand Examination option</li>
//         <li>Government-recognized certificate</li>
//         <li>Valid for 12th admission, jobs & competitive exams</li>
//       </ul>

//       <h6 className="fw-bold mt-3">Conclusion</h6>
//       <p>
//         So yes, 10th fail students can confidently apply through Online NIOS registration and restart their academic journey.
//       </p>

//     </div>
//   )}
// </div>



// {/* ================= FAQ 4 ================= */}

// <div className={`faq-item ${openIndex === 3 ? "expanded" : ""}`}>
//   <div
//     className="faq-question d-flex justify-content-between align-items-center"
//     onClick={() => toggleFAQ(3)}
//     style={{ cursor: "pointer" }}
//   >
//     <div className="faq-question-text  fw-bold">
//       4. Is NIOS ODE registration valid for college admission?
//     </div>
//     <div className="faq-icon">
//       {openIndex === 3 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
//     </div>
//   </div>

//   {openIndex === 3 && (
//     <div className="faq-answer mt-3">

//       <h5 className="fw-bold">National Institute of Open Schooling</h5>

//       <p>
//         Yes  NIOS ODE registration is valid for college admission, provided you complete your required subjects and receive a passing certificate from NIOS.
//       </p>

//       <h5 className="fw-bold mt-3">
//         Is NIOS ODE Registration Valid for College Admission?
//       </h5>

//       <p>
//         NIOS ODE registration refers to the On-Demand Examination system, where students can appear for exams when they are fully prepared instead of waiting for public exam dates.
//       </p>

//       <p>Once you:</p>
//       <ul>
//         <li>Pass all required subjects</li>
//         <li>Meet minimum marks criteria</li>
//         <li>Receive your official NIOS marksheet & certificate</li>
//       </ul>

//       <p>
//         You are eligible to apply for colleges and universities across India.
//       </p>

//       <h6 className="fw-bold mt-3">Important Points for College Admission</h6>
//       <ul>
//         <li>NIOS is a Government-recognized board</li>
//         <li>ODE certificate is the same as Public Exam certificate</li>
//         <li>Accepted by most universities (as per eligibility rules)</li>
//         <li>Valid for undergraduate courses (after 12th completion)</li>
//       </ul>

//       <h6 className="fw-bold mt-3">Note</h6>
//       <p>
//         For some professional courses (like engineering, medical, etc.), eligibility may depend on:
//       </p>
//       <ul>
//         <li>Subject combination</li>
//         <li>Minimum percentage</li>
//         <li>Entrance exam qualification</li>
//       </ul>

//       <h6 className="fw-bold mt-3">Conclusion</h6>
//       <p>
//         Yes, NIOS ODE registration is fully valid for college admission as long as you successfully complete your course and receive the official certificate.
//       </p>

//     </div>
//   )}
// </div>



// {/* ================= FAQ 5 ================= */}

// <div className={`faq-item ${openIndex === 4 ? "expanded" : ""}`}>
//   <div
//     className="faq-question d-flex justify-content-between align-items-center"
//     onClick={() => toggleFAQ(4)}
//     style={{ cursor: "pointer" }}
//   >
//     <div className="faq-question-text  fw-bold">
//       5. Is NIOS ODE registration good for fast results?
//     </div>
//     <div className="faq-icon">
//       {openIndex === 4 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
//     </div>
//   </div>

//   {openIndex === 4 && (
//     <div className="faq-answer mt-3">

//       <h5 className="fw-bold">National Institute of Open Schooling</h5>

//       <p>
//         Yes  NIOS ODE registration is a good option if you want fast results.
//       </p>

//       <h5 className="fw-bold mt-3">
//         Is NIOS ODE Registration Good for Fast Result?
//       </h5>

//       <p>
//         NIOS ODE registration (On-Demand Examination) is specially designed for students who do not want to wait for regular public exam sessions.
//       </p>

//       <h6 className="fw-bold mt-3">Why It Is Faster:</h6>
//       <ul>
//         <li>You can choose your exam date</li>
//         <li>No need to wait for April/October public exams</li>
//         <li>Results are usually declared earlier compared to regular exams</li>
//         <li>Ideal for urgent college admission or job requirements</li>
//       </ul>

//       <h6 className="fw-bold mt-3">Who Should Choose NIOS ODE?</h6>
//       <ul>
//         <li>Students who are fully prepared and want early results</li>
//         <li>Students who failed in one subject and want quick reattempt</li>
//         <li>Students needing marks urgently for college admission</li>
//         <li>Students applying for jobs with deadline</li>
//       </ul>

//       <h6 className="fw-bold mt-3">Important Points</h6>
//       <ul>
//         <li>Available only at selected ODE exam centers</li>
//         <li>Seats are limited (first come, first serve)</li>
//         <li>Must be already enrolled in NIOS</li>
//         <li>Subject availability may vary</li>
//       </ul>

//       <h6 className="fw-bold mt-3">Conclusion</h6>
//       <p>
//         If you are looking for a quicker exam and faster result process, NIOS ODE registration is a smart and flexible option.
//       </p>

//     </div>
//   )}
// </div>


//   </div>
//         </div>
//       </div>
//     </section>
//   );
// }