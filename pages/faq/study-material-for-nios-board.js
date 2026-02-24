"use client";

import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import CTA from "@/components/home/CTA";
import Head from "next/head";

export default function StudyMaterialNIOS() {
  return (
    <>
      <Head>
        <title>Who will provide the study material for NIOS board?</title>
        <meta
          name="description"
          content="Who will provide the study material for NIOS board - SS Coaching NIOS Lucknow"
        />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Who will provide the study material for NIOS board?
            </h1>

            <p>
              After getting registered with NIOS, students can receive the prospectus and syllabus by providing correct name and address details to the institute. The books will be dispatched to the mentioned address or the AI center mentioned in the application form. Students should take care while filling out the form at the institute. After receiving the study material, students can refer to other books for deeper knowledge on specific topics.
            </p>


            <p>
              To obtain the study material, students can either collect it from the center by showing their enrollment number or identity card, or it will be delivered to their address. NIOS syllabus for the assigned subjects can be downloaded, and students can also download previous years' question papers and sample papers for the October 2014 and April 2014 exams.
            </p>

            <p>
              SS Coaching NIOS center in Lucknow, offers information about NIOS Board, coaching classes, syllabus, and tuition for 10th (secondary) and 12th (senior secondary) students by renowned and highly qualified faculty and staff. SS Coaching NIOS center in Lucknow, also guides students in filling out the online admission form for all streams of NIOS Board for 10th and 12th students.
            </p>

            <p>
              The secondary course of NIOS offers subjects in two groups:
            </p>

            <p>
              Group A and Group B. Students must choose at least two subjects from Group A and a minimum of three subjects from Group B, making the total number of subjects five. However, students can choose two additional subjects, bringing the total number of subjects to seven if they wish to do so.
            </p>

            <p>
              The senior secondary course of NIOS also offers subjects in two groups:
            </p>

            <p>
              Group A and Group B. Students can choose the subjects they wish to study and ask their studying institute to provide them with the necessary study material at their address or the institute's address, as per their convenience.
            </p>

            <p>
              NIOS provides support services such as NIOS data transfer, training materials, shared credentials, Customer registration and OBE preferences. Learning strategies include learning through printed self-study materials, video and audio programs, Personal Communications Program (PCP), and Teacher Marked Assignments (TMA). Deep knowledge is also provided to learners through a magazine called "Open Learning." The Study Material is available in English and Hindi.
            </p>

            <p>
              NIOS study material is available for download, and it is a good option for those who cannot attend regular schools for their secondary education. Some students work part-time during their secondary studies and cannot attend regular schools. This article provides all the necessary information for those who wish to take admission in NIOS class X and class XII. NIOS Online admissions are open.
            </p>

          </div>
        </div>
        <div className="container pb-50">
                <CTA/>
        
        
        
                </div>
        <Footer />
      </section>
    </>
  );
}
