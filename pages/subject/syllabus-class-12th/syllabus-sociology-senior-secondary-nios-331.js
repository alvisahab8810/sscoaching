import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusSociologySeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Sociology Senior Secondary NIOS</title>
        <meta
          name="description"
          content="NIOS Syllabus For Senior Secondary Sociology (331)"
        />
        <meta
          name="keywords"
          content="NIOS Sociology 331 syllabus, Sociology Senior Secondary NIOS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Syllabus Sociology Senior Secondary NIOS
            </h1>

            <h2 className="nios-125h-senior-hero-title">
              NIOS Syllabus For Senior Secondary
            </h2>

            <h2 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">
                Sociology (331)
              </span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure Of Sociology
            </p>

            {/* SUMMARY TABLE */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Module</th>
                    <th>Marks</th>
                    <th>Study Hours</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Sociology: Basic concepts</td>
                    <td></td>
                    <td>70</td>
                  </tr>

                  <tr>
                    <td>2.</td>
                    <td>Social Institutions and Social stratification</td>
                    <td></td>
                    <td>35</td>
                  </tr>

                  <tr>
                    <td>3.</td>
                    <td>Social Change Socialization and Social Control</td>
                    <td></td>
                    <td>35</td>
                  </tr>

                  <tr>
                    <td>4.</td>
                    <td>Indian Society</td>
                    <td></td>
                    <td>60</td>
                  </tr>

                  <tr>
                    <td>5.</td>
                    <td>Optional (Any One) Status of Women Or Culture</td>
                    <td></td>
                    <td>40</td>
                  </tr>

                  <tr>
                    <td>Total</td>
                    <td></td>
                    <td></td>
                    <td>240</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DETAILED MODULE TABLE */}
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
                    <td>Module 1 Sociology: Basic Concepts</td>
                    <td></td>
                    <td>
                      L-3-Sociology: It Relationship with other Social Sciences<br />
                      L-4-Methods and Techniques of Research in Sociology<br />
                      L-5-Social, Community, Association and Institution<br />
                      L-6-Social Groups
                    </td>
                  </tr>

                  <tr>
                    <td>Module 2 Social Institution and Social Stratification</td>
                    <td></td>
                    <td>
                      L-12Marriage<br />
                      L-13Family<br />
                      L-14-Kinship<br />
                      L-16- Social Stratification: Hierarchy, Differentiation and Inequality
                    </td>
                  </tr>

                  <tr>
                    <td>Module 3 Social Change, Socialisation and Social Control</td>
                    <td></td>
                    <td>
                      L-17- Factors of Social Change<br />
                      L-18- Processes of Social Change<br />
                      L-19-Socialisation<br />
                      L-20-Social Control
                    </td>
                  </tr>

                  <tr>
                    <td>Module 4 Indian Society</td>
                    <td></td>
                    <td>
                      L-26-Indian society: Tribal, Rural and Urban<br />
                      L-27- Caste system in India<br />
                      L-28-Major Religious Communities in India<br />
                      L-29- Major Social Problems in India<br />
                      L-30-Problem of Scheduled Caste and Scheduled Tribes<br />
                      L-31- Problems of Other Deprived Section
                    </td>
                  </tr>

                  <tr>
                    <td>Module 5 (a) Status of Women</td>
                    <td></td>
                    <td>
                      L-32A-Historical and Cultural perspectives<br />
                      L-33A-Gender discrimination
                    </td>
                  </tr>

                  <tr>
                    <td>Module 5 (b) Culture</td>
                    <td></td>
                    <td>
                      L-32B Culture: concept and characteristics<br />
                      L-33B-Indian Cultural Heritage
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DOWNLOAD LINKS */}
            <div className="download-links">
              <a href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/331Bifurcation.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Sociology (331) Syllabus Here.
              </a>

              <a href="/papers/12th/331-sociology-sample-2024.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Sociology (331) Sample Question Paper Here.
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
