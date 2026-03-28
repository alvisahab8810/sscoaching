import AboutUsHero from "@/components/About/Hero";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import CTA2 from "@/components/home/CTA2";
import Popup from "@/components/home/Popup";
import QueryForm from "@/components/home/QueryForm";
import StatsSection from "@/components/home/StatsSection";
import StatsSectionMobile from "@/components/home/StatsSectionMobile";
import React from "react";
import Head from "next/head";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About SS Coaching in Lucknow – Leading NIOS Coaching by Sarvesh Sonkar</title>
        <meta
          name="description"
          content="SS Coaching is a trusted NIOS Coaching in Lucknow, helping students complete 10th & 12th through NIOS. Founded by Sarvesh Sonkar with 25+ years of experience, 100K+ students guided, and 3 branches in Lucknow."
        />
        <meta
          name="keywords"
          content="NIOS Coaching in Lucknow, NIOS admission Lucknow, best NIOS institute Lucknow, NIOS 10th 12th coaching, SS Coaching Lucknow, Sarvesh Sonkar, NIOS center Lucknow, NIOS classes Lucknow, NIOS board Lucknow, failed student help Lucknow, open schooling Lucknow"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="about-us-area">
        <Header />
        <Offcanvas />
        <BranchContactCanvas />

        {/* ── SECTION 1: TOP INTRO ── */}
        <section className="about-intro-section">
          <div className="container">
            <div className="about-intro-content">
              <h1 className="about-intro-title">
                About SS Coaching –{" "}
                <span className="highlight">Leading NIOS Coaching in Lucknow</span>
              </h1>
              <p className="about-intro-text">
                SS Coaching is a trusted name for NIOS Coaching in Lucknow, helping students
                complete their 10th and 12th education through the National Institute of Open
                Schooling (NIOS).
              </p>
              <p className="about-intro-text">
                We specialize in guiding students who have faced academic challenges, failed in
                Class 9th or 11th, or had to discontinue their education. Our goal is simple—to
                give every student a second chance to succeed without losing a year.
              </p>
              <p className="about-intro-text">
                With expert support for NIOS admission in Lucknow, experienced faculty, and a
                structured learning approach, we ensure that students not only pass but gain
                confidence in their abilities.
              </p>
              <p className="about-intro-text">
                At SS Coaching, we don't just teach—we guide, support, and help students build
                a better future.
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: DIRECTOR MESSAGE (Hero Component) ── */}
        <AboutUsHero />

        {/* ── SECTION 3: STATS ── */}
        <StatsSection />
        <StatsSectionMobile />

        {/* ── SECTION 4: QUERY FORM ── */}
        <QueryForm />

        {/* ── SECTION 5 (old 4): 3-STEP PROCESS ── */}
        <section className="process-section">
          <div className="container">
            <div className="process-container">
              <div className="process-content">
                <h2 className="process-title">
                  Our Simple <span className="highlight">3-Step Process</span>
                </h2>
                <div className="process-steps">
                  <div className="process-step">
                    <div className="step-number">01</div>
                    <div className="step-content">
                      <h3>Free Counselling</h3>
                      <p>
                        Get expert guidance for <b> NIOS admission in Lucknow.</b> We help you choose the right subjects and understand the complete process.

                      </p>
                    </div>
                  </div>

                  <div className="process-step">
                    <div className="step-content">
                      <h3>Start Learning</h3>
                      <p>
                        Join structured classes with flexible learning options designed especially for NIOS students.
                      </p>
                    </div>
                    <div className="step-number">02</div>
                  </div>

                  <div className="process-step">
                    <div className="step-number">03</div>
                    <div className="step-content">
                      <h3>Pass with NIOS</h3>
                      <p>
                         Prepare confidently, pass your exams, and earn a valid government-recognized certificate.

                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="process-images">
                <img
                  src="/assets/images/home/steps-process/photo1.svg"
                  alt="Student studying at SS Coaching Lucknow"
                  className="process-image process-1"
                />
                <div className="process-stat">
                  <div className="stat-avatars">
                    <img
                      src="/assets/images/home/steps-process/avatar.svg"
                      alt="Student 1"
                      className="stat-avatar"
                    />
                    <img
                      src="/assets/images/home/steps-process/avatar1.svg"
                      alt="Student 2"
                      className="stat-avatar"
                    />
                    <img
                      src="/assets/images/home/steps-process/avatar2.svg"
                      alt="Student 3"
                      className="stat-avatar"
                    />
                  </div>
                  <div className="stat-text">
                    <h4>100K +</h4>
                    <p>Students Guided</p>
                  </div>
                </div>
                <img
                  src="/assets/images/home/steps-process/photo.svg"
                  alt="Students in classroom at SS Coaching"
                  className="process-image process-2"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: VISION + MISSION ── */}
        <section className="about-vision-mission">
          <div className="container">

            {/* VISION */}
            <div className="nios-content">
              <h2 className="nios-title">
                <span className="highlight">Vision</span> of SS Coaching
              </h2>
              <p className="nios-text">
                Our vision is to become the most trusted <b>NIOS Coaching in Lucknow</b>, where every
                student—regardless of past challenges—gets the opportunity to succeed.
              </p>
              <p className="nios-text">
                We aim to create a supportive learning environment that focuses on confidence, practical knowledge, and long-term success. Through NIOS education, we want to ensure that no student feels left behind.
              </p>
              {/* <p className="nios-text">
                SS Coaching has taken more than a decade of pioneering hard work by the academic
                community to bring NIOS education under one roof. The institute has developed a
                system of education that lays more emphasis on learning than on mere instruction.
                The move to enroll and educate students with the National Institute of Open
                Schooling is an extension of our Inclusive Education Programme.
              </p>
              <p className="nios-text">
                Those students who are not able to cope with the regular curriculum are offered
                the option of completing their school education through the NIOS stream. The NIOS
                examination is equivalent to Class X and XII board examinations. With flexibility
                in subject choice and a time period of 5 years to complete the course, many
                students are able to move ahead successfully.
              </p> */}
            </div>

            {/* CTA BANNER */}
            <CTA2 />

            {/* MISSION */}
            <div className="nios-content misson-pt">
              <h2 className="nios-title">
                <span className="highlight">Mission</span> of SS Coaching
              </h2>
              <p className="nios-text">
                Our mission is to provide accessible and quality education to students who are
                unable to continue in traditional schooling.
              </p>
              <p className="nios-text">
                Through our NIOS Coaching in Lucknow, we aim to:
              </p>
              <ul className="nios-mission-list">
                <li>Help students complete 10th &amp; 12th without losing a year</li>
                <li>Support students who failed or dropped out</li>
                <li>Provide expert guidance and structured learning</li>
                <li>Build confidence and academic growth</li>
              </ul>
              <p className="nios-text">
               We are committed to helping every student achieve their full potential.

              </p>
              {/* <p className="nios-text">
                An overarching philosophy of our programme is to empower our students in a
                manner that respects their dignity, recognizes their worth as individuals, and
                reflects their positive attributes, learning potential, and individuality—so
                that they, too, can compete with confidence in today's world.
              </p> */}
            </div>
          </div>
        </section>

        {/* ── SECTION 7: CONTACT CTA ── */}
        <div className="container">
          <a href="tel:9935035316" className="cta-button cta-button1">
            For any help related to NIOS admission in Lucknow, contact SS Coaching: +91 9935035316
          </a>
        </div>

        {/* ── SECTION 8: BOTTOM SEO CONTENT ── */}
        <div className="footer-park">
          <div className="container">
            <p>
              SS Coaching is one of the most reliable institutes for <b>NIOS Coaching in Lucknow</b>,
              offering complete support for NIOS admission, subject selection, and exam
              preparation. If you are searching for a trusted NIOS center in Lucknow, SS
              Coaching provides experienced faculty, flexible study options, and a proven track
              record of helping students succeed in their 10th and 12th education. NIOS
              admission Lucknow, NIOS institute Lucknow, NIOS exam fees, best NIOS coaching in
              Lucknow, NIOS classes, NIOS 10th 12th Lucknow, open schooling Lucknow, NIOS
              office Lucknow, NIOS board, failed student help, second chance education,
              distance education Lucknow.
            </p>
          </div>
        </div>

        <Footer />
        <Popup />
      </section>
    </>
  );
}




