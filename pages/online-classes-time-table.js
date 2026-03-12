"use client";

import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function OnlineClassesTiming() {

  const handlePrint = () => {
    const pdfUrl = "/assets/images/others/online-class.pdf";
    const printWindow = window.open(pdfUrl, "_blank");
    printWindow.onload = function () {
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <>
      <Head>
        <title>Online Classes Timing For All Branches</title>
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Online Classes Timing For All Branches
            </h1>

            <h2 style={{marginTop: "20px" }}>
              Best NIOS Coaching In Lucknow
            </h2>

            <h2 style={{  fontWeight: "700" }}>
              Online Classes Timings For All Batches
            </h2>

            {/* CLASS - 10th */}
            <h2 style={{ textAlign: "center", marginTop: "40px" }}>
              CLASS - 10th
            </h2>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Subjects</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>9:30 to 10:00 am</td>
                    <td>Economics (214) / Business Studies (215)</td>
                  </tr>
                  <tr>
                    <td>11:15 to 11:45 am</td>
                    <td>Maths (211)</td>
                  </tr>
                  <tr>
                    <td>02:45 to 03:15 pm</td>
                    <td>Social Science (213)</td>
                  </tr>
                  <tr>
                    <td>03:15 to 03:45 pm</td>
                    <td>English (202)</td>
                  </tr>
                  <tr>
                    <td>04:00 to 04:30 pm</td>
                    <td>Data Entry (229)</td>
                  </tr>
                  <tr>
                    <td>04:30 to 05:00 pm</td>
                    <td>Science (212)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* CLASS - 12th */}
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
              CLASS - 12th
            </h2>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Subjects</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>9:00 to 9:30 am</td>
                    <td>Economics (318)</td>
                  </tr>
                  <tr>
                    <td>9:30 to 10:00 am</td>
                    <td>Computer Science (330) / Data Entry (336)</td>
                  </tr>
                  <tr>
                    <td>10:15 to 10:45 am</td>
                    <td>Maths (311)</td>
                  </tr>
                  <tr>
                    <td>10:45 to 11:15 am</td>
                    <td>Physics (312)</td>
                  </tr>
                  <tr>
                    <td>12:00 to 12:30 pm</td>
                    <td>Accountancy (320)</td>
                  </tr>
                  <tr>
                    <td>12:30 to 01:00 pm</td>
                    <td>English (302)</td>
                  </tr>
                  <tr>
                    <td>01:00 to 01:30 pm</td>
                    <td>Business Studies (319)</td>
                  </tr>
                  <tr>
                    <td>01:30 to 02:00 pm</td>
                    <td>Chemistry (313)</td>
                  </tr>
                  <tr>
                    <td>02:15 to 02:45 pm</td>
                    <td>Biology (314)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Instructions */}
            <ul style={{ marginTop: "30px" }}>
              <li>
                Download our application “S.S Coaching” from app store available in both <a className="nios-125h-senior-highlight"  href="https://play.google.com/store/apps/details?id=com.ameegolabs.sscoaching&hl=en_AU">(IOS/Android)</a>  for regular online classes, attendance, regular updates and more!
              </li>
              <li>Use earphones or headphones for a better quality of audio.</li>
              <li>Do not leave the online class in middle.</li>
              <li>Re-join the class immediately if it got end due to the internet poor connection.</li>
              <li>Try to sit in a close environment.</li>
              <li>Keep your video on all the time during the e-class.</li>
              <li>Keep your audio off until the teacher does not ask you to turn it on.</li>
            </ul>

            {/* Print Button Bottom Right */}
            <div style={{ textAlign: "right", marginTop: "30px" }}>
              <button
                onClick={handlePrint}
                className="nios-125h-senior-highlight"
                style={{
                  padding: "10px 25px",
                  border: "none",
                  cursor: "pointer"
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
