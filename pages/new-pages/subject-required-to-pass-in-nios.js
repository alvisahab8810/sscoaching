import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SubjectsRequiredForPassCertificate() {
  return (
    <>
      <Head>
        <title>How many subjects are required to be taken for obtaining the pass certificate?</title>
        <meta
          name="description"
          content="How many subjects are required to be taken for obtaining the pass certificate in NIOS? Pass and certification criteria for Secondary and Senior Secondary courses."
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
              How many subjects are required to be taken for obtaining the pass certificate?
            </h1>

              <p>
                The stress in NIOS board is to bring out the best in you. Every subject is not equally difficult for you. You can learn some subjects very well, may be in six months, whereas some requires more than a year. Keeping this in mind, NIOS allows you to appear in or two subjects, so to build confidence in you of doing well in the examination. You can take some more subjects in the next examination, but do well in each. As soon as you complete the required number of subjects, you get your certificate.
              </p>


              <h2>Pass and Certification Criteria</h2>

              <h3>Secondary Course</h3>

              <h4>Pass Criteria</h4>
              <p>
                A minimum of 33% marks in the aggregate (Theory plus Practicals where applicable) in the public examination.
              </p>

              <h4>Certification Criteria</h4>
              <p>
                Pass in 5 subjects including at least one but not more than two languages
              </p>

              <h3>Senior Secondary Course</h3>

              <h4>Pass Criteria</h4>
              <p>
                A minimum of 33% marks (separately in theory and Practicals in subjects having both and also in aggregate) in the public examination.
              </p>

              <h4>Certification Criteria</h4>
              <p>
                Pass in 5 subjects including at least one but not more than two languages.
              </p>

              <p>
                NIOS provides the facility of “Transfer of Credit” to a maximum of 4 subjects from NIOS(Old Registration), if passed in 1995 or later and to a maximum of 2 subjects for CBSE /CICSE /UP Board of Secondary Education / Uttranchal Board of Examination / State Open Schools, if passed in 2000 or later, provided these subjects are also available in NIOS programme.
              </p>

              <p>
                SSCoaching NIOS lucknow centre, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS lucknow centre, also helps in form filling for admissions in each stream  (
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
              )  of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS lucknow centre can guide you with the admission process for all streams of NIOS Board.
              </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
