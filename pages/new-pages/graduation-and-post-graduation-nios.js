import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function GraduationPostGraduationFromNIOS() {
  return (
    <>
      <Head>
        <title>Is it possible to complete graduation and post graduation from NIOS? | SS Coaching</title>
        <meta
          name="description"
          content="Know whether graduation and post graduation can be completed from NIOS and details about NIOS recognition."
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
              Is it possible to complete graduation and post graduation from NIOS?
            </h1>

            <p>
              NIOS (National Institute of Open schooling) as the name indicates provides quality education for school level only. The NIOS does not provide any education at graduation level though its certificates for secondary and senior secondary level are approved to get admission in any university or institute all over India. NIOS is the most reputed and respected open school in the world with over 2.59 million students on its roll. NIOS is the largest open school in the world and is very popular in the commonwealth countries.
            </p>


            <p>
              NIOS is in no way inferior to any other recognized board like ICSE/CBSE/UP board. NIOS board syllabus is designed by NCERT (national council of education research and training) so as to keep the syllabus up to date in comparison with other boards of secondary and senior secondary education. NIOS board has been brought into existence by the HRD (Human Resource and Development) ministry of India through a resolution which is written in the gazette of India dated 14/09/1990. The motto of NIOS is “sarv shiksha abhiyaan” which means education for all.
            </p>

            <p>
              NIOS is only authorized to provide education at secondary and senior secondary level but not for graduation and post graduation level. The certificates issued by NIOS at secondary and senior secondary are approved by all universities and Institutes all over India. Association of Indian Universities, vide letter No . EV/11(354)/91/ 25 July, 1991 issued Equivalence of Senior Secondary Certificate Examination of NIOS.
            </p>

            <p>
              Indian Institute of Technology, Kanpur, Mumbai, Delhi, Kharagpur, Chennai and institute of Technology, BHU, Varanasi) recognize certificate issued by NIOS.
            </p>

            <p>
              SSCoaching NIOS center Lucknow, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS center Lucknow, also helps in form filling for admissions in each stream  (
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
              )  of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS center Lucknow can guide you with the admission process for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
