import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusPsychologySeniorNIOS() {
  return (
    <>
      <Head>
        <title>
          Psychology subject 328 details in nios open education
        </title>
        <meta
          name="description"
          content="All of the learning activities feed data to a Learning Dashboard which the SS Coaching instructor can use to analyze information regarding students’ mastery of the subject matter in terms of the learning capability. 7th 8th 9th 10th fail student 10th 12th pass"
        />
        <meta
          name="keywords"
          content="psychology from open national school, inter admission open school, courses for 12th students, national open exam for inter, admission in inter from open school, inter courses, courses inter students, open school admission in psychology, 12th admission in inter, national open exam, cbse psychology student, 12th inter, national open school psychology syllabus, national open school of learning, 11th courses, open school admission in 12th, school admission open, psychology course from inter, courses for inter fail students, free worksheets, open school admission, psychology sample papers, psychology previous year questions, NIOS Psychology question paper 2022, 2023, NIOS Psychology sample paper 2024"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
               <BranchContactCanvas/>
        

        <div className="syllabus-nios summary-pages">
          <div className="container">

            {/* ================= PAGE TITLE ================= */}
            <h1 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">
                Psychology Subject (328)
              </span>{" "}
              in NIOS Senior Secondary 12th
            </h1>

            <hr />

            {/* ================= INTRO CONTENT ================= */}
            <p>
              This course offers students an engaging introduction to the
              essential topics in psychology. The importance of methods and
              principles of research design is emphasized throughout psychology
              course and presented in a way that will enrich your study of
              individuals as thinking, feeling, and social beings. All of the
              learning activities feed data to a Learning Dashboard which the
              SS Coaching instructor can use to analyze information regarding
              students’ mastery of the subject matter in terms of the learning
              capability.
            </p>

            {/* ================= IMAGE PLACEHOLDER ================= */}
            <div className="image-placeholder-box">
              <img
                src="/assets/images/summary/12th/psychology.png"
                alt="Psychology Subject NIOS Class 12"
              />
            </div>
            <br />

            {/* ================= COURSE DETAILS ================= */}
            <p>
              A “slow learner” is not a diagnostic category, it is a term people
              use to describe a student who has the ability to learn necessary
              academic skills, but at rate and depth below average same age
              peers. In order to grasp new concepts, a slow learner needs more
              time, more repetition, and often more resources from teachers to
              be successful. Reasoning skills are typically delayed, which
              makes new concepts difficult to learn. A slow learner has
              traditionally been identified as anyone with a Full Scale one
              standard deviation below the mean but not as low as two standard
              deviations below the mean.
            </p>

            <hr />
            <br />

         

            {/* ================= QUOTE ================= */}
            <blockquote className="quote-box">
              <h5>
                “He who opens a school door, closes a prison.”
              </h5>
              <h4>
                <span className="nios-125h-senior-highlight">
                  - Victor Hugo
                </span>
              </h4>
            </blockquote>


               {/* ================= FOOTER LINKS ================= */}
            <div className="ftr-links">
              <div className="subject-card-buttons">
                <a
                  href="/subject/syllabus-class-12th/syllabus-psychology-senior-secondary-nios-328"
                  className="subject-btn"
                >
                  View Syllabus
                </a>
                <a
                  href="/subject/curriculum-12th/curriculum-psychology"
                  className="subject-btn"
                >
                  View Curriculum
                </a>
              </div>
            </div>


          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
