import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function DirectAdmissionSeniorSecondary() {
  return (
    <>
      <Head>
        <title>Can any learner take direct admission in the Senior Secondary courses?</title>
        <meta
          name="description"
          content="Can any learner take direct admission in the Senior Secondary courses in NIOS? Complete eligibility details and NIOS admission information."
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
              Can any learner take direct admission in the Senior Secondary courses?
            </h1>

            <p>
              No, senior secondary is equivalent to 12th, learner cannot take admission in senior secondary without passing out in his secondary exam or 10th from any recognized board institute.
            </p>

              <p>
                Any student who has acquired a minimum age of 14 years can appear for regular exams by NIOS and can appear for 12th exam after a minimum gap of 2 years after the 10th exam
              </p>

              <p>
                (Regular exam can be given directly on scheduled time by NIOS but not on demand)
              </p>

              <p>
                Regular exams are conducted twice in a year in the month of Oct- Nov and in the month of April - May
              </p>

              <h3 className="nios-125h-senior-hero-title">
                Eligibility for pass students
              </h3>

              <p>
                If the students have scored less marks in their regular board exam and are not getting admission in any good colleges can also take up NIOS board exam to score better marks
              </p>

              <p>
                Also if the students has got less marks in the practical exam and because of which they have not been able to achieve a target of 50% (i.e. 250 marks out of 500) can also give this on demand exam and make themselves eligible for better prospects and take admissions in stream of their choice.
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
