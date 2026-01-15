import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusPsychologySeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Psychology Senior Secondary NIOS</title>
        <meta
          name="description"
          content="NIOS Syllabus For Senior Secondary Psychology (328)"
        />
        <meta
          name="keywords"
          content="NIOS Psychology 328 syllabus, Psychology Senior Secondary NIOS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Syllabus Psychology Senior Secondary NIOS
            </h1>

            <h2 className="nios-125h-senior-hero-title">
              NIOS Syllabus For Senior Secondary
            </h2>

            <h2 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">
                Psychology (328)
              </span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure Of Psychology
            </p>

            {/* COURSE STRUCTURE TABLE */}
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
                    <td>1. Foundations of Psychology (5 lessons)</td>
                    <td></td>
                    <td>
                      L-1: Understanding Psychology<br />
                      L-3: Methods of Psychological Enquiry-I<br />
                      L-5: Basic Statistics
                    </td>
                  </tr>

                  <tr>
                    <td>2. Basic Psychological Processes (6 Lessons)</td>
                    <td></td>
                    <td>
                      L-6: Attention and perceptual processes<br />
                      L-8: Human Memory<br />
                      L-10: Emotions<br />
                      L-11: Thinking and Problem Solving
                    </td>
                  </tr>

                  <tr>
                    <td>3. Human Development (4 lessons)</td>
                    <td></td>
                    <td>
                      L-13: Infancy and Childhood<br />
                      L-14: Adolescence and Young Adulthood
                    </td>
                  </tr>

                  <tr>
                    <td>4. Individual Differences (3 Lessons)</td>
                    <td></td>
                    <td>
                      L-17:Self and personality<br />
                      L-18: Intelligence
                    </td>
                  </tr>

                  <tr>
                    <td>5. Social Processes and Behaviour (3 lessons)</td>
                    <td></td>
                    <td>
                      L-19: Group Processes<br />
                      L-20: Attitude
                    </td>
                  </tr>

                  <tr>
                    <td>6. Health and Well-Being (3 Lessons)</td>
                    <td></td>
                    <td>
                      L-23: Mental Health Problems
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DOWNLOAD LINKS */}
            <div className="download-links">
              <a href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/328Bifurcation_new.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Psychology (328) Syllabus Here.
              </a>

              <a href="/papers/12th/328-psychology-sample-2024.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Psychology (328) Sample Question Paper Here.
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
