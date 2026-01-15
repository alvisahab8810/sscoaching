import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusPhysicsSeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Physics Senior Secondary NIOS</title>
        <meta
          name="description"
          content="Syllabus Physics Senior Secondary NIOS Physics (312)"
        />
        <meta
          name="keywords"
          content="NIOS Physics 312 syllabus, Physics Senior Secondary NIOS"
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
              Syllabus Physics Senior Secondary NIOS
            </h1>

            <h2 className="nios-125h-senior-hero-title">
              NIOS Syllabus For Senior Secondary
            </h2>

            <h2 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">Physics (312)</span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure Of Physics
            </p>

            {/* TABLE */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Module<br />(No. and Name)</th>
                    <th>
                      TMA (40%)<br />
                      (No. of Lessons 12)
                    </th>
                    <th>
                      Public Examination (60%) No. of Lessons (18)
                    </th>
                    <th>Marks</th>
                    <th>Study Hours</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td><strong>1. Force and Energy</strong></td>
                    <td></td>
                    <td>
                      L-3 (Laws of Motion)<br />
                      L-6 (Work, Energy and Power)
                    </td>
                    <td></td>
                    <td>45h</td>
                  </tr>

                  <tr>
                    <td><strong>2. Mechanics of Solids and Fluids</strong></td>
                    <td></td>
                    <td>
                      L-9 (Properties of Fluids)
                    </td>
                    <td></td>
                    <td>25h</td>
                  </tr>

                  <tr>
                    <td><strong>3. Thermal Physics</strong></td>
                    <td></td>
                    <td>
                      L-11 (Thermodynamics)
                    </td>
                    <td></td>
                    <td>20h</td>
                  </tr>

                  <tr>
                    <td><strong>4. Oscillations and Waves</strong></td>
                    <td></td>
                    <td>
                      L-14 (Wave Phenomena)
                    </td>
                    <td></td>
                    <td>20h</td>
                  </tr>

                  <tr>
                    <td><strong>5. Electricity and Magnetism</strong></td>
                    <td></td>
                    <td>
                      L-15 (Electric Charge and Electric Field)<br />
                      L-16 (Electric Potential and Capacitors)<br />
                      L-17 (Electric Current)<br />
                      L-18 (Magnetism and Magnetic Effect of Electric Current)<br />
                      L-19 (Electromagnetic Induction and Alternating Current)
                    </td>
                    <td></td>
                    <td>45h</td>
                  </tr>

                  <tr>
                    <td><strong>6. Optics and Optical Instruments</strong></td>
                    <td></td>
                    <td>
                      L-21 (Dispersion and Scattering of Light)<br />
                      L-22 (Wave Phenomena and Light)
                    </td>
                    <td></td>
                    <td>25h</td>
                  </tr>

                  <tr>
                    <td><strong>7. Atoms and Nuclei</strong></td>
                    <td></td>
                    <td>
                      L-24 (Structure of Atoms)<br />
                      L-25 (Dual Nature of Radiation and Matter)<br />
                      L-26 (Nuclei and Radioactivity)<br />
                      L-27 (Nuclear Fission and Fusion)
                    </td>
                    <td></td>
                    <td>25h</td>
                  </tr>

                  <tr>
                    <td><strong>8. Semiconductor Devices and Communication</strong></td>
                    <td></td>
                    <td>
                      L-28 (Semiconductors and Semiconducting Devices)<br />
                      L-29 (Applications of Semiconductor Devices)
                    </td>
                    <td></td>
                    <td>20h</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DOWNLOAD LINKS */}
            <div className="download-links">
              <a
                href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/312Bifurcation.pdf"
                target="_blank"
              >
                Download The Official NIOS Senior Secondary Physics (312) Syllabus Here.
              </a>

              <a
                href="/papers/12th/312-physics-sample-2024.pdf"
                target="_blank"
              >
                Download The Official NIOS Senior Secondary Physics (312) Sample Question Paper Here.
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
