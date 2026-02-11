import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusPaintingNIOS() {
  return (
    <>
      <Head>
        <title>Syllabus Of Painting (225) In NIOS for Secondary Education</title>
        <meta
          name="description"
          content="NIOS Syllabus of Painting for class 10th or secondary classes and get all the subject related information are here like all painting syllabus of class 10th courses is available for class 10th."
        />
        <meta
          name="keywords"
          content="The art college in lucknow, Painting class syllabus, Lucknow painting school, painting 10th syllabus, School of arts and culture, Board syllabus for painting , Painting in NIOS, NIOS painting syllabus, Open school for painting, Painting sample paper, Art classes in Lucknow, Art school in Uttar pradesh, Art school of NIOS, Curriculum painting class, History of art course, Online painting classes, Painting secondary curriculum, structure of painting, nios painting, nios painting book class 10, painting nios class 10,"
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
              Syllabus of Painting in NIOS
            </h1>

            <h2>
              <span className="nios-125h-senior-highlight">
                Painting (225) Syllabus
              </span>
            </h2>

            <p style={{ color: "green", fontWeight: 600 }}>
              You can also Download the Sample Paper from below
            </p>

            <p className="nios-125h-senior-hero-subtitle">
              Course Structure of Painting
            </p>

            {/* Course Structure Table */}
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Module</th>
                    <th>TMA (40%)</th>
                    <th>Public Examination (60%)</th>
                    <th>Marks</th>
                    <th>Study Hours</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>I</strong><br />Introduction of Indian Art</td>
                    <td>-</td>
                    <td>
                      L-1 History and Appreciation of Art (From 3000 BC to 600 AD)<br />
                      L-2 History and Appreciation of Art From 7th AD to 12th AD
                    </td>
                    <td>-</td>
                    <td>-</td>
                  </tr>

                  <tr>
                    <td><strong>II</strong><br />Introduction of Western Art</td>
                    <td>-</td>
                    <td>
                      L-5 Renaissance<br />
                      L-7 Cubism, Surrealism and Abstract Art
                    </td>
                    <td>-</td>
                    <td>-</td>
                  </tr>

                  <tr>
                    <td><strong>III</strong><br />Introduction of Contemporary Indian Art</td>
                    <td>-</td>
                    <td>
                      L-8 Pioneers of Contemporary Indian Art<br />
                      L-9 Contemporary Indian Art
                    </td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Practicals */}
            <div className="spacer-area">
              <h3 className="nios-125h-senior-hero-title">Practicals</h3>
              <ul className="chapter-list">
                <li>10. Object Study</li>
                <li>11. Nature Study</li>
                <li>12. Human and Animal Figure</li>
                <li>13. Composition</li>
              </ul>
            </div>

            {/* Detailed Syllabus */}
            <div className="spacer-area">
              <h3 className="nios-125h-senior-hero-title">
                Painting <span className="nios-125h-senior-highlight">(225)</span> Syllabus
              </h3>

              <div className="module-box">
                <h4>Module 1: Introduction to Indian Art</h4>
                <ul className="chapter-list">
                  <li>1. History and Appreciation of Art (From 3000 BC to 600 AD)</li>
                  <li>2. History and Appreciation of Art From 7th AD to 12th AD</li>
                </ul>
              </div>

              <div className="module-box">
                <h4>Module 2: Introduction to Western Art</h4>
                <ul className="chapter-list">
                  <li>5. Renaissance</li>
                  <li>7. Cubism, Surrealism and Abstract Art</li>
                </ul>
              </div>

              <div className="module-box">
                <h4>Module 3: Introduction to Contemporary Art</h4>
                <ul className="chapter-list">
                  <li>8. Pioneers of Contemporary Indian Art</li>
                  <li>9. Contemporary Indian Art</li>
                </ul>
              </div>

              <div className="module-box">
                <h4>Practical Guidelines</h4>
                <ul className="chapter-list">
                  <li>1. Tools and Material</li>
                  <li>2. Object Study</li>
                  <li>3. Nature Study</li>
                  <li>4. Human Figure</li>
                  <li>5. Study of Animals and Birds</li>
                  <li>6. Composition</li>
                </ul>
              </div>
            </div>

            {/* Download Links */}
            <div className="download-links">
              <a
                href="https://www.nios.ac.in/media/documents/Course_Bifurcation_2023/10th/225.pdf"
                target="_blank"
              >
                Download The Official NIOS Painting (225) Syllabus Here
              </a>
              <a
                href="/papers/225-painting-sample-2024.pdf"
                target="_blank"
              >
                Download The Official NIOS Painting (225) Sample Question Paper Here
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
