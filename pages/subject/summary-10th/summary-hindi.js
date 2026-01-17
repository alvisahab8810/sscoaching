import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusHindiSecondaryNIOS201() {
  return (
    <>
      <Head>
        <title>
          Hindi (201) Course summary for Secondary-NIOS
        </title>
        <meta
          name="description"
          content="Hindi (201) Course for Secondary NIOS Board. The National Institute of Open Schooling (NIOS) has been taking steps for the progressive use of Hindi. SS Coaching also understands the importance of Hindi as a National Language."
        />
        <meta
          name="keywords"
          content="admission application form, NIOS admission in 10th class, NIOS stream 2, NIOS online exam, NIOS admission, NIOS question papers, 10th sample papers, question paper of hindi, sample paper for class 10th, NIOS guide, 10 board papers, NIOS in Hindi, hindi question paper class 10, NIOS college admission, admission form, NIOS subjects for class 10,10th admission online, online certificate courses, admission application, NIOS online admission 10th class, NIOS hindi, NIOS hindi book class 10, hindi NIOS class 10, NIOS hindi book, NIOS hindi pdf, NIOS Hindi question paper 2022, 2023, NIOS Hindi sample paper 2024"
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
                Hindi Course (201)
              </span>{" "}
              in NIOS Secondary 10th
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
                src="/assets/images/summary/10th/hindi.png"
                alt="Hindi Course NIOS Secondary 10th"
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
              that whether you need to learn it. First, you can have a traveling
              in India countries. It is well known that Hindi is the official
              language which is spoken by thousands of Indian people. Hindi is a
              old beautiful language which has a lots of Indian poetry,
              literature as well as many sacred texts, and most of these poetry
              and the literature are very worth of reading, so if you are very
              interested in good literature, you can have a deep study on the
              Indian literature and learn the spirit of the Indian culture at a
              deep degree. Third, in the modern times, there are more and more
              excellent Indian films coming form the India countries.
            </p>

            <hr />
            <br />

            {/* ================= QUOTE ================= */}
            <blockquote className="quote-box">
              <h5>
                "Education is not filling a pail but the lighting of a fire."
              </h5>
              <h4>
                <span className="nios-125h-senior-highlight">
                  - William Butler Yeats
                </span>
              </h4>
            </blockquote>

            {/* ================= BUTTONS ================= */}
            <div className="ftr-links">
              <div className="subject-card-buttons">
                <a
                  href="/subject/syllabus-class-10th/syllabus-hindi-nios-201"
                  className="subject-btn"
                >
                  View Syllabus
                </a>
                <a
                  href="/subject/curriculum-10th/curriculum-hindi"
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
