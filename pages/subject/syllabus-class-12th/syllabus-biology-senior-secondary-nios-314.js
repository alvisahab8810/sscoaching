import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusBiologySeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Biology Senior Secondary NIOS</title>
        <meta
          name="description"
          content="Syllabus Biology Senior Secondary NIOS Biology (314)"
        />
        <meta
          name="keywords"
          content="NIOS Biology 314 syllabus, Biology Senior Secondary NIOS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Syllabus Biology Senior Secondary NIOS
            </h1>

            <h2 className="nios-125h-senior-hero-title">
              NIOS Syllabus For Senior Secondary
            </h2>

            <h2 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">Biology (314)</span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure Of Biology
            </p>

            {/* TABLE */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>MODULE<br />(No. & name)</th>
                    <th>TMA (40%)</th>
                    <th>Public Examination (60%)</th>
                    <th>Marks</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <strong>1.Module-I:</strong> Diversity and Evolution of Life (12 Marks)
                    </td>
                    <td></td>
                    <td>
                      L-2.The Kingdom Monera, Protoctista and Fungi<br />
                      L-3.Kingdom Plantae and Animalia<br />
                      L-5.Tissues and other Level of Organization
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>
                      <strong>2.Module-II</strong> Forms and Functions of Plants and Animals (26 Marks)
                    </td>
                    <td></td>
                    <td>
                      L-6. Root system<br />
                      L-7. Shoot system<br />
                      L-10.Nitrogen Metabolism<br />
                      L-11.Photosynthesis<br />
                      L-12. Respiration in Plants<br />
                      L-15. Circulation of Body Fluids<br />
                      L-17. Coordination and Control - The Nervous and Endocrine Systems
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>
                      <strong>3.Module-III:</strong> Reproduction and Heredity (22 Marks )
                    </td>
                    <td></td>
                    <td>
                      L-19. Reproduction in Plants<br />
                      L-21. Reproduction and Population Control<br />
                      L-22. Principles of Genetics<br />
                      L-23. Molecular Inheritance and Gene Expression
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>
                      <strong>4.Module- IV:</strong> Environment and Health (13 Marks)
                    </td>
                    <td></td>
                    <td>
                      L-25. Principles of Ecology<br />
                      L-28. Nutrition and Health
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>
                      <strong>5.Module- V:</strong> Emerging Areas in Biology(7 Marks)
                    </td>
                    <td></td>
                    <td>
                      L.30 Immunobiology: An Introduction<br />
                      L.31 Biotechnology
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* LESSON LIST */}
            <div className="spacer-area">
              <h2 className="nios-125h-senior-hero-title">
                Syllabus Biology Senior Secondary NIOS
              </h2>

              <p><strong>Name Of The Lesson:</strong></p>

              <p>Lesson 2-The Kingdoms Monera, Protoctista and Fungi</p>
              <p>Lesson 3-Kingdoms Plantae and Animalia</p>
              <p>Lesson 5-Tissues and other Levels of Organization</p>
              <p>Lesson 6-Root System</p>
              <p>Lesson 7-Shoot System</p>
              <p>Lesson 10-Nitrogen Metabolism</p>
              <p>Lesson 11-Photosynthesis</p>
              <p>Lesson 12-Respiration in Plants</p>
              <p>Lesson 15-Circulation of Body Fluids</p>
              <p>Lesson 17- Homeostasis : The Steady State</p>
              <p>Lesson-18. Reproduction in Plants</p>
              <p>Lesson-21. Reproduction and Population Control</p>
              <p>Lesson-22. Principles of Genetics</p>
              <p>Lesson-23. Molecular Inheritance and Gene Expression</p>
              <p>Lesson-25. Principles of Ecology</p>
              <p>Lesson-28. Nutrition and Health</p>
              <p>Lesson 30-Immunobiology : An Introduction</p>
              <p>Lesson 31-Biotechnology</p>
            </div>

            {/* DOWNLOAD LINKS */}
            <div className="download-links">
              <a href="https://www.nios.ac.in/student-information-section/syllabus-sample-question-paper(sr-secondary).aspx" target="_blank">
                Download The Official NIOS Senior Secondary Biology (314) Syllabus Here.
              </a>

              <a href="/papers/12th/314-biology-sample-2024.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Biology (314) Sample Question Paper Here.
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
