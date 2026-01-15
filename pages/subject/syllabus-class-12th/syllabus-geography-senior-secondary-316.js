import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusGeographySeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Geography Senior Secondary NIOS</title>
        <meta
          name="description"
          content="Syllabus Geography Senior Secondary NIOS Geography (316)"
        />
        <meta
          name="keywords"
          content="NIOS Geography 316 syllabus, Geography Senior Secondary NIOS"
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
              Syllabus Geography Senior Secondary NIOS
            </h1>

            <h2 className="nios-125h-senior-hero-title">
              NIOS Syllabus For Senior Secondary
            </h2>

            <h2 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">Geography (316)</span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure Of Geography
            </p>

            {/* TABLE */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>
                      Module<br />(No. & name)
                    </th>
                    <th>
                      TMA (40%)<br />(No. of lessons 12)
                    </th>
                    <th>
                      Term End Examination (60%)<br />(No. of lessons 20)
                    </th>
                    <th>Marks</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1. The study of Geography as a discipline</td>
                    <td></td>
                    <td>L-1: Nature and subject matter of Geography</td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>2. Dynamic and Geomorphic Processes of the Earth</td>
                    <td></td>
                    <td>
                      L-3: Exogenic Forces and their resultant landforms
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>3. The domain of the water on the earth</td>
                    <td></td>
                    <td>
                      L-5 : Hydrological Cycle and Ocean
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>4. Dynamics of Atmosphere</td>
                    <td></td>
                    <td>
                      L-7 : Atmospheric pressure and winds<br />
                      L-9: Climate and Climate Change
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>5. Biogeography and Biodiversity</td>
                    <td></td>
                    <td>
                      L-10 : Biosphere, Biomes and Biodiversity
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>6. Physical Geography of India I</td>
                    <td></td>
                    <td>
                      L-11 : Physical Settings<br />
                      L-12 : Climate
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>7. Natural resources, Utilisation and Management</td>
                    <td></td>
                    <td>
                      L-15 : Forests and Biodiversity<br />
                      L-16 : Water Resources
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>8. Economic Geography of India</td>
                    <td></td>
                    <td>
                      L-17 : Agriculture and Food Security<br />
                      L-18 : Mineral and Energy Resources<br />
                      L-20 : Foreign Direct Investment (FDI), Transport,
                      Communication and Trade
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>9. Human resource development in India</td>
                    <td></td>
                    <td>
                      L-22 : Population Composition<br />
                      L-23 : Human Development
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>10. Contemporary Issues and Challenges</td>
                    <td></td>
                    <td>
                      L-24 : Sustainable Development Goals (SDGs)
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DOWNLOAD LINKS */}
            <div className="download-links">
              <a href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/316Bifurcation_new.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Geography (316) Syllabus Here.
              </a>

              <a href="/papers/12th/316-geography-sample-2024.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Geography (316) Sample Question Paper Here.
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
