import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function TutorMarkedAssignments() {
  return (
    <>
      <Head>
        <title>What is Tutor Marked Assignments (TMA)?</title>
        <meta
          name="description"
          content="What is Tutor Marked Assignments (TMA)? Learn about TMA weightage, submission process, and importance in NIOS."
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
              What is Tutor Marked Assignments (TMA)?
            </h1>


              <p>
                Tutor Marked Assignments (TMAs) play a significant role in enhancing a student's learning skills and helping them become a meritorious learner. NIOS has developed several means and strategies to aid learners in acquiring knowledge easily and being successful. TMA is one of the essential tools that help in the learning process through Open and Distance Learning (ODL) System. TMAs aid learners in developing regular study habits and practicing writing responses to questions, providing a kind of rehearsal in the preparation for the final examination.
              </p>

           

              <p>
                TMAs provide learners with feedback and suggestions for improvement, and help in designing diagnostic and remedial teaching strategies during Personal Contact Programmes (PCPs). Internal Assessment is conducted through one TMA booklet form for each subject, and subject tutors at the AIs will correct the assignments and provide feedback. The TMA will also be uploaded on the NIOS website, and learners can download it.
              </p>

              <p>
                Internal assessment for the 2015-16 Intermediate/Higher Level Examination will be a continuous and comprehensive assessment with a 20% weightage. These marks will be shown in the mark-sheet, along with the marks of external examination, which will carry 80% weightage in each subject. TMA is applicable for admission through Stream-1 only, and it should be submitted before appearing in the Public Examination of the particular subject. However, TMA is not applicable to learners seeking registration under Streams II, III & IV.
              </p>

              <p>
                This booklet contains one assignment in each subject. Learners must complete the assignment in their own handwriting in the chosen subjects only and submit them to their teachers. TMA carries 20 marks, and less number from which it is set is mentioned in the beginning. Questions 1, 2, and 3 are short answer questions containing 2 marks each, and questions 4 and 5 are long answer questions of 4 marks each. Learners have to answer only one question out of the four given. Question no. 6 gives learners a list of four projects, of which they have to attempt only one, and this question will be for 6 marks. The guidelines for each project work are given along with the topic set.
              </p>

              <p>
                It is important to submit TMAs on time; an "ABSENT" is marked in the mark sheet if the assignments are not submitted on time in the column for grades of TMAs. An "ABSENT" in the mark sheet in the column for grades will not be acceptable to any student. Therefore, students must pay significant concern to it. According to the Prospectus of 2011-12, submission of at least one TMA in each subject was made compulsory, and learners will not be allowed to appear in public examinations and/or their results may be declared as "INCOMPLETE" unless they have submitted at least one TMA in each subject.
              </p>

              <p>
                SSCoaching nios Lucknow, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS board by qualified staff and trainers who have a decades experience of . SS Coaching nios Lucknow, also helps in form filling for admissions in each stream (
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
              ) of NIOS Board for 10th and 12th admission seekers.
              </p>


          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
