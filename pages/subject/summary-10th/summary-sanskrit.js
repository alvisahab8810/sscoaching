import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusSanskritSecondaryNIOS209() {
  return (
    <>
      <Head>
        <title>
          Sanskrit Course (209) in NIOS Secondary 10th | SS Coaching
        </title>
        <meta
          name="description"
          content="SS Coaching NIOS Center in Lucknow, Provides form filling for admission in NIOS Board (National Institute of Open Schooling) as well as NIOS Coaching Classes, Syllabus and Tuition for 10th (secondary) & 12th (senior secondary) Students. Contact us for all inquiries related to NIOS Board in Lucknow"
        />
        <meta
          name="keywords"
          content="NIOS exam centre registration, NIOS Study Centre Contact Number, nios head office contact number, nios regional centre list, nios contact number, NIOS Study Centre List, NIOS Coaching in Lucknow, NIOS admission Lucknow,"
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
                Sanskrit Course (209)
              </span>{" "}
              in NIOS Secondary 10th
            </h1>

            <hr />

            {/* ================= INTRO CONTENT ================= */}
            <p>
              There are many benefits of learning Sanskrit, the powerful language
              of love, wisdom, knowledge and joy. It is not a difficult language
              to learn when you have a good teacher, and well crafted study
              materials that are easy to follow and engaging. SS Coaching
              Lucknow makes Sanskrit classes very easy and interesting to
              understand. If the teacher does not know how to teach and/or the
              pupil does not know how to learn, of course Sanskrit will be very
              difficult to learn. However, the teacher is lastly responsible
              for this. He should teach his pupils how to learn Sanskrit.
            </p>

            {/* ================= IMAGE PLACEHOLDER ================= */}
            <div className="image-placeholder-box">
              <img
                src="/assets/images/summary/10th/sanskrit.png"
                alt="Sanskrit Course NIOS Secondary 10th"
              />
            </div>

            <br />

            {/* ================= COURSE DETAILS ================= */}
            <p>
              Sanskrit stands out above all other languages for its beauty of
              sound, precision in pronunciation and reliability as well as
              thoroughness in every aspect of its structure. Sanskrit is the
              only language that has consciously laid out its sounds from first
              principles. Sanskrit has the most comprehensive writings in the
              world expressed through the Vedas and the Gítá. The Upanishads
              –translated by William Butler Yeats have given people from all
              over the world an insight into universal religious feelings for
              more than one century now.Sanskrit was once the most influential
              literary language in India, and texts written in the language
              could be understood by millions of people throughout the South
              Asian world. These texts contain profound meditations on every
              point on the spectrum of human concern: existence, reality, God,
              love, duty, marriage, war, sex, death, violence, laughter,
              beauty, perception, nature, anatomy, urbanity, ritual, desire,
              food, purpose, meaning, and language, among hundreds of others.
              Moreover, Sanskrit texts are the repository of non-modern modes
              of thought, and they present distinct conceptions of the world
              that are often at odds with the understanding we have today. By
              learning how people used to think, we better understand both
              ourselves and the world we have inherited.
            </p>

            <hr />
            <br />

            {/* ================= QUOTE ================= */}
            <blockquote className="quote-box">
              <h5>
                "Education is not preparation for life; education is life itself."
              </h5>
            </blockquote>

            {/* ================= BUTTONS ================= */}
            <div className="ftr-links">
              <div className="subject-card-buttons">
                <a
                  href="/subject/syllabus-class-10th/syllabus-sanskrit-nios-209"
                  className="subject-btn"
                >
                  View Syllabus
                </a>
                <a
                  href="/subject/curriculum-10th/curriculum-sanskrit"
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
