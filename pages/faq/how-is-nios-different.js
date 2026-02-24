import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import FAQ from "@/components/home/FAQ";
import Head from "next/head";

export default function HowIsNiosDifferent() {
  return (
    <>
      <Head>
        <title>How is NIOS Different from Other Boards? | SS Coaching</title>
        <meta
          name="description"
          content="Understand how NIOS is different from other boards like CBSE and ICSE. Learn about recognition, flexibility, competitive exams eligibility and career opportunities."
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
              How is NIOS different from other Boards?
            </h1>

            <p>
              The National Institute of Open Schools (NIOS) was established in November 1989 by the Ministry of Human Resources and Development of the Government of India, F.5-24/90 Sch.3 dated 14 September 1990 published in the Gazette of India on 20 October 1990. NIOS, being a recognized board, is in no way inferior to other boards such as ICSE or CBSE. All institutes and universities equally recognize NIOS for admission.
            </p>


            <p>
              After completing their 12th from NIOS, students can seek admission in various all India as well as state medical, engineering and other competitive exams such as IIT-JEE, AIEEE, and PMT (NEET) as well as other professional and academic courses in universities and technical institutes across India and abroad. They can also apply for government jobs, be it central or state government. However, students must fulfill other eligibility criteria such as age, specific subjects, qualifying percentage, and other criteria.
            </p>

            <p>
              SS Coaching provides information on the NIOS Board, coaching classes, syllabus, and tuition for 10th (secondary) & 12th (senior secondary) students of NIOS Board, with renowned and highly qualified faculty and staff. SS Coaching also guides students to fill the form for online admissions in all streams of NIOS Board for 10th and 12th students.
            </p>

            <p>
              NIOS is considered a boon for those students who could not complete their schooling due to some reason or if they failed in the board exams and do not want to study in the same class with their juniors. It also gives an opportunity to students to appear in the same year in which they failed their board exams from any other board, saving time and a year. NIOS helps increase the literacy rate of girls from conservative backgrounds who cannot attend regular schools for studying or complete their schooling due to marriage. Such girls can complete their schooling and even graduate from Open University like IGNOU (Indira Gandhi National Open University).
            </p>

            <p>
              NIOS has been in existence for over 25 years, providing a national-level board examination for higher secondary and secondary levels, equivalent to the other 12 board examinations. The Association of Indian Universities (AIU) also issues the same NIOS courses as other recognized certificates for admission to higher courses in Indian Universities as per their Declaration. E V/11 (354)91/dated 25.7.1991, intimated to the Registrars of all Indian Universities.
            </p>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
