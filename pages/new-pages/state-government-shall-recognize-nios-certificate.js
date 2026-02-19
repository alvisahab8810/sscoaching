import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function StateGovernmentRecognitionNIOS() {
  return (
    <>
      <Head>
        <title>
          Every state government shall recognize nios certificate or not? | SS Coaching
        </title>
        <meta
          name="description"
          content="Know whether NIOS certificate is recognized by state governments and institutions across India."
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
              Every state government shall recognize nios certificate or not?
            </h1>

            <p>
              The Government of India has set up the National Open School Society, an autonomous and registered body on 23rd November, 1989 to cater to the educational needs of school dropouts, working adults, housewives and socially disadvantaged sections, through distance education at the school stage. The Society runs the management of the National Open School which, through distance and open learning system, has been offering courses, preparing students for the Secondary and Senior Secondary School Examinations and also offers Bridge (Preparatory) Courses
            </p>

    

            <p>
              ORDERED that a copy of the Resolution be sent to all State Government, Union Territory Administrations, all Ministries Departments of the Government of India, University Grants Commission. Prime Minister's Office, National Council of Educational Research and Training. Council of Boards of Secondary Education, Association of Indian Universities, Central Board of Secondary Education, Council for the Indian School Certificate Examination and the State Board of Education.
            </p>

            <p>
              ORDERED also that the Resolution be published in the Gazette of India for general information.
            </p>

            <p>
              NIOS is completely a Government approved institute and offers private education to the students. Any student who has completed his/ her education from this institute is eligible for any further studies and also can apply to various job vacancies in both the PSUs and Private job sectors as well.
            </p>

            <div className="spacer-area"></div>

            <p>
              SSCoaching NIOS school Lucknow, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS school Lucknow, also helps in form filling for admissions in each stream (
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
              ) of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS school Lucknow can guide you with the admission process for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
