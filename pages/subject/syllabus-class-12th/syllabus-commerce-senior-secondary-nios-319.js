import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusCommerceSeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Commerce Senior Secondary NIOS</title>
        <meta
          name="description"
          content="NIOS Syllabus For Senior Secondary Commerce (319)"
        />
        <meta
          name="keywords"
          content="NIOS Commerce 319 syllabus, Commerce Senior Secondary NIOS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Syllabus Commerce Senior Secondary NIOS
            </h1>

            <h2 className="nios-125h-senior-hero-title">
              NIOS Syllabus For Senior Secondary
            </h2>

            <h2 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">
                Commerce (319)
              </span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure Of Commerce (319)
            </p>

            {/* TABLE */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>TMA (40%)</th>
                    <th>Public Examination (60%)</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1. Introduction to Business (5 lessons)</td>
                    <td></td>
                    <td>
                      L-3. Business Environment<br />
                      L-5. Company Form of Business
                    </td>
                  </tr>

                  <tr>
                    <td>2. Business Management and its Functions (4 lessons)</td>
                    <td></td>
                    <td>
                      L-7. Planning and Organising<br />
                      L-8. Staffing and Directing<br />
                      L-9. Coordination and Controlling
                    </td>
                  </tr>

                  <tr>
                    <td>3. Business Finance (4 lessons)</td>
                    <td></td>
                    <td>
                      L-10 Financial Planning and Management<br />
                      L-12. Long Term Sources of Finance<br />
                      L-13. Financial Markets
                    </td>
                  </tr>

                  <tr>
                    <td>4. Marketing(4 lessons)</td>
                    <td></td>
                    <td>
                      L-15. Marketing Mix<br />
                      L-16. Advertising and Salesmanship
                    </td>
                  </tr>

                  <tr>
                    <td>5. Trade (2 lessons)</td>
                    <td></td>
                    <td>
                      L-18 Internal Trade<br />
                      L-19. External Trade
                    </td>
                  </tr>

                  <tr>
                    <td>6. Avenues in Business and Employment (4 lessons)</td>
                    <td></td>
                    <td>
                      L-23. Modern Modes of Business<br />
                      L-20 Self-Employment
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="spacer-area">

            {/* MODULE DETAILS */}
            <h2 className="nios-125h-senior-hero-title mb-4">
              Syllabus Commerce Senior Secondary NIOS
            </h2>

            <h3>Module-I:</h3>
            <ul>
              <li>L-3. Business Environment</li>
              <li>L-5. Company Form of Business</li>
            </ul>

            <h3>Module-II:</h3>
            <ul>
              <li>L-7. Planning and Organising</li>
              <li>L-8. Staffing and Directing</li>
              <li>L-9. Coordination and Controlling</li>
            </ul>

            <h3>Module-III:</h3>
            <ul>
              <li>L-10 Financial Planning and Management</li>
              <li>L-12. Long Term Sources of Finance</li>
              <li>L-13. Financial Markets</li>
            </ul>

            <h3>Module-IV</h3>
            <ul>
              <li>L-15. Marketing Mix</li>
              <li>L-16. Advertising and Salesmanship</li>
            </ul>

            <h3>Module-V</h3>
            <ul>
              <li>L-18 Internal Trade</li>
              <li>L-19. External Trade</li>
            </ul>

            <h3>Module-VI</h3>
            <ul>
              <li>L-23. Modern Modes of Business</li>
              <li>L-20 Self-Employment</li>
            </ul>

            </div>

            {/* DOWNLOAD LINKS */}
            <div className="download-links">
              <a href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/319Bifurcation_new.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Commerce (319) Syllabus Here.
              </a>

              <a href="/papers/12th/319-business-studies-sample-2024.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Commerce (319) Sample Question Paper Here.
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
