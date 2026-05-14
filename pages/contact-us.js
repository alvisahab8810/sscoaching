import Hero from "@/components/contacts/Hero";
import Footer from "@/components/footer/Footer";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import CTA3 from "@/components/home/CTA3";
import Popup from "@/components/home/Popup";
import { FaWhatsapp } from "react-icons/fa";
import Head from "next/head";
import ContactFaqs from "@/components/contacts/ContactFaqs";

export default function ContactUs() {
  return (
    <>
      <Head>
        <title>Contact Us – NIOS Admission Support 2026</title>
        <meta name="description" content="SS Coaching NIOS Center in Lucknow, Provides form filling for admission in NIOS Board (National Institute of Open Schooling) as well as NIOS Coaching Classes, Syllabus and Tuition for 10th (secondary) & 12th (senior secondary) Students. Contact us for all inquiries related to NIOS Board in Lucknow" />
        <meta name="keywords" content="NIOS exam centre registration, NIOS Study Centre Contact Number, nios head office contact number, nios regional centre list, nios contact number, NIOS Study Centre List, NIOS Coaching in Lucknow, NIOS admission Lucknow," />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="home-page-area">
        <Header />
        <Offcanvas />
        <Hero />
        <BranchContactCanvas />

        {/* ── Branch Cards ── */}
        <section className="contacts_details-area">
          <div className="container">
            <div className="contacts_details-row">

              {/* Branch 1 — Hazratganj */}
              <div className="location-card">
                <div className="location-details">
                  <a href="/nios-coaching-hazratganj-lucknow">
                    <div className="location-title">SS Coaching<br />Hazratganj, Lucknow</div>
                    <div className="location-text mb-2">
                      S.S. Coaching, IIIrd Floor, Shree Chamber, Naza Computer Market,
                      Near Basant Cinema, Hazratganj, Lucknow.
                    </div>
                  </a>

                  <div className="c-icons">
                    <img src="/assets/images/contacts/call.svg" alt="Phone" className="contact-icon" />
                    <div className="location-text"><a href="tel:09839065533">09839065533</a></div>
                  </div>

                  <div className="c-icons whatsapp-row">
                    <FaWhatsapp style={{ color: "#25D366", fontSize: "16px", flexShrink: 0 }} />
                    <div className="location-text">
                      <a href="https://wa.me/919839065533" target="_blank" rel="noopener noreferrer">
                        WhatsApp Us
                      </a>
                    </div>
                  </div>

                  <div className="c-icons">
                    <img src="/assets/images/contacts/call.svg" alt="Phone" className="contact-icon" />
                    <div className="location-text"><a href="tel:06387563947">06387563947</a></div>
                  </div>

                  <div className="c-icons email-row">
                    <img src="/assets/images/contacts/email.svg" alt="Email" className="contact-icon" />
                    <div className="location-text">contact@sscoaching.in</div>
                  </div>
                </div>
              </div>

              {/* Branch 2 — Indira Nagar */}
              <div className="location-card">
                <div className="location-details">
                  <a href="/nios-coaching-indiranagar-lucknow">
                    <div className="location-title">SS Coaching<br />Indira Nagar, Lucknow</div>
                    <div className="location-text mb-2">
                      3rd Floor, Upstair Rama Sarees, In Bhootnath Mkt,
                      Indira Nagar, Lucknow
                    </div>
                  </a>

                  <div className="c-icons">
                    <img src="/assets/images/contacts/call.svg" alt="Phone" className="contact-icon" />
                    <div className="location-text"><a href="tel:09792111121">09792111121</a></div>
                  </div>

                  <div className="c-icons whatsapp-row">
                    <FaWhatsapp style={{ color: "#25D366", fontSize: "16px", flexShrink: 0 }} />
                    <div className="location-text">
                      <a href="https://wa.me/919792111121" target="_blank" rel="noopener noreferrer">
                        WhatsApp Us
                      </a>
                    </div>
                  </div>

                  <div className="c-icons">
                    <img src="/assets/images/contacts/call.svg" alt="Phone" className="contact-icon" />
                    <div className="location-text"><a href="tel:09956493857">09956493857</a></div>
                  </div>

                  <div className="c-icons email-row">
                    <img src="/assets/images/contacts/email.svg" alt="Email" className="contact-icon" />
                    <div className="location-text">contact@sscoaching.in</div>
                  </div>
                </div>
              </div>

              {/* Branch 3 — Alambagh */}
              <div className="location-card">
                <div className="location-details">
                  <a href="/nios-coaching-alambagh-lucknow">
                    <div className="location-title">SS Coaching<br />Alambagh, Lucknow</div>
                    <div className="location-text mb-2">
                      U.R.Plaza, Near Phoenix Mall, Beside Acumen Hotel (LDA),
                      Alambagh, Lucknow
                    </div>
                  </a>

                  <div className="c-icons">
                    <img src="/assets/images/contacts/call.svg" alt="Phone" className="contact-icon" />
                    <div className="location-text"><a href="tel:09935035316">09935035316</a></div>
                  </div>

                  <div className="c-icons whatsapp-row">
                    <FaWhatsapp style={{ color: "#25D366", fontSize: "16px", flexShrink: 0 }} />
                    <div className="location-text">
                      <a href="https://wa.me/919935035316" target="_blank" rel="noopener noreferrer">
                        WhatsApp Us
                      </a>
                    </div>
                  </div>

                  <div className="c-icons">
                    <img src="/assets/images/contacts/call.svg" alt="Phone" className="contact-icon" />
                    <div className="location-text"><a href="tel:09236062837">09236062837</a></div>
                  </div>

                  <div className="c-icons email-row">
                    <img src="/assets/images/contacts/email.svg" alt="Email" className="contact-icon" />
                    <div className="location-text">contact@sscoaching.in</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <div className="container">
          <CTA3 />
        </div>

        <section className="details-content-area">
          <div className="container">
            <div className="why-nios-section nios-admission-text">
              <h2 className="faq-title">
                SS Coaching has Three Excellent Branches in Lucknow, situated in{" "}
                <span className="highlight">Alambagh, Hazratganj,</span>
                {" "}and <span className="highlight">Indira Nagar</span> area in the
                capital city of Lucknow, Uttar Pradesh.
              </h2>

              <h3>Legacy of Excellence - Oldest NIOS Center in Lucknow Since 2001</h3>
              <p className="why-nios-text">
                SS Coaching is the Oldest and most renowned NIOS Center in Lucknow, Uttar Pradesh State since the year 2001. Since then, SS Coaching has provided the best NIOS Services in Lucknow to the failed students to qualify for Secondary and Senior Secondary Exams in Lucknow.
              </p>

              <h3>SS Coaching Hazratganj Lucknow - NIOS Coaching & Admission Services</h3>
              <p className="why-nios-text">
                SS Coaching Hazratganj Lucknow: Explore academic excellence at SS Coaching, the best NIOS Center near Hazratganj in Lucknow. Our NIOS center is dedicated to providing exceptional coaching services in Lucknow, including specialized support for NIOS Lucknow. With experienced educators and a focus on personalized learning, we ensure a nurturing environment for students aiming for success. Join us in shaping a brighter future through quality education.
              </p>

              <h3>SS Coaching Alambagh Lucknow - Trusted NIOS Tuition Center</h3>
              <p className="why-nios-text">
                SS Coaching Alambagh Lucknow: Explore academic excellence at SS Coaching Alambagh, Lucknow! Our center is a beacon for NIOS Lucknow, offering specialized nios coaching and support for students pursuing NIOS in Lucknow. With experienced educators and personalized guidance, we ensure a nurturing environment for success. Join us to unlock your full academic potential and achieve and qualify for NIOS Exams in Lucknow!
              </p>

              <h3>SS Coaching Indira Nagar Lucknow - Best NIOS Admission Center</h3>
              <p className="why-nios-text">
                SS Coaching Indira Nagar Lucknow: At SS Coaching Indira Nagar, Lucknow, is your premier destination for quality education on the NIOS board. Our NIOS center in Lucknow is dedicated to providing exceptional nios coaching services, including specialized support for NIOS students in Lucknow. Join SS Coaching for personalized guidance, a conducive learning environment, and expert assistance to excel in your academic pursuits.
              </p>

              <h2 className="faq-title mb-2">
                <span className="highlight">Contact Us for NIOS Admission & Inquiries</span>
              </h2>

              <p className="why-nios-text mb-0">
                <b>Reach out to the best NIOS center in Lucknow </b> through our Contact Form for inquiries and nios admissions. Students enrolled at the SS Coaching, NIOS office in Lucknow are encouraged to share their reviews and feedback. Students' academic success begins with SS Coaching? Contact us today!
              </p>

              <a href="tel:9935035316" className="cta-button cta-button1">
                For any help related to admission in NIOS please contact SS Coaching on our Mobile No. +91 9935035316
              </a>
            </div>
          </div>
        </section>


      <ContactFaqs/>


        <div className="footer-park">
          <div className="container">
            <p>
              NIOS admission, NIOS admission 2025-26, National institute of open schooling Kanpur, NIOS Varanasi inquiry, NIOS Bareilly how to reach, An open school for all, NIOS Bulandshahr address, NIOS centre Jhansi, NIOS number to dial, Open school Gonda, National open school contact Basti, Failed student CBSE ISC NIOS Faizabad, All NIOS schools in Uttar Pradesh, NIOS regional center north India, NIOS contact number, Reach NIOS open school, NIOS personal contact, NIOS study center place, NIOS contact details, Contact phone number of NIOS, CBSE open school, NIOS contact mobile number, NIOS toll-free number, NIOS Lucknow contact, Contact for NIOS admission, Help for NIOS admission, NIOS admission, NIOS Lucknow, NIOS exam fees, NIOS institute, NIOS office, NIOS fees, Best NIOS institute, NIOS admission, NIOS classes, Best NIOS coaching in Lucknow, nios lucknow, nios in Lucknow, NIOS lucknow, NIOS classes in lUcknow, NIOS Coaching in Lucknow, Admission in nios lucknow, national institute of open schooling lucknow, national institute of open schooling admission in lucknow, NIOS open schooling lucknow, NIOS Schooling in lucknow, Open nios in lucknow, NIOS Office in Lucknow, NIOS Admission in lucknow, nios centre in Lucknow, nios lucknow, nios lucknow centre, nios registration in lucknow, NIOS Helpline Center, NIOS Helpline Center in Lucknow.
            </p>
          </div>
        </div>

        <Footer />

        <a href="https://wa.link/vwvuqc" target="_blank" rel="noopener noreferrer" className="btn-whatsapp-pulse">
          <FaWhatsapp />
        </a>

        <Popup />
      </section>
    </>
  );
}

