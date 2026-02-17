import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusDataEntrySeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Of Data Entry Operations (336) In NIOS for Senior Secondary Education</title>
        <meta
          name="description"
          content="Data Entry Operations Course 12th class NIOS Board Lucknow by SS Coaching. Get complete syllabus and course structure details of Data Entry Operations (336) for Senior Secondary NIOS."
        />
        <meta
          name="keywords"
          content="Data Entry Operations syllabus, NIOS 336 syllabus, NIOS Data Entry Operations class 12, Data Entry course NIOS, NIOS 12th Data Entry syllabus, Data Entry Operations sample paper NIOS, Senior Secondary Data Entry course structure"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Syllabus Data Entry Senior Secondary NIOS
            </h1>

            <h2 className="nios-125h-senior-hero-title">
              NIOS Syllabus For Senior Secondary
            </h2>

            <h2 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">
                Data Entry Operations (336)
              </span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure Of Data Entry Operations
            </p>

            {/* TABLE */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Module Name</th>
                    <th>TMA (40%)</th>
                    <th>Public Examination (60%)</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1. Basics of Computer</td>
                    <td></td>
                    <td>Public Examination</td>
                  </tr>

                  <tr>
                    <td>2. Operating System</td>
                    <td>TMA</td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>3. Basics of Word Processing</td>
                    <td>TMA</td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>4. Formatting of Documents</td>
                    <td></td>
                    <td>Public Examination</td>
                  </tr>

                  <tr>
                    <td>5. Mail Merge</td>
                    <td></td>
                    <td>Public Examination</td>
                  </tr>

                  <tr>
                    <td>6. Basics of Spreadsheets</td>
                    <td>TMA</td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>7. Formatting of Spreadsheets</td>
                    <td>TMA</td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>8. Formulas, Functions and Chart</td>
                    <td></td>
                    <td>Public Examination</td>
                  </tr>

                  <tr>
                    <td>9. Creating Presentation</td>
                    <td></td>
                    <td>Public Examination</td>
                  </tr>

                  <tr>
                    <td>10. Internet</td>
                    <td></td>
                    <td>Public Examination</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DOWNLOAD LINKS */}
            <div className="download-links">
              <a
                href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/336Bifurcation.pdf"
                target="_blank"
              >
                Download The Official NIOS Senior Secondary Data Entry Operations (336) Syllabus Here.
              </a>

              <a
                href="/papers/12th/336-data-entry-sample-2024.pdf"
                target="_blank"
              >
                Download The Official NIOS Senior Secondary Data Entry Operations (336) Sample Question Paper Here.
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
