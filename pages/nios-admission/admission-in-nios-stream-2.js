import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import CTA2 from "@/components/home/CTA2";
import CTA3 from "@/components/home/CTA3";
import Popup from "@/components/home/Popup";
import HeroStream2 from "@/components/NiosAdmission/HeroStream2";
import React from "react";
import Link from "next/link";
import QueryForm from "@/components/home/QueryForm";
import Head from "next/head";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Stream2Faqs from "@/components/NiosAdmission/Stream2Faqs";
import HeroStream1Mobile from "@/components/NiosAdmission/HeroStream1Mobile";

export default function AdmissionInNiosStream2() {
  return (
    <>
      <Head>
        <title>
          NIOS Admission for Stream 2 Examination 2026 | Updates on NIOS
          Admission
        </title>
        <meta
          name="description"
          content="SS Coaching guide students to get admitted To NIOS Board Secondary and Senior Secondary Courses, under NIOS STREAM 2 ADMISSION. Fill out the form for NIOS online admissions 2026 in all streams of NIOS Board for 10th and 12th. Students who wish to be admitted to the NIOS Centre Lucknow can apply online or offline."
        />
        <meta
          name="keywords"
          content="NIOS Admission, NIOS Admission 2026, NIOS Admission Stream 2 2026, CBSE Private Admission Class 12, National Open School Admission Online form 12th Class 2026. NIOS Admission Failed 12th Class, CBSE private candidate admission form 2026 last date, NIOS stream 2, admission in 12th from open school, NIOS admission in 12th class, open schooling admission form 10th 12th, NIOS admission 2026 last date, admission stream online, NIOS 12th class admission form, NIOS 10th admission 2026, NIOS stream 2 admission form 2026 class 12, NIOS board stream 2 admission, NIOS board admission 2026, NIOS admission, NIOS Lucknow, NIOS exam fees, NIOS institute, NIOS office, NIOS , Best NIOS institute, NIOS exam, NIOS date sheet, NIOS roll number, NIOS enrollment, NIOS news, NIOS updates, NIOS current news, NIOS rules, NIOS eligibility, NIOS inquiry form, NIOS admission date, Required documents for admission in stream 2, NIOS stream 2, NIOS stream 2 admission last date, stream 2 NIOS admission, NIOS online admission stream 2, NIOS online admission for stream 2, NIOS stream 2 admission fees, NOIS Admission, NIOS from online, NIOS fail student, Nios Lucknow, NIOS, nios lucknow, Nios Online Admission, Nios Online Admission in Lucknow, Nios Online Admission in Lucknow, Nios Online Admission, Nios Admission, Nios admission lucknow, nios admission for 12th class last date, nios in admission, nios registration, nios registration in Lucknow, nios online admission, nios 12th admission, nios apply online, nios dled, nios register, NIOS Admission Center in Lucknow, nios admission center in lucknow,"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="admission-in-nios-stream-1-area admission-in-nios-stream-2-area">
        <Header />
        <Offcanvas />
        <HeroStream2 />
        {/* <HeroStream1Mobile/> */}
        <BranchContactCanvas />

        {/* <!-- Admission Table Section --> */}
        <section className="admission-table-section">
          <div className="container">
            <div className="admission-table">
              <div className="admission-table-header">
                <div className="admission-table-header-row">
                  <div className="admission-table-cell">Save Year</div>
                  <div className="admission-table-cell">Admission Dates</div>
                  <div className="admission-table-cell">
                    Examination in which the Student Will Appear
                  </div>
                </div>
              </div>
              <div className="admission-table-body">
                <div className="admission-table-row">
                  <div className="admission-table-data">
                    Failed Students Can Pass From NIOS Stream 2
                  </div>
                  <div className="admission-table-data">
                    <div className="admission-close-badge">
                      <div className="admission-status-dot"></div>
                      Admission Closed
                    </div>
                  </div>
                  <div className="admission-table-data">
                    September / October 2026
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Main Content Row (mirroring Stream 1 hero-stream1-main-content) --> */}
        <div className="hero-stream1-main-content">
          <div className="container">
            <div className="chip-container">
              <div className="chip-item mobile-none">
                <img
                  src="/assets/icons/arrow.svg"
                  alt="SS Coaching pass 10th & 12th"
                />
                Failed Students Can Get a Second Chance to Pass 10th or 12th
              </div>
            </div>

            {/* <!-- Content Row --> */}
            <div className="hero-stream1-content-row">
              <div className="hero-stream1-content-text-section">
                {/* Mobile intro text */}
                <p className="hero-stream1-content-text desktop-none">
                  Education plays a vital role in shaping a successful future,
                  but not every student is able to continue regular schooling.
                  Various challenges such as financial issues, health concerns,
                  family responsibilities, or academic gaps can interrupt
                  studies. In such situations, NIOS Admission 2026 offers a
                  flexible and reliable pathway for students to complete their
                  secondary (10th) and senior secondary (12th) education without
                  the pressure of traditional schooling.
                </p>

                {/* Mobile image */}
                <div className="about-left-bx desktop-none">
                  <img
                    src="/assets/images/nios-admission/stream1-about.png"
                    alt="Student applying for NIOS Admission 2026 Stream 2 for failed 10th and 12th students"
                    title="NIOS Admission 2026 Stream 2 – Second Chance for Failed Students"
                    className="hero-stream1-content-image"
                  />
                </div>

                <p className="hero-stream1-content-text desktop-none">
                  National Institute of Open Schooling (NIOS) is one of the
                  largest open education boards in India, recognized by the
                  Government of India. It is designed to provide education to
                  students who need an alternative to formal schooling. With the
                  option of NIOS online admission 2026, students can register
                  easily and study at their own pace from anywhere.
                </p>

                {/* Desktop intro text */}
                <p className="hero-stream1-content-text mobile-none">
                  Education plays a vital role in shaping a successful future,
                  but not every student is able to continue regular schooling.
                  Various challenges such as financial issues, health concerns,
                  family responsibilities, or academic gaps can interrupt
                  studies. In such situations, NIOS Admission 2026 offers a
                  flexible and reliable pathway for students to complete their
                  secondary (10th) and senior secondary (12th) education without
                  the pressure of traditional schooling.
                  <br />
                  <br />
                  National Institute of Open Schooling (NIOS) is one of the
                  largest open education boards in India, recognized by the
                  Government of India. It is designed to provide education to
                  students who need an alternative to formal schooling. With the
                  option of NIOS online admission 2026, students can register
                  easily and study at their own pace from anywhere.
                </p>

                <p className="hero-stream1-content-text mobile-none">
                  One of the key advantages of NIOS is its flexible learning
                  system. Students can choose subjects according to their
                  interests and appear for exams when they feel prepared. This
                  makes it ideal for working students, dropouts, or those
                  preparing for competitive exams alongside their studies.
                  <br />
                  <br />
                  The admission process is simple and student-friendly.
                  Applicants need to fill out the online form, upload required
                  documents, and complete the fee payment. Eligibility varies
                  for 10th and 12th courses, but overall, NIOS ensures
                  accessibility for a wide range of learners.
                  <br />
                  <br />
                  If you are looking for a second chance or a more convenient
                  way to complete your education, NIOS Admission 2026 is a
                  smart and practical choice.
                </p>

                <div className="full-btn cta-btn-2nd">
                  <a href="#" className="contact-btn">
                    Contact Us For help
                  </a>
                  <div className="contact-btn1">
                    <img
                      src="/assets/images/question-papers/icons/send.svg"
                      alt="Send"
                      width="16"
                      height="16"
                    />
                  </div>
                </div>
              </div>

              {/* Desktop image */}
              <div className="about-left-bx mobile-none">
                <img
                  src="/assets/images/nios-admission/stream1-about.png"
                  alt="Student applying for NIOS Admission 2026 Stream 2 for failed 10th and 12th students"
                  title="NIOS Admission 2026 Stream 2 – Second Chance for Failed Students"
                  className="hero-stream1-content-image"
                />
              </div>
            </div>
          </div>
        </div>

        <QueryForm />

        {/* <!-- Info Section (NIOS 10th & 12th Admission 2026) --> */}
        <section className="info-section stream2-info">
          <div className="container">
            <div className="info-content">
              <img
                src="/assets/images/nios-admission/stream1-info.png"
                alt="Student studying online for NIOS Admission 2026 Stream 2"
                title="NIOS Admission 2026 Stream 2 Student Registration"
                className="info-image"
              />
              <div className="info-text-group">
                <h2 className="process-title">
                  NIOS 10th &amp; 12th Admission
                  <span className="highlight"> 2026</span>
                </h2>
                <p className="info-text">
                  NIOS 10th Admission 2026 is an ideal option for students who
                  wish to complete their secondary education through a flexible
                  and open learning system. It is specially designed for those
                  who are unable to continue regular schooling due to personal,
                  academic, or financial reasons.</p>
                  <br />
                  <h5 className="text-dark pt-2">
                    Eligibility for NIOS 10th Admission
                  </h5>
                  To apply for NIOS 10th admission, students must meet the
                  following criteria:
                  <br />
               The student must be at least
                  14 years old.
                  <br />
               The student should have
                  passed class 8th or an equivalent level.
                  <br />
               In some cases,
                  self-declaration of previous education is accepted.
                  <br />
                  <br />
                  <h5 className="text-dark pt-2">
                    Eligibility for NIOS 12th Admission
                  </h5>
                  <b className="text-dark">
                    NIOS 12th Admission 2026
                  </b>{" "}
                  is suitable for students who want to complete their senior
                  secondary education with flexibility.
                  <br />
               The student must have passed
                  class 10th from a recognized board.
                  <br />
               The student should be at
                  least 15 years old.
                  <br />
                  <br />
                  Students can select subjects from streams like Arts, Commerce,
                  and Science. NIOS offers the freedom to choose subject
                  combinations that align with individual career goals and
                  future plans.
                <div className="full-btn cta-btn-2nd">
                  <a href="#" className="contact-btn">
                    Contact Us For help
                  </a>
                  <div className="contact-btn1">
                    <img
                      src="/assets/images/question-papers/icons/send.svg"
                      alt="Send"
                      width="16"
                      height="16"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scrolling Text Banner */}
        <section className="scrolling-banner recognition-banner recognition-banner-mobile mt-4">
          <div className="banner-content recognition-text">
            {[...Array(12)].map((_, i) => (
              <div className="banner-items" key={i}>
                Note: NIOS Stream 2 Admission is Closed for Sep/Oct 2026 — Stay
                tuned for upcoming admission dates and notifications
              </div>
            ))}
          </div>
        </section>

        <div className="container">
          <CTA2 />

          <div className="nios-content pt-50">
            <h2 className="nios-title">
              How to apply for{" "}
              <span className="highlight"> NIOS Admission 10th &amp; 12th?</span>
            </h2>
            <p className="nios-text">

              Applying for NIOS Admission 2026 is a simple online process. Visit the official website of National Institute of Open Schooling and select your course (10th or 12th). Fill out the application form with correct details, upload required documents, and pay the admission fee online. After submission, you will receive a confirmation receipt. Once approved, you can download your ID card and begin your studies easily. <br/><br/>
              The NIOS online admission 2026 is simple and student-friendly.
              However, many students prefer taking guidance from an experienced
              admission center to ensure everything is done correctly.
            </p>
          </div>
        </div>

        {/* <!-- Process Section --> */}
        <section className="process-section">
          <div className="container">
            <div className="process-container">
              <div className="process-content">
                <h2 className="process-title">
                  Follow points below to apply for NIOS Admission:-{" "}
                  <span className="highlight"> 5-Step Process</span>
                </h2>

                {/* Desktop steps */}
                <div className="process-steps mobile-none">
                  <div className="process-step">
                    <div className="step-content">
                      <p>
                        01- Counseling &amp; Course Selection – Connect with
                        our experts to understand available courses, subjects,
                        and exam options.
                      </p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-content">
                      <p>
                        02- Document Verification – Required documents are
                        verified before starting the admission process.
                      </p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-content">
                      <p>
                        03- Online Registration – We help you fill out your
                        NIOS admission form correctly through the official
                        portal.
                      </p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-content">
                      <p>
                        04- Fee Payment – Complete your admission by paying the
                        required NIOS fee based on selected course and subjects.
                      </p>
                    </div>
                  </div>
                  <div className="process-step">
                    <div className="step-content">
                      <p>
                        05- Admission Confirmation – Get confirmation and start
                        your preparation with complete guidance and support.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile steps */}
                <div className="desktop-none">
                  <div className="nios-steps-mobile">
                    <div className="nios-step">
                      <span className="nios-bullet"></span>
                      <p className="nios-step-text">
                        Counseling &amp; Course Selection – Choose the right
                        course with expert guidance
                      </p>
                    </div>
                    <div className="nios-step">
                      <span className="nios-bullet"></span>
                      <p className="nios-step-text">
                        Document Verification – Submit and verify required
                        documents
                      </p>
                    </div>
                    <div className="nios-step">
                      <span className="nios-bullet"></span>
                      <p className="nios-step-text">
                        Online Registration – Fill admission form through NIOS
                        portal
                      </p>
                    </div>
                    <div className="nios-step">
                      <span className="nios-bullet"></span>
                      <p className="nios-step-text">
                        Fee Payment – Pay admission fees securely online
                      </p>
                    </div>
                    <div className="nios-step">
                      <span className="nios-bullet"></span>
                      <p className="nios-step-text">
                        Admission Confirmation – Start your studies with full
                        support
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Process images */}
              <div className="process-images">
                <img
                  src="/assets/images/home/steps-process/photo1.svg"
                  alt="Students applying online for NIOS admission 2026 Stream 2"
                  title="NIOS Admission 2026 Stream 2 for Students"
                  className="process-image process-1"
                />
                <div className="process-stat">
                  <div className="stat-avatars">
                    <img
                      src="/assets/images/home/steps-process/avatar.svg"
                      alt="Student 1"
                      className="stat-avatar"
                    />
                    <img
                      src="/assets/images/home/steps-process/avatar1.svg"
                      alt="Student 2"
                      className="stat-avatar"
                    />
                    <img
                      src="/assets/images/home/steps-process/avatar2.svg"
                      alt="Student 3"
                      className="stat-avatar"
                    />
                  </div>
                  <div className="stat-text">
                    <h4>50K +</h4>
                    <p>Students passed</p>
                  </div>
                </div>
                <img
                  src="/assets/images/home/steps-process/photo.svg"
                  alt="Students applying online for NIOS admission 2026 Stream 2"
                  title="NIOS Admission 2026 Stream 2 for Students"
                  className="process-image process-2"
                />
              </div>
            </div>

            <p className="process-subtitle text-center pt-5">
              Follow the complete NIOS admission process in Lucknow with expert
              guidance from SS Coaching.
            </p>
          </div>
        </section>

        {/* <!-- Last Date Section --> */}
        <section className="last-date-section">
          <div className="container">
            <div className="admission-table">
              <div className="last-date-header">
                <h2 className="last-date-title">NIOS Admission Last Date</h2>
              </div>
              <div className="last-date-list">
                <div className="last-date-item">
                  <div className="last-date-row">
                    <div className="last-date-text">
                      1. For learners enrolled in Stream-1, Block-I for
                      April/May 2026 Examinations
                    </div>
                    <div className="last-date-status">
                      Will be Updating Soon
                    </div>
                  </div>
                </div>
                <div className="last-date-item">
                  <div className="last-date-row">
                    <div className="last-date-text">
                      2. For eligible learners for examinations prior to Sep/Oct
                      2026 Examinations
                    </div>
                    <div className="last-date-status">
                      Will be Updating Soon
                    </div>
                  </div>
                </div>
                <div className="last-date-item">
                  <div className="last-date-row">
                    <div className="last-date-text">
                      3. For all eligible learners as mentioned at Sl. no. 1
                      and 2 above
                    </div>
                    <div className="last-date-status">Will be Updating Soon</div>
                  </div>
                </div>
                <div className="last-date-item">
                  <div className="last-date-row">
                    <div className="last-date-text">
                      4. Apply for NIOS Admission in Lucknow for Sep/Oct Exam,
                      2026
                    </div>
                    <div className="last-date-status">Will be Updating Soon</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="warning-notice">
              For the learners registered for Sep/Oct 2026 examinations, the
              examination fee payment schedule will be notified after the
              declaration of result.
            </div>

            {/* <!-- Why NIOS Section --> */}
            <div className="why-nios-section">
              <h2 className="why-nios-title">
                Why should you Apply Enrollment in{" "}
                <span className="highlight">NIOS?</span>
              </h2>
              <p className="why-nios-text">
                Enrolling in the National Institute of Open Schooling (NIOS) is
                a great choice for students seeking flexible and stress-free
                education. It allows learners to study at their own pace without
                the pressure of regular school attendance. NIOS offers a wide
                range of subjects, giving students the freedom to choose
                according to their interests and career goals. It is recognized
                across India, making it valid for higher studies and jobs. With
                multiple exam opportunities and an easy learning system, NIOS is
                perfect for dropouts, working students, and those looking for a
                second chance to complete their education.
              </p>
            </div>

            {/* <!-- Documents Section --> */}
            <div className="documents-section">
              <h2 className="documents-title">
                <span className="highlight">REQUIRED DOCUMENTS</span> FOR
                ADMISSION IN NIOS STREAM 2
              </h2>
              <div className="documents-cards">
                <div className="document-card">
                  <h3 className="document-card-title">For 10th Failed</h3>
                  <ul className="require-list">
                    <li>
                      Original Failed Marksheet / Original Admit Card, Photo
                      Copy of Aadhar Card.
                    </li>
                    <li>
                      6 Colored Passport Size Photographs along with Name,
                      Date.
                    </li>
                    <li>
                      Guardian/Parents Address proof (Photo Copy) except
                      Driving License.
                    </li>
                  </ul>
                </div>
                <div className="document-card">
                  <h3 className="document-card-title">For 12th Failed</h3>
                  <ul className="require-list">
                    <li>
                      Original Failed Marksheet / Original Admit Card, 10th
                      Marksheet and Passing Certificate (Photocopy), Photo Copy
                      of Aadhar Card.
                    </li>
                    <li>
                      6 Colored Passport Size Photographs along with Name,
                      Date.
                    </li>
                    <li>
                      Guardian/Parents Address proof (Photo Copy) except
                      Driving License.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <CTA3 />
        </div>

        {/* ============ Quick Links ===================== */}
        <section className="quick-links">
          <div className="container">
            <h2 className="quick-title">
              Some <span className="highlight">Important Links</span> in NIOS
              Admission
            </h2>
            <div style={{ display: "flex", gap: "80px" }}>
              <div className="expandable-list" style={{ width: "48%" }}>
                <div className="expand-item">
                  <Link href="/nios-admission/admission-in-nios-stream-1">
                    <div className="expand-header stream1">
                      <div className="expand-text">
                        Form for NIOS Admission 2026-27
                      </div>
                      <div className="expand-icon">
                        <img
                          src="/assets/icons/link-arrow.svg"
                          alt="Expand"
                          style={{ width: "28px", height: "28px" }}
                        />
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="expand-item">
                  <Link href="/nios-admission/admission-in-nios-stream-2">
                    <div className="expand-header branch1">
                      <div className="expand-text">
                        NIOS Admission for Stream 2
                      </div>
                      <div className="expand-icon">
                        <img
                          src="/assets/icons/link-arrow.svg"
                          alt="Expand"
                          style={{ width: "28px", height: "28px" }}
                        />
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="expand-item">
                  <Link href="#">
                    <div className="expand-header branch2">
                      <div className="expand-text">NIOS Prospectus 2026-27</div>
                      <div className="expand-icon collapsed">
                        <img
                          src="/assets/icons/link-arrow.svg"
                          alt="Collapse"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="expandable-list" style={{ width: "48%" }}>
                <div className="expand-item">
                  <Link href="/subject/nios-10th-secondary">
                    <div className="expand-header stream34">
                      <div className="expand-text">
                        NIOS Subjects Lists For 10th &amp; 12th
                      </div>
                      <div className="expand-icon">
                        <img
                          src="/assets/icons/link-arrow.svg"
                          alt="Expand"
                          style={{ width: "28px", height: "28px" }}
                        />
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="expand-item">
                  <Link href="/nios-admission/admission-in-nios-stream-3&4">
                    <div className="expand-header branch3">
                      <div className="expand-text">
                        NIOS Admission for Stream 3&amp;4
                      </div>
                      <div className="expand-icon">
                        <img
                          src="/assets/icons/link-arrow.svg"
                          alt="Expand"
                          style={{ width: "28px", height: "28px" }}
                        />
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="expand-item">
                  <Link href="/nios-admission/admission-in-nios-stream-1">
                    <div className="expand-header message">
                      <div className="expand-text">
                        NIOS Admission 2026-27
                      </div>
                      <div className="expand-icon collapsed">
                        <img
                          src="/assets/icons/link-arrow.svg"
                          alt="Collapse"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Why Choose Our Institute Section --> */}
        <div className="container">
          <div className="why-nios-section">
            <h2 className="why-nios-title">
              <span className="highlight">
                Why Choose Our Institute for NIOS Admission
              </span>{" "}
              2026?
            </h2>
            <p className="why-nios-text">
              Choosing the right institute plays a crucial role in ensuring a
              smooth and successful admission journey. Our institute is dedicated
              to helping students complete their NIOS Admission 2026 with ease,
              confidence, and proper academic support at every step.
              <br />
              <br />
              <b>Expert Admission Guidance:</b> We offer complete step-by-step
              assistance for the entire admission process. From filling out the
              NIOS online form to final submission, our experienced team ensures
              everything is done accurately and on time.
              <br />
              <br />
              <b>Complete Documentation Support:</b> Many students face
              difficulties in preparing the required documents. Our team
              provides full support in organizing, verifying, and submitting all
              necessary documents to avoid any rejection or delay.
              <br />
              <br />
              <b>Academic Support and Coaching:</b> Beyond admission, we guide
              students in their studies as well. We provide subject-wise
              support, study materials, and exam preparation assistance to help
              students perform better in their exams.
              <br />
              <br />
              <b>Student-Friendly Environment:</b> We understand that every
              student has a different background and learning pace. Our
              institute offers a comfortable and supportive environment where
              students feel confident and motivated to continue their education.
              <br />
              <br />
              SS Coaching is the best helper for NIOS Admission Center in
              Lucknow, providing information about NIOS Board (
              <a
                className="link-here"
                href="https://www.nios.ac.in/notice-boardoffice-order/for-all-orders-office-orders.aspx"
              >
                National Institute of Open Schooling
              </a>
              ) as well as coaching classes, syllabus and tuition for 10th
              (secondary) &amp; 12th (senior secondary) students of NIOS Board
              by renowned and highly qualified faculty and staff. SS Coaching
              also guides to fill the form for NIOS online admissions in all
              streams of NIOS Board for 10th and 12th students.
            </p>
          </div>
        </div>

        <Stream2Faqs />

        <Footer />
        <Popup />
      </section>
    </>
  );
}







