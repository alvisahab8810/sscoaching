import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusHindiSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Curriculum Economics Senior  Secondary | NIOS</title>
        <meta
          name="description"
          content="Curriculum Economics Senior  Secondary NIOS in SS Coaching | Content Unavailable"
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
              Curriculum Economics Senior Secondary NIOS

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
                The detailed syllabus for <strong>Curriculum Economics Senior Secondary NIOS</strong>{" "}
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
