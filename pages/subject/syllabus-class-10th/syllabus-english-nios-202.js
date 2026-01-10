import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusEnglishNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus of English (202) | NIOS</title>
        <meta
          name="description"
          content="NIOS English (202) Syllabus – Course Structure, Chapters, Marks Distribution, and Study Hours."
        />
        <meta
          name="keywords"
          content="NIOS English 202 syllabus, NIOS English course structure, NIOS English chapters"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />

            <div className="syllabus-nios">
                <div className="container">
                <h1 className="nios-125h-senior-hero-title">Syllabus of English in NIOS</h1>
                <h2>
                     <span className="nios-125h-senior-highlight">English (202) Syllabus</span>
                </h2>
               

                <p className="nios-125h-senior-hero-subtitle">Course Structure of English</p>

                {/* Course Structure Table */}
                <div className="table-wrapper">
                    <table>
                    <thead>
                        <tr>
                        <th>Module</th>
                        <th>Title</th>
                        <th>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Reading</td>
                        <td>-</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Writing</td>
                        <td>-</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Elements of Language</td>
                        <td>-</td>
                        </tr>
                    </tbody>
                    </table>
                    <p className="table-note">
                    <strong>Total:</strong> 150 + 50 + 40 = 240 hrs
                    </p>
                </div>

                <div className="spacer-area">
                      {/* Detailed Marks Table */}
                <h3 className="nios-125h-senior-hero-title">Prescribed Texts <span className="nios-125h-senior-highlight">(Prose + Poetry)</span></h3>

                <div className="table-wrapper">
                    <table>
                    <thead>
                        <tr>
                        <th>Module</th>
                        <th>TMA (40%)<br />(No. of Lessons 11)</th>
                        <th>Public Examination (60%)<br />(No. of Lessons 16)</th>
                        <th>Marks</th>
                        <th>Study Hour</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Prescribed Texts</td>
                        <td>-</td>
                        <td className="lesson-list">
                            Chapter-1 : Snake Bite<br />
                            Chapter-3 : Kondiba - A Hero<br />
                            Chapter-5 : A Tiger Comes To Town (I)<br />
                            Chapter-8 : A Birthday Letter<br />
                            Chapter-6 : A Tiger Comes To Town (II)<br />
                            Chapter-9 : Nine Gold Medals<br />
                            Chapter-12 : Indian Weavers<br />
                            Chapter-13 : The Last Stone Mason<br />
                            Chapter-14 : Stealing And Atonement<br />
                            Chapter-16 : My Only Cry<br />
                            Chapter-19 : A Prayer For Healing<br />
                            Chapter-22 : The Truth<br />
                            Chapter-23 : The Return Of The Lion<br />
                            Chapter-24 : Co-Operate And Prosper<br />
                            Chapter-26 : Ustad Bismillah Khan<br />
                            Chapter-27 : The Parrot Who Wouldn't Talk
                        </td>
                        <td>-</td>
                        <td>-</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>

                {/* Chapter List */}
               <div className="spacer-area">
                 <h3 className="nios-125h-senior-hero-title"><span className="nios-125h-senior-highlight">English</span> (202) Course</h3>
                <ul className="chapter-list">
                    <li>Chapter-1 : Snake Bite</li>
                    <li>Chapter-3 : Kondiba - A Hero</li>
                    <li>Chapter-5 : A Tiger Comes To Town (I)</li>
                    <li>Chapter-8 : A Birthday Letter</li>
                    <li>Chapter-6 : A Tiger Comes To Town (II)</li>
                    <li>Chapter-9 : Nine Gold Medals</li>
                    <li>Chapter-12 : Indian Weavers</li>
                    <li>Chapter-13 : The Last Stone Mason</li>
                    <li>Chapter-14 : Stealing And Atonement</li>
                    <li>Chapter-16 : My Only Cry</li>
                    <li>Chapter-19 : A Prayer For Healing</li>
                    <li>Chapter-22 : The Truth</li>
                    <li>Chapter-23 : The Return Of The Lion</li>
                    <li>Chapter-24 : Co-Operate And Prosper</li>
                    <li>Chapter-26 : Ustad Bismillah Khan</li>
                    <li>Chapter-27 : The Parrot Who Wouldn't Talk</li>
                </ul>
               </div>

                {/* Download Links */}
                <div className="download-links">
                    <a href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/10th/202.pdf" target="_blank">
                    Download The Official NIOS English (202) Syllabus Here
                    </a>
                    <a href="/papers/202-english-sample-2024.pdf" target="_blank">
                    Download The Official NIOS English (202) Sample Question Paper Here
                    </a>
                </div>
                </div>
            </div>
        <Footer />
      </section>
    </>
  );
}