// import Footer from "@/components/footer/Footer";
// import Header from "@/components/header/Header";
// import Offcanvas from "@/components/header/Offcanvas";
// import ChipSection from "@/components/home/ChipSection";
// import CTA from "@/components/home/CTA";
// import CTA2 from "@/components/home/CTA2";
// import CTA3 from "@/components/home/CTA3";
// import FAQ from "@/components/home/FAQ";
// import Popup from "@/components/home/Popup";
// import HeroStream1 from "@/components/NiosAdmission/HeroStream1";
// import HeroStream2 from "@/components/NiosAdmission/HeroStream2";
// import React from "react";
// import Link from "next/link";
// import QueryForm from "@/components/home/QueryForm";
// import Head from "next/head";
// import BranchContactCanvas from "@/components/header/BranchContactCanvas";
// import Stream1Faqs from "@/components/NiosAdmission/Stream1Faqs";
// import Stream2Faqs from "@/components/NiosAdmission/Stream2Faqs";

// export default function AdmissionInNiosStream2() {
//   return (
//     <>
//        <Head>
//         <title>
//            NIOS Admission for Stream 2 Examination 2026 | Updates on NIOS Admission
//         </title>
//         <meta
//           name="description"
//           content="SS Coaching guide students to get admitted To NIOS Board Secondary and Senior Secondary Courses, under NIOS STREAM 2 ADMISSION. Fill out the form for NIOS online admissions 2026 in all streams of NIOS Board for 10th and 12th. Students who wish to be admitted to the NIOS Centre Lucknow can apply online or offline."
//         />
//         <meta
//           name="keywords"
//           content="NIOS Admission, NIOS Admission 2026, NIOS Admission Stream 2 2026, CBSE Private Admission Class 12, National Open School Admission Online form 12th Class 2026. NIOS Admission Failed 12th Class, CBSE private candidate admission form 2026 last date, NIOS stream 2, admission in 12th from open school, NIOS admission in 12th class, open schooling admission form 10th 12th, NIOS admission 2026 last date, admission stream online, NIOS 12th class admission form, NIOS 10th admission 2026, NIOS stream 2 admission form 2026 class 12, NIOS board stream 2 admission, NIOS board admission 2026, NIOS admission, NIOS Lucknow, NIOS exam fees, NIOS institute, NIOS office, NIOS , Best NIOS institute, NIOS exam, NIOS date sheet, NIOS roll number, NIOS enrollment, NIOS news, NIOS updates, NIOS current news, NIOS rules, NIOS eligibility, NIOS inquiry form, NIOS admission date, Required documents for admission in stream 2, NIOS stream 2, NIOS stream 2 admission last date, stream 2 NIOS admission, NIOS online admission stream 2, NIOS online admission for stream 2, NIOS stream 2 admission fees, NOIS Admission, NIOS from online, NIOS fail student, Nios Lucknow, NIOS, nios lucknow, Nios Online Admission, Nios Online Admission in Lucknow, Nios Online Admission in Lucknow, Nios Online Admission, Nios Admission, Nios admission lucknow, nios admission for 12th class last date, nios in admission, nios registration, nios registration in Lucknow, nios online admission, nios 12th admission, nios apply online, nios dled, nios register, NIOS Admission Center in Lucknow, nios admission center in lucknow,"
//         />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//     <section className="admission-in-nios-stream-1-area admission-in-nios-stream-2-area">
//       <Header />
//       <Offcanvas />
//       <HeroStream2 />
//               <BranchContactCanvas/>
      

