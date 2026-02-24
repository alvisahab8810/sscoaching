import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function CSCFacilitationCentresNIOS() {
  return (
    <>
      <Head>
        <title>
          Are the Common Services Centres of Government of India authorised to act as NIOS Facilitation Centres? | SS Coaching
        </title>
        <meta
          name="description"
          content="Know whether Common Services Centres (CSC) are authorised as NIOS Facilitation Centres and available services."
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
              Are the Common Services Centres of Government of India authorised to act as NIOS Facilitation Centres?
            </h1>

            <p>
              Yes, NIOS has entered into an MOU with CSC e-Governance India Ltd., Ministry of Information and Technology, Government of India. Under this MOU, All the Common Services Centres throughout the country will be acting as Facilitation Centres of NIOS where any prospective candidates can avail various online facilities of NIOS at the prescribed rates. These rates are given at pages 15 to 16 of the Handbook.
            </p>

        

            <p>
              The amount as per these rates is to be paid by the candidate and will be in addition to the registration fee of NIOS.
            </p>

            <p>
              The National Institute of Open Schooling (NIOS) formerly known as National Open School (NOS) was established in November,1989 as an autonomous organisation in pursuance of National Policy on Education 1986 by the Ministry of Human Resource Development (MHRD), Government of India. NIOS is providing a number of Vocational, Life Enrichment and community oriented courses besides General and Academic Courses at Secondary and Senior Secondary level. It also offers Elementary level Courses through its Open Basic Education Programmes (OBE).Government of India through a gazette notification vested NIOS with the authority to examine and certify learners registered with it upto pre degree level courses.
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
