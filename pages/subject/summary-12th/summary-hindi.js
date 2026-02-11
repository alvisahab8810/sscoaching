import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusHindiSeniorNIOS() {
  return (
    <>
      <Head>
        <title>
          Hindi Course (301) summary for Senior Secondary-NIOS
        </title>
        <meta
          name="description"
          content="The National Institute of Open Schooling (NIOS) has been taking steps for progressive use of Hindi (as the official language) in order to improve the provisions of the official language as per guidelines issued from the Government of India. SS Coaching also understands the importance of Hindi as a National Language."
        />
        <meta
          name="keywords"
          content="Hindi class 12th solved question papers, Hindi online learning, Hindi courses online, senior secondary Hindi syllabus, class 12 NIOS Hindi syllabus, Hindi question paper, board Hindi previous papers, Hindi coaching in Lucknow, Hindi study material for board exam, Hindi class 12th notes, Hindi sample papers for class 12 NIOS, question paper of Hindi, NIOS sample papers for class 12th Hindi, Hindi class 12th NIOS syllabus, Hindi syllabus for NIOS, NIOS class 12 Hindi question paper, Hindi sample papers for class 12, Hindi courses for 12th NIOS, instructions for online classes for 12th NIOS, NIOS Hindi question paper 2022, 2023, NIOS Hindi sample paper 2024"
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
                Hindi Course (301)
              </span>{" "}
              in NIOS Senior Secondary 12th
            </h1>

            <hr />

            {/* ================= INTRO CONTENT ================= */}
            <p>
              The National Institute of Open Schooling (NIOS) has been taking
              steps for progressive use of Hindi (as the official language) in
              order to improve the provisions of the official language as per
              guidelines issued from the Government of India. SS Coaching also
              understands the importance of Hindi as a National Language.
            </p>

            {/* ================= IMAGE PLACEHOLDER ================= */}
            <div className="image-placeholder-box">
              <img
                src="/assets/images/summary/12th/hindi.png"
                alt="Hindi Course NIOS Class 12"
              />
            </div>
            <br />

            {/* ================= COURSE DETAILS ================= */}
            <p>
              It is well known that Hindi is a useful language which are learned
              by more and more language learners at present. In fact, any
              language can play an important role in the world if only it is
              useful for the certain people group. So as the developing of the
              world, there are more and more kinds of languages which are
              learned by different people groups.So if you are very interested
              in Hindi language but you do not know why you need to it, at this
              time, here are some knowledge for you to have a study to make sure
              that whether you need to learn it. First, you can have a
              traveling in India countries. It is well known that Hindi is the
              official language which is spoken by thousands of Indian people.
              Hindi is a old beautiful language which has a lots of Indian
              poetry, literature as well as many sacred texts, and most of
              these poetry and the literature are very worth of reading, so if
              you are very interested in good literature, you can have a deep
              study on the Indian literature and learn the spirit of the Indian
              culture at a deep degree. Third, in the modern times, there are
              more and more excellent Indian films coming form the India
              countries.
            </p>

            <hr />
            <br />

           

            {/* ================= QUOTE ================= */}
            <blockquote className="quote-box">
              <h5>
                “All of life is a constant education.”
              </h5>
              <h4>
                <span className="nios-125h-senior-highlight">
                  - Eleanor Roosevelt
                </span>
              </h4>
            </blockquote>


             {/* ================= FOOTER LINKS ================= */}
            <div className="ftr-links">
              <div className="subject-card-buttons">
                <a
                  href="/subject/syllabus-class-12th/syllabus-hindi-senior-secondary-nios-301"
                  className="subject-btn"
                >
                  View Syllabus
                </a>
                <a
                  href="/subject/curriculum-12th/curriculum-hindi"
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
