import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import FAQ from "@/components/home/FAQ";
import React, { useEffect, useState } from "react";

export default function FAQSection() {

  return (
    <section className="faq-section ">
    <Header/>
     <Offcanvas />
    
     <section className="faq-area-page">
        <FAQ/>
     </section>

      <Footer/>
    </section>
  );
}
