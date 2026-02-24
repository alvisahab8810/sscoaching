"use client";

import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function ExemptionsNIOS() {
  return (
    <>
      <Head>
        <title>What are Exemptions available during NIOS exams ?</title>
        <meta
          name="description"
          content="What are Exemptions available during NIOS exams - SS Coaching NIOS Lucknow"
        />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              What are Exemptions available during NIOS exams ?
            </h1>

            <p className="nios-125h-senior-hero-subtitle">
              Persons with disability need special attention during the examinations and evaluation of their answer scripts. The general relaxations with regard to NIOS examination are as follows:
            </p>


            <ol style={{ marginTop: "30px", lineHeight: "1.8" }}>
              <li>
                A candidate who wishes to avail the concession in Examination is required to produce a Medical Disability Certificate of a Govt. doctor from a recognized Hospital/Medical Institution indicating the nature of his/her disability and the extent of the disability.
              </li>

              <li>
                In case of candidate with Learning Disability (LD), Diagnostic Certificate from the Clinical Psychologist, Educational or school Psychologist, Neuropsychologist, Specialist in Learning Disabilities, Special Educator (M.Ed.) Educational Therapists are acceptable. The Diagnostician should have appropriate qualification to provide a diagnosis of learning disabilities and must be registered with Rehabilitation Council of India (RCI)/Medical Council of India (MCI) or National Institutes and Universities dealing with disabilities, or Cell for the Education of Disabled (CED) of NIOS.
              </li>

              <li>
                While appearing at the examinations, the candidate will write his/her disability on the top of the answer script, which will also be authenticated by the Centre Superintendent.
              </li>

              <li>
                Such candidates will be provided general relaxations and also the facility of amanuensis according to their disabilities.
              </li>

              <li>
                In case of candidates using services of scribe/ amanuensis and not more than two scribes/amanuensis should be allowed in one examination room.
              </li>

              <li>
                The Centre Superintendent will make arrangements to seat a maximum of four candidates in a separate room with a separate invigilator for supervision.
              </li>
            </ol>

            <p style={{ marginTop: "40px" }}>
              SSCoaching NIOS center Lucknow, helps students get complete information about NIOS board (National Institute of Open Schooling) with coaching classes that prepare students for clearing nios exams, syllabus and tuition for 10th & 12th students of NIOS Board by qualified staff and trainers who have a decades experience of nios curriculum. SS Coaching NIOS center Lucknow, also helps in form filling for admissions in each{" "}
              
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
              </a>
              ,{" "}
              <a
                href="/nios-admission/admission-in-nios-stream-3&4"
                className="nios-125h-senior-highlight"
              >
                stream 3 & 4
              </a>{" "}
              of NIOS Board for 10th and 12th admission seekers. If you are seeking Nios Admission, SS Coaching NIOS center Lucknow can guide you with the admission process for all streams of NIOS Board.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