// import AboutUsHero from "@/components/About/Hero";
// import Footer from "@/components/footer/Footer";
// import Header from "@/components/header/Header";
// import Offcanvas from "@/components/header/Offcanvas";
// import CTA2 from "@/components/home/CTA2";
// import Popup from "@/components/home/Popup";
// import QueryForm from "@/components/home/QueryForm";
// import StatsSection from "@/components/home/StatsSection";
// import StatsSectionMobile from "@/components/home/StatsSectionMobile";
// import StepProcess from "@/components/home/StepProcess";
// import React from "react";
// import Head from "next/head";
// import BranchContactCanvas from "@/components/header/BranchContactCanvas";

// export default function AboutUs() {
//   return (

//     <>
//       <Head>
//         <title>
//            About SS Coaching in Lucknow founded by Mr. Sarvesh Sonkar
//         </title>
//         <meta
//           name="description"
//           content="S.S. Coaching is private, non-traditional, non-sectarian, alternative educational institution founded by Mr. Sarvesh Sonkar. The institute has always maintained global standards of education with understanding of all job sectors requirement"
//         />
//         <meta
//           name="keywords"
//           content="About the NIOS board, about the SS coaching Lucknow, NIOS board, best solution for failed student, one goal, sure success, success for n.i.o.s, succeed in exams, help with board exam coaching, success ratio, toppers coaching institute of national institute of open and distance schooling, NIOS office articles, education for all in India, challenging future for unsuccessful students, open distance education pioneers, experienced and old coaching of NIOS, successful NIOS institute, excellent staff, brilliant facilities, standard techniques of teaching, well-disciplined, nios lucknow, nios coaching, nios classes, nios online classes, best nios coaching in lucknow, best nios institute in lko, nios lko, Nios admission, Nios lucknow, Nios exam fees, Nios institute, Nios office,Nios lko, Nios fees, Best nios institute, Nios admission, Nios classes, Best nios coaching in Lucknow, Nios."
//         />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//      <section className="about-us-area">
//       <Header />
//       <Offcanvas />
//               <BranchContactCanvas/>
      

