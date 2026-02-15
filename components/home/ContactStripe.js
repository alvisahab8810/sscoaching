"use client";
import React from "react";

export default function SSContactStrip() {
  return (
    <section className="ss-contact-strip-v2">
      <div className="ss-strip-container">


        <div className="ss-mobile-heading desktop-none">Call Us Now!</div>

        
        <div className="ss-strip-item">
          <div className="ss-strip-inner">

            <a href="tel:09839065533">
            <div className="ss-strip-icon">
              <img
                src="/assets/images/contacts/call.svg"
                alt="Call"
              />
            </div>

            </a>
            <div>
              <div className="ss-strip-title">Hazratganj</div>
              <a href="tel:09839065533" className="ss-strip-phone">
                09839065533
              </a>
            </div>
          </div>
        </div>

        <div className="ss-strip-divider"></div>

        



        <div className="ss-strip-item">
          <div className="ss-strip-inner">
            <a href="tel:09792111121">

            <div className="ss-strip-icon">
              <img
                src="/assets/images/contacts/call.svg"
                alt="Call"
              />
            </div>
            </a>
            <div>
              <div className="ss-strip-title">Indira Nagar</div>
              <a href="tel:09792111121" className="ss-strip-phone">
                09792111121
              </a>
            </div>
          </div>
        </div>
        <div className="ss-strip-divider"></div>
   

        <div className="ss-strip-item">
          <div className="ss-strip-inner">

            <a href="tel:09935035316">
            
            <div className="ss-strip-icon">
              <img
                src="/assets/images/contacts/call.svg"
                alt="Call"
              />
            </div>
            </a>
            <div>
              <div className="ss-strip-title">Alambagh</div>
              <a href="tel:09935035316" className="ss-strip-phone">
                09935035316
              </a>
            </div>
          </div>
        </div>



      </div>
    </section>
  );
}
