import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusSociologySeniorNIOS() {
  return (
    <>
      <Head>
        <title>
          Sociology Course (330) summary for Senior Secondary-NIOS
        </title>
        <meta
          name="description"
          content="Sociology subject in NIOS Secondary 12th Class. Sociologists stress the importance of systematically gathering and analyzing evidence about social life to enrich our understanding of the social processes that drive society and impact on everyday life."
        />
        <meta
          name="keywords"
          content="Sociology coaching in Lucknow, Sample papers for class 12th sociology, Sociology study material for board exam, Sociology class 12th solved question papers, Sociology class 12th notes, Question paper of computer science, NIOS class 12 sociology question paper, Sociology syllabus for NIOS, nios sociology, nios course,nios curriculum, nios online classes 12, nios online study material, sociology study material, nios answer sheet,"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />

        <div className="syllabus-nios summary-pages">
          <div className="container">

            {/* ================= PAGE TITLE ================= */}
            <h1 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">
                Sociology Subject (331)
              </span>{" "}
              in NIOS Senior Secondary 12th
            </h1>

            <hr />

            {/* ================= INTRO CONTENT ================= */}
            <p>
              Sociology is the scientific study of society: its composition,
              organization, culture, and development. Sociology combines
              scientific methods with humanistic perspectives and integrates
              the findings of economics, political science, psychology, and
              history.Sociologists stress the importance of systematically
              gathering and analyzing evidence about social life to enrich our
              understanding of the social processes that drive society and
              impact on everyday life. Sociology’s broad scope and a strong
              perspective on our world make it a highly popular subject with
              NIOS students.
            </p>

            {/* ================= IMAGE PLACEHOLDER ================= */}
            <div className="image-placeholder-box">
              <img
                src="/assets/images/summary/12th/sociology.png"
                alt="Sociology Subject NIOS Class 12"
              />
            </div>
            <br />

            {/* ================= COURSE DETAILS ================= */}
            <p>
              There are two schools of thought with different viewpoints
              regarding scope and subject matter of educational sociology-
              1-formal school and 2-openschool. According to formal school
              sociology was conceived to be a social science with a
              specifically defined field. Formal school argued in favor of
              giving sociology a definite subject matter to make its clear
              picture. It emphasized upon the study of forms of social
              relationships and regarded sociology as independent. Sociology
              is a specific social science which describes, classifies, and
              analyses the forms of social relationships or in other words
              social interactions should be classified into various forms or
              types.
            </p>

            <hr />
            <br />

         


            {/* ================= QUOTE ================= */}
            <blockquote className="quote-box">
              <h5>
                “I don't love studying. I hate studying. I like learning.
                Learning is beautiful.”
              </h5>
              <h4>
                <span className="nios-125h-senior-highlight">
                  - Natalie Portman
                </span>
              </h4>
            </blockquote>


               {/* ================= FOOTER LINKS ================= */}
            <div className="ftr-links">
              <div className="subject-card-buttons">
                <a
                  href="/subject/syllabus-class-12th/syllabus-sociology-senior-secondary-nios-331"
                  className="subject-btn"
                >
                  View Syllabus
                </a>
                <a
                  href="/subject/curriculum-12th/curriculum-sociology"
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