//       <AboutUsHero />

//       <StatsSection />
//       <StatsSectionMobile/>

//       <QueryForm/>
      

//        <section className="process-section ">
//       <div className="container">
//         <div className="process-container">
//           <div className="process-content">
//             <h2 className="process-title">
//               Our Simple <span className="highlight">3-Step Process</span>
//             </h2>
//             <div className="process-steps">
//               <div className="process-step">
//                 <div className="step-number">01</div>
//                 <div className="step-content">
//                   <h3>Free Counselling</h3>
//                   <p>
//                     Get expert guidance from our supportive teachers for easy
//                     admission.
//                   </p>
//                 </div>
//               </div>

//               <div className="process-step">
//                 <div className="step-content">
//                   <h3>Start Learning</h3>
//                   <p>
//                     Begin your classes with flexible study options and prepare
//                     confidently for exams.
//                   </p>
//                 </div>
//                 <div className="step-number">02</div>
//               </div>

//               <div className="process-step">
//                 <div className="step-number">03</div>
//                 <div className="step-content">
//                   <h3>Pass with NIOS</h3>
//                   <p>
//                     Score high, earn a valid government-recognized certificate,
//                     and move forward in your career.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="process-images">
//             <img
//               src="/assets/images/home/steps-process/photo1.svg"
//               alt="Student studying"
//               className="process-image process-1"
              
//             />

              

//             <div className="process-stat">
//               <div className="stat-avatars">
//                 <img
//                   src="/assets/images/home/steps-process/avatar.svg"
//                   alt="Student 1"
//                   className="stat-avatar"
//                 />
//                 <img
//                   src="/assets/images/home/steps-process/avatar1.svg"
//                   alt="Student 2"
//                   className="stat-avatar"
//                 />
//                 <img
//                   src="/assets/images/home/steps-process/avatar2.svg"
//                   alt="Student 3"
//                   className="stat-avatar"
//                 />
//               </div>
//               <div className="stat-text">
//                 <h4>50K +</h4>
//                 <p>Students passed</p>
//               </div>
//             </div>

//             <img
//               src="/assets/images/home/steps-process/photo.svg"
//               alt="Students in classroom"
//               className="process-image process-2"
            
//             />
//           </div>
//         </div>
//       </div>
//     </section>

