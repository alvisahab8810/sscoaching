import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusPaintingSeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Of Painting In NIOS for Senior Secondary Education</title>
        <meta
          name="description"
          content="Painting 12th standard NIOS Board Lucknow by SS Coaching. here all the syllabus details of painting subjects in NIOS board for 12th class information about the NIOS board of 12th standard."
        />
        <meta
          name="keywords"
          content="Class 12 NIOS painting syllabus, Intermediate board painting previous papers, NIOS painting syllabus class 12, Painting question paper of painting, Painting syllabus for NIOS, Sample papers for class 12th painting, Painting practical for board exam, Painting institute in Lucknow, Painting online practice, Painting courses online, Painting question paper, NIOS class 12 painting question paper, Painting sample papers for class 12 NIOS. painting nios class 12, nios painting, NIOS Painting question paper 2022, 2023, NIOS Painting"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Syllabus Painting Senior Secondary NIOS
            </h1>

            <h2 className="nios-125h-senior-hero-title">
              NIOS Syllabus For Senior Secondary
            </h2>

            <h2 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">
                Painting (332)
              </span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure Of Painting
            </p>

            {/* FIRST TABLE */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Mode of Evaluation</th>
                    <th>Duration in hours</th>
                    <th>Marks</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <strong>
                        Module-I : Historical Appreciation of Painting and Sculpture
                      </strong>
                      <br /><br />
                      1. Prehistoric Painting of India<br />
                      2. Painting of Indus Valley Civilization<br />
                      3. Ajanta and Post Ajanta Painting
                    </td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>
                      <strong>
                        Module-II : Historical Appreciation of Indian Contemporary and Miniature Art
                      </strong>
                      <br /><br />
                      6. Mediaeval Period Painting<br />
                      8. Pahari Painting<br />
                      10. Company School of Painting<br />
                      11. Contemporary Art and Artist
                    </td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>
                      <strong>
                        Module-III : Method and Material used in Drawing and Painting
                      </strong>
                      <br /><br />
                      12. Fresco and Tempera in Indian Art<br />
                      14. Mural and Printing
                    </td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>
                      <strong>
                        Module-IV : Tribal and Folk Art in India
                      </strong>
                      <br /><br />
                      15. Folk and Tribal Art
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

           <div className="spacer-area">
             {/* BIFURCATION HEADING */}
            <div className="bifurcation-title">
              <strong>BIFURCATION OF SYLLABUS - NEW SYLLABUS</strong>
            </div>

            <div className="bifurcation-subtitle">
              <strong>SUBJECT: PAINTING COURSE</strong> &nbsp;&nbsp;
              <strong>LEVEL: SENIOR SECONDARY</strong> &nbsp;&nbsp;
              <strong>CODE:- 332 (NEW)</strong>
            </div>

            {/* SECOND TABLE */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Module (no. and Name)</th>
                    <th>TMA (40%)<br />(No. of lessons 5)</th>
                    <th>Public Examination (60%)<br />(No. of lessons 10)</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1. Historical Appreciation of Painting and Sculpture</td>
                    <td></td>
                    <td>
                      1. Prehistoric Painting of India<br />
                      2. Painting of Indus Valley Civilization<br />
                      3. Ajanta and Post Ajanta Painting
                    </td>
                  </tr>

                  <tr>
                    <td>2. Historical Appreciation of Indian Contemporary and Miniature Art</td>
                    <td></td>
                    <td>
                      6. Mediaeval Period Painting<br />
                      8. Pahari Painting<br />
                      10. Company School of Painting<br />
                      11. Contemporary Art and Artist
                    </td>
                  </tr>

                  <tr>
                    <td>3. Method and Material used in Drawing and Painting</td>
                    <td></td>
                    <td>
                      12. Fresco and Tempera in Indian Art<br />
                      14. Mural and Printing
                    </td>
                  </tr>

                  <tr>
                    <td>4. Tribal and Folk Art in India</td>
                    <td></td>
                    <td>
                      15. Folk and Tribal Art
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
           </div>

            {/* DOWNLOAD LINKS */}
            <div className="download-links">
              <a href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/332Bifurcation_new.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Painting (332) Syllabus Here.
              </a>

              <a href="/papers/12th/332-painting-sample-2024.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Painting (332) Sample Question Paper Here.
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
