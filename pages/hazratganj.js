



"use client";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Popup from "@/components/home/Popup";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaBus, FaWhatsapp, FaEnvelope   } from "react-icons/fa";

import { useState } from "react";
import StatsSectionMobile from "@/components/home/StatsSectionMobile";
import StatsSection from "@/components/home/StatsSection";
import StudentSuccess from "@/components/home/StudentSuccess";
import GoogleReview from "@/components/home/GoogleReview";
import Offcanvas from "@/components/header/Offcanvas";
import BranchContactCanvas from "@/components/header/BranchContactCanvas";
import Hero from "@/components/home/Hero";
import HeroMobile from "@/components/home/HeroMobile";
import ChipSection from "@/components/home/ChipSection";
import MobileQuickInfo from "@/components/home/MobileQuickInfo";



  const faqs = [
    {
      q: "Is NIOS certificate valid for college admissions?",
      a: "Yes! NIOS is fully recognised by the Government of India and is equivalent to CBSE. It is accepted by all universities, colleges, and government job applications across India."
    },
    {
      q: "Can I pass 12th in the same year after failing UP Board?",
      a: "Absolutely. Through NIOS Stream 2, students who failed CBSE, ICSE, or UP Board can pass in the same academic year. Our team handles everything for you."
    },
    {
      q: "What is the On-Demand Exam and how fast can I pass?",
      a: "NIOS On-Demand Examination (ODES) lets you appear throughout the year. With our focused coaching, students regularly pass in 45–60 days from the date of admission."
    },
    {
      q: "Is NIOS suitable for JEE / NEET aspirants?",
      a: "Yes — NIOS is the most popular board choice because there is no mandatory attendance. You can prepare for your entrance exam while your 12th board is on track."
    },
    {
      q: "What documents are needed for NIOS admission?",
      a: "Typically: Aadhar Card, previous school marksheet/TC, passport-size photo, and address proof. Our staff guides you through exact requirements in a free counselling session."
    },
    {
      q: "Is there a free counselling session before enrolling?",
      a: "Yes! Walk in or call us for a completely free, no-obligation counselling session. Our experts assess your situation and suggest the best NIOS stream for your goals."
    },
    {
      q: "Can I appear for only failing subjects?",
      a: "Yes. NIOS allows students to appear for individual failing subjects without retaking the full exam — saving time, money, and a year of your life."
    },
    {
      q: "Is there any age limit for NIOS admission?",
      a: "Minimum age is 14 for Class 10 and 15 for Class 12. There is no upper age limit — making NIOS ideal for students, working adults, and learners of all ages."
    }
  ];


const admitData = [
    {
      cls: "hg-ac-blue",
      icon: "/assets/icons/group1.png",
      title: "Pass 10th/12th in Same Year",
      sub: "Stream 1 & 2 Admission Open",
    },
    {
      cls: "hg-ac-teal",
      icon: "/assets/icons/group2.svg",
      title: "Pass 10th/12th in just 45 Days",
      sub: "On-Demand Exam (ODES)",
    },
    {
      cls: "hg-ac-orange",
      icon: "/assets/icons/group3.svg",
      title: "Failed in 10th/12th this year?",
      sub: "Same-year pass — still possible!",
    },
  ];



