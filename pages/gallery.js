import Hero from "@/components/contacts/Hero";
import Map from "@/components/contacts/Map";
import Footer from "@/components/footer/Footer";
import Gallery from "@/components/Gallery1";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import FAQ from "@/components/home/FAQ";

import Head from "next/head";

export default function Galleryy() {
  return (
    <>
      <div className="gallery-area">
        <Head>
          <title>Best NIOS Coaching in India | Gallery </title>
          <meta
            name="description"
            content="SS Coaching NIOS Center in Lucknow, Provides form filling for admission in NIOS Board (National Institute of Open Schooling) as well as NIOS Coaching Classes, Syllabus and Tuition for 10th (secondary) & 12th (senior secondary) Students. Contact us for all inquiries related to NIOS Board in Lucknow"
          />
          <meta
            name="keywords"
            content="NIOS exam centre registration, NIOS Study Centre Contact Number, nios head office contact number, nios regional centre list, nios contact number, NIOS Study Centre List, NIOS Coaching in Lucknow, NIOS admission Lucknow,"
          />{" "}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section className="home-page-area">
          <Header />
          <Offcanvas />
                  <BranchContactCanvas/>
          

          <section className="qustion-paper-hero-section tma-hero ">
            <div className="container">
              <div className="hero-text">
                <h1 className="qustion-paper-hero-title mb-4">Photo Gallery</h1>
              </div>

              <section className="gallery-section-area">
                <Gallery />
              </section>
              
            </div>
          </section>

          <FAQ limit={8} showViewMore={true} />

          <div className="container">
            <a href="tel: +91 9935035316" className="cta-button ">
              For any help related to admission in NIOS please contact SS
              Coaching on our Mobile No. +91 9935035316
            </a>
          </div>

          <Footer />
        </section>
      </div>
    </>
  );
}
