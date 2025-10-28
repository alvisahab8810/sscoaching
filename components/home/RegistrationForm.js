import React from "react";

export default function RegistrationForm() {
  return (
    <div className="form-container">
      <div className="form-header">
        <div className="overlay">
          <h1>
            Registration open!
            <br />
            Limited seats
          </h1>
          <p>fill the form before its too late</p>
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

      <style jsx>{`
        .form-container {
          /* === Sticky positioning === */
          position: -webkit-sticky;
          position: sticky;
          top: 80px; /* adjust to your header height */
          z-index: 100;

          /* === Existing styles === */
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          background: #fff;
        }

        .form-header {
          position: relative;
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

        .form-body {
          display: flex;
          flex-direction: column;
          padding: 16px;
          gap: 12px;
        }

        input {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 12px;
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

        .phone-input input {
          border: none;
          flex: 1;
          padding: 12px;
          outline: none;
        }

        button {
          background: linear-gradient(to right, #6a5cff, #7a5fff);
          color: #fff;
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 15px;
          transition: background 0.3s;
        }

        button:hover {
          background: linear-gradient(to right, #5949ff, #6a5fff);
        }

        @media (max-width: 480px) {
          .form-container {
            width: 100%;
            border-radius: 0;
            position: static; /* disable sticky on mobile */
            top: auto;
          }
        }
      `}</style>
    </div>
  );
}
