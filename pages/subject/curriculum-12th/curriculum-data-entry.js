import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function CurriculumDataEntrySeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Curriculum of Data Entry Operations Senior Secondary NIOS | SS Coaching</title>
        <meta
          name="description"
          content="Data Entry Operations (336) Course 12th class NIOS Board Lucknow by SS Coaching. Get complete curriculum details of Data Entry Operations Senior Secondary NIOS."
        />

        <meta
          name="keywords"
          content="Data Entry Operations curriculum, NIOS 336 curriculum, NIOS Data Entry Senior Secondary, Data Entry Operations class 12 curriculum, NIOS Data Entry study material, Data Entry course NIOS Lucknow, NIOS board Data Entry Operations"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">
            {/* ================= PAGE TITLE ================= */}
            <h1 className="nios-125h-senior-hero-title">
              Curriculum Data Entry Senior Secondary NIOS
            </h1>

            <h2>
              <span className="nios-125h-senior-highlight">
                Curriculum Unavailable
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
                The detailed curriculum for <strong>Data Entry Operations (336) Senior Secondary NIOS</strong>{" "}
                is currently unavailable on our website.
              </p>

              <p style={{ marginTop: "15px" }}>
                Content will be updated shortly.
              </p>

              <p style={{ marginTop: "15px" }}>
                For complete curriculum details, study material, or admission
                guidance, please contact SS Coaching directly.
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