//       {/* <!-- Admission Table Section --> */}
//       <section className="admission-table-section">
//         <div className="container">
//           <div className="why-nios-section">
//             <p className="why-nios-text">
//               <b> NIOS Admission 2026</b> is{" "}
//               <span style={{ color: "#EB5454" }}>
//                 {" "}
//                 <b>closed now</b>{" "}
//               </span>{" "}
//               in NIOS Stream 2. Get A Second Chance To Join The Same Class Once
//               Again, In the Same Subjects In The Same Year. You get a chance to
//               change the Subjects, choose among the easSy Subjects and Courses
//               offered by NIOS. SS Coaching guide students to get admitted In
//               NIOS Board Secondary and Senior Secondary Courses, under NIOS
//               ADMISSION STREAM 2. Our Team of Experts counsel the students right
//               from filling up The Enrolment Form to Preparing them to Face their
//               Respective Examinations. SS Coaching helps with the NIOS Admission
//               Center in Lucknow for the students who wants success in their
//               life.
//             </p>
//           </div>
//           <div className="admission-table">
//             <div className="admission-table-header">
//               <div className="admission-table-header-row">
//                 <div className="admission-table-cell">Save Year </div>
//                 <div className="admission-table-cell">Admission Dates</div>
//                 <div className="admission-table-cell">
//                   Examination in which the Student Will Appear
//                 </div>
//               </div>
//             </div>
//             <div className="admission-table-body">
//               <div className="admission-table-row">
//                 <div className="admission-table-data">
//                   Failed Students Can Pass From NIOS Stream 2
//                 </div>
//                 <div className="admission-table-data">
//                   <div className="admission-close-badge">
//                     <div className="admission-status-dot"></div>
//                     Admission Closed
//                   </div>
//                 </div>
//                 <div className="admission-table-data">
//                   September / October 2026
//                 </div>
//               </div>
//             </div>
//           </div>
//           <QueryForm />
//           <div className="why-nios-section nios-admission-text">
//             <p className="why-nios-text">
//               NIOS Stream 2 is all those learners or students who had appeared
//               but could not clear or who were eligible but could not appear the
//               Public Examination of Secondary/Senior Secondary (10th or 12th)
//               standard from any recognized Examination Board like CBSE, ISC,
//               ICSE or other state boards within India for the same subject
//               combination in which they had appeared before. The learners of
//               NIOS Stream 2 will be eligible to appear in the September-October,
//               2026 Secondary/Senior Secondary Public Examination of NIOS on the
//               basis of original failed Marksheet/admit card (Hall Ticket) of the
//               respective boards. to get pass from stream 2 and to score best
//               marks join the SS Coaching to get help for NIOS Admission Center
//               in Lucknow.
//               <br />
//               <br />
//               In Stream 2 of the NIOS Board Marksheet, provisional certificate,
//               migration cum transfer certificate, and passing certificate will
//               be awarded in the year 2026 to successful learners. The learners
//               registered under stream 2 will be eligible for TOC as per the
//               guidelines and conditions given in the NIOS Prospectus. Hurry-Up
//               to save the year, seats are limited, get in touch with the NIOS
//               with SS Coaching for help and guidance for the NIOS admission
//               Center in Lucknow, Call Now at 9935035316, 9839065533.
//             </p>

