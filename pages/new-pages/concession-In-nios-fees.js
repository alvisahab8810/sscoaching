import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function NIOSFeesConcession() {
  return (
    <>
      <Head>
        <title>
          Does NIOS allow any fees concession? | SS Coaching
        </title>
        <meta
          name="description"
          content="Know about NIOS fees concession for SC/ST and Disabled students for Secondary and Senior Secondary courses."
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
              Does NIOS allow any fees concession?
            </h1>

            <p>
              Yes, their is concession for nios fees, but only to PWD and SC/ST students.National Institute of Open Schooling (NIOS) for not granting the services of writers and other concessions to female, SC/ST/Ex-servicemen and Disabled(special) students appearing for Standard X and XII board exams
            </p>

          

            <p>
              No Concession for general category
            </p>

            <h3 className="nios-125h-senior-hero-title">
              Concession in fee to SC/ST candidates:
            </h3>

            <p>
              The SC/ST students are given concession in admission fees to the extent of Rs.450/- for Secondary Courses and Rs.525/- for Senior Secondary Courses.
            </p>

            <p>
              Concession: 50% concession in fees is given.
            </p>

            <h3 className="nios-125h-senior-hero-title">
              Concession in fee to Disabled (Special) Students:
            </h3>

            <p>
              This year 220 students with neurological disorders had applied to the NIOS board for concessions such as the
            </p>

            <ul className="chapter-list">
              <li>use of calculators</li>
              <li>writers</li>
              <li>extra time</li>
            </ul>

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
