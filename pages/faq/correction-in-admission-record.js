import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function CorrectionAdmissionRecordNIOS() {
  return (
    <>
      <Head>
        <title>Is there any provision for correction in admission record?</title>
        <meta
          name="description"
          content="Provision for correction in NIOS admission record and procedure details."
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
              Is there any provision for correction in admission record?
            </h1>

            <p>
              Yes, correction will done as per guidance hosted on NIOS website.
            </p>


            <h3 className="nios-125h-senior-hero-title">
              Procedure for Correction in the Admission Records
            </h3>

            <p>
              The Admission to a particular course is normally confirmed by NIOS by issuing an Identity Card having details of learner's admission particulars as per the record available in NIOS.
            </p>

            <p>
              In case of any discrepancy in Name or Fname or Mname or DOB or Address or photo etc. ,
              kindly apply for correction at your study centre or at the concerned Regional Centre along with the documentary proof.
            </p>

            <p>
              In case if you notice the discrepancy after your result has been declared and you have been issued the passing documents (Mark sheet, Migration or Provisional Certificate),
              kindly apply for correction at your study centre or at the concerned Regional Centre along with the documentary proof and the documents (Mark sheet, Migration or Provisional Certificate or final certificate) with incorrect details issued to you by NIOS.
            </p>

            <p>
              Kindly note that the revised corrected documents will be issued only if you have submitted the documents (Mark sheet, Migration or Provisional Certificate or final certificate) with incorrect details issued to you by NIOS along with your application.
            </p>

            <p>
              <a href="https://nios.ac.in/media/documents/admcorrproforma.pdf" className="nios-125h-senior-highlight"> Download Proforma for Correction (79 KB)</a>
            </p>

            <p>
              SSCoaching NIOS lucknow centre, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS lucknow centre, also helps in form filling for admissions in each{" "}
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
              </a>{" "}
              of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS lucknow centre can guide you with the admission process for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
