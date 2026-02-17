import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function ChangeSubjectsNIOS() {
  return (
    <>
      <Head>
        <title>Can subjects be changed after taking admission in NIOS?</title>
        <meta
          name="description"
          content="Can subjects be changed after taking admission in NIOS? Complete information about subject change rules, fees and eligibility."
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
              Can subjects be changed after taking admission in NIOS?
            </h1>

            <p>
              Yes, a student can change one or more subjects and even opt for one or two extra subjects after getting registered for a period of five years, provided that the total number of subjects opted by the student is not less than five and does not exceed a maximum of seven papers in which the student wishes to appear. NIOS is a board with the best facilities for the comfort of students for studying and a board that cares for the betterment of the student. The NIOS board is constantly coming up with new rules and programs to make studying easy so that students do not feel the pressure of studies and, at the same time, gain knowledge through their excellent and easy-to-understand syllabus.
            </p>



            <p>
              SSCoaching NIOS center in Lucknow, provides information about the NIOS board (National Institute of Open Schooling) as well as coaching classes, syllabus, and tuition for 10th (secondary) & 12th (senior secondary) students of the NIOS Board by renowned and highly qualified faculty and staff. There is a wide range of subjects on offer, so students have much independence in selecting the best possible subjects, keeping in mind how it can boost their careers or which subjects they can understand and learn easily. NIOS makes it mandatory for students to study a minimum of five and a maximum of seven subjects. Students are also allowed to change subjects midway through the course if they do not feel satisfied or feel some kind of uneasiness with the subject that they are willing to change. Students can choose from among three languages for the medium of instruction.
            </p>

            <p>
              Students can change one or more courses, provided that the total number of courses does not exceed seven during the five-year registration period. However, such a change is permissible within four years of your registration so that you can appear in Public Examinations within the validity period of admission. No change/addition of subjects will be allowed for the first forthcoming examination. The subject in which the student has passed cannot be changed later. To change courses / add additional courses, students must submit the application form from your AI free of charge to the authorized regional center of NIOS and pay for all categories of people and find out the prices listed below:
            </p>

            <p><strong>Secondary Course: Rs. 90/- per subject</strong></p>
            <p><strong>Senior Secondary Course: Rs. 120/- per subject</strong></p>

            <p>
              To make the best use of this facility provided by the NIOS to the students for changing their subjects, Mr. Sarvesh Sonkar, Chairman of the SS coaching institute, Lucknow, acts as a guide, a career counselor, and a mentor to the students by giving them expert advice to choose the right subjects for them after knowing their aspirations in life regarding their career. SS coaching is one of the pioneer institutes in the field of providing quality education for NIOS courses.
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
