"use client";
import React, { useEffect, useState } from "react";

export default function Popup() {
  const [showPopup, setShowPopup] = useState(false);

  const handleClose = () => setShowPopup(false);
  const handleOpen = () => setShowPopup(true);

  // 👇 1️⃣ Auto open on page load (after 1s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 👇 2️⃣ Open when clicking any ".cta-btn"
  useEffect(() => {
    const buttons = document.querySelectorAll(".cta-btn");
    const openHandler = (e) => {
      e.preventDefault();
      setShowPopup(true);
    };

    buttons.forEach((btn) => btn.addEventListener("click", openHandler));
    return () => {
      buttons.forEach((btn) => btn.removeEventListener("click", openHandler));
    };
  }, []);

  return (
    <>
      {/* Popup Overlay */}
      {showPopup && (
        <div className="popup-overlay" onClick={handleClose}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={handleClose}>
              ×
            </button>

            {/* Your existing form content */}
            <div className="form-container">
              <div className="form-header">
                <div className="overlay">
                  <h1>
                    Registration open!
                    <br />
                    Limited seats
                  </h1>
                  <p>Fill the form before it’s too late</p>
                </div>
              </div>

              <form className="form-body">
                <input type="text" placeholder="Full name" />
                <input type="email" placeholder="Email" />

                <div className="phone-input">
                  <input type="tel" placeholder="Phone No." />
                </div>

                <input type="text" placeholder="What are you looking for?" />
                <input type="text" placeholder="City" />

                <button type="submit">SUBMIT</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }

        .popup-content {
          position: relative;
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
          animation: slideUp 0.3s ease;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 24px;
          font-weight: bold;
          cursor: pointer;
          color: #ffffffff;
          z-index: 10;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .form-container {
          border-radius: 10px;
          overflow: hidden;
          background: #fff;
        }

        .form-header {
          background-image: url("/assets/images/cta.png");
          background-size: cover;
          background-position: center;
          height: 180px;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
        }

        .overlay {
          color: #fff;
          background: rgba(0, 0, 0, 0.4);
          width: 100%;
          padding: 16px;
          height: 100%;
          display: flex;
          flex-flow: column;
          justify-content: center;
        }

        .form-body {
          display: flex;
          flex-direction: column;
          padding: 16px;
          gap: 12px;
        }

        input {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 10px;
          font-size: 14px;
          width: 100%;
          outline: none;
          transition: border 0.2s;
        }

        input:focus {
          border-color: #7a5fff;
        }

        .phone-input {
          display: flex;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
        }

        .overlay h1 {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }

        .overlay p {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
        }

        button[type="submit"] {
          background: linear-gradient(to right, #6a5cff, #7a5fff);
          color: #fff;
          border: none;
          padding: 10px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 15px;
          transition: background 0.3s;
        }

        button[type="submit"]:hover {
          background: linear-gradient(to right, #5949ff, #6a5fff);
        }
      `}</style>
    </>
  );
}
