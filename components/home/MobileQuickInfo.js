"use client";
import React from "react";

export default function MobileQuickInfo() {
  return (
    <div className="container">
        <section className="ss-mobile-quickinfo desktop-none">
      <div className="ss-mobile-grid">
        {/* Card 1 */}
        <div className="ss-mobile-card">
           <img className="ss-icon" src="/assets/icons/group1.svg" alt="icon" />
          <h4>Save Year</h4>
          <p>
            Pass 10th/12th <br /> in same year
          </p>
        </div>

        {/* Card 2 */}
        <div className="ss-mobile-card">
        <img className="ss-icon" src="/assets/icons/group2.svg" alt="icon" />
          <h4>45-Day Pass</h4>
          <p>
            Pass 10th/12th <br /> in just 45 days
          </p>
        </div>

        {/* Card 3 */}
        <div className="ss-mobile-card">
           <img className="ss-icon" src="/assets/icons/group3.svg" alt="icon" />

          <h4>Direct Entry</h4>
          <p>
            Failed in 9th/11th <br /> pass 10th/12th directly
          </p>
        </div>
      </div>

      <button className="ss-gradient-btn cta-btn-2nd">
  Get admission
</button>

      <style jsx>{`
        /* ===== MOBILE ONLY ===== */

     .ss-gradient-btn{
    color: #fff;
    cursor: pointer;
    white-space: nowrap;
    // background: linear-gradient(90deg, #6f6cf6 0%, #4441e5 100%);
    background: linear-gradient(0deg, #6f6cf6 0%, #4441e5 100%);
    border-radius: 999px;
    outline: none;
    height: 48px;
    border: 1px solid #A7A5FF;
    padding: 14px 48px;
    width: 100%;
    font-size: 16px;
    line-height: 100%;
    margin-top: 20px;
        

    font-weight: bold;
}
        .desktop-none {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-none {
            display: block;
          }
        }

        /* ===== UNIQUE PARENT ===== */
        .ss-mobile-quickinfo {
          padding: 12px 0;
          padding-top:20px!important;
        }

        /* ===== GRID ===== */
        .ss-mobile-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 5px;
        }

        /* ===== CARD ===== */
        .ss-mobile-card {
         text-align: center;
    background: #fff;
    border: 1px solid #b5baf3;
    box-shadow: 2px 2px 3px rgba(176, 182, 251, 0.3);
    border-radius: 5px;
    padding: 12px 8px 14px;
    display: flex;
    flex-flow: column;
    // justify-content: center;
    align-items: center;
        }

        .ss-mobile-card img {
          width: 28px;
          height: 28px;
          margin-bottom: 8px;
          object-fit: contain;
        }

        .ss-mobile-card h4 {
                color: #654de5;
    margin-bottom: 4px;
    font-size: 14px;
    line-height:115%;
    font-weight: bold;
    font-family: "Outfit", sans-serif !important;

        }

        .ss-mobile-card p {
          font-size: 12px;
          line-height: 120%;
          font-weight:500;
          color: #343471;
    font-family: "Outfit", sans-serif !important;

          margin: 0;
        }
      `}</style>
    </section>
    </div>
  );
}
