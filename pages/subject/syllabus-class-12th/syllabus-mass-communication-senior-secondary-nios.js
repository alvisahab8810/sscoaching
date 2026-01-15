import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusMassCommunicationSeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Mass Communication Senior Secondary NIOS</title>
        <meta
          name="description"
          content="NIOS Syllabus For Senior Secondary Mass Communication (335)"
        />
        <meta
          name="keywords"
          content="NIOS Mass Communication 335 syllabus, Mass Communication Senior Secondary NIOS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Syllabus Mass Communication Senior Secondary NIOS
            </h1>

            <h2 className="nios-125h-senior-hero-title">
              NIOS Syllabus For Senior Secondary
            </h2>

            <h2 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">
                Mass Communication (335)
              </span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure Of Mass Communication
            </p>

            {/* TABLE */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>MODULE</th>
                    <th>TMA (40%)<br />(No. of Lessons- 10 )</th>
                    <th>Public Examination (60%)<br />(No. of Lessons- 18)</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td><strong>1. Introduction to Mass Communication</strong></td>
                    <td>L1 Introduction to communication</td>
                    <td>
                      L2 Mass Communication<br />
                      L3 Role and impact of Mass Media<br />
                      L4 Development communication
                    </td>
                  </tr>

                  <tr>
                    <td><strong>2. Print Media</strong></td>
                    <td>L5 Introduction to Print Media</td>
                    <td>
                      L6 What is News?<br />
                      L7 Reporting and editing<br />
                      L8 Language Press in India
                    </td>
                  </tr>

                  <tr>
                    <td><strong>3. Radio</strong></td>
                    <td>L12 Radio Programme production</td>
                    <td>
                      L9 Characteristics of Radio<br />
                      L10 The Radio Station<br />
                      L11 Formats of radio Programmes
                    </td>
                  </tr>

                  <tr>
                    <td><strong>4. Television</strong></td>
                    <td>L 14 Role of television as a mass Medium</td>
                    <td>
                      L 13 Television in India<br />
                      L15 Television channels<br />
                      L16 Television programme production
                    </td>
                  </tr>

                  <tr>
                    <td><strong>5. Advertising and Public Relations</strong></td>
                    <td>
                      L 17 Advertising- an introduction<br />
                      L20 Public relations -tools
                    </td>
                    <td>
                      L18 Advertising – an Industry<br />
                      L 19 Public relations – an introduction
                    </td>
                  </tr>

                  <tr>
                    <td><strong>6. New Media</strong></td>
                    <td>
                      L 21 Characteristics of new media<br />
                      L 24 New Media: employment opportunities
                    </td>
                    <td>
                      L22 New media: the industry<br />
                      L23 New media: Target audience
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", fontWeight: "bold" }}>
                      OPTIONAL MODULE
                    </td>
                  </tr>

                  <tr>
                    <td><strong>7A. Traditional Media</strong></td>
                    <td>
                      L 25A Introduction to traditional media<br />
                      L26A Types of traditional media
                    </td>
                    <td>
                      L 27A Comparison of traditional media with electronic media.<br />
                      L28A Communication through Traditional Medium
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", fontWeight: "bold" }}>
                      OR
                    </td>
                  </tr>

                  <tr>
                    <td><strong>7B. Photojournalism</strong></td>
                    <td>
                      L 25B Introduction to photography<br />
                      L26B The Camera
                    </td>
                    <td>
                      L27B Photojournalism<br />
                      L28B Role of Photojournalism
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DOWNLOAD LINKS */}
            <div className="download-links">
              <a href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/335Bifurcation.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Mass Communication (335) Syllabus Here.
              </a>

              <a href="/papers/12th/335-mass-comm-sample-2024.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Mass Communication (335) Sample Question Paper Here.
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
