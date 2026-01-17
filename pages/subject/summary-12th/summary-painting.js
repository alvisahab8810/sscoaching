import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusPaintingSeniorNIOS() {
  return (
    <>
      <Head>
        <title>
         Painting Course (332) summary for Senior Secondary-NIOS
        </title>
        <meta
          name="description"
          content="This course in SS Coaching introduces students to a wide range of materials, techniques, and concepts involving traditional painting. This will help students in bringing out their creative self in the person."
        />
        <meta
          name="keywords"
          content="Painting practical for board exam, Painting institute in Lucknow, Painting online practice, Painting courses online, Painting question paper, NIOS class 12 painting question paper, Painting sample papers for class 12 NIOS. painting nios class 12, nios painting, nios painting, painting nios class 12th, nios painting book, nios painting class 12th, nios 12th painting book, nios painting practical, nios painting book class 12, Class 12 NIOS painting syllabus, Intermediate board painting previous papers, NIOS Painting question paper 2022, 2023, NIOS Painting sample paper 2024"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />

        <div className="syllabus-nios summary-pages">
          <div className="container">

            {/* ================= PAGE TITLE ================= */}
            <h1 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">
                Painting Subject (332)
              </span>{" "}
              in NIOS Senior Secondary 12th
            </h1>

            <hr />

            {/* ================= INTRO CONTENT ================= */}
            <p>
              Painting course is designed to give expression to one’s visual
              thoughts on a canvas. To develop one’s drawing skills, one will
              go through various exercises aimed at improving their skills to
              represent nature’s designs on paper.This course in SS Coaching
              introduces students to a wide range of materials, techniques,
              and concepts involving traditional painting. This will help
              students in bringing out the creative self in the person.
            </p>

            {/* ================= IMAGE PLACEHOLDER ================= */}
            <div className="image-placeholder-box">
              <img
                src="/assets/images/summary/12th/painting.png"
                alt="Painting Subject NIOS Class 12"
              />
            </div>
            <br />

            {/* ================= COURSE DETAILS ================= */}
            <p>
             The course in Painting at Senior Secondary stage of NIOS as an elective subject is aimed to develop a creative sense of the students through the understanding of various important well known aspects and thoughts opening processes and modes of visual art expression in Indian cultural heritage from the period of Aryan age to the present time. It also encompasses practical exercises in drawing and painting to develop their mental faculties of observation, imagination, creation and physical skills required for its expressions.<br/><br/>
This would enrich their vision and enable them to appreciate and develop an aesthetic sensibility to enjoy the beauty of life throught the medium of painting. The students will also have an opportunity to observe and study the evolution of its mutations with new style. The students should be made aware of painting as a human sensual feeling. The teachers should be able to expose them to the wide range of artistic designs, the media and the tools used. The history of Indian Art is a long one so therefore it becomes of utmost importance to include it as an integral subject in NIOS. Hence the students would be acquainted with brief glimpses of the development of Indian Visual Art as are required for concept formation. Examples included in the course of study are selected because of their aesthetic behaviour and are intended exclusively for guidelines.

            </p>

            <hr />
            <br />

     

            {/* ================= QUOTE ================= */}
            <blockquote className="quote-box">
              <h5>
                “I think you learn more if you're laughing at the same time.”
              </h5>
              <h4>
                <span className="nios-125h-senior-highlight">
                  - Mary Ann Shaffer
                </span>
              </h4>
            </blockquote>

                   {/* ================= FOOTER LINKS ================= */}
            <div className="ftr-links">
              <div className="subject-card-buttons">
                <a
                  href="/subject/syllabus-class-12th/syllabus-painting-senior-secondary-nios-332"
                  className="subject-btn"
                >
                  View Syllabus
                </a>
                <a
                  href="/subject/curriculum-12th/curriculum-painting"
                  className="subject-btn"
                >
                  View Curriculum
                </a>
              </div>
            </div>

            <hr />
            <br />

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
