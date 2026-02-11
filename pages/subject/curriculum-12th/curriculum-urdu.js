import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusUrduSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Curriculum of Urdu Senior Secondary NIOS | SSCoaching</title>
        <meta
          name="description"
          content="Urdu Course 12th class NIOS Board Lucknow by SS Coaching and prepare your Urdu subject and get the whole curriculum from NIOS board and information of Urdu curriculum for NIOS board of class 12th."
        />

           <meta
          name="keywords"
          content="Urdu class 12th notes, Urdu curriculum, curriculum in Urdu, NIOS study material for Urdu, Urdu curriculum, courses in Urdu NIOS study material for Urdu, Urdu failed student, how to learn Urdu, online admission for board exam, board failed students, Urdu learning, Urdu to English, Urdu translation, NIOS 12 class Urdu curriculum, NIOS Urdu curriculum class 12, class 12th NIOS Urdu syllabus, Urdu question paper Senior Secondary, NIOS board Urdu previous papers, Urdu coaching in Lucknow, Urdu study material for board exam, NIOS class 12 Urdu question paper, Urdu class 12th solved question papers, Urdu online learning, Urdu courses online, senior secondary Urdu curriculum, class 12 NIOS Urdu curriculum, Urdu question paper, board Urdu previous papers, NIOS 12 class Urdu curriculum, Urdu coaching in Lucknow, Urdu study material for board exam, Curriculum Urdu Senior Secondary NIOS 2024"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
               <BranchContactCanvas/>
        

        <div className="syllabus-nios">
          <div className="container">
            {/* ================= PAGE TITLE ================= */}
            <h1 className="nios-125h-senior-hero-title">
              Curriculum Urdu Senior Secondary NIOS

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
                The detailed syllabus for <strong>Curriculum Urdu Senior Secondary NIOS</strong>{" "}
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