// import Hero from "@/components/contacts/Hero";
// import Map from "@/components/contacts/Map";
// import Footer from "@/components/footer/Footer";
// import BranchContactCanvas from "@/components/header/BranchContactCanvas";
// import Header from "@/components/header/Header";
// import Offcanvas from "@/components/header/Offcanvas";
// import CTA3 from "@/components/home/CTA3";
// import Popup from "@/components/home/Popup";
// import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaBus, FaWhatsapp, FaEnvelope   } from "react-icons/fa";


// import Head from "next/head";

// export default function ContactUs() {
//   return (
//     <>
//       <Head>
//         <title>Contact Us – NIOS Admission Support 2026</title>
//         <meta name="description" content="SS Coaching NIOS Center in Lucknow, Provides form filling for admission in NIOS Board (National Institute of Open Schooling) as well as NIOS Coaching Classes, Syllabus and Tuition for 10th (secondary) & 12th (senior secondary) Students. Contact us for all inquiries related to NIOS Board in Lucknow" />
//           <meta
//           name="keywords"
//           content="NIOS exam centre registration, NIOS Study Centre Contact Number, nios head office contact number, nios regional centre list, nios contact number, NIOS Study Centre List, NIOS Coaching in Lucknow, NIOS admission Lucknow,"
//         />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <section className="home-page-area">
//         <Header />
//         <Offcanvas />
//         <Hero />
//                 <BranchContactCanvas/>
        

