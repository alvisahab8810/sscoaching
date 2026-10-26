"use client";
import React from "react";
import Link from "next/link";

const QUICK_INFO = [
  {
    icon: '/assets/icons/group3.png',
    text: (
      <>
        Failed in 9th/11th <br /> pass 10th/12th directly
      </>
    ),
  },
  {
    icon: '/assets/icons/group2.svg',
    text: (
      <>
        Pass 10th/12th in <br /> just 45 days
      </>
    ),
  },
  {
    icon: '/assets/icons/group1.png',
    text: (
      <>
        Pass 10th/12th in <br /> same year
      </>
    ),
  },
];

export default function QuickInfoMobile() {
  return (
    <div className="container">
      <section className="quickinfo-mob desktop-none">
        <div className="quickinfo-mob-panel">
          {QUICK_INFO.map((item, index) => (
            <div className="quickinfo-mob-card" key={index}>
              <img src={item.icon} alt="" aria-hidden="true" />
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <Link href="/onlineforms" className="quickinfo-mob-btn">
          Get admission
        </Link>
      </section>
    </div>
  );
}