//             <div className="full-btn cta-btn-2nd mt-0 desktop-none">
//               <a href="#" className="contact-btn ">
//                 Contact Us For help
//               </a>
//               <div className="contact-btn1">
//                 <img
//                   src="/assets/images/question-papers/icons/send.svg"
//                   alt="Send"
//                   width="16"
//                   height="16"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* <!-- Documents Section --> */}
//           <div className="documents-section mb-0">
//             <h2 className="documents-title">
//               <span className="highlight">REQUIRED DOCUMENTS</span> FOR
//               ADMISSION IN NIOS STREAM 2 (NIOS)
//             </h2>
//             <div className="documents-cards">
//               <div className="document-card">
//                 <h3 className="document-card-title">For 10th Failed</h3>

//                 <ul className="require-list">
//                   <li>
//                     Original Failed Marksheet/ Original Admit Card, Photo Copy
//                     of Aadhar Card.
//                   </li>
//                   <li>
//                     6 Colored Passport Size Photographs along with Name, Date.
//                   </li>
//                   <li>
//                     Guardian/Parents Address proof (Photo Copy) except Driving
//                     License.
//                   </li>
//                 </ul>
//               </div>
//               <div className="document-card">
//                 <h3 className="document-card-title">For 12th Failed</h3>

//                 <ul className="require-list">
//                   <li>
//                     Original Failed Marksheet/ Original Admit Card, 10th
//                     Marksheet and passing Certificate(Photocopy), Photo Copy of
//                     Aadhar Card.
//                   </li>
//                   <li>
//                     6 Colored Passport Size Photographs along with Name, Date.
//                   </li>
//                   <li>
//                     Guardian/Parents Address proof (Photo Copy) except Driving
//                     License
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* <!-- Last Date Section --> */}
//       <section className="last-date-section pt-0">
//         <div className="container">
//           <div className="admission-table">
//             <div className="last-date-header">
//               <h2 className="last-date-title">NIOS Admission Last Date</h2>
//             </div>
//             <div className="last-date-list">
//               <div className="last-date-item">
//                 <div className="last-date-row">
//                   <div className="last-date-text">
//                     1. For learners enrolled in Stream-1, Block-I for April/May
//                     2026 Examinations
//                   </div>
//                   <div className="last-date-status">Will be Updating Soon
// </div>
//                 </div>
//               </div>
//               <div className="last-date-item">
//                 <div className="last-date-row">
//                   <div className="last-date-text">
//                     2. For eligible learners for examinations prior to Sep/Oct
//                     2026 Examinations
//                   </div>
//                   <div className="last-date-status">Will be Updating Soon
// </div>
//                 </div>
//               </div>
//               <div className="last-date-item">
//                 <div className="last-date-row">
//                   <div className="last-date-text">
//                     3. For all eligible learners as mentioned at Sl. no. 1 and 2
//                     above
//                   </div>
//                   <div className="last-date-status">Will be Updating Soon</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="warning-notice">
//             For the learners registered for Sep/Oct 2026 examinations, the
//             examination fee payment schedule will be notified after the
//             declaration of result.
//           </div>

