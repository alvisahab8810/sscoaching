import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusIndianCultureHeritageSecondaryNIOS223() {
  return (
    <>
      <Head>
        <title>
          Indian Culture And Heritage (223) Course summary for Secondary-NIOS
        </title>
        <meta
          name="description"
          content="Indian Culture And Heritage (223) Course for class Secondary NIOS Board. The course involved lectures on various aspects of Indian Art and Culture ranging from architecture, music, theatre, cinema, and painting to storytelling. Indian Heritage and Culture course helps in promoting the conservation of our heritage."
        />
        <meta
          name="keywords"
          content="indian culture and heritage nios, nios indian culture and heritage book, indian culture nios, indian culture and heritage book, nios indian culture and heritage book in hindi pdf, nios indian culture and heritage, indian culture and heritage, cultural heritage of India, indian culture and heritage pdf, cultural heritage of india pdf, cultural heritage of india project pdf, NIOS Indian Culture and Heritage question paper 2022, 2023, NIOS Indian Culture and Heritage sample paper 2024"
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
                Indian Culture and Heritage Course (223)
              </span>{" "}
              in NIOS Secondary 10th
            </h1>

            <hr />

            {/* ================= INTRO CONTENT ================= */}
            <p>
              Indian Heritage and Culture course helps in promoting the
              conservation of our heritage and also helps in culture management.
              It opens the door to opportunities in the streams of Archaeology,
              Museology, Conservation, Social Sciences and Humanities.During this
              time the learners will participate in various learning activities
              inside SS Coaching which serve as an orientation for their
              programme.
            </p>

            {/* ================= IMAGE PLACEHOLDER ================= */}
            <div className="image-placeholder-box">
              <img
                src="/assets/images/summary/10th/indian-culture.png"
                alt="Indian Culture and Heritage NIOS Class 10"
              />
            </div>

            <br />

            {/* ================= COURSE DETAILS ================= */}
            <p>
              The course involved lectures on various aspects of Indian Art and
              Culture ranging from architecture, music, theatre, cinema,
              painting to storytelling. Some of the notable lectures were those
              on Ancient Buddhist Art and Architecture and Ancient Indian Temple
              Architecture. It refers to the intellectual development evolved
              out of the physical and mental training acquired in the course of
              the ages in a country.
            </p>

            <p>
              India’s one billion people have descended from a variety of races.
              The oldest ones are the Negroid aboriginals called the Adivasis or
              First settlers. Then there are the Dravidians, The Aryans, the
              Mongols, The Semites and innumerable inter-mixtures of one with the
              other. Later, religions became an important part in the culture
              and places of worship became community centers. The innovations in
              religious thinking brought two popular beliefs in India, namely
              Buddhism by the Buddha and Jainism by the Saint Mahavir. Then there
              was a socio-religious shift or orientation in the Indian culture.
              Later in the century Westernization of Indian culture began , but
              it was stemmed by the efforts of Raja Ram Mohan Roy, Dayananda
              Saraswathi, Swami Vivekananda, Narayana Guru, Maharisi, Aurobindo,
              etc. Then there took place a Renaissance, that emphasized the need
              to recognize the country’s own culture while ushering in an age of
              modernity.
            </p>

            <hr />
            <br />

            {/* ================= QUOTE ================= */}
            <blockquote className="quote-box">
              <h5>
                "Education's purpose is to replace an empty mind with an open
                one."
              </h5>
              <h4>
                <span className="nios-125h-senior-highlight">
                  - Malcolm S. Forbes
                </span>
              </h4>
            </blockquote>

            {/* ================= BUTTONS ================= */}
            <div className="ftr-links">
              <div className="subject-card-buttons">
                <a
                  href="/subject/syllabus-class-10th/syllabus-Indian-heritage-culture-nios-223"
                  className="subject-btn"
                >
                  View Syllabus
                </a>
                <a
                  href="/subject/curriculum-10th/curriculum-indian-culture-and-heritage"
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
