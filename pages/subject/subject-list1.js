import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";
import SecondaryOrSrSecondary from "@/components/subjects/SecondaryOrSrSecodary";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";

export default function NIOSCompleteSubjectsList1() {
  return (
    <>
      <Head>
        <title>NIOS Complete Subjects List 10th & 12th</title>
        <meta
          name="description"
          content="NIOS Complete Subjects List for Class 10th and 12th | Secondary & Senior Secondary Course | Scheme of Studies"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area">
        <Header />
        <Offcanvas />
               <BranchContactCanvas/>
        

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              NIOS Complete Subjects List 10th 12th
            </h1>

            <p style={{ color: "red", fontWeight: "600" }}>
              OUR NIOS COURSES
            </p>

            <p style={{ color: "blue", fontWeight: "600" }}>
              SECONDARY COURSE (CLASS X) And SENIOR SECONDARY COURSE (CLASS XII)
            </p>

            <h3>SECONDARY COURSE</h3>
            <p>
              This Course is equivalent to the Xth standard. You can choose
              subjects from the Scheme of Studies given in below Table.
              However, you will be required to success complete a minimum of
              five subjects with atleast one language or at most two languages,
              which is compulsory for certification.
            </p>

            <h3>SENIOR SECONDARY COURSE</h3>
            <p>
              This Course is designed for those who have passed the Xth standard
              or equivalent examination from a recognised Board and would like
              to continue their education towards a Senior Secondary
              Certification, equivalent to XII standard. You can choose
              subjects from the Scheme of Subjects given in below Table.
              However, you will be required to successfully complete a minimum
              of five subjects with atleast one language or at most two
              languages, which is compulsory for Certification.
            </p>

            <h3>SCHEME OF STUDIES</h3>
            <p>
              The Scheme of Studies for Secondary and Senior Secondary Courses is
              shown in below Table. For obtaining a pass certificate, you are
              required to pass in a minimum of five subjects including a
              maximum of two languages from Group 'A' and other three or four
              subjects from Group (B). However you are free to take upto two
              additional subjects. Thus in all you can choose maximum of seven
              subjects.
            </p>

            <p style={{ color: "green", fontWeight: "600" }}>
              For Admission in nios and also for the good percentage in NIOS
              please contact SS Coaching at <strong>9792111121</strong>
            </p>

            <h3 style={{ textAlign: "center", color: "purple" }}>
              Table-1 : Scheme of Studies for Academic Courses
            </h3>

            {/* <SecondaryOrSrSecondary/> */}


            <h2 className="nios-125h-senior-hero-title">
  Table-1 : Scheme of Studies for Academic Courses
</h2>

<h3 className="nios-125h-senior-hero-subtitle">
  SECONDARY LEVEL (X)
</h3>

<div className="table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Code Subject</th>
        <th>Theory / Practical</th>
        <th>Number of Papers</th>
        <th>Maximum Marks</th>
        <th>Duration (Hours)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colSpan="5"><strong>Group (A)</strong></td>
      </tr>

      <tr><td>(201) Hindi</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(202) English</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(206) Urdu</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(209) Sanskrit</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

      <tr>
        <td>(203) Bengali</td>
        <td>Theory<br/>Examination of these subjects will be held on same day and same time</td>
        <td>1</td>
        <td>100</td>
        <td>3</td>
      </tr>

      <tr><td>(204) Marathi</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(205) Telugu</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(207) Gujarati</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(208) Kannada</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(210) Punjabi</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(228) Assamese</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(231) Nepali</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(232) Malyalam</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(233) Oriya</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(235) Arabic</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(236) Persian</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(237) Tamil</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
            <tr>
        <td colSpan="5"><strong>Group (B)</strong></td>
      </tr>

      <tr>
        <td>(211) Mathematics</td>
        <td>Theory</td>
        <td>1</td>
        <td>85</td>
        <td>3</td>
      </tr>
      <tr>
        <td>(211) Mathematics</td>
        <td>Practical</td>
        <td>1</td>
        <td>15</td>
        <td>2½</td>
      </tr>

      <tr>
        <td>(212) Science andTechnology</td>
        <td>Theory</td>
        <td>1</td>
        <td>85</td>
        <td>2½</td>
      </tr>
      <tr>
        <td>(212) Science andTechnology</td>
        <td>Practical</td>
        <td>1</td>
        <td>15</td>
        <td>3</td>
      </tr>

      <tr>
        <td>(213) Social Science</td>
        <td>Theory</td>
        <td>1</td>
        <td>100</td>
        <td>3</td>
      </tr>

      <tr>
        <td>(214) Economics</td>
        <td>Theory</td>
        <td>1</td>
        <td>100</td>
        <td>3</td>
      </tr>

      <tr>
        <td>(215) Business Studies</td>
        <td>Theory</td>
        <td>1</td>
        <td>100</td>
        <td>3</td>
      </tr>

      <tr>
        <td>(216) Home Science</td>
        <td>Theory</td>
        <td>1</td>
        <td>85</td>
        <td>2½</td>
      </tr>
      <tr>
        <td>(216) Home Science</td>
        <td>Practical</td>
        <td>1</td>
        <td>15</td>
        <td>3</td>
      </tr>

      <tr>
        <td>(222) Psychology</td>
        <td>Theory</td>
        <td>1</td>
        <td>100</td>
        <td>3</td>
      </tr>

      <tr>
        <td>(223) Indian Culture and Heritage</td>
        <td>Theory</td>
        <td>1</td>
        <td>100</td>
        <td>3</td>
      </tr>

      <tr>
        <td>(224) Accountancy</td>
        <td>Theory</td>
        <td>1</td>
        <td>100</td>
        <td>3</td>
      </tr>

      <tr>
        <td>(225) Painting</td>
        <td>Theory</td>
        <td>1</td>
        <td>30</td>
        <td>1½</td>
      </tr>
      <tr>
        <td>(225) Painting</td>
        <td>Practical</td>
        <td>1</td>
        <td>70</td>
        <td>3</td>
      </tr>

      <tr>
        <td>(229) Data Entry Operations</td>
        <td>Theory</td>
        <td>1</td>
        <td>40</td>
        <td>2</td>
      </tr>
      <tr>
        <td>(229) Data Entry Operations</td>
        <td>Practical</td>
        <td>1</td>
        <td>60</td>
        <td>2</td>
      </tr>

    </tbody>
  </table>
</div>

<br/>

<p>
  Five subjects with either one or two languages from Group A and the remaining subjects from Group B
</p>

<p>
  Two additional subjects can be taken from either of the two groups with additional fees as per NIOS norms
</p>




<h3 className="nios-125h-senior-hero-subtitle">
  SENIOR SECONDARY LEVEL (XII)
</h3>

<div className="table-wrapper">
  <table>
    <thead>
      <tr>
        <th>Code Subject</th>
        <th>Theory / Practical</th>
        <th>Number Of Papers</th>
        <th>Maximum Marks</th>
        <th>Duration (Hours)</th>
      </tr>
    </thead>
    <tbody>

      <tr>
        <td colSpan="5"><strong>Group (A)</strong></td>
      </tr>

      <tr><td>(301) Hindi</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(302) English</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(306) Urdu</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(309) Sanskrit</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

      <tr>
        <td>(307) Gujarati</td>
        <td>Theory<br/>Examination of these subjects will be held on same day and same time</td>
        <td>1</td>
        <td>100</td>
        <td>3</td>
      </tr>

      <tr><td>(303) Bengali</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(304) Tamil</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(305) Odia</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(310) Punjabi</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>



      <tr>
        <td colSpan="5"><strong>Group (B)</strong></td>
      </tr>

      <tr><td>(311) Mathematics</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

      <tr><td>(321) Home Science</td><td>Theory</td><td>1</td><td>80</td><td>3</td></tr>
      <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>

      <tr><td>(328) Psychology</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

      <tr><td>(316) Geography</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>

      <tr><td>(318) Economics</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(319) Business Studies</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

      <tr><td>(332) Painting</td><td>Theory</td><td>1</td><td>30</td><td>1½</td></tr>
      <tr><td></td><td>Practical</td><td>1</td><td>70</td><td>6</td></tr>

      <tr><td>(336) Data Entry Operations</td><td>Theory</td><td>1</td><td>40</td><td>2</td></tr>
      <tr><td></td><td>Practical</td><td>1</td><td>60</td><td>2</td></tr>


      <tr>
        <td colSpan="5"><strong>Group (C)</strong></td>
      </tr>

      <tr>
        <td>(312) Physics</td>
        <td>Theory<br/>Examination of these subjects will be held on same day and same time</td>
        <td>1</td>
        <td>80</td>
        <td>3</td>
      </tr>
      <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>

      <tr><td>(315) History</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

      <tr><td>(339) Library and Information Science</td><td>Theory</td><td>1</td><td>80</td><td>3</td></tr>
      <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>


      <tr>
        <td colSpan="5"><strong>Group (D)</strong></td>
      </tr>

      <tr>
        <td>(313) Chemistry</td>
        <td>Theory<br/>Examination of these subjects will be held on same day and same time</td>
        <td>1</td>
        <td>80</td>
        <td>3</td>
      </tr>
      <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>

      <tr><td>(317) Political Science</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

      <tr><td>(335) Mass Communication</td><td>Theory</td><td>1</td><td>80</td><td>3</td></tr>
      <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>


      <tr>
        <td colSpan="5"><strong>Group (E)</strong></td>
      </tr>

      <tr>
        <td>(314) Biology</td>
        <td>Theory<br/>Examination of these subjects will be held on same day and same time .</td>
        <td>1</td>
        <td>80</td>
        <td>3</td>
      </tr>
      <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>

      <tr><td>(320) Accountancy</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>
      <tr><td>(338) Introduction to Law</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>


      <tr>
        <td colSpan="5"><strong>Group (F)</strong></td>
      </tr>

      <tr>
        <td>(330) Computer Science</td>
        <td>Theory<br/>Examination of these subjects will be held on same day and same time .</td>
        <td>1</td>
        <td>60</td>
        <td>3</td>
      </tr>
      <tr><td></td><td>Practical</td><td>1</td><td>40</td><td>2</td></tr>

      <tr><td>(331) Sociology</td><td>Theory</td><td>1</td><td>100</td><td>3</td></tr>

      <tr><td>(333) Environmental Science</td><td>Theory</td><td>1</td><td>80</td><td>3</td></tr>
      <tr><td></td><td>Practical</td><td>1</td><td>20</td><td>3</td></tr>

    </tbody>
  </table>
</div>


<br/>

<p>
Five subjects with either one or two languages from Group A and the remaining subjects from Group B, C, D, E and F (only one subject from each group C, D, E and F)
</p>

<p>
Two additional subjects can be taken from any group (only one subject from each group C, D, E and F) with additional fee as per NIOS norms
</p>



            <h3>Note:</h3>

            <p style={{ color: "red" }}>
              Note : 1. Subjects with asterisk * have theory as well as practical
              work
            </p>

            <p style={{ color: "red" }}>
              Note : 2. Learner can opt only one subject from each of Group C, D,
              E and F
            </p>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
