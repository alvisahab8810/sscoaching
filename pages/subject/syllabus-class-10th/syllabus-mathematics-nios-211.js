import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusMathematicsNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus of Mathematics (211) | NIOS</title>
        <meta
          name="description"
          content="NIOS Mathematics (211) Syllabus – Course Structure, Modules, Chapters, and Study Hours."
        />
        <meta
          name="keywords"
          content="NIOS Mathematics 211 syllabus, NIOS maths course structure, NIOS maths chapters"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />

        <div className="syllabus-nios">
          <div className="container">

            {/* Page Heading */}
            <h1 className="nios-125h-senior-hero-title">
              Syllabus of Mathematics in NIOS
            </h1>

            <h2>
              <span className="nios-125h-senior-highlight">
                Mathematics (211) Syllabus
              </span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure of Mathematics
            </p>

            {/* Course Structure Table */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>TMA (40%)</th>
                    <th>Public Examination (60%)</th>
                    <th>Marks</th>
                    <th>Study Hours</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Module-I</strong><br />Algebra</td>
                    <td>-</td>
                    <td>
                      4. Special Product and Factorisation<br />
                      5. Linear Equation<br />
                      6. Quadratic Equation<br />
                      7. Arithmetic Progression
                    </td>
                    <td>-</td>
                    <td>-</td>
                  </tr>

                  <tr>
                    <td><strong>Module-II</strong><br />Commercial Mathematics</td>
                    <td>-</td>
                    <td>
                      8. Percentage and its Applications<br />
                      9. Instalment Buying
                    </td>
                    <td>-</td>
                    <td>-</td>
                  </tr>

                  <tr>
                    <td><strong>Module-III</strong><br />Geometry</td>
                    <td>-</td>
                    <td>
                      16. Angle in a Circle and Cyclic Quadrilaterals<br />
                      17. Secants, Tangents and their Properties<br />
                      18. Constructions<br />
                      19. Co-ordinate Geometry
                    </td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Detailed Syllabus */}
            <div className="spacer-area">
              <h3 className="nios-125h-senior-hero-title">
                Mathematics <span className="nios-125h-senior-highlight">(211)</span> Syllabus
              </h3>

              <div className="module-box">
                <h4>MODULE I: ALGEBRA</h4>
                <ul className="chapter-list">
                  <li>Chapter 4. Special Products and Factorization</li>
                  <li>Chapter 5. Linear Equations</li>
                  <li>Chapter 6. Quadratic Equations</li>
                  <li>Chapter 7. Arithmetic Progressions</li>
                </ul>
              </div>

              <div className="module-box">
                <h4>MODULE II: COMMERCIAL MATHEMATICS</h4>
                <ul className="chapter-list">
                  <li>Chapter 8. Percentage and its Applications</li>
                  <li>Chapter 9. Instalment Buying</li>
                </ul>
              </div>

              <div className="module-box">
                <h4>MODULE III: GEOMETRY</h4>
                <ul className="chapter-list">
                  <li>Chapter 16. Angles in a Circle and Cyclic Quadrilateral</li>
                  <li>Chapter 17. Secants, Tangents and their Properties</li>
                  <li>Chapter 18. Constructions</li>
                  <li>Chapter 19. Co-ordinate Geometry</li>
                </ul>
              </div>

              <div className="module-box">
                <h4>MODULE IV: MENSURATION</h4>
                <ul className="chapter-list">
                  <li>Chapter 20. Perimeters and Area of Plane Figures</li>
                  <li>Chapter 21. Surface Area and Volume of Solid Figures</li>
                </ul>
              </div>

              <div className="module-box">
                <h4>MODULE V: TRIGONOMETRY</h4>
                <ul className="chapter-list">
                  <li>Chapter 22. Introduction to Trigonometry</li>
                  <li>Chapter 23. Trigonometric Ratios of Some Special Angles</li>
                </ul>
              </div>

              <div className="module-box">
                <h4>MODULE VI: STATISTICS</h4>
                <ul className="chapter-list">
                  <li>Chapter 25. Measures of Central Tendency</li>
                  <li>Chapter 26. Introduction to Probability</li>
                </ul>
              </div>
            </div>

            {/* Download Links */}
            <div className="download-links">
              <a
                href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/10th/211.pdf"
                target="_blank"
              >
                Download The Official NIOS Mathematics (211) Syllabus Here
              </a>
              <a
                href="/papers/211-maths-sample-2024.pdf"
                target="_blank"
              >
                Download The Official NIOS Mathematics (211) Sample Question Paper Here
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