//         <section className="contacts_details-area">
//           <div className="container">
//             <div className="contacts_details-row">
//               <div>
//                 <img
//                   className="location-pins"
//                   src="/assets/images/contacts/location.svg"
//                 />
//                 <div className="location-card">
//                   <div className="location-details">
//                     <a href="/nios-coaching-hazratganj-lucknow">
//                     <div className="location-title">
//                       SS Coaching <br />
//                       Hazratganj, Lucknow
//                     </div>
//                     <div className="location-text mb-2">
//                       S.S. Coaching, IIIrd Floor, Shree Chamber, Naza Computer
//                       Market, Near Basant Cinema, Hazratganj, Lucknow.
//                     </div>

//                     </a>
//                     <div className="d-flex gap-3">
//                       <div className="c-icons">
//                       <img
//                         src="/assets/images/contacts/call.svg"
//                         alt="Phone icon"
//                         className="contact-icon"
//                       />
//                       <div className="location-text"><a href="tel:09839065533">09839065533</a></div>

                      
//                     </div>

//                     <div className="c-icons">
//                       <img
//                         src="/assets/images/contacts/call.svg"
//                         alt="Phone icon"
//                         className="contact-icon"
//                       />
//                       <div className="location-text"><a href="tel:06387563947">06387563947</a></div>

                      
//                     </div>
//                     </div>

