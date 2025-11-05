import AboutUsHero from "@/components/About/Hero";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Offcanvas from "@/components/header/Offcanvas";
import CTA2 from "@/components/home/CTA2";
import Popup from "@/components/home/Popup";
import QueryForm from "@/components/home/QueryForm";
import StatsSection from "@/components/home/StatsSection";
import StatsSectionMobile from "@/components/home/StatsSectionMobile";
import StepProcess from "@/components/home/StepProcess";
import React from "react";

export default function AboutUs() {
  return (
    <section className="about-us-area">
      <Header />
      <Offcanvas />

      <AboutUsHero />

      <StatsSection />
      <StatsSectionMobile/>

      <QueryForm/>
      

       <section className="process-section ">
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
                    Get expert guidance from our supportive teachers for easy
                    admission.
                  </p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-content">
                  <h3>Start Learning</h3>
                  <p>
                    Begin your classes with flexible study options and prepare
                    confidently for exams.
                  </p>
                </div>
                <div className="step-number">02</div>
              </div>

              <div className="process-step">
                <div className="step-number">03</div>
                <div className="step-content">
                  <h3>Pass with NIOS</h3>
                  <p>
                    Score high, earn a valid government-recognized certificate,
                    and move forward in your career.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="process-images">
            <img
              src="/assets/images/home/steps-process/photo1.svg"
              alt="Student studying"
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
                <h4>50K +</h4>
                <p>Students passed</p>
              </div>
            </div>

            <img
              src="/assets/images/home/steps-process/photo.svg"
              alt="Students in classroom"
              className="process-image process-2"
            
            />
          </div>
        </div>
      </div>
    </section>

      <section className="about-vision-mission">
        <div className="container">
          <div className="nios-content">
            <h2 className="nios-title">
              <span className="highlight">Vision</span> of SS Coaching
            </h2>
            <p className="nios-text">
              SS Coaching's Vision is to acknowledge that higher education has
              greater responsibilities to meet the needs of society both in
              India and abroad. SS Coaching has taken a decade of pioneering
              hard work by the academic community to bring NIOS education under
              one roof. The institute has develop a system of education which
              lays more emphasis on learning than on mere instruction. The move
              to enroll and educate students  with National Institute of Open
              Schooling is an extension of our Inclusive education programme.
              Those children who are not able to cope with the load of the
              regular curriculum in spite of the concessions provided by the
              board for candidates with special needs, are offered the option of
              completing their school education through the NIOS stream. 
              <br />
              <br />
              The NIOS examination is equivalent to X and XII board
              examinations. As there is flexibility in the choice of subjects
              and a time period of 5 years to complete the course as a whole or
              in parts, many children of our school and others are able to
              complete their school education and move ahead.
              <br />
              <br />
              In the past 10 years, around 10,000 students have successfully
              completed their X/XII through our NIOS coching program and we
              apply the vision to get more and more students to be able to get a
              chance and succeed in the open schooling cenario of NIOS. The NIOS
              section of the coachning runs with the help of a small team of our
              dedicated teachers and volunteers. They are indeed 'making a big
              difference' and strengthening the vision and mission of the
              founders of SS Coaching.
            </p>
          </div>

          <CTA2 />

          <div className="nios-content misson-pt">
            <h2 className="nios-title">
              <span className="highlight">Mission</span> of SS Coaching
            </h2>
            <p className="nios-text ">
              Our mission at SS Coaching is to prepare students with learning
              disabilities and failures who are not able to complete education
              because of a number of reasons, to learn from the National
              Institute of Open Schooling (NIOS) curriculum at class IX, X, XI,
              and XII level, and function at their maximum discharge
              <br />
              <br />
              This can only be achieved by well equipped and experienced
              teachers who will use the available and most current, state of the
              art practices in educating the NIOS learners. We all are aware
              about how new NIOS Baoard is to the indian education system, so
              our mission also includes well organised and fully dynamic
              practices of getting student passed from NIOS. In achieving this
              objective it is recognized that these students display varying and
              distinctly different skills and areas of needed development that
              require a comprehensive approach to classroom instruction.
              Students classified as learning disabled typically exhibit a wide
              range of academic and social abilities and needs. And in response,
              teachers will use a wide variety of teaching and evaluation
              strategies in our classrooms to suit and meet those needs
              <br />
              <br />
              An overwhelming philosophy of our program is to pass on to our
              students in a manner that accepts and understands their worth as
              human beings, that respects and upgrades their dignity and status,
              and that reflects to society and other qualified professionals
              their positive attributes, learning potential, and individuality
              and that they also have the valour to compete like others in this
              competing world now of ours.
            </p>
          </div>
        </div>
      </section>

     <div className="container">
      <a href="tel:9935035316" className="cta-button cta-button1">For any help related to admission in NIOS please contact SS Coaching on our Mobile No. +91 9935035316</a>

     </div>


      <div className="footer-park">
        <div className="container">
          <p>
            Education is for every citizen, social need, educated people
            respected, worthy human beings, competing life from an early age,
            remove education barriers, four walls of the school, freedom to
            education, wonderful board, schools understand the importance, open
            schooling system, well-organized institution, education inside
            heart-mind, boards of education in Lucknow, educational websites in
            Lucknow, the present education system in Lucknow, quality of
            education in Lucknow, educational reforms in Lucknow, getting failed
            students passed, vision mission to educate all, NIOS admission, NIOS
            Lucknow, NIOS exam fees, NIOS institute, NIOS office, NIOS fees,
            Best NIOS institute, NIOS admission, NIOS classes, Best NIOS
            coaching in Lucknow
          </p>
        </div>
      </div>

      <Footer />
      <Popup/>
    </section>
  );
}
