import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function NIOSPassCriteria() {
  return (
    <>
      <Head>
        <title>
          Is it compulsory to pass in N.I.O.S theory and practical exams
          separately?
        </title>
        <meta
          name="description"
          content="Is it compulsory to pass in NIOS theory and practical exams separately? Check pass criteria for Class X and Class XII."
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
              Is it compulsory to pass in N.I.O.S theory and practical exams
              separately?
            </h1>

            <p>
              Pass Criteria for Secondary Course (Class X) in a subject for NIOS
              is a minimum of 33% marks in the aggregate (Theory plus practical
              wherever applicable) in the public examination. The marks obtained
              in TMA will be shown separately in the marksheet. The
              Certification Criteria is passing in 5 subjects including at least
              one but not more than two languages.
            </p>

            <p>
              Pass Criteria for Senior Secondary Course (Class XII) in a subject
              for NIOS is a minimum of 33% marks in the aggregate as well as
              separately in theory and practicals in the public examination. The
              marks obtained in TMA will be shown separately in the marksheet.
              The Certification Criteria is Pass in 5 subjects including at
              least one but not more than two languages. NIOS has introduced 20%
              weightage of TMA marks in the Public Examinations at Secondary and
              Senior Secondary level.
            </p>

            <p>
              SSCoaching nios Lucknow, helps students get complete information
              about NIOS board (National Institute of Open Schooling) with
              coaching classes that prepare students for clearing nios exams,
              syllabus and tuition for 10th & 12th students of NIOS Board by
              qualified staff and trainers who have a decades experience of nios
              curriculum. SS Coaching NIOS Lucknow, also helps in form filling
              for admissions in each stream (
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
              </a>{" "}
              ,{" "}
              <a
                href="/nios-admission/admission-in-nios-stream-3&4"
                className="nios-125h-senior-highlight"
              >
                stream 3 & 4
              </a>
              ) of NIOS Board for 10th and 12th admission seekers.
            </p>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