//                     {/* <div className="c-icons">
//                       <img
//                         src="/assets/images/contacts/telephone.svg"
//                         alt="Telephone icon"
//                         className="contact-icon"
//                       />
//                       <div className="location-text">0522-4029757</div>
//                     </div> */}

//                     <div className="c-icons">
//                       <img
//                         src="/assets/images/contacts/email.svg"
//                         alt="Emali icon"
//                         className="contact-icon"
//                       />
//                       <div className="location-text">
//                         contact@sscoaching.in
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <img
//                   className="location-pins"
//                   src="/assets/images/contacts/location.svg"
//                 />
//                 <div className="location-card">
//                   <div className="location-details">
//                     <a href="/nios-coaching-indiranagar-lucknow">

//                     <div className="location-title">
//                       SS Coaching <br />
//                       Indira Nagar, Lucknow
//                     </div>
//                     <div className="location-text mb-2">
//                       3rd Floor, Upstair Rama Sarees, In Bhootnath Mkt,Indira
//                       Nagar,Lucknow
//                     </div>

//                     </a>

//                     <div className="d-flex gap-3">

//                     <div className="c-icons">
//                       <img
//                         src="/assets/images/contacts/call.svg"
//                         alt="Phone icon"
//                         className="contact-icon"
//                       />
//                       <div className="location-text"><a href="tel:09792111121">09792111121</a></div>

//                     </div>


//                        <div className="c-icons">
//                       <img
//                         src="/assets/images/contacts/call.svg"
//                         alt="Phone icon"
//                         className="contact-icon"
//                       />
//                       <div className="location-text"><a href="tel:09956493857">09956493857</a></div>

//                     </div>

//                     </div>

//                     {/* <div className="c-icons">
//                       <img
//                         src="/assets/images/contacts/telephone.svg"
//                         alt="Telephone icon"
//                         className="contact-icon"
//                       />
//                       <div className="location-text">0522-4079190</div>
//                     </div> */}

