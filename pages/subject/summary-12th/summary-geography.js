import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusGeographySeniorNIOS() {
  return (
    <>
      <Head>
        <title>
          Geography Course (316) summary for Senior Secondary-NIOS
        </title>
        <meta
          name="description"
          content="Geography Course (316) for Senior Secondary NIOS Board. Here are the many details of Geography subjects students prepare for the Geography examination of class 12th in the NIOS board."
        />
        <meta
          name="keywords"
          content="geography question paper, question paper of nios, question papers of geography, last year question paper of geography class 12, board exam sample question papers, geography question paper inter, geography senior secondary school, senior secondary geography course, open school geography nios, geography question paper model, national institute of open schooling, nios geography book pdf, nios geography practical book pdf, nios geography, nios geography practical, nios class 12 geography assignment, NIOS Geography question paper 2022, 2023, NIOS Geography sample paper 2024"
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
                Geography Subject (316)
              </span>{" "}
              in NIOS Senior Secondary 12th
            </h1>

            <hr />

            {/* ================= INTRO CONTENT ================= */}
            <p>
              Geography provides you with insights into some of the major
              challenges facing the planet, including population explosion,
              natural calamaties, environmental falling level and climate
              change. It is the science of earth and space sciences. Geographers
              study the Earth's landscapes, pupulation, places, demogrphics and
              environments, and how these interact with it. It is, quite simply,
              about the diverse and interconnected world in which we live. Many
              of the world's issues require an indepth understanding of the
              interdependence between human interchanges and the natural and
              cultural environment.
            </p>

            {/* ================= IMAGE PLACEHOLDER ================= */}
            <div className="image-placeholder-box">
              <img
                src="/assets/images/summary/12th/geography.png"
                alt="Geography Subject NIOS Class 12"
              />
            </div>
            <br />

            {/* ================= COURSE DETAILS ================= */}
            <p>
              Teaching methods of NIOS consist of lectures from leading teachers,
              practical, computer and laboratory classes and tutorials in the
              Coaching premises. This subject also includes field work time. The
              Faculty is well equipped for teaching and research.
            </p>

            <hr />
            <br />


            {/* ================= QUOTE ================= */}
            <blockquote className="quote-box">
              <h5>
                “Children must be taught how to think, not what to think.”
              </h5>
              <h4>
                <span className="nios-125h-senior-highlight">
                  - Margaret Mead
                </span>
              </h4>
            </blockquote>



            
            {/* ================= FOOTER LINKS ================= */}
            <div className="ftr-links">
              <div className="subject-card-buttons">
                <a
                  href="/subject/syllabus-class-12th/syllabus-geography-senior-secondary-316"
                  className="subject-btn"
                >
                  View Syllabus
                </a>
                <a
                  href="/subject/curriculum-12th/curriculum-geography"
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
