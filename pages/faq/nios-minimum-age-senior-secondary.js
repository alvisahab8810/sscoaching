import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function CorrectionInAdmissionRecordNIOS() {
  return (
    <>
      <Head>
        <title>Correction in NIOS Admission Record | NIOS Correction Procedure</title>
        <meta
          name="description"
          content="Know the procedure for correction in NIOS admission records including Name, DOB, Address and other details. Download correction proforma and complete process guide."
        />
        <meta
          name="keywords"
          content="NIOS correction form, NIOS admission correction, NIOS name correction, NIOS DOB correction, NIOS document correction procedure"
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
              Is There Any Provision for Correction in Admission Record?
            </h1>

            <hr />

            <p>
              <strong>Yes.</strong> Corrections are done as per the official guidance
              hosted on the NIOS website.
            </p>

            <h3>Procedure for Correction in the Admission Records</h3>

            <p>
              Admission to a course is confirmed by NIOS by issuing an Identity Card
              containing the learner’s admission details as per records available with NIOS.
            </p>

            <p>
              In case of any discrepancy in <strong>Name, Father’s Name, Mother’s Name,
              Date of Birth, Address, Photograph</strong> etc., learners should apply
              for correction at their Study Centre or concerned Regional Centre along
              with valid documentary proof.
            </p>

            <p>
              If discrepancy is noticed after declaration of result and issuance of
              documents (Marksheet, Migration Certificate, Provisional Certificate
              or Final Certificate), learners must:
            </p>

            <ul>
              <li>Apply at the Study Centre or Regional Centre.</li>
              <li>Submit valid documentary proof.</li>
              <li>
                Submit original incorrect documents issued by NIOS.
              </li>
            </ul>

            <p>
              <strong>Important:</strong> Revised corrected documents will be issued
              only after submission of the original incorrect documents along with
              the correction application.
            </p>

            <hr />

            <h3>Download Correction Proforma</h3>

            <p>
              <a 
                 className="nios-125h-senior-highlight"
                href="http://www.nios.ac.in/media/documents/admcorrproforma.pdf"
                target="_blank"
              >
                Download Proforma for Correction
              </a>
            </p>

            <hr />

            <h3>NIOS Admission Streams</h3>

            <p>
              We assist students in admission for all NIOS streams:
              <a href="/nios-admission/admission-in-nios-stream-1" className="nios-125h-senior-highlight"> stream 1 </a>,{" "}
              <a href="/nios-admission/admission-in-nios-stream-2" className="nios-125h-senior-highlight">stream 2 </a>,{" "}
              <a href="/nios-admission/admission-in-nios-stream-3&4" className="nios-125h-senior-highlight">stream 3 & 4</a>.
            </p>

            <hr />

            <h3>NIOS Admission Guidance in Lucknow</h3>

            <p>
              SS Coaching NIOS Lucknow centre provides complete assistance for
              NIOS admission, syllabus guidance, exam preparation and form filling
              support for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
