import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function ValidityPeriodNIOS() {
  return (
    <>
      <Head>
        <title>What is the validity period of admission?</title>
        <meta
          name="description"
          content="Validity period of NIOS Admission for Secondary and Senior Secondary level including credit accumulation and TOC."
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
              What is the validity period of admission?
            </h1>

            <h3 className="nios-125h-senior-hero-title">
              Validity of NIOS Admission
            </h3>

            <p>
              Your admission is valid for five years. For Public Examination at Secondary and Senior Secondary level, you may take nine or fewer chances to successfully complete the course during this period.
            </p>

            <p>
              Once register it is valid for 5 years for both secondary and senior secondary.
            </p>

            <h3 className="nios-125h-senior-hero-title">
              Part Admission
            </h3>

            <p>
              Under this scheme, you may take admission in one or more subjects but not more than four subjects. On passing, you will be issued only the Marksheet.
            </p>

            <h3 className="nios-125h-senior-hero-title">
              Continuous Assessment
            </h3>

            <p>
              During your course of study, you will know your progress through Tutor Marked Assignments (TMAs).
            </p>

            <h3 className="nios-125h-senior-hero-title">
              Flexible Scheme of Admission
            </h3>

            <p>
              You can access NIOS admission through On-line (Ni-On) under various streams directly or approach a near by Study Centre/Facilitation Centre.
            </p>

            <h3 className="nios-125h-senior-hero-title">
              Flexible Scheme of Examination
            </h3>

            <p>
              Public examinations are conducted by NIOS twice a year. You get nine chances to appear in the public examinations over a period of five years to complete your courses. However, at Secondary level you can choose any of the following for getting evaluated and certified:
            </p>

            <ul className="chapter-list">
              <li>Public examination conducted by NIOS twice a year.</li>
              <li>On Demand Examination System (ODES).</li>
              <li>Public examination in some subjects and ODES in other subjects.</li>
            </ul>

            <h3 className="nios-125h-senior-hero-title">
              Credit Accumulation
            </h3>

            <p>
              You can choose to appear in anyone or more subjects in any examination and earn credit which will be accumulated till all five subjects required for certification are successfully completed within a period of 5 years of registration.
            </p>

            <h3 className="nios-125h-senior-hero-title">
              Transfer of Credit
            </h3>

            <p>
              You can avail the facility of Transfer of Credit (TOC) to a maximum of two subjects passed from the selected Boards provided these subjects are also available in NIOS scheme of studies. TOC is given as per the conditions.
            </p>

            <p>
              SSCoaching NIOS lucknow centre, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS lucknow centre, also helps in form filling for admissions in each{" "}
              <a href="/nios-admission/admission-in-nios-stream-1" className="nios-125h-senior-highlight">stream 1 </a>,{" "}
              <a href="/nios-admission/admission-in-nios-stream-2" className="nios-125h-senior-highlight">stream 2 </a>,{" "}
              <a href="/nios-admission/admission-in-nios-stream-3&4" className="nios-125h-senior-highlight">stream 3 & 4</a>{" "}
              of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS lucknow centre can guide you with the admission process for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
