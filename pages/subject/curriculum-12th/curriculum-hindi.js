import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusHindiSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Curriculum of Hindi Senior Secondary NIOS | SSCoaching</title>
        <meta
          name="description"
          content="Hindi courses class 12th Senior Secondary NIOS by SS Coaching and Hindi curriculum for 12th standard or senior secondary."
        />

           <meta
          name="keywords"
          content="Hindi class 12th solved question papers, Hindi online learning, Hindi courses online, senior secondary Hindi curriculum, class 12 NIOS Hindi curriculum, Hindi question paper 2022, 2023, board Hindi previous papers, Hindi coaching in Lucknow, Hindi study material for the board exam, Hindi class 12th notes, Hindi courses, courses in Hindi NIOS study material for Hindi, Hindi failed student, online admission for the board exam, the board failed students, NIOS 12 class Hindi curriculum, sample papers for class 12th Hindi, NIOS Hindi curriculum, NIOS Hindi curriculum class 12, online admission website, Hindi curriculum for NIOS exam, Hindi sample papers for class 12, Hindi courses for 12th NIOS, instructions for online classes for 12th NIOS, Hindi sample paper 2024, Curriculum Hindi Senior Secondary NIOS 2024."
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
              Curriculum Hindi Senior Secondary NIOS


            </h1>

            <h2>
              <span className="nios-125h-senior-highlight">
                Content Unavailable
              </span>
            </h2>

            {/* ================= MESSAGE BOX ================= */}
            <div
              style={{
                marginTop: "40px",
                padding: "30px",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                backgroundColor: "#f9f9f9",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "18px", lineHeight: "1.8" }}>
                The detailed syllabus for <strong>Curriculum Hindi Senior Secondary NIOS
</strong>{" "}
                under NIOS is currently not available on our website.
              </p>

              <p style={{ marginTop: "15px" }}>
                Our team at <strong>SS Coaching</strong> is working to update
                this content soon.
              </p>

              <p style={{ marginTop: "15px" }}>
                For complete syllabus details, study material, or admission
                guidance, please contact us directly.
              </p>

              <a
                href="tel:9935035316"
                className="cta-button cta-button1"
                style={{ marginTop: "20px", display: "inline-block" }}
              >
                Contact SS Coaching – +91 9935035316
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
