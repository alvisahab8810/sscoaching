import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function ValidProofDateOfBirth() {
  return (
    <>
      <Head>
        <title>What is the valid proof of date of birth?</title>
        <meta
          name="description"
          content="Valid proof of date of birth for NIOS admission. Complete details as per new provisions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              What is the valid proof of date of birth?
            </h1>

            <p>
              The certificate of date of birth issued by a Municipal Corporation, a Municipal Body, a Village Panchayat or any other body authorised by the Registrar, Birth and Death, Government of India is a valid proof. However, in case of orphans, street children etc., a medical certificate in respect of age issued by Government Hospital is also acceptable as valid proof.
            </p>


            <h3 className="nios-125h-senior-hero-title">
              As per the new provisions
            </h3>

            <p>
              All candidates, irrespective of whether they were born on or before January 26, 1989, may submit an attested copy of the birth certificate issued by a municipal authority or by the Registrar of Births and Deaths.
            </p>

            <p>
              They can also submit an attested copy of the date of birth certificate from the school last attended
            </p>

            <p style={{ textAlign: "center" }}>
              Or
            </p>

            <p>
              Transfer certificate or affidavit sworn before a first class magistrate stating nationality and the date of birth.
            </p>

            <p>
              The birth certificate should carry greater authoritativeness, mainly because the details in it comes from information supplied by your parents plus articulating with information provided or cross-checked with the hospital or the relevant health authorities. It also has the advantage of official authoritativeness
            </p>

            <p>
              SSCoaching NIOS lucknow centre, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS lucknow centre, also helps in form filling for admissions in each stream (stream 1, stream 2, stream 3 & 4) of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS lucknow centre can guide you with the admission process for all streams of NIOS Board including{" "}
              
              <a
                href="/nios-admission/admission-in-nios-stream-1"
                className="nios-125h-senior-highlight"
              >
                stream 1{" "}
              </a>
              ,{" "}
              <a
                href="/nios-admission/admission-in-nios-stream-2"
                className="nios-125h-senior-highlight"
              >
                stream 2{" "}
              </a>
              ,{" "}
              <a
                href="/nios-admission/admission-in-nios-stream-3&4"
                className="nios-125h-senior-highlight"
              >
                stream 3 & 4
              </a>
              .
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
