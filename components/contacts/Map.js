import React from "react";

export default function Map() {
  return (
    <div className="map-section" style={{ width: "100%", height: "450px" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14238.9019743669!2d80.941199!3d26.848682!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd0a24d82e55%3A0x6bc7906fbe532c42!2sSS%20Coaching%20-%20NIOS%20Admission%20in%20Lucknow%20-%20NIOS%20Lucknow%20Center!5e0!3m2!1sen!2sus!4v1760510392975!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="SS Coaching Map"
      ></iframe>
    </div>
  );
}
