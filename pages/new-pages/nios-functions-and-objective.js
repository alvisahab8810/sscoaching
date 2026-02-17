import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function HowNIOSFunctions() {
  return (
    <>
      <Head>
        <title>
          How NIOS functions? | SS Coaching
        </title>
        <meta
          name="description"
          content="Learn how NIOS functions through its departments, regional centres, accredited institutions and examination system."
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
              How NIOS functions?
            </h1>

            <p>
              NIOS operates through a network of five Departments, Regional Centres and Accredited Institutions (Study Centres) in India and abroad. It has a current enrolment of about 2.2 million students at Secondary, Senior Secondary & Vocational levels which makes it the largest open schooling system in the world.
            </p>


            <p>
              Nios board wants to take steps for developing strategy plans for enhancing the Open Schooling program in India and abroad. NIOS also wants to take action plan for making education inclusive for the disadvantaged underprivileged groups like minorities, differently- able (physically and mentally challenged) and all other people. It also offers a wide choice of courses of study in general, vocational and continuing education up to pre-degree level. NIOS also provides effective student support for new students by establishing study points , organizations and institutions in India abroad. It is also concerned and responsible for conducting examinations and issuing certificates to successful pass outs. Undertaking research, innovation and development works in the area of Open School system and disseminate the findings to all stakeholders is other task and function that this board has to fulfill. To act as Resource Organization and Capacity Building Centre in open schooling at national as well as international level.
            </p>

            <p>
              Though NIOS is flexible and recognized by all the boards across India. The CICSE and CBSE boards (for 11th and 12th std) take students from the NIOS stream only if they have given all 5 exams in one sitting and another requisite is that the student needs to have taken English and one more language as subjects.
            </p>

            <p>
              Similarly NIOS is accepted in almost all colleges and IITs. Some argue that the child has completed, as mentioned above, all subjects in one sitting, and English plus second language in their 10th. All colleges having an entrance exam for qualifying the students do recognize NIOS. For Children who have language difficulties, and do not write the second language paper in NIOS - it is advised that they join other course with Alliance Franchise when they complete 10th standard. This will help them to join any college other than professional colleges, which have a second language requirement.
            </p>

            <p>
              It operates through a network of eleven Regional Centres and more than two thousand Accredited Institutions (AIs) (Study Centres) including 800 Accredited Vocational Institutes (AVI) in India, Nepal and Middle East. Admission is through NIOS Accredited Institutions (AIs) once a year from July to September for Academic courses and throughout the year for vocational courses through AVI. Learning materials provided include printed self-learning material, Audio and Video programmes. Enrichment materials and information about programmes of NIOS are provided to its learners through the Half Yearly Magazine Open Learning. Personal Contact Programs (PCP) are conducted by the AIs and training programs in AVIs. Public Examinations are held twice a year in April-May and October-November. The curricular and life enrichment programs are telecasted nationwide.
            </p>

            <div className="spacer-area"></div>

            <p>
              SSCoaching nios Lucknow, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS Lucknow, also helps in form filling for admissions in each stream (
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
              ) of NIOS Board for 10th and 12th admission seekers.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