//                     <div className="c-icons">
//                       <img
//                         src="/assets/images/contacts/email.svg"
//                         alt="Emali icon"
//                         className="contact-icon"
//                       />
//                       <div className="location-text">
//                         contact@sscoaching.in
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <img
//                   className="location-pins"
//                   src="/assets/images/contacts/location.svg"
//                 />
//                 <div className="location-card">
//                   <div className="location-details">

//                     <a href="/nios-coaching-alambagh-lucknow">

//                     <div className="location-title">
//                       SS Coaching <br />
//                       Alambagh, Lucknow
//                     </div>
//                     <div className="location-text mb-2">
//                       U.R.Plaza, Near Phoenix Mall, Beside Acumen Hotel (LDA),
//                       Alambagh,Lucknow
//                     </div>

//                     </a>

//                     <div className="d-flex gap-3">

//                     <div className="c-icons">
//                       <img
//                         src="/assets/images/contacts/call.svg"
//                         alt="Phone icon"
//                         className="contact-icon"
//                       />
//                       <div className="location-text"><a href="tel:09935035316">09935035316</a></div>

//                     </div>


//                       <div className="c-icons">
//                       <img
//                         src="/assets/images/contacts/call.svg"
//                         alt="Phone icon"
//                         className="contact-icon"
//                       />
//                       <div className="location-text"><a href="tel:09236062837">09236062837</a></div>

//                     </div>

//                     </div>
// {/* 
//                     <div className="c-icons">
//                       <img
//                         src="/assets/images/contacts/telephone.svg"
//                         alt="Telephone icon"
//                         className="contact-icon"
//                       />
//                       <div className="location-text">9935035316</div>
//                     </div> */}

//                     <div className="c-icons">
//                       <img
//                         src="/assets/images/contacts/email.svg"
//                         alt="Emali icon"
//                         className="contact-icon"
//                       />
//                       <div className="location-text">
//                         contact@sscoaching.in
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <div className="container">
//            <CTA3 />
//         </div>

//         <section className="details-content-area">
//           <div className="container">
//             <div className="why-nios-section nios-admission-text">
//               <h2 className="faq-title">
//                 SS Coaching has Three Excellent Branches in Lucknow, situated in{" "}
//                 <span className="highlight">Alambagh, Hazratganj,</span>
//                 and <span className="highlight">Indira Nagar</span> area in the
//                 capital city of Lucknow, Uttar Pradesh.
//               </h2>

//               <h3>
//                 Legacy of Excellence - Oldest NIOS Center in Lucknow Since 2001
//               </h3>
//               <p className="why-nios-text">
//                 SS Coaching is the Oldest and most renowned NIOS Center in
//                 Lucknow, Uttar Pradesh State since the year 2001. Since then, SS
//                 Coaching has provided the best NIOS Services in Lucknow to the
//                 failed students to qualify for Secondary and Senior Secondary
//                 Exams in Lucknow.
//               </p>

//               <h3>
//                 SS Coaching Hazratganj Lucknow - NIOS Coaching & Admission
//                 Services
//               </h3>
//               <p className="why-nios-text">
//                 SS Coaching Hazratganj Lucknow: Explore academic excellence at
//                 SS Coaching, the best NIOS Center near Hazratganj in Lucknow.
//                 Our NIOS center is dedicated to providing exceptional coaching
//                 services in Lucknow, including specialized support for NIOS
//                 Lucknow. With experienced educators and a focus on personalized
//                 learning, we ensure a nurturing environment for students aiming
//                 for success. Join us in shaping a brighter future through
//                 quality education.
//               </p>

