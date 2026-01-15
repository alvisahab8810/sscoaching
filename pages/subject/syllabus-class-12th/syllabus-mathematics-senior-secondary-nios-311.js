import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusMathematicsSeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Mathematics Senior Secondary NIOS</title>
        <meta
          name="description"
          content="Syllabus Mathematics Senior Secondary NIOS Mathematics (311)"
        />
        <meta
          name="keywords"
          content="NIOS Mathematics 311 syllabus, Mathematics Senior Secondary NIOS"
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
              Syllabus Mathematics Senior Secondary NIOS
            </h1>

            <h2 className="nios-125h-senior-hero-title">
              NIOS Syllabus For Senior Secondary
            </h2>

            <h3 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">Mathematics (311) </span>
            </h3>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure Of Mathematics
            </p>

            {/* COURSE STRUCTURE TABLE */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>MODULES</th>
                    <th>
                      TMA (40 % of Syllabus)
                      <br />
                      <br />
                      15 lessons
                    </th>
                    <th>
                      Public Examination (60% of syllabus)
                      <br />
                      <br />
                      23 lessons
                    </th>
                    <th>Marks</th>
                    <th>Minimum study hour</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Module-I</strong> Sets, Relations and Functions</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td><strong>Module- II</strong> Sequences and Series</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td><strong>Module-III</strong> Algebra-I</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td><strong>Module-IV</strong> Co-ordinate Geometry</td>
                    <td></td>
                    <td>
                      13. Cartesian System of Rectangular Coordinates<br />
                      14. Straight Lines<br />
                      15. Circles<br />
                      16. Conic Sections
                    </td>
                    <td></td>
                    <td>30</td>
                  </tr>

                  <tr>
                    <td><strong>Module-V</strong> Statistics and Probability</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>20</td>
                  </tr>

                  <tr>
                    <td><strong>Module-VI</strong> Algebra-II</td>
                    <td></td>
                    <td>
                      20. Matrices<br />
                      21. Determinants<br />
                      22. Inverse of a Matrix and its Applications
                    </td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td><strong>Module- VII</strong> Relations and Functions</td>
                    <td></td>
                    <td>
                      23. Relations and Functions-II<br />
                      24. Inverse Trigonometric Functions
                    </td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td><strong>Module- VIII</strong> Calculus</td>
                    <td></td>
                    <td>
                      25. Limits and Continuity<br />
                      26. Differentiation<br />
                      27. Differentiation of Trigonometric functions<br />
                      28. Differentiation of Exponential and Logarithmic functions<br />
                      29. Application of Derivatives<br />
                      30. Integration<br />
                      31. Definite Integrals<br />
                      32. Differential Equations
                    </td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td><strong>Module-IX</strong> Vectors and Three Dimensional Geometry</td>
                    <td></td>
                    <td>
                      33. Introduction to Three Dimensional Geometry<br />
                      34. Vectors<br />
                      35. Plane<br />
                      36. Straight Line
                    </td>
                    <td></td>
                    <td>20</td>
                  </tr>

                  <tr>
                    <td><strong>Module-X</strong> Linear Programming and Mathematical Reasoning</td>
                    <td></td>
                    <td>
                      37. Linear Programming<br />
                      38. Mathematical Reasoning
                    </td>
                    <td></td>
                    <td>20</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DOWNLOAD LINKS */}
            <div className="download-links">
              <a href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/311Bifurcation.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Mathematics (311) Syllabus Here.
              </a>
              <a href="/papers/12th/311-maths-sample-2024.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Mathematics (311) Sample Question Paper Here.
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
