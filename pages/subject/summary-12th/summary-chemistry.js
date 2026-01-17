import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusChemistrySeniorNIOS() {
  return (
    <>
      <Head>
        <title>
          Chemistry Course (313) summary for Senior Secondary-NIOS
        </title>
        <meta
          name="description"
          content="Chemistry course for Senior Secondary, the many details of chemistry subject of NIOS board students prepare the chemistry exams."
        />
        <meta
          name="keywords"
          content="chemistry previous year exam papers, basic chemistry questions, chemistry questions, learn chemistry, organic chemistry questions, how to pass in nios exams, practical chemistry, chemistry tutorial, a chemistry question bank, how to learn chemistry, chemistry notes for class 12th, fundamental of chemistry, Chemistry nios Center, NIOS chemistry for 12th, NIOS chemistry chapter, NIOS chemistry syllabus, NIOS Chemistry Practical, NIOS solved chemistry paper, nios chemistry, nios class 12 chemistry book, NIOS Chemistry question paper 2022, 2023, NIOS Chemistry sample paper 2024"
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
                Chemistry Subject (313)
              </span>{" "}
              in NIOS Senior Secondary 12th
            </h1>

            <hr />

            {/* ================= INTRO CONTENT ================= */}
            <p>
              Chemistry has a reputation for being a complicated and boring
              science, but for the most part, that reputation is undeserved.
              Chemistry is the study of matter and its interactions with other
              matter and energy. Chemistry courses can benefit just about
              everyone. Most people who learn the basics of chemistry will be
              able to identify which combinations of chemicals, including those
              around their own house, are dangerous, and which ones can safely
              be combined.
            </p>

            {/* ================= IMAGE PLACEHOLDER ================= */}
            <div className="image-placeholder-box">
              <img
                src="/assets/images/summary/12th/chemistry.png"
                alt="Chemistry Subject NIOS Class 12"
              />
            </div>
            <br />

            {/* ================= COURSE DETAILS ================= */}
            <p>
              Parents will be a little annoyed when the question arises in their
              mind to which Board their ward has to be joined- NIOS or other
              regular schooling Board. In this resource I gave an account NIOS
              Board's syllabus in comparison with other Boards, their positives
              and benefits of taking this course to their child. This resource
              will give the parents an idea about NIOS Board in comparison with
              other Boards and also for the parents to choose the best for their
              child.
            </p>

            <p>
              Science subjects Physics, Chemistry and Biology will be of high
              standard and also the depth at which these topics dealt will be
              very high when compared to any Boards of 10 th standard. For
              preparing Civil Service examinations Coaching Centers will use
              this material as standard in their coaching centers for these
              exams. The student have the possibility of taking a useful and
              progressive subject like Chemistry or Computers as one of their
              group subject. This scope is not there in any of the other Board's
              exams. The knowledge of Computers will be very much useful in the
              future of a student's life. In physics also importance will be
              given for understanding, thinking and for analyzing numerical
              abilities of the students.
            </p>

            <hr />
            <br />

            {/* ================= QUOTE ================= */}
            <blockquote className="quote-box">
              <h5>“I am not a teacher, but an awakener.”</h5>
              <h4>
                <span className="nios-125h-senior-highlight">
                  - Robert Frost
                </span>
              </h4>
            </blockquote>

            <div className="ftr-links">
              <div className="subject-card-buttons">
                <a
                  href="/subject/syllabus-class-12th/syllabus-chemistry-senior-secondary-nios-313"
                  className="subject-btn"
                >
                  View Syllabus
                </a>
                <a
                  href="/subject/curriculum-12th/curriculum-chemistry"
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
