import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function AlambaghBranch() {

     const handlePrint = () => {
    const pdfUrl = "/assets/images/others/timetable-alambagh.pdf";
    const printWindow = window.open(pdfUrl, "_blank");
    printWindow.onload = function () {
      printWindow.focus();
      printWindow.print();
    };
  };
  return (
    <>
      <Head>
        <title>
          Best NIOS Coaching in Alambagh, Lucknow | SS Coaching
        </title>
        <meta
          name="description"
          content="Best NIOS Coaching in Alambagh, Lucknow. SS Coaching provides expert guidance for NIOS Class 10th & 12th admissions and exams."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Best NIOS Coaching in Alambagh, Lucknow
            </h1>

            <h3>Print Document</h3>

            <br />

            <p>
              Embark on your journey to NIOS success in the heart of Lucknow
              with SS Coaching, illuminating academic pathways since 2001.
              Positioned as the pinnacle NIOS coaching center near Alambagh,
              we pledge unwavering support to guide you through the National
              Institute of Open Schooling (NIOS) and illuminate the route to
              academic excellence. Whether you aspire to conquer NIOS Class
              10th or 12th, or seek adept guidance during the admission
              odyssey, SS Coaching emerges as your comprehensive solution
              for NIOS Admission in the vicinity of Alambagh, Lucknow.
            </p>

            <p>
              Nestled near Alambagh, SS Coaching is not just a coaching
              center; it's your educational haven. Our commitment extends
              beyond mere coaching, transforming aspirations into
              achievements. Elevate your academic journey with the best
              NIOS center in Lucknow, strategically located near Alambagh.
              Join SS Coaching Alambagh to seamlessly navigate Secondary
              and Senior Secondary Exams, ensuring triumph in every academic stride.
            </p>

            <p>
              Discover the epitome of NIOS Coaching in Lucknow with SS Coaching –
              your beacon of success. Unearth the finest center for NIOS Admission
              in Lucknow and experience the pinnacle of excellence at the Best
              NIOS Coaching in Indra Alambagh. Trust the most reliable NIOS office
              in Lucknow to shape your academic destiny. Illuminate your path to
              success; choose SS Coaching for an extraordinary NIOS experience.
            </p>

            <br />

            <h2 className="nios-125h-senior-highlight">
              Timetable Alambagh
            </h2>

            <br />

            {/* ================= CLASS X ================= */}
            <h3>Class-X</h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>11:00-11:45</th>
                    <th>11:45-12:30</th>
                    <th>12:30-01:15</th>
                    <th>01:15-02:00</th>
                    <th>02:00-02:45</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Subject</td>
                    <td>English</td>
                    <td>Social Science</td>
                    <td>Science</td>
                    <td>Maths</td>
                    <td>Hindi</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <br />

            {/* ================= CLASS XII COMMERCE ================= */}
            <h3>Class-XII (Commerce - Group)</h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>08:00-08:45</th>
                    <th>08:45-09:30</th>
                    <th>09:30-10:15</th>
                    <th>10:15-11:00</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Subject</td>
                    <td>Account</td>
                    <td>Economics</td>
                    <td>Commerce</td>
                    <td>English</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <br />

            {/* ================= CLASS XII SCIENCE ================= */}
            <h3>Class-XII (Science - Group)</h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>08:00-08:45</th>
                    <th>08:45-09:30</th>
                    <th>09:30-10:15</th>
                    <th>10:15-11:00</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Subject</td>
                    <td>Physics</td>
                    <td>Maths/Biology</td>
                    <td>Chemistry</td>
                    <td>English</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <br />
            <br />

            {/* ================= PRINT BUTTON ================= */}
             <div style={{ textAlign: "right", margin: "20px 0" }}>
              <button
                onClick={handlePrint}
                className="nios-125h-senior-highlight"
                style={{
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                Print Document
              </button>
            </div>

          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
