import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusUrduSeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Of Urdu In NIOS for Senior Secondary Education | SSCoaching</title>
        <meta
          name="description"
          content="Urdu Course 12th class NIOS Board Lucknow by SS Coaching and prepare your Urdu subject and get the whole syllabus from NIOS board and information of Urdu syllabus for NIOS board of class 12th and senior secondary."
        />
        <meta
          name="keywords"
          content="Urdu class 12th notes, Urdu courses, courses in Urdu, NIOS study material for Urdu, Urdu courses, courses in Urdu NIOS study material for Urdu, Urdu failed student, how to learn Urdu, online admission for board exam, board failed students, Urdu learning, Urdu to English, online English speaking, Urdu translation, NIOS 12 class Urdu syllabus, NIOS Urdu syllabus class 12, class 12 NIOS Urdu syllabus, Urdu question paper, board Urdu previous papers, Urdu coaching in Lucknow, Urdu study material for board exam, NIOS class 12 Urdu question paper, Urdu class 12th solved question papers, Urdu online learning, Urdu courses online, senior secondary Urdu syllabus, class 12 NIOS Urdu syllabus, Urdu question paper 2019, board Urdu previous papers, NIOS 12 class Urdu syllabus, Urdu coaching in Lucknow, Urdu study material for board exam, NIOS Urdu question paper 2022, 2023, NIOS Urdu sample paper 2024"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
               <BranchContactCanvas/>
        

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
