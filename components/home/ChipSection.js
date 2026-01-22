// import React from "react";

// export default function ChipSection() {
//   return (
//     <>
//       <section className="chip-section ">
//         <div className="container">
//           <div className="chip-container">


//              <div className="chip-item">
//                 <img src="/assets/icons/arrow.svg" alt="SS Coacning pass 10th & 12th"></img> 
//                 Pass 10th & 12th in 45 Days</div>
//             <div className="chip-item"><img src="/assets/icons/arrow.svg" alt="SS Coacning pass 10th & 12th"></img> Pass 10th & 12th in same year</div>
          
           


//                   <div className="chip-item">
//                 <img src="/assets/icons/arrow.svg" alt="SS Coacning pass 10th & 12th"></img> 
//               Failed in 9th & 11th, get admission in 10th & 12th
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }




"use client";
import React from "react";

export default function ChipSection() {
  return (
   <div className="mobile-none">
    <div className="container">
     <div className="ss-feature-cards">
      {/* Card 1 */}
      <div className="ss-card ss-purple">
        <div className="ss-card-d-flex">
          <img className="ss-icon" src="/assets/icons/group1.svg" alt="icon" />
        <h3>
          Pass 10th/12th <br /> in same year
        </h3>
        </div>
        <button className="cta-btn-2nd">Get admission</button>
      </div>

      {/* Card 2 */}
      <div className="ss-card ss-blue">
        {/* <img className="ss-icon" src="" alt="icon" /> */}

        <div className="ss-card-d-flex">

          <img className="ss-icon" src="/assets/icons/group2.svg" alt="icon" />

        <h3>
          Pass 10th/12th <br /> in just 45 days
          {/* Failed in 9th/11th <br /> pass 10th/12th */}
        </h3>
        </div>
        <button className="cta-btn-2nd">Get admission</button>
      </div>

      {/* Card 3 */}
      <div className="ss-card ss-green">

        <div className="ss-card-d-flex">

          <img className="ss-icon" src="/assets/icons/group3.svg" alt="icon" />
        
        <h3>
          {/* Pass 10th/12th <br /> in just 45 days */}
          Failed in 9th/11th <br /> pass 10th/12th directly

        </h3>
        </div>
        <button className="cta-btn-2nd">Get admission</button>
      </div>

      <style jsx>{`
        /* ===== UNIQUE PARENT ===== */

        .ss-card-d-flex{
        display:flex;
        gap: 20px;
        align-items:center;
         margin-bottom: 22px;

        }
        .ss-feature-cards {
          display: flex;
          gap: 20px;
          padding: 20px 0;
        }

        /* ===== CARD BASE ===== */
        .ss-feature-cards .ss-card {
          flex: 1;
          border-radius: 12px;
          padding: 24px 28px 26px;
          color: #ffffff;
          font-family: "Inter", sans-serif;
        }

        /* ===== ICON PLACEHOLDER ===== */
        .ss-feature-cards .ss-icon {
          // width: auto;
          height: 47px;
          // margin-bottom: 14px;
          object-fit: contain;
        }

        /* ===== TEXT ===== */
        .ss-feature-cards h3 {
          font-size: 25px;
    font-weight: 700;
    line-height: 28px;
    // font-family: 'Inter' !important;
    margin-bottom: 0 !important;
        }

        /* ===== BUTTON ===== */
        .ss-feature-cards button {
          width: 100%;
          height: 45px;
          background: #ffffff;
          border: none;
          border-radius: 12px;
          font-size: 20px;
          font-weight: 600;
          cursor: pointer;
          // box-shadow: 0px 6px 0px rgba(0, 0, 0, 0.18);

          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .ss-feature-cards button:active {
          transform: translateY(2px);
          box-shadow: 0px 3px 0px rgba(0, 0, 0, 0.18);
        }

        /* ===== COLORS ===== */
        .ss-feature-cards .ss-purple {
          background: #6D6AF5;
        }
        .ss-feature-cards .ss-purple button {
          color: #6D6AF5;
              color: #6d6af5;
          border:1px solid #6d6af5;
          box-shadow: 3px 3px 8.1px rgba(21, 100, 229, 0.42);

        }

        .ss-feature-cards .ss-blue {
          background: #61AFFE;
        }
        .ss-feature-cards .ss-blue button {
          color: #0088FF;
          border:1px solid #0088FF;
          box-shadow: 3px 3px 8.1px #62826177;

        }

        .ss-feature-cards .ss-green {
          background: #00CBB8;
        }
        .ss-feature-cards .ss-green button {
          color: #11B3A3;
          border:1px solid #11B3A3;
          box-shadow: 3px 3px 8.1px #af370083;


         
          
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .ss-feature-cards {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
   </div>
   </div>
  );
}
