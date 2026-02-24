import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function CanStudentTakeAdmissionNIOS() {
  return (
    <>
      <Head>
        <title>Can a student take admission in 10th/12th of NIOS after passing from Formal Board? | SS Coaching</title>
        <meta
          name="description"
          content="Know whether a student can take admission in NIOS 10th or 12th after passing from a formal Board of School Education."
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
              Can a student take admission in 10th/12th of NIOS after passing the 10th/ 12th from a formal Board of School Education?
            </h1>

            <p>
              Yes, who have passed the secondary/senior secondary course from any National/state board of school education and want to take admission for the same course, you can continue your education towards a Senior Secondary Certification, equivalent to XII standard. On successful completion, you will get only the mark sheet.
            </p>


            <h2>Additional Subjects</h2>

            <p>
              You can also select one or two additional subject(s) either at the time of admission or during the course of study, if you so desire or if it is required.
            </p>

            <h2>Choice of Subjects:</h2>

            <p>
              You can choose any subject combination from a list of subjects offered as per the criteria given in the Scheme of Studies.
            </p>

            <p>
              If you wish to use NIOS certificate for higher studies, it is in your own interest that you keep in mind the requirements of the Boards/Universities you wish to join after passing Secondary/Senior Secondary course from NIOS. Some Boards / Universities require specific subject combinations for admission to the Institutions affiliated to them as given in the Appendices A & B. For example, for medical course, various institutes will expect you to have passed with a combination of Chemistry, Physics and Biology along with two languages. The learners who wish to join formal school board in class XI after passing NIOS examination of class X may opt for subjects combinations (in 5 or 6 subjects as the case may be) which are acceptable in class XI by such formal school Board,without prejudice to the rights of NIOS.
            </p>

            <p>
              SSCoaching NIOS school Lucknow, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS school Lucknow, also helps in form filling for admissions in each stream  (
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
              )  of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS school Lucknow can guide you with the admission process for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
