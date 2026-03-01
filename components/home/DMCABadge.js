"use client";
import Script from "next/script";

export default function DMCABadge() {
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <a
          href="https://www.dmca.com/Protection/Status.aspx?ID=0e2bc60d-5871-494c-af9f-4e0da196cc1f"
          title="DMCA.com Protection Status"
          className="dmca-badge"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=0e2bc60d-5871-494c-af9f-4e0da196cc1f"
            alt="DMCA.com Protection Status"
          />
        </a>
      </div>

      <Script
        src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}