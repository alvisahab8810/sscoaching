import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function NIOSPublicExaminationMonth() {
  return (
    <>
      <Head>
        <title>In which month NIOS conducts Public Examinations?</title>
        <meta
          name="description"
          content="In which month NIOS conducts Public Examinations? Complete details about March-April and September-October exams and ODE exam."
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
              In which month NIOS conducts Public Examinations?
            </h1>

            <p>
              The NIOS board secondary and senior secondary board exams are held twice a year in the months of March-October, April and September according to the exam schedule declared. There is also another option known as ODE exam on Demand. In ODE NIOS Board can help the students to pass the board exam within 45 DAYS.
            </p>


            <p>
              The board has been approved and founded by the Ministry of Human Resource and Development, government of India through resolution (No. F.5-24/90 Sch.3 dated 14 September 1990 published in the Gazette of India on 20 October 1990). You can get admission in any university or institute after clearing your secondary or senior secondary course from NIOS. The course material of NIOS is prepared by NCERT therefore the syllabus is competent and up to date as any other board in India.
            </p>

            <p>
              NIOS board conducts secondary and sr. secondary examination in months of March-April and September-October twice a year at various regional examination centers throughout the country. Admissions are open for the September-October session. Students can contact us for enrolling at secondary and senior secondary level. We are SS coaching NIOS center Lucknow. Practical exam and written exam date sheets are already published on SS Coaching website.
            </p>

            <p>
              Students can view and download 10th & 12th Class Time Table/Date Sheet for the Sept-Oct exams. Candidates who have applied now they are waiting for Hall Ticket. Candidates can download their secondary and sr. secondary Class Time Table/Date Sheet from our website. NIOS is one of the very big open schooling systems of the Nation. Practical exam and written exam date sheets are already published on SS Coaching website. Exams for 10th & 12th students will be initiated in the month of October. For Vocational students exams are always scheduled in late October. All the exams are scheduled in Afternoon sessions. NIOS Hall ticket for this October month exam for all registered students will be made available. Exam will be conducted at various centers all over India. Hall ticket can be downloaded by entering roll number and answering a simple security question.
            </p>

            <p>
              There is another option that lets the students to pass the board exam within 45 days of registration. This program is known as ODE (on demand Examination). This course lets the fail student pass that very session in which he failed and lets him take admission in the graduation that very session. This acts as a boon for the failed or debarred students.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
