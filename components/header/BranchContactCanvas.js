import React from "react";
import { FaWhatsapp } from "react-icons/fa";


export default function BranchContactCanvas() {
  return (
    <>
      <div
        className="offcanvas offcanvas-end branch-canvas"
        tabIndex="-1"
        id="branchContactCanvas"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Our Branches – Lucknow</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">

          {/* Branch 1 */}
          <div className="branch-card">
            <h6>SS Coaching – Hazratganj</h6>
            <p className="branch-address">
              IIIrd Floor, Shree Chamber, Naza Computer Market,
              Near Basant Cinema, Hazratganj, Lucknow.
            </p>

            <div className="branch-contact">
              <a href="tel:09839065533">
                <img
                  src="/assets/images/contacts/call.svg"
                  alt="Phone icon"
                  className="contact-icon"
                />
                09839065533
              </a>




                <a href="tel:06387563947">
                      <img
                        src="/assets/images/contacts/call.svg"
                        alt="Phone icon"
                        className="contact-icon"
                      />
                      <div className="location-text">06387563947</div>

                      
                    </a>

                    
                <div className="c-icons whatsapp-row mt-2">
                                  <FaWhatsapp style={{ color: "#25D366", fontSize: "16px", flexShrink: 0 }} />
                                  <div className="location-text">
                                    <a href="https://wa.me/919839065533" target="_blank" rel="noopener noreferrer">
                                      WhatsApp Us
                                    </a>
                                  </div>
                                </div>
            </div>

            <div className="branch-contact">
              <a href="mailto:contact@sscoaching.in">
                                <img src="/assets/images/contacts/email.svg" alt="Emali icon" className="contact-icon"/>

                contact@sscoaching.in
              </a>
            </div>
          </div>

          {/* Branch 2 */}
          <div className="branch-card">
            <h6>SS Coaching – Indira Nagar</h6>
            <p className="branch-address">
              3rd Floor, Upstair Rama Sarees, In Bhootnath Market,
              Indira Nagar, Lucknow.
            </p>

            <div className="branch-contact">
              <a href="tel:09792111121">
                <img
                  src="/assets/images/contacts/call.svg"
                  alt="Phone icon"
                  className="contact-icon"
                />
                09792111121
              </a>

             <a href="tel:09956493857">
                      <img
                        src="/assets/images/contacts/call.svg"
                        alt="Phone icon"
                        className="contact-icon"
                      />
                      <div className="location-text">09956493857</div>

                    </a>

                      <div className="c-icons whatsapp-row mt-2">
                    <FaWhatsapp style={{ color: "#25D366", fontSize: "16px", flexShrink: 0 }} />
                    <div className="location-text">
                      <a href="https://wa.me/919792111121" target="_blank" rel="noopener noreferrer">
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
            </div>

            <div className="branch-contact">
              <a href="mailto:contact@sscoaching.in">
                                <img src="/assets/images/contacts/email.svg" alt="Emali icon" className="contact-icon"/>

                contact@sscoaching.in
              </a>
            </div>
          </div>

          {/* Branch 3 */}
          <div className="branch-card">
            <h6>SS Coaching – Alambagh</h6>
            <p className="branch-address">
              U.R. Plaza, Near Phoenix Mall, Beside Acumen Hotel (LDA),
              Alambagh, Lucknow.
            </p>

            <div className="branch-contact">
              <a href="tel:09935035316">
                <img
                  src="/assets/images/contacts/call.svg"
                  alt="Phone icon"
                  className="contact-icon"
                />
                09935035316
              </a>


             <a href="tel:09236062837">
                      <img
                        src="/assets/images/contacts/call.svg"
                        alt="Phone icon"
                        className="contact-icon"
                      />
                      <div className="location-text">09236062837</div>

                    </a>

                      <div className="c-icons whatsapp-row mt-2">
                    <FaWhatsapp style={{ color: "#25D366", fontSize: "16px", flexShrink: 0 }} />
                    <div className="location-text">
                      <a href="https://wa.me/919935035316" target="_blank" rel="noopener noreferrer">
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
            </div>

            <div className="branch-contact">
              <a href="mailto:contact@sscoaching.in">
                <img src="/assets/images/contacts/email.svg" alt="Emali icon" className="contact-icon"/>
                contact@sscoaching.in
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
