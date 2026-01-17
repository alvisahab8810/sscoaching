import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function SyllabusDataEntryNIOS() {
  return (
    <>
      <Head>
        <title>Curriculum Data Entry | NIOS</title>
        <meta
          name="description"
          content="SS Coaching NIOS Center in Lucknow, Provides form filling for admission in NIOS Board (National Institute of Open Schooling) as well as NIOS Coaching Classes, Syllabus and Tuition for 10th (secondary) & 12th (senior secondary) Students. Contact us for all inquiries related to NIOS Board in Lucknow"
        />


          <meta
          name="keywords"
          content="NIOS exam centre registration, NIOS Study Centre Contact Number, nios head office contact number, nios regional centre list, nios contact number, NIOS Study Centre List, NIOS Coaching in Lucknow, NIOS admission Lucknow,"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />

        <div className="syllabus-nios">
          <div className="container">
            {/* ================= PAGE TITLE ================= */}
            <h1 className="nios-125h-senior-hero-title">
              Curriculum Data Entry of NIOS in SS Coaching
            </h1>

            <h2>
              <span className="nios-125h-senior-highlight">
                SYLLABUS OF DATA ENTRY (229) IN NIOS
              </span>
            </h2>

            {/* ================= SYLLABUS ================= */}
            <h3 className="nios-125h-senior-hero-title">1. Basics of Computer</h3>

            <p>- Input and Output Devices</p>
            <p>- System Software and Application Software</p>
            <p>- Computer Language</p>
            <p>- Compiler and Assembler</p>

            <hr />

            <h3 className="nios-125h-senior-hero-title">
              2. Operating System
            </h3>

            <p>- Desktop Elements</p>
            <p>- Locating Files and Folders</p>
            <p>- Changing System Setting</p>
            <p>- File Management in Windows</p>
            <p>- Installation of Software and Hardware</p>

            <hr />

            <h3 className="nios-125h-senior-hero-title">
              3. Basics of Word Processing
            </h3>

            <p>- Starting Word Program</p>
            <p>- Word Screen Layout</p>
            <p>- Typing Screen Objects</p>
            <p>- Managing Documents</p>
            <p>- Protecting and Finding Documents</p>

            <hr />

            <h3 className="nios-125h-senior-hero-title">
              4. Formatting Documents
            </h3>

            <p>- Working with text</p>
            <p>- Formatting Paragraphs</p>
            <p>- Creating Bulleted and Numbered Lists</p>
            <p>- Spelling and Grammar</p>

            <hr />

            <h3 className="nios-125h-senior-hero-title">
              5. Mail Merge
            </h3>

            <p>- Types of document in Mail merge</p>
            <p>- Creating data Source</p>
            <p>- Creating Mailing Labels</p>
            <p>- Merging Data into Main Document</p>

            <hr />

            <h3 className="nios-125h-senior-hero-title">
              6. Basics of Spreadsheet
            </h3>

            <p>- Selecting, Adding and Renaming Worksheets</p>
            <p>- Modifying a Worksheet</p>
            <p>- Resizing Rows and Columns</p>
            <p>- Workbook Protection</p>

            <hr />

            <h3 className="nios-125h-senior-hero-title">
              7. Formatting Worksheets
            </h3>

            <p>- Formatting Toolbar</p>
            <p>- Formatting Cells</p>
            <p>- Formatting Columns and Rows</p>
            <p>- Protect and Unprotect Worksheets</p>

            <hr />

            <h3 className="nios-125h-senior-hero-title">
              8. Formulas, Functions and Charts
            </h3>

            <p>- Copying a Formula</p>
            <p>- Types of Functions</p>
            <p>- Types of Charts</p>
            <p>- Auto shapes and Smart art</p>

            <hr />

            <h3 className="nios-125h-senior-hero-title">
              9. Creating Presentation
            </h3>

            <p>- Creating Slides</p>
            <p>- Slide Sorter View</p>
            <p>- Changing Slide Layouts</p>
            <p>- Moving Between Slides</p>

            <a
              href="tel:9935035316"
              className="cta-button cta-button1"
            >
              For any help related to admission in NIOS please contact SS Coaching
              on our Mobile No. +91 9935035316
            </a>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