//           {/* <!-- Why NIOS Section --> */}
//           <div className="why-nios-section">
//             <p className="why-nios-text">
//               The NIOS takes conscious steps to provide quality education. The
//               Govt. of India has vested authority with NIOS to conduct Public
//               Examinations and provide Secondary and Senior Secondary level
//               certificates, which are equivalent to the certificates provided by
//               any other Board. NIOS is one of the three National Boards while
//               other two are CBSE and CISCE.
//               <br />
//               <br />
//               N.I.O.S Passed students can seek admission in all India as well as
//               state Medical, Engineering and other various competitive exams
//               like IIT-JEE, AIEEE, PMT (NEET), CA, CS, ICWA, CLAT and also other
//               professional and academic courses in all universities, technical
//               institutes across the country and abroad. They can also seek the
//               government jobs whether central / state government. However other
//               eligibility criteria like age, particular subjects, qualifying
//               percentage and other criteria must be fulfilled by the students. 
//               <br />
//               <br />
//               SS Coaching is the best helper for nios admission center in
//               lucknow providing the information about NIOS board (National
//               Institute of Open Schooling) as well as coaching classes, syllabus
//               and tuition for 10th (secondary) & 12th (senior secondary)
//               students of NIOS Board by renowned and highly qualified faculty
//               and staff. SS Coaching also guides to fill the form for NIOS
//               online admissions in all streams of NIOS Board for 10th and 12th
//               students
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ============   Quick Links ===================== */}

