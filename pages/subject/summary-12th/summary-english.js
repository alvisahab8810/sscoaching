import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusEnglishSeniorNIOS() {
  return (
    <>
      <Head>
        <title>
          English Course (302) summary for NIOS Senior Secondary | SS Coaching
        </title>
        <meta
          name="description"
          content="English Course (302) in NIOS Senior Secondary 12th provided by SS coaching and all details of English courses of 12th or senior secondary in NIOS board."
        />
        <meta
          name="keywords"
          content="courses nios english for class 12, courses of english for class 12, nios class 12 english courses, English sample papers for class 12 nios, sample papers for class 12 english, english class 12th solved question papers, english class 12 syllabus, board english previous papers, English courses online learning, nios courses for class 12 english, class 12 nios english courses, nios 12 class english syllabus, nios english syllabus class 12, English sample papers for class 12,English Course in NIOS Senior Secondary 12th,english course, nios english class 12, english nios class 12, nios english text book, nios english book class 12, nios class 12 english, NIOS English class 12 question paper 2022, 2023, NIOS English sample paper 2024"
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
              <span className="nios-125h-senior-highlight">English Course (302) </span> in NIOS Senior Secondary 12th
            </h1>

            <hr />

            {/* ================= INTRO CONTENT ================= */}
            <p>
              One of the basic benefits of learning English is that it is often
              considered the language of global trade. The international business
              community often uses it for communication, even among people who
              do not speak the same native language. Speaking and understanding
              English can let a person more easily communicate with others and
              find more job opportunities not only in his or her home country,
              but around the world as well.SS coaching has a trained english
              teachers for educating students English course as per NIOS
              guidelines.
            </p>

            {/* ================= IMAGE PLACEHOLDER ================= */}
            <div className="image-placeholder-box">
               <img src="/assets/images/summary/12th/english12th.png"></img>
            </div>
            <br/>

            {/* ================= COURSE DETAILS ================= */}
            <p>
              The English subject in NIOS course is framed for those who have
              passed the Secondary Course (Xth examination) from any recognized
              board and have the will to pursue the study towards a Senior
              Secondary (XII) degree cartificate.For a Senior Secondary Course
              from NIOS the main sploken languages subjects are Hindi, English,
              Urdu and Sanskrit but there are other subjects also offered at
              Senior Secondary level include Mathematics, Physics, Chemistry,
              Biology, History, Geography, Political Science, Economics, Business
              Studies, Accountancy, Psychology, Home Science, Word Processing
              (English), Computer Science, Sociology, Painting and Mass
              Communication.
            </p>

            {/* ================= NIOS STATS ================= */}
            <p>
              National Institute of Open Schooling (NIOS) has marked a sharp
              increase in number of students between the age group of 14 to 20,
              who are opting for open-schooling system of education. In 2012-13,
              there was a very sharp rise in number of enrolled students for open
              school courses. The nationwide figures are even more shocking,
              35,000 more students took admission in open schools this year
              compared to last year. With changing times, parents are seen to be
              showing keen interest in imparting knowledge to their kids in the
              most unconventional fashion through NOS. Several parents,
              nowadays, are encouraging their children to opt for home-schooling
              or open schooling system so that they can spend time in other
              career activities too.
            </p>

            <hr />
            <br/>

            {/* ================= QUOTE ================= */}
            <blockquote className="quote-box">
              <h5>“You can never be overdressed or overeducated.”</h5>
              <h4> <span className="nios-125h-senior-highlight">- Oscar Wilde</span></h4>
            </blockquote>


              <div className="ftr-links">
                <div className="subject-card-buttons">
              <a
                href="/subject/syllabus-class-12th/syllabus-english-senior-secondary-nios-302"
                className="subject-btn"
              >
                View Syllabus
              </a>
              <a href="/subject/curriculum-12th/curriculum-english" className="subject-btn">
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
