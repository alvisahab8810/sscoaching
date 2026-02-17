import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function IsThere11thInNIOS() {
  return (
    <>
      <Head>
        <title>Is there any 11th class in NIOS? | NIOS Admission – SS Coaching</title>
        <meta
          name="description"
          content="Know whether there is Class 11th in NIOS board and understand how NIOS senior secondary works with flexible exam structure."
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
              Is there any 11th class in nios ?
            </h1>

              <p>
                Yes there is a compulsory class 11th in NIOS. It is mandatory to have a year gap between secondary and senior secondary level in NIOS board. The NIOS board never want its students to feel the burden of studies so it has come up with a unique idea that the student can appear to a maximum of 4 subjects of his choice for board exam in his class XI if he feels prepared for the subjects and can appear for the remaining subjects next year at senior secondary level. The certificate will only be issues when the student completes his senior secondary exams by passing in the minimum required subjects to get a pass certificate. This added advantage to students by NIOS board gives it an edge above rest of the boards like CBSE/ICSE/UP and other recognized board in India. The syllabus is in no less competent to any other board as the syllabus is designed by NCERT (National Council of Educational Research and Training).
              </p>


              <p>
                The students preparing for competitive exams such as IIT or AIPMT or NDA etc are preferring to enroll at NIOS board as it gives them ample of time for the preparation of competitive exams as well as manage time to study for board exams as they can appear in some papers in class 11th and the rest in class 12th. These students don’t have to attend regular classes so they can utilize that time at attending coaching classes for their competitive exams.
              </p>

              <p>
                The NIOS board has another program for the failed student or a debarred student due to short attendance or a student who due to any other personal reason was not able to pass class XI can get himself enrolled in NIOS and pass his class XII the very same year from NIOS board without repeating class XI.
              </p>

              <p>
                There are many cases in which a student clears his competitive exams but fails to pass in board exams such students can take of a program by the name of ODE (On Demand Examination). ODE lets the failed student pass in his/her board examination within 45 days of enrollment. The student can also get his credit transferred from the previous board in which he/she scored well and does not want to reappear in it by taking advantage of a program especially for board failed students by the name of TOC (transfer of credit).
              </p>

              <p>
                SSCoaching NIOS center Lucknow, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS center Lucknow, also helps in form filling for admissions in each stream (
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
              ) of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS center Lucknow can guide you with the admission process for all streams of NIOS Board.
              </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
