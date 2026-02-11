import React from "react";

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
            </div>

            <div className="branch-contact">
              <a href="mailto:sscoachinglko@gmail.com">
                                <img src="/assets/images/contacts/email.svg" alt="Emali icon" className="contact-icon"/>

                sscoachinglko@gmail.com
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
            </div>

            <div className="branch-contact">
              <a href="mailto:sscoachinglko@gmail.com">
                                <img src="/assets/images/contacts/email.svg" alt="Emali icon" className="contact-icon"/>

                sscoachinglko@gmail.com
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
            </div>

            <div className="branch-contact">
              <a href="mailto:sscoachinglko@gmail.com">
                <img src="/assets/images/contacts/email.svg" alt="Emali icon" className="contact-icon"/>
                sscoachinglko@gmail.com
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