//               <h3>
//                 SS Coaching Alambagh Lucknow - Trusted NIOS Tuition Center
//               </h3>
//               <p className="why-nios-text">
//                 SS Coaching Alambagh Lucknow: Explore academic excellence at SS
//                 Coaching Alambagh, Lucknow! Our center is a beacon for NIOS
//                 Lucknow, offering specialized nios coaching and support for
//                 students pursuing NIOS in Lucknow. With experienced educators
//                 and personalized guidance, we ensure a nurturing environment for
//                 success. Join us to unlock your full academic potential and
//                 achieve and qualify for NIOS Exams in Lucknow!
//               </p>

//               <h3>
//                 SS Coaching Indira Nagar Lucknow - Best NIOS Admission Center
//               </h3>
//               <p className="why-nios-text">
//                 SS Coaching Indira Nagar Lucknow: At SS Coaching Indira Nagar,
//                 Lucknow, is your premier destination for quality education on
//                 the NIOS board. Our NIOS center in Lucknow is dedicated to
//                 providing exceptional nios coaching services, including
//                 specialized support for NIOS students in Lucknow. Join SS
//                 Coaching for personalized guidance, a conducive learning
//                 environment, and expert assistance to excel in your academic
//                 pursuits.
//               </p>

//               <h2 className="faq-title mb-2">
//                 <span className="highlight ">
//                   Contact Us for NIOS Admission & Inquiries
//                 </span>
//               </h2>

//               <p className="why-nios-text mb-0">
//                 <b>Reach out to the best NIOS center in Lucknow </b> through our
//                 Contact Form for inquiries and nios admissions. Students
//                 enrolled at the SS Coaching, NIOS office in Lucknow are
//                 encouraged to share their reviews and feedback. Students'
//                 academic success begins with SS Coaching? Contact us today!
//               </p>

//               <a href="tel:9935035316" className="cta-button cta-button1">
//                 For any help related to admission in NIOS please contact SS
//                 Coaching on our Mobile No. +91 9935035316
//               </a>
//             </div>
//           </div>
//         </section>

//         <div className="footer-park">
//           <div className="container">
//             <p>
//               NIOS admission, NIOS admission 2025-26, National institute of open
//               schooling Kanpur, NIOS Varanasi inquiry, NIOS Bareilly how to
//               reach, An open school for all, NIOS Bulandshahr address, NIOS
//               centre Jhansi, NIOS number to dial, Open school Gonda, National
//               open school contact Basti, Failed student CBSE ISC NIOS Faizabad,
//               All NIOS schools in Uttar Pradesh, NIOS regional center north
//               India, NIOS contact number, Reach NIOS open school, NIOS personal
//               contact, NIOS study center place, NIOS contact details, Contact
//               phone number of NIOS, CBSE open school, NIOS contact mobile
//               number, NIOS toll-free number, NIOS Lucknow contact, Contact for
//               NIOS admission, Help for NIOS admission, NIOS admission, NIOS
//               Lucknow, NIOS exam fees, NIOS institute, NIOS office, NIOS fees,
//               Best NIOS institute, NIOS admission, NIOS classes, Best NIOS
//               coaching in Lucknow, nios lucknow, nios in Lucknow, NIOS lucknow,
//               NIOS classes in lUcknow, NIOS Coaching in Lucknow, Admission in
//               nios lucknow, national institute of open schooling lucknow,
//               national institute of open schooling admission in lucknow, NIOS
//               open schooling lucknow, NIOS Schooling in lucknow, Open nios in
//               lucknow, NIOS Office in Lucknow, NIOS Admission in lucknow, nios
//               centre in Lucknow, nios lucknow, nios lucknow centre, nios
//               registration in lucknow, NIOS Helpline Center, NIOS Helpline
//               Center in Lucknow.
//             </p>
//           </div>
//         </div>

//         {/* <Map /> */}

//         <Footer />
//         <a
//   href="https://wa.link/vwvuqc"
//   target="_blank"
//   rel="noopener noreferrer"
//   className="btn-whatsapp-pulse"
// >
//   <FaWhatsapp />
// </a>
//         <Popup/>
//       </section>
//     </>
//   );
// }