//       <section className="quick-links pt-0 mb-3">
//         <div className="container">
//           <h2 className="quick-title">
//             Some <span className="highlight">Important Links</span> in NIOS
//             Admission
//           </h2>
//           <div style={{ display: "flex", gap: "80px" }}>
//             <div className="expandable-list" style={{ width: "48%" }}>
//               <div className="expand-item">
//                 <Link href="/nios-admission/admission-in-nios-stream-1">
//                   <div className="expand-header stream1">
//                     <div className="expand-text">
//                       Form for NIOS Admission 2026-27
//                     </div>
//                     <div className="expand-icon">
//                       <img
//                         src="/assets/icons/link-arrow.svg"
//                         alt="Expand"
//                         style={{ width: "28px", height: "28px" }}
//                       />
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//               <div className="expand-item">
//                 <Link href="/nios-admission/admission-in-nios-stream-2">
//                   <div className="expand-header branch1">
//                     <div className="expand-text">
//                       For Admission in NIOS Stream 2
//                     </div>
//                     <div className="expand-icon">
//                       <img
//                         src="/assets/icons/link-arrow.svg"
//                         alt="Expand"
//                         style={{ width: "28px", height: "28px" }}
//                       />
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//               <div className="expand-item">
//                 <Link href="/nios-admission/admission-in-nios-stream-2">
//                   <div className="expand-header branch2">
//                     <div className="expand-text">NIOS Prospectus 2026-27</div>
//                     <div className="expand-icon collapsed">
//                       <img src="/assets/icons/link-arrow.svg" alt="Collapse" />
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             </div>