const streams = [
  { color: "blue", icon: "🎓", title: "NIOS Stream 1 — Fresh Start (Class 9/11 Failed)", desc: "Failed Class 9 or 11? Directly appear for Class 10 or 12 through NIOS. No repeating. No attendance needed. Start fresh today.", pill: "Saves Time", pillColor: "blue" },
  { color: "teal", icon: "🔁", title: "NIOS Stream 2 — Same Year Pass (Board Failed)", desc: "Failed CBSE, ICSE, or UP Board this year? Don't lose a year. NIOS Stream 2 lets you pass in the very same academic year.", pill: "Same Year Pass", pillColor: "teal" },
  { color: "orange", icon: "⚡", title: "NIOS Stream 3 & 4 — On-Demand (45 Days)", desc: "Pass in as little as 45 days through NIOS On-Demand Exam. Appear when ready — no waiting for March/October exam cycle.", pill: "Fastest Option", pillColor: "orange" },
  { color: "blue", icon: "📚", title: "Subject-Wise Improvement", desc: "Failed only specific subjects? Appear for only those, not the full exam. Save time, money, and years of your life.", pill: "Flexible", pillColor: "blue" },
  { color: "teal", icon: "🏆", title: "JEE / NEET / CA Aspirants", desc: "Zero mandatory attendance — perfect for competitive exam students. Pass your 12th board while focusing 100% on your entrance exam.", pill: "For Aspirants", pillColor: "teal" },
  { color: "orange", icon: "♿", title: "Special Needs Support", desc: "NIOS provides special concessions for students with disabilities. We ensure a fully inclusive, supportive learning experience for everyone.", pill: "Inclusive", pillColor: "green" },
];

const whys = [
  { icon: "👨‍🏫", color: "blue", title: "Experienced Professionals", desc: "NIOS-specialist faculty with years of experience — committed to making every concept simple and every student exam-ready." },
  { icon: "📖", color: "teal", title: "Best Study Materials", desc: "Exclusive notes, previous year question papers, and focused mock test series aligned with the latest NIOS syllabus." },
  { icon: "📝", color: "orange", title: "Smooth NIOS Admission", desc: "We handle the entire online admission process — form filling, document upload, subject selection — all under one roof." },
  { icon: "📅", color: "green", title: "Flexible & No Attendance", desc: "Study at your own pace with zero mandatory attendance — perfect for competitive exam aspirants and working students." },
  { icon: "📍", color: "purple", title: "Prime Lucknow Location", desc: "Centrally located in Hazratganj — 3 min from the metro station, accessible from every part of Lucknow." },
  { icon: "🏆", color: "red", title: "Trusted Since 2001", desc: "Over 23 years, 10,000+ students, 4.7★ Google rating — our legacy is the city's trust and our students' success." },
];

const results = [
  { num: "01", name: "Jayant Rawat", roll: "210273233068", cls: "12th Commerce", score: "94.8%" },
  { num: "02", name: "Nancy Bharti", roll: "210273233129", cls: "12th Commerce", score: "94.0%" },
  { num: "03", name: "Yashasvi Srivastava", roll: "210273233209", cls: "12th Commerce", score: "92.0%" },
  { num: "04", name: "Harneet Kaur", roll: "210273233211", cls: "12th Commerce", score: "91.8%" },
  { num: "05", name: "Priya Verma", roll: "210273233145", cls: "10th Science", score: "89.4%" },
  { num: "06", name: "Rohit Kumar Singh", roll: "210273233078", cls: "10th Arts", score: "87.6%" },
  { num: "07", name: "Anjali Mishra", roll: "210273233093", cls: "10th Science", score: "86.2%" },
];




