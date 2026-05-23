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
            <span className="highlight">NIOS 2026:</span> A Year of
            Determination, Dreams & Success at SS Coaching
          </h2>

           <div className="nios-container">
                <p className="nios-text">
                     Every success story begins with a courageous decision and at SS
            Coaching, we proudly celebrate the inspiring journeys of our NIOS
            Board students who dared to dream bigger and worked tirelessly to
            achieve their goals.
        These shining stars enrolled in Class 10th and 12th through
            NIOS at SS Coaching “the Best NIOS Coaching in Lucknow and today”,
            they stand as glowing examples of dedication, perseverance, and
            success.
                  <br />
                  {showFull && (
                    <>
                      These shining stars enrolled in Class 10th and 12th through NIOS at SS
                      Coaching “the Best NIOS Coaching in Lucknow and today”, they stand as
                      glowing examples of dedication, perseverance, and success.
                    </>
                  )}
                </p>

                <a href="#" className="read-more" onClick={toggleText}>
                  {showFull ? "Read Less" : "Read More..."}
                </a>
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
          <div className="admission-card">
           

           <img
              src="/assets/images/home/stream1.png"
              title="Our Successful NIOS Students 2026 | SS Coaching"
              alt="Admission 2026 for NIOS streams at SS Coaching Lucknow"
              className="admission-image"
            />
            <div className="admission-content">
               <Link href="/nios-admission/admission-in-nios-stream-1">
              <h3 className="admission-title">
                NIOS
                <br />
                STREAM 1 BLOCK 1<br />
                ADMISSION OPEN
              </h3>
              <div className="admission-bg"></div>
              </Link>
            </div>
          </div>
          <div className="admission-card">

            

            <img
              src="/assets/images/home/stream2.png"
              alt="SS Coaching NIOS successful 10th & 12th students"
              title="Success Stories of NIOS Students at SS Coaching "
              className="admission-image"
            />
            <div className="admission-content">
              <Link href="/nios-admission/admission-in-nios-stream-3&4">
              <h3 className="admission-title">
                NIOS
                <br />
                STREAM 3 & 4<br />
                ADMISSION OPEN
              </h3>
              <div className="admission-bg"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
