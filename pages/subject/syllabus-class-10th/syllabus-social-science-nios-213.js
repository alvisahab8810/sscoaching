import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusSocialScienceNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Of Social Science (213) In NIOS for Secondary Education</title>
        <meta
          name="description"
          content="You can get the Syllabus Of Social Science (213) In NIOS for Secondary Education. Get all the details of the social science course in NIOS board like Evolution of Human Society Environment, Resources and Development People, Society and Culture India’s Struggle for Freedom Citizen, State and the Constitution."
        />
        <meta
          name="keywords"
          content="Social science online, Social science course in NIOS syllabus course, Social study courses, Study social science, Applied social science, Social studies curriculum, Social science course, Social science secondary education, Courses in social science, What are science courses, Social science theories related to education, Comparative study in social science, science course online, Online course structure, Social studies course, Education social studies NIOS, Social Science Syllabus, nios fees structure, syllabus nios, nios syllabus for 10th, nios online study material, nios class 10 social science notes, NIOS syllabus Social Science, NIOS social science sample paper 2024, NIOS sample paper 2024, NIOS question paper social science 2022,2023 and sample paper 2024,"
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

            {/* Page Heading */}
            <h1 className="nios-125h-senior-hero-title">
              Syllabus of Social Science in NIOS
            </h1>

            <h2>
              <span className="nios-125h-senior-highlight">
                Social Science (213) Syllabus
              </span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure of Social Science
            </p>

            {/* Course Structure Table */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>TMA (40% of Syllabus)</th>
                    <th>Term End Examination (60% of Syllabus)</th>
                    <th>Marks</th>
                    <th>Study Hours</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Module-1</strong><br />
                      India and World through Ages
                    </td>
                    <td>-</td>
                    <td>
                      L-3 : Modern World – I<br />
                      L-4 : Modern World – II<br />
                      L-5 : Impact of British Rule on India: Economic Social and Cultural (1757–1857)<br />
                      L-6 : Religious and Social Awakening in Colonial India<br />
                      L-7 : Popular Resistance to the British Rule<br />
                      L-8 : Indian National Movement
                    </td>
                    <td>-</td>
                    <td>-</td>
                  </tr>

                  <tr>
                    <td>
                      <strong>Module-2</strong><br />
                      India: Natural Environment, Resources and Development
                    </td>
                    <td>-</td>
                    <td>
                      L-9 : Physiography of India<br />
                      L-10 : Climate<br />
                      L-13 : Transport and Communication
                    </td>
                    <td>-</td>
                    <td>-</td>
                  </tr>

                  <tr>
                    <td>
                      <strong>Module-3</strong><br />
                      Democracy at Work
                    </td>
                    <td>-</td>
                    <td>
                      L-16 : Fundamental Rights and Fundamental Duties<br />
                      L-19 : Governance at the State Level<br />
                      L-20 : Governance at the Union Level<br />
                      L-21 : Political Parties and Pressure Groups
                    </td>
                    <td>-</td>
                    <td>-</td>
                  </tr>

                  <tr>
                    <td>
                      <strong>Module-4</strong><br />
                      Contemporary India: Issues and Goals
                    </td>
                    <td>-</td>
                    <td>
                      L-23 : Challenges to Indian Democracy<br />
                      L-25 : Socio-Economic Development and Empowerment of Disadvantaged Groups<br />
                      L-27 : Peace and Security
                    </td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Download Links */}
            <div className="download-links">
              <a
                href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/10th/213.pdf"
                target="_blank"
              >
                Download The Official NIOS Social Science (213) Syllabus Here
              </a>
              <a
                href="/papers/213-social-science-sample-2024.pdf"
                target="_blank"
              >
                Download The Official NIOS Social Science (213) Sample Question Paper Here
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
