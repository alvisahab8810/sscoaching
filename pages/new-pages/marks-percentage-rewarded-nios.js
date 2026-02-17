import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import FAQ from "@/components/home/FAQ";
import Head from "next/head";

export default function NIOSPercentageRange() {
  return (
    <>
      <Head>
        <title>What is range of percentage Marks that NIOS gives? | SS Coaching</title>
        <meta
          name="description"
          content="What percentage marks does NIOS give? Know about average percentage range and grading pattern in NIOS Board."
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
              What is range of percentage Marks that NIOS gives?
            </h1>

              <p>
                NIOS gives 80% percent and above for really exceptional students and learners. NIOS Board is quite strict in their correction pattern but if you want more assistance to increase your percentage please call us on 9792111121 immediately. The subjects which include practical papers will have an advantage than theory papers like Home science, data entry, chemistry, physics etc. Usually NIOS students given their limitations of time or interest in academics, they get 70% to 80% percent average and this is more than sufficient to get into courses that can give you leverage in your career to top courses ahead in your life. IGNOU in this regard offers excellent courses for graduating and post graduating students which have a great degree of value in the job market. It is for professional courses like Catering, Hospitality and Interior Decoration which are offered as Graduate courses now, and in great demand, they even prefer NIOS students, due to the choice of subjects and exposure they have. So we can conclude that there is no difference for a student to have passed 10 and 12th from ICSE,CBSE, NIOS Board or other state board as long as he has secured good percentage to be eligible to get admitted into a reputed college or course that fits the candidates desires and his/her interest.
              </p>

          

              <p>
                One of the major deficiencies of the formal secondary schooling system dominated by most of India CISCE, CBSE and 34 state examination boards is its rigidity and curricular inflexibility, with students given almost no independence to choose preferred subjects for study. Add to this the fear of the make-or-break examination system which takes an estimated annual toll of 4,000 student suicides. In the light of these factors, the unique selling proposition of NIOS, which traces its origin to a flexible secondary certification pilot project initiated by the CBSE in 1979, is the freedom of choice of subjects it offers students who write its secondary (class X) and senior secondary school (class XII) exams. For instance teenagers writing the class X exam are given the option to choose five from 27 subjects (including maths, social science, science, economics, business studies, painting, Indian heritage, psychology, etc) and two languages from 17 (including Hindi, English, Bengali, Marathi, Telugu, Urdu, Sanskrit, Arabic, etc). Students are required to obtain a minimum 33 percent in five subjects with at least one language or at most two languages, to receive the NIOS School leaving certificate. No subjects except any one language are compulsory.
              </p>

              <p>
                SSCoaching nios Lucknow, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching nios Lucknow, also helps in form filling for admissions in each stream (
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
              ) of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching nios Lucknow can guide you with the admission process for all streams of NIOS Board.
              </p>

          </div>
        </div>
                           <FAQ limit={8} showViewMore={true} />
           
        <Footer />
      </section>
    </>
  );
}
