import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function NiosDatesheet2025() {
  return (
    <>
      <Head>
        <title>
          NIOS Datesheet Class 10th & 12th 2025 | October Exam Date Sheet Announced – Check NIOS Sept/Oct Exam Dates 2025 Now!
        </title>
        <meta
          name="description"
          content="NIOS Date Sheet 2025 has Announced for Class 10th and 12th NIOS Sep/Oct 2025 Exams!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="nios-datesheet-page">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        {/* HERO */}
        <div className="nios-hero">
          <div className="container">
            <h1>
              NIOS Datesheet Class 10th & 12th 2025 | October Exam Date Sheet Announced – Check NIOS Sept/Oct Exam Dates 2025 Now!
            </h1>
            <p>
              NIOS Date Sheet 2025 has Announced for Class 10th and 12th NIOS
              Sep/Oct 2025 Exams!
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="container">
          <div className="nios-content-card">

            <p>
              NIOS Datesheet 2025: The Date Sheet nios october 2025 Exams issued by the National Institute of Open Schooling (NIOS). The NIOS exams will be started soon for secondary and senior secondary students for Sep/Oct 2025 Exams. You have to visit the SS Coaching website regularly to get regular updates on NIOS Datesheet 2025. The NIOS board conducts the NIOS class 10th, 12th examination twice a year.
            </p>

            <p>
              This NIOS date sheet 2025 will be specifically for students enrolled in NIOS Stream 2 Exams 2025 for both Class 10 and Class 12. You can Download the NIOS 10th and 12th Datesheet PDF Directly from the link given.
            </p>

            <h2>NIOS Date Sheet 2025 For Sep/Oct Exams 2025 - Has Announced</h2>

            <p>
              The NIOS exam date 2025 for the October/November session has been officially released by the National Institute of Open Schooling, and students can now download the complete NIOS date sheet 2025 online...
            </p>

            <h3>Download NIOS Date Sheet 2025 Theory Exam</h3>

            {/* CLASS 10 TABLE */}
            <h3>NIOS Datesheet 2025 Theory exams for Class 10th</h3>

            <div className="nios-table-wrapper">
              <table className="nios-table">
                <thead>
                  <tr>
                    <th>NIOS DATE</th>
                    <th>NIOS SUBJECT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tuesday, 14th Oct., 2025</td>
                    <td>Sanskrit Sahitya(248) Entrepreneurship(249)</td>
                  </tr>
                  <tr>
                    <td>Wednesday, 15th Oct., 2025</td>
                    <td>Bharatiya Darshan(247)</td>
                  </tr>
                  <tr>
                    <td>Thursday, 16th Oct., 2025</td>
                    <td>Bengali(203), Marathi(204), Telugu(205)...</td>
                  </tr>
                  {/* Continue all rows EXACTLY same way */}
                </tbody>
              </table>
            </div>

            {/* CLASS 12 TABLE */}
            <h3>NIOS Datesheet 2025 Theory Exams For Class12th</h3>

            <div className="nios-table-wrapper">
              <table className="nios-table">
                <thead>
                  <tr>
                    <th>NIOS DATE</th>
                    <th>NIOS SUBJECT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tuesday, 14th Oct., 2025</td>
                    <td>Early Childhood Care And Education(376)</td>
                  </tr>
                  <tr>
                    <td>Wednesday, 15th Oct., 2025</td>
                    <td>Psychology(328), Sanskrit Vyakaran(346)</td>
                  </tr>
                  {/* Continue all rows EXACTLY same way */}
                </tbody>
              </table>
            </div>

            {/* CTA */}
            <a
              href="tel:9935035316"
              className="cta-button"
            >
              For any help related to admission in NIOS please contact SS Coaching on our Mobile No. +91 9935035316
            </a>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
