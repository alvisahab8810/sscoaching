import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import FAQ from "@/components/home/FAQ";
import React, { useEffect, useState } from "react";

export default function FAQSection() {

  return (
    <section className="faq-section ">
    <Header/>
      <div className="container ptb-100">
       
        <FAQ/>

    
      </div>

      <Footer/>
    </section>
  );
}
