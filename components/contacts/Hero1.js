import React from 'react'

export default function Hero1() {
  return (
    <div className='container'>
        <div className="content-wrapper">
          <div className="left-content">
            <h1 className="c-hero-title">Need <span className="highlight">help?</span></h1>
            <p className="c-hero-description">SS Coaching is here to help you;<br />Our experts are available to answer any questions you might have. We've got the answers.</p>
            
            <h2 className="c-hero-title">Visit <span className="highlight">us</span></h2>
            
            <div className="location-info pt-3">
              {/* <!-- Hazratganj Location --> */}
              <div className="location-card">
              
                <div className="location-details">
                  <div className="location-title">SS Coaching Hazratganj, Lucknow</div>
                  <div className="location-text">IIIrd Floor, Shree Chamber, Naza Computer Market, Near Basant Cinema, Hazratganj, Lucknow.</div>
                   <div className="c-icons">
                     <img src="/assets/images/contacts/call.svg" alt="Phone icon" className="contact-icon"/>
                      <div className="location-text">9839065533</div>
                   </div>

                    <div className="c-icons">
                     <img src="/assets/images/contacts/telephone.svg" alt="Telephone icon" className="contact-icon"/>
                      <div className="location-text">0522-4029757</div>
                   </div>

                    <div className="c-icons">
                     <img src="/assets/images/contacts/email.svg" alt="Emali icon" className="contact-icon"/>
                      <div className="location-text">sscoachinglko@gmail.com</div>
                   </div>
                </div>
              </div>

              {/* <!-- Indira Nagar Location --> */}

              <div className="location-card">
                <div className="location-details">
                  <div className="location-title">SS Coaching Indira Nagar, Lucknow</div>
                  <div className="location-text">3rd Floor, Upstair Rama Sarees, In Bhootnath Mkt, Indira Nagar,Lucknow</div>
                   <div className="c-icons">
                     <img src="/assets/images/contacts/call.svg" alt="Phone icon" className="contact-icon"/>
                      <div className="location-text">6392644822</div>
                   </div>

                    <div className="c-icons">
                     <img src="/assets/images/contacts/telephone.svg" alt="Telephone icon" className="contact-icon"/>
                      <div className="location-text">0522-4079190</div>
                   </div>

                    <div className="c-icons">
                     <img src="/assets/images/contacts/email.svg" alt="Emali icon" className="contact-icon"/>
                      <div className="location-text">sscoachinglko@gmail.com</div>
                   </div>
                </div>
              </div>

            

              {/* <!-- Alambagh Location --> */}
                  <div className="location-card">
                <div className="location-details">
                  <div className="location-title">SS Coaching Alambagh, Lucknow</div>
                  <div className="location-text">U.R. Plaza, Near Phoenix Mall, Beside Acumen Hotel (LDA), Alambagh,Lucknow</div>
                   <div className="c-icons">
                     <img src="/assets/images/contacts/call.svg" alt="Phone icon" className="contact-icon"/>
                      <div className="location-text">9935035316</div>
                   </div>

                    <div className="c-icons">
                     <img src="/assets/images/contacts/telephone.svg" alt="Telephone icon" className="contact-icon"/>
                      <div className="location-text">+91-9935035316</div>
                   </div>

                    <div className="c-icons">
                     <img src="/assets/images/contacts/email.svg" alt="Emali icon" className="contact-icon"/>
                      <div className="location-text">sscoachinglko@gmail.com</div>
                   </div>
                </div>
              </div>

        
            </div>
          </div>

          <div className="right-content">
            <div className="image-gallery">
              <img src="/assets/images/contacts/1.png" alt="SS Coaching classroom with students" className="gallery-image"/>
              <img src="/assets/images/contacts/2.png" alt="SS Coaching teaching session" className="gallery-image"/>
              <img src="/assets/images/contacts/3.png" alt="SS Coaching exterior view" className="gallery-image"/>
              <img src="/assets/images/contacts/4.png" alt="SS Coaching faculty presentation" className="gallery-image"/>
            </div>
          </div>
        </div>
    </div>
  )
}
