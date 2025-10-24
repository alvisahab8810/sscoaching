import React from "react";

export default function NIOSInfo() {
  return (
    <section className="nios-info">
      <div className="container">
        <div className="nios-content">
          <h2 className="nios-title">
            <span className="highlight">NIOS 2025:</span> A Year of
            Determination, Dreams & Success at SS Coaching
          </h2>

          <p className="nios-text">
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
          </a>
        </div>
        <div className="admission-cards">
          <div className="admission-card">
            <img
              src="/assets/images/home/stream1.png"
              alt="NIOS Stream 1 Block 1"
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
          <div className="admission-card">
            <img
              src="/assets/images/home/stream2.png"
              alt="NIOS Stream 3 & 4"
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
        </div>
      </div>
    </section>
  );
}
