import React from "react";
import { useState } from "react";
import Link from "next/link";
export default function NIOSInfo() {

    const [showFull, setShowFull] = useState(false);

  const toggleText = (e) => {
    e.preventDefault();
    setShowFull((prev) => !prev);
  };
  return (
    <section className="nios-info">
      <div className="container">
        <div className="nios-content">
          <h2 className="nios-title">
             {/* <span className="highlight">NIOS 2026:</span> */}
           <span className="highlight"> Your Success Story </span> Starts at the Best NIOS Coaching in Lucknow

          </h2>

           <div className="nios-container">
                <p className="nios-text">
                     SS Coaching has been guiding students toward academic success for years and is proudly known as the
                     <b> Best NIOS Coaching in Lucknow.</b> With experienced faculty, personalized mentoring, and a result-focused approach, we help students successfully complete their 10th and 12th through NIOS. From Stream 1 and Stream 2 to Stream 3 and Stream 4 admissions, our team provides complete support for admission, 
                     preparation, and career guidance. Thousands of students have transformed their future with SS Coaching, making it a trusted destination for quality NIOS education and success in 2026. 

                  {/* <br />
                  {showFull && (
                    <>
                      These shining stars enrolled in Class 10th and 12th through NIOS at SS
                      Coaching “the Best NIOS Coaching in Lucknow and today”, they stand as
                      glowing examples of dedication, perseverance, and success.
                    </>
                  )} */}
                </p>

                {/* <a href="#" className="read-more" onClick={toggleText}>
                  {showFull ? "Read Less" : "Read More..."}
                </a> */}
              </div>

          {/* <p className="nios-text">
            Every success story begins with a courageous decision and at SS
            Coaching, we proudly celebrate the inspiring journeys of our NIOS
            Board students who dared to dream bigger and worked tirelessly to
            achieve their goals.
            <br />These shining stars enrolled in Class 10th and 12th through
            NIOS at SS Coaching “the Best NIOS Coaching in Lucknow and today”,
            they stand as glowing examples of dedication, perseverance, and
            success.
          </p>

          <a href="#" className="read-more">
            Read More...
          </a> */}
        </div>


       
        <div className="admission-cards">
           <Link href="/nios-admission/admission-in-nios-stream-1">
          <div className="admission-card">
           

           <img
              src="/assets/images/home/stream1.png"
              title="Our Successful NIOS Students 2026 | SS Coaching"
              alt="Admission 2026 for NIOS streams at SS Coaching Lucknow"
              className="admission-image"
            />
            <div className="admission-content">
               
              <h3 className="admission-title">
                NIOS
                <br />
                STREAM 1 BLOCK 1<br />
                ADMISSION OPEN
              </h3>
              <div className="admission-bg"></div>
            </div>
          </div>
          </Link>


              <Link href="/nios-admission/admission-in-nios-stream-2">

          <div className="admission-card">

            

            <img
              src="/assets/images/home/steps-process/photo1.svg"
              alt="SS Coaching NIOS successful 10th & 12th students"
              title="Success Stories of NIOS Students at SS Coaching "
              className="admission-image"
            />
            <div className="admission-content">
              <h3 className="admission-title">
                NIOS
                <br />
                STREAM 2<br />
                ADMISSION OPEN
              </h3>
              <div className="admission-bg"></div>
             
            </div>
          </div>


          </Link>


        <Link href="/nios-admission/admission-in-nios-stream-3&4">

            <div className="admission-card">

            

            <img
              src="/assets/images/home/stream2.png"
              alt="SS Coaching NIOS successful 10th & 12th students"
              title="Success Stories of NIOS Students at SS Coaching "
              className="admission-image"
            />
            <div className="admission-content">
          
              <h3 className="admission-title">
                NIOS
                <br />
                STREAM 3 & 4<br />
                ADMISSION OPEN
              </h3>
              <div className="admission-bg"></div>
            </div>

          </div>
            </Link>

        </div>

      </div>
    </section>
  );
}
