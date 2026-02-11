import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusHistorySeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Of History (315) In NIOS for Senior Secondary Education | SS Coaching Lucknow</title>
        <meta
          name="description"
          content="Syllabus Of History (315) In NIOS for Senior Secondary Education.SS Coaching prepare your history subject as the course of NIOS board and get the Ideas for the preparation of all subjects in NIOS board."
        />
        <meta
          name="keywords"
          content="History online learning senior secondary history syllabus, NIOS study material for history, History courses online, History study material for board exam, Board history previous papers, NIOS sample papers for class 12th history, Class 12th NIOS history syllabus, NIOS history syllabus class 12, Question paper of history, History syllabus for NIOS exam, History courses, Courses in history, NIOS class 12 history question paper, Sample papers for class 12 history, History class 12th solved question papers, NIOS 12 class history syllabus, History class 12th NIOS syllabus, History question paper, Class 12 history syllabus, History sample papers for class 12 NIOS, Online history degree programs in Lucknow, History syllabus for NIOS, NIOS History sample paper 2022, 2023, NIOS History sample paper 2024"
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
              Syllabus History Senior Secondary NIOS
            </h1>

            <h2 className="nios-125h-senior-hero-title">
              NIOS Syllabus For Senior Secondary
            </h2>

            <h2 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">History (315)</span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure Of History
            </p>

            {/* TABLE */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Module<br />(No. & name)</th>
                    <th>
                      TMA (40%)<br />
                      (No. of lessons 12)
                    </th>
                    <th>
                      Term End Examination (60%)<br />
                      (No. of lessons 20)
                    </th>
                    <th>Marks</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td><strong>1. Ancient India</strong></td>
                    <td></td>
                    <td>
                      L-6. Post Mauryan Developments<br />
                      L-7 The Guptas and Their Successors (A.D.300–750)<br />
                      L-3. The Harappan Civilization<br />
                      L-4. The Vedic Age (1500 BC–600BC)
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td><strong>2. Medieval India</strong></td>
                    <td></td>
                    <td>
                      L-9. Establishment and Expansion of the Delhi Sultanate<br />
                      L-10. Establishment of the Mughal Rule<br />
                      L-12. Administrative System and Institutions<br />
                      L-14. Cultural Developments in Medieval India
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td><strong>3. Modern India</strong></td>
                    <td></td>
                    <td>
                      L-16. Establishment of British rule in India till 1857<br />
                      L-18. Social changes<br />
                      L-19. Popular resistance to company rule
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td>
                      <strong>4. Indian National Movement and Contemporary India</strong>
                    </td>
                    <td></td>
                    <td>
                      L-20. Nationalism<br />
                      L-21. National Movement & Indian Democracy
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td><strong>5. 20th Century World</strong></td>
                    <td></td>
                    <td>
                      L-23. World War I and the Russian Revolution.<br />
                      L-24. The Inter War Period and the Second World War<br />
                      L-25. Cold war and its effects<br />
                      L-28. Changes in the Twentieth Century
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td><strong>6A. Evolution of States in India</strong></td>
                    <td></td>
                    <td>
                      L-30 A. Early States<br />
                      L-31A. Medieval States<br />
                      L-32A. Colonial State
                    </td>
                    <td></td>
                  </tr>

                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", fontWeight: "bold" }}>
                      OR
                    </td>
                  </tr>

                  <tr>
                    <td><strong>6B. Culture in India</strong></td>
                    <td></td>
                    <td>
                      L-29 B. Contemporary Cultural Situation<br />
                      L-30B. Cultural Production<br />
                      L-31 B. Cultural Communication
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DOWNLOAD LINKS */}
            <div className="download-links">
              <a href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/315Bifurcation.pdf" target="_blank">
                Download The Official NIOS Senior Secondary History (315) Syllabus Here.
              </a>

              <a href="/papers/12th/315-history-sample-2024.pdf" target="_blank">
                Download The Official NIOS Senior Secondary History (315) Sample Question Paper Here.
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
