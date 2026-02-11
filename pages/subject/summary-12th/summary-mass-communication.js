import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusMassCommunicationSeniorNIOS() {
  return (
    <>
      <Head>
        <title>
           Mass Communication Course (335) summary for Senior Secondary-NIOS
        </title>
        <meta
          name="description"
          content="Mass Communication Guidance NIOS Coaching Institute Lucknow. To a great extent mass media is a modern reality which covers all aspects of human life. A professional course in mass communication opens doors for a career in films & TV, publishing, public relations, journalism, editing, direction, filmmaking, scriptwriting, production, etc."
        />
        <meta
          name="keywords"
          content="Mass communication class 12th NIOS syllabus, Mass communication sample papers for class 12 NIOS, NIOS study material for mass communication, Mass communication courses, Courses in mass communication, NIOS sample papers for class 12th mass communication, NIOS mass communication syllabus, Sample papers for class 12th mass communication, ,Mass communication class 12th solved question papers, Mass communication online learning mass communication courses online, Mass communication coaching in Lucknow, Mass communication study material for board exam, Mass communication class 12th notes, Mass communication syllabus for NIOS exam, NIOS Mass Communication question paper 2022, 2023, NIOS Mass Communication sample paper 2024"
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
                Mass Communication Subject (335)
              </span>{" "}
              in NIOS Senior Secondary 12th
            </h1>

            <hr />

            {/* ================= INTRO CONTENT ================= */}
            <p>
              The world has witnessed a phenomenal and unprecedented explosion
              in communication technology and media. Mass Communication is not
              limited to journalism alone. To a great extent mass media is a
              modern reality which covers all aspects of human life. A
              professional course in mass communication opens doors for a
              career in films & TV, publishing, public relations, journalism,
              editing, direction, filmmaking, scriptwriting, production, etc.
            </p>

            {/* ================= IMAGE PLACEHOLDER ================= */}
            <div className="image-placeholder-box">
              <img
                src="/assets/images/summary/12th/mass-commu.png"
                alt="Mass Communication Subject NIOS Class 12"
              />
            </div>
            <br />

            {/* ================= COURSE DETAILS ================= */}
            <p>
              The world has seen a unprecedented explosion in communication
              technology and media. And it is here that mass-communication,
              and as a career, becomes so important and enviable. Mass
              Communication is not limited to journalism. With technology
              playing greater role in our lives, all students in early career
              stage related to mass communication now require skilled
              professionals who work fast and efficiently send across the
              message to a whole range of audience. Unlike engineering or
              medical streams there are no preparation strategies or set
              formula for making a career in mass communication. You need to
              have creativity—a way with words and excellent communication
              skills as you will be required to explain and inform, about the
              most complex of issues, in the simplest of terms—to a large
              number of people. Moreover, you require big deal of patience,
              because in this field, it takes a lot of hard work, and quite
              some time, to make it to the top. A perfect course in mass
              communication opens doors for a career in films & TV,
              publishing, public relations, journalism, editing, direction,
              filmmaking, scriptwriting, production, etc. In nutshell, Mass
              Communication widens up the horizon of career options for a
              person. Like any career option, mass communication too has
              positive features as well as a flip side. A career in mass
              communication requires commitment, dedication and sacrifice of
              own time for the sake of staying on front or top, particularly
              in news sector. A journalist may have to work regularly without
              bounds to get breaking news. Similarly, media professionals who
              are in film making need to work with passion which may come at
              the cost of their personal life. However, in a nutshell, mass
              communication as a career provides job satisfaction, name and
              fame and a challenge to live with.
            </p>

            <hr />
            <br />

            

            {/* ================= QUOTE ================= */}
            <blockquote className="quote-box">
              <h5>
                “Wisdom is not a product of schooling but of the lifelong
                attempt to acquire it.”
              </h5>
              <h4>
                <span className="nios-125h-senior-highlight">
                  - Albert Einstein
                </span>
              </h4>
            </blockquote>


            {/* ================= FOOTER LINKS ================= */}
            <div className="ftr-links">
              <div className="subject-card-buttons">
                <a
                  href="/subject/syllabus-class-12th/syllabus-mass-communication-senior-secondary-nios"
                  className="subject-btn"
                >
                  View Syllabus
                </a>
                <a
                  href="/subject/curriculum-12th/curriculum-mass-communication"
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
