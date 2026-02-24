import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function LearnAndEarnAfterNIOS() {
  return (
    <>
      <Head>
        <title>Is there option to Learn and then earn after studying at NIOS ? | SS Coaching</title>
        <meta
          name="description"
          content="Learn and earn opportunities after studying at NIOS including vocational courses at secondary and senior secondary levels."
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
              Is there option to Learn and then earn after studying at NIOS ?
            </h1>

            <p>
              NIOS board is the most considerate board among all the other boards in world. Its main purpose to come in to existance is “sarva shiksha abhiyan” which means education for all. The NIOS board main motive was to increase the literacy rate by giving an opportunity to the school dropouts so that they can continue their studies from home. The NIOS has therefore intentionally not kept any criteria for age so that more and more dropout students start pursuing their education again.This has drastically increased the literacy rate in India.
            </p>

        

            <p>
              The main reason for students to stop their education at school level is to earn a livelihood and support their family. The kids in order to learn some technical work join work at a young age because kids have a lot more grasping power than adults. To stop this dropout rate from school in order to learn some technical work the NIOS has started stand alone courses for secondary and senior secondary level courses separately. The courses offered for secondary level are Carpentry, Solar Energy Technician,Biogas Energy Technician,Bakery and Confectionery, Welding Technology,
            </p>

            <p>
              Secondary Level:Typewriting Hindi/English.The courses offered for senior secondary level of education Typewriting Hindi/English, Stenography Hindi/English, Secretarial Practice,
            </p>

            <p>
              Senior Secondary Level: Word Processing (MS-Word),Stenography Urdu, Typewriting Urdu, Plant Protection, Plant Protection, Water Management for Crop Production, Oyster Mushroom Production Technology, Furniture and Cabinet Making, Electro-Plating, Housekeeping,Catering Management, Food Processing,Play Centre Management,Hotel Front Office Operations, Poultry Farming, Soil and Fertilizer Management, Preservation of Fruits and Vegetables.
            </p>

            <p>
              The courses lets the student continue their studies as well as get technical knowledge which makes them capable to earn a job when they complete their secondary level or senior secondary level chosen course. This makes them earn when they finish to learn .These added technical courses has not only stopped students from dropping out but has also made the dropout students to continue studies and get some technical knowledge as there is no age for learning.
            </p>

            <div className="spacer-area"></div>

            <p>
              SSCoaching NIOS center Lucknow, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS center Lucknow, also helps in form filling for admissions in each stream (
              <a href="/nios-admission/admission-in-nios-stream-1" className="nios-125h-senior-highlight">stream 1</a>,{" "}
              <a href="/nios-admission/admission-in-nios-stream-2" className="nios-125h-senior-highlight">stream 2</a>,{" "}
              <a href="/nios-admission/admission-in-nios-stream-3&4" className="nios-125h-senior-highlight">stream 3 & 4</a>
              ) of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS center Lucknow can guide you with the admission process for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
