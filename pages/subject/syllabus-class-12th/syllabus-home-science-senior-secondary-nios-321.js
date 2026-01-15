import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusHomeScienceSeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Home Science Senior Secondary NIOS</title>
        <meta
          name="description"
          content="NIOS Syllabus For Senior Secondary Home Science (321)"
        />
        <meta
          name="keywords"
          content="NIOS Home Science 321 syllabus, Home Science Senior Secondary NIOS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Syllabus Home Science Senior Secondary NIOS
            </h1>

            <h2 className="nios-125h-senior-hero-title">
              NIOS Syllabus For Senior Secondary
            </h2>

            <h2 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">
                Home Science (321)
              </span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure Of Home Science
            </p>

            {/* COURSE STRUCTURE TABLE */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Module Name</th>
                    <th>TMA (40 %)</th>
                    <th>Public Examination (60%)</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1. The Art and Science of Managing A Home</td>
                    <td></td>
                    <td>L2 Ethics in Daily Living</td>
                  </tr>

                  <tr>
                    <td>2. Food and Nutrition</td>
                    <td></td>
                    <td>
                      L5 Meal Planning<br />
                      L6 Nutritional Status<br />
                      L9 Food preservation
                    </td>
                  </tr>

                  <tr>
                    <td>3. Resource Management</td>
                    <td></td>
                    <td>
                      L12 Space Management<br />
                      L13 Income Management<br />
                      L14 Energy Conservation<br />
                      L15 Environment Management<br />
                      L16 Household Equipment<br />
                      L17 Consumer Education
                    </td>
                  </tr>

                  <tr>
                    <td>4. Human Development</td>
                    <td></td>
                    <td>
                      L19 Growth and Development (6-11)<br />
                      L20 Adolescence<br />
                      L21 Concerns and Issues in Human Development
                    </td>
                  </tr>

                  <tr>
                    <td>5. Textile and Clothing</td>
                    <td></td>
                    <td>
                      L24 Fabric Construction<br />
                      L26 Selection of Textile and Clothing<br />
                      L27 Care and Maintenance
                    </td>
                  </tr>

                  <tr>
                    <td>6A. Housekeeping</td>
                    <td></td>
                    <td>
                      L29 Cleaning and Cleaning Materials<br />
                      L30 Maintenance of Premises<br />
                      L31 Aesthetics at Home
                    </td>
                  </tr>

                  <tr>
                    <td>OR</td>
                    <td></td>
                    <td>OR</td>
                  </tr>

                  <tr>
                    <td>6B.Creative Hand Embroidery</td>
                    <td></td>
                    <td>
                      L29 The Design<br />
                      L30 Colour<br />
                      L31 Embroidery Stitches
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

           <div className="spacer-area">
                   {/* MODULE DETAILS */}
            <h3>Module-I: The Art and Science of Managing A Home</h3>
            <p>Lesson-2 Ethics in Daily Living</p>

            <h3>Module-II: Food and Nutrition</h3>
            <p>Lesson-5 Meal Planning</p>
            <p>Lesson-6 Nutritional Status</p>
            <p>Lesson-9 Food preservation</p>

            <h3>Module-III: Resource Management</h3>
            <p>Lesson-12 Space Management</p>
            <p>Lesson-13 Income Management</p>
            <p>Lesson-14 Energy Conservation</p>
            <p>Lesson-15 Environment Management</p>
            <p>Lesson-16 Household Equipment</p>
            <p>Lesson-17 Consumer Education</p>

            <h3>Module-IV: Human Development</h3>
            <p>Lesson-19 Growth and Development (6-11)</p>
            <p>Lesson-20 Adolescence</p>
            <p>Lesson-21 Concerns and Issues in Human Development</p>

            <h3>Module-V: Textile and Clothing L</h3>
            <p>Lesson-24 Fabric Construction</p>
            <p>Lesson-26 Selection of Textile and Clothing</p>
            <p>Lesson-27 Care and Maintenance</p>
           </div>

            <h3>Module-VI : (Optional Module)</h3>

            <div className="table-wrapper">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>6A. Housekeeping</strong><br />
                      L29 Cleaning and Cleaning Materials<br />
                      L30 Maintenance of Premises<br />
                      L31 Aesthetics at Home
                    </td>
                    <td>Or</td>
                    <td>
                      <strong>6B. Creative Hand Embroidery</strong><br />
                      L29 The Design<br />
                      L30 Colour<br />
                      L31 Embroidery Stitches
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DOWNLOAD LINKS */}
            <div className="download-links">
              <a href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/321Bifurcation.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Home Science (321) Syllabus Here.
              </a>

              <a href="/papers/12th/321-home-science-sample-2024.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Home Science (321) Sample Question Paper Here.
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
