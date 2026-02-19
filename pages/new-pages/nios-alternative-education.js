import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function OpenBasicEducationNIOSDuplicate() {
  return (
    <>
      <Head>
        <title>
          What is Open Basic Education (OBE) in nios? | SS Coaching
        </title>
        <meta
          name="description"
          content="Open Basic Education (OBE) in NIOS - eligibility, levels and flexibility."
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
              What is Open Basic Education (OBE) in nios?
            </h1>

            <p>
              The Open Basic Education programme is operated and implemented by National Institute of Open Schooling (NIOS) with a goal of providing primary and upper primary level education through open schooling to those who are not able to go to a formal school or have  dropped out of school.
            </p>

    
            <p>
              The Open Basic Education programme is recognised by the Government of India as equivalent education to the formal school for higher education and employment. Different states have shown their interest in the programme for their out of school children as well as for adults literates. The Open Basic Education (OBE) is offered in some states as an Equivalent Programme under the Continuing Education (CE) scheme of the National Literacy Mission.
            </p>

            <h3 className="nios-125h-senior-hero-title">
              Potential Target Group
            </h3>

            <p>
              The group consists of the following:
            </p>

            <ul className="chapter-list">
              <li>School dropouts</li>
              <li>Neo literates of National Literacy Mission’s Continuing Education Scheme</li>
              <li>Girls and women, SC/ST, BPL groups.</li>
              <li>Children and adults who are going through some kind of disability or crisis and cannot go the school.</li>
            </ul>

            <h3 className="nios-125h-senior-hero-title">
              Age criteria
            </h3>

            <ul className="chapter-list">
              <li>Adults of 14+ yrs. and above</li>
            </ul>

            <h3 className="nios-125h-senior-hero-title">
              Levels under the open basic education (OBE) programme
            </h3>

            <p>
              It has three levels A, B and C, which are as follows
            </p>

            <ul className="chapter-list">
              <li>Level A equal to standard III of the formal school system.</li>
              <li>Level B equal to standard V of the formal school system.</li>
              <li>Level C equal to standard VIII of the formal school system.</li>
            </ul>

            <h3 className="nios-125h-senior-hero-title">
              Flexibility and Openness offered under OBE programme
            </h3>

            <p>
              The Programme consists of the following features.
            </p>

            <ul className="chapter-list">
              <li>The registration duration of each learner for every level is for a maximum of five years.</li>
              <li>A learner can opt for Hindi, English or Regional Language as medium of study.</li>
              <li>There is no upper age limit for any learner.</li>
              <li>The learning package consists of, Maths, Science, Social Science as academic subjects and one vocational subject.</li>
              <li>A learner can opt the Vocational Subject from the given list offered by NIOS.</li>
              <li>The examination would be held two times a year as decided by the agency and NIOS.</li>
              <li>A learner can take the first examination for any level after one year of admission in the specified level. Subsequently the learner can take examinations till he/she is Enrolled or registered.</li>
              <li>The feature of credit accumulation is available for OBE (open basic education) learners. A learner would be given a certificate only when he/she completes the entire level.</li>
            </ul>

            <div className="spacer-area"></div>

            <p>
              SSCoaching NIOS lucknow centre, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS lucknow centre, also helps in form filling for admissions in each stream (
              <a href="/nios-admission/admission-in-nios-stream-1" className="nios-125h-senior-highlight">stream 1</a>,{" "}
              <a href="/nios-admission/admission-in-nios-stream-2" className="nios-125h-senior-highlight">stream 2</a>,{" "}
              <a href="/nios-admission/admission-in-nios-stream-3&4" className="nios-125h-senior-highlight">stream 3 & 4</a>
              ) of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS lucknow centre can guide you with the admission process for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
