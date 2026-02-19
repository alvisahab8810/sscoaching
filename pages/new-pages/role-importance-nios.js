import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function PlaceAndRoleOfNIOS() {
  return (
    <>
      <Head>
        <title>What is the place and role of NIOS ? | SS Coaching</title>
        <meta
          name="description"
          content="Know the place and role of NIOS in India and its evolution in Open and Distance Learning."
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
              What is the place and role of NIOS ?
            </h1>

            <p>
              The origin of ODL in India can be traced back to the correspondence course of Class X level commonly referred to as matriculation level at that time .This type of of correspondence course was commonly referred to as private high school course at that time as the candidate would not attend regular class and yet appear for board exam as a private student. The ODl pattern at school level was started by board of secondary education, Madhya Pradesh and was later followed by other secondary level states board like Rajasthan, Uttar Pradesh and Orissa. The education pattern is still the same as compared to that time the process is the same first the examination are held then result is declared and then certification provided . The correspondence students were provided with the same study material at the time of registration and then would be left on their own to prepare for examination.
            </p>


            <p>
              The central government implemented this process of correspondence studies in 1979 when central board of secondary education setup an open school which was open for all with flexible courses and flexibility in the duration of course completion. This was just an experiment done by the central government in which it succeeded .The ministry of HRD (Human Resource and development) took 10 years and in 1989 NOS board was brought into existence after viewing the very positive response of the earlier project.
            </p>

            <p>
              NIOS is the now the largest open school in the world. This year it has completed its 25 years of providing education to the students. NIOS has 2.59 million students on its roll being awarded as the largest Open University in the world .NIOS is also very popular in commonwealth countries and in other developing countries.2.59 million students enrolled in a board speaks volumes by itself about the board and proves it credibility and authenticity of NIOS board. Not many people know that NIOS has 27 study centers overseas countries.
            </p>

            <p>
              Association of Indian Universities, vide letter No . EV/11(354)/91/ 25 July, 1991 issued Equivalence of Senior Secondary Certificate Examination of NIOS.NIOS in short a spam of time has gained recognition not only by Indian but also from Universities across the world.
            </p>

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
