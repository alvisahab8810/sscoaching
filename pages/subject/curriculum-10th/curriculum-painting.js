import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusPaintingNIOS() {
  return (
    <>
      <Head>
        <title>Curriculum Painting | NIOS</title>
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

        <div className="syllabus-nios">
          <div className="container">
            {/* ================= PAGE TITLE ================= */}
            <h1 className="nios-125h-senior-hero-title">
              Curriculum Painting of NIOS in SS Coaching
            </h1>

            <h2>
              <span className="nios-125h-senior-highlight">
                Painting
              </span>
            </h2>

            {/* ================= COURSE CONTENTS ================= */}
            <h3 className="nios-125h-senior-hero-title">Course Contents</h3>

            {/* ================= THEORY ================= */}
            <h3 className="nios-125h-senior-hero-title">1 – Theory</h3>

            {/* ================= MODULE I ================= */}
            <h3 className="nios-125h-senior-hero-title">Module - I</h3>

            <h4>Introduction of Indian Art</h4>

            <p>1. History and Appreciation of Art (From 3000 BC to 600 AD)</p>
            <p>2. History and Appreciation of Art From 7th AD to 12th AD</p>
            <p>
              3. History and Appreciation of Art From 12th Century AD to 18th
              Century AD
            </p>
            <p>4. Folk Art of India</p>

            <hr />

            {/* ================= MODULE II ================= */}
            <h3 className="nios-125h-senior-hero-title">Module - II</h3>

            <h4>Introduction of Western Art</h4>

            <p>5. Renaissance</p>
            <p>6. Impressionism</p>
            <p>7. Cubism, Surrealism and Abstract Art</p>

            <hr />

            {/* ================= MODULE III ================= */}
            <h3 className="nios-125h-senior-hero-title">Module - III</h3>

            <h4>Introduction of Contemporary Indian Art</h4>

            <p>8. Pioneers of Contemporary Indian Art</p>
            <p>9. Contemporary Indian Art</p>

            <hr />

            {/* ================= PRACTICAL ================= */}
            <h3 className="nios-125h-senior-hero-title">2 – Practical</h3>

            <p>10. Object study</p>
            <p>11. Nature study</p>
            <p>12. Human and Animal figure</p>
            <p>13. Composition</p>

            <hr />

            {/* ================= PRACTICAL GUIDELINES ================= */}
            <h3 className="nios-125h-senior-hero-title">
              Practical Guidelines
            </h3>

            <p>1. Tools and Material</p>
            <p>2. Object study</p>
            <p>3. Nature study</p>
            <p>4. Human Figure</p>
            <p>5. Study of Animals and Birds</p>
            <p>6. Composition</p>

            <a
              href="tel:9935035316"
              className="cta-button cta-button1"
            >
              For any help related to admission in NIOS please contact SS Coaching
              on our Mobile No. +91 9935035316
            </a>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
