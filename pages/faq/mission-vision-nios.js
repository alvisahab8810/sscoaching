import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function MissionVisionNIOS() {
  return (
    <>
      <Head>
        <title>
          What is the Mission and vision of N.I.O.S? | SS Coaching
        </title>
        <meta
          name="description"
          content="Know the mission and vision of NIOS board and its objective to provide education for all through open schooling."
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
              What is the Mission and vision of N.I.O.S?
            </h1>

            <h3 className="nios-125h-senior-hero-title">
              Vision
            </h3>

            <p>
              The NIOS has made its mark not only in India but also internationally as it provides learner oriented best quality school level education. The NIOS also nurtures the skills and provides training through distance learning. The main motto of NIOS is “Sarva shiksha abhiyan” which means education for all. The NIOS board main mission is to provide education to that sector of the society which cannot attend regular classes but wants to continue their education. NIOS has started courses which target those students who can continue their studies as well as learn some technical skills which can help them earn a livelihood. NIOS board is continuously striving to increase the literacy rate not only in India but globally.
            </p>



            <h3 className="nios-125h-senior-hero-title">
              Mission
            </h3>

            <ul className="chapter-list">
              <li>
                1) NIOS is an educating system providing best quality of education which continuously updated to match world class education system.
              </li>

              <li>
                2) It has team of experts who are continuously monitoring the education sector so as to improve the quality of education and improvise new rules and program to benefit the students through open schooling at school level.
              </li>

              <li>
                3) NIOS board is continuously striving to provide quality of learning materials, student support services, system of assessment and professional development of staff.
              </li>

              <li>
                4) NIOS identifies and reaches out to prioritized client groups viz. school drop-outs and marginalized groups such as the rural youth, the urban poor, girls and women, scheduled castes, scheduled tribes, backward classes, minorities, differently able and ex-servicemen to universalize secondary education,
              </li>

              <li>
                5) NIOS develops professional support network using contemporary technologies,
              </li>

              <li>
                6) NIOS provides education and training for upgrading skills and lifelong learning for all.
              </li>

              <li>
                7) The NIOS syllabus is specially designed by NCERT (National Council of education Research and Training) for the students so as to impart best quality of most updated education.
              </li>

              <li>
                8) NIOS provides need based Vocational Education for making its students entrepreneurs and not just job seekers.
              </li>
            </ul>

            <div className="spacer-area"></div>

            <p>
              SSCoaching nios Lucknow, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching nios Lucknow, also helps in form filling for admissions in each stream (
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
              ) of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching nios Lucknow can guide you with the admission process for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}