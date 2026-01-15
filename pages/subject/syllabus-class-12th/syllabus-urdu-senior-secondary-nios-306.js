import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusUrduSeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Urdu Senior Secondary NIOS</title>
        <meta
          name="description"
          content="NIOS Syllabus For Senior Secondary Urdu"
        />
        <meta
          name="keywords"
          content="NIOS Urdu syllabus, Urdu Senior Secondary NIOS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Syllabus Urdu Senior Secondary NIOS
            </h1>


            <div className="border p-4 mt-4">
                <h2
              style={{
                color: "red",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              Syllabus Unavailable
            </h2>

            <h2
              style={{
                color: "red",
                textAlign: "center",
                fontWeight: "700",
                marginTop: "10px",
              }}
            >
              Content Will Be Updated Shortly
            </h2>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
