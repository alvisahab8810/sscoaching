import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function LanguageChoiceNIOS() {
  return (
    <>
      <Head>
        <title>
          Do students have a language choice for 10th and 12th in NIOS Board ?
        </title>
        <meta
          name="description"
          content="Language choice for 10th and 12th in NIOS Board including available mediums and subject flexibility."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Do students have a language choice for 10th and 12th in NIOS Board ?
            </h1>
           <br/>
            <p>
              NIOS offers its courses mainly in English, Hindi and Urdu medium. At the Secondary levels, apart from English, hindi, urdu you also have a choice of Telugu, Gujarati Malayalam and Marathi as other mediums for study.
            </p>


            <p>
              NIOS offers its courses particularly in English, Hindi and Urdu mediums. For Secondary level, the course is offered in Regional Mediums too. The independence in choosing medium is also available in Telugu, Gujarati, Marathi and Malayalam in addition to English, Hindi and Urdu languages. The student is not bound to choose any one of these mediums for studies.
            </p>

            <p>
              Regular schooling requires children to study all the subjects, two languages, science, mathematics, and social studies; each subject may have more than one paper. The school boards with which regular schools are registered allow an exemption from second language for students with a language disability; and some boards require the magnitude of this disability to exceed 50% to qualify for the exemption. No other boards allow exemptions from science or mathematics, such as for students with arithmetic inabilities.
            </p>

            <p>
              The secondary examination subjects can be chosen , any one or two of 15 different languages mathematics, science, social studies, economics, business studies, home science, typewriting (either of two languages), word processing (either of two languages), psychology, and Indian culture and heritage.
            </p>

            <p>
              In contrast, the NIOS Board requires students to study a minimum of five and a maximum of seven subjects. There is a very wide range of subjects on offer; students, therefore, have much flexibility in selecting areas in which they are able to attempt an examination. Students are also free to change subjects midway through the course if they are remorseful with their choice. Students can choose from among three languages for their language choice for medium of instructing.
            </p>

            <p>
              SSCoaching NIOS center in Lucknow, provides the information about NIOS board (National Institute of Open Schooling) as well as coaching classes, syllabus and tuition for 10th (secondary) & 12th (senior secondary) students of NIOS Board by renowned and highly qualified faculty and staff. SS Coaching NIOS center in Lucknow, also guides to fill the form for online admissions in all streams of NIOS Board for 10th and 12th students.
            </p>

            <p>
              The senior secondary examination subjects can be chosen from the following list: any one or two of three different languages; mathematics, physics, chemistry, biology, history, geography, political science, economics, commerce, accounts, home science, typewriting (any of three languages), word processing, stenography (any of three languages), secretarial practice, psychology, computer science, sociology, and painting.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
