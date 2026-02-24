import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function DuplicateNIOSPassCertificate() {
  return (
    <>
      <Head>
        <title>How to get duplicate NIOS pass certificate? | SS Coaching</title>
        <meta
          name="description"
          content="Learn how to apply for duplicate NIOS pass certificate, marksheet, migration or provisional certificate with complete procedure."
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
              How to get duplicate NIOS pass certificate?
            </h1>

              <p>
                To get duplicate Marksheet/Migration/Provisional certificate the student needs to get a Bank Draft of requisite fee in favor of Secretary , National Institute of Open Schooling, Payable at NOIDA, along with prescribed application form and any documentary proof (such as photo copy of Identity card or any document received from NIOS) may please be sent on the appropriate address. To get duplicate Pass certificate A Bank Draft of requisite fee in favor of Secretary , NIOS, Payable at noida, along with prescribed application form and original affidavit (specimen given on the 2nd page of Application Form) duly signed by Ist class Magistrate and any documentary proof (such as photo copy of I-card or any document received from NIOS board) may be sent.
              </p>

         

              <p>
                If you have lost your NIOS Board pass certificate, you can apply for a duplicate copy by following these steps:
              </p>

              <ul>
                <li>Download the application form for a duplicate certificate.</li>
                <li>Include all necessary information on the application form, including your name, birthdate, enrollment number, etc.</li>
                <li>Include a copy of your identifying documentation, voter ID card, or Aadhar card.</li>
                <li>Pay the required fee for the duplicate certificate online or with a demand draught.</li>
                <li>Send the application form, along with the necessary paperwork and payment, NIOS office.</li>
                <li>A duplicate copy of your pass certificate will be issued by NIOS Board after your information and payment have been verified.</li>
              </ul>

              <p>
                <b>Section Officer,<br/>
                M & M Branch,<br/>
                National Institute of Open Schooling,<br/>
                A-24/25, Sector -62, Institutional Area,<br/>
                NOIDA, UP-201309.</b>
              </p>

              <a href="/assets/images/others/application-nios-duplicate-marksheet.pdf" className="nios-125h-senior-highlight">
                CLICK TO Download duplicate marksheet NIOS application form
              </a>

              <p>
                SSCoaching nios lucknow, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching nios lucknow, also helps in form filling for admissions in each stream 
                (
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
              ) of NIOS, for 10th and 12th admission seekers.
              </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
