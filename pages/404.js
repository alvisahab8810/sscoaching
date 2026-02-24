"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function NotFound() {

  useEffect(() => {
    document.title = "404 - Page Not Found | SS Coaching";
  }, []);

  return (
    <>
      <style jsx>{`
        .wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6d6af5, #61affe, #00cbb8);
          background-size: 300% 300%;
          animation: gradientMove 8s ease infinite;
          padding: 20px;
          text-align: center;
        }

        .card {
          max-width: 650px;
          width: 100%;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          padding: 60px 35px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
          color: #ffffff;
          animation: fadeIn 0.8s ease-in-out;
        }

        .error-code {
          font-size: 130px;
          font-weight: 900;
          margin: 0;
          background: linear-gradient(45deg, #ffffff, #e0ffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: float 3s ease-in-out infinite;
        }

        .title {
          font-size: 30px;
          margin: 20px 0 10px;
          font-weight: 600;
        }

        .description {
          font-size: 16px;
          opacity: 0.95;
          margin-bottom: 35px;
          line-height: 1.6;
        }

        .buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 12px 28px;
          border-radius: 30px;
          font-weight: 600;
          text-decoration: none;
          transition: 0.3s ease;
          display: inline-block;
        }


   
.home-btn {
  display: inline-block;
  padding: 14px 32px;
  border-radius: 40px;
  font-weight: 600;
  background: #fff;
  color: #61affe;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.home-btn:hover {
 background: #61affe;
          border-color: #61affe;
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          color:#fff;
}



        .contact-btn {
          border: 2px solid #ffffff;
          color: #ffffff;
        }

        .contact-btn:hover {
          background: #61affe;
          border-color: #61affe;
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Mobile Responsive */
        @media (max-width: 600px) {
          .error-code {
            font-size: 85px;
          }
          .title {
            font-size: 22px;
          }
          .description {
            font-size: 14px;
          }
          .card {
            padding: 40px 20px;
          }
        }
      `}</style>

      <div className="wrapper">
        <div className="card">
          <h1 className="error-code">404</h1>
          <h2 className="title">Oops! Page Not Found</h2>
          <p className="description">
            The page you are looking for might have been removed,
            had its name changed, or is temporarily unavailable.
            Let’s take you back to safety.
          </p>

        <div className="buttons">
  <Link href="/">
    <span className="home-btn">Go To Homepage</span>
  </Link>

  <Link href="/contact">
    <span className="contact-btn btn">Contact Us</span>
  </Link>
</div>

        </div>
      </div>
    </>
  );
}
