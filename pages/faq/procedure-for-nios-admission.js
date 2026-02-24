import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function ProcedureAdmissionNIOS() {
  return (
    <>
      <Head>
        <title>What is the procedure for taking admission in NIOS?</title>
        <meta
          name="description"
          content="Procedure for taking admission in NIOS including Stream 1, 2, 3 & 4 and required documents."
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
              What is the procedure for taking admission in NIOS?
            </h1>

            <p>
              The Admissions for NIOS are open throughout the year. The admission forms are only available online.
            </p>


            <h3 className="nios-125h-senior-hero-title">
              Procedure for Online Admission Directly by Learners
            </h3>

            <p>
              The procedure for On-line Admission for all above four streams is as follows:
            </p>

            <p>
              There are four streams of On-line admission catering to the learners with different needs. The admissions in these four streams are mutually exclusive i.e., learner can only opt for one of them.
            </p>

            <ul className="chapter-list">
              <li>
                <strong>On-line Admission for all learners (Stream 1):</strong> This stream for On-line Admission is open for all the learners as per the laid down eligibility criteria for Secondary and Senior Secondary level. Learners taking admission through On-line under Stream-1 will be attached to the AI (Study Centre) as opted by them at the time of admission and will be eligible for TOC as per conditions.
              </li>

              <li>
                <strong>On-line Admissions for learners wanting to appear in October-November examinations (Stream2):</strong>
                This stream for On-line admission is open for all those learners who had appeared but could not clear the Public Examination of Secondary/ Senior Secondary Levels from any recognized Examination Board for the same subject combination in which they had appeared. The learners of this stream will be eligible to appear in the October-November, Public Examinations of NIOS in Secondary/Senior Secondary, on the basis of mark-sheet/admit card of the respective Boards. The learners registered under the stream will be eligible for TOC as per guideline.
              </li>

              <li>
                <strong>On-line Admission for learners wanting to appear in On Demand Examination System (ODES) of NIOS for Secondary Level (Stream 3):</strong>
                This stream for On-line admission is open throughout the year for those learners who have already passed Secondary from recognized Board and want to take part admission in one subject or up to 4 subjects for updating their qualification or learners who had appeared but could not clear the Public Examination of Secondary level from any recognized Board and want to appear through On Demand Examination System of NIOS for Secondary level only.
              </li>

              <li>
                <strong>On-line Admission for learners wanting to appear in On Demand Examination System (ODES) of NIOS for Senior Secondary level (Stream 4):</strong>
                This stream for On-line admission is open throughout the year for those learners who have already passed Senior Secondary or above from any recognized Board/University and want to take part admission in one subject or up to 4 subjects for updating their qualification or learners who had appeared but could not clear the Public examination of Senior Secondary level from any recognized Board in the same subject combination in which they had appeared and want to appear through On Demand Examination System of NIOS at Senior Secondary level. The learner has to submit his/her admission form along with the original failed/passed mark sheet issued by the Board for confirmation of the admission. The scheme is available through On Demand Examination at NIOS Regional Centre.
              </li>
            </ul>

            <p>
              The application for the Online Demand Examination (ODE) is opened on the first working day of every month at 1.00 pm. (*Note: Online Demand Examinations will not take place in the month of April/May & October/November)
            </p>

            <p>
              The application forms can be accessed by– <a href="https://www.sscoaching.in/" className="nios-125h-senior-highlight">www.sscoaching.in</a> 
            </p>

            <h3 className="nios-125h-senior-hero-title">
              Required Documents for admission in NIOS
            </h3>

            <p>
              <strong>FOR 10th</strong> -(Birth Certificate Nursing Home/First Class Magistrate/Nagar Nigam/8th Class Pass Transfer Certificate) 6 Coloured passport size photographs & Guardian/Parents Address proof(Photo Copy) except Driving Lisence.
            </p>

            <p>
              <strong>FOR 12th</strong> Photo Copy of Class 10th Mark Sheet and Passing Certificate, 6 coloured passport size Photographs & Guardian/Parents Address proof(Photo Copy) except Driving License.
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