//       <section className="about-vision-mission">
//         <div className="container">
//           <div className="nios-content">
//             <h2 className="nios-title">
//               <span className="highlight">Vision</span> of SS Coaching
//             </h2>
//             <p className="nios-text">
//               SS Coaching's Vision is to acknowledge that higher education has
//               greater responsibilities to meet the needs of society both in
//               India and abroad. SS Coaching has taken a decade of pioneering
//               hard work by the academic community to bring NIOS education under
//               one roof. The institute has develop a system of education which
//               lays more emphasis on learning than on mere instruction. The move
//               to enroll and educate students  with National Institute of Open
//               Schooling is an extension of our Inclusive education programme.
//               Those children who are not able to cope with the load of the
//               regular curriculum in spite of the concessions provided by the
//               board for candidates with special needs, are offered the option of
//               completing their school education through the NIOS stream. 
//               <br />
//               <br />
//               The NIOS examination is equivalent to X and XII board
//               examinations. As there is flexibility in the choice of subjects
//               and a time period of 5 years to complete the course as a whole or
//               in parts, many children of our school and others are able to
//               complete their school education and move ahead.
//               <br />
//               <br />
//               In the past 10 years, around 10,000 students have successfully
//               completed their X/XII through our NIOS coching program and we
//               apply the vision to get more and more students to be able to get a
//               chance and succeed in the open schooling cenario of NIOS. The NIOS
//               section of the coachning runs with the help of a small team of our
//               dedicated teachers and volunteers. They are indeed 'making a big
//               difference' and strengthening the vision and mission of the
//               founders of SS Coaching.
//             </p>
//           </div>

//           <CTA2 />

//           <div className="nios-content misson-pt">
//             <h2 className="nios-title">
//               <span className="highlight">Mission</span> of SS Coaching
//             </h2>
//             <p className="nios-text ">
//               Our mission at SS Coaching is to prepare students with learning
//               disabilities and failures who are not able to complete education
//               because of a number of reasons, to learn from the National
//               Institute of Open Schooling (NIOS) curriculum at class IX, X, XI,
//               and XII level, and function at their maximum discharge
//               <br />
//               <br />
//               This can only be achieved by well equipped and experienced
//               teachers who will use the available and most current, state of the
//               art practices in educating the NIOS learners. We all are aware
//               about how new NIOS Baoard is to the indian education system, so
//               our mission also includes well organised and fully dynamic
//               practices of getting student passed from NIOS. In achieving this
//               objective it is recognized that these students display varying and
//               distinctly different skills and areas of needed development that
//               require a comprehensive approach to classroom instruction.
//               Students classified as learning disabled typically exhibit a wide
//               range of academic and social abilities and needs. And in response,
//               teachers will use a wide variety of teaching and evaluation
//               strategies in our classrooms to suit and meet those needs
//               <br />
//               <br />
//               An overwhelming philosophy of our program is to pass on to our
//               students in a manner that accepts and understands their worth as
//               human beings, that respects and upgrades their dignity and status,
//               and that reflects to society and other qualified professionals
//               their positive attributes, learning potential, and individuality
//               and that they also have the valour to compete like others in this
//               competing world now of ours.
//             </p>
//           </div>
//         </div>
//       </section>

//      <div className="container">
//       <a href="tel:9935035316" className="cta-button cta-button1">For any help related to admission in NIOS please contact SS Coaching on our Mobile No. +91 9935035316</a>

//      </div>


//       <div className="footer-park">
//         <div className="container">
//           <p>
//             Education is for every citizen, social need, educated people
//             respected, worthy human beings, competing life from an early age,
//             remove education barriers, four walls of the school, freedom to
//             education, wonderful board, schools understand the importance, open
//             schooling system, well-organized institution, education inside
//             heart-mind, boards of education in Lucknow, educational websites in
//             Lucknow, the present education system in Lucknow, quality of
//             education in Lucknow, educational reforms in Lucknow, getting failed
//             students passed, vision mission to educate all, NIOS admission, NIOS
//             Lucknow, NIOS exam fees, NIOS institute, NIOS office, NIOS fees,
//             Best NIOS institute, NIOS admission, NIOS classes, Best NIOS
//             coaching in Lucknow
//           </p>
//         </div>
//       </div>

//       <Footer />
//       <Popup/>
//      </section>
//     </>
//   );
// }
