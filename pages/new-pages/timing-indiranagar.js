"use client";

import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import CTA from "@/components/home/CTA";
import Head from "next/head";

export default function IndraNagarNIOS() {

  const handlePrint = () => {
    const pdfUrl = "/assets/images/others/timing-indranagar.pdf";
    const printWindow = window.open(pdfUrl, "_blank");
    printWindow.onload = function () {
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <>
      <Head>
        <title>Best NIOS Coaching in Indra Nagar, Lucknow</title>
        <meta
          name="description"
          content="Best NIOS Coaching in Indra Nagar, Lucknow"
        />
      </Head>

      <section className="home-page-area syllabus-nios1">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        <div className="syllabus-nios">
          <div className="container">

            <h1 className="nios-125h-senior-hero-title">
              Best NIOS Coaching in Indra Nagar, Lucknow
            </h1>

            {/* Print Button */}
            <div style={{ marginTop: "15px", marginBottom: "30px" }}>
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

            <p>
              Unlock NIOS success in Lucknow with SS Coaching, your academic gateway since 2001. As the leading NIOS coaching center near Indra Nagar, Lucknow, we empower students to excel in NIOS Class 10th and 12th. Navigate the National Institute of Open Schooling with our dedicated support and achieve academic brilliance.
            </p>

            <p>
              SS Coaching in Indra Nagar, Lucknow, is your one-stop solution for NIOS Admission, providing guidance through the admission process. Our center is renowned as the best for NIOS coaching in Indra Nagar, and we ensure a reliable and supportive environment for students. Join us to qualify for Secondary and Senior Secondary Exams with ease.
            </p>

            <p>
              Discover the best NIOS Coaching in Lucknow and the most reliable NIOS office in the vicinity. SS Coaching is committed to assisting you on your academic journey, ensuring success and growth. Seize the opportunity to excel with the best center for NIOS Admission in Lucknow. Join SS Coaching Indra Nagar, your partner in academic achievemen
            </p>

          </div>
        </div>

        <div className="container pb-50">
        <CTA/>



        </div>

        <Footer />
      </section>
    </>
  );
}
