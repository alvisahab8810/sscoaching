import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SanskritSubject309NIOS() {
  return (
    <>
      <Head>
        <title>Sanskrit Course (309) summary for Senior Secondary-NIOS</title>
        <meta
          name="description"
          content="Sanskrit Course (309) for Senior Secondary NIOS. Get all the details about the Sanskrit subject of standards from the NIOS board. SS Coaching makes Sanskrit classes very easy and interesting to understand."
        />
        <meta
          name="keywords"
          content="sanskrit coaching institutes, online Sanskrit coaching, top Sanskrit Vedic style coaching institutes, coaching for Sanskrit learning, Sanskrit coaching centre 12th, nios Sanskrit books, nios coaching, nios Sanskrit coaching centre, nios Sanskrit classes,nios Sanskrit material, nios coaching online, nios Sanskrit course, nios online coaching Sanskrit, nios online course Sanskrit material, nios online study material,nios Sanskrit, nios, study material, nios tuition, study material nios, sanskrit subject, sanskrit question, NIOS Sanskrit question paper 2022, 2023, NIOS Sanskrit sample paper 2024"
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
              Sanskrit Subject (309) In NIOS Senior Secondary 12th
            </h1>

            <p className="mt-4">
              There are many benefits of learning Sanskrit, the powerful language
              of love, wisdom, knowledge and joy. It is not a difficult language
              to learn when you have a good teacher, and well crafted study
              materials that are easy to follow and engaging. SS Coaching
              Lucknow makes Sanskrit classes very easy and interesting to
              understand. If the teacher does not know how to teach and/or the
              pupil does not know how to learn, of course Sanskrit will be very
              difficult to learn. However, the teacher is lastly responsible for
              this. He should teach his pupils how to learn Sanskrit.
            </p>

            {/* IMAGE PLACEHOLDER – YOU WILL ADD IMAGE */}
            <div
              style={{
                width: "100%",
                height: "260px",
                backgroundColor: "#0b3a3a",
                margin: "30px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "18px",
              }}
            >

             <img src="/assets/images/syllabus/sanskrit.jpg"></img>
              {/* Image Will Be Added Here */}
            </div>

            <p>
              Sanskrit stands out above all other languages for its beauty of
              sound, precision in pronunciation and reliability as well as
              thoroughness in every aspect of its structure. Sanskrit is the
              only language that has consciously laid out its sounds from first
              principles. Sanskrit has the most comprehensive writings in the
              world expressed through the Vedas and the Gītā. The Upanishads
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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
              }}
            >
              <a href="#" style={{ color: "#0d6efd" }}>
                View Syllabus
              </a>

              <a href="#" style={{ color: "#0d6efd" }}>
                View Curriculum
              </a>
            </div>

            <div
              style={{
                marginTop: "50px",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              <p style={{ fontSize: "18px", fontWeight: "600" }}>
                “It's what we think we know that keeps us from learning.”
              </p>
              <p style={{ color: "#c9a227", fontWeight: "600" }}>
                - Claude Bernard
              </p>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
