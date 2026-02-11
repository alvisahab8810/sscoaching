import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusComputerScienceSeniorSecondaryNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Of Computer Science In NIOS for Senior Secondary Education</title>
        <meta
          name="description"
          content="Syllabus of Computer science of 12th standard of NIOS board provide by SS coaching and syllabus of computer science of NIOS board here available for useful information of NIOS board."
        />
        <meta
          name="keywords"
          content="Class 12 NIOS computer science syllabus, Computer science study material for board exam, Computer science class 12th solved question papers, Computer science class 12th notes, NIOS study material for computer science, Computer science syllabus for NIOS exam, Computer science online learning computer science courses online, Senior secondary computer science syllabus, Computer science class 12th NIOS syllabus, Computer science sample papers for class 12 NIOS, Question paper of computer science, Computer science courses, Courses in computer science, NIOS sample papers for class 12th economics, NIOS computer science syllabus, NIOS 12 class computer science syllabus, Computer science question paper, Board computer science previous papers, NIOS computer science syllabus class 12, NIOS class 12 computer science question paper, Computer science syllabus for NIOS, Computer science coaching in Lucknow, sample papers for class 12th computer science, NIOS Computer Science question paper 2022, 2023, NIOS Computer Science sample paper 2024"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
               <BranchContactCanvas/>
        

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Syllabus Computer Science Senior Secondary NIOS
            </h1>

            <h2 className="nios-125h-senior-hero-title">
              NIOS Syllabus For Senior Secondary
            </h2>

            <h2 className="nios-125h-senior-hero-title">
              <span className="nios-125h-senior-highlight">
                Computer Science (330)
              </span>
            </h2>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure Of Computer Science
            </p>

            {/* COURSE STRUCTURE TABLE */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Modules</th>
                    <th>TMA (40%)</th>
                    <th>Public Examination (60%)</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1. Basic Computing</td>
                    <td></td>
                    <td>
                      L 2- Binary Logic<br />
                      L 4- Operating System<br />
                      L 5- Data Communication and Networking<br />
                      L 6- Communications on Internet
                    </td>
                  </tr>

                  <tr>
                    <td>2. Office Automation</td>
                    <td></td>
                    <td>
                      L 8- Digital Documentation<br />
                      L 9 – Spreadsheets<br />
                      L 10- Digital Presentation
                    </td>
                  </tr>

                  <tr>
                    <td>3. Programming in C++</td>
                    <td></td>
                    <td>
                      L 14- Control Statements<br />
                      L 15- Functions<br />
                      L 16- Array<br />
                      L 17- Structure, Typedef &amp; Enumerated Data Type<br />
                      L 18- Classes &amp; Objects with Constructors/Destructors<br />
                      L 19- Inheritance – Extending Classes<br />
                      L 20- Pointer<br />
                      L 21- Files
                    </td>
                  </tr>

                  <tr>
                    <td>4. Database Concepts, Web Designing</td>
                    <td></td>
                    <td>
                      L 23- Database Management System<br />
                      L 24- Web Designing using HTML<br />
                      L 25- Inserting images &amp; Lists in a Web page
                    </td>
                  </tr>

                  <tr>
                    <td>5. Professional Skills</td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

           <div className="spacer-area">
             {/* LESSON LIST */}
            <h2 className="nios-125h-senior-hero-title">
              Syllabus Computer Science Senior Secondary NIOS
            </h2>

            <ul className="lesson-list">
              <li>Lesson 1: Anatomy of a Digital Computer</li>
              <li>Lesson 2: Data Processing Concept</li>
              <li>Lesson 3: Computer Software</li>
              <li>Lesson 4: Operating System</li>
              <li>Lesson 5: Data Communication and Networking</li>
              <li>Lesson 6: Fundamentals of Internet and Java Programming</li>
              <li>Lesson 7: Introduction to C++</li>
              <li>Lesson 8: General Concept of OOP</li>
              <li>Lesson 9: Control Statements</li>
              <li>Lesson 10: Functions</li>
              <li>Lesson 11: Array</li>
              <li>Lesson 12: Structure, Typedef &amp; Enumerated Data Type</li>
              <li>Lesson 13: Classes &amp; Objects with Constructors/Destructors</li>
              <li>Lesson 14: Inheritance Extending Classes</li>
              <li>Lesson 15: Pointer</li>
              <li>Lesson 16: Files</li>
            </ul>
           </div>

            {/* DOWNLOAD LINKS */}
            <div className="download-links">
              <a href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/12th/330Bifurcation.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Computer Science (330) Syllabus Here.
              </a>

              <a href="/papers/12th/330-computer-science-sample-2024.pdf" target="_blank">
                Download The Official NIOS Senior Secondary Computer Science (330) Sample Question Paper Here.
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
