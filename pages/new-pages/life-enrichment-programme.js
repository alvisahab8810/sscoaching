import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function LifeEnrichmentProgrammeNIOS() {
  return (
    <>
      <Head>
        <title>
          What is Life Enrichment Programme in NIOS ? | SS Coaching
        </title>
        <meta
          name="description"
          content="Know about the Life Enrichment Programme (LEP) offered by NIOS including performing arts and holistic development courses."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              What is Life Enrichment Programme in NIOS ?
            </h1>

            <p>
              NIOS board wants to improve way of life further by providing enrichment programmes to help and construct holistic form of modern-day education. This unique programme has been developed by NIOS to specially cater for its students - shaping students with a difference. Besides the Academic and Vocational Education courses for various levels of school education, the NIOS continued developmental activities in the Life Enrichment Programmes (LEPs) ,such as performing Arts (Music, Dance, Painting), Jeevan Vigyan, Paripurna Mahila (Empowered Women), Yog and Jan Swasthya (Public Health) Life Enrichment Programmes addresses the educational, social, cultural, and recreational urge of the under-represented and marginalized have potential to assist individuals in the community to enjoy leisure and recreational pursuits to elevate and strengthen skill development, promote self-esteem and build self-confidence. While each programmes vary in size, structure and focus, they share the same goal of improving the educational status of an individual and contributes to enrich the lives of others in a humane manner.
            </p>


            <p>
              Brief information about the Life Enrichment Programmes offered by NIOS is as follows. Performing Arts Education (Music, Dance and Painting) Performing Arts (Painting, Music and Dance) is a powerful way of self expression providing a sense of fulfillment and achievement. Performing Art is not just a form of art but it is a way of life. Values and Culture are inbuilt in this form. Painting course is aimed at providing necessary inputs of practical work.
            </p>

            <div className="spacer-area"></div>

            <p>
              SSCoaching NIOS lucknow centre, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS lucknow centre, also helps in form filling for admissions in each stream (
              <a
                href="/nios-admission/admission-in-nios-stream-1"
                className="nios-125h-senior-highlight"
              >
                stream 1
              </a>
              ,{" "}
              <a
                href="/nios-admission/admission-in-nios-stream-2"
                className="nios-125h-senior-highlight"
              >
                stream 2
              </a>
              ,{" "}
              <a
                href="/nios-admission/admission-in-nios-stream-3&4"
                className="nios-125h-senior-highlight"
              >
                stream 3 & 4
              </a>
              ) of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS lucknow centre can guide you with the admission process for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
