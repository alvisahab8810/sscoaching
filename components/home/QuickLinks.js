import React from "react";

export default function QuickLinks() {
  return (
    <section className="quick-links">
      <div className="container">
        <h2 className="quick-title">Quick links</h2>
        <div style={{ display: "flex", gap: "80px" }}>
          <div className="expandable-list" style={{ width: "48%" }}>
            <div className="expand-item">
              <div className="expand-header stream1">
                <div className="expand-text">IOS Admission in Stream 1</div>
                <div className="expand-icon">
                  <img
                    src="/assets/icons/link-arrow.svg"
                    alt="Expand"
                    style={{ width: "28px", height: "28px" }}
                  />
                </div>
              </div>
            </div>
            <div className="expand-item">
              <div className="expand-header branch1">
                <div className="expand-text">Hazratganj Branch, Lucknow</div>
                <div className="expand-icon">
                  <img
                    src="/assets/icons/link-arrow.svg"
                    alt="Expand"
                    style={{ width: "28px", height: "28px" }}
                  />
                </div>
              </div>
            </div>
            <div className="expand-item">
              <div className="expand-header branch2">
                <div className="expand-text">Alambagh Branch, Lucknow</div>
                <div className="expand-icon collapsed">
                  <img
                    src="/assets/icons/link-arrow.svg"
                    alt="Collapse"
                   
                  />
                </div>
              </div>
            </div>
            <div className="expand-item">
              <div className="expand-header contact">
                <div className="expand-text">Contact SS Coaching Lucknow</div>
                <div className="expand-icon">
                  <img
                    src="/assets/icons/link-arrow.svg"
                    alt="Expand"
                    style={{ width: "28px", height: "28px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="expandable-list" style={{ width: "48%" }}>
            <div className="expand-item">
              <div className="expand-header stream34">
                <div className="expand-text">NIOS Admission in Stream 3 & 4</div>
                <div className="expand-icon">
                  <img
                    src="/assets/icons/link-arrow.svg"
                    alt="Expand"
                    style={{ width: "28px", height: "28px" }}
                  />
                </div>
              </div>
            </div>
            <div className="expand-item">
              <div className="expand-header branch3">
                <div className="expand-text">Indranagar Branch, Lucknow</div>
                <div className="expand-icon">
                  <img
                    src="/assets/icons/link-arrow.svg"
                    alt="Expand"
                    style={{ width: "28px", height: "28px" }}
                  />
                </div>
              </div>
            </div>
            <div className="expand-item">
              <div className="expand-header message">
                <div className="expand-text">Directors Message</div>
                <div className="expand-icon collapsed">
                  <img
                    src="/assets/icons/link-arrow.svg"
                    alt="Collapse"
                   
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
