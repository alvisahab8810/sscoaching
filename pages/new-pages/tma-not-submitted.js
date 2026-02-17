import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function TMAsNotSubmittedNIOS() {
  return (
    <>
      <Head>
        <title>What happends in case TMAs are not Submitted?</title>
        <meta
          name="description"
          content="What happends in case TMAs are not Submitted in NIOS? Complete details about TMA rules and stream information."
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
              What happends in case TMAs are not Submitted?
            </h1>

            <p>
              ABSENT is marked in the marksheet if the assignments are not submitted on time in the column for grades of TMAs. An ABSENT in the marksheet in the column for grades will not be acceptable to any student, so one should pay important concern to it. The system of giving 20% weightage to Tutor Marked Assignments (TMA) in final results of the students in NIOS introduced from 2002 examination has been discontinued. Subject to TMA being made compulsory and the relative grading in TMA being shown in the final certificate and the separate column (Grade obtained in TMA). According to the Prospectus of 2011-12, submission of at least one TMA in each subject was made compulsory.
            </p>


            <p>
              In order to check your progress during the course of study, one should attempt Tutor Marked Assignments (TMAs) in every subject. Collect the TMA booklets from your AI. You are advised to submit your assignments regularly in each subject for evaluation at your AI as per following schedule:
            </p>

            <p>
              There are three assignments in each subject. The prize of the TMAs at Secondary/Senior Secondary Courses will be in grades, which will not be considered for overall weightage in the Public Examination. Learners will not be allowed to appear in Public Examination and/or their Result may be declared as ‘INCOMPLETE’ unless they have submitted atleast 1 TMA in each subject. But the average grade of the best two TMAs in each subject will be mentioned in your marksheet. Grades of the TMAs once obtained cannot be improved. TMAs should be submitted before appearing in the examination of the particular subject. The learner, at the time of admission, has to notify all subjects chosen by him for appearing in Examinations in the Admission Form including TOC, if needed.
            </p>

            <p>
              Streams 2, Streams 3 and 4 of online admission have been specifically designed for the learners who want to appear in NIOS examinations at the earliest available opportunity. Therefore, due to shortage of time, NIOS board will not be able to provide the following to the learners seeking admission under Stream 2, 3 and 4:
            </p>

            <ul className="chapter-list">
              <li>Study Material,</li>
              <li>Personal Contact Programmes (PCPs) and</li>
              <li>Tutor Marked Assignments (TMAs)</li>
            </ul>

            <p>
              Accordingly, NIOS does not charge any money for study materials, for conducting PCP and TMA for two streams of learners for the entire period of enrolment of five years. However, the learners can access the study material on payment basis from the Regional Centres.
            </p>

            <p>
              Since these learners have chosen to appear in NIOS examinations at a short notice, they are required to pay examination fee compulsorily at the time of admission and will have to fill up the examination form at the time of seeking nios Admission.
            </p>

            <p>
              SSCoaching NIOS center Lucknow,  helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS center Lucknow, also helps in form filling for admissions in each{" "}
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
