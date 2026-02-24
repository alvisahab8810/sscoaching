import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import FAQ from "@/components/home/FAQ";
import Head from "next/head";

export default function SecondaryCourseEligibility() {
  return (
    <>
      <Head>
        <title>
          What are the eligibility criteria for admission to the Secondary Course? | SS Coaching
        </title>
        <meta
          name="description"
          content="Know the eligibility criteria for admission to the NIOS Secondary Course including age requirement, documents, and subjects offered."
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
              What are the eligibility criteria for admission to the Secondary Course?
            </h1>

            <p>
              Secondary Course is equivalent to the Xth standard. However, you will be required to successfully complete a minimum of five subjects, which is compulsory for certification. At Secondary level, the course is offered in Regional Mediums also besides these mediums. The choice of medium is also available in Telugu, Gujarati, Marathi, Malayalam and Oriya in addition to English, Hindi and Urdu mediums. The learner is free to choose any one of these mediums for studies.
            </p>

       

            <h3 className="nios-125h-senior-hero-title">
              Secondary Course Eligibility Criteria 2015 Requirement:
            </h3>

            <ul className="chapter-list">
              <li>
                Certificate of Class VIII passed, or Self Certificate
              </li>
              <li>
                Valid proof of attaining 14 years of age can apply for registration to a Secondary Course
              </li>
              <li>
                A residential proof of applicant.
              </li>
            </ul>

            <h3 className="nios-125h-senior-hero-title">
              Secondary Subject Offered:
            </h3>

            <h4>Group-A</h4>

            <p>
              Hindi(201), English(202), Bengali(203), Marathi(204), Telugu(205), Urdu(206), Gujarati(207), Kannada(208), Sanskrit(209), Punjabi(210), Assamese (228),Nepali(231), Malayalam(232), Oriya(233), Arabic (235),Persian (236), Tamil (237)
            </p>

            <h4>Group-B</h4>

            <p>
              Mathematics(211), Science(212), Social Science(213), Economics(214), Business Studies(215), Home Science(216), Word Processing(E)(219), Psychology (222), Indian Culture & Heritage (223), Painting (225)
            </p>

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
