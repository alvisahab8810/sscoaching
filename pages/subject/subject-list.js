import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";
import SecondaryOrSrSecondary from "@/components/subjects/SecondaryOrSrSecodary";

export default function NIOSCompleteSubjectsList() {
  return (
    <>
      <Head>
        <title>NIOS Complete Subjects List 10th & 12th</title>
        <meta
          name="description"
          content="NIOS Complete Subjects List for Class 10th and 12th | Secondary & Senior Secondary Course | Scheme of Studies"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area">
        <Header />
        <Offcanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              NIOS Complete Subjects List 10th 12th
            </h1>

            <p style={{ color: "red", fontWeight: "600" }}>
              OUR NIOS COURSES
            </p>

            <p style={{ color: "blue", fontWeight: "600" }}>
              SECONDARY COURSE (CLASS X) And SENIOR SECONDARY COURSE (CLASS XII)
            </p>

            <h3>SECONDARY COURSE</h3>
            <p>
              This Course is equivalent to the Xth standard. You can choose
              subjects from the Scheme of Studies given in below Table.
              However, you will be required to success complete a minimum of
              five subjects with atleast one language or at most two languages,
              which is compulsory for certification.
            </p>

            <h3>SENIOR SECONDARY COURSE</h3>
            <p>
              This Course is designed for those who have passed the Xth standard
              or equivalent examination from a recognised Board and would like
              to continue their education towards a Senior Secondary
              Certification, equivalent to XII standard. You can choose
              subjects from the Scheme of Subjects given in below Table.
              However, you will be required to successfully complete a minimum
              of five subjects with atleast one language or at most two
              languages, which is compulsory for Certification.
            </p>

            <h3>SCHEME OF STUDIES</h3>
            <p>
              The Scheme of Studies for Secondary and Senior Secondary Courses is
              shown in below Table. For obtaining a pass certificate, you are
              required to pass in a minimum of five subjects including a
              maximum of two languages from Group 'A' and other three or four
              subjects from Group (B). However you are free to take upto two
              additional subjects. Thus in all you can choose maximum of seven
              subjects.
            </p>

            <p style={{ color: "green", fontWeight: "600" }}>
              For Admission in nios and also for the good percentage in NIOS
              please contact SS Coaching at <strong>9792111121</strong>
            </p>

            <h3 style={{ textAlign: "center", color: "purple" }}>
              Table-1 : Scheme of Studies for Academic Courses
            </h3>

            <SecondaryOrSrSecondary/>

            <p style={{ color: "purple" }}>
              • Five subjects with either one or two languages from Group A and
              the remaining subjects from Group B
            </p>

            <p style={{ color: "purple" }}>
              • Two additional subjects can be taken from either of the two
              groups with additional fees as per NIOS norms
            </p>

            <h3>Note:</h3>

            <p style={{ color: "red" }}>
              Note : 1. Subjects with asterisk * have theory as well as practical
              work
            </p>

            <p style={{ color: "red" }}>
              Note : 2. Learner can opt only one subject from each of Group C, D,
              E and F
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
