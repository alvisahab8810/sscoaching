import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusEnvironmentalScienceSeniorNIOS() {
  return (
    <>
      <Head>
        <title>
          Environmental Science summary for Senior Secondary-NIOS
        </title>
        <meta
          name="description"
          content="Environment Science subject detail for NOS open schooling education. Environmental Science is an interdisciplinary approach to the study of the environment, incorporating its structure and functioning, and human interactions with the environment."
        />
        <meta
          name="keywords"
          content="syllabus of environmental science, environmental studies notes, environmental science book, scope and fields of environmental science, importance of environmental education, introduction to environmental science, environmental science nios coaching, subjects in environmental science, environmental education in india, what is environmental studies, online environmental science studies, environmental science projects in 12th, about environmental science, studies in environmental science lucknow, masters in environmental science, environmental science careers, environmental science subjects, inter with environmental science, environmental education in inter, NIOS Environmental Science question paper 2022, 2023, NIOS Environmental Science sample paper 2024"
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
                Environmental Science Subject (333)
              </span>{" "}
              in NIOS Senior Secondary 12th
            </h1>

            <hr />

            {/* ================= INTRO CONTENT ================= */}
            <p>
              Environmental Science is an interdisciplinary approach to the
              study of the environment, incorporating its structure and
              functioning, and human interactions with the environment.You
              will develop important scientific tools and understand how
              scientists operate in broader social and political arenas.As
              this suggests, environmental science is a huge subject, and one
              of immediate relevance to many of modern society’s most pressing
              challenges.
            </p>

            {/* ================= IMAGE PLACEHOLDER ================= */}
            <div className="image-placeholder-box">
              <img
                src="/assets/images/summary/12th/env-science.png"
                alt="Environmental Science Subject NIOS Class 12"
              />
            </div>
            <br />

            {/* ================= COURSE DETAILS ================= */}
            <p>
              Environmental Studies is an important subject as it provides us
              real time useful information about our planet, the environment
              in which we live and the measures we can use to conserve its
              resources. It is a really important subject which will make the
              students to be more active and caring about the planet and
              keeping it safe from pollution. A highly practical subject,
              Environmental Studies instill in the students a sense of
              responsibility towards the planet on which we live. NIOS
              syllabus for environmental science is quite rich and varied.
              The exercises and questions have been specifically designed to
              create a light and stress free learning ecperience all the while
              maintaining a constant stream of information and receiving
              instant feedback.
            </p>

            <hr />
            <br />

           
            {/* ================= QUOTE ================= */}
            <blockquote className="quote-box">
              <h5>
                “Spoon feeding, in the long run, teaches us nothing but the
                shape of the spoon.”
              </h5>
              <h4>
                <span className="nios-125h-senior-highlight">
                  - E.M. Forster
                </span>
              </h4>
            </blockquote>


             {/* ================= FOOTER LINKS ================= */}
            <div className="ftr-links">
              <div className="subject-card-buttons">
                <a
                  href="/subject/syllabus-class-12th/syllabus-environmental-science-senior-secondary-nios-333"
                  className="subject-btn"
                >
                  View Syllabus
                </a>
                <a
                  href="/subject/curriculum-12th/curriculum-environmental-science"
                  className="subject-btn"
                >
                  View Curriculum
                </a>
              </div>
            </div>

            <hr />
            <br />


          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