//             <div className="expandable-list" style={{ width: "48%" }}>
//               <div className="expand-item">
//                 <div className="expand-header stream34">
//                   <div className="expand-text">
//                     NIOS Subjects Lists For 10th & 12th
//                   </div>
//                   <div className="expand-icon">
//                     <img
//                       src="/assets/icons/link-arrow.svg"
//                       alt="Expand"
//                       style={{ width: "28px", height: "28px" }}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="expand-item">
//                 <div className="expand-header branch3">
//                   <div className="expand-text">
//                     NIOS Admission for Stream 3&4
//                   </div>
//                   <div className="expand-icon">
//                     <img
//                       src="/assets/icons/link-arrow.svg"
//                       alt="Expand"
//                       style={{ width: "28px", height: "28px" }}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="expand-item">
//                 <div className="expand-header message">
//                   <div className="expand-text">
//                     NIOS Admission status 2026-27
//                   </div>
//                   <div className="expand-icon collapsed">
//                     <img src="/assets/icons/link-arrow.svg" alt="Collapse" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <a href="tel:9935035316" className="cta-button cta-button1">
//             For any help related to admission in NIOS please contact SS Coaching
//             on our Mobile No. +91 9935035316
//           </a>
//         </div>
//       </section>

//       {/* <FAQ /> */}
//       {/* <FAQ limit={8} showViewMore={true} /> */}
//       <Stream2Faqs/>

