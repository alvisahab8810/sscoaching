import React, { useEffect, useState } from "react";

// Official NIOS portal — every board notification is published here.
const NIOS_SITE_URL = "https://www.nios.ac.in/";

// Shown until the live NIOS list loads, and whenever that scrape is
// unavailable, so the section is never empty.
const FALLBACK_NOTIFICATIONS = [
  {
    text: "Notification and Datesheet for Exams of Secondary and Senior Secondary courses to be held in Oct./Nov. 2026",
    href: "/nios-datesheet",
  },
  {
    text: "Notification regarding Practical Exams of Secondary and Senior Secondary courses for Oct 2026 session",
    href: NIOS_SITE_URL,
  },
  {
    text: "Archival of Vocational Courses",
    href: NIOS_SITE_URL,
  },
];

function isExternal(href) {
  return /^https?:\/\//.test(href);
}

export default function NiosNotifications() {
  const [notifications, setNotifications] = useState(FALLBACK_NOTIFICATIONS);

  // The API serves whatever the last hourly scrape of nios.ac.in stored, so
  // this request never waits on the NIOS servers itself.
  useEffect(() => {
    let active = true;
    fetch("/api/nios-notifications?limit=3")
      .then((r) => r.json())
      .then((d) => {
        if (active && d.success && d.notifications?.length) {
          setNotifications(d.notifications);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="nios-notif-section">
      <div className="container">
        <div className="nios-notif-panel">
          <div className="nios-notif-left">
            <h2 className="nios-notif-title">
              
               Notifications 

               <br />

               from NIOS
            </h2>

            <a
              className="nios-notif-view-all"
              href={NIOS_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View all 
            </a>
          </div>

          <div className="nios-notif-list">
            {notifications.map((item) => (
              <a
                className="nios-notif-item"
                key={item.text}
                href={item.href}
                {...(isExternal(item.href)
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <img
                  src="/assets/icons/nortification.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span>{item.text}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
