import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function WhyStudentsFailInExam() {
  return (
    <>
      <Head>
        <title>Why do students fail or get less marks in exam ? | SS Coaching</title>
        <meta
          name="description"
          content="Know the reasons why students fail or get less marks in exam and how to improve exam performance with proper strategies."
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
              Why do students fail or get less marks in exam ?
            </h1>

              <p>
                It’s a most common question to every parents. If a student fails or gets lesser marks in exam, he is weak in one or more of the above factors. Sometimes a student studies a lot but he gets lesser marks in exam because he may not be aware of test taking strategies which tells him how to express his learning in best way in exam or reproduce his learning in a good way in exam to convince the checker to give you more marks. Exam taking tactics and strategies plays a vital role. He should know how to give a good presentation on answer sheet with the help of headings, sub-headings, diagram, charts and tables. A good presentation on answer-sheet makes answer easily interpretable and appealing to checker.
              </p>


              <p>
                A student fails or gets lesser marks in exam because he does not know all the factors or does not pay attention to all the factors which make a student get high grades in exam. Student’s mental approach towards study, how much a student is particular about his study, attendance in lectures, method of preparing for exam, exam taking tactics and strategies, making good and helpful notes, direction of study, method of learning, memorizing, concentration, confidence and study related extra-curricular activities are the factors which make him succeed in exam. A brilliant student pays attention to all the factors which make him succeed in exam.
              </p>

              <p>
                The main factors for the success of student in exam are as follows which are briefly explained here to give you just the idea but each is explained with full detail on this website, see the topics on left side of website.
              </p>

              <p><strong>Time management:</strong> Time management enables you to utilize your time more productively. Time management includes time tables and syllabus etc.</p>

              <p><strong>Making good notes:</strong> Making useful notes plays a vital role for success in exam. It helps you to learn</p>

              <p><strong>Easily and with perfection:</strong> Notes are used for revision in futures for exam.</p>

              <p><strong>Effective and directed study.</strong> Study is not just reading, it is reading for learning. A student should know how to study effectively, how to study more in little time. What to learn and what to practice.</p>

              <p><strong>How to make preparation for exam.</strong> A student should know how to make preparation for exam. Preparation for exam is not a task of day or two, it needs daily study and you should know all the tactics for preparation for exam.</p>

              <p><strong>Test taking strategies.</strong> Test taking strategies show you how to present your answer on answer sheet in befitting way so that the checker give you more marks for your answers. Test taking strategies tells you all the tactics for exam like time management for each question and how to tackle different question.</p>

              <p>
                If a student fails or gets lesser marks in exam, he is weak in one or more of the above factors. If you want to be a successful student be careful about all these factors. All these factors are equally necessary for getting high marks in exam. All the above factors are explained with full detail on this website; see the topics on the left side of website.
              </p>

              <p>
                SSCoaching NIOS lucknow centre, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS lucknow centre, also helps in form filling for admissions in each stream  (
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
              )  of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS lucknow centre can guide you with the admission process for all streams of NIOS Board.
              </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
