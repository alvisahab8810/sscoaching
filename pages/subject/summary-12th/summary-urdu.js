import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusUrduSeniorNIOS() {
  return (
    <>
      <Head>
        <title>
          Urdu Course (306) summary for Senior Secondary-NIOS
        </title>
        <meta
          name="description"
          content="As for Urdu is concerned, it is the most popular language spoken by millions of people across the world Urdu language has a rich history of hundreds of years back. Urdu is written from right to left just like Arabic and Persian."
        />
        <meta
          name="keywords"
          content="Urdu class 12th notes, Urdu courses, courses in Urdu, NIOS study material for Urdu, Urdu courses, courses in Urdu NIOS study material for Urdu, Urdu failed student, how to learn Urdu, online admission for board exam, board failed students, Urdu learning, senior secondary Urdu syllabus, class 12 NIOS Urdu syllabus, NIOS Urdu question paper 2022, 2023, board Urdu previous papers, NIOS 12 class Urdu syllabus, Urdu coaching in Lucknow, Urdu study material for board exam, NIOS Urdu sample paper 2024"
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
                Urdu Subject (306)
              </span>{" "}
              in NIOS Senior Secondary 12th
            </h1>

            <hr />

            {/* ================= INTRO CONTENT ================= */}
            <p>
              Language is vital not only to communicate thoughts and ideas but
              it also develops information, friendship, cultural ties and
              economic relationship. As for Urdu is concerned, it is a most
              popular language spoken by millions of people across the world
              Urdu language has a rich history of hundreds of years back.
              Urdu is written from right to left just like Arabic and Persian.
              Urdu has 39 basic letters and 13 extra characters, all together
              52 and most of these letters are from Arabic and a small quantity
              form Persian. It has almost all the sounds available in any other
              language spoken in the world.
            </p>

            {/* ================= IMAGE PLACEHOLDER ================= */}
            <div className="image-placeholder-box">
              <img
                src="/assets/images/summary/12th/urdu.png"
                alt="Urdu Subject NIOS Class 12"
              />
            </div>

            <hr />
            <br />

        

            {/* ================= QUOTE ================= */}
            <blockquote className="quote-box">
              <h5>
                “The purpose of education is to replace an empty mind with an open one.”
              </h5>
              <h4>
                <span className="nios-125h-senior-highlight">
                  - Malcolm S. Forbes
                </span>
              </h4>
            </blockquote>



                {/* ================= FOOTER LINKS ================= */}
            <div className="ftr-links">
              <div className="subject-card-buttons">
                <a
                  href="/subject/syllabus-class-12th/syllabus-urdu-senior-secondary-nios-306"
                  className="subject-btn"
                >
                  View Syllabus
                </a>
                <a
                  href="/subject/curriculum-12th/curriculum-urdu"
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
