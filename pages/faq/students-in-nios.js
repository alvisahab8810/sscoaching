import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function StudentsEnrolledNIOS() {
  return (
    <>
      <Head>
        <title>How many students are currently enrolled in NIOS ?</title>
        <meta
          name="description"
          content="How many students are currently enrolled in NIOS? Complete enrollment statistics and information."
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
              How many students are currently enrolled in NIOS ?
            </h1>

            <p>
              For the 105 million students who do not have the privilege due to various reasons of not being able to attend school every year, 10 million challenged children excluded from the mainstream education system and 240 million adult illiterates denied access to secondary school and formal vocational education certification, it is important that the National Institute of Open Schooling (NIOS) becomes a household name and national success in the field of imparting education to all without barriers.
            </p>


            <p>
              Over the past 21 years NIOS has tutored and distributed degrees to almost 10 Lac students aged over 14 years as (class X) school pass outs, about seven lakh senior secondary (class XII) students and also provided 111,220 with vocational training. Currently an estimated 1.90 million students are enrolled in its secondary and senior secondary distance learning programmes supported by a large number of accredited institutions nationwide. Vocational education and training is supplemented by about a thousand study centers and open basic education programmes by 664 authorized and approved agencies. In particular for the 105 million students who drop out of school before class VIII and for those unable to cope with the cost and complexities of the formal 12th standard education system for reasons of dyslexia, physical or mental disabilities, NIOS offers a flexible learning alternative through the ODE model.
            </p>

            <p>
              Moreover NOS is the only option available for India’s 240 million grownup illiterates to acquire a secondary school certification degree. Of the 371,625 learners enrolled in the open schooling education (equivalent to classes III, V and VIII of the formal school system) and secondary level programmes, 88,621 are in the age group of 21 years and above.
            </p>

            <p>
              SS Coaching NIOS school in lucknow, introduced the National Open School in the year 2001 in order to help out the poor, failed and weak students, the slow learners, who could not cope with the regular school syllabus. The National Open School (NOS) Board of New Delhi (currently know as the National Institute for Open Schooling—NIOS), was pleased with the work. The coaching continues to make progress in academic and other spheres of education for boys and girls in Lucknow and other cities of Uttar Pradesh.
            </p>

            <p>
              SSCoaching NIOS school in lucknow, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS school in lucknow, also helps in form filling for admissions in each{" "}
              <a href="/nios-admission/admission-in-nios-stream-1" className="nios-125h-senior-highlight">stream 1 </a>,{" "}
              <a href="/nios-admission/admission-in-nios-stream-2" className="nios-125h-senior-highlight">stream 2 </a>,{" "}
              <a href="/nios-admission/admission-in-nios-stream-3&4" className="nios-125h-senior-highlight">stream 3 & 4</a>{" "}
              of NIOS Board for 10th and 12th admission seekers.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
