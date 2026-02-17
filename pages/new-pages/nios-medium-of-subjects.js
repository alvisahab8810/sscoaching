import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function MediumOfStudyNIOS() {
  return (
    <>
      <Head>
        <title>
          What are the mediums of studies available in NIOS? | SS Coaching
        </title>
        <meta
          name="description"
          content="Mediums of studies available in NIOS - Secondary and Senior Secondary course details."
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
              What are the mediums of studies available in NIOS?
            </h1>

            <h3>Choice of Medium of Instructions:</h3>


            <p>
              NIOS offers its courses mainly in English, Hindi and Urdu mediums.
            </p>

            <p>
              <strong>Secondary Course:</strong> At Secondary level, the course is offered in Regional Mediums also besides these mediums. The choice of medium is also available in Hindi, English, Urdu, Marathi, Telugu, Gujarati, Malayalam and Oriya mediums in addition to English, Hindi and Urdu mediums. The learner is free to choose any one of these mediums for studies.
            </p>

            <p>
              <strong>Sr.Secondary Course:</strong> At Sr.Secondary level, the course is offered only Hindi, English, Urdu mediums. The learner is free to choose any one of these mediums for studies.
            </p>

            <br />

            <h3>Medium For Examination:</h3>

            <p>
              The question paper is bilinual (Hindi & English) in Secondary and Sr.Secondary for learners opted for Hindi/English medium of study. However, learners are free to write their answer in any of the scheduled language. This instructions are also given in the examination instructions of Answer Sheet. For learners opted for Regional mediums or Urdu as medium of study, they will get the question paper in the respective medium only.
            </p>

            <br />

            <p>
              SSCoaching NIOS lucknow centre, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS lucknow centre, also helps in form filling for admissions in each stream ( <a href="/nios-admission/admission-in-nios-stream-1" className="nios-125h-senior-highlight"> stream 1 </a>,{" "}
              <a href="/nios-admission/admission-in-nios-stream-2" className="nios-125h-senior-highlight">stream 2 </a>,{" "}
              <a href="/nios-admission/admission-in-nios-stream-3&4" className="nios-125h-senior-highlight">stream 3 & 4</a>.) of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS lucknow centre can guide you with the admission process for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
