import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function DegreesAfterNIOS() {
  return (
    <>
      <Head>
        <title>
          What are degrees, certificates awarded after clearing nios exams ? | SS Coaching
        </title>
        <meta
          name="description"
          content="Know about certificates and degrees awarded after clearing NIOS exams and further study opportunities."
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
              What are degrees, certificates awarded after clearing nios exams ?
            </h1>

            <p>
              NIOS is completely a Government approved institute and offers private education to the students. Any student who has completed his/ her education from this institute or Board is eligible for any further studies in graduation and post graduation and professional courses and also can apply to various job vacancies in both the PSUs and Private job sectors as well. But then the preference in PSUs is usually given to the candidates with a regular education background from ICSE, CBSE or State boards and one should be ready for the same. All I can suggest you is to put in your hard work and try to achieve higher results.
            </p>

       


            <p>
              SSCoaching NIOS center Lucknow, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS center Lucknow, also helps in form filling for admissions in each stream (
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
              ) of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS center Lucknow can guide you with the admission process for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