export default function HazratganjPage() {
 const [openFaq, setOpenFaq] = useState(null);

  const toggle = (i) => {
  setOpenFaq((prev) => (prev === i ? null : i));
};


  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };





  return (
    <div className="hg-page">

      {/* TOPBAR */}
      <div className="hg-topbar">
        <div className="hg-tb-inner">
          <span className="d-flex align-items-center"><img className="location-pins" src="/assets/images/contacts/location.svg"/> <strong>Hazratganj Branch</strong> — 3rd Floor, Shree Chamber, Near Basant Cinema, Lucknow – 226001</span>
          <span className="d-flex align-items-center"><img src="/assets/icons/footer/call.svg" alt="Phone Icon" className="contact-icon"/> <a href="tel:+09839065533">+91 99350 35316</a> &nbsp;|&nbsp; <img src="/assets/icons/footer/gmail.svg" alt="Email Icon" className="contact-icon"></img> <a href="mailto:info@sscoaching.in">info@sscoaching.in</a></span>
        </div>
      </div>

      <Header/>
<Offcanvas />
        <BranchContactCanvas/>

      <Hero />
              <HeroMobile />
      
      
      {/* HERO */}
        {/* <section className="hg-hero">
      <div className="container">

        <div className="hg-hero-in">
          <div className="hg-hero-left">
            <div className="hg-chip"><span className="hg-dot" />Hazratganj Branch · Lucknow</div>
            <div className="mobile-none">
              <h1 className="hg-h1">A <span className="hg-accent">Moment of Honour</span><br />Awaits You at<br />SS Coaching</h1>
            <p className="hg-hero-sub">Pass your 10th or 12th the smart way — with Lucknow's most trusted<br/> NIOS coaching centre. Since 2001, <strong>10,000+ students</strong> have rewritten their future with us.</p>
            </div>
             <div className="desktop-none">
              <h1 className="hg-h1">A <span className="hg-accent">Moment of Honour</span> Awaits You at<br />SS Coaching</h1>
            <p className="hg-hero-sub">Pass your 10th or 12th the smart way — with Lucknow's most trusted NIOS coaching centre. Since 2001, <strong>10,000+ students</strong> have rewritten their future with us.</p>
            </div>
            <div className="hg-hero-tags">
              {["🏛 NIOS Authorised Centre","🏆 4.7★ Google Reviews","⚡ Pass in 45 Days","🎓 Govt. of India Recognised"].map(t => (
                <span key={t} className="hg-tag">{t}</span>
              ))}
            </div>
            <div className="hg-hbtns">

              <button className="hg-btn-or cta-btn-2nd">Apply for Admission →</button>
              <a href="tel:+09839065533" className="hg-btn-wh "> Call Now</a>
            </div>
          </div>
          <div className="hg-hcard">
            <div className="hg-hcard-ttl text-center"> Hazratganj Branch Info</div>
            <div className="hg-hrow"><div className="hg-hico"> <FaMapMarkerAlt className="text-red-500"/></div><div className="hg-hbody"><strong>Address</strong><span>3rd Floor, Shree Chamber, Naza Computer Market,<br />Near Basant Cinema, Hazratganj, Lucknow – 226001</span></div></div>
            <div className="hg-hrow"><div className="hg-hico"> <FaPhoneAlt className="text-green-600 "/></div><div className="hg-hbody"><strong>Call / WhatsApp</strong><a href="tel:+09839065533">+91 99350 35316</a><a href="tel:+916386570743">+91 63865 70743</a></div></div>
            <div className="hg-hrow"><div className="hg-hico"><FaClock className="text-blue-500"/></div><div className="hg-hbody"><strong>Office Hours</strong><span>Mon–Sat: 9:00 AM – 7:00 PM<br />Sunday: By Appointment</span></div></div>
            <div className="hg-hrow"><div className="hg-hico"> <FaBus className="text-yellow-500"/></div><div className="hg-hbody"><strong>How to Reach</strong><span>3 min from Hazratganj Metro<br />Near Phoenix Palassio Mall</span></div></div>
            <div className="hg-hmini">
              <a href="tel:+09839065533" className="hg-mbtn hg-mbl"><FaPhoneAlt className="text-green-600 "/> Call Us</a>
              <a href="https://wa.me/09839065533" className="hg-mbtn hg-mtl "><FaWhatsapp className="text-green-500 whatsppp-ico " /> WhatsApp</a>
            </div>
          </div>
        </div>
      </div>

      </section> */}

      {/* ADMIT STRIP */}
    {/* <div className="admit-strip-area">
       <div className="container">

      <div className="hg-admit-row">
       {admitData.map((a) => (
        <a key={a.title} href="#streams" className={`hg-ac ${a.cls}`}>

          <span className="hg-ac-ico">
            <Image
              src={a.icon}
              alt={a.title}
              width={30}
              height={30}
            />
          </span>

          <div className="hg-ac-tx">
            <strong>{a.title}</strong>
            <span>{a.sub}</span>
          </div>

          <span className="hg-ac-btn cta-btn-2nd">Get Admission →</span>

        </a>
      ))}
     </div>
    </div>
    </div> */}


     <ChipSection />
            <MobileQuickInfo />

               
       

      {/* STATS */}
    <StatsSectionMobile />
                <StatsSection />

      {/* STUDENT SUCCESS */}
      <section className="hg-section " id="about">
        <div className="hg-sec ">
          <div className="hg-sh">
            {/* <div className="hg-stag">Our Pride</div> */}
            <h2 className="hg-stitle">Student <span>Success</span> Stories</h2>
            <p className="hg-sdesc">Every topper at SS Coaching Hazratganj is proof that the right guidance changes everything. Meet our 2024 stars.</p>
          </div>
        <StudentSuccess />
          
        </div>
      </section>

      <GoogleReview/>
         
      


      {/* PROCESS */}
      <section className="hg-section" id="process">
        <div className="hg-sec">
          <div className="hg-sh">
            {/* <div className="hg-stag">Simple & Clear</div> */}
            <h2 className="hg-stitle">Our Simple <span>3-Step Process</span></h2>
            <p className="hg-sdesc">Getting your NIOS admission done at SS Coaching Hazratganj takes just 3 easy steps.</p>
          </div>
          <div className="hg-proc-grid">
            <div className="hg-proc-vis"><span className="hg-proc-ico"><img src="/assets/images/home/steps-process/photo.svg"></img></span><div className="hg-proc-big">3</div></div>
            <div className="hg-steps">
              {[
                { num:"01", cls:"hg-snum-blue", title:"Free Counselling", desc:"Our experts analyse your situation — past exams, age, goals — and recommend the perfect NIOS stream at zero cost." },
                { num:"02", cls:"hg-snum-teal", title:"Admission & Documentation", desc:"We handle the entire NIOS online admission — form filling, document upload, subject selection, fee payment. One visit, hassle-free." },
                { num:"03", cls:"hg-snum-orange", title:"Study, Appear & Pass", desc:"Attend classes, use our exclusive study materials, crack mock tests, and pass with confidence. Our 95% pass rate says it all!" },
              ].map(s => (
                <div key={s.num} className="hg-step">
                  <div className={`hg-snum ${s.cls}`}>{s.num}</div>
                  <div className="hg-sbody"><h4>{s.title}</h4><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STREAMS */}
      <section className="hg-section hg-bg-off" id="streams">
        <div className="hg-sec">
          <div className="hg-sh">
            {/* <div className="hg-stag">NIOS Admission Options</div> */}
            <h2 className="hg-stitle">We Are the Best NIOS Coaching <br/> <span>in Lucknow</span></h2>
            {/* <p className="hg-sdesc">Six streams. One mission. We help every student find the right path forward.</p> */}
          </div>
          <div className="container">
            <div className="hg-str-grid">
            {streams.map(s => (
              <div key={s.title} className={`hg-strc hg-strc-${s.color}`}>
                <div className="d-flex align-items-center gap-2">
                  <div className={`hg-str-ico hg-str-ico-${s.color}`}>{s.icon}</div>
                <h3>{s.title}</h3>
                </div>
                <p>{s.desc}</p>
                <span className={`hg-pill hg-pill-${s.pillColor}`}>{s.pill}</span>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* REG BANNER BLUE */}
      <div className="hg-reg">
        <div className="hg-reg-in">
          <div className="hg-reg-l">
            <h2>Registration Open! <span>Limited Seats </span></h2>
            <p>Admissions for NIOS 2025–26 are open now at our Hazratganj centre. Don't wait — seats fill fast.</p>
            <div className="hg-reg-btns">
              <a href="tel:+09839065533" className="hg-btn-yl">Enrol Now →</a>
              <a href="https://wa.me/09839065533" className="hg-btn-cl"><FaWhatsapp className="text-green-500 whatsppp-ico " /> WhatsApp Us</a>
            </div>
          </div>
          <div className="hg-reg-badge"><strong>95%</strong><span>Pass Rate <br />2024 Batch</span></div>
        </div>
      </div>

      {/* WHY US */}
      <section className="hg-section mobile-none">
        <div className="hg-sec">
          <div className="hg-sh">
         
            <h2 className="hg-stitle">The Best NIOS Coaching<br/> <span>in Lucknow</span></h2>
            
          </div>
          <div className="container">
                <div className="hg-why-grid">
            {whys.map(w => (
              <div key={w.title} className="hg-wc">
                <div className={`hg-wico hg-wico-${w.color}`}>{w.icon}</div>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="hg-section ">
      <div className="hg-sec">
        <div className="hg-sh">
          <h2 className="hg-stitle">
            The Best NIOS Coaching <br/> <span>in Lucknow</span>
          </h2>
        </div>

        <div className="container">
           <div className="hg-why-grid">
  {whys.map((w, index) => (
    <div key={w.title} className="hg-wc">

      <div className="why-row " onClick={() => toggleItem(index)}>
        <div className={`hg-wico hg-wico-${w.color}`}>{w.icon}</div>
        <h4>{w.title}</h4>
      </div>

      <p className={`why-desc ${activeIndex === index ? "show-desc" : ""}`}>
        {w.desc}
      </p>

    </div>
  ))}
</div>
        </div>
      </div>
      </section>


      {/* RESULTS */}
      <section className="hg-section hg-bg-off" id="results">
        <div className="hg-sec">
          <div className="hg-sh">
            {/* <div className="hg-stag">Batch 2024</div> */}
            <h2 className="hg-stitle">Successful Learners of <br/> <span>NIOS Board</span></h2>
            <p className="hg-sdesc">A glimpse of our 2024 toppers from SS Coaching Hazratganj.</p>
          </div>
         <div className="container">
           <div className="hg-table-wrap">
            <table className="hg-rtable">
              <thead><tr><th>#</th><th>Student Name</th><th>Roll Number</th><th>Class / Stream</th><th>Score</th></tr></thead>
              <tbody>
                {results.map(r => (
                  <tr key={r.num}>
                    <td>{r.num}</td><td><strong>{r.name}</strong></td><td>{r.roll}</td><td>{r.cls}</td>
                    <td><span className="hg-chip2">{r.score}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         </div>
        </div>
      </section>

      {/* REG BANNER GREEN */}
      <div className="hg-reg hg-reg-green">
        <div className="hg-reg-in">
          <div className="hg-reg-l">
            <h2>NIOS 2026: <span>A Year of Determination, Dreams & Success</span></h2>
            <p>New batch starting soon at Hazratganj. Whether you're going for Stream 1, 2, 3, or 4 — there's a path here for you.</p>
           <div className="mobile-none">
              <div className="hg-reg-btns">
              <a href="tel:+09839065533" className="hg-btn-yl"> Book Free Counselling →</a>
            </div>
           </div>
          </div>
          <div className="hg-reg-badges-col">
            <div className="hg-reg-badge"><strong>NIOS STREAM 1</strong><span>Class 9th/11th Exam</span></div>
            <div className="hg-reg-badge"><strong>NIOS STREAM 2</strong><span>Class 10th/12th Exam</span></div>

            <div className="hg-reg-badge"><strong>STREAM 3 & 4</strong><span>On-Demand · 45 Days</span></div>

             <div className="desktop-none " style={{ width: "100%" }}>
              <div className="hg-reg-btns desktop-none">
              <a href="tel:+09839065533" className="hg-btn-yl"> Book Free Counselling →</a>
            </div>
           </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
       <section className="hg-section" id="faq">

      <div className="hg-sec">

        <div className="hg-sh">
          {/* <div className="hg-stag">FAQ</div> */}

          <h2 className="hg-stitle">
            Frequently Asked <span>Questions</span>
          </h2>

          <p className="hg-sdesc">
            Everything you want to know before enrolling at SS Coaching Hazratganj.
          </p>
        </div>

        <div className="container">

          <div className="hg-fq-grid">

            {faqs.map((f, i) => (
              <div
                key={`faq-${i}`}
                className={`hg-fqi ${openFaq === i ? "hg-fqi-open" : ""}`}
              >

                <button
                  className="hg-fqb"
                  onClick={() => toggle(i)}
                >

                  {f.q}

                  <span className="hg-fqico">
                    {openFaq === i ? "−" : "+"}
                  </span>

                </button>

                {openFaq === i && (
                  <div className="hg-fqa">
                    {f.a}
                  </div>
                )}

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>

      {/* LOCATION */}
      <section className="hg-section hg-bg-off" id="contact">
        <div className="hg-sec">
          <div className="hg-sh">
            <div className="hg-stag">Visit Us</div>
            <h2 className="hg-stitle">Find Our <span>Hazratganj Centre</span></h2>
          </div>
          <div className="container">
              <div className="hg-loc-grid">
            <div className="hg-map-box">
              <div className="hg-map-em">🗺️</div>
              <div className="hg-map-addr">3rd Floor, Shree Chamber<br />Naza Computer Market<br />Near Basant Cinema, Hazratganj<br />Lucknow – 226001</div>
              <div className="hg-map-sub">3 min walk from Hazratganj Metro Station</div>
              <a href="https://maps.google.com/?q=Hazratganj+Lucknow+SS+Coaching" target="_blank" rel="noreferrer" className="hg-map-go">📍 Open in Google Maps</a>
            </div>
      <div className="hg-locs">
  {[
    {
      ico: <FaMapMarkerAlt />,
      label: "Address",
      content: (
        <span>
          3rd Floor, Shree Chamber, Naza Computer Market,
          Near Basant Cinema, Hazratganj, Lucknow 226001
        </span>
      ),
    },
    {
      ico: <FaPhoneAlt />,
      label: "Phone / WhatsApp",
      content: (
        <>
          <a href="tel:+919935035316">+91 99350 35316</a>
          <a href="tel:+916386570743">+91 63865 70743</a>
        </>
      ),
    },
    {
      ico: <FaEnvelope />,
      label: "Email",
      content: <a href="mailto:info@sscoaching.in">info@sscoaching.in</a>,
    },
    {
      ico: <FaClock />,
      label: "Office Hours",
      content: (
        <>
          <span>Monday – Saturday: 9:00 AM – 7:00 PM</span>
          <span>Sunday: By Appointment Only</span>
        </>
      ),
    },
    {
      ico: <FaBus />,
      label: "How to Reach",
      content: (
        <>
          <span>3 min walk · Hazratganj Metro Station</span>
          <span>Near Phoenix Palassio Mall · Multiple bus routes</span>
        </>
      ),
    },
  ].map((l) => (
    <div key={l.label} className="hg-lc">
      <div className="hg-lco">{l.ico}</div>
      <div>
        <strong>{l.label}</strong>
        {l.content}
      </div>
    </div>
  ))}
</div>
          </div>
          </div>
        </div>
      </section>
      <Popup/>
<div className="ob">
  <div className="ob-in">
    <h3>Other Branches in Lucknow</h3>
    <p>SS Coaching is spread across the city — find a centre near you.</p>
    <div className="b-row">
      <a href="#" className="bcard"><div><strong>Indiranagar Branch</strong><span>Sector 9, Indiranagar, Lucknow</span></div><span className="ba">→</span></a>
      <a href="#" className="bcard"><div><strong>Alambagh Branch</strong><span>U.R. Plaza, Near Phoenix Mall, Alambagh</span></div><span className="ba">→</span></a>
    </div>
  </div>
</div>
      <Footer/>

    </div>
  );
}