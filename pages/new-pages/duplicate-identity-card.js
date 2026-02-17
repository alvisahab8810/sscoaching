import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function DuplicateIdentityCardNIOS() {
  return (
    <>
      <Head>
        <title>Do NIOS issue duplicate identity card? | SS Coaching</title>
        <meta
          name="description"
          content="Information about duplicate identity card issued by NIOS and the process to obtain it."
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
              Do NIOS issue duplicate identity card?
            </h1>

            <p>
              Yes, In case of loss of Identity Card, a duplicate Identity Card can be issued. For obtaining Duplicate Identity Card, first lodge an FIR with the concerned Police Station. Then apply on a plain paper to the Regional Centre of nios along with
            </p>




            <br />

            <p>i)  The copy of FIR,</p>

            <p>ii)  Bank Draft drawn in favour of the Secretary, SSCoaching, payable and</p>

            <p>iii)  A photograph along with specimen signature duly attested by the Coordinator of AI.</p>

            <br />

            <p>
              Your admission to a particular course will be confirmed by NIOS by issuing an Identity Card and a confirmation letter giving your admission particulars as per the record available in NIOS computers. Do check the particulars given in the confirmation letter. Discrepancies, if any, may be brought to the notice of the AI immediately. The Identity Card will be issued only once and no modified Identity Card will be issued on subsequent changes/corrections of admission particulars. You should retain your Identity Card carefully till you complete your study in NIOS Education.
            </p>

            <br />

            <p>
              SSCoaching NIOS lucknow centre, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS lucknow centre, also helps in form filling for admissions in each stream  <a href="/nios-admission/admission-in-nios-stream-1" className="nios-125h-senior-highlight">stream 1</a>,{" "}
              <a href="/nios-admission/admission-in-nios-stream-2" className="nios-125h-senior-highlight">stream 2</a>{" "}
              and{" "}
              <a href="/nios-admission/admission-in-nios-stream-3&4" className="nios-125h-senior-highlight">stream 3 & 4</a>. of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS lucknow centre can guide you with the admission process for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
