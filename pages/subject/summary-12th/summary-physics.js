import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusPhysicsSeniorNIOS() {
  return (
    <>
      <Head>
        <title>
          Physics Course (312) summary for Senior Secondary-NIOS
        </title>
        <meta
          name="description"
          content="This course offers students a most easily represented by our reliance on technology topics in Physics. The study of physics in schools and universities is undoubtedly relevant to society today."
        />
        <meta
          name="keywords"
          content="12th class result, nios senior secondary subjects, senior secondary examination, inclusive education in india, education of india, open schooling in india, online admission in nios for 12th, nios study centre, cbse board syllabus, open schooling, online admission of open school, on demand examination nios, on demand examination, present education system in india, central board education, education problems in india, education system in india, open school education, primary education in india, courses for 12th students, 12th failed students ratio, education in india, what is nios in india, nios result october, failed students, 12th syllabus of open school, higher secondary education in india, higher education in India, nios physics, nios physics syllabus class 12, nios class 12 physics book, physics subject, 12th physics deleted portions, NIOS Physics question paper 2022, 2023, NIOS Physics sample paper 2024"
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
                Physics Subject (312)
              </span>{" "}
              in NIOS Senior Secondary 12th
            </h1>

            <hr />

            {/* ================= INTRO CONTENT ================= */}
            <p>
              The importance of physics to society today is most easily
              represented by our reliance on technology. Many of the
              technologies that that are continually transforming the world we
              live in can be directly traced back to important physics
              research.There are countless more examples of research in physics
              leading to the development of important technologies.The study of
              physics in schools and universities is undoubtedly relevant to
              society today. However an individual deciding whether to study
              physics in senior school has to decide whether physics is relevant
              to them.
            </p>

            {/* ================= IMAGE PLACEHOLDER ================= */}
            <div className="image-placeholder-box">
              <img
                src="/assets/images/summary/12th/physics.png"
                alt="Physics Subject NIOS Class 12"
              />
            </div>
            <br />

            {/* ================= COURSE DETAILS ================= */}
            <p>
              In India people give higher importance to education and learning.
              Parents always try to give best to their child in terms of
              education and career. There is always confusion for parents to
              choose between NIOS or regular schooling. Very few know what are
              the difference between them and their education patterns?
              advantages and disadvantages of their education pattern. We have
              given some details about both education patterns to make you
              easier to select right pattern for your child. NIOS being older
              more open schooling follows NIOS pattern syllabus and education
              methods which resembles much like CBSE Board. That is why CBSE and
              NIOS pattern is more popular. This will help you to find a
              coaching in your city to prepare your child in case you are
              switching to new locations within the country. If you want to
              travel abroad then you will find more CBSE pattern schools outside
              India than ICSE schools. NIOS like CBSE is recognized by Indian
              government and ICSE is not. Popularity of NIOS as an open schooling
              board is growing day by day though.
            </p>

            <hr />
            <br />

            {/* ================= FOOTER LINKS ================= */}
            <div className="ftr-links1">
              <div className="subject-card-buttons">
                <a
                  href="/subject/syllabus-class-12th/syllabus-physics-senior-secondary-nios-312"
                  className="subject-btn"
                >
                  View Syllabus
                </a>
                <a
                  href="/subject/curriculum-12th/curriculum-physics"
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
