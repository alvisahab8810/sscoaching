import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import FAQ from "@/components/home/FAQ";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";

export default function FAQSection() {
  return (
    <>
      <Head>
        <title>
          Frequently Asked Questions For SS Coaching
        </title>
        <meta name="description" content="SS Coaching NIOS Center in Lucknow, Provides form filling for admission in NIOS Board (National Institute of Open Schooling) as well as NIOS Coaching Classes, Syllabus and Tuition for 10th (secondary) & 12th (senior secondary) Students. Contact us for all inquiries related to NIOS Board in Lucknow" />
        <meta name="keywords" content="NIOS exam centre registration, NIOS Study Centre Contact Number, nios head office contact number, nios regional centre list, nios contact number, NIOS Study Centre List, NIOS Coaching in Lucknow, NIOS admission Lucknow," />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="faq-section ">
        <Header />
        <Offcanvas />
                <BranchContactCanvas/>
        

        <section className="faq-area-page">
          <FAQ />
        </section>

      </section>
        <Footer />

    </>
  );
}
