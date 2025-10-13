import React from "react";

export default function HeroMobile() {
  return (
    <section className="hero-mobile-area desktop-none">
      <div className="hero-mobile">
        <div className="hero-container">
          <img
            src="/assets/images/home/hero-mobile.png"
            alt="Student"
            className="hero-image"
          />

          <div className="hero-overlay">
            <ChecklistItem text="Pass 10th & 12th in same year" />
            <ChecklistItem text="Pass 10th & 12th in 45 Days" />
            <ChecklistItem text="Failed in 9th & 11th, get admission in 10th & 12th" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChecklistItem({ text }) {
  return (
    <div className="checklist-item">
      <img
        src="/assets/images/home/check.svg"
        alt="check"
        className="check-icon"
      />
      <span className="check-text">{text}</span>
    </div>
  );
}
