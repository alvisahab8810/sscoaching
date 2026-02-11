import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusEconomicsSeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Of Economics (318) In NIOS for Senior Secondary Education</title>
        <meta
          name="description"
          content="Economics Course 12th class NIOS Board Lucknow by SS Coaching. Economics courses details and gets all syllabus information of Economics course of 12th in NIOS board."
        />
        <meta
          name="keywords"
          content="Economics question paper, Sample papers for class 12th economics, Class 12 economics syllabus, NIOS sample papers for class 12th economics, Economics sample papers for class 12 NIOS, Economics online learning economics courses online, Board economics previous papers, Question paper of economics, Economics courses, Courses in economics, NIOS class 12 economics question paper, Economics syllabus for NIOS, Economics study material for board exam, NIOS economics syllabus class 12, Class 12th NIOS economics syllabus, NIOS study material for economics, Economics syllabus for NIOS exam, Senior secondary economics syllabus, economics class 12th solved question papers, Economics coaching in Lucknow, NIOS 12 class economics syllabus, Economics class 12th NIOS syllabus, NIOS economics syllabus for 12th, NIOS Economics question paper 2022, 2023, NIOS Economics sample paper 2024"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
               <BranchContactCanvas/>
        

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Syllabus Economics Senior Secondary NIOS
            </h1>

            <h2 className="nios-125h-senior-hero-title">
              NIOS Syllabus For Senior Secondary
            </h2>

            <h2 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">
                Economics (318)
              </span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure Of Economics
            </p>

            {/* TABLE */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Module Name</th>
                    <th>
                      TMA (40 %)<br />
                      (No. of lessons 11)
                    </th>
                    <th>
                      Public Examination (60%)<br />
                      (No. of Lesson 18)
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1. Indian Economic Development</td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>2. Current Challenges before the Indian Economy</td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>3.Introduction to Statistics</td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>4.Statistical Tools</td>
                    <td></td>
                    <td>
                      Lesson 8. Measures of Central Tendency<br />
                      Lesson 9. Measures of Dispersion<br />
                      Lesson 10. Correlation Analysis<br />
                      Lesson 11. Index Numbers
                    </td>
                  </tr>

                  <tr>
                    <td>5.Introduction to Economics</td>
                    <td></td>
                    <td>
                      Lesson13 Central Problems of anEconomy
                    </td>
                  </tr>

                  <tr>
                    <td>6.Consumer’s Behaviour</td>
                    <td></td>
                    <td>
                      Lesson 15. Demand<br />
                      Lesson 16. Price Elasticity of Demand
                    </td>
                  </tr>

                  <tr>
                    <td>7.Producer’s Behaviour</td>
                    <td></td>
                    <td>
                      Lesson18. Cost of Production<br />
                      Lesson19. Supply<br />
                      Lesson20. Price Elasticity of Supply
                    </td>
                  </tr>

                  <tr>
                    <td>8.Market and Price Determination</td>
                    <td></td>
                    <td>
                      Lesson21. Forms of Market<br />
                      Lesson22. Price Determination Under Perfect Competition
                    </td>
                  </tr>

                  <tr>
                    <td>9. National Income Accounting</td>
                    <td></td>
                    <td>
                      Lesson24. National Income and related Aggregates<br />
                      Lesson25. National Income and its Measurement
                    </td>
                  </tr>

                  <tr>
                    <td>10. Theory of Income and Employment</td>
                    <td></td>
                    <td>
                      Lesson26. Consumption, Saving and Investment<br />
                      Lesson27. Theory of Income Determination
                    </td>
                  </tr>

                  <tr>
                    <td>11. Money, Banking and Government Budget</td>
                    <td></td>
                    <td>
                      Lesson28. Money and Banking<br />
                      Lesson29. Government and the Budget
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DOWNLOAD LINKS */}
            <div className="download-links">
              <a href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/318Bifurcation.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Economics (318) Syllabus Here.
              </a>

              <a href="/papers/12th/318-economics-sample-2024.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Economics (318) Sample Question Paper Here.
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
