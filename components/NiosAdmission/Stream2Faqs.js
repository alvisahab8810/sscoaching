"use client";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

export default function Stream2Faqs() {
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
                  1. What is the process for online NIOS admission in India?
                </div>
                <div className="faq-icon">
                  {openIndex === 0 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
                </div>
              </div>

              {openIndex === 0 && (
                <div className="faq-answer mt-3">

                  <h5 className="fw-bold">National Institute of Open Schooling</h5>

                  <p>
                    If you are planning for Online NIOS admission in India, the process is simple and fully digital. Students can apply from home without visiting any office.
                  </p>

                  <h5 className="fw-bold mt-4">
                    What Is the Process for Online NIOS Admission in India?
                  </h5>

                  <h6 className="fw-bold mt-3">Step-by-Step Process</h6>

                  <h6 className="fw-bold mt-3">Check Eligibility</h6>
                  <ul>
                    <li>For 10th (Secondary): Minimum age 14 years</li>
                    <li>For 12th (Senior Secondary): Must have passed 10th from a recognized board</li>
                  </ul>

                  <h6 className="fw-bold mt-3">Visit the Official NIOS Website</h6>
                  <p>
                    Go to the official NIOS admission portal and select the appropriate course (Secondary or Senior Secondary).
                  </p>

                  <h6 className="fw-bold mt-3">Fill the Online Application Form</h6>
                  <p>Enter personal details carefully:</p>
                  <ul>
                    <li>Name (as per documents)</li>
                    <li>Date of birth</li>
                    <li>Address</li>
                    <li>Mobile number & email</li>
                  </ul>

                  <h6 className="fw-bold mt-3">Upload Required Documents</h6>
                  <ul>
                    <li>Aadhaar card / ID proof</li>
                    <li>Passport size photograph</li>
                    <li>Signature</li>
                    <li>Previous class marksheet (for 12th)</li>
                  </ul>

                  <h6 className="fw-bold mt-3">Choose Subjects</h6>
                  <p>
                    Select a minimum of 5 subjects according to your interest and career goals.
                  </p>

                  <h6 className="fw-bold mt-3">Select Exam Center</h6>
                  <p>
                    Choose your preferred exam center location in India.
                  </p>

                  <h6 className="fw-bold mt-3">Pay Fees Online</h6>
                  <p>
                    Pay the course fee securely through online payment options.
                  </p>

                  <h6 className="fw-bold mt-3">Confirmation & Study Material</h6>
                  <p>
                    After successful submission, you will receive confirmation. Study materials are provided online and via dispatch (if applicable).
                  </p>

                  <h6 className="fw-bold mt-4">Planning for 2026?</h6>
                  <p>
                    If you are preparing for Online NIOS admission for the upcoming session, make sure to apply within the official admission dates.
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
      2. How can I apply for online NIOS admission from home?
    </div>
    <div className="faq-icon">
      {openIndex === 1 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
    </div>
  </div>

  {openIndex === 1 && (
    <div className="faq-answer mt-3">

      <h5 className="fw-bold">National Institute of Open Schooling</h5>

      <p>
        Yes  You can easily apply for Online NIOS admission from home. The complete process is digital, simple, and student-friendly.
      </p>

      <h5 className="fw-bold mt-4">
        How Can I Apply for Online NIOS Admission from Home?
      </h5>

      <p>Follow these easy steps:</p>

      <h6 className="fw-bold mt-3">Check Eligibility</h6>
      <ul>
        <li>For 10th (Secondary): Minimum age 14 years</li>
        <li>For 12th (Senior Secondary): Must have passed 10th from a recognized board</li>
      </ul>

      <h6 className="fw-bold mt-3">Visit the Official NIOS Website</h6>
      <p>
        Go to the official NIOS admission portal and select your course (10th or 12th).
      </p>

      <h6 className="fw-bold mt-3">Fill the Online Application Form</h6>
      <p>Enter your correct details:</p>
      <ul>
        <li>Full name (as per documents)</li>
        <li>Date of birth</li>
        <li>Address</li>
        <li>Mobile number & email ID</li>
      </ul>

      <h6 className="fw-bold mt-3">Upload Required Documents</h6>
      <p>Keep scanned copies ready:</p>
      <ul>
        <li>Aadhaar card / ID proof</li>
        <li>Passport size photo</li>
        <li>Signature</li>
        <li>10th marksheet (for 12th admission)</li>
      </ul>

      <h6 className="fw-bold mt-3">Choose Subjects</h6>
      <p>
        Select at least 5 subjects based on your career goals.
      </p>

      <h6 className="fw-bold mt-3">Select Exam Center</h6>
      <p>
        Choose your preferred exam center city.
      </p>

      <h6 className="fw-bold mt-3">Pay Fees Online</h6>
      <p>
        Complete the payment through debit card, credit card, or net banking.
      </p>

      <h6 className="fw-bold mt-3">Admission Confirmation</h6>
      <p>
        After successful submission, you will receive confirmation and study materials access.
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
      3. Is online NIOS admission valid for 10th and 12th?
    </div>
    <div className="faq-icon">
      {openIndex === 2 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
    </div>
  </div>

  {openIndex === 2 && (
    <div className="faq-answer mt-3">

      <h5 className="fw-bold">National Institute of Open Schooling</h5>

      <p>
        Yes  Online NIOS admission is completely valid for both 10th and 12th classes.
      </p>

      <p>
        NIOS is a Government of India recognized board under the Ministry of Education. The online admission process is the official and approved method to enroll in Secondary (10th) and Senior Secondary (12th) courses.
      </p>

      <h5 className="fw-bold mt-4">
        Is Online NIOS Admission Valid for 10th and 12th?
      </h5>

      <p className="fw-bold">Valid for 10th (Secondary Course)</p>
      <p>
        Students applying through NIOS admission for 10th class receive a valid certificate after passing the exams. This certificate is accepted for:
      </p>

      <ul>
        <li>Higher studies (11th admission)</li>
        <li>Government jobs</li>
        <li>Competitive exams</li>
        <li>Private sector jobs</li>
      </ul>

      <p className="fw-bold mt-3">Valid for 12th (Senior Secondary Course)</p>
      <p>
        Students completing 12th from NIOS are eligible for:
      </p>

      <ul>
        <li>College admission (UG courses)</li>
        <li>Government & private jobs</li>
        <li>Competitive exams like SSC, Railway, Banking, etc.</li>
      </ul>

      <h6 className="fw-bold mt-4">Important Points</h6>
      <ul>
        <li>Online registration is the official process</li>
        <li>Certificate is valid across India</li>
        <li>Recognized by colleges and universities</li>
        <li>Accepted in central and state government jobs</li>
      </ul>

      <p>
        So yes, whether you choose NIOS admission for 10th class or 12th, the online admission is fully valid and recognized.
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
      4. What documents are required for online NIOS admission?
    </div>
    <div className="faq-icon">
      {openIndex === 3 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
    </div>
  </div>

  {openIndex === 3 && (
    <div className="faq-answer mt-3">

      <h5 className="fw-bold">National Institute of Open Schooling</h5>

      <p>
        If you are planning to NIOS apply online, you must keep your documents ready before starting the admission process. Uploading correct documents ensures quick approval.
      </p>

      <h5 className="fw-bold mt-4">
        What Documents Are Required for Online NIOS Admission?
      </h5>

      <p className="fw-bold">Basic Documents (For 10th & 12th)</p>
      <ul>
        <li>Passport Size Photograph (recent, clear background)</li>
        <li>Scanned Signature</li>
        <li>Aadhaar Card / Valid ID Proof</li>
        <li>Address Proof (Aadhaar / Voter ID / Driving License / Utility Bill)</li>
      </ul>

      <p className="fw-bold mt-3">Additional Documents for 10th (Secondary Course)</p>
      <ul>
        <li>Date of Birth Proof (Birth Certificate / School Leaving Certificate)</li>
      </ul>

      <p className="fw-bold mt-3">Additional Documents for 12th (Senior Secondary Course)</p>
      <ul>
        <li>10th Marksheet & Passing Certificate (from recognized board)</li>
      </ul>

      <h6 className="fw-bold mt-4">Important Tips While You NIOS Apply Online</h6>
      <ul>
        <li>Documents should be clear and readable</li>
        <li>Name & Date of Birth must match all documents</li>
        <li>Upload files in the correct size and format (as mentioned on portal)</li>
        <li>Keep a working mobile number & email ID for OTP verification</li>
      </ul>

      <p>
        After successful document upload and fee payment, your admission will be processed online
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
      5. Is online NIOS admission valid for government jobs?
    </div>
    <div className="faq-icon">
      {openIndex === 4 ? <AiOutlineClose size={26} /> : <AiOutlinePlus size={26} />}
    </div>
  </div>

  {openIndex === 4 && (
    <div className="faq-answer mt-3">

      <h5 className="fw-bold">National Institute of Open Schooling</h5>

      <p>
        Yes, Online NIOS admission is completely valid for government jobs in India.
      </p>

      <p>
        If you NIOS apply online through the official portal and complete your 10th or 12th successfully, your certificate is fully recognized and accepted across India.
      </p>

      <h5 className="fw-bold mt-4">
        Is Online NIOS Admission Valid for Government Jobs?
      </h5>

      <p className="fw-bold">Government Recognized Board</p>
      <p>
        NIOS works under the Ministry of Education, Government of India. Its certificates are valid just like CBSE or State Board certificates.
      </p>

      <p className="fw-bold mt-3">Eligible for Central & State Jobs</p>
      <p>
        After completing NIOS 10th or 12th, students can apply for:
      </p>

      <ul>
        <li>SSC exams</li>
        <li>Railway jobs</li>
        <li>Police recruitment</li>
        <li>Defence services (as per eligibility)</li>
        <li>State government vacancies</li>
      </ul>

      <p className="fw-bold mt-3">Accepted for Competitive Exams</p>
      <p>
        As long as the notification mentions “recognized board,” NIOS students are eligible.
      </p>

      <h6 className="fw-bold mt-4">Important Points</h6>
      <ul>
        <li>You must NIOS apply online from the official website only</li>
        <li>Complete required subjects and pass the exam</li>
        <li>Keep original documents for verification</li>
      </ul>

      <p>
        So yes, online NIOS admission is fully valid for government jobs, higher education, and competitive exams.
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
