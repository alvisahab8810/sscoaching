import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import Head from "next/head";

export default function BestNIOSCoachingHazratganj() {

  const handlePrint = () => {
    const pdfUrl = "/assets/images/others/timetable-hazratganz.pdf";
    const printWindow = window.open(pdfUrl, "_blank");
    printWindow.onload = function () {
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <>
      <Head>
        <title>Best NIOS Coaching in Hazratganj Lucknow</title>
        <meta
          name="description"
          content="Best NIOS Coaching in Hazratganj Lucknow. SS Coaching is your academic gateway since 2001."
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
              Best NIOS Coaching in Hazratganj Lucknow
            </h1>

          

            <p>
              Unlock NIOS success in Lucknow with SS Coaching, your academic gateway since 2001. As the premier NIOS coaching center near Hazratganj, we empower students to navigate the National Institute of Open Schooling (NIOS) with excellence. Whether targeting NIOS Class 10th, 12th, or seeking admission guidance, SS Coaching is your comprehensive solution for NIOS Admission near Hazratganj, Lucknow.
            </p>

            <p>
              Dedicated to academic brilliance, SS Coaching Hazratganj stands out as the best NIOS coaching center in Lucknow. Elevate your chances of success with the most reliable NIOS office in Lucknow, conveniently located near Hazratganj. Join us to qualify for Secondary and Senior Secondary Exams in Lucknow.
            </p>

            <p>
              Explore the best center for NIOS Admission in Lucknow with SS Coaching Hazratganj. Our commitment to excellence makes us the go-to choice for NIOS Coaching in Lucknow. Enroll now and embark on your journey to academic achievement with the best NIOS Coaching in Hazratganj, Lucknow.
            </p>

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