//       <div className="container">
//         <a href="tel:9935035316" className="cta-button cta-button1 mt-0">
//           For any help related to admission in NIOS please contact SS Coaching
//           on our Mobile No. +91 9935035316
//         </a>
//       </div>

//       <div className="footer-park">
//         <div className="container">
//           <p>
//             NIOS Admission, NIOS Admission 2026, NIOS Admission Stream 2 2026,
//             CBSE Private Admission Class 12, National Open School Admission
//             Online form 12th Class 2026. NIOS Admission Failed 12th Class, CBSE
//             private candidate admission form 2026 last date, NIOS stream 2,
//             admission in 12th from open school, NIOS admission in 12th class,
//             open schooling admission form 10th 12th, NIOS admission 2026 last
//             date, admission stream online, NIOS 12th class admission form, NIOS
//             10th admission 2026, NIOS stream 2 admission form 2026 class 12,
//             NIOS board stream 2 admission, NIOS board admission 2026, NIOS
//             admission, NIOS Lucknow, NIOS exam fees, NIOS institute, NIOS
//             office, NIOS , Best NIOS institute, NIOS exam, NIOS date sheet, NIOS
//             roll number, NIOS enrollment, NIOS news, NIOS updates, NIOS current
//             news, NIOS rules, NIOS eligibility, NIOS inquiry form, NIOS
//             admission date, Required documents for admission in stream 2, NIOS
//             stream 2, NIOS stream 2 admission last date, stream 2 NIOS
//             admission, NIOS online admission stream 2, NIOS online admission for
//             stream 2, NIOS stream 2 admission fees, NOIS Admission, NIOS from
//             online, NIOS fail student, Nios Lucknow, NIOS, nios lucknow, Nios
//             Online Admission, Nios Online Admission in Lucknow, Nios Online
//             Admission in Lucknow, Nios Online Admission, Nios Admission, Nios
//             admission lucknow, nios admission for 12th class last date, nios in
//             admission, nios registration, nios registration in Lucknow, nios
//             online admission, nios 12th admission, nios apply online, nios dled,
//             nios register, NIOS Admission Center in Lucknow, nios admission
//             center in lucknow,
//           </p>
//         </div>
//       </div>

//       <Footer />
//       <Popup />
//     </section>
//     </>
//   );
// }



