import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusHomeScienceSeniorNIOS() {
  return (
    <>
      <Head>
        <title>
          Home Science Subject (321) summary for NIOS Senior Secondary | SS Coaching
        </title>
        <meta
          name="description"
          content="Home Science Subject (321) in NIOS Senior Secondary 12th provided by SS coaching and all details of Home Science courses of 12th or senior secondary in NIOS board."
        />
        <meta
          name="keywords"
          content="nios home science class 12, home science subject 321 nios, nios class 12 home science syllabus, home science course nios senior secondary, nios home science summary class 12"
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
                Home Science Subject (321)
              </span>{" "}
              in NIOS Senior Secondary 12th
            </h1>

            <hr />

            {/* ================= INTRO CONTENT ================= */}
            <p>
              Home Science is a unique discipline with a blend of science and
              art. It is a scientific course of study which moulds a student
              with a variety of life skills. This is a recognised professional
              course and requires its students to have a intellectual and
              logical mind. SS Coaching offers Home Science with Computer
              Applications and Training Programme making the students
              full-fledged for furthur studies into admission in other colleges
              after passing from NIOS Board.
            </p>

            {/* ================= IMAGE PLACEHOLDER ================= */}
            <div className="image-placeholder-box">
              <img
                src="/assets/images/summary/12th/home-science.png"
                alt="Home Science Subject NIOS Class 12"
              />
            </div>
            <br />

            {/* ================= COURSE DETAILS ================= */}
            <p>
              As the name suggests, Home Science is concerned with the home,
              health and happiness of all the people living in it. As a field of
              specialization, Home Science draws its content from courses in
              both science and art. Thus, representing an interdisciplinary
              field that prepares young learners for the two most important
              goals in their lives – caring for their home and family as well as
              preparing for a career or vocation in life. Hence, its scope
              extends to activities associated with setting home based
              enterprises as well as consultancies.
            </p>

            <p>
              Today, men and women share the responsibility of a home and family
              equally. They need an equal amount of preparation in making the
              best use of the resources available to make their lives
              comfortable. In this lesson, you will discover the scope of the
              science and art behind Home Science and the different professional
              avenues available to you after specializing in this field.
            </p>

            <p>
              Home Science draws an important part of its content from pure
              science disciplines such as physics, chemistry, biology,
              physiology and hygiene. It also draws its content equally from
              economics, sociology, anthropology, psychology, community
              development, communication, media and technology. Thus, making it
              an interdisciplinary field which draws from the strengths of
              science and arts courses.
            </p>

            <hr />
            <br />


            {/* ================= QUOTE ================= */}
            <blockquote className="quote-box">
              <h5>
                “I go to school, but I never learn what I want to know.”
              </h5>
              <h4>
                <span className="nios-125h-senior-highlight">
                  - Bill Watterson
                </span>
              </h4>
            </blockquote>



            
            {/* ================= FOOTER LINKS ================= */}
            <div className="ftr-links">
              <div className="subject-card-buttons">
                <a
                  href="/subject/syllabus-class-12th/syllabus-home-science-senior-secondary-nios-321"
                  className="subject-btn"
                >
                  View Syllabus
                </a>
                <a
                  href="/subject/curriculum-12th/curriculum-home-science"
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
